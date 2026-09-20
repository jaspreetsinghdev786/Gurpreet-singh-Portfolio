import { Reveal } from "../ui/reveal"

/**
 * Chapter opener for internal pages: hairline, then the H2. No eyebrow; the
 * page's single eyebrow lives in its hero. `intro` is optional and short.
 */
export const SectionTitle = ({ title, intro, tone = "dark", align = "left", as: Tag = "h2" }) => {
  const light = tone === "light"
  const centered = align === "center"
  return (
    <Reveal className={centered ? "text-center" : ""}>
      <div className={`h-px w-16 rule-gold ${centered ? "mx-auto" : ""}`} aria-hidden="true" />
      <Tag
        className={`display mt-6 max-w-[18ch] text-[clamp(2.2rem,4vw,3.25rem)] leading-[1.08] text-balance ${
          light ? "text-dark-text" : "text-ivory"
        } ${centered ? "mx-auto" : ""}`}
      >
        {title}
      </Tag>
      {intro && (
        <p className={`mt-6 max-w-[52ch] text-[17px] leading-[1.75] ${light ? "text-cream-muted" : "text-muted"} ${centered ? "mx-auto" : ""}`}>
          {intro}
        </p>
      )}
    </Reveal>
  )
}
