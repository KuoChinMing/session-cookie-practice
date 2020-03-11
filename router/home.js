const express = require("express");
const home = express.Router();

home.get("/", (req, res) => {
  let name = "guest";
  isLogin = false;
  if (req.signedCookies.firstName && req.signedCookies.lastName) {
    name = req.signedCookies.firstName + ' ' + req.signedCookies.lastName;
    isLogin = true;
  }
  res.render('home', { title: 'this is home page', member: name, logstatus:isLogin });
});

home.post("/", (req, res) => {
  console.log('post success');
  if (req.body.firstName === "" || req.body.lastName === "") {
    return res.redirect("/login");
  } else {
    res.cookie("firstName", req.body.firstName, {
      path: "/home",
      signed: true,
      maxAge: 600000
    }); //set cookie
    res.cookie("lastName", req.body.lastName, {
      path: "/home",
      signed: true,
      maxAge: 600000
    }); //set cookie
    return res.redirect("/home");
  }
});

module.exports = home;
