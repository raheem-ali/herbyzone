import { notFound } from "next/navigation";
import { SiteShell, Banner, waLink } from "@/app/components/SiteShell";
import { POSTS, fmtDate } from "@/app/data/posts";

export const generateStaticParams = () => POSTS.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = POSTS.find((x) => x.slug === slug);
  return p ? { title: `${p.title} | Herbyzone Botanicals`, description: p.excerpt } : {};
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = POSTS.find((x) => x.slug === slug);
  if (!p) notFound();
  const others = POSTS.filter((x) => x.slug !== p.slug).slice(0, 3);
  return (
    <SiteShell active="/blog">
      <Banner title={p.title} crumbs={[["Blog", "/blog"], [p.tag]]} />
      <section className="sp-sec">
        <div className="sp-wrap sp-article">
          <article>
            <p className="sp-meta"><span className="sp-tag">{p.tag}</span> {fmtDate(p.date)} · {p.read}</p>
            {p.body.map((b, i) =>
              "h" in b ? <h2 key={i}>{b.h}</h2> : "p" in b ? <p key={i}>{b.p}</p> : <ul key={i}>{b.ul.map((x) => <li key={x}>{x}</li>)}</ul>
            )}
          </article>
          <aside className="sp-side">
            <div className="sp-card sp-pad sp-quote">
              <h3>Need a quote?</h3>
              <p>Tell us the product, grade and quantity.</p>
              <a className="sp-btn sp-primary" href={waLink(`Hello Herbyzone Botanicals, I read "${p.title}" and would like a quote.`)} target="_blank" rel="noopener noreferrer">Ask on WhatsApp</a>
            </div>
            <div className="sp-card sp-pad">
              <h3>More articles</h3>
              <ul className="sp-more">
                {others.map((o) => <li key={o.slug}><a href={`/blog/${o.slug}`}>{o.title}</a></li>)}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </SiteShell>
  );
}