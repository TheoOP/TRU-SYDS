# TRU SYDS LLC — Product Requirements Doc

## Original Problem Statement
Dynamic, 3D interactive website for TRU SYDS LLC (African theatre arts organization). Must work on web + mobile. Feature Adinkra symbols of power & authority, both Stage and Video (short episode) productions, upcoming event "In the Heart of the Cross". Address: 1196 Deansway Dr, Pataskala, OH 43062. Phone: 703-475-5322.

## User Choices
- 3D hero: orbitable "spotlight stage" scene (react-three-fiber) with glowing cross.
- Backend: Contact form + Newsletter signup saved to MongoDB.
- Payments: Stripe (claimable sandbox, test mode) for $30 tickets + donations.
- Video: placeholders (no real links yet).
- Art direction: award-worthy, dark cinematic gold/crimson/cream; Playfair Display + Outfit; framer-motion + Lenis smooth scroll.

## Architecture
- Frontend: React (CRA), single-page scroll + /payment/success, /payment/cancel routes. Sections: Hero(3D), Marquee, Manifesto/About, WhatWeDo (Stage/Video tabs), AdinkraSection, FeaturedEvent (tickets), GetInvolved (donations + newsletter + outreach), Contact, Footer.
- Backend: FastAPI, all routes /api prefixed. Collections: contact_messages, newsletter_subscribers, payment_transactions.
- Stripe Flow A (claimable sandbox). Catalog lookup keys: ticket_hotc, donate_25/50/100/250. Plain checkout (no tax) — mode=payment.

## Implemented (2026-07-31)
- Full site build with 3D spotlight-stage hero (orbit, dust, spotlights, glowing cross + halo).
- Authentic Adinkra vectors (Wikimedia): Adinkrahene, Dwennimmen, Gye Nyame, Ohene Aniwa — interactive detail panel.
- Stage productions + Video short-episode grid (placeholders), numbered manifesto chapters, core values, education & outreach.
- Stripe ticket purchase (qty stepper) + donation tiers → hosted checkout; payment success/cancel pages with status polling.
- Contact form + newsletter signup (DB-saved, idempotent newsletter).
- framer-motion scroll reveals + Lenis smooth scroll; film grain; responsive.
- Bug fixes: authentic Adinkra shapes; mobile hero legibility (stronger scrim + smaller/dimmer/raised cross); RevealLine headings fixed (were stuck hidden); JSX unicode-escape text fixed.
- Testing: iteration_2.json — backend 100%, frontend 100%.

## Backlog / Next
- P1: Real video episode links (YouTube/Vimeo embeds) when available.
- P1: Claim Stripe account (onboarding_url) to go live.
- P2: Admin view for contact messages / subscribers.
- P2: Event ticket confirmation email (Resend).
- P2: Gallery of production photos.
