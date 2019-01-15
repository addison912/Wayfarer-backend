const express = require("express"),
  bodyParser = require("body-parser"),
  passport = require("./config/passport")(),
  jwt = require("jsonwebtoken"),
  cors = require("cors");

// generate a new express app and call it 'app'
const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//routes
const userRoutes = require("./routes/user");
const cityRoutes = require("./routes/city");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");
app.use("/uploads", express.static("uploads"));
app.use("/user", userRoutes);
// app.use("/city", cityRoutes);
app.use("/post", postRoutes);
// app.use("/comment", commentRoutes);

app.post("/verify", verifyToken, (req, res) => {
  let verified = jwt.verify(req.token, "waffles");
  console.log("verified: ", verified);
  res.json(verified);
});

// Verify Tokenj
function verifyToken(req, res, next) {
  console.log("in verify...");
  // Get auth header value
  // when we send our token, we want to send it in our header
  const bearerHeader = req.headers["authorization"];
  console.log(bearerHeader);
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

const port = process.env.PORT || 3001;

// server connection
app.listen(port, () => console.log(`Listening on port ${port}`));
