import { Reveal } from "../ui/reveal"
import { Gap } from "./Gap"

/**
 * Chronological honours, grouped by year so that two awards in 1997 or 2007
 * share one year mark. Older entries are given exactly the same weight as
 * recent ones: the chronology is part of the story.
 */
export const AwardTimeline = ({ awards, tone = "light" }) => {
  const light = tone === "light"
  const groups = []
  for (const a of awards) {
    const key = a.year ?? "undated"
    const g = groups.find((x) => x.key === key)
    if (g) g.items.push(a)
    else groups.push({ key, year: a.year, items: [a] })
  }
  return (
    <ol className="divide-y divide-charcoal/10">
      {groups.map((g, i) => (
        <li key={g.key} className="grid gap-4 py-8 md:grid-cols-[8rem_1fr] md:gap-10">
          <Reveal delay={Math.min(i, 5) * 0.04}>
            <span className={`display text-[1.9rem] leading-none ${light ? "text-gold" : "text-gold-light"}`}>
              {g.year ?? <Gap tone={tone}>Year not specified</Gap>}
            </span>
          </Reveal>
          <ul className="space-y-6">
            {g.items.map((a) => (
              <li key={a.title + a.by}>
                <Reveal delay={Math.min(i, 5) * 0.04 + 0.05}>
                  <h3 className={`display text-[1.3rem] leading-snug ${light ? "text-dark-text" : "text-ivory"}`}>{a.title}</h3>
                  <p className={`mt-1.5 max-w-[60ch] text-[15px] leading-relaxed ${light ? "text-cream-muted" : "text-muted"}`}>{a.by}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  )
}
