import { Reveal } from "./ui/reveal"
import { exhibitions, recognition } from "../content/site"

/** Year, title, place. Kept very clean; separated by space, not rules. */
const Record = ({ items }) => (
  <ol className="mt-10 space-y-8">
    {items.map(({ year, title, where }) => (
      <li key={year + title} className="grid grid-cols-[4.5rem_1fr] gap-6">
        <span className="font-mono pt-0.5 text-[14px] text-gold">{year}</span>
        <span>
          <span className="block text-[17px] leading-snug text-dark-text">{title}</span>
          {where && <span className="mt-1 block text-[15px] text-cream-muted">{where}</span>}
        </span>
      </li>
    ))}
  </ol>
)

export const Exhibitions = () => (
  <section id="exhibitions" className="bg-ivory">
    <div className="mx-auto max-w-6xl border-t border-charcoal/12 px-6 py-24 md:py-32 lg:px-8">
      <div className="grid gap-16 md:grid-cols-2 md:gap-24">
        <Reveal>
          <h2 className="display text-[clamp(2rem,3.2vw,2.6rem)] leading-tight text-dark-text">
            Selected exhibitions
          </h2>
          <Record items={exhibitions} />
        </Reveal>
        <div id="achievements">
          <Reveal delay={0.08}>
            <h2 className="display text-[clamp(2rem,3.2vw,2.6rem)] leading-tight text-dark-text">
              Recognition
            </h2>
            <Record items={recognition} />
          </Reveal>
        </div>
      </div>
    </div>
  </section>
)
