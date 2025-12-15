const InterviewExperience = require('../MODELS/interviewSchema.js');

module.exports.addExperienceForm = (req,res) => {
    if(!req.isAuthenticated()){
        req.flash("error","Please log in to start exploring Syllabite.");
        return res.redirect('/login');
    }
    res.render('WEBPAGES/experience.ejs');
};

module.exports.updateExperience = async (req, res) => {
    if(!req.isAuthenticated()){
        req.flash("error","Please log in to start exploring Syllabite.");
        return res.redirect('/login');
    }
    const interview = await InterviewExperience.findById(req.params.id);
    if (!interview) {
        req.flash("error", "Interview Experience not found.");
        return res.redirect('/interviews');
    }
    if(!interview.author.equals(req.user._id)){
        req.flash("error",`Sorry ${req.user.username}, you’re not the owner of this Interview Experience.`);
        return res.redirect('/interviews');
    }
    const {jobtitle,company,interviewtype,totalrounds,status,createdAt,summary,content} = req.body;
    const experience = {jobtitle:jobtitle,company:company,interviewtype:interviewtype,totalrounds:totalrounds,status:status,
        createdAt:createdAt,summary:summary,content:content,author : req.user._id
    };
    await InterviewExperience.findByIdAndUpdate(req.params.id,experience);
    req.flash("success", "Interview Experience updated successfully!");
    res.redirect(`/interview/${req.params.id}`);
};

module.exports.editExperienceForm = async(req,res) => {
    if(!req.isAuthenticated()){
        req.flash("error","Please log in to start exploring Syllabite.");
        return res.redirect('/login');
    }
    const interview = await InterviewExperience.findById(req.params.id);
    if (!interview) {
        req.flash("error", "Interview Experience not found.");
        return res.redirect('/interviews');
    }
    if(!interview.author.equals(req.user._id)){
        req.flash("error",`Sorry ${req.user.username}, you’re not the owner of this Interview Experience.`);
        return res.redirect('/interviews');
    }
    res.render("WEBPAGES/editexp.ejs", { interview });
};

module.exports.completeExperience = async (req,res) =>{
    if(!req.isAuthenticated()){
        req.flash("error","Please log in to start exploring Syllabite.");
        return res.redirect('/login');
    }
    const interview = await InterviewExperience.findById(req.params.id);
    if (!interview) {
        req.flash("error", "Interview Experience not found.");
        return res.redirect('/interviews');
    }
    res.render("WEBPAGES/interviewDetail.ejs", { interview });
};

module.exports.destroyExperience = async (req, res) => {
    if(!req.isAuthenticated()){
        req.flash("error","Please log in to start exploring Syllabite.");
        return res.redirect('/login');
    }
    const interview = await InterviewExperience.findById(req.params.id);
    if (!interview) {
        req.flash("error", "Interview Experience not found.");
        return res.redirect('/interviews');
    }
    if(!interview.author.equals(req.user._id)){
        req.flash("error",`Sorry ${req.user.username}, you’re not the owner of this Interview Experience.`);
        return res.redirect('/interviews');
    }
    await InterviewExperience.findByIdAndDelete(req.params.id);
    req.flash("success", "Interview experience deleted successfully!");
    res.redirect("/interviews"); 
};

module.exports.addExperience = async (req,res) => {
    if(!req.isAuthenticated()){
        req.flash("error","Please log in to start exploring Syllabite.");
        return res.redirect('/login');
    }
    const {jobtitle,company,interviewtype,totalrounds,status,createdAt,summary,content} = req.body;
    const experience = {jobtitle:jobtitle,company:company,interviewtype:interviewtype,totalrounds:totalrounds,status:status,
        createdAt:createdAt,summary:summary,content:content,author : req.user._id
    };
    await InterviewExperience.create(experience);
    req.flash("success", "Interview Experience added successfully!");
    res.redirect('/interviews');
};

module.exports.allExperiences = async (req, res) => {
    if(!req.isAuthenticated()){
        req.flash("error","Please log in to start exploring Syllabite.");
        return res.redirect('/login');
    }
    const data = await InterviewExperience.find();
    res.render("WEBPAGES/interviewList.ejs", { data });
};
