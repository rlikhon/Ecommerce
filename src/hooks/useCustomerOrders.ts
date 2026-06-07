// src/hooks/useCustomerOrders.ts
import { useState, useEffect } from "react";
import { OrderService } from "../services/OrderServices";

export function useCustomerOrders(page = 1, perPage = 15) {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, [page, perPage]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await OrderService.getCustomerOrders(page, perPage);
      setOrders(data.data);
      setPagination(data.pagination);
      setError(null);
    } catch (err) {
      setError(err.message);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  return { orders, pagination, loading, error, refetch: fetchOrders };
}