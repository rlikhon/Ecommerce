import axios from "axios";
import client from "../api/client";

export const latestProductsService = () => client.get(`/get-latest-products`);

export const featuredProductsService = () => client.get(`/get-featured-products`);

export const bestSellingProductsService = () => client.get(`/get-best-selling-products`);

export const popularProductsService = () => client.get(`/get-popular-products`);

export const filterProductsService = (categoryId: string | null, brandId: string | null) => {
  let url = `/get-products`;
  const params = new URLSearchParams();

  if (categoryId) {
    params.append("category", categoryId);
  }

  if (brandId) {
    params.append("brand", brandId);
  }

  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  return client.get(url);
};
