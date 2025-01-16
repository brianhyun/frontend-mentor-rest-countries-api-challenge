import express from "express";

const router = express.Router();

// 404 handler for unknown routes
router.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

export default router;
