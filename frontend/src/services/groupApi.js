import api from "./api";

const companyId = () =>
  localStorage.getItem("company_id");

const groupEndpoints = ["/group", "/groups"];

const requestWithFallback = async (requestFn) => {
  let lastError;

  for (const endpoint of groupEndpoints) {
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

// Get All Groups
export const getGroups = async () => {
  const response = await requestWithFallback((endpoint) =>
    api.get(`${endpoint}?company_id=${companyId()}`)
  );

  return response.data;
};

// Create Group
export const createGroup = async (data) => {
  const response = await requestWithFallback((endpoint) =>
    api.post(endpoint, {
      ...data,
      company_id: companyId(),
    })
  );

  return response.data;
};

// Update Group
export const updateGroup = async (id, data) => {
  const response = await requestWithFallback((endpoint) =>
    api.put(`${endpoint}/${id}`, data)
  );

  return response.data;
};

// Delete Group
export const deleteGroup = async (id) => {
  const response = await requestWithFallback((endpoint) =>
    api.delete(`${endpoint}/${id}`)
  );

  return response.data;
};