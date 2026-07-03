import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import DashboardLayout from "../../layouts/DashboardLayout";

import SalesToolbar from "../../components/Sales/SalesToolbar";
import SalesTable from "../../components/Sales/SalesTable";
import SalesDialog from "../../components/Sales/SalesDialog";
import { getSales, createSale, deleteSale } from "../../services/salesApi";
import { getCustomers } from "../../services/customerApi";
import { getStocks } from "../../services/stockApi";
import { useRef } from "react";
import useFormShortcuts from "../hooks/useFormShortcuts";
import { exportToExcel } from "../../utils/exportExcel";

const initialForm = {
  customer_id: "",
  voucher_number: "",
  sale_date: "",
  total_amount: 0,
  items: [
    {
      stock_item_id: "",
      quantity: 1,
      rate: 0,
      amount: 0,
    },
  ],
};

function Sales() {
  const searchRef = useRef(null);
  const [sales, setSales] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [stocks, setStocks] = useState([]);

  const [search, setSearch] = useState("");
const [confirmOpen,setConfirmOpen]=useState(false);
const [deleteId,setDeleteId]=useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] =
    useState(initialForm);

  useEffect(() => {
    fetchSales();
    fetchCustomers();
    fetchStocks();
  }, []);

  const fetchSales = async () => {
    try {
      const data = await getSales();

      if (Array.isArray(data)) {
        setSales(data);
      } else if (data.sales) {
        setSales(data.sales);
      } else {
        setSales([]);
      }

    } catch (error) {
      console.error(error);
      toast.error("Failed to load sales");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this sale?")) return;

    try {
      await deleteSale(id);
      toast.success("Sale deleted");
      fetchSales();
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "Failed to delete sale"
      );
    }
  };

  const fetchCustomers = async () => {
    try {
      const data = await getCustomers();

      if (data.customers) {
        setCustomers(data.customers);
      } else {
        setCustomers(data);
      }

    } catch (error) {
      console.error(error);
    }
  };

  const fetchStocks = async () => {
    try {
      const data = await getStocks();

      if (data.stock) {
        setStocks(data.stock);
      } else if (data.stocks) {
        setStocks(data.stocks);
      } else {
        setStocks(data);
      }

    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = () => {
    setFormData(initialForm);
    setOpen(true);
  };

  const handleSave = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const payload = {
        company_id:
          localStorage.getItem("company_id"),

        customer_id: formData.customer_id,

        voucher_number:
          formData.voucher_number,

        sale_date: formData.sale_date,

        items: formData.items.map((item) => ({
          stock_item_id: item.stock_item_id,
          quantity: Number(item.quantity),
          rate: Number(item.rate),
        })),
      };

      await createSale(payload);

      toast.success("Sale Created");

      setOpen(false);

      setFormData(initialForm);

      fetchSales();

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to create sale"
      );
    } finally {
      setLoading(false);
    }
  };

  useFormShortcuts({
    onSave: handleSave,
    onNew: handleAdd,
    onClose: () => setOpen(false),
    searchRef,
  });

  const filteredSales = sales.filter((sale) => {
    return (
      sale.voucher_number
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||

      sale.customer_name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  });

  const handleExport = () => {
    exportToExcel(filteredSales, "Sales");
  };

  return (
    <DashboardLayout>

      <SalesToolbar
        search={search}
        setSearch={setSearch}
        onAdd={handleAdd}
        onExport={handleExport}
        searchRef={searchRef}
      />

      <SalesTable
        sales={filteredSales}
        onDelete={handleDelete}
      />
      <SalesDialog
        open={open}
        onClose={() => setOpen(false)}
        formData={formData}
        setFormData={setFormData}
        customers={customers}
        stocks={stocks}
        loading={loading}
        onSave={handleSave}
        editMode={Boolean(formData?.id)}
      />

    </DashboardLayout>
  );
}

export default Sales;