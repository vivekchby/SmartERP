const pool = require("../config/db");
const bcrypt = require("bcryptjs");

// Get Logged-in User Profile
const getProfile = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT
        u.id,
        u.name,
        u.email,
        u.role,
        u.company_id,
        c.company_name
      FROM users u
      LEFT JOIN companies c
      ON u.company_id = c.id
      WHERE u.id = $1`,
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      profile: result.rows[0],
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Logged-in User Profile
const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const result = await pool.query(
      `UPDATE users
       SET
         name = $1,
         email = $2
       WHERE id = $3
       RETURNING
         id,
         name,
         email,
         role,
         company_id`,
      [
        name,
        email,
        req.user.id,
      ]
    );

    res.json({
      success: true,
      message: "Profile updated successfully",
      profile: result.rows[0],
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Change Password
const changePassword = async (req, res) => {
  try {
    const {
      currentPassword,
      newPassword,
    } = req.body;

    const userResult = await pool.query(
      "SELECT password FROM users WHERE id=$1",
      [req.user.id]
    );

    const user = userResult.rows[0];

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    const hashedPassword =
      await bcrypt.hash(newPassword, 10);

    await pool.query(
      `UPDATE users
       SET password=$1
       WHERE id=$2`,
      [
        hashedPassword,
        req.user.id,
      ]
    );

    res.json({
      success: true,
      message: "Password changed successfully",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  getProfile,
  updateProfile,
  changePassword,
};