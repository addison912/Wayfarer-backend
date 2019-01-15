const express = require("express"),
  router = express.Router(),
  city = require("../controllers/cityController");

// router.post("/create", city.create);

router.get("/index", city.index);

router.get("/:city", city.show);

// router.delete("/:postId", city.delete);

module.exports = router;
