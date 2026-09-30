# Portfolio

A hand-built, zero-dependency portfolio site for a product designer: dark/light glass UI, aurora gradients, a cursor-reactive neural particle field, and interactive sections.

## Sections

- **Hero**: animated name reveal and a "prompt" that types out what I do
- **About**: intro, count-up stats, and tilt cards for design principles
- **Stack**: filterable toolkit; select a tool to see how I use it and a proficiency meter
- **Experience**: expandable timeline with a scroll-driven progress line
- **Work**: project cards with generative cover art
- **Ask me**: a scripted chat that streams answers
- **Contact**: click-to-copy email and social links
- **⌘K / Ctrl K**: command palette to jump anywhere, copy email, toggle theme

## Editing content

All personal content lives in **`js/content.js`**: name, role, stack, experience, projects and FAQ answers. The values there are samples; replace them with your own. You don't need to touch the HTML, CSS or layout code.

## Running locally

Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

## Deploying

The site is fully static. On GitHub Pages: **Settings → Pages → Deploy from branch**, then choose this branch and `/ (root)`.
