import { Router } from "express";
import * as insightsController from "../controllers/insights.controller.js";

const router = Router();

// GET /api/insights/news — latest marketing news from GNews, de-duplicated,
// enriched with relative age and a source breakdown, cached in memory.
// Returns 429 (rate limit), 502 (bad key / provider down), 503 (not
// configured) or 504 (upstream timeout) on failure.
router.get("/insights/news", insightsController.getMarketingNews);

export default router;
