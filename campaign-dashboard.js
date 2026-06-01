// =========================================================
//  SkyHouse Agency — Full Stack Developer Assessment
//  Part 3: Bug Hunt — CORRECTED
//  File: campaign-dashboard.js
//  All five intentional bugs are fixed below. Each fix is
//  marked with a "FIX N" comment explaining the correction.
// =========================================================

const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
app.use(express.json()); // FIX 1: call the factory so it returns the middleware function

// Load campaign data from CSV
async function loadCampaignData(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => results.push(row))
      .on('end', () => resolve(results))
      .on('error', (err) => reject(err));
  });
}

// Calculate ROAS and CPA for each campaign
function calculateMetrics(campaigns) {
  return campaigns.map(c => {
    const spend = parseFloat(c.spend);
    const revenue = parseFloat(c.revenue);
    const roas = revenue / spend; // FIX 2: ROAS = revenue / spend
    const cpa = spend / parseInt(c.conversions);
    return { ...c, roas: roas.toFixed(2), cpa: cpa.toFixed(2) };
  });
}

// GET /api/campaigns — return all campaigns with metrics
app.get('/api/campaigns', async (req, res) => {
  try {
    const raw = await loadCampaignData('./data/campaigns.csv');
    const campaigns = calculateMetrics(raw);
    res.json({ success: true, data: campaigns });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message }); // FIX 3: send only the message, never the full Error object
  }
});

// POST /api/campaigns/filter — filter by min ROAS
app.post('/api/campaigns/filter', async (req, res) => {
  try {
    const { minRoas } = req.body;
    const raw = await loadCampaignData('./data/campaigns.csv');
    const campaigns = calculateMetrics(raw);
    const threshold = Number(minRoas);
    const filtered = campaigns.filter(c => parseFloat(c.roas) >= threshold); // FIX 4: compare numbers on both sides, not a string vs a number
    res.json({ success: true, data: filtered });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/summary — return aggregate stats
app.get('/api/summary', async (req, res) => {
  try {
    const raw = await loadCampaignData('./data/campaigns.csv');
    const campaigns = calculateMetrics(raw);
    const totalSpend = campaigns.reduce((acc, c) => acc + parseFloat(c.spend), 0); // FIX 5: parse the string to a number before summing
    const totalRevenue = campaigns.reduce((acc, c) => acc + parseFloat(c.revenue), 0);
    res.json({ totalSpend, totalRevenue, overallRoas: (totalRevenue / totalSpend).toFixed(2) });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
