const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  userName: { type: String, required: true },
  emailId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  currentLoginStreak: { type: Number, default: 0 },
  longestLoginStreak: { type: Number, default: 0 },
  favoriteGames: { type: [String], default: [] },
});

module.exports = model("User", UserSchema);
