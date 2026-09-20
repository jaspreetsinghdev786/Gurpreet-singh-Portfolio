import { Reveal } from "../ui/reveal"
import { Gap } from "./Gap"

/**
 * Vertical timeline: a hairline spine, a mono date column, then title and
 * detail. Used for education, experience, workshops and public art.
 *
 * items: [{ when, title, detail, body }]  where any field may be null.
 */
/** `dated={false}` drops the date column for lists the source does not date. */
export const Timeline = ({ items, tone = "dark", dated = true }) => {
  const light = tone === "light"
  return (
    <ol className={`depth-timeline relative border-l ${light ? "border-charcoal/15" : "border-ivory/12"} ml-2 md:ml-0`}>
      {items.map((item, i) => (
        <li key={`${item.when}-${item.title}`} className={`relative pl-8 md:pl-12 ${dated ? "md:grid md:grid-cols-[9rem_1fr] md:gap-8" : ""}`}>
          <Reveal delay={Math.min(i, 6) * 0.05}>
            <span
              className={`absolute top-2 -left-[3px] h-[5px] w-[5px] ${light ? "bg-gold" : "bg-gold-light"}`}
              aria-hidden="true"
            />
            {dated && (
              <span className={`block font-mono text-[13px] ${light ? "text-gold" : "text-gold-light"}`}>
                {item.when ?? <span className={light ? "text-dark-text/35" : "text-ivory/30"}>Undated</span>}
              </span>
            )}
          </Reveal>
          <Reveal delay={Math.min(i, 6) * 0.05 + 0.04} className={`pb-10 ${dated ? "pt-3 md:pt-0" : "-mt-1"}`}>
            <h3 className={`display text-[1.35rem] leading-snug ${light ? "text-dark-text" : "text-ivory"}`}>{item.title}</h3>
            {item.detail !== undefined && (
              <p className={`mt-1.5 text-[15px] ${light ? "text-cream-muted" : "text-muted"}`}>
                {item.detail ?? <Gap tone={tone}>Institution to be added</Gap>}
              </p>
            )}
            {item.body && (
              <p className={`mt-3 max-w-[54ch] text-[15px] leading-[1.75] ${light ? "text-cream-muted" : "text-muted"}`}>{item.body}</p>
            )}
          </Reveal>
        </li>
      ))}
    </ol>
  )
}

