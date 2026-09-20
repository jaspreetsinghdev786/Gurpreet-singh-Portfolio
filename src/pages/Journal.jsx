import { Link } from "react-router"
import { ArrowRight } from "@phosphor-icons/react"
import { Seo } from "../components/site/Seo"
import { PageHero } from "../components/editorial/PageHero"
import { heroArtwork } from "../content/heroArtwork"
import { Reveal, RevealImage } from "../components/ui/reveal"
import { Photo } from "../components/ui/photo"
import { journalCategories, journalIntro, journalPage, articles } from "../content/journal"

const j = journalPage

/** A word-rail in an outer margin. Decorative, so it is hidden from readers. */
const Rail = ({ words, className = "", tone = "dark" }) => (
  <div aria-hidden="true" className={className}>
    <ul
      className={`space-y-1.5 text-[9.5px] tracking-[0.26em] uppercase ${
        tone === "light" ? "text-dark-text/40" : "text-ivory/40"
      }`}
    >
      {words.map((w) => (
        <li key={w}>{w}</li>
      ))}
    </ul>
    <div
      className={`mt-5 h-14 w-px ${tone === "light" ? "bg-charcoal/25" : "bg-gold/45"}`}
    />
  </div>
)

/**
 * The journal page.
 *
 * Nothing has been published yet, so the page's job is to say what the journal
 * is for and what it will gather, rather than to show invented titles. When
 * `articles` fills up, the latest-writing grid below the intro appears on its
 * own and the six threads gain their counts.
 *
 * The page alternates ground once each way: dark hero, ivory intro, dark
 * threads, ivory closing line. That is the same single inversion the home page
 * uses, not a section-by-section alternation.
 */
export const Journal = () => (
  <>
    <Seo
      title="Journal"
      description="Writing alongside the work: essays on practice and Punjab, art history and iconography, photography, culture and shorter observations."
      path="/journal"
      image="/gallery/opt/1-1600.webp"
    />

    <PageHero
      eyebrow={j.hero.eyebrow}
      title={<>{j.hero.title.lead}<br /><em>{j.hero.title.accent}.</em></>}
      lead={j.hero.lead}
      words={j.hero.words}
      artwork={heroArtwork.journal}
    />

    {/* 01 — what the journal is for */}
    <section className="relative overflow-hidden bg-ivory">
      <div className="mx-auto max-w-[84rem] px-6 py-20 md:py-24 lg:px-8 2xl:max-w-[100rem] 2xl:px-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          <div>
            <Reveal>
              <div className="flex items-center gap-5">
                <span className="text-[11px] tracking-[0.3em] text-gold">{j.intro.index}</span>
                <span className="h-px w-14 bg-gold/60" aria-hidden="true" />
              </div>

              <h2 className="display mt-7 max-w-[16ch] text-[clamp(1.9rem,3vw,2.5rem)] leading-[1.12] text-dark-text">
                {journalIntro.heading}
              </h2>

              <div className="mt-8 max-w-[52ch] space-y-6 text-[16px] leading-[1.8] text-cream-muted">
                {journalIntro.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <Link
                to="/archive"
                className="group mt-11 inline-flex items-center gap-8 border border-gold/50 px-8 py-[1.1rem] text-[11px] tracking-[0.26em] text-dark-text uppercase transition-colors duration-300 hover:border-gold hover:bg-gold/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              >
                {j.intro.cta}
                <ArrowRight
                  size={14}
                  aria-hidden="true"
                  className="text-gold transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </Reveal>
          </div>

          <div className="flex items-start gap-6 lg:gap-8">
            <figure className="w-full sm:mx-auto sm:w-[80%] lg:mx-0 lg:w-auto lg:min-w-0 lg:flex-1">
              <RevealImage className="aspect-[4/3] w-full" curtain="bg-ivory">
                <Photo
                  id={j.intro.photo.id}
                  alt={j.intro.photo.alt}
                  width={1600}
                  sizes="(max-width: 1024px) 90vw, 560px"
                  className="h-full w-full object-cover grayscale"
                />
              </RevealImage>

              <figcaption className="mt-5 flex flex-wrap items-center gap-x-3 text-[10px] tracking-[0.26em] text-dark-text/45 uppercase">
                {j.intro.strip.map((w, i) => (
                  <span key={w} className="flex items-center gap-3">
                    {i > 0 && (
                      <span className="text-gold/60" aria-hidden="true">
                        /
                      </span>
                    )}
                    {w}
                  </span>
                ))}
              </figcaption>

              <p className="font-script mt-5 max-w-[24ch] text-[19px] leading-[1.4] text-dark-text/45 lg:hidden">
                {j.intro.note}
              </p>
            </figure>

            <div aria-hidden="true" className="hidden w-28 shrink-0 pt-6 lg:block">
              <p className="font-script -rotate-3 text-[19px] leading-[1.4] text-dark-text/45">{j.intro.note}</p>
              <Rail words={j.intro.rail} tone="light" className="mt-10" />
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Latest writing, once there is any */}
    {articles.length > 0 && (
      <section className="border-t border-gold/15 bg-charcoal">
        <div className="mx-auto max-w-[84rem] px-6 py-20 lg:px-8 2xl:max-w-[100rem] 2xl:px-16">
          <h2 className="display text-[clamp(1.9rem,3vw,2.5rem)] leading-tight text-ivory">Latest writing</h2>
          <ul className="editorial-work-grid mt-12">
            {articles.map((a, i) => (
              <li key={a.slug}>
                <Link
                  to={`/journal/${a.slug}`}
                  className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light"
                >
                  <RevealImage delay={(i % 3) * 0.06} seed={i} className="aspect-[4/3]">
                    <Photo
                      id={a.cover.id}
                      alt={a.cover.alt}
                      sizes="(max-width: 640px) 100vw, 360px"
                      className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.03]"
                    />
                  </RevealImage>
                  <Reveal delay={(i % 3) * 0.06 + 0.08}>
                    <h3 className="display mt-5 text-[1.4rem] leading-snug text-ivory">{a.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted">{a.excerpt}</p>
                  </Reveal>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    )}

    {/* 02 — the six threads */}
    <section className="relative overflow-hidden border-t border-gold/15 bg-charcoal">
      <div className="mx-auto max-w-[84rem] px-6 py-20 md:py-24 lg:px-8 2xl:max-w-[100rem] 2xl:px-16">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <Reveal>
            <div className="flex items-center gap-5">
              <span className="text-[11px] tracking-[0.3em] text-gold">{j.threads.index}</span>
              <span className="h-px w-14 bg-gold/50" aria-hidden="true" />
            </div>

            <h2 className="display mt-7 max-w-[14ch] text-[clamp(2rem,3.4vw,2.9rem)] leading-[1.1] text-ivory">
              {j.threads.heading}
            </h2>

            <p className="mt-6 max-w-[44ch] text-[16px] leading-[1.75] text-muted">{j.threads.intro}</p>
          </Reveal>

          <Rail words={j.threads.rail} className="hidden pt-2 lg:block" />
        </div>

        <ul className="journal-threads mt-14 grid gap-x-12 sm:grid-cols-2">
          {journalCategories.map((c, i) => {
            const count = articles.filter((a) => a.category === c.key).length
            return (
              <li key={c.key}>
                <Reveal delay={(i % 2) * 0.06}>
                  <div className="flex flex-col justify-between gap-6 border-t border-gold/25 py-8">
                    <div>
                      <span className="text-[11px] tracking-[0.24em] text-gold">{c.n}</span>
                      <h3 className="display mt-4 text-[1.35rem] leading-tight text-ivory">{c.label}</h3>
                      <p className="mt-2 max-w-[30ch] text-[14px] leading-[1.6] text-muted">{c.desc}</p>
                    </div>

                    {count > 0 && (
                      <Link
                        to="/journal"
                        aria-label={`Read ${c.label}`}
                        className="grid size-10 shrink-0 place-items-center self-end rounded-full border border-gold/45 text-gold transition-colors duration-300 hover:border-gold hover:bg-gold/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light"
                      >
                        <ArrowRight size={14} aria-hidden="true" />
                      </Link>
                    )}
                  </div>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </section>

    {/* The line that closes the page */}
    <section className="relative overflow-hidden bg-ivory">
      <div className="mx-auto max-w-[84rem] px-6 py-14 lg:px-8 2xl:max-w-[100rem] 2xl:px-16">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)_minmax(0,0.5fr)]">
          <Reveal>
            <blockquote className="font-serif pb-1 text-[clamp(1.3rem,2.2vw,1.8rem)] leading-[1.4] text-dark-text italic">
              “{j.closing.line}”
            </blockquote>
            <div className="mt-6 flex items-center gap-4">
              <span className="h-px w-10 bg-gold/60" aria-hidden="true" />
              <span className="text-[10px] tracking-[0.28em] text-gold uppercase">{j.closing.attribution}</span>
            </div>
          </Reveal>

          <RevealImage className="aspect-[21/9] w-full" curtain="bg-ivory">
            <Photo
              id={j.closing.photo.id}
              alt={j.closing.photo.alt}
              width={1600}
              sizes="(max-width: 1024px) 100vw, 620px"
              className="h-full w-full object-cover opacity-90 grayscale"
            />
          </RevealImage>

          <p
            aria-hidden="true"
            className="font-script hidden text-[19px] leading-[1.45] text-dark-text/40 lg:block"
          >
            {j.closing.note.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  </>
)
