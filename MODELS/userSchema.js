const mongoose = require('mongoose');
const passport = require('passport');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose'); 
const Department = require('./departmentSchema');

const userSchema = new Schema({
    email :{
        type : String,
        required : true,
    },
    fullname : {
         type:String,
         required : true,
    },
    role :{
        type:String,
        required : true,
    },
    department : {
        type:String,
        required : true,
    },
    semester : {
         type :String,
         required : true,
    },
    cgpa : {
         type :Number,
         default : null,
    },
    phone : {
        type :Number,
        default:null,
    },
    roll : {
        type :String,
        default:null,
    },
    
    

});
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User',userSchema);

module.exports = User;