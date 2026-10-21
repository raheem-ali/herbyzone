import type { ReactNode } from "react";
import { display, body } from "@/app/fonts";
import { SITE } from "@/app/data/site";
import Footer from "@/app/components/Footer";

export default function Legal({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <div className={`site ${display.variable} ${body.variable}`}>
      <header className="header">
        <div className="pad row">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <a href="/" className="logo"><img src="/logo.png" alt={`${SITE.name} Seeds & Plants`} /></a>
          <a className="btn btn-outline sm back" href="/">Back to home</a>
        </div>
      </header>

      <main className="legal pad">
        <h1>{title}</h1>
        <p className="legal-date">Last updated: {updated}</p>
        {children}
      </main>

      <Footer />
    </div>
  );
}