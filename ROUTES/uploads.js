const express = require('express');
const router = express.Router();
const wrapAsync = require("../UTILS/wrapAsync.js");      // For error handling
const ExpressError = require('../UTILS/ExpressError.js');
const Department = require('../MODELS/departmentSchema.js');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const {storage} = require('../cloudConfig.js')
const upload = multer({storage});

const controllerUpload = require('../CONTROLLERS/uploads.js');

// Upload to DB route
// Upload form route
router
    .route("/")
    .post(upload.single('pdf'),wrapAsync(controllerUpload.upoadUrl))
    .get(controllerUpload.uploadForm);
    
router
    .route("/link")
    .get(controllerUpload.uploadFormForPlaylistLink);
router
    .route("/playlistLink")
    .post(controllerUpload.uploadLink);
module.exports = router;