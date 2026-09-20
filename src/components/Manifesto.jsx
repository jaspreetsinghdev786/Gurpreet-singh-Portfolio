import { Reveal } from "./ui/reveal"
import { manifesto } from "../content/site"

/**
 * The page's central statement, and the entry into its single light zone.
 * No backdrop image: the line stands on its own.
 */
export const Manifesto = () => (
  <section className="bg-ivory">
    <Reveal className="mx-auto max-w-4xl px-6 py-32 text-center md:py-44">
      <div className="mx-auto h-px w-16 rule-gold" aria-hidden="true" />
      <p className="display mt-10 text-[clamp(1.9rem,4vw,3.1rem)] leading-[1.25] text-balance text-dark-text">
        {manifesto.line}
      </p>
      <p className="mx-auto mt-8 max-w-[44ch] text-[18px] leading-[1.7] text-cream-muted">
        {manifesto.body}
      </p>
    </Reveal>
  </section>
)
