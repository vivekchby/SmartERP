const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getDashboardAnalytics,
} = require("../controllers/dashboardAnalyticsController");

router.use(authMiddleware);

router.get("/", getDashboardAnalytics);

module.exports = router;