/**
 * A visible, honest marker for content the source does not yet supply. It
 * reads as an editorial note rather than an error, and it is the only thing
 * that may stand where a fact is missing.
 */
export const Gap = ({ children = "To be added", tone = "dark", className = "" }) => (
  <span
    className={`inline-block border border-dashed px-2 py-0.5 text-[12px] tracking-[0.06em] ${
      tone === "light" ? "border-charcoal/25 text-dark-text/45" : "border-ivory/25 text-ivory/45"
    } ${className}`}
  >
    {children}
  </span>
)
