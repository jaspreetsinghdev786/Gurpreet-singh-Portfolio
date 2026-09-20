import { Reveal } from "./ui/reveal"
import { icons } from "./ui/icons"
import { specialisations } from "../content/site"

/**
 * A large-type index rather than a card grid: the discipline name carries the
 * weight, the icon is a quiet marker, and a single hairline rules each entry.
 * No boxes, so it does not repeat the bento or the gallery grid.
 */
export const Specialisation = () => (
  <section className="bg-ivory">
    <div className="mx-auto max-w-6xl px-6 pb-16 md:pb-20 lg:px-8">
      <Reveal>
        <div className="h-px w-16 rule-gold" aria-hidden="true" />
        <h2 className="display mt-6 max-w-[14ch] text-[clamp(2.1rem,4.6vw,3.6rem)] leading-[1.08] text-dark-text">
          What I work in
        </h2>
      </Reveal>

      <ul className="mt-14 grid gap-x-16 sm:grid-cols-2">
        {specialisations.map(({ icon, label, desc }, i) => {
          const Icon = icons[icon]
          return (
            <li key={label}>
              <Reveal
                delay={(i % 2) * 0.06}
                className="group flex items-start gap-5 border-t border-charcoal/12 py-8"
              >
                <Icon
                  size={22}
                  weight="light"
                  aria-hidden="true"
                  className="mt-2 shrink-0 text-gold transition-transform duration-300 group-hover:-translate-y-0.5"
                />
                <div>
                  <h3 className="display text-2xl text-dark-text md:text-[1.75rem]">{label}</h3>
                  <p className="mt-2 max-w-[36ch] text-sm leading-relaxed text-cream-muted">
                    {desc}
                  </p>
                </div>
              </Reveal>
            </li>
          )
        })}
      </ul>
    </div>
  </section>
)
