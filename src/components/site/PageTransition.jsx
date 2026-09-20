import { useEffect, useRef } from "react"
import { motion, useReducedMotion } from "motion/react"

let firstPage = true
const EASE = [0.22, 1, 0.36, 1]

export const PageTransition = ({ children }) => {
  const reduce = useReducedMotion()
  const skip = useRef(firstPage)

  useEffect(() => {
    firstPage = false
  }, [])

  return (
    <motion.div
      initial={reduce || skip.current ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? undefined : { opacity: 0, y: -10, transition: { duration: 0.24, ease: EASE } }}
      transition={{ duration: reduce ? 0 : 0.68, delay: reduce || skip.current ? 0 : 0.08, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}
