/**
 * scripts/build_assets.cjs (CommonJS)
 * Builds local images + TTS audio from docs/index.html (ANIMAL_DATABASE),
 * and writes docs/assets/manifest.json (so GitHub Pages can serve it).
 *
 * Usage (CI/local):
 *   node scripts/build_assets.cjs --db docs/index.html --out ./docs/assets --images --tts --rate 7000
 *
 * Env:
 *   GEMINI_API_KEY=<your key>   (only needed for --tts)
 */

const fs = require("fs");
const fsp = require("fs/promises");
const path = require("path");
const vm = require("vm");

// ---- CLI args ----
const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.includes("=") ? a.split("=", 2) : [a, true];
    return [k.replace(/^--/, ""), v];
  })
);

const DB_FILE = String(args.db || "docs/index.html");    // read from your published index
const OUT_DIR = String(args.out || "./docs/assets");      // MUST be under docs/
const DO_TTS = !!args.tts;
const DO_IMAGES = !!args.images;
const RATE_MS = Number(args.rate || 7000);

// ---- Config ----
const GEMINI_KEY = process.env.GEMINI_API_KEY || "";
const TTS_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent";

function ttsPayload(text) {
  return {
    contents: [{ role: "user", parts: [{ text }]}],
    // clear US male teacher vibe; easy to understand
    audioConfig: { audioEncoding: "LINEAR16", speakingRate: 0.92, pitch: 0.0, voice: "en-US" }
  };
}

// ---- Helpers ----
function slugify(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
function existsSync(p){ try { fs.accessSync(p); return true; } catch { return false; } }
async function ensureDir(p) { await fsp.mkdir(p, { recursive: true }); }
async function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

async function readAnimals() {
  if (DB_FILE.endsWith(".html")) {
    const src = await fsp.readFile(DB_FILE, "utf8");
    const m = src.match(/const\s+ANIMAL_DATABASE\s*=\s*(\[[\s\S]*?\]);/);
    if (!m) throw new Error("ANIMAL_DATABASE not found in docs/index.html");
    const context = {};
    vm.createContext(context);
    const arr = vm.runInContext("(" + m[1] + ")", context);
    return arr;
  } else {
    const raw = await fsp.readFile(DB_FILE, "utf8");
    const obj = JSON.parse(raw);
    return obj.animals || obj || [];
  }
}

async function fetchBuffer(url, opts) {
  const r = await fetch(url, opts);
  if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
  const ab = await r.arrayBuffer();
  return Buffer.from(ab);
}

async function ttsGemini(text) {
  const url = `${TTS_ENDPOINT}?key=${GEMINI_KEY}`;
  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ttsPayload(text)),
  });
  if (!r.ok) throw new Error(`TTS ${r.status}`);
  const data = await r.json();
  const b64 = data?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!b64) throw new Error("No audio in response");
  return Buffer.from(b64, "base64");
}

async function readManifest(p) {
  try { return JSON.parse(await fsp.readFile(p, "utf8")); }
  catch { return { images: {}, audio: {}, audioKeys: {} }; }
}

async function main() {
  const animals = await readAnimals();

  const audioDir = path.join(OUT_DIR, "audio");
  const imgDir   = path.join(OUT_DIR, "img");
  const manifestPath = path.join(OUT_DIR, "manifest.json");
  await ensureDir(audioDir);
  await ensureDir(imgDir);

  const manifest = await readManifest(manifestPath);

  // IMAGES
  if (DO_IMAGES) {
    for (const a of animals) {
      const slug = slugify(a.name);
      const dest = path.join(imgDir, `${slug}.jpg`);
      if (existsSync(dest)) {
        manifest.images[slug] = `./assets/img/${slug}.jpg`;
        continue;
      }
      try {
        const imageUrl = a.image || a.img || a.photo || (a.picture && a.picture.url);
        if (imageUrl && /^https?:\/\//.test(imageUrl)) {
          const buf = await fetchBuffer(imageUrl, { cache: "no-store" });
          await fsp.writeFile(dest, buf);
          manifest.images[slug] = `./assets/img/${slug}.jpg`;
          console.log("IMG ok:", a.name);
        } else {
          console.log("IMG skip (no URL):", a.name);
        }
      } catch (e) {
        console.warn("IMG fail:", a.name, e.message);
      }
      await sleep(50);
    }
  }

  // AUDIO (facts)
  if (DO_TTS && GEMINI_KEY) {
    for (const a of animals) {
      const facts = Array.isArray(a.facts) ? a.facts : [];
      for (const f of facts) {
        const slug = slugify(f).slice(0, 100);
        const dest = path.join(audioDir, `${slug}.wav`);
        if (existsSync(dest)) {
          manifest.audio[slug] = `./assets/audio/${slug}.wav`;
          manifest.audioKeys[f] = `./assets/audio/${slug}.wav`;
          continue;
        }
        try {
          const audio = await ttsGemini(f);
          await fsp.writeFile(dest, audio);
          manifest.audio[slug] = `./assets/audio/${slug}.wav`;
          manifest.audioKeys[f] = `./assets/audio/${slug}.wav`;
          console.log("TTS ok:", a.name, "::", f.slice(0, 60));
        } catch (e) {
          console.warn("TTS fail:", a.name, e.message);
        }
        await sleep(RATE_MS); // 7 seconds default
      }
    }
  }

  await fsp.writeFile(manifestPath, JSON.stringify(manifest, null, 2), "utf8");
  console.log("Manifest written:", manifestPath);
}

main().catch((err) => { console.error(err); process.exit(1); });
