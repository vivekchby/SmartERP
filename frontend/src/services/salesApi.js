import api from "./api";

const companyId = () => localStorage.getItem("company_id");

export const getSales = async () => {
  const response = await api.get(
    `/sale?company_id=${companyId()}`
  );
  return response.data;
};

export const createSale = async (data) => {
  const payload = {
    ...data,
    company_id: companyId(),
  };

  const response = await api.post("/sale", payload);

  return response.data;
};

export const getSaleById = async (id) => {
  const response = await api.get(`/sale/${id}`);
  return response.data;
};

export const deleteSale = async (id) => {
  const response = await api.delete(`/sale/${id}`);
  return response.data;
};

