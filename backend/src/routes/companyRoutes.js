const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
} = require("../controllers/companyController");

const router = express.Router();

router.use(authMiddleware);

router.post("/", roleMiddleware("admin"), createCompany);

router.get("/", getCompanies);

router.get("/:id", getCompanyById);

router.put(
  "/:id",
  roleMiddleware("admin"),
  updateCompany
);

router.delete("/:id", roleMiddleware("admin"), deleteCompany);

module.exports = router;