# Special Needs Parent Guide — Navigate the IEP Process With Confidence

The Special Needs Parent Guide is a digital product storefront built with Next.js. It sells three tiered packages of IEP guidance materials (PDF guide + fillable template bundles) via Stripe Checkout, delivers tokenized download links on purchase, and provides an admin dashboard for tracking sales and revenue.

## What the Guide Covers

The core product is an 85+ page plain-language guide to the IEP process under IDEA (Individuals with Disabilities Education Act), bundled with templates, checklists, and sample letters:

- **Complete IEP walkthrough** — eligibility, evaluation, goal-setting, placement, annual reviews, procedural safeguards
- **Meeting preparation** — step-by-step checklists and scripts for every IEP meeting type
- **IDEA rights explained** — federal law in plain language with notes on state-specific variations
- **Advocacy strategies** — communicating with school staff, raising concerns constructively, and escalating effectively
- **Therapy coordination** — managing multiple therapists and keeping the full team aligned
- **Progress monitoring** — how to read data, identify regression, and request adjustments
- **Dispute resolution** — mediation, state complaints, and due process
- **25+ ready-to-use templates** — fillable PDFs for IEP prep, goal data, progress tracking, communication logs
- **12+ sample letters** — meeting requests, evaluation requests, prior written notice responses, complaint letters
- **15+ action checklists** — step-by-step for every major IEP milestone

## Product Tiers

| Package | Price | What's Included |
|---------|-------|----------------|
| Essential | $19 | 85+ page PDF guide, 4 essential templates, progress tracker, communication log, email support |
| Complete *(Most Popular)* | $47 | Everything in Essential + all 15+ fillable templates, 12+ sample letters, behavior tracking forms, goal data sheets, IEP meeting agenda, priority email support |
| Premium | $97 | Everything in Complete + full binder organization system, therapy coordination forms, mediation & complaint templates, white-label rights, lifetime updates, priority 1-on-1 support |

## Who It's For

- **First-time IEP parents** who just learned their child qualifies for special education services
- **Experienced parents** who want more effective advocacy strategies and professional-grade templates
- **Parents managing multiple IEPs** — organization system for multiple children's plans
- **Special education professionals** — advocates, consultants, and coaches (Premium: white-label rights)
- **Teachers and school staff** who want to support families in understanding the process

## App Routes

| Route | Purpose |
|-------|---------|
| `/` | Sales landing page — hero, social proof, features, testimonials, pricing, FAQ |
| `/api/products` | Returns product catalog with pricing and features |
| `/api/checkout` | Creates Stripe Checkout session and returns redirect URL |
| `/api/webhook` | Handles `checkout.session.completed`, creates purchase record with tokenized download link |
| `/api/download` | Validates token, increments download count (max 5), returns PDF |
| `/purchase/success` | Post-purchase confirmation with download link |
| `/admin` | Sales dashboard — total sales, revenue, download counts, recent purchases |

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Lucide React (icons)
- Stripe (payments and webhooks)
- In-memory data store (swap for Prisma + PostgreSQL for production persistence)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Set up environment variables in `.env.local`:

```env
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Building for Production

```bash
npm run build
npm start
```

### Stripe Webhook (local development)

Use the Stripe CLI to forward events:
```bash
stripe listen --forward-to localhost:3000/api/webhook
```

## Download Link Mechanics

After a successful Stripe checkout, the webhook creates a purchase record with a unique `downloadToken` (UUID), `maxDownloads: 5`, and a 7-day `tokenExpiresAt`. The `/api/download` route validates the token, checks expiry and download count, increments the count, and returns the PDF. The admin panel shows per-purchase download counts.

## License

Proprietary — AI Microtech Link. All rights reserved.
