import { useCallback, useMemo, useState } from "react"
import { useSearchParams } from "react-router"
import { ArrowDown, ListBullets, SquaresFour } from "@phosphor-icons/react"
import { Seo } from "../components/site/Seo"
import { PageHero } from "../components/editorial/PageHero"
import { ArchiveGrid, ArchiveList } from "../components/editorial/ArchiveGrid"
import { ArchiveLightbox } from "../components/editorial/ArchiveLightbox"
import { ArchiveQuote } from "../components/editorial/ArchiveQuote"
import { Reveal } from "../components/ui/reveal"
import { heroArtwork } from "../content/heroArtwork"
import { archiveFilters, archiveItems, archiveOpener, archiveQuote } from "../content/archive"
import "./archive.css"

const filterCounts = Object.fromEntries(archiveFilters.map(({ key }) => [
  key, key === "all" ? archiveItems.length : archiveItems.filter(item => item.tags.includes(key)).length,
]))

export const Archive = () => {
  const [params, setParams] = useSearchParams()
  const [mode, setMode] = useState("grid")
  const [open, setOpen] = useState(null)
  const active = archiveFilters.some(f => f.key === params.get("view")) ? params.get("view") : "all"
  const items = useMemo(() => active === "all" ? archiveItems : archiveItems.filter(item => item.tags.includes(active)), [active])
  const activeLabel = archiveFilters.find(f => f.key === active).label
  const close = useCallback(() => setOpen(null), [])
  const step = useCallback(delta => setOpen(i => i === null || !items.length ? null : (i + delta + items.length) % items.length), [items.length])
  const select = key => {
    close()
    setParams(previous => {
      const next = new URLSearchParams(previous)
      if (key === "all") next.delete("view")
      else next.set("view", key)
      return next
    })
  }
  const Wall = mode === "grid" ? ArchiveGrid : ArchiveList

  return (
    <div className="archive-page">
      <Seo title="Archive" description="A visual record of people, places, history, photography, cultural life, paintings, events and memory." path="/archive" image="/gallery/opt/2-1600.webp" />
      <PageHero artwork={heroArtwork.archive} eyebrow="The archive / A continuing record"
        title={<>The moments<br /><em className="archive-hero-accent">that remain.</em></>}
        lead={archiveOpener.standfirst} words={["People", "Places", "Art", "Memory"]} />

      <section className="archive-gallery bg-ivory" id="archive-collection" aria-labelledby="archive-collection-title">
        <div className="archive-container">
          <Reveal className="archive-introduction">
            <div>
              <p className="archive-eyebrow">01 / The collected record</p>
              <h2 id="archive-collection-title">Collected along<br /><em>the way.</em></h2>
            </div>
            <div className="archive-introduction-note">
              <p>From the quiet of the studio to the life beyond it. Paintings, photographs and encounters, held together as a personal record of people and place.</p>
              <a href="#archive-filters">Browse the archive <ArrowDown size={16} aria-hidden="true" /></a>
            </div>
          </Reveal>

          <div className="archive-controls" id="archive-filters">
            <div className="archive-controls-top">
              <p className="archive-eyebrow">Explore by subject</p>
              <span className="archive-total">{String(archiveItems.length).padStart(2, "0")} records / {archiveFilters.length - 1} subjects</span>
            </div>
            <div role="group" aria-label="Filter the archive" className="archive-filters">
              {archiveFilters.map(filter => (
                <button key={filter.key} type="button" onClick={() => select(filter.key)}
                  aria-pressed={filter.key === active} aria-controls="archive-results"
                  className={`archive-filter ${filter.key === active ? "is-active" : ""}`}>
                  {filter.key === "all" ? "All records" : filter.label}
                  <span aria-hidden="true">{String(filterCounts[filter.key]).padStart(2, "0")}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="archive-results-bar">
            <p className="archive-results-count" role="status" aria-live="polite" aria-atomic="true">
              <span>{active === "all" ? "The complete archive" : activeLabel}</span>
              {items.length} {items.length === 1 ? "record" : "records"}
            </p>
            <div className="archive-views" role="group" aria-label="How the archive is shown">
              <button type="button" onClick={() => setMode("grid")} aria-pressed={mode === "grid"} aria-controls="archive-results">
                <SquaresFour size={17} weight={mode === "grid" ? "fill" : "regular"} aria-hidden="true" /> Gallery
              </button>
              <button type="button" onClick={() => setMode("list")} aria-pressed={mode === "list"} aria-controls="archive-results">
                <ListBullets size={17} aria-hidden="true" /> Index
              </button>
            </div>
          </div>
          <div id="archive-results" className="archive-results">
            <Wall key={`${active}-${mode}`} items={items} onOpen={setOpen} />
          </div>
          <div className="archive-endnote"><span>A living archive. An ongoing story.</span><a href="#archive-filters">Back to subjects <ArrowDown size={14} aria-hidden="true" /></a></div>
        </div>
      </section>

      <ArchiveQuote lines={archiveQuote.lines} attribution={archiveQuote.attribution} index={archiveQuote.index} />
      <ArchiveLightbox items={items} index={open} onClose={close} onStep={step} />
    </div>
  )
}
