import { useRef } from "react"
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react"
import { ArrowRight } from "@phosphor-icons/react"
import { Reveal, RevealWords } from "./ui/reveal"
import { hero, cta, img } from "../content/site"

export const Hero = () => {
  const art = img(hero.photo.id, { width: 1600 })
  const ref = useRef(null)
  const reduce = useReducedMotion()

  // Slow drift on the photograph as the hero leaves, driven by a motion value
  // rather than a scroll listener.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"])

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate flex min-h-[calc(100dvh-4rem)] flex-col justify-center overflow-hidden"
    >
      <motion.img
        src={art.src}
        srcSet={`${art.srcSet}, /gallery/opt/${hero.photo.id}-2400.webp 2400w`}
        sizes="100vw"
        alt={hero.photo.alt}
        fetchPriority="high"
        decoding="sync"
        style={reduce ? undefined : { y }}
        className="absolute inset-0 -z-20 h-[112%] w-full object-cover object-[74%_20%] md:object-[70%_24%]"
      />

      {/* The scrim is lighter over the painting than before so it stays part of
          the picture; the left third is where the type needs the contrast. */}
      <div
        className="absolute inset-0 -z-10 hidden md:block"
        aria-hidden="true"
        style={{
          background:
            "rgba(59,72,102,0.68)",
        }}
      />
      <div
        className="absolute inset-0 -z-10 md:hidden"
        aria-hidden="true"
        style={{
          background:
            "rgba(59,72,102,0.78)",
        }}
      />

      <div className="px-6 pt-20 pb-16 md:px-16 lg:px-20">
        <div className="max-w-2xl">
          <motion.p
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[12px] font-medium tracking-[0.3em] text-gold-light uppercase"
          >
            {hero.eyebrow}
          </motion.p>

          <h1 className="display mt-7 max-w-[14ch] text-[clamp(3rem,6.2vw,5rem)] leading-[1.04] text-ivory">
            <RevealWords text={hero.title} delay={0.15} />
          </h1>

          <Reveal delay={0.6}>
            <p className="mt-8 max-w-[44ch] text-[17px] leading-[1.75] font-light text-ivory/78 md:text-lg">
              {hero.body}
            </p>
          </Reveal>

          <Reveal delay={0.72} className="mt-11 flex flex-wrap gap-4">
            <a
              href="#work"
              className="group inline-flex items-center gap-2.5 bg-gold px-8 py-4 text-[12px] font-medium tracking-[0.16em] text-dark-text uppercase transition-transform hover:-translate-y-px active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light"
            >
              {cta.work}
              <ArrowRight size={14} weight="bold" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#about"
              className="inline-flex items-center border border-ivory/35 px-8 py-4 text-[12px] font-medium tracking-[0.16em] text-ivory uppercase transition-colors hover:border-gold-light hover:text-gold-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light"
            >
              {cta.about}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
