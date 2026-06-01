import { Router } from "express";
import * as campaignController from "../controllers/campaign.controller.js";

const router = Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     Campaign:
 *       type: object
 *       properties:
 *         campaignId: { type: string, example: C001 }
 *         campaignName: { type: string, example: "Wrinkle Cream — FB Broad" }
 *         platform: { type: string, example: Facebook }
 *         spend: { type: number, nullable: true, example: 4200 }
 *         revenue: { type: number, nullable: true, example: 18900 }
 *         conversions: { type: number, nullable: true, example: 312 }
 *         roas: { type: number, nullable: true, example: 4.5, description: "revenue / spend; null when spend is 0 or missing" }
 *         cpa: { type: number, nullable: true, example: 13.46, description: "spend / conversions; null when conversions is 0 or missing" }
 *         warnings:
 *           type: array
 *           items: { type: string }
 */

/**
 * @openapi
 * /api/campaigns:
 *   get:
 *     summary: List all campaigns with computed metrics
 *     tags: [Campaigns]
 *     responses:
 *       200:
 *         description: Campaigns enriched with ROAS and CPA
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/Campaign' }
 *                 warnings:
 *                   type: array
 *                   items: { type: string }
 */
router.get("/campaigns", campaignController.listCampaigns);

/**
 * @openapi
 * /api/campaigns/filter:
 *   get:
 *     summary: Filter campaigns by a minimum ROAS
 *     tags: [Campaigns]
 *     parameters:
 *       - in: query
 *         name: minRoas
 *         schema: { type: number, example: 2 }
 *         description: Only return campaigns whose ROAS is >= this value
 *     responses:
 *       200:
 *         description: Campaigns at or above the ROAS floor
 */
router.get("/campaigns/filter", campaignController.filterCampaigns);

/**
 * @openapi
 * /api/campaigns/csv:
 *   get:
 *     summary: Raw CSV source used to power the dashboard
 *     tags: [Campaigns]
 *     responses:
 *       200:
 *         description: The campaign CSV as plain text
 *         content:
 *           text/csv:
 *             schema: { type: string }
 */
router.get("/campaigns/csv", campaignController.getRawCsv);

/**
 * @openapi
 * /api/summary:
 *   get:
 *     summary: Aggregate totals across all campaigns
 *     tags: [Summary]
 *     responses:
 *       200:
 *         description: Total spend, total revenue and overall ROAS
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: object
 *                   properties:
 *                     campaignCount: { type: number, example: 5 }
 *                     totalSpend: { type: number, example: 16800.5 }
 *                     totalRevenue: { type: number, example: 66710 }
 *                     totalConversions: { type: number, example: 1193 }
 *                     overallRoas: { type: number, nullable: true, example: 3.97 }
 */
router.get("/summary", campaignController.getSummary);

export default router;
