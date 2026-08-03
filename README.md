# Yash Solanki — Portfolio

Personal portfolio site for Yash Solanki, Application Support Engineer. Built with
Next.js (App Router), GSAP scroll animations, and a Three.js cinematic hero layer.

## Stack

- Next.js 16 (App Router, Server Components by default)
- GSAP for scroll-triggered reveals
- Three.js for the hero background visual
- Web3Forms for the contact form (no backend required)

## Local setup

```bash
npm install
cp .env.local.example .env.local   # then fill in your Web3Forms key
npm run dev
```

Open http://localhost:3000.

## Content

All personal content — bio, experience, projects, case studies, skills, education,
certifications, socials — lives in `data/profile.json` and `data/content.json`.
Edit those files to update the site; the components just render whatever's there.

## Contact form

The contact form posts to Web3Forms. It reads its access key from
`NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`:

- Locally: set it in `.env.local` (already gitignored).
- On Vercel: set it under Project Settings → Environment Variables — Vercel does
  **not** read `.env.local` from the repo, so this step is required for the live
  form to work.

Get a free key at https://web3forms.com.

## Assets to keep current

- `public/assets/YASH.png` — hero photo
- `public/assets/intro.mp4` — optional intro video (falls back to a gradient
  background if this file is missing)
- `public/assets/Yash_Solanki_CV.pdf` — downloadable resume
- `public/mainog2.jpg` — social share preview (LinkedIn/X link previews)

## Deploy

Push to GitHub and import into Vercel, or run:

```bash
npm run build
```

and deploy the output with your platform of choice. Remember to set the
Web3Forms env var in your hosting provider's dashboard, not just locally.
