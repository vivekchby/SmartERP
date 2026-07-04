import api from "./api";

const companyId = () => localStorage.getItem("company_id");

export const getDashboard = async () => {
  const response = await api.get(
    `/dashboard?company_id=${companyId()}`
  );

  return response.data;
};
