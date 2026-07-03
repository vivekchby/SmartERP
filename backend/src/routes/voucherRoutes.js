const express = require("express");

const authMiddleware =
require("../middleware/authMiddleware");

const {
  createVoucherEntry,
  getVouchers,
} =
require("../controllers/voucherController");

const router = express.Router();

router.use(authMiddleware);

router.post(
  "/",
  createVoucherEntry
);

router.get(
  "/",
  getVouchers
);

module.exports = router;