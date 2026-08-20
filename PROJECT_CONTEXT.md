# PROJECT_CONTEXT.md

## Project Identity
- **Name:** Yash Solanki — Personal Portfolio
- **Repo:** yash-solanki-portfolio
- **Live:** https://yash-portfolio-silk.vercel.app
- **Purpose:** Professional portfolio site for Yash Solanki, an Application Support Engineer (CRM & OSS/BSS, ITIL v4, RCA).
- **Problem it solves:** Presents his skills, experience, and credibility to recruiters/hiring managers without a backend — content is fully static and deployable to any host.

## Main Goal
Convert visitors (recruiters, hiring managers) into job/freelance opportunities via a polished, cinematic, single-page experience with a working contact form.

## Development Stage
- **Stage:** Production / live. Content-driven; site renders from JSON data.
- **History:** ~9 commits. Recent work = polish (contact form upgrade, OG image, education CGPA).
- **Deployment:** Vercel; env var for contact form must be set in Vercel dashboard.

## Completed Features
- Cinematic intro: screen-loader "ENTER" gate + `intro.mp4` video with Three.js particle layer
- Hero: typewriter roles, animated stat counters, Three.js wireframe sphere, resume download, copy-email
- Sections: About, Projects, Dev Tooling, Work Experience/Case Studies, Education, Credibility (achievements/certifications/skills), Contact
- Contact form → Web3Forms (client-side validation, honeypot, toasts, subject dropdown, char counter)
- GSAP scroll reveals, parallax, counters (respects `prefers-reduced-motion`)
- SEO: metadata, OG/Twitter images, JSON-LD Person, sitemap, robots.txt

## Current Focus
- Content accuracy (profile.json) and visual polish
- Keeping deployed asset references (images, video, PDF) in sync

## Pending Work
- Replace `PLACEHOLDER_REPO_LINK` in `data/profile.json` project entries (project links not yet set)
- Set real `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` in `.env.local` (currently placeholder)
- See TODO.md for full backlog

## Technology Stack
- Next.js 16 (App Router, Server Components by default) + React 19
- GSAP 3 (ScrollTrigger) — scroll animations, `lib/gsap.js`
- Three.js (dynamically imported, `ssr: false`) — hero + intro visuals
- react-icons (Fi* icons)
- CSS Modules (styles/ mirrors components/)
- Web3Forms — external contact-form API (no own backend)
- Google Fonts (Fraunces + Inter) via `next/font`

## Important Folders/Modules
- `app/` — layout.js (fonts, metadata, JSON-LD), page.js (section composition), sitemap.js, globals.css
- `components/sections/` — the page sections + ScreenLoader/VideoIntro/ContactForm
- `components/three/` — HeroBackground, CinematicLayer (client-only canvases)
- `components/ui/` — Navbar, ScrollAnimations, IntroExperience, CopyEmailLink
- `data/profile.json` — ALL personal content (bio, experience, skills, projects, socials)
- `data/content.json` — site copy/labels (UI strings)
- `lib/gsap.js` — GSAP + ScrollTrigger singleton
- `styles/` — CSS Modules (sections/, ui/) matched 1:1 to components
- `public/assets/` — YASH.png, intro.mp4, Yash-Solanki-Application-Support-Engineer.pdf

## Content Architecture (Important)
- Site content is **data-driven**: edit `data/profile.json` (personal facts) or `data/content.json` (UI copy). Components render whatever is there — no per-fact code changes.
- Rule: prefer updating JSON over editing JSX when only content changes.

## Current Challenges
- `.env.local` holds real Web3Forms key (gitignored) — must be re-set on any fresh clone/vercel env.
- Missing project repo links (`PLACEHOLDER_REPO_LINK`).
- `intro.mp4` is a large asset; video failure falls back to gradient background (handled).

## Future Direction
- Add real project repo links
- Potential new sections/social proof (testimonials, blog)
- Accessibility/performance audits
- See TODO.md

## Rules for AI When Modifying Code
- Read the existing file/component before editing; match its style and conventions.
- Prefer updating JSON data over JSX when content changes.
- Reuse `lib/gsap.js` and existing patterns; don't add animation libraries.
- Client-only Three.js/GSAP code must keep `"use client"` and dynamic imports (`ssr: false`).
- Keep CSS Modules colocated under `styles/` — no inline styles unless already the pattern.
- Don't invent content in data files; use "Needs clarification" for unknowns.
- Keep this file ≤ ~150 lines and ARCHITECTURE.md free of duplication.
- Run `npm run lint` before finishing changes.
