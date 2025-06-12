const express = require("express");
const router = express.Router();

const { findAllGames, findGameById } = require("../controllers/gameController");
// GET all games — now at /api/games/all
router.get("/all", findAllGames);

// GET single game by game_id — keep this AFTER the /all route
router.get("/:id", findGameById);

module.exports = router;
