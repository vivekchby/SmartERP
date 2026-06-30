const pool = require("../config/db");
const PDFDocument = require("pdfkit");

const getInvoice = async (req, res) => {
  try {

    const saleId = req.params.saleId;

    const saleResult = await pool.query(
      `SELECT
        s.*,
        c.name AS customer_name,
        c.phone AS customer_phone,
        c.address AS customer_address
       FROM sales s
       JOIN customers c
       ON s.customer_id = c.id
       WHERE s.id=$1`,
      [saleId]
    );

    if (saleResult.rows.length === 0) {
      return res.status(404).json({
        message: "Invoice not found",
      });
    }

    const itemResult = await pool.query(
      `SELECT
        si.quantity,
        si.rate,
        si.amount,
        st.item_name
       FROM sale_items si
       JOIN stock_items st
       ON si.stock_item_id = st.id
       WHERE si.sale_id=$1`,
      [saleId]
    );

    const invoice = {
      invoice_number:
        saleResult.rows[0].voucher_number,

      invoice_date:
        saleResult.rows[0].sale_date,

      customer: {
        name:
          saleResult.rows[0].customer_name,

        phone:
          saleResult.rows[0].customer_phone,

        address:
          saleResult.rows[0].customer_address,
      },

      items: itemResult.rows,

      total_amount:
        saleResult.rows[0].total_amount,
    };

    res.json(invoice);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const downloadInvoicePdf = async (req, res) => {
  try {

    const saleId = req.params.saleId;

    const saleResult = await pool.query(
      `SELECT
        s.*,
        c.name AS customer_name,
        c.phone AS customer_phone,
        c.address AS customer_address
       FROM sales s
       JOIN customers c
       ON s.customer_id = c.id
       WHERE s.id=$1`,
      [saleId]
    );

    const itemResult = await pool.query(
      `SELECT
        si.quantity,
        si.rate,
        si.amount,
        st.item_name
       FROM sale_items si
       JOIN stock_items st
       ON si.stock_item_id = st.id
       WHERE si.sale_id=$1`,
      [saleId]
    );

    const sale = saleResult.rows[0];

    const doc = new PDFDocument();

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=invoice-${sale.voucher_number}.pdf`
    );

    doc.pipe(res);

    doc.fontSize(22)
       .text("ABC Traders", {
         align: "center",
       });

    doc.moveDown();

    doc.fontSize(14)
       .text(`Invoice No: ${sale.voucher_number}`);

    doc.text(
      `Date: ${sale.sale_date}`
    );

    doc.moveDown();

    doc.text(
      `Customer: ${sale.customer_name}`
    );

    doc.text(
      `Phone: ${sale.customer_phone}`
    );

    doc.text(
      `Address: ${sale.customer_address}`
    );

    doc.moveDown();

    doc.text("Items");

    itemResult.rows.forEach(item => {
      doc.text(
        `${item.item_name} | Qty: ${item.quantity} | Rate: ${item.rate} | Amount: ${item.amount}`
      );
    });

    doc.moveDown();

    doc.fontSize(16)
       .text(
         `Total: ₹${sale.total_amount}`
       );

    doc.moveDown();

    doc.text(
      "Thank You For Your Business"
    );

    doc.end();

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getInvoice,
  downloadInvoicePdf,
};