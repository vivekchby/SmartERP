import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import DashboardLayout from "../../layouts/DashboardLayout";

import CustomerToolbar from "../../components/Customer/CustomerToolbar";
import CustomerTable from "../../components/Customer/CustomerTable";
import CustomerDialog from "../../components/Customer/CustomerDialog";

import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../../services/customerApi";

const initialForm = {
  name: "",
  phone: "",
  address: "",
};

function Customer() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");

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
    if (!window.confirm("Delete this customer?")) return;

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

  return (
    <DashboardLayout>

      <CustomerToolbar
        search={search}
        setSearch={setSearch}
        onAdd={handleAdd}
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

    </DashboardLayout>
  );
}

export default Customer;