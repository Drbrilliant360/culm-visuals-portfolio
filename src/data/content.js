// All site content lives here. Edit this file, not the components.

const DIM = {
  "dalis-biryani": [1400, 1400],
  "hearing-day": [1081, 1400],
  "sensitivity-2026": [1120, 1400],
};

const piece = (file, title, client, alt, cat = "") => {
  const [w, h] = DIM[file] ?? [1166, 1400];
  return { file, src: `/work/${file}.jpg`, title, client, alt, cat, w, h };
};

export const STUDIO = {
  name: "Culm Visuals",
  city: "Dar es Salaam, Tanzania",
  instagram: "https://www.instagram.com/culm_visuals/",
  handle: "@culm_visuals",
  whatsapp: "https://wa.me/255745139814",
  phones: [
    { label: "+255 745 139 814", href: "tel:+255745139814" },
    { label: "+255 782 486 366", href: "tel:+255782486366" },
  ],
};

export const NAV = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "cases", label: "Case studies" },
  { id: "tools", label: "Tools" },
  { id: "clients", label: "Clients" },
];

export const SECTION_IDS = [...NAV.map((n) => n.id), "contact"];

export const FILTERS = [
  { id: "all", label: "All" },
  { id: "brand", label: "Brand campaigns" },
  { id: "events", label: "Events & ministry" },
  { id: "awareness", label: "Awareness & books" },
];

export const WORKS = [
  piece("wa-bwana-mabwana", "Bwana wa Mabwana — song release", "MUFES · TAFES", "Two worship singers on a blue stage-light poster with a 3 days to go countdown", "events"),
  piece("mtulo-ramadan", "Ramadan Kareem", "Mtulo Tronics", "Purple and gold Ramadan greeting poster with lanterns and a crescent", "brand"),
  piece("sensitivity-2026", "Theme of the Year 2026", "Divine Spiritual Revival Movement", "Glowing figure walking toward light under the word Sensitivity", "events"),
  piece("he-is-risen", "He is Risen", "Malo Pharmacy", "Easter poster with three crosses at sunset and a crown of thorns", "brand"),
  piece("jupiter-mabati", "Jupiter Mabati", "Jupiter Company", "A model house with a red roof balanced on a hand against a blue sky", "brand"),
  piece("hearing-day", "International World Hearing Day", "TASSA · MUHAS", "Girl with a hearing aid looking up against a green background", "awareness"),
  piece("movie-night", "Movie Night", "Crosslife Mission Network", "Black and gold cinema poster with popcorn and film reels", "events"),
  piece("dare-to-dream", "Dare to Dream — book launch", "Daudi Elia Daudi", "Book launch poster with the author and the book cover mockup", "awareness"),
  piece("mtulo-labour-day", "Happy Labour Day", "Mtulo Tronics", "Smiling man in a purple jacket holding stacked phone boxes", "brand"),
  piece("dalis-biryani", "Biryani kuku", "Dalis Biryani", "Chicken biryani in a brass pot on an orange and maroon background", "brand"),
  piece("back-to-eden-today", "Back to Eden — Season 15", "MUFES · TAFES", "Event poster with choir photos and the Back to Eden wordmark", "events"),
  piece("culm-brand-launch", "Brand Launch", "Culm Visuals", "Purple studio brand launch poster with glossy spheres and a services list", "brand"),
];

export const HERO_IMAGES = ["jupiter-mabati", "wa-bwana-mabwana", "mtulo-ramadan"].map(
  (f) => WORKS.find((w) => w.file === f) ?? piece(f, f, "", "")
);

export const SERVICES = [
  { title: "Graphic design", text: "Posters, social media graphics, flyers and campaign visuals that carry a clear message." },
  { title: "Branding", text: "Logos and visual identity: colour, type and layout rules so a brand looks consistent everywhere." },
  { title: "Motion graphics", text: "Animated posts and short motion pieces that make announcements and launches move." },
  { title: "Videography", text: "Event and promotional video, from capture to the final edit." },
  { title: "Photography", text: "Portraits, events and weddings, shot for both print and social." },
  { title: "AI video design", text: "AI-assisted video concepts for brands that need fast, fresh visual content." },
];

// NOTE: challenge / direction copy is drafted from what the posters show.
// Verify against the real briefs, and add measured outcomes only if you can prove them.
export const CASES = [
  {
    id: "mtulo",
    name: "Mtulo Tronics",
    title: "A seasonal campaign system",
    tag: "Brand campaign · Social media",
    colors: ["#6d5df6", "#ffffff", "#1c1b2e", "#e9c46a"],
    overview: "Mtulo Tronics is a phone and electronics retailer in Dar es Salaam that markets itself through Instagram.",
    challenge: "Stay visible through key moments of the year (Ramadan, New Year, Labour Day and Union Day) while looking unmistakably like Mtulo every time.",
    direction: "Built the look around the logo's violet and a clean white canvas. Rounded containers, a bold sans for the headline, script accents for warmth, and the product always shown in hands. A contact bar anchors the base of every poster.",
    deliverables: "4 social media posters (4:5), one per occasion, sharing a single layout system.",
    shots: [
      piece("mtulo-ramadan", "Ramadan Kareem", "Mtulo Tronics", "Purple and gold Ramadan greeting poster with lanterns"),
      piece("mtulo-new-year", "New Year 2026", "Mtulo Tronics", "Phones held in two hands on a diagonal purple band under It's New Year 2026"),
      piece("mtulo-labour-day", "Labour Day", "Mtulo Tronics", "Man in a purple jacket holding stacked phone boxes"),
      piece("mtulo-union-day", "Union Day", "Mtulo Tronics", "Union Day poster with a handshake photo tinted violet above two phones"),
    ],
  },
  {
    id: "eden",
    name: "Back to Eden",
    title: "An event and song-release campaign",
    tag: "Events · Music · Faith",
    colors: ["#0a2a8a", "#2f6bff", "#e11d2a", "#e8e8ee"],
    overview: "Back to Eden is the annual worship night of the Muhimbili University Fellowship of Evangelical Students (MUFES) with TAFES. Season 15 ran on 30 January 2026.",
    challenge: "Build anticipation across several weeks (a fasting-prayer call, countdowns, a song release and the event day itself) so every piece feels like part of one story.",
    direction: "Deep stage-light blues with a single red accent, the silver Back to Eden wordmark in the same position each time, and countdown formats (hourglass, big numerals) that make the days-to-go the hero.",
    deliverables: "5 posters: event-day announcement, countdown, fasting prayer, and two song-release pieces.",
    shots: [
      piece("back-to-eden-today", "Back to Eden — It's today", "MUFES · TAFES", "Event-day poster with choir photos and the Back to Eden wordmark"),
      piece("back-to-eden-countdown", "5 days to go", "MUFES · TAFES", "Countdown poster with an hourglass and performance photos"),
      piece("fasting-prayer", "Fasting Prayer", "MUFES · TAFES", "Sepia photo of a woman praying with a microphone and bold FASTING PRAYER type"),
      piece("mwana-wa-baba", "Mwana wa Baba — song release", "MUFES · TAFES", "Singer on stage with a 3 days to go song release countdown"),
      piece("wa-bwana-mabwana", "Bwana wa Mabwana", "MUFES · TAFES", "Two singers with a 3 days to go countdown"),
    ],
  },
  {
    id: "malo",
    name: "Malo Pharmacy",
    title: "Greetings that stay on brand",
    tag: "Healthcare · Seasonal",
    colors: ["#1f8a3b", "#d62828", "#ffffff", "#f4a261"],
    overview: "Malo Pharmacy serves customers in Mwananyamala and Kunduchi under the line “Improving Lives Together”.",
    challenge: "Send warm New Year and Easter greetings that feel personal without leaving the clean, trustworthy look expected from a pharmacy.",
    direction: "Used the logo's green and red as the palette. New Year turns the pill into a 3D “2026” on a clean white set; Easter moves to a warm sunset red while keeping the same logo and contact layout.",
    deliverables: "2 social media posters (4:5).",
    shots: [
      piece("malo-new-year", "Happy New Year 2026", "Malo Pharmacy", "Happy New Year poster with a red and white pill reading 2026"),
      piece("he-is-risen", "He is Risen", "Malo Pharmacy", "Easter poster with three crosses at sunset and a crown of thorns"),
    ],
  },
];

export const REEL = CASES.flatMap((c) => c.shots);

// Client names are text only. Add logos only with each client's permission.
export const CLIENTS = [
  "MUFES · TAFES", "Mtulo Tronics", "Malo Pharmacy", "Afrinova", "TANPA", "TASSA · MUHAS",
  "Jupiter Mabati", "Dalis Biryani", "Crosslife Mission Network", "Divine Spiritual Revival Movement",
  "Christ Dimensions Ministry", "Bafredo Electronics", "UniOutfits", "Safehands Studio", "SmartElite", "VetexiTech",
];

// Logos: Iconify "logos" (CC0), Devicon (MIT) and theSVG (MIT), saved in /public/tools.
// Trademarks belong to their owners and are shown only to name the tools used.
// TODO: confirm the "use" lines below reflect how each tool is really used.
export const TOOLS = [
  { name: "Adobe Photoshop", short: "Photoshop", use: "Photo editing, compositing and poster design.", logo: "/tools/photoshop.svg", tile: "" },
  { name: "Adobe Lightroom", short: "Lightroom", use: "Colour grading and retouching for photography.", logo: "/tools/lightroom.svg", tile: "" },
  { name: "Canva", short: "Canva", use: "Fast social layouts and editable client templates.", logo: "/tools/canva.svg", tile: "bg-white p-2" },
  { name: "Adobe Premiere Pro", short: "Premiere Pro", use: "Video editing for events, promos and campaigns.", logo: "/tools/premiere.svg", tile: "" },
  { name: "CapCut", short: "CapCut", use: "Quick short-form video and reels.", logo: "/tools/capcut.svg", tile: "bg-black p-3" },
  { name: "Adobe After Effects", short: "After Effects", use: "Motion graphics and animated posts.", logo: "/tools/after-effects.svg", tile: "" },
];

export const MARQUEE = ["Posters", "Brand identity", "Social media design", "Campaign systems", "Photography", "Video"];
