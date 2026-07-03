import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import DashboardLayout from "../../layouts/DashboardLayout";
import useFormShortcuts from "../hooks/useFormShortcuts";
import { useRef } from "react";
import CustomerToolbar from "../../components/Customer/CustomerToolbar";
import CustomerTable from "../../components/Customer/CustomerTable";
import CustomerDialog from "../../components/Customer/CustomerDialog";
import ConfirmDialog from "../../components/common/CommonDialog";

import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../../services/customerApi";
import { exportToExcel } from "../../utils/exportExcel";
const initialForm = {
  name: "",
  phone: "",
  address: "",
};

function Customer() {
  const searchRef = useRef(null);
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
const [confirmOpen, setConfirmOpen] =
useState(false);

const [deleteId, setDeleteId] =
useState(null);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await getCustomers();

      if (response.customers) {
        setCustomers(response.customers);
      } else {
        setCustomers(response);
      }
    } catch (error) {
      toast.error("Failed to load customers");
    }
  };

  const handleAdd = () => {
    setEditMode(false);
    setSelectedId(null);
    setFormData(initialForm);
    setOpen(true);
  };

  const handleEdit = (customer) => {
    setEditMode(true);
    setSelectedId(customer.id);
    setFormData(customer);
    setOpen(true);
  };

  const handleSave = async () => {
    if (loading) return;
    setLoading(true);

    try {
      if (editMode) {
        await updateCustomer(selectedId, formData);
        toast.success("Customer Updated");
      } else {
        await createCustomer(formData);
        toast.success("Customer Created");
      }

      setOpen(false);
      setFormData(initialForm);
      setSelectedId(null);
      setEditMode(false);

      fetchCustomers();

    } catch (error) {
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
      await deleteCustomer(id);

      toast.success("Customer Deleted");

      fetchCustomers();

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Delete Failed"
      );
    }
  };
const confirmDelete = async () => {

    try{

        await deleteCustomer(deleteId);

        toast.success(
        "Customer Deleted"
        );

        fetchCustomers();

    }catch(error){

        toast.error(
        "Delete Failed"
        );

    }

    setConfirmOpen(false);

};
  useFormShortcuts({
    onSave: handleSave,
    onNew: handleAdd,
    onClose: () => setOpen(false),
    searchRef,
  });

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      customer.phone
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      customer.address
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  const handleExport = () => {
    exportToExcel(filteredCustomers, "Customers");
  };

  return (
    <DashboardLayout>

      <CustomerToolbar
        search={search}
        setSearch={setSearch}
        onAdd={handleAdd}
        onExport={handleExport}
        searchRef={searchRef}
      />

      <CustomerTable
        customers={filteredCustomers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CustomerDialog
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

title="Delete Customer"

message="Are you sure you want to delete this customer?"

onConfirm={confirmDelete}

onCancel={()=>
setConfirmOpen(false)
}

/>

    </DashboardLayout>
  );
}

export default Customer;