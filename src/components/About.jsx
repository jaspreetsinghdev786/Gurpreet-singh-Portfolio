import { ArrowRight } from "@phosphor-icons/react"
import { Reveal, RevealImage } from "./ui/reveal"
import { Section, SectionHeading } from "./ui/section"
import { Photo } from "./ui/photo"
import { about } from "../content/site"

/**
 * Text beside a large studio photograph: the artist at work, looking away
 * from the camera, in a 3:4 frame that runs taller than the text column.
 */
export const About = () => (
  <Section id="about">
    <div className="grid gap-16 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-24">
      <div>
        <SectionHeading title={about.heading} />

        <Reveal delay={0.08} className="mt-10 space-y-6 text-[17px] leading-[1.8] text-muted">
          {about.paragraphs.map((p) => (
            <p key={p.slice(0, 24)} className="max-w-[54ch]">
              {p}
            </p>
          ))}
        </Reveal>

        <Reveal delay={0.14}>
          <a
            href="#exhibitions"
            className="group mt-12 inline-flex items-center gap-3 text-[12px] tracking-[0.18em] text-gold-light uppercase transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light"
          >
            {about.link}
            <ArrowRight size={14} weight="bold" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>

      <RevealImage className="aspect-[3/4] w-full">
        <Photo
          id={about.photo.id}
          alt={about.photo.alt}
          width={1600}
          sizes="(max-width: 1024px) 100vw, 560px"
          className="h-full w-full object-cover"
        />
      </RevealImage>
    </div>
  </Section>
)
