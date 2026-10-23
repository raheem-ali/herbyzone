// app/data/botanicals.ts  — Herbyzone Botanicals catalogue (no farming content)
// Product photos: drop files in /public/products/<id>.jpg  (or set `img: "https://..."` on a product).
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

export const imgUrl = (p: Product, _w?: number, _h?: number) => p.img ?? `/products/${p.id}.jpg`;

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/* ---------- Herbal Extracts ---------- */
// [name, local name, botanical name, best seller]
const EXTRACTS: [string, string, string, boolean?][] = [
  ["Ginseng Extract", "Ginseng Panax", "Panax ginseng", true],
  ["Papaya Extract", "Papaya", "Carica papaya"],
  ["Mulberry Black Extract", "Mulberry Black (Toot Siah)", "Morus nigra"],
  ["Juniper Berry Extract", "Juniper Berry", "Juniperus communis"],
  ["Kasni Seeds Extract", "Kasni Seeds (Endive)", "Cichorium intybus"],
  ["Hareer Extract", "Hareer", "Terminalia chebula"],
  ["Aloe Vera Extract", "Aloe Vera", "Aloe barbadensis"],
  ["Amla Fruit Extract", "Amla", "Phyllanthus emblica"],
  ["Turmeric Root Extract", "Haldi", "Curcuma longa", true],
  ["Garlic Fruit Extract", "Lehsan", "Allium sativum"],
  ["Castor Seeds Extract", "Castor Seeds", "Ricinus communis"],
  ["Neem Leaves Extract", "Neem", "Azadirachta indica"],
  ["Ashwagandha Root Extract", "Ashwagandha", "Withania somnifera", true],
  ["Lemon Balm Extract", "Lemon Balm", "Melissa officinalis"],
  ["Marigold Extract", "Marigold", "Calendula officinalis"],
  ["Mazu Fruit Extract", "Mazu", "Quercus infectoria"],
  ["Jojoba Extract", "Jojoba", "Simmondsia chinensis"],
  ["Tulsi Leaves Extract", "Tulsi (Holy Basil)", "Ocimum tenuiflorum"],
];

const extracts: Product[] = EXTRACTS.map(([name, local, botanical, best]) => ({
  id: slug(name),
  name,
  local,
  botanical,
  forms: ["Powder", "Liquid"],
  best,
  short: `${local} extract, supplied as powder or liquid.`,
  points: ["Powder and liquid forms", "Bulk supply for manufacturers", "Specification shared on request"],
  specs: [
    ["Local name", local],
    ["Botanical name", botanical],
    ["Form", "Powder / Liquid"],
    ["Supply", "Bulk, quantity on request"],
  ],
  uses: ["Pharmaceutical", "Nutraceutical", "Food", "Cosmetic"],
}));

/* ---------- Essential Oils ---------- */
const OILS: [string, string, boolean?][] = [
  ["Lavender Oil", "Lavandula angustifolia", true],
  ["Lemongrass Oil", "Cymbopogon citratus"],
  ["Lemon Oil", "Citrus limon"],
  ["Tea Tree Oil", "Melaleuca alternifolia", true],
  ["Eucalyptus Oil", "Eucalyptus globulus"],
  ["Sandalwood Oil", "Santalum album"],
  ["Peppermint Oil", "Mentha piperita"],
  ["Rosemary Oil", "Rosmarinus officinalis"],
  ["Orange Oil", "Citrus sinensis"],
  ["Sweet Orange Oil", "Citrus sinensis"],
  ["Bergamot Oil", "Citrus bergamia"],
  ["Citronella Oil", "Cymbopogon nardus"],
];

const oils: Product[] = OILS.map(([name, botanical, best]) => ({
  id: slug(name),
  name,
  botanical,
  best,
  short: `${name.replace(" Oil", "")} essential oil for bulk orders.`,
  points: ["Essential oil in bulk quantities", "Suited to aromatherapy and personal care", "Price and availability on request"],
  specs: [
    ["Botanical name", botanical],
    ["Type", "Essential oil"],
    ["Supply", "Bulk, quantity on request"],
  ],
  uses: ["Aromatherapy", "Cosmetic", "Personal care", "Fragrance"],
}));

/* ---------- Micronutrients ---------- */
const MINERALS = ["Zinc", "Iron", "Magnesium", "Calcium", "Copper", "Manganese", "Selenium", "Chromium", "Molybdenum", "Boron", "Iodine", "Cobalt"];
const VITAMINS = ["Vitamin A", "Vitamin B1", "Vitamin B2", "Vitamin B3", "Vitamin B5", "Vitamin B6", "Vitamin B7 (Biotin)", "Vitamin B9 (Folic Acid)"];

const micro = (name: string, kind: "Mineral" | "Vitamin"): Product => ({
  id: slug(name),
  name,
  short: `${kind} micronutrient for pharmaceutical, nutraceutical and food use.`,
  points: ["Raw material supply", "Grades and forms on request", "Reliable repeat supply"],
  specs: [
    ["Category", kind],
    ["Grade", "On request"],
    ["Supply", "Bulk, quantity on request"],
  ],
  uses: ["Pharmaceutical", "Nutraceutical", "Food fortification"],
});

const micronutrients: Product[] = [...MINERALS.map((n) => micro(n, "Mineral")), ...VITAMINS.map((n) => micro(n, "Vitamin"))];

/* ---------- Herbal Stocks (bulk raw herbs, trading) ---------- */
const STOCKS: [string, string, boolean?][] = [
  ["Ashwagandha Root", "Withania somnifera", true],
  ["Amla Fruit (Dried)", "Phyllanthus emblica"],
  ["Turmeric Root", "Curcuma longa"],
  ["Neem Leaves", "Azadirachta indica"],
  ["Tulsi Leaves", "Ocimum tenuiflorum"],
  ["Moringa Leaves", "Moringa oleifera"],
  ["Licorice Root", "Glycyrrhiza glabra", true],
  ["Hareer (Haritaki)", "Terminalia chebula"],
  ["Senna Leaves", "Senna alexandrina"],
  ["Shatavari Root", "Asparagus racemosus"],
  ["Brahmi Herb", "Bacopa monnieri"],
  ["Giloy Stem", "Tinospora cordifolia"],
  ["Chamomile Flowers", "Matricaria chamomilla"],
  ["Hibiscus Flowers", "Hibiscus sabdariffa"],
];

const stocks: Product[] = STOCKS.map(([name, botanical, best]) => ({
  id: "stock-" + slug(name),
  name,
  botanical,
  best,
  short: `Dried ${name.toLowerCase()} available as trading stock.`,
  points: ["Ready stock for trade buyers", "Bulk lots", "Price and availability on request"],
  specs: [
    ["Botanical name", botanical],
    ["Type", "Dried raw herb"],
    ["Supply", "Bulk lots"],
  ],
  uses: ["Herbal manufacturing", "Extraction", "Herbal tea", "Traditional medicine"],
}));

export const CATEGORIES: Category[] = [
  { id: "herbal-extracts", title: "Herbal Extracts", nav: "Herbal Extracts", icon: "🌿", tint: "#E4F1D0", blurb: "Plant extracts in powder and liquid form for pharmaceutical, nutraceutical, food and cosmetic makers.", products: extracts },
  { id: "essential-oils", title: "Essential Oils", nav: "Essential Oils", icon: "💧", tint: "#F8EBC8", blurb: "Pure essential oils for aromatherapy, cosmetics and personal care.", products: oils },
  { id: "micronutrients", title: "Micronutrients", nav: "Micronutrients", icon: "⚗️", tint: "#DCE9F7", blurb: "Minerals and vitamins supplied as raw materials.", products: micronutrients },
  { id: "herbal-stocks", title: "Herbal Stocks", nav: "Herbal Stocks", icon: "📦", tint: "#F3E2D3", blurb: "Bulk dried herbs, roots, leaves and flowers held as trading stock.", products: stocks },
];