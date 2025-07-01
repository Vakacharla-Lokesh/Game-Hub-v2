const UserGame = require("../models/UserGame");
const User = require("../models/User");

const getUserGameData = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userGames = await UserGame.find({ userId });
    res.json(userGames);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserFavoriteGames = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userGames = await User.find({ userId });
    res.json(userGames);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getUserGameData,
  getUserFavoriteGames,
};