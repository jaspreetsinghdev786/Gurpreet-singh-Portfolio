import { Reveal, RevealImage } from "../ui/reveal"
import { Photo } from "../ui/photo"
import { manifesto } from "../../content/site"

export const Manifesto = () => (
  <section className="editorial-moment bg-charcoal" aria-labelledby="moment-title">
    <div className="editorial-container">
      <Reveal className="editorial-moment__heading">
        <p className="editorial-eyebrow">02 / An act of remembering</p>
        <h2 id="moment-title">{manifesto.lead} <em>{manifesto.accent}.</em></h2>
      </Reveal>
      <figure>
        <RevealImage variant="slow-zoom" className="editorial-moment__image">
          <Photo {...manifesto.photo} width={1600} sizes="90vw" className="h-full w-full object-cover" />
        </RevealImage>
        <figcaption className="editorial-moment__caption"><span>{manifesto.note}</span><p>{manifesto.body}</p></figcaption>
      </figure>
    </div>
  </section>
)
