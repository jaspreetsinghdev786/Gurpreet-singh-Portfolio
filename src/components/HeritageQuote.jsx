import { Reveal } from "./ui/reveal"
import { Photo } from "./ui/photo"
import { heritageQuote, site } from "../content/site"

/**
 * Opens the page's single light zone. bordered edges are omitted on purpose:
 * this section, Specialisation and Exhibitions read as one continuous ivory
 * wall, so the theme switches exactly once in and once out.
 */
export const HeritageQuote = () => (
  <section className="relative overflow-hidden bg-ivory">
    <Photo
      id={heritageQuote.backdrop.id}
      alt=""
      width={1600}
      sizes="100vw"
      className="absolute inset-0 h-full w-full object-cover opacity-[0.06]"
    />
    <div
      className="absolute inset-x-0 top-0 h-24 bg-charcoal/5"
      aria-hidden="true"
    />
    <Reveal className="relative mx-auto max-w-4xl px-6 py-28 text-center md:py-40">
      <blockquote>
        <p className="display text-[clamp(1.6rem,3.6vw,2.75rem)] leading-[1.35] text-balance text-dark-text italic">
          {heritageQuote.text}
        </p>
      </blockquote>
      <p className="mt-10 text-[11px] tracking-[0.28em] text-gold uppercase">{site.name}</p>
    </Reveal>
  </section>
)
