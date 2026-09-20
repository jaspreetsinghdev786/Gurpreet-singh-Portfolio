import { ArrowRight, EnvelopeSimple, MapPin } from "@phosphor-icons/react"
import { Reveal } from "./ui/reveal"
import { contact, cta, site } from "../content/site"

export const ContactCTA = () => (
  <section id="contact" className="border-t border-gold/15 bg-charcoal">
    <Reveal className="mx-auto max-w-3xl px-6 py-28 text-center md:py-40">
      <h2 className="display text-[clamp(2.6rem,5vw,3.75rem)] leading-[1.08] text-balance text-ivory">
        {contact.heading}
      </h2>
      <p className="mx-auto mt-7 max-w-[46ch] text-[17px] leading-[1.7] text-ivory/62">{contact.body}</p>
      <a
        href={`mailto:${site.email}`}
        className="group mt-12 inline-flex items-center gap-3 bg-gold px-9 py-4 text-[12px] font-medium tracking-[0.16em] text-dark-text uppercase transition-transform hover:-translate-y-px active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light"
      >
        {cta.contact}
        <ArrowRight size={14} weight="bold" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
      </a>

      <div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-[15px] text-ivory/50">
        <a
          href={`mailto:${site.email}`}
          className="inline-flex items-center gap-2 transition-colors hover:text-ivory focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light"
        >
          <EnvelopeSimple size={16} aria-hidden="true" />
          {site.email}
        </a>
        <span className="inline-flex items-center gap-2">
          <MapPin size={16} aria-hidden="true" />
          {site.location}
        </span>
      </div>
    </Reveal>
  </section>
)
