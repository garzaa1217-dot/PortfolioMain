/**
 * ─────────────────────────────────────────────────────────────
 *  PORTFOLIO CONTENT
 *  Everything personal lives here. Edit this file only — the
 *  layout, animations and interactions read from it.
 *  Values below are SAMPLE content: replace them with your own.
 * ─────────────────────────────────────────────────────────────
 */
window.PORTFOLIO = {
  name: "Your Name",
  initials: "YN",
  role: "Product Designer",
  location: "Austin, TX",
  availability: "Open to new roles · 2026",
  email: "hello@yourname.design",
  resumeUrl: "#", // link to a PDF résumé
  socials: [
    { label: "LinkedIn", url: "https://linkedin.com/in/yourname" },
    { label: "GitHub", url: "https://github.com/garzaa1217-dot" },
    { label: "Dribbble", url: "https://dribbble.com/yourname" },
  ],

  // The hero "prompt" types these out one after another.
  prompts: [
    "design interfaces that feel inevitable",
    "turn messy systems into calm products",
    "prototype with code, not just pixels",
    "pair human taste with machine speed",
  ],

  intro:
    "I'm a product designer who works where craft, systems thinking and AI meet. I design end-to-end — from research and strategy to shipped, production-ready UI — and I prototype in code so ideas can be felt, not just seen.",

  stats: [
    { value: 6, suffix: "+", label: "years designing products" },
    { value: 40, suffix: "+", label: "features shipped" },
    { value: 3, suffix: "", label: "design systems built" },
    { value: 12, suffix: "M", label: "users reached" },
  ],

  // "Window into how I work" — principles shown as tilt cards.
  principles: [
    {
      title: "Clarity over cleverness",
      body: "The best interface is the one people never have to think about. I cut until only the essential remains.",
      glyph: "◐",
    },
    {
      title: "Systems, then screens",
      body: "Tokens, components and patterns first — so every new screen is faster, more consistent and easier to ship.",
      glyph: "▦",
    },
    {
      title: "Prototype to learn",
      body: "I build real, interactive prototypes early. Feel beats describe; data beats debate.",
      glyph: "⌘",
    },
    {
      title: "AI as a collaborator",
      body: "I design with and for AI — using it to explore faster, and crafting interfaces that make models trustworthy.",
      glyph: "✦",
    },
  ],

  // Stack. level: 1–5. category must match one of stackCategories.
  stackCategories: ["Design", "Prototyping", "Code", "AI", "Research"],
  stack: [
    { name: "Figma", category: "Design", level: 5, note: "Home base. Auto-layout systems, variables, component libraries and dev-mode handoff." },
    { name: "FigJam", category: "Design", level: 4, note: "Workshops, journey maps and async critique with product and engineering." },
    { name: "Adobe CC", category: "Design", level: 4, note: "Illustrator and Photoshop for brand, iconography and marketing assets." },
    { name: "Framer", category: "Prototyping", level: 5, note: "High-fidelity prototypes and shipped marketing sites with real interactions." },
    { name: "Protopie", category: "Prototyping", level: 4, note: "Sensor-driven and multi-device prototypes for usability testing." },
    { name: "Rive", category: "Prototyping", level: 3, note: "Interactive state-machine animations for onboarding and empty states." },
    { name: "HTML / CSS", category: "Code", level: 5, note: "Semantic, accessible markup and modern CSS — grid, container queries, custom properties." },
    { name: "React", category: "Code", level: 4, note: "Component prototypes that engineers can lift straight into production." },
    { name: "Tailwind", category: "Code", level: 4, note: "Mapping design tokens to utility classes for a shared design/dev language." },
    { name: "Storybook", category: "Code", level: 3, note: "Documenting components alongside the design system in Figma." },
    { name: "Claude", category: "AI", level: 5, note: "Research synthesis, UX writing, and generating coded prototypes from sketches." },
    { name: "Cursor", category: "AI", level: 4, note: "AI-assisted coding to take prototypes from idea to working build in hours." },
    { name: "Midjourney", category: "AI", level: 4, note: "Mood boards, visual exploration and art direction references." },
    { name: "v0", category: "AI", level: 3, note: "Rapid UI scaffolding to test layout ideas before refining by hand." },
    { name: "Maze", category: "Research", level: 4, note: "Unmoderated tests and prototype metrics at scale." },
    { name: "Dovetail", category: "Research", level: 4, note: "Tagging interviews and building a searchable insight repository." },
    { name: "Amplitude", category: "Research", level: 3, note: "Funnel and retention analysis to decide what to design next." },
  ],

  // Experience — newest first.
  experience: [
    {
      company: "Northwind Labs",
      role: "Senior Product Designer",
      period: "2023 — Present",
      location: "Remote",
      summary: "Leading design for an AI-assisted analytics platform used by 2,000+ teams.",
      highlights: [
        "Designed the conversational query interface, lifting weekly active use by 38%.",
        "Built a token-based design system used across 4 product teams.",
        "Introduced coded prototyping, cutting design-to-dev handoff time by half.",
      ],
      tags: ["AI UX", "Design Systems", "B2B SaaS"],
    },
    {
      company: "Helios Health",
      role: "Product Designer",
      period: "2021 — 2023",
      location: "Austin, TX",
      summary: "Owned the patient mobile experience from research through launch.",
      highlights: [
        "Redesigned appointment booking, raising completion from 61% to 84%.",
        "Ran 40+ usability sessions and set up the team's research repository.",
        "Shipped WCAG 2.2 AA accessibility across the app.",
      ],
      tags: ["Mobile", "Healthcare", "Research"],
    },
    {
      company: "Studio Parallel",
      role: "UI/UX Designer",
      period: "2019 — 2021",
      location: "Dallas, TX",
      summary: "Agency work across fintech, retail and hospitality clients.",
      highlights: [
        "Delivered 15+ web and app projects from discovery to launch.",
        "Created brand and UI kits that clients carried in-house.",
      ],
      tags: ["Agency", "Branding", "Web"],
    },
  ],

  // Selected work. `hue` drives each card's generated gradient art.
  projects: [
    {
      title: "Atlas — Conversational analytics",
      year: "2025",
      tags: ["AI", "Product", "System"],
      blurb: "Ask a question, get a chart. Designing trust, transparency and control into an AI data assistant.",
      hue: 265,
      url: "#",
    },
    {
      title: "Pulse — Patient booking",
      year: "2022",
      tags: ["Mobile", "Research"],
      blurb: "Rebuilding a 9-step booking flow into 3 — and raising completion by 23 points.",
      hue: 190,
      url: "#",
    },
    {
      title: "Loom UI — Design system",
      year: "2024",
      tags: ["System", "Code"],
      blurb: "200+ components, one source of truth: tokens synced from Figma to code.",
      hue: 320,
      url: "#",
    },
  ],

  // "Ask me" terminal: suggested questions and scripted answers.
  faq: [
    { q: "What kind of designer are you?", a: "A product designer with a systems brain and a prototyper's hands. I'm happiest owning a problem end-to-end — research, strategy, interaction, and the final pixels." },
    { q: "How do you use AI in your process?", a: "As a collaborator, not a replacement. I use it to synthesize research, explore visual directions and generate coded prototypes quickly — then apply taste and judgment to decide what ships." },
    { q: "What are you looking for next?", a: "A product team building something ambitious — ideally at the intersection of AI and everyday tools — where design has a real seat at the table." },
    { q: "Can you code?", a: "Yes — enough to be dangerous and useful. HTML, CSS and React for prototypes, and I speak fluent design tokens with engineers. This site is hand-built." },
  ],
};
