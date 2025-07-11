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

export const gameByGenres = async (genre) => {
  const response = await axiosInstance.get(`/games/gamesbygenres/${genre}`);
  return response.data;
};

export const searchGames = async (query) => {
  const response = await axiosInstance.get(`/games/search?q=${encodeURIComponent(query)}`);
  return response.data;
};