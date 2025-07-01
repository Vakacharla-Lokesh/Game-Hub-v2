import axiosInstance from "./axiosInstance";

export const allGames = async () => {
    const response  = await  axiosInstance.get("/games/all");
    return response.data;
}

export const gameById = async (game_id) => {
    const response  = await  axiosInstance.get(`/games/${game_id}`);
    return response.data;
}