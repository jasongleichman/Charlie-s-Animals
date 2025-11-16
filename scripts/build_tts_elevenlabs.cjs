const fs = require("fs");
const path = require("path");
const vm = require("vm"); 
const { Buffer } = require("buffer"); 
const nodeFetch = require('node-fetch');
const fetch = nodeFetch.default || nodeFetch; 

// -------- VOICE CONFIGURATION (Using specific Voice IDs) --------
const VOICE_SIGHT_WORDS_ID = "QIhD5ivPGEoYZQDocuHI"; // Adam - Engineering Professor
const VOICE_ANIMAL_FACTS_ID = "j9jfwdrw7BRfcR43Qohk"; // Frederick Surrey
const MODEL_ID = "eleven_multilingual_v2"; 

// -------- CLI ARGS --------
function arg(key, def = null) {
  const hit = process.argv.find(a => a.startsWith(`--${key}=`));
  return hit ?
  hit.split("=").slice(1).join("=") : def;
}
const DB_PATH   = arg("db", "docs/index.html");
const OUT_ROOT  = arg("out", "./docs/assets");
const RATE_MS   = parseInt(arg("rate", "1000"), 10) || 1000;
const SCOPE_MODE = arg("scope", "all"); 

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
 * Gathers unique text strings based on SCOPE_MODE and assigns a voice.
 */
function collectAllTextWithVoice({ animals, sightWords, sentences }) {
  const textMap = new Map();

  // Helper function to deduplicate based on the slug source (w.correct)
  const addText = (text, slug_source, voiceId) => {
    // FIX: Use the slug as the unique key in the map
    const key = toSlug(slug_source);
    if (typeof text === 'string' && text.trim().length > 0) {
        if (!textMap.has(key)) {
            textMap.set(key, { text, slug_source: slug_source, voiceId });
        }
    }
  };

  if (SCOPE_MODE === 'facts' || SCOPE_MODE === 'all') {
    // 1. Assign Frederick (ANIMAL_VOICE_ID) to Animal Names and Facts
    animals.forEach(a => {
      addText(a.name, a.name, VOICE_ANIMAL_FACTS_ID);
      (a.facts || []).forEach(f => addText(f, f, VOICE_ANIMAL_FACTS_ID));
    });
  }

  if (SCOPE_MODE === 'words' || SCOPE_MODE === 'all') {
    // 2. Assign Adam (SIGHT_WORD_VOICE_ID) to Sight Words and Sentences
    // Sight Words: Speak w.word (e.g., "The word is, a"), but slug by w.correct (e.g., "a")
    sightWords.forEach(w => addText(w.word, w.correct, VOICE_SIGHT_WORDS_ID));
    
    // Sentences: Text and slug_source are the same (the full sentence)
    sentences.forEach(s => addText(s.sentence, s.sentence, VOICE_SIGHT_WORDS_ID));
  }
  
  return Array.from(textMap.values());
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
  
  console.log(`\nFound ${allTextWithVoice.length} \nunique text strings to synthesize (Scope: ${SCOPE_MODE}).`);
  console.log(`Voice Map: Facts/Names=${VOICE_ANIMAL_FACTS_ID}, Words/Sentences=${VOICE_SIGHT_WORDS_ID}`);

  let created = 0, skipped = 0, failed = 0;
  // FIX: Destructure the new properties { text, slug_source, voiceId }
  for (const { text, slug_source, voiceId } of allTextWithVoice) {
   
    // FIX: Generate slug from the desired slug_source (i.e., 'a' for sight words)
    const slug = toSlug(slug_source); 
    if (!slug) continue;

    const safeSlug = slug.length > 100 ? slug.substring(0, 100) : slug;
    const outFile = path.join(TTS_DIR, `${safeSlug}.mp3`);

    if (fs.existsSync(outFile)) {
      skipped++;
      continue;
    }

    try {
      console.log(`🎙  TTS (ID: ${voiceId.substring(0, 4)}..., File: ${safeSlug}): [${text.substring(0, 60)}...]`);
      await synthesizeToFile(text, outFile, voiceId);
      created++;
      console.log(`   -> Saved ${outFile}`);
      await sleep(RATE_MS);
    } catch (e) {
      failed++;
      console.error(`❌ TTS fail (ID: ${voiceId.substring(0, 4)}...): ${e.message || e}`);
      
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
