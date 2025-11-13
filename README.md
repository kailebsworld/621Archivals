# 621 ARCHIVAL — Minimal Ecommerce Frontend

This repository contains a minimal, typographic-first ecommerce frontend scaffold for *621 ARCHIVAL*. It is built with Vite + React and is designed to reflect a poster-like, editorial aesthetic: lots of negative space, large type, and a single-column content flow.

Features included in this scaffold:

Run locally

1. Install dependencies

```bash
cd /workspaces/621Archivals
npm install
```

2. Start dev server

```bash
npm run dev
```

Open the printed dev URL (usually `http://localhost:5173`).

Customization notes

Design intent

This is a frontend scaffold and does not include a production checkout integration. You can wire payment providers or a backend API later while keeping the layout and typographic system intact.

Developer features included
- Dev editor: visit `/admin` during local development to edit content stored in your browser's `localStorage`. This is a dev-only convenience and does not write files to disk. Use it to preview copy and content changes quickly.

Stripe / Checkout
- An example serverless function demonstrating how to create a Stripe Checkout session lives at `serverless/create-checkout-session.example.js`.
- To enable live checkout: deploy the example function as a serverless endpoint, set your `STRIPE_SECRET_KEY` there, and set `VITE_STRIPE_PUBLISHABLE_KEY` in your local `.env` before running the dev server.
