# AI_RULES.md

Rules for AI assistants editing this repo. Follow before any change.

## Before changing anything
1. Read `PROJECT_CONTEXT.md` and `ARCHITECTURE.md` first — don't scan the whole repo
   from scratch every session.
2. Check `data/profile.json` / `data/content.json` before touching JSX — most
   "content" requests are a data edit, not a code edit.
3. Check `TODO.md` for known pending work before assuming something is unfinished
   by accident.

## Architecture rules
| Rule | Reason |
|---|---|
| Never add `"use client"` to `app/page.js` | Fixed SEO regression — see `CHANGELOG.md` |
| Default new sections to Server Components | Only mark `"use client"` when `useState`/`useEffect`/browser APIs are needed |
| Any new Three.js/canvas component uses `dynamic(..., { ssr: false })` | Three.js touches `window`/`document` at load time — see `ARCHITECTURE.md` |
| One CSS Module per component under `styles/` | No Tailwind/styled-components unless explicitly instructed |
| Contact form goes through Web3Forms only | No custom backend, no new API routes |

## Content vs. code
- Personal/professional facts (bio, experience, skills, socials) → `data/profile.json`.
- UI copy/labels (section titles, button text) → `data/content.json`.
- Never hardcode personal content in a `.jsx` if it can live in one of the above.

## Reuse before adding
- Check `components/ui/` for an existing pattern (`CopyEmailLink`, button-based nav)
  before writing something new.
- Don't add a dependency if GSAP, Three.js, or react-icons (already installed) can do it.
- Don't reintroduce `mailto:` links — use `CopyEmailLink` or `ContactForm`. Fixed
  twice; don't regress it.

## Change workflow
- Explain major changes before implementing; flag conflicts with `ARCHITECTURE.md`
  instead of silently overriding documented decisions.
- Don't invent content/facts in data files — mark unknowns `"Needs clarification"`.
- No destructive `git`/file ops, wholesale data overwrites, or dependency changes
  without confirmation.
- Maintain the dark/amber cinematic aesthetic — a deliberate design choice.
- Match existing file style and conventions; reuse `lib/gsap.js`.

## Verification
- Run `npm run lint` before finishing. `npm run build` catches SSR issues.
- Never commit `.env.local`, `.log` files, `.txt` scratch files, or placeholder keys.