const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
  createLedger,
  getLedgers,
  getLedgerDropdown,
  getLedgerById,
  updateLedger,
  deleteLedger,
} = require("../controllers/ledgerController");

const router = express.Router();

router.use(authMiddleware);

router.post("/", createLedger);

router.get("/", getLedgers);

router.get("/:id", getLedgerById);

router.put("/:id", updateLedger);

router.delete("/:id", deleteLedger);

router.get("/dropdown", getLedgerDropdown);

module.exports = router;