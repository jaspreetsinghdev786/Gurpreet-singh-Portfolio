import { Reveal } from "../ui/reveal"
import { SignatureStroke } from "../ui/SignatureStroke"

export const ArchiveQuote = ({ lines, attribution, index = [] }) => (
  <section className="archive-closing" aria-label="In the artist's words">
    <Reveal>
      <p className="archive-eyebrow">A note from the artist</p>
      <blockquote>{lines.map(line => <span key={line}>{line}</span>)}</blockquote>
      <SignatureStroke />
      <p className="archive-closing-by">{attribution}</p>
    </Reveal>
    {index.length > 0 && <ul className="archive-closing-index" aria-hidden="true">
      {index.map(word => <li key={word}>{word}</li>)}
    </ul>}
  </section>
)
