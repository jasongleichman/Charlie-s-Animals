const fs = require("fs");
const path = require("path");
const vm = require("vm"); 
const { Buffer } = require("buffer"); 
// FIX: Require the module and correctly resolve the fetch function for CJS
const nodeFetch = require('node-fetch');
const fetch = nodeFetch.default || nodeFetch; 

// -------- VOICE CONFIGURATION (Using specific Voice IDs) --------
const VOICE_SIGHT_WORDS_ID = "qyFhaJEAwHR0eYLCmlUT"; // Adam - Engineering Professor
const VOICE_ANIMAL_FACTS_ID = "qyFhaJEAwHR0eYLCmlUT"; // Frederick Surrey
const MODEL_ID = "eleven_monolingual_v1"; // Recommended stable model

// -------- CLI ARGS --------
function arg(key, def = null) {
  const hit = process.argv.find(a => a.startsWith(`--${key}=`));
  return hit ?
  hit.split("=").slice(1).join("=") : def;
}
const DB_PATH   = arg("db", "docs/index.html");
const OUT_ROOT  = arg("out", "./docs/assets");
const RATE_MS   = parseInt(arg("rate", "1000"), 10) || 1000;

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
  vm.runInContext(jsContent, sandbox);

  const animals = sandbox.window.ANIMAL_DATABASE;
  const sightWords = sandbox.window.sightWordsData;
  const sentences = sandbox.window.sentencesData;

  return { animals, sightWords, sentences };
}

/**
 * Gathers all unique text strings and assigns a voice based on source.
 */
function collectAllTextWithVoice({ animals, sightWords, sentences }) {
  const textMap = new Map();

  const addText = (text, voiceId) => {
    if (typeof text === 'string' && text.trim().length > 0) {
        // If a duplicate exists, keep the existing voice (prevents overriding names/facts)
        if (!textMap.has(text)) {
            textMap.set(text, voiceId);
        }
    }
  };

  // 1. Assign Frederick (VOICE_ANIMAL_FACTS_ID) to Animal Names and Facts
  animals.forEach(a => {
    addText(a.name, VOICE_ANIMAL_FACTS_ID);
    (a.facts || []).forEach(f => addText(f, VOICE_ANIMAL_FACTS_ID));
  });

  // 2. Assign Adam (VOICE_SIGHT_WORDS_ID) to Sight Words and Sentences
  sightWords.forEach(w => addText(w.word, VOICE_SIGHT_WORDS_ID));
  sentences.forEach(s => addText(s.sentence, VOICE_SIGHT_WORDS_ID));

  return Array.from(textMap.entries()).map(([text, voiceId]) => ({ text, voiceId }));
}


/**
 * Synthesize text using Eleven Labs and save to a file.
 */
async function synthesizeToFile(text, outFile, voiceId) {
  const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
  if (!ELEVENLABS_API_KEY) {
      throw new Error("ELEVENLABS_API_KEY is not set.");
  }
  
  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
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
    throw new Error(`Eleven Labs API failed with status ${response.status} (Voice ID: ${voiceId}): ${errorText}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  await fs.promises.writeFile(outFile, buffer);
}

/**
 * Main application logic.
 */
async function main() {
  const { animals, sightWords, sentences } = readDatabases(DB_PATH);
  const allTextWithVoice = collectAllTextWithVoice({ animals, sightWords, sentences });
  
  console.log(`\nFound ${allTextWithVoice.length} \nunique text strings to synthesize.`);
  console.log(`Voice Map: Facts/Names=${VOICE_ANIMAL_FACTS_ID}, Words/Sentences=${VOICE_SIGHT_WORDS_ID}`);

  let created = 0, skipped = 0, failed = 0;
  for (const { text, voiceId } of allTextWithVoice) {
   
    const slug = toSlug(text);
    if (!slug) continue;

    const safeSlug = slug.length > 100 ? slug.substring(0, 100) : slug;
    const outFile = path.join(TTS_DIR, `${safeSlug}.mp3`);

    if (fs.existsSync(outFile)) {
      skipped++;
      continue;
    }

    try {
      console.log(`🎙  TTS (ID: ${voiceId.substring(0, 4)}...): [${text.substring(0, 60)}...]`);
      await synthesizeToFile(text, outFile, voiceId);
      created++;
      console.log(`   -> Saved ${outFile}`);
      await sleep(RATE_MS);
    } catch (e) {
      failed++;
      console.error(`❌ TTS fail (ID: ${voiceId.substring(0, 4)}...): ${text.substring(0, 60)}... :: ${e.message || e}`);
      
      // Attempt to handle length limit by truncation
      if (e.message && e.message.includes("Text length exceeded")) {
        const longText = text.substring(0, 200);
        console.log(`   -> Retrying with truncated text: [${longText.substring(0, 60)}...]`);
        const longSlug = toSlug(longText);
        const longOutFile = path.join(TTS_DIR, `${longSlug}.mp3`);
        try {
          await synthesizeToFile(longText, longOutFile, voiceId);
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
