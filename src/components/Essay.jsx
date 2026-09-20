import { RevealImage, Reveal } from "./ui/reveal"
import { Section, SectionHeading } from "./ui/section"
import { Photo } from "./ui/photo"
import { essay } from "../content/site"

/**
 * A four-frame photo essay on a deliberate, unequal grid: the first frame
 * is a tall portrait, the second runs wide, the last two share a row. Each
 * frame is numbered and titled like a plate in a book.
 */
const LAYOUT = [
  "md:col-span-4 aspect-[4/5] md:aspect-auto",
  "md:col-span-8 aspect-[16/10]",
  "md:col-span-5 aspect-[4/3]",
  "md:col-span-7 aspect-[16/10]",
]

export const Essay = () => (
  <Section id="essay">
    <SectionHeading title={essay.heading} intro={essay.intro} />

    <ol className="mt-16 grid gap-6 md:grid-cols-12 md:gap-8">
      {essay.frames.map((f, i) => (
        <li key={f.n} className={LAYOUT[i].split(" ").filter((c) => c.startsWith("md:col")).join(" ")}>
          <figure className="flex h-full flex-col">
            <RevealImage
              delay={i * 0.06}
              className={`w-full flex-1 ${LAYOUT[i].split(" ").filter((c) => !c.startsWith("md:col")).join(" ")}`}
            >
              <Photo
                id={f.photo.id}
                alt={f.photo.alt}
                width={1600}
                sizes="(max-width: 768px) 100vw, 800px"
                className="h-full w-full object-cover"
              />
            </RevealImage>
            <Reveal delay={i * 0.06 + 0.1}>
              <figcaption className="mt-4 flex items-baseline gap-4">
                <span className="font-mono text-[13px] text-gold">{f.n}</span>
                <span className="text-[12px] tracking-[0.2em] text-muted uppercase">{f.label}</span>
              </figcaption>
            </Reveal>
          </figure>
        </li>
      ))}
    </ol>
  </Section>
)
