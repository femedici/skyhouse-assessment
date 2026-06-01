import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import campaignRoutes from "./routes/campaign.routes.js";
import insightsRoutes from "./routes/insights.routes.js";
import { swaggerSpec } from "./config/swagger.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", campaignRoutes);
app.use("/api", insightsRoutes);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/openapi.json", (req, res) => res.json(swaggerSpec));

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Not found: ${req.method} ${req.originalUrl}`,
  });
});

app.use((err, req, res, next) => {
  console.error("[skyhouse-api] Unhandled error:", err);
  const status = err.status || err.statusCode || 500;
  res.status(status).json({ success: false, error: err.message });
});

export default app;
