# Jonathon Garza — Portfolio

Personal portfolio for Jonathon Garza, multidisciplinary designer. A hand-built, zero-dependency site: dark/light glass UI, aurora gradients, a cursor-reactive neural particle field, and interactive sections.

## Sections

- **Hero**: animated name reveal and a "prompt" that types out what I do
- **About**: intro, count-up stats, and tilt cards for design principles
- **Skills**: filterable skills & tools; select one to see how I use it and a proficiency meter
- **Experience**: expandable timeline with a scroll-driven progress line
- **Work**: project cards with generative cover art
- **Ask me**: a scripted chat that streams answers
- **Contact**: click-to-copy email and social links
- **⌘K / Ctrl K**: command palette to jump anywhere, copy email, toggle theme

## Editing content

All personal content lives in **`js/content.js`**: name, role, skills, experience, projects and FAQ answers. The résumé download is `assets/Jonathon-Garza-Resume.pdf`. You don't need to touch the HTML, CSS or layout code.

## Running locally

Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

## Deploying

The site is fully static. On GitHub Pages: **Settings → Pages → Deploy from branch**, then choose this branch and `/ (root)`.
