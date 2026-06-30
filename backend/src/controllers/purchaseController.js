const pool = require("../config/db");

// Create Purchase Voucher
const createPurchase = async (req, res) => {
  try {
    await pool.query("BEGIN");
    const {
      company_id,
      supplier_id,
      voucher_number,
      purchase_date,
      items,
    } = req.body;

    // Validate Required Fields

if (!company_id) {
  return res.status(400).json({
    success: false,
    message: "Company ID is required",
  });
}

if (!supplier_id) {
  return res.status(400).json({
    success: false,
    message: "Supplier ID is required",
  });
}

if (!voucher_number) {
  return res.status(400).json({
    success: false,
    message: "Voucher Number is required",
  });
}

if (!items || items.length === 0) {
  return res.status(400).json({
    success: false,
    message: "At least one purchase item is required",
  });
}
// Check Duplicate Voucher Number
const existingVoucher = await pool.query(
  "SELECT id FROM purchases WHERE voucher_number = $1",
  [voucher_number]
);

if (existingVoucher.rows.length > 0) {
  return res.status(400).json({
    success: false,
    message: "Voucher number already exists",
  });
}

    const supplier = await pool.query(
  "SELECT * FROM suppliers WHERE id=$1",
  [supplier_id]
);

if (supplier.rows.length === 0) {
  return res.status(404).json({
    success: false,
    message: "Supplier not found",
  });
}

    let totalAmount = 0;

    for (const item of items) {
        if (!item.stock_item_id) {
  return res.status(400).json({
    success: false,
    message: "Stock Item ID is required",
  });
}

if (!item.quantity || item.quantity <= 0) {
  return res.status(400).json({
    success: false,
    message: "Quantity must be greater than zero",
  });
}

if (!item.rate || item.rate <= 0) {
  return res.status(400).json({
    success: false,
    message: "Rate must be greater than zero",
  });
}

      const stock = await pool.query(
  "SELECT * FROM stock_items WHERE id=$1",
  [item.stock_item_id]
);

if (stock.rows.length === 0) {
  return res.status(404).json({
    success: false,
    message: "Stock Item not found",
  });
}    
  
      totalAmount += item.quantity * item.rate;
    }

    const purchaseResult = await pool.query(
      `INSERT INTO purchases
      (
        company_id,
        supplier_id,
        voucher_number,
        purchase_date,
        total_amount
      )
      VALUES($1,$2,$3,$4,$5)
      RETURNING *`,
      [
        company_id,
        supplier_id,
        voucher_number,
        purchase_date,
        totalAmount,
      ]
    );

    const purchase = purchaseResult.rows[0];

    for (const item of items) {
      const amount =
        item.quantity * item.rate;

      await pool.query(
        `INSERT INTO purchase_items
        (
          purchase_id,
          stock_item_id,
          quantity,
          rate,
          amount
        )
        VALUES($1,$2,$3,$4,$5)`,
        [
          purchase.id,
          item.stock_item_id,
          item.quantity,
          item.rate,
          amount,
        ]
      );

      await pool.query(
        `UPDATE stock_items
         SET current_stock =
         current_stock + $1
         WHERE id=$2`,
        [
          item.quantity,
          item.stock_item_id,
        ]
      );
    }

    await pool.query("COMMIT");

   res.status(201).json({
  success: true,
  message: "Purchase voucher created successfully",
  purchase,
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

// Get All Purchases
const getPurchases = async (req, res) => {
  try {

    const result = await pool.query(
      `SELECT
p.*,
s.name AS supplier_name
FROM purchases p
JOIN suppliers s
ON p.supplier_id = s.id
ORDER BY p.created_at DESC;`
    );

    res.json(result.rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
  success: false,
  message: error.message,
});
  }
};

// Get Purchase By ID
const getPurchaseById = async (req, res) => {
  try {

    const purchase = await pool.query(
      `SELECT *
       FROM purchases
       WHERE id=$1`,
      [req.params.id]
    );

    if (purchase.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Purchase not found",
      });
    }

    const items = await pool.query(
      `SELECT
pi.*,
s.item_name,
s.item_code
FROM purchase_items pi
JOIN stock_items s
ON pi.stock_item_id = s.id
WHERE pi.purchase_id = $1;`,
      [req.params.id]
    );

    res.json({
      purchase: purchase.rows[0],
      items: items.rows,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Purchase
const deletePurchase = async (req, res) => {
  try {
    const purchaseId = req.params.id;

    const existingPurchase = await pool.query(
      "SELECT id FROM purchases WHERE id=$1",
      [purchaseId]
    );

    if (existingPurchase.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Purchase not found",
      });
    }

    await pool.query("BEGIN");
    await pool.query(
      "DELETE FROM purchase_items WHERE purchase_id=$1",
      [purchaseId]
    );
    await pool.query(
      "DELETE FROM purchases WHERE id=$1",
      [purchaseId]
    );
    await pool.query("COMMIT");

    res.json({
      success: true,
      message: "Purchase deleted successfully",
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

module.exports = {
  createPurchase,
  getPurchases,
  getPurchaseById,
  deletePurchase,
};