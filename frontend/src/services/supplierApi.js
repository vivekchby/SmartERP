import api from "./api";

const companyId = () => localStorage.getItem("company_id");

export const getSuppliers = async () => {
  const response = await api.get(
    `/supplier?company_id=${companyId()}`
  );
  return response.data;
};

export const createSupplier = async (data) => {
  const payload = {
    ...data,
    company_id: companyId(),
  };

  const response = await api.post("/supplier", payload);
  return response.data;
};

export const updateSupplier = async (id, data) => {
  const response = await api.put(`/supplier/${id}`, data);
  return response.data;
};

export const deleteSupplier = async (id) => {
  const response = await api.delete(`/supplier/${id}`);
  return response.data;
};