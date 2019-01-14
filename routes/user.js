const express = require("express"),
  router = express.Router(),
  user = require("../controllers/userController");

  router.post("/signup", user.signup);

  router.post("/login", user.login);
  
  router.delete("/:userId", user.delete);
  
  module.exports = router;
