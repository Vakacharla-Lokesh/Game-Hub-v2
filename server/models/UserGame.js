const { Schema, model } = require("mongoose");

const UserGameSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  gameId: { type: String, required: true },
  highScore: { type: Number, default: 0 },
  lastPlayed: { type: Date, default: Date.now },
});

module.exports = model("UserGame", UserGameSchema);
