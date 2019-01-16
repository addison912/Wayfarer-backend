const express = require("express"),
  router = express.Router(),
  post = require("../controllers/postController");

router.post("/create", post.create);

// router.get("/index", post.index);

// router.get("/:postId", post.post);

// router.delete("/:postId", post.delete);

router.get("/user/:userId", post.userPosts);

router.get("/bycity/:city", post.bycity);

module.exports = router;
