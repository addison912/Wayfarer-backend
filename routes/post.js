const express = require("express"),
  router = express.Router(),
  post = require("../controllers/postController");



router.get("/:userId", post.index);

module.exports = router;