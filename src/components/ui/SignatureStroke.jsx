import { motion } from "motion/react"
import { useSceneMotion } from "../site/DepthProvider"

const EASE = [0.22, 1, 0.36, 1]

/** A small animated pen flourish used as an editorial signature mark. */
export const SignatureStroke = ({ className = "" }) => {
  const reduce = useSceneMotion()
  return (
    <svg className={"signature-stroke " + className} viewBox="0 0 320 42" fill="none" aria-hidden="true">
      <motion.path
        d="M3 27C22 28 24 12 35 13c7 1 5 19-1 18-7-1 0-22 12-23 9-1 4 23 13 23 8 0 14-24 22-24 7 0-5 25 4 25 10 0 16-20 24-20 7 0-3 19 5 19 9 0 13-13 22-13 7 0-4 14 5 14 17 0 25-18 37-19 10-1 1 13 9 13 10 0 17-10 27-10 7 0 7 7 1 7"
        pathLength={1}
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? false : { pathLength: 0, opacity: 0.4 }}
        whileInView={{ pathLength: 1, opacity: 0.78 }}
        animate={reduce ? { pathLength: 1, opacity: 0.78 } : undefined}
        viewport={{ once: true, amount: 0.65 }}
        transition={{ duration: reduce ? 0 : 1.55, delay: reduce ? 0 : 0.15, ease: EASE }}
      />
      <motion.path
        d="M182 35c36 2 84 1 134-4"
        pathLength={1}
        stroke="currentColor"
        strokeWidth=".8"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0, opacity: 0.25 }}
        whileInView={{ pathLength: 1, opacity: 0.58 }}
        animate={reduce ? { pathLength: 1, opacity: 0.58 } : undefined}
        viewport={{ once: true, amount: 0.65 }}
        transition={{ duration: reduce ? 0 : 1.2, delay: reduce ? 0 : 0.82, ease: EASE }}
      />
    </svg>
  )
}
