// app/data/posts.ts — blog posts. Add a new object to POSTS to publish a new article.
// Optional cover image: /public/blog/<slug>.jpg (falls back to a tinted block).
export type Block = { h: string } | { p: string } | { ul: string[] };
export type Post = { slug: string; title: string; excerpt: string; date: string; tag: string; icon: string; tint: string; read: string; body: Block[] };

export const POSTS: Post[] = [
  {
    slug: "how-to-choose-a-herbal-extract-supplier",
    title: "How to choose a herbal extract supplier",
    excerpt: "Five questions to ask before you place a bulk order for herbal extracts.",
    date: "2026-10-28", tag: "Herbal Extracts", icon: "🌿", tint: "#E4F1D0", read: "4 min read",
    body: [
      { p: "Buying herbal extracts in bulk is easier when you know what to ask. A clear brief saves time for you and for the supplier." },
      { h: "1. Name the plant, the part and the form" },
      { p: "State the botanical name, the plant part (root, leaf, seed, fruit) and whether you need powder or liquid. Different parts of the same plant can give very different extracts." },
      { h: "2. Ask for the specification" },
      { p: "A specification sheet tells you what to expect from each lot. Ask for it before you order, and compare it with what your formulation needs." },
      { h: "3. Confirm quantity and packing" },
      { ul: ["Minimum and maximum order size", "Packing type and net weight per pack", "Lead time for repeat orders"] },
      { h: "4. Plan for repeat supply" },
      { p: "If you will reorder, ask how consistently the product is available. A supplier who can hold stock helps you avoid gaps in production." },
      { h: "5. Keep communication simple" },
      { p: "Choose a supplier who answers clearly and quickly. Questions about price and availability should not take days." },
    ],
  },
  {
    slug: "powder-vs-liquid-herbal-extracts",
    title: "Powder vs liquid herbal extracts: which should you buy?",
    excerpt: "A simple guide to choosing the right extract format for your product.",
    date: "2026-10-21", tag: "Herbal Extracts", icon: "⚗️", tint: "#DCE9F7", read: "3 min read",
    body: [
      { p: "Many herbal extracts are available as powder or liquid. The right choice depends on what you are making and how you work." },
      { h: "When powder suits you" },
      { ul: ["Tablets, capsules and dry blends", "Easy weighing and longer storage", "Simple to ship and handle in bulk"] },
      { h: "When liquid suits you" },
      { ul: ["Beverages, syrups and drops", "Products that need to mix in quickly", "Formulations that are already liquid"] },
      { h: "Not sure?" },
      { p: "Tell our team what you are making. We can tell you which form we offer for the extract you need and share its specification." },
    ],
  },
  {
    slug: "buying-essential-oils-in-bulk",
    title: "Buying essential oils in bulk: what to check first",
    excerpt: "Botanical name, aroma, packing and storage: the basics before you order oils.",
    date: "2026-10-14", tag: "Essential Oils", icon: "💧", tint: "#F8EBC8", read: "4 min read",
    body: [
      { p: "Essential oils are concentrated, so small differences in source and handling show up in the final product." },
      { h: "Check the botanical name" },
      { p: "Common names can be shared by different plants. The botanical name, such as Lavandula angustifolia for lavender, tells you exactly which plant the oil comes from." },
      { h: "Ask about packing" },
      { p: "Oils should be packed in suitable containers and kept away from heat and light. Ask what packing sizes are available for your order." },
      { h: "Match the oil to the use" },
      { ul: ["Aromatherapy blends", "Soaps, creams and hair care", "Fragrance and home products"] },
      { p: "Tell us what you will make with the oil, and we will share price and availability for the quantity you need." },
    ],
  },
  {
    slug: "vitamins-and-minerals-as-raw-materials",
    title: "Vitamins and minerals as raw materials: what to specify",
    excerpt: "What manufacturers should include when they ask for micronutrient quotes.",
    date: "2026-10-07", tag: "Micronutrients", icon: "🧪", tint: "#F3E2D3", read: "3 min read",
    body: [
      { p: "Vitamins and minerals are used in small amounts, but the right grade and form matter. A clear request gets you an accurate quote." },
      { h: "Include these details" },
      { ul: ["The exact vitamin or mineral, including its form", "The grade you need for your product type", "Quantity per order and how often you reorder", "Any documents you need with each lot"] },
      { h: "Plan for steady supply" },
      { p: "If your product depends on one ingredient, tell us early. Knowing your usual volumes helps us plan stock." },
    ],
  },
];

export const fmtDate = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });