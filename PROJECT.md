# AURELIA BATH — Project Guide

## Purpose
A premium, motion-led sanitary ware brand presentation and lead-generation landing page. It is intentionally not an e-commerce application.

## Technology stack
- Next.js 16 App Router, React 19, TypeScript
- Tailwind CSS 4 plus a project-specific global design layer
- GSAP + ScrollTrigger for pinned, scrubbed and staged scroll sequences
- Framer Motion for entrances, state transitions, counters and micro-interactions
- Lenis for smooth scrolling
- Lucide React for restrained interface iconography

## Folder structure
- `src/app`: route, metadata and global design system
- `src/components/layout`: navigation and footer
- `src/components/sections`: each major narrative section
- `src/components/ui`: smooth scroll, cursor, magnetic button, progress and section title primitives
- `src/lib/constants.ts`: replaceable image URLs and collection/product data

## Design system
- Palette: ivory `#f2eee5`, warm white `#f8f6f1`, stone `#cbc4b8`, charcoal `#20211f`, muted brass `#a78652`
- Display type: Didot/Bodoni/Georgia serif stack; UI type: Arial/Helvetica grotesk stack
- Editorial grids, sharp image edges, restrained rules, minimal radius and generous whitespace
- Breakpoints are shaped around content at 1100px, 900px, 768px and 560px

## Animation strategy
- GSAP: hero timeline/parallax, desktop pinned horizontal collection, staged FORMA story, fullscreen image expansion
- Framer Motion: reusable reveal motions, collection/material entrances, finish transitions, navigation, counters and magnetic controls
- CSS: marquee, link underline, image hover zoom, scroll cue
- Motion is disabled or simplified through `prefers-reduced-motion`; expensive cursor and pinned effects are disabled on touch/smaller screens
- Every GSAP context and ScrollTrigger is reverted on unmount

## Completed sections
Hero, brand philosophy, editorial collections, horizontal product gallery, FORMA 01 story, materials, before/after comparison, faucet finish customizer, craftsmanship, animated statistics, architect projects, fullscreen transition, marquee, testimonials, contact CTA, responsive navigation, custom cursor and footer.

## Remaining work
No core feature is intentionally unfinished. Production launch would replace prototype Unsplash photography with licensed campaign assets, connect lead buttons to the brand's preferred CRM, and add final legal/privacy routes.

## Known issues
- Prototype images are remote Unsplash assets and require a network connection.
- Finish switching uses art-directed color treatment on one prototype faucet image; production should use dedicated transparent product renders for each finish.

## Validation status
- ESLint: passing
- TypeScript (`tsc --noEmit`): passing
- Next.js production build: passing
- Browser QA: verified at 1920px desktop, 768px tablet, and 430px mobile; mobile menu and finish selection interactions verified; no browser console errors

## Asset reliability
- The cinematic fullscreen transition uses `public/images/transition-bathroom.jpg` locally after the original prototype URL became unavailable.
- The transformation comparison uses distinct local `before-bathroom.jpg` and `after-bathroom.jpg` assets so a remote failure cannot reveal the same underlying image on both sides.

## Validation status
- ESLint: passing
- TypeScript (`tsc --noEmit`): passing
- Next.js production build: passing
- Browser QA: verified at 1920px desktop, 768px tablet, and 430px mobile; mobile menu and finish selection interactions verified; no browser console errors

## Run the project
1. `npm install`
2. `npm run dev`
3. Open the local URL shown by Next.js.
4. `npm run lint` and `npm run build` validate the project.
