
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

// ===== ADMIN ORDER SERVICES =====
export const adminOrderAPI = {
  // List all orders with pagination & filtering
  list: (page = 1, perPage = 15, status = null) => {
    let url = `/admin/orders?page=${page}&per_page=${perPage}`;
    if (status) url += `&status=${status}`;
    return client.get(url);
  },

  // Get single order detail
  getById: (orderId) => client.get(`/admin/orders/${orderId}`),

  // Confirm order
  confirm: (orderId, description = null) =>
    client.post(`/admin/orders/${orderId}/confirm`, { description }),

  // Update order status
  updateStatus: (orderId, status) =>
    client.patch(`/admin/orders/${orderId}/status`, { status }),
};

// ===== CUSTOMER ORDER SERVICES =====
export const customerOrderAPI = {
  // List customer's orders
  list: (page = 1, perPage = 15) =>
    publicClient.get(`/account/order?page=${page}&per_page=${perPage}`),

  // Create new order
  create: (orderData) => publicClient.post("/account/order", orderData),

  // Get single order
  getById: (orderId) => publicClient.get(`/account/order/${orderId}`),

  // Update order status
  updateStatus: (orderIds, status) =>
    publicClient.patch("/account/order/status", { 
      order_ids: orderIds, 
      status 
    }),
};

// ===== SERVICE LAYER (with error handling) =====
export class OrderService {
  // ADMIN
  static async getAdminOrders(page = 1, perPage = 15, status = null) {
    try {
      const response = await adminOrderAPI.list(page, perPage, status);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch admin orders:", error);
      throw error;
    }
  }

  static async getAdminOrderDetail(orderId) {
    try {
      const response = await adminOrderAPI.getById(orderId);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch order detail:", error);
      throw error;
    }
  }

  static async confirmOrder(orderId, description = null) {
    try {
      const response = await adminOrderAPI.confirm(orderId, description);
      return response.data;
    } catch (error) {
      console.error("Failed to confirm order:", error);
      throw error;
    }
  }

  static async updateAdminOrderStatus(orderId, status) {
    try {
      const response = await adminOrderAPI.updateStatus(orderId, status);
      return response.data;
    } catch (error) {
      console.error("Failed to update order status:", error);
      throw error;
    }
  }

  // CUSTOMER
  static async getCustomerOrders(page = 1, perPage = 15) {
    try {
      const response = await customerOrderAPI.list(page, perPage);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch customer orders:", error);
      throw error;
    }
  }

  static async createOrder(orderData) {
    try {
      const response = await customerOrderAPI.create(orderData);
      return response.data;
    } catch (error) {
      console.error("Failed to create order:", error);
      throw error;
    }
  }

  static async getCustomerOrderDetail(orderId) {
    try {
      const response = await customerOrderAPI.getById(orderId);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch order:", error);
      throw error;
    }
  }

  static async updateCustomerOrderStatus(orderIds, status) {
    try {
      const response = await customerOrderAPI.updateStatus(orderIds, status);
      return response.data;
    } catch (error) {
      console.error("Failed to update order status:", error);
      throw error;
    }
  }
}