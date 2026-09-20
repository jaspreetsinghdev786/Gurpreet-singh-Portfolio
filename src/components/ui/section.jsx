import { Reveal } from "./reveal"

/**
 * Every section shares one container width and one vertical rhythm, so the
 * page reads as a single system instead of nine independently-spaced blocks.
 *
 * `tone` selects a surface within the locked dark theme. "light" is reserved
 * for the single ivory zone in the middle of the page (quote through
 * exhibitions) and is never used to alternate section by section.
 */
export const Section = ({ id, tone = "dark", bordered = true, className = "", children }) => {
  const tones = {
    dark: "bg-charcoal",
    deep: "bg-charcoal-800",
    light: "bg-ivory",
  }
  return (
    <section
      id={id}
      className={`${bordered ? "border-b border-gold/15" : ""} ${tones[tone]} ${className}`}
    >
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-36 lg:px-8">{children}</div>
    </section>
  )
}

/**
 * Section opener. `eyebrow` is deliberately optional and rationed: only the
 * hero, Selected Work and Exhibitions carry one. Everything else opens on the
 * headline with a hairline above it, which sets the section without adding
 * another uppercase label to the page.
 */
export const SectionHeading = ({
  eyebrow,
  title,
  intro,
  tone = "dark",
  align = "left",
  className = "",
}) => {
  const light = tone === "light"
  const centered = align === "center"
  return (
    <Reveal className={`${centered ? "text-center" : ""} ${className}`}>
      <div className={`h-px w-16 rule-gold ${centered ? "mx-auto" : ""}`} aria-hidden="true" />
      {eyebrow && (
        <p
          className={`mt-6 text-[11px] font-medium tracking-[0.28em] uppercase ${
            light ? "text-gold" : "text-gold-light"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`display mt-5 max-w-[18ch] text-[clamp(2.6rem,4.4vw,3.5rem)] leading-[1.08] text-balance ${
          light ? "text-dark-text" : "text-ivory"
        } ${centered ? "mx-auto" : ""}`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-7 max-w-[52ch] text-[17px] leading-[1.75] ${
            light ? "text-cream-muted" : "text-muted"
          } ${centered ? "mx-auto" : ""}`}
        >
          {intro}
        </p>
      )}
    </Reveal>
  )
}
