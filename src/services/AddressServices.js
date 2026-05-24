import publicClient from "../api/publicClient";

// Fetch all saved customer shipping boundaries
export const getCustomerAddressesService = (token) => {
  return publicClient.get("/account/addresses", {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// Save a newly formulated address matrix payload
export const storeCustomerAddressService = (data, token) => {
  return publicClient.post("/account/addresses", data, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// Remove an obsolete address trace from record ledgers
export const deleteCustomerAddressService = (id, token) => {
  return publicClient.delete(`/account/addresses/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};
