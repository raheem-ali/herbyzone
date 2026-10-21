import type { CSSProperties } from "react";
import { CATEGORIES, SITE } from "@/app/data/site";

const SHOW = 4; // 4 products + "View all" = 5 rows max per column

export default function Footer() {
  const tel = `tel:${SITE.phone.replace(/\s/g, "")}`;
  const wa = `https://wa.me/${SITE.whatsapp}`;
  const total = CATEGORIES.reduce((n, c) => n + c.products.length, 0);

  return (
    <footer className="footer" id="contact">
      <div className="pad f-main" style={{ "--n": CATEGORIES.length } as CSSProperties}>
        <div className="f-brand">
          <a href="/" className="f-name">{SITE.name}</a>
          <p>{SITE.tagline}. Tested seeds and healthy plants for farmers, dairy owners and growers across Pakistan.</p>
          <p className="f-count">{total}+ products in {CATEGORIES.length} categories</p>
        </div>

        <div>
          <h4>Quick links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/#about">About us</a></li>
            <li><a href={`/#${CATEGORIES[0].id}`}>Shop products</a></li>
            <li><a href="/privacy">Privacy policy</a></li>
            <li><a href="/terms">Terms &amp; conditions</a></li>
          </ul>
        </div>

        {CATEGORIES.map((c) => (
          <div key={c.id}>
            <h4>{c.title}</h4>
            <ul>
              {c.products.slice(0, SHOW).map((p) => (
                <li key={p.id}><a href={`/#${c.id}`}>{p.name}</a></li>
              ))}
              <li><a className="f-all" href={`/#${c.id}`}>View all ({c.products.length})</a></li>
            </ul>
          </div>
        ))}

        <div>
          <h4>Contact</h4>
          <ul className="f-contact">
            <li><span>Phone</span><a href={tel}>{SITE.phone}</a></li>
            <li><span>WhatsApp</span><a href={wa} target="_blank" rel="noopener noreferrer">Message us</a></li>
            <li><span>Email</span><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            <li><span>Hours</span>{SITE.hours}</li>
            <li><span>Address</span>{SITE.address}</li>
          </ul>
        </div>
      </div>

      <div className="f-bottom">
        <div className="pad row">
          <span>© {new Date().getFullYear()} {SITE.name} Seeds &amp; Plants. All rights reserved.</span>
          <span className="f-legal">
            <a href="/privacy">Privacy policy</a>
            <a href="/terms">Terms &amp; conditions</a>
          </span>
        </div>
      </div>
    </footer>
  );
}