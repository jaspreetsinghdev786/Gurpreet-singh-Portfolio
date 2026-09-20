import { Seo } from "../components/site/Seo"
import { PageHero } from "../components/editorial/PageHero"
import { heroArtwork } from "../content/heroArtwork"
import { SectionTitle } from "../components/editorial/SectionTitle"
import { AwardTimeline } from "../components/editorial/AwardTimeline"
import { Timeline } from "../components/editorial/Timeline"
import { ImageFeature } from "../components/editorial/ImageFeature"
import { Reveal } from "../components/ui/reveal"
import { awards, workshops, publicArt, leadership, collections } from "../content/record"

const List = ({ heading, items, tone = "dark" }) => {
  const light = tone === "light"
  return (
    <div>
      <h3 className={`text-[12px] tracking-[0.24em] uppercase ${light ? "text-gold" : "text-gold-light"}`}>{heading}</h3>
      <ul className="mt-6 space-y-3">
        {items.map((it) => (
          <li key={it} className={`text-[16px] leading-snug ${light ? "text-dark-text/80" : "text-ivory/80"}`}>{it}</li>
        ))}
      </ul>
    </div>
  )
}

export const Achievements = () => (
  <>
    <Seo title="Awards and honours" description="Recognition across painting, photography and cultural work, 1995 to 2022, with workshops, public art, professional leadership and collections." path="/achievements" image="/gallery/opt/3-1600.webp" />
    <PageHero artwork={heroArtwork.achievements} eyebrow="Awards and honours" title="Recognition across painting, photography and cultural work." lead="A chronology from 1995 onward. The early awards are kept beside the recent ones; the sequence is part of the story." />

    <section className="bg-ivory">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32 lg:px-8">
        <SectionTitle tone="light" title="Awards and honours" />
        <div className="mt-14"><AwardTimeline awards={awards} tone="light" /></div>
      </div>
    </section>

    <section className="bg-charcoal py-8">
      <ImageFeature photo={{ id: 3, alt: "An award presentation on stage at the Lalit Kala Akademi" }} caption="Lalit Kala Akademi Punjab, Chandigarh. Best Artist Award in Painting, 2015." />
    </section>

    <section className="bg-charcoal">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32 lg:px-8">
        <div className="grid gap-20 lg:grid-cols-2 lg:gap-24">
          <div>
            <SectionTitle title="Workshops and symposiums" />
            <div className="mt-12"><Timeline items={workshops.map((w) => ({ when: w.year, title: w.title, detail: w.where }))} /></div>
          </div>
          <div>
            <SectionTitle title="Live painting and public art" />
            <div className="mt-12"><Timeline items={publicArt.map((p) => ({ when: p.year, title: p.title, detail: p.note }))} /></div>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-ivory">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32 lg:px-8">
        <div className="grid gap-20 lg:grid-cols-2 lg:gap-24">
          <div>
            <SectionTitle tone="light" title="Professional leadership" />
            <ul className="mt-12 space-y-8">
              {leadership.roles.map((r) => (
                <li key={r.role + r.org} className="border-t border-charcoal/12 pt-6">
                  <Reveal>
                    <h3 className="display text-[1.4rem] text-dark-text">{r.role}</h3>
                    <p className="mt-1.5 text-[15px] text-cream-muted">{r.org}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
            <Reveal className="mt-10 max-w-[52ch] text-[15px] leading-relaxed text-cream-muted">{leadership.note}</Reveal>
          </div>
          <div>
            <SectionTitle tone="light" title="Collections" />
            <div className="mt-12 grid gap-12 sm:grid-cols-2">
              <Reveal><List heading="Public collections" items={collections.public} tone="light" /></Reveal>
              <Reveal delay={0.06}><List heading="International collections" items={collections.international} tone="light" /></Reveal>
            </div>
            <Reveal className="mt-12 max-w-[52ch] text-[15px] leading-relaxed text-cream-muted">{collections.privateNote}</Reveal>
          </div>
        </div>
      </div>
    </section>
  </>
)
