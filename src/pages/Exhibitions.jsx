import { Seo } from "../components/site/Seo"
import { PageHero } from "../components/editorial/PageHero"
import { heroArtwork } from "../content/heroArtwork"
import { SectionTitle } from "../components/editorial/SectionTitle"
import { ExhibitionTimeline } from "../components/editorial/ExhibitionTimeline"
import { ImageFeature } from "../components/editorial/ImageFeature"
import { Reveal } from "../components/ui/reveal"
import { soloExhibitions, groupExhibitions } from "../content/record"

export const Exhibitions = () => (
  <>
    <Seo title="Exhibitions" description="Solo exhibitions in India, Canada, Australia and the United States, and selected group exhibitions, by Gurpreet Singh." path="/exhibitions" image="/gallery/opt/4-1600.webp" />
    <PageHero artwork={heroArtwork.exhibitions} eyebrow="Exhibitions" title="A record of exhibitions, encounters and artistic exchange." lead="Solo exhibitions across four countries since 2008, and group exhibitions with the institutions that have shaped Punjab’s art scene." />

    <section className="bg-ivory">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32 lg:px-8">
        <SectionTitle tone="light" title="Solo exhibitions" />
        <div className="mt-16"><ExhibitionTimeline groups={soloExhibitions} tone="light" /></div>
      </div>
    </section>

    <section className="bg-ivory-deep py-8">
      <ImageFeature photo={{ id: 2, alt: "Artists gathered before a wall of paintings at a gallery opening" }} caption="An opening. The exhibition record is also a record of the people met along the way." tone="light" />
    </section>

    <section className="bg-ivory">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32 lg:px-8">
        <SectionTitle tone="light" title="Selected group exhibitions" intro={groupExhibitions.intro} />
        <ul className="mt-14 grid gap-x-12 sm:grid-cols-2">
          {groupExhibitions.venues.map((v, i) => (
            <li key={v}>
              <Reveal delay={(i % 2) * 0.05} className="border-t border-charcoal/12 py-5">
                <span className="display text-[1.25rem] leading-snug text-dark-text">{v}</span>
              </Reveal>
            </li>
          ))}
        </ul>
        <Reveal className="mt-14 max-w-[60ch] text-[15px] leading-relaxed text-cream-muted">{groupExhibitions.note}</Reveal>
      </div>
    </section>
  </>
)
