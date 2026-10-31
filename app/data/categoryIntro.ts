// app/data/categoryIntro.ts — text for the scrollable intro box on each category page.
// Edit freely. Category photo: /public/categories/<category-id>.jpg (falls back to the first product photo).
export type Intro = { suppliers: string; h1: string; p: string[]; points: [string, string][]; h2: string; p2: string[] };

export const INTRO: Record<string, Intro> = {
  "herbal-extracts": {
    suppliers: "Herbal Extracts Suppliers",
    h1: "Why are herbal extracts important for manufacturers?",
    p: ["Herbal extracts concentrate the active compounds of a plant into a form that is easy to dose, store and blend. They are used across medicines, supplements, food and skincare, where consistent strength matters from batch to batch."],
    points: [
      ["Concentrated actives:", "a small quantity carries the strength of a much larger amount of raw herb."],
      ["Powder and liquid forms:", "choose the format that suits your production line."],
      ["Wide range of uses:", "pharmaceutical, nutraceutical, food and cosmetic products."],
      ["Easy to handle:", "stable, measurable and simple to store in bulk."],
    ],
    h2: "What to look for in a supplier",
    p2: ["Strength and purity depend on the plant part used and the method of extraction. Share the extract, grade and quantity you need, and our team replies with specifications, price and availability.", "We supply in bulk for regular production, and can discuss packing and documentation on request."],
  },
  "essential-oils": {
    suppliers: "Essential Oils Suppliers",
    h1: "Why are essential oils important for makers?",
    p: ["Essential oils carry the natural aroma and character of the plant they come from. They are a core ingredient in aromatherapy blends, soaps, creams, hair care and fragrance products."],
    points: [
      ["Natural aroma:", "a plant-based scent for personal care and home products."],
      ["Strong and concentrated:", "a few drops go a long way in a formulation."],
      ["Many oils, one supplier:", "lavender, tea tree, eucalyptus, sandalwood and more."],
      ["Bulk quantities:", "suited to regular manufacturing and repacking."],
    ],
    h2: "Choosing the right oil",
    p2: ["Each oil has its own botanical source, aroma and use. Tell us the oil, quantity and what you will make with it, and we will share price and availability.", "We can supply bulk lots for manufacturers, packers and private-label brands."],
  },
  micronutrients: {
    suppliers: "Micronutrients Suppliers",
    h1: "Why do manufacturers need micronutrients?",
    p: ["Vitamins and minerals are needed in small amounts but play a large role in health. They are used as raw materials in tablets, capsules, powders, fortified foods and animal-free supplement blends."],
    points: [
      ["Minerals:", "zinc, iron, magnesium, calcium, selenium and more."],
      ["Vitamins:", "the full B-group, plus vitamins A, C, D3, E and K2."],
      ["Raw material supply:", "grades and forms available on request."],
      ["Reliable repeat supply:", "plan production without gaps in stock."],
    ],
    h2: "Grades and specifications",
    p2: ["The right grade depends on whether the material goes into medicine, supplements or food. Share the product, grade and quantity, and we will reply with specifications and price.", "Documentation can be discussed on request."],
  },
  "herbal-stocks": {
    suppliers: "Herbal Stocks Suppliers",
    h1: "Why buy herbal stocks in bulk?",
    p: ["Dried roots, leaves, seeds and flowers are the starting point for herbal teas, powders, extracts and traditional medicines. Buying ready stock saves the time of sourcing season by season."],
    points: [
      ["Ready stock:", "bulk lots held for trade buyers."],
      ["Roots, leaves, seeds and flowers:", "ashwagandha, moringa, licorice, chamomile and more."],
      ["Good for processing:", "used for extraction, grinding and blending."],
      ["Repeat orders:", "steady supply for regular buyers."],
    ],
    h2: "How to order",
    p2: ["Tell us the herb, part, quantity and how you plan to use it. We will share price and availability for the current stock.", "Lot sizes and packing can be agreed with our team on request."],
  },
};