import axiosInstance from "./axiosInstance";

export const userGames = async (userId) => {
  const response = await axiosInstance.get(`/user/games/${userId}`);
  return response.data;
};

export const userFavoriteGames = async (userId) => {
  const response = await axiosInstance.get(`/user/favoriteGames/${userId}`);
  return response.data;
};

export const addUserFavoriteGames = async (userId, gameId, isLiked) => {
  const response = await axiosInstance.post(
    `/user/addfavoriteGames/${userId}`,
    { gameId, isLiked }
  );
  return response.data;
};
