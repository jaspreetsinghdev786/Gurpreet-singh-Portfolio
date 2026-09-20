import { RevealImage, Reveal } from "./ui/reveal"
import { Section, SectionHeading } from "./ui/section"
import { Photo } from "./ui/photo"
import { featured } from "../content/site"

/**
 * One featured portrait, then three categories. The categories are not
 * portfolio cards: each is a heading and a sentence about what that body of
 * work is for, with a photograph beside it.
 */
export const FeaturedWork = () => (
  <Section id="work">
    <SectionHeading title={featured.heading} intro={featured.intro} />

    <figure className="mt-16">
      <RevealImage className="aspect-[4/3] md:aspect-[16/9] lg:aspect-[2/1]">
        <Photo
          id={featured.lead.photo.id}
          alt={featured.lead.photo.alt}
          width={1600}
          sizes="(max-width: 1024px) 100vw, 1100px"
          className="h-full w-full object-cover object-[50%_30%]"
        />
      </RevealImage>
      <figcaption className="mt-4 text-[14px] text-ivory/45">{featured.lead.caption}</figcaption>
    </figure>

    <ul className="mt-20 grid gap-x-8 gap-y-16 md:grid-cols-3">
      {featured.categories.map((c, i) => (
        <li key={c.title}>
          <RevealImage delay={i * 0.08} className="aspect-[4/5]">
            <Photo
              id={c.photo.id}
              alt={c.photo.alt}
              sizes="(max-width: 768px) 100vw, 360px"
              className="h-full w-full object-cover"
            />
          </RevealImage>
          <Reveal delay={i * 0.08 + 0.1}>
            <h3 className="display mt-7 text-[1.6rem] leading-tight text-ivory">{c.title}</h3>
            <p className="mt-3 max-w-[38ch] text-[16px] leading-[1.7] text-muted">{c.desc}</p>
          </Reveal>
        </li>
      ))}
    </ul>
  </Section>
)
