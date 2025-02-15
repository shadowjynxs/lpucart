import axiosInstance from "./axiosInstance";

export const getCart = async () => {
  try {
    const response = await axiosInstance.get("/cart");
    return response.data || { cartItems: [] }; 
  } catch (error) {
    throw error.response?.data || "Error fetching cart";
  }
};

export const addToCart = async (productId, quantity = 1) => {
  try {
    const response = await axiosInstance.post("/cart", { productId, quantity });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error adding to cart";
  }
};

export const updateCartQuantity = async (productId, quantity) => {
  try {
    const response = await axiosInstance.put("/cart", { productId, quantity });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error updating cart";
  }
};

export const removeFromCart = async (productId) => {
  try {
    const response = await axiosInstance.put("/cart", { productId, quantity: 0 });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error removing from cart";
  }
};

export const checkoutCart = async () => {
  
};
