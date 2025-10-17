const ExpressError = require('../UTILS/ExpressError.js');
const User = require('../MODELS/userSchema.js');
const passport = require('passport');

module.exports.signUpUser = async (req,res,next) =>{
    try{
        let {username , email,password,fullname,department,semester,role,cgpa,phone,roll} = req.body;
        const newUser = new User({email,username,fullname,role,department,semester,cgpa,phone,roll});
       const registeredUser = await User.register(newUser,password);
        req.login(registeredUser,(err) =>{
            if(err){
                return next(err);
            }
            req.flash('success',`Welcome ${req.user.username}! With Syllabite, every module is just a click away. `);
            return  res.redirect('/');
        })
    }catch(err){
        req.flash("error",err.message);
        return res.redirect("/signup");
    }
};

module.exports.logoutUser = (req,res) =>{
    req.logout((err) =>{
        if(err){
            next(err);
        }
        req.flash('success',`You’ve successfully logged out. See you soon!`);
        res.redirect('/');
    })
};

module.exports.loginUser = async (req,res) =>{
    req.flash("success", `Welcome ${req.user.username}! With Syllabite, every module is just a click away. `);
    res.redirect('/');
};

module.exports.signUpUserForm = (req,res) => {
    res.render("WEBPAGES/signup.ejs");
};

module.exports.loginUserForm = (req,res) =>{
    res.render("WEBPAGES/login.ejs");
};
