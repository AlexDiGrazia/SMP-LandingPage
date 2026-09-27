# Handoff: SMP Scottsdale — Meta Ads Landing Page

## Overview
Single-page, mobile-first lead-gen landing page for a scalp micropigmentation (SMP) artist ("Karl") in Scottsdale, AZ. Funnel: Meta ad → landing page → lead form → Karl calls personally. No online booking, no nav menu, no blog. Includes a dedicated thank-you page.

## About the Design Files
`SMP Landing Page.dc.html` is a **design reference built in HTML** — it shows intended look and behavior, not production code. Recreate it in **Next.js (App Router) + TypeScript** (recommended: SSG for speed, route-level `/thank-you` page for conversion tracking, API route for form submissions). Open the HTML file directly in a browser to view it.

## Fidelity
**High-fidelity layout, type, color and interactions.** Content is partly placeholder: anything in `[brackets]` and all striped image boxes are stubs awaiting client assets.

## Recommended Stack
- Next.js 14+ App Router, TypeScript, Tailwind CSS (or CSS Modules)
- `next/font/google` for Archivo, Archivo Narrow, JetBrains Mono
- `next/image` for all photos (WebP/AVIF, lazy below fold, hero `priority`)
- Form: React Hook Form + Zod; submit to `/api/lead` → email via Resend/Postmark; photos to S3/R2/Vercel Blob (or email attachments if small)
- Hosting: Vercel (SSL + custom domain). Client owns repo, domain, hosting and email accounts.
- Tracking: Meta Pixel + Conversions API (server-side, dedup with `event_id`), GA4 via `@next/third-parties`

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
- `SMP Landing Page.dc.html` — full design reference (open in browser). Copy and section structure live in the template; list content (reviews, steps, results, options) is in the logic class `renderVals()`.
