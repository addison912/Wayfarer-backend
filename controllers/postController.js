// const express = require("express");
// const router = express.Router();

const Post = require("../models/Post");
const db = require("../models")
// const Post = mongoose.model("Post");



module.exports = {

userPosts: (req,res) => {
  console.log("hitting get posts");
  db.Post.find({ user: { _id: req.params.userId }}, (err, result) => {
    if (err) {
      return res.status(999).json({ err });
    }
    res.status(200).json( {result })
  })
}
}

