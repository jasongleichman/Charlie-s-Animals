import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import vm from 'vm';
import { Buffer } from 'buffer';
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
  "Goliath Bird-Eater": "https://upload.wikimedia.org/wikipedia/commons/0/0a/Goliath_birdeater.jpg",
  "Glass Lizard": "https://upload.wikimedia.org/wikipedia/commons/9/9e/Slender_glass_lizard.jpg",
  "Giant Weta": "https://upload.wikimedia.org/wikipedia/commons/7/73/Giant_weta_tucked_into_a_hole_in_a_tree_%28Tiritiri_Matangi%29.jpg",
  "Kiwi Bird": "https://upload.wikimedia.org/wikipedia/commons/3/3e/EB1911_-_Kiwi.jpg",
  "Thorny Devil": "https://upload.wikimedia.org/wikipedia/commons/9/9e/Thornydevil.jpg",
  "Leafcutter Ant": "https://upload.wikimedia.org/wikipedia/commons/9/9e/Leafcutter_ant_soldier_%2881794%29.jpg",
  "Gibbon": "https://upload.wikimedia.org/wikipedia/commons/c/c5/White-Handed_Gibbon_%28Hylobates_lar%29_%282854166549%29.jpg",
  "Tapir": "https://upload.wikimedia.org/wikipedia/commons/9/9e/Baird%27s_tapir_mother_with_baby_%2892151%29.jpg",
  "Tawny Frogmouth": "https://upload.wikimedia.org/wikipedia/commons/c/cc/Tawny_Frogmouth_%28Podargus_strigoides%29_%282854232223%29.jpg",
  "Wanderer Butterfly": "https://upload.wikimedia.org/wikipedia/commons/3/30/Monarch_Butterfly.%28Danaus_plexippus%29_%2814256022010%29.jpg",
  "Cuttlefish": "https://upload.wikimedia.org/wikipedia/commons/9/91/Cuttlefish_%285381129320%29.jpg",
  "Rhinoceros": "https://upload.wikimedia.org/wikipedia/commons/c/c8/White_Rhinoceros_%289114161448%29.jpg",
  "African Bush Elephant": "https://upload.wikimedia.org/wikipedia/commons/3/37/African_Bush_Elephant.jpg",
  "Bison": "https://upload.wikimedia.org/wikipedia/commons/8/8e/American_bison_k5680-1.jpg",
  "Grizzly Bear": "https://upload.wikimedia.org/wikipedia/commons/9/93/Grizzly_bear_brown_bear.jpg",
  "Humpback Whale": "https://upload.wikimedia.org/wikipedia/commons/f/fb/Humpback_Whale_Underwater_%2837209287981%29.jpg",
  "Cheetah": "https://upload.wikimedia.org/wikipedia/commons/5/54/Cheetah.JPG",
  "Orangutan": "https://upload.wikimedia.org/wikipedia/commons/8/8a/Orangutan_01.jpg",
  "Snow Leopard": "https://upload.wikimedia.org/wikipedia/commons/1/10/The_endangered_Snow_Leopard_%2813310647514%29.jpg",
  "Blue Jay": "https://upload.wikimedia.org/wikipedia/commons/9/9e/Cyanocitta-cristata-004.jpg",
  "Greenland Shark": "https://upload.wikimedia.org/wikipedia/commons/3/39/Greenland_shark_profile.jpg",
  "Koala": "https://upload.wikimedia.org/wikipedia/commons/5/5e/Koala_in_Zoo_Duisburg.jpg",
  "Beluga Whale": "https://upload.wikimedia.org/wikipedia/commons/3/3e/Beluga_Whale_Kissing_its_trainer.jpg",
  "Golden Poison Frog": "https://upload.wikimedia.org/wikipedia/commons/e/ed/Golden_Poison_Dart_Frog_1_%2814412444930%29.jpg",
  "Opossum": "https://upload.wikimedia.org/wikipedia/commons/2/27/Opossum_2.jpg",
  "Sloth": "https://upload.wikimedia.org/wikipedia/commons/3/3e/Bradypus.jpg",
  "Sea Otter": "https://upload.wikimedia.org/wikipedia/commons/0/0a/Sea-otter-morro-bay_13.jpg",
  "Secretary Bird": "https://upload.wikimedia.org/wikipedia/commons/3/3e/Secretary_bird_Mara_for_WC.jpg",
  "Capuchin Monkey": "https://upload.wikimedia.org/wikipedia/commons/9/9e/Capuchin_monkey_in_cage_at_zoo%2C_Chisinau_Zoo.tif",
  "Bumblebee Bat": "https://upload.wikimedia.org/wikipedia/commons/5/5a/Craseonycteris_thonglongyai.png",
  "Armadillo": "https://upload.wikimedia.org/wikipedia/commons/4/4e/Six-banded_armadillo_%28Euphractus_sexcinctus%29.JPG",
  "King Cobra": "https://upload.wikimedia.org/wikipedia/commons/9/9e/King_cobra_face.jpg",
  "Wolverine": "https://upload.wikimedia.org/wikipedia/commons/2/2b/Wolverine_%28Gulo_gulo%29%2C_Korkeasaari.JPG",
  "Three-Banded Armadillo": "https://upload.wikimedia.org/wikipedia/commons/f/fb/Three_Banded_Armadillo.jpg",
  "Nine-Banded Armadillo": "https://upload.wikimedia.org/wikipedia/commons/b/b4/Nine-banded_Armadillo.jpg",
  "White-Faced Saki Monkey": "https://upload.wikimedia.org/wikipedia/commons/4/48/Male_White_Face_Saki_at_Chester_Zoo_%2815155867794%29.jpg",
  "Megalodon": "https://upload.wikimedia.org/wikipedia/commons/9/9e/Carcharocles_megalodon_%28Agassiz%2C_1843%29_3.jpg",
  "Tasmanian Tiger": "https://upload.wikimedia.org/wikipedia/commons/5/5e/Tasmanian_Tiger_%28Thylacinus_cynocephalus%29.png",
  "Dire Wolf": "https://upload.wikimedia.org/wikipedia/commons/3/3e/Perot_Museum_dire_wolf_2.jpg",
  "Dodo": "https://upload.wikimedia.org/wikipedia/commons/2/2b/Dronte_dodo_Raphus_cucullatus.jpg",
  "Passenger Pigeon": "https://upload.wikimedia.org/wikipedia/commons/3/34/Ectopistes_migratorius_%28passenger_pigeon%29_1.jpg",
  "Smilodon": "https://upload.wikimedia.org/wikipedia/commons/0/0a/Cr%C3%A2ne_de_smilodon_expos%C3%A9_au_Museu_de_Zoologia_da_Universidade_de_S%C3%A3o_Paulo%2C_Brazil.jpg",
  "Woolly Mammoth": "https://upload.wikimedia.org/wikipedia/commons/6/65/Woolly_mammoth.jpg",
  "Quagga": "https://upload.wikimedia.org/wikipedia/commons/2/2b/Equus_quagga_quagga_lithograph.jpg",
  "Great Auk": "https://upload.wikimedia.org/wikipedia/commons/e/e1/341_Great_Auk.jpg",
  "Steller's Sea Cow": "https://upload.wikimedia.org/wikipedia/commons/1/13/Steller%27s_Sea_Cow.jpg",
  "Irish Elk": "https://upload.wikimedia.org/wikipedia/commons/3/3b/Megaloceros_giganteus_Irish_elk_skeleton_%28Pleistocene%29_%2815443938885%29.jpg",
  "Moa": "https://upload.wikimedia.org/wikipedia/commons/2/28/Giant_moa.jpg",
  "Aurochs": "https://upload.wikimedia.org/wikipedia/commons/a/ae/Aurochs_reconstruction.jpg",
  "Giant Ground Sloth": "https://upload.wikimedia.org/wikipedia/commons/2/21/WLA_hmns_Giant_ground_sloth.jpg",
  "Haast's Eagle": "https://upload.wikimedia.org/wikipedia/commons/0/0f/Giant_Haasts_eagle_attacking_New_Zealand_moa.jpg",
  "Glyptodon": "https://upload.wikimedia.org/wikipedia/commons/0/0a/Glyptodon_clavipes_01.jpg",
  "Cave Bear": "https://upload.wikimedia.org/wikipedia/commons/3/35/Ursus_spelaeus_cave_bear.jpg",
  "American Mastodon": "https://upload.wikimedia.org/wikipedia/commons/9/9e/American_Mastodon_%28Mammut_americanum%29.jpg",
  "Arthropleura": "https://upload.wikimedia.org/wikipedia/commons/8/8e/Arthropleura_Reconstruction.jpg",
  "Titanoboa": "https://upload.wikimedia.org/wikipedia/commons/3/3e/Titanoboa_par_Florent_Riv%C3%A8re.jpg",
  "Spinosaurus": "https://upload.wikimedia.org/wikipedia/commons/9/9e/Spinosaurus_aegyptiacus_3.png",
  "Dunkleosteus": "https://upload.wikimedia.org/wikipedia/commons/8/8f/Dunkleosteus_model_AMNH.jpg",
  "Meganeura": "https://upload.wikimedia.org/wikipedia/commons/3/3a/Meganeura_monyi_type.jpg",
  "Hallucigenia": "https://upload.wikimedia.org/wikipedia/commons/9/9e/Hallucigenia_smithsonian.JPG",
  "Anomalocaris": "https://upload.wikimedia.org/wikipedia/commons/5/5e/Anomalocaris_canadensis_%28TMP_2023.003.0003%29%2C_Royal_Tyrrell_Museum%2C_Drumheller%2C_Alberta%2C_2025-07-13.jpg",
  "Giant Armadillo": "https://upload.wikimedia.org/wikipedia/commons/b/b3/Giant_armadillo.jpg"
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
