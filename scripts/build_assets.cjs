/**
 * scripts/build_assets.cjs
 * Builds local images (and optionally TTS) from docs/assets/app-data.js (ANIMAL_DATABASE),
 * and writes docs/assets/manifest.json. Resumable.
 *
 * Run:
 * node scripts/build_assets.cjs --db=docs/assets/app-data.js --out=./docs/assets --images --rate=7000
 * # later (when you have a working TTS provider):
 * # node scripts/build_assets.cjs --db=docs/assets/app-data.js --out=./docs/assets --images --tts --rate=7000
 */

const fs = require("fs");
const fsp = require("fs/promises");
const path = require("path");
const vm = require("vm");
// ---- CLI args (supports --key=value and --key value) ----
function parseArgs(argv) {
  const out = {};
for (let i = 0; i < argv.length; i++) {
    const t = argv[i];
    if (!t.startsWith("--")) continue;
const eq = t.indexOf("=");
    if (eq !== -1) {
      out[t.slice(2, eq)] = t.slice(eq + 1) ||
true;
    } else {
      const k = t.slice(2);
      const next = argv[i + 1];
if (next && !next.startsWith("--")) { out[k] = next; i++; }
      else { out[k] = true;
}
    }
  }
  return out;
}

const args = parseArgs(process.argv.slice(2));
// FIX: Change default DB_FILE to the new location
const DB_FILE = String(args.db || "docs/assets/app-data.js"); 
const OUT_DIR = String(args.out || "./docs/assets");
const DO_TTS = !!args.tts;            // default off
const DO_IMAGES = !!args.images;
const RATE_MS = Number(args.rate || 7000);

// ---- Config ----
const GEMINI_KEY = process.env.GEMINI_API_KEY || "";
const TTS_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent";
function ttsPayload(text) {
  return {
    contents: [{ role: "user", parts: [{ text }]}],
    audioConfig: { audioEncoding: "LINEAR16", speakingRate: 0.92, pitch: 0.0, voice: "en-US" }
  };
}

function slugify(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
function existsSync(p){ try { fs.accessSync(p); return true; } catch { return false;
} }
async function ensureDir(p) { await fsp.mkdir(p, { recursive: true });
}
async function sleep(ms) { return new Promise((r) => setTimeout(r, ms));
}

async function readAnimals() {
  // FIX: Assume .js file format for data extraction
  if (DB_FILE.endsWith(".js")) {
    const src = await fsp.readFile(DB_FILE, "utf8");
// FIX: Look for ANIMAL_DATABASE in the JS content
    const m = src.match(/const\s+ANIMAL_DATABASE\s*=\s*(\[[\s\S]*?\]);/);
    // FIX: Update error message
    if (!m) throw new Error("ANIMAL_DATABASE not found in docs/assets/app-data.js");
    const ctx = {}; vm.createContext(ctx);
    return vm.runInContext("(" + m[1] + ")", ctx);
  } else {
    // Legacy support for older JSON files
    const raw = await fsp.readFile(DB_FILE, "utf8");
const obj = JSON.parse(raw);
    return obj.animals || obj || [];
}
}

async function readImagesMap() {
  try {
    const raw = await fsp.readFile("docs/images_map.json", "utf8");
    return JSON.parse(raw);
// { "Fennec Fox": "https://.. or ./assets/images/..", ... }
  } catch { return {};
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
  try { return JSON.parse(await fsp.readFile(p, "utf8"));
}
  catch { return { images: {}, audio: {}, audioKeys: {} };
}
}

async function main() {
  console.log("📦 Args:", args);
  const animals = await readAnimals();
  const imagesMap = await readImagesMap();
console.log(`Found ${animals.length} animals in ${DB_FILE}`);
  console.log(`Images map entries: ${Object.keys(imagesMap).length}`);

  const audioDir = path.join(OUT_DIR, "audio");
const imgDir   = path.join(OUT_DIR, "images"); // <-- store under assets/images
  const manifestPath = path.join(OUT_DIR, "manifest.json");
  await ensureDir(audioDir);
await ensureDir(imgDir);

  const manifest = await readManifest(manifestPath);

  // IMAGES
  if (DO_IMAGES) {
    for (const a of animals) {
      const slug = slugify(a.name);
const dest = path.join(imgDir, `${slug}.webp`);
      const rel  = `./assets/images/${slug}.webp`;
if (existsSync(dest)) {
        manifest.images[slug] = rel;
        continue;
}
      try {
        const fromMap = imagesMap[a.name];
const imageUrl =
          (fromMap && /^https?:\/\//.test(fromMap) ? fromMap : null) ||
a.image || a.img || a.photo || (a.picture && a.picture.url);

        if (imageUrl && /^https?:\/\//.test(imageUrl)) {
          const buf = await fetchBuffer(imageUrl, { cache: "no-store" });
// Write raw bytes; convert to webp is optional (sharp not installed here)
          await fsp.writeFile(dest, buf);
manifest.images[slug] = rel;
          console.log("🖼️ IMG ok:", a.name);
        } else if (fromMap && fromMap.startsWith("./assets/")) {
          // Already a local path set in map;
just record it
          manifest.images[slug] = fromMap;
          console.log("🖼️ IMG local:", a.name);
} else {
          console.log("🚫 IMG skip:", a.name);
}
      } catch (e) {
        console.warn("❌ IMG fail:", a.name, e.message);
}
      await sleep(50);
    }
  }

  // AUDIO (OFF by default until you have a supported provider/model)
  if (DO_TTS && GEMINI_KEY) {
    for (const a of animals) {
      const facts = Array.isArray(a.facts) ?
a.facts : [];
      for (const f of facts) {
        const slug = slugify(f).slice(0, 100);
const dest = path.join(audioDir, `${slug}.wav`);
        const rel  = `./assets/audio/${slug}.wav`;
if (existsSync(dest)) {
          manifest.audio[slug] = rel;
          manifest.audioKeys[f] = rel;
          continue;
}
        try {
          const audio = await ttsGemini(f);
await fsp.writeFile(dest, audio);
          manifest.audio[slug] = rel;
          manifest.audioKeys[f] = rel;
          console.log("🔊 TTS ok:", a.name, "::", f.slice(0, 60));
} catch (e) {
          console.warn("❌ TTS fail:", a.name, e.message);
}
        await sleep(RATE_MS);
}
    }
  }

  await fsp.writeFile(manifestPath, JSON.stringify(manifest, null, 2), "utf8");
  console.log("✅ Manifest written:", manifestPath);
}

main().catch((err) => { console.error(err); process.exit(1); });
