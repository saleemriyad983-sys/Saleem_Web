# Futuristic Web Engineer Portfolio

A bilingual (English / Arabic, LTR / RTL) personal portfolio. Plain HTML + CSS + JavaScript, **no build step, no npm dependencies**.
Everything you see is placeholder content in `[brackets]` until you replace it.

> **Design note:** this was built from the written brief (dark navy, glassmorphism, neon blue, floating nav). The reference video was not available when it was built, so the layout follows the brief rather than a frame-by-frame copy. Send the video again and the visuals can be tuned to match.

## Folder structure

```
portfolio/
├── index.html                 Page structure (semantic HTML, SEO meta tags)
├── css/styles.css             All styling (logical properties → RTL works automatically)
├── js/
│   ├── data.js                ★ YOUR CONTENT: profile, social, skills, projects, certificates
│   ├── i18n.js                ★ Interface labels in English + Arabic
│   └── main.js                Rendering, language switch, animations, dialogs, form
├── assets/images/
│   ├── profile-placeholder.svg
│   ├── project-placeholder.svg
│   ├── certificate-placeholder.svg
│   ├── profile.jpg            ← you add (name is up to you)
│   ├── projects/              ← you create: project screenshots
│   └── certificates/          ← you create: certificate images
└── README.md
```

## Run locally

Any of these:

- **Quickest:** double-click `index.html`.
- **Recommended:** serve the folder, e.g. `python3 -m http.server 8000` inside `portfolio/`, then open <http://localhost:8000>.
- **XAMPP:** copy the folder into `htdocs/` and open `http://localhost/portfolio/`.

## Replace images

Put files in `assets/images/` and point to them from `js/data.js`:

| What | Where to put it | Where to reference it |
|---|---|---|
| Profile photo | `assets/images/profile.jpg` | `profile.photo: "assets/images/profile.jpg"` |
| Project screenshot | `assets/images/projects/my-app.png` | that project's `image` |
| Certificate | `assets/images/certificates/course.jpg` | that certificate's `image` |

An empty `""` (or a wrong path) automatically shows the placeholder. Recommended sizes: profile 600×600 square, projects 1600×1000 (16:10), certificates in their natural ratio. Use JPG/WebP and keep each under ~300 KB.

## Change personal information

Edit the `profile` block in `js/data.js`: name, title, intro, typing roles, bio, education, experience, interests, stats, email. Every text field is `{ en: "...", ar: "..." }`. Social links are in the `social` list; leave `url: ""` and the icon shows disabled instead of a fake link.

## Edit skills

`skills` in `js/data.js` is a list of categories, each with `items`. Add, remove or rename freely:

```js
{ name: "Laravel", abbr: "Lv", level: null }
```

`level: null` shows no level (the default, so nothing is claimed for you). `level: 1..5` shows a 5-dot indicator. Badges use short text (`abbr`) rather than official logos so the site has no external dependency; swap `.skill-badge` content for `<img>` icons if you prefer.

## Add a project

Copy a block inside `projects` in `js/data.js`:

```js
{
  id: "my-shop",                       // unique
  category: "web",                     // an id from projectCategories
  title:       { en: "My Shop", ar: "متجري" },
  description: { en: "Short text",  ar: "نص مختصر" },
  details:     { en: "Longer text", ar: "نص أطول" },
  tech: ["PHP", "MySQL"],
  image: "assets/images/projects/my-shop.png",
  links: { demo: "https://…", source: "https://github.com/…" }   // "" = disabled button
}
```

New categories go in `projectCategories`; the filter buttons update automatically. There is no limit on projects.

## Add a certificate

Copy a block inside `certificates` (only add ones you actually earned), set `id`, `title`, `issuer`, `date`, `description`, `image`. Clicking opens the lightbox. Delete the three placeholder entries when you add your own.

## Edit translations

- **Your content** (name, bio, projects…): `{ en, ar }` pairs in `js/data.js`.
- **Interface labels** (menu, buttons, form messages): `js/i18n.js`. Keep both languages' keys identical.
- To add a new label: add the key to both `en` and `ar`, then use `data-i18n="section.key"` in `index.html`.

The selected language is saved in `localStorage`; switching sets `lang`, `dir="rtl|ltr"`, swaps the font (Cairo for Arabic) and re-renders without reloading.

## Contact form

No backend is bundled, and the site never pretends a message was delivered:

- **Not configured (default):** the form validates. If `profile.email` is set it opens the visitor's email app; otherwise it says plainly that nothing was sent.
- **Configured:** put a form-service URL (e.g. Formspree, Getform) in `settings.contactFormEndpoint` in `js/data.js`. Messages are then POSTed there and success / failure is shown honestly.

## Deploy

It is a static site, so upload the whole folder to any static host:

- **GitHub Pages:** push to a repo → Settings → Pages → deploy from branch `main` / root.
- **Netlify / Vercel / Cloudflare Pages:** drag-and-drop the folder (no build command, publish directory `.`).
- **Shared hosting / XAMPP:** copy the folder into `public_html/` or `htdocs/`.

Before publishing: replace the `[placeholders]`, set the real page title/description in `js/i18n.js` (`meta.*`) and the `<title>`/`og:` tags in `index.html`.

## Notes

- Fonts (Cairo, Space Grotesk) load from Google Fonts; offline, system fonts are used instead.
- Animations respect `prefers-reduced-motion`. No custom cursor is used, since it hurts usability.
