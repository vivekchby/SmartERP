const pool = require("../config/db");

// Create Customer
const createCustomer = async (req, res) => {
  try {
    const {
      company_id,
      name,
      phone,
      address
    } = req.body;
    // Validation

if (!company_id) {
    return res.status(400).json({
        success: false,
        message: "Company ID is required"
    });
}

if (!name) {
    return res.status(400).json({
        success: false,
        message: "Customer name is required"
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

 const existingCustomer = await pool.query(
    `SELECT id
     FROM customers
     WHERE company_id=$1
     AND phone=$2`,
    [company_id, phone]
);

if (existingCustomer.rows.length > 0) {
    return res.status(400).json({
        success: false,
        message: "Customer with this phone number already exists"
    });
}

    const result = await pool.query(
      `INSERT INTO customers
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
    message: "Customer created successfully",
    customer: result.rows[0]
});

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get All Customers
const getCustomers = async (req, res) => {
  try {

    const search = req.query.search || "";
const companyId = req.query.company_id;

if(!companyId){

    return res.status(400).json({

        success:false,

        message:"Company ID is required"

    });

}

const page =
Number(req.query.page) || 1;

const limit =
Number(req.query.limit) || 10;

const offset =
(page - 1) * limit;

const result = await pool.query(
`
SELECT *
FROM customers
WHERE company_id=$1
AND LOWER(name)
LIKE LOWER($2)
ORDER BY created_at DESC LIMIT $3 OFFSET $4
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
      customers: result.rows
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Customer By ID
const getCustomerById = async (req, res) => {
  try {

    const result = await pool.query(
      "SELECT * FROM customers WHERE id=$1",
      [req.params.id]
    );

    if(result.rows.length===0){

    return res.status(404).json({

        success:false,

        message:"Customer not found"

    });

}

    res.json({
      success: true,
      customer: result.rows[0]
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update Customer
const updateCustomer = async (req, res) => {
  try {

    const {
      name,
      phone,
      address
    } = req.body;

    const customer = await pool.query(
    "SELECT * FROM customers WHERE id=$1",
    [req.params.id]
);

if (customer.rows.length === 0) {
    return res.status(404).json({
        success: false,
        message: "Customer not found"
    });
}

    const result = await pool.query(
      `UPDATE customers
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
      message: "Customer updated successfully",
      customer: result.rows[0]
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Delete Customer
const deleteCustomer = async (req, res) => {
  try {
    const customer = await pool.query(
    "SELECT * FROM customers WHERE id=$1",
    [req.params.id]
);

if (customer.rows.length === 0) {
    return res.status(404).json({
        success: false,
        message: "Customer not found"
    });
}

    await pool.query(
      "DELETE FROM customers WHERE id=$1",
      [req.params.id]
    );

    res.json({
      success: true,
      message: "Customer deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};