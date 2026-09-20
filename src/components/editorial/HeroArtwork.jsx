import { Photo } from "../ui/photo"
import { RevealImage } from "../ui/reveal"
import "./hero-artwork.css"

/** One opening image gives each page a clear visual subject. */
export const HeroArtwork = ({ artwork }) => (
  <figure className={`editorial-hero-art ${artwork.landscape ? "editorial-hero-art--wide" : ""}`}>
    <RevealImage variant="curtain" className="editorial-hero-art__image">
      <Photo {...artwork.main} priority sizes="(max-width:760px) 90vw, 50vw" className="h-full w-full object-cover" />
    </RevealImage>
    <figcaption><span>{artwork.label}</span><p>{artwork.note}</p></figcaption>
  </figure>
)
