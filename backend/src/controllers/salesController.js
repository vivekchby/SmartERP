const pool = require("../config/db");
const { createVoucher } = require("../services/accountingService.jsx");

// Create Sales Voucher
const createSale = async (req, res) => {
  const client = await pool.connect();
  try {

    await client.query("BEGIN");
    const {
      company_id,
      customer_id,
      voucher_number,
      sale_date,
      items,
    } = req.body;

    // Validate Required Fields

if (!company_id) {
  return res.status(400).json({
    success: false,
    message: "Company ID is required",
  });
}

if (!customer_id) {
  return res.status(400).json({
    success: false,
    message: "Customer ID is required",
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
    message: "At least one sale item is required",
  });
}
const existingVoucher = await client.query(
  "SELECT id FROM sales WHERE voucher_number=$1",
  [voucher_number]
);

if (existingVoucher.rows.length > 0) {
  return res.status(400).json({
    success: false,
    message: "Voucher number already exists",
  });
}
const customerLedger = await client.query(
  `SELECT ledger_id
   FROM customers
   WHERE id = $1`,
  [customer_id]
);

if (
  customerLedger.rows.length === 0 ||
  !customerLedger.rows[0].ledger_id
) {
  throw new Error("Customer ledger not found");
}

const salesLedger = await client.query(
  `SELECT id
   FROM ledgers
   WHERE company_id = $1
   AND ledger_code = 'SALES'`,
  [company_id]
);

if (salesLedger.rows.length === 0) {
  throw new Error("Sales ledger not found");
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
const stock = await client.query(
  `SELECT current_stock
   FROM stock_items
   WHERE id=$1`,
  [item.stock_item_id]
);

if (stock.rows.length === 0) {
  return res.status(404).json({
    success: false,
    message: "Stock item not found",
  });
}

if (
  Number(stock.rows[0].current_stock) <
  Number(item.quantity)
) {
  return res.status(400).json({
    success: false,
    message: "Insufficient stock",
  });
}
      totalAmount += item.quantity * item.rate;
    }

    const saleResult = await client.query(
      `INSERT INTO sales
      (
        company_id,
        customer_id,
        voucher_number,
        sale_date,
        total_amount
      )
      VALUES($1,$2,$3,$4,$5)
      RETURNING *`,
      [
        company_id,
        customer_id,
        voucher_number,
        sale_date,
        totalAmount,
      ]
    );

    const sale = saleResult.rows[0];

    for (const item of items) {

      const amount =
        item.quantity * item.rate;

      await client.query(
        `INSERT INTO sale_items
        (
          sale_id,
          stock_item_id,
          quantity,
          rate,
          amount
        )
        VALUES($1,$2,$3,$4,$5)`,
        [
          sale.id,
          item.stock_item_id,
          item.quantity,
          item.rate,
          amount,
        ]
      );

      const stock = await client.query(
  `SELECT current_stock
   FROM stock_items
   WHERE id=$1`,
  [item.stock_item_id]
);

if (stock.rows.length === 0) {
  return res.status(404).json({
    success: false,
    message: "Stock item not found"
  });
}


const customer = await client.query(
  "SELECT * FROM customers WHERE id=$1",
  [customer_id]
);

if (customer.rows.length === 0) {
  return res.status(404).json({
    success: false,
    message: "Customer not found",
  });
}

if (
  Number(stock.rows[0].current_stock) <
  Number(item.quantity)
) {
  return res.status(400).json({
    success: false,
    message: `Insufficient stock for item ${item.stock_item_id}`
  });
}

      // Reduce Stock
      await client.query(
        `UPDATE stock_items
         SET current_stock =
         current_stock - $1
         WHERE id=$2`,
        [
          item.quantity,
          item.stock_item_id,
        ]
      );
    }

    await createVoucher(client, {
  company_id,
  voucher_number,
  voucher_type: "Sales",
  voucher_date: sale_date,
  narration: `Sales ${voucher_number}`,
  created_by: req.user.id,

  entries: [
    {
      ledger_id: customerLedger.rows[0].ledger_id,
      debit: totalAmount,
      credit: 0,
    },
    {
      ledger_id: salesLedger.rows[0].id,
      debit: 0,
      credit: totalAmount,
    },
  ],
});

    await client.query("COMMIT");

    client.release();

    res.status(201).json({
  success: true,
  message: "Sale voucher created successfully",
  sale,
});

  } catch (error) {
    console.error(error);

   res.status(500).json({
  message: error.message,
});
  }
};

// Get All Sales
const getSales = async (req, res) => {
  try {

    const result = await pool.query(
      `SELECT
s.*,
c.name AS customer_name
FROM sales s
JOIN customers c
ON s.customer_id = c.id
ORDER BY s.created_at DESC;`
    );

    res.json(result.rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Sale By ID
const getSaleById = async (req, res) => {
  try {

    const sale = await pool.query(
      `SELECT *
       FROM sales
       WHERE id=$1`,
      [req.params.id]
    );

    const items = await pool.query(
      `SELECT
si.*,
st.item_name,
st.item_code
FROM sale_items si
JOIN stock_items st
ON si.stock_item_id=st.id
WHERE si.sale_id=$1;`,
      [req.params.id]
    );

    res.json({
      sale: sale.rows[0],
      items: items.rows,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Sale
const deleteSale = async (req, res) => {
  try {
    const saleId = req.params.id;

    const existingSale = await pool.query(
      "SELECT id FROM sales WHERE id=$1",
      [saleId]
    );

    if (existingSale.rows.length === 0) {
      return res.status(404).json({
        message: "Sale not found",
      });
    }

    await pool.query("BEGIN");
    await pool.query(
      "DELETE FROM sale_items WHERE sale_id=$1",
      [saleId]
    );
    await pool.query(
      "DELETE FROM sales WHERE id=$1",
      [saleId]
    );
    await pool.query("COMMIT");

    res.json({
      success: true,
      message: "Sale deleted successfully",
    });
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createSale,
  getSales,
  getSaleById,
  deleteSale,
};