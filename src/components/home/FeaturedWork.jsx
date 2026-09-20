import { Link } from "react-router"
import { ArrowRight } from "@phosphor-icons/react"
import { Reveal, RevealImage } from "../ui/reveal"
import { Photo } from "../ui/photo"
import { featured, storiesSection } from "../../content/site"

const s = storiesSection

/** Photographs in this section are printed: a warm paper mat, then the image. */
const Print = ({ photo, sizes, width = 700, ratio = "aspect-[4/3]", pad = "p-2.5", delay = 0, variant = "curtain" }) => (
  <div className={`bg-ivory-deep ${pad}`}>
    <RevealImage variant={variant} delay={delay} seed={photo.id} className={`${ratio} w-full`} curtain="bg-ivory-deep">
      <Photo id={photo.id} alt={photo.alt} width={width} sizes={sizes} className="h-full w-full object-cover" />
    </RevealImage>
  </div>
)

/**
 * Three bands, read top to bottom.
 *
 * The statement and the collage portrait; the three bodies of work as a
 * numbered index divided by hairlines; and a full-bleed closing band where a
 * photograph runs off the left edge, the line sits in the middle, and two
 * frames are held in a strip on the right.
 *
 * The handwritten marginalia are set in the site's script face. Each one sits
 * in its own column or under its frame rather than over a photograph, so a
 * narrow viewport can never drop it on top of a face. Everything decorative —
 * the note, the vertical rail — appears from `lg` up, where there is room.
 */
export const FeaturedWork = () => (
  <section id="work" className="relative overflow-hidden border-b border-gold/15 bg-ivory">
    {/* Band A — the statement, and the portrait as a print */}
    <div className="mx-auto max-w-[84rem] px-6 pt-24 md:pt-32 lg:px-8 2xl:max-w-[100rem] 2xl:px-16">
      <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)] lg:gap-14">
        <div>
          <Reveal variant="clip">
            <div className="flex items-center gap-5">
              <span className="text-[11px] tracking-[0.3em] text-gold">{s.index}</span>
              <span className="h-px w-14 bg-gold/50" aria-hidden="true" />
              <span className="text-[11px] tracking-[0.32em] text-cream-muted uppercase">{s.eyebrow}</span>
            </div>

            <h2 className="display mt-9 max-w-[12ch] text-[clamp(2.6rem,4.6vw,4.2rem)] leading-[1.04] text-dark-text">
              {s.heading.lead}{" "}
              <span className="text-gold-light">
                {s.heading.accent}
                <span className="text-gold">.</span>
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-9 max-w-[48ch] text-[17px] leading-[1.8] text-muted">{featured.intro}</p>
          </Reveal>

          <Reveal delay={0.14} className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-6">
            <Link
              to="/work"
              className="group inline-flex items-center gap-6 border border-gold/50 px-8 py-[1.15rem] text-[11.5px] tracking-[0.26em] text-gold uppercase transition-colors duration-300 hover:border-gold hover:bg-gold/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light"
            >
              {s.cta}
              <ArrowRight
                size={15}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <span className="hidden h-14 w-px bg-charcoal/15 sm:block" aria-hidden="true" />

            <ul className="flex flex-wrap items-center gap-x-3 text-[10.5px] tracking-[0.26em] text-cream-muted uppercase">
              {s.words.map((w, i) => (
                <li key={w} className="flex items-center gap-3">
                  {i > 0 && (
                    <span className="text-gold/50" aria-hidden="true">
                      /
                    </span>
                  )}
                  {w}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* The collage: marginal note, the print, then the rail */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-10 -inset-y-12 hidden lg:block"
          />

          <div className="relative flex items-start gap-7">
            <p className="font-script hidden w-[30%] shrink-0 rotate-[-5deg] pt-16 text-[27px] leading-[1.35] text-muted lg:block">
              {s.note}
            </p>

            <figure className="w-full rotate-[-1.4deg] bg-ivory-deep p-3 shadow-[0_14px_34px_-24px_rgba(42,40,31,0.34)] sm:mx-auto sm:w-[78%] lg:mx-0 lg:w-auto lg:min-w-0 lg:flex-1">
              <RevealImage className="aspect-[4/5] w-full" curtain="bg-ivory-deep">
                <Photo
                  id={featured.lead.photo.id}
                  alt={featured.lead.photo.alt}
                  width={1600}
                  sizes="(max-width: 1024px) 80vw, 420px"
                  className="h-full w-full object-cover"
                />
              </RevealImage>
            </figure>

            <div aria-hidden="true" className="hidden shrink-0 pt-1 lg:block">
              <ul className="space-y-[0.5rem] text-right text-[10px] tracking-[0.28em] text-gold/70 uppercase">
                {s.rail.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
              <div className="mt-6 ml-auto h-16 w-px bg-gold/50" />
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Band B — the three bodies of work */}
    <div className="mx-auto max-w-[84rem] px-6 pt-24 pb-28 md:pt-28 md:pb-36 lg:px-8 2xl:max-w-[100rem] 2xl:px-16">
      <ul className="grid gap-14 md:-mx-9 md:grid-cols-3 md:gap-0">
        {featured.categories.map((c, i) => (
          <li key={c.title} className="md:border-l md:border-gold/15 md:px-9 md:first:border-l-0">
            <figure>
              <Print photo={c.photo} delay={i * 0.06} variant={["focus", "liquid", "slow-zoom"][i]} sizes="(max-width: 768px) 100vw, 380px" />
              <figcaption className="font-script mt-4 text-[26px] leading-none text-muted">{c.note}</figcaption>
            </figure>

            <Reveal delay={i * 0.06 + 0.08} className="mt-7">
              <div className="flex items-center gap-4">
                <span className="text-[11px] tracking-[0.28em] text-gold">{c.n}</span>
                <span className="h-px w-10 bg-gold/40" aria-hidden="true" />
              </div>
              <div className="mt-4 flex items-start gap-6">
                <div className="min-w-0 flex-1">
                  <h3 className="display text-[1.7rem] leading-tight text-ivory">{c.title}</h3>
                  <p className="mt-3 max-w-[32ch] text-[15.5px] leading-[1.7] text-muted">{c.desc}</p>
                </div>
                <Link
                  to={c.to}
                  aria-label={`See ${c.title}`}
                  className="grid size-11 shrink-0 place-items-center rounded-full border border-gold/45 text-gold transition-colors duration-300 hover:border-gold hover:bg-gold/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light"
                >
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>

    {/* Band C — the closing line */}
    <div className="relative border-t border-gold/15 bg-ivory-deep">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.1fr)_minmax(0,0.85fr)]">
        <div className="relative h-56 lg:h-80">
          <Photo
            id={s.bleed.id}
            alt={s.bleed.alt}
            width={1600}
            sizes="(max-width: 1024px) 100vw, 400px"
            position="40% 45%"
            className="h-full w-full object-cover grayscale"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-charcoal-800/40"
          />
        </div>

        <Reveal>
          <figure className="px-6 py-4 lg:px-0">
            <blockquote className="font-serif text-[clamp(1.25rem,2vw,1.6rem)] leading-[1.5] text-dark-text italic">
              “{s.quote.line}”
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-4">
              <span className="h-px w-10 bg-gold/50" aria-hidden="true" />
              <span className="text-[10.5px] tracking-[0.28em] text-gold uppercase">{s.quote.attribution}</span>
            </figcaption>
          </figure>
        </Reveal>

        <div className="px-6 pb-10 lg:px-0 lg:pr-10 lg:pb-0">
          <div className="flex gap-1.5 border-y border-charcoal/15 bg-ivory-deep px-2 py-2">
            {s.strip.map((frame) => (
              <div key={frame.id} className="aspect-[4/3] w-1/2 overflow-hidden">
                <Photo
                  id={frame.id}
                  alt={frame.alt}
                  width={700}
                  sizes="(max-width: 1024px) 45vw, 180px"
                  className="h-full w-full object-cover grayscale"
                />
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-center gap-4">
            <span className="h-px flex-1 bg-ivory/15" aria-hidden="true" />
            <span className="text-[10px] tracking-[0.28em] text-ivory/45 uppercase">{s.caption}</span>
            <span className="h-px flex-1 bg-ivory/15" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  </section>
)
