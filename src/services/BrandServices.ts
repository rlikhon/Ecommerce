import axios from "axios";
import client from "../api/client";

export const showBrandService = () => client.get(`/admin/brands`);

export const showEditBrandService = (brandId: number) =>
  client.get(`/admin/brands/${brandId}`);

export const createBrandService = (formData: any) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return client.post(`/admin/brands`, formData, config);
};

export const editBrandService = (brandId: number, formData: any) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return client.put(`/admin/brands/${brandId}`, formData, config);
};

export const deleteBrandService = (brandId: any) =>
  client.delete(`/admin/brands/${brandId}`);
