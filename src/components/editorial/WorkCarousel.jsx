import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { CaretLeft, CaretRight } from "@phosphor-icons/react"
import { useSceneMotion } from "../site/DepthProvider"
import { Photo } from "../ui/photo"

const pad = (n) => String(n).padStart(2, "0")

// Image, caption, and navigation each have their own space at every width.
export const WorkCarousel = ({ frames, label = "Works", tone = "light" }) => {
  const [index, setIndex] = useState(0)
  const reduce = useSceneMotion()
  const count = frames.length
  if (!count) return null
  const i = index % count
  const frame = frames[i]
  const light = tone === "light"
  const go = (delta) => setIndex(n => (n + delta + count) % count)
  const onKeyDown = (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault()
      go(event.key === "ArrowLeft" ? -1 : 1)
    }
  }
  const control = `grid size-12 shrink-0 place-items-center rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold disabled:opacity-40 ${
    light
      ? "border-charcoal/30 text-dark-text hover:border-gold hover:bg-gold/10"
      : "border-ivory/30 text-ivory hover:border-gold-light hover:bg-gold/10"
  }`

  return (
    <div className="work-carousel min-w-0" role="group" aria-roledescription="carousel" aria-label={label}
      tabIndex={0} onKeyDown={onKeyDown}>
      <figure className="overflow-hidden rounded-sm bg-charcoal">
        <div className="work-carousel-media relative isolate aspect-[4/3] w-full overflow-hidden sm:aspect-[16/9] lg:aspect-[2/1]">
          <AnimatePresence initial={false} mode="wait">
            <motion.div key={frame.id} className="absolute inset-0" aria-hidden="true"
              initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : .35, ease: [0.16, 1, 0.3, 1] }}>
              <Photo id={frame.id} alt="" width={1600} sizes="(max-width: 640px) 90vw, (max-width: 1024px) 100vw, 980px"
                className="h-full w-full object-contain" />
            </motion.div>
          </AnimatePresence>
          <span className="sr-only">{frame.alt}</span>
        </div>
        <figcaption className="work-carousel-caption px-5 py-5 sm:px-7 sm:py-6" aria-live="polite" aria-atomic="true">
          <span className="block h-px w-10 bg-gold" aria-hidden="true" />
          <p className="display mt-3 text-[1.25rem] leading-snug text-ivory [overflow-wrap:anywhere] sm:text-2xl">{frame.title}</p>
          <p className="mt-2 max-w-[60ch] text-[15px] leading-relaxed text-ivory/75 [overflow-wrap:anywhere]">{frame.note}</p>
          <span className="sr-only">Frame {i + 1} of {count}.</span>
        </figcaption>
      </figure>
      <div className="work-carousel-navigation mt-4 flex items-center justify-between gap-4">
        <div className={`flex min-w-0 flex-1 items-center gap-3 text-[11px] tracking-[0.16em] ${light ? "text-cream-muted" : "text-muted"}`}>
          <span className={light ? "text-gold" : "text-gold-light"}>{pad(i + 1)}</span>
          <span aria-hidden="true" className={`h-px min-w-4 max-w-32 flex-1 ${light ? "bg-charcoal/20" : "bg-ivory/20"}`}>
            <span className="block h-px bg-gold transition-[width] duration-300" style={{ width: `${((i + 1) / count) * 100}%` }} />
          </span>
          <span>{pad(count)}</span>
        </div>
        <div className="flex shrink-0 gap-2">
          <button type="button" onClick={() => go(-1)} aria-label="Previous frame" disabled={count < 2} className={control}>
            <CaretLeft size={18} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next frame" disabled={count < 2} className={control}>
            <CaretRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}
