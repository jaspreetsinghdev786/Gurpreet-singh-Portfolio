import { Link } from "react-router"
import { ArrowRight } from "@phosphor-icons/react"
import { Seo } from "../components/site/Seo"
import { PageHero } from "../components/editorial/PageHero"
import { heroArtwork } from "../content/heroArtwork"
import { SectionTitle } from "../components/editorial/SectionTitle"
import { EditorialText } from "../components/editorial/EditorialText"

import { WorkCarousel } from "../components/editorial/WorkCarousel"
import { QuoteBlock } from "../components/editorial/QuoteBlock"
import { CategoryGrid } from "../components/editorial/CategoryGrid"
import { Timeline } from "../components/editorial/Timeline"
import { TypeGrid } from "../components/editorial/TypeGrid"
import { Reveal, RevealImage } from "../components/ui/reveal"
import { Photo } from "../components/ui/photo"
import {
  profile, chapters, pullQuote, practiceCategories, education, experience,
  specialisations, researchInterests, summary,
} from "../content/artist"

const profileFacts = [
  { label: "Professional name", value: profile.professionalName },
  { label: "Based in", value: profile.base },
  { label: "Languages", value: profile.languages.join(", ") },
  { label: "Exhibited in", value: profile.exhibitedIn.join(", ") },
]

const Wrap = ({ tone = "dark", children, className = "" }) => (
  <section className={`${tone === "light" ? "bg-ivory" : "bg-charcoal"} ${className}`}>
    <div className="mx-auto max-w-6xl px-6 py-24 md:py-32 lg:px-8">{children}</div>
  </section>
)

export const About = () => (
  <>
    <Seo
      title="About the artist"
      description="Gurpreet Singh, painter, visual artist, art educator and researcher from Bathinda, Punjab: practice, teaching, education, specialisations and research."
      path="/about"
      image="/gallery/opt/15-studio-1600.webp"
    />

    <PageHero artwork={heroArtwork.about}
      eyebrow="About the artist"
      title={profile.name}
      sub={profile.roles.join("  •  ")}
      lead="An ongoing relationship between people, place, history, observation and memory."
    />

    <section id="artist-profile" aria-label="Artist profile" className="border-b border-gold/20 bg-charcoal-800">
      <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-x-8 gap-y-6 px-6 py-8 lg:grid-cols-4 lg:px-8">
        {profileFacts.map((fact, index) => (
          <Reveal key={fact.label} delay={index * .04}>
            <dt className="text-[9px] leading-relaxed tracking-[0.16em] text-gold-light uppercase">{fact.label}</dt>
            <dd className="mt-2 text-[14px] leading-relaxed text-ivory/80 md:text-[15px]">{fact.value}</dd>
          </Reveal>
        ))}
      </dl>
    </section>

    {/* 1. The artist: prose beside a studio photograph */}
    <Wrap>
      <div className="grid gap-16 lg:grid-cols-[1fr_0.85fr] lg:items-start lg:gap-24">
        <div>
          <SectionTitle title={chapters.artist.heading} />
          <EditorialText paragraphs={chapters.artist.paragraphs} className="mt-10" />
        </div>
        <RevealImage className="aspect-[3/4] w-full lg:mt-20">
          <Photo id="15-studio" alt="Gurpreet Singh drawing at his drafting table, black and white" width={1600} sizes="(max-width: 1024px) 100vw, 520px" className="h-full w-full object-cover" />
        </RevealImage>
      </div>
    </Wrap>

    {/* 2. Artistic practice: six categories */}
    <Wrap tone="light">
      <SectionTitle tone="light" title="Artistic practice" intro="Oil first, with watercolour and acrylic beside it; portraiture, landscape and history as recurring subjects; drawing and photography running through all of it." />
      <div className="mt-16">
        <CategoryGrid categories={practiceCategories} linkBase="/work" tone="light" lead={false} />
      </div>
    </Wrap>

    {/* 3. The idea of observation: an editorial statement */}
    <section className="bg-charcoal-800">
      <Reveal className="mx-auto max-w-4xl px-6 py-28 text-center md:py-36">
        <div className="mx-auto h-px w-16 rule-gold" aria-hidden="true" />
        <h2 className="mt-8 text-[12px] tracking-[0.3em] text-gold-light uppercase">{chapters.observation.heading}</h2>
        <p className="display mt-8 text-[clamp(1.8rem,3.8vw,2.9rem)] leading-[1.28] text-balance text-ivory">
          {chapters.observation.statement}
        </p>
        <p className="mx-auto mt-8 max-w-[52ch] text-[17px] leading-[1.75] text-muted">{chapters.observation.body}</p>
      </Reveal>
    </section>

    {/* 4. Punjab, memory and history: the statement, then the frames it draws on */}
    <section className="relative overflow-hidden bg-ivory">
      {/* Ground: two frames held far back in the margins, and the brushes at the right edge */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden 2xl:block">
        <Photo
          id="12-lion"
          width={700}
          sizes="20vw"
          className="absolute top-8 -left-10 w-[18%] opacity-[0.04] grayscale"
        />
        <Photo
          id="places"
          width={700}
          sizes="20vw"
          className="absolute bottom-24 -left-6 w-[16%] opacity-[0.04] grayscale"
        />
        <Photo
          id="tools"
          width={700}
          sizes="18vw"
          className="absolute right-0 bottom-10 w-[14%] opacity-[0.04] grayscale"
        />
      </div>

      <div className="relative mx-auto max-w-[84rem] px-6 py-24 md:py-28 lg:px-8 2xl:max-w-[100rem] 2xl:px-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <Reveal>
            <div className="flex items-center gap-5">
              <span className="h-px w-10 bg-gold/60" aria-hidden="true" />
              <ul className="flex flex-wrap items-center gap-x-3 text-[10.5px] tracking-[0.28em] text-dark-text/50 uppercase">
                {chapters.punjab.words.map((w, i) => (
                  <li key={w} className="flex items-center gap-3">
                    {i > 0 && (
                      <span className="text-gold/60" aria-hidden="true">
                        /
                      </span>
                    )}
                    {w}
                  </li>
                ))}
              </ul>
            </div>

            <h2 className="display mt-7 max-w-[13ch] text-[clamp(2.3rem,4.2vw,3.7rem)] leading-[1.06] text-dark-text">
              Punjab, memory and <span className="text-gold">history</span>
            </h2>

            <p className="mt-6 text-[11px] tracking-[0.3em] text-dark-text/45 uppercase">{chapters.punjab.label}</p>
          </Reveal>

          <Reveal delay={0.08} className="space-y-6 text-[15.5px] leading-[1.8] text-dark-text/70 lg:pt-2">
            {chapters.punjab.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="max-w-[62ch]">
                {p}
              </p>
            ))}
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
          <Reveal delay={0.12}>
            <WorkCarousel
              frames={chapters.punjab.frames}
              label="Paintings and photographs from the Punjab strand of the work"
            />
          </Reveal>

          <div aria-hidden="true" className="hidden w-32 shrink-0 pt-4 lg:block">
            <p className="font-script -rotate-6 text-[21px] leading-[1.4] text-dark-text/40">
              {chapters.punjab.note.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <ul className="mt-12 space-y-1.5 text-[9.5px] tracking-[0.26em] text-dark-text/40 uppercase">
              {chapters.punjab.rail.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
            <div className="mt-5 h-14 w-px bg-gold/40" />
          </div>
        </div>
      </div>
    </section>

    {/* 5. The educator */}
    <Wrap>
      <div className="grid gap-16 lg:grid-cols-[0.85fr_1fr] lg:items-center lg:gap-24">
        <RevealImage className="aspect-[4/3] w-full">
          <Photo id={19} alt="Visitors, many of them students, queuing along a wall of framed photographs at an exhibition" width={1600} sizes="(max-width: 1024px) 100vw, 520px" className="h-full w-full object-cover" />
        </RevealImage>
        <div>
          <SectionTitle title={chapters.educator.heading} />
          <EditorialText paragraphs={chapters.educator.paragraphs} className="mt-10" />
        </div>
      </div>
    </Wrap>

    {/* 6. Beyond painting: dimensions of a wider cultural life */}
    <Wrap tone="light">
      <SectionTitle tone="light" title={chapters.beyond.heading} intro={chapters.beyond.intro} />
      <ul className="mt-14 grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
        {chapters.beyond.interests.map((it, i) => (
          <li key={it.title}>
            <Reveal delay={(i % 3) * 0.05} className="border-t border-charcoal/12 py-6">
              <h3 className="display text-[1.35rem] text-dark-text">{it.title}</h3>
              <p className="mt-1.5 text-[14.5px] text-cream-muted">{it.note}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </Wrap>

    {/* Pull quote as a visual pause */}
    <QuoteBlock text={pullQuote.text} attribution={pullQuote.attribution} tone="dark" />

    {/* 7 + 8. Education and professional experience */}
    <Wrap>
      <div className="grid gap-20 lg:grid-cols-2 lg:gap-24">
        <div>
          <SectionTitle title="Education" />
          <div className="mt-12">
            <Timeline dated={false} items={education.map((e) => ({ when: null, title: e.degree, detail: e.institution }))} />
          </div>
        </div>
        <div>
          <SectionTitle title="Professional experience" />
          <div className="mt-12">
            <Timeline items={experience.map((x) => ({ when: `${x.from} to ${x.to}`, title: x.role, detail: x.institution, body: x.body }))} />
          </div>
        </div>
      </div>
    </Wrap>

    {/* 9 + 10. Specialisations and research interests */}
    <Wrap tone="light">
      <SectionTitle tone="light" title="Areas of specialisation" />
      <div className="mt-12"><TypeGrid items={specialisations} tone="light" columns={4} /></div>
      <div className="mt-24">
        <SectionTitle tone="light" title="Research interests" />
        <div className="mt-12"><TypeGrid items={researchInterests} tone="light" columns={2} /></div>
      </div>
    </Wrap>

    {/* 11. Professional summary */}
    <Wrap className="border-t border-gold/15">
      <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div>
          <SectionTitle title="Professional summary" />
          <p className="mt-8 text-[15px] leading-relaxed text-muted">{profile.professionalName}</p>
          <p className="mt-1 text-[13px] tracking-[0.12em] text-ivory/45 uppercase">{profile.roles.join(" • ")}</p>
          <Link to="/contact" className="group mt-10 inline-flex items-center gap-3 text-[12px] tracking-[0.18em] text-gold-light uppercase transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light">
            Enquire
            <ArrowRight size={14} weight="bold" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
        <ol className="grid gap-x-12 sm:grid-cols-2">
          {summary.map((s, i) => (
            <li key={s}>
              <Reveal delay={(i % 2) * 0.04} className="border-t border-ivory/12 py-5">
                <span className="text-[16px] leading-snug text-ivory/85">{s}</span>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Wrap>
  </>
)

