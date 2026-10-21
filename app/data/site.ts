export const SITE = {
  name: "Herbyzone",
  tagline: "Solutions for Medicinal Crops & Fodder Seeds",
  phone: "+92 300 0000000", // TODO: real number
  whatsapp: "923000000000", // country code, no + or spaces
  email: "info@herbyzone.com",
  hours: "Mon–Sat, 9am – 6pm",
  address: "Your shop address, City, Pakistan", // TODO: real address
};

export type Product = {
  id: string;
  name: string;
  short: string; // MAX 15 words, shown on card
  points: string[]; // 3-4 key points
  specs: [string, string][];
  img: string; // keywords for placeholder photo
  image?: string; // optional: your own photo URL, overrides keywords
  best?: boolean; // shows in "Best sellers" (mega menu)
  about?: string; // longer description for the popup
  uses?: string[]; // common uses (chips in popup)
  guide?: [string, string][]; // growing guide rows (table in popup)
};
export type Category = { id: string; icon: string; tint: string; title: string; nav: string; blurb: string; products: Product[] };

export const imgUrl = (p: Product, w = 640, h = 480) =>
  p.image ?? `https://loremflickr.com/${w}/${h}/${p.img}?lock=${p.id.length * 7 + p.name.length}`;

/* ---------- quick-add helper ----------
   Add a product with just [name, short description].
   id and photo keywords are generated from the name.
   Upgrade any product later by replacing its row with a full object
   (about, uses, guide, specs, best, image...).                       */
type Kind = "medicinal" | "fodder" | "aromatic" | "plants";
type Row = [string, string];

const DEFAULTS: Record<Kind, { prefix: string; suffix: string; points: string[]; specs: [string, string][] }> = {
  medicinal: { prefix: "m-", suffix: "plant", points: ["Quality tested seed", "Suited to local climate", "Steady market demand"], specs: [["Sowing", "Ask us"], ["Harvest", "Ask us"], ["Pack", "Ask us"]] },
  fodder: { prefix: "f-", suffix: "field", points: ["High germination seed", "Good green fodder yield", "Palatable for livestock"], specs: [["Sowing", "Ask us"], ["Cuttings", "Ask us"], ["Pack", "5 kg / 25 kg"]] },
  aromatic: { prefix: "a-", suffix: "herb", points: ["Natural aroma", "Fast germination", "Repeated harvests"], specs: [["Sowing", "Ask us"], ["Harvest", "Ask us"], ["Pack", "10 g / 100 g"]] },
  plants: { prefix: "p-", suffix: "plant", points: ["Healthy nursery-raised", "Strong root system", "Ready to transplant"], specs: [["Height", "Ask us"], ["Season", "Ask us"], ["Order", "Min. 50"]] },
};

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const rows = (kind: Kind, list: Row[]): Product[] => {
  const d = DEFAULTS[kind];
  return list.map(([name, short]) => ({
    id: d.prefix + slug(name),
    name,
    short,
    img: `${slug(name).replace(/-/g, ",")},${d.suffix}`,
    points: d.points,
    specs: d.specs,
  }));
};

const MEDICINAL_MORE = rows("medicinal", [
  ["Senna", "Drought-hardy medicinal leaf crop with steady demand."],
  ["Isabgol", "Winter crop grown for husk used in digestive health products."],
  ["Liquorice", "Perennial root crop valued in herbal medicine."],
  ["Brahmi", "Creeping herb grown for memory and nerve tonics."],
  ["Shatavari", "Climbing root crop popular in women's wellness products."],
  ["Safed Musli", "High-value tuber crop used in vitality tonics."],
  ["Kalmegh", "Bitter herb grown for liver and immunity formulas."],
  ["Giloy", "Hardy climber valued for immunity-boosting stems."],
  ["Turmeric", "Rhizome crop for spice, dye and medicine with strong demand."],
  ["Ginger", "Warm-season rhizome crop for fresh and dried sale."],
  ["Kalonji", "Black cumin seed crop prized for oil and remedies."],
  ["Gotu Kola", "Moisture-loving herb used in skin and nerve care."],
  ["Long Pepper", "Perennial climber grown for medicinal fruit spikes."],
  ["Artemisia", "Aromatic medicinal herb grown for extracts and tea."],
  ["Echinacea", "Flowering herb grown for immune support products."],
  ["Milk Thistle", "Seed crop valued for liver-support supplements."],
  ["Valerian", "Root crop used in natural sleep and calm remedies."],
  ["Henna", "Hardy shrub grown for dye and cosmetic leaf powder."],
  ["Sarpagandha", "Shade-loving root crop used in traditional medicine."],
  ["Gymnema", "Climbing herb grown for sugar-balance formulations."],
]);

const FODDER_MORE = rows("fodder", [
  ["Maize Fodder", "Fast-growing summer green fodder with high energy."],
  ["Cowpea", "Protein-rich legume fodder that improves soil."],
  ["Guar", "Drought-tolerant legume for fodder and green manure."],
  ["Ryegrass", "Cool-season grass with soft, highly digestible leaves."],
  ["Sudan Grass", "Quick-regrowing summer fodder for hot regions."],
  ["Napier Grass", "High-biomass perennial grass with many cuttings."],
  ["Teosinte", "Multi-cut summer fodder with sweet, tender stalks."],
  ["Barley Fodder", "Winter green fodder suited to poorer soils."],
  ["Triticale", "Hardy winter fodder with strong green yield."],
  ["Vetch", "Winter legume fodder often mixed with oats."],
  ["Lablab", "Climbing legume fodder tolerant of heat and drought."],
  ["Mustard Fodder", "Early winter green feed with quick growth."],
  ["Turnip", "Cool-season fodder with edible roots and leaves."],
  ["Fodder Beet", "High-energy root crop for dairy rations."],
  ["Rice Bean", "Warm-season legume fodder with good protein."],
  ["Pearl Millet", "Heat-tolerant fodder for light, dry soils."],
  ["Sorghum Sudan Hybrid", "Multi-cut hybrid with very high green yield."],
  ["Brachiaria", "Tropical grass with good grazing and hay quality."],
  ["Rhodes Grass", "Salt-tolerant perennial grass for hay and grazing."],
  ["Pasture Mix", "Blended grasses and legumes for long-term grazing."],
]);

const AROMATIC_MORE = rows("aromatic", [
  ["Lavender", "Fragrant perennial for essential oil and dried flowers."],
  ["Rosemary", "Hardy aromatic shrub for kitchen and oil."],
  ["Thyme", "Compact culinary herb with strong flavour."],
  ["Sage", "Silvery-leaf herb for cooking and herbal use."],
  ["Oregano", "Spicy-scented herb for fresh and dried sale."],
  ["Marjoram", "Sweet, mild culinary herb with repeated cuts."],
  ["Dill", "Feathery leaf and seed herb that grows fast."],
  ["Coriander", "Leaf and seed spice crop with year-round demand."],
  ["Cumin", "Cool-season spice seed crop with strong value."],
  ["Fennel", "Aromatic seed and bulb crop for kitchen and oil."],
  ["Anise", "Sweet-scented seed herb for spice and tea."],
  ["Parsley", "Popular leaf herb for fresh market sale."],
  ["Celery", "Aromatic leaf and seed crop for food use."],
  ["Chives", "Perennial onion-flavoured herb with frequent cuts."],
  ["Tarragon", "Fine culinary herb with anise-like aroma."],
  ["Lemon Balm", "Lemon-scented herb for tea and calming blends."],
  ["Catnip", "Easy mint-family herb for tea and pet products."],
  ["Patchouli", "Aromatic leaf crop for perfumery oil."],
  ["Geranium", "Rose-scented foliage crop for essential oil."],
  ["Palmarosa", "Rose-scented grass grown for essential oil."],
]);

const PLANTS_MORE = rows("plants", [
  ["Tulsi Plant", "Healthy holy basil plants ready for field or garden."],
  ["Mint Plant", "Rooted mint ready to spread in moist beds."],
  ["Rosemary Plant", "Established rosemary plants for kitchen and oil."],
  ["Lavender Plant", "Nursery-grown lavender with strong root balls."],
  ["Curry Leaf Plant", "Aromatic leaf shrub, quick to establish."],
  ["Giloy Plant", "Rooted giloy cuttings for fence or trellis growing."],
  ["Ashwagandha Plant", "Healthy seedlings for quick medicinal root crops."],
  ["Brahmi Plant", "Creeping brahmi plants for moist soils and beds."],
  ["Amla Sapling", "Grafted amla saplings for early bearing."],
  ["Lemon Sapling", "Grafted lemon plants with vigorous growth."],
  ["Guava Sapling", "Grafted guava plants for early and heavy fruiting."],
  ["Mango Sapling", "Grafted mango plants of selected varieties."],
  ["Papaya Plant", "Healthy papaya seedlings for fast fruiting."],
  ["Pomegranate Sapling", "Hardy fruit plants for commercial orchards."],
  ["Fig Sapling", "Productive fig plants for warm, dry regions."],
  ["Jamun Sapling", "Strong-rooted jamun plants for orchard planting."],
  ["Mulberry Sapling", "Fast-growing mulberry for fruit and shade."],
  ["Olive Sapling", "Hardy olive plants for long-term orchards."],
  ["Date Palm Offshoot", "Rooted offshoots for date orchards."],
  ["Sandalwood Sapling", "Premium long-term timber and oil tree."],
]);

// NOTE: growing-guide figures are typical ranges. Adjust to your own varieties and region.
// Each category = your detailed products first, then 20 quick-add rows = 25 each, 100 total.
export const CATEGORIES: Category[] = [
  {
    id: "medicinal", icon: "🌿", tint: "#E9F3D6", nav: "Medicinal", title: "Medicinal Crop Seeds",
    blurb: "High-value crops with steady market demand.",
    products: [
      {
        id: "stevia", name: "Stevia", best: true, img: "stevia,plant", short: "Natural zero-calorie sweetener crop. Thrives in warm climates and well-drained soil.", points: ["High-sweetness leaf variety", "Multiple cuttings per year", "Ready market demand"], specs: [["Sowing", "Feb – Apr"], ["Harvest", "90–100 days"], ["Pack", "10 g / 50 g"]],
        about: "Stevia is a perennial shrub whose leaves are far sweeter than sugar. It suits warm climates and gives several cuttings per year, making it a strong cash crop for small and mid-size farms.",
        uses: ["Natural sweetener", "Herbal tea", "Food & beverage industry"],
        guide: [["Soil", "Well-drained sandy loam, pH 6.5–7.5"], ["Water", "Light, frequent irrigation"], ["Spacing", "30 × 45 cm"], ["Yield", "2–3 t dry leaf / acre / year"]]
      },
      {
        id: "ashwagandha", name: "Ashwagandha", img: "ashwagandha,herb", short: "Drought-tolerant medicinal root crop. Needs little water, suits light sandy soils.", points: ["Low water requirement", "Valued root quality", "Easy, low-cost cultivation"], specs: [["Sowing", "Jul – Sep"], ["Harvest", "150–180 days"], ["Pack", "100 g / 500 g"]],
        about: "Ashwagandha is a hardy root crop prized in traditional medicine. It grows well on poor, light soils with very little irrigation, keeping input costs low.",
        uses: ["Root powder", "Herbal supplements", "Ayurvedic and Unani medicine"],
        guide: [["Soil", "Light sandy loam, pH 7.5–8"], ["Water", "Minimal, avoid waterlogging"], ["Spacing", "30 × 5 cm"], ["Yield", "3–4 quintal dry root / acre"]]
      },
      {
        id: "aloe", name: "Aloe Vera", img: "aloe,vera", short: "Hardy succulent grown for gel-rich leaves. Needs minimal irrigation.", points: ["Thick, gel-rich leaves", "Drought hardy", "Repeat leaf harvests"], specs: [["Planting", "Feb – Sep"], ["Harvest", "8–10 months"], ["Pack", "Plant / bulk"]],
        about: "Aloe Vera is a low-maintenance succulent grown for its thick, gel-rich leaves. Mature plants can be harvested several times a year.",
        uses: ["Gel and juice", "Cosmetics and skincare", "Pharma industry"],
        guide: [["Soil", "Sandy, well-drained"], ["Water", "Light, every 2–3 weeks"], ["Spacing", "60 × 45 cm"], ["Harvest", "3–4 leaf pickings per year"]]
      },
      {
        id: "moringa", name: "Moringa", best: true, img: "moringa,leaves", short: "Fast-growing tree with nutrient-rich leaves and pods for powder, tea and sale.", points: ["Rapid early growth", "Leaves, pods and seeds", "Heat and drought tolerant"], specs: [["Sowing", "Mar – Jul"], ["Harvest", "6–8 months"], ["Pack", "100 g / 1 kg"]],
        about: "Moringa is a fast-growing, nutrient-dense tree. Leaves, pods and seeds all sell, and the crop copes well with heat and dry spells.",
        uses: ["Leaf powder", "Herbal tea", "Fresh pods", "Oil extraction"],
        guide: [["Soil", "Well-drained loam, pH 6.3–7.0"], ["Water", "Light, once established"], ["Spacing", "2.5 × 2.5 m (tree) / dense for leaf"], ["Harvest", "Leaf cuts every 40–45 days"]]
      },
      {
        id: "tulsi", name: "Tulsi (Holy Basil)", img: "tulsi,holy,basil", short: "Sacred medicinal herb for teas and extracts. Easy to grow, steady demand.", points: ["Strong medicinal aroma", "Easy low-cost crop", "Steady year-round demand"], specs: [["Sowing", "Mar – Jun"], ["Harvest", "75–90 days"], ["Pack", "10 g / 100 g"]],
        about: "Tulsi is a sacred, aromatic herb used in teas and herbal extracts. It is easy to grow and offers steady demand through the year.",
        uses: ["Herbal tea", "Extracts and drops", "Home remedies"],
        guide: [["Soil", "Fertile loam, pH 6–7.5"], ["Water", "Regular, light"], ["Spacing", "30 × 30 cm"], ["Harvest", "Cut every 30–40 days"]]
      },
      ...MEDICINAL_MORE,
    ],
  },
  {
    id: "fodder", icon: "🌾", tint: "#FBF1D6", nav: "Fodder", title: "Fodder Seeds",
    blurb: "Reliable green fodder for dairy and livestock farms.",
    products: [
      {
        id: "berseem", name: "Berseem", best: true, img: "clover,field", short: "Protein-rich winter fodder with several cuttings. Boosts milk yield and enriches soil.", points: ["4–5 cuttings per season", "High protein content", "Improves soil nitrogen"], specs: [["Sowing", "Oct – Nov"], ["Cuttings", "4–5"], ["Pack", "5 kg / 25 kg"]],
        about: "Berseem is the standard winter fodder for dairy farms. It is rich in protein, gives several cuttings and fixes nitrogen in the soil for the next crop.",
        uses: ["Dairy feed", "Green fodder", "Hay and silage"],
        guide: [["Soil", "Loam to clay loam"], ["Seed rate", "8–10 kg / acre"], ["Water", "Every 12–15 days"], ["Yield", "30–40 t green fodder / acre"]]
      },
      {
        id: "sorghum", name: "Sorghum", best: true, img: "sorghum,field", short: "Heat-tolerant summer fodder with high green yield and quick regrowth.", points: ["High green biomass", "Tolerates heat and dry spells", "Quick regrowth after cutting"], specs: [["Sowing", "Mar – Jul"], ["Cuttings", "2–3"], ["Pack", "5 kg / 25 kg"]],
        about: "Sorghum is a dependable summer fodder with high biomass and fast regrowth, well suited to hot and dry conditions.",
        uses: ["Green fodder", "Silage", "Dairy and beef feed"],
        guide: [["Soil", "Most soils, well-drained"], ["Seed rate", "30–40 kg / acre"], ["Water", "Every 8–10 days"], ["Cut at", "50–60 days"]]
      },
      {
        id: "alfalfa", name: "Alfalfa", img: "alfalfa,field", short: "Perennial queen of forages. Strong yields and productive for several years.", points: ["Stand lasts 3–4 years", "Very high protein", "6–8 cuttings yearly"], specs: [["Sowing", "Sep – Nov"], ["Cuttings", "6–8"], ["Pack", "1 kg / 10 kg"]],
        about: "Alfalfa is a long-lived perennial forage with very high protein. One sowing stays productive for several years with proper care.",
        uses: ["Dairy feed", "Hay", "Horse feed"],
        guide: [["Soil", "Deep, well-drained loam"], ["Seed rate", "8–10 kg / acre"], ["Water", "Every 10–12 days"], ["Stand life", "3–4 years"]]
      },
      {
        id: "millet", name: "Millet", img: "millet,crop", short: "Quick-growing summer fodder for hot, dry regions. Palatable for all livestock.", points: ["Ready in 45–55 days", "Low input cost", "Palatable, soft stalks"], specs: [["Sowing", "Apr – Jul"], ["Cuttings", "2–3"], ["Pack", "5 kg / 25 kg"]],
        about: "Millet is a quick, low-cost summer fodder with soft stalks that all livestock eat readily.",
        uses: ["Green fodder", "Hay", "Mixed feed"],
        guide: [["Soil", "Light to medium soils"], ["Seed rate", "8–10 kg / acre"], ["Water", "Every 10–12 days"], ["First cut", "45–55 days"]]
      },
      {
        id: "oats", name: "Oats", img: "oats,field", short: "Cool-season fodder with sweet, tender stalks. Pairs well with berseem mixes.", points: ["Sweet, palatable fodder", "Good in mixed sowing", "Quick winter growth"], specs: [["Sowing", "Oct – Dec"], ["Cuttings", "1–2"], ["Pack", "5 kg / 25 kg"]],
        about: "Oats give sweet, tender winter fodder and mix well with berseem to balance protein and energy.",
        uses: ["Green fodder", "Hay", "Berseem mixed sowing"],
        guide: [["Soil", "Loam, well-drained"], ["Seed rate", "40–50 kg / acre"], ["Water", "Every 15–20 days"], ["Cut at", "55–65 days"]]
      },
      ...FODDER_MORE,
    ],
  },
  {
    id: "aromatic", icon: "🌸", tint: "#F9E3EC", nav: "Herbs", title: "Aromatic & Herb Seeds",
    blurb: "Culinary and essential-oil herbs for farm and kitchen garden.",
    products: [
      {
        id: "basil", name: "Sweet Basil", best: true, img: "basil,leaves", short: "Aromatic leaf herb for kitchens and essential oil. Gives repeated harvests.", points: ["Strong natural aroma", "Fast germination", "Repeated leaf cuttings"], specs: [["Sowing", "Feb – Jun"], ["Harvest", "60–75 days"], ["Pack", "10 g / 100 g"]],
        about: "Sweet Basil is an aromatic leaf herb for fresh sale, drying and essential oil, with repeated cuttings through the season.",
        uses: ["Culinary", "Essential oil", "Dried herb"],
        guide: [["Soil", "Rich, well-drained, pH 6–7"], ["Water", "Regular, light"], ["Spacing", "30 × 30 cm"], ["Harvest", "Cut every 3–4 weeks"]]
      },
      {
        id: "lemongrass", name: "Lemongrass", img: "lemongrass", short: "Perennial grass for citrus-scented oil and herbal tea. Harvests for years.", points: ["High oil content", "Perennial, low maintenance", "Pest resistant"], specs: [["Planting", "Mar – Aug"], ["Harvest", "4–6 months"], ["Pack", "Slips / seed"]],
        about: "Lemongrass is a perennial grass grown for citrus-scented oil and tea. One planting gives harvests for several years.",
        uses: ["Essential oil", "Herbal tea", "Perfumery"],
        guide: [["Soil", "Sandy loam, well-drained"], ["Water", "Moderate"], ["Spacing", "60 × 60 cm"], ["Harvest", "3–4 cuts per year"]]
      },
      {
        id: "chamomile", name: "Chamomile", img: "chamomile,flowers", short: "Cool-season flowering herb prized for calming tea. Hand-picked blooms for best quality.", points: ["Premium tea flowers", "Cool-season crop", "Good price per kilo dried"], specs: [["Sowing", "Oct – Nov"], ["Harvest", "90–110 days"], ["Pack", "5 g / 50 g"]],
        about: "Chamomile is a cool-season flowering herb whose dried blooms are prized for calming teas.",
        uses: ["Herbal tea", "Skincare", "Essential oil"],
        guide: [["Soil", "Light, well-drained loam"], ["Water", "Light, regular"], ["Spacing", "25 × 25 cm"], ["Harvest", "Hand-pick open flowers"]]
      },
      {
        id: "fenugreek", name: "Fenugreek", img: "fenugreek", short: "Fast-growing leaf and seed crop. Fits easily into short winter rotations.", points: ["Leaf in 30 days", "Seed in 110–120 days", "Fixes nitrogen in soil"], specs: [["Sowing", "Oct – Dec"], ["Harvest", "30–120 days"], ["Pack", "250 g / 1 kg"]],
        about: "Fenugreek is a fast leaf and seed crop that fits short winter rotations and fixes nitrogen.",
        uses: ["Fresh leaf (methi)", "Seed spice", "Herbal medicine"],
        guide: [["Soil", "Loam, pH 6–7"], ["Seed rate", "5–6 kg / acre"], ["Water", "Every 12–15 days"], ["Leaf cut", "At 30 days"]]
      },
      {
        id: "mint", name: "Mint", img: "mint,leaves", short: "Refreshing perennial herb for fresh sale, drying and oil. Regrows fast.", points: ["Fast spreading cover", "Fresh and dry sale", "Frequent cuttings"], specs: [["Planting", "Feb – Sep"], ["Harvest", "60–70 days"], ["Pack", "Roots / seed"]],
        about: "Mint is a vigorous perennial herb for fresh sale, drying and oil, and it regrows quickly after cutting.",
        uses: ["Fresh sale", "Dried leaf", "Mint oil"],
        guide: [["Soil", "Moist, rich loam"], ["Water", "Frequent, keep moist"], ["Spacing", "40 × 40 cm"], ["Harvest", "Every 40–50 days"]]
      },
      ...AROMATIC_MORE,
    ],
  },
  {
    id: "plants", icon: "🌱", tint: "#DFF1F8", nav: "Plants", title: "Plants & Saplings",
    blurb: "Healthy nursery-raised plants, ready to transplant.",
    products: [
      {
        id: "p-moringa", name: "Moringa Sapling", best: true, img: "moringa,tree", short: "Nursery-raised hardened saplings with strong roots for quick field establishment.", points: ["Hardened in nursery", "Uniform healthy growth", "Fruits within 8 months"], specs: [["Height", "30–40 cm"], ["Season", "Feb – Sep"], ["Order", "Min. 50"]],
        about: "Nursery-raised, hardened Moringa saplings with strong roots for quick, even field establishment.",
        uses: ["Orchard planting", "Leaf farming", "Boundary planting"],
        guide: [["Pit size", "45 × 45 × 45 cm"], ["Spacing", "2.5 × 2.5 m"], ["Water", "Light after transplant"], ["First harvest", "6–8 months"]]
      },
      {
        id: "p-stevia", name: "Stevia Plant", best: true, img: "stevia,green", short: "Rooted cuttings from selected mother plants. Saves months compared to seed.", points: ["Selected mother plants", "Disease-free cuttings", "Faster first harvest"], specs: [["Height", "10–15 cm"], ["Season", "Mar – Apr"], ["Order", "Min. 100"]],
        about: "Rooted stevia cuttings from selected mother plants. They save months compared with seed and give uniform stands.",
        uses: ["Commercial leaf farming", "Kitchen garden"],
        guide: [["Spacing", "30 × 45 cm"], ["Water", "Light, frequent"], ["Soil", "Well-drained sandy loam"], ["First cut", "60–70 days"]]
      },
      {
        id: "p-aloe", name: "Aloe Vera Plant", img: "aloe,plant", short: "Healthy suckers with developed roots, ready to plant. Establishes well in poor soils.", points: ["Developed root system", "True-to-type variety", "Low maintenance"], specs: [["Height", "20–25 cm"], ["Season", "Feb – Sep"], ["Order", "Min. 100"]],
        about: "Healthy aloe suckers with developed roots, ready to plant and quick to establish even in poor soils.",
        uses: ["Gel farming", "Garden and landscape"],
        guide: [["Spacing", "60 × 45 cm"], ["Water", "Every 2–3 weeks"], ["Soil", "Sandy, well-drained"], ["First harvest", "8–10 months"]]
      },
      {
        id: "p-neem", name: "Neem Sapling", img: "neem,tree", short: "Strong-rooted saplings for shade, windbreaks and natural pest control.", points: ["Natural bio-pesticide", "Good shade and windbreak", "Hardy and long-lived"], specs: [["Height", "40–50 cm"], ["Season", "Jul – Sep"], ["Order", "Min. 50"]],
        about: "Strong-rooted neem saplings for shade, windbreaks and a natural source of bio-pesticide.",
        uses: ["Shade and windbreak", "Bio-pesticide", "Avenue planting"],
        guide: [["Pit size", "60 × 60 × 60 cm"], ["Spacing", "5 × 5 m"], ["Water", "Regular in year one"], ["Maturity", "3–5 years"]]
      },
      {
        id: "p-lemongrass", name: "Lemongrass Plant", img: "lemongrass,plant", short: "Ready-to-plant clumps for oil and tea. Establishes fast with little care.", points: ["Strong rooted clumps", "High oil content", "Pest resistant"], specs: [["Height", "25–30 cm"], ["Season", "Mar – Aug"], ["Order", "Min. 100"]],
        about: "Ready-to-plant lemongrass clumps for oil and tea that establish fast with little care.",
        uses: ["Essential oil", "Herbal tea"],
        guide: [["Spacing", "60 × 60 cm"], ["Water", "Moderate"], ["Soil", "Sandy loam"], ["First cut", "4–6 months"]]
      },
      ...PLANTS_MORE,
    ],
  },
];