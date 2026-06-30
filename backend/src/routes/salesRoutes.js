const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
  createSale,
  getSales,
  getSaleById,
  deleteSale,
} = require("../controllers/salesController");

const router = express.Router();

router.use(authMiddleware);

router.post("/", createSale);

router.get("/", getSales);

router.get("/:id", getSaleById);

router.delete("/:id", deleteSale);

module.exports = router;