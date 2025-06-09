const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    game_id: { type: String, required: true, unique: true },
    title: String,
    genre: String,
    description: String,
    instructions: String,
    rating: Number,
    embed_code: String,
  },
  { collection: "games" }
); // 👈 match the collection name exactly!

module.exports = mongoose.model("Game", gameSchema);
