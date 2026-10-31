"use client";
import { useState } from "react";

// Shows /public image if it exists, otherwise a tinted block with an emoji.
export default function Thumb({ src, alt, icon = "🌿", tint = "#E4F1D0", className }: { src: string; alt: string; icon?: string; tint?: string; className?: string }) {
  const [bad, setBad] = useState(false);
  if (bad) return <div className={`sp-thumb-ph ${className ?? ""}`} style={{ background: tint }} role="img" aria-label={alt}>{icon}</div>;
  // eslint-disable-next-line @next/next/no-img-element
  return <img className={className} src={src} alt={alt} loading="lazy" onError={() => setBad(true)} />;
}