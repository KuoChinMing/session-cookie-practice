const express = require("express");
const login = express.Router();

login.get('/', (req, res) => {
  res.render('sessionlogin');
});

module.exports = login;