import { Link } from "react-router"
import { ArrowRight } from "@phosphor-icons/react"
import { motion } from "motion/react"
import { Reveal } from "../ui/reveal"
import { useSceneMotion } from "../site/DepthProvider"
import { soloExhibitions, awards } from "../../content/record"
import { practice } from "../../content/site"

const Column = ({ heading, items, to, linkLabel, delay = 0 }) => {
  const reduce = useSceneMotion()

  return (
    <div>
      <Reveal variant="clip" delay={delay}>
        <h2 className="display text-[clamp(1.9rem,3vw,2.5rem)] leading-tight text-dark-text">{heading}</h2>
      </Reveal>

      <ol className="mt-9">
        {items.map(({ year, title, where }, index) => (
          <motion.li
            key={year + title}
            className="grid grid-cols-[3.5rem_1.5rem_1fr] pb-8 last:pb-0"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: reduce ? 0 : 0.72, delay: reduce ? 0 : index * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              className="pt-1 text-[12.5px] tracking-[0.08em] text-gold"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: reduce ? 0 : 0.55, delay: reduce ? 0 : index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {year}
            </motion.span>

            <span aria-hidden="true" className="relative flex justify-center">
              <span className="mt-[0.45rem] size-[5px] shrink-0 rounded-full bg-charcoal/45" />
              {index < items.length - 1 && (
                <motion.span
                  className="absolute top-[0.9rem] bottom-[-2rem] w-px origin-top bg-charcoal/20"
                  initial={reduce ? false : { scaleY: 0 }}
                  whileInView={reduce ? undefined : { scaleY: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: reduce ? 0 : 0.9, delay: reduce ? 0 : index * 0.1 + 0.12, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </span>

            <motion.span
              className="pb-1"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: reduce ? 0 : 0.65, delay: reduce ? 0 : index * 0.1 + 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="block text-[16px] leading-snug text-dark-text">{title}</span>
              {where && <span className="mt-1 block max-w-[46ch] text-[14px] leading-[1.55] text-cream-muted">{where}</span>}
            </motion.span>
          </motion.li>
        ))}
      </ol>

      <Link
        to={to}
        className="group mt-9 inline-flex items-center gap-3 text-[11px] tracking-[0.22em] text-gold uppercase transition-colors hover:text-dark-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
      >
        {linkLabel}
        <ArrowRight size={13} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  )
}

export const Record = () => {
  const shows = [...soloExhibitions]
    .map((group) => {
      const year = group.year ?? group.venues[group.venues.length - 1].year
      const where = group.venues.map((venue) => venue.venue).join("; ")
      return { year, title: "Solo exhibition, " + group.country, where }
    })
    .sort((a, b) => b.year.localeCompare(a.year))

  const honours = awards
    .filter((award) => award.year && /^\d{4}$/.test(award.year))
    .sort((a, b) => b.year.localeCompare(a.year))
    .slice(0, 4)
    .map((award) => ({ year: award.year, title: award.title, where: award.by }))

  return (
    <section id="record" className="bg-ivory">
      <div className="mx-auto max-w-[84rem] px-6 lg:px-8 2xl:max-w-[100rem] 2xl:px-16">
        <div className="grid gap-16 border-t border-charcoal/15 pt-16 md:grid-cols-2 md:gap-0 md:pt-20">
          <div className="md:pr-14 lg:pr-20">
            <Column heading="Solo exhibitions" items={shows} to="/exhibitions" linkLabel="Full exhibition record" />
          </div>
          <div className="border-charcoal/15 md:border-l md:pl-14 lg:pl-20">
            <Column heading="Recognition" items={honours} to="/achievements" linkLabel="All awards and honours" delay={0.08} />
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-6 py-10 sm:flex-row sm:items-end sm:justify-between">
          <p className="font-script max-w-[14ch] text-[22px] leading-[1.25] text-dark-text/45">{practice.closing.note}</p>
          <div className="flex items-center gap-8">
            <span className="hidden h-px w-40 bg-charcoal/20 lg:block xl:w-72" aria-hidden="true" />
            <ul className="flex flex-wrap items-center gap-x-3 text-[10px] tracking-[0.26em] text-dark-text/45 uppercase">
              {practice.closing.words.map((word, index) => (
                <li key={word} className="flex items-center gap-3">
                  {index > 0 && <span className="text-gold/60" aria-hidden="true">/</span>}
                  {word}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
