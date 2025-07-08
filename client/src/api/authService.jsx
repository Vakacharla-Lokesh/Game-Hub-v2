// import axiosInstance from "../components/api/axiosInstance";
import axiosInstance from "./axiosInstance";
import { saveToken } from "./tokenService";

export const loginUser = async (credentials) => {
  const response = await axiosInstance.post("/auth/login", credentials);
  console.log("return from database: ", response);
  if (response.status == 200) {
    saveToken(response.data.token);
    return response.data;
  } else {
    console.log("error with credentials");
    return response;
  }
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
  const response = await axiosInstance.post(
    `/auth/reset-password/${token}`,
    password
  );
  return response;
};
