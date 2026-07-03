import api from "./api";

const companyId = () =>
  localStorage.getItem("company_id");

export const getLedgers = async () => {
  const response = await api.get(
    `/ledger?company_id=${companyId()}`
  );

  return response.data;
};

export const createLedger = async (data) => {
  const response = await api.post(
    "/ledger",
    {
      ...data,
      company_id: companyId(),
    }
  );

  return response.data;
};

export const updateLedger = async (
  id,
  data
) => {
  const response = await api.put(
    `/ledger/${id}`,
    data
  );

  return response.data;
};

export const getLedgerDropdown = async () => {

  const response = await api.get(
    `/ledger/dropdown?company_id=${companyId()}`
  );

  return response.data;

};

export const deleteLedger = async (
  id
) => {
  const response = await api.delete(
    `/ledger/${id}`
  );

  return response.data;
};