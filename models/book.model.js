const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
  _id: Number,
  title: String,
  genre: String,
  author_id: { type: Number, ref: "Author" },
});

module.exports = mongoose.model("Book", BookSchema);
