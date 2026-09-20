import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { useCompactLayout, useSceneMotion } from "../site/DepthProvider"
import { Reveal, RevealWords } from "../ui/reveal"
import { HeroArtwork } from "./HeroArtwork"

/** A page-specific artwork composition beside a readable, responsive opener. */
export const PageHero = ({ eyebrow, title, lead, sub, words, artwork, tone = "dark" }) => {
  const light = tone === "light"
  const ref = useRef(null)
  const reduce = useSceneMotion()
  const compact = useCompactLayout()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 25])
  const y = useTransform(scrollYProgress, [0, 1], [0, 45])

  return (
    <section ref={ref} className={`depth-page-hero ${light ? "bg-ivory" : "bg-charcoal"} border-b ${light ? "border-charcoal/12" : "border-gold/15"}`}>
      <motion.div className="page-orbits" aria-hidden="true" style={reduce || compact ? undefined : { rotate, y }}><i /><i /><i /></motion.div>
      <div className="page-hero-layout relative z-10">
        <div className="page-hero-copy">
          {eyebrow && <Reveal><p className={`text-[11px] font-medium tracking-[0.3em] uppercase ${light ? "text-gold" : "text-gold-light"}`}>{eyebrow}</p></Reveal>}
          <h1 className={`display mt-6 text-balance ${light ? "text-dark-text" : "text-ivory"}`}>
            {typeof title === "string" ? <RevealWords text={title} delay={0.1} /> : title}
          </h1>
          {sub && <Reveal delay={.15}><p className={`page-hero-sub mt-6 uppercase ${light ? "text-cream-muted" : "text-muted"}`}>{sub}</p></Reveal>}
          {lead && <Reveal delay={.2}><p className={`page-hero-lead ${light ? "text-cream-muted" : "text-ivory/70"}`}>{lead}</p></Reveal>}
          {words && <ul className="page-hero-words">{words.map(word => <li key={word}>{word}</li>)}</ul>}
        </div>
        {artwork && <HeroArtwork artwork={artwork} />}
      </div>
    </section>
  )
}
