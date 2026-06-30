const pool = require("../config/db");

const getDashboardAnalytics = async (req, res) => {
  try {
    const { company_id } = req.query;

    if (!company_id) {
      return res.status(400).json({
        success: false,
        message: "Company ID is required",
      });
    }

    // Monthly Sales
    const monthlySales = await pool.query(`
      SELECT
        TO_CHAR(sale_date,'Mon') AS month,
        COALESCE(SUM(total_amount),0) AS total
      FROM sales
      WHERE company_id = $1
      GROUP BY EXTRACT(MONTH FROM sale_date), TO_CHAR(sale_date,'Mon')
      ORDER BY EXTRACT(MONTH FROM sale_date)
    `,[company_id]);

    // Monthly Purchase
    const monthlyPurchase = await pool.query(`
      SELECT
        TO_CHAR(purchase_date,'Mon') AS month,
        COALESCE(SUM(total_amount),0) AS total
      FROM purchases
      WHERE company_id = $1
      GROUP BY EXTRACT(MONTH FROM purchase_date), TO_CHAR(purchase_date,'Mon')
      ORDER BY EXTRACT(MONTH FROM purchase_date)
    `,[company_id]);

    // Low Stock
    const lowStock = await pool.query(`
      SELECT
      item_name,
      current_stock
      FROM stock_items
      WHERE company_id=$1
      AND current_stock<=10
      ORDER BY current_stock
    `,[company_id]);

    // Recent Sales
    const recentSales = await pool.query(`
      SELECT
      voucher_number,
      total_amount,
      sale_date
      FROM sales
      WHERE company_id=$1
      ORDER BY sale_date DESC
      LIMIT 5
    `,[company_id]);

    // Recent Purchases
    const recentPurchase = await pool.query(`
      SELECT
      voucher_number,
      total_amount,
      purchase_date
      FROM purchases
      WHERE company_id=$1
      ORDER BY purchase_date DESC
      LIMIT 5
    `,[company_id]);

    // Inventory Value
    const inventory = await pool.query(`
      SELECT
      COALESCE(
      SUM(current_stock*purchase_price),0)
      AS inventory_value
      FROM stock_items
      WHERE company_id=$1
    `,[company_id]);

    res.json({
      success:true,
      monthlySales:monthlySales.rows,
      monthlyPurchase:monthlyPurchase.rows,
      lowStock:lowStock.rows,
      recentSales:recentSales.rows,
      recentPurchase:recentPurchase.rows,
      inventory:inventory.rows[0]
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success:false,
      message:error.message
    });
  }
};

module.exports={
  getDashboardAnalytics
};