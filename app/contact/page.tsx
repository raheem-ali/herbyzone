import { SiteShell, Banner, waLink } from "@/app/components/SiteShell";
import { SITE } from "@/app/data/site";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact Us | Herbyzone Botanicals",
  description: "Request a quote for herbal extracts, essential oils, micronutrients and herbal stocks. Call, WhatsApp or send an enquiry.",
};

const FAQ = [
  ["Do you supply in bulk only?", "Our focus is bulk supply for manufacturers. Tell us the quantity you need and we will confirm what we can offer."],
  ["Can I get a specification sheet?", "Yes. Ask for the product you are interested in and we will share its specification."],
  ["How fast will you reply?", `We reply during working hours (${SITE.hours}). WhatsApp is the quickest way to reach us.`],
  ["Do you ship outside Pakistan?", "Ask our team about your destination and we will confirm packing and shipping options."],
];

export default function Contact() {
  const tel = `tel:${SITE.phone.replace(/\s/g, "")}`;
  const cards = [
    ["📞", "Call us", SITE.phone, tel],
    ["💬", "WhatsApp", "Message our team", waLink()],
    ["✉️", "Email", SITE.email, `mailto:${SITE.email}`],
  ];
  return (
    <SiteShell active="/contact">
      <Banner title="Contact Us" crumbs={[["Contact"]]} />
      <section className="sp-sec">
        <div className="sp-wrap sp-contact">
          <div>
            <h2 className="sp-h2">Request a quote</h2>
            <p className="sp-p">Fill in the details and your enquiry opens in WhatsApp, ready to send. You can also email it.</p>
            <ContactForm />
          </div>
          <aside className="sp-side">
            {cards.map(([ic, t, v, href]) => (
              <a key={t} href={href} className="sp-card sp-info" {...(t === "WhatsApp" ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                <span className="sp-ic">{ic}</span><div><b>{t}</b><small>{v}</small></div>
              </a>
            ))}
            <div className="sp-card sp-info"><span className="sp-ic">🕘</span><div><b>Working hours</b><small>{SITE.hours}</small></div></div>
            <div className="sp-card sp-info"><span className="sp-ic">📍</span><div><b>Address</b><small>{SITE.address}</small></div></div>
          </aside>
        </div>
      </section>

      <section className="sp-sec sp-tintbg">
        <div className="sp-wrap sp-faq">
          <h2 className="sp-h2 sp-c">Common questions</h2>
          {FAQ.map(([q, a]) => (
            <details key={q}><summary>{q}</summary><p>{a}</p></details>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}