const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport")

router.use(bodyParser.urlencoded({ extended: true }));

router.get("/signup", (req, res) => {
    res.render("users/signup.ejs")
})

router.post('/signup', wrapAsync(async (req,res) => {
    try {
        let {username, email, password} = req.body;
    newUser = new User({  username, email})
    const registerUser = await User.register(newUser,password)
    console.log(registerUser);
    req.flash('success','Account Created! You can now login')
    res.redirect('/listings');
    } catch (error) {
        req.flash('error', error.message)
        res.redirect('/signup')
    }
}))

router.get("/login", (req, res) => {
    res.render("users/login.ejs");
});

router.post("/login", passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true
}), (req, res) => {
    req.flash("success","Welcome back!");
    res.redirect("/listings");
});


module.exports = router