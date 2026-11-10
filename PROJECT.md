# AURELIA BATH — Project Guide

## Purpose
A conversion landing page for a sanitary ware brand, built with the `landing-page-design` skill. One offer, one audience, one action: homeowners in Malaysia and Singapore book a free bathroom design consultation. It is intentionally not an e-commerce application.

Strategy, copy, FAQ and SEO decisions live in `LANDING_BRIEF.md`.

There are two designs of the same page:
- `/` — light, calm version (the indexed home page)
- `/motion` — dark, motion led variant for comparison (`noindex`, canonical `/`)

## Technology stack
- Next.js 16 App Router, React 19, TypeScript
- Tailwind CSS 4 with design tokens and named text styles in `src/app/globals.css`
- Manrope via `next/font/google` (the only typeface)
- Phosphor icons (`@phosphor-icons/react`, `/ssr` entry in server components)
- No animation libraries: IntersectionObserver plus CSS transitions on one base curve

## Folder structure
- `src/app`: home page, layout and metadata, `/privacy`, `/terms`, branded 404, `icon.svg`, `robots` and `sitemap` (static at build time)
- `public/og-image.png`: the social sharing image, referenced from the layout metadata
- `src/components/layout`: floating nav with mobile panel, footer
- `src/components/sections`: one file per home page section, in page order (`Faq` and `TaglineReveal` take a tone and are shared with `/motion`)
- `src/components/motion`: sections and primitives for `/motion` (magnetic link, tilt card, curtain image, odometer, velocity marquee, pinned collection, stacked steps)
- `src/lib/motion.ts`: shared scroll engine (one rAF throttled listener, weighted scrubbing, progress helpers)
- `src/components/ui`: `Reveal`, `ButtonLink`, `Container`/`SectionHeader`, `BeforeAfter`, `ConsultationForm`, `LegalPage`
- `src/lib/content.ts`: every piece of copy, price, stat, testimonial and image URL
- `src/lib/consultation.ts`: form validation
- `src/lib/submitConsultation.ts`: sends the booking form to `NEXT_PUBLIC_FORM_ENDPOINT` (for example Formspree), or opens a pre-filled email when none is set

## Page structure
Hero → logo strip → problem to solution (before and after slider) → benefits → tagline reveal → collection → how it works → proof (stats and testimonials) → FAQ (with FAQPage JSON-LD) → final CTA with consultation form → footer.

## Design system
- Editorial layout on the home page: a 12 column grid with numbered section labels in the left margin, headings offset into columns 4 to 12, hairline rules instead of card grids, a supplier ledger table, staggered product plates with captions, one featured pull quote and a dated timeline
- Navigation is split into a logo pill on the left and a link pill on the right. This departs from the skill's single centred bar on purpose, because the centred layout read as a template
- Light theme: ivory `#f6f4ef`, paper `#fbfaf7`, ink `#1b1a17`, muted `#5f5b53`, line `#e2ddd3`, brass `#a78652`
- Dark bands use only the approved dark backgrounds: `#131209`, `#1f1f1f`, `#272727`, `#313131`
- Text uses named styles only (`heading-1` … `caption-5`, plus `body-7` for lead paragraphs), all on Tailwind's type scale
- Spacing uses only the 2, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96 px scale
- Nested radii follow outer minus gap (for example a `rounded-2xl` card with 8px padding holds `rounded-lg` images)
- No background gradients; the hero heading is the only gradient, and only on text
- Main buttons: 8px by 12px padding, `button-md`, pill radius

## Motion
- `/motion` adds pinned scroll scrubbing, a velocity marquee, 3D tilt, curtain reveals, odometer stats and tap ripples; see `LANDING_BRIEF.md` for the full motion map
- Base curve `cubic-bezier(0.22, 1, 0.36, 1)` (`ease-soft`), also set as Tailwind's default transition curve
- Sections rise 32px and fade in once via `Reveal` (IntersectionObserver); content stays visible without JavaScript
- Tagline words brighten one at a time from a rAF throttled scroll listener that only runs while the section is on screen
- Mobile menu: full height blurred panel, links stagger 60ms apart, capped at 400ms
- `prefers-reduced-motion` removes all movement and shows the tagline at full colour

## Prototype data
Aurelia Bath is fictional. Every name, price, statistic, testimonial, address detail and logo in `src/lib/content.ts` is a believable sample and must be replaced with real, verified data before launch.

## Remaining work before launch
- Create a form service endpoint (for example Formspree) and save it as the `FORM_ENDPOINT` repository variable; until then the form opens the visitor's email app
- Replace Unsplash photography with licensed product and project photography
- Have the privacy policy and terms reviewed by counsel
- Add a cookie banner only if analytics or advertising cookies are introduced

## Known issues
- Most photos are remote Unsplash assets and need a network connection; the hero photo is local (`public/images/hero-bathroom.jpg`)
- The sharing image (`public/og-image.png`) uses a default sans font, not Manrope; regenerate it if the headline changes
- Images are served unoptimized because GitHub Pages has no image server

## Validation status
- ESLint, TypeScript and `next build`: passing
- Browser QA at 1280px and 390px: no horizontal overflow, primary CTA visible in the first screen on mobile, mobile menu, FAQ, form errors and form success verified; no console errors
- `/motion` checked at 1280px and 390px, mid animation and with reduced motion emulated
- `/does-not-exist` returns a 404 status with the branded page

## Run the project
1. `npm install`
2. `npm run dev`
3. Open the local URL shown by Next.js.
4. `npm run lint` and `npm run build` validate the project. `npm run build` writes the static site to `out/`; `npm start` does not apply to a static export.

## Deployment (GitHub Pages)
The site is a static export (`output: "export"` in `next.config.ts`) published by `.github/workflows/deploy-pages.yml` on every push to `main`, or manually from the Actions tab.

One time setup:
1. Repository Settings > Pages > Build and deployment > Source: **GitHub Actions**.
2. Optional: Settings > Secrets and variables > Actions > Variables > `FORM_ENDPOINT` with your form service URL.

The workflow sets `NEXT_PUBLIC_BASE_PATH` (`/SanitaryWareProductShowcase`) and `NEXT_PUBLIC_SITE_URL` (`https://crowford25.github.io/SanitaryWareProductShowcase`) from the Pages configuration, so links, assets, canonical URLs and sharing tags resolve under the project path. Locally both are empty and the site runs at the root.
