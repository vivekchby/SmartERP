const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  getProfile,
  updateProfile,
  changePassword,
} = require("../controllers/userController");

router.use(authMiddleware);

router.get(
  "/",
  roleMiddleware("Admin"),
  getUsers
);

router.post(
  "/",
  roleMiddleware("Admin"),
  createUser
);

router.put(
  "/:id",
  roleMiddleware("Admin"),
  updateUser
);

router.delete(
  "/:id",
  roleMiddleware("Admin"),
  deleteUser
);
router.get(
"/profile",
authMiddleware,
getProfile
);

router.put(
"/profile",
authMiddleware,
updateProfile
);

router.put(
"/change-password",
authMiddleware,
changePassword
);

module.exports = router;