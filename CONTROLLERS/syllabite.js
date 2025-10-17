const ExpressError = require('../UTILS/ExpressError.js');
const Review = require('../MODELS/review.js');
const Department = require('../MODELS/departmentSchema.js');

module.exports.clubsInfo = (req,res)=>{
    res.render("WEBPAGES/clubs");
};

module.exports.saveReview = async (req,res) =>{
    let {id} = req.params;
   if (!req.isAuthenticated()) {
        req.flash("error", "Please log in to start exploring Syllabite.");
        return res.redirect("/login");
    }
    let dep = await Department.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id; 
    dep.reviews.push(newReview);
    await newReview.save();
    await dep.save();
    res.redirect(`/department/${id}`);
};

module.exports.aboutInfo = (req,res) =>{
    res.render("WEBPAGES/about.ejs");
};
