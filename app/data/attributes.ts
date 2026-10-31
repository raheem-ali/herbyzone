// app/data/attributes.ts — the Attribute / Details table shown on each product card.
// Defaults are per category. To change one product, add it to OVERRIDES (only the rows you list are replaced).
// NOTE: packaging, shipping and purity wording are placeholders. Confirm them with the client before launch.
import type { Product } from "./botanicals";

type Row = [string, string];

const SHIP = "Export-standard packing, details on request";

const DEFAULTS: Record<string, (p: Product) => Row[]> = {
  "herbal-extracts": (p) => [
    ["Botanical Name", p.botanical ?? "On request"],
    ["Form", "Powder / Liquid"],
    ["Packaging Size", "25 / 50 Kgs (Net Weight)"],
    ["Packaging Type", "PP Bags / Drums"],
    ["Shipping", SHIP],
    ["Usage / Application", (p.uses ?? []).join(", ")],
    ["Purity", "Specification on request"],
  ],
  "essential-oils": (p) => [
    ["Botanical Name", p.botanical ?? "On request"],
    ["Form", "Pure essential oil (liquid)"],
    ["Packaging Size", "1 / 5 / 25 Kgs (Net Weight)"],
    ["Packaging Type", "Aluminium / HDPE Drums"],
    ["Shipping", SHIP],
    ["Usage / Application", (p.uses ?? []).join(", ")],
    ["Purity", "Specification on request"],
  ],
  micronutrients: (p) => [
    ["Category", p.specs.find(([k]) => k === "Category")?.[1] ?? "On request"],
    ["Form", "Powder"],
    ["Packaging Size", "25 Kgs (Net Weight)"],
    ["Packaging Type", "Fibre Drums / PP Bags"],
    ["Shipping", SHIP],
    ["Usage / Application", (p.uses ?? []).join(", ")],
    ["Grade", "On request"],
  ],
  "herbal-stocks": (p) => [
    ["Botanical Name", p.botanical ?? "On request"],
    ["Form", "Dried raw herb"],
    ["Packaging Size", "25 / 50 Kgs (Net Weight)"],
    ["Packaging Type", "PP Bags / Jute Bags"],
    ["Shipping", SHIP],
    ["Usage / Application", (p.uses ?? []).join(", ")],
    ["Quality", "Specification on request"],
  ],
};

// Example: "ashwagandha-root-extract": [["Standardization", "5% Withanolides"], ["Purity", "100% pure extract"]],
export const OVERRIDES: Record<string, Row[]> = {};

export function attributesFor(categoryId: string, p: Product): Row[] {
  const rows = (DEFAULTS[categoryId] ?? DEFAULTS["herbal-extracts"])(p);
  const over = OVERRIDES[p.id] ?? [];
  const merged = rows.map(([k, v]) => [k, over.find(([ok]) => ok === k)?.[1] ?? v] as Row);
  over.forEach(([k, v]) => { if (!merged.some(([mk]) => mk === k)) merged.push([k, v]); });
  return merged;
}