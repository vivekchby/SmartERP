const { createVoucher } = require("../services/accountingService.jsx");

// Create Voucher
const createVoucherEntry = async (req, res) => {
  try {
    const {
      company_id,
      voucher_number,
      voucher_type,
      voucher_date,
      narration,
      entries,
    } = req.body;

    if (!company_id) {
      return res.status(400).json({
        success: false,
        message: "Company ID is required",
      });
    }

    if (!voucher_number) {
      return res.status(400).json({
        success: false,
        message: "Voucher Number is required",
      });
    }

    if (!voucher_type) {
      return res.status(400).json({
        success: false,
        message: "Voucher Type is required",
      });
    }

    if (!entries || entries.length < 2) {
      return res.status(400).json({
        success: false,
        message:
          "Minimum two voucher entries are required",
      });
    }

    let totalDebit = 0;
    let totalCredit = 0;

    for (const entry of entries) {
      totalDebit += Number(entry.debit || 0);
      totalCredit += Number(entry.credit || 0);
    }

    if (totalDebit !== totalCredit) {
      return res.status(400).json({
        success: false,
        message:
          "Debit and Credit must be equal",
      });
    }

    const voucherId = await createVoucher({
      company_id,
      voucher_number,
      voucher_type,
      voucher_date,
      narration,
      entries,
      created_by: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Voucher Created Successfully",
      voucherId,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// Get All Vouchers
const getVouchers = async (req, res) => {
  try {

    const pool =
      require("../config/db");

    const result = await pool.query(
      `SELECT *
       FROM vouchers
       ORDER BY voucher_date DESC`
    );

    res.json({
      success: true,
      vouchers: result.rows,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
module.exports = {
  createVoucherEntry,
  getVouchers,
};