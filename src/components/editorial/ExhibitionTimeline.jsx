import { motion } from "motion/react"
import { Reveal } from "../ui/reveal"
import { useSceneMotion } from "../site/DepthProvider"

/** Country and dates draw on in sequence as one calm exhibition timeline. */
export const ExhibitionTimeline = ({ groups, tone = "light" }) => {
  const light = tone === "light"
  const reduce = useSceneMotion()
  const headingTone = light ? "text-dark-text" : "text-ivory"
  const bodyTone = light ? "text-dark-text/75" : "text-ivory/70"
  const lineTone = light ? "bg-charcoal/15" : "bg-ivory/20"

  return (
    <ol className="grid gap-x-16 gap-y-14 md:grid-cols-2">
      {groups.map((group, groupIndex) => (
        <li key={group.country} className="relative border-t pt-8">
          <motion.span
            aria-hidden="true"
            className={"absolute inset-x-0 top-0 h-px origin-left " + lineTone}
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={reduce ? undefined : { scaleX: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: reduce ? 0 : 1.05, delay: reduce ? 0 : groupIndex * 0.12, ease: [0.22, 1, 0.36, 1] }}
          />
          <Reveal variant="left" delay={(groupIndex % 2) * 0.08}>
            <div className="flex items-baseline justify-between gap-6">
              <h3 className={"display text-[1.75rem] leading-none " + headingTone}>{group.country}</h3>
              {group.year && <span className={"font-mono text-[14px] " + (light ? "text-gold" : "text-gold-light")}>{group.year}</span>}
            </div>
          </Reveal>
          <ul className="mt-7 space-y-4">
            {group.venues.map((venue, venueIndex) => (
              <motion.li
                key={(venue.year ?? group.year ?? "undated") + "-" + venue.venue}
                className="grid grid-cols-[4rem_1fr] gap-4"
                initial={reduce ? false : { opacity: 0, y: 10 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: reduce ? 0 : 0.65, delay: reduce ? 0 : groupIndex * 0.08 + venueIndex * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className={"font-mono text-[13px] " + (light ? "text-gold" : "text-gold-light")}>{venue.year ?? ""}</span>
                <span className={"text-[16px] leading-snug " + bodyTone}>{venue.venue}</span>
              </motion.li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  )
}
