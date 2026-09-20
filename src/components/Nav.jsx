import { useEffect, useState } from "react"
import { List, X, ArrowRight } from "@phosphor-icons/react"
import { nav, site, cta } from "../content/site"

export const Nav = () => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState("#top")

  // The wordmark already goes home, so "Home" is dropped from the desktop row.
  // Six links plus the CTA is what fits on one line at 1024px.
  const desktopLinks = nav.filter((l) => l.href !== "#top")

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === "Escape" && setOpen(false)
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener("keydown", onKey)
    }
  }, [open])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Highlight the link for whichever section is currently in view.
  useEffect(() => {
    const sections = nav.map(({ href }) => document.querySelector(href)).filter(Boolean)
    if (!sections.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(`#${visible.target.id}`)
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5] },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const ring =
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light"

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-500 ${
        scrolled || open
          ? "border-gold/20 bg-charcoal"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-6 lg:px-8">
        {/* Wordmark: script name over a small roman line, sized so the two
            sit as one lockup rather than two stacked labels. */}
        <a href="#top" className={`shrink-0 leading-none ${ring}`}>
          <span className="font-script text-[1.7rem] leading-none text-ivory">{site.name}</span>
          <span className="mt-1 block text-[9px] tracking-[0.3em] text-gold-light/80 uppercase">
            {site.role}
          </span>
        </a>

        <nav aria-label="Main" className="hidden items-center gap-5 lg:flex">
          {desktopLinks.map((link) => {
            const isActive = active === link.href
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={`relative py-1 text-[12px] tracking-[0.14em] whitespace-nowrap uppercase transition-colors ${ring} ${
                  isActive ? "text-gold-light" : "text-muted hover:text-ivory"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-gold-light transition-all duration-300 ${
                    isActive ? "w-full" : "w-0"
                  }`}
                  aria-hidden="true"
                />
              </a>
            )
          })}
        </nav>

        <a
          href="#contact"
          className={`hidden shrink-0 items-center gap-2 border border-gold px-4 py-2.5 text-[10.5px] font-medium tracking-[0.16em] whitespace-nowrap text-gold-light uppercase transition-colors hover:bg-gold hover:text-dark-text lg:inline-flex ${ring}`}
        >
          {cta.contact}
          <ArrowRight size={12} weight="bold" aria-hidden="true" />
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`p-1 text-ivory lg:hidden ${ring}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={24} /> : <List size={24} />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="border-t border-gold/20 bg-charcoal px-6 py-5 lg:hidden"
        >
          <ul className="flex flex-col">
            {nav.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block py-3 text-sm tracking-[0.1em] text-ivory/70 uppercase ${ring}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-4 block bg-gold px-5 py-3.5 text-center text-[11px] font-medium tracking-[0.16em] text-dark-text uppercase"
          >
            {cta.contact}
          </a>
        </nav>
      )}
    </header>
  )
}
