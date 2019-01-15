const mongoose = require("mongoose");
Schema = mongoose.Schema;

const CitySchema = new Schema({
  city: String,
  state: String,
  country: String,
  image: String
});

const City = mongoose.model("City", CitySchema);

module.exports = City;
