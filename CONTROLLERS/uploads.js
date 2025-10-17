const ExpressError = require('../UTILS/ExpressError.js');
const Department = require('../MODELS/departmentSchema.js');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const {storage} = require('../cloudConfig.js')
const upload = multer({storage});
const Contributor = require('../MODELS/contributorSchema.js');

const ids = ['68f0dba153c5b83d5891b8d7'];
const departmentsList = ["cse", "ece", "eee","mech", "civil", "che","pe","mse"];

module.exports.upoadUrl = async (req,res) =>{
    let {department,semesterNumber,courseNumber} = req.body;
    const departments = await Department.find({});
    let url = req.file.path;
    let departmentData = {};
    let idx = departmentsList.indexOf(department);
    let num = parseInt(courseNumber);
    if(idx == -1){
        throw new ExpressError(404,"Oops! The page you’re looking for can’t be found.");
    }
    for(let i=0;i<departments.length;i++){
        if(i == idx){
            departmentData = departments[i];
            break;
        }
    }
    let semester = departmentData[semesterNumber]; 
      if (!semester[num-1]){
        throw new ExpressError(404, "Oops! The course number you entered is not valid.");
      }
    let pdfs = semester[num - 1].pyq; 
    pdfs.push(url);
    await departmentData.save();
    req.flash('success',"File uploaded successfully!");
    let presentContibutor = {fullname : req.user.fullname,email:req.user.email,phone:req.user.phone,roll:req.user.roll,link:url};
    
    await Contributor.insertOne(presentContibutor);
    const backURL = req.header('Referer') || '/';
    res.redirect(backURL);
};

module.exports.uploadForm = (req,res) => {
    if(!req.isAuthenticated()){
        req.flash("error","Please log in to start exploring Syllabite.");
        return res.redirect('/login');
    }
    res.render("WEBPAGES/upload.ejs");
};

module.exports.uploadFormForPlaylistLink = (req,res) => {
    
    if(!req.isAuthenticated()){
        req.flash("error","Please log in to start exploring Syllabite.");
        return res.redirect('/login');
    }
    res.render("WEBPAGES/uploadLink.ejs");
};

module.exports.uploadLink = async(req,res) => {
    let {department,semesterNumber,courseNumber,playlisturl} = req.body;
    const departments = await Department.find({});
    let departmentData = {};
    let idx = departmentsList.indexOf(department);
    let num = parseInt(courseNumber);
    if(idx == -1){
        throw new ExpressError(404,"Oops! The page you’re looking for can’t be found.");
    }
    for(let i=0;i<departments.length;i++){
        if(i == idx){
            departmentData = departments[i];
            break;
        }
    }
    let semester = departmentData[semesterNumber]; 
      if (!semester[num-1]){
        throw new ExpressError(404, "Oops! The course number you entered is not valid.");
      }
    let playlistLinks = semester[num - 1].playlists; 
    playlistLinks.push(playlisturl);
    await departmentData.save();
    req.flash('success',"Playlist link added successfully!");
    let presentContibutor = {fullname : req.user.fullname,email:req.user.email,phoner:req.user.phone,roll:req.user.roll,link:playlisturl};
    await Contributor.create(presentContibutor);
    const backURL = req.header('Referer') || '/';
    res.redirect(backURL);
};