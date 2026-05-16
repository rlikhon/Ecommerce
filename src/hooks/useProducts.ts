import { useState, useEffect, useCallback } from "react";
import { filterProductsService } from "../services/HomeServices";

export const useProducts = (categoryId: string | null, brandId: string | null) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  

  console.log('categories', categoryId)
  console.log('brands', brandId)

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await filterProductsService(categoryId, brandId);
      setProducts(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  }, [categoryId, brandId]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, fetchProducts };
};