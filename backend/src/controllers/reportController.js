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

const trialBalance = async (req, res) => {
  try {
    const { company_id } = req.query;

    if (!company_id) {
      return res.status(400).json({
        success: false,
        message: "Company ID is required",
      });
    }

    const result = await pool.query(
      `
      SELECT
        l.id,
        l.ledger_name,
        g.group_name,

        COALESCE(SUM(ve.debit),0) AS debit,
        COALESCE(SUM(ve.credit),0) AS credit

      FROM ledgers l

      JOIN groups g
      ON l.group_id = g.id

      LEFT JOIN voucher_entries ve
      ON l.id = ve.ledger_id

      LEFT JOIN vouchers v
      ON v.id = ve.voucher_id
      AND v.company_id = $1

      WHERE l.company_id = $1

      GROUP BY
      l.id,
      l.ledger_name,
      g.group_name

      ORDER BY
      g.group_name,
      l.ledger_name
      `,
      [company_id]
    );

    let totalDebit = 0;
    let totalCredit = 0;

    result.rows.forEach((row) => {
      totalDebit += Number(row.debit);
      totalCredit += Number(row.credit);
    });

    res.json({
      success: true,
      rows: result.rows,
      totalDebit,
      totalCredit,
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
  salesReport,
  purchaseReport,
  stockReport,
  trialBalance
};