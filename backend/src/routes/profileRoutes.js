const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getProfile,
  updateProfile,
  changePassword,
} = require("../controllers/profileController");

router.use(authMiddleware);

// Get Logged-in User
router.get("/", getProfile);

// Update Profile
router.put("/", updateProfile);

// Change Password
router.put("/change-password", changePassword);

module.exports = router;