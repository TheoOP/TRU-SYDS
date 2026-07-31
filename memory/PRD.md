# PRD — TRU SYDS LLC Theatre Arts (3D Interactive Site)

## Original Problem Statement
Dynamic, 3D interactive webpage for TRU SYDS LLC (African theatre arts organization). Responsive on web + mobile. Include Adinkra symbols tied to power & authority, showcase both stage and video (short-episode) production, feature the upcoming event "In the Heart of the Cross". Address: 1196 Deansway Dr, Pataskala, OH 43062. Contact: 703-475-5322.

## User Choices
- 3D hero: orbitable "spotlight stage" scene (React Three Fiber) with glowing golden cross.
- Backend: Contact form + Newsletter signup saved to MongoDB.
- Payments: Stripe (claimable sandbox, Flow A, test mode) for tickets + donations.
- Video: placeholders (swap later).
- Primary address: Pataskala, OH.
- Art direction: Awwwards-level — kinetic hero, masked line reveals, framer-motion + lenis, numbered manifesto, editorial marquee.

## Architecture
- Frontend: React (CRA/craco) SPA, framer-motion, lenis smooth scroll, react-three-fiber/drei 3D hero, sonner toasts, Tailwind. Dark cinematic gold/crimson/cream theme (Playfair Display + Outfit).
- Backend: FastAPI + Motor (MongoDB). Routes under /api. Stripe raw SDK Flow A.
- Collections: contact_messages, newsletter_subscribers, payment_transactions.

## Implemented (2026-07-31)
- 3D orbitable spotlight-stage hero with glowing cross, dust, spotlights, rotating Adinkra watermark.
- Kinetic masked headline, marquee, numbered manifesto (Mission/Vision/Craft) + Core Values grid.
- What We Do: Stage productions + Video short-episode grid (tabs).
- Adinkra "Power & Authority" interactive section (Adinkrahene, Dwennimmen, Gye Nyame, Akoben).
- Featured event "In the Heart of the Cross" with qty selector + Stripe ticket checkout ($30).
- Get Involved: donation tiers ($25/$50/$100/$250) via Stripe, newsletter signup, ways to engage, Education & Outreach.
- Contact form (DB-saved) with address/phone; Footer.
- Payment success (polls status) + cancel pages.
- Testing: backend 6/6 + all frontend flows PASS (iteration_1).

## Tax mode
Stripe checkout runs without automatic tax (plain payment) — reliable in claimable sandbox. Can switch to Stripe-calculates or fully-managed later on request.

## Backlog / Next
- P1: Real video embeds (YouTube/Vimeo) for episodes.
- P1: Admin view for contact messages / subscribers.
- P2: Custom donation amount field.
- P2: Add multi-date/session ticket selection.
- P2: Blog / press page.
