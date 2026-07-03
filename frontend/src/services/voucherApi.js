import api from "./api";

const companyId = () =>
  localStorage.getItem("company_id");

// Get All Vouchers
export const getVouchers = async () => {
  const response = await api.get(
    `/voucher?company_id=${companyId()}`
  );

  return response.data;
};

// Create Voucher
export const createVoucher = async (data) => {
  const response = await api.post(
    "/voucher",
    {
      ...data,
      company_id: companyId(),
    }
  );

  return response.data;
};