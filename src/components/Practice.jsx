import { Reveal } from "./ui/reveal"
import { practice } from "../content/site"

/**
 * Six bodies of work as a two-column index: the name carries the weight, one
 * sentence says what the work is for. No icons, no boxes.
 */
export const Practice = () => (
  <section id="practice" className="bg-ivory">
    <div className="mx-auto max-w-6xl px-6 pb-24 md:pb-32 lg:px-8">
      <Reveal>
        <div className="h-px w-16 rule-gold" aria-hidden="true" />
        <h2 className="display mt-6 text-[clamp(2.6rem,4.4vw,3.5rem)] leading-[1.08] text-dark-text">
          {practice.heading}
        </h2>
      </Reveal>

      <ul className="mt-14 grid gap-x-20 md:grid-cols-2">
        {practice.items.map((item, i) => (
          <li key={item.title}>
            <Reveal delay={(i % 2) * 0.06} className="border-t border-charcoal/12 py-9">
              <h3 className="display text-[1.75rem] leading-tight text-dark-text">{item.title}</h3>
              <p className="mt-3 max-w-[44ch] text-[16px] leading-[1.7] text-cream-muted">{item.desc}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  </section>
)
