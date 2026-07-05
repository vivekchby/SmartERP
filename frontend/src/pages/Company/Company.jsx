import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import DashboardLayout from "../../layouts/DashboardLayout";

import CompanyToolbar from "../../components/Company/CompanyToolbar";
import CompanyTable from "../../components/Company/CompanyTable";
import CompanyDialog from "../../components/Company/CompanyDialog";

import {
  getCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
} from "../../services/companyApi";

const initialForm = {
  company_name: "",
  gst_number: "",
  state: "",
  financial_year: "",
  phone: "",
  email: "",
  address: "",
};

function Company() {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [formData, setFormData] =
    useState(initialForm);
    const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
  try {
    const response = await getCompanies();

    console.log(response);

    if (response.companies) {
      setCompanies(response.companies);
    } else {
      setCompanies(response);
    }

  } catch (error) {
    console.error(error);
    toast.error("Failed to load companies");
  }
};

  const handleAdd = () => {
    setEditMode(false);
    setSelectedId(null);
    setFormData(initialForm);
    setOpen(true);
  };

  const handleEdit = (company) => {
    setEditMode(true);
    setSelectedId(company.id);
    setFormData(company);
    setOpen(true);
  };

  const handleSave = async () => {
    
    setLoading(true);
  try {
    const payload = {
      company_name: formData.company_name,
      gst_number: formData.gst_number,
      state: formData.state,
      financial_year: formData.financial_year,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
    };

    if (editMode) {
      await updateCompany(selectedId, payload);
      toast.success("Company Updated");
    } else {
      await createCompany(payload);
      toast.success("Company Created");
    }

    setOpen(false);
    setFormData(initialForm);
setSelectedId(null);
setEditMode(false);
    fetchCompanies();

  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message ||
      "Operation Failed"
    );
  }
  finally {
  setLoading(false);
}
};

  const handleDelete = async (id) => {

    if (
      !window.confirm(
        "Delete this company?"
      )
    )
      return;

    try {

      await deleteCompany(id);

      toast.success("Company Deleted");

      fetchCompanies();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Delete Failed"
      );

    }
  };

  const filteredCompanies = companies.filter((company) => {
  return (
    company.company_name
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||
    company.phone
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||
    company.gst_number
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||
    company.email
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );
});

  return (
    <DashboardLayout>

      <CompanyToolbar
        search={search}
        setSearch={setSearch}
        onAdd={handleAdd}
      />

      <CompanyTable
        companies={filteredCompanies}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CompanyDialog
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

export default Company;