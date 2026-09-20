import { useEffect, useRef } from "react"
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "motion/react"
import { Reveal } from "../ui/reveal"
import { stats } from "../../content/site"

const Counter = ({ value }) => {
  const target = Number.parseInt(value, 10)
  const suffix = value.slice(String(target).length)
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.65 })
  const count = useMotionValue(reduce ? target : 0)
  const rounded = useTransform(count, (current) => Math.round(current))

  useEffect(() => {
    if (reduce) {
      count.set(target)
      return undefined
    }
    if (!inView) return undefined
    const controls = animate(count, target, { duration: 1.65, ease: [0.16, 1, 0.3, 1] })
    return () => controls.stop()
  }, [count, inView, reduce, target])

  return (
    <dd ref={ref} className="display text-[2.6rem] leading-none text-gold-light md:text-[3rem]" aria-label={value}>
      <motion.span aria-hidden="true">{rounded}</motion.span>{suffix}
    </dd>
  )
}

/** Four figures animate once when they enter the reading area. */
export const Stats = () => (
  <section aria-label="At a glance" className="border-b border-gold/15 bg-ivory">
    <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-y-12 px-6 py-16 md:grid-cols-4 md:divide-x md:divide-charcoal/12 lg:px-8">
      {stats.map(({ value, label }, i) => (
        <Reveal key={label} delay={i * 0.06} className="px-2 md:px-8">
          <Counter value={value} />
          <dt className="mt-3 text-[15px] leading-snug text-cream-muted">{label}</dt>
        </Reveal>
      ))}
    </dl>
  </section>
)
