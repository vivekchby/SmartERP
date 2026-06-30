import api from "./api";

const companyId = () => localStorage.getItem("company_id");

export const getDashboardAnalytics = async () => {
  const response = await api.get(
    `/dashboard-analytics?company_id=${companyId()}`
  );

  return response.data;
};