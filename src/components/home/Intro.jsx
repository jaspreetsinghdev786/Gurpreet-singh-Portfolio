import { Link } from "react-router"
import { ArrowUpRight } from "@phosphor-icons/react"
import { Reveal, RevealImage } from "../ui/reveal"
import { Photo } from "../ui/photo"
import { about, practiceFeature } from "../../content/site"

export const Intro = () => (
  <section id="about" className="editorial-story bg-ivory">
    <div className="editorial-container editorial-story__layout">
      <figure>
        <RevealImage variant="curtain" className="editorial-story__image">
          <Photo {...practiceFeature.lead.photo} width={1600} sizes="(max-width:760px) 90vw, 54vw" className="h-full w-full object-cover" />
        </RevealImage>
        <figcaption className="editorial-caption"><span>01 / Inside the studio</span><span>{practiceFeature.lead.year}</span></figcaption>
      </figure>
      <Reveal className="editorial-story__copy">
        <p className="editorial-eyebrow">The artist / Rooted in Punjab</p>
        <h2>{about.heading}</h2>
        {about.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        <Link to="/about" className="editorial-link">{about.link} <ArrowUpRight size={18} aria-hidden="true" /></Link>
      </Reveal>
    </div>
  </section>
)
