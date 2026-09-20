import { RevealImage, Reveal } from "../ui/reveal"
import { Photo } from "../ui/photo"

/**
 * A single large photograph with a caption beneath it. Used as a full-width
 * visual pause between chapters. `aspect` is a Tailwind aspect class.
 */
export const ImageFeature = ({ photo, caption, aspect = "aspect-[16/9] md:aspect-[21/9]", tone = "dark", bleed = false }) => (
  <figure className={bleed ? "" : "mx-auto max-w-6xl px-6 lg:px-8"}>
    <RevealImage className={`${aspect} w-full`}>
      <Photo id={photo.id} alt={photo.alt} width={1600} sizes="100vw" className="h-full w-full object-cover" />
    </RevealImage>
    {caption && (
      <Reveal>
        <figcaption
          className={`mt-4 text-[14px] ${bleed ? "mx-auto max-w-6xl px-6 lg:px-8" : ""} ${
            tone === "light" ? "text-cream-muted" : "text-muted"
          }`}
        >
          {caption}
        </figcaption>
      </Reveal>
    )}
  </figure>
)
