import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { Link, NavLink, useLocation } from "react-router"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useLenis } from "lenis/react"
import { List, X, ArrowRight } from "@phosphor-icons/react"
import { nav, site, cta } from "../../content/site"

const ring = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light"

export const SiteHeader = () => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const reduce = useReducedMotion()
  const lenis = useLenis()
  const menuRef = useRef(null)
  const triggerRef = useRef(null)

  // Close the menu on navigation.
  useEffect(() => setOpen(false), [pathname])

  // Escape closes; body scroll locks while the overlay is up.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false)
      if (e.key !== "Tab") return
      const controls = menuRef.current?.querySelectorAll('a[href], button')
      if (!controls?.length) return
      const first = controls[0], last = controls[controls.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    menuRef.current?.querySelector("button")?.focus({ preventScroll: true })
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    lenis?.stop()
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = previous
      lenis?.start()
      window.removeEventListener("keydown", onKey)
      triggerRef.current?.focus({ preventScroll: true })
    }
  }, [open, lenis])

  // Solid bar once the top of the page has scrolled away: a 1px sentinel and
  // an IntersectionObserver, so nothing runs per scroll frame.
  useEffect(() => {
    const sentinel = document.createElement("div")
    sentinel.style.cssText = "position:absolute;top:24px;left:0;width:1px;height:1px;pointer-events:none"
    document.body.prepend(sentinel)
    const observer = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting))
    observer.observe(sentinel)
    return () => {
      observer.disconnect()
      sentinel.remove()
    }
  }, [])

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)")
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false) }
    desktop.addEventListener("change", closeOnDesktop)
    return () => desktop.removeEventListener("change", closeOnDesktop)
  }, [])

  const isHome = pathname === "/"
  const desktopLinks = nav.filter((l) => l.to !== "/")

  return (
    <motion.header
      initial={reduce ? false : { opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0 : 0.72, delay: reduce ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }}
      className={`site-header sticky top-0 z-40 border-b ${isHome ? "site-header--home" : ""} ${scrolled || open ? "site-header--solid" : "site-header--clear"}`}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-8 px-6 lg:px-8">
        <Link to="/" className={`shrink-0 leading-none ${ring}`} aria-label={`${site.name}, home`}>
          <motion.span className="atelier-wordmark"
          initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0, scale: scrolled ? .94 : 1 }}
          transition={{ duration: reduce ? 0 : .75, ease: [0.22, 1, 0.36, 1] }}>
            <span>Gurpreet Singh</span><small>ARTIST & EDUCATOR</small>
          </motion.span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-5 lg:flex">
          {desktopLinks.map((link, index) => (
            <motion.div key={link.to}
              initial={reduce ? false : { opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0 : 0.58, delay: reduce ? 0 : 0.34 + index * 0.065, ease: [0.22, 1, 0.36, 1] }}>
              <NavLink to={link.to}
                className={({ isActive }) => "relative py-1 text-[12px] tracking-[0.14em] whitespace-nowrap uppercase transition-colors " + ring + (isActive ? " text-gold-light" : " text-muted hover:text-ivory")}
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span className={"absolute -bottom-0.5 left-0 h-px bg-gold-light transition-[width] duration-500 " + (isActive ? "w-full" : "w-0")} aria-hidden="true" />
                  </>
                )}
              </NavLink>
            </motion.div>
          ))}
        </nav>

        <motion.div initial={reduce ? false : { opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.58, delay: reduce ? 0 : 0.74, ease: [0.22, 1, 0.36, 1] }}
          className="hidden shrink-0 lg:block">
          <Link to="/contact" className={"button-fill inline-flex items-center gap-2 border border-gold px-4 py-2.5 text-[10.5px] font-medium tracking-[0.16em] whitespace-nowrap text-gold-light uppercase " + ring}>
            {cta.contact}<ArrowRight size={12} weight="bold" aria-hidden="true" />
          </Link>
        </motion.div>  
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`relative z-50 p-1 text-ivory lg:hidden ${ring}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          ref={triggerRef}
          aria-controls="mobile-menu"
        >
          {open ? <X size={26} /> : <List size={26} />}
        </button>
      </div>

      {/* Full-screen editorial menu: large serif links, one per line. Portalled
          to <body>: placing the overlay inside the header would confine it to
          the header's stacking box and clip it. */}
      {createPortal(
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            ref={menuRef}
            aria-label="Mobile"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[45] flex flex-col bg-charcoal px-6 pt-24 pb-10 lg:hidden"
          >
            <div className="absolute top-0 right-0 left-0 flex h-20 items-center justify-between px-6">
              <span className="atelier-wordmark"><span>Gurpreet Singh</span><small>ARTIST & EDUCATOR</small></span>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className={`p-1 text-ivory ${ring}`}>
                <X size={26} />
              </button>
            </div>
            <ol className="flex flex-1 flex-col justify-center gap-1">
              {nav.map((link, i) => (
                <motion.li
                  key={link.to}
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.05 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `display block py-2 text-[clamp(2rem,9vw,3rem)] leading-tight ${ring} ${
                        isActive ? "text-gold-light" : "text-ivory hover:text-gold-light"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.li>
              ))}
            </ol>
            <Link
              to="/contact"
              className="block bg-gold px-5 py-4 text-center text-[12px] font-medium tracking-[0.16em] text-dark-text uppercase"
            >
              {cta.contact}
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>,
      document.body,
      )}
    </motion.header>
  )
}
