import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import DashboardLayout from "../../layouts/DashboardLayout";

import StockToolbar from "../../components/Stock/StockToolbar";
import StockTable from "../../components/Stock/StockTable";
import StockDialog from "../../components/Stock/StockDialog";

import {
  getStocks,
  createStock,
  updateStock,
  deleteStock,
} from "../../services/stockApi";

const initialForm = {
  item_name: "",
  item_code: "",
  category: "",
  unit: "",
  purchase_price: "",
  selling_price: "",
  current_stock: "",
};

function Stock() {
  const [stocks, setStocks] = useState([]);
  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const response = await getStocks();

      if (response.stock) {
        setStocks(response.stock);
      } else if (response.stocks) {
        setStocks(response.stocks);
      } else {
        setStocks(response);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load stock items");
    }
  };

  const handleAdd = () => {
    setEditMode(false);
    setSelectedId(null);
    setFormData(initialForm);
    setOpen(true);
  };

  const handleEdit = (stock) => {
    setEditMode(true);
    setSelectedId(stock.id);
    setFormData({
      item_name: stock.item_name,
      item_code: stock.item_code,
      category: stock.category,
      unit: stock.unit,
      purchase_price: stock.purchase_price,
      selling_price: stock.selling_price,
      current_stock: stock.current_stock,
    });
    setOpen(true);
  };

  const handleSave = async () => {
    setLoading(true);

    try {
      if (editMode) {
        await updateStock(selectedId, formData);
        toast.success("Stock updated successfully");
      } else {
        await createStock(formData);
        toast.success("Stock item created successfully");
      }

      setOpen(false);
      setFormData(initialForm);
      setSelectedId(null);
      setEditMode(false);

      fetchStocks();

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Operation Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this stock item?")) return;

    try {
      await deleteStock(id);

      toast.success("Stock item deleted successfully");

      fetchStocks();

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Delete Failed"
      );
    }
  };

  const filteredStocks = stocks.filter((stock) => {
    return (
      stock.item_name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      stock.item_code
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      stock.category
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  });

  return (
    <DashboardLayout>
      <StockToolbar
        search={search}
        setSearch={setSearch}
        onAdd={handleAdd}
      />

      <StockTable
        stocks={filteredStocks}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <StockDialog
        open={open}
        onClose={() => setOpen(false)}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSave}
        editMode={editMode}
        loading={loading}
      />
    </DashboardLayout>
  );
}

export default Stock;