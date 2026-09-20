import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "motion/react"
import { useSceneMotion } from "./DepthProvider"

const EASE = [0.22, 1, 0.36, 1]

export const CustomCursor = () => {
  const reduce = useSceneMotion()
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [viewing, setViewing] = useState(false)
  const lastLink = useRef(null)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 520, damping: 42, mass: 0.22 })
  const springY = useSpring(y, { stiffness: 520, damping: 42, mass: 0.22 })

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 761px)")
    const update = () => setEnabled(media.matches)
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    if (!enabled || reduce) return undefined
    document.body.classList.add("has-site-cursor")

    const clearLink = () => {
      lastLink.current?.classList.remove("cursor-trail")
      lastLink.current = null
    }

    const move = event => {
      x.set(event.clientX)
      y.set(event.clientY)
      setVisible(true)

      const target = event.target instanceof Element ? event.target : null
      const image = target?.closest("[data-cursor='view']") || (target?.closest("img") && !target.closest("img")?.closest(".site-header, .sf"))
      setViewing(Boolean(image))

      const link = target?.closest("a")
      const isTextLink = link && !link.querySelector("img") && !link.matches(".button-fill, [aria-label*='home']")
      if (lastLink.current !== link) clearLink()
      if (isTextLink) {
        const bounds = link.getBoundingClientRect()
        link.style.setProperty("--cursor-line-x", (event.clientX - bounds.left) + "px")
        link.classList.add("cursor-trail")
        lastLink.current = link
      }
    }

    const leave = () => {
      setVisible(false)
      setViewing(false)
      clearLink()
    }

    window.addEventListener("pointermove", move, { passive: true })
    window.addEventListener("blur", leave)
    document.addEventListener("pointerleave", leave)
    return () => {
      window.removeEventListener("pointermove", move)
      window.removeEventListener("blur", leave)
      document.removeEventListener("pointerleave", leave)
      clearLink()
      document.body.classList.remove("has-site-cursor")
    }
  }, [enabled, reduce, x, y])

  if (!enabled || reduce) return null

  return (
    <motion.div
      className="site-cursor"
      aria-hidden="true"
      style={{ x: springX, y: springY }}
      animate={{
        opacity: visible ? 1 : 0,
        width: viewing ? 68 : 9,
        height: viewing ? 68 : 9,
        scale: visible ? 1 : 0.82,
        backgroundColor: viewing ? "#3b4866" : "#f5efea",
        borderColor: viewing ? "#d7a69c" : "#f5efea",
      }}
      transition={{ duration: 0.28, ease: EASE }}
    >
      {viewing && <span>VIEW ART</span>}
    </motion.div>
  )
}
