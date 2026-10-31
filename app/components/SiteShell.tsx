import { display, body } from "@/app/fonts";
import Footer from "@/app/components/Footer";
import { CATEGORIES } from "@/app/data/botanicals";
import { SITE } from "@/app/data/site";
import "./pages.css";

export const waLink = (text?: string) =>
  `https://wa.me/${SITE.whatsapp}` + (text ? `?text=${encodeURIComponent(text)}` : "");

const LINKS = [
  { href: "/about", label: "About" },
  ...CATEGORIES.map((c) => ({ href: `/${c.id}`, label: c.nav })),
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function SiteShell({ active, children }: { active?: string; children: React.ReactNode }) {
  return (
    <div className={`sp ${display.variable} ${body.variable}`}>
      <header className="sp-nav">
        <div className="sp-wrap sp-nav-in">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <a href="/"><img src="/logo.png" alt="Herbyzone Botanicals" /></a>
          <nav className="sp-links">
            {LINKS.map((l) => <a key={l.href} href={l.href} className={l.href === active ? "on" : ""}>{l.label}</a>)}
          </nav>
          <a className="sp-btn sp-wa sp-hide-sm" href={waLink()} target="_blank" rel="noopener noreferrer">WhatsApp us</a>
          <details className="sp-mnav">
            <summary aria-label="Open menu">☰</summary>
            <div>{LINKS.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}</div>
          </details>
        </div>
      </header>
      {children}
      <Footer />
    </div>
  );
}

export function Banner({ title, crumbs }: { title: string; crumbs: [string, string?][] }) {
  return (
    <>
      <section className="sp-banner"><h1>{title}</h1></section>
      <div className="sp-crumbbar">
        <div className="sp-wrap sp-crumb">
          <a href="/">Home</a>
          {crumbs.map(([label, href]) => (
            <span key={label}><i>/</i>{href ? <a href={href}>{label}</a> : <b>{label}</b>}</span>
          ))}
        </div>
      </div>
    </>
  );
}

export function QuoteBand({ title = "Need a quote?", text = "Share the product, grade and quantity. Our team will reply with specifications and price." }: { title?: string; text?: string }) {
  return (
    <section className="sp-cta">
      <div className="sp-wrap sp-cta-in">
        <div><h2>{title}</h2><p>{text}</p></div>
        <div className="sp-cta-btns">
          <a className="sp-btn sp-light" href={waLink()} target="_blank" rel="noopener noreferrer">Ask on WhatsApp</a>
          <a className="sp-btn sp-ghost" href="/contact">Contact form</a>
        </div>
      </div>
    </section>
  );
}