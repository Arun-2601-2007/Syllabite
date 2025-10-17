const express = require('express');
const router = express.Router();
const User = require('../MODELS/userSchema.js');
const wrapAsync = require("../UTILS/wrapAsync.js");      // For error handling
const ExpressError = require('../UTILS/ExpressError.js');

const controllerProfile = require('../CONTROLLERS/profile.js');
// Profile route
router.get('/',controllerProfile.showProfile);

// Edit profile form route
router.get('/:id/edit',controllerProfile.editProfileForm);

// Update profile route
router.post('/:id',wrapAsync(controllerProfile.updateProfile));

module.exports = router;