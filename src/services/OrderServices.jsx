import publicClient from "../api/publicClient";

// Fetch full purchase registries based on the active logged-in token matrix
export const getCustomerOrdersService = (customerToken) => {
  return publicClient.get("/account/orders", {
    headers: {
      Authorization: `Bearer ${customerToken}`
    }
  });
};
