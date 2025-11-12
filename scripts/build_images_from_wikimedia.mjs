import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import vm from "vm"; // <-- NEW: Import vm for parsing JS data

// --------- helpers ----------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function slugify(name) {
  return (name || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseArgs() {
  // allow: --db=docs/index.html --out=./docs/assets
  const args = { db: "docs/index.html", out: "./docs/assets" };
  for (const a of process.argv.slice(2)) {
    const m = a.match(/^--([^=]+)=(.*)$/);
    if (m) args[m[1]] = m[2];
  }
  return args;
}

// --------- main ----------
async function main() {
  const args = parseArgs();
  const repoRoot = path.resolve(__dirname, ".."); // scripts/.. -> repo root
  const outDir = path.resolve(repoRoot, args.out);
  const imagesDir = path.join(outDir, "images");

  // ensure folders
  fs.mkdirSync(outDir, { recursive: true });
  fs.mkdirSync(imagesDir, { recursive: true });

  // --- FIX 1: Point to the new data file location ---
  const dataPath = path.join(outDir, "app-data.js");
  if (!fs.existsSync(dataPath)) {
      throw new Error(`Data file not found at expected path: ${dataPath}`);
  }

  // --- FIX 2: Read and parse the JS file to get animal names ---
  const jsContent = fs.readFileSync(dataPath, "utf-8");
  
  // FIX: Look for 'window.ANIMAL_DATABASE ='
  const animalMatch = jsContent.match(/window\.ANIMAL_DATABASE\s*=\s*(\[[\s\S]*?\]);/);
  if (!animalMatch) {
      throw new Error("Could not find ANIMAL_DATABASE in docs/assets/app-data.js");
  }
  
  const ctx = {}; 
  vm.createContext(ctx);
  // Run the extracted array string in context to get the object
  const animals = vm.runInContext("(" + animalMatch[1] + ")", ctx);

  const names = new Set();
  animals.forEach(a => {
      if (a.name) names.add(a.name.trim());
  });
  
  const all = Array.from(names);
  console.log(`Found ${all.length} animals in docs/assets/app-data.js`);
  // --- END FIX ---

  // build the images map for files that already exist
  const imagesMap = {};
  let existing = 0;
  let missing = 0;

  for (const name of all) {
    const slug = slugify(name);
    const rel = `images/${slug}.webp`;
    const abs = path.join(outDir, rel);
    if (fs.existsSync(abs)) {
      imagesMap[slug] = `./assets/${rel}`;
      console.log(`✅ exists: ${name}`);
      existing++;
    } else {
      console.log(`🚫 no-image: ${name}`);
      missing++;
    }
  }

  // write docs/images_map.json (for debugging/inspection)
  const imagesMapPath = path.resolve(repoRoot, "docs/images_map.json");
  fs.writeFileSync(imagesMapPath, JSON.stringify(imagesMap, null, 2), "utf-8");

  // write docs/assets/manifest.json used by the app
  const manifestPath = path.join(outDir, "manifest.json");
  fs.writeFileSync(manifestPath, JSON.stringify({ images: imagesMap }, null, 2), "utf-8");

  console.log(`📄 wrote: ${path.relative(repoRoot, imagesMapPath)}`);
  console.log(`📄 wrote: ${path.relative(repoRoot, manifestPath)}`);
  console.log(`Done. Existing: ${existing}, Missing: ${missing}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
