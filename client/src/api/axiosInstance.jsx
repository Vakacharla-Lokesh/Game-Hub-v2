import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiCall = async (method, endpoint, data = null) => {
  try {
    const response = await axiosInstance({
      method,
      url: endpoint,
      data,
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export default axiosInstance;
