import axiosInstance from "./axiosInstance";

export const addToCart = async (productId) => {
  try {
    const response = await axiosInstance.post("/cart", { productId });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error adding to cart";
  }
};

export const getCart = async () => {
  try {
    const response = await axiosInstance.get("/cart");
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error fetching cart";
  }
};

export const removeFromCart = async (productId) => {
  try {
    const response = await axiosInstance.put("/cart", { productId, action: "remove" });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error removing from cart";
  }
};

export const updateCartQuantity = async (productId, quantity) => {
  try {
    const response = await axiosInstance.put("/cart", { productId, quantity });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error updating cart quantity";
  }
};

export const checkoutCart = async () => {
  try {
    const response = await axiosInstance.put("/cart/checkout");
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error during checkout";
  }
};
