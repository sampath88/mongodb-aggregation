const mongoose = require("mongoose");

const AuthorSchema = mongoose.Schema({
  _id: Number,
  name: String,
  birth_year: Number,
});

module.exports = mongoose.model("Author", AuthorSchema);
