import { useId, useState } from "react"
import { Plus } from "@phosphor-icons/react"

/** Deeper chapters stay available without competing with the main narrative. */
export const StoryDisclosure = ({ number, title, children }) => {
  const [open, setOpen] = useState(false)
  const id = useId()
  return <div className="story-disclosure">
    <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen(value => !value)}>
      <span><small>{number}</small><strong>{title}</strong></span><Plus size={22} aria-hidden="true" />
    </button>
    <div id={id} className="story-disclosure__body" hidden={!open}>{open && children}</div>
  </div>
}
