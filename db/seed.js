const db = require("../models");

let city_list = {
  city: "Portland",
  state: "Oregon",
  country: "United States of America"
};

let user_list = [
  {
    username: "Jane Smith",
    about: "Let me tell you about this user",
    currentCity: "San Francisco",
    profilePic: "https://picsum.photos/200",
    joinDate: new Date("12-13-2018"),
    email: "david.ford@gmail.com",
    password: "Password_123"
  }
];

db.Post.remove({}, (err, posts) => {
  db.Comments.remove({}, (err, comments) => {});
  db.User.remove({}, (err, users) => {});
  db.City.remove({}, (err, cities) => {});
    db.City.create(city_list, (err, savedCity) => {
      if (err) {
      return console.log(err);
    } else {
      savedCity.save((err, savedCity_list) => {
        if (err) {
          return console.log(err);
        } else {
          console.log("City Created", savedCity_list)
          let CityId = savedCity._id
      db.User.create(user_list, (err, savedUser) => {
        if (err) {
          return console.log(err);
        } else {
            console.log("User Created:", savedUser);
            let UserId = savedUser[0]._id
            let comment_list = {
              body: "This is the first comment from this user",
              user: UserId,
              timestamp: new Date("12-13-2018")
            }
            db.Comments.create(comment_list, (err, savedComment) => {
              if (err) {
                return console.log(err);
              } 
              savedComment.save((err, savedComment_list) => {
                if (err) {
                  return console.log(err);
                } else {
                  console.log("Comment Created: ", savedComment_list);
                  let CommentId = savedComment._id
                  let post_list = {
                    title: "Why I can't wait to go to Portland",
                    picture: "https://picsum.photos/200",
                    body: "Let me count the reasons why I can't wait to go to Portland",
                    user: UserId,
                    city: CityId,
                    comments: CommentId
                  }
                db.Post.create(post_list, (err, savedPost) => {
                  if (err) {
                    return console.log(err);
                  }
                  savedPost.save((err, savedPost) => {
                    if (err) {
                      return console.log(err);
                    } else {
                      console.log("Post Created: ", savedPost)
                    }
                  })
                })
              }})
            })
          }
        })      
        }
      })
      }
    })
})