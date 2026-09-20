import { useMotionValue, useSpring, motion } from "motion/react"
import { useCompactLayout, useSceneMotion } from "../site/DepthProvider"

/** A stationary wrapper measures the pointer so the target never chases itself. */
export const Magnetic = ({ children, className = "", strength = 6 }) => {
  const compact = useCompactLayout()
  const reduce = useSceneMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 110, damping: 26 })
  const y = useSpring(my, { stiffness: 110, damping: 26 })
  const reset = () => { mx.set(0); my.set(0) }
  return <div className={"magnetic-wrap " + className} onPointerMove={event => {
    if (compact || reduce || event.pointerType !== "mouse") return
    const rect = event.currentTarget.getBoundingClientRect()
    mx.set(((event.clientX - rect.left) / rect.width - .5) * strength * 2)
    my.set(((event.clientY - rect.top) / rect.height - .5) * strength * 2)
  }} onPointerLeave={reset} onPointerCancel={reset}>
    <motion.div style={compact || reduce ? undefined : { x, y }}>{children}</motion.div>
  </div>
}
