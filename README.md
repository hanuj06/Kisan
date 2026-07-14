# Kisan Direct — From Farm to Family

A working, deployable frontend for **Kisan Direct**, India's farmer-to-consumer marketplace. Built with React, Vite, Tailwind CSS v4, React Router, and Recharts.

## What's actually working right now

This is a fully functional **frontend prototype** — every screen is real and interactive, wired to realistic mock data, not static images:

- **Landing page** — hero with a live animation of the 6-step middleman chain collapsing to a direct connection, search, featured/seasonal crops, live market price table, stats, testimonials, how-it-works, FAQ accordion, app download section.
- **Auth** — role selection (Farmer/Buyer), simulated OTP flow, email flow, and Google login button (all demo — no real backend yet, see below).
- **Buyer side** — browse with live search/filter/sort, product detail pages with price-history charts, cart with running totals, checkout flow, order history, wishlist — all backed by real React state (not mockups).
- **Farmer side** — dashboard with income chart, AI pricing/weather advisory cards, inventory management (add/remove listings with an AI price suggestion), order list, wallet & analytics with sales-by-crop chart and transaction history.
- **Market Prices** — standalone mandi price page with a clickable, chart-linked crop list.

Fully responsive (mobile/tablet/desktop), keyboard-focus visible, respects `prefers-reduced-motion`.

## What's intentionally mocked (needed before real production launch)

To be a genuine production platform (not just its frontend), you still need to build and connect:

- **Backend API** (Node/Express + MongoDB or PostgreSQL, as specced) — auth, listings, orders, payments
- **Real authentication** — actual OTP/SMS provider (e.g. MSG91, Twilio), Google OAuth, JWT sessions
- **Payments** — UPI/card/net-banking via a gateway (Razorpay, Cashfree, etc.)
- **Real AI features** — the pricing/demand/weather cards are illustrative; wire to a real forecasting model or LLM
- **Logistics integration** — delivery partner APIs, live GPS tracking
- **Farmer/buyer verification pipeline** — document upload + review workflow
- **Multilingual content** — Hindi font support is already in the type system; translated copy still needs to be added

This repo is the right foundation to build all of that on top of — the component structure, design system, and every screen's data shape are already defined.

## Getting started locally

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview the production build locally
```

## Deploying (static hosting — Vercel/Netlify/Cloudflare Pages)

This is a client-side-rendered SPA, so any static host works:

**Vercel**
```bash
npm i -g vercel
vercel --prod
```
(Framework preset: Vite. Build command: `npm run build`. Output directory: `dist`.)

**Netlify**
```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```
Add a `_redirects` file with `/* /index.html 200` (needed for React Router — see note below) or configure it in the Netlify dashboard.

**Any static host (GitHub Pages, S3, etc.)**
1. `npm run build`
2. Upload the `dist/` folder
3. Configure the host to redirect all routes to `index.html` (SPA fallback) — required because this uses client-side routing

## Project structure

```
src/
  components/     Navbar, Footer, ProductCard, DashboardLayout, ChainAnimation, Toast
  context/        AppContext.jsx — cart, wishlist, and login state (in-memory)
  data/           mockData.js — products, farmers, mandi prices, orders, testimonials
  pages/          Landing, Login, Browse, ProductDetail, Cart, MarketPrices, NotFound
  pages/buyer/    Buyer dashboard, orders, wishlist
  pages/farmer/   Farmer dashboard, products, orders, wallet
```

## Design system

- **Colors**: Paper `#F6F2E7`, Krishi Green `#2F5233`, Turmeric `#E8A93B`, Irrigation Blue `#3B5B7A`, Soil `#2B2318`
- **Type**: Zilla Slab (display), Inter (body), JetBrains Mono (prices/data), Noto Sans Devanagari (Hindi-ready)
- All tokens live in `src/index.css` under `@theme` — change them once, they propagate everywhere.
