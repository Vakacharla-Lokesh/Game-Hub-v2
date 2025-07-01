const express = require("express");
const router = express.Router();

const {
  getUserGameData,
  getUserFavoriteGames,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/games/:userId", authMiddleware, getUserGameData);
router.get("/favoriteGames/:userId", authMiddleware, getUserFavoriteGames);

module.exports = router;
