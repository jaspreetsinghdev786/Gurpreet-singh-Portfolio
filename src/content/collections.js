import { archiveItems } from "./archive"

const assetById = new Map(archiveItems.map((item) => [item.id, item]))
const tagged = (tag, ids) => ids.map((id) => {
  const item = assetById.get(id)
  if (!item) throw new Error("Unknown image asset in collection: " + id)
  if (!item.tags.includes(tag)) throw new Error("Image " + id + " is missing the " + tag + " category tag")
  return item
})

const taggedFrom = (tags, ids) => ids.map((id) => {
  const item = assetById.get(id)
  if (!item) throw new Error("Unknown image asset in collection: " + id)
  if (!tags.some((tag) => item.tags.includes(tag))) throw new Error("Image " + id + " is missing an exhibition category tag")
  return item
})

export const imageCollections = [
  { id: "portraits", number: "01", eyebrow: "Portraiture", title: "Portraits", accent: " & likeness", intro: "Faces, expressions and lived stories, observed across time.", theme: "dark", layout: "portrait", reveal: ["focus", "tilt-left", "wipe-right", "liquid"], href: "/work/portraiture", items: tagged("portraits", [8, 13, "12-face", "16-face"]) },
  { id: "paintings", number: "02", eyebrow: "The painted record", title: "Paintings", accent: " & artwork", intro: "Painted histories, studies and fragments from the studio wall.", theme: "paper", layout: "paintings", reveal: ["turn", "split", "sheen", "wipe"], href: "/work", items: tagged("paintings", ["4-canvas", "12-paint", "4-detail", "12-lion", "12-detail", 16]) },
  { id: "culture", number: "03", eyebrow: "Living traditions", title: "Culture", accent: " in motion", intro: "Tradition held in gesture, costume, meeting and movement.", theme: "dark", layout: "culture", reveal: ["expand", "blinds", "wipe-right"], href: "/work/cultural", items: tagged("culture", ["5-stage", 6, 17]) },
  { id: "events", number: "04", eyebrow: "Gatherings and occasions", title: "Events", accent: " & celebrations", intro: "Public moments, openings and ceremonies documented as they unfold.", theme: "paper", layout: "events", reveal: ["rise", "curtain", "tilt-left", "wipe"], href: "/exhibitions", items: tagged("events", [3, 2, 19, 11]) },
  { id: "people-stories", number: "05", eyebrow: "Encounter", title: "People", accent: " and their stories", intro: "Conversations, companions and the people around the work.", theme: "dark", layout: "people", reveal: ["wipe", "focus", "sheen", "tilt-left"], href: "/archive", items: tagged("people", [17, 9, 10, 1]) },
  { id: "places", number: "06", eyebrow: "A sense of place", title: "Places", accent: " & landscapes", intro: "Courtyards, trails and landscapes held in light and distance.", theme: "paper", layout: "places", reveal: ["slow-zoom", "wipe-right", "curtain", "tilt"], href: "/work/landscape", items: tagged("places", ["places", "14-vale", "14-trail", 14]) },
  { id: "behind-the-scenes", number: "07", eyebrow: "In the studio", title: "Behind", accent: " the scenes", intro: "Tools, working surfaces and the quiet decisions behind a finished piece.", theme: "dark", layout: "process", reveal: ["wipe-right", "tilt", "blinds"], href: "/about", items: tagged("process", ["15-studio", "tools", 7]) },
]

export const exhibitionCollection = {
  id: "exhibitions-recognition",
  number: "08",
  eyebrow: "Public record",
  title: "Exhibitions",
  accent: " & recognition",
  intro: "Exhibition rooms, public recognition and the work in view.",
  theme: "dark",
  layout: "exhibitions",
  reveal: ["split", "rise", "curtain", "wipe-right", "sheen"],
  href: "/exhibitions",
  items: taggedFrom(["exhibitions", "recognition"], [3, 4, 2, 11, 19]),
}
