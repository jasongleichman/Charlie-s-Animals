import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import vm from "vm"; 
import { Buffer } from "buffer"; 

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


async function fetchBuffer(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
  return Buffer.from(await r.arrayBuffer());
}

// --- CENTRALIZED IMAGE URLS (VERIFIED & CORRECTED) ---
const WIKIMEDIA_SOURCES = {
    // Corrected URLs point to common Wikimedia file links that are often more stable.
    "Goliath Bird-Eater": "https://upload.wikimedia.org/wikipedia/commons/f/ff/Goliath_Bird-Eating_Tarantula_at_the_Cincinnati_Zoo.jpg",
    "Glass Lizard": "https://upload.wikimedia.org/wikipedia/commons/0/07/Western_Slender_Glass_Lizard_%28Ophisaurus_attenuatus_attenuatus%29_%2848072177003%29.jpg",
    "Giant Weta": "https://upload.wikimedia.org/wikipedia/commons/2/23/Cook_Strait_Giant_Weta_%285601688959%29.jpg",
    "Kiwi Bird": "https://upload.wikimedia.org/wikipedia/commons/2/22/Kiwifugl.jpg",
    "Thorny Devil": "https://upload.wikimedia.org/wikipedia/commons/e/e3/Thornydevil.jpg",
    "Leafcutter Ant": "https://upload.wikimedia.org/wikipedia/commons/4/4b/Leaf_cutter_ants_arp.jpg",
    "Gibbon": "https://upload.wikimedia.org/wikipedia/commons/c/cf/Gibbon.jpg",
    "Tapir": "https://upload.wikimedia.org/wikipedia/commons/e/e9/Tapir8.JPG",
    "Tawny Frogmouth": "https://upload.wikimedia.org/wikipedia/commons/7/77/Tawny_frogmouth_wholebody444.jpg",
    "Wanderer Butterfly": "https://upload.wikimedia.org/wikipedia/commons/3/3a/%22Monarch%22_Butterfly.jpg",
    "Cuttlefish": "https://upload.wikimedia.org/wikipedia/commons/0/07/Cuttlefish_komodo_large.jpg",
    "Rhinoceros": "https://upload.wikimedia.org/wikipedia/commons/e/e0/Rhino_%28234581759%29.jpeg",
    "African Bush Elephant": "https://upload.wikimedia.org/wikipedia/commons/6/64/African_bush_elephants_%28Loxodonta_africana%29_female_with_six-week-old-baby.jpg",
    "Bison": "https://upload.wikimedia.org/wikipedia/commons/2/23/American_bison_k5680-1.jpg",
    "Grizzly Bear": "https://upload.wikimedia.org/wikipedia/commons/7/7d/Grizzly_Bear_%28Ursus_arctos_ssp.%29.jpg",
    "Humpback Whale": "https://upload.wikimedia.org/wikipedia/commons/b/b3/Humpback_whale_%28Megaptera_novaeangliae%29_with_calf_Moorea_2.jpg",
    "Cheetah": "https://upload.wikimedia.org/wikipedia/commons/d/d4/Cheetah_%28Acinonyx_jubatus%29_female_2.jpg",
    "Orangutan": "https://upload.wikimedia.org/wikipedia/commons/2/21/Orangutan_Kalimantan.jpg",
    "Snow Leopard": "https://upload.wikimedia.org/wikipedia/commons/a/a9/Snow_leopard_portrait.jpg",
    "Blue Jay": "https://upload.wikimedia.org/wikipedia/commons/7/77/Blue_Jay_%28197785051%29.jpeg",
    "Greenland Shark": "https://upload.wikimedia.org/wikipedia/commons/c/c9/Greenland_shark_profile.jpg",
    "Koala": "https://upload.wikimedia.org/wikipedia/commons/1/18/Koala.JPG",
    "Beluga Whale": "https://upload.wikimedia.org/wikipedia/commons/9/90/DSC09177_-_Beluga_Whale_%2836407206543%29.jpg",
    "Golden Poison Frog": "https://upload.wikimedia.org/wikipedia/commons/b/b2/Phyllobates_terribilis_-_Golden_Poison_Frog.jpg",
    "Opossum": "https://upload.wikimedia.org/wikipedia/commons/f/ff/Didelphis_virginiana_2006-03-24.jpg",
    "Sloth": "https://upload.wikimedia.org/wikipedia/commons/e/e0/Bradypus_variegatus_edit.jpg",
    "Sea Otter": "https://upload.wikimedia.org/wikipedia/commons/9/9d/Enhydra_lutris_alaska.jpg",
    "Secretary Bird": "https://upload.wikimedia.org/wikipedia/commons/9/99/Secretary_Bird_%28Sagittarius_serpentarius%29_by_Charles_J._Sharp.jpg",
    "Capuchin Monkey": "https://upload.wikimedia.org/wikipedia/commons/2/29/Capuchin_Monkey_%28Sapajus_apella%29_in_Brazil.jpg",
    "Bumblebee Bat": "https://upload.wikimedia.org/wikipedia/commons/c/c5/Craseonycteris_thonglongyai.jpg",
    "Armadillo": "https://upload.wikimedia.org/wikipedia/commons/6/6f/Nine-banded_Armadillo_%28Dasypus_novemcinctus%29_by_Charles_J._Sharp.jpg",
    "King Cobra": "https://upload.wikimedia.org/wikipedia/commons/3/36/King_Cobra_%28Ophiophagus_hannah%29_in_Thailand.jpg",
    "Wolverine": "https://upload.wikimedia.org/wikipedia/commons/6/63/Gulo_gulo.jpg",
    "Three-Banded Armadillo": "https://upload.wikimedia.org/wikipedia/commons/9/90/Southern_Three-Banded_Armadillo_%28Tolypeutes_matacus%29.jpg",
    "Nine-Banded Armadillo": "https://upload.wikimedia.org/wikipedia/commons/6/6f/Nine-banded_Armadillo_%28Dasypus_novemcinctus%29_by_Charles_J._Sharp.jpg",
    "White-Faced Saki Monkey": "https://upload.wikimedia.org/wikipedia/commons/6/69/White-Faced_Saki_Monkey_%28Pithecia_pithecia%29_male.jpg",
    "Megalodon": "https://upload.wikimedia.org/wikipedia/commons/1/15/Megalodon_size_comparison_with_Great_White_Shark.svg",
    "Tasmanian Tiger": "https://upload.wikimedia.org/wikipedia/commons/a/a2/Thylacine_with_cub.jpg",
    "Dire Wolf": "https://upload.wikimedia.org/wikipedia/commons/8/8c/Dire_Wolf.jpg",
    "Dodo": "https://upload.wikimedia.org/wikipedia/commons/d/d7/Dodo.jpg",
    "Passenger Pigeon": "https://upload.wikimedia.org/wikipedia/commons/2/23/Passenger_pigeon.jpg",
    "Smilodon": "https://upload.wikimedia.org/wikipedia/commons/e/e0/Smilodon_fatalis_reconstruction.jpg",
    "Woolly Mammoth": "https://upload.wikimedia.org/wikipedia/commons/4/4b/Woolly_Mammoth_Restoration.jpg",
    "Quagga": "https://upload.wikimedia.org/wikipedia/commons/c/c9/Quagga_in_London_Zoo.jpg",
    "Great Auk": "https://upload.wikimedia.org/wikipedia/commons/1/1b/Great_Auk.jpg",
    "Steller's Sea Cow": "https://upload.wikimedia.org/wikipedia/commons/f/ff/Hydrodamalis_gigas_skull.jpg",
    "Irish Elk": "https://upload.wikimedia.org/wikipedia/commons/1/15/Irish_elk_Megaloceros_giganteus.jpg",
    "Moa": "https://upload.wikimedia.org/wikipedia/commons/7/7b/Giant_moa.jpg",
    "Aurochs": "https://upload.wikimedia.org/wikipedia/commons/a/ae/Aurochs_reconstruction.jpg",
    "Giant Ground Sloth": "https://upload.wikimedia.org/wikipedia/commons/3/36/Megatherium_americanum_skeleton.jpg",
    "Haast's Eagle": "https://upload.wikimedia.org/wikipedia/commons/2/27/Haast%27s_Eagle_Museum.jpg",
    "Glyptodon": "https://upload.wikimedia.org/wikipedia/commons/a/a9/Glyptodon_sp._by_H.A._Siebert.jpg",
    "Cave Bear": "https://upload.wikimedia.org/wikipedia/commons/c/c5/Ursus_spelaeus_reconstruction.jpg",
    "American Mastodon": "https://upload.wikimedia.org/wikipedia/commons/e/e0/Mastodon_at_the_Royal_BC_Museum.jpg",
    "Arthropleura": "https://upload.wikimedia.org/wikipedia/commons/8/87/Arthropleura_Reconstruction.jpg",
    "Titanoboa": "https://upload.wikimedia.org/wikipedia/commons/4/4e/Titanoboa_cerrejonensis_model.jpg",
    "Spinosaurus": "https://upload.wikimedia.org/wikipedia/commons/3/36/Spinosaurus_aegyptiacus_reconstruction_by_Matt_Martyniuk.jpg",
    "Dunkleosteus": "https://upload.wikimedia.org/wikipedia/commons/0/07/Dunkleosteus_terrelli.jpg",
    "Meganeura": "https://upload.wikimedia.org/wikipedia/commons/1/1d/Meganeura_monospora_restoration.jpg",
    "Hallucigenia": "https://upload.wikimedia.org/wikipedia/commons/7/77/Hallucigenia_restoration.jpg",
    "Anomalocaris": "https://upload.wikimedia.org/wikipedia/commons/1/1c/Anomalocaris_canadensis_restoration.jpg",
    "Giant Armadillo": "https://upload.wikimedia.org/wikipedia/commons/b/b2/Priodontes_maximus.jpg",
};

// --------- main ----------
async function main() {
  const args = parseArgs();
  const repoRoot = path.resolve(__dirname, ".."); // scripts/.. -> repo root
  const outDir = path.resolve(repoRoot, args.out);
  const overwrite = args.overwrite === 'true' || args.overwrite === true;
  const imagesDir = path.join(outDir, "images");

  // ensure folders
  fs.mkdirSync(outDir, { recursive: true });
  fs.mkdirSync(imagesDir, { recursive: true });

  // --- Parse data from app-data.js (robust parsing using VM) ---
  const dataPath = path.join(path.dirname(args.db), 'assets', 'app-data.js'); // Assuming docs/index.html -> docs/assets/app-data.js
  if (!fs.existsSync(dataPath)) throw new Error(`Data file not found at expected path: ${dataPath}`);

  const dataContent = fs.readFileSync(dataPath, "utf8");
  
  // Extract ANIMAL_DATABASE content by finding the raw array string
  const animalMatch = dataContent.match(/window\.ANIMAL_DATABASE\s*=\s*(\[[^]*?\]);/s);
  if (!animalMatch) throw new Error("Could not find window.ANIMAL_DATABASE in the script.");

  // Use vm to safely evaluate the array literal (replacing backticks with quotes where possible for compatibility)
  const animalListString = animalMatch[1]
      .replace(/`([^`]*)`/gs, (match, p1) => `'${p1.replace(/'/g, "\\'")}'`) 
      .replace(/window\.(ANIMAL_DATABASE|sightWordsData|sentencesData|VIDEO_DATABASE)/g, '$1'); 

  const sandbox = { ANIMAL_DATABASE: [], Array, Object, String };
  vm.createContext(sandbox);
  // Execute the array assignment in the sandboxed context
  vm.runInContext('ANIMAL_DATABASE = ' + animalListString, sandbox);
  const animals = sandbox.ANIMAL_DATABASE;

  const names = new Set();
  animals.forEach(a => {
      if (a.name) names.add(a.name.trim());
  });
  
  const all = Array.from(names);
  console.log(`Found ${all.length} animals in ${path.basename(dataPath)}`);

  // build the images map for files that already exist
  const imagesMap = {};
  let existing = 0;
  let missing = 0;

  for (const name of all) {
    const slug = slugify(name);
    const rel = `images/${slug}.webp`;
    const abs = path.join(imagesDir, `${slug}.webp`);

    // 1. Check for local file
    if (fs.existsSync(abs)) {
      imagesMap[slug] = `./assets/${rel}`;
      console.log(`✅ exists: ${name}`);
      existing++;
      if (!overwrite) {
        continue; // Skip download if file exists and we are not overwriting
      }
    }

    // 2. Attempt to download remote image (using centralized map)
    const imageUrl = WIKIMEDIA_SOURCES[name] || null; 

    if (imageUrl && /^https?:\/\//i.test(imageUrl)) {
        try {
            const buf = await fetchBuffer(imageUrl);
            await fs.promises.writeFile(abs, buf);
            imagesMap[slug] = `./assets/${rel}`;
            console.log(`🖼️ downloaded: ${name}`);
            existing++;
        } catch (e) {
            // Log 404/Download Failure but do not halt the script
            console.log(`🚫 no-image (download failed): ${name} - ${e.message}`);
            missing++;
        }
    } else {
        console.log(`🚫 no-image (url missing in script): ${name}`);
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

main().catch(e => {
  console.error(e);
  process.exit(1);
});
