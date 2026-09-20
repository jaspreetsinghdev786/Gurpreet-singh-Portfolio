import { useState } from "react"
import { Pause, Play } from "@phosphor-icons/react"
import { Reveal, RevealImage } from "../ui/reveal"
import { Photo } from "../ui/photo"
import { archive } from "../../content/site"
import "./collections.css"

/** A slow archive ribbon; each print sits at a slight angle along a shared 3D path. */
export const ArchiveStrip = () => {
  const [paused, setPaused] = useState(false)

  return (
    <section aria-labelledby="archive-heading" className="archive-strip border-y border-gold/15 bg-charcoal-800 py-16 md:py-20">
      <Reveal className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-4">
          <div>
            <p className="mb-3 text-[10px] tracking-[0.28em] text-gold uppercase">Archive / Memory</p>
            <h2 id="archive-heading" className="display text-[clamp(1.75rem,3vw,2.4rem)] text-ivory">
              {archive.heading}
            </h2>
          </div>
          <div className="flex items-end gap-6">
            <p className="max-w-[46ch] text-[16px] leading-relaxed text-muted">{archive.intro}</p>
            <button
              type="button"
              onClick={() => setPaused((current) => !current)}
              aria-pressed={paused}
              aria-label={paused ? "Play the archive strip" : "Pause the archive strip"}
              className="mb-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center border border-ivory/25 text-ivory/70 transition-colors hover:border-gold-light hover:text-gold-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light"
            >
              {paused ? <Play size={14} weight="fill" aria-hidden="true" /> : <Pause size={14} weight="fill" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </Reveal>

      <div className="archive-track-wrap group relative mt-10 w-full overflow-hidden">
        <ul
          style={paused ? { animationPlayState: "paused" } : undefined}
          className="archive-filmstrip flex w-max animate-[filmstrip_110s_linear_infinite] gap-6 pr-6 group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        >
          {[0, 1].map((pass) =>
            archive.frames.map((frame, index) => (
              <li
                key={String(frame.id) + "-" + pass}
                aria-hidden={pass === 1 ? "true" : undefined}
                className="archive-frame w-64 shrink-0 sm:w-72"
                style={{ "--archive-index": index }}
              >
                <figure>
                  <div className="archive-mat">
                    <RevealImage
                      variant={index % 2 ? "slow-zoom" : "curtain"}
                      seed={frame.id}
                      colorReveal
                      curtain="bg-charcoal-800"
                      className="archive-frame-photo aspect-[4/3] overflow-hidden"
                    >
                      <Photo
                        id={frame.id}
                        alt={pass === 1 ? "" : frame.alt}
                        sizes="288px"
                        className="h-full w-full object-cover grayscale"
                      />
                    </RevealImage>
                  </div>
                  <figcaption className="mt-3 text-[11px] tracking-[0.18em] text-ivory/55 uppercase">
                    {frame.label}
                  </figcaption>
                </figure>
              </li>
            )),
          )}
        </ul>
      </div>
    </section>
  )
}
