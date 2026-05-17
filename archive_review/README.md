# Special Needs Parent Resource Guide - Archive Review

## Product Overview
A comprehensive digital guide for parents navigating IEP (Individualized Education Program) processes and coordinating therapy services for their special needs children.

**Product Name:** Special Needs Parent Resource Guide
**Tagline:** Your Complete IEP Navigation Toolkit

## Pricing Tiers
| Tier | Price | Includes |
|------|-------|----------|
| Essential | $29 | Core IEP guide, goal tracking templates, meeting prep checklist |
| Professional (Featured) | $69 | All Essential + therapy logs, behavior tracking, advocacy scripts, bonus section |
| Agency | $149 | All Professional + parent workshops, team training materials, custom templates |

## Files Included in This Archive

### Product PDF
- `special-needs-parent-guide.pdf` - The main digital product (27 pages, ~257KB)

### Sales Website (Standalone HTML)
- `index.html` - Complete landing page with:
  - Hero section with CTA
  - Social proof and testimonials
  - Problem statement
  - Target audience
  - What's inside preview
  - Benefits breakdown
  - 3-tier pricing cards
  - FAQ section
  - Final call-to-action
  - Footer with navigation

### Source Code (Next.js Project)
- `src/` directory containing:
  - Full Next.js App Router structure
  - API routes for Stripe integration
  - Admin dashboard
  - Purchase success page
  - Download system with secure tokens
  - Email notification system (webhook-based)

### Configuration
- `package.json` - Dependencies and scripts
- `.env` - Environment variables template

## Deployment Instructions

### Option 1: Static HTML (Recommended for Quick Launch)
1. Deploy the `dist/` folder directly
2. The `index.html` is a standalone file with embedded Tailwind CSS
3. Stripe checkout will redirect to localhost - update URLs for production

### Option 2: Full Next.js Deployment
1. Run `npm install` in the project root
2. Configure environment variables:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
   STRIPE_SECRET_KEY=sk_live_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   NEXT_PUBLIC_APP_URL=https://yourdomain.com
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=secure-password-here
   ```
3. Run `npm run build && npm start`
4. Deploy to Vercel or similar platform

## Key Features
- Three-tier pricing with featured Professional tier
- Stripe Checkout integration
- Secure PDF download with token-based access
- 5 downloads allowed per purchase
- 72-hour download link expiration
- Admin dashboard with sales analytics
- Email confirmation on purchase

## Quality Notes
- PDF rendered using Playwright with Chromium
- 27 comprehensive pages covering:
  - IEP fundamentals and eligibility
  - Team roles and responsibilities
  - Meeting preparation strategies
  - Documentation best practices
  - Goal tracking systems
  - Service coordination
  - Accommodations planning
  - Behavior support strategies
  - Therapy coordination
  - Advocacy scripts and templates

## Review Checklist
- [ ] Verify PDF content is accurate and complete
- [ ] Check pricing matches your business model
- [ ] Test Stripe integration in test mode
- [ ] Review copy for clarity and accuracy
- [ ] Verify all links point to correct destinations
- [ ] Check mobile responsiveness of landing page
- [ ] Update contact information as needed