import axios from "axios";

const searchApi = axios.create({
  baseURL: "/api/product",
  withCredentials: true,
});

export const searchProductsApi = async (keyword) => {
  if (!keyword.trim()) return [];

  const res = await searchApi.get(`/search?keyword=${keyword}`);

  return res.data.products;
};
