const express = require("express");
const index = express.Router();

index.get("/", (req, res) => {
  res.render("index", {
    food: ["cake", "cookie", "apple", "orange", "banana"]
  }); // render view template
  // // res.sendFile(__dirname + "/public/index.html");
});

module.exports = index;