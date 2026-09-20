import { Link } from "react-router"
import { ArrowRight } from "@phosphor-icons/react"
import { Reveal, RevealImage } from "../ui/reveal"
import { Photo } from "../ui/photo"
import { practice } from "../../content/site"

/**
 * Six bodies of work as a three-by-two grid of photographs. Each caption is a
 * single row: the name, the number, the line about the work, and the arrow
 * through to it. The hairline sits above each caption and nowhere else, so the
 * grid reads as six plates rather than a bordered table.
 *
 * On the ivory ground the accent is the same gold as the dark sections; only
 * the text colours invert.
 */
export const Practice = () => (
  <section id="practice" className="bg-ivory">
    <div className="mx-auto max-w-[84rem] px-6 pt-20 pb-24 md:pt-24 md:pb-28 lg:px-8 2xl:max-w-[100rem] 2xl:px-16">
      <Reveal>
        <div className="h-px w-14 bg-gold/60" aria-hidden="true" />
        <div className="mt-6 flex flex-wrap items-baseline gap-x-8 gap-y-3">
          <h2 className="display text-[clamp(2.2rem,3.4vw,3rem)] leading-[1.08] text-dark-text">{practice.heading}</h2>
          <p className="border-charcoal/15 text-[10.5px] leading-[1.9] tracking-[0.26em] text-dark-text/45 uppercase sm:border-l sm:pl-8">
            {practice.subtitle.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>
      </Reveal>

      <ol className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {practice.items.map((item, i) => (
          <li key={item.title}>
            <RevealImage variant={["focus", "expand", "slow-zoom", "sheen", "wipe", "turn"][i]} delay={(i % 3) * 0.06} seed={i} className="aspect-[4/3] w-full" curtain="bg-ivory">
              <Photo
                id={item.photo.id}
                alt={item.photo.alt}
                width={1600}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                className="h-full w-full object-cover"
              />
            </RevealImage>

            <Reveal delay={(i % 3) * 0.06 + 0.08} className="mt-5 border-t border-charcoal/15 pt-4">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="display text-[1.3rem] leading-tight text-dark-text">{item.title}</h3>
                <span className="text-[11px] tracking-[0.22em] text-gold">{item.n}</span>
              </div>

              <div className="mt-2 flex items-start justify-between gap-6">
                <p className="max-w-[34ch] text-[14.5px] leading-[1.6] text-cream-muted">{item.desc}</p>
                <Link
                  to={item.to}
                  aria-label={`See ${item.title}`}
                  className="group shrink-0 pt-1 text-gold transition-colors hover:text-dark-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                >
                  <ArrowRight
                    size={16}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  </section>
)
