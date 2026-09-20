import { Link } from "react-router"
import { ArrowRight } from "@phosphor-icons/react"
import { Reveal, RevealImage } from "../ui/reveal"
import { Photo } from "../ui/photo"
import { essay, memorySection } from "../../content/site"

const m = memorySection

/**
 * One plate: the photograph, then the number, the title, the line about it and
 * the link onward. `height` is the row's shared image height from `lg` up, so
 * two plates in a row share a baseline while their widths, and therefore their
 * crops, differ.
 */
const Plate = ({ frame, height, sizes, delay = 0 }) => (
  <li>
    <RevealImage variant={["focus", "expand", "liquid", "slow-zoom"][Number(frame.n) - 1]} delay={delay} seed={frame.photo.id} className={`aspect-[4/3] w-full sm:aspect-[16/9] lg:aspect-auto ${height}`}>
      <Photo
        id={frame.photo.id}
        alt={frame.photo.alt}
        width={1600}
        sizes={sizes}
        className="h-full w-full object-cover"
      />
    </RevealImage>

    <Reveal delay={delay + 0.08} className="mt-5 flex items-start gap-4">
      <span className="display shrink-0 text-[2.3rem] leading-none text-gold">{frame.n}</span>

      <div className="min-w-0 flex-1">
        <h3 className="display text-[1.4rem] leading-tight text-ivory">{frame.label}</h3>
        <p className="mt-1.5 max-w-[40ch] text-[14.5px] leading-[1.6] text-muted">{frame.desc}</p>
      </div>

      <Link
        to={frame.to}
        aria-label={`See ${frame.label}`}
        className="group mt-1.5 shrink-0 border-b border-gold/40 pb-2 transition-colors hover:border-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light"
      >
        <span className="flex items-center gap-4 text-[10px] tracking-[0.24em] text-ivory/75 uppercase transition-colors group-hover:text-ivory">
          View
          <ArrowRight
            size={12}
            aria-hidden="true"
            className="text-gold transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </Link>
    </Reveal>
  </li>
)

/**
 * Four plates on an offset grid. The statement holds a narrow rail on the
 * left; the first pair of plates is inset beside it, and the second pair runs
 * the full width beneath. That step to the left is the whole composition, and
 * it is what keeps this section from reading as a third regular grid after the
 * two above it.
 *
 * The studio photograph across the top right is ground, not subject: masked,
 * desaturated and held at low opacity behind the handwritten words. Those
 * words and the caption beside them appear from `lg` up, where the first row
 * of plates has dropped far enough not to meet them.
 */
export const Essay = () => (
  <section id="essay" className="relative overflow-hidden border-b border-gold/15 bg-charcoal">
    <div aria-hidden="true" className="pointer-events-none absolute top-0 right-0 hidden h-60 w-[62%] lg:block">
      <Photo
        id={m.ghost.id}
        width={1600}
        sizes="60vw"
        position="50% 28%"
        className="h-full w-full object-cover opacity-[0.06] grayscale"
      />
      <div className="absolute inset-0 bg-charcoal/80" />
    </div>

    <div className="relative mx-auto max-w-[84rem] px-6 pt-16 md:pt-20 lg:px-8 2xl:max-w-[100rem] 2xl:px-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-12 right-6 hidden items-start gap-10 lg:flex lg:right-8 2xl:right-16"
      >
        <ul className="font-script text-right text-[24px] leading-[1.18] text-gold/70">
          {m.marginalia.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>
        <div>
          <p className="text-[10px] leading-[2] tracking-[0.26em] text-muted uppercase">
            {m.caption.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
          <div className="mt-4 h-12 w-px bg-gold/50" />
        </div>
      </div>

      <div className="grid gap-x-10 gap-y-12 lg:grid-cols-12">
        {/* The statement */}
        <div className="lg:col-span-3">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="text-[11px] tracking-[0.3em] text-gold">{m.index}</span>
              <span className="h-px w-10 bg-gold/50" aria-hidden="true" />
              <span className="text-[11px] tracking-[0.28em] text-ivory/75 uppercase">{m.eyebrow}</span>
            </div>

            <h2 className="display mt-7 text-[clamp(2.4rem,4vw,4rem)] leading-[1.04] text-ivory lg:whitespace-nowrap">
              {essay.heading.lead}
              <br />
              <span className="text-gold-light">
                {essay.heading.accent}
                <span className="text-gold">.</span>
              </span>
            </h2>

            <p className="mt-6 max-w-[34ch] text-[15.5px] leading-[1.7] text-muted">{essay.intro}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <span className="mt-9 block h-px w-14 bg-gold/45" aria-hidden="true" />

            <figure className="mt-8">
              <blockquote className="font-serif pb-1 text-[1.05rem] leading-[1.55] text-ivory/80 italic">
                “{m.quote.line}”
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-4">
                <span className="h-px w-8 bg-gold/50" aria-hidden="true" />
                <span className="text-[10px] tracking-[0.26em] text-gold uppercase">{m.quote.attribution}</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        {/* First pair, inset beside the statement */}
        <ol className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:col-span-9 lg:col-start-4 lg:mt-40 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          {essay.frames.slice(0, 2).map((f, i) => (
            <Plate
              key={f.n}
              frame={f}
              height="lg:h-72"
              delay={i * 0.06}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 500px"
            />
          ))}
        </ol>

        {/* Second pair, running the full width */}
        <ol start={3} className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:col-span-12">
          {essay.frames.slice(2).map((f, i) => (
            <Plate
              key={f.n}
              frame={f}
              height="lg:h-72"
              delay={i * 0.06}
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          ))}
        </ol>
      </div>

      {/* Closing strip */}
      <div className="mt-16 flex flex-col gap-5 border-t border-gold/15 py-7 sm:flex-row sm:items-center sm:justify-between">
        <ul className="flex flex-wrap items-center gap-x-3 text-[10px] tracking-[0.26em] text-ivory/45 uppercase">
          {m.closing.words.map((w, i) => (
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

        <div className="flex items-center gap-8">
          <span className="hidden h-px w-40 bg-gold/25 lg:block xl:w-64" aria-hidden="true" />
          <span className="text-[10px] tracking-[0.26em] text-muted uppercase">{m.closing.line}</span>
        </div>
      </div>
    </div>
  </section>
)
