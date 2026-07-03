const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  salesReport,
  purchaseReport,
  stockReport,
  trialBalance
} = require("../controllers/reportController");

router.use(authMiddleware);

router.get("/sales", salesReport);

router.get("/purchase", purchaseReport);

router.get("/stock", stockReport);

router.get("/trial-balance", trialBalance);

module.exports = router;