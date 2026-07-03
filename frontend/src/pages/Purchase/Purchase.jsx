import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import DashboardLayout from "../../layouts/DashboardLayout";

import PurchaseToolbar from "../../components/Purchase/PurchaseToolbar";
import PurchaseTable from "../../components/Purchase/PurchaseTable";
import PurchaseDialog from "../../components/Purchase/PurchaseDialog";
import ConfirmDialog from "../../components/common/CommonDialog";

import {
  getPurchases,
  createPurchase,
  updatePurchase,
  deletePurchase,
} from "../../services/purchaseApi";
import { getSuppliers } from "../../services/supplierApi";
import { getStocks } from "../../services/stockApi";
import { useRef } from "react";
import useFormShortcuts from "../hooks/useFormShortcuts";
import { exportToExcel } from "../../utils/exportExcel";

const initialForm = {
  supplier_id: "",
  voucher_number: "",
  purchase_date: "",
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

function Purchase() {
  const searchRef = useRef(null);
  const [purchases, setPurchases] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [stocks, setStocks] = useState([]);

  const [search, setSearch] = useState("");
const [confirmOpen,setConfirmOpen]=useState(false);
const [deleteId,setDeleteId]=useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    fetchPurchases();
    fetchSuppliers();
    fetchStocks();
  }, []);

  const fetchPurchases = async () => {
    try {
      const data = await getPurchases();

      if (Array.isArray(data)) {
        setPurchases(data);
      } else if (data.purchases) {
        setPurchases(data.purchases);
      } else {
        setPurchases([]);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load purchases");
    }
  };

  const fetchSuppliers = async () => {
    try {
      const data = await getSuppliers();

      if (data.suppliers) {
        setSuppliers(data.suppliers);
      } else {
        setSuppliers(data);
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
        company_id: localStorage.getItem("company_id"),
        supplier_id: formData.supplier_id,
        voucher_number: formData.voucher_number,
        purchase_date: formData.purchase_date,
        items: formData.items.map((item) => ({
          stock_item_id: item.stock_item_id,
          quantity: Number(item.quantity),
          rate: Number(item.rate),
        })),
      };

      await createPurchase(payload);

      toast.success("Purchase Created");

      setOpen(false);
      setFormData(initialForm);

      fetchPurchases();

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to create purchase"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (purchase) => {
    setFormData({
      supplier_id: purchase.supplier_id,
      voucher_number: purchase.invoice_number || purchase.voucher_number,
      purchase_date: purchase.purchase_date,
      items: purchase.items || [],
      total_amount: purchase.total_amount || 0,
    });
    setOpen(true);
  };

  const handleDelete = async (id) => {
    setDeleteId(id);
setConfirmOpen(true);
    try {
      await deletePurchase(id);

      toast.success("Purchase Deleted");
      fetchPurchases();
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
        "Failed to delete purchase"
      );
    }
  };
const confirmDelete=async()=>{

try{

await deletePurchase(deleteId);

toast.success("Purchase Deleted");

fetchPurchases();

}catch{

toast.error("Delete Failed");

}

setConfirmOpen(false);

}
  useFormShortcuts({
    onSave: handleSave,
    onNew: handleAdd,
    onClose: () => setOpen(false),
    searchRef,
  });

  const filteredPurchases = purchases.filter((purchase) => {
    return (
      purchase.voucher_number
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      purchase.supplier_name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  });

  const handleExport = () => {
    exportToExcel(filteredPurchases, "Purchases");
  };

  return (
    <DashboardLayout>

      <PurchaseToolbar
        search={search}
        setSearch={setSearch}
        onAdd={handleAdd}
        onExport={handleExport}
        searchRef={searchRef}
      />

      <PurchaseTable
        purchases={filteredPurchases}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <PurchaseDialog
        open={open}
        onClose={() => setOpen(false)}
        formData={formData}
        setFormData={setFormData}
        suppliers={suppliers}
        stocks={stocks}
        loading={loading}
        onSave={handleSave}
        editMode={Boolean(formData?.id)}
      />
<ConfirmDialog
open={confirmOpen}
title="Delete Purchase"
message="Delete this purchase?"
onConfirm={confirmDelete}
onCancel={()=>setConfirmOpen(false)}
/>
    </DashboardLayout>
  );
}

export default Purchase;