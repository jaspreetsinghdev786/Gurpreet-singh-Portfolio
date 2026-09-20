import { Fragment, useId } from "react"
import { motion } from "motion/react"
import { useCompactLayout, useSceneMotion } from "../site/DepthProvider"
const EASE = [0.16, 1, 0.3, 1]
const VIEW = { once: true, amount: 0.01, margin: "80px 0px 80px 0px" }

const REVEAL_STATES = {
  lift: { hidden: { opacity: 0, y: 28, rotateX: 3 }, shown: { opacity: 1, y: 0, rotateX: 0 } },
  left: { hidden: { opacity: 0, x: -38, y: 8 }, shown: { opacity: 1, x: 0, y: 0 } },
  right: { hidden: { opacity: 0, x: 38, y: 8 }, shown: { opacity: 1, x: 0, y: 0 } },
  clip: { hidden: { opacity: 0.5, y: 10, clipPath: "inset(0 0 100% 0)" }, shown: { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" } },
  rotate: { hidden: { opacity: 0, y: 20, rotate: -2.2 }, shown: { opacity: 1, y: 0, rotate: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.94 }, shown: { opacity: 1, scale: 1 } },
  soft: { hidden: { opacity: 0, y: 14, filter: "blur(4px)" }, shown: { opacity: 1, y: 0, filter: "blur(0px)" } },
}

export const Reveal = ({ children, delay = 0, className, y = 16, variant = "lift" }) => {
  const reduce = useSceneMotion()
  const compact = useCompactLayout()
  const states = compact
    ? { hidden: { opacity: 0, y: 12 }, shown: { opacity: 1, y: 0 } }
    : variant === "lift"
    ? { hidden: { opacity: 0, y }, shown: { opacity: 1, y: 0 } }
    : (REVEAL_STATES[variant] || REVEAL_STATES.lift)
  const duration = variant === "soft" ? 1.15 : variant === "clip" ? 0.95 : 0.82
  return (
    <motion.div className={className} initial={reduce ? false : "hidden"} whileInView="shown"
      animate={reduce ? "shown" : undefined} variants={states}
      viewport={{ once: true, amount: 0.05, margin: "80px 0px 80px 0px" }}
      transition={{ duration: reduce ? 0 : duration, delay: reduce ? 0 : Math.min(delay, 0.42), ease: EASE }}>
      {children}
    </motion.div>
  )
}
// The frame owns layout. Its animated layer is absolutely contained so intrinsic
// image dimensions and transforms cannot resize a grid row or cover a caption.
export const REVEALS = ["curtain", "wipe", "wipe-right", "split", "blinds", "rise", "tilt", "tilt-left", "expand", "focus", "slow-zoom", "sheen", "liquid", "turn"]
const IMAGE_STATES = {
  curtain: { clipPath: "inset(0 0 12% 0)", opacity: .65 },
  wipe: { clipPath: "inset(0 10% 0 0)", opacity: .65 },
  rise: { y: 8, opacity: .65 },
  focus: { opacity: .45 },
}
export const RevealImage = ({ children, className = "", delay = 0, variant, colorReveal = false }) => {
  const reduce = useSceneMotion()
  const compact = useCompactLayout()
  const id = useId()
  const kind = variant || (id.length % 2 ? "curtain" : "wipe")
  const hidden = compact ? IMAGE_STATES.focus : (IMAGE_STATES[kind] || IMAGE_STATES.curtain)
  return <div className={`scroll-depth image-frame ${className}`} data-image-reveal={kind}>
    <motion.div className="image-frame__surface" data-color-reveal={colorReveal ? "shown" : undefined}
      initial={reduce ? false : hidden}
      whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0 0)" }}
      animate={reduce ? { opacity: 1, y: 0, clipPath: "inset(0 0 0 0)" } : undefined}
      viewport={VIEW}
      transition={{ duration: reduce ? 0 : .85, delay: reduce ? 0 : Math.min(delay, .2), ease: EASE }}>
      {children}
    </motion.div>
  </div>
}

export const RevealWords = ({ text, className, delay = 0, accentFrom, accentClassName = "text-gold-light" }) => {
  const reduce = useSceneMotion()
  const words = String(text).trim().split(/\s+/)
  return (
    <motion.span className={className} aria-label={text}
      initial={reduce ? false : "hidden"} whileInView="shown" animate={reduce ? "shown" : undefined}
      viewport={{ once: true, amount: 0.45 }}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.055, delayChildren: reduce ? 0 : delay } } }}>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <Fragment key={word + "-" + i}>
            <motion.span className={"word-reveal inline-block " + (accentFrom !== undefined && i >= accentFrom ? accentClassName : "")}
              variants={{ hidden: { y: "110%", opacity: 0 }, shown: { y: "0%", opacity: 1, transition: { duration: 0.72, ease: EASE } } }}>
              {word}
            </motion.span>{i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    </motion.span>
  )
}
