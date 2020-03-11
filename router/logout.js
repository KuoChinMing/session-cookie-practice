const express = require("express");
const logout = express.Router();

logout.get("/", (req, res) => {
  res.clearCookie("firstName", { path: "/home" });
  res.clearCookie("lastName", { path: "/home" });
  return res.redirect("/home");
});

module.exports = logout;
