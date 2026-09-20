import { Link } from "react-router"
import { ArrowRight, MapPin } from "@phosphor-icons/react"
import { Reveal } from "../ui/reveal"
import { contact, cta, site } from "../../content/site"

/** The one centred section on the home page: the invitation to talk. */
export const Invitation = () => (
  <section className="border-t border-gold/15 bg-charcoal">
    <Reveal className="mx-auto max-w-3xl px-6 py-28 text-center md:py-40">
      <h2 className="display text-[clamp(2.6rem,5vw,3.75rem)] leading-[1.08] text-balance text-ivory">
        {contact.heading}
      </h2>
      <p className="mx-auto mt-7 max-w-[46ch] text-[17px] leading-[1.7] text-ivory/62">{contact.body}</p>
      <Link
        to="/contact"
        className="group mt-12 inline-flex items-center gap-3 bg-gold px-9 py-4 text-[12px] font-medium tracking-[0.16em] text-dark-text uppercase transition-transform hover:-translate-y-px active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light"
      >
        {cta.contact}
        <ArrowRight size={14} weight="bold" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
      <p className="mt-12 inline-flex items-center gap-2 text-[15px] text-ivory/50">
        <MapPin size={16} aria-hidden="true" />
        {site.location}
      </p>
    </Reveal>
  </section>
)
