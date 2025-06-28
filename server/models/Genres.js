const { Schema, model } = require("mongoose");

const genreSchema = new Schema(
  {
    genre_id: Number,
    genre_name: String,
  },
  { collection: "genres" }
);

module.exports = model("Genre", genreSchema);
