import axiosInstance from "./axiosInstance";

const allGames = async () => {
    const response  = await  axiosInstance.get("/games/all");
    return response.data;
}

const gameById = async (game_id) => {
    const response  = await  axiosInstance.get(`/games/${game_id}`);
    return response.data;
}

export default {
    allGames,
    gameById
};