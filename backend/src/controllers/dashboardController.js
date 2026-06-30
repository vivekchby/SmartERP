const pool = require("../config/db");

const getDashboard = async (req, res) => {
  try {
    if (!req.user) {
    return res.status(401).json({
        success: false,
        message: "Unauthorized"
    });
}
const companyId = req.query.company_id;

if (!companyId) {
    return res.status(400).json({
        success: false,
        message: "Company ID is required"
    });
}

    const customers = await pool.query(
      " SELECT COUNT(*) FROM customers WHERE company_id=$1",
      [companyId]
    );

    const suppliers = await pool.query(
      "SELECT COUNT(*) FROM suppliers WHERE company_id=$1",
      [companyId]
    );

    const products = await pool.query(
      "SELECT COUNT(*) FROM stock_items WHERE company_id=$1",
      [companyId]
    );

    const companies = await pool.query(
  "SELECT COUNT(*) FROM companies WHERE id=$1",
  [companyId]
);

    const purchaseTotal = await pool.query(
      `SELECT COALESCE(SUM(total_amount),0) AS total
       FROM purchases WHERE company_id=$1`,
      [companyId]
    );

    const salesTotal = await pool.query(
      `SELECT COALESCE(SUM(total_amount),0) AS total
       FROM sales WHERE company_id=$1`,
      [companyId]
    );

    const inventory = await pool.query(
      `SELECT COALESCE(SUM(current_stock),0) AS total_stock
       FROM stock_items WHERE company_id=$1`,
      [companyId]
    );

    res.json({

success:true,

dashboard:{

customers:Number(customers.rows[0].count),

suppliers:Number(suppliers.rows[0].count),

products:Number(products.rows[0].count),

companies:Number(companies.rows[0].count),

total_purchase:Number(purchaseTotal.rows[0].total),

total_sales:Number(salesTotal.rows[0].total),

current_inventory:Number(inventory.rows[0].total_stock)

}

});

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getDashboard,
};