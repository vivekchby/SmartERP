import api from "./api";

const reportEndpoints = ["/reports", "/report"];

const requestWithFallback = async (requestFn) => {
  let lastError;

  for (const endpoint of reportEndpoints) {
    try {
      return await requestFn(endpoint);
    } catch (error) {
      if (error.response?.status !== 404) {
        throw error;
      }

      lastError = error;
    }
  }

  throw lastError;
};

export const getSalesReport = async () => {
  const response = await requestWithFallback((endpoint) =>
    api.get(`${endpoint}/sales`)
  );

  return response.data;
};

export const getPurchaseReport = async () => {
  const response = await requestWithFallback((endpoint) =>
    api.get(`${endpoint}/purchase`)
  );

  return response.data;
};

export const getStockReport = async () => {
  const response = await requestWithFallback((endpoint) =>
    api.get(`${endpoint}/stock`)
  );

  return response.data;
};

export const getTrialBalance = async () => {

  const companyId =
  localStorage.getItem("company_id");

  const response =
  await api.get(
  `/report/trial-balance?company_id=${companyId}`
  );

  return response.data;

};