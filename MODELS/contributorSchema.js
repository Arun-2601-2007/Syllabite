const mongoose = require('mongoose');
const passport = require('passport');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose'); 


const contributorSchema = new Schema({
    email :{
        type : String,
        required : true,
    },
    fullname : {
         type:String,
         required : true,
    },
    link :{
        type:String,
        required : true,
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
// contributorSchema.plugin(passportLocalMongoose);
const Contributor = mongoose.model('Contributor',contributorSchema);

module.exports = Contributor;