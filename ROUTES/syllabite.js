const express = require('express');
const router = express.Router();
const wrapAsync = require("../UTILS/wrapAsync.js");      // For error handling
const ExpressError = require('../UTILS/ExpressError.js');
const Review = require('../MODELS/review.js');
const Department = require('../MODELS/departmentSchema.js');

const controllerSyllabite = require('../CONTROLLERS/syllabite.js');

// Clubs route
router.get("/clubs",controllerSyllabite.clubsInfo);

// Review save route
router.post('/:id/reviews',wrapAsync(controllerSyllabite.saveReview));

// About route
router.get("/about",controllerSyllabite.aboutInfo);

module.exports = router;