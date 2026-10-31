"use client";
import { useEffect, useState } from "react";
import { display, body } from "@/app/fonts";
import { CATEGORIES as ALL_CATEGORIES, type Product } from "@/app/data/botanicals";
import { SITE } from "@/app/data/site";
import Photo from "@/app/components/Photo";
import "../categories.css";
import "./header.css";

const MENU_MAX = 25; // products shown per category in the mega menu

/* Category order used by the header and the home page */
const ORDER = ["herbal-extracts", "micronutrients", "essential-oils", "herbal-stocks"];
export const CATEGORIES = ORDER.map((id) => ALL_CATEGORIES.find((c) => c.id === id)!).filter(Boolean);

type Props = {
  /** Called when a product is chosen in the menu. If missing, the visitor goes to that product's category page. */
  onPick?: (p: Product, categoryNav: string) => void;
  /** Optional: called as the visitor types in the search box (the home page uses it to filter its sections). */
  onQuery?: (v: string) => void;
  /** Current page path, used to highlight the nav item: "/", "/about", "/blog", "/contact" or a category path. */
  active?: string;
};

export default function Header({ onPick, onQuery, active }: Props) {
  const [menu, setMenu] = useState(false);
  const [catOpen, setCatOpen] = useState(false); // Categories dropdown
  const [mq, setMq] = useState("");
  const [mob, setMob] = useState(false); // mobile drawer
  const [acc, setAcc] = useState<string | null>(null); // open category in drawer
  const [sq, setSq] = useState(""); // top bar search text
  const [sOpen, setSOpen] = useState(false);
  const tel = `tel:${SITE.phone.replace(/\s/g, "")}`;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(false);
        setMob(false);
        setSOpen(false);
        setCatOpen(false);
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

  const section = !active ? "" : active === "/" ? "home" : ["/about", "/blog", "/contact"].includes(active) ? active.slice(1) : "categories";
  const closeDd = () => { setMenu(false); setCatOpen(false); };

  const wa = () => `https://wa.me/${SITE.whatsapp}`;

  const total = CATEGORIES.reduce((n, c) => n + c.products.length, 0);
  const BEST = CATEGORIES.flatMap((c) => c.products.map((p) => ({ p, c }))).filter((x) => x.p.best).slice(0, 6);
  const mterm = mq.trim().toLowerCase();
  const menuCats = CATEGORIES.map((c) => ({
    ...c,
    products: mterm ? c.products.filter((p) => p.name.toLowerCase().includes(mterm)) : c.products,
  })).filter((c) => c.products.length);

  const sterm = sq.trim().toLowerCase();
  const results = sterm
    ? CATEGORIES.flatMap((c) => c.products.map((p) => ({ p, c })))
        .filter(({ p }) => (p.name + " " + (p.botanical ?? "")).toLowerCase().includes(sterm))
        .slice(0, 8)
    : [];
  const typeSearch = (v: string) => {
    setSq(v);
    setSOpen(true);
    onQuery?.(v);
  };
  const clearSearch = () => {
    setSq("");
    setSOpen(false);
    onQuery?.("");
  };

  const pick = (p: Product, c: (typeof CATEGORIES)[number]) => {
    setMenu(false);
    setMob(false);
    if (onPick) onPick(p, c.nav);
    else window.location.href = `/${c.id}`;
  };

  return (
    <div className={`site ${display.variable} ${body.variable}`} style={{ display: "contents" }}>
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
              <a className="d-link" href="/" onClick={() => setMob(false)}>Home</a>
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
              <div className="d-label">Categories</div>
              {CATEGORIES.map((c) => (
                <a key={c.id} className="d-link" href={`/${c.id}`} onClick={() => setMob(false)}>{c.title}</a>
              ))}
              <a className="d-link" href="/about" onClick={() => setMob(false)}>About</a>
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
          <div className="tb-search">
            <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="9" cy="9" r="6" /><path d="M14 14l4 4" strokeLinecap="round" /></svg>
            <input
              value={sq}
              onChange={(e) => typeSearch(e.target.value)}
              onFocus={() => setSOpen(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && results[0]) { pick(results[0].p, results[0].c); clearSearch(); }
              }}
              placeholder="Search extracts, oils, herbs..."
              aria-label="Search products"
              autoComplete="off"
            />
            {sOpen && sterm && (
              <>
                <div className="tb-back" onClick={() => setSOpen(false)} />
                <ul className="tb-results">
                  {results.map(({ p, c }) => (
                    <li key={p.id}>
                      <button onClick={() => { pick(p, c); clearSearch(); }}>
                        <span>{p.name}</span><small>{c.nav}</small>
                      </button>
                    </li>
                  ))}
                  {!results.length && <li className="tb-empty">No product matches “{sq}”.</li>}
                </ul>
              </>
            )}
          </div>
          <span className="tb-right">
            <span className="hide-sm">{SITE.hours}</span>
            <a href={`mailto:${SITE.email}`} className="hide-sm">{SITE.email}</a>
            <a href={tel}>{SITE.phone}</a>
          </span>
        </div>
      </div>

      <header className="header" onMouseLeave={closeDd}>
        <div className="pad row">
          <button className="burger" onClick={() => setMob(true)} aria-label="Open menu" aria-expanded={mob}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <a href="/" className="logo"><img src="/logo.png" alt="Herbyzone Botanicals" /></a>

          <nav className="hnav" aria-label="Main">
            <a href="/" className={section === "home" ? "on" : ""} onMouseEnter={closeDd}>Home</a>
            <a
              href="/herbal-extracts"
              className={`hn-dd ${menu ? "open" : ""}`}
              onMouseEnter={() => { setMenu(true); setCatOpen(false); }}
              onClick={(e) => { e.preventDefault(); setMenu((m) => !m); setCatOpen(false); }}
              aria-expanded={menu}
              aria-controls="mega"
            >
              Products
              <svg viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
            <div className="dd-wrap" onMouseEnter={() => { setCatOpen(true); setMenu(false); }}>
              <button
                type="button"
                className={`hn-dd ${catOpen ? "open" : ""} ${section === "categories" ? "on" : ""}`}
                onClick={() => { setCatOpen((o) => !o); setMenu(false); }}
                aria-expanded={catOpen}
                aria-haspopup="true"
              >
                Categories
                <svg viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              {catOpen && (
                <ul className="cat-dd">
                  {CATEGORIES.map((c) => (
                    <li key={c.id}>
                      <a href={`/${c.id}`} onClick={() => setCatOpen(false)}>
                        <span style={{ background: c.tint }}>{c.icon}</span>
                        {c.title}
                        <em>{c.products.length}</em>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <a href="/about" className={section === "about" ? "on" : ""} onMouseEnter={closeDd}>About</a>
            <a href="/blog" className={section === "blog" ? "on" : ""} onMouseEnter={closeDd}>Blog</a>
            <a href="/contact" className={section === "contact" ? "on" : ""} onMouseEnter={closeDd}>Contact</a>
          </nav>

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
    </div>
  );
}