import { Link } from "react-router"
import { RevealImage, Reveal } from "../ui/reveal"
import { Photo } from "../ui/photo"
import { TiltCard } from "../ui/TiltCard"
import { Gap } from "./Gap"

/**
 * One artwork in a listing. Renders whatever metadata exists and marks the
 * rest, so a half-catalogued work never looks finished.
 */
export const ArtworkCard = ({ work, index = 0, tone = "dark" }) => {
  const light = tone === "light";
  const cover = work.images?.[0]
  return (
    <li>
      <Link to={`/work/${work.category}/${work.slug}`} className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light">
        <TiltCard delay={(index % 3) * .08}>
        <RevealImage delay={(index % 3) * 0.06} seed={index} className={`aspect-[4/5] ${light ? "bg-ivory-deep" : "bg-charcoal-800"}`}>
          {cover ? (
            <Photo id={cover.id} alt={cover.alt} sizes="(max-width: 640px) 100vw, 360px" className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.03]" />
          ) : (
            <div className="flex h-full items-center justify-center"><Gap>Image to be added</Gap></div>
          )}
        </RevealImage>
        <Reveal delay={(index % 3) * 0.06 + 0.08}>
          <h3 className={`display mt-5 text-[1.3rem] leading-snug ${light ? "text-dark-text" : "text-ivory"}`}>{work.title ?? <Gap>Title to be added</Gap>}</h3>
          <p className={`mt-1.5 text-[14px] ${light ? "text-cream-muted" : "text-muted"}`}>
            {[work.year, work.medium].filter(Boolean).join(", ") || <Gap>Year and medium to be added</Gap>}
          </p>
        </Reveal>
        </TiltCard>
      </Link>
    </li>
  )
}
