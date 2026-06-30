import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportToPDF = (
  title,
  headers,
  rows,
  fileName
) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text(title, 14, 20);

  autoTable(doc, {
    startY: 30,
    head: [headers],
    body: rows,
    theme: "grid",
    headStyles: {
      fillColor: [37, 99, 235],
    },
  });

  doc.save(`${fileName}.pdf`);
};