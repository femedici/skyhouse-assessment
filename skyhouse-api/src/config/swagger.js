import swaggerJsdoc from "swagger-jsdoc";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SkyHouse Campaign API",
      version: "1.0.0",
      description:
        "Ingests the campaign CSV and serves performance metrics (ROAS, CPA) for the SkyHouse dashboard.",
    },
    servers: [
      { url: "http://localhost:3000", description: "Local development" },
    ],
  },
  apis: [path.resolve(__dirname, "../routes/*.js")],
};

export const swaggerSpec = swaggerJsdoc(options);
