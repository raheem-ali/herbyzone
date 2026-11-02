import { SiteShell, Banner, QuoteBand } from "@/app/components/SiteShell";
import Thumb from "@/app/components/Thumb";
import { CATEGORIES } from "@/app/data/botanicals";

export const metadata = {
  title: "About Us | Herbyzone Botanicals",
  description: "Herbyzone Botanicals supplies herbal extracts, essential oils, micronutrients and bulk herbal stocks to manufacturers.",
};

const VALUES = [
  ["🌱", "Dependable sourcing", "We work to keep stock of the products buyers reorder, so production is not held up waiting for material."],
  ["💬", "Clear communication", "Ask about a product and you get a direct reply with specifications, price and availability."],
  ["📦", "Flexible bulk lots", "Order the quantity your production needs, from trial lots to regular repeat supply."],
  ["📄", "Documents on request", "Specification sheets and packing details are shared when you ask for them."],
];
const STEPS = [
  ["Send your enquiry", "Tell us the product, grade and quantity by WhatsApp, phone or the contact form."],
  ["Get specifications and price", "Our team replies with the specification, rate and current availability."],
  ["Confirm the order", "Agree packing, quantity and delivery terms with our team."],
  ["Receive your material", "We dispatch your order packed for transport and keep you updated."],
];
const SERVES = ["Pharmaceutical makers", "Nutraceutical brands", "Food and beverage producers", "Cosmetic and personal care", "Herbal tea packers", "Traditional medicine makers"];

export default function About() {
  return (
    <SiteShell active="/about">
      <Banner title="About Herbyzone Botanicals" crumbs={[["About us"]]} />

      <section className="sp-sec">
        <div className="sp-wrap sp-two">
          <div>
            <h2 className="sp-h2">Herbal raw materials for manufacturers, supplied in bulk</h2>
            {/* TODO: replace with the client's real company story */}
            <p className="sp-p">Herbyzone Botanicals supplies herbal extracts, essential oils, micronutrients and dried herbal stocks to pharmaceutical, nutraceutical, food and cosmetic manufacturers.</p>
            <p className="sp-p">Our extracts come in powder and liquid form. Our oils, minerals, vitamins and dried herbs are available in bulk quantities for regular supply. Share the product, grade and quantity you need, and our team replies with specifications, price and availability.</p>
            <p className="sp-p">We focus on dependable sourcing and plain communication, so your production keeps running without delays.</p>
            <div className="sp-row"><a className="sp-btn sp-primary" href="/contact">Request a quote</a><a className="sp-btn sp-line" href="/herbal-extracts">Browse products</a></div>
          </div>
          <div className="sp-media"><Thumb src="/categories/about.jpg" alt="Herbyzone Botanicals" icon="🌿" /></div>
        </div>
      </section>

      <section className="sp-sec sp-tintbg">
        <div className="sp-wrap">
          <h2 className="sp-h2 sp-c">What we stand for</h2>
          <div className="sp-grid4">
            {VALUES.map(([ic, t, d]) => (
              <article key={t} className="sp-card sp-pad"><span className="sp-ic">{ic}</span><h3>{t}</h3><p>{d}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="sp-sec">
        <div className="sp-wrap">
          <h2 className="sp-h2 sp-c">What we supply</h2>
          <div className="sp-grid4">
            {CATEGORIES.map((c) => (
              <a key={c.id} href={`/${c.id}`} className="sp-cat" style={{ background: c.tint }}>
                <span>{c.icon}</span><h3>{c.title}</h3><p>{c.blurb}</p><b>{c.products.length} products</b>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="sp-sec sp-tintbg">
        <div className="sp-wrap">
          <h2 className="sp-h2 sp-c">How ordering works</h2>
          <ol className="sp-steps">
            {STEPS.map(([t, d], i) => (
              <li key={t}><span>{i + 1}</span><h3>{t}</h3><p>{d}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sp-sec">
        <div className="sp-wrap sp-c">
          <h2 className="sp-h2">Who we supply</h2>
          <div className="sp-chips">{SERVES.map((s) => <span key={s}>{s}</span>)}</div>
        </div>
      </section>

      <QuoteBand />
    </SiteShell>
  );
}