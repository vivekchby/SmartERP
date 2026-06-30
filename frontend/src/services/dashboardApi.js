import api from "./api";

export const getDashboard = async () => {
  const companyId = localStorage.getItem("company_id");

  console.log("Company ID:", companyId);

  if (!companyId) {
    throw new Error("Company ID not found");
  }

  const response = await api.get(
    `/dashboard?company_id=${companyId}`
  );

  return response.data;
};