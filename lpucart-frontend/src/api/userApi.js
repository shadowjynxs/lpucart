import axiosInstance from "./axiosInstance";

export const getUser = (userId) => {
  return axiosInstance.get(`/users/${userId}`);
};

export const updateAddress = (userId, address) => {
  return axiosInstance.put(`/users/${userId}`, { address });
};
