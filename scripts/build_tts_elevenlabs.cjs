const fs = require("fs");
const path = require("path");
const vm = require("vm"); 
const { Buffer } = require("buffer"); 
const fetch = require('node-fetch'); // Requires npm install node-fetch

// -------- CLI ARGS --------
function arg(key, def = null) {
  const hit = process.argv.find(a => a.startsWith(`--${key}=`));
  return hit ?
  hit.split("=").slice(1).join("=") : def;
}
const DB_PATH   = arg("db", "docs/index.html");
const OUT_ROOT  = arg("out", "./docs/assets");
const RATE_MS   = parseInt(arg("rate", "1000"), 10) || 1000;
const VOICE_ID  = arg("voice", "Rachel"); // Eleven Labs default voice
const MODEL_ID  = arg("model", "eleven_monolingual_v1"); // Default model

const TTS_DIR   = path.join(OUT_ROOT, "tts");
fs.mkdirSync(TTS_DIR, { recursive: true });

// -------- UTILS --------
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const toSlug = (s) => (s || "")
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/(^-|-$)/g, "");

/**
 * Extracts all JS databases from the app-data.js file
 */
function readDatabases(dataPath) {
  const appDataPath = path.join(path.dirname(dataPath), 'assets', 'app-data.js');
  
  let jsContent = '';
  if (fs.existsSync(appDataPath)) {
      jsContent = fs.readFileSync(appDataPath, "utf8");
  } else {
      throw new Error(`Data file not found at expected path: ${appDataPath}`);
  }

  // Use a minimal sandbox context to evaluate the data file content safely
  const sandbox = { 
      window: { 
          ANIMAL_DATABASE: [], 
          sightWordsData: [], 
          sentencesData: [],
      } 
  };
  vm.createContext(sandbox);
  // Execute the data file content, defining window. variables in the sandbox
  vm.runInContext(jsContent, sandbox);

  const animals = sandbox.window.ANIMAL_DATABASE;
  const sightWords = sandbox.window.sightWordsData;
  const sentences = sandbox.window.sentencesData;

  return { animals, sightWords, sentences };
}

/**
 * Gathers all unique text strings that need TTS.
 */
function collectAllText({ animals, sightWords, sentences }) {
  const textSet = new Set();

  animals.forEach(a => {
    if (a.name) textSet.add(a.name);
    (a.facts || []).forEach(f => {
        if (typeof f === 'string' && f.trim().length > 0) {
            textSet.add(f);
        }
    });
  });

  sightWords.forEach(w => textSet.add(w.word));
  sentences.forEach(s => textSet.add(s.sentence));

  return Array.from(textSet);
}


/**
 * Synthesize text using Eleven Labs and save to a file.
 */
async function synthesizeToFile(text, outFile) {
  const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
  if (!ELEVENLABS_API_KEY) {
      throw new Error("ELEVENLABS_API_KEY is not set.");
  }
  
  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
    method: 'POST',
    headers: {
      'xi-api-key': ELEVENLABS_API_KEY,
      'Content-Type': 'application/json',
      'Accept': 'audio/mpeg',
    },
    body: JSON.stringify({
      text: text,
      model_id: MODEL_ID,
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.8,
        style: 0.0,
        use_speaker_boost: true
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Eleven Labs API failed with status ${response.status}: ${errorText}`);
  }

  // The response body is the raw MP3 audio stream
  const buffer = Buffer.from(await response.arrayBuffer());
  await fs.promises.writeFile(outFile, buffer);
}

/**
 * Main application logic.
 */
async function main() {
  const { animals, sightWords, sentences } = readDatabases(DB_PATH);
  const allText = collectAllText({ animals, sightWords, sentences });
  
  console.log(`\nFound ${allText.length} \nunique text strings to synthesize.`);
  console.log(`Using Eleven Labs Voice ID: ${VOICE_ID}`);

  // 2. Loop and generate
  let created = 0, skipped = 0, failed = 0;
  for (const text of allText) {
   
  const slug = toSlug(text);
    if (!slug) {
        console.log(`⚠️  Skipping empty text.`);
        continue;
    }

    // Handle very long slugs (from facts/sentences) by truncating
    const safeSlug = slug.length > 100 ?
    slug.substring(0, 100) : slug;
    const outFile = path.join(TTS_DIR, `${safeSlug}.mp3`);

    if (fs.existsSync(outFile)) {
      skipped++;
      continue;
    }

    // Synthesize the full, original text
    try {
      console.log(`🎙  TTS: [${text.substring(0, 60)}...]`);
      await synthesizeToFile(text, outFile);
      created++;
      console.log(`   -> Saved ${outFile}`);
      await sleep(RATE_MS);
      // Throttle requests
    } catch (e) {
      failed++;
      console.error(`❌ TTS fail: ${text.substring(0, 60)}... :: ${e.message || e}`);
      
      // Handle the case where Eleven Labs might have a text length limit
      if (e.message && e.message.includes("Text length exceeded")) {
        const longText = text.substring(0, 200);
        console.log(`   -> Retrying with truncated text: [${longText.substring(0, 60)}...]`);
        const longSlug = toSlug(longText);
        const longOutFile = path.join(TTS_DIR, `${longSlug}.mp3`);
        try {
          await synthesizeToFile(longText, longOutFile);
          created++;
          console.log(`   -> Saved truncated ${longOutFile}`);
          await sleep(RATE_MS);
        } catch (e2) {
          console.error(`❌ TTS retry fail: ${e2.message || e2}`);
        }
      }
    }
  }

  console.log(`\nDone. Created: ${created}, Skipped: ${skipped}, Failed: ${failed}`);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
