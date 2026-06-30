import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import DashboardLayout from "../../layouts/DashboardLayout";

import SupplierToolbar from "../../components/Supplier/SupplierToolbar";
import SupplierTable from "../../components/Supplier/SupplierTable";
import SupplierDialog from "../../components/Supplier/SupplierDialog";

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
  const [suppliers, setSuppliers] = useState([]);
  const [search, setSearch] = useState("");

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
    if (!window.confirm("Delete this supplier?")) return;

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

  return (
    <DashboardLayout>
      <SupplierToolbar
        search={search}
        setSearch={setSearch}
        onAdd={handleAdd}
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
    </DashboardLayout>
  );
}

export default Supplier;