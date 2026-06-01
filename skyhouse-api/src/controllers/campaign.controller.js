import * as campaignService from "../services/campaign.service.js";

export async function listCampaigns(req, res, next) {
  try {
    const { campaigns, warnings } = await campaignService.getCampaigns();
    res.json({ success: true, data: campaigns, warnings });
  } catch (error) {
    next(error);
  }
}

export async function filterCampaigns(req, res, next) {
  try {
    const { minRoas } = req.query;
    const result = await campaignService.getCampaignsByMinRoas(minRoas);
    res.json({
      success: true,
      data: result.campaigns,
      appliedMinRoas: result.appliedMinRoas,
      warnings: result.warnings,
    });
  } catch (error) {
    next(error);
  }
}

export async function getSummary(req, res, next) {
  try {
    const summary = await campaignService.getSummary();
    res.json({ success: true, data: summary });
  } catch (error) {
    next(error);
  }
}

export async function getRawCsv(req, res, next) {
  try {
    const csvText = await campaignService.getRawCsv();
    res.type("text/csv").send(csvText);
  } catch (error) {
    next(error);
  }
}
