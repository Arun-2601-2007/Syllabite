if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
} 

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const port = 8080;

// Router routes
const department = require('./ROUTES/department.js');
const profile = require('./ROUTES/profile.js');
const uploads = require('./ROUTES/uploads.js');
const authentication = require('./ROUTES/authentication.js');
const syllabite = require('./ROUTES/syllabite.js');
const destroy = require('./ROUTES/destroy.js');

const multer = require('multer');
const {storage} = require('./cloudConfig.js');
const upload = multer({storage});
const ejsMate = require('ejs-mate');
const Department = require('./MODELS/departmentSchema.js');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "VIEWS"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, 'PUBLIC')));
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./MODELS/userSchema.js');
const Review = require('./MODELS/review.js');
const { parseArgs } = require('util');
app.use(express.urlencoded({extended : true}));
const ExpressError = require('./UTILS/ExpressError.js');
const wrapAsync = require("./UTILS/wrapAsync.js");
const review = require('./MODELS/review.js');
const cloudinary = require('cloudinary').v2;

// Connecting MongoDB
const dbUrl = process.env.ATLASDB_URL;

main().then(() =>{
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("Error connecting to MongoDB:", err);
});
async function main(){
    await mongoose.connect(dbUrl);
}

// Mongo session setup
const store = MongoStore.create({
    mongoUrl : dbUrl,
    crypto : {
        secret : process.env.SECRET,
    },
    touchAfter : 24 * 3600
});

// Setting session
const sessionOptions = {
    store,
    secret : process.env.SECRET,
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 7*24*60*60*1000,
        maxAge : 7*24*60*60*1000,
        httpOnly : true,
    }
}


// Session and passport
app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Using locals
app.use(async (req,res,next) => {
    try {
        res.locals.departments = await Department.find({});
    } catch (e) {
        res.locals.departments = [];
    }
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// Home page route
app.get("/",async (req,res) =>{
    const departments = await Department.find({});
    res.render("WEBPAGES/home.ejs",{departments});
});

// Using router files
app.use('/department',department);
app.use('/upload',uploads);
app.use('/profile',profile);
app.use('/',authentication);
app.use('/',syllabite);
app.use('/',destroy);


app.use((err,req,res,next) =>{
    let {status=500,message="Some Error Occured At Backend"} = err;
    res.render('WEBPAGES/error.ejs',{status,message});
});

app.listen(port,() =>{
    console.log(`Server is running on port ${port}`);
});

