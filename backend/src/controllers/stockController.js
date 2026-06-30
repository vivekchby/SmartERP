const pool = require("../config/db");

// Create Stock Item
const createStock = async (req, res) => {
  try {
    const {
      company_id,
      item_name,
      item_code,
      category,
      unit,
      purchase_price,
      selling_price,
      current_stock,
    } = req.body;

   
const existingItem = await pool.query(
    `SELECT id
     FROM stock_items
     WHERE company_id=$1
     AND item_code=$2`,
    [company_id, item_code]
);

if (existingItem.rows.length > 0) {
    return res.status(400).json({
        success: false,
        message: "Item code already exists"
    });
}
    const result = await pool.query(
      `INSERT INTO stock_items
      (
        company_id,
        item_name,
        item_code,
        category,
        unit,
        purchase_price,
        selling_price,
        current_stock
      )
      VALUES($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *`,
      [
        company_id,
        item_name,
        item_code,
        category,
        unit,
        purchase_price,
        selling_price,
        current_stock,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Stock item created successfully",
      stock: result.rows[0]
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get All Stock Items
const getStocks = async (req, res) => {
  try {

    const search = req.query.search || "";
const companyId = req.query.company_id;

if (!companyId) {
    return res.status(400).json({
        success: false,
        message: "Company ID is required"
    });
}

const page = Number(req.query.page) || 1;
const limit = Number(req.query.limit) || 10;
const offset = (page - 1) * limit;

const result = await pool.query(
`
SELECT *
FROM stock_items
WHERE company_id=$1
AND LOWER(item_name)
LIKE LOWER($2)
ORDER BY created_at DESC
LIMIT $3 OFFSET $4
`,
[
companyId,
`%${search}%`,
limit,
offset
]
);

    res.json({
      success: true,
      stock: result.rows
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Stock By ID
const getStockById = async (req, res) => {
  try {

    const result = await pool.query(
      "SELECT * FROM stock_items WHERE id=$1",
      [req.params.id]
    );
    if(result.rows.length===0){

    return res.status(404).json({

        success:false,

        message:"Stock item not found"

    });

}

    res.json({
      success: true,
      stock: result.rows[0]
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Stock
const updateStock = async (req, res) => {
  try {

    const {
      item_name,
      item_code,
      category,
      unit,
      purchase_price,
      selling_price,
      current_stock,
    } = req.body;
    if (!item_name) {
    return res.status(400).json({
        success: false,
        message: "Item name is required"
    });
}

if (!item_code) {
    return res.status(400).json({
        success: false,
        message: "Item code is required"
    });
}

if (purchase_price < 0) {
    return res.status(400).json({
        success: false,
        message: "Purchase price cannot be negative"
    });
}

if (selling_price < purchase_price) {
    return res.status(400).json({
        success: false,
        message: "Selling price cannot be less than purchase price"
    });
}
const stock = await pool.query(
"SELECT * FROM stock_items WHERE id=$1",
[req.params.id]
);

if(stock.rows.length===0){

return res.status(404).json({

success:false,

message:"Stock item not found"

});

}
const duplicateCode = await pool.query(
`
SELECT id
FROM stock_items
WHERE company_id=$1
AND item_code=$2
AND id<>$3
`,
[
stock.rows[0].company_id,
item_code,
req.params.id
]
);

if(duplicateCode.rows.length>0){

return res.status(400).json({

success:false,

message:"Another item already uses this code"

});

}
    const result = await pool.query(
      `UPDATE stock_items
       SET item_name=$1,
           item_code=$2,
           category=$3,
           unit=$4,
           purchase_price=$5,
           selling_price=$6,
           current_stock=$7
       WHERE id=$8
       RETURNING *`,
      [
        item_name,
        item_code,
        category,
        unit,
        purchase_price,
        selling_price,
        current_stock,
        req.params.id,
      ]
    );

    res.json({
      success: true,
      message: "Stock item updated successfully",
      stock: result.rows[0]
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Stock
const deleteStock = async (req, res) => {
  try {
const stock = await pool.query(
"SELECT * FROM stock_items WHERE id=$1",
[req.params.id]
);

if(stock.rows.length===0){

return res.status(404).json({

success:false,

message:"Stock item not found"

});

}
const usedInPurchase = await pool.query(
  "SELECT id FROM purchase_items WHERE stock_item_id=$1 LIMIT 1",
  [req.params.id]
);

const usedInSale = await pool.query(
  "SELECT id FROM sale_items WHERE stock_item_id=$1 LIMIT 1",
  [req.params.id]
);

if (usedInPurchase.rows.length > 0 || usedInSale.rows.length > 0) {
  return res.status(400).json({
    success: false,
    message: "Cannot delete stock item because it is used in purchase or sales records"
  });
}
    await pool.query(
      "DELETE FROM stock_items WHERE id=$1",
      [req.params.id]
    );

    res.json({
      success: true,
      message: "Stock item deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
    success: false,
    message: error.message
});
  }
};

module.exports = {
  createStock,
  getStocks,
  getStockById,
  updateStock,
  deleteStock,
};