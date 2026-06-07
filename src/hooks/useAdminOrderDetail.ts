// src/hooks/useAdminOrderDetail.ts
import { useState, useEffect } from "react";
import { OrderService } from "../services/OrderServices";

export function useAdminOrderDetail(orderId) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!orderId) return;
    fetchOrderDetail();
  }, [orderId]);

  const fetchOrderDetail = async () => {
    try {
      setLoading(true);
      const data = await OrderService.getAdminOrderDetail(orderId);
      setOrder(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const confirmOrder = async (description = null) => {
    try {
      setLoading(true);
      const data = await OrderService.confirmOrder(orderId, description);
      setOrder(data.order);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (status) => {
    try {
      setLoading(true);
      const data = await OrderService.updateAdminOrderStatus(orderId, status);
      setOrder(data.order);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    order,
    loading,
    error,
    refetch: fetchOrderDetail,
    confirmOrder,
    updateStatus,
  };
}