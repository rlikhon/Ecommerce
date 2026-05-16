import axios from "axios";
import client from "../api/client";

export const showCategoryService = () =>  client.get(`/admin/categories`);

export const showEditCategoryService = (categoryId: number) =>  client.get(`/admin/categories/${categoryId}`);

export const createCategoryService = (formData: any) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return client.post(`/admin/categories`, formData, config);
};

    export const editCategoryService = (categoryId: number, formData: any) => {
    const config = {
        headers: {
        "Content-Type": "multipart/form-data",
        },
    };
    return client.put(`/admin/categories/${categoryId}`, formData, config);
    };

export const deleteCategoryService = (categoryId: any) =>  client.delete(`/admin/categories/${categoryId}`);
