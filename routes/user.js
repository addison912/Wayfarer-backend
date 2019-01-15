const express = require("express"),
  router = express.Router(),
  bcrypt = require("bcrypt"),
  jwt = require("jsonwebtoken"),
  multer = require("multer"),
  path = require("path"),
  config = require("../config/config"),
  user = require("../controllers/userController"),
  User = require("../models/User");

// set storage engine
const storage = multer.diskStorage({
  destination: "./uploads/profilePics",
  filename: function(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  }
});
// Init upload
const upload = multer({
  storage: storage
});

const newUserPic = upload.fields([
  {
    name: "profilePic",
    maxCount: 1
  }
]);

router.post("/signup", newUserPic, (req, res) => {
  console.log(req.body);
  console.log(req.files["profilePic"][0].path);
  let imagePath = req.files["profilePic"][0].path;
  User.findOne({ username: req.body.username })
    .exec()
    .then(user => {
      if (user) {
        return res.status(409).json({
          message: "There's already a user with that username"
        });
      } else {
        User.findOne({ email: req.body.email })
          .exec()
          .then(user => {
            if (user) {
              return res.status(409).json({
                message:
                  "There's already a username associated with that email address"
              });
            } else {
              bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                  console.log("hashing error:", err);
                  res.status(200).json({ error: err });
                } else {
                  console.log("Creating user");
                  User.create(
                    {
                      username: req.body.username,
                      currentCity: req.body.currentCity,
                      email: req.body.email,
                      joinDate: req.body.joinDate,
                      profilePic: imagePath,
                      password: hash
                    },
                    (err, result) => {
                      // if(err){ return res.status(500).json({err})}
                      // we send our new data back to user or whatever you want to do.
                      // result = result[0];
                      console.log("signing jwt");
                      jwt.sign(
                        { result },
                        config.jwtSecret,
                        { expiresIn: "1h" },
                        (err, signedJwt) => {
                          res.status(200).json({
                            message: "User Created",
                            result,
                            signedJwt
                          });
                        }
                      );
                    }
                  );
                }
              });
            }
          });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
});

router.post("/login", user.login);

router.delete("/:userId", user.delete);

router.get("/:username", user.find);

module.exports = router;
