// src/hooks/useAdminOrderDetail.ts
import { useState, useEffect, useCallback } from "react";
import { OrderService } from "../services/OrderServices";

export function useAdminOrderDetail(orderId) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrderDetail = useCallback(async () => {
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
  }, [orderId]);

  useEffect(() => {
    if (!orderId) return; // guard here — not inside the callback
    fetchOrderDetail();
  }, [orderId, fetchOrderDetail]);

  

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