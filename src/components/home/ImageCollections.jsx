import { useState } from "react"
import { ArrowUpRight, Plus } from "@phosphor-icons/react"
import { Link } from "react-router"
import { Reveal, RevealImage } from "../ui/reveal"
import { Photo } from "../ui/photo"
import { imageCollections, exhibitionCollection } from "../../content/collections"
import "./collections.css"

const CollectionCard = ({ item, section, featured = false }) => (
  <Link to={section.href} className="collection-print" data-cursor="view" aria-label={`Explore ${section.eyebrow}: ${item.caption}`}>
    <figure>
      <RevealImage variant={featured ? "curtain" : "focus"} className="collection-print__image">
        <Photo id={item.id} alt={item.alt} width={featured ? 1600 : 700}
          sizes={featured ? "(max-width:760px) 90vw, 60vw" : "(max-width:760px) 90vw, 28vw"}
          className="h-full w-full object-cover" />
      </RevealImage>
      <figcaption><span><small>{section.eyebrow}</small><strong>{item.caption}</strong></span><ArrowUpRight size={18} aria-hidden="true" /></figcaption>
    </figure>
  </Link>
)

const CollectionSection = ({ section }) => {
  const [expanded, setExpanded] = useState(false)
  const [lead, ...support] = section.items
  const remainder = support.slice(2)
  return <section id={`collection-${section.id}`} className="collection-chapter" aria-labelledby={`collection-heading-${section.id}`}>
    <Reveal className="collection-chapter__heading">
      <div><p className="editorial-eyebrow">{section.number} / {section.eyebrow}</p><h2 id={`collection-heading-${section.id}`}>{section.title} <em>{section.accent.trim()}</em></h2></div>
      <div><p>{section.intro}</p><Link className="editorial-link" to={section.href}>Explore collection <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
    </Reveal>
    <div className="collection-composition">
      <div className="collection-composition__lead"><CollectionCard item={lead} section={section} featured /></div>
      <div className="collection-composition__support">{support.slice(0,2).map(item => <CollectionCard item={item} section={section} key={item.id} />)}</div>
    </div>
    {remainder.length > 0 && <>
      <button className="collection-more" type="button" aria-expanded={expanded} aria-controls={`collection-more-${section.id}`} onClick={() => setExpanded(value => !value)}>
        {expanded ? "Show selected images" : `View ${remainder.length} more from this collection`} <Plus size={17} style={{ transform:expanded ? "rotate(45deg)" : undefined }} aria-hidden="true" />
      </button>
      <div id={`collection-more-${section.id}`} className="collection-remainder" hidden={!expanded}>{expanded && remainder.map(item => <CollectionCard key={item.id} item={item} section={section} />)}</div>
    </>}
  </section>
}

export const ImageCollections = () => {
  const [selected, setSelected] = useState(imageCollections[0].id)
  const section = imageCollections.find(item => item.id === selected)
  return <div id="collections" className="curated-collections bg-ivory">
    <div className="editorial-container">
      <div className="collection-selector-heading"><p className="editorial-eyebrow">04 / Explore the collections</p><span>Seven ways of seeing</span></div>
      <div className="collection-selector" role="group" aria-label="Choose a collection">
        {imageCollections.map(item => <button key={item.id} type="button" aria-pressed={selected === item.id} aria-controls="selected-collection" onClick={() => setSelected(item.id)}>{item.eyebrow === "In the studio" ? "Behind the scenes" : item.id === "people-stories" ? "People stories" : item.title}</button>)}
      </div>
      <div id="selected-collection"><CollectionSection key={selected} section={section} /></div>
    </div>
  </div>
}

export const ExhibitionCollection = () => <div className="curated-collections bg-ivory"><div className="editorial-container"><CollectionSection section={exhibitionCollection} /></div></div>
