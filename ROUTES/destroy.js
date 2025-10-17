const express = require('express');
const router = express.Router();
const wrapAsync = require("../UTILS/wrapAsync.js");      // For error handling
const ExpressError = require('../UTILS/ExpressError.js');
const User = require('../MODELS/userSchema.js');
const passport = require('passport');
const Department = require('../MODELS/departmentSchema.js');

const controllerDestroy = require('../CONTROLLERS/destroy.js');

// Destroy playlist link
router
    .route("/deleteLink/:deptId/:semNum/:courseId")
    .post(wrapAsync(controllerDestroy.destroyPlaylist));
    
router
    .route("/delete/:deptId/:semNum/:courseId")
    .post(wrapAsync(controllerDestroy.destroyFile));

module.exports = router;