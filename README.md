# Le Sandwich — Customer Site

Customer-facing ordering site for Le Sandwich (Prishtinë, Kosovo). Browse the
menu, build a cart, place an order, and track it live. Part of the Swift Kitchen
ordering system.

## Stack

- Vite + React + TypeScript
- React Router
- Tailwind CSS + shadcn/ui
- TanStack Query
- Socket.io (live order tracking)

## Getting started

```bash
npm install
npm run dev      # starts the dev server (default http://localhost:8080)
```

Set the backend API URL in `.env` (see `.env.example`):

```
VITE_API_URL=http://localhost:3001
```

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run preview` — preview the production build
- `npm run test` — run unit tests (Vitest)

## Backend

This site talks to the Swift Kitchen backend API for the menu, categories,
order placement, and live tracking.
