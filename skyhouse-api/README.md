# skyhouse-api

Express (ESM) backend for the SkyHouse dashboard. It serves the campaign data
and a **Campaign Insights** feed built on a third-party REST API.

- Health check: `http://localhost:3000/health`

### Endpoints

| Method & path           | Returns                                                  |
| ----------------------- | -------------------------------------------------------- |
| `GET /api/campaigns`    | All campaigns enriched with ROAS and CPA.                |
| `GET /api/campaigns/csv`| The raw CSV that powers the dashboard.                   |
| `GET /api/summary`      | Aggregate totals (spend, revenue, overall ROAS).         |
| `GET /api/insights/news`| Cleaned, aggregated campaign-performance news feed (GNews).|
| `GET /health`           | `{ "status": "ok" }`                                     |

## Running

```bash
cd skyhouse-api
npm install
cp .env.example .env   # then add your GNews key (see below)
npm run dev            # nodemon + --env-file-if-exists=.env
```

The campaign endpoints work with no configuration. The Insights endpoint needs a
free API key; without one it returns a clear, actionable 503 instead of failing.

---

## Campaign Insights integration

### What it does

`GET /api/insights/news` returns the latest campaign-performance, ad-spend and
advertising-ROI news, cleaned and aggregated for the dashboard. It is a
standalone endpoint with its own controller, service and route docs, independent
of the campaign data.

### Which API, and why

**Provider: [GNews](https://gnews.io) `/api/v4/search`.**

The Insights tab is about the world the campaigns live in, so a live news feed
curated to campaign performance, ad spend, paid media and advertising ROI is
genuinely relevant content rather than filler — it mirrors the dashboard's own
ROAS/CPA focus. The default query uses exact phrases (not loose keywords) so
stories stay on theme. GNews was chosen because it:

- has a **free tier** (100 requests/day) suitable for an assessment,
- uses **simple key-based auth** over plain REST and JSON (no OAuth dance),
- returns a **predictable, well-documented shape**, and
- exposes the fields a feed needs: title, description, url, image, source,
  publish time.

The point of the exercise is not just to proxy a feed but to **add value on top
of the raw response** (see "Transform" below).

### Configuration

Set in `skyhouse-api/.env` (never committed; `.env.example` is the template):

| Variable        | Required | Purpose                                                             |
| --------------- | -------- | ------------------------------------------------------------------- |
| `GNEWS_API_KEY` | yes      | Free key from gnews.io. Read from env, never hard-coded.            |
| `GNEWS_QUERY`   | no       | Override the search query. Defaults to advertising/marketing terms. |
| `PORT`          | no       | API port (defaults to 3000).                                        |

Get a key at https://gnews.io (free, email signup), paste it into `.env`, and
restart the API.

### How the integration handles the hard parts

This is where most of the engineering lives. The controller stays thin; the
service (`src/services/insights.service.js`) owns the operational concerns.

**Auth.** The key is read from config (env), never embedded in source. If it is
missing the service refuses cleanly with **503** and a message telling the
operator exactly what to do, instead of calling the upstream with an empty key.

**Errors.** Upstream failures are mapped to safe, typed messages with the right
HTTP status, and GNews's own `errors[]` body is surfaced for diagnostics:

| Situation                                                     | Response                                            |
| ------------------------------------------------------------- | --------------------------------------------------- |
| Missing key                                                   | `503` "News integration is not configured..."       |
| Bad/rejected key (401/403, or `api key` in the upstream body) | `502` "The news provider rejected the API key."     |
| Rate limit (429)                                              | `429` "News rate limit reached..."                  |
| Upstream timeout                                              | `504` "The news provider took too long to respond." |
| Network failure                                               | `502` "Could not reach the news provider."          |
| Other non-2xx                                                 | `502` with the upstream message                     |

The central error handler logs the full error server-side but only ever returns
`err.message` to the client, never a stack trace.

**Rate limits.** A free key allows limited daily calls, so the service keeps an
in-memory TTL cache (default 5 minutes). Repeat views are served from cache
(flagged `meta.cached: true`) and never spend quota. The frontend reinforces
this by fetching only when the user first opens the Insights tab, not on page
load.

**Timeouts.** The upstream call is wrapped in `AbortSignal.timeout`, so a slow
provider can never hang the request; it becomes a clean 504.

### Transform: the value added over the raw feed

`transform()` turns the raw GNews payload into a shape the UI can render
directly, and enriches it:

1. **Prune** to the fields the UI needs (title, summary, url, image, source,
   publishedAt).
2. **Drop malformed entries** (missing title or url).
3. **De-duplicate** syndicated stories by normalized URL (the same story is
   often republished across outlets).
4. **Enrich** each item with `ageHours` (hours since publication).
5. **Sort** newest first.
6. **Aggregate** a source breakdown (`{ name, count }`, most-covered first), the
   `topSource`, and the freshness window (`newest`/`oldest`), plus
   `totalReturned` / `totalAvailable`.

The transform is a pure function (no network, no state), so the fetch/cache/error
concerns and the data-shaping concerns stay cleanly separated.

### Response shape

```jsonc
{
  "success": true,
  "data": [
    {
      "title": "Retail media networks reshape where ad dollars flow",
      "summary": "Brands are shifting budgets toward retailer-owned ad platforms...",
      "url": "https://example.com/story",
      "imageUrl": "https://.../image.jpg",
      "source": "AdAge",
      "publishedAt": "2026-06-01T10:00:00Z",
      "ageHours": 2,
    },
  ],
  "meta": {
    "topic": "Campaign performance & advertising ROI",
    "provider": "GNews",
    "query": "\"performance marketing\" OR \"digital advertising\" OR \"ad spend\" OR ...",
    "fetchedAt": "2026-06-01T12:00:00Z",
    "totalReturned": 8,
    "totalAvailable": 1240,
    "sources": [{ "name": "AdAge", "count": 2 }],
    "topSource": "AdAge",
    "newest": "2026-06-01T10:00:00Z",
    "oldest": "2026-05-29T08:00:00Z",
    "cached": false,
  },
}
```

### Files

| File                                     | Responsibility                                           |
| ---------------------------------------- | -------------------------------------------------------- |
| `src/config/news.config.js`              | Reads env, holds query/timeout/cache defaults.           |
| `src/services/insights.service.js`       | Fetch, auth, timeout, error mapping, cache, transform.   |
| `src/controllers/insights.controller.js` | Thin HTTP layer: calls the service, shapes the response. |
| `src/routes/insights.routes.js`          | Route wiring.                                            |
