const pool = require("../config/db");

// Create Company
const createCompany = async (req, res) => {
  try {
    const {
      company_name,
      gst_number,
      state,
      financial_year,
      address,
    } = req.body;

    if (!company_name) {
    return res.status(400).json({
        success: false,
        message: "Company name is required"
    });
}

if (!gst_number) {
    return res.status(400).json({
        success: false,
        message: "GST number is required"
    });
}

if (!state) {
    return res.status(400).json({
        success: false,
        message: "State is required"
    });
}

if (!financial_year) {
    return res.status(400).json({
        success: false,
        message: "Financial year is required"
    });
}

if (!address) {
    return res.status(400).json({
        success: false,
        message: "Address is required"
    });
}


const existingCompany = await pool.query(
`
SELECT id
FROM companies
WHERE gst_number=$1
`,
[gst_number]
);

if(existingCompany.rows.length>0){

return res.status(400).json({

success:false,

message:"GST Number already exists"

});

}
    const result = await pool.query(
      `INSERT INTO companies
      (user_id, company_name, gst_number, state, financial_year, address)
      VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING *`,
      [
        req.user.id,
        company_name,
        gst_number,
        state,
        financial_year,
        address,
      ]
    );

    res.status(201).json({

success:true,

message:"Company created successfully",

company:result.rows[0]

});

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Companies
const getCompanies = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM companies WHERE user_id=$1 ORDER BY created_at DESC",
      [req.user.id]
    );

    res.json({

success:true,

companies:result.rows

});

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Company
const getCompanyById = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM companies WHERE id=$1 AND user_id=$2",
      [req.params.id, req.user.id]
    );
if(result.rows.length===0){

return res.status(404).json({

success:false,

message:"Company not found"

});

}
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    res.json({
      success: true,
      company: result.rows[0]
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Company
const updateCompany = async (req, res) => {
  try {
    const {
      company_name,
      gst_number,
      state,
      financial_year,
      address,
    } = req.body;
const company = await pool.query(
"SELECT * FROM companies WHERE id=$1",
[req.params.id]
);

if(company.rows.length===0){

return res.status(404).json({

success:false,

message:"Company not found"

});

}
const duplicateGST = await pool.query(
`
SELECT id
FROM companies
WHERE gst_number=$1
AND id<>$2
`,
[
gst_number,
req.params.id
]
);

if(duplicateGST.rows.length>0){

return res.status(400).json({

success:false,

message:"GST Number already exists"

});

}
    const result = await pool.query(
      `UPDATE companies
       SET company_name=$1,
           gst_number=$2,
           state=$3,
           financial_year=$4,
           address=$5
       WHERE id=$6 AND user_id=$7
       RETURNING *`,
      [
        company_name,
        gst_number,
        state,
        financial_year,
        address,
        req.params.id,
        req.user.id,
      ]
    );

    res.json({
      success: true,
      message: "Company updated successfully",
      company: result.rows[0]
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Company
const deleteCompany = async (req, res) => {
  try {
    const company = await pool.query(
"SELECT * FROM companies WHERE id=$1",
[req.params.id]
);

if(company.rows.length===0){

return res.status(404).json({

success:false,

message:"Company not found"

});

}
const customer = await pool.query(
"SELECT id FROM customers WHERE company_id=$1 LIMIT 1",
[req.params.id]
);

const supplier = await pool.query(
"SELECT id FROM suppliers WHERE company_id=$1 LIMIT 1",
[req.params.id]
);

const stock = await pool.query(
"SELECT id FROM stock_items WHERE company_id=$1 LIMIT 1",
[req.params.id]
);

if(
customer.rows.length>0 ||
supplier.rows.length>0 ||
stock.rows.length>0
){

return res.status(400).json({

success:false,

message:"Cannot delete company because related records exist"

});

}
    await pool.query(
      "DELETE FROM companies WHERE id=$1 AND user_id=$2",
      [req.params.id, req.user.id]
    );

    res.json({
      success: true,
      message: "Company deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
};