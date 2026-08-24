# TODO.md

## High priority
- [ ] Confirm `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` is mirrored in Vercel Project Settings
      (a real key exists in local `.env.local`; Vercel does not read that file).
- [ ] Confirm `NEXT_PUBLIC_SITE_URL` is set in Vercel Project Settings (defaults to
      `https://yash-portfolio-silk.vercel.app` if unset).

## Short-term improvements
- [ ] Test contact form end-to-end on the live deployment (submit + confirm inbox delivery).
- [ ] Validate social preview via LinkedIn Post Inspector / X Card Validator; version
      the `?v=` query on `/mainog2.jpg` after edits.
- [ ] Real-device pass: mobile nav, resume download, copy-email button.
- [ ] Re-encode `intro.mp4` (2.6 MB) to a lighter version (< 800 KB, e.g. H.264/VP9)
      and add a poster frame once ffmpeg or an online encoder is available.

## Future improvements
- [ ] Replace Zsmart BSNL case-study entry (no public repo exists — internal project).
- [ ] Submit sitemap to Google Search Console once live and stable.
- [ ] Full accessibility audit (Lighthouse + axe); reduced-motion and focus-visible
      basics are now in place.
- [ ] Performance audit / Lighthouse pass on production build.
- [ ] **Needs clarification:** any additional sections (testimonials, blog) are unconfirmed.
