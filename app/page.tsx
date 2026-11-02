"use client";
import { useEffect, useState } from "react";
import { display, body } from "@/app/fonts";
import { type Product } from "@/app/data/botanicals";
import { SITE } from "@/app/data/site";
import Header, { CATEGORIES } from "@/app/components/Header";
import Photo from "@/app/components/Photo";
import Footer from "@/app/components/Footer";
import "./categories.css";

/* ---------- Layout per category ----------
   cards = products shown as cards (one line on desktop, 2 per row on phone)
   list  = products shown in the "More" list below the cards                */
type Layout = { cards: number; list: number; grid?: boolean };
const LAYOUT: Record<string, Layout> = {
  "herbal-extracts": { cards: 6, list: 19 }, // 6 + 19 = 25
  micronutrients: { cards: 5, list: 10, grid: true },
  "essential-oils": { cards: 6, list: 10 },
  "herbal-stocks": { cards: 6, list: 20 },
};
const DEFAULT_LAYOUT: Layout = { cards: 6, list: 10 };

/* ---------- Card styles ---------- */
type CardStyle = "classic" | "overlay" | "side" | "round" | "outline" | "feature";
const CARD_STYLES: CardStyle[] = ["feature", "overlay", "round", "outline"];
const CARD_BY_ID: Record<string, CardStyle> = {
  "herbal-extracts": "feature", // photo + name + description + feature badges
  micronutrients: "overlay",
  "essential-oils": "outline",
  "herbal-stocks": "round",
};

// TODO: replace with Botanicals banner images
const BANNER = "categories/banner1.jpg";
const BANNER2 = "categories/banner2.jpg";
const SLIDES = [
  {
    image: BANNER, // TODO: banner 1
    title: "Herbal extracts for pharma, nutraceutical and food makers",
    sub: "Powder and liquid extracts in bulk, with specifications on request.",
    cta: "Shop extracts",
    href: "#herbal-extracts",
  },
  {
    image: BANNER2, // TODO: banner 2
    title: "Pure essential oils for aromatherapy and personal care",
    sub: "Lavender, tea tree, eucalyptus, sandalwood and more in bulk.",
    cta: "Shop oils",
    href: "#essential-oils",
  }
];

const Check = () => (
  <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
    <circle cx="8" cy="8" r="8" fill="#E4F1D0" />
    <path d="M4.5 8.3l2.2 2.2 4.8-4.8" fill="none" stroke="#239940" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Home() {
  const [open, setOpen] = useState<{ p: Product; cat: string } | null>(null);
  const [slide, setSlide] = useState(0);
  const [hover, setHover] = useState(false);
  const [q, setQ] = useState("");
  const tel = `tel:${SITE.phone.replace(/\s/g, "")}`;

  useEffect(() => {
    if (hover) return;
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, [hover]);

  // Product popup: Escape closes it, page scroll is locked while it is open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const wa = (name?: string) =>
    `https://wa.me/${SITE.whatsapp}` +
    (name ? `?text=${encodeURIComponent(`Hello Herbyzone Botanicals, I'm interested in ${name}. Please share price and availability.`)}` : "");

  const term = q.trim().toLowerCase();
  const cats = CATEGORIES.map((c) => ({
    ...c,
    products: term ? c.products.filter((p) => (p.name + " " + p.short).toLowerCase().includes(term)) : c.products,
  })).filter((c) => c.products.length);

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

    /* feature: photo, name, botanical name, description, feature badges */
    if (v === "feature") {
      // Edit these badges any time: forms come from the product data
      const badges = [...(p.forms ?? []), "Bulk supply", "Specs on request"].slice(0, 4);
      return (
        <article key={p.id} className="kc kc-feature">
          <button className="kc-media" onClick={view} aria-label={`View ${p.name}`}>
            <Photo p={p} w={520} h={360} />
            <span className="tag">{c.nav}</span>
          </button>
          <div className="kc-body">
            <h3>{p.name}</h3>
            {p.botanical && <em className="botanical">{p.botanical}</em>}
            <p className="short">{p.short}</p>
            <div className="badges">
              {badges.map((b) => <span key={b}>{b}</span>)}
            </div>
            {actions}
          </div>
        </article>
      );
    }

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

    // classic
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
          {actions}
        </div>
      </article>
    );
  };

  const renderCat = (c: Cat, i: number) => {
    const v = CARD_BY_ID[c.id] ?? CARD_STYLES[i % CARD_STYLES.length];
    const base = LAYOUT[c.id] ?? DEFAULT_LAYOUT;
    const featured = c.products.slice(0, base.cards);
    const rest = c.products.slice(base.cards, base.cards + base.list);
    return (
      <section key={c.id} id={c.id} className="cat">
        <div className="cat-head" style={{ background: `linear-gradient(90deg, ${c.tint}, #fff 85%)` }}>
          <span className="cat-icon" style={{ background: c.tint }}>{c.icon}</span>
          <div>
            <h2>{c.title}</h2>
            <p>{c.blurb}</p>
          </div>
        </div>
        {featured.length > 0 && (
          <div
            className={`${v === "classic" ? "grid" : `kgrid kgrid-${v}`} one-line`}
            style={{ ["--cols" as string]: featured.length }}
          >
            {featured.map((p) => renderCard(p, c, v))}
          </div>
        )}
        {rest.length > 0 && (
          <div className="plist-wrap">
            <h4 className="plist-title">More {c.title.toLowerCase()} <em>({rest.length})</em></h4>
            <ol className={`plist ${base.grid ? "plist-grid" : ""}`}>
              {rest.map((p) => (
                <li key={p.id}>
                  <button className="pl-img" onClick={() => setOpen({ p, cat: c.nav })} aria-label={`View ${p.name}`}>
                    <Photo p={p} w={100} h={100} />
                  </button>
                  <button className="pl-name" onClick={() => setOpen({ p, cat: c.nav })}>
                    <b>{p.name}</b>
                    <small>{p.short}</small>
                  </button>
                  <a className="pl-wa" href={wa(p.name)} target="_blank" rel="noopener noreferrer">WhatsApp</a>
                </li>
              ))}
            </ol>
          </div>
        )}
      </section>
    );
  };

  return (
    <div className={`site ${display.variable} ${body.variable}`}>
      <Header active="/" onQuery={setQ} onPick={(p, cat) => setOpen({ p, cat })} />

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
            <h2>About Herbyzone Botanicals</h2>
            {/* TODO: about us details will be added here */}
            <p>Herbyzone Botanicals supplies herbal extracts, essential oils, micronutrients and bulk herbal stocks
              to pharmaceutical, nutraceutical, food and cosmetic manufacturers. Our extracts come in powder and
              liquid form, and our essential oils, minerals, vitamins and dried herbs are available in bulk
              quantities for regular supply. Share the product, grade and quantity you need, and our team will
              reply with specifications, price and availability. We focus on dependable sourcing and clear
              communication, so your production keeps running without delays.</p>
          </div>
        </section>

        <div className="pad">
          <div className="promo">
            <div>
              <strong>Looking for bulk supply?</strong>
              <span>Tell us the product and quantity. Our team will share specifications and price.</span>
            </div>
            <a className="btn btn-primary" href={wa()} target="_blank" rel="noopener noreferrer">Request a quote</a>
          </div>

          {cats.map((c, i) => renderCat(c, i))}
          {!cats.length && <p className="empty">No products match “{q}”. Try another name, or <a href={wa()}>ask us on WhatsApp</a>.</p>}
        </div>

        <section id="expert" className="expert">
          <div className="pad expert-in">
            <div className="expert-txt">
              <span className="expert-kicker">Bulk orders</span>
              <h2>Need a quote? Talk to our team</h2>
              <p>Share the product, grade and quantity you need. We will reply with specifications and availability.</p>
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

                <p className="modal-note">Prices and stock vary. Message us for today’s rate and bulk quantities.</p>
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