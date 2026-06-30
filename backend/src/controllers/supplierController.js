const pool = require("../config/db");

// Create Supplier
const createSupplier = async (req, res) => {
  try {
    const {
      company_id,
      name,
      phone,
      address
    } = req.body;

    if (!company_id) {
  return res.status(400).json({
    success: false,
    message: "Company ID is required"
  });
}

if (!name) {
  return res.status(400).json({
    success: false,
    message: "Supplier name is required"
  });
}

if (!phone) {
  return res.status(400).json({
    success: false,
    message: "Phone number is required"
  });
}

if (!address) {
  return res.status(400).json({
    success: false,
    message: "Address is required"
  });
}
const existingSupplier = await pool.query(
  `SELECT id
   FROM suppliers
   WHERE company_id=$1
   AND phone=$2`,
  [company_id, phone]
);

if (existingSupplier.rows.length > 0) {
  return res.status(400).json({
    success: false,
    message: "Supplier with this phone number already exists"
  });
}
    const result = await pool.query(
      `INSERT INTO suppliers
      (company_id,name,phone,address)
      VALUES($1,$2,$3,$4)
      RETURNING *`,
      [
        company_id,
        name,
        phone,
        address
      ]
    );

    res.status(201).json({
      success: true,
      message: "Supplier created successfully",
      supplier: result.rows[0]
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get All Suppliers
const getSuppliers = async (req, res) => {
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
FROM suppliers
WHERE company_id=$1
AND LOWER(name)
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
      suppliers: result.rows
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Supplier By ID
const getSupplierById = async (req, res) => {
  try {

    const result = await pool.query(
      "SELECT * FROM suppliers WHERE id=$1",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Supplier not found"
      });
    }

    res.json({
      success: true,
      supplier: result.rows[0]
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update Supplier
const updateSupplier = async (req, res) => {
  try {

    const {
      name,
      phone,
      address
    } = req.body;

    if (!name) {
  return res.status(400).json({
    success: false,
    message: "Supplier name is required"
  });
}

if (!phone) {
  return res.status(400).json({
    success: false,
    message: "Phone number is required"
  });
}

if (!address) {
  return res.status(400).json({
    success: false,
    message: "Address is required"
  });
}
    const supplier = await pool.query(
  "SELECT * FROM suppliers WHERE id=$1",
  [req.params.id]
);

if (supplier.rows.length === 0) {
  return res.status(404).json({
    success: false,
    message: "Supplier not found"
  });
}
const duplicateSupplier = await pool.query(
  `SELECT id
   FROM suppliers
   WHERE company_id=$1
   AND phone=$2
   AND id<>$3`,
  [
    supplier.rows[0].company_id,
    phone,
    req.params.id
  ]
);

if (duplicateSupplier.rows.length > 0) {
  return res.status(400).json({
    success: false,
    message: "Another supplier already uses this phone number"
  });
}

    const result = await pool.query(
      `UPDATE suppliers
       SET name=$1,
           phone=$2,
           address=$3
       WHERE id=$4
       RETURNING *`,
      [
        name,
        phone,
        address,
        req.params.id
      ]
    );

    res.json({
      success: true,
      message: "Supplier updated successfully",
      supplier: result.rows[0]
    });

  } catch (error) {
   res.status(500).json({
  success: false,
  message: error.message
});
  }
};

// Delete Supplier
const deleteSupplier = async (req, res) => {
  try {
    const supplier = await pool.query(
  "SELECT * FROM suppliers WHERE id=$1",
  [req.params.id]
);

if (supplier.rows.length === 0) {
  return res.status(404).json({
    success: false,
    message: "Supplier not found"
  });
}

    await pool.query(
      "DELETE FROM suppliers WHERE id=$1",
      [req.params.id]
    );

    res.json({
      success: true,
      message: "Supplier deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createSupplier,
  getSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
};