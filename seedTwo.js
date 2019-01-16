const db = require("./models");

let comment_list = {
  body: "This is the first comment from this user",
  author: "Jane Smith",
  timestamp: new Date("12-13-2018")
};

let post_list = {
  title: "Why I can't wait to go to Portland",
  picture: "https://picsum.photos/200",
  body: "Let me count the reasons why I can't wait to go to Portland",
  author: "Bob Smith",
  comments: []
};

let city_list = [
  {
    city: "Oakland",
    state: "California",
    country: "United States of America",
    image:
      "http://photos.cinematreasures.org/production/photos/51984/1344729159/large.jpg?1344729159",
    posts: []
  },
  {
    city: "San Francisco",
    state: "California",
    country: "United States of America",
    image:
      "https://amp.businessinsider.com/images/58f4e5ebf40daef5008b4bb4-750-500.jpg",
    posts: []
  },
  {
    city: "Paris",
    state: "Île-de-France",
    country: "France",
    image:
      "https://www.telegraph.co.uk/content/dam/Travel/Destinations/Europe/France/Paris/paris-vintage-car.jpg?imwidth=450",
    posts: []
  }
];

let user_list = [
  {
    username: "Jane Smith",
    about: "Let me tell you about this user",
    currentCity: "San Francisco",
    profilePic: "https://picsum.photos/200",
    joinDate: new Date("12-13-2018"),
    password: "Password_123",
    email: "david@gmail.com"
  }
];

simpleCreate(db.City, city_list, "cities");
simpleCreate(db.User, user_list, "users");
simpleCreate(db.Post, post_list, "posts");
simpleCreate(db.Comments, comment_list, "comments");

function simpleCreate(DB, object_list, name) {
  DB.deleteMany({}, (err, objects) => {
    DB.create(object_list, (err, objects) => {
      if (err) {
        return console.log("err", err);
      }
      console.log("deleted all", name);
      console.log("created", objects.length, name);
    });
  });
}