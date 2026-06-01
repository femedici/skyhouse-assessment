# SkyHouse Campaign Dashboard

Full-stack campaign performance dashboard. A React frontend renders campaign
metrics (ROAS, CPA) and a live marketing-news feed served by an Express API.

- `skyhouse-api/` — Express (ESM) backend: serves campaign data from a CSV and a
  third-party news feed (GNews).
- `skyhouse-web/` — React + Vite + TypeScript frontend.

See [project.md](project.md) for the architecture and how the third-party API
integration is built.

## Requirements

- Node.js 20.6+ (the backend uses `node --env-file-if-exists`).
- npm.

## Run the backend

```bash
cd skyhouse-api
npm install
cp .env.example .env     # then add your GNews key (see "Environment" below)
npm run dev              # http://localhost:3000
```

- API docs (Swagger UI): http://localhost:3000/docs
- OpenAPI spec: http://localhost:3000/openapi.json
- Health check: http://localhost:3000/health

`npm run dev` watches for changes and loads `.env` if present. Use `npm start`
for a plain run without watch.

## Run the frontend

In a second terminal:

```bash
cd skyhouse-web
npm install
npm run dev              # http://localhost:5173
```

Open http://localhost:5173. The Vite dev server proxies `/api` to the backend on
port 3000, so run both at the same time. Start the backend first so the first
data fetch succeeds.

## Environment

The only configuration is for the backend, in `skyhouse-api/.env` (copy it from
`.env.example`; `.env` is gitignored and never committed).

| Variable        | Required             | Purpose                                                                                                     |
| --------------- | -------------------- | ----------------------------------------------------------------------------------------------------------- |
| `GNEWS_API_KEY` | For the Insights tab | Free key from [gnews.io](https://gnews.io) (100 requests/day). Read from the environment, never hard-coded. |
| `GNEWS_QUERY`   | No                   | Override the news search query. Defaults to branding / marketing-tech terms.                                |
| `PORT`          | No                   | Backend port. Defaults to `3000`.                                                                           |

The campaign endpoints (CSV, performance, summary) work with no configuration.
Without a `GNEWS_API_KEY`, only the **Campaign Insights** tab is affected: the
API returns a clear `503` and the UI shows an actionable message instead of
breaking.

The frontend needs no `.env` for local use. To point it at a non-proxied API
(e.g. a deployed backend), set `VITE_API_URL` in `skyhouse-web/.env`; it defaults
to same-origin, which the dev proxy handles.
