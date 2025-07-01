const { Schema, model } = require("mongoose");

const gameSchema = new Schema(
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
);

module.exports = model("Game", gameSchema);
