const express = require('express');
const router = express.Router();
const wrapAsync = require("../UTILS/wrapAsync.js");      // For error handling
const ExpressError = require('../UTILS/ExpressError.js');
const InterviewExperience = require('../MODELS/interviewSchema.js');

const controllerExperience = require('../CONTROLLERS/interview.js');

router
    .route("/new")
    .get(controllerExperience.addExperienceForm);

router
    .route("/")
    .get(wrapAsync(controllerExperience.allExperiences));

router
    .route('/')
    .post(wrapAsync(controllerExperience.addExperience));
    

router
    .route("/:id")
    .put(wrapAsync(controllerExperience.updateExperience))
    .get(wrapAsync(controllerExperience.completeExperience))
    .delete(wrapAsync(controllerExperience.destroyExperience));

router
    .route("/:id/edit")
    .get(wrapAsync(controllerExperience.editExperienceForm));

module.exports = router;
