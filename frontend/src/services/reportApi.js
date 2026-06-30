import api from "./api";

export const getSalesReport = async () => {
  const response = await api.get("/reports/sales");
  return response.data;
};

export const getPurchaseReport = async () => {
  const response = await api.get("/reports/purchase");
  return response.data;
};

export const getStockReport = async () => {
  const response = await api.get("/reports/stock");
  return response.data;
};
