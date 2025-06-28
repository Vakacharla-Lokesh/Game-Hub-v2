import { jwtDecode } from "jwt-decode";

// Save token
export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

// Get token
export const getToken = () => {
  return localStorage.getItem("token");
};

// Remove token
export const removeToken = () => {
  localStorage.removeItem("token");
};

// Decode token
export const decodeToken = () => {
  const token = getToken();
  if (!token) return null;

  try {
    return jwtDecode(token); 
  } catch (error) {
    console.error("Invalid Token", error);
    return null;
  }
};

export const getUserId = () => {
  const token = getToken();
  if (!token) return null;

  try {
    return jwtDecode(token.userId); 
  } catch (error) {
    console.error("Invalid Token", error);
    return null;
  }
};
