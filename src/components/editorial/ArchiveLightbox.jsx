import { useCallback, useEffect, useRef } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { CaretLeft, CaretRight, X } from "@phosphor-icons/react"
import { Photo } from "../ui/photo"
import { useLenis } from "lenis/react"

/**
 * The viewer.
 *
 * One plate at a time on a near-black ground, with the catalogue line under it
 * and the position in the set held at the top. Escape closes, the arrow keys
 * step, and focus is sent to the close control on open and handed back to the
 * card that opened it on close, so the wall can be worked through from the
 * keyboard alone.
 */
export const ArchiveLightbox = ({ items, index, onClose, onStep }) => {
  const open = index !== null && index >= 0 && index < items.length
  const item = open ? items[index] : null
  const closeRef = useRef(null)
  const dialogRef = useRef(null)
  const returnTo = useRef(null)
  const reduce = useReducedMotion()
  const lenis = useLenis()

  const step = useCallback((delta) => onStep(delta), [onStep])

  // Keys, scroll lock and focus are all consequences of the same open state,
  // so they are handled together rather than in three separate effects.
  useEffect(() => {
    if (!open) return

    returnTo.current = document.activeElement
    const { body } = document
    const previous = body.style.overflow
    const previousPadding = body.style.paddingRight
    const wasStopped = lenis?.isStopped
    const gap = window.innerWidth - document.documentElement.clientWidth
    body.style.overflow = "hidden"
    lenis?.stop()
    if (gap > 0) body.style.paddingRight = `${gap}px`

    const onKey = (e) => {
      if (["Escape", "ArrowRight", "ArrowLeft"].includes(e.key)) e.preventDefault()
      if (e.key === "Escape") onClose()
      else if (e.key === "ArrowRight") step(1)
      else if (e.key === "ArrowLeft") step(-1)
      else if (e.key === "Tab") {
        const controls = dialogRef.current?.querySelectorAll("button")
        if (!controls?.length) return
        const first = controls[0], last = controls[controls.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener("keydown", onKey)

    const id = requestAnimationFrame(() => closeRef.current?.focus({ preventScroll: true }))

    return () => {
      document.removeEventListener("keydown", onKey)
      cancelAnimationFrame(id)
      body.style.overflow = previous
      body.style.paddingRight = previousPadding
      if (!wasStopped) lenis?.start()
      if (returnTo.current instanceof HTMLElement) returnTo.current.focus({ preventScroll: true })
    }
  }, [open, onClose, step, lenis])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={dialogRef}
          className="ah-lb"
          role="dialog"
          aria-modal="true"
          aria-label={item.caption}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose()
          }}
        >
          <div className="ah-lb-bar">
            <p className="ah-lb-count">
              {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </p>
            <button ref={closeRef} type="button" className="ah-lb-close" onClick={onClose}>
              <X size={18} weight="regular" aria-hidden="true" />
              <span className="sr-only">Close the viewer</span>
            </button>
          </div>

          <motion.figure
            key={item.id}
            className="ah-lb-figure"
            initial={reduce ? false : { opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <Photo
              id={item.id}
              alt={item.alt}
              width={1600}
              sizes="(max-width: 1024px) 94vw, 78vw"
              position="50% 50%"
              priority
            />
            <figcaption className="ah-lb-caption">
              <span className="ah-lb-text">{item.caption}</span>
              <span className="ah-lb-tag">{item.tags.join(" · ")}</span>
            </figcaption>
          </motion.figure>

          {items.length > 1 && (
            <>
              <button type="button" className="ah-lb-step ah-lb-prev" onClick={() => step(-1)}>
                <CaretLeft size={20} weight="regular" aria-hidden="true" />
                <span className="sr-only">Previous item</span>
              </button>
              <button type="button" className="ah-lb-step ah-lb-next" onClick={() => step(1)}>
                <CaretRight size={20} weight="regular" aria-hidden="true" />
                <span className="sr-only">Next item</span>
              </button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
