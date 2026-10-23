"use client";
import { useEffect, useState } from "react";
import { display, body } from "@/app/fonts";
import { CATEGORIES, SITE, imgUrl, type Product } from "@/app/data/site";
import Footer from "@/app/components/Footer";
import "../categories.css";

const MENU_MAX = 25; // products shown per category in the mega menu
const PAGE = 10; // cards shown per category before "Show more"

/* ---------- Card styles ----------
   Everything else is the original page; only the CARD design changes per category.
   Styles are assigned in order and repeat. Pin one to a category with CARD_BY_ID,
   e.g. { medicinal: "overlay" }. */
type CardStyle = "classic" | "overlay" | "side" | "round" | "outline";
const CARD_STYLES: CardStyle[] = ["classic", "overlay", "side", "round", "outline"];
const CARD_BY_ID: Record<string, CardStyle> = {};

const SLIDES = [
  {
    image: "https://bmgqwozegxstvizngicd.supabase.co/storage/v1/render/image/public/shop-assets/banners/1771917030093-66xplmk.png?width=800&height=400&quality=65&format=avif&resize=contain",
    title: "Medicinal crop seeds, tested and trusted",
    sub: "Stevia, ashwagandha, moringa and more for high-value farming.",
    cta: "Shop medicinal",
    href: "#medicinal",
  },
  {
    image: "https://bmgqwozegxstvizngicd.supabase.co/storage/v1/render/image/public/shop-assets/banners/1771918626429-vhf1aq.png?width=800&height=400&quality=65&format=avif&resize=contain",
    title: "Green fodder seeds for healthier livestock",
    sub: "Berseem, sorghum, alfalfa and millet with dependable yields.",
    cta: "Shop fodder",
    href: "#fodder",
  },
  {
    image: "https://bmgqwozegxstvizngicd.supabase.co/storage/v1/render/image/public/shop-assets/banners/1771917030093-66xplmk.png?width=800&height=400&quality=65&format=avif&resize=contain",
    title: "Aromatic herbs for farm and kitchen",
    sub: "Basil, lemongrass, chamomile and mint seeds ready to sow.",
    cta: "Shop herbs",
    href: "#aromatic",
  },
];

const Check = () => (
  <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
    <circle cx="8" cy="8" r="8" fill="#E4F1D0" />
    <path d="M4.5 8.3l2.2 2.2 4.8-4.8" fill="none" stroke="#239940" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function Photo({ p, w, h, className }: { p: Product; w: number; h: number; className?: string }) {
  const [bad, setBad] = useState(false);
  if (bad) return <div className={`ph ${className ?? ""}`}>{p.name}</div>;
  // eslint-disable-next-line @next/next/no-img-element
  return <img className={className} src={imgUrl(p, w, h)} alt={p.name} loading="lazy" onError={() => setBad(true)} />;
}

export default function Home() {
  const [open, setOpen] = useState<{ p: Product; cat: string } | null>(null);
  const [slide, setSlide] = useState(0);
  const [hover, setHover] = useState(false);
  const [q, setQ] = useState("");
  const [menu, setMenu] = useState(false);
  const [mq, setMq] = useState("");
  const [mob, setMob] = useState(false); // mobile drawer
  const [acc, setAcc] = useState<string | null>(null); // open category in drawer
  const [shown, setShown] = useState<Record<string, number>>({});
  const tel = `tel:${SITE.phone.replace(/\s/g, "")}`;

  useEffect(() => {
    if (hover) return;
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, [hover]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMenu(false);
        setMob(false);
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = open || mob ? "hidden" : "";
    return () => window.removeEventListener("keydown", onKey);
  }, [open, mob]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 1060) setMob(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const wa = (name?: string) =>
    `https://wa.me/${SITE.whatsapp}` +
    (name ? `?text=${encodeURIComponent(`Hello Herbyzone, I'm interested in ${name}. Please share price and availability.`)}` : "");

  const term = q.trim().toLowerCase();
  const cats = CATEGORIES.map((c) => ({
    ...c,
    products: term ? c.products.filter((p) => (p.name + " " + p.short).toLowerCase().includes(term)) : c.products,
  })).filter((c) => c.products.length);

  // mega menu data
  const total = CATEGORIES.reduce((n, c) => n + c.products.length, 0);
  const BEST = CATEGORIES.flatMap((c) => c.products.map((p) => ({ p, cat: c.nav }))).filter((x) => x.p.best).slice(0, 6);
  const mterm = mq.trim().toLowerCase();
  const menuCats = CATEGORIES.map((c) => ({
    ...c,
    products: mterm ? c.products.filter((p) => p.name.toLowerCase().includes(mterm)) : c.products,
  })).filter((c) => c.products.length);

  const pick = (p: Product, cat: string) => {
    setOpen({ p, cat });
    setMenu(false);
    setMob(false);
  };

  const go = (d: number) => setSlide((s) => (s + d + SLIDES.length) % SLIDES.length);

  type Cat = (typeof cats)[number];

  const renderCard = (p: Product, c: Cat, v: CardStyle) => {
    const view = () => setOpen({ p, cat: c.nav });
    const actions = (
      <div className="actions">
        <button className="btn btn-outline" onClick={view}>View details</button>
        <a className="btn btn-wa" href={wa(p.name)} target="_blank" rel="noopener noreferrer">WhatsApp</a>
      </div>
    );

    if (v === "overlay")
      return (
        <article key={p.id} className="kc kc-overlay">
          <button className="kc-media" onClick={view} aria-label={`View ${p.name}`}>
            <Photo p={p} w={560} h={460} />
            <span className="kc-over">
              <h3>{p.name}</h3>
              <p>{p.short}</p>
            </span>
          </button>
          {actions}
        </article>
      );

    if (v === "side")
      return (
        <article key={p.id} className="kc kc-side">
          <button className="kc-media" onClick={view} aria-label={`View ${p.name}`}>
            <Photo p={p} w={400} h={460} />
          </button>
          <div className="kc-body">
            <h3>{p.name}</h3>
            <p className="short">{p.short}</p>
            <ul className="points">
              {p.points.map((pt) => <li key={pt}><Check />{pt}</li>)}
            </ul>
            {actions}
          </div>
        </article>
      );

    if (v === "round")
      return (
        <article key={p.id} className="kc kc-round" style={{ background: c.tint }}>
          <button className="kc-media" onClick={view} aria-label={`View ${p.name}`}>
            <Photo p={p} w={300} h={300} />
          </button>
          <h3>{p.name}</h3>
          <p className="short">{p.short}</p>
          {actions}
        </article>
      );

    if (v === "outline")
      return (
        <article key={p.id} className="kc kc-outline">
          <button className="kc-media" onClick={view} aria-label={`View ${p.name}`}>
            <Photo p={p} w={520} h={320} />
            <span className="tag">{c.nav}</span>
          </button>
          <div className="kc-body">
            <h3>{p.name}</h3>
            <p className="short">{p.short}</p>
            <div className="chips">{p.points.map((pt) => <span key={pt}>{pt}</span>)}</div>
            {actions}
          </div>
        </article>
      );

    // classic = your original card
    return (
      <article key={p.id} className="card">
        <button className="card-media" onClick={view} aria-label={`View ${p.name}`}>
          <Photo p={p} w={520} h={360} />
          <span className="tag">{c.nav}</span>
        </button>
        <div className="card-body">
          <h3>{p.name}</h3>
          <p className="short">{p.short}</p>
          <ul className="points">
            {p.points.map((pt) => <li key={pt}><Check />{pt}</li>)}
          </ul>
          <div className="actions">
            <button className="btn btn-outline" onClick={view}>View details</button>
            <a className="btn btn-wa" href={wa(p.name)} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>
      </article>
    );
  };

  const renderCat = (c: Cat, i: number) => {
    const v = CARD_BY_ID[c.id] ?? CARD_STYLES[i % CARD_STYLES.length];
    const limit = shown[c.id] ?? PAGE;
    const list = term ? c.products : c.products.slice(0, limit);
    const left = c.products.length - list.length;
    return (
      <section key={c.id} id={c.id} className="cat">
        <div className="cat-head" style={{ background: `linear-gradient(90deg, ${c.tint}, #fff 85%)` }}>
          <span className="cat-icon" style={{ background: c.tint }}>{c.icon}</span>
          <div>
            <h2>{c.title}</h2>
            <p>{c.blurb}</p>
          </div>
        </div>
        <div className={v === "classic" ? "grid" : `kgrid kgrid-${v}`}>
          {list.map((p) => renderCard(p, c, v))}
        </div>
        {left > 0 && (
          <div style={{ textAlign: "center", marginTop: 22 }}>
            <button className="btn btn-outline" onClick={() => setShown((m) => ({ ...m, [c.id]: limit + PAGE }))}>
              Show more ({left} left)
            </button>
          </div>
        )}
      </section>
    );
  };

  return (
    <div className={`site ${display.variable} ${body.variable}`}>
      {/* Mobile / tablet drawer (kept outside the header so position:fixed works) */}
      {mob && (
        <>
          <div className="drawer-backdrop" onClick={() => setMob(false)} />
          <aside className="drawer" aria-label="Menu">
            <div className="drawer-head">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="Herbyzone Seeds & Plants" />
              <button className="drawer-x" onClick={() => setMob(false)} aria-label="Close menu">×</button>
            </div>
            <nav className="drawer-scroll">
              <a className="d-link" href="#about" onClick={() => setMob(false)}>About</a>
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
                      <li><a className="acc-all" href={`#${c.id}`} onClick={() => setMob(false)}>View all {c.nav} →</a></li>
                      {c.products.map((p) => (
                        <li key={p.id}>
                          <button onClick={() => pick(p, c.nav)}>{p.name}{p.best && <i> ★</i>}</button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
              <a className="d-link" href="#expert" onClick={() => setMob(false)}>Ask an expert</a>
              <a className="d-link" href="#contact" onClick={() => setMob(false)}>Contact</a>
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
          <span>Free crop advice — call or WhatsApp our team</span>
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
          <a href="#top" className="logo"><img src="/logo.png" alt="Herbyzone Seeds & Plants" /></a>

          <div className="navgroup">
            <a
              href="#medicinal"
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
              <a href="#about">About</a>
              {CATEGORIES.map((c) => <a key={c.id} href={`#${c.id}`}>{c.nav}</a>)}
              <a href="#contact">Contact</a>
            </nav>
          </div>

          <label className="search">
            <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="9" cy="9" r="6" /><path d="M14 14l4 4" strokeLinecap="round" /></svg>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search seeds, plants, herbs..." aria-label="Search products" />
          </label>
          <a className="btn btn-wa sm" href={wa()} target="_blank" rel="noopener noreferrer">WhatsApp us</a>
        </div>

        {menu && (
          <>
            <div className="mega-backdrop" onClick={() => setMenu(false)} />
            <div className="mega" id="mega">
              <div className="pad mega-in">
                {/* LEFT ~80%: all products */}
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
                              <button onClick={() => pick(p, c.nav)}>
                                <span className="nm">{p.name}</span>
                                {p.best && <i title="Best seller">★</i>}
                              </button>
                            </li>
                          ))}
                        </ul>
                        {c.products.length > MENU_MAX && (
                          <a className="mega-more" href={`#${c.id}`} onClick={() => setMenu(false)}>View all {c.products.length} →</a>
                        )}
                      </div>
                    ))}
                    {!menuCats.length && <p className="mega-empty">No product matches “{mq}”.</p>}
                  </div>
                </div>

                {/* RIGHT ~20%: best sellers */}
                <aside className="mega-side">
                  <h4>⭐ Best sellers</h4>
                  <ul>
                    {BEST.map(({ p, cat }) => (
                      <li key={p.id}>
                        <button onClick={() => pick(p, cat)}>
                          <span className="bs-img"><Photo p={p} w={120} h={120} /></span>
                          <span className="bs-txt"><b>{p.name}</b><small>{cat}</small></span>
                        </button>
                      </li>
                    ))}
                  </ul>
                  <a className="btn btn-primary sm" href="#medicinal" onClick={() => setMenu(false)}>Browse all products</a>
                </aside>
              </div>
            </div>
          </>
        )}
      </header>

      <main id="top">
        <section className="carousel" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} aria-roledescription="carousel">
          {SLIDES.map((s, i) => (
            <div key={s.title} className={`slide ${i === slide ? "on" : ""}`} style={{ backgroundImage: `url(${s.image})` }} aria-hidden={i !== slide}>
              <div className="slide-shade" />
              <div className="pad slide-in">
                <h1>{s.title}</h1>
                <p>{s.sub}</p>
                <div className="slide-cta">
                  <a className="btn btn-primary" href={s.href}>{s.cta}</a>
                  <a className="btn btn-ghost" href={tel}>Call us</a>
                </div>
              </div>
            </div>
          ))}
          <button className="arrow l" onClick={() => go(-1)} aria-label="Previous slide">‹</button>
          <button className="arrow r" onClick={() => go(1)} aria-label="Next slide">›</button>
          <div className="dots">
            {SLIDES.map((_, i) => <button key={i} className={i === slide ? "on" : ""} onClick={() => setSlide(i)} aria-label={`Go to slide ${i + 1}`} />)}
          </div>
        </section>

        <section id="about" className="about">
          <div className="pad about-grid">
            <h2>About Herbyzone</h2>
            <p>
              Herbyzone supplies tested medicinal crop seeds, fodder seeds, herbs and nursery plants to farmers,
              dairy owners and growers. We help you pick the right variety for your soil and season, and
              support you from sowing to harvest.
            </p>
          </div>
        </section>

        <div className="pad">
          <div className="promo">
            <div>
              <strong>Not sure what to grow?</strong>
              <span>Tell us your land and season. Our team will suggest the right crop.</span>
            </div>
            <a className="btn btn-primary" href={wa()} target="_blank" rel="noopener noreferrer">Ask an expert</a>
          </div>

          {cats.map((c, i) => renderCat(c, i))}
          {!cats.length && <p className="empty">No products match “{q}”. Try another name, or <a href={wa()}>ask us on WhatsApp</a>.</p>}
        </div>

        {/* Ask an expert — bottom band before the footer */}
        <section id="expert" className="expert">
          <div className="pad expert-in">
            <div className="expert-txt">
              <span className="expert-kicker">Free crop advice</span>
              <h2>Not sure what to grow? Ask our expert</h2>
              <p>Tell us your land, water and season. Our team will suggest the right crop and help you from sowing to harvest.</p>
            </div>
            <div className="expert-cta">
              <a className="btn btn-light" href={wa()} target="_blank" rel="noopener noreferrer">Ask on WhatsApp</a>
              <a className="btn btn-ghost" href={tel}>Call {SITE.phone}</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {open && (
        <div className="overlay" onClick={() => setOpen(null)} role="dialog" aria-modal="true" aria-label={open.p.name}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setOpen(null)} aria-label="Close">×</button>
            <div className="modal-img">
              <Photo p={open.p} w={800} h={900} />
              <span className="tag">{open.cat}</span>
            </div>
            <div className="modal-body">
              <div className="modal-scroll">
                <span className="eyebrow">{open.cat}{open.p.best && <em>★ Best seller</em>}</span>
                <h3>{open.p.name}</h3>
                <p className="modal-desc">{open.p.about ?? open.p.short}</p>

                <h5>Key benefits</h5>
                <ul className="points lg">
                  {open.p.points.map((pt) => <li key={pt}><Check />{pt}</li>)}
                </ul>

                <h5>At a glance</h5>
                <dl className="specs">
                  {open.p.specs.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
                </dl>

                {open.p.uses && (
                  <>
                    <h5>Common uses</h5>
                    <div className="chips">{open.p.uses.map((u) => <span key={u}>{u}</span>)}</div>
                  </>
                )}

                {open.p.guide && (
                  <>
                    <h5>Growing guide</h5>
                    <table className="guide">
                      <tbody>
                        {open.p.guide.map(([k, v]) => <tr key={k}><th>{k}</th><td>{v}</td></tr>)}
                      </tbody>
                    </table>
                  </>
                )}

                <p className="modal-note">Prices and stock vary by season. Message us for today’s rate and bulk discounts.</p>
              </div>
              <div className="cta">
                <a className="btn btn-call" href={tel}>Call now</a>
                <a className="btn btn-wa" href={wa(open.p.name)} target="_blank" rel="noopener noreferrer">WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}