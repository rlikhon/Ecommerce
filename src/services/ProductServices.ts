import axios from "axios";
import client from "../api/client";

export const showProductService = () =>  client.get(`/products`);

export const showEditProductService = (productId: number) =>  client.get(`/products/${productId}`);

export const createProductService = (formData: any) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return client.post(`/products`, formData, config);
};

    export const editProductService = (productId: number, formData: any) => {
    const config = {
        headers: {
        "Content-Type": "multipart/form-data",
        },
    };
    return client.put(`/products/${productId}`, formData, config);
    };

export const deleteProductService = (productId: any) =>  client.delete(`/products/${productId}`);
