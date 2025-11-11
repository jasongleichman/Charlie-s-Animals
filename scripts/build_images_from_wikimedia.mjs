// ESM script: builds a manifest from images that already exist in docs/assets/images/
// It does NOT download images; it only maps what's present on disk.

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

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
  const dbPath = path.resolve(repoRoot, args.db);
  const outDir = path.resolve(repoRoot, args.out);
  const imagesDir = path.join(outDir, "images");

  // ensure folders
  fs.mkdirSync(outDir, { recursive: true });
  fs.mkdirSync(imagesDir, { recursive: true });

  // read index.html and pull animal names
  const html = fs.readFileSync(dbPath, "utf-8");
  // matches: name: 'Fennec Fox'  OR name: "Fennec Fox"
  const re = /name\s*:\s*['"]([^'"]+)['"]/g;
  const names = new Set();
  let m;
  while ((m = re.exec(html))) {
    names.add(m[1].trim());
  }
  const all = Array.from(names);
  console.log(`Found ${all.length} animals in ${args.db}`);

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
