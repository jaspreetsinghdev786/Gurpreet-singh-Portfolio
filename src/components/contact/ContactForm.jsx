import { useId, useRef, useState } from "react"
import { ArrowRight, CheckCircle, WarningCircle } from "@phosphor-icons/react"
import { Reveal } from "../ui/reveal"
import { EnquiryTypeSelector } from "./EnquiryTypeSelector"
import { enquiryTypes, contactMethods, contactEndpoint } from "../../content/contact"

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const initial = {
  name: "", email: "", phone: "", organisation: "", enquiryType: [], subject: "", message: "", preferred: "Email",
}

const validate = (v) => {
  const e = {}
  if (!v.name.trim()) e.name = "Please enter your name."
  if (!v.email.trim()) e.email = "Please enter your email address."
  else if (!EMAIL.test(v.email)) e.email = "That email address does not look right. Check for a missing @ or domain."
  if (!v.enquiryType.length) e.enquiryType = "Choose at least one topic so the enquiry reaches the right place."
  if (!v.subject.trim()) e.subject = "Please give the enquiry a subject."
  if (v.message.trim().length < 20) e.message = "Please write a little more (at least 20 characters) so we can respond usefully."
  if (v.preferred === "Phone" && !v.phone.trim()) e.phone = "Add a phone number, or choose email as the preferred contact method."
  return e
}

const Field = ({ id, label, optional, error, children, hint }) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={id} className="text-[12px] tracking-[0.18em] text-muted uppercase">
      {label} {optional && <span className="text-ivory/35 normal-case tracking-normal">(optional)</span>}
    </label>
    {children}
    {hint && !error && <p id={`${id}-hint`} className="text-[13px] text-ivory/40">{hint}</p>}
    {error && (
      <p id={`${id}-error`} role="alert" className="flex items-start gap-1.5 text-[14px] text-gold-light">
        <WarningCircle size={15} weight="fill" aria-hidden="true" className="mt-0.5 shrink-0" />
        {error}
      </p>
    )}
  </div>
)

const inputCls = (error) =>
  `w-full border bg-transparent px-4 py-3.5 text-[16px] text-ivory placeholder:text-ivory/35 transition-colors focus:outline-none focus-visible:border-gold-light ${
    error ? "border-gold-light/70" : "border-ivory/20 hover:border-ivory/35"
  }`

/**
 * The enquiry form. Validates on submit, focuses the first error, shows
 * loading / success / failure states, and never fakes a send: with no
 * endpoint configured (VITE_CONTACT_ENDPOINT) it reports that plainly.
 */
export const ContactForm = () => {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState("idle") // idle | sending | sent | failed | unconfigured
  const uid = useId()
  const formRef = useRef(null)

  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }))
  const id = (k) => `${uid}-${k}`

  const onSubmit = async (e) => {
    e.preventDefault()
    const errs = validate(values)
    setErrors(errs)
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0]
      const el = formRef.current?.querySelector(`[name="${first}"]`)
      el?.focus()
      return
    }
    if (!contactEndpoint) {
      setStatus("unconfigured")
      return
    }
    setStatus("sending")
    try {
      const res = await fetch(contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...values, enquiryType: values.enquiryType.join(", ") }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus("sent")
      setValues(initial)
    } catch {
      setStatus("failed")
    }
  }

  if (status === "sent") {
    return (
      <div role="status" aria-live="polite" className="border border-gold/40 p-10 text-center">
        <CheckCircle size={32} weight="fill" aria-hidden="true" className="mx-auto text-gold-light" />
        <h3 className="display mt-6 text-[1.8rem] text-ivory">Thank you. Your enquiry has been sent.</h3>
        <p className="mx-auto mt-4 max-w-[44ch] text-[16px] leading-relaxed text-muted">
          You will hear back by your preferred method. If the matter is time-sensitive, please say so in a follow-up.
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-8 text-[12px] tracking-[0.18em] text-gold-light uppercase hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light">
          Send another enquiry
        </button>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-14">
      <EnquiryTypeSelector
        options={enquiryTypes}
        value={values.enquiryType}
        onChange={(next) => setValues((v) => ({ ...v, enquiryType: next }))}
        error={errors.enquiryType}
      />

      <Reveal className="grid gap-8 md:grid-cols-2">
        <Field id={id("name")} label="Name" error={errors.name}>
          <input id={id("name")} name="name" type="text" autoComplete="name" value={values.name} onChange={set("name")} required aria-invalid={!!errors.name} aria-describedby={errors.name ? `${id("name")}-error` : undefined} placeholder="Your full name…" className={inputCls(errors.name)} />
        </Field>
        <Field id={id("email")} label="Email" error={errors.email}>
          <input id={id("email")} name="email" type="email" inputMode="email" autoComplete="email" spellCheck={false} value={values.email} onChange={set("email")} required aria-invalid={!!errors.email} aria-describedby={errors.email ? `${id("email")}-error` : undefined} placeholder="name@example.com…" className={inputCls(errors.email)} />
        </Field>
        <Field id={id("phone")} label="Phone" optional error={errors.phone}>
          <input id={id("phone")} name="phone" type="tel" inputMode="tel" autoComplete="tel" value={values.phone} onChange={set("phone")} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? `${id("phone")}-error` : undefined} placeholder="+91 …" className={inputCls(errors.phone)} />
        </Field>
        <Field id={id("organisation")} label="Organisation" optional>
          <input id={id("organisation")} name="organisation" type="text" autoComplete="organization" value={values.organisation} onChange={set("organisation")} placeholder="Gallery, university, festival…" className={inputCls()} />
        </Field>
        <div className="md:col-span-2">
          <Field id={id("subject")} label="Subject" error={errors.subject}>
            <input id={id("subject")} name="subject" type="text" autoComplete="off" value={values.subject} onChange={set("subject")} required aria-invalid={!!errors.subject} aria-describedby={errors.subject ? `${id("subject")}-error` : undefined} placeholder="A line that says what this is about…" className={inputCls(errors.subject)} />
          </Field>
        </div>
        <div className="md:col-span-2">
          <Field id={id("message")} label="Message" error={errors.message} hint="Dates, venue, scope and any links are all helpful.">
            <textarea id={id("message")} name="message" rows={7} autoComplete="off" value={values.message} onChange={set("message")} required aria-invalid={!!errors.message} aria-describedby={errors.message ? `${id("message")}-error` : `${id("message")}-hint`} placeholder="Tell us about the exhibition, project or question…" className={`${inputCls(errors.message)} resize-y`} />
          </Field>
        </div>
        <fieldset className="md:col-span-2">
          <legend className="text-[12px] tracking-[0.18em] text-muted uppercase">Preferred contact method</legend>
          <div className="mt-3 flex flex-wrap gap-3">
            {contactMethods.map((m) => {
              const rid = id(`pref-${m}`)
              return (
                <div key={m}>
                  <input id={rid} type="radio" name="preferred" value={m} checked={values.preferred === m} onChange={set("preferred")} className="peer sr-only" />
                  <label htmlFor={rid} className={`inline-block cursor-pointer border px-4 py-2.5 text-[13px] tracking-[0.06em] transition-colors select-none peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-gold-light ${values.preferred === m ? "border-gold bg-gold text-dark-text" : "border-ivory/25 text-ivory/70 hover:border-gold-light hover:text-ivory"}`}>
                    {m}
                  </label>
                </div>
              )
            })}
          </div>
        </fieldset>
      </Reveal>

      <Reveal className="flex flex-wrap items-center gap-6">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex items-center gap-3 bg-gold px-9 py-4 text-[12px] font-medium tracking-[0.16em] text-dark-text uppercase transition-transform hover:-translate-y-px active:scale-[0.98] disabled:cursor-progress disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light"
        >
          {status === "sending" ? "Sending…" : "Send enquiry"}
          {status !== "sending" && <ArrowRight size={14} weight="bold" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />}
        </button>

        <div aria-live="polite" className="text-[14px] leading-relaxed">
          {status === "failed" && (
            <p role="alert" className="flex items-start gap-2 text-gold-light">
              <WarningCircle size={16} weight="fill" aria-hidden="true" className="mt-0.5 shrink-0" />
              The enquiry could not be sent. Your text is still here: please try again in a moment.
            </p>
          )}
          {status === "unconfigured" && (
            <p role="alert" className="flex items-start gap-2 text-gold-light">
              <WarningCircle size={16} weight="fill" aria-hidden="true" className="mt-0.5 shrink-0" />
              Enquiry delivery is not connected yet. Your details are valid and nothing was lost; the site owner needs to set VITE_CONTACT_ENDPOINT.
            </p>
          )}
        </div>
      </Reveal>
    </form>
  )
}
