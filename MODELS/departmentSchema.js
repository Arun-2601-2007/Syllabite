const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const depSchema = new Schema({
    semesterOne: [
        {
            subject: String,
            
            playlists: [String],
            pyq: [String]
        }
    ],
    semesterTwo: [
        {
            subject: String,
            
            playlists: [String],
            pyq: [String]
        }
    ],
    semesterThree: [
        {
            subject: String,
            
            playlists: [String],
            pyq: [String]
        }
    ],
    semesterFour: [
        {
            subject: String,
            
            playlists: [String],
            pyq: [String]
        }
    ],
    semesterFive: [
        {
            subject: String,
            
            playlists: [String],
            pyq: [String]
        }
    ],
    semesterSix: [
        {
            subject: String,
            
            playlists: [String],
            pyq: [String]
        }
    ],
    semesterSeven: [
        {
            subject: String,
            
            playlists: [String],
            pyq: [String]
        }
    ],
    semesterEight: [
        {
            subject: String,
            
            playlists: [String],
            pyq: [String]
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
