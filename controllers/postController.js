const Post = require("../models/Post");
const db = require("../models");

module.exports = {
  create: (req, res) => {
    console.log(req.body);
    db.User.findOne({ username: req.body.username })
      .exec()
      .then(user => {
        let newPost = new Post({
          user: user,
          title: req.body.title,
          picture: req.body.picture,
          body: req.body.body,
          comments: []
        });
        newPost.save(function(err, post) {
          if (err) {
            return console.log("create error: " + err);
          }
          console.log("created a new post,", post.title);
          res.json(post);
        });
      });
  },

  userPosts: (req, res) => {
    console.log("hitting get posts");
    db.Post.find({ user: { _id: req.params.userId } }, (err, result) => {
      if (err) {
        return res.status(999).json({ err });
      }
      res.status(200).json({ result });
    });
  }
};


