import { useCompactLayout, useSceneMotion } from "../site/DepthProvider"
import { motion, useMotionValue, useSpring } from "motion/react"
export const Tilt = (props) => {
  const compact = useCompactLayout()
  const reduce = useSceneMotion()
  if (compact || reduce) return <div className={props.className}>{props.children}</div>
  return <PointerTilt {...props} />
}
const PointerTilt = ({ children, className = "", restX = 0, restY = 0 }) => {
  const x = useMotionValue(restX), y = useMotionValue(restY)
  const rotateX = useSpring(x, { stiffness: 150, damping: 24 })
  const rotateY = useSpring(y, { stiffness: 150, damping: 24 })
  const reset = () => { x.set(restX); y.set(restY) }
  const clamp = value => Math.max(-3, Math.min(3, value))
  return <motion.div className={className} style={{ rotateX, rotateY, transformPerspective: 1100, transformStyle: "preserve-3d" }}
    onPointerMove={e => {
      if (e.pointerType !== "mouse") return
      const r = e.currentTarget.getBoundingClientRect()
      x.set(clamp(restX - ((e.clientY - r.top) / r.height - .5) * 3))
      y.set(clamp(restY + ((e.clientX - r.left) / r.width - .5) * 4))
    }} onPointerLeave={reset} onPointerCancel={reset}>{children}</motion.div>
}
