const User = require("../models/User"),
  bcrypt = require("bcrypt"),
  jwt = require("jsonwebtoken"),
  config = require("../config/config"),
  multer = require("multer"),
  path = require("path");

module.exports = {
  login: (req, res) => {
    console.log("LOGIN CALLED");
    // find the user in our user db
    console.log("body", req.body);
    User.findOne({ username: req.body.username })
      .select("+password")
      .exec()
      // if we have found a user
      .then(user => {
        // if there is not email in our db
        console.log("USER: ", user);
        if (user === null) {
          return res.status(401).json({
            message: "Username/Password incorrect"
          });
        }
        console.log("body", req.body);
        console.log("hash", user.password);
        bcrypt.compare(req.body.password, user.password, (err, match) => {
          console.log(match);
          if (err) {
            console.log(err);
            return res.status(500).json({ err });
          }
          if (match) {
            console.log("MATCH: ", match);
            // create a json web token
            const token = jwt.sign(
              {
                username: user.username,
                _id: user._id
              },
              config.jwtSecret,
              {
                expiresIn: "1h"
              }
            );
            console.log("NEW TOKEN: ", token);
            // send success back to user, along with a token.
            return res.status(200).json({
              message: "Auth successful",
              _id: user._id,
              user: user,
              token
            });
            // the password provided does not match the password on file.
          } else {
            console.log("NOT A MATCH");
            res.status(401).json({ message: "Username/Password incorrect" });
          }
        });
      })
      .catch(err => {
        console.log("OUTSIDE ERROR_");
        console.log(err);
        res.status(500).json({ err });
      });
  },

  delete: (req, res) => {
    console.log("hitting delete");
    User.deleteOne({ _id: req.params.userId }, (err, result) => {
      if (err) {
        return res.status(500).json({ err });
      }
      res.status(200).json({ result });
    });
  }
};
