import { Link } from "react-router"
import { ArrowRight, MapPin } from "@phosphor-icons/react"
import { footer, nav, site } from "../../content/site"
import { socials } from "../../content/contact"
import { SocialLinks } from "../editorial/SocialLinks"
import { Reveal } from "../ui/reveal"
import { SignatureStroke } from "../ui/SignatureStroke"

/**
 * The footer.
 *
 * Set over the gold-on-black plate, in three columns divided by hairlines: the
 * mark and what the studio is for, the pages, and where to find it. The base
 * rule carries the notice, the profiles and the trading name.
 *
 * The plate is decorative, so it takes an empty alt and lazy-loads; every page
 * carries this footer and none of it is above the fold.
 */
export const SiteFooter = () => {
  const hasSocials = socials.some((s) => s.href)

  return (
    <footer className="sf">
      <img
        className="sf-plate"
        src="/brand/footer-plate-2000.webp"
        srcSet="/brand/footer-plate-1000.webp 1000w, /brand/footer-plate-2000.webp 2000w"
        sizes="100vw"
        width={2000}
        height={769}
        alt=""
        loading="lazy"
        decoding="async"
        draggable={false}
      />
      <div className="sf-scrim" aria-hidden="true" />

      <div className="sf-inner">
        <Reveal variant="lift" className="sf-cols">
          <div className="sf-brand">
            <Link to="/" className="atelier-wordmark" aria-label={`${site.name}, home`}><span>Gurpreet Singh</span><small>ARTIST & EDUCATOR</small></Link>
            <p className="sf-tagline">{site.tagline}</p>
            <div className="sf-hair" aria-hidden="true" />
            <p className="sf-motto">{footer.motto}</p>
          </div>

          <nav className="sf-col" aria-label="Footer">
            <h2 className="sf-label">Pages</h2>
            <div className="sf-label-rule" aria-hidden="true" />
            <ul className="sf-nav">
              {nav.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="sf-col">
            <h2 className="sf-label">Studio</h2>
            <div className="sf-label-rule" aria-hidden="true" />

            <p className="sf-place">
              <MapPin size={17} weight="light" aria-hidden="true" />
              {site.location}
            </p>

            <p className="sf-note">
              Exhibitions, workshops, commissions and research conversations:{" "}
              <Link to="/contact" className="sf-enquire">
                enquire here.
                <ArrowRight size={16} weight="light" aria-hidden="true" />
              </Link>
            </p>

            <p className="sf-script" aria-hidden="true">
              <span>{footer.script[0]}</span>
              <span>{footer.script[1]}</span>
              <SignatureStroke className="sf-signature-stroke" />
            </p>
          </div>
        </Reveal>

        <div className="sf-base">
          <p className="sf-notice">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="sf-base-end">
            {hasSocials && (
              <>
                <SocialLinks className="sf-social" />
                <span className="sf-base-div" aria-hidden="true" />
              </>
            )}
            <p className="sf-trading">{site.professionalName}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
