const express = require("express"),
  router = express.Router(),
  post = require("../controllers/postController");

router.post("/create", post.create);

// router.get("/index", post.index);

// router.get("/:postId", post.post);

// router.delete("/:postId", post.delete);

router.get("/:userId", post.userPosts);

module.exports = router;
