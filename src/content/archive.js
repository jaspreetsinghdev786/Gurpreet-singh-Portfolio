/**
 * The Archive: a visual record of people, places, history, photography,
 * cultural life, paintings, events and memory. Each item carries one or more
 * tags used by the filters. Captions describe what is visible; they do not
 * name sitters or venues the source does not confirm.
 */

export const archiveFilters = [
  { key: "all", label: "All" },
  { key: "portraits", label: "Portraits" },
  { key: "people", label: "People" },
  { key: "places", label: "Places" },
  { key: "history", label: "History" },
  { key: "culture", label: "Culture" },
  { key: "photography", label: "Photography" },
  { key: "paintings", label: "Paintings" },
  { key: "events", label: "Events" },
  { key: "process", label: "Behind the scenes" },
  { key: "exhibitions", label: "Exhibitions" },
  { key: "recognition", label: "Recognition" },
]

/**
 * The opening plate. Kept here rather than in the page so the words and the
 * photograph that carries them are edited in one place.
 */
export const archiveOpener = {
  eyebrow: "The archive",
  title: { lead: "Kept,", accent: "not curated." },
  standfirst: "A visual record of people, places and memory.",
  intro:
    "Paintings, photographs, events and encounters, kept together as one growing archive rather than a gallery of finished work. Some of it is finished work. Most of it is the room the work came out of.",
  /** The short index set against the right edge of the plate. */
  index: ["People", "Places", "Ideas", "Conversations", "A living archive"],
  plate: {
    id: 2,
    alt: "Artists gathered before a wall of paintings at an opening",
  },
}

/**
 * The pause between the wall and the footer. The line is held as two clauses
 * so the break falls where the plate wants it on a wide screen; below that it
 * wraps on its own.
 */
export const archiveQuote = {
  lines: ["Every painting holds a story,", "and every story keeps a place alive."],
  attribution: "Gurpreet Singh",
  index: ["Art", "People", "Places", "Stories", "Alive"],
}

export const archiveItems = [
  { id: 12, alt: "Gurpreet Singh with palette and brush beside his painting of Maharaja Ranjit Singh", caption: "Beside the Maharaja Ranjit Singh canvas", tags: ["paintings", "history", "portraits"], size: "wide" },
  { id: 1, alt: "The artist reading among stacked books in window light, black and white", caption: "Reading, window light", tags: ["photography", "people"], size: "wide" },
  { id: "15-studio", alt: "The artist at his drafting table, drawing", caption: "At the drafting table", tags: ["photography", "people", "process"], size: "tall" },
  { id: 16, alt: "Painting a young maharaja at the easel", caption: "At the easel", tags: ["paintings", "history", "portraits"], size: "tall" },
  { id: 8, alt: "Portrait study of a young man in a peach turban", caption: "Portrait study", tags: ["portraits", "photography"], size: "square" },
  { id: 13, alt: "Portrait of a man in a patterned waistcoat", caption: "Portrait", tags: ["portraits"], size: "tall" },
  { id: 4, alt: "The artist beside his award-winning painting of animals on a red ground", caption: "Award-winning canvas, exhibition", tags: ["paintings", "events", "exhibitions", "recognition"], size: "wide" },
  { id: "4-canvas", alt: "Animal portrait paintings mounted on wood against a red ground", caption: "Animal paintings on wood", tags: ["paintings", "history"], size: "wide" },
  { id: "4-detail", alt: "Painted detail of a wolf and a bear on weathered boards", caption: "Detail, canvas", tags: ["paintings", "history"], size: "square" },
  { id: "12-detail", alt: "Painted surface detail from the Maharaja Ranjit Singh canvas", caption: "Brushwork and surface", tags: ["paintings", "history"], size: "square" },
  { id: "12-paint", alt: "Wide detail from the Maharaja Ranjit Singh canvas", caption: "A painted history", tags: ["paintings", "history"], size: "wide" },
  { id: "12-lion", alt: "Painted lion detail from the Maharaja Ranjit Singh canvas", caption: "The lion in the painting", tags: ["paintings", "history"], size: "square" },
  { id: "12-face", alt: "Painted close-up of Maharaja Ranjit Singh", caption: "A face in history", tags: ["portraits", "paintings", "history"], size: "tall" },
  { id: "16-face", alt: "Painted detail of a face beneath a jewelled turban", caption: "Detail, face", tags: ["paintings", "history", "portraits"], size: "tall" },
  { id: 3, alt: "An award presentation on stage at the Lalit Kala Akademi", caption: "Lalit Kala Akademi, on stage", tags: ["events", "people", "recognition"], size: "wide" },
  { id: 2, alt: "Artists gathered before a wall of paintings at an opening", caption: "Gallery opening", tags: ["events", "people", "places", "exhibitions"], size: "wide" },
  { id: 11, alt: "A gallery interior hung with paintings", caption: "Gallery interior", tags: ["places", "events", "exhibitions"], size: "square" },
  { id: 19, alt: "Visitors queuing along a wall of framed photographs", caption: "Visitors at an exhibition", tags: ["places", "events", "photography", "exhibitions"], size: "wide" },
  { id: "5-stage", alt: "Folk performers lifted mid-dance on a lit stage", caption: "Folk performance", tags: ["culture", "events"], size: "square" },
  { id: 6, alt: "A staged performance in traditional dress", caption: "On stage, in costume", tags: ["culture", "events"], size: "square" },
  { id: 17, alt: "The artist in a shawl, listening to an elder", caption: "In conversation", tags: ["people", "culture"], size: "tall" },
  { id: 9, alt: "In conversation with a senior painter at a workshop", caption: "Workshop conversation", tags: ["people", "events"], size: "square" },
  { id: 10, alt: "Three artists standing together outdoors", caption: "Fellow artists", tags: ["people"], size: "square" },
  { id: 18, alt: "The artist seated among many of his framed paintings", caption: "Among the paintings", tags: ["paintings", "people"], size: "square" },
  { id: 14, alt: "Walking a forest trail with a camera bag", caption: "On the trail", tags: ["places", "photography"], size: "tall" },
  { id: 7, alt: "Painting at the easel in a red kurta", caption: "At work", tags: ["people", "paintings", "process"], size: "square" },
  { id: "tools", alt: "Worn brushes in a paint-crusted jar beside pigment pots and a loaded palette", caption: "Brushes and pigments", tags: ["process", "paintings"], size: "square" },
  { id: "places", alt: "A weathered haveli courtyard seen through an open studded wooden door", caption: "A haveli courtyard", tags: ["places", "culture"], size: "wide" },
  { id: "14-trail", alt: "A figure walking a forest trail", caption: "The forest trail", tags: ["places", "photography"], size: "tall" },
  { id: "14-vale", alt: "A valley landscape from the forest walk", caption: "Across the valley", tags: ["places", "photography"], size: "wide" },
]
