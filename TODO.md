# TODO.md

## High priority
- [ ] Confirm `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` is mirrored in Vercel Project Settings
      (a real key exists in local `.env.local`; Vercel does not read that file).
- [ ] Replace both `"PLACEHOLDER_REPO_LINK"` entries in `data/profile.json`
      (Personal Full-Stack Project, GenAI-Assisted Incident Diagnostics) with real
      GitHub URLs once repos are public.

## Current blockers
| Blocker | Impact |
|---|---|
| Real project repo links not yet available | Blocks removing placeholder-link logic |
| **Needs clarification:** whether a test suite is wanted | No test setup currently exists |

## Short-term improvements
- [ ] Test contact form end-to-end on the live deployment (submit + confirm inbox delivery).
- [ ] Validate social preview via LinkedIn Post Inspector / X Card Validator; version
      the `?v=` query on `/mainog2.jpg` after edits.
- [ ] Real-device pass: mobile nav, resume download, copy-email button.
- [ ] Confirm `intro.mp4` size/compression; lighter fallback for slow networks.

## Future improvements
- [ ] Add real repo links, then simplify the "Repo Coming Soon" placeholder logic.
- [ ] Consider a lightweight test setup (Vitest is familiar per Yash's skills) if the
      project grows beyond a static portfolio.
- [ ] Submit sitemap to Google Search Console once live and stable.
- [ ] Accessibility audit (focus, ARIA; reduced-motion already respected).
- [ ] Performance audit / Lighthouse; code-split unused Three.js.
- [ ] **Needs clarification:** any additional sections (testimonials, blog) are unconfirmed.