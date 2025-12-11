const mongoose = require('mongoose');
const passport = require('passport');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose'); 

const interviewSchema = new Schema({
    jobtitle :{
        type : String,
        required : true,
    },
    company : {
         type:String,
         required : true,
    },
    interviewtype :{
        type:String,
        required : true,
    },
    totalrounds : {
        type : Number,
        required : true,
    },
    status : {
        type : String,
        required : true,
    },
    createdAt : {
         type : Date,
         default : Date.now(),
    },
    summary :{
        type : String,
    },
    content : {
        type : String,
        required : true,
    }
});

const InterviewExperience = mongoose.model('InterviewExperience',interviewSchema);

module.exports = InterviewExperience;