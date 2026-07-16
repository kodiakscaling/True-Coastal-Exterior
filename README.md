# True Coastal Exterior Home Services

Lead-gen website for **truecoastalexterior.com** — pressure washing, soft washing, and window cleaning across LA and Orange County.

Built with **Next.js 15 (App Router)**, **Tailwind CSS**, and **TypeScript**. Deployed on **Vercel**.

---

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Editing site content

Almost everything you'll want to tweak lives in one file: [`lib/constants.ts`](lib/constants.ts).

- **`BUSINESS`** — phone, email, hours, service area
- **`SERVICES`** — the four service cards (title, blurb, bullets, image)
- **`TESTIMONIALS`** — customer reviews
- **`FAQS`** — questions and answers

### Service-area (city) pages

Every city gets its own SEO-optimized landing page at `/service-areas/<city>`,
generated automatically from [`lib/cities.ts`](lib/cities.ts). There are 24
today (Malibu, Newport Beach, Laguna Beach, etc.), grouped by county on the
[`/service-areas`](app/service-areas/page.tsx) hub.

**To add a city:** add one object to the `CITIES` array in `lib/cities.ts` —
`slug`, `name`, `county`, `coastal`, `tagline`, `intro`, `challenge`,
`neighborhoods`, `landmarks`, `zips`, and `nearby` (slugs of adjacent cities to
cross-link). The page, metadata, sitemap entry, and `LocalBusiness` schema are
generated for you. **To remove one,** delete its object.

Each city page includes its own `LocalBusiness` + `areaServed` JSON-LD schema —
this is what helps you show up in Google's local pack and in AI search answers.

Swap image URLs by editing `image:` fields (or drop files in `/public` and reference them as `/your-image.jpg`).

## Logo & brand assets

Your real logo is already integrated (background removed → transparent PNG):

- [`public/brand/logo.png`](public/brand/logo.png) — full transparent logo (nav, footer)
- [`public/brand/marlin.png`](public/brand/marlin.png) — marlin-only mark (hero decoration)
- [`app/icon.png`](app/icon.png) / [`app/apple-icon.png`](app/apple-icon.png) — favicons (marlin on navy)
- [`app/opengraph-image.png`](app/opengraph-image.png) — social-share preview image

To regenerate any of these from a new source image, the background-removal
script is at [`scripts/remove_bg.py`](scripts/remove_bg.py):
```bash
python3 scripts/remove_bg.py path/to/new-logo.png public/brand/logo.png
```

## Adding real photos

Replace the Unsplash URLs in:
- [`app/components/Hero.tsx`](app/components/Hero.tsx) — hero image
- [`app/components/Gallery.tsx`](app/components/Gallery.tsx) — 6 gallery shots
- `SERVICES[].image` in [`lib/constants.ts`](lib/constants.ts) — service card images

Drop the photos in `/public/gallery/` and reference them like `/gallery/driveway-01.jpg`.

---

## Lead form → email notifications

The `/api/quote` endpoint logs every submission to Vercel logs so nothing gets
dropped. To also get an **email** for each lead, you only need **one** env var.

**Enable email (one-time):**

1. Sign up free at [resend.com](https://resend.com).
2. **Verify the `truecoastalexterior.com` domain** (Resend dashboard → Domains →
   Add Domain → add the DNS records it gives you). This is **required** to deliver
   to `contact@truecoastalexterior.com` — Resend only sends to a domain address
   once that domain is verified.
3. Create an API key (Resend dashboard → API Keys → Create).
4. In Vercel → your project → Settings → Environment Variables, add:
   - `RESEND_API_KEY` = the key from step 3
5. Redeploy. Done — every lead now emails **contact@truecoastalexterior.com**.

Sensible defaults are baked in, so nothing else is required:

- `LEAD_TO_EMAIL` — defaults to `contact@truecoastalexterior.com` (override to change)
- `LEAD_FROM_EMAIL` — defaults to `leads@truecoastalexterior.com` (sends from the
  verified domain). Override to change the sender name/address.

> Before the domain is verified you can still test using Resend's shared sender:
> set `LEAD_FROM_EMAIL=onboarding@resend.dev` and `LEAD_TO_EMAIL` to your own
> Resend-account email (Resend's no-domain testing mode only delivers to that
> address).

The email includes name, phone, email, address, selected service(s) (including
any "Other" text), notes, and where the lead came from, with a `reply-to` set to
the customer so you can reply straight from Gmail. No key = form still works and
submissions still land in Vercel logs; you just don't get the email push.

---

## Address autocomplete (Mapbox)

The Property Address field can suggest real addresses as the visitor types
(faster + more accurate leads). It uses Mapbox and needs **one** public token.

**Enable it (one-time, ~3 min):**

1. Sign up free at [mapbox.com](https://account.mapbox.com/auth/signup/).
2. Copy your **Default public token** (starts with `pk.`) from the account page,
   or create a new one under *Access tokens*.
3. (Recommended) Add a **URL restriction** on that token for
   `https://truecoastalexterior.com/*` so it can only be used from the site.
4. In Vercel → project → Settings → Environment Variables, add:
   - `NEXT_PUBLIC_MAPBOX_TOKEN` = the `pk.…` token
5. Redeploy (this token is inlined at build time, so a redeploy is required).

That's it. Suggestions are US-only and biased toward LA/Orange County. Mapbox's
free tier (100k lookups/mo) is far more than a lead form uses. **No token = the
field quietly works as a normal text box**, so the form never breaks.

---

## Deploy to Vercel

### First time

1. Push this folder to a new GitHub repo:
   ```bash
   git init
   git add .
   git commit -m "Initial True Coastal site"
   git branch -M main
   git remote add origin git@github.com:YOUR_USERNAME/true-coastal-exterior.git
   git push -u origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new), import the repo, keep the
   defaults (Next.js auto-detected), and hit **Deploy**.
3. In the Vercel project → **Settings → Domains**, add `truecoastalexterior.com`
   and `www.truecoastalexterior.com`. Vercel gives you DNS records — point your
   domain's nameservers or A/CNAME records there and it goes live.

### Ongoing

Every `git push` to `main` triggers a production deploy. Push to a branch or
open a PR to get a preview URL.

---

## File map

```
app/
  layout.tsx              root layout, fonts, SEO metadata
  page.tsx                the landing page composition
  globals.css             Tailwind + custom component classes
  api/quote/route.ts      lead-form POST handler
  components/
    Nav.tsx               sticky top nav with logo + CTA
    Hero.tsx              headline + hero image + trust pills
    TrustBar.tsx          navy 4-stat trust strip
    Services.tsx          3 service cards
    Process.tsx           4-step process
    Gallery.tsx           6 work photos (placeholder)
    Testimonials.tsx      4 review cards
    ServiceArea.tsx       illustrated coast map + city chips
    QuoteForm.tsx         main lead-capture form
    FAQ.tsx               accordion FAQ
    Footer.tsx            footer with sitemap
    StickyCallBar.tsx     mobile-only bottom call/quote bar
    Logo.tsx              inline SVG logo (swap for real logo)
    WaveDivider.tsx       decorative wave svg
lib/
  constants.ts            single source of truth for all content
```
