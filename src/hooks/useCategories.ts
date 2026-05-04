import { useState, useEffect, useCallback } from "react";
import { showCategoryService } from "../services/CategoryServices";

export const useCategories = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const res = await showCategoryService();
      setCategories(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Return the data and the fetcher (in case you need to manual refresh)
  return { categories, loading, fetchCategories };
};