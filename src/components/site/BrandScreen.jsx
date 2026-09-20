import "./brand-screens.css"

export const BrandLogo = ({ className = "" }) => (
  <div className={`brand-screen-logo brand-wordmark ${className}`}>
    <span>Gurpreet Singh</span><small>ARTIST & EDUCATOR</small>
  </div>
)

/** Shared by first-load and route-change screens; the line is indeterminate. */
export const BrandScreen = ({ message = "Opening the gallery…", overlay = false }) => (
  <div className={`brand-screen ${overlay ? "brand-screen-overlay" : ""}`} role="status" aria-live="polite" aria-atomic="true">
    <div className="brand-screen-orbit" aria-hidden="true" />
    <div className="brand-screen-content">
      <BrandLogo />
      <p className="brand-screen-motto">A life in art. A world in every stroke.</p>
      <div className="brand-screen-line" aria-hidden="true"><span /></div>
      <p className="brand-screen-status">{message}</p>
    </div>
    <span className="brand-screen-location" aria-hidden="true">BATHINDA, PUNJAB · INDIA</span>
  </div>
)
