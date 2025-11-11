#!/usr/bin/env node
/**
 * Diff-only image builder:
 * - Parses docs/index.html to get animal names (looks for ANIMAL_DATABASE)
 * - Loads ./docs/assets/manifest.json (creates if missing)
 * - Computes slug -> image path "./docs/assets/images/<slug>.webp"
 * - If manifest already has the slug AND the file exists, skip
 * - Otherwise, tries to fetch a Wikimedia image and writes it
 * - Updates manifest.json only for newly-added entries
 *
 * NOTE: This example uses a placeholder strategy for Wikimedia.
 * Swap in your actual Wikimedia fetcher if you already have one.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import https from "https";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REPO_ROOT = path.resolve(__dirname, "..");
const DOCS = path.resolve(REPO_ROOT, "docs");
const ASSETS = path.resolve(DOCS, "assets");
const IMAGES_DIR = path.resolve(ASSETS, "images");
const MANIFEST = path.resolve(ASSETS, "manifest.json");
const INDEX_HTML = path.resolve(DOCS, "index.html");

function slugify(s) {
  return (s || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function readIndexAnimals() {
  const html = fs.readFileSync(INDEX_HTML, "utf8");
  // very simple extractor: looks for ANIMAL_DATABASE = [ { name: '...''
  const names = [];
  const re = /name\s*:\s*['"]([^'"]+)['"]/g;
  let m;
  while ((m = re.exec(html))) names.push(m[1]);
  return Array.from(new Set(names));
}

function readJsonSafe(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return fallback;
  }
}

function ensureDirs() {
  if (!fs.existsSync(ASSETS)) fs.mkdirSync(ASSETS, { recursive: true });
  if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          // follow redirect once
          httpsGet(res.headers.location).then(resolve).catch(reject);
          return;
        }
        if (res.statusCode !== 200) return reject(new Error("HTTP " + res.statusCode));
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks)));
      })
      .on("error", reject);
  });
}

// Very naive Wikimedia picker (replace with your real one if you have it)
async function fetchWikimediaImage(animal) {
  // fallback image (tiny transparent) if you don't want network fetch:
  // return Buffer.from("UklGRiIAAABXRUJQVlA4WAoAAAAQAAAAAQAA...", "base64");
  const url = "https://upload.wikimedia.org/wikipedia/commons/7/70/Example.png"; // placeholder
  return httpsGet(url);
}

async function main() {
  ensureDirs();

  const animals = readIndexAnimals();
  console.log(`Found ${animals.length} animals in docs/index.html`);

  const manifest = readJsonSafe(MANIFEST, { images: {} });

  const toCreate = [];
  for (const name of animals) {
    const slug = slugify(name);
    const relPath = `./assets/images/${slug}.webp`;
    const absPath = path.resolve(DOCS, relPath.replace("./", ""));
    const inManifest = !!manifest.images[slug];
    const onDisk = fs.existsSync(absPath);
    if (inManifest && onDisk) {
      console.log(`✅ exists: ${name}`);
    } else {
      console.log(`➕ missing: ${name}`);
      toCreate.push({ name, slug, relPath, absPath });
    }
  }

  if (toCreate.length === 0) {
    console.log("No new images needed. Exiting.");
    return;
  }

  let created = 0;
  for (const item of toCreate) {
    try {
      const buf = await fetchWikimediaImage(item.name);
      fs.writeFileSync(item.absPath, buf);
      manifest.images[item.slug] = item.relPath;
      created++;
    } catch (e) {
      console.error(`❌ image fail: ${item.name} :: ${e.message}`);
    }
  }

  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));
  console.log(`📄 updated: ${path.relative(REPO_ROOT, MANIFEST)} (added ${created})`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
