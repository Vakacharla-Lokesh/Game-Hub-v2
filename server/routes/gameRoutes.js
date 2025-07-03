const express = require("express");
const router = express.Router();

const {
  findAllGames,
  findGameById,
  findAllGenres,
  getGameCountByGenre,
} = require("../controllers/gameController");

// GET GAME GENRES
router.get("/genres", findAllGenres);

// GAME COUNT PER GENRE
router.get('/games-per-genre', getGameCountByGenre);

// GET all games — now at /api/games/all
router.get("/all", findAllGames);

// GET single game by game_id — keep this AFTER the /all route
router.get("/:id", findGameById);

module.exports = router;
