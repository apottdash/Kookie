# WedBridge

India's trust-first wedding vendor marketplace. Connects engaged couples with verified vendors through the **Vendor Basket** shortlisting tool and exclusive inquiry leads. Launching in Jaipur.

**Stack:** React 18 + TypeScript + Vite (frontend) · Motoko / ICP (backend) · Tailwind CSS + shadcn/ui · TanStack Router

---

## Prerequisites

| Tool | Version |
|------|---------|
| Node.js | ≥ 16 |
| pnpm | ≥ 7 |
| [Mops](https://mops.one) (Motoko package manager) | latest |

Install pnpm if you don't have it:

```bash
npm install -g pnpm
```

Install Mops:

```bash
npm install -g ic-mops
```

---

## Quick Start (Frontend only)

The frontend runs fully standalone with sample data — no ICP canister required for local development.

```bash
# 1. Install frontend dependencies
cd src/frontend
pnpm install --prefer-offline

# 2. Start the dev server
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Full Stack Setup (Frontend + ICP Backend)

### 1. Install all dependencies

```bash
# Root workspace
pnpm install --prefer-offline

# Motoko backend
cd src/backend
mops install
```

### 2. Generate frontend bindings from the backend interface

Run this from the project root whenever the backend API changes:

```bash
pnpm bindgen
```

### 3. Start the frontend dev server

```bash
cd src/frontend
pnpm dev
```

> The `env.json` file in `src/frontend/` holds backend connection config (`backend_canister_id`, `backend_host`, etc.). When deploying via Caffeine/ICP these values are injected automatically. For local dev the frontend gracefully falls back to sample data when the backend is unreachable.

---

## Available Scripts

### Frontend (`src/frontend/`)

| Command | What it does |
|---------|-------------|
| `pnpm dev` | Start Vite dev server on port 5173 |
| `pnpm build` | Production build to `dist/` |
| `pnpm typecheck` | TypeScript type checking (no emit) |
| `pnpm check` | Biome lint check |
| `pnpm fix` | Biome lint auto-fix |

### Backend (`src/backend/`)

| Command | What it does |
|---------|-------------|
| `mops install` | Install Motoko dependencies |
| `mops check --fix` | Type check Motoko source |
| `mops build` | Build the backend canister |

### Root workspace

| Command | What it does |
|---------|-------------|
| `pnpm build` | Build all packages |
| `pnpm typecheck` | Typecheck all packages |
| `pnpm fix` | Lint-fix all packages |
| `pnpm bindgen` | Regenerate frontend types from backend DID file |

---

## Project Structure

```
Kookie/
├── src/
│   ├── frontend/
│   │   └── src/
│   │       ├── pages/          # Route-level page components
│   │       │   ├── HomePage.tsx
│   │       │   ├── LinksPage.tsx       → Browse Vendors (/vendors)
│   │       │   ├── FanFictionPage.tsx  → Vendor Profile (/vendors/:id)
│   │       │   ├── SongsPage.tsx       → Destinations (/destinations)
│   │       │   └── WatchlistPage.tsx   → Vendor Basket (/basket)
│   │       ├── components/     # Shared UI components
│   │       │   ├── VendorCard.tsx
│   │       │   ├── Header.tsx
│   │       │   ├── Layout.tsx
│   │       │   ├── Navigation.tsx
│   │       │   └── OnboardingModal.tsx
│   │       ├── hooks/
│   │       │   └── useBasket.ts        # localStorage-persisted basket state
│   │       ├── data/
│   │       │   └── sampleData.ts       # 18 Jaipur vendor fixtures
│   │       ├── types/index.ts          # Vendor, BasketItem, backend types
│   │       └── App.tsx                 # TanStack Router route definitions
│   └── backend/                # Motoko / ICP canister source
├── DESIGN.md                   # UI/UX design brief and component guide
├── .gitignore
└── package.json
```

---

## Key Features

- **Vendor Basket** — couples shortlist vendors before reaching out; state persisted in `localStorage`
- **Exclusive Leads** — each inquiry goes to one vendor only, no mass broadcast
- **Browse & Filter** — search by category, keyword, or "Travel Ready" flag
- **Destination Hubs** — curated pages for Jaipur (live), Goa, Udaipur, Rishikesh (coming soon)
- **Verified Vendors** — GST verified, WhatsApp active, multi-day event support flags
- **INR Pricing** — prices formatted as ₹45K / ₹1.5 Lakh / ₹800 per plate

---

## Routes

| Path | Page |
|------|------|
| `/` | Home |
| `/vendors` | Browse Vendors |
| `/vendors/$vendorId` | Vendor Profile |
| `/destinations` | Destination Hubs |
| `/basket` | Vendor Basket |
| `/feed` | Community Feed |
| `/profile/$principal` | User Profile |
| `/admin` | Admin Panel |
