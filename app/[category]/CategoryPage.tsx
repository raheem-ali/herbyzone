"use client";
import { useState } from "react";
import { display, body } from "@/app/fonts";
import { CATEGORIES, imgUrl, type Product } from "@/app/data/botanicals";
import { INTRO } from "@/app/data/categoryIntro";
import { attributesFor } from "@/app/data/attributes";
import { SITE } from "@/app/data/site";
import Footer from "@/app/components/Footer";
import "./category.css";

function Photo({ p }: { p: Product }) {
  const [bad, setBad] = useState(false);
  if (bad) return <div className="cp-ph">{p.name}</div>;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={imgUrl(p, 520, 520)} alt={p.name} loading="lazy" onError={() => setBad(true)} />;
}

function Cover({ id, fallback }: { id: string; fallback: Product }) {
  const [src, setSrc] = useState(`/categories/${id}.jpg`);
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="" onError={() => setSrc(imgUrl(fallback))} />;
}

export default function CategoryPage({ id }: { id: string }) {
  const c = CATEGORIES.find((x) => x.id === id)!;
  const t = INTRO[id];
  const [q, setQ] = useState("");
  const tel = `tel:${SITE.phone.replace(/\s/g, "")}`;
  const wa = (name?: string) =>
    `https://wa.me/${SITE.whatsapp}` +
    (name ? `?text=${encodeURIComponent(`Hello Herbyzone Botanicals, I'm interested in ${name}. Please share price and availability.`)}` : "");
  const term = q.trim().toLowerCase();
  const list = c.products.slice(0, 25).filter((p) => (p.name + " " + (p.botanical ?? "")).toLowerCase().includes(term));

  return (
    <div className={`cp ${display.variable} ${body.variable}`} style={{ ["--tint" as string]: c.tint }}>
      <header className="cp-nav">
        <div className="cp-wrap cp-nav-in">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <a href="/"><img src="/logo.png" alt="Herbyzone Botanicals" height={44} /></a>
          <nav>
            <a href="/#about">About</a>
            {CATEGORIES.map((k) => (
              <a key={k.id} href={`/${k.id}`} className={k.id === id ? "on" : ""}>{k.nav}</a>
            ))}
            <a href="/#contact">Contact</a>
          </nav>
          <a className="cp-btn cp-wa" href={wa()} target="_blank" rel="noopener noreferrer">WhatsApp us</a>
        </div>
      </header>

      {/* Section 1: page banner + breadcrumb */}
      <section className="cp-banner">
        <h2>{t.suppliers}</h2>
      </section>
      <div className="cp-crumbbar">
        <div className="cp-wrap cp-crumb"><a href="/">Home</a> <i>/</i> <a href="/#top">Products</a> <i>/</i> <b>{c.nav}</b></div>
      </div>

      {/* Section 2: intro text box + category photo + 3 product photos */}
      <section className="cp-intro">
        <div className="cp-wrap">
          <h1>{c.title} in Pakistan</h1>
          <div className="cp-intro-grid">
            <div>
              <div className="cp-scroll" tabIndex={0} aria-label={`About ${c.title}`}>
                <h3>{t.h1}</h3>
                {t.p.map((x) => <p key={x}>{x}</p>)}
                <ul>{t.points.map(([a, b]) => <li key={a}><b>{a}</b> {b}</li>)}</ul>
                <h3>{t.h2}</h3>
                {t.p2.map((x) => <p key={x}>{x}</p>)}
              </div>
              <div className="cp-thumbs">
                {c.products.slice(0, 3).map((p) => <Photo key={p.id} p={p} />)}
              </div>
            </div>
            <div className="cp-cover">
              <Cover id={id} fallback={c.products[0]} />
              <a className="cp-btn cp-primary cp-pill" href={wa()} target="_blank" rel="noopener noreferrer">Send enquiry</a>
            </div>
          </div>
        </div>
      </section>

      <main className="cp-wrap cp-main">
        <div className="cp-bar">
          <h2>Check all {c.title.toLowerCase()} <em>({list.length})</em></h2>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${c.title.toLowerCase()}…`} aria-label="Search this category" />
        </div>

        <div className="cp-grid">
          {list.map((p) => (
            <article key={p.id} className="cp-card">
              <div className="cp-img">
                <Photo p={p} />
                {p.best && <span className="cp-best">Best seller</span>}
              </div>
              <div className="cp-info">
                <h3>{p.name}</h3>
                <p className="cp-short">{p.short}</p>
                <table className="cp-attr">
                  <thead>
                    <tr><th>Attribute</th><th>Details</th></tr>
                  </thead>
                  <tbody>
                    {attributesFor(c.id, p).map(([k, v]) => (
                      <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>
                    ))}
                  </tbody>
                </table>
                <div className="cp-act">
                  <a className="cp-btn cp-primary" href={wa(p.name)} target="_blank" rel="noopener noreferrer">Send enquiry</a>
                  <a className="cp-btn cp-line" href={tel}>Call now</a>
                </div>
              </div>
            </article>
          ))}
        </div>
        {!list.length && <p className="cp-empty">No match for “{q}”. <a href={wa()}>Ask us on WhatsApp</a> and we will source it.</p>}

        <section className="cp-more">
          <h2>Browse other categories</h2>
          <div>
            {CATEGORIES.filter((k) => k.id !== id).map((k) => (
              <a key={k.id} href={`/${k.id}`} style={{ background: k.tint }}>
                <span>{k.icon}</span>
                <b>{k.title}</b>
                <small>{k.products.length} products</small>
              </a>
            ))}
          </div>
        </section>
      </main>

      <section className="cp-cta">
        <div className="cp-wrap cp-cta-in">
          <div>
            <h2>Need bulk {c.title.toLowerCase()}?</h2>
            <p>Share the product, grade and quantity. Our team will reply with specifications and price.</p>
          </div>
          <a className="cp-btn cp-light" href={wa()} target="_blank" rel="noopener noreferrer">Ask on WhatsApp</a>
        </div>
      </section>
      <Footer />
    </div>
  );
}