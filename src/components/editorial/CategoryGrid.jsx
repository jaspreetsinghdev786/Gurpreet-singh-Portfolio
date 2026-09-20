import { Link } from "react-router"
import { ArrowRight } from "@phosphor-icons/react"
import { RevealImage, Reveal } from "../ui/reveal"
import { Photo } from "../ui/photo"
import { TiltCard } from "../ui/TiltCard"

/** Alternating lead/support pairs; captions and route links stay with the image. */
export const CategoryGrid = ({ categories, linkBase, tone = "dark", counts, lead: withLead = true }) => {
  const light = tone === "light"
  return (
    <ul className="depth-category-grid editorial-category-grid">
      {categories.map((c, i) => {
        const lead = withLead ? i % 4 === 0 || i % 4 === 3 : i % 2 === 0
        const body = (
          <>
            <RevealImage delay={(i % 2) * 0.07} seed={i} className="category-image">
              <Photo
                id={c.photo.id}
                alt={c.photo.alt}
                width={lead ? 1600 : 700}
                sizes={lead ? "(max-width: 1024px) 100vw, 760px" : "(max-width: 640px) 100vw, 360px"}
                className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />
            </RevealImage>
            <Reveal delay={(i % 3) * 0.07 + 0.1}>
              <div className="mt-6 flex items-start justify-between gap-4">
                <div>
                  <h3 className={`display text-[1.6rem] leading-tight ${light ? "text-dark-text" : "text-ivory"}`}>{c.title}</h3>
                  <p className={`mt-3 max-w-[40ch] text-[15.5px] leading-[1.7] ${light ? "text-cream-muted" : "text-muted"}`}>{c.desc}</p>
                  {counts && counts[c.slug] != null && (
                    <p className={`mt-3 font-mono text-[12px] ${light ? "text-gold" : "text-gold-light"}`}>{counts[c.slug]} works</p>
                  )}
                </div>
                {linkBase && (
                  <ArrowRight
                    size={18}
                    aria-hidden="true"
                    className={`mt-2 shrink-0 transition-all duration-300 group-hover:translate-x-1 ${light ? "text-dark-text/30 group-hover:text-gold" : "text-ivory/30 group-hover:text-gold-light"}`}
                  />
                )}
              </div>
            </Reveal>
          </>
        )
        return (
          <li key={c.slug} className={lead ? "is-featured" : ""}>
            {linkBase ? (
              <Link to={`${linkBase}/${c.slug}`} className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light">
                <TiltCard delay={(i % 3) * .08}>{body}</TiltCard>
              </Link>
            ) : (
              <div className="group"><TiltCard delay={(i % 3) * .08}>{body}</TiltCard></div>
            )}
          </li>
        )
      })}
    </ul>
  )
}

