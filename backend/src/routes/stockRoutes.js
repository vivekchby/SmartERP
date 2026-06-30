const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
  createStock,
  getStocks,
  getStockById,
  updateStock,
  deleteStock,
} = require("../controllers/stockController");

const router = express.Router();

router.use(authMiddleware);

router.post("/", createStock);

router.get("/", getStocks);

router.get("/:id", getStockById);

router.put("/:id", updateStock);

router.delete("/:id", deleteStock);

module.exports = router;