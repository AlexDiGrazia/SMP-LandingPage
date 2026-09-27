# SMP Scottsdale — Meta Ads Landing Page

## Overview
Single-page, mobile-first lead-gen landing page for a scalp micropigmentation (SMP) artist ("Karl") in Scottsdale, AZ. Funnel: Meta ad → landing page → lead form → Karl calls personally. No online booking, no nav menu, no blog. Includes a dedicated thank-you page.

## Status
Built as a real Next.js 16 (App Router) + TypeScript app — `SMP Landing Page.dc.html` was the original design reference (kept for history; not used at runtime). Layout, type, color and the two-step lead form are implemented and working end-to-end (tested: submit → `/api/lead` → `/thank-you`). Still needed before launch:
- Real photos (hero, results gallery, Karl's portrait) — see "Adding real photos" below
- Real copy: anything in `[brackets]` in `src/lib/content.ts` (reviews, stats, bio, pricing range — flag in `Pricing.tsx` notes a $1,500 vs $1,800 discrepancy between the job listing and design spec to confirm with Karl)
- `RESEND_API_KEY` / `NEXT_PUBLIC_META_PIXEL_ID` / `NEXT_PUBLIC_GA_ID` env vars (see `.env.example`)
- Meta Conversions API server-side event (stubbed with a `TODO` in `src/app/api/lead/route.ts`)

## Getting Started
```
npm install
cp .env.example .env.local   # fill in as accounts are created
npm run dev                   # http://localhost:3000
```
`npm run build && npm run lint` before shipping — both are clean as of this commit.

## Adding real photos
Drop files in `/public` and pass their path to the relevant component:
- Hero + results gallery: `beforeSrc`/`afterSrc` props on `<BeforeAfterPair>` (`src/components/BeforeAfterPair.tsx`)
- Karl's portrait: swap the placeholder `<span>` in `src/components/AboutKarl.tsx` for a `next/image`
Until real files are supplied, components fall back to the striped placeholder boxes from the original design reference.

## Fidelity
**High-fidelity layout, type, color and interactions.** Content is partly placeholder: anything in `[brackets]` and all striped image boxes are stubs awaiting client assets.

## Stack (as built)
- Next.js 16 App Router, TypeScript, plain CSS (tokens + section classes in `globals.css` — no Tailwind, ported straight from the design reference's inline styles)
- `next/font/google` for Archivo, Archivo Narrow, JetBrains Mono (self-hosted, no runtime request to Google)
- `next/image` for photos once real assets are added (see "Adding real photos")
- Form: plain `useState` + manual validation (no RHF/Zod needed for 6 fields) → `FormData` POST to `/api/lead` → email via Resend's HTTP API (no SDK dependency) if `RESEND_API_KEY` is set, photos attached directly (skip S3/R2 — fine at this volume/size); logs to console otherwise so local dev works without keys
- Hosting: Vercel (SSL + custom domain). Client owns repo, domain, hosting and email accounts — nothing proprietary.
- Tracking: Meta Pixel client-side + a stubbed-out Conversions API call (same `event_id`, fired from `/thank-you` not the submit handler, so it's tied to a real page view), GA4 via `gtag.js`, UTM/fbclid captured to `sessionStorage` on landing

## Page Structure (in order)
Max content width 1200px, side padding 20px. Section vertical padding 64–96px. Dark sections `#0f0e0d`; light sections `#f3f1ec`.

1. **Header (sticky)** — logo slot 32×32 + "[Brand] SMP Scottsdale" (Archivo Narrow 700, 15px, uppercase, 0.08em tracking); right: tel link. Bg `rgba(15,14,13,.92)` + backdrop blur 8px, bottom border `#22201d`.
2. **Hero** — 2-col grid (`auto-fit, minmax(min(100%,440px),1fr)`, gap 40). Left: eyebrow (mono 12px, 0.12em, accent, uppercase) "Scalp Micropigmentation · Scottsdale, AZ"; H1 "A hairline nobody questions." (Archivo Narrow 700, clamp(44px,7.5vw,84px), lh .95, uppercase); sub copy 17–20px `#bdb8ae`; CTAs: primary "Get Your Free Consultation" (scrolls to form), secondary "Call Karl" (tel:); star rating row. Right: before/after pair, aspect 4/3.4, 4px gap.
3. **Social proof strip** — 3 short review excerpts in a row, borders top/bottom `#22201d`.
4. **Results gallery** — H2 "Real results"; grid `auto-fill minmax(min(100%,340px),1fr)`, gap 20; each card = before/after pair (aspect 4/2.6, 3px gap) + caption. 6–10 items. Most prominent section.
5. **About Karl** (light) — portrait 4/5 (max 480px) + eyebrow "Your artist", H2 "You'll talk to Karl. Start to finish.", bio, 3 stats (years / clients / 1 artist).
6. **What SMP does** — H2 + paragraph left; right: 4 numbered rows (mono number in accent, title 18px/600, desc 15px) separated by `#2a2825` borders.
7. **Who it's for** — H2 "Who it's for · men & women" + 7 outline chips (1px `#3a3733`, 12×18 padding).
8. **Process** (bg `#171614`) — 4 cards (bg `#0f0e0d`, 2px gaps, min-height 200): big accent numeral 44px, title, desc. Submit photos → Free consultation → Personalized treatment → Final result.
9. **Pricing** — max-width 880. "Most treatments range from approximately **$1,800–$3,500**…" (22–30px) + note that exact pricing follows consultation. ⚠ Client listing also mentions $1,500 — confirm.
10. **Reviews** (light) — 4 cards (bg `#fbfaf7`, border `#e0dcd3`, padding 28): stars `#8a6a2e`, quote 17px, name + source.
11. **Lead form** (`id="consult"`) — left: H2 "Request your free consultation", copy, "Prefer to talk now? Call Karl". Right: panel bg `#171614`, border `#2a2825`.
12. **Final CTA** — centered H2 "Ready to see what's possible?" (clamp 40–72px) + both CTAs. Footer: address + Privacy + "Results vary".
13. **Sticky mobile bar** — fixed bottom, grid 2fr/1fr: "Free Consultation" + "Call Karl". Show on mobile only (<768px) in production. Add 72px bottom padding to page when visible.

## Lead Form
Two-step (default, tweakable to single-step):
- **Step 1** (low commitment): "What are you looking to improve?" multi-select: Receding hairline, Thinning hair, Crown, Significant hair loss, Full scalp, Other. "Current hairstyle" single-select: Shaved / buzzed, Short, Medium / long. Button "Continue →". Progress bar: two 3px bars + "Step N of 2".
- **Step 2**: Name, Phone (`type=tel`), Email, Photo upload (multiple, image/*, optional; dashed dropzone showing "N photos attached"), Comments (optional). Button "Request My Free Consultation" + "← Back". Microcopy: "Free, no obligation. Your photos stay private."
- Option buttons: min-height 48, selected = accent bg + `#0f0e0d` text; unselected = `#0f0e0d` bg, `#3a3733` border.
- Inputs: min-height 50, bg `#0f0e0d`, border `#3a3733`, 16px text (prevents iOS zoom), radius 2.
- **Validation (to implement)**: name required; phone required (US format); email valid; ≥1 concern on step 1. Max photo size ~10MB each, up to 5.
- On success → navigate to `/thank-you` (real route, not state) so Pixel/GA can fire on page view.

## Thank-You Page (`/thank-you`)
Centered, max-width 560. Eyebrow "Request received"; H1 "Thanks, {firstName}. I'll be in touch personally."; copy about personal review within one business day; "— Karl"; primary button "Call Karl now · (480) 555-0123" (tel:), secondary "Back to page". Should be `noindex`.

## Tracking
- Meta Pixel `PageView` on all pages; `Lead` on thank-you (plus CAPI server event from `/api/lead`, same `event_id`).
- Custom `FormStep1` on step 1 continue; `Contact` / custom `CallClick` on every `tel:` click (header, hero, form, final CTA, sticky bar, thank-you).
- GA4: `generate_lead`, `form_step_1`, `click_call` events; mark `generate_lead` as conversion.
- UTM: capture `utm_*`, `fbclid` on landing (store in sessionStorage/cookie), include as hidden fields in lead payload + email notification.
- Prototype stub: `track(event, data)` → `console.log`.

## Design Tokens
Colors
- bg `#0f0e0d` · bg-alt `#171614` · ink `#f3f1ec`
- muted text `#bdb8ae` · subtle text `#8a857c`
- borders `#22201d`, `#2a2825`, `#3a3733`, dashed `#55504a`
- accent `oklch(0.8 0.07 70)` (≈ `#d2b48a`, warm sand) — CTAs, eyebrows, numerals
- light section bg `#f3f1ec` · text `#151412` · body `#3d3a35` · muted `#5a564f`/`#6b665e` · card `#fbfaf7` · card border `#e0dcd3` · divider `#d6d2c9` · light eyebrow `#6b5a3e` · stars `#8a6a2e`

Type
- Display: Archivo Narrow 700, uppercase, lh .95–1, tracking −0.01em. H1 clamp(44,7.5vw,84); H2 clamp(34,5vw,56)
- Body: Archivo 400/500/600; 15–20px; lh 1.5–1.6
- Labels/eyebrows: JetBrains Mono 12px, 0.12em, uppercase

Other: radius 2px everywhere; no shadows; CTA height 56–58px (sticky 50); tap targets ≥44px; no animations beyond smooth scroll.

## Assets (all placeholders — client to supply)
Logo, hero before/after, 6–10 before/after pairs + captions, Karl portrait, review excerpts + full testimonials, rating/review count, years/clients stats, bio, phone (placeholder `(480) 555-0123`), brand name, address.

## Files
- `SMP Landing Page.dc.html` — original design reference (open in browser). Superseded by the Next.js app below; kept for history.
- `src/app/page.tsx` — assembles the one-page layout from `src/components/*`
- `src/app/thank-you/page.tsx`, `src/app/api/lead/route.ts` — post-submit page and lead-handling endpoint (email + CAPI TODOs inline)
- `src/app/layout.tsx` — fonts, metadata, Meta Pixel / GA4 script wiring
- `src/app/globals.css` — design tokens (colors, type, spacing) and all section styles, plain CSS
- `src/lib/content.ts` — all copy/business info in one place (phone, address, reviews, results captions, form options) — edit here first
- `src/lib/track.ts` — `track()` helper (fbq + gtag) and UTM/fbclid capture
- `src/components/LeadForm.tsx` — the two-step form (client component)
