import { useEffect, useRef, useState } from "react"
import { Link } from "react-router"
import { AnimatePresence, motion, useInView } from "motion/react"
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from "@phosphor-icons/react"
import { Photo } from "../ui/photo"
import { Tilt } from "../ui/Tilt"
import { useCompactLayout, useSceneMotion } from "../site/DepthProvider"

const works = [
  { id: 8, label: "Portraiture", title: "The face. The story.", alt: "Portrait study of a young man in a peach turban and navy clothing", to: "/work/portraiture", position: "50% 35%" },
  { id: "12-paint", label: "Painted histories", title: "Memory, in colour.", alt: "A detail from the Maharaja Ranjit Singh painting", to: "/work/historical", position: "50% 50%" },
  { id: "15-studio", label: "Inside the studio", title: "Where stories begin.", alt: "Gurpreet Singh drawing at his studio table", to: "/about", position: "50% 50%" },
]
const EASE = [.22, 1, .36, 1]

/** Automatic rotation stops offscreen, in hidden tabs and during interaction. */
export const HeroGallery = () => {
  const ref = useRef(null)
  const visible = useInView(ref, { amount: .2 })
  const compact = useCompactLayout()
  const reduce = useSceneMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [tabVisible, setTabVisible] = useState(true)
  const [announcement, setAnnouncement] = useState("")
  const running = visible && tabVisible && !compact && !reduce && !paused && !hovered && !focused
  const work = works[index]

  useEffect(() => {
    const update = () => setTabVisible(document.visibilityState === "visible")
    update()
    document.addEventListener("visibilitychange", update)
    return () => document.removeEventListener("visibilitychange", update)
  }, [])
  useEffect(() => {
    if (!running) return
    const timer = setInterval(() => setIndex(value => (value + 1) % works.length), 9000)
    return () => clearInterval(timer)
  }, [running])

  const select = delta => {
    const target = (index + delta + works.length) % works.length
    setIndex(target)
    setPaused(true)
    setAnnouncement(`${works[target].label}, ${target + 1} of ${works.length}`)
  }

  return <div ref={ref} className={`atelier-gallery atelier-live-gallery ${running ? "is-living" : ""} ${compact || reduce ? "is-still" : ""}`}
    role="region" aria-roledescription="carousel" aria-label="Selected work"
    onPointerEnter={event => { if (event.pointerType === "mouse") setHovered(true) }}
    onPointerLeave={() => setHovered(false)}
    onFocusCapture={() => setFocused(true)}
    onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false) }}>
    <div className="atelier-gallery-heading"><span>SELECTED WORK</span><span>A PERSONAL ARCHIVE</span></div>
    <div className="atelier-live-stage">
      <div className="atelier-backplate" aria-hidden="true" />
      <div className="atelier-main">
        <div className="atelier-drift atelier-drift-main">
          <Tilt className="atelier-portrait-tilt" restX={0} restY={-1}>
            <Link to={work.to} className="atelier-portrait" data-cursor="view" aria-label={`Explore ${work.label}`}>
              <div className="atelier-portrait-reveal">
                <AnimatePresence initial={false} mode="wait">
                  <motion.div key={work.id} className="atelier-live-image"
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0 }}
                    transition={{ duration: reduce ? 0 : .4, ease: EASE }}>
                    <Photo id={work.id} alt={work.alt} position={work.position} priority={index === 0} sizes="(max-width:760px) 80vw, 38vw" />
                  </motion.div>
                </AnimatePresence>
              </div>
              <span className="atelier-plate"><span>{String(index + 1).padStart(2, "0")} / {work.label}</span><ArrowUpRight size={16} aria-hidden="true" /></span>
            </Link>
          </Tilt>
        </div>
      </div>
      <span className="atelier-stage-note" aria-hidden="true">Painting. Photography. Life.</span>
    </div>
    <div className="atelier-live-caption">
      <div><span className="atelier-live-number">{String(index + 1).padStart(2, "0")} / 03</span><p>{work.title}</p></div>
      <div className="atelier-live-controls">
        {!compact && !reduce && <button type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? "Play artwork rotation" : "Pause artwork rotation"}>{paused ? <Play size={14} /> : <Pause size={14} />}</button>}
        <button type="button" onClick={() => select(-1)} aria-label="Previous artwork"><ArrowLeft size={17} /></button>
        <button type="button" onClick={() => select(1)} aria-label="Next artwork"><ArrowRight size={17} /></button>
      </div>
    </div>
    <p className="sr-only" role="status" aria-live="polite">{announcement}</p>
  </div>
}
