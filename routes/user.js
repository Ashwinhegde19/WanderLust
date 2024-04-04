const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userContorller = require("../controllers/users.js");

router.use(bodyParser.urlencoded({ extended: true }));

router.get("/signup", userContorller.rendersignupForm);

router.post("/signup", wrapAsync(userContorller.signup));

router.get("/login", userContorller.renderLoginForm);

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userContorller.login
);

router.get("/logout", userContorller.logout);

module.exports = router;
