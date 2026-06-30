const pool = require("../config/db");

const salesReport = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
      s.*,
      c.name AS customer_name
      FROM sales s
      JOIN customers c
      ON s.customer_id = c.id
      ORDER BY s.sale_date DESC
    `);

    res.json({
      success: true,
      reports: result.rows,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const purchaseReport = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
      p.*,
      s.name AS supplier_name
      FROM purchases p
      JOIN suppliers s
      ON p.supplier_id = s.id
      ORDER BY p.purchase_date DESC
    `);

    res.json({
      success: true,
      reports: result.rows,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const stockReport = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT *
      FROM stock_items
      ORDER BY item_name
    `);

    res.json({
      success: true,
      reports: result.rows,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  salesReport,
  purchaseReport,
  stockReport,
};