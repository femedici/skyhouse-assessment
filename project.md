# Project Structure

Two independent apps in one repo:

- `skyhouse-api/` — Express (ESM) backend.
- `skyhouse-web/` — React + Vite + TypeScript frontend.

Each layer has one job and depends only on the layer below it. Files are grouped
by feature, and named by role (`*.controller`, `*.service`, `*.component`,
`*.container`, `*.styles`, `*.types`) so the role is obvious from the filename.

## Backend (`skyhouse-api/src`)

A request flows through four layers, top to bottom:

```
routes/        HTTP surface: paths, wiring to controllers
controllers/   request/response handling, status codes, no business logic
services/      business logic and data access (CSV parsing, GNews fetch, cache)
utils/, config/  pure helpers (metrics) and static settings (news)
```

- **`routes/`** — `campaign.routes.js`, `insights.routes.js`. Map URLs to
  controller methods. Endpoints:
  - `GET /api/campaigns` — all campaigns, enriched with ROAS and CPA.
  - `GET /api/campaigns/csv` — the raw CSV.
  - `GET /api/summary` — aggregate totals.
  - `GET /api/insights/news` — the marketing-news feed.
- **`controllers/`** — `campaign.controller.js`, `insights.controller.js`. Read
  query params, call a service, shape the JSON response, set the status code.
  They hold no business logic.
- **`services/`** — where the work happens.
  - `campaign.service.js` reads and parses the CSV, enriches each row with
    computed metrics, and aggregates the summary.
  - `insights.service.js` owns the GNews integration (see below).
- **`utils/metrics.js`** — pure ROAS/CPA math, no I/O, easy to reason about.
- **`config/`** — `news.config.js` (GNews settings from env).
- **`app.js`** builds the Express app (CORS, JSON, routes, `/health`, 404, error
  handler); **`server.js`** starts it.

## Frontend (`skyhouse-web/src`)

The screen uses a **container / component** split so data logic and presentation
stay separate:

```
pages/dashboard-display/
  display.container.tsx   stateful: fetches data, holds state, handles events
  display.component.tsx   presentational: renders props, no data fetching
  display.controller.ts   pure logic: ROAS tiers, row mapping, filtering
  display.types.ts        types shared across the page
  display.styles.ts       styled-components for the page shell
  components/             presentational sub-components, one folder each:
    campaign-table/ csv-view/ insights/ revenue-chart/ roas-filter/
    summary-bar/ tabs/
```

- **Container** (`*.container.tsx`) is the only place that fetches, holds state,
  and wires events (loading, errors, toasts). It passes plain props down.
- **Component** (`*.component.tsx`) is pure presentation: given props, it renders.
  No data fetching, so it is trivial to read and reuse.
- **Controller** (`*.controller.ts`) holds the page's pure decision logic (e.g.
  classifying a ROAS value into a tier, mapping API rows to view rows). Pure
  functions, no React, no I/O.
- Each sub-component lives in its own folder with its `*.component.tsx`,
  `*.styles.ts`, and any `*.types.ts`, so a feature is self-contained.

Supporting folders:

- **`components/`** — app-wide UI not tied to one page (the toast system).
- **`services/`** — typed API clients (`campaign.service.ts`,
  `insights.service.ts`) plus their `*.types.ts`. The UI calls these, never
  `fetch` directly.
- **`lib/`** — framework-agnostic helpers: `api.ts` (a small `fetch` wrapper with
  typed errors) and `format.ts` (currency, ROAS, relative time).
- **`styles/`** — design tokens, global styles, and the styled-components theme
  type.

## Third-party API integration (GNews)

The marketing-news feed comes from the GNews REST API. The integration lives
entirely in the backend so the key never reaches the browser and responses can be
cached and normalized in one place.

`config/news.config.js` reads settings from the environment:

- `GNEWS_API_KEY` — required for the feed; read from env, never hard-coded.
- `GNEWS_QUERY` — optional override for the search terms.
- Fixed values: base URL, language, result count, an 8s timeout, and a 5-minute
  cache TTL.

`services/insights.service.js` does the rest:

1. **Guard** — if no API key is configured, throw a `503` with an actionable
   message instead of calling out.
2. **Cache** — an in-memory entry with a 5-minute TTL. A cache hit returns
   immediately with `meta.cached = true`, which keeps the UI responsive and stays
   within the free tier's daily request limit.
3. **Fetch** — build the search URL and call GNews with `AbortSignal.timeout` so a
   slow upstream can't hang the request.
4. **Map errors to HTTP status** — network failure → `502`, timeout → `504`,
   rejected key → `502`, rate limit → `429`, other upstream errors → `502`. Each
   carries a clear, user-facing message.
5. **Transform** — a pure function turns the raw GNews payload into the app's
   shape: drop items missing a title or URL, de-duplicate by URL, sort newest
   first, and attach `meta` (per-source counts, totals, timestamps). Keeping it
   pure separates the fetch/cache/error concerns from the data-shaping concerns.

The controller returns the normalized `{ articles, meta }` to the frontend, where
`services/insights.service.ts` consumes it with matching types. If the key is
missing or the upstream fails, only the **Campaign Insights** tab is affected: the
API returns a clear status and the UI shows an actionable message.
