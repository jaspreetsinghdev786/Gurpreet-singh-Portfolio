import { Link, useParams } from "react-router"
import { ArrowLeft } from "@phosphor-icons/react"
import { Seo } from "../components/site/Seo"
import { ImageFeature } from "../components/editorial/ImageFeature"
import { ArtworkCard } from "../components/editorial/ArtworkCard"
import { Gap } from "../components/editorial/Gap"
import { Reveal, RevealImage } from "../components/ui/reveal"
import { Photo } from "../components/ui/photo"
import { workCategories, artworks, PENDING } from "../content/work"
import { NotFound } from "./NotFound"

/**
 * Artwork detail template. Renders every supported field; where a record
 * lacks one, a marked gap appears instead of an invented value.
 */
const Row = ({ label, value }) => (
  <div className="grid grid-cols-[8rem_1fr] gap-6 border-t border-ivory/12 py-4">
    <dt className="text-[12px] tracking-[0.18em] text-ivory/50 uppercase">{label}</dt>
    <dd className="text-[16px] text-ivory/85">{value ?? <Gap>{PENDING}</Gap>}</dd>
  </div>
)

export const Artwork = () => {
  const { category, slug } = useParams()
  const cat = workCategories.find((c) => c.slug === category)
  const work = artworks.find((a) => a.slug === slug && a.category === category)
  if (!cat || !work) return <NotFound />
  const related = (work.related ?? []).map((s) => artworks.find((a) => a.slug === s)).filter(Boolean)
  const cover = work.images?.[0]

  return (
    <>
      <Seo title={work.title ?? cat.title} description={work.description ?? cat.desc} path={`/work/${category}/${slug}`} image={cover ? `/gallery/opt/${cover.id}-1600.webp` : undefined} />

      <section className="bg-charcoal">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Link to={`/work/${cat.slug}`} className="inline-flex items-center gap-2 text-[12px] tracking-[0.18em] text-muted uppercase hover:text-ivory focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light">
            <ArrowLeft size={13} weight="bold" aria-hidden="true" /> {cat.title}
          </Link>
          <h1 className="display mt-8 max-w-[20ch] text-[clamp(2.4rem,5.5vw,4.25rem)] leading-[1.05] text-ivory">
            {work.title ?? <Gap className="text-[1.2rem] align-middle">{PENDING}</Gap>}
          </h1>
        </div>
        <div className="mt-14">
          {cover ? <ImageFeature photo={cover} caption={work.title} /> : (
            <div className="mx-auto max-w-6xl px-6 lg:px-8"><div className="flex aspect-[16/9] items-center justify-center border border-dashed border-ivory/20"><Gap>Image to be added</Gap></div></div>
          )}
        </div>
      </section>

      <section className="bg-charcoal">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 lg:px-8">
          <Reveal>
            <dl>
              <Row label="Year" value={work.year} />
              <Row label="Medium" value={work.medium} />
              <Row label="Dimensions" value={work.dimensions} />
              <Row label="Category" value={<Link to={`/work/${cat.slug}`} className="hover:text-gold-light">{cat.title}</Link>} />
            </dl>
          </Reveal>
          <Reveal delay={0.08} className="space-y-6 text-[17px] leading-[1.8] text-muted">
            <p>{work.description ?? <Gap>Description {PENDING.toLowerCase()}</Gap>}</p>
            {work.story && <p>{work.story}</p>}
          </Reveal>
        </div>

        {work.detail && (
          <div className="pb-24">
            <ImageFeature photo={work.detail} caption="Detail" aspect="aspect-[4/3] md:aspect-[16/9]" />
          </div>
        )}

        {work.images?.length > 1 && (
          <ul className="mx-auto grid max-w-6xl gap-6 px-6 pb-24 sm:grid-cols-2 lg:px-8">
            {work.images.slice(1).map((im) => (
              <li key={im.id}><RevealImage seed={im.id} className="aspect-[4/3]"><Photo id={im.id} alt={im.alt} width={1600} sizes="(max-width: 640px) 100vw, 560px" className="h-full w-full object-cover" /></RevealImage></li>
            ))}
          </ul>
        )}

        {related.length > 0 && (
          <div className="mx-auto max-w-6xl border-t border-ivory/12 px-6 py-24 lg:px-8">
            <h2 className="display text-[2rem] text-ivory">Related works</h2>
            <ul className="editorial-work-grid mt-12">
              {related.map((w, i) => <ArtworkCard key={w.slug} work={w} index={i} />)}
            </ul>
          </div>
        )}
      </section>
    </>
  )
}
