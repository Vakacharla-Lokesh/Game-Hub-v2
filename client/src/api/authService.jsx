import axiosInstance from "../components/api/axiosInstance";
import { saveToken } from "./tokenUtils";

export const loginUser = async (credentials) => {
  const response = await axiosInstance.post("/auth/login", credentials);
  saveToken(response.data.token);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await axiosInstance.post("/auth/register", userData);
  return response;
};

export const forgotPassword = async (userEmail) => {
  const response = await axiosInstance.post("/auth/forgot-password", userEmail);
  return response;
};

export const resetPassword = async (password, token) => {
  const response = await axiosInstance.post(`/auth/reset-password/${token}`, password);
  return response;
};