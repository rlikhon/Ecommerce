import { useState, useEffect, useCallback } from "react";
import { showBrandService } from "../services/BrandServices";

export const useBrands = () => {
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchBrands = useCallback(async () => {
    setLoading(true);
    try {
      const res = await showBrandService();
      setBrands(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  // Return the data and the fetcher (in case you need to manual refresh)
  return { brands, loading, fetchBrands };
};