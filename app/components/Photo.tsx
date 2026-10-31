"use client";
import { useState } from "react";
import { imgUrl, type Product } from "@/app/data/botanicals";

export default function Photo({ p, w, h, className }: { p: Product; w: number; h: number; className?: string }) {
  const [bad, setBad] = useState(false);
  if (bad) return <div className={`ph ${className ?? ""}`}>{p.name}</div>;
  // eslint-disable-next-line @next/next/no-img-element
  return <img className={className} src={imgUrl(p, w, h)} alt={p.name} loading="lazy" onError={() => setBad(true)} />;
}