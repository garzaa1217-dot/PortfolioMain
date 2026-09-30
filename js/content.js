/**
 * ─────────────────────────────────────────────────────────────
 *  PORTFOLIO CONTENT
 *  Everything personal lives here. Edit this file only — the
 *  layout, animations and interactions read from it.
 *  Optional fields: experience `location`, `summary`, `highlights`,
 *  `tags`; project `url` (cards without one aren't links).
 * ─────────────────────────────────────────────────────────────
 */
window.PORTFOLIO = {
  name: "Jonathon Garza",
  initials: "JG",
  role: "Multidisciplinary Designer",
  location: "Austin, TX",
  availability: "Senior Visual Designer at Visa · Austin, TX",
  email: "garzaa1217@gmail.com",
  resumeUrl: "assets/Jonathon-Garza-Resume.pdf",
  socials: [
    { label: "Website", url: "https://jonathongarza.com" },
    { label: "GitHub", url: "https://github.com/garzaa1217-dot" },
  ],

  // The hero "prompt" types these out one after another.
  prompts: [
    "tell stories through motion, video and visual design",
    "turn complex cloud and AI ideas into clear animation",
    "build AI tools that automate creative work",
    "ship internal apps with Claude Code",
  ],

  intro:
    "I'm a creative and strategic multidisciplinary designer with 8+ years crafting brand experiences through visual design, motion and storytelling. Today I lead AI design technology at Visa — piloting tools, building design pipelines, and shipping the internal apps my org uses.",

  stats: [
    { value: 8, suffix: "+", label: "years of design experience" },
    { value: 5, suffix: "", label: "companies — Visa, AWS, USAA, IBM, Rackspace" },
    { value: 7, suffix: "", label: "roles across visual, motion, UX & art direction" },
    { value: 4, suffix: "", label: "years of motion & art direction at AWS" },
  ],

  // "Window into how I work" — principles shown as tilt cards.
  principles: [
    {
      title: "Story first",
      body: "A writer by training, I start with the narrative — then choose the motion, visuals and pacing that tell it best.",
      glyph: "¶",
    },
    {
      title: "Motion with purpose",
      body: "Animation should explain, guide and clarify. Every movement earns its place in the story.",
      glyph: "◐",
    },
    {
      title: "On-brand, accessible",
      body: "Consistency and accessibility aren't constraints — they're what lets great work scale across a global brand.",
      glyph: "▦",
    },
    {
      title: "AI as a collaborator",
      body: "I build AI tools and pipelines that automate the repetitive work, so craft and ideas get more of the time.",
      glyph: "✦",
    },
  ],

  // Skills & tools. level: 1–5 (self-assessed — adjust to taste).
  // category must match one of stackCategories.
  stackCategories: ["Motion", "Visual", "3D", "AI & Code"],
  stack: [
    { name: "Motion Design", category: "Motion", level: 5, note: "Motion and video for training, enablement, localization and cloud/AI stories at AWS — and prototypes and motion at Visa." },
    { name: "2D/3D Animation", category: "Motion", level: 5, note: "Animated explainers used globally, turning complex technical ideas into clear visual stories." },
    { name: "UX Motion", category: "Motion", level: 4, note: "Interaction and interface motion that guides users and makes products feel responsive." },
    { name: "Video Production", category: "Motion", level: 5, note: "End-to-end video — from script and storyboard through edit and localization." },
    { name: "Rive", category: "Motion", level: 4, note: "Interactive, state-driven animation for products and prototypes." },
    { name: "Visual Design", category: "Visual", level: 5, note: "Brand-consistent visual systems for Visa, AWS, IBM, USAA and Rackspace." },
    { name: "Art Direction", category: "Visual", level: 5, note: "Setting visual direction for motion and video, and keeping it aligned with AWS and Amazon brand." },
    { name: "Illustration", category: "Visual", level: 4, note: "Custom illustration for explainers, marketing and brand storytelling." },
    { name: "3D Modeling", category: "3D", level: 4, note: "Modeling assets and scenes for 3D animation and product storytelling." },
    { name: "AI Animation", category: "AI & Code", level: 5, note: "Using generative AI in motion and video workflows — and building tools that automate that work." },
    { name: "Claude Code", category: "AI & Code", level: 5, note: "Building design pipelines and shipping internal applications that the org uses today." },
    { name: "AI Design Tooling", category: "AI & Code", level: 5, note: "Leading AI design technology for my team — piloting tools and setting how the org uses them." },
  ],

  // Experience — newest first.
  experience: [
    {
      company: "Visa",
      role: "Senior Visual Designer",
      period: "2025 — Present",
      location: "Austin, TX",
      summary: "Leading AI design technology for the team.",
      highlights: [
        "Lead AI design technology for the team, piloting tools and setting how the org uses them.",
        "Own prototypes, motion and video, and build AI tools that automate that work.",
        "Build design pipelines and ship internal applications with Claude Code that the org uses now.",
      ],
      tags: ["AI Design", "Motion", "Prototyping", "Claude Code"],
    },
    {
      company: "AWS",
      role: "Motion Designer / Art Director",
      period: "Nov 2021 — Nov 2025",
      location: "Seattle, WA",
      summary: "Motion, video and art direction for AWS training and cloud/AI storytelling.",
      highlights: [
        "Produced motion and video for training, enablement, localization and cloud/AI stories.",
        "Created animated explainers used globally.",
        "Collaborated with instructional designers, producers and subject-matter experts.",
        "Kept visual consistency and accessibility with AWS and Amazon brand.",
      ],
      tags: ["Motion", "Art Direction", "Video", "Accessibility"],
    },
    { company: "Visa", role: "Senior Graphic Designer", period: "Jan 2020 — Nov 2021", location: "Austin, TX", tags: ["Graphic Design", "Brand"] },
    { company: "USAA", role: "UX/UI Designer", period: "May 2019 — Jan 2020", location: "San Antonio, TX", tags: ["UX", "UI"] },
    { company: "IBM", role: "Visual Designer", period: "Jun 2018 — May 2019", location: "Austin, TX", tags: ["Visual Design"] },
    { company: "USAA", role: "Technical Designer", period: "Oct 2017 — Jun 2018", location: "San Antonio, TX", tags: ["Technical Design"] },
    { company: "Rackspace", role: "Graphic Designer", period: "Jun 2016 — Oct 2017", location: "San Antonio, TX", tags: ["Graphic Design"] },
  ],

  education: "B.A. in English Writing — University of Texas at San Antonio",

  // Selected work. `hue` drives each card's generated gradient art.
  // Add a `url` to link a card to a case study.
  projects: [
    {
      title: "AI design pipelines",
      year: "Visa · 2025",
      tags: ["AI", "Claude Code", "Tooling"],
      blurb: "Design pipelines and internal applications built with Claude Code — tools that automate prototype, motion and video work across the org.",
      hue: 225,
    },
    {
      title: "Global animated explainers",
      year: "AWS · 2021–25",
      tags: ["Motion", "Art Direction"],
      blurb: "Animated explainers for training, enablement and cloud/AI stories — localized and used by audiences around the world.",
      hue: 30,
    },
    {
      title: "Brand motion & visual systems",
      year: "2016–Present",
      tags: ["Visual", "Brand", "UX"],
      blurb: "Visual, graphic and UX design for Visa, IBM, USAA and Rackspace — keeping every brand consistent, accessible and alive.",
      hue: 290,
    },
  ],

  // "Ask me" chat: suggested questions and scripted answers.
  faq: [
    { q: "What kind of designer are you?", a: "Multidisciplinary. I move between visual design, motion, 2D/3D animation, video and UX motion — and I art-direct across all of them. The common thread is storytelling." },
    { q: "How do you use AI in your work?", a: "I lead AI design technology for my team at Visa — piloting tools and setting how the org uses them. I build AI tools that automate prototype, motion and video work, and I ship internal apps with Claude Code." },
    { q: "What did you do at AWS?", a: "Four years as a motion designer and art director. I produced motion and video for training, enablement, localization and cloud/AI stories, and created animated explainers used globally — while keeping everything on-brand and accessible." },
    { q: "Why an English degree?", a: "I studied English Writing at UTSA. It's why I think story-first: every animation, layout and video starts with what we're trying to say and who we're saying it to." },
  ],
};
