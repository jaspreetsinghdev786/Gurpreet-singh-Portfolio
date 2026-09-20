import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigation } from "react-router"
import { AnimatePresence, motion } from "motion/react"
import { useSceneMotion } from "./DepthProvider"
import { BrandScreen } from "./BrandScreen"

const EASE = [0.22, 1, 0.36, 1]

export const NavigationTransition = () => {
  const { pathname } = useLocation()
  const navigation = useNavigation()
  const reduce = useSceneMotion()
  const previousPath = useRef(pathname)
  const pendingRef = useRef(false)
  const timer = useRef(null)
  const [cover, setCover] = useState(false)
  const pending = navigation.state !== "idle" && navigation.location?.pathname !== pathname

  useEffect(() => {
    window.clearTimeout(timer.current)

    if (pending) {
      pendingRef.current = true
      setCover(true)
      return
    }

    if (previousPath.current !== pathname) {
      previousPath.current = pathname
      pendingRef.current = false
      setCover(true)
      timer.current = window.setTimeout(() => setCover(false), reduce ? 0 : 120)
      return () => window.clearTimeout(timer.current)
    }

    if (pendingRef.current) {
      pendingRef.current = false
      timer.current = window.setTimeout(() => setCover(false), reduce ? 0 : 120)
    }

    return () => window.clearTimeout(timer.current)
  }, [pending, pathname, reduce])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  return (
    <AnimatePresence>
      {cover && (
        <motion.div
          className="navigation-transition"
          initial={reduce ? { opacity: 0 } : { y: "100%" }}
          animate={reduce ? { opacity: 1 } : { y: "0%" }}
          exit={reduce ? { opacity: 0 } : { y: "-100%" }}
          transition={{ duration: reduce ? 0.08 : 0.44, ease: EASE }}
          aria-hidden="true"
        >
          <BrandScreen overlay message="A new chapter in the archive" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
