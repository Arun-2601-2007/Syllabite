const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const depSchema = new Schema({
    semesterOne: [
        {
            subject: String,
            
            playlists: [{
                name : String,
                link : String
            }],
            pyq: [{
                name: String,
                url : String
            }]
        }
    ],
    semesterTwo: [
        {
            subject: String,
            
            playlists: [{
                name : String,
                link : String
            }],
            pyq: [{
                name: String,
                url : String
            }]
        }
    ],
    semesterThree: [
        {
            subject: String,
            
            playlists: [{
                name : String,
                link : String
            }],
            pyq: [{
                name: String,
                url : String
            }]
        }
    ],
    semesterFour: [
        {
            subject: String,
            
            playlists: [{
                name : String,
                link : String
            }],
            pyq: [{
                name: String,
                url : String
            }]
        }
    ],
    semesterFive: [
        {
            subject: String,
            
            playlists: [{
                name : String,
                link : String
            }],
            pyq: [{
                name: String,
                url : String
            }]
        }
    ],
    semesterSix: [
        {
            subject: String,
            
            playlists: [{
                name : String,
                link : String
            }],
            pyq: [{
                name: String,
                url : String
            }]
        }
    ],
    semesterSeven: [
        {
            subject: String,
            
            playlists: [{
                name : String,
                link : String
            }],
            pyq: [{
                name: String,
                url : String
            }]
        }
    ],
    semesterEight: [
        {
            subject: String,
            
            playlists: [{
                name : String,
                link : String
            }],
            pyq: [{
                name: String,
                url : String
            }]
        }
    ],
    reviews : [
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        }
    ]
});

const Department = mongoose.model('Department', depSchema);
module.exports = Department;
