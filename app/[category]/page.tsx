import { notFound } from "next/navigation";
import { CATEGORIES } from "@/app/data/botanicals";
import CategoryPage from "./CategoryPage";

export const generateStaticParams = () => CATEGORIES.map((c) => ({ category: c.id }));

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const c = CATEGORIES.find((x) => x.id === category);
  return c ? { title: `${c.title} Supplier in Pakistan | Herbyzone Botanicals`, description: c.blurb } : {};
}

export default async function Page({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  if (!CATEGORIES.some((c) => c.id === category)) notFound();
  return <CategoryPage id={category} />;
}