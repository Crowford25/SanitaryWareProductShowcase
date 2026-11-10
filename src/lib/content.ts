/**
 * All page copy and sample data in one place.
 * Aurelia Bath is a prototype brand: names, prices and figures are samples
 * and must be replaced with real, verified data before launch.
 */

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`;

export const site = {
  name: "Aurelia Bath",
  email: "studio@aureliabath.com",
  showroom: "Bangsar showroom, Kuala Lumpur",
  hours: "Monday to Saturday, 10am to 7pm",
  cta: "Book a free consultation",
  ctaShort: "Book a consultation",
};

export const navLinks = [
  { id: "collection", label: "Collection" },
  { id: "process", label: "How it works" },
  { id: "projects", label: "Projects" },
  { id: "faq", label: "FAQ" },
] as const;

export const proof = {
  rating: "4.8",
  reviews: "517",
};

export const logos = [
  { name: "Studio Nord", style: "uppercase tracking-widest" },
  { name: "Form Practice", style: "" },
  { name: "The Ormond Hotel", style: "uppercase tracking-wider" },
  { name: "Amara Collection", style: "" },
  { name: "Teoh & Lim Architects", style: "" },
  { name: "Casa Kenanga", style: "uppercase tracking-widest" },
];

export const images = {
  before: unsplash("photo-1552321554-5fefe8c9ef14"),
  after: unsplash("photo-1620626011761-996317b8d101"),
  brass: unsplash("photo-1564540583246-934409427776"),
  basin: unsplash("photo-1576698483491-8c43f0862543"),
  bath: unsplash("photo-1507652313519-d4e9174996dd"),
  wc: unsplash("photo-1631889993959-41b4e9c6e3c5"),
  shower: unsplash("photo-1603825491103-bd638b1873b0"),
  projectMarble: unsplash("photo-1564540579594-0930edb6de43"),
  projectWhite: unsplash("photo-1629079447777-1e605162dc8d"),
  projectHotel: unsplash("photo-1584622650111-993a426fbf0a"),
  blackMixers: unsplash("photo-1604709177225-055f99402ea3"),
};

export const pains = [
  "Brass from three brands never quite matches",
  "Pipe heights clash with tiles that are already laid",
  "The quote grows every time one piece changes",
];

export const finishes = [
  { name: "Chrome", color: "#cfd2d3" },
  { name: "Brushed brass", color: "#b08d57" },
  { name: "Matte black", color: "#2a2a28" },
  { name: "Brushed nickel", color: "#9a978f" },
];

export const benefits = [
  {
    icon: "ruler",
    title: "Fitted right the first time",
    body: "Your contractor gets rough in drawings with exact pipe heights for every piece before tiling starts.",
    stat: "97.4% of installs need no return visit",
  },
  {
    icon: "receipt",
    title: "One itemised quote",
    body: "Every fixture, the delivery and the handover check on a single quote, with no add ons later.",
    stat: "Final invoices land within 6% of the first estimate",
  },
  {
    icon: "truck",
    title: "Delivered in 19 working days",
    body: "Stocked pieces reach Klang Valley and Singapore sites in one delivery. Made to order finishes take about 7 weeks.",
    stat: null,
  },
  {
    icon: "shield",
    title: "Guaranteed for 15 years",
    body: "15 years on ceramics and solid surface, 7 years on brassware, serviced by our own technicians.",
    stat: null,
  },
] as const;

export const tagline =
  "The bathroom is the first room you see each morning and the last one each night. It should be the calmest room in the house.";

export const collection = [
  {
    name: "Vetra basins",
    detail: "Honed stone and seamless composite basins, countertop or wall hung.",
    price: "From RM 1,480",
    image: images.basin,
    alt: "Vetra countertop basin with a brushed brass mixer on a marble vanity",
  },
  {
    name: "Linea mixers",
    detail: "Slender solid brass mixers in four finishes, with a weighted lever and a ceramic disc cartridge.",
    price: "From RM 865",
    image: images.blackMixers,
    alt: "Wall mounted Linea mixers in matte black above two black vessel basins",
  },
  {
    name: "Forma baths",
    detail: "Freestanding mineral composite baths from 1500 to 1800 mm long.",
    price: "From RM 7,350",
    image: images.bath,
    alt: "Forma freestanding bath in warm stone beside a palm",
  },
  {
    name: "Senso WCs",
    detail: "Rimless wall hung WCs with a soft close seat and a quiet dual flush.",
    price: "From RM 2,260",
    image: images.wc,
    alt: "Senso wall hung WC in a bathroom with timber slat panelling",
  },
  {
    name: "Pioggia showers",
    detail: "Thermostatic rain shower sets with one control for flow and heat.",
    price: "From RM 3,140",
    image: images.shower,
    alt: "Pioggia walk in shower with a matte black rain head and wall control",
  },
];

export const steps = [
  {
    icon: "calendar",
    title: "Book a 45 minute consultation",
    body: "Meet us at the Bangsar showroom or on video. Bring a floor plan, a few photos, or just a rough idea.",
  },
  {
    icon: "ruler",
    title: "Get your plan in 3 working days",
    body: "A layout, a matched product list, rough in drawings and one itemised quote. Yours to keep, even if you buy elsewhere.",
  },
  {
    icon: "wrench",
    title: "We deliver and check the fit",
    body: "Everything arrives on site in one delivery. Our technician checks every connection with your contractor at handover.",
  },
] as const;

export const stats = [
  { value: "4.8", label: "Average rating from 517 reviews" },
  { value: "312", label: "Bathrooms completed since 2019" },
  { value: "97.4%", label: "Fitted with no return visit" },
  { value: "19 days", label: "Average delivery for stocked pieces" },
];

export const testimonials = [
  {
    quote:
      "Our contractor had the drawings two weeks before tiling. Every mixer landed exactly where the plan said, and nothing had to be cut back out of the wall.",
    name: "Nurul Aisyah Rahman",
    role: "Homeowner, Shah Alam",
    project: "Main bathroom with Vetra basins in brushed brass",
    image: images.projectMarble,
    alt: "Marble bathroom with two brass framed mirrors and brushed brass mixers",
  },
  {
    quote:
      "I used to spend days matching brass across three brands. Now I send one specification and the finishes arrive identical, down to the drain covers.",
    name: "Marcus Lim",
    role: "Interior designer, Form Practice, Penang",
    project: "Twin basin ensuite with Senso WC",
    image: images.projectWhite,
    alt: "Bright ensuite with twin white basins, a walk in shower and a wall hung WC",
  },
  {
    quote:
      "We refitted 46 guest bathrooms in 11 weeks without closing a floor. Their technician signed off every room with our contractor before handover.",
    name: "Daniel Teoh",
    role: "General manager, The Ormond Hotel, Singapore",
    project: "46 guest bathrooms in matte black",
    image: images.projectHotel,
    alt: "Guest bathroom with a frameless glass shower, twin vanity and matte black fittings",
  },
];

export const faqs = [
  {
    q: "How much does a full bathroom from Aurelia cost?",
    a: "Most main bathrooms we plan land between RM 14,800 and RM 31,500 for fixtures, before tiling and labour. Your consultation ends with an itemised quote, so you see the exact figure before you commit to anything.",
  },
  {
    q: "Is the consultation really free?",
    a: "Yes. The 45 minute session, your layout and your product list cost nothing, and there is no obligation to order from us.",
  },
  {
    q: "Can my own contractor install the pieces?",
    a: "Yes, and most clients do. We send your contractor rough in drawings before tiling starts, and our technician joins the handover to check every connection.",
  },
  {
    q: "How long does delivery take?",
    a: "Stocked pieces arrive in 19 working days in the Klang Valley and Singapore. Made to order finishes, such as brushed brass shower sets, take about 7 weeks.",
  },
  {
    q: "What does the warranty cover?",
    a: "15 years on ceramics and solid surface, 7 years on brassware and cartridges, and 2 years on the electronic parts in Senso WCs. Service calls are handled by our own team.",
  },
  {
    q: "Can I see the finishes before I decide?",
    a: "Visit the Bangsar showroom, or ask for the free finish sample box at your consultation. It holds all four metal finishes and three stone samples.",
  },
  {
    q: "Do you work with interior designers and architects?",
    a: "Yes. Designers get specification sheets, CAD and BIM files, and a dedicated trade contact. Mention your practice when you book.",
  },
  {
    q: "Do you deliver outside Malaysia and Singapore?",
    a: "We also deliver to Brunei. For other countries, email us and we will confirm freight costs and lead time before you order.",
  },
  {
    q: "What if I change my mind after ordering?",
    a: "Unused stocked pieces can be returned within 30 days for a full refund. Made to order pieces can be changed until production starts, usually 5 working days after you confirm.",
  },
];

export const reassurances = [
  "Free, with no obligation to order",
  "Your plan and drawings are yours to keep",
  "30 day returns on unused stocked pieces",
  "15 year warranty on ceramics",
];

/* ── Motion page (/motion) ─────────────────────────────── */

export const motionHero = {
  lines: ["One room.", "One finish.", "One team."],
  sub: "Basins, mixers, baths, WCs and showers designed to match and planned around your floor plan. Your contractor gets the fitting drawings before tiling, so everything goes in right the first time.",
};

export const snapParts = [
  { name: "Basin", icon: "basin", tint: "#c9a46a", from: { x: -60, y: -105, r: -14, s: 0.9 } },
  { name: "Mixer", icon: "mixer", tint: "#8f8a80", from: { x: 45, y: 95, r: 11, s: 1.08 } },
  { name: "Bath", icon: "bath", tint: "#7a5c32", from: { x: -20, y: -45, r: 17, s: 1 } },
  { name: "WC", icon: "wc", tint: "#d8d2c4", from: { x: 65, y: 120, r: -9, s: 0.94 } },
  { name: "Shower", icon: "shower", tint: "#3b3b39", from: { x: 25, y: -130, r: 13, s: 1.05 } },
] as const;

export const snapCopy = {
  before: {
    label: "The usual way",
    title: "Five suppliers. Five finishes. Five lead times.",
    caption: "Lead times from 2 to 9 weeks, across five deliveries",
  },
  after: {
    label: "The Aurelia way",
    title: "One studio. One finish. Fitted first time.",
    body: "We plan every piece together, from the first sketch to the handover check, and stay accountable for how the whole room fits.",
    caption: "One delivery in 19 working days, checked at handover",
  },
};

export const leadBenefit = {
  title: "One finish across the room",
  body: "Mixers, shower set, towel rails and drain covers come from the same production batch, so the brass on your tap matches the brass on your shower.",
};

export const stepDeliverables = [
  ["Showroom or video", "45 minutes", "No obligation"],
  ["Layout", "Product list", "Rough in drawings", "Itemised quote"],
  ["One delivery", "Handover check", "15 year warranty"],
];

/* ── Home page, editorial layout ───────────────────────── */

/** The usual way: one row per supplier, as a homeowner would actually note it down. */
export const ledger = [
  { piece: "Basin", from: "Tile shop, Puchong", lead: "2 weeks", finish: "Gloss white" },
  { piece: "Mixer", from: "Online marketplace", lead: "3 weeks", finish: "Gold, roughly" },
  { piece: "Bath", from: "Showroom, Petaling Jaya", lead: "6 weeks", finish: "Matte white" },
  { piece: "WC", from: "Contractor's supplier", lead: "1 week", finish: "Bright white" },
  { piece: "Shower set", from: "Imported to order", lead: "9 weeks", finish: "Brushed gold" },
];

export const withAurelia = { piece: "Every piece", from: "Aurelia, Bangsar", lead: "19 working days", finish: "One matched finish" };

export const stepWhen = ["Day 1", "By day 4", "Around week 5"];

export const showroomLead = { name: "Mei Ling Tan", role: "Showroom lead, Bangsar" };
