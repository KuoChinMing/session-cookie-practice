const express = require("express");
const logout = express.Router();

logout.get("/", (req, res) => {
  req.session.destroy();
  return res.redirect("/sessionHome");
});

module.exports = logout;
