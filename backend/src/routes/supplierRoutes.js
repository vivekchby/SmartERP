const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
  createSupplier,
  getSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
} = require("../controllers/supplierController");

const router = express.Router();

router.use(authMiddleware);

router.post("/", createSupplier);

router.get("/", getSuppliers);

router.get("/:id", getSupplierById);

router.put("/:id", updateSupplier);

router.delete("/:id", deleteSupplier);

module.exports = router;