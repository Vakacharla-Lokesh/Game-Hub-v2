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

const addUserFavoriteGames = async (req, res) => {
  try {
    const userId = req.params.userId;
    const gameId = req.body.gameId;
    const isLiked = req.body.isLiked;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (isLiked) {
      if (!user.favoriteGames.includes(gameId)) {
        user.favoriteGames.push(gameId);
      }
    } else {
      user.favoriteGames = user.favoriteGames.filter((id) => id !== gameId);
    }

    await user.save();

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getUserGameData,
  getUserFavoriteGames,
  addUserFavoriteGames,
};
