import api from "./api";

const companyId = () => localStorage.getItem("company_id");

export const getStocks = async () => {
  const response = await api.get(
    `/stock?company_id=${companyId()}`
  );
  return response.data;
};

export const createStock = async (data) => {
  const payload = {
    ...data,
    company_id: companyId(),
  };

  const response = await api.post("/stock", payload);
  return response.data;
};

export const updateStock = async (id, data) => {
  const response = await api.put(`/stock/${id}`, data);
  return response.data;
};

export const deleteStock = async (id) => {
  const response = await api.delete(`/stock/${id}`);
  return response.data;
};