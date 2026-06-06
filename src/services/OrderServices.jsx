
import publicClient from "@api/publicClient";
import client from "@api/client";

// Fetch full purchase registries based on the active logged-in token matrix
export const getCustomerOrdersService = () => {
  return publicClient.get("/account/order");
};

export const createCustomerOrderService = (orderData, customerToken) => {
  return publicClient.post("/account/order", orderData, {
    headers: {
      Authorization: `Bearer ${customerToken}`
    }
  });
};

export const getOrderByIdService = (orderId, customerToken) => {
  return publicClient.get(`/account/order/${orderId}`, {
    headers: {
      Authorization: `Bearer ${customerToken}`
    }
  });
};
