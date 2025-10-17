const express = require('express');
const router = express.Router();
const wrapAsync = require("../UTILS/wrapAsync.js");      // For error handling
const ExpressError = require('../UTILS/ExpressError.js');
const User = require('../MODELS/userSchema.js');
const passport = require('passport');

const controllerAuthentication = require('../CONTROLLERS/authentication.js');

// Signup user route
// Signup user form route
router
    .route("/signup")
    .post(wrapAsync(controllerAuthentication.signUpUser))
    .get(controllerAuthentication.signUpUserForm);

// Login user route
// Login form route
router
    .route("/login")
    .post(passport.authenticate('local',{failureFlash : true,failureRedirect: "/login"}),controllerAuthentication.loginUser)
    .get(controllerAuthentication.loginUserForm);

// Logout user route
router.get('/logout',controllerAuthentication.logoutUser);

module.exports = router;