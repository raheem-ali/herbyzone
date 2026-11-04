// app/data/botanicals.ts — Herbyzone Botanicals catalogue
// Source: client product list (Product_List_Herbyzone_Botanicals.xlsx), 25 items per category.
// Product photos: put your own files in /public/products/<id>.jpg  (see images-needed.txt for every filename).
// To serve photos from a CDN instead, change IMG_BASE below.
// Missing photos fall back to a name placeholder automatically.

export type Product = {
  id: string;
  name: string;
  short: string;
  points: string[];
  specs: [string, string][];
  uses?: string[];
  about?: string;
  best?: boolean;
  img?: string;
  local?: string; // local / common name (shown on extract cards)
  botanical?: string; // botanical name (shown on extract cards)
  forms?: string[]; // e.g. ["Powder", "Liquid"]
};

export type Category = {
  id: string;
  title: string;
  nav: string;
  icon: string;
  tint: string;
  blurb: string;
  products: Product[];
};

// Where product photos live. "/products/" = files in your /public/products folder.
const IMG_BASE = "/products/";

export const imgUrl = (p: Product, _w?: number, _h?: number) => p.img ?? `${IMG_BASE}${p.id}.jpg`;

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/* ---------- Herbal Extracts (25) ---------- */
// [name, local name, botanical name, typical use, best seller]
const EXTRACTS: [string, string, string, string, boolean?][] = [
  ["Ashwagandha", "Winter Cherry", "Withania somnifera", "stress-support and vitality formulations", true],
  ["Aloe Vera", "", "Aloe barbadensis", "digestive drinks and skin-care products"],
  ["Amla", "Emblic", "Phyllanthus emblica", "immunity and hair-care formulas"],
  ["Arjun", "", "Terminalia arjuna", "heart-health and traditional tonics"],
  ["Brahmi", "Barhmi Booti", "Bacopa monnieri", "memory and focus supplements"],
  ["Black Pepper", "", "Piper nigrum", "absorption-support blends and seasoning"],
  ["Chamomile", "Baboona", "Matricaria chamomilla", "calming teas and skin care"],
  ["Cinnamon Bark", "", "Cinnamomum verum", "sugar-balance blends and flavouring"],
  ["Garlic", "", "Allium sativum", "heart-health supplements"],
  ["Garcinia Cambogia", "", "Garcinia cambogia", "weight-management supplements"],
  ["Giloy", "Gilo", "Tinospora cordifolia", "immunity tonics"],
  ["Ginger", "", "Zingiber officinale", "digestive and warming products"],
  ["Ginkgo Biloba", "", "Ginkgo biloba", "memory and circulation supplements"],
  ["Ginseng", "Ginseng Panax", "Panax ginseng", "energy and focus blends", true],
  ["Gotu Kola", "", "Centella asiatica", "skin-repair and calming formulas"],
  ["Green Tea", "", "Camellia sinensis", "antioxidant and weight-management products", true],
  ["Guggul", "", "Commiphora mukul", "weight and lipid-management products"],
  ["Hareer", "", "Terminalia chebula", "digestive and detox formulas"],
  ["Kalonji", "Black Seed", "Nigella sativa", "immunity and wellness products"],
  ["Licorice", "Mulethi", "Glycyrrhiza glabra", "throat, digestive and skin-brightening uses"],
  ["Milk Thistle", "", "Silybum marianum", "liver-support supplements"],
  ["Moringa", "Sohanjna", "Moringa oleifera", "nutrition and energy supplements", true],
  ["Neem Leaf", "", "Azadirachta indica", "skin, hair and oral-care formulas"],
  ["Tribulus", "Bhakra-Gokhru", "Tribulus terrestris", "sports-nutrition products"],
  ["Turmeric", "", "Curcuma longa", "joint-comfort and antioxidant products", true],
];

const extracts: Product[] = EXTRACTS.map(([base, local, botanical, use, best]) => {
  const name = `${base} Extract`;
  return {
    id: slug(name),
    name,
    img: `${IMG_BASE}${slug(name)}.jpg`,
    local: local || undefined,
    botanical,
    forms: ["Powder", "Liquid"],
    best,
    short: `${base} extract, used in ${use}.`,
    points: ["Available as powder or liquid", "Bulk supply for manufacturers", "Spec sheet on request"],
    specs: [
      ["Botanical name", botanical],
      ...(local ? ([["Local name", local]] as [string, string][]) : []),
      ["Form", "Powder / Liquid"],
      ["Supply", "Bulk, quantity on request"],
      ["Documents", "Spec sheet on request"],
    ],
    uses: ["Nutraceutical", "Pharmaceutical", "Food & beverage", "Cosmetic"],
  };
});

/* ---------- Essential Oils (25) ---------- */
// [name, botanical name, best seller]
const OILS: [string, string, boolean?][] = [
  ["Anise", "Pimpinella anisum"],
  ["Black Pepper", "Piper nigrum"],
  ["Cajuput", "Melaleuca cajuputi"],
  ["Camphor", "Cinnamomum camphora"],
  ["Capsicum", "Capsicum annuum"],
  ["Cardamom", "Elettaria cardamomum"],
  ["Cinnamon", "Cinnamomum verum"],
  ["Clove", "Syzygium aromaticum"],
  ["Coriander", "Coriandrum sativum"],
  ["Cornmint", "Mentha arvensis"],
  ["Eucalyptus", "Eucalyptus globulus", true],
  ["Ginger", "Zingiber officinale"],
  ["Nutmeg (Jaifal)", "Myristica fragrans"],
  ["Lavender", "Lavandula angustifolia", true],
  ["Lemon", "Citrus limon"],
  ["Lemongrass", "Cymbopogon citratus"],
  ["Myrrh", "Commiphora myrrha"],
  ["Patchouli", "Pogostemon cablin"],
  ["Peppermint", "Mentha piperita", true],
  ["Rose", "Rosa damascena"],
  ["Rosemary", "Rosmarinus officinalis"],
  ["Spearmint", "Mentha spicata"],
  ["Tea Tree", "Melaleuca alternifolia", true],
  ["Thyme", "Thymus vulgaris"],
  ["Tulsi", "Ocimum tenuiflorum"],
];

const oils: Product[] = OILS.map(([base, botanical, best]) => {
  const name = `${base} Oil`;
  return {
    id: slug(name),
    name,
    img: `${IMG_BASE}${slug(name)}.jpg`,
    botanical,
    best,
    short: `${base} essential oil, supplied in 1, 5 and 25 litre packs.`,
    points: ["Natural essential oil", "Packs of 1, 5 and 25 litres", "Quote on request"],
    specs: [
      ["Botanical name", botanical],
      ["Type", "Natural essential oil"],
      ["Packing", "1 / 5 / 25 litres"],
    ],
    uses: ["Aromatherapy", "Cosmetic", "Personal care", "Fragrance"],
  };
});

/* ---------- Micronutrients (4 minerals + 11 vitamins + 10 active ingredients = 25) ---------- */
type Kind = "Mineral" | "Vitamin" | "Active ingredient";
const MINERALS = ["Zinc Sulphate", "Calcium Carbonate", "Magnesium Sulphate", "Selenium"];
const VITAMINS = ["Vitamin C", "Vitamin K2", "Vitamin E", "Vitamin D", "Vitamin B1 (Thiamin)", "Vitamin B2 (Riboflavin)", "Vitamin B5 (Pantothenic Acid)", "Vitamin B6 (Pyridoxine)", "Vitamin B7 (Biotin)", "Vitamin B9 (Folic Acid)", "Vitamin B12 (Cobalamin)"];
const ACTIVES = ["Lutein", "L-Methylfolate", "L-Lysine", "L-Glycine", "L-Arginine HCl", "L-Glutamine", "L-Glutathione", "L-Carnitine", "Coenzyme Q10", "MSM"];

const micro = (name: string, kind: Kind): Product => ({
  id: slug(name),
  name,
  img: `${IMG_BASE}${slug(name)}.jpg`,
  short: `${kind} raw material for supplement, pharma and food makers.`,
  points: ["Raw material supply", "Grade and form to your need", "Steady repeat supply"],
  specs: [
    ["Category", kind],
    ["Grade", "On request"],
    ["Supply", "Bulk, quantity on request"],
  ],
  uses: ["Pharmaceutical", "Nutraceutical", "Food fortification"],
});

const micronutrients: Product[] = [
  ...MINERALS.map((n) => micro(n, "Mineral")),
  ...VITAMINS.map((n) => micro(n, "Vitamin")),
  ...ACTIVES.map((n) => micro(n, "Active ingredient")),
];

/* ---------- Herbal Stocks (25) ---------- */
// [name, botanical name, type, best seller]
const STOCKS: [string, string, string, boolean?][] = [
  ["Moringa Powder", "Moringa oleifera", "Powder", true],
  ["Moringa Dry Leaves", "Moringa oleifera", "Dried leaves"],
  ["Moringa Tea Cuts", "Moringa oleifera", "Tea cut"],
  ["Ashwagandha Root Powder", "Withania somnifera", "Powder", true],
  ["Amla Seed Powder", "Phyllanthus emblica", "Powder"],
  ["Senna Leaves (Sana Makki)", "Senna alexandrina", "Dried leaves"],
  ["Pumpkin Seeds", "Cucurbita pepo", "Seeds"],
  ["Sunflower Seeds", "Helianthus annuus", "Seeds"],
  ["Flax Seeds", "Linum usitatissimum", "Seeds"],
  ["Chia Seeds", "Salvia hispanica", "Seeds"],
  ["Quinoa Seeds", "Chenopodium quinoa", "Seeds"],
  ["Kalonji Seeds", "Nigella sativa", "Seeds"],
  ["Isabgol Husk", "Plantago ovata", "Husk", true],
  ["Hibiscus Flower", "Hibiscus sabdariffa", "Dried flowers"],
  ["Chamomile Flowers", "Matricaria chamomilla", "Dried flowers"],
  ["Dry Ginger Powder", "Zingiber officinale", "Powder"],
  ["Fennel Seeds", "Foeniculum vulgare", "Seeds"],
  ["Aloe Vera Gel", "Aloe barbadensis", "Gel"],
  ["Mulethi (Licorice)", "Glycyrrhiza glabra", "Dried root"],
  ["Moringa Seed Oil", "Moringa oleifera", "Carrier oil"],
  ["Kalonji Seed Oil", "Nigella sativa", "Carrier oil"],
  ["Castor Seed Oil", "Ricinus communis", "Carrier oil"],
  ["Akarkara Root", "Anacyclus pyrethrum", "Dried root"],
  ["Shatavari Root", "Asparagus racemosus", "Dried root"],
  ["Banafsha", "Viola odorata", "Dried flowers"],
];

const stocks: Product[] = STOCKS.map(([name, botanical, type, best]) => ({
  id: "stock-" + slug(name),
  name,
  img: `${IMG_BASE}stock-${slug(name)}.jpg`,
  botanical,
  best,
  short: `${name} held in ready stock.`,
  points: ["Ready stock for trade buyers", "Bulk lot sizes", "Price and packing on request"],
  specs: [
    ["Botanical name", botanical],
    ["Type", type],
    ["Packing", "On request"],
    ["Rate", "On request"],
  ],
  uses: ["Herbal manufacturing", "Extraction", "Herbal tea", "Food and wellness products"],
}));

export const CATEGORIES: Category[] = [
  { id: "herbal-extracts", title: "Herbal Extracts", nav: "Herbal Extracts", icon: "🌿", tint: "#E4F1D0", blurb: "Plant extracts in powder and liquid form for nutraceutical, pharma, food and cosmetic makers.", products: extracts },
  { id: "micronutrients", title: "Micronutrients", nav: "Micronutrients", icon: "⚗️", tint: "#DCE9F7", blurb: "Vitamins, minerals and active ingredients supplied as raw materials.", products: micronutrients },
  { id: "essential-oils", title: "Essential Oils", nav: "Essential Oils", icon: "💧", tint: "#F8EBC8", blurb: "Natural essential oils for aromatherapy, cosmetics and personal care brands.", products: oils },
  { id: "herbal-stocks", title: "Herbal Stocks", nav: "Herbal Stocks", icon: "📦", tint: "#F3E2D3", blurb: "Powders, seeds, dried leaves, flowers and roots held as bulk trading stock.", products: stocks },
];