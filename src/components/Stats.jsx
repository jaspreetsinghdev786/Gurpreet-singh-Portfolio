import { Reveal } from "./ui/reveal"
import { stats } from "../content/site"

/** The short intro: four figures, each with a line of context. */
export const Stats = () => (
  <section aria-label="At a glance" className="border-b border-gold/15 bg-charcoal">
    <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-y-12 px-6 py-16 md:grid-cols-4 md:divide-x md:divide-ivory/10 lg:px-8">
      {stats.map(({ value, label }, i) => (
        <Reveal key={label} delay={i * 0.06} className="px-2 md:px-8">
          <dd className="display text-[2.6rem] leading-none text-gold-light md:text-[3rem]">{value}</dd>
          <dt className="mt-3 text-[15px] leading-snug text-muted">{label}</dt>
        </Reveal>
      ))}
    </dl>
  </section>
)
