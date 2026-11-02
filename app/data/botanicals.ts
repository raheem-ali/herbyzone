// app/data/botanicals.ts  — Herbyzone Botanicals catalogue (no farming content)
// Product photos: drop files in /public/products/<id>.jpg  (or set `img: "https://..."` on a product).
// Missing photos fall back to a name placeholder automatically.
// Each category has 25 products.

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

/* ---------- Herbal Extracts (25) ---------- */
// [name, botanical, plant part, standardization, appearance, solubility, forms, best seller]
type ExtractRow = [string, string, string, string, string, string, string[], boolean?];

const EXTRACTS: ExtractRow[] = [
  ["Ashwagandha Extract", "Withania somnifera", "Root", "5% Withanolides", "Brown powder", "Slightly water soluble", ["Powder"], true],
  ["Turmeric Extract", "Curcuma longa", "Rhizome", "95% Curcuminoids", "Orange-yellow powder", "Slightly soluble", ["Powder"], true],
  ["Ginseng Extract", "Panax ginseng", "Root", "10–80% Ginsenosides", "Yellow-brown powder", "Water soluble", ["Powder"], true],
  ["Green Tea Extract", "Camellia sinensis", "Leaf", "50% Polyphenols / EGCG", "Brown-green powder", "Water soluble", ["Powder", "Liquid"]],
  ["Aloe Vera Extract", "Aloe barbadensis Miller", "Leaf", "200:1 or Aloin", "Light yellow to brown fine powder", "Water dispersible", ["Powder", "Liquid"]],
  ["Amla Extract", "Phyllanthus emblica", "Fruit", "10–40% Tannins / Polyphenols", "Brown powder", "Water soluble", ["Powder"]],
  ["Ginkgo Biloba Extract", "Ginkgo biloba", "Leaf", "24% / 6%", "Yellow-brown powder", "Slightly soluble", ["Powder"]],
  ["Licorice Extract", "Glycyrrhiza glabra", "Root", "20% Glycyrrhizic Acid", "Yellow-brown powder", "Water soluble", ["Powder"]],
  ["Garlic Extract", "Allium sativum", "Bulb", "1% Allicin / 10:1", "Light brown powder", "Water soluble", ["Powder"]],
  ["Ginger Extract", "Zingiber officinale", "Rhizome", "5% Gingerols", "Light brown powder", "Slightly soluble", ["Powder", "Liquid"]],
  ["Boswellia Serrata Extract", "Boswellia serrata", "Resin", "65% Boswellic Acids", "Off-white to brown powder", "Slightly soluble", ["Powder"]],
  ["Fenugreek Extract", "Trigonella foenum-graecum", "Seed", "50% Saponins", "Brown powder", "Water soluble", ["Powder"]],
  ["Gotu Kola Extract", "Centella asiatica", "Whole herb", "10% Asiaticosides", "Brown powder", "Water soluble", ["Powder"]],
  ["Giloy Extract", "Tinospora cordifolia", "Stem", "10:1", "Brown powder", "Water soluble", ["Powder"]],
  ["Shatavari Extract", "Asparagus racemosus", "Root", "20–40% Saponins", "Brown powder", "Typical", ["Powder"]],
  ["Tribulus Terrestris Extract", "Tribulus terrestris", "Fruit", "40–90% Saponins", "Brown powder", "Typical", ["Powder"]],
  ["Pine Bark Extract", "Pinus pinaster", "Bark", "95% Proanthocyanidins", "Reddish-brown powder", "Typical", ["Powder"]],
  ["Pomegranate Extract", "Punica granatum", "Fruit", "40% Ellagic Acid", "Brown powder", "Typical", ["Powder"]],
  ["Nigella Sativa Extract", "Nigella sativa", "Seed", "5–10% Thymoquinone", "Brown powder", "Slightly soluble", ["Powder"]],
  ["Cinnamon Bark Extract", "Cinnamomum verum / cassia", "Bark", "10:1 or Polyphenols", "Brown powder", "Water soluble", ["Powder"]],
  ["Neem Extract", "Azadirachta indica", "Leaf", "10:1", "Brown-green powder", "Water soluble", ["Powder"]],
  ["Senna Extract", "Senna alexandrina", "Leaf", "20% Sennosides", "Brown powder", "Typical", ["Powder"]],
  ["Gymnema Sylvestre Extract", "Gymnema sylvestre", "Leaf", "25% Gymnemic Acids", "Brown powder", "Water soluble", ["Powder", "Liquid"]],
  ["Guggul Extract", "Commiphora mukul", "Gum resin", "2.5–10% Guggulsterones", "Brown powder", "Slightly soluble", ["Powder", "Liquid"]],
  ["Stevia Extract", "Stevia rebaudiana", "Leaf", "95–98% Steviol Glycosides", "White powder", "Typical", ["Powder"]],
];

// Set to false to use only your own photos from /public/products/<id>.jpg
const USE_SOURCE_IMAGES = true;

// Product photos taken from the source page's product listings.
const IMG_BASE = "https://www.hrherbal.com/uploaded-files/product-images/";
const EXTRACT_IMG: Record<string, string> = {
  "Ashwagandha Extract": "Ashwagandha-Extract-1784630692.jpg",
  "Turmeric Extract": "Turmeric-Extract-1784962925.jpg",
  "Ginseng Extract": "Ginseng-Extract-1784633448.jpg",
  "Green Tea Extract": "Green-Tea-Extract-1784954779.jpg",
  "Aloe Vera Extract": "Aloe-Vera-Extract-1784703907.jpg",
  "Amla Extract": "Amla-Extract-1784704812.jpg",
  "Ginkgo Biloba Extract": "Ginkgo-Biloba-Extract-1784633150.jpg",
  "Licorice Extract": "Licorice-Extract-1784958662.jpg",
  "Garlic Extract": "Garlic-Extract-05.jpg",
  "Ginger Extract": "Ginger-Extract-1784702429.jpg",
  "Boswellia Serrata Extract": "Boswellia-serrata-Extract-1784637395.jpg",
  "Fenugreek Extract": "Fenugreek-Extract-1784702203.jpg",
  "Gotu Kola Extract": "Gotu-Kola-Extract-38.jpg",
  "Giloy Extract": "Giloy-Extract-1784632759.jpg",
  "Shatavari Extract": "Shatavari-Extract-1784722969.jpg",
  "Tribulus Terrestris Extract": "Tribulus-terrestris-Extract-1784716867.jpg",
  "Pine Bark Extract": "Pine-Bark-Extract-1784720964.jpg",
  "Pomegranate Extract": "Pomegranate-Extract-1784719011.jpg",
  "Nigella Sativa Extract": "Nigella-sativa-Extract-1784717392.jpg",
  "Cinnamon Bark Extract": "Cinnamon-Bark-Extract-03.jpg",
  "Neem Extract": "Neem-Extract-1784717097.jpg",
  "Senna Extract": "Senna-Extract-1784716388.jpg",
  "Gymnema Sylvestre Extract": "Gymnema-sylvestre-Extract-1784969480.jpg",
  "Guggul Extract": "Guggul-Extract-1784957898.jpg",
  "Stevia Extract": "Stevia-Extract-1784788628.jpg",
};

const extracts: Product[] = EXTRACTS.map(([name, botanical, part, std, look, sol, forms, best]) => ({
  id: slug(name),
  name,
  img: USE_SOURCE_IMAGES ? IMG_BASE + EXTRACT_IMG[name] : undefined,
  botanical,
  forms,
  best,
  short: `${part} extract, ${std}.`,
  points: [
    "100% pure extract with no additives",
    "Packed in 25 / 50 kg PP bags",
    "Made in Pakistan, 24 months shelf life",
  ],
  specs: [
    ["Botanical name", botanical],
    ["Plant part", part],
    ["Standardization", std],
    ["Appearance", look],
    ["Solubility", sol],
    ["Form", forms.join(" / ")],
    ["Packing", "25 / 50 kg PP bags"],
    ["Storage", "Cool, dry place"],
    ["Shelf life", "24 months"],
  ],
  uses: ["Dietary supplements", "Food & beverages", "Cosmetics", "Health products"],
}));

/* ---------- Essential Oils (25) ---------- */
// [name, botanical, plant part, extraction method, aroma, typical uses, about, best seller]
type OilRow = [string, string, string, string, string, string[], string, boolean?];

const OILS: OilRow[] = [
  ["Lavender Oil", "Lavandula angustifolia", "Flowering tops", "Steam distillation", "Soft, floral and herbal", ["Aromatherapy", "Spa & massage", "Soap & skincare"],
    "A staple of soaps, candles, bath products and linen sprays. Its soft floral-herbal scent blends easily with citrus, woods and other florals.", true],
  ["Tea Tree Oil", "Melaleuca alternifolia", "Leaves", "Steam distillation", "Sharp, fresh and medicinal", ["Skincare", "Hair care", "Household cleaning"],
    "Known for a sharp, clean scent, tea tree is widely used in skin and hair care formulations and in household cleaning blends.", true],
  ["Peppermint Oil", "Mentha piperita", "Leaves & stems", "Steam distillation", "Cool, minty and crisp", ["Oral care", "Confectionery", "Aromatherapy"],
    "A cooling, minty oil used to flavour toothpaste, gum and sweets, and as a fresh top note in balms and fragrances.", true],
  ["Eucalyptus Oil", "Eucalyptus globulus", "Leaves", "Steam distillation", "Camphor-like, clear and fresh", ["Balms & rubs", "Aromatherapy", "Cleaning products"],
    "A clear, camphor-like oil common in chest rubs, steam blends and fresh-scented cleaning products."],
  ["Lemongrass Oil", "Cymbopogon citratus", "Leaves", "Steam distillation", "Bright, grassy and lemony", ["Soap & candles", "Fragrance", "Insect-repellent blends"],
    "A bright, lemony oil that lifts soaps, candles and room sprays, and a common base for citronella-style blends."],
  ["Lemon Oil", "Citrus limon", "Peel", "Cold pressed", "Zesty and clean", ["Flavouring", "Cleaning products", "Cosmetics"],
    "Cold-pressed from the peel for a fresh, zesty scent. Used to flavour food and drinks and to freshen cleaners and cosmetics."],
  ["Sweet Orange Oil", "Citrus sinensis", "Peel", "Cold pressed", "Sweet, juicy citrus", ["Flavouring", "Fragrance", "Household products"],
    "A sweet, juicy citrus oil, popular in flavours, household products and everyday fragrance blends."],
  ["Bergamot Oil", "Citrus bergamia", "Peel", "Cold pressed", "Citrus with a floral edge", ["Perfumery", "Tea flavouring", "Personal care"],
    "A refined citrus oil with a floral twist, best known as the scent of Earl Grey tea and many classic perfumes."],
  ["Grapefruit Oil", "Citrus paradisi", "Peel", "Cold pressed", "Tangy and slightly bitter", ["Body care", "Fragrance", "Flavouring"],
    "A tangy, slightly bitter citrus oil that adds sparkle to body washes, sprays and fresh fragrances."],
  ["Rosemary Oil", "Rosmarinus officinalis", "Leaves & flowering tops", "Steam distillation", "Herbal, woody and camphoraceous", ["Hair care", "Soap", "Aromatherapy"],
    "A herbal, woody oil often added to hair-care products, soaps and fresh masculine fragrances."],
  ["Clove Oil", "Syzygium aromaticum", "Flower buds", "Steam distillation", "Warm, spicy and strong", ["Oral care", "Flavouring", "Fragrance"],
    "Strong and warm, clove oil is used in oral-care products, spice flavourings and fragrances. It is normally diluted in blends."],
  ["Cinnamon Oil", "Cinnamomum verum", "Bark", "Steam distillation", "Warm, sweet spice", ["Flavouring", "Fragrance", "Candles"],
    "A sweet, spicy oil used in flavours, seasonal candles and warm fragrance blends."],
  ["Citronella Oil", "Cymbopogon nardus", "Leaves", "Steam distillation", "Lemony and grassy", ["Candles", "Repellent blends", "Cleaning products"],
    "A grassy, lemon-like oil used mainly in candles, outdoor sprays and cleaning products."],
  ["Geranium Oil", "Pelargonium graveolens", "Leaves", "Steam distillation", "Rosy, green and floral", ["Skincare", "Perfumery", "Aromatherapy"],
    "A rosy-green oil often used as a cost-friendly rose note in skincare and perfumery."],
  ["Ylang Ylang Oil", "Cananga odorata", "Flowers", "Steam distillation", "Rich, sweet and floral", ["Perfumery", "Hair care", "Aromatherapy"],
    "A rich, sweet floral oil that gives depth to perfumes, hair products and floral blends."],
  ["Patchouli Oil", "Pogostemon cablin", "Leaves", "Steam distillation", "Deep, earthy and musky", ["Perfumery", "Incense", "Soap"],
    "A deep, earthy oil that anchors perfumes and incense and adds lasting depth to blends."],
  ["Sandalwood Oil", "Santalum album", "Heartwood", "Steam distillation", "Creamy, soft and woody", ["Fine fragrance", "Skincare", "Incense"],
    "A creamy, soft woody oil prized in fine fragrance, incense and skincare. Grades and supply vary, so ask for current options."],
  ["Cedarwood Oil", "Cedrus deodara", "Wood", "Steam distillation", "Dry, woody and balsamic", ["Fragrance", "Soap", "Household products"],
    "A dry, woody oil used as a base note in fragrance, soaps and household products."],
  ["Rose Oil", "Rosa damascena", "Petals", "Steam distillation", "Full, sweet floral", ["Perfumery", "Luxury skincare", "Aromatherapy"],
    "A premium floral oil used in perfumery and luxury skincare, usually supplied in smaller quantities."],
  ["Jasmine Absolute", "Jasminum grandiflorum", "Flowers", "Solvent extraction", "Intense, heady floral", ["Perfumery", "Cosmetics", "Candles"],
    "A heady, intensely floral absolute obtained by solvent extraction rather than distillation, used in perfumery and cosmetics."],
  ["Chamomile Oil", "Matricaria chamomilla", "Flowers", "Steam distillation", "Sweet, apple-like and herbal", ["Skincare", "Personal care", "Aromatherapy"],
    "A sweet, apple-like oil with a gentle herbal character, used in personal-care and skincare formulations."],
  ["Oregano Oil", "Origanum vulgare", "Leaves & flowering tops", "Steam distillation", "Pungent, spicy and herbal", ["Flavouring", "Blending", "Industrial use"],
    "A pungent, spicy herbal oil used in flavourings, blending and industrial formulations."],
  ["Thyme Oil", "Thymus vulgaris", "Leaves & flowering tops", "Steam distillation", "Warm, herbal and sharp", ["Oral care", "Flavouring", "Household products"],
    "A warm, sharp herbal oil used in oral-care, flavouring and household products."],
  ["Basil Oil", "Ocimum basilicum", "Leaves", "Steam distillation", "Sweet, green with a hint of anise", ["Flavouring", "Fragrance", "Aromatherapy"],
    "A sweet, green oil with a faint anise note, used in flavours, fragrances and blends."],
  ["Palmarosa Oil", "Cymbopogon martinii", "Grass", "Steam distillation", "Rosy, green and lightly citrus", ["Soap", "Skincare", "Perfumery"],
    "A rosy, lightly citrus grass oil and a popular rose-type note for soaps, skincare and perfumery."],
];

// Photos from the source page's product listings (Citronella and Tea Tree are handled in OIL_IMG_URL below).
const OIL_IMG: Record<string, string> = {
  "Lavender Oil": "lavender-oil-1784101314.jpg",
  "Peppermint Oil": "Peppermint-Oil-1743852939.jpg",
  "Eucalyptus Oil": "Eucalyptus-Oil-1784197584.jpg",
  "Lemongrass Oil": "Lemongrass-Essential-Oil-1784110745.png",
  "Lemon Oil": "lemon-oil-1784105390.jpg",
  "Sweet Orange Oil": "sweet-orange-oil-1784105507.jpg",
  "Bergamot Oil": "Bergamot-Oil-1784193951.jpg",
  "Grapefruit Oil": "Grapefruit-Oil-1784193732.jpg",
  "Rosemary Oil": "Rosemerry-Oil-1743853970.jpg",
  "Clove Oil": "Clove-Oil-1743853542.jpg",
  "Cinnamon Oil": "Cinamon-Oil-1743853286.jpg",
  "Geranium Oil": "geranium-oil-1784104637.jpg",
  "Ylang Ylang Oil": "ylang-ylang-oil-1784104794.jpg",
  "Patchouli Oil": "Patchouli-Essential-Oil-1784110983.png",
  "Sandalwood Oil": "Sandalwood-Oil-1784194371.jpg",
  "Cedarwood Oil": "Cedarwood-Oil-1784195220.jpg",
  "Rose Oil": "rose-oil-1784100617.jpg",
  "Jasmine Absolute": "jasmine-oil-1784101884.jpg",
  "Chamomile Oil": "chamomile-oil-1784102047.jpg",
  "Oregano Oil": "Oregano-Essential-Oil-1784110835.png",
  "Thyme Oil": "Thyme-Essential-Oil-1784098828.png",
  "Basil Oil": "Basil-Essential-Oil-1784098367.png",
  "Palmarosa Oil": "Palmarosa-Oil-1784196216.jpg",
};

// Full-URL overrides (used instead of IMG_BASE): the thumbnail for Citronella and the gallery photo for Tea Tree.
const OIL_IMG_URL: Record<string, string> = {
  "Citronella Oil": "https://www.hrherbal.com/uploaded-files/product-images/thumbs/Citronella-Essential-OilCitronella-Essential-Oil-1784108855-thumbs-525X525.png",
  "Tea Tree Oil": "https://www.hrherbal.com/uploaded-files/catgallery/thumbs/25-thumbs-500X500.jpg",
};

const oils: Product[] = OILS.map(([name, botanical, part, method, aroma, uses, about, best]) => {
  const plain = name.replace(/ (Oil|Absolute)$/, "");
  const isAbsolute = name.endsWith("Absolute");
  return {
    id: slug(name),
    name,
    img: !USE_SOURCE_IMAGES ? undefined : OIL_IMG_URL[name] ?? (OIL_IMG[name] ? IMG_BASE + OIL_IMG[name] : undefined),
    botanical,
    forms: ["Liquid"],
    best,
    about,
    short: `${plain} ${isAbsolute ? "absolute" : "essential oil"} from the ${part.toLowerCase()}, with a ${aroma.toLowerCase()} aroma.`,
    points: [
      `${method} of the ${part.toLowerCase()}`,
      `Aroma: ${aroma.toLowerCase()}`,
      `Used in ${uses.slice(0, 2).join(" and ").toLowerCase()}`,
      "Bulk and sample quantities available",
    ],
    specs: [
      ["Botanical name", botanical],
      ["Plant part", part],
      ["Extraction", method],
      ["Aroma", aroma],
      ["Form", "Liquid"],
      ["Common uses", uses.join(", ")],
      ["Supply", "Bulk, quantity on request"],
      ["Storage", "Cool place, away from light and heat"],
    ],
    uses,
  };
});

/* ---------- Micronutrients (12 minerals + 13 vitamins = 25) ---------- */
const MINERALS = ["Zinc", "Iron", "Magnesium", "Calcium", "Copper", "Manganese", "Selenium", "Chromium", "Molybdenum", "Boron", "Iodine", "Cobalt"];
const VITAMINS = [
  "Vitamin A", "Vitamin B1", "Vitamin B2", "Vitamin B3", "Vitamin B5", "Vitamin B6",
  "Vitamin B7 (Biotin)", "Vitamin B9 (Folic Acid)", "Vitamin B12", "Vitamin C", "Vitamin D3", "Vitamin E", "Vitamin K2",
];

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

/* ---------- Herbal Stocks (bulk raw herbs, trading) (25) ---------- */
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
  ["Fenugreek Seeds", "Trigonella foenum-graecum"],
  ["Black Seed (Kalonji)", "Nigella sativa"],
  ["Isabgol Husk", "Plantago ovata"],
  ["Kalmegh Herb", "Andrographis paniculata"],
  ["Safed Musli Root", "Chlorophytum borivilianum"],
  ["Mulberry Leaves", "Morus alba"],
  ["Stevia Leaves", "Stevia rebaudiana"],
  ["Marigold Flowers", "Calendula officinalis"],
  ["Gotu Kola Herb", "Centella asiatica"],
  ["Fennel Seeds", "Foeniculum vulgare"],
  ["Cinnamon Bark", "Cinnamomum verum"],
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