# ARCHITECTURE.md

## Overview
Static-content Next.js App Router site. No database, no custom backend, no auth.
All dynamic behavior is client-side (form validation, scroll animations, clipboard
copy) or delegated to a third-party API (Web3Forms).

```
data/*.json  →  Server Component sections  →  static HTML (SSR)
                        │
                        └─ Client Component islands (interactivity only)
```

## Rendering Model
`app/page.js` is a **Server Component** — every section's text lands in the initial
HTML for SEO.

| Component | Why it's a Client Component |
|---|---|
| `ui/IntroExperience.jsx` | Loader + video state (`useState`) |
| `ui/Navbar.jsx` | Scroll listener, mobile menu toggle |
| `ui/ScrollAnimations.jsx` | GSAP ScrollTrigger setup (DOM) |
| `ui/CopyEmailLink.jsx` | Clipboard API |
| `sections/ContactForm.jsx` | Form state, validation, submit |
| `sections/HeroSection.jsx` | Typed-role rotation animation |
| `sections/VideoIntro.jsx` | Video play/mute controls |

> **Rule:** default new sections to Server Components. Only add `"use client"` if
> the component uses `useState`/`useEffect` or a browser API. Do **not** add
> `"use client"` to `page.js` — that forces the whole page client-side and was a
> fixed SEO regression (see `CHANGELOG.md`).

## Client-Only 3D/Canvas Components
Three.js touches `window`/`document` at module load, so it's dynamically imported
with SSR disabled:

```js
const HeroBackground = dynamic(() => import("@/components/three/HeroBackground"), { ssr: false });
const CinematicLayer = dynamic(() => import("@/components/three/CinematicLayer"), { ssr: false });
```

> **Rule:** any new Three.js/canvas component must use this `dynamic(..., { ssr: false })`
> pattern — importing directly at top of a Server Component breaks the build.

## Data Flow
1. `data/profile.json` — all personal/professional content (bio, stats, experience,
   projects, case studies, achievements, certifications, education, skills, socials).
2. `data/content.json` — UI copy/labels (section titles, hero pills, footer CTA).
3. Section components `import` these JSON files directly and map over arrays — no
   fetching, no API routes, no CMS.

## Component Render Order (from `app/page.js`)
```
Navbar
ScrollAnimations   (side-effect only, renders nothing)
main
├─ IntroExperience      (loader + video)
├─ HeroSection / AboutSection / ProjectsSection
├─ DevToolingSection / WorkExperienceSection
├─ EducationSection
└─ PublicationsFooterSection  (achievements + certs + skills + contact form + footer)
```

## External Services
| Service | Purpose | Notes |
|---|---|---|
| Web3Forms | Contact form | `POST https://api.web3forms.com/submit`; JSON body includes `access_key` from `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`. Client-exposed key is by design. No server-side proxy. |

No other external APIs, database, or auth provider.

## Deployment
| Item | Detail |
|---|---|
| Target | Vercel (`yash-portfolio-silk.vercel.app` — metadata/sitemap/robots) |
| Required env | `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` set in Vercel Project Settings → Environment Variables; `.env.local` is gitignored and never reaches Vercel |
| Image optimization | Enabled via defaults — do not re-add `images.unoptimized: true` (fixed regression) |

## Design Decisions
- **Single video element.** `VideoIntro.jsx` uses one `<video>`; the ambient blur
  backdrop is a CSS gradient (`.ambientGlow`), not a second video instance.
- **Graceful video fallback.** Missing/failed `intro.mp4` → `onError` swaps to a
  gradient background, never a black screen.
- **No `mailto:` links.** Every Email touchpoint uses `CopyEmailLink` (Clipboard +
  inline "Copied ✓"), avoiding the OS app-picker dialog. Only `ContactForm` sends email.
- **Nav items are `<button>`.** Not `<span onClick>` — fixed for keyboard/a11y; don't
  reintroduce non-semantic clickables.
- **Placeholder links use a sentinel string.** `data/profile.json` projects use literal
  `"PLACEHOLDER_REPO_LINK"` so `ProjectsSection.jsx` renders a "Repo Coming Soon" badge
  instead of a dead link. Check this exact string before changing that logic.