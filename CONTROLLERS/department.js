const Review = require('../MODELS/review.js');
const Department = require('../MODELS/departmentSchema.js');
const ExpressError = require('../UTILS/ExpressError.js');

const ids = ['68f0dba153c5b83d5891b8d7'];

// Delete review function
module.exports.destroyReview = async (req,res) => {
    if(!req.isAuthenticated()){
        req.flash("error","Please log in to start exploring Syllabite.");
        return res.redirect('/login');
    }
    let {depId,reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error",`Sorry ${req.user.username}, you’re not the owner of this review.`);
        return res.redirect(`/department/${depId}`);
    }
    await Department.findByIdAndUpdate(depId,{$pull :{reviews : reviewId} });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review deleted successfully.");
    res.redirect(`/department/${depId}`);

};

// Department information function
module.exports.departmentInfo = async (req,res) => {
    const id = req.params.id;
    if(!req.isAuthenticated()){
        req.flash("error","Please log in to start exploring Syllabite.");
        return res.redirect('/login');
    }
    const departmentData = await Department.findById(id).populate({path:"reviews",populate : {
        path:"author",
    }});
    if(!departmentData){
        throw new ExpressError("Oops! The page you’re looking for can’t be found.")
    }
    res.render("WEBPAGES/department.ejs", {departmentData,ids});    
};