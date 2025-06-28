import axiosInstance from "./axiosInstance";

const userGames = async (userId) => {
  const response = await axiosInstance.get(`/user/games/${userId}`);
  return response.data;
};

const userFavoriteGames = async (userId) => {
  const response = await axiosInstance.get(`/user/favoriteGames/${userId}`);
  return response.data;
};

export default {
  userGames,
  userFavoriteGames,
};
