import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateInvoice = (sale) => {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(22);
  doc.text("SMART ERP", 14, 20);

  doc.setFontSize(14);
  doc.text("SALES INVOICE", 14, 30);

  doc.setFontSize(11);

  doc.text(
    `Invoice No : ${sale.voucher_number}`,
    14,
    45
  );

  doc.text(
    `Date : ${sale.sale_date}`,
    14,
    52
  );

  doc.text(
    `Customer : ${sale.customer_name}`,
    14,
    59
  );

  autoTable(doc, {
    startY: 70,
    head: [[
      "Item",
      "Qty",
      "Rate",
      "Amount"
    ]],
    body: sale.items.map(item => [
      item.item_name,
      item.quantity,
      item.rate,
      item.amount
    ]),
    theme: "grid",
    headStyles: {
      fillColor: [37,99,235]
    }
  });

  const finalY =
    doc.lastAutoTable.finalY + 15;

  doc.setFontSize(14);

  doc.text(
    `Total : ₹${sale.total_amount}`,
    140,
    finalY
  );

  doc.setFontSize(11);

  doc.text(
    "Authorized Signature",
    140,
    finalY + 25
  );

  doc.save(
    `${sale.voucher_number}.pdf`
  );
};