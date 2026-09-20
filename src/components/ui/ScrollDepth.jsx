import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "motion/react"
import { useCompactLayout, useSceneMotion } from "../site/DepthProvider"

// Mobile retains the image reveal itself, without a second continuous scroll
// animation whose transform would be disabled by the mobile stylesheet.
export const ScrollDepth = (props) => {
  const compact = useCompactLayout()
  const reduce = useSceneMotion()
  if (compact || reduce) return <div className={`scroll-depth ${props.className || ""}`}>
    <div className="depth-surface h-full w-full">{props.children}</div>
  </div>
  return <MovingDepth {...props} />
}
const MovingDepth = ({ children, className = "", direction = 1 }) => {
  const ref = useRef(null)
  const nearby = useInView(ref, { margin: "200px 0px 200px 0px" })
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const rotateX = useTransform(scrollYProgress, [0, .45, 1], [2, 0, -1.5])
  const rotateY = useTransform(scrollYProgress, [0, .5, 1], [-1 * direction, 0, 1 * direction])
  const y = useTransform(scrollYProgress, [0, .5, 1], [14, 0, -14])
  const scale = useTransform(scrollYProgress, [0, .45, 1], [.99, 1, 1.015])
  return <div ref={ref} className={`scroll-depth ${className}`}>
    <motion.div className="depth-surface h-full w-full" style={nearby ? { rotateX, rotateY, y, scale, transformPerspective: 1400 } : undefined}>{children}</motion.div>
  </div>
}
