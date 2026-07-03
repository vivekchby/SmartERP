import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import DashboardLayout from "../../layouts/DashboardLayout";
import { useRef } from "react";
import useFormShortcuts from "../hooks/useFormShortcuts";
import SupplierToolbar from "../../components/Supplier/SupplierToolbar";
import SupplierTable from "../../components/Supplier/SupplierTable";
import SupplierDialog from "../../components/Supplier/SupplierDialog";
import ConfirmDialog from "../../components/common/CommonDialog";
import { exportToExcel } from "../../utils/exportExcel";

import {
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from "../../services/supplierApi";

const initialForm = {
  name: "",
  phone: "",
  address: "",
};
function Supplier() {
  const searchRef = useRef(null);
  const [suppliers, setSuppliers] = useState([]);
  const [search, setSearch] = useState("");
const [confirmOpen, setConfirmOpen] = useState(false);
const [deleteId, setDeleteId] = useState(null);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSuppliers();
  }, []);
  const fetchSuppliers = async () => {
    try {
      const response = await getSuppliers();

      if (response.suppliers) {
        setSuppliers(response.suppliers);
      } else {
        setSuppliers(response);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load suppliers");
    }
  };

  const handleAdd = () => {
    setEditMode(false);
    setSelectedId(null);
    setFormData(initialForm);
    setOpen(true);
  };

  const handleEdit = (supplier) => {
    setEditMode(true);
    setSelectedId(supplier.id);

    setFormData({
      name: supplier.name,
      phone: supplier.phone,
      address: supplier.address,
    });

    setOpen(true);
  };

  const handleSave = async () => {
    if (loading) return;
    setLoading(true);

    try {
      if (editMode) {
        await updateSupplier(selectedId, formData);
        toast.success("Supplier updated successfully");
      } else {
        await createSupplier(formData);
        toast.success("Supplier created successfully");
      }

      setOpen(false);
      setFormData(initialForm);
      setSelectedId(null);
      setEditMode(false);

      fetchSuppliers();

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
setDeleteId(id);
setConfirmOpen(true);
    try {
      await deleteSupplier(id);

      toast.success("Supplier deleted successfully");

      fetchSuppliers();

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Delete Failed"
      );
    }
  };
  const confirmDelete = async () => {
  try {
    await deleteSupplier(deleteId);

    toast.success("Supplier Deleted");

    fetchSuppliers();

  } catch (error) {

    toast.error("Delete Failed");

  }

  setConfirmOpen(false);
};

  useFormShortcuts({
    onSave: handleSave,
    onNew: handleAdd,
    onClose: () => setOpen(false),
    searchRef,
  });

  const filteredSuppliers = suppliers.filter((supplier) => {
    return (
      supplier.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      supplier.phone
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      supplier.address
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  });

  const handleExport = () => {
    exportToExcel(filteredSuppliers, "Suppliers");
  };

  return (
    <DashboardLayout>
      <SupplierToolbar
        search={search}
        setSearch={setSearch}
        onAdd={handleAdd}
        onExport={handleExport}
        searchRef={searchRef}
      />

      <SupplierTable
        suppliers={filteredSuppliers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <SupplierDialog
        open={open}
        onClose={() => setOpen(false)}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSave}
        editMode={editMode}
        loading={loading}
      />
      <ConfirmDialog
  open={confirmOpen}
  title="Delete Supplier"
  message="Are you sure you want to delete this supplier?"
  onConfirm={confirmDelete}
  onCancel={() => setConfirmOpen(false)}
/>
    </DashboardLayout>
  );
}

export default Supplier;