const City = require("../models/City");
const db = require("../models");

module.exports = {
  index: (req, res) => {
    City.find().exec(function(err, cities) {
      if (err) {
        console.log("index error: " + err);
        res.sendStatus(500);
      } else {
        res.json(cities);
      }
    });
  },
  // get one city
  show: (req, res) => {
    // find one city by id
    City.findOne({ _id: req.params.id }, (err, city) => {
      if (err) {
        return console.log(err);
      }
      res.json(city);
    });
  }
};
