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
 * [FIXED] Extracts all JS databases from the app-data.js file
 */
function readDatabases(dataPath) {
  console.log(`Reading data from: ${dataPath}`);
const jsContent = fs.readFileSync(dataPath, "utf8");
  const ctx = {}; 
  vm.createContext(ctx);

  // FIX: Change regex to look for window.ANIMAL_DATABASE
  const animalMatch = jsContent.match(/window\.ANIMAL_DATABASE\s*=\s*(\[[\s\S]*?\]);/);
  // FIX: Change regex to look for window.sightWordsData
  const sightMatch = jsContent.match(/window\.sightWordsData\s*=\s*(\[[\s\S]*?\]);/);
  // FIX: Change regex to look for window.sentencesData
  const sentenceMatch = jsContent.match(/window\.sentencesData\s*=\s*(\[[\s\S]*?\]);/);

  if (!animalMatch) throw new Error(`Could not find ANIMAL_DATABASE in ${dataPath}`);
  if (!sightMatch) throw new Error(`Could not find sightWordsData in ${dataPath}`);
  if (!sentenceMatch) throw new Error(`Could not find sentencesData in ${dataPath}`);
  const animals = vm.runInContext("(" + animalMatch[1] + ")", ctx);
  const sightWords = vm.runInContext("(" + sightMatch[1] + ")", ctx);
  const sentences = vm.runInContext("(" + sentenceMatch[1] + ")", ctx);
  return { animals, sightWords, sentences };
}

/**
 * [NEW] Collects all unique text strings from all databases
 */
function collectAllText({ animals, sightWords, sentences }) {
  const textSet = new Set();
// 1. Animal Names
  console.log(`... collecting ${animals.length} animal names`);
  animals.forEach(animal => {
    if (animal.name) textSet.add(animal.name);
  });
 
  // 2. Animal Facts
  let factCount = 0;
  animals.forEach(animal => {
    if (animal.facts && Array.isArray(animal.facts)) {
      animal.facts.forEach(fact => {
        if (fact) {
          textSet.add(fact);
          factCount++;
        }
      });
    }
  });
  console.log(`... collecting ${factCount} animal facts`);

  // 3. Sight Words
  console.log(`... collecting ${sightWords.length} sight words`);
  sightWords.forEach(item => {
    if (item.word) textSet.add(item.word);
  });
  
  // 4. Sentences
  console.log(`... collecting ${sentences.length} sentences`);
  sentences.forEach(item => {
    if (item.sentence) textSet.add(item.sentence);
  });

  return Array.from(textSet);
}


// -------- AWS POLLY --------
const REGION = process.env.AWS_REGION || "us-east-1";
const polly = new PollyClient({ region: REGION });
async function synthesizeToFile(text, outFile) {
  const cmd = new SynthesizeSpeechCommand({
    OutputFormat: "mp3",
    Text: text,
    VoiceId: VOICE_ID,
    Engine: "neural",         // use "standard" to avoid neural-engine region errors
    LanguageCode: "en-US",      // clear American English
    SampleRate: "22050"
  });
  const { AudioStream } = await polly.send(cmd);
  if (!AudioStream) {
    throw new Error("No AudioStream returned from Polly.");
  }

  // Write the stream to a file
  const writer = fs.createWriteStream(outFile);
  for await (const chunk of AudioStream) {
    writer.write(chunk);
  }
  writer.end();
  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
    AudioStream.on('error', reject);
  });
}

// -------- MAIN --------
(async () => {
  console.log("📦 Args:", { db: DB_PATH, out: OUT_ROOT, rate: RATE_MS, voice: VOICE_ID, region: REGION });

  // --- FIX: Read from app-data.js instead of index.html ---
  const DATA_FILE_PATH = path.join(OUT_ROOT, "app-data.js");
  
  if (!fs.existsSync(DATA_FILE_PATH)) {
    console.error(`❌ Data file not found: ${DATA_FILE_PATH}`);
    process.exit(1);
  }

  // 1. Get all data
  // Pass the correct data file path to the function
  const { animals, sightWords, sentences } = readDatabases(DATA_FILE_PATH);
  const allText = collectAllText({ animals, sightWords, sentences });
  
  console.log(`\nFound ${allText.length} 
unique text strings to synthesize.`);

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
         console.warn(`   ---> This text was too long for Polly. You may need to shorten it in app-data.js.`);
}
      // Don't stop the whole script, just skip this one
    }
  }

  console.log(`\nDone. Created: ${created}, Skipped: ${skipped}, Failed: ${failed}`);
  process.exit(0);
})();
