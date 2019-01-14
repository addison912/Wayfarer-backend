// const express = require("express");
// const router = express.Router();

const mongoose = require("../models/Post");
const db = require("../models")
// const Post = mongoose.model("Post");



module.exports = {

  userPosts: (req,res) => {
    console.log("hitting get posts");
    db.Post.findOne({ user: req.params.userId }, (err, result) => {
      if (err) {
        return res.status(999).json({ err });
      }
      res.status(200).json( {result })
    })
  }
}


// router.get("/posts", (req, res) => {
//   Post.find({}).then(posts => res.json(posts));
// });