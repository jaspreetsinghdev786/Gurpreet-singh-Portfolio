import { Link } from "react-router"
import { MapPin, Images, ChalkboardSimple, PaintBrush, ChatsCircle, ArrowRight } from "@phosphor-icons/react"
import { Seo } from "../components/site/Seo"
import { PageHero } from "../components/editorial/PageHero"
import { heroArtwork } from "../content/heroArtwork"
import { Gap } from "../components/editorial/Gap"
import { SocialLinks } from "../components/editorial/SocialLinks"
import { ContactForm } from "../components/contact/ContactForm"
import { Reveal, RevealImage } from "../components/ui/reveal"
import { Photo } from "../components/ui/photo"
import {
  contactHero,
  location,
  openFor,
  contactAside,
  institutional,
  closingCta,
  socials,
} from "../content/contact"

const OPEN_FOR_ICONS = {
  exhibitions: Images,
  workshops: ChalkboardSimple,
  commissions: PaintBrush,
  research: ChatsCircle,
}

const scrollToForm = () =>
  document.getElementById("enquiry-form")?.scrollIntoView({ behavior: "smooth", block: "start" })

/**
 * The contact page.
 *
 * The form itself is unchanged: it validates on submit, moves focus to the
 * first error, and reports plainly when no delivery endpoint is configured
 * rather than pretending an enquiry was sent. Everything here is the frame
 * around it.
 *
 * The page carries one contact label, "Enquire", the same one the header uses,
 * so the closing band does not introduce a second name for the same action.
 * Email, phone and social links stay absent until real ones exist: the page
 * shows a gap where each belongs instead of inventing a detail.
 */
export const Contact = () => {
  const hasSocials = socials.some((s) => s.href)

  return (
    <>
      <Seo
        title="Contact"
        description="Start a conversation with Gurpreet Singh about exhibitions, collaborations, workshops, cultural projects, art education, commissions or research."
        path="/contact"
        image="/gallery/opt/17-1600.webp"
      />

      <PageHero
        eyebrow={contactHero.eyebrow}
        title={<>{contactHero.titleParts.lead} <em>{contactHero.titleParts.accent}.</em></>}
        lead={contactHero.body}
        artwork={heroArtwork.contact}
      />

      {/* The form, and what the studio is open for */}
      <section id="enquiry-form" className="bg-charcoal">
        <div className="mx-auto max-w-[84rem] px-6 py-20 md:py-24 lg:px-8 2xl:max-w-[100rem] 2xl:px-16">
          <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.42fr)] lg:gap-20">
            <ContactForm />

            <aside className="space-y-12 lg:border-l lg:border-gold/15 lg:pl-14">
              <Reveal>
                <div className="flex items-start gap-3">
                  <MapPin size={18} aria-hidden="true" className="mt-1 shrink-0 text-gold" />
                  <div>
                    <h2 className="text-[15px] leading-tight text-ivory">{location.heading}</h2>
                    <p className="mt-1.5 text-[14px] text-muted">
                      {location.city}, {location.region}
                    </p>
                    <p className="mt-2 text-[13px] text-ivory/40">{location.note}</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.06} className="border-t border-gold/15 pt-10">
                <h2 className="display text-[1.25rem] leading-tight text-gold">Open for</h2>
                <ul className="mt-5 space-y-4">
                  {openFor.map((item) => {
                    const Icon = OPEN_FOR_ICONS[item.icon]
                    return (
                      <li key={item.icon} className="flex items-center gap-4">
                        <Icon size={17} aria-hidden="true" className="shrink-0 text-ivory/45" />
                        <span className="text-[14.5px] text-ivory/80">{item.label}</span>
                      </li>
                    )
                  })}
                </ul>
              </Reveal>

              <Reveal delay={0.12} className="border-t border-gold/15 pt-10">
                <h2 className="display text-[1.25rem] leading-tight text-gold">{contactAside.socialHeading}</h2>
                <p className="mt-2 text-[14px] text-muted">{contactAside.socialBody}</p>
                {hasSocials ? (
                  <SocialLinks className="mt-6" />
                ) : (
                  <p className="mt-5 text-[13px]">
                    <Gap>Social profiles to be added</Gap>
                  </p>
                )}
              </Reveal>

              <Reveal delay={0.18}>
                <p aria-hidden="true" className="font-script max-w-[19ch] -rotate-2 text-[21px] leading-[1.45] text-ivory/45">
                  “{contactAside.quote}”
                </p>
                <span className="mt-5 block h-px w-16 bg-gold/40" aria-hidden="true" />
              </Reveal>
            </aside>
          </div>
        </div>
      </section>

      {/* Institutional enquiries */}
      <section className="relative overflow-hidden bg-ivory">
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 hidden w-[26%] xl:block">
          <Photo
            id={institutional.aside.id}
            width={1600}
            sizes="26vw"
            className="h-full w-full object-cover opacity-[0.04] grayscale"
          />
        </div>

        <div className="relative mx-auto max-w-[84rem] px-6 py-20 md:py-24 lg:px-8 2xl:max-w-[100rem] 2xl:px-16">
          <div className="contact-institutional-layout grid items-center gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-16">
            <figure className="w-full">
              <RevealImage className="aspect-[4/3] w-full" curtain="bg-ivory">
                <Photo
                  id={institutional.photo.id}
                  alt={institutional.photo.alt}
                  width={1600}
                  sizes="(max-width: 1024px) 90vw, 55vw"
                  className="h-full w-full object-cover"
                />
              </RevealImage>
            </figure>

            <div>
              <Reveal>
                <div className="flex items-center gap-5">
                  <span className="h-px w-10 bg-gold/60" aria-hidden="true" />
                  <span className="text-[11px] tracking-[0.3em] text-gold uppercase">{institutional.eyebrow}</span>
                </div>

                <h2 className="display mt-7 max-w-[18ch] text-[clamp(1.9rem,3.2vw,2.7rem)] leading-[1.12] text-dark-text">
                  {institutional.heading}.
                </h2>

                <p className="mt-7 max-w-[56ch] text-[16px] leading-[1.8] text-cream-muted">{institutional.body}</p>
              </Reveal>

              <Reveal delay={0.1}>
                <Link
                  to="/exhibitions"
                  className="group mt-10 inline-flex items-center gap-8 border border-gold/50 px-8 py-[1.1rem] text-[11px] tracking-[0.26em] text-dark-text uppercase transition-colors duration-300 hover:border-gold hover:bg-gold/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                >
                  {institutional.cta}
                  <ArrowRight
                    size={14}
                    aria-hidden="true"
                    className="text-gold transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </Reveal>
            </div>

            <p
              aria-hidden="true"
              className="font-script hidden self-start text-[22px] leading-[1.35] text-dark-text/35 xl:block"
            >
              {institutional.note.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>

      {/* Closing line */}
      <section className="relative overflow-hidden border-t border-gold/15 bg-charcoal">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <Photo
            id={closingCta.photo.id}
            width={1600}
            sizes="100vw"
            className="h-full w-full object-cover opacity-[0.22] grayscale"
          />
          <div className="absolute inset-0 bg-charcoal/78" />
        </div>

        <div className="relative mx-auto max-w-[84rem] px-6 py-24 md:py-28 lg:px-8 2xl:max-w-[100rem] 2xl:px-16">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="display text-[clamp(2rem,4.2vw,3.3rem)] leading-[1.1] text-balance text-ivory">
              {closingCta.title.lead}{" "}
              <span className="text-gold-light">
                {closingCta.title.accent}
                <span className="text-gold">.</span>
              </span>
            </h2>

            <button
              type="button"
              onClick={scrollToForm}
              className="mt-11 inline-flex items-center gap-4 bg-gold px-9 py-4 text-[11.5px] font-medium tracking-[0.2em] text-dark-text uppercase transition-transform duration-200 hover:-translate-y-px active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light"
            >
              {closingCta.label}
              <ArrowRight size={14} aria-hidden="true" />
            </button>
          </Reveal>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-6 hidden -translate-y-1/2 lg:block 2xl:right-16"
          >
            <ul className="space-y-1.5 text-[9.5px] tracking-[0.26em] text-ivory/40 uppercase">
              {closingCta.rail.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
            <div className="mt-5 h-14 w-px bg-gold/45" />
          </div>
        </div>
      </section>
    </>
  )
}
