const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register User
const register = async (req, res) => {
  try {
    const {
      company_name,
      name,
      email,
      password,
    } = req.body;

    if (
      !company_name ||
      !name ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    await pool.query("BEGIN");

    // Create Company

    const companyResult = await pool.query(
  `INSERT INTO companies
  (
    company_name,
    gst_number,
    state,
    financial_year,
    address
  )
  VALUES($1,$2,$3,$4,$5)
  RETURNING id`,
  [
    company_name,
    "",
    "",
    "",
    "",
  ]
);

const companyId = companyResult.rows[0].id;

    // Hash Password

    const hashedPassword =
      await bcrypt.hash(password, 10);

    // Create Admin User

    const userResult = await pool.query(
  `INSERT INTO users
  (
    company_id,
    name,
    email,
    password,
    role
  )
  VALUES($1,$2,$3,$4,$5)
  RETURNING id,name,email,company_id,role`,
  [
    companyId,
    name,
    email,
    hashedPassword,
    "Admin",
  ]
);

await pool.query(
  `UPDATE companies
   SET user_id=$1
   WHERE id=$2`,
  [
    userResult.rows[0].id,
    companyId,
  ]
);

    await pool.query("COMMIT");

    res.status(201).json({
      success: true,
      message:
        "Company Created Successfully",
      user: userResult.rows[0],
    });

  } catch (error) {

    await pool.query("ROLLBACK");

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Login User
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const user = userResult.rows[0];

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

   const token = jwt.sign(
  {
    id: user.id,
    role: user.role,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d",
  }
);

    res.json({
  success: true,
  token,
  user: {
    id: user.id,
    name: user.name,
    email: user.email,
    company_id: user.company_id,
     role: user.role,
  },
});

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Current Logged-in User
const me = async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT id,name,email FROM users WHERE id = $1",
      [req.user.id]
    );

    if (user.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user.rows[0]);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  me,
};