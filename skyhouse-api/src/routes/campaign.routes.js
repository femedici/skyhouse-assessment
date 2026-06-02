import { Router } from "express";
import * as campaignController from "../controllers/campaign.controller.js";

const router = Router();

// GET /api/campaigns — all campaigns enriched with ROAS and CPA.
router.get("/campaigns", campaignController.listCampaigns);

// GET /api/campaigns/csv — the raw CSV that powers the dashboard.
router.get("/campaigns/csv", campaignController.getRawCsv);

// GET /api/summary — aggregate totals (spend, revenue, overall ROAS).
router.get("/summary", campaignController.getSummary);

export default router;
