import { Reveal } from "./ui/reveal"
import { Photo } from "./ui/photo"
import { archive } from "../content/site"

/**
 * Six chosen frames under one heading, not a thumbnail carousel. Every frame
 * shares the same 4:3 crop and the same grade, and carries a one-word label
 * under it. The strip still moves (the page's only marquee), slowly, and stops
 * when the visitor rests on it.
 */
export const Archive = () => (
  <section aria-labelledby="archive-heading" className="border-y border-gold/15 bg-charcoal-800 py-16 md:py-20">
    <Reveal className="mx-auto max-w-6xl px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-3">
        <h2 id="archive-heading" className="display text-[clamp(1.75rem,3vw,2.4rem)] text-ivory">
          {archive.heading}
        </h2>
        <p className="max-w-[46ch] text-[16px] leading-relaxed text-muted">{archive.intro}</p>
      </div>
    </Reveal>

    <div className="group relative mt-10 w-full overflow-hidden">
      <ul className="flex w-max animate-[filmstrip_70s_linear_infinite] gap-6 pr-6 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {[0, 1].map((pass) =>
          archive.frames.map((f) => (
            <li
              key={`${f.id}-${pass}`}
              aria-hidden={pass === 1 ? "true" : undefined}
              className="w-64 shrink-0 sm:w-72"
            >
              <figure>
                <div className="aspect-[4/3] overflow-hidden">
                  <Photo
                    id={f.id}
                    alt={pass === 1 ? "" : f.alt}
                    sizes="288px"
                    className="h-full w-full object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-[12px] tracking-[0.18em] text-ivory/45 uppercase">
                  {f.label}
                </figcaption>
              </figure>
            </li>
          )),
        )}
      </ul>
    </div>
  </section>
)
