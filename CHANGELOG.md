# CHANGELOG.md

## 0.1.0
### Docs
- Added AI context docs: `PROJECT_CONTEXT.md`, `ARCHITECTURE.md`, `AI_RULES.md`,
  `TODO.md`, `CHANGELOG.md`, `README.md`.

### Content & assets
- Rebuilt from a cinematic template into a fully data-driven site
  (`data/profile.json`, `data/content.json`) with real background/experience/case studies.
- Added Education section (incl. CGPA); Dev Tooling & Personal Projects kept separate
  from professional Core Tools to avoid diluting the OSS/BSS narrative.
- Replaced placeholder portrait and OG image with real photo assets.
- Certifications reflect completed courses only (no dates).

### SEO
- Added metadataBase, Open Graph, and Twitter Card metadata; JSON-LD `Person` schema.
- Added `app/sitemap.js` and `public/robots.txt`.
- Replaced default favicon with a branded monogram.

### Architecture fixes
- Extracted loader/video state into `components/ui/IntroExperience.jsx`; `page.js` is
  now a Server Component (previous `"use client"` on the whole page broke SEO HTML).
- Removed `images.unoptimized: true` from `next.config.mjs` (image optimization restored).
- Merged `VideoIntro.jsx` to a single `<video>`; blur is a CSS gradient (was loading the
  video twice).

### Accessibility & UX
- Converted nav items from `<span onClick>` to real `<button>` elements.
- Added functional mobile nav (hamburger + full panel); fixed hero `Image fill` warning.
- Fixed duplicate "Contact" CTA; pointed at the actual `#contact` form anchor.

### Contact form
- Replaced the `mailto:` "Let's Talk" button with a real Web3Forms-backed form.
- Expanded: full validation, honeypot, Company and Subject fields, character counter,
  toasts, ARIA attributes.

### Email link fixes
- Removed every `mailto:` site-wide; all Email touchpoints use `CopyEmailLink`
  (clipboard + inline "Copied ✓", no OS app-picker dialog).

### Theming
- Reverted experimental cool-blue palette to the original warm amber/orange theme.

## 0.0.x (initial build)
- `acf06da` initial commit · `7692ea5` email/domain/labels · `6e9742b` hero+intro video ·
  `e0c97b3` contact form upgrade · `05ea402`→`264d96c` OG image variants (`?v=` cache bust).