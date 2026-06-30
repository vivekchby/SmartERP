import api from "./api";

const companyId = () => localStorage.getItem("company_id");

export const getCustomers = async () => {
  const response = await api.get(
    `/customer?company_id=${companyId()}`
  );
  return response.data;
};

export const createCustomer = async (data) => {
  const payload = {
    ...data,
    company_id: companyId(),
  };

  const response = await api.post(
    "/customer",
    payload
  );

  return response.data;
};

export const updateCustomer = async (id, data) => {
  const response = await api.put(
    `/customer/${id}`,
    data
  );

  return response.data;
};

export const deleteCustomer = async (id) => {
  const response = await api.delete(
    `/customer/${id}`
  );

  return response.data;
};