// Original portfolio photographs, selected to introduce each page.
const studio = { id: "15-studio", alt: "Gurpreet Singh drawing at his studio table" }
const portrait = { id: "12-face", alt: "Painted detail of Maharaja Ranjit Singh" }
const tools = { id: "tools", alt: "Paintbrushes and pigments on the studio desk" }
const gallery = { id: 2, alt: "Artists meeting among paintings at a gallery opening" }

export const heroArtwork = {
  archive: { main: gallery, detail: studio, inset: { id: "places", alt: "A weathered haveli courtyard" }, landscape: true, label: "People, places and the life between", note: "Every image holds a memory." },
  about: { main: studio, detail: portrait, inset: tools, label: "Inside the artist’s studio", note: "A life, devoted to looking." },
  work: { main: { id: 16, alt: "Gurpreet Singh painting a young maharaja at the easel" }, detail: { id: "4-canvas", alt: "Animal heads painted against a rich red ground" }, inset: portrait, label: "Paint · Observe · Remember", note: "A world in every stroke." },
  exhibitions: { main: gallery, detail: { id: 19, alt: "Visitors following a wall of framed photographs at an exhibition" }, inset: { id: "4-canvas", alt: "Detail of a painting on a red ground" }, landscape: true, label: "Art in good company", note: "The work meets the world." },
  achievements: { main: { id: 3, alt: "An award presentation on stage at the Lalit Kala Akademi" }, detail: gallery, inset: studio, landscape: true, label: "A continuing journey", note: "Moments worth remembering." },
  journal: { main: { id: 1, alt: "Gurpreet Singh reading among stacked books in window light" }, detail: tools, inset: { id: "places", alt: "A weathered haveli courtyard" }, landscape: true, label: "Notes from the studio", note: "Looking becomes a story." },
  contact: { main: studio, detail: tools, inset: { id: 17, alt: "Gurpreet Singh in conversation with an elder" }, label: "From the studio, to you", note: "Every idea begins somewhere." },
}

export const categoryHeroArtwork = category => ({
  main: category.photo,
  detail: category.slug === "drawing" ? tools : studio,
  inset: category.slug === "historical" ? portrait : { id: "12-lion", alt: "A lion rendered in warm gold paint" },
  landscape: ["historical", "cultural", "photography", "neo-surrealism"].includes(category.slug),
  label: category.title,
  note: "Through the artist’s eyes.",
})
