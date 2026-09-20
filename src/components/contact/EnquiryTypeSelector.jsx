import { motion, useReducedMotion } from "motion/react"
import { Check } from "@phosphor-icons/react"

/**
 * Selectable enquiry types, rendered as real checkboxes styled as chips so
 * they work with keyboard, screen readers and form submission. Multiple can
 * be chosen; the selection is mirrored into the form's "enquiry type" field.
 */
export const EnquiryTypeSelector = ({ options, value, onChange, tone = "dark", error }) => {
  const reduce = useReducedMotion()
  const light = tone === "light"
  const toggle = (opt) => onChange(value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt])

  return (
    <fieldset>
      <legend className={`display text-[clamp(1.6rem,3vw,2.2rem)] ${light ? "text-dark-text" : "text-ivory"}`}>Let’s talk about</legend>
      <ul className="mt-8 flex flex-wrap gap-3" role="list">
        {options.map((opt, i) => {
          const on = value.includes(opt)
          const id = `enq-${opt.replace(/\W+/g, "-").toLowerCase()}`
          return (
            <motion.li
              key={opt}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
            >
              <input id={id} type="checkbox" name="enquiryType" value={opt} checked={on} onChange={() => toggle(opt)} className="peer sr-only" />
              <label
                htmlFor={id}
                className={`inline-flex cursor-pointer items-center gap-2 border px-4 py-2.5 text-[13px] tracking-[0.06em] transition-colors select-none peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-gold-light ${
                  on
                    ? "border-gold bg-gold text-dark-text"
                    : light
                      ? "border-charcoal/25 text-dark-text/75 hover:border-gold hover:text-dark-text"
                      : "border-ivory/25 text-ivory/70 hover:border-gold-light hover:text-ivory"
                }`}
              >
                {on && <Check size={13} weight="bold" aria-hidden="true" />}
                {opt}
              </label>
            </motion.li>
          )
        })}
      </ul>
      {error && (
        <p role="alert" className="mt-4 text-[14px] text-gold-light">{error}</p>
      )}
    </fieldset>
  )
}
