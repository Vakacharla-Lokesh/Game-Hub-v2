import axiosInstance from "../components/api/axiosInstance";
import { saveToken } from "./tokenUtils";

const loginUser = async (credentials) => {
  const response = await axiosInstance.post("/auth/login", credentials);
  saveToken(response.data.token);
  return response.data;
};

const registerUser = async (userData) => {
  const response = await axiosInstance.post("/auth/register", userData);
  return response;
};

const forgotPassword = async (userEmail) => {
  const response = await axiosInstance.post("/auth/forgot-password", userEmail);
  return response;
};

const resetPassword = async (password, token) => {
  const response = await axiosInstance.post(`/auth/reset-password/${token}`, password);
  return response;
};

export default {
  loginUser,
  registerUser,
  forgotPassword,
  resetPassword,
};
