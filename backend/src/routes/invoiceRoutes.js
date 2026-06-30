const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
  getInvoice,
  downloadInvoicePdf,
} = require("../controllers/invoiceController");

const router = express.Router();

router.use(authMiddleware);

router.get("/:saleId", getInvoice);

router.get(
  "/pdf/:saleId",
  downloadInvoicePdf
);

module.exports = router;