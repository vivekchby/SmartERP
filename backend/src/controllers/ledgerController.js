const pool = require("../config/db");

// Create Ledger
const createLedger = async (req, res) => {
  try {
    const {
      company_id,
      ledger_name,
      group_id,
      opening_balance,
      balance_type,
      phone,
      email,
      gst_number,
      address,
    } = req.body;

    if (!company_id || !ledger_name || !group_id) {
      return res.status(400).json({
        success: false,
        message: "Company, Ledger Name and Group are required",
      });
    }

    const existingLedger = await pool.query(
      `SELECT id
       FROM ledgers
       WHERE company_id=$1
       AND LOWER(ledger_name)=LOWER($2)`,
      [company_id, ledger_name]
    );

    if (existingLedger.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Ledger already exists",
      });
    }

    const result = await pool.query(
      `INSERT INTO ledgers
      (
        company_id,
        ledger_name,
        group_id,
        opening_balance,
        balance_type,
        phone,
        email,
        gst_number,
        address
      )
      VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING *`,
      [
        company_id,
        ledger_name,
        group_id,
        opening_balance || 0,
        balance_type || "Dr",
        phone || "",
        email || "",
        gst_number || "",
        address || "",
      ]
    );

    res.status(201).json({
      success: true,
      message: "Ledger created successfully",
      ledger: result.rows[0],
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get All Ledgers
const getLedgers = async (req, res) => {
  try {

    const { company_id } = req.query;

    const result = await pool.query(
      `SELECT
        l.*,
        g.group_name
      FROM ledgers l
      JOIN groups g
      ON l.group_id = g.id
      WHERE l.company_id = $1
      ORDER BY l.ledger_name`,
      [company_id]
    );

    res.json({
      success: true,
      ledgers: result.rows,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get Ledgers for Dropdown
const getLedgerDropdown = async (req, res) => {
  try {

    const { company_id } = req.query;

    const result = await pool.query(
      `SELECT
          l.id,
          l.ledger_name,
          g.group_name,
          g.group_type
       FROM ledgers l
       JOIN groups g
         ON l.group_id = g.id
       WHERE l.company_id = $1
       ORDER BY
         g.group_type,
         g.group_name,
         l.ledger_name`,
      [company_id]
    );

    res.json({
      success: true,
      ledgers: result.rows,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get Ledger By ID
const getLedgerById = async (req, res) => {
  try {

    const result = await pool.query(
      `SELECT *
       FROM ledgers
       WHERE id=$1`,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Ledger not found",
      });
    }

    res.json({
      success: true,
      ledger: result.rows[0],
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// Update Ledger
const updateLedger = async (req, res) => {
  try {

    const {
      ledger_name,
      group_id,
      opening_balance,
      balance_type,
      phone,
      email,
      gst_number,
      address,
    } = req.body;

    const result = await pool.query(
      `UPDATE ledgers
       SET
       ledger_name=$1,
       group_id=$2,
       opening_balance=$3,
       balance_type=$4,
       phone=$5,
       email=$6,
       gst_number=$7,
       address=$8
       WHERE id=$9
       RETURNING *`,
      [
        ledger_name,
        group_id,
        opening_balance,
        balance_type,
        phone,
        email,
        gst_number,
        address,
        req.params.id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Ledger not found",
      });
    }

    res.json({
      success: true,
      message: "Ledger updated successfully",
      ledger: result.rows[0],
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Delete Ledger
const deleteLedger = async (req, res) => {
  try {

    const result = await pool.query(
      `DELETE FROM ledgers
       WHERE id=$1
       RETURNING id`,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Ledger not found",
      });
    }

    res.json({
      success: true,
      message: "Ledger deleted successfully",
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
  createLedger,
  getLedgers,
  getLedgerDropdown,
  getLedgerById,
  updateLedger,
  deleteLedger,
};