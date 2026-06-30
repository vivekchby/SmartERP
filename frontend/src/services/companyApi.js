import api from "./api";

const companyId = () => localStorage.getItem("company_id");

export const getCompanies = async () => {
  const response = await api.get(
    `/company?company_id=${companyId()}`
  );
  return response.data;
};

export const createCompany = async (data) => {
  const response = await api.post("/company", data);
  return response.data;
};

export const updateCompany = async (id, data) => {
  const response = await api.put(
    `/company/${id}`,
    data
  );
  return response.data;
};

export const deleteCompany = async (id) => {
  const response = await api.delete(
    `/company/${id}`
  );
  return response.data;
};