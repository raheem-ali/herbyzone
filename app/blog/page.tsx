import { SiteShell, Banner, QuoteBand } from "@/app/components/SiteShell";
import Thumb from "@/app/components/Thumb";
import { POSTS, fmtDate } from "@/app/data/posts";

export const metadata = {
  title: "Blog | Herbyzone Botanicals",
  description: "Buying guides and tips on herbal extracts, essential oils, micronutrients and herbal stocks.",
};

export default function Blog() {
  const [first, ...rest] = POSTS;
  return (
    <SiteShell active="/blog">
      <Banner title="Our Blog" crumbs={[["Blog"]]} />
      <section className="sp-sec">
        <div className="sp-wrap">
          <a href={`/blog/${first.slug}`} className="sp-feat">
            <Thumb src={`/blog/${first.slug}.jpg`} alt={first.title} icon={first.icon} tint={first.tint} />
            <div>
              <span className="sp-tag">{first.tag}</span>
              <h2>{first.title}</h2>
              <p>{first.excerpt}</p>
              <small>{fmtDate(first.date)} · {first.read}</small>
            </div>
          </a>
          <div className="sp-grid3">
            {rest.map((p) => (
              <a key={p.slug} href={`/blog/${p.slug}`} className="sp-card sp-post">
                <Thumb src={`/blog/${p.slug}.jpg`} alt={p.title} icon={p.icon} tint={p.tint} />
                <div className="sp-pad">
                  <span className="sp-tag">{p.tag}</span>
                  <h3>{p.title}</h3>
                  <p>{p.excerpt}</p>
                  <small>{fmtDate(p.date)} · {p.read}</small>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
      <QuoteBand />
    </SiteShell>
  );
}