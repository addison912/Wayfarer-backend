const Post = require("../models/Post");
const db = require("../models");

module.exports = {
  create: (req, res) => {
    console.log(req.body);
    db.User.findOne({ username: req.body.username })
      .exec()
      .then(user => {
        db.City.findOne({ city: req.body.city })
          .exec()
          .then(city => {
            let newPost = new Post({
              user: user,
              city: city,
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
          })
          .catch(err => {
            console.log("City not found!");
            console.log(err);
            res.status(500).json({ err });
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
  },

  bycity: (req, res) => {
    console.log("getting posts by city");
    db.City.findOne({ city: req.params.city }, (err, city) => {
      Post.find({ city: city._id }, (err, posts) => {
        if (err) {
          return res.status(999).json({ err });
        }
        res.status(200).json({ posts });
      });
      if (err) {
        return res.status(420).json({ err });
      }
    });
  }
};
