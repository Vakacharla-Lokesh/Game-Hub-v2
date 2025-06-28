const Game = require("../models/Game");
const Genre = require("../models/Genres");

const findAllGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const findGameById = async (req, res) => {
  try {
    const game = await Game.findOne({ game_id: req.params.id });
    if (!game) return res.status(404).json({ msg: "Game not found" });
    res.json(game);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const findAllGenres = async (req, res) => {
  try {
    const genres = await Genre.find();
    res.json(genres);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  findAllGames,
  findGameById,
  findAllGenres,
};
