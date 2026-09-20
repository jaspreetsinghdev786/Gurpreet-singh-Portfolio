import { Reveal } from "../ui/reveal"

/**
 * A typographic index for lists of terms (specialisations, research
 * interests): no boxes, no icons, a two- or three-column run of serif lines
 * with a hairline between rows.
 */
export const TypeGrid = ({ items, tone = "light", columns = 3 }) => {
  const light = tone === "light"
  const cols = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[columns]
  return (
    <ul className={`depth-type-grid grid gap-x-12 ${cols}`}>
      {items.map((t, i) => (
        <li key={t}>
          <Reveal delay={(i % columns) * 0.04} className={`border-t py-5 ${light ? "border-charcoal/12" : "border-ivory/12"}`}>
            <span className={`display text-[1.3rem] leading-snug ${light ? "text-dark-text" : "text-ivory"}`}>{t}</span>
          </Reveal>
        </li>
      ))}
    </ul>
  )
}

