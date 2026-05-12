import axios from "axios";
import client from "../api/client";

export const showProductService = () => client.get(`/products`);

export const showEditProductService = (productId: number) =>
  client.get(`/products/${productId}`);

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

export const deleteProductService = (productId: any) =>
  client.delete(`/products/${productId}`);

export const uploadImageService = (formData: any) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return client.post(`/temp-images`, formData, config);
};

export const saveProductImagesService = (formData: FormData) => {
  console.log("save image called");
  return client.post(`/save-product-images`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteProductImageService = (imageId: number) => {
  return client.delete(`/delete-product-image/${imageId}`);
};

export const makeDefaultProductImageService = (
  productId: number,
  image: string,
) => {
  return client.get(`/change-product-default-image`, {
    params: { image, product_id: productId },
  });
};

