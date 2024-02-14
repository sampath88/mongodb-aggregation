const mongoose = require("mongoose");

const LocationSchema = mongoose.Schema({
  country: String,
  address: String,
});

const CompanySchema = mongoose.Schema({
  title: String,
  email: String,
  phone: String,
  location: LocationSchema,
});

const UserSchema = mongoose.Schema({
  name: String,
  age: Number,
  gender: {type: String, enum : ["male","female"]},
  eyeColor: String,
  favoriteFruit: String,
  isActive: Boolean,
  registered: Date,
  company: CompanySchema,
  tags: [String],
});

module.exports = mongoose.model("User", UserSchema);
