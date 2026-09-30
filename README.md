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

## Résumé PDF

The résumé is built from **`resume/index.html`** (one US Letter page) and exported to `assets/Jonathon-Garza-Resume.pdf`, which the site's "Download résumé" button serves.

To update it: edit `resume/index.html`, open it in Chrome, then **Print → Save as PDF** with *Margins: None* and *Background graphics* on. Save over `assets/Jonathon-Garza-Resume.pdf`.

Other versions come from the same source, switched on by adding options to the address:

| PDF | Open |
| --- | --- |
| `assets/Jonathon-Garza-Resume-no-GitHub.pdf` | `resume/index.html?no-github` |
| `assets/Jonathon-Garza-Resume-no-GitHub-dark.pdf` | `resume/index.html?no-github&dark` |

Print each one the same way.
