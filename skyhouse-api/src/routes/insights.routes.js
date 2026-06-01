import { Router } from "express";
import * as insightsController from "../controllers/insights.controller.js";

const router = Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     NewsArticle:
 *       type: object
 *       properties:
 *         title: { type: string, example: "How retail brands are reshaping ad spend" }
 *         summary: { type: string, nullable: true }
 *         url: { type: string, example: "https://example.com/story" }
 *         imageUrl: { type: string, nullable: true }
 *         source: { type: string, example: "AdWeek" }
 *         publishedAt: { type: string, format: date-time, nullable: true }
 *         ageHours: { type: number, nullable: true, example: 3, description: "Hours since publication" }
 *     NewsMeta:
 *       type: object
 *       properties:
 *         topic: { type: string, example: "Branding, business & marketing tech" }
 *         provider: { type: string, example: GNews }
 *         query: { type: string }
 *         fetchedAt: { type: string, format: date-time }
 *         totalReturned: { type: number, example: 10 }
 *         totalAvailable: { type: number, nullable: true }
 *         topSource: { type: string, nullable: true, example: "AdWeek" }
 *         sources:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               count: { type: number }
 *         newest: { type: string, format: date-time, nullable: true }
 *         oldest: { type: string, format: date-time, nullable: true }
 *         cached: { type: boolean, example: false, description: "Served from the in-memory cache" }
 */

/**
 * @openapi
 * /api/insights/news:
 *   get:
 *     summary: Latest advertising & marketing news (via the GNews API), cleaned and aggregated
 *     description: >
 *       Fetches headlines from GNews, de-duplicates syndicated stories, enriches each
 *       item with a relative age, and returns a source breakdown. Responses are cached
 *       in memory for a few minutes to respect the free-tier rate limit.
 *     tags: [Insights]
 *     responses:
 *       200:
 *         description: Cleaned, aggregated news feed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/NewsArticle' }
 *                 meta: { $ref: '#/components/schemas/NewsMeta' }
 *       429:
 *         description: GNews rate limit reached
 *       502:
 *         description: Upstream provider error (bad key, provider down)
 *       503:
 *         description: Integration not configured (missing GNEWS_API_KEY)
 *       504:
 *         description: Upstream provider timed out
 */
router.get("/insights/news", insightsController.getMarketingNews);

export default router;
