import publicClient from "../api/publicClient";

// Fetch full purchase registries based on the active logged-in token matrix
export const getCustomerOrdersService = (customerToken) => {
  return publicClient.get("/account/order", {
    headers: {
      Authorization: `Bearer ${customerToken}`
    }
  });
};

export const createCustomerOrderService = (orderData, customerToken) => {
  return publicClient.post("/account/order", orderData, {
    headers: {
      Authorization: `Bearer ${customerToken}`
    }
  });
};
