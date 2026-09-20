/**
 * Single source of truth for every piece of copy and every photograph on the
 * page. Edit here, not inside the components.
 *
 * One emotional idea runs through the whole page: the work is an act of
 * remembering. Hero > intro > archive > photo essay > manifesto > the work >
 * record > closing image > invitation. Each section’s heading is a line in
 * that one story rather than a template label.
 *
 * Images live at /gallery/opt/<id>-<width>.webp. Every file there has been
 * put through the same grade (desaturated, warm blacks, muted highlights,
 * grain) so the photographs read as one archive. Originals in /gallery/*.jpg
 * are untouched. Ids ending in a word (12-lion, 15-studio) are crops.
 */

const OPT = "/gallery/opt";

/** Intrinsic pixel size of every source, so <img> can carry width/height. */
export const dims = {
  1: [5344, 3840],
  2: [5040, 2856],
  3: [4928, 3264],
  4: [4928, 3264],
  5: [848, 608],
  6: [804, 652],
  7: [667, 667],
  8: [949, 960],
  9: [800, 600],
  10: [800, 600],
  11: [800, 600],
  12: [5032, 3840],
  13: [1516, 2213],
  14: [1220, 2111],
  15: [5760, 3840],
  16: [2524, 3661],
  17: [820, 983],
  18: [640, 424],
  19: [936, 357],
  tools: [1600, 1200],
  places: [1600, 1200],
  "12-detail": [1600, 1200],
  "16-face": [1600, 1200],
  "4-detail": [1600, 1200],
  "5-stage": [1600, 1200],
  "14-trail": [1600, 900],
  "14-vale": [1600, 1200],
  "4-canvas": [1600, 1200],
  "12-lion": [1913, 2151],
  "12-face": [906, 1152],
  "12-paint": [3120, 1755],
  "15-studio": [2880, 3840],
  /* The hero plate: the artist beside the Ranjit Singh canvas, recomposed wide
     with the room falling to dark on the left where the type sits. */
  hero: [1600, 900],
};

/**
 * Where each photograph should be anchored when a frame crops it.
 *
 * Every frame on the site is a fixed aspect, so a portrait source in a wide
 * frame (or the reverse) loses most of its height or width. Centring by
 * default cut heads off. These are the subject's position in the source, given
 * once here so a photograph crops correctly on every page that uses it rather
 * than being corrected component by component.
 *
 * Ids that are already crops (5-stage, 4-canvas, 14-trail and the rest) are
 * absent on purpose: they are framed, so they take the centre.
 */
export const focal = {
  1: "50% 38%",
  2: "50% 45%",
  3: "50% 32%",
  4: "35% 45%",
  5: "50% 45%",
  6: "50% 42%",
  7: "50% 26%",
  8: "50% 24%",
  9: "50% 38%",
  10: "50% 30%",
  11: "50% 50%",
  12: "62% 38%",
  13: "50% 22%",
  14: "50% 28%",
  15: "50% 45%",
  16: "50% 38%",
  17: "50% 32%",
  18: "50% 45%",
  19: "50% 50%",
};

export const img = (id, { width = 700 } = {}) => ({
  src: `${OPT}/${id}-${width}.webp`,
  srcSet: `${OPT}/${id}-700.webp 700w, ${OPT}/${id}-1600.webp 1600w`,
});

export const site = {
  name: "Gurpreet Singh",
  professionalName: "Gurpreet Artist Bathinda",
  role: "Painter, Art Educator, Researcher",
  location: "Bathinda, Punjab, India",
  tagline: "Painting the people, places and stories of Punjab.",
  url: "https://gurpreetartist.com",
};

/** Footer furniture: the two lines that are the footer's own, not the site's. */
export const footer = {
  motto: "Art preserves what matters",
  /** Held as two lines so the script sets the way it is drawn on the plate. */
  script: ["Punjab", "in every brushstroke"],
};

export const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/work", label: "Work" },
  { to: "/archive", label: "Archive" },
  { to: "/exhibitions", label: "Exhibitions" },
  { to: "/achievements", label: "Achievements" },
  { to: "/journal", label: "Journal" },
  { to: "/contact", label: "Contact" },
];

/** One CTA label per intent, used everywhere on the page. */
export const cta = {
  contact: "Enquire",
  work: "Explore the work",
  about: "About the artist",
};

export const hero = {
  eyebrow: "Painting • Portraiture • Heritage",
  title: "Stories, preserved in colour.",
  body:
    "Through portraiture, painting and photography, I document the people, places " +
    "and traditions that shape Punjab’s visual memory.",
  photo: {
    id: "hero",
    alt: "Gurpreet Singh holding a palette and brush beside his oil painting of Maharaja Ranjit Singh with a lion",
  },
};

/** Figures the bio-data supports. No invented counts. */
export const stats = [
  { value: "30+", label: "Years of artistic engagement" },
  { value: "25+", label: "Years teaching Fine Arts" },
  { value: "18", label: "Awards and honours" },
  { value: "4", label: "Countries exhibited in" },
];

/**
 * The archive strip: six frames chosen to span the practice, in a fixed
 * order (archival, painting detail, portrait, gathering, landscape, at work).
 */
export const archive = {
  heading: "The archive",
  intro: "A growing visual record of people, places, objects and moments.",
  frames: [
    { id: 1, alt: "The artist reading among stacked books in window light, black and white", label: "Memory" },
    { id: "12-detail", alt: "Painted surface detail from the Maharaja Ranjit Singh canvas", label: "Paint" },
    { id: 10, alt: "Three artists standing together outdoors", label: "People" },
    { id: "5-stage", alt: "Folk performers lifted mid-dance on a lit stage", label: "Culture" },
    { id: "14-vale", alt: "A valley landscape from the forest walk", label: "Landscape" },
    { id: "15-studio", alt: "The artist at his drafting table, drawing", label: "Studio" },
    { id: "12-face", alt: "Painted close-up of Maharaja Ranjit Singh", label: "Portrait" },
    { id: 2, alt: "Artists gathered before a wall of paintings at an opening", label: "Gathering" },
    { id: "places", alt: "A weathered haveli courtyard seen through an open studded wooden door", label: "Place" },
    { id: "tools", alt: "Worn brushes in a paint-crusted jar beside pigment pots and a loaded palette", label: "Process" },
    { id: 3, alt: "An award presentation on stage at the Lalit Kala Akademi", label: "Recognition" },
    { id: 19, alt: "Visitors queuing along a wall of framed photographs", label: "Exhibition" },
  ],
};

export const about = {
  heading: "Art rooted in people, place and history.",
  paragraphs: [
    "My work begins with observation: of faces, memories, landscapes and the quiet " +
      "details that often disappear with time.",
    "Through painting, portraiture and photography, I explore the relationship " +
      "between identity and place, creating visual records of stories that deserve " +
      "to remain visible.",
    "The work is both personal and archival: a way of remembering where we come " +
      "from while looking at how that history continues to shape us.",
  ],
  link: "Read my story",
  photo: {
    id: "15-studio",
    alt: "Gurpreet Singh at his drafting table in the studio, drawing, black and white",
  },
};

/**
 * Everything the opening practice statement needs beyond `about`: the numbered
 * eyebrow, the four words that run down the left edge, the pull quote, the
 * labelled index frames on the right and the vertical caption that closes the
 * composition. Kept separate from `about` so the /about page is untouched.
 */
export const practiceFeature = {
  index: "01",
  eyebrow: "The practice",
  words: ["People", "Places", "Culture", "Memory"],
  quote: {
    line: "People, places and moments are a continuing inspiration.",
    attribution: site.name,
  },
  lead: {
    photo: {
      id: "15-studio",
      alt: "Gurpreet Singh at his drafting table in the studio, drawing with a fine brush",
    },
    label: ["Studio", "Work"],
    year: "2021",
    counter: { current: "01", total: "05" },
  },
  frames: [
    {
      n: "02",
      label: "The tools",
      photo: { id: "tools", alt: "Worn brushes in a paint-crusted jar beside pigment pots and a loaded palette" },
    },
    {
      n: "03",
      label: "Places",
      photo: { id: "places", alt: "A weathered haveli courtyard seen through an open studded wooden door" },
    },
    {
      n: "04",
      label: "Painting detail",
      photo: { id: "4-detail", alt: "Painted detail of a wolf on weathered boards" },
    },
  ],
  caption: "A continuing visual record",
}

export const featured = {
  heading: "Where people become stories",
  intro:
    "Faces, celebrations, landscapes and fleeting moments, collected through years " +
    "of looking, listening and documenting.",
  lead: {
    photo: { id: 8, alt: "Portrait study of a young man in a peach turban and blue jacket" },
    caption: "Portrait study",
  },
  /**
   * `note` is the handwritten line that sits under each frame; `to` points at
   * the matching category in /work. Photographs were chosen to show the work
   * being made, the culture it records, and the places it is rooted in.
   */
  categories: [
    {
      n: "01",
      title: "Portraits",
      desc: "Faces carrying memory, character and time.",
      note: "Art in process",
      to: "/work/portraiture",
      photo: { id: 7, alt: "Gurpreet Singh working close to the canvas with a fine brush" },
    },
    {
      n: "02",
      title: "Cultural life",
      desc: "Celebrations, rituals and everyday moments that connect generations.",
      note: "People keep culture alive",
      to: "/work/cultural",
      photo: { id: "5-stage", alt: "Folk performers mid-dance on a lit stage, one lifted on another's shoulders" },
    },
    {
      n: "03",
      title: "Places and landscapes",
      desc: "The architecture, streets and landscapes that give these stories a sense of place.",
      note: "Where history stands",
      to: "/work/landscape",
      photo: { id: "places", alt: "A weathered haveli courtyard seen through an open studded wooden door" },
    },
  ],
};


/**
 * The parts of the "Where people become stories" section that sit outside the
 * `featured` copy: the numbered eyebrow, the split headline, the marginal note
 * beside the collage portrait, the vertical rail, and the closing quote band
 * with its filmstrip.
 */
export const storiesSection = {
  index: "02",
  eyebrow: "People and places",
  heading: { lead: "Where people become", accent: "stories" },
  cta: "Explore the stories",
  words: ["People", "Places", "Culture", "Memory"],
  note: "Every person, place and moment carries a story worth remembering.",
  rail: ["Art", "People", "Places", "Culture", "Memory"],
  quote: {
    line: "Art is a way of keeping people, places and moments alive.",
    attribution: site.name,
  },
  caption: "A continuing visual record",
  bleed: { id: 1, alt: "Gurpreet Singh reading among stacked canvases, black and white" },
  strip: [
    { id: 10, alt: "Three artists standing together outside a venue" },
    { id: 14, alt: "A figure walking a forest trail" },
  ],
}

/**
 * Four plates on an even grid. Each carries a number, a one-word title, a line
 * about what that part of the record holds, and a link to the page where more
 * of it lives.
 */
export const essay = {
  heading: { lead: "People. Places.", accent: "Memory" },
  intro: "Every photograph holds a moment. Together, they form a record of a culture in motion.",
  frames: [
    {
      n: "01",
      label: "People",
      desc: "Conversations, friendships and inspirations.",
      to: "/archive",
      photo: { id: 17, alt: "Gurpreet Singh in a shawl, listening to an elder in conversation" },
    },
    {
      n: "02",
      label: "Place",
      desc: "Studios, exhibitions and spaces that bring people together.",
      to: "/exhibitions",
      photo: { id: 2, alt: "Artists gathered before a wall of paintings at a gallery opening" },
    },
    {
      n: "03",
      label: "Tradition",
      desc: "Celebrations, recognitions and a shared cultural spirit.",
      to: "/achievements",
      photo: { id: 3, alt: "An award presentation on stage at the Lalit Kala Akademi" },
    },
    {
      n: "04",
      label: "Memory",
      desc: "Journeys, landscapes and the moments that stay with us.",
      to: "/work",
      photo: { id: "14-trail", alt: "A figure with a pack walking a stone trail through wooded hills" },
    },
  ],
};

/**
 * The frame around the four plates: the numbered eyebrow, the quote that
 * closes the left rail, the studio frame held far back across the top right
 * with its handwritten words, and the strip that closes the section.
 */
export const memorySection = {
  index: "03",
  eyebrow: "A visual journey",
  quote: {
    line: "Art lives through people, places and the moments in between.",
    attribution: site.name,
  },
  ghost: { id: 1, alt: "" },
  marginalia: ["Moments", "People", "Places", "Stories"],
  caption: ["A continuing", "visual", "record"],
  closing: {
    words: ["People", "Places", "Culture", "Memory"],
    line: "Stories live beyond time.",
  },
};

/**
 * The statement that opens the page's single light zone, and the frame around
 * it: the numbered eyebrow, the word the line turns on, the taped studio print
 * and the two word-rails in the right margin.
 */
export const manifesto = {
  index: "04",
  eyebrow: "The work",
  lead: "In an age of rapid change, painting and photography become acts of",
  accent: "remembering",
  body: "They preserve faces, places and fragments of everyday life before they disappear from view.",
  note: "Same people. Different times. Always a story.",
  photo: { id: "15-studio", alt: "Gurpreet Singh drawing at his table, black and white" },
  rails: [
    ["People", "Places", "Culture", "Memory"],
    ["Making", "Stories", "Visible"],
  ],
};

/**
 * Six bodies of work, in the order they are shown: each carries a photograph,
 * a line about what the work is for, and a link to where more of it lives.
 * Architecture has no category page of its own, so it opens the archive.
 */
export const practice = {
  heading: "The work",
  subtitle: ["Different mediums.", "A shared purpose."],
  closing: {
    note: "Art for a kinder tomorrow",
    words: ["People", "Places", "Culture", "Memory"],
  },
  items: [
    {
      n: "01",
      title: "Portraiture",
      desc: "Faces, character and stories captured through painting and photography.",
      to: "/work/portraiture",
      photo: { id: 16, alt: "Gurpreet Singh at the easel, painting a portrait of a young maharaja" },
    },
    {
      n: "02",
      title: "Cultural stories",
      desc: "Traditions, celebrations and communities documented through image.",
      to: "/work/cultural",
      photo: { id: "5-stage", alt: "Folk performers mid-dance on a lit stage, one lifted on another’s shoulders" },
    },
    {
      n: "03",
      title: "Landscape",
      desc: "Places shaped by memory, history and everyday life.",
      to: "/work/landscape",
      photo: { id: "14-vale", alt: "A wooded hillside above a stream, with a walker on the trail" },
    },
    {
      n: "04",
      title: "Photography",
      desc: "A documentary record of people, objects and moments.",
      to: "/work/photography",
      photo: { id: 1, alt: "Gurpreet Singh reading among stacked canvases, black and white" },
    },
    {
      n: "05",
      title: "Architecture",
      desc: "Buildings and spaces as witnesses to history.",
      to: "/archive",
      photo: { id: "places", alt: "A weathered haveli courtyard seen through an open studded door" },
    },
    {
      n: "06",
      title: "Historical work",
      desc: "Visual interpretations of people, events and moments from the past.",
      to: "/work/historical",
      photo: { id: "4-canvas", alt: "Detail of the painting of animal heads mounted on weathered boards against red" },
    },
  ],
};

export const contact = {
  heading: "Let’s keep the stories alive.",
  body: "For exhibitions, commissions, collaborations and conversations about the work.",
};
