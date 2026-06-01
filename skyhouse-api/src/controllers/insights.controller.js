import * as insightsService from "../services/insights.service.js";

export async function getMarketingNews(req, res, next) {
  try {
    const { articles, meta } = await insightsService.getMarketingNews();
    res.json({ success: true, data: articles, meta });
  } catch (error) {
    next(error);
  }
}
