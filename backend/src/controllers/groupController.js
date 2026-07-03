const pool = require("../config/db");

// Create Group
const createGroup = async (req, res) => {
  try {
    const {
      company_id,
      group_name,
      group_type,
      parent_group,
      description,
    } = req.body;

    if (!company_id || !group_name || !group_type) {
      return res.status(400).json({
        success: false,
        message: "Company, Group Name and Group Type are required",
      });
    }

    const existingGroup = await pool.query(
      `SELECT id
       FROM groups
       WHERE company_id=$1
       AND LOWER(group_name)=LOWER($2)`,
      [company_id, group_name]
    );

    if (existingGroup.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Group already exists",
      });
    }

    const result = await pool.query(
      `INSERT INTO groups
      (
        company_id,
        group_name,
        group_type,
        parent_group,
        description
      )
      VALUES($1,$2,$3,$4,$5)
      RETURNING *`,
      [
        company_id,
        group_name,
        group_type,
        parent_group || null,
        description || "",
      ]
    );

    res.status(201).json({
      success: true,
      message: "Group created successfully",
      group: result.rows[0],
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get All Groups
const getGroups = async (req, res) => {
  try {
    const { company_id } = req.query;

    if (!company_id) {
      return res.status(400).json({
        success: false,
        message: "Company ID is required",
      });
    }

    const result = await pool.query(
      `SELECT *
       FROM groups
       WHERE company_id = $1
       ORDER BY group_name ASC`,
      [company_id]
    );

    res.json({
      success: true,
      groups: result.rows,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Group By ID
const getGroupById = async (req, res) => {
  try {

    const result = await pool.query(
      `SELECT *
       FROM groups
       WHERE id = $1`,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    res.json({
      success: true,
      group: result.rows[0],
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Update Group
const updateGroup = async (req, res) => {
  try {
    const systemGroup = await pool.query(
      `SELECT is_editable
       FROM groups
       WHERE id = $1`,
      [req.params.id]
    );

    if (
      systemGroup.rows.length &&
      systemGroup.rows[0].is_editable === false
    ) {
      return res.status(403).json({
        success: false,
        message: "System groups cannot be edited",
      });
    }

    const {
      group_name,
      group_type,
      parent_group,
      description,
    } = req.body;

    const result = await pool.query(
      `UPDATE groups
       SET
       group_name = $1,
       group_type = $2,
       parent_group = $3,
       description = $4
       WHERE id = $5
       RETURNING *`,
      [
        group_name,
        group_type,
        parent_group || null,
        description || "",
        req.params.id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    res.json({
      success: true,
      message: "Group updated successfully",
      group: result.rows[0],
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Delete Group
const deleteGroup = async (req, res) => {
  try {
    const systemGroup = await pool.query(
      `SELECT is_editable
       FROM groups
       WHERE id = $1`,
      [req.params.id]
    );

    if (
      systemGroup.rows.length &&
      systemGroup.rows[0].is_editable === false
    ) {
      return res.status(403).json({
        success: false,
        message: "System groups cannot be deleted",
      });
    }

    const result = await pool.query(
      `DELETE FROM groups
       WHERE id = $1
       RETURNING id`,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    res.json({
      success: true,
      message: "Group deleted successfully",
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
  createGroup,
  getGroups,
  getGroupById,
  updateGroup,
  deleteGroup,
};