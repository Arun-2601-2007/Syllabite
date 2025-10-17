const express = require('express');
const router = express.Router();
const wrapAsync = require("../UTILS/wrapAsync.js");      // For error handling
const ExpressError = require('../UTILS/ExpressError.js');
const Review = require('../MODELS/review.js');
const Department = require('../MODELS/departmentSchema.js');

const controllerDepartment = require('../CONTROLLERS/department.js');

// Delete review route
router.post("/:depId/reviews/:reviewId",wrapAsync(controllerDepartment.destroyReview));

// Department information route
router.get("/:id",wrapAsync(controllerDepartment.departmentInfo));

module.exports = router;