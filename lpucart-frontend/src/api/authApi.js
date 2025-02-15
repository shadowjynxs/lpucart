import axiosInstance from "./axiosInstance";

export const signUp = (email, password) => {
  return axiosInstance.post("/auth/register", { email, password });
};

export const signIn = (email, password) => {
  return axiosInstance.post("/auth/login", { email, password });
};
