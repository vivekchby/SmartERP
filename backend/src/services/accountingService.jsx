const pool = require("../config/db");

const createVoucher = async (
  client,
  {
    company_id,
    voucher_number,
    voucher_type,
    voucher_date,
    narration,
    entries,
    created_by,
  }
) => {

  

  try {

    let totalAmount = 0;

    for (const entry of entries) {
      totalAmount += Number(entry.debit);
    }

    const voucherResult = await client.query(
      `INSERT INTO vouchers
      (
        company_id,
        voucher_number,
        voucher_type,
        voucher_date,
        narration,
        total_amount,
        created_by
      )
      VALUES($1,$2,$3,$4,$5,$6,$7)
      RETURNING id`,
      [
        company_id,
        voucher_number,
        voucher_type,
        voucher_date,
        narration,
        totalAmount,
        created_by,
      ]
    );

    const voucherId =
      voucherResult.rows[0].id;

    for (const entry of entries) {

      await client.query(
        `INSERT INTO voucher_entries
        (
          voucher_id,
          ledger_id,
          debit,
          credit,
          remarks
        )
        VALUES($1,$2,$3,$4,$5)`,
        [
          voucherId,
          entry.ledger_id,
          entry.debit,
          entry.credit,
          entry.remarks || "",
        ]
      );
    }

    

    return voucherId;

  } catch (error) {

    

    throw error;

  }
};

module.exports = {
  createVoucher,
};