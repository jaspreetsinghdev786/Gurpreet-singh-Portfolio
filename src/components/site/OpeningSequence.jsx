import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { useLenis } from "lenis/react"
import { useSceneMotion } from "./DepthProvider"

let opened = false

/** Progress reflects settled opening images and fonts, not a simulated timer. */
export const OpeningSequence = () => {
  const reduce = useSceneMotion()
  const lenis = useLenis()
  const [visible, setVisible] = useState(!opened)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (opened || reduce) { setVisible(false); return }
    let cancelled = false
    let done = false
    let exitTimer
    const cleanups = []
    const finish = () => {
      if (cancelled || done) return
      done = true
      opened = true
      exitTimer = setTimeout(() => { if (!cancelled) setVisible(false) }, 220)
    }
    const images = [...document.querySelectorAll('main img[fetchpriority="high"]')]
    let settled = 0
    const total = images.length + 1
    const complete = () => {
      if (cancelled || done) return
      settled += 1
      setProgress(Math.round(settled / total * 100))
      if (settled === total) finish()
    }
    images.forEach(img => {
      if (img.complete) { complete(); return }
      const onDone = () => { cleanup(); complete() }
      const cleanup = () => { img.removeEventListener("load", onDone); img.removeEventListener("error", onDone) }
      img.addEventListener("load", onDone, { once:true })
      img.addEventListener("error", onDone, { once:true })
      cleanups.push(cleanup)
    })
    Promise.resolve(document.fonts?.ready).then(complete, complete)
    const deadline = setTimeout(finish, 4000)
    return () => { cancelled = true; clearTimeout(deadline); clearTimeout(exitTimer); cleanups.forEach(cleanup => cleanup()) }
  }, [reduce])

  useEffect(() => {
    if (!visible || reduce) return
    const previous = document.body.style.overflow
    const stopped = lenis?.isStopped
    document.body.style.overflow = "hidden"
    lenis?.stop()
    return () => { document.body.style.overflow = previous; if (!stopped) lenis?.start() }
  }, [visible, reduce, lenis])

  return <AnimatePresence>{visible && !reduce && <motion.div className="opening-sequence"
    exit={{ opacity:0, y:"-3%" }} transition={{ duration:.65, ease:[.22,1,.36,1] }} aria-hidden="true">
    <div><span className="opening-sequence__name">Gurpreet Singh</span><span className="opening-sequence__subtitle">ARTIST & EDUCATOR</span>
      <div className="opening-sequence__track"><motion.span animate={{ scaleX:progress / 100 }} transition={{ duration:.3 }} /></div>
      <p><span>Opening the collection</span><span>{progress}%</span></p>
    </div>
  </motion.div>}</AnimatePresence>
}
