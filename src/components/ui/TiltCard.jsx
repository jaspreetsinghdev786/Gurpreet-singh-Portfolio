import { motion, useMotionValue, useSpring, useTransform } from "motion/react"
import { useCompactLayout, useSceneMotion } from "../site/DepthProvider"

const EASE = [0.22, 1, 0.36, 1]
const SPRING = { stiffness: 100, damping: 26, mass: .45 }

/** Entrance and pointer transforms live on different layers, keeping scroll stable. */
export const TiltCard = ({ children, className = "", delay = 0 }) => {
  const compact = useCompactLayout()
  const reduce = useSceneMotion()
  const nx = useMotionValue(0)
  const ny = useMotionValue(0)
  const lift = useMotionValue(0)
  const sx = useSpring(nx, SPRING)
  const sy = useSpring(ny, SPRING)
  const y = useSpring(lift, SPRING)
  const x = useTransform(sx, [-.5, .5], [-1, 1])
  const rotateY = useTransform(sx, [-.5, .5], [-1.5, 1.5])
  const rotateX = useTransform(sy, [-.5, .5], [1, -1])
  const reset = () => { nx.set(0); ny.set(0); lift.set(0) }

  return <motion.div className="gallery-card-reveal"
    initial={reduce ? false : { opacity: 0, y: 22, filter: compact ? "none" : "blur(3px)" }}
    whileInView={{ opacity: 1, y: 0, filter: compact ? "none" : "blur(0px)", transitionEnd: { filter: "none" } }}
    animate={reduce ? { opacity: 1, y: 0, filter: "none" } : undefined}
    viewport={{ once: true, amount: .06, margin: "60px 0px" }}
    transition={{ duration: reduce ? 0 : 1.1, delay: reduce ? 0 : delay, ease: EASE }}
    onPointerMove={event => {
      if (compact || reduce || event.pointerType !== "mouse") return
      const bounds = event.currentTarget.getBoundingClientRect()
      const px = Math.max(-.5, Math.min(.5, (event.clientX - bounds.left) / bounds.width - .5))
      const py = Math.max(-.5, Math.min(.5, (event.clientY - bounds.top) / bounds.height - .5))
      nx.set(px); ny.set(py); lift.set(-3 + py * 2)
    }} onPointerLeave={reset} onPointerCancel={reset}>
    <motion.div className={"tilt-card " + className}
      style={compact || reduce ? undefined : { x, y, rotateX, rotateY, transformPerspective: 1200, transformStyle: "preserve-3d" }}>
      {children}
    </motion.div>
  </motion.div>
}
