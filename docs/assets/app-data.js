```javascript
/* ================== APP DATA ================== */
// Contains all the static data for the application.
// This file is loaded before the main app script in index.html.

// --- ANIMAL DATABASE ---
window.ANIMAL_DATABASE = [
  {
    name: 'Fennec Fox',
    facts: [
      `Fennec foxes are the smallest canid (dog family) in the world.`,
      `Their 6-inch-long ears (a quarter of their body length!) radiate body heat to stay cool.`,
      `They have thick fur on their paw pads, like snowshoes, to walk on hot desert sand.`,
      `They can purr like a house cat when they are content.`,
      `They can jump over 3 feet high from a standing position.`,
      `They are so adapted to the desert, they can get all their water just from eating plants and insects.`,
      `A group of foxes is called a "skulk" or a "leash".`,
      `They are nocturnal and have excellent night vision, thanks to a reflective layer called the "tapetum lucidum".`,
      `They live in complex dens with multiple entrances, sometimes housing up to 10 foxes.`,
      `Their kidneys are specially adapted to conserve water in their harsh environment.`
    ]
  },
  {
    name: 'Axolotl',
    facts: [
      `Axolotls are "neotenic," meaning they stay in their larval (water) form for their whole lives.`,
      `They can regenerate complex limbs, their spinal cord, their jaw, and even parts of their brain!`,
      `They can even accept transplanted limbs from other axolotls without rejection.`,
      `Their feathery-looking "gills" are external and are used to breathe underwater.`,
      `Their name comes from the Aztec god Xolotl, the god of fire, lightning, and deformations.`,
      `They hunt by "smell," using chemical receptors, and then suck their prey in like a vacuum.`,
      `In the wild, they are critically endangered and only found in Lake Xochimilco in Mexico City.`,
      `They have very simple, cartilage-based skeletons.`,
      `Wild axolotls are dark and mottled; the pink and white ones are bred in captivity.`,
      `They have four different ways to breathe: gills, skin, rudimentary lungs, and through the lining of their mouth.`
    ]
  },
  {
    name: 'Goblin Shark',
    facts: [
      `The Goblin Shark is called a "living fossil" because it's the last member of a 125-million-year-old family.`,
      `Its long, flat snout is covered in "ampullae of Lorenzini," special sensors that detect the electric fields of prey.`,
      `Its jaws are "protrusible," meaning they can shoot forward, like a slingshot, to catch fish.`,
      `This "slingshot" jaw is the fastest-known jaw mechanism of any shark.`,
      `Their pinkish skin is so thin and transparent that you are actually seeing their blood vessels underneath.`,
      `They live in total darkness in the deep sea, as far down as 4,000 feet (1,200 meters).`,
      `Because they live so deep, their muscles are flabby and they are very slow, sluggish swimmers.`,
      `Their teeth are long, thin, and needle-like, perfect for grasping slippery, deep-sea squid and fish.`,
      `A Goblin Shark was once found in the stomach of a giant deep-sea "ship worm" (a type of clam).`,
      `Despite their terrifying look, they are no threat to humans, as they live far too deep.`
    ]
  },
  {
    name: 'Pangolin',
    facts: [
      `Pangolins are the only mammals in the world completely covered in scales.`,
      `Their scales are made of keratin, the exact same material as your fingernails and hair.`,
      `When threatened, they roll into an armor-plated ball so tight that even a lion can't open it.`,
      `They have no teeth and "chew" their food using small, gravelly stones in their stomach.`,
      `Their tongue can be over 16 inches long—longer than their entire body—and is stored in a special chest cavity.`,
      `A single pangolin can eat up to 20,000 ants and termites in one night.`,
      `They can close their nostrils and ears completely to stop ants from crawling inside.`,
      `Pangolins are, sadly, the most illegally trafficked mammals in the world.`,
      `Baby pangolins ride on their mother's back by holding onto her scales.`,
      `Some species, like the Black-bellied pangolin, have a prehensile (grasping) tail to hang from trees.`
    ]
  },
  {
    name: 'Okapi',
    facts: [
      `The Okapi is the only living relative of the giraffe, not the zebra.`,
      `Its stripes are for camouflage in the dense, filtered sunlight of the rainforest.`,
      `It has a prehensile (grasping) tongue that is 14-18 inches long—long enough to clean its own eyelids and ears!`,
      `Okapis have scent glands on their feet that leave behind a sticky, tar-like substance to mark their territory.`,
      `They are so shy and elusive that they were unknown to Western science until 1901.`,
      `They can rotate their ears independently to listen for sounds in two different directions at once.`,
      `Okapis are "solitary," meaning they live alone, only meeting up to mate.`,
      `They communicate using very low-frequency "infrasonic" rumbles, too low for humans to hear.`,
      `They are only found in the Ituri Rainforest in the Democratic Republic of Congo.`,
      `Like giraffes, males have short, skin-covered horns called "ossicones".`
    ]
  },
  {
    name: 'Komodo Dragon',
    facts: [
      `Komodo dragons are the largest and heaviest lizards on Earth.`,
      `They are "ambush predators" and will wait for days for suitable prey to pass by.`,
      `They have a "venomous" bite that contains a mix of toxic proteins, not just bacteria.`,
      `This venom stops the prey's blood from clotting and causes it to go into shock.`,
      `A Komodo dragon can eat 80% of its own body weight in a single meal.`,
      `They have a special joint in their jaw (intramandibular hinge) that allows them to swallow huge chunks of meat.`,
      `They "taste" the air with their forked tongue, using an organ in their mouth called the Jacobson's organ.`,
      `Young Komodo dragons roll in feces (poop) to smell bad so adult dragons won't eat them!`,
      `Females can reproduce through "parthenogenesis," meaning they can have babies without a male.`,
      `They can see in color and have vision as good as a human's.`
    ]
  },
  {
    name: 'Narwhal',
    facts: [
      `The narwhal's "tusk" is actually a single, 10-foot-long tooth that spirals out of its upper lip.`,
      `This tusk is a sensory organ with over 10 million nerve endings inside, used to "read" the water.`,
      `They use the tusk to detect changes in water temperature, pressure, and even the saltiness of the water.`,
      `Some narwhals (about 1 in 500) can grow two tusks!`,
      `Unlike our teeth, the narwhal tusk is hard on the inside and soft on the outside.`,
      `Narwhals are deep divers, capable of reaching depths of over 5,000 feet (1,500 meters).`,
      `They are related to beluga whales and, like them, live in the Arctic year-round.`,
      `Scientists have seen them using their tusks to tap and "stun" fish before eating them.`,
      `The tusk is almost always found on males, but about 15% of females can also grow a (smaller) tusk.`,
      `They have no dorsal fin (fin on their back), which makes it easier to swim under large sheets of ice.`
    ]
  },
  {
    name: 'Platypus',
    facts: [
      `The platypus is a "monotreme," a rare type of mammal that lays eggs instead of giving live birth.`,
      `It has a "sixth sense": its rubbery bill is covered in 40,000 electroreceptors to detect the electric fields of prey.`,
      `Male platypuses have a hollow, venomous spur on their back ankles.`,
      `The venom is strong enough to cause extreme pain to a human or kill a dog-sized animal.`,
      `When they swim, they fold their eyes and ears into special grooves and are completely "blind" and "deaf" underwater.`,
      `The first scientists to see a platypus specimen thought it was a fake, with a duck bill sewn onto a beaver's body.`,
      `A baby platypus is called a "puggle" and is the size of a lima bean when it hatches.`,
      `They do not have a stomach; their food goes directly from their esophagus to their intestines.`,
      `Their fur is so dense (800 hairs per square millimeter) that it traps a layer of air to keep them warm and dry.`,
      `Platypus milk seeps out of special pores in the mother's skin, and the puggles lap it up.`
    ]
  },
  {
    name: 'Aye-Aye',
    facts: [
      `The Aye-Aye is a type of lemur from Madagascar, but it is one of a kind.`,
      `It uses a method called "percussive foraging," tapping on wood up to 8 times per second to find grub tunnels.`,
      `Its long, skeletal middle finger is on a "ball-and-socket" joint, like your shoulder, letting it swivel 360 degrees.`,
      `It uses its huge, bat-like ears to listen for the echo from its tapping to pinpoint the grub.`,
      `Once it finds a grub, it uses its sharp, rodent-like front teeth (that never stop growing!) to gnaw a hole.`,
      `Then, it inserts its skinny middle finger into the hole to hook and extract the grub.`,
      `The Aye-Aye is the world's largest nocturnal primate.`,
      `Its brain is, proportionally, very large, which it needs for its complex hunting technique.`,
      `It has a "third eyelid" (a nictitating membrane) that it can close to protect its eyes while it chews wood.`,
      `It is the only primate known to use echolocation to find its food (though it's "tapping" echolocation).`
    ]
  },
  {
    name: 'Blobfish',
    facts: [
      `The blobfish looks "blobby" on land, but looks like a normal fish in its deep-sea home.`,
      `It lives at depths of 2,000-4,000 feet, where the pressure is over 100 times higher than at the surface.`,
      `Its body is made of a gelatinous "jelly" that is slightly less dense than water, allowing it to float effortlessly.`,
      `It has no swim bladder (the air sac most fish use to float) because the deep-sea pressure would crush it.`,
      `The blobfish has almost no muscle at all.`,
      `It is an "ambush predator" that simply floats with its mouth open, eating whatever drifts by (like deep-sea "snow").`,
      `Female blobfish lay thousands of pink eggs on the seafloor.`,
      `Blobfish are known to be "dedicated parents," with the mother or father sitting on the eggs to protect them.`,
      `They were "discovered" by accident when they were dragged up in deep-sea trawling nets.`,
      `Its sad, "grumpy" face is just an accident of decompression (being brought up too fast).`
    ]
  },
  {
    name: 'Dumbo Octopus',
    facts: [
      `Dumbo octopuses are named for the two large, ear-like fins on their "head" (which is really their body).`,
      `They live in the "abyssopelagic zone," or the Abyss, at depths of 9,800 to 13,000 feet!`,
      `They "fly" through the dark water by flapping their ear-like fins, not by using their tentacles.`,
      `Unlike most octopuses, they do not have an ink sac, as ink would be useless in total darkness.`,
      `They swallow their prey (like worms and tiny crustaceans) whole.`,
      `Their "arms" are all connected by a web of skin, making them look like an umbrella when spread.`,
      `They come in many colors, and some are "bioluminescent," meaning they can glow in the dark.`,
      `Females can store a male's sperm for long periods and lay eggs whenever they find a good spot.`,
      `They are part of the "cirrate" octopuses, which have small, hair-like strands called "cirri" on their arms.`,
      `The largest Dumbo octopus ever found was over 5 feet 10 inches long!`
    ]
  },
  {
    name: 'Star-Nosed Mole',
    facts: [
      `The "star" is an organ with 22 fleshy, pink "rays" or tentacles at the end of its snout.`,
      `This star is one of the most sensitive touch organs in the animal kingdom, with 100,000 nerve fibers.`,
      `It can "see" its world by touching it, identifying and eating prey in as fast as 120 milliseconds.`,
      `The Star-Nosed Mole is the fastest-eating mammal on Earth.`,
      `It can smell underwater by blowing air bubbles at an object and then sucking the bubbles back into its nose.`,
      `The "star" has a tiny "touch fovea" in the center, which it uses for high-detail scanning, just like we use our eyes.`,
      `It is "functionally blind," meaning its eyes are almost useless and can only detect light from dark.`,
      `They are active 24/7, day and night, and even tunnel through snow in the winter.`,
      `It can store fat in its tail, making it swell up to 4 times its normal size to survive winter.`,
      `They are fantastic swimmers and hunt for aquatic insects and small fish in ponds and marshes.`
    ]
  },
  {
    name: 'Yeti Crab',
    facts: [
      `Yeti crabs (Kiwa hirsuta) were only discovered in 2005.`,
      `They live in total darkness near "hydrothermal vents"—hot-water volcanoes—at the bottom of the ocean.`,
      `They are "blind" and have only the "vestiges," or remnants, of eyes.`,
      `Their "hairy" arms are covered in "setae" (bristles) that they use to "farm" bacteria.`,
      `They wave their arms in the mineral-rich water from the vents to cultivate their bacteria gardens.`,
      `Their main food source is the bacteria they "comb" off their own arms.`,
      `The bacteria on their arms also helps them "detoxify" the poisonous minerals coming from the vents.`,
      `Their family name, Kiwa, is the name of the goddess of shellfish in Polynesian mythology.`,
      `They are about 6 inches long and are a pale, ghost-like white.`,
      `They are not closely related to common crabs; they are a type of "squat lobster".`
    ]
  },
  {
    name: 'Proboscis Monkey',
    facts: [
      `The male's large, fleshy nose (or "proboscis") is used as an "echo chamber" to make loud honking calls.`,
      `A bigger nose is more attractive to females and helps intimidate rival males.`,
      `They are the most skilled swimmers of any primate, with partially webbed feet and hands.`,
      `They are known to "belly flop" into the water from trees to escape predators.`,
      `They have a complex, "sacculated" stomach with multiple chambers, like a cow, to digest tough, unripe leaves.`,
      `They cannot eat ripe fruit; the sugars would ferment in their special stomach and cause deadly bloating.`,
      `They live only on the island of Borneo in mangrove and river-side forests.`,
      `A baby proboscis monkey is born with a bright blue face and a small, upturned nose.`,
      `The male's nose can get so large that it hangs down below his mouth.`,
      `A single dominant male will lead a "harem" of up to 8 females and their young.`
    ]
  },
  {
    name: 'Saiga Antelope',
    facts: [
      `The Saiga is a "living fossil" that has lived on Earth since the Ice Age, alongside woolly mammoths.`,
      `Its huge, trunk-like nose is a "portable air conditioner," warming up frigid winter air and filtering dust in summer.`,
      `During mating season, the male's nose swells up and he "roars" through it to attract females.`,
      `They are critically endangered, having lost over 95% of their population in just 15 years.`,
      `A baby Saiga (a calf) can run almost as fast as an adult just one day after being born.`,
      `They are "nomadic," migrating hundreds of miles across the flat, open steppes of Central Asia.`,
      `Only the males have horns, which are prized in traditional medicine, leading to poaching.`,
      `In 2015, a mysterious disease wiped out over 200,000 Saiga (60% of the *entire* world population) in just 3 weeks.`,
      `Their eyes are on the sides of their heads, giving them a 320-degree field of vision to spot predators.`,
      `Their unique nose also helps them re-absorb moisture from their own breath, saving water.`
    ]
  },
  {
    name: 'Gerenuk',
    facts: [
      `The Gerenuk is an antelope, but its name means "giraffe-necked" in the Somali language.`,
      `It is the only antelope that can stand and walk on its two hind legs.`,
      `It can stand upright on its back legs for long periods to eat leaves other animals can't reach.`,
      `They can go their entire lives without ever drinking water, getting all their moisture from the plants they eat.`,
      `To reach even higher, they will use their front legs to hook and pull down high branches.`,
      `They have a prehensile (grasping) tongue and special lips to pick delicate leaves from thorny bushes.`,
      `They are "diurnal," meaning they are active during the day, unlike many other desert animals.`,
      `They have huge eyes and ears, giving them excellent sight and hearing to detect predators.`,
      `Only the males have horns, which are thick and "S-shaped".`,
      `They are very selective eaters, often eating only the most nutritious leaves from a bush and moving on.`
    ]
  },
  {
    name: 'Maned Wolf',
    facts: [
      `The Maned Wolf is not a wolf or a fox, and it is the only member of its own genus, *Chrysocyon*.`,
      `Its long, stilt-like legs are an adaptation for seeing over the tall grasses of the South American savanna.`,
      `Over 50% of its diet is a fruit called the "wolf apple," which looks like a tomato.`,
      `They have a "symbiotic" relationship with the wolf apple: the wolf eats it, and the fruit helps the wolf (with health), and the wolf spreads its seeds.`,
      `They are "solitary" and do not live in packs; a male and female share a territory but rarely meet.`,
      `They communicate over long distances with a loud, deep "roar-bark".`,
      `Their urine has a very strong, distinct smell, which they use to mark their territory.`,
      `They are "crepuscular," meaning they are most active at dawn and dusk.`,
      `They are very shy and pose no danger to humans.`
    ]
  },
  {
    name: 'Glass Frog',
    facts: [
      `Glass frogs have "translucent" (see-through) skin on their bellies, which allows you to see their internal organs, including the heart and liver.`,
      `This transparency acts as excellent camouflage, making them almost invisible against leaves.`,
      `When they sleep, they actively hide up to 90% of their red blood cells in their liver to increase transparency.`,
      `They are arboreal, living in the trees near streams in Central and South American rainforests.`,
      `Males are dedicated fathers who guard their eggs on leaves hanging over water until the tadpoles hatch and drop into the stream.`,
      `They have forward-facing eyes, giving them good depth perception.`,
      `Their bones are often green or white due to mineral deposits.`,
      `Tadpoles often settle in low-oxygen mud, where their bright red blood cells help them absorb more oxygen.`,
      `They communicate using high-pitched calls.`,
      `They are an indicator species, meaning their health reflects the health of their ecosystem.`
    ]
  },
  {
    name: 'Mantis Shrimp',
    facts: [
      `The Mantis Shrimp has the most complex eyes in the animal kingdom.`,
      `They have 12 to 16 types of "color photoreceptor cones." Humans only have 3 (red, green, blue).`,
      `They can see "polarized light," which they may use to send secret signals to each other.`,
      `Their "smasher" type has two clubs that accelerate at 10,000 g's, moving as fast as a .22 caliber bullet.`,
      `This punch is so fast it "boils" the water around it, creating a "sonoluminescent" flash of light and heat.`,
      `When the "cavitation bubble" (the boiling water bubble) collapses, it creates a *second* shockwave.`,
      `The "spearer" type has two spiny, barbed claws that they use to impale soft-bodied prey like fish.`,
      `They are highly intelligent, can learn complex mazes, and can even recognize individual humans.`,
      `They can move each eye independently.`,
      `Their clubs are so strong and durable, scientists are studying them to create new types of body armor.`
    ]
  },
  {
    name: 'T-Rex',
    facts: [
      `T-Rex means "Tyrant Lizard King," and it lived at the very end of the dinosaur age.`,
      `It had a "wishbone" (a furcula), just like a modern chicken, linking it to birds.`,
      `It likely had feathers, especially when it was young, for warmth and display.`,
      `Its "banana-sized" teeth were serrated like a steak knife and could be regrown if one broke.`,
      `It had the strongest bite force of any land animal ever, powerful enough to crush a car.`,
      `Its tiny arms, while small, were very muscular and could likely lift over 400 pounds.`,
      `T-Rex had a huge "olfactory bulb" (the smell part of the brain), meaning it had an incredible sense of smell.`,
      `Its eyes were forward-facing, giving it "binocular vision" (like an eagle) to hunt better.`,
      `The T-Rex was a "cannibal" and would eat other T-Rexes if it had the chance.`,
      `It could not run, but it could "power walk" at speeds up to 15-20 miles per hour.`
    ]
  },
  {
    name: 'Potoo Bird',
    facts: [
      `Potoo birds are masters of camouflage, looking exactly like broken tree branches or stumps.`,
      `They hunt at night (nocturnal), waiting on a perch to capture flying insects in mid-air.`,
      `Their huge yellow eyes give them incredible night vision.`,
      `They have an odd, wide mouth that allows them to scoop up large beetles and moths.`,
      `Their strange, ghostly call is a distinctive sound of the Central and South American rainforests.`,
      `The mother will often sit on the single egg placed directly on a tree branch, not in a nest.`,
      `When alarmed, they freeze and stretch their body and head vertically to blend in perfectly with the wood.`,
      `The Potoo's song is a series of descending, melancholic notes.`,
      `They are also known as the "ghost bird" or "poor-me-ones."`,
      `They are related to nightjars and frogmouths.`
    ]
  },
  {
    name: 'Giant Isopod',
    facts: [
      `Giant isopods are the largest members of the crustacean order Isopoda, related to woodlice.`,
      `They live in the cold, deep waters of the Atlantic, Pacific, and Indian oceans.`,
      `They are scavengers, feeding on dead whales, fish, and squid that sink to the ocean floor.`,
      `They can survive without eating for extremely long periods; one survived 5 years in an aquarium without food!`,
      `They have 14 legs and seven pairs of plates that make up their armor-like shell.`,
      `Their eyes are large, compound, and reflective, helping them see in the dark abyss.`,
      `They have a "roll-up" defense mechanism, curling into a ball like a pill bug.`,
      `They are often described as giant, underwater cockroaches.`,
      `Some species can grow up to 16 inches long, roughly the size of a football.`,
      `They are crucial for recycling organic material in the deep sea.`
    ]
  },
  {
    name: 'Tarsier',
    facts: [
      `Tarsiers have the largest eyes relative to their body size of any mammal, each eye being as large as its entire brain.`,
      `Their eyes are fixed in their sockets, so they must rotate their heads up to 180 degrees (like an owl) to look around.`,
      `They are strictly nocturnal and eat insects, small lizards, and even birds they catch in mid-air.`,
      `They are superb leapers, able to jump distances 40 times their own body length.`,
      `Tarsiers are the only primates that are entirely carnivorous.`,
      `They live only on islands in Southeast Asia, including the Philippines, Borneo, and Sumatra.`,
      `Their fingers are extremely long, and they have specialized pads for gripping branches.`,
      `They communicate using high-frequency ultrasonic squeaks that are too high for most humans to hear.`,
      `Tarsiers are solitary and typically travel alone.`,
      `Tarsiers are known to be extremely sensitive to stress and will hurt themselves if kept in captivity improperly.`
    ]
  },
  {
    name: 'Vaquita',
    facts: [
      `The Vaquita is the world's smallest and most endangered marine mammal, a type of porpoise.`,
      `It is instantly recognizable by the dark rings around its eyes and dark patches on its lips.`,
      `The name "Vaquita" means "little cow" in Spanish.`,
      `It is only found in a small area in the northern part of the Gulf of California.`,
      `Vaquitas are often caught and drowned in illegal gillnets set for totoaba, a large fish.`,
      `Their population is critically low, with likely fewer than 10 individuals remaining.`,
      `They are very shy and avoid boats, making them incredibly difficult to study.`,
      `Vaquitas are often mistaken for dolphins, but they have different, spade-shaped teeth.`,
      `They have a small, triangular dorsal fin.`,
      `They typically live in shallow, murky waters near the coast.`
    ]
  },
  {
    name: 'Shoebill Stork',
    facts: [
      `The Shoebill Stork is named for its huge, shoe-shaped bill, which can be over 9 inches long.`,
      `Its bill has sharp edges and a hook at the tip, perfect for decapitating its prey.`,
      `Its favorite food is the lungfish, which it pulls from the swampy mud.`,
      `The shoebill moves very slowly and carefully, often freezing mid-step, looking like a statue.`,
      `It has one of the slowest wingbeat rates of any bird, similar to a vulture.`,
      `When greeting each other, they make a strange "machine-gun like" bill-clattering sound.`,
      `Shoebills are typically solitary and live in large, dense papyrus swamps in East Africa.`,
      `They use their large bills to scoop up water and food, often looking comical.`,
      `They often build a single nest on a floating mat of vegetation.`,
      `They are considered vulnerable due to habitat loss and disturbance.`
    ]
  },
  {
    name: 'Markhor',
    facts: [
      `The Markhor is a large wild goat species known for its spectacular spiral horns.`,
      `The horns can grow up to 63 inches long on males, twisting up like a corkscrew.`,
      `The name "Markhor" translates from Persian to "snake-eater," though they mainly eat grass and leaves.`,
      `They are excellent climbers, often found on steep, rocky terrain in Central Asia.`,
      `They are the national animal of Pakistan.`,
      `In the winter, they grow long, thick, whitish-gray fur for insulation.`,
      `They are crepuscular, meaning they are most active at dawn and dusk.`,
      `Markhor populations were severely endangered but have been recovering due to conservation efforts.`,
      `They have special padded hooves that help them maintain traction on sheer cliff faces.`,
      `They communicate with loud warning whistles and snorts.`
    ]
  },
  {
    name: 'Wombat',
    facts: [
      `Wombats are marsupials (like kangaroos) found only in Australia.`,
      `They have a backwards-facing pouch, so when they dig, dirt doesn't fly over their baby (joey).`,
      `They have incredibly tough skin and a plate of cartilage on their rear, which they use to block burrow entrances.`,
      `When threatened, a wombat will dive headfirst into a tunnel and use its hard rear plate as a shield.`,
      `Their droppings (poop) are cube-shaped, which helps them stack their droppings to mark territory.`,
      `Wombats are nocturnal, spending their days sleeping in their burrows.`,
      `They have continually growing, rodent-like incisors for gnawing on tough roots.`,
      `They are the second largest marsupial in the world, after the kangaroo.`,
      `Wombats are known for their short legs and powerful claws, making them amazing tunnel builders.`,
      `They are generally solitary animals.`
    ]
  },
  {
    name: 'Patagonian Mara',
    facts: [
      `The Patagonian Mara is a large rodent native to Argentina, resembling a mix between a rabbit and a small deer.`,
      `It has long, powerful hind legs and moves primarily by hopping or galloping.`,
      `It is the fourth largest rodent species in the world.`,
      `Unlike most rodents, they are diurnal, active during the day.`,
      `They are known for their unusual social behavior: they often use communal dens where multiple pairs raise their young.`,
      `They are herbivores, mainly feeding on grasses, herbs, and leaves.`,
      `They live in open, arid grasslands and brush habitats.`,
      `Maras maintain monogamous pairs, meaning they mate for life.`,
      `They use scent marking (dragging their bottoms) to delineate their territory.`,
      `When alarmed, they run with a characteristic bouncy gait, flashing their white rump patch.`
    ]
  },
  {
    name: 'Sunda Colugo',
    facts: [
      `The Sunda Colugo (or Flying Lemur) is not a lemur and does not truly fly; it glides using a membrane of skin.`,
      `This gliding membrane, called the patagium, stretches from its neck to its tail and paw tips.`,
      `It is arguably the most skilled mammalian gliders, capable of gliding over 100 meters between trees.`,
      `They spend most of their lives high in the trees of Southeast Asian rainforests.`,
      `They are nocturnal, and their large eyes help them navigate the darkness.`,
      `They have comb-like incisor teeth used to groom their fur and scrape vegetation.`,
      `Their fur provides excellent camouflage against tree bark.`,
      `They are slow and clumsy when climbing but are masters in the air.`,
      `A baby colugo is carried wrapped up in its mother's patagium, like a sling.`,
      `They are herbivores, feeding on leaves, flowers, and fruit.`
    ]
  },
  {
    name: 'Goliath Frog',
    facts: [
      `The Goliath Frog is the largest frog species on Earth, capable of reaching over 13 inches in length and weighing up to 7.2 pounds.`,
      `It can leap over 10 feet in a single bound.`,
      `They are found only in West Africa, near fast-flowing rivers and waterfalls.`,
      `Unlike most frogs, they do not have a vocal sac and rarely "croak," communicating mostly through whistles and clicks.`,
      `They are herbivores when young (tadpoles) and carnivores as adults, eating insects, smaller frogs, and turtles.`,
      `Their powerful leg muscles are sometimes eaten as a delicacy.`,
      `They build elaborate ponds for their young by pushing rocks and mud with their strong forearms.`,
      `The tadpoles are about the size of a grape.`,
      `The Golaith Frog is listed as endangered due to habitat destruction and collection for the pet trade.`,
      `They have webbed feet to aid in swimming and escaping predators.`
    ]
  },
  {
    name: 'Tuatara',
    facts: [
      `The Tuatara is a reptile endemic to New Zealand and is the last surviving member of an order that flourished 200 million years ago.`,
      `It is often called a "living fossil" because its appearance has changed little since the time of the dinosaurs.`,
      `It possesses a "third eye" (parietal eye) on the top of its head, which can detect light and dark but not sharp images.`,
      `Tuataras have one of the longest lifespans of any reptile, often living over 100 years.`,
      `They have two rows of teeth on the upper jaw that slice down past one row on the lower jaw, making them excellent meat cutters.`,
      `They thrive in cooler temperatures, preferring to be active at night.`,
      `Their internal metabolism is incredibly slow, allowing them to conserve energy.`,
      `They share burrows with seabirds, which helps keep the burrows clean.`,
      `They take between 10 to 20 years to reach sexual maturity.`,
      `The Tuatara's bones are unique and resemble fish and amphibian bone structure.`
    ]
  },
  {
    name: 'Kakapo',
    facts: [
      `The Kakapo is the world's only flightless parrot, native to New Zealand.`,
      `It is also the heaviest parrot, often weighing up to 9 pounds.`,
      `They are nocturnal, using their strong legs and claws to climb trees.`,
      `They have strong legs and can run surprisingly fast.`,
      `They emit a strong, sweet, musty odor, often described as smelling like honey or flowers.`,
      `Males attract mates by digging bowl-shaped depressions in the ground and emitting loud, booming "booms" that can travel for miles.`,
      `They can live for over 90 years.`,
      `Kakapos are critically endangered and intensely managed on predator-free islands.`,
      `They are experts at camouflage, using their mottled green-and-brown feathers to hide in forest undergrowth.`,
      `They have specialized whiskers (vibrissae) around their face that help them navigate in the dark.`
    ]
  },
  {
    name: 'Hydra',
    facts: [
      `Hydra is a tiny freshwater animal that is famous for its almost limitless capacity for regeneration.`,
      `It is considered biologically immortal, as it shows no signs of aging.`,
      `Hydra is a cnidarian, related to jellyfish and sea anemones.`,
      `It has a simple, tube-like body with a ring of tentacles around its mouth.`,
      `It reproduces mainly asexually by "budding"—growing a miniature clone off its side.`,
      `If you cut a Hydra into pieces, each piece can regenerate into a new, complete Hydra.`,
      `It paralyzes small crustaceans and worms with stinging cells on its tentacles.`,
      `Hydra is one of the oldest known animal genera, existing for hundreds of millions of years.`,
      `It can move slowly by looping (somersaulting) across the surface or by sliding on its base.`,
      `It lacks a true brain, heart, or respiratory system.`
    ]
  },
  {
    name: 'Red-Lipped Batfish',
    facts: [
      `The Red-Lipped Batfish is easily recognized by its bright, lipstick-red lips.`,
      `It is a poor swimmer and uses its pectoral fins (which resemble arms) to "walk" along the ocean floor.`,
      `It lives on the sandy bottoms around the Galapagos Islands at depths of up to 400 feet.`,
      `They have a strange structure on their head, a modified dorsal fin called an "illicium," which acts as a lure.`,
      `The lure emits light or chemicals to attract small prey like shrimp and small fish.`,
      `The red lips are thought to help attract mates or serve as a warning.`,
      `They can grow up to 15 inches in length.`,
      `The Batfish is related to anglerfish.`,
      `They have a very flattened body shape, like a pancake.`,
      `They primarily feed on benthic invertebrates (organisms that live on the seafloor).`
    ]
  },
  {
    name: 'Blue Dragon Sea Slug',
    facts: [
      `The Blue Dragon Sea Slug (Glaucus atlanticus) is a strikingly beautiful, tiny mollusk.`,
      `It spends its life floating upside down on the ocean surface, carried by winds and currents.`,
      `It has a gas-filled sac in its stomach to help it float.`,
      `It feeds almost exclusively on the highly venomous Portuguese Man O' War (a type of jellyfish).`,
      `It steals the Man O' War's stinging cells (nematocysts) and stores them in its own body for defense.`,
      `Its sting can be more potent than that of the Man O' War itself, posing a danger to humans.`,
      `Its blue and white coloration is a form of camouflage called "countershading."`,
      `The blue side faces up (blending with the water), and the white side faces down (blending with the sky).`,
      `They can grow up to 1.2 inches long.`,
      `They are hermaphrodites, possessing both male and female reproductive organs.`
    ]
  },
  {
    name: 'Hooded Seal',
    facts: [
      `The male Hooded Seal is known for its inflatable "hood" on its head, which it can blow up like a balloon.`,
      `The hood is a nasal cavity membrane used to attract females and intimidate rival males.`,
      `It can also inflate a bright red, balloon-like septum (the partition between the nostrils) from one nostril.`,
      `This red balloon is used as a visual display during courtship and aggression.`,
      `They are deep divers, capable of reaching depths of over 3,000 feet.`,
      `Hooded Seals are solitary, only coming together briefly for breeding.`,
      `They live in the North Atlantic and Arctic Ocean.`,
      `The pups grow extremely fast, gaining weight rapidly during their 4-day nursing period (the shortest of any mammal).`,
      `Their color is silvery gray with black spots.`,
      `They are considered one of the most difficult seal species to study due to their remote habitat.`
    ]
  },
  {
    name: 'Leafy Sea Dragon',
    facts: [
      `The Leafy Sea Dragon is a relative of the seahorse, famous for its elaborate, leaf-like appendages used for camouflage.`,
      `These appendages are not used for movement but help it mimic floating seaweed.`,
      `It moves using small, nearly transparent fins that flutter to propel it gently through the water.`,
      `The male carries the eggs, which are incubated on a spongy patch beneath his tail.`,
      `They are found only in the coastal waters of southern and western Australia.`,
      `They are ambush predators, sucking small shrimp and plankton into their tiny mouths.`,
      `Their color can change slightly to match their surroundings (red, yellow, or green).`,
      `The Leafy Sea Dragon is protected by the Australian government.`,
      `They have a pipe-like snout and a prehensile (grasping) tail, but they rarely use their tail to grasp things.`,
      `They are sensitive to water pollution and changes in ocean temperature.`
    ]
  },
  {
    name: 'Whip-Tailed Scorpion',
    facts: [
      `The Whip-Tailed Scorpion (or vinegaroon) is not a true scorpion and does not have venom.`,
      `When threatened, it can spray a cloud of liquid containing acetic acid (the main ingredient in vinegar).`,
      `The spray has a strong vinegar smell, hence its common name, vinegaroon.`,
      `They use their large, scorpion-like pincers (pedipalps) to catch and crush insects.`,
      `They have an extremely long, whip-like tail (flagellum) that serves only as a sensory organ.`,
      `They are nocturnal, hiding during the day and hunting at night.`,
      `Vinegaroons are arachnids, meaning they have eight legs.`,
      `The female is a dedicated mother, carrying her eggs and young on her back.`,
      `They are found in arid and semi-arid regions of the Americas and Asia.`,
      `Despite their intimidating appearance, they are harmless to humans.`
    ]
  },
  {
    name: 'Amazon River Dolphin',
    facts: [
      `The Amazon River Dolphin (or Boto) is the largest species of river dolphin.`,
      `It is often pink, especially the males, due to wear and tear on the skin from rubbing and fighting.`,
      `It has unfused vertebrae in its neck, allowing it to turn its head 90 degrees to navigate flooded forests.`,
      `They have long, narrow snouts and small eyes, but their echolocation is superb.`,
      `Their diet consists mainly of fish, crabs, and turtles caught in the muddy river waters.`,
      `During the wet season, they swim through the flooded Amazon rainforest, hunting among the trees.`,
      `They are known to be solitary or travel in small, loose groups.`,
      `They are considered critically endangered due to habitat destruction and illegal fishing practices.`,
      `Local folklore often describes them as shape-shifters that transform into handsome men or beautiful women.`,
      `They lack a dorsal fin, which is replaced by a low, rounded ridge.`
    ]
  },
  {
    name: 'Quokka',
    facts: [
      `The Quokka is a small, short-tailed wallaby found mainly on Rottnest Island in Western Australia.`,
      `They are famous worldwide for their "smiling" appearance, making them popular subjects for selfies.`,
      `They are nocturnal herbivores, eating leaves, stems, and grass.`,
      `They are very docile and show little fear of humans.`,
      `The Quokka stores fat in its tail to survive periods of drought.`,
      `Like the wombat, the Quokka is a marsupial.`,
      `When swimming, they can hold their breath for up to five minutes.`,
      `They can hop rapidly on their powerful hind legs.`,
      `The name "Rottnest" Island means "Rat's Nest" Island, named by a Dutch explorer who mistook the Quokkas for large rats.`,
      `Females can instantly replace a lost baby (joey) using a process called "embryonic diapause."`
    ]
  },
  {
    name: 'Panda Ant',
    facts: [
      `The Panda Ant is not an ant but a species of wasp, specifically a wingless velvet ant.`,
      `It is known for its striking black and white coloring, resembling a Panda bear.`,
      `The female is wingless and has an extremely painful sting, earning it the nickname "cow killer."`,
      `The sting is not usually deadly but is intensely painful.`,
      `They are solitary, often found running quickly across the desert floor.`,
      `They are active during the day (diurnal).`,
      `Panda ants are found mainly in Chile.`,
      `The males have wings, which they use to fly and search for the wingless females.`,
      `They parasitize the nests of other wasps and bees, laying their eggs near the host's larvae.`,
      `The exoskeleton (outer shell) is one of the toughest in the insect world.`
    ]
  },
  {
    name: 'Mimic Octopus',
    facts: [
      `The Mimic Octopus (Thaumoctopus mimicus) can impersonate at least 15 different sea animals.`,
      `It changes its color, shape, and behavior to look like venomous flatfish, lionfish, and sea snakes.`,
      `It is the only known creature that can decide which animal to mimic based on the predator it encounters.`,
      `It lives in the murky, muddy waters of Southeast Asia.`,
      `When imitating a sea snake, the octopus hides six arms and waves two arms in opposite directions.`,
      `It is highly intelligent and observed doing "role-playing" mimicry.`,
      `They are masters of camouflage, able to perfectly blend into the seafloor.`,
      `They are one of the smaller octopus species, usually no longer than 2 feet.`,
      `The Mimic Octopus was only formally discovered in 1998.`,
      `They use jet propulsion (squirting water) to move quickly when not mimicking.`
    ]
  },
  {
    name: 'Flying Squirrel',
    facts: [
      `Flying squirrels don't actually fly; they glide using a large, furry membrane called a patagium.`,
      `This membrane stretches from their wrists to their ankles.`,
      `They are strictly nocturnal, rarely seen during the day.`,
      `They can glide distances up to 150 feet (45 meters) and turn mid-air using their tails as a rudder.`,
      `Before a leap, they bob their head to judge the distance to the landing spot.`,
      `They have excellent night vision thanks to large, dark eyes.`,
      `Flying squirrels are omnivores, eating nuts, seeds, fruit, fungi, and sometimes insects or bird eggs.`,
      `They live in tree hollows or nests built from twigs and leaves.`,
      `There are over 50 species of flying squirrel worldwide.`,
      `They communicate using high-pitched squeaks and chirps.`
    ]
  },
  {
    name: 'Venezuelan Poodle Moth',
    facts: [
      `The Venezuelan Poodle Moth, discovered in 2009, is known for its unusual appearance: a furry white body and large, dark eyes.`,
      `It resembles a cross between a moth and a fluffy white poodle dog.`,
      `Little is known about the species, as it was only recently documented.`,
      `It is a member of the insect order Lepidoptera (moths and butterflies).`,
      `It is believed to be diurnal (active during the day).`,
      `The moth's fuzzy appearance is likely a defense mechanism against predators.`,
      `It was found in the Gran Sabana region of Venezuela.`,
      `Its large antennae are likely used to detect pheromones.`,
      `It feeds on nectar, like other moths.`,
      `The moth is an excellent example of nature's strange biodiversity.`
    ]
  },
  {
    name: 'Sarcastic Fringehead',
    facts: [
      `The Sarcastic Fringehead is a small, aggressive fish known for its comically huge, extendable mouth.`,
      `When two Fringeheads fight, they rapidly open their jaws wide and press their mouths together in a gaping contest.`,
      `The winner is determined by which fish has the biggest mouth, which can be up to four times the size of its head.`,
      `They live in burrows in the mud or sand off the coast of California and Baja California.`,
      `They are fearless defenders of their territory and will attack anything that comes close, including divers.`,
      `The name "fringehead" comes from the fringed flaps of skin over its eyes.`,
      `The name "sarcastic" refers to the Greek word "sarkazo," meaning "to tear flesh," reflecting their aggressive nature.`,
      `They dart out from their burrows to grab prey, mainly small fish and crabs.`,
      `They can grow up to 10 inches long.`,
      `They use their large mouths not just for fighting but also for intimidation displays.`
    ]
  },
  {
    name: 'Harpy Eagle',
    facts: [
      `The Harpy Eagle is one of the largest and most powerful eagles in the world, capable of preying on sloths and monkeys.`,
      `Its talons are longer than a grizzly bear's claws, reaching up to 5 inches.`,
      `It lives in the canopy of Central and South American rainforests.`,
      `Its name comes from the Harpies of Greek mythology, wind spirits with sharp talons.`,
      `It has an impressive crest of feathers on its head that it raises when alarmed or curious.`,
      `The Harpy Eagle is considered a top predator in its environment.`,
      `It has a wingspan of up to 6 feet 7 inches.`,
      `It builds huge, stick nests high in the tallest trees, which it uses year after year.`,
      `They are known for their quiet, graceful flight through the dense forest.`,
      `They are long-lived, often reaching 30-40 years in captivity.`
    ]
  },
  {
    name: 'Gila Monster',
    facts: [
      `The Gila Monster is one of only two venomous lizard species native to North America (the other being the Mexican Beaded Lizard).`,
      `Its venom is not injected but oozes from glands in its lower jaw into the wound as it chews.`,
      `The venom is rarely fatal to humans but is extremely painful.`,
      `They are slow-moving and spend most of their time underground in burrows.`,
      `They are heavy-bodied, with bright black and pink/orange bead-like scales.`,
      `They store fat in their large tails, allowing them to go months without eating.`,
      `They are named after the Gila River Basin in Arizona.`,
      `Gila Monsters are protected in Arizona and Nevada.`,
      `They primarily feed on bird and reptile eggs, small mammals, and insects.`,
      `The venom's components has been used in research to develop medications for type 2 diabetes.`
    ]
  },
  {
    name: 'Sun Bear',
    facts: [
      `The Sun Bear is the smallest bear species in the world, standing about 4 feet tall.`,
      `It is named for the distinctive golden or white chest patch that looks like a rising sun.`,
      `It has an incredibly long tongue (up to 10 inches) used to extract honey and insects from tree crevices.`,
      `They are highly arboreal (tree-dwelling) and build nests of branches in the forest canopy.`,
      `Its fur is short, sleek, and black, making it ideal for the tropical climate of Southeast Asia.`,
      `They have long, sickle-shaped claws that help them climb.`,
      `They are primarily nocturnal.`,
      `Sun Bears are excellent diggers and love to tear open logs in search of termites.`,
      `They are listed as vulnerable due to deforestation and the illegal wildlife trade.`,
      `Their claws are not retractable.`
    ]
  },
  {
    name: 'Ocean Sunfish',
    facts: [
      `The Ocean Sunfish (Mola Mola) is the heaviest bony fish in the world, with some specimens weighing over 5,000 pounds.`,
      `It resembles a giant swimming head, with no true tail fin (caudal fin).`,
      `It often basks near the surface, lying on its side, which is why it's called a "sunfish."`,
      `They feed mainly on jellyfish and small fish.`,
      `Females can produce up to 300 million eggs at a time, more than any other known vertebrate.`,
      `They have rough, leathery skin covered in mucus.`,
      `The Sunfish has a beak-like mouth that cannot close completely.`,
      `They are often seen near the surface when birds are cleaning parasites off their skin.`,
      `Mola Mola have a very reduced skeleton compared to other large fish.`,
      `They can swim to depths of over 2,000 feet to hunt.`
    ]
  },
  {
    name: 'Red Panda',
    facts: [
      `The Red Panda is not closely related to the Giant Panda; it is the only living species in its own family (Ailuridae).`,
      `It is only slightly larger than a house cat, with long, shaggy reddish-brown fur and a thick, striped tail.`,
      `They spend most of their lives in trees, using their long, bushy tails for balance.`,
      `Red Pandas are primarily herbivores, eating bamboo, but they also eat fruits, acorns, roots, and eggs.`,
      `They have a "false thumb"—an extension of the wrist bone used to grip bamboo shoots.`,
      `They are nocturnal or crepuscular, sleeping during the day in tree forks or hollows.`,
      `Red Pandas are solitary and quiet animals, communicating with clicks, squeaks, and whistles.`,
      `Their habitat is the mountain forests of the Himalayas and Southern China.`,
      `They groom themselves like cats, licking their paws and rubbing their fur.`,
      `They are considered an endangered species.`
    ]
  },
  {
    name: 'Spiny Anteater',
    facts: [
      `The Echidna (Spiny Anteater) is a monotreme, one of only five living mammals that lay eggs (along with the platypus).`,
      `It is covered in sharp, strong spines, which are modified hairs.`,
      `When threatened, it rapidly burrows into the ground or rolls into a spiny ball.`,
      `It has an exceptionally long, sticky tongue used to catch ants and termites.`,
      `Echidnas have no teeth; they grind their food between hard pads in their mouth.`,
      `The female carries the single egg in a temporary pouch that develops on her abdomen.`,
      `They have strong claws and shovel-like feet for digging.`,
      `Echidnas can live for up to 50 years in captivity.`,
      `Their body temperature is the lowest of any mammal.`,
      `They are found throughout Australia and New Guinea.`
    ]
  },
  {
    name: 'Rhinoceros Beetle',
    facts: [
      `The Rhinoceros Beetle is one of the strongest animals on Earth relative to its size, able to lift 850 times its own weight.`,
      `The males have large, prominent horns used for fighting rival males over mates and territory.`,
      `These beetles are part of the scarab family (dung beetles).`,
      `They are nocturnal, attracted to lights at night.`,
      `Their larvae (grubs) can take several years to develop into adult beetles.`,
      `Adult rhinoceros beetles mainly feed on tree sap, nectar, and fruit.`,
      `Despite their menacing look, they are completely harmless to humans.`,
      `Their hard exoskeleton provides excellent protection.`,
      `They are found worldwide, but many species are in tropical regions.`,
      `When they fly, they make a loud, droning sound.`
    ]
  },
  {
    name: 'Blue Ringed Octopus',
    facts: [
      `The Blue Ringed Octopus is small (about the size of a golf ball) but is one of the world's most venomous animals.`,
      `Its venom (tetrodotoxin) is powerful enough to kill a human and has no known antidote.`,
      `The bright blue rings flash rapidly when the octopus is threatened, serving as a warning.`,
      `They live in tide pools and shallow coral reefs in the ...(truncated 30481 characters)... primarily nocturnal and solitary.`,
      `Its diet consists mainly of ants, worms, and snails.`,
      `It has a small, spade-shaped tail used as a third prop for balance.`,
      `Due to its vulnerability and elusive nature, very little is known about its wild population.`,
      `They use their large front claws to dig tunnels near ant colonies.`
    ]
  },
  {
    name: 'Goliath Bird-Eater',
    facts: [
      `The Goliath Bird-Eater is the largest spider by mass, weighing up to 6 ounces.`,
      `Despite its name, it rarely eats birds, preferring insects, mice, and frogs.`,
      `It is native to the rainforests of northern South America.`,
      `When threatened, it rubs its legs together to create a loud, hissing sound (stridulation).`,
      `It also defends itself by flicking urticating (stinging) hairs from its abdomen.`,
      `Its fangs can be up to 1 inch long.`,
      `Its venom is generally harmless to humans, causing only mild pain.`,
      `Females can live for up to 25 years, while males live only 3 to 6 years.`,
      `It digs and lines its burrows with silk.`,
      `The spider's legs can span up to 12 inches across.`
    ]
  },
  {
    name: 'Glass Lizard',
    facts: [
      `The Glass Lizard is a legless lizard often mistaken for a snake.`,
      `It is a lizard because it has movable eyelids and external ear openings, which snakes lack.`,
      `When caught, its tail shatters into multiple pieces, distracting the predator while the lizard escapes.`,
      `The discarded tail pieces continue to twitch for several minutes.`,
      `They are found in North Africa, Asia, and Southeast Europe.`,
      `They have a fragile tail that can break into many fragments.`,
      `They can grow up to 4 feet long, but most of that length is tail.`,
      `They move by wriggling and slithering like a snake.`,
      `Their diet includes insects, spiders, and small rodents.`,
      `They burrow into the soil to escape cold weather.`
    ]
  },
  {
    name: 'Giant Weta',
    facts: [
      `The Giant Weta is one of the world's heaviest insects, found only in New Zealand.`,
      `The Weta is a nocturnal, flightless insect that resembles a large grasshopper or cricket.`,
      `One species, the Little Barrier Island Giant Weta, can weigh more than a sparrow.`,
      `They lack specialized hearing organs and detect sound through vibrations in the ground.`,
      `They are herbivores, feeding mainly on leaves, seeds, and fruits.`,
      `They can produce a defensive hissing sound by rubbing their abdomen and legs together.`,
      `The female has a long ovipositor, a tube used to lay eggs deep into the soil.`,
      `The word "weta" comes from the Maori language and means "god of ugly things."`,
      `They live primarily in tree holes or under loose bark.`,
      `Some species are critically endangered due to the introduction of non-native mammals.`
    ]
  },
  {
    name: 'Kiwi Bird',
    facts: [
      `The Kiwi is a nocturnal, flightless bird endemic to New Zealand.`,
      `It is New Zealand's national animal.`,
      `It has nostrils at the tip of its long beak, making it the only bird in the world with this feature.`,
      `It relies on its strong sense of smell to hunt for worms and insects in the ground.`,
      `The kiwi bird lays the largest egg relative to its body size of any bird.`,
      `The male performs most of the incubation duties, which can last up to 85 days.`,
      `They have hair-like feathers and lack a sternum (keel), which supports flight muscles.`,
      `They use their powerful legs and claws to defend themselves and dig for food.`,
      `The kiwi bird is shy and rarely seen by humans in the wild.`,
      `They are considered vulnerable due to predation by introduced mammals like stoats.`
    ]
  },
  {
    name: 'Thorny Devil',
    facts: [
      `The Thorny Devil is a small lizard native to the arid and desert regions of Australia.`,
      `Its entire body is covered in large, menacing, conical spines used for defense.`,
      `It has a false head on its neck that it presents to predators to distract them.`,
      `It can collect water from any part of its body using a network of tiny grooves between its scales.`,
      `When it rains or dew forms, the water is channeled directly to its mouth.`,
      `It moves with a distinctive jerky walk, freezing mid-step to resemble a broken twig.`,
      `Its diet consists almost entirely of black ants, eating thousands in a single day.`,
      `Its coloration changes based on temperature, ranging from yellow to dark brown.`,
      `It is a solitary animal that spends its days foraging.`,
      `They can inflate their bodies with air, making their spines stand out even more.`
    ]
  },
  {
    name: 'Leafcutter Ant',
    facts: [
      `Leafcutter ants are tropical ants famous for carrying pieces of leaves over their heads.`,
      `They do not eat the leaves; they use them to grow a fungus that serves as their food source.`,
      `The leaf fragments are transported back to their huge underground nests.`,
      `Their colonies are massive, sometimes containing up to 8 million ants.`,
      `The ants have specialized jobs: tiny "minims" ride on the leaves to guard against parasitic flies.`,
      `Their nests can reach up to 20 feet deep and cover an area of 30 square meters.`,
      `The workers' mandibles (jaws) are sharp enough to cut through tough leaves like scissors.`,
      `They are second only to humans in the volume of plant material they harvest in the Neotropics.`,
      `Their fungal garden is carefully tended and is the only food source for the entire colony.`,
      `The queen can live for up to 15 years.`
    ]
  },
  {
    name: 'Gibbon',
    facts: [
      `Gibbons are small apes known as the "lesser apes."`,
      `They are renowned for their incredible speed and agility, moving through trees by "brachiation" (swinging from branch to branch).`,
      `A gibbon can swing at speeds up to 35 mph and cover distances up to 20 feet in a single swing.`,
      `They form strong, monogamous pair bonds and live in small, stable family groups.`,
      `Each morning, a pair of gibbons sings a complex, loud "duet" to mark their territory.`,
      `They have a very slender body and long, powerful arms.`,
      `Gibbons are tailless and highly arboreal (tree-dwelling).`,
      `Their diet consists mainly of fruit, leaves, and flowers.`,
      `They are found in the tropical and subtropical rainforests of Southeast Asia.`,
      `Gibbons are critically endangered due to habitat loss and the illegal pet trade.`
    ]
  },
  {
    name: 'Tapir',
    facts: [
      `Tapirs are large, herbivorous mammals with a short, flexible snout (proboscis).`,
      `The proboscis is used to grasp leaves and fruit, and as a snorkel when swimming underwater.`,
      `They are excellent swimmers and spend much of their time in the water to cool off.`,
      `There are four species in Central and South America and one in Southeast Asia.`,
      `Baby tapirs are born with camouflage stripes and spots that fade after about six months.`,
      `They are mostly nocturnal and solitary animals.`,
      `The tapir is related to horses and rhinos.`,
      `Their vision is poor, so they rely heavily on their sense of smell and hearing.`,
      `Tapirs are vital seed dispersers, spreading the seeds of the fruit they eat.`,
      `All species are endangered or vulnerable due to habitat loss.`
    ]
  },
  {
    name: 'Tawny Frogmouth',
    facts: [
      `The Tawny Frogmouth is often mistaken for an owl, but it is actually related to the Potoo bird and nightjars.`,
      `They are masters of camouflage, sitting on a branch and blending in perfectly with the tree bark.`,
      `When threatened, they freeze and stretch their head up to mimic a broken branch.`,
      `They have a very large, wide mouth (the "frogmouth") used to scoop up insects in flight.`,
      `They hunt at night (nocturnal) and sit motionless for long periods waiting for prey.`,
      `They are native to Australia and Tasmania.`,
      `Their feathers are soft and mottled grey and brown.`,
      `They mate for life and often perch together on the same branch.`,
      `They do not have strong talons like owls and rarely hunt live prey like mice.`,
      `The young are often born with fluffy white feathers, making them look like soft cotton balls.`
    ]
  },
  {
    name: 'Wanderer Butterfly',
    facts: [
      `The Wanderer (or Milkweed Butterfly) is native to Australia, North Africa, and the Middle East.`,
      `It is known for its migratory habits, although not as extensive as the Monarch butterfly.`,
      `The caterpillar feeds exclusively on milkweed plants, which contain toxic chemicals.`,
      `The butterfly retains the toxins, making it poisonous to predators.`,
      `It has bright orange and black wings, which act as a warning (aposematism).`,
      `It is a large butterfly with a wingspan up to 3.5 inches.`,
      `The butterfly is diurnal, being active during the day.`,
      `It is often confused with the Monarch butterfly due to their similar appearance.`,
      `The female lays a single egg on the underside of a milkweed leaf.`,
      `The entire life cycle, from egg to adult butterfly, takes about a month.`
    ]
  },
  {
    name: 'Cuttlefish',
    facts: [
      `Cuttlefish are marine mollusks, closely related to octopuses and squid.`,
      `They are considered the "chameleons of the sea" due to their remarkable ability to instantly change color and skin texture.`,
      `They use this camouflage for both hunting prey and hiding from predators.`,
      `They have three hearts and blue-green blood.`,
      `They have a short lifespan, typically only 1 to 2 years.`,
      `Cuttlefish can squirt a cloud of dark ink to confuse predators.`,
      `They are highly intelligent and possess the largest brain-to-body size ratio of any invertebrate.`,
      `They have a pair of specialized tentacles they shoot out to grab prey.`,
      `They can also create mesmerizing, moving color patterns to hypnotize their prey.`,
      `Their internal shell, called the cuttlebone, is used for buoyancy control.`
    ]
  },
  {
    name: 'Rhinoceros',
    facts: [
      `There are five species of rhinoceros: Black, White, Indian, Javan, and Sumatran.`,
      `The rhino horn is made of keratin, the same protein that makes up human hair and fingernails.`,
      `Rhinos have poor eyesight but excellent senses of smell and hearing.`,
      `The White Rhinoceros is the largest species of rhino and the second-largest land mammal.`,
      `They are herbivores, feeding on grasses, leaves, and fruits.`,
      `Rhinos are primarily solitary, except for mothers with their calves.`,
      `The Indian rhino has skin folds that look like armor plating.`,
      `All five species are endangered due to poaching for their horns.`,
      `A rhino can run surprisingly fast, reaching speeds of up to 35 mph.`,
      `They often wallow in mud or dust to cool down and protect their skin from insects and the sun.`
    ]
  },
  {
    name: 'African Bush Elephant',
    facts: [
      `The African Bush Elephant is the largest land animal on Earth.`,
      `Its trunk has over 40,000 muscles, making it strong enough to lift heavy logs and delicate enough to pick a single berry.`,
      `Their large ears radiate heat to help keep the massive animals cool in the African heat.`,
      `They can hear sounds made by other elephants up to 5 miles away, including low-frequency rumbles (infrasound).`,
      `Elephants are herbivores and can spend up to 18 hours a day feeding.`,
      `They form close-knit, matriarchal family units led by the oldest female (the matriarch).`,
      `A group of elephants is called a "herd" or a "memory."`,
      `They communicate using rumbles, trumpet calls, and body language like ear flapping.`,
      `Their ivory tusks are actually elongated incisor teeth.`,
      `Elephants are known to mourn their dead, visiting graves and touching the bones of deceased family members.`
    ]
  },
  {
    name: 'Bison',
    facts: [
      `The American Bison is the largest mammal in North America.`,
      `Bison are often incorrectly called buffalo, but they are a distinct species.`,
      `They can weigh up to 2,000 pounds but are surprisingly agile, reaching speeds of up to 35 mph.`,
      `Bison form massive herds, which once covered the Great Plains in the millions.`,
      `They engage in "wallowing," rolling in dust or mud, to shed fur, deter insects, and regulate temperature.`,
      `Both male and female bison have horns.`,
      `The breeding season, called the "rut," sees massive males compete using violent head-on charges.`,
      `Bison are herbivores, feeding almost exclusively on grasses and sedges.`,
      `They have a large, distinctive hump over their shoulders, composed of muscle for supporting their massive head.`,
      `Bison were integral to the lives and culture of many Native American tribes.`
    ]
  },
  {
    name: 'Grizzly Bear',
    facts: [
      `The Grizzly Bear (a subspecies of Brown Bear) is known for the prominent hump of muscle on its shoulders.`,
      `Grizzlies are generally solitary, except for mothers with cubs.`,
      `They are omnivores, eating berries, nuts, roots, insects, fish, and large mammals.`,
      `They have long claws (up to 4 inches) perfectly adapted for digging and catching fish.`,
      `Despite their size, they can run up to 35 mph in short bursts.`,
      `Grizzlies are known to travel hundreds of miles to find food.`,
      `They communicate through vocalizations like growls, snorts, and huffing.`,
      `They dig dens on high slopes or under large tree roots for winter hibernation.`,
      `Their name "grizzly" comes from the gray or "grizzled" tips of their guard hairs.`,
      `Grizzlies possess an acute sense of smell, aiding them in locating food and mates.`
    ]
  },
  {
    name: 'Humpback Whale',
    facts: [
      `Humpback whales are famous for their acrobatic breaches, often leaping entirely out of the water.`,
      `Their scientific name, *Megaptera novaeangliae*, means "big-winged New Englander," referring to their huge pectoral fins.`,
      `Their long, knobbled pectoral fins can be up to 15 feet long and are used for steering.`,
      `They are baleen whales, feeding on krill and small fish by "bubble-net feeding."`,
      `Bubble-net feeding is a cooperative hunting technique where a group blows bubbles to form a circular net around prey.`,
      `Male humpback whales sing complex, long, and evolving songs that can last for hours.`,
      `These songs are thought to be used in mating rituals.`,
      `They undertake one of the longest migrations of any mammal, traveling up to 16,000 miles a year.`,
      `They often gather in groups called "pods."`,
      `The bumps on their head and fins are hair follicles, or tubercles.`
    ]
  },
  {
    name: 'Cheetah',
    facts: [
      `The Cheetah is the fastest land animal, capable of reaching speeds of 70 mph in short bursts.`,
      `It can accelerate from 0 to 60 mph in just three seconds.`,
      `Unlike other big cats, it cannot roar, instead communicating through chirps, purrs, and meows.`,
      `It uses its long, flat tail like a rudder to maintain balance and steer during high-speed turns.`,
      `Cheetahs have semi-retractable claws, functioning like cleats on a running shoe for traction.`,
      `They have distinctive black "tear tracks" running from the corner of their eyes to their mouth, which reduce sun glare.`,
      `Cheetahs are diurnal, preferring to hunt during the day to avoid larger, nocturnal predators.`,
      `They are the only big cat that hunts purely by chasing down its prey.`,
      `They often prefer open grasslands and savanna habitats in Africa and a tiny area of Iran.`,
      `After a successful hunt, a cheetah needs up to 30 minutes to recover its breath before eating.`
    ]
  },
  {
    name: 'Orangutan',
    facts: [
      `The Orangutan is the largest arboreal (tree-dwelling) animal in the world.`,
      `Its name means "person of the forest" in the Malay language.`,
      `They spend over 90% of their lives in trees and rarely come down to the forest floor.`,
      `Adult males develop prominent cheek pads (flanges) used to amplify their long, booming calls to mark territory.`,
      `They have enormous arm spans, often reaching over 7 feet, much longer than their legs.`,
      `Orangutans are highly intelligent and have been observed using tools in the wild.`,
      `They build elaborate nests of bent branches and leaves high in trees to sleep in every night.`,
      `Their diet is primarily fruit, making them crucial seed dispersers for the rainforest.`,
      `They are mostly solitary, unlike other great apes.`,
      `A mother orangutan has one of the longest juvenile dependency periods of any animal, caring for her young for 6 to 7 years.`
    ]
  },
  {
    name: 'Snow Leopard',
    facts: [
      `Snow Leopards are native to the high, rugged mountain ranges of Central and South Asia.`,
      `Their thick, white-gray fur provides exceptional camouflage in their snowy, rocky habitat.`,
      `They have a huge, thick tail (up to 3 feet long) used for balance and wrapped around their body for warmth while resting.`,
      `They are primarily crepuscular, active at dawn and dusk.`,
      `Snow Leopards can hunt prey up to three times their size, such as wild sheep and ibex.`,
      `They are unable to roar like lions or tigers, communicating instead with chuffs, growls, and hisses.`,
      `Their large, wide paws act like snowshoes, distributing their weight evenly for travel over snow.`,
      `Due to their elusive nature, they are often called the "ghost of the mountains."`,
      `They are considered vulnerable, with fewer than 10,000 individuals left in the wild.`,
      `They have a massive nasal cavity to help warm the thin, cold air they breathe.`
    ]
  },
  {
    name: 'Blue Jay',
    facts: [
      `The Blue Jay is known for its vibrant blue, black, and white plumage, found across eastern North America.`,
      `Despite their vivid color, the blue color is not pigment but a trick of light due to the way their feathers are structured.`,
      `They are intelligent birds, known to mimic the calls of hawks to scare off other birds at feeders.`,
      `Blue Jays are highly territorial, defending their nests aggressively against intruders.`,
      `They are omnivores, eating seeds, nuts, insects, and small vertebrates.`,
      `They are excellent planners, often hiding thousands of acorns to store food for the winter.`,
      `Blue Jays often suffer from habitat loss due to development in their woodland and suburban environments.`,
      `Their crest raises and lowers to communicate aggression or excitement.`,
      `They are known to be monogamous, forming strong pair bonds that last a lifetime.`,
      `They transport nuts and acorns in a gullet pouch in their throat, carrying multiple at once.`
    ]
  },
  {
    name: 'Greenland Shark',
    facts: [
      `The Greenland Shark has the longest lifespan of any known vertebrate, estimated to live over 400 years.`,
      `It is one of the largest sharks, growing up to 24 feet long.`,
      `It lives in the frigid, deep waters of the Arctic and North Atlantic oceans.`,
      `It is an extremely slow swimmer, moving at a top speed of only 1.7 mph.`,
      `The shark's flesh is toxic due to high levels of urea and trimethylamine oxide.`,
      `They are often almost completely blind due to parasites attached to their corneas.`,
      `Despite being slow, they are effective predators, likely ambushing sleeping seals.`,
      `Their eyes have a high concentration of the hormone adrenaline, helping them hunt in the dark.`,
      `They take about 150 years to reach sexual maturity.`,
      `Their diet includes fish, squid, seals, and even caribou that have fallen into the water.`
    ]
  },
  {
    name: 'Koala',
    facts: [
      `Koalas are marsupials endemic to Australia and are not bears.`,
      `They sleep for up to 20 hours a day, mainly because their eucalyptus leaf diet is low in nutrients.`,
      `They get almost all their water from the eucalyptus leaves they eat.`,
      `Koalas have fingerprints very similar to human fingerprints.`,
      `They have two opposable thumbs on each forepaw, helping them grip branches firmly.`,
      `Baby koalas, called "joeys," stay in their mother's pouch for about six months.`,
      `Before eating solid leaves, joeys consume a paste called "pap" made from their mother's feces.`,
      `Male koalas have a large, dark scent gland on their chest used to mark trees.`,
      `Koalas communicate with deep, bass bellows and cries.`,
      `They are threatened by habitat loss, climate change, and disease (Chlamydia).`
    ]
  },
  {
    name: 'Beluga Whale',
    facts: [
      `Beluga whales are often called "canaries of the sea" because of their wide range of vocalizations.`,
      `They are highly social and live in large groups called pods.`,
      `They are born gray and gradually turn white as they mature.`,
      `Unlike most whales, belugas can turn their necks, thanks to unfused cervical vertebrae.`,
      `Their foreheads have a distinct, bulbous organ called a "melon," which they can change shape for echolocation.`,
      `Belugas are found primarily in the Arctic and sub-Arctic waters.`,
      `They lack a dorsal fin, which helps them swim safely under sea ice.`,
      `The beluga's mouth is very flexible, allowing for a variety of facial expressions.`,
      `Their skin is much thicker and tougher than other whale species.`,
      `They are shallow divers, rarely going deeper than 3,000 feet.`
    ]
  },
  {
    name: 'Golden Poison Frog',
    facts: [
      `The Golden Poison Frog is considered the most poisonous vertebrate on Earth.`,
      `A single frog contains enough poison (batrachotoxin) to kill ten adult men.`,
      `The poison is secreted through glands in its skin and is a neurotoxin, paralyzing nerves.`,
      `They are native to the Pacific coast of Colombia, living in small rainforest patches.`,
      `They are diurnal (active during the day), relying on their bright color as a warning.`,
      `The frogs do not produce the toxin themselves but acquire it by eating specific local insects.`,
      `The indigenous Emberá people historically used the frog's poison to tip their hunting darts.`,
      `They are quite small, rarely growing larger than 2 inches.`,
      `In captivity, where they don't eat the toxic insects, they lose their toxicity.`,
      `They are critically endangered due to habitat destruction and illegal collecting.`
    ]
  },
  {
    name: 'Opossum',
    facts: [
      `The Virginia Opossum is North America's only marsupial.`,
      `When severely frightened, they will "play possum," entering an involuntary catatonic state.`,
      `They have a prehensile tail that they can use to grab branches or carry small objects.`,
      `They have 50 teeth, more than any other land mammal in North America.`,
      `Opossums are highly resistant to snake venom.`,
      `They have a short lifespan in the wild, typically only 1 to 2 years.`,
      `They rarely contract rabies because their body temperature is too low for the virus to thrive.`,
      `They are excellent climbers and spend most of their time in trees.`,
      `They have an opposable hallux (thumb) on their hind feet for grasping.`,
      `They are omnivores and eat almost anything, including insects, plants, and carrion.`
    ]
  },
  {
    name: 'Sloth',
    facts: [
      `Sloths are famous for being the world's slowest mammals.`,
      `They spend almost their entire lives hanging upside down from trees.`,
      `Their slow movement is a survival mechanism, making them hard for predators to spot.`,
      `A sloth's metabolism is so slow that it can take up to a month to digest a single leaf.`,
      `They have specialized muscles that allow them to hold onto a branch even while sleeping.`,
      `Algae often grows on their coarse fur, providing camouflage and sometimes food.`,
      `Sloths usually descend from trees only once a week to defecate (poop).`,
      `They have three extra neck vertebrae, allowing them to turn their head 270 degrees.`,
      `Despite their slow land movement, they are surprisingly good swimmers.`,
      `They have three toes on each foot (three-toed sloths) or two toes on their forelimbs (two-toed sloths).`
    ]
  },
  {
    name: 'Sea Otter',
    facts: [
      `Sea otters are the heaviest members of the weasel family but the smallest marine mammals.`,
      `They are unique among marine mammals for having no blubber, relying solely on their dense fur for warmth.`,
      `They have the densest fur of any animal, with up to 1 million hairs per square inch.`,
      `Sea otters hold hands or wrap themselves in kelp when sleeping to avoid drifting apart.`,
      `They are one of the few mammals known to use tools, often cracking shellfish on a rock placed on their chest.`,
      `They are voracious eaters, consuming up to 25% of their body weight in food every day.`,
      `They often carry their favorite rock (the "tool") in a small pouch of skin under their foreleg.`,
      `A group of resting sea otters is called a "raft."`,
      `They are found along the coasts of the northern Pacific Ocean.`,
      `A baby otter (pup) is so buoyant its mother must hold it down to dive.`
    ]
  },
  {
    name: 'Secretary Bird',
    facts: [
      `The Secretary Bird is a large, mostly terrestrial bird of prey native to Africa.`,
      `It is famous for its hunting method: kicking and stomping venomous snakes to death.`,
      `It has very long legs, almost twice the length of its body, useful for walking through tall grass.`,
      `It has an amazing running speed of up to 15 mph.`,
      `Its name comes from the long crest of black feathers on its head, resembling quill pens stuck behind a secretary's ear.`,
      `It builds large, flat nests high in acacia trees.`,
      `They are monogamous and mate for life.`,
      `When hunting, it uses its wings as a shield to protect against snake bites.`,
      `It is an agile flyer, despite preferring to walk.`,
      `Its preferred habitat is the open grasslands and savannas of sub-Saharan Africa.`
    ]
  },
  {
    name: 'Capuchin Monkey',
    facts: [
      `Capuchin monkeys are considered the most intelligent New World monkeys.`,
      `They are known for their sophisticated tool use, including cracking nuts with stones and rubbing plants on their fur to repel insects.`,
      `They have a prehensile tail used as a fifth limb for grasping and climbing.`,
      `Their name comes from the capuchin friars, as their coloration resembles the friars' dark brown hoods.`,
      `They are highly social and live in large, cooperative groups of up to 40 individuals.`,
      `Capuchins are omnivores, eating fruit, insects, and small vertebrates.`,
      `They sometimes use rocks to dig out small buried animals.`,
      `They are known to practice "social grooming" to maintain troop bonds.`,
      `They live in the tropical forests of Central and South America.`,
      `They are known for their impressive learning capabilities and long-term memory.`
    ]
  },
  {
    name: 'Bumblebee Bat',
    facts: [
      `The Bumblebee Bat, or Kitti's Hog-Nosed Bat, is the world's smallest mammal.`,
      `It weighs only about 2 grams and is about the size of a large bumblebee.`,
      `It is critically endangered and found only in a few limestone caves in Thailand and Myanmar.`,
      `It is a nocturnal insectivore, feeding on insects caught near the tops of teak trees.`,
      `Its small size helps it maneuver through dense forest and small insect swarms.`,
      `Females give birth to only one young per year.`,
      `They roost in caves in groups of up to 100 individuals.`,
      `Its hog-like nose flap is used for directing the sounds it uses for echolocation.`,
      `It is considered a "relict species" due to its highly restricted geographical range.`,
      `The bat's wingspan is roughly 6 inches wide.`
    ]
  },
  {
    name: 'Armadillo',
    facts: [
      `Armadillos are famous for their tough, bony armor shell.`,
      `The nine-banded armadillo is the only species found in the United States.`,
      `Their shells are composed of bony plates covered by non-overlapping scales (scutes).`,
      `The Three-Banded Armadillo is the only species that can completely roll into a defensive ball.`,
      `They are excellent diggers, using their large claws to forage for insects and build extensive burrows.`,
      `Armadillos have very poor eyesight and rely on their sharp sense of smell to find food.`,
      `They are primarily nocturnal.`,
      `Female nine-banded armadillos always give birth to identical quadruplets.`,
      `Armadillos have unusually low body temperatures compared to most mammals.`,
      `They can hold their breath for up to six minutes to walk across the bottom of shallow streams.`
    ]
  },
  {
    name: 'King Cobra',
    facts: [
      `The King Cobra is the world's longest venomous snake, growing up to 18 feet long.`,
      `Its venom is a neurotoxin powerful enough to kill an elephant or up to 20 humans.`,
      `They are the only snakes that build nests for their eggs, usually a mound of leaves and dirt.`,
      `Unlike most snakes, they feed mainly on other snakes, sometimes cannibalizing their own species.`,
      `When threatened, a King Cobra can raise up to a third of its body off the ground.`,
      `Their famous "hood" is formed by long ribs that can be expanded using muscle.`,
      `They are found in forests from India through Southeast Asia.`,
      `They are not true cobras but belong to their own unique genus, *Ophiophagus*.`,
      `The female guards her nest aggressively until the eggs hatch.`,
      `They have a relatively long lifespan, often living over 20 years.`
    ]
  },
  {
    name: 'Wolverine',
    facts: [
      `The Wolverine is the largest and most ferocious member of the weasel family (Mustelidae).`,
      `Despite its small size, it is incredibly strong and fearless, capable of taking down prey much larger than itself.`,
      `They are solitary animals that maintain vast territories in the Arctic and boreal forests.`,
      `They have powerful jaws and teeth that can crush frozen meat and bone.`,
      `Wolverines are excellent diggers and climbers.`,
      `They possess a dense, water-repellent coat that keeps them warm in sub-zero temperatures.`,
      `They use specialized scent glands to mark their food caches and dens.`,
      `They are primarily scavengers, often chasing bears and wolves away from their kills.`,
      `A wolverine can travel over 15 miles in a single day searching for food.`,
      `Their name may come from the European dialect word for "shrew" or "ferret."`
    ]
  },
  {
    name: 'Three-Banded Armadillo',
    facts: [
      `The Three-Banded Armadillo is the only species of armadillo that can roll completely into a protective ball.`,
      `Its hard, bony shell is composed of plates covered by non-overlapping scales (scutes).`,
      `They are excellent diggers, but prefer to use abandoned burrows rather than digging their own.`,
      `They are primarily nocturnal, relying on a sharp sense of smell to forage for insects.`,
      `They have very poor eyesight.`,
      `They can walk on the tips of their claws on their hind legs.`,
      `They live in the open grasslands and savannas of central South America.`,
      `Unlike the nine-banded armadillo, they rarely cross water.`,
      `When rolled up, they can remain tightly closed for up to an hour.`,
      `They can hold their breath for up to six minutes to avoid inhaling dirt when digging.`
    ]
  },
  {
    name: 'Nine-Banded Armadillo',
    facts: [
      `The Nine-Banded Armadillo is the only armadillo species found commonly in the United States.`,
      `It is an excellent jumper, often leaping straight up when startled.`,
      `They are exceptional diggers, creating burrows up to 15 feet deep for shelter.`,
      `Females always give birth to identical quadruplets (four babies from a single egg).`,
      `They have a long, sticky tongue used to lap up ants, termites, and grubs.`,
      `They can hold their breath for up to six minutes, allowing them to walk underwater across riverbeds.`,
      `Their shell is not flexible enough to roll into a complete ball for defense.`,
      `They are primarily nocturnal, hunting mostly at dusk and throughout the night.`,
      `They have poor vision but a highly developed sense of smell.`,
      `They can swim by gulping air to inflate their stomachs, which increases buoyancy.`
    ]
  },
  {
    name: 'White-Faced Saki Monkey',
    facts: [
      `The White-Faced Saki Monkey is a New World monkey known for its long, shaggy hair, especially around the face.`,
      `Males have a contrasting white or pale face against a black body, while females are mostly brownish-gray.`,
      `They are highly agile, moving through the Amazonian rainforest canopy by leaping and running on all fours.`,
      `They are specialized frugivores, eating mostly fruit, but are known to bite into hard, unripe fruits.`,
      `They often strip the skin and pulp off fruit before consuming it.`,
      `They are found in the rainforests of Brazil, French Guiana, Guyana, Suriname, and Venezuela.`,
      `The saki monkey sleeps rolled up in a ball in the fork of a tree.`,
      `They use their long, non-prehensile tail purely for balance while leaping.`,
      `They are generally shy and difficult to spot in the wild.`,
      `They have powerful jaws used to crush seeds and open nuts.`
    ]
  },
{
name: 'Megalodon',
facts: [
Megalodon was the largest shark that ever lived, growing up to 60 feet long.,
Its bite force was powerful enough to crush a car.,
The largest megalodon tooth discovered was about the length of a TV remote.,
Megalodon went extinct about 2.6 million years ago.,
It was an important apex predator in ancient oceans.,
Megalodon teeth are the most commonly found fossils, with hundreds discovered.,
Its jaws could span 2.7 by 3.4 meters wide.,
Megalodon was three times larger than a great white shark.,
It lived during the Miocene and Pliocene epochs.,
Megalodon primarily hunted whales and other large marine animals.
]
},
{
name: 'Tasmanian Tiger',
facts: [
The Tasmanian Tiger, or Thylacine, was a marsupial, not a true tiger.,
It had tiger-like stripes on its back and a dog-like head.,
Thylacines went extinct in 1936, with the last known individual dying in captivity.,
They were the largest carnivorous marsupials of modern times.,
The closest living relatives are Tasmanian devils and numbat.,
Thylacines had an abdominal pouch similar to a kangaroo.,
They were shy and avoided humans, contrary to popular belief.,
Hunting and habitat loss led to their extinction.,
Thylacines could open their jaws up to 80 degrees.,
They were native to Tasmania, mainland Australia, and New Guinea.
]
},
{
name: 'Dire Wolf',
facts: [
Dire wolves were about 25% larger than modern gray wolves.,
They had a bite force 30% stronger than a gray wolf.,
Dire wolves lived during the Late Pleistocene and Early Holocene.,
They were native to the Americas.,
Dire wolves often hunted horses and other large prey.,
They weighed up to 150 pounds and stood about 2.5 feet at the shoulder.,
Fossils show they had robust builds with shorter legs.,
Dire wolves went extinct around 10,000 years ago.,
They are not direct ancestors of modern wolves.,
Over 4,000 dire wolf fossils have been found at Rancho La Brea.
]
},
{
name: 'Dodo',
facts: [
The dodo was a flightless bird endemic to Mauritius.,
It weighed about 50 pounds and stood up to 3 feet tall.,
Dodos had blue-gray plumage and a large blackish bill.,
They went extinct in the late 17th century due to human activity.,
The dodo's name comes from the Portuguese word for "foolish.",
Dodos laid a single egg on the ground.,
They were fearless of humans, making them easy to hunt.,
The dodo is a symbol of extinction.,
Fossils show they were related to pigeons.,
Dodos primarily ate fruits and nuts.
]
},
{
name: 'Passenger Pigeon',
facts: [
Passenger pigeons were once the most abundant bird in North America, with populations of 5 billion.,
They could fly at speeds up to 62 mph.,
Their flocks could darken the sky for days.,
They went extinct in 1914, with the last individual dying in captivity.,
Males were bluish-gray with red eyes; females were smaller.,
They nested in massive colonies covering hundreds of square miles.,
Habitat destruction and overhunting caused their extinction.,
They fed mainly on mast, fruits, and invertebrates.,
Passenger pigeons were highly social and bred communally.,
They could live up to 16.5 inches in length.
]
},
{
name: 'Smilodon',
facts: [
Smilodon, or saber-toothed cat, had 7-inch canines.,
It could open its mouth to 120 degrees.,
Smilodon weighed up to 880 pounds.,
It lived in the Americas during the Pleistocene.,
Smilodon was not closely related to modern tigers.,
Its canines were used for slashing, not biting.,
It was an ambush predator, not a fast runner.,
Smilodon went extinct around 10,000 years ago.,
Fossils show it had powerful forelimbs for grappling prey.,
It primarily hunted large herbivores like bison.
]
},
{
name: 'Woolly Mammoth',
facts: [
Woolly mammoths were covered in shaggy hair up to 3 feet long.,
They stood up to 13 feet tall at the shoulder.,
Woolly mammoths had curved tusks up to 14 feet long.,
They lived from 700,000 to 4,000 years ago.,
Their diet consisted of grasses and sedges.,
They had small ears to conserve heat.,
Woolly mammoths went extinct due to climate change and hunting.,
Some lived on Wrangel Island until 1650 BC.,
They are ancestors of modern elephants.,
Males weighed up to 6 tons.
]
},
{
name: 'Quagga',
facts: [
The quagga was a subspecies of plains zebra.,
It had zebra stripes only on its head and neck.,
Quaggas lived in South Africa until the late 19th century.,
They formed vast herds in grasslands.,
The last wild quagga was shot in 1878.,
Quaggas were herbivores, grazing on grasses.,
They were mistaken for a separate species initially.,
The Quagga Project aims to breed look-alikes.,
Only one photograph exists of a living quagga.,
Quaggas weighed about 550 pounds.
]
},
{
name: 'Great Auk',
facts: [
The great auk was a flightless seabird.,
It stood about 30 inches tall and weighed 11 pounds.,
Great auks had black plumage with white bellies.,
They went extinct in 1844 due to hunting.,
They nested in large colonies on rocky islands.,
Great auks used wings for swimming underwater.,
Their diet consisted of fish and crustaceans.,
They were found in the North Atlantic.,
Sailors hunted them for meat and feathers.,
The great auk laid a single large egg.
]
},
{
name: "Steller's Sea Cow",
facts: [
Steller's sea cow was discovered in 1741 and extinct by 1768.,
It grew up to 30 feet long and weighed 10 tons.,
It was a sirenian, related to manatees.,
Steller's sea cows lived in the Bering Sea.,
They had thick, wrinkled, bark-like skin.,
Their diet was kelp and other seaweeds.,
They were hunted by fur traders for meat.,
Babies were born year-round, often in fall.,
They were gregarious, living in small herds.,
Steller's sea cow was the largest sirenian.
]
},
{
name: 'Irish Elk',
facts: [
The Irish elk had antlers spanning up to 12 feet.,
It stood 7 feet tall at the shoulder.,
Irish elk weighed about 1,500 pounds.,
They lived across Eurasia during the Pleistocene.,
Antlers were used for display and combat.,
They went extinct around 7,700 years ago.,
Irish elk were herbivores, eating grasses and leaves.,
Males had larger antlers than females.,
They are not closely related to modern elk.,
Fossils show they thrived in open woodlands.
]
},
{
name: 'Moa',
facts: [
Moa were giant flightless birds endemic to New Zealand.,
The largest species stood 12 feet tall.,
They weighed up to 550 pounds.,
Moa went extinct around 1440 AD due to Maori hunting.,
There were 11 species of moa.,
They had long necks and strong legs.,
Moa diet included leaves, fruits, and twigs.,
They laid large eggs on the ground.,
Moa were preyed upon by Haast's eagle.,
Fossils are abundant in swamps and caves.
]
},
{
name: 'Aurochs',
facts: [
The aurochs was the wild ancestor of domestic cattle.,
It stood up to 6 feet at the shoulder.,
Aurochs weighed up to 1,800 pounds.,
They lived in Europe, Asia, and North Africa.,
Aurochs had long, lyre-shaped horns.,
They went extinct in 1627.,
Aurochs were herbivores, grazing on grasses.,
They were hunted by early humans.,
The last aurochs lived in Poland.,
Breeding back projects aim to recreate them.
]
},
{
name: 'Giant Ground Sloth',
facts: [
Giant ground sloths like Megatherium stood 20 feet tall when upright.,
They weighed up to 4 tons.,
They lived in the Americas during the Pleistocene.,
Giant sloths had large claws for pulling branches.,
Their diet was leaves and soft plants.,
They went extinct around 10,000 years ago.,
Some evidence suggests human hunting contributed.,
They could rear up on hind legs to reach vegetation.,
Giant sloths had slow metabolisms.,
Fossils show they had peg-like teeth.
]
},
{
name: "Haast's Eagle",
facts: [
"Haast's eagle was the largest eagle ever known.,
It had a wingspan up to 9 feet.,
It weighed up to 33 pounds.,
Haast's eagle preyed on moa birds.,
It lived in New Zealand until about 1400 AD.,
Its talons were as large as a tiger's claws.,
It went extinct due to moa extinction and human arrival.,
Haast's eagle could snatch prey weighing 440 pounds.,
It had keen eyesight for hunting.,
Fossils include bones with eagle talon marks.
]
},
{
name: 'Glyptodon',
facts: [
Glyptodon was a giant armadillo relative.,
It was 10 feet long and weighed 2 tons.,
Glyptodon had a armored shell like a turtle.,
It lived in South America during the Pleistocene.,
Its tail had bony spikes for defense.,
Glyptodon was a herbivore, eating grasses.,
It went extinct around 10,000 years ago.,
Young glyptodons had softer armor.,
It used claws for digging and foraging.,
Glyptodon fossils are found in Argentina.
]
},
{
name: 'Cave Bear',
facts: [
Cave bears were mostly vegetarian, eating plants.,
They weighed up to 2,200 pounds.,
Cave bears lived in Europe during the Pleistocene.,
They hibernated in caves, leaving fossils there.,
Cave bears had stronger bites than modern bears.,
They went extinct around 24,000 years ago.,
Early humans may have worshiped them.,
Males were much larger than females.,
Cave bears had blunt teeth for grinding vegetation.,
Their population declined due to climate change.
]
},
{
name: 'American Mastodon',
facts: [
American mastodons were covered in dense fur.,
They stood 9 feet tall and weighed 10 tons.,
Mastodons had straight tusks up to 13 feet long.,
They lived in North America until 10,000 years ago.,
Their name means "nipple tooth" due to molar shape.,
Mastodons browsed on trees and shrubs.,
They are not true elephants but proboscideans.,
Human hunting contributed to their extinction.,
Fossils show they had low-domed skulls.,
Mastodons migrated seasonally for food.
]
},
{
name: 'Arthropleura',
facts: [
Arthropleura was the largest land invertebrate, up to 8 feet long.,
It was a giant millipede from the Carboniferous period.,
Arthropleura had no known predators due to size.,
It ate plants, possibly fungi or decaying matter.,
It lived 300 million years ago in swampy forests.,
Arthropleura could weigh as much as a large dog.,
Its body was segmented with many legs.,
Fossils are found in Europe and North America.,
It breathed through spiracles along its body.,
Arthropleura benefited from high oxygen levels.
]
},
{
name: 'Titanoboa',
facts: [
Titanoboa was the largest snake ever, up to 50 feet long.,
It weighed over 2,500 pounds.,
Titanoboa lived 60 million years ago in South America.,
It was a constrictor, hunting large vertebrates.,
Its fossils were found in Colombia's Cerrejón Formation.,
Titanoboa could swallow prey whole.,
It lived in tropical rainforests.,
Titanoboa had heat-sensing organs.,
It went extinct due to cooling climate.,
It preyed on early crocodiles and giant turtles.
]
},
{
name: 'Spinosaurus',
facts: [
Spinosaurus was the largest carnivorous dinosaur, up to 60 feet long.,
It had a sail-like fin on its back up to 7 feet tall.,
Spinosaurus was semi-aquatic, hunting in rivers.,
It lived in North Africa 100 million years ago.,
Its jaws resembled a crocodile's for catching fish.,
Spinosaurus had conical teeth for gripping slippery prey.,
It weighed up to 9.9 tons.,
Fossils show it had dense bones for diving.,
Spinosaurus may have been the first dinosaur to swim.,
It coexisted with other theropods like Carcharodontosaurus.
]
},
{
name: 'Dunkleosteus',
facts: [
Dunkleosteus was a giant armored fish up to 30 feet long.,
It lived 382-358 million years ago in the Devonian.,
Its bite force was 8,000 pounds per square inch.,
Dunkleosteus had bony plates instead of teeth.,
It was an apex predator of ancient seas.,
Fossils show self-sharpening jaw edges.,
Dunkleosteus could open its mouth in 60 milliseconds.,
It weighed up to 4 tons.,
It had no true teeth but slicing plates.,
Dunkleosteus fossils are found worldwide.
]
},
{
name: 'Meganeura',
facts: [
Meganeura was a giant dragonfly with a 2.5-foot wingspan.,
It lived 300 million years ago in the Carboniferous.,
High oxygen levels allowed its enormous size.,
Meganeura was a predator of smaller insects.,
It resembled modern dragonflies but was unrelated.,
Fossils are wing impressions from swamps.,
It could not fold its wings like modern insects.,
Meganeura hunted in fern forests.,
It was the largest flying insect ever.,
Its body was up to 1 foot long.
]
},
{
name: 'Hallucigenia',
facts: [
Hallucigenia was a worm-like creature from the Cambrian period.,
It was 0.5 to 2 inches long.,
It had seven pairs of legs and spines.,
Hallucigenia lived 505 million years ago.,
Its mouth was lined with tiny teeth.,
It walked on stilt-like legs.,
Fossils were first reconstructed upside down.,
Hallucigenia was a lobopodian, related to velvet worms.,
It scavenged or fed on microbes.,
Its head was hard to distinguish from its tail.
]
},
{
name: 'Anomalocaris',
facts: [
Anomalocaris was an early apex predator of the Cambrian.,
It grew up to 3 feet long.,
Anomalocaris had compound eyes with 16,000 lenses.,
It lived 520 million years ago.,
Its mouth had circular plates for grinding prey.,
Anomalocaris used grasping appendages to catch food.,
It swam with flaps along its body.,
Fossils show bite marks on trilobites.,
It was one of the first large swimmers.,
Anomalocaris was arthropod-like but unique.
]
}
  {
    name: 'Giant Armadillo',
    facts: [
      `The Giant Armadillo is the largest species of armadillo, weighing up to 110 pounds.`,
      `It has huge, curved claws—up to 8 inches long—used for digging and defense.`,
      `It is so well-armored that few predators attempt to attack it.`,
      `It is found in the grasslands and rainforests of South America.`,
      `They dig immense burrows with large, wide entrances that can be used by many other animals.`,
      `They are specialized predators of termites and ants, eating thousands in a single meal.`,
      `They have a very long tongue used to capture subterranean insects.`,
      `They are mostly nocturnal and spend up to 75% of their lives underground.`,
      `They are considered vulnerable due to habitat loss.`,
      `When disturbed, they make a deep rumbling sound.`
    ]
  }
];

// --- SIGHT WORD DATABASE (100 words and custom options, homophones removed) ---
window.sightWordsData = [
    { word: 'the', options: ['the', 'this', 'that'], correct: 'the' },
    { word: 'of', options: ['of', 'off', 'for'], correct: 'of' },
    { word: 'and', options: ['and', 'any', 'can'], correct: 'and' },
    { word: 'a', options: ['a', 'I', 'at'], correct: 'a' },
    { word: 'to', options: ['to', 'go', 'do'], correct: 'to' }, 
    { word: 'in', options: ['in', 'is', 'on'], correct: 'in' },
    { word: 'is', options: ['is', 'in', 'it'], correct: 'is' },
    { word: 'you', options: ['you', 'your', 'my'], correct: 'you' },
    { word: 'that', options: ['that', 'what', 'the'], correct: 'that' },
    { word: 'it', options: ['it', 'is', 'at'], correct: 'it' },
    { word: 'he', options: ['he', 'we', 'she'], correct: 'he' },
    { word: 'was', options: ['was', 'saw', 'has'], correct: 'was' },
    { word: 'for', options: ['for', 'from', 'get'], correct: 'for' }, 
    { word: 'on', options: ['on', 'in', 'of'], correct: 'on' },
    { word: 'are', options: ['are', 'an', 'ate'], correct: 'are' },
    { word: 'as', options: ['as', 'is', 'at'], correct: 'as' },
    { word: 'with', options: ['with', 'when', 'which'], correct: 'with' },
    { word: 'his', options: ['his', 'has', 'is'], correct: 'his' },
    { word: 'they', options: ['they', 'the', 'them'], correct: 'they' },
    { word: 'I', options: ['I', 'a', 'it'], correct: 'I' },
    { word: 'at', options: ['at', 'it', 'an'], correct: 'at' },
    { word: 'be', options: ['be', 'by', 'but'], correct: 'be' },
    { word: 'this', options: ['this', 'that', 'his'], correct: 'this' },
    { word: 'have', options: ['have', 'has', 'he'], correct: 'have' },
    { word: 'from', options: ['from', 'for', 'form'], correct: 'from' },
    { word: 'or', options: ['or', 'of', 'on'], correct: 'or' },
    { word: 'one', options: ['one', 'on', 'own'], correct: 'one' },
    { word: 'had', options: ['had', 'has', 'hide'], correct: 'had' },
    { word: 'by', options: ['by', 'be', 'my'], correct: 'by' },
    { word: 'words', options: ['words', 'work', 'was'], correct: 'words' },
    { word: 'but', options: ['but', 'put', 'bet'], correct: 'but' },
    { word: 'not', options: ['not', 'now', 'note'], correct: 'not' },
    { word: 'what', options: ['what', 'that', 'when'], correct: 'what' },
    { word: 'all', options: ['all', 'call', 'at'], correct: 'all' },
    { word: 'were', options: ['were', 'we', 'when'], correct: 'were' },
    { word: 'we', options: ['we', 'he', 'me'], correct: 'we' },
    { word: 'when', options: ['when', 'then', 'what'], correct: 'when' },
    { word: 'your', options: ['your', 'you', 'my'], correct: 'your' },
    { word: 'can', options: ['can', 'ran', 'and'], correct: 'can' },
    { word: 'said', options: ['said', 'side', 'say'], correct: 'said' },
    { word: 'there', options: ['there', 'these', 'three'], correct: 'there' },
    { word: 'use', options: ['use', 'us', 'see'], correct: 'use' },
    { word: 'an', options: ['an', 'a', 'on'], correct: 'an' },
    { word: 'each', options: ['each', 'eat', 'which'], correct: 'each' },
    { word: 'which', options: ['which', 'with', 'each'], correct: 'which' },
    { word: 'she', options: ['she', 'he', 'we'], correct: 'she' },
    { word: 'do', options: ['do', 'go', 'to'], correct: 'do' },
    { word: 'how', options: ['how', 'now', 'who'], correct: 'how' },
    { word: 'their', options: ['their', 'them', 'these'], correct: 'their' },
    { word: 'if', options: ['if', 'is', 'it'], correct: 'if' },
    { word: 'will', options: ['will', 'well', 'we'], correct: 'will' },
    { word: 'up', options: ['up', 'us', 'put'], correct: 'up' },
    { word: 'other', options: ['other', 'over', 'mother'], correct: 'other' },
    { word: 'about', options: ['about', 'but', 'out'], correct: 'about' },
    { word: 'out', options: ['out', 'put', 'odd'], correct: 'out' },
    { word: 'many', options: ['many', 'money', 'man'], correct: 'many' },
    { word: 'then', options: ['then', 'when', 'ten'], correct: 'then' },
    { word: 'them', options: ['them', 'then', 'these'], correct: 'them' },
    { word: 'these', options: ['these', 'those', 'the'], correct: 'these' },
    { word: 'so', options: ['so', 'no', 'go'], correct: 'so' },
    { word: 'some', options: ['some', 'come', 'same'], correct: 'some' },
    { word: 'her', options: ['her', 'he', 'has'], correct: 'her' },
    { word: 'would', options: ['would', 'could', 'should'], correct: 'would' },
    { word: 'make', options: ['make', 'take', 'like'], correct: 'make' },
    { word: 'like', options: ['like', 'look', 'live'], correct: 'like' },
    { word: 'him', options: ['him', 'his', 'home'], correct: 'him' },
    { word: 'into', options: ['into', 'in', 'to'], correct: 'into' },
    { word: 'time', options: ['time', 'tame', 'came'], correct: 'time' },
    { word: 'has', options: ['has', 'his', 'had'], correct: 'has' },
    { word: 'look', options: ['look', 'like', 'book'], correct: 'look' },
    { word: 'two', options: ['two', 'ten', 'try'], correct: 'two' },
    { word: 'more', options: ['more', 'make', 'most'], correct: 'more' },
    { word: 'write', options: ['write', 'white', 'with'], correct: 'write' },
    { word: 'go', options: ['go', 'no', 'do'], correct: 'go' },
    { word: 'see', options: ['see', 'saw', 'said'], correct: 'see' },
    { word: 'number', options: ['number', 'new', 'never'], correct: 'number' },
    { word: 'no', options: ['no', 'go', 'on'], correct: 'no' },
    { word: 'way', options: ['way', 'day', 'say'], correct: 'way' },
    { word: 'could', options: ['could', 'would', 'call'], correct: 'could' },
    { word: 'people', options: ['people', 'paper', 'pupil'], correct: 'people' },
    { word: 'my', options: ['my', 'me', 'by'], correct: 'my' },
    { word: 'than', options: ['than', 'that', 'ten'], correct: 'than' },
    { word: 'first', options: ['first', 'fast', 'find'], correct: 'first' },
    { word: 'water', options: ['water', 'wait', 'went'], correct: 'water' },
    { word: 'been', options: ['been', 'bend', 'bind'], correct: 'been' }, 
    { word: 'called', options: ['called', 'cold', 'can'], correct: 'called' },
    { word: 'who', options: ['who', 'how', 'when'], correct: 'who' },
    { word: 'soil', options: ['oil', 'old', 'boil'], correct: 'soil' },
    { word: 'sit', options: ['sit', 'sat', 'six'], correct: 'sit' },
    { word: 'now', options: ['now', 'how', 'no'], correct: 'now' },
    { word: 'find', options: ['find', 'fine', 'kind'], correct: 'find' },
    { word: 'long', options: ['long', 'look', 'low'], correct: 'long' },
    { word: 'down', options: ['down', 'now', 'done'], correct: 'down' },
    { word: 'day', options: ['day', 'way', 'say'], correct: 'day' },
    { word: 'did', options: ['did', 'do', 'down'], correct: 'did' },
    { word: 'get', options: ['get', 'go', 'got'], correct: 'get' },
    { word: 'come', options: ['come', 'came', 'see'], correct: 'come' },
    { word: 'made', options: ['made', 'had', 'mad'], correct: 'made' },
    { word: 'may', options: ['may', 'my', 'many'], correct: 'may' },
    { word: 'part', options: ['part', 'past', 'pat'], correct: 'part' },
];

// --- SENTENCES DATABASE (50 total sentences) ---
window.sentencesData = [
  { sentence: 'The Fennec Fox has big ears.', options: ['The Fennec Fox has big ears.', 'The fox can fly.', 'The bird can run.'], correct: 'The Fennec Fox has big ears.' },
  { sentence: 'I see a small axolotl.', options: ['I see a small axolotl.', 'I see a big shark.', 'I see a fast cheetah.'], correct: 'I see a small axolotl.' },
  { sentence: 'The pangolin can roll up.', options: ['The pangolin can swim.', 'The pangolin can roll up.', 'The pangolin can fly.'], correct: 'The pangolin can roll up.' },
  { sentence: 'Dinosaurs are big.', options: ['Dinosaurs are small.', 'Dinosaurs can fly.', 'Dinosaurs are big.'], correct: 'Dinosaurs are big.' },
  { sentence: 'The narwhal has a tusk.', options: ['The narwhal has a tusk.', 'The whale can swim.', 'The bee can jump.'], correct: 'The narwhal has a tusk.' },
  { sentence: 'We like to play.', options: ['We like to play.', 'We like to run.', 'They like to play.'], correct: 'We like to play.' },
  { sentence: 'Look at the okapi.', options: ['Look at the okapi.', 'See the okapi fly.', 'The bird can see.'], correct: 'Look at the okapi.' },
  { sentence: 'My platypus is small.', options: ['My platypus is big.', 'My platypus is small.', 'The ant is small.'], correct: 'My platypus is small.' },
  { sentence: 'I have a pet blobfish.', options: ['I have a pet blobfish.', 'You have a penguin.', 'I see a blobfish.'], correct: 'I have a pet blobfish.' },
  { sentence: 'The Komodo Dragon is big.', options: ['The Komodo Dragon is small.', 'The Komodo Dragon is big.', 'The lion is tall.'], correct: 'The Komodo Dragon is big.' },
  { sentence: 'She is at home now.', options: ['She is at home now.', 'He is on the bus now.', 'They are here now.'], correct: 'She is at home now.' },
  { sentence: 'We can go to the water.', options: ['We can go to the water.', 'You can go to the store.', 'They will go to the park.'], correct: 'We can go to the water.' },
  { sentence: 'He had a long day.', options: ['He had a long day.', 'She has a big book.', 'It was a good time.'], correct: 'He had a long day.' },
  { sentence: 'I see two big dogs.', options: ['I see two big dogs.', 'I have many small cats.', 'They want one more toy.'], correct: 'I see two big dogs.' },
  { sentence: 'They were called back.', options: ['They were called back.', 'We are there now.', 'You can look up.'], correct: 'They were called back.' },
  { sentence: 'The time has come to stop.', options: ['The time has come to stop.', 'This is the first time.', 'That had been his way.'], correct: 'The time has come to stop.' },
  { sentence: 'Who will make the list?', options: ['Who will make the list?', 'How will they write it?', 'What did she find?'], correct: 'Who will make the list?' },
  { sentence: 'Look at all the animals.', options: ['Look at all the animals.', 'Look at some flowers.', 'Look for other things.'], correct: 'Look at all the animals.' },
  { sentence: 'My mother is writing now.', options: ['My mother is writing now.', 'My father is working now.', 'Your brother is reading now.'], correct: 'My mother is writing now.' },
  { sentence: 'Can you go outside?', options: ['Can you go outside?', 'Will you go up stairs?', 'Did they come home?'], correct: 'Can you go outside?' },
  { sentence: 'That was the first time.', options: ['That was the first time.', 'This is the last chance.', 'It had been a good try.'], correct: 'That was the first time.' },
  { sentence: 'We have many good words.', options: ['We have many good words.', 'They had some old things.', 'I want more food.'], correct: 'We have many good words.' },
  { sentence: 'He is from another place.', options: ['He is from another place.', 'She is going far away.', 'They came here by chance.'], correct: 'He is from another place.' },
  { sentence: 'Did you find your ball?', options: ['Did you find your ball?', 'Have you lost my keys?', 'Can you see the house?'], correct: 'Did you find your ball?' },
  { sentence: 'I am going down the hill.', options: ['I am going down the hill.', 'She is running up the street.', 'We are playing by the park.'], correct: 'I am going down the hill.' },
  { sentence: 'This fish likes the water.', options: ['This fish likes the water.', 'That bird likes the air.', 'The cat likes the toy.'], correct: 'This fish likes the water.' },
  { sentence: 'Can she come with him?', options: ['Can she come with him?', 'Will he go with her?', 'Did they see each other?'], correct: 'Can she come with him?' },
  { sentence: 'The cat jumped on the box.', options: ['The cat jumped on the box.', 'The dog sat in the chair.', 'The bird flew up high.'], correct: 'The cat jumped on the box.' },
  { sentence: 'I will go and see the number.', options: ['I will go and see the number.', 'You should look for the book.', 'He has the part now.'], correct: 'I will go and see the number.' },
  { sentence: 'It is about the old house.', options: ['It is about the old house.', 'It is in the new store.', 'It was from the long way.'], correct: 'It is about the old house.' },
  { sentence: 'We had to make it work.', options: ['We had to make it work.', 'You need to try harder.', 'She should look out.'], correct: 'We had to make it work.' },
  { sentence: 'They had some food for us.', options: ['They had some food for us.', 'We gave them water and help.', 'She brought many apples.'], correct: 'They had some food for us.' },
  { sentence: 'This is the way home.', options: ['This is the way home.', 'This is the end of the road.', 'That is the first place.'], correct: 'This is the way home.' },
  { sentence: 'Could you write your name?', options: ['Could you write your name?', 'Will you read your book?', 'Can you call your friend?'], correct: 'Could you write your name?' },
  { sentence: 'She went out to play.', options: ['She went out to play.', 'He stayed in to rest.', 'They left by the back door.'], correct: 'She went out to play.' },
  { sentence: 'The small bird flew up.', options: ['The small bird flew up.', 'The big dog ran down.', 'The little fish swam over.'], correct: 'The small bird flew up.' },
  { sentence: 'I have more toys than you.', options: ['I have more toys than you.', 'You have less friends than him.', 'He likes those cars best.'], correct: 'I have more toys than you.' },
  { sentence: 'Each person must do this.', options: ['Each person must do this.', 'All people should try that.', 'Some of us can help him.'], correct: 'Each person must do this.' },
  { sentence: 'If he comes, we will go.', options: ['If he comes, we will go.', 'When she runs, I stop.', 'Since they left, I sleep.'], correct: 'If he comes, we will go.' },
  { sentence: 'This animal is called a wolf.', options: ['This animal is called a wolf.', 'That animal is a bear.', 'The big cat is a tiger.'], correct: 'This animal is called a wolf.' },
  { sentence: 'Put the book on the table.', options: ['Put the book on the table.', 'Leave the keys in the car.', 'Bring the pen to the box.'], correct: 'Put the book on the table.' },
  { sentence: 'I see them standing there.', options: ['I see them standing there.', 'We watch you running fast.', 'She looks at us now.'], correct: 'I see them standing there.' },
  { sentence: 'Who is the one that helped?', options: ['Who is the one that helped?', 'What did the other say?', 'When was the paper made?'], correct: 'Who is the one that helped?' },
  { sentence: 'You were part of the group.', options: ['You were part of the group.', 'They were out of the room.', 'We are near the window.'], correct: 'You were part of the group.' },
  { sentence: 'He should not be sad.', options: ['He should not be sad.', 'She must not be angry.', 'They will not be late.'], correct: 'He should not be sad.' },
  { sentence: 'We made a long line.', options: ['We made a long line.', 'She drew a small circle.', 'He built a tall house.'], correct: 'We made a long line.' },
  { sentence: 'The girl likes to run.', options: ['The girl likes to run.', 'The boy loves to jump.', 'The baby learns to walk.'], correct: 'The girl likes to run.' },
  { sentence: 'It is my favorite color.', options: ['It is my favorite color.', 'This is his best toy.', 'That was her big mistake.'], correct: 'It is my favorite color.' },
  { sentence: 'May I come inside now?', options: ['May I come inside now?', 'Should I go outside later?', 'Can you wait for me then?'], correct: 'May I come inside now?' },
  { sentence: 'This is his car, not hers.', options: ['This is his car, not hers.', 'That is her bike, not yours.', 'It is my toy, not mine.'], correct: 'This is his car, not hers.' },
];

// --- VIDEO DATABASE (Simple placeholders for embedding) ---
window.VIDEO_DATABASE = [
    { title: "Animal Fact Video 1: Fennec Foxes", url: "https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0" }, 
    { title: "Animal Fact Video 2: Axolotl Regeneration", url: "https://youtube/embed/es5NamAO0qU?si=u4GLRnqBXHmNjktb?controls=0" }, 
    { title: "Animal Fact Video 3: Goblin Shark Jaws", url: "https://youtube/embed/fYpn2u2Wag4?si=Bt1k7qULJDZpgCO_?controls=0" }, 
    { title: "Animal Fact Video 4: Pangolin Armor", url: "https://youtube/embed/5vfe_pTlGEQ?si=Z-Hnn7CmQ3Musix1?controls=0" }, 
    { title: "Animal Fact Video 5: Okapi's Long Tongue", url: "https://youtube/embed/4j5-4rjrbqM?si=3xf129zUgJ2BZnFD?controls=0" }, 
    { title: "Animal Fact Video 6: Komodo Dragon Venom", url: "https://youtube/embed/pFaSswGnT0I?si=fThm0AI63VF6OSRN=0" }, 
];
```
