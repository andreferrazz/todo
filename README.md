# Re-zero

A task management app based on Mark Forster's Resistance Zero system.

## About

Resistance Zero (Re-zero) is a time management system created by [Mark Forster](http://markforster.squarespace.com/). Instead of traditional prioritization, you always do what feels easy right now. As easy tasks are completed, the tasks that once seemed hard become the "easiest remaining" and resistance drops naturally. Rephrasing resistant tasks into smaller steps further lowers the barrier. Over time, everything gets done.

**Core principles:**

- **Zero resistance** — Read your task list from bottom to top. Dot any task you feel no resistance to doing.
- **Work bottom-up** — Execute dotted tasks starting from the end of the list.
- **Little and often** — You don't need to finish a task in one go. If resistance increases, stop and move on.
- **Re-enter tasks** — If a task wasn't completed, rewrite it at the end of the list.
- **Rephrase resistance** — If a task consistently causes resistance, rephrase it to be smaller.

## Features

- Offline-first with PouchDB local storage
- Optional CouchDB sync across devices
- PWA — installable on mobile and desktop
- Dark mode
- Swipe gestures for task actions
- Internationalization (English, Brazilian Portuguese)

## Tech stack

- **Frontend:** SvelteKit 2, Svelte 5 (Runes), TailwindCSS 4, PouchDB
- **Backend:** Node.js signup proxy server
- **Database:** CouchDB 3.5.1
- **Tooling:** Vite, Vitest, Playwright

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/) (for CouchDB and full-stack setup)

### Setup

```sh
git clone <repo-url>
cd todo
cp .env.example .env
```

### Full stack (Docker)

```sh
docker compose up
```

This starts the frontend (port 3001), backend proxy (port 3000), and CouchDB (port 5984).

### Frontend only

```sh
npm --prefix frontend install
npm --prefix frontend run dev
```

## Project structure

```
├── frontend/          # SvelteKit app
├── backend/           # Node.js signup proxy
├── docker-compose.yml
├── .env.example
└── CLAUDE.md
```

## Development commands

| Command                               | Description                     |
|---------------------------------------|---------------------------------|
| `npm --prefix frontend run dev`       | Start dev server                |
| `npm --prefix frontend run build`     | Production build                |
| `npm --prefix frontend run check`     | TypeScript/Svelte type checking |
| `npm --prefix frontend run test:unit` | Run unit tests (Vitest)         |
| `npm --prefix frontend run test:e2e`  | Run E2E tests (Playwright)      |
