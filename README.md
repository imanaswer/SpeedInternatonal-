# SpeedInternatonal-
# Speed Shipping International

Marketing site and quote/tracking front end for Speed Shipping International, the freight forwarding company of the Fast Shipping & Logistics group (Muscat, Oman).

Built with Next.js 14 (App Router), TypeScript and Tailwind CSS. Quote requests are emailed through Resend.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

Open http://localhost:3000.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | API key from resend.com. If empty, quote requests are logged to the server console instead of emailed, so development works without an account. |
| `QUOTE_TO_EMAIL` | Inbox that receives quote requests. Comma-separate for several. |
| `QUOTE_FROM_EMAIL` | Verified sender on your Resend domain, e.g. `Speed Shipping <noreply@yourdomain.com>`. |
| `NEXT_PUBLIC_SITE_URL` | Public URL, used for metadata, sitemap and robots. |

## Project layout

```
app/
  page.tsx               Home
  services/              Services index and one page per service (data in lib/services.ts)
  tracking/              Tracking page (demo lookup, see lib/tracking.ts)
  quote/                 Stand-alone quote form
  about/                 About and compliance
  contact/               Contact details, quote form, terms and privacy placeholders
  api/quote/route.ts     POST: validates with zod, emails via Resend
  api/track/route.ts     GET ?ref=…: looks up a shipment
  layout.tsx             Fonts (Archivo, IBM Plex Sans), header, footer, metadata
  sitemap.ts, robots.ts
components/              Header, Footer, Logo, Icons, Sections, QuoteForm, TrackForm, PageHero
lib/
  site.ts                Company details, nav, contact placeholders, group stats
  services.ts            Service content
  tracking.ts            Demo shipments; replace lookupShipment() with your TMS/carrier API
  quote-schema.ts        Shared validation for the quote form and API
```

## Things to replace before launch

1. Contact details in `lib/site.ts` (phone, WhatsApp, email, address, hours).
2. Bracketed placeholders on the About and Contact pages (licences, CR number, terms, privacy policy).
3. The group statistics in `lib/site.ts` are the figures published on the Fast Shipping & Logistics site. Replace with Speed's own once available.
4. `lookupShipment()` in `lib/tracking.ts` with a real lookup.
5. Add photography: the hero currently uses an illustrated route map so the site works without images.

## Design

The layout follows the Flexport pattern: a white page with navy sections, one accent colour (Speed's signal orange `#E8541E`), light-weight display type (Zalando Sans, loaded from Google Fonts), monospace uppercase labels (Roboto Mono) and square buttons. Tokens live in `tailwind.config.ts`; the shared primitives (`.eyebrow`, `.display`, `.section-rule`, `.btn`, `.field`) are in `app/globals.css`.

### Media

- `lib/media.ts` is the single place to swap photography. It currently points at Unsplash placeholders (free for commercial use). Replace the URLs with your own photos and nothing else changes.
- `public/video/` holds two public-domain USDA aerial clips of a container terminal (`port-dusk`, `port-cranes`) as WebM plus a QuickTime fallback and poster frames. Replace them with your own footage, keeping the file names.
- `lib/worldDots.ts` is a generated dotted world map (from a public-domain Wikimedia equirectangular map) used by `components/NetworkMap.tsx`.

### Interactive pieces

- `components/HeroStage.tsx`: centred headline over a mock shipment dashboard; the port video fades in behind it as you scroll (CSS `animation-timeline: scroll()`).
- `components/RouteMap.tsx`: the map inside the dashboard. Pick a destination and the route redraws with transit times; it cycles on its own until clicked.
- `components/ServicesScroller.tsx`: scroll-driven service list with a sticky cross-fading photo (IntersectionObserver).
- `components/NetworkMap.tsx`: dotted world map with hubs, gateway ports and partner agents, plus the location list.
- `components/CbmCalculator.tsx`: volume, volumetric and chargeable weight, FCL/LCL/air recommendation, copy-to-clipboard summary.
- `components/Gallery.tsx`: scroll-snap photo strip with a native `<dialog>` lightbox and keyboard navigation.
- `components/VideoBand.tsx`: full-bleed muted loop with play/pause and sound controls (used on the About page).

## Deploy

Works out of the box on Vercel. Set the environment variables in the project settings, and point `NEXT_PUBLIC_SITE_URL` at the production domain.

### Motion and surface utilities

Defined in `app/globals.css`, all CSS-only and respecting `prefers-reduced-motion`:

- `.hero-in` cascades its direct children in on page load (above-the-fold content).
- `.reveal` fades a block in as it scrolls into view; `.stagger` does the same for each child of a grid, offset in turn. Both use the native `animation-timeline: view()` and fall back to plain visible content in older browsers. Do not put them inside an `overflow-hidden` ancestor (use `overflow-clip`), which would become their scroll container.
- `.card` and `.shell` are the hairline-bordered surfaces, `.lift` adds the hover raise, `.dot-grid` is the fine dot pattern used on navy surfaces.
- `.btn-icon` is the trailing arrow that nudges right on hover.
- `components/Counter.tsx` counts the group figures up the first time they are seen.
