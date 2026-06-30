import { useEffect, useState } from "react";

import {
  Tabs,
  Tab,
  Box,
} from "@mui/material";

import DashboardLayout from "../../layouts/DashboardLayout";
import { exportToExcel } from "../../utils/exportExcel";
import ReportToolbar from "../../components/Reports/ReportToolbar";
import SalesReportTable from "../../components/Reports/SalesReportTable";
import PurchaseReportTable from "../../components/Reports/PurchaseReportTable";
import StockReportTable from "../../components/Reports/StockReportTable";

import { exportToPDF } from "../../utils/exportPDF";
import {
  getSalesReport,
  getPurchaseReport,
  getStockReport,
} from "../../services/reportApi";

function Reports() {

  const [tab, setTab] = useState(0);

  const [search, setSearch] = useState("");

  const [sales, setSales] = useState([]);
  const [purchase, setPurchase] = useState([]);
  const [stock, setStock] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {

      const salesData =
        await getSalesReport();

      const purchaseData =
        await getPurchaseReport();

      const stockData =
        await getStockReport();

      setSales(salesData.reports || []);
      setPurchase(purchaseData.reports || []);
      setStock(stockData.reports || []);

    } catch (error) {
      console.error(error);
    }
  };

  const handlePDF = () => {

  if (tab === 0) {

    exportToPDF(
      "Sales Report",
      [
        "Voucher",
        "Date",
        "Customer",
        "Total",
      ],
      filteredSales.map((sale) => [
        sale.voucher_number,
        sale.sale_date?.substring(0,10),
        sale.customer_name,
        sale.total_amount,
      ]),
      "Sales_Report"
    );

  }

  if (tab === 1) {

    exportToPDF(
      "Purchase Report",
      [
        "Voucher",
        "Date",
        "Supplier",
        "Total",
      ],
      filteredPurchase.map((purchase) => [
        purchase.voucher_number,
        purchase.purchase_date?.substring(0,10),
        purchase.supplier_name,
        purchase.total_amount,
      ]),
      "Purchase_Report"
    );

  }

  if (tab === 2) {

    exportToPDF(
      "Stock Report",
      [
        "Item",
        "Code",
        "Stock",
      ],
      filteredStock.map((item) => [
        item.item_name,
        item.item_code,
        item.current_stock,
      ]),
      "Stock_Report"
    );

  }

};

  const filteredSales = sales.filter(
    (sale) =>
      sale.customer_name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||

      sale.voucher_number
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  const filteredPurchase =
    purchase.filter(
      (purchase) =>
        purchase.supplier_name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||

        purchase.voucher_number
          ?.toLowerCase()
          .includes(search.toLowerCase())
    );

  const filteredStock =
    stock.filter(
      (item) =>
        item.item_name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||

        item.category
          ?.toLowerCase()
          .includes(search.toLowerCase())
    );
const handleExport = () => {
  if (tab === 0) {
    exportToExcel(filteredSales, "Sales_Report");
  }

  if (tab === 1) {
    exportToExcel(filteredPurchase, "Purchase_Report");
  }

  if (tab === 2) {
    exportToExcel(filteredStock, "Stock_Report");
  }
};
  return (
    <DashboardLayout>

      <ReportToolbar
  search={search}
  setSearch={setSearch}
  onExport={handleExport}
  onPDF={handlePDF}
/>

      <Tabs
        value={tab}
        onChange={(e, newValue) =>
          setTab(newValue)
        }
        sx={{ mb: 3 }}
      >
        <Tab label="Sales" />
        <Tab label="Purchase" />
        <Tab label="Stock" />
      </Tabs>

      <Box>

        {tab === 0 && (
          <SalesReportTable
            reports={filteredSales}
          />
        )}

        {tab === 1 && (
          <PurchaseReportTable
            reports={filteredPurchase}
          />
        )}

        {tab === 2 && (
          <StockReportTable
            reports={filteredStock}
          />
        )}

      </Box>

    </DashboardLayout>
  );
}

export default Reports;