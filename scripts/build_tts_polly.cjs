/**
 * Build offline TTS audio for every fact in ANIMAL_DATABASE (docs/index.html).
 * Writes WAV files to docs/assets/audio and updates docs/assets/manifest.json
 * so your app can use them instantly.
 *
 * Run in CI:
 *   node scripts/build_tts_polly.cjs --db=docs/index.html --out=./docs/assets --rate=7000 --voice=Matthew
 */

const fs = require("fs");
const fsp = require("fs/promises");
const path = require("path");
const vm = require("vm");
const { PollyClient, SynthesizeSpeechCommand } = require("@aws-sdk/client-polly");

// ---------- CLI ----------
function parseArgs(argv) {
  const out = {};
  for (let i=0;i<argv.length;i++){
    const t = argv[i];
    if (!t.startsWith("--")) continue;
    const eq = t.indexOf("=");
    if (eq !== -1) out[t.slice(2,eq)] = t.slice(eq+1) || true;
    else { const k=t.slice(2), n=argv[i+1]; if (n && !n.startsWith("--")) {out[k]=n; i++;} else { out[k]=true; } }
  }
  return out;
}
const args = parseArgs(process.argv.slice(2));
const DB_FILE = args.db || "docs/index.html";
const OUT_DIR = args.out || "./docs/assets";
const RATE_MS = Number(args.rate || 7000);
const VOICE = args.voice || "Matthew"; // en-US male

function slugify(s) {
  return String(s||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"").slice(0,100);
}
function existsSync(p){ try{ fs.accessSync(p); return true; } catch { return false; } }
async function ensureDir(d){ await fsp.mkdir(d,{recursive:true}); }
async function sleep(ms){ return new Promise(r=>setTimeout(r,ms)); }

async function readAnimals() {
  const html = await fsp.readFile(DB_FILE, "utf8");
  const m = html.match(/const\s+ANIMAL_DATABASE\s*=\s*(\[[\s\S]*?\]);/);
  if (!m) throw new Error("ANIMAL_DATABASE not found in " + DB_FILE);
  const ctx = {}; vm.createContext(ctx);
  return vm.runInContext("(" + m[1] + ")", ctx);
}

async function readManifest(p) {
  try { return JSON.parse(await fsp.readFile(p,"utf8")); }
  catch { return { images:{}, audio:{}, audioKeys:{} }; }
}

async function ttsPolly(client, text, voice) {
  const cmd = new SynthesizeSpeechCommand({
    OutputFormat: "mp3", // small files; browser-friendly
    Engine: "neural",
    LanguageCode: "en-US",
    Text: text,
    VoiceId: voice
  });
  const res = await client.send(cmd);
  const chunks = [];
  for await (const c of res.AudioStream) chunks.push(c);
  return Buffer.concat(chunks);
}

async function main() {
  const client = new PollyClient({
    region: process.env.AWS_REGION || "us-east-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
  });

  const animals = await readAnimals();
  const manifestPath = path.join(OUT_DIR, "manifest.json");
  const audioDir = path.join(OUT_DIR, "audio");
  await ensureDir(audioDir);

  const manifest = await readManifest(manifestPath);

  let total = 0;
  for (const a of animals) {
    const facts = Array.isArray(a.facts) ? a.facts : [];
    for (const fact of facts) {
      const slug = slugify(fact);
      const dest = path.join(audioDir, `${slug}.mp3`);
      const rel = `./assets/audio/${slug}.mp3`;
      if (existsSync(dest)) {
        manifest.audio[slug] = rel;
        manifest.audioKeys[fact] = rel;
        continue;
      }
      try {
        const buf = await ttsPolly(client, fact, VOICE);
        await fsp.writeFile(dest, buf);
        manifest.audio[slug] = rel;
        manifest.audioKeys[fact] = rel;
        console.log("🔊 TTS:", a.name, "->", slug);
      } catch (e) {
        console.warn("❌ TTS fail:", a.name, "::", e.message);
      }
      await sleep(RATE_MS); // 7s throttling if you set --rate=7000
      total++;
    }
  }

  await fsp.writeFile(manifestPath, JSON.stringify(manifest, null, 2), "utf8");
  console.log("✅ TTS done. Files added:", total);
}

main().catch(e => { console.error(e); process.exit(1); });
