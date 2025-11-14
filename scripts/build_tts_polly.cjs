const fs = require("fs");
const path = require("path");
const vm = require("vm"); // Added to read JS variables
const { PollyClient, SynthesizeSpeechCommand } = require("@aws-sdk/client-polly");
// -------- CLI ARGS --------
function arg(key, def = null) {
  const hit = process.argv.find(a => a.startsWith(`--${key}=`));
  return hit ?
  hit.split("=").slice(1).join("=") : def;
}
const DB_PATH   = arg("db", "docs/index.html");
const OUT_ROOT  = arg("out", "./docs/assets");
const RATE_MS   = parseInt(arg("rate", "1000"), 10) || 1000;
const VOICE_ID  = arg("voice", "Joanna");
// e.g., Matthew, Joanna, Salli, etc.

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
  // console.log(`Reading data from: ${dataPath}`);
  
  // Function to extract a global variable from the JS file
  function getJsVariable(jsContent, varName) {
    const match = jsContent.match(new RegExp(`window\\.${varName}\\s*=\\s*(\\[[\\s\\S]*?\\]);`));
    if (!match) return [];
    try {
        // Use a temporary context to evaluate the array literal safely
        return vm.runInContext(`(${match[1]})`, {});
    } catch(e) {
        console.error(`Failed to parse JS variable ${varName}:`, e.message);
        return [];
    }
  }

  // NOTE: Assuming the database file is app-data.js (or equivalent source)
  const appDataPath = path.join(path.dirname(dataPath), 'assets', 'app-data.js');

  let jsContent = '';
  if (fs.existsSync(appDataPath)) {
      jsContent = fs.readFileSync(appDataPath, "utf8");
  } else {
      throw new Error(`Data file not found at expected path: ${appDataPath}`);
  }

  const animals = getJsVariable(jsContent, "ANIMAL_DATABASE");
  const sightWords = getJsVariable(jsContent, "sightWordsData");
  const sentences = getJsVariable(jsContent, "sentencesData");

  return { animals, sightWords, sentences };
}

/**
 * Gathers all unique text strings that need TTS.
 */
function collectAllText({ animals, sightWords, sentences }) {
  const textSet = new Set();

  animals.forEach(a => {
    if (a.name) textSet.add(a.name);
    (a.facts || []).forEach(f => textSet.add(f));
  });

  sightWords.forEach(w => textSet.add(w.word));
  sentences.forEach(s => textSet.add(s.sentence));

  return Array.from(textSet);
}


/**
 * Synthesize text using AWS Polly and save to a file.
 */
async function synthesizeToFile(text, outFile) {
  const polly = new PollyClient({ 
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
  });

  const params = {
    Text: text,
    OutputFormat: "mp3",
    VoiceId: VOICE_ID,
    Engine: "standard", // default engine
  };

  const command = new SynthesizeSpeechCommand(params);
  const response = await polly.send(command);

  if (response.AudioStream) {
    const buffer = Buffer.from(await response.AudioStream.transformToByteArray());
    await fs.promises.writeFile(outFile, buffer);
  } else {
    throw new Error("Polly API returned no audio stream.");
  }
}

/**
 * Main application logic.
 */
async function main() {
  const { animals, sightWords, sentences } = readDatabases(DB_PATH);
  const allText = collectAllText({ animals, sightWords, sentences });
  
  console.log(`\nFound ${allText.length} \nunique text strings to synthesize.`);

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
      // console.log(`✅ exists: ${text.substring(0, 50)}...`);
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
      if (e.message && e.message.includes("TextLengthExceededException")) {
        // If text is too long, try truncating and re-slugging
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
