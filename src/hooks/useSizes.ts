import { useState, useEffect, useCallback } from "react";
import { showSizeService } from "../services/SizeServices";

export const useSizes = () => {
  const [sizes, setSizes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchSizes = useCallback(async () => {
    setLoading(true);
    try {
      const res = await showSizeService();
      setSizes(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch sizes:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSizes();
  }, [fetchSizes]);

  // Return the data and the fetcher (in case you need to manual refresh)
  return { sizes, loading, fetchSizes };
};