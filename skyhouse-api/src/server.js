import app from "./app.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`[skyhouse-api] running on http://localhost:${PORT}`);
  console.log(`[skyhouse-api] API docs at http://localhost:${PORT}/docs`);
});
