import { ArrowRight, MagnifyingGlassPlus } from "@phosphor-icons/react"
import { RevealImage } from "../ui/reveal"
import { Photo } from "../ui/photo"
import { TiltCard } from "../ui/TiltCard"
import { archiveFilters } from "../../content/archive"

const tagLabel = key => archiveFilters.find(filter => filter.key === key)?.label || key

/**
 * The hang.
 *
 * Three compact columns on desktop, two on tablets and one on phones.
 * Frame proportions follow each record's format, with a height cap so portrait
 * images remain comfortable to browse. The full image opens in the viewer.
 *
 * Every plate is a button: the whole card opens the viewer, and the loupe in
 * the corner is the visible affordance for it.
 */

const Loupe = () => (
  <span className="ah-loupe" aria-hidden="true">
    <MagnifyingGlassPlus size={17} weight="regular" />
  </span>
)

const Empty = () => (
  <p className="ah-empty py-24 text-center text-[15px] text-ivory/50">
    Nothing under this filter yet. Choose another view.
  </p>
)

export const ArchiveGrid = ({ items, onOpen }) => {
  if (!items.length) return <Empty />

  return (
    <ul className="ah-hang">
      {items.map((item, i) => (
        <li key={item.id} className="ah-card" data-format={item.size}>
          <TiltCard delay={(i % 3) * .08}>
          <button type="button" className="ah-card-btn" data-cursor="view" onClick={() => onOpen(i)}>
            <span className="ah-card-media">
              <RevealImage className="ah-frame" curtain="bg-charcoal" seed={i}>
                <Photo
                  id={item.id}
                  alt={item.alt}
                  width={700}
                  sizes="(max-width: 560px) 90vw, (max-width: 1023px) 44vw, (max-width: 1216px) 29vw, 363px"
                />
              </RevealImage>
              <Loupe />
            </span>

            <span className="ah-card-foot">
              <span className="ah-card-lines">
                <span className="ah-card-caption">{item.caption}</span>
                <span className="ah-card-tag">{String(i + 1).padStart(2, "0")} / {tagLabel(item.tags[0])}</span>
              </span>
              <span className="ah-card-arrow" aria-hidden="true">
                <ArrowRight size={16} weight="regular" />
              </span>
            </span>

            <span className="sr-only">View larger: {item.alt}</span>
          </button>
          </TiltCard>
        </li>
      ))}
    </ul>
  )
}

/**
 * The same wall as a reading list: numbered, one line to an item, with a small
 * plate held at the left. It is the view for scanning what the archive holds
 * rather than looking at it.
 */
export const ArchiveList = ({ items, onOpen }) => {
  if (!items.length) return <Empty />

  return (
    <ol className="ah-list">
      {items.map((item, i) => (
        <li key={item.id}>
          <button type="button" className="ah-row" onClick={() => onOpen(i)}>
            <span className="ah-row-no">{String(i + 1).padStart(2, "0")}</span>
            <span className="ah-row-thumb">
              <Photo id={item.id} alt="" width={700} sizes="120px" />
            </span>
            <span className="ah-row-caption">{item.caption}</span>
            <span className="ah-row-tags">{item.tags.join(" · ")}</span>
            <span className="ah-row-arrow" aria-hidden="true">
              <ArrowRight size={16} weight="regular" />
            </span>
            <span className="sr-only">View larger: {item.alt}</span>
          </button>
        </li>
      ))}
    </ol>
  )
}
