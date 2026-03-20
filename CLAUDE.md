# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run check` — TypeScript/Svelte type checking
- `npm run test:unit` — Unit tests (Vitest, tests in `tests/unit/`)
- `npm run test:e2e` — E2E tests (Playwright, tests in `tests/e2e/`, dev server on port 5178)

## Architecture

SvelteKit 2 app with Svelte 5 (Runes), TailwindCSS 4, and PouchDB. SSR is disabled — this is a fully client-side static app (`adapter-static` with SPA fallback).

### Data flow

```
Components → Stores (.svelte.ts) → Services → Repository → PouchDB
```

- **Repository** (`src/lib/repository/taskRepository.ts`) — Direct PouchDB CRUD
- **Services** (`src/lib/services/`) — Business logic layer
- **Stores** (`src/lib/stores/`) — Reactive state using Svelte Runes (`$state`, `$derived`)
- **Components** (`src/lib/components/`) — Consume stores directly

### Sync

PouchDB syncs live with a remote CouchDB instance. Per-user remote DB is named `rezero_{hex_encoded_username}`. Sync status is tracked as `'local' | 'syncing' | 'synced' | 'offline'`.

### Auth

CouchDB session-based auth via `src/lib/auth.ts`. CouchDB URL comes from `VITE_COUCHDB_URL` env var.

### Task model

Tasks have statuses: `active`, `dotted`, `completed`, `deleted`. IDs use `task_{uuid}` format. Tasks support hierarchical structure via `parentId` and ordering via `position`.

## Code style

- Svelte Runes for reactivity (store files use `.svelte.ts` extension)
- Tabs, single quotes, no trailing commas (Prettier config)
- PouchDB is aliased to `pouchdb-browser` in Vite config
