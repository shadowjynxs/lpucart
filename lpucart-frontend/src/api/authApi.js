import axiosInstance from "./axiosInstance";

export const signUp = (name, email, password) => {
  return axiosInstance.post("/auth/register", { name, email, password });
};

export const signIn = (email, password) => {
  return axiosInstance.post("/auth/login", { email, password });
};
