const pool = require("../config/db");

const getDashboard = async (req, res) => {
  try {
    const companyId = req.query.company_id;

    if (!companyId) {
      return res.status(400).json({
        success: false,
        message: "Company ID is required",
      });
    }

    // ================= SUMMARY =================
    const customers = await pool.query(
      `SELECT COUNT(*) FROM customers WHERE company_id=$1`,
      [companyId]
    );

    const suppliers = await pool.query(
      `SELECT COUNT(*) FROM suppliers WHERE company_id=$1`,
      [companyId]
    );

    const products = await pool.query(
      `SELECT COUNT(*) FROM stock_items WHERE company_id=$1`,
      [companyId]
    );

    const companies = await pool.query(
      `SELECT COUNT(*) FROM companies WHERE id=$1`,
      [companyId]
    );

    const purchase = await pool.query(
      `SELECT COALESCE(SUM(total_amount),0) total
       FROM purchases
       WHERE company_id=$1`,
      [companyId]
    );

    const sales = await pool.query(
      `SELECT COALESCE(SUM(total_amount),0) total
       FROM sales
       WHERE company_id=$1`,
      [companyId]
    );

    const inventory = await pool.query(
      `SELECT COALESCE(SUM(current_stock),0) stock
       FROM stock_items
       WHERE company_id=$1`,
      [companyId]
    );

    const inventoryValue = await pool.query(
      `SELECT COALESCE(SUM(current_stock*selling_price), 0) value
       FROM stock_items
       WHERE company_id=$1`,
      [companyId]
    );

    // ================= MONTHLY SALES =================
    const monthlySales = await pool.query(
      `SELECT TO_CHAR(sale_date, 'Mon') month,
        SUM(total_amount) sales
       FROM sales
       WHERE company_id=$1
       GROUP BY EXTRACT(MONTH FROM sale_date), TO_CHAR(sale_date, 'Mon')
       ORDER BY EXTRACT(MONTH FROM sale_date)`,
      [companyId]
    );

    // ================= MONTHLY PURCHASE =================
    const monthlyPurchase = await pool.query(
      `SELECT TO_CHAR(purchase_date, 'Mon') month,
        SUM(total_amount) purchase
       FROM purchases
       WHERE company_id=$1
       GROUP BY EXTRACT(MONTH FROM purchase_date), TO_CHAR(purchase_date, 'Mon')
       ORDER BY EXTRACT(MONTH FROM purchase_date)`,
      [companyId]
    );

    // ================= RECENT SALES =================
    const recentSales = await pool.query(
      `SELECT id,
        invoice_number,
        customer_name,
        sale_date,
        total_amount
       FROM sales
       WHERE company_id=$1
       ORDER BY sale_date DESC
       LIMIT 5`,
      [companyId]
    );

    // ================= LOW STOCK =================
    const lowStock = await pool.query(
      `SELECT id,
        item_name,
        current_stock
       FROM stock_items
       WHERE company_id=$1
         AND current_stock <= 10
       ORDER BY current_stock ASC
       LIMIT 5`,
      [companyId]
    );

    // ================= TOP SELLING PRODUCTS =================
    const topProducts = await pool.query(
      `SELECT si.item_name,
        SUM(si.quantity) AS total_quantity,
        SUM(si.amount) AS total_sales
       FROM sales_items si
       JOIN sales s ON s.id = si.sale_id
       WHERE s.company_id = $1
       GROUP BY si.item_name
       ORDER BY total_quantity DESC
       LIMIT 5`,
      [companyId]
    );

    return res.json({
      success: true,
      dashboard: {
        customers: Number(customers.rows[0].count),
        suppliers: Number(suppliers.rows[0].count),
        products: Number(products.rows[0].count),
        companies: Number(companies.rows[0].count),
        total_purchase: Number(purchase.rows[0].total),
        total_sales: Number(sales.rows[0].total),
        current_inventory: Number(inventory.rows[0].stock),
        inventoryValue: Number(inventoryValue.rows[0].value),
      },
      monthlySales: monthlySales.rows,
      monthlyPurchase: monthlyPurchase.rows,
      recentSales: recentSales.rows,
      lowStock: lowStock.rows,
      topProducts: topProducts.rows,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboard,
};