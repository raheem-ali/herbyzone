"use client";
import { useEffect, useState } from "react";
import { CATEGORIES as ALL_CATEGORIES, type Product } from "@/app/data/botanicals";
import { SITE } from "@/app/data/site";
import Photo from "@/app/components/Photo";
import "../categories.css";

const MENU_MAX = 25; // products shown per category in the mega menu

/* Category order used by the header and the home page */
const ORDER = ["herbal-extracts", "micronutrients", "essential-oils", "herbal-stocks"];
export const CATEGORIES = ORDER.map((id) => ALL_CATEGORIES.find((c) => c.id === id)!).filter(Boolean);

type Props = {
  /** Called when a product is chosen in the menu. If missing, the visitor goes to that product's category page. */
  onPick?: (p: Product, categoryNav: string) => void;
  /** Header search box. Shown only when both are given. */
  query?: string;
  onQuery?: (v: string) => void;
};

export default function Header({ onPick, query, onQuery }: Props) {
  const [menu, setMenu] = useState(false);
  const [mq, setMq] = useState("");
  const [mob, setMob] = useState(false); // mobile drawer
  const [acc, setAcc] = useState<string | null>(null); // open category in drawer
  const tel = `tel:${SITE.phone.replace(/\s/g, "")}`;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(false);
        setMob(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!mob) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [mob]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 1060) setMob(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const wa = () => `https://wa.me/${SITE.whatsapp}`;

  const total = CATEGORIES.reduce((n, c) => n + c.products.length, 0);
  const BEST = CATEGORIES.flatMap((c) => c.products.map((p) => ({ p, c }))).filter((x) => x.p.best).slice(0, 6);
  const mterm = mq.trim().toLowerCase();
  const menuCats = CATEGORIES.map((c) => ({
    ...c,
    products: mterm ? c.products.filter((p) => p.name.toLowerCase().includes(mterm)) : c.products,
  })).filter((c) => c.products.length);

  const pick = (p: Product, c: (typeof CATEGORIES)[number]) => {
    setMenu(false);
    setMob(false);
    if (onPick) onPick(p, c.nav);
    else window.location.href = `/${c.id}`;
  };

  return (
    <>
      {/* Mobile / tablet drawer */}
      {mob && (
        <>
          <div className="drawer-backdrop" onClick={() => setMob(false)} />
          <aside className="drawer" aria-label="Menu">
            <div className="drawer-head">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="Herbyzone Botanicals" />
              <button className="drawer-x" onClick={() => setMob(false)} aria-label="Close menu">×</button>
            </div>
            <nav className="drawer-scroll">
              <a className="d-link" href="/about" onClick={() => setMob(false)}>About</a>
              <div className="d-label">Products</div>
              {CATEGORIES.map((c) => (
                <div key={c.id}>
                  <button
                    className={`acc-btn ${acc === c.id ? "on" : ""}`}
                    onClick={() => setAcc((a) => (a === c.id ? null : c.id))}
                    aria-expanded={acc === c.id}
                  >
                    <span className="acc-ic" style={{ background: c.tint }}>{c.icon}</span>
                    {c.title}
                    <em>{c.products.length}</em>
                    <svg viewBox="0 0 12 12" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                  {acc === c.id && (
                    <ul className="acc-list">
                      <li><a className="acc-all" href={`/${c.id}`} onClick={() => setMob(false)}>View all {c.nav} →</a></li>
                      {c.products.map((p) => (
                        <li key={p.id}>
                          <button onClick={() => pick(p, c)}>{p.name}{p.best && <i> ★</i>}</button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
              <a className="d-link" href="/blog" onClick={() => setMob(false)}>Blog</a>
              <a className="d-link" href="/#expert" onClick={() => setMob(false)}>Request a quote</a>
              <a className="d-link" href="/contact" onClick={() => setMob(false)}>Contact</a>
            </nav>
            <div className="drawer-cta">
              <a className="btn btn-outline" href={tel}>Call now</a>
              <a className="btn btn-wa" href={wa()} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </div>
          </aside>
        </>
      )}

      <div className="topbar">
        <div className="pad row">
          <span>Bulk supply for manufacturers — call or WhatsApp our team</span>
          <span className="tb-right">
            <span className="hide-sm">{SITE.hours}</span>
            <a href={`mailto:${SITE.email}`} className="hide-sm">{SITE.email}</a>
            <a href={tel}>{SITE.phone}</a>
          </span>
        </div>
      </div>

      <header className="header" onMouseLeave={() => setMenu(false)}>
        <div className="pad row">
          <button className="burger" onClick={() => setMob(true)} aria-label="Open menu" aria-expanded={mob}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <a href="/" className="logo"><img src="/logo.png" alt="Herbyzone Botanicals" /></a>

          <div className="navgroup">
            <a
              href="/herbal-extracts"
              className={`prod-link ${menu ? "on" : ""}`}
              onMouseEnter={() => setMenu(true)}
              onClick={(e) => { e.preventDefault(); setMenu((m) => !m); }}
              aria-expanded={menu}
              aria-controls="mega"
            >
              Products
              <svg viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
            <nav>
              <a href="/about">About</a>
              {CATEGORIES.map((c) => <a key={c.id} href={`/${c.id}`}>{c.nav}</a>)}
              <a href="/blog">Blog</a>
              <a href="/contact">Contact</a>
            </nav>
          </div>

          {onQuery && (
            <label className="search">
              <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="9" cy="9" r="6" /><path d="M14 14l4 4" strokeLinecap="round" /></svg>
              <input value={query ?? ""} onChange={(e) => onQuery(e.target.value)} placeholder="Search extracts, oils, herbs..." aria-label="Search products" />
            </label>
          )}
          <a className="btn btn-wa sm" href={wa()} target="_blank" rel="noopener noreferrer">WhatsApp us</a>
        </div>

        {menu && (
          <>
            <div className="mega-backdrop" onClick={() => setMenu(false)} />
            <div className="mega" id="mega">
              <div className="pad mega-in">
                <div className="mega-main">
                  <div className="mega-top">
                    <strong>All products <span>({total})</span></strong>
                    <input value={mq} onChange={(e) => setMq(e.target.value)} placeholder="Filter products…" aria-label="Filter products" />
                  </div>
                  <div className="mega-cols">
                    {menuCats.map((c) => (
                      <div key={c.id} className="mega-col" style={{ ["--rows" as string]: 13 }}>
                        <h4><span style={{ background: c.tint }}>{c.icon}</span>{c.title}<em>{c.products.length}</em></h4>
                        <ul>
                          {c.products.slice(0, MENU_MAX).map((p) => (
                            <li key={p.id}>
                              <button onClick={() => pick(p, c)}>
                                <span className="nm">{p.name}</span>
                                {p.best && <i title="Best seller">★</i>}
                              </button>
                            </li>
                          ))}
                        </ul>
                        <a className="mega-more" href={`/${c.id}`} onClick={() => setMenu(false)}>View all {c.products.length} →</a>
                      </div>
                    ))}
                    {!menuCats.length && <p className="mega-empty">No product matches “{mq}”.</p>}
                  </div>
                </div>

                <aside className="mega-side">
                  <h4>⭐ Best sellers</h4>
                  <ul>
                    {BEST.map(({ p, c }) => (
                      <li key={p.id}>
                        <button onClick={() => pick(p, c)}>
                          <span className="bs-img"><Photo p={p} w={120} h={120} /></span>
                          <span className="bs-txt"><b>{p.name}</b><small>{c.nav}</small></span>
                        </button>
                      </li>
                    ))}
                  </ul>
                  <a className="btn btn-primary sm" href="/herbal-extracts" onClick={() => setMenu(false)}>Browse all products</a>
                </aside>
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
}