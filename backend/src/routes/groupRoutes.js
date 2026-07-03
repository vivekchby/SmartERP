const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createGroup,
  getGroups,
  getGroupById,
  updateGroup,
  deleteGroup,
} = require("../controllers/groupController");

router.use(authMiddleware);

router.post("/", createGroup);
router.get("/", getGroups);
router.get("/:id", getGroupById);
router.put("/:id", updateGroup);
router.delete("/:id", deleteGroup);

module.exports = router;