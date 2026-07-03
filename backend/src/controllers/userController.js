const pool = require("../config/db");
const bcrypt = require("bcryptjs");

const getCompanyIdForUser = async (userId) => {
  const result = await pool.query(
    "SELECT company_id FROM users WHERE id = $1",
    [userId]
  );
  return result.rows[0]?.company_id;
};

const getUsers = async (req, res) => {
  try {
    const companyId = await getCompanyIdForUser(req.user.id);

    if (!companyId) {
      return res.status(404).json({
        success: false,
        message: "Company not found for current user",
      });
    }

    const users = await pool.query(
      "SELECT id, name, email, role, company_id FROM users WHERE company_id = $1",
      [companyId]
    );

    res.json({
      success: true,
      users: users.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Name, email, password, and role are required",
      });
    }

    const companyId = await getCompanyIdForUser(req.user.id);

    if (!companyId) {
      return res.status(404).json({
        success: false,
        message: "Company not found for current user",
      });
    }

    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userResult = await pool.query(
      "INSERT INTO users (company_id, name, email, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, role, company_id",
      [companyId, name, email, hashedPassword, role]
    );

    res.status(201).json({
      success: true,
      user: userResult.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const updateProfile=async(req,res)=>{

const {name,email}=req.body;

const result=await pool.query(

`UPDATE users

SET

name=$1,

email=$2

WHERE id=$3

RETURNING id,name,email`,

[
name,
email,
req.user.id
]

);

res.json({

success:true,

user:result.rows[0]

});

}
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, password } = req.body;

    const companyId = await getCompanyIdForUser(req.user.id);

    if (!companyId) {
      return res.status(404).json({
        success: false,
        message: "Company not found for current user",
      });
    }

    const existingUser = await pool.query(
      "SELECT id FROM users WHERE id = $1 AND company_id = $2",
      [id, companyId]
    );

    if (existingUser.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const fields = [];
    const values = [];
    let index = 1;

    if (name) {
      fields.push(`name = $${index++}`);
      values.push(name);
    }

    if (email) {
      fields.push(`email = $${index++}`);
      values.push(email);
    }

    if (role) {
      fields.push(`role = $${index++}`);
      values.push(role);
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      fields.push(`password = $${index++}`);
      values.push(hashedPassword);
    }

    if (fields.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No update fields provided",
      });
    }

    values.push(id);

    const query = `UPDATE users SET ${fields.join(", ")} WHERE id = $${index} RETURNING id, name, email, role, company_id`;
    const result = await pool.query(query, values);

    res.json({
      success: true,
      user: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// GET Profile
const getProfile = async (req, res) => {

    try{

        const result =
        await pool.query(

        `SELECT
            id,
            name,
            email,
            role,
            company_id
         FROM users
         WHERE id=$1`,

        [req.user.id]

        );

        res.json({
            success:true,
            user:result.rows[0]
        });

    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

}
const changePassword=async(req,res)=>{

const{

oldPassword,

newPassword

}=req.body;

const user=await pool.query(

"SELECT * FROM users WHERE id=$1",

[
req.user.id
]

);

const isMatch=

await bcrypt.compare(

oldPassword,

user.rows[0].password

);

if(!isMatch){

return res.status(400).json({

message:"Old Password Incorrect"

});

}

const hash=

await bcrypt.hash(

newPassword,

10

);

await pool.query(

"UPDATE users SET password=$1 WHERE id=$2",

[
hash,
req.user.id
]

);

res.json({

success:true,

message:"Password Updated"

});

}
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (parseInt(id, 10) === req.user.id) {
      return res.status(400).json({
        success: false,
        message: "You cannot delete yourself",
      });
    }

    const companyId = await getCompanyIdForUser(req.user.id);

    if (!companyId) {
      return res.status(404).json({
        success: false,
        message: "Company not found for current user",
      });
    }

    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 AND company_id = $2 RETURNING id",
      [id, companyId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found or cannot be deleted",
      });
    }

    res.json({
      success: true,
      message: "User deleted successfully",
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
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getProfile,
  updateProfile,
  changePassword,
};
