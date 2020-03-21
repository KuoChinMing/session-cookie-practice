const express = require("express");
const home = express.Router();

home.get("/", (req, res) => {
  let name = "guest";
  isLogin = false;
  let logTimes = 1;
  if (req.session.firstName && req.session.lastName) {
    name = req.session.firstName + " " + req.session.lastName;
    isLogin = true;
    logTimes = req.session.times++;
    console.log(req.session);
  }
  res.render("sessionHome", {
    title: "this is session home page",
    member: name,
    logstatus: isLogin,
    logtimes: logTimes
  });
});

home.post("/", (req, res) => {
  if (req.body.firstName === "" || req.body.lastName === "") {
    return res.redirect("/sessionLogin");
  } else if (
    req.body.firstName === req.session.firstName &&
    req.body.lastName === req.session.lastName
  ) {
    //如果輸入的,在session store已有儲存..
    req.session.times++; //同一連線的登入次數, 就加 1
    return res.redirect("/sessionHome"); //就直接導向到...
  } else {
    //session store裡沒有的，就會重新設置
    req.session.firstName = req.body.firstName;
    req.session.lastName = req.body.lastName;
    req.session.times = 1;
    return res.redirect("/sessionHome");
  }
});

module.exports = home;
