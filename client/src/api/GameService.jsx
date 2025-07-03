import axiosInstance from "./axiosInstance";

export const allGames = async () => {
  const response = await axiosInstance.get("/games/all");
  return response.data;
};

export const gameById = async (game_id) => {
  const response = await axiosInstance.get(`/games/${game_id}`);
  return response.data;
};

export const getGenres = async () => {
  const response = await axiosInstance.get("/games/genres");
  return response.data;
};

export const getGamePerGenres = async () => {
  const response = await axiosInstance.get("/games/games-per-genre");
  return response.data;
};
