import { Reveal } from "../ui/reveal"

/** A pull quote as a full-width pause. Three lines at most on desktop. */
export const QuoteBlock = ({ text, attribution, tone = "light" }) => {
  const light = tone === "light"
  return (
    <section className={light ? "bg-ivory" : "bg-charcoal-800"}>
      <Reveal className="mx-auto max-w-4xl px-6 py-28 text-center md:py-36">
        <div className="mx-auto h-px w-16 rule-gold" aria-hidden="true" />
        <blockquote className="mt-10">
          <p className={`display text-[clamp(1.7rem,3.6vw,2.75rem)] leading-[1.3] text-balance italic ${light ? "text-dark-text" : "text-ivory"}`}>
            “{text}”
          </p>
        </blockquote>
        {attribution && (
          <p className={`mt-8 text-[11px] tracking-[0.28em] uppercase ${light ? "text-gold" : "text-gold-light"}`}>{attribution}</p>
        )}
      </Reveal>
    </section>
  )
}
