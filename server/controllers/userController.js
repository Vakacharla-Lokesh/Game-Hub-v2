const UserGame = require("../models/UserGame");

exports.getUserGameData = async (req, res) => {
  try {
    const userId = req.user.userId;
    const userGames = await UserGame.find({ userId });
    res.json(userGames);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
