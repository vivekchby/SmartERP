const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
  createPurchase,
  getPurchases,
  getPurchaseById,
  deletePurchase,
} = require("../controllers/purchaseController");

const router = express.Router();

router.use(authMiddleware);

// Create Purchase
router.post("/", createPurchase);

// Get All Purchases
router.get("/", getPurchases);

// Get Purchase By ID
router.get("/:id", getPurchaseById);

// Delete Purchase
router.delete("/:id", deletePurchase);

module.exports = router;