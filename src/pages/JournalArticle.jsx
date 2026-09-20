import { Link, useParams } from "react-router"
import { ArrowLeft } from "@phosphor-icons/react"
import { Seo } from "../components/site/Seo"
import { ImageFeature } from "../components/editorial/ImageFeature"
import { EditorialText } from "../components/editorial/EditorialText"
import { Reveal } from "../components/ui/reveal"
import { articles, journalCategories } from "../content/journal"
import { NotFound } from "./NotFound"

const fmt = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" })

/** Article template: title, date, category, cover, body, related. */
export const JournalArticle = () => {
  const { slug } = useParams()
  const a = articles.find((x) => x.slug === slug)
  if (!a) return <NotFound />
  const cat = journalCategories.find((c) => c.key === a.category)
  const related = (a.related ?? []).map((s) => articles.find((x) => x.slug === s)).filter(Boolean)

  return (
    <>
      <Seo title={a.title} description={a.excerpt} path={`/journal/${a.slug}`} image={`/gallery/opt/${a.cover.id}-1600.webp`} />
      <article className="bg-charcoal">
        <header className="mx-auto max-w-6xl px-6 pt-24 md:pt-32 lg:px-8">
          <Link to="/journal" className="inline-flex items-center gap-2 text-[12px] tracking-[0.18em] text-muted uppercase hover:text-ivory focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light">
            <ArrowLeft size={13} weight="bold" aria-hidden="true" /> Journal
          </Link>
          <Reveal>
            <p className="mt-10 flex flex-wrap gap-x-6 font-mono text-[12px] text-gold-light">
              <time dateTime={a.date}>{fmt.format(new Date(a.date))}</time>
              {cat && <span>{cat.label}</span>}
            </p>
            <h1 className="display mt-5 max-w-[20ch] text-[clamp(2.4rem,5.5vw,4.25rem)] leading-[1.05] text-balance text-ivory">{a.title}</h1>
            <p className="mt-8 max-w-[56ch] text-[18px] leading-[1.7] text-muted">{a.excerpt}</p>
          </Reveal>
        </header>
        <div className="mt-14"><ImageFeature photo={a.cover} /></div>
        <div className="mx-auto max-w-3xl px-6 py-24 lg:px-8">
          <EditorialText paragraphs={a.body} />
        </div>
        {related.length > 0 && (
          <aside className="mx-auto max-w-6xl border-t border-ivory/12 px-6 py-20 lg:px-8">
            <h2 className="display text-[1.8rem] text-ivory">Related stories</h2>
            <ul className="mt-8 space-y-4">
              {related.map((r) => (
                <li key={r.slug}><Link to={`/journal/${r.slug}`} className="display text-[1.3rem] text-ivory/75 hover:text-gold-light">{r.title}</Link></li>
              ))}
            </ul>
          </aside>
        )}
      </article>
    </>
  )
}
