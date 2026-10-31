"use client";
import { useState } from "react";
import { CATEGORIES } from "@/app/data/botanicals";
import { SITE } from "@/app/data/site";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [f, setF] = useState({ name: "", company: "", phone: "", email: "", product: "", qty: "", msg: "" });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });

  const text = () =>
    [`Hello Herbyzone Botanicals, I would like a quote.`, `Name: ${f.name}`, f.company && `Company: ${f.company}`, `Phone: ${f.phone}`, f.email && `Email: ${f.email}`,
      f.product && `Product: ${f.product}`, f.qty && `Quantity: ${f.qty}`, f.msg && `Message: ${f.msg}`].filter(Boolean).join("\n");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text())}`, "_blank", "noopener,noreferrer");
    setSent(true);
  };
  const mail = `mailto:${SITE.email}?subject=${encodeURIComponent("Quote request")}&body=${encodeURIComponent(text())}`;

  return (
    <form className="sp-form" onSubmit={submit}>
      <div className="sp-f2">
        <label>Your name *<input required value={f.name} onChange={set("name")} autoComplete="name" /></label>
        <label>Company<input value={f.company} onChange={set("company")} autoComplete="organization" /></label>
        <label>Phone / WhatsApp *<input required type="tel" value={f.phone} onChange={set("phone")} autoComplete="tel" /></label>
        <label>Email<input type="email" value={f.email} onChange={set("email")} autoComplete="email" /></label>
        <label>Product category
          <select value={f.product} onChange={set("product")}>
            <option value="">Select a category</option>
            {CATEGORIES.map((c) => <option key={c.id} value={c.title}>{c.title}</option>)}
            <option value="Other">Other</option>
          </select>
        </label>
        <label>Quantity needed<input value={f.qty} onChange={set("qty")} placeholder="e.g. 100 kg" /></label>
      </div>
      <label>Message<textarea rows={5} value={f.msg} onChange={set("msg")} placeholder="Product names, grade, packing or delivery details" /></label>
      <div className="sp-row">
        <button className="sp-btn sp-primary" type="submit">Send on WhatsApp</button>
        <a className="sp-btn sp-line" href={mail}>Send by email</a>
      </div>
      {sent && <p className="sp-ok" role="status">WhatsApp opened with your details. Press send there and our team will reply.</p>}
    </form>
  );
}