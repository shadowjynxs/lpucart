import axiosInstance from "./axiosInstance";

export const getProducts = () => {
  return axiosInstance.get("/products");
};

export const getProductById = (productId) => {
  return axiosInstance.get(`/products/${productId}`);
};
