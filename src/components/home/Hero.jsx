import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { Link } from "react-router"
import { ArrowUpRight, ArrowDown } from "@phosphor-icons/react"
import { useCompactLayout, useSceneMotion } from "../site/DepthProvider"
import { Photo } from "../ui/photo"
import { HeroGallery } from "./HeroGallery"
import { Magnetic } from "../ui/Magnetic"
import "./immersive.css"
import "./atelier-hero.css"

const EASE = [0.22, 1, 0.36, 1]

export const Hero = () => {
  const ref = useRef(null)
  const compact = useCompactLayout()
  const reduce = useSceneMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const textY = useTransform(scrollYProgress, [0, 1], [0, -12])
  const zoom = useTransform(scrollYProgress, [0, 1], [1, 1.055])
  const entrance = delay => ({
    initial: reduce ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0 : 1.05, delay: reduce ? 0 : delay, ease: EASE },
  })

  return (
    <section ref={ref} id="top" className="atelier-hero" aria-labelledby="atelier-title">
      <motion.div className="atelier-atmosphere" aria-hidden="true" style={compact || reduce ? undefined : { scale: zoom }}>
        <Photo id="hero" alt="" sizes="100vw" />
      </motion.div>
      <div className="atelier-topline"><span>THE ART OF REMEMBERING</span><span>BATHINDA, PUNJAB / INDIA</span></div>
      <div className="atelier-layout">
        <motion.div className="atelier-copy" style={compact || reduce ? undefined : { y: textY }}>
          <motion.p {...entrance(.15)} className="atelier-eyebrow">GURPREET SINGH · ARTIST & EDUCATOR</motion.p>
          <h1 id="atelier-title" className="atelier-title" aria-label="A life in art. A world in every stroke.">
            {["A life in art.", "A world", "in every stroke."].map((line, index) => (
              <span className="atelier-line" key={line} aria-hidden="true">
                <motion.span {...entrance(.28 + index * .14)}>{index === 1 ? <em>{line}</em> : line}</motion.span>
              </span>
            ))}
          </h1>
          <motion.p {...entrance(.7)} className="atelier-description">Through paint, portraiture and the stories of Punjab, I preserve what time leaves behind.</motion.p>
          <motion.div {...entrance(.85)} className="atelier-actions">
            <Magnetic><Link to="/work" className="atelier-cta">Explore the collection <ArrowUpRight size={19} aria-hidden="true" /></Link></Magnetic>
            <Link to="/about" className="atelier-story">Meet the artist <ArrowUpRight size={16} aria-hidden="true" /></Link>
          </motion.div>
          <motion.div {...entrance(1)} className="atelier-note"><span>Painting. Photography. Memory.</span><span>Rooted in Punjab. Open to the world.</span></motion.div>
        </motion.div>
        <HeroGallery />
      </div>
      <div className="atelier-bottom"><a href="#about"><ArrowDown size={16} aria-hidden="true" /> SCROLL TO DISCOVER</a><span>AN ONGOING CONVERSATION WITH TIME</span><span>01 — 08</span></div>
    </section>
  )
}
