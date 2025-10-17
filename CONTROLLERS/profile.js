const User = require('../MODELS/userSchema.js');
const ExpressError = require('../UTILS/ExpressError.js');

module.exports.showProfile = (req,res) =>{
    if(!req.isAuthenticated()){
        req.flash("error","Please log in to start exploring Syllabite.");
        return res.redirect('/login');
    }
    res.render('WEBPAGES/profile.ejs');
};

module.exports.editProfileForm = (req,res) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "Please log in to start exploring Syllabite.");
        return res.redirect("/login");
    }
    res.render('WEBPAGES/update.ejs');
};

module.exports.updateProfile = async (req,res) => {
    const {id} = req.params;
    try {
        let user = await User.findById(id);
        if (!user) {
            req.flash("error", "User not found. Please check the username or try again.");
            return res.redirect("/profile");
        }
        // Update non-password fields
        user.fullname   = req.body.fullname;
        user.username   = req.body.username;
        user.email      = req.body.email;
        user.department = req.body.department;
        user.semester   = req.body.semester;
        user.role       = req.body.role;
        user.cgpa       = req.body.cgpa;
        user.phone      = req.body.phone;
        // Handle password securely
        if (req.body.password) {
            await user.setPassword(req.body.password);
        }
        await user.save(); 
    } catch (err) {
        req.flash("error", "Oops! Something went wrong. Please try again.");
        return res.redirect("/profile");
    }
    req.flash("success","Your profile has been updated successfully!");
    res.redirect('/profile');
};
