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

const getGameCountByGenre = async (req, res) => {
  try {
    const result = await Game.aggregate([
      {
        $group: {
          _id: "$genre", // Group by the "genre" field in the game documents
          count: { $sum: 1 }, // Count the number of games in each genre
        },
      },
      {
        $sort: { count: -1 }, // Optional: Sort by count descending
      },
    ]);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  findAllGames,
  findGameById,
  findAllGenres,
  getGameCountByGenre,
};