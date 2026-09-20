import { useState } from "react"
import { ArrowRight, CheckCircle } from "@phosphor-icons/react"
import { icons } from "./ui/icons"
import { nav, site } from "../content/site"

export const Footer = () => {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState("idle") // idle | done

  // No backend yet, so the form at least tells the visitor what happened
  // instead of silently swallowing the submit. Point this at your provider
  // (Mailchimp, Buttondown, a Formspree endpoint) when you have one.
  const onSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    setStatus("done")
    setEmail("")
  }

  const ring =
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light"

  return (
    <footer className="bg-charcoal-800">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
        <div className="grid gap-14 md:grid-cols-[1.3fr_0.7fr_1fr]">
          <div>
            <p className="font-script text-4xl leading-none text-ivory">{site.name}</p>
            <p className="mt-2 text-[10px] tracking-[0.3em] text-gold-light/80 uppercase">
              {site.role}
            </p>
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-ivory/50">{site.tagline}</p>
            <ul className="mt-7 flex gap-5">
              {site.socials.map(({ network, href, label }) => {
                const Icon = icons[network]
                return (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${site.name} on ${label}`}
                      className={`inline-flex text-ivory/45 transition-colors hover:text-gold-light ${ring}`}
                    >
                      <Icon size={19} weight="light" aria-hidden="true" />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-[11px] tracking-[0.26em] text-ivory/40 uppercase">Sections</h2>
            <ul className="mt-6 space-y-3">
              {nav.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className={`text-[15px] text-muted transition-colors hover:text-ivory ${ring}`}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[11px] tracking-[0.26em] text-ivory/40 uppercase">Stay in touch</h2>
            <p className="mt-6 text-[15px] leading-relaxed text-muted">
              Updates on new artworks, exhibitions and events.
            </p>

            {status === "done" ? (
              <p className="mt-6 inline-flex items-center gap-2 text-sm text-gold-light">
                <CheckCircle size={16} weight="fill" aria-hidden="true" />
                Thank you, you are on the list.
              </p>
            ) : (
              <form
                onSubmit={onSubmit}
                className="mt-6 flex items-center gap-3 border-b border-ivory/25 pb-2.5 transition-colors focus-within:border-gold-light"
              >
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full bg-transparent text-[15px] text-ivory placeholder:text-ivory/45 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className={`shrink-0 text-gold-light transition-colors hover:text-gold ${ring}`}
                >
                  <ArrowRight size={18} weight="bold" aria-hidden="true" />
                </button>
              </form>
            )}

            <p className="mt-6 text-[15px] text-ivory/50">{site.location}</p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-ivory/10 pt-7 text-[13px] text-ivory/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#top" className={`transition-colors hover:text-ivory/70 ${ring}`}>
              Privacy policy
            </a>
            <a href="#top" className={`transition-colors hover:text-ivory/70 ${ring}`}>
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
