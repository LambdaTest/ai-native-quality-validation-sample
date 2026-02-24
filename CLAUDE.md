# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Airbnb clone — full-stack vacation rental platform used as a demo/testing application for LambdaTest. Frontend-only mode (mock API) is the primary deployment target via GitHub Pages.

## Commands

### Frontend (from `frontend/`)
- **Dev server:** `npm run dev` (Vite, port 5173, proxies `/api` to localhost:5000)
- **Build:** `npm run build` (runs `tsc -b && vite build`, outputs to `dist/`)
- **Lint:** `npm run lint` (ESLint with TypeScript + React hooks plugins)
- **Preview prod build:** `npm run preview`

### Backend (from `backend/`)
- **Dev server:** `npm run dev` (nodemon + ts-node, port 5000)
- **Build:** `npm run build` (tsc, outputs to `dist/`)
- **Start prod:** `npm run start`
- **Seed data:** `npm run seed`

### Docker
- **Full stack:** `docker-compose up --build` (frontend on :3000, backend on :5000)

### Install
- Use `npm install --legacy-peer-deps` for frontend (React 19 compatibility)

## Architecture

**Frontend:** React 19 + TypeScript + Vite. State: Zustand (client) + TanStack React Query v5 (server). Styling: Tailwind CSS 3.4. Routing: HashRouter (for GitHub Pages compatibility).

**Backend:** Express 4.18 + TypeScript + Mongoose 8. JWT auth with bcryptjs. Has dual controller pattern — each controller has a `.ts` (real DB) and `.mock.ts` (in-memory) variant.

**Mock mode:** The app runs fully without MongoDB. Set `VITE_MOCK_API=true` for frontend-only builds. Backend falls back to in-memory mock data automatically if DB is unavailable. Mock data: 46 properties, 5 users, 3 bookings.

## Key Patterns

- **Service layer:** `frontend/src/services/` has API clients (Axios) with mock variants in `services/mock/`
- **Store pattern:** Zustand stores in `frontend/src/store/` (authStore, searchStore)
- **API routes:** `/api/auth/*`, `/api/listings/*`, `/api/bookings/*`, `/api/reviews/*`
- **Protected routes** use JWT middleware in `backend/src/middleware/`

## CI/CD

GitHub Actions deploys frontend to GitHub Pages (`gh-pages` branch). PR previews are restricted to allowed authors list. Build uses `VITE_MOCK_API=true` for standalone frontend.

## LambdaTest Integration

Config in `.lambdatest/config.yaml`. Test URL: `https://demo.lambdatestinternal.com/`
