/* data.js
   All the Gold Coast options the planner can suggest.
   Prices are approximate guide prices in Australian dollars and change often —
   every card links out to the official site so you can check the real price.
   "tags" are used to match an option to the traveller's interests.
*/

const ACCOMMODATION = [
  {
    name: "Gold Coast backpacker hostels",
    area: "Surfers Paradise",
    type: "Hostel dorm",
    nightly: 45,
    tags: ["nightlife", "beaches", "solo", "budget"],
    blurb: "Shared dorm rooms a short walk from the beach. The cheapest way to stay right in the middle of everything.",
    site: "https://www.yha.com.au/",
    search: "https://www.google.com/search?q=Surfers+Paradise+hostel+dorm"
  },
  {
    name: "BIG4 Gold Coast Holiday Parks",
    area: "Helensvale / Labrador",
    type: "Cabin or campsite",
    nightly: 95,
    tags: ["family", "nature", "budget", "themeparks"],
    blurb: "Cabins and powered sites with pools and playgrounds, handy to the theme parks.",
    site: "https://www.big4.com.au/",
    search: "https://www.google.com/search?q=BIG4+holiday+park+Gold+Coast"
  },
  {
    name: "Mantra Legends Hotel",
    area: "Surfers Paradise",
    type: "Hotel",
    nightly: 170,
    tags: ["beaches", "nightlife", "shopping", "family"],
    blurb: "Straightforward mid-range hotel on Surfers Paradise Boulevard, two minutes from the sand.",
    site: "https://www.mantra.com.au/",
    search: "https://www.google.com/search?q=Mantra+Legends+Hotel+Surfers+Paradise"
  },
  {
    name: "Self-contained apartment, Broadbeach",
    area: "Broadbeach",
    type: "Apartment",
    nightly: 190,
    tags: ["family", "food", "shopping", "beaches", "relax"],
    blurb: "Kitchen, laundry and a balcony. Broadbeach is quieter than Surfers and full of cafes.",
    site: "https://www.destinationgoldcoast.com/accommodation",
    search: "https://www.google.com/search?q=Broadbeach+self+contained+apartment+accommodation"
  },
  {
    name: "Sea World Resort",
    area: "Main Beach",
    type: "Resort",
    nightly: 260,
    tags: ["family", "themeparks", "wildlife", "relax"],
    blurb: "Right next to Sea World, with a monorail to the park gates. Built for families doing theme parks.",
    site: "https://seaworldresort.com.au/",
    search: "https://www.google.com/search?q=Sea+World+Resort+Gold+Coast"
  },
  {
    name: "QT Gold Coast",
    area: "Surfers Paradise",
    type: "Designer hotel",
    nightly: 290,
    tags: ["food", "nightlife", "arts", "couples", "beaches"],
    blurb: "Playful designer hotel with a well-known restaurant scene and a pool deck.",
    site: "https://www.qthotels.com/gold-coast/",
    search: "https://www.google.com/search?q=QT+Gold+Coast+hotel"
  },
  {
    name: "Peppers Soul Surfers Paradise",
    area: "Surfers Paradise",
    type: "Apartment hotel",
    nightly: 340,
    tags: ["couples", "beaches", "relax", "food"],
    blurb: "Absolute beachfront apartments with ocean views from the balcony.",
    site: "https://www.peppers.com.au/",
    search: "https://www.google.com/search?q=Peppers+Soul+Surfers+Paradise"
  },
  {
    name: "The Star Gold Coast",
    area: "Broadbeach",
    type: "Hotel",
    nightly: 320,
    tags: ["nightlife", "food", "shopping", "couples", "arts"],
    blurb: "Big entertainment precinct with restaurants, live shows and a rooftop bar.",
    site: "https://www.star.com.au/goldcoast",
    search: "https://www.google.com/search?q=The+Star+Gold+Coast+hotel"
  },
  {
    name: "O'Reilly's Rainforest Retreat",
    area: "Lamington National Park",
    type: "Mountain retreat",
    nightly: 300,
    tags: ["nature", "relax", "couples", "wildlife"],
    blurb: "Up in the hinterland rainforest, about 90 minutes from the beach. Bushwalks start at the door.",
    site: "https://oreillys.com.au/",
    search: "https://www.google.com/search?q=O%27Reilly%27s+Rainforest+Retreat"
  },
  {
    name: "Palazzo Versace Gold Coast",
    area: "Main Beach",
    type: "Luxury hotel",
    nightly: 480,
    tags: ["couples", "relax", "food", "shopping"],
    blurb: "Marina-side luxury with a private beach lagoon. The splurge option.",
    site: "https://www.palazzoversace.com.au/",
    search: "https://www.google.com/search?q=Palazzo+Versace+Gold+Coast"
  }
];

const ACTIVITIES = [
  {
    name: "Warner Bros. Movie World",
    area: "Oxenford",
    cost: 119,
    tags: ["themeparks", "family", "thrills"],
    blurb: "Roller coasters, movie stunt shows and character parades. The biggest thrill rides on the coast.",
    site: "https://movieworld.com.au/",
    search: "https://www.google.com/search?q=Warner+Bros+Movie+World+tickets"
  },
  {
    name: "Dreamworld & WhiteWater World",
    area: "Coomera",
    cost: 119,
    tags: ["themeparks", "family", "thrills", "wildlife"],
    blurb: "Rides, water slides and a tiger and koala precinct on one ticket.",
    site: "https://www.dreamworld.com.au/",
    search: "https://www.google.com/search?q=Dreamworld+tickets"
  },
  {
    name: "Sea World",
    area: "Main Beach",
    cost: 119,
    tags: ["themeparks", "family", "wildlife"],
    blurb: "Marine animal presentations, rides and a rescue centre you can walk through.",
    site: "https://seaworld.com.au/",
    search: "https://www.google.com/search?q=Sea+World+Gold+Coast+tickets"
  },
  {
    name: "Wet'n'Wild",
    area: "Oxenford",
    cost: 99,
    tags: ["themeparks", "family", "thrills"],
    blurb: "Water park with a wave pool and a wall of slides. Best on a hot day.",
    site: "https://wetnwild.com.au/",
    search: "https://www.google.com/search?q=Wet+n+Wild+Gold+Coast+tickets"
  },
  {
    name: "Currumbin Wildlife Sanctuary",
    area: "Currumbin",
    cost: 65,
    tags: ["wildlife", "family", "nature"],
    blurb: "Koalas, kangaroos and the daily lorikeet feeding, in bushland by the creek.",
    site: "https://currumbinsanctuary.com.au/",
    search: "https://www.google.com/search?q=Currumbin+Wildlife+Sanctuary+tickets"
  },
  {
    name: "SkyPoint Observation Deck",
    area: "Surfers Paradise",
    cost: 30,
    tags: ["views", "family", "couples", "arts"],
    blurb: "Level 77 of Q1 tower. Go near sunset — you can see the whole coastline and the hinterland.",
    site: "https://www.skypoint.com.au/",
    search: "https://www.google.com/search?q=SkyPoint+Observation+Deck+tickets"
  },
  {
    name: "SkyPoint Climb",
    area: "Surfers Paradise",
    cost: 99,
    tags: ["thrills", "views", "couples"],
    blurb: "Harness up and climb the outside of the tower to 270 metres. Not for the nervous.",
    site: "https://www.skypoint.com.au/",
    search: "https://www.google.com/search?q=SkyPoint+Climb+Gold+Coast"
  },
  {
    name: "Learn to surf lesson",
    area: "Surfers Paradise / Currumbin",
    cost: 70,
    tags: ["beaches", "thrills", "solo", "family"],
    blurb: "Two-hour group lesson with board and wetsuit included. Most people stand up on day one.",
    site: "https://www.gorideawave.com.au/",
    search: "https://www.google.com/search?q=Gold+Coast+surf+lesson+beginner"
  },
  {
    name: "Whale watching cruise (June to early November)",
    area: "Main Beach",
    cost: 99,
    tags: ["wildlife", "nature", "family", "couples"],
    blurb: "Humpbacks pass close to shore on their migration. Season only — check dates before you book.",
    site: "https://www.whalewatch.com.au/",
    search: "https://www.google.com/search?q=Gold+Coast+whale+watching+cruise"
  },
  {
    name: "Paradise Jet Boating",
    area: "Main Beach",
    cost: 75,
    tags: ["thrills", "beaches", "solo"],
    blurb: "Fifty-five minutes of spins and power stops through the Broadwater.",
    site: "https://www.paradisejetboating.com.au/",
    search: "https://www.google.com/search?q=Paradise+Jet+Boating+Gold+Coast"
  },
  {
    name: "Tamborine Rainforest Skywalk",
    area: "Tamborine Mountain",
    cost: 25,
    tags: ["nature", "views", "family", "relax"],
    blurb: "A steel walkway through the rainforest canopy, ending on a bridge high above the creek.",
    site: "https://www.rainforestskywalk.com.au/",
    search: "https://www.google.com/search?q=Tamborine+Rainforest+Skywalk"
  },
  {
    name: "Miami Marketta street food nights",
    area: "Miami",
    cost: 25,
    tags: ["food", "arts", "nightlife", "solo"],
    blurb: "Laneway market of food stalls and live music, several nights a week. Bring cash and an appetite.",
    site: "https://miamimarketta.com/",
    search: "https://www.google.com/search?q=Miami+Marketta+Gold+Coast"
  },
  {
    name: "HOTA, Home of the Arts",
    area: "Surfers Paradise",
    cost: 20,
    tags: ["arts", "family", "relax"],
    blurb: "Green-and-pink gallery building with exhibitions, an outdoor stage and parkland along the river.",
    site: "https://hota.com.au/",
    search: "https://www.google.com/search?q=HOTA+Home+of+the+Arts+Gold+Coast"
  },
  {
    name: "Australian Outback Spectacular",
    area: "Oxenford",
    cost: 110,
    tags: ["arts", "family", "food", "nightlife"],
    blurb: "Dinner-and-a-show arena spectacular with horses, stunts and a three-course meal.",
    site: "https://outbackspectacular.com.au/",
    search: "https://www.google.com/search?q=Australian+Outback+Spectacular+tickets"
  },
  {
    name: "Topgolf Gold Coast",
    area: "Oxenford",
    cost: 40,
    tags: ["nightlife", "family", "food", "solo"],
    blurb: "Golf-driving-range-meets-arcade with food and music. Fun even if you have never held a club.",
    site: "https://topgolf.com/au/gold-coast/",
    search: "https://www.google.com/search?q=Topgolf+Gold+Coast"
  },
  {
    name: "Springbrook glow worm walk, Natural Bridge",
    area: "Springbrook",
    cost: 0,
    tags: ["nature", "couples", "views", "free"],
    blurb: "A short night walk to a cave lit by glow worms. Free, but take a red-light torch and drive carefully.",
    site: "https://parks.desi.qld.gov.au/parks/springbrook",
    search: "https://www.google.com/search?q=Natural+Bridge+glow+worms+Springbrook"
  },
  {
    name: "Burleigh Head National Park headland walk",
    area: "Burleigh Heads",
    cost: 0,
    tags: ["nature", "beaches", "views", "free", "relax"],
    blurb: "An easy loop around the headland through the pandanus, with the best surf-watching on the coast.",
    site: "https://parks.desi.qld.gov.au/parks/burleigh-head",
    search: "https://www.google.com/search?q=Burleigh+Head+National+Park+walk"
  },
  {
    name: "Purling Brook Falls circuit",
    area: "Springbrook",
    cost: 0,
    tags: ["nature", "views", "free"],
    blurb: "A four-kilometre loop that takes you behind a 100-metre waterfall. Wear real shoes.",
    site: "https://parks.desi.qld.gov.au/parks/springbrook",
    search: "https://www.google.com/search?q=Purling+Brook+Falls+walk"
  },
  {
    name: "Swim at Tallebudgera Creek",
    area: "Palm Beach",
    cost: 0,
    tags: ["beaches", "family", "free", "relax", "nature"],
    blurb: "Calm, clear creek water with sand banks — the safest swimming on the coast for little kids.",
    site: "https://www.destinationgoldcoast.com/",
    search: "https://www.google.com/search?q=Tallebudgera+Creek+swimming"
  },
  {
    name: "Surfers Paradise Beachfront Markets",
    area: "Surfers Paradise",
    cost: 0,
    tags: ["shopping", "arts", "free", "food", "nightlife"],
    blurb: "Evening stalls of art and handmade goods set up along the esplanade several nights a week.",
    site: "https://www.destinationgoldcoast.com/",
    search: "https://www.google.com/search?q=Surfers+Paradise+Beachfront+Markets"
  },
  {
    name: "Pacific Fair shopping centre",
    area: "Broadbeach",
    cost: 0,
    tags: ["shopping", "food", "free", "family"],
    blurb: "The coast's biggest centre — open-air, palm-lined, and a good rainy-day plan.",
    site: "https://www.pacificfair.com.au/",
    search: "https://www.google.com/search?q=Pacific+Fair+Broadbeach"
  }
];

const PLACES = [
  {
    name: "Surfers Paradise Beach",
    area: "Surfers Paradise",
    tags: ["beaches", "nightlife", "family", "free"],
    blurb: "The postcard beach: patrolled flags, high-rise skyline and the busiest stretch of sand.",
    search: "https://www.google.com/maps/search/Surfers+Paradise+Beach"
  },
  {
    name: "Burleigh Heads",
    area: "Burleigh Heads",
    tags: ["beaches", "food", "nature", "relax", "free"],
    blurb: "World-class right-hand point break, a grassy foreshore for picnics, and a good cafe strip.",
    search: "https://www.google.com/maps/search/Burleigh+Heads+Gold+Coast"
  },
  {
    name: "Broadbeach",
    area: "Broadbeach",
    tags: ["food", "shopping", "family", "beaches", "free"],
    blurb: "Wide beach plus a walkable grid of restaurants. Kurrawa Park has free barbecues.",
    search: "https://www.google.com/maps/search/Broadbeach+Gold+Coast"
  },
  {
    name: "Coolangatta and Snapper Rocks",
    area: "Coolangatta",
    tags: ["beaches", "thrills", "free", "relax"],
    blurb: "The southern end, right on the NSW border. Snapper Rocks is one of the best waves in the world.",
    search: "https://www.google.com/maps/search/Snapper+Rocks+Coolangatta"
  },
  {
    name: "Currumbin Rock Pools",
    area: "Currumbin Valley",
    tags: ["nature", "free", "family", "relax"],
    blurb: "Freshwater swimming holes in the valley, about half an hour inland. Go early for a park.",
    search: "https://www.google.com/maps/search/Currumbin+Rock+Pools"
  },
  {
    name: "Tamborine Mountain village",
    area: "Tamborine Mountain",
    tags: ["food", "shopping", "nature", "relax", "couples"],
    blurb: "Gallery Walk's shops, cheese and fudge, plus waterfalls a short drive away.",
    search: "https://www.google.com/maps/search/Tamborine+Mountain+Gallery+Walk"
  },
  {
    name: "The Broadwater Parklands",
    area: "Southport",
    tags: ["family", "free", "relax", "views"],
    blurb: "Free water playground, swimming enclosure and barbecues along the calm Broadwater.",
    search: "https://www.google.com/maps/search/Broadwater+Parklands+Southport"
  },
  {
    name: "Point Danger and the Kirra beaches",
    area: "Coolangatta",
    tags: ["views", "beaches", "free", "nature"],
    blurb: "Lighthouse lookout on the state border with a walk north along Kirra's sheltered sand.",
    search: "https://www.google.com/maps/search/Point+Danger+Coolangatta"
  }
];
