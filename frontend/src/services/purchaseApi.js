import api from "./api";

const companyId = () => localStorage.getItem("company_id");

export const getPurchases = async () => {
  const response = await api.get(
    `/purchase?company_id=${companyId()}`
  );
  return response.data;
};

export const createPurchase = async (data) => {
  const payload = {
    ...data,
    company_id: companyId(),
  };

  return (await api.post("/purchase", payload)).data;
};

export const updatePurchase = async (id, data) => {
  return (await api.put(`/purchase/${id}`, data)).data;
};

export const deletePurchase = async (id) => {
  return (await api.delete(`/purchase/${id}`)).data;
};