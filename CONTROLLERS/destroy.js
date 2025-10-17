const Department = require('../MODELS/departmentSchema.js');
const ExpressError = require('../UTILS/ExpressError.js');
const wrapAsync = require('../UTILS/wrapAsync.js');

module.exports.destroyPlaylist = async (req,res) => {
    if(!req.isAuthenticated()){
        req.flash("error","Please log in to start exploring Syllabite.");
        return res.redirect('/login');
    }
    let {deptId,semNum,courseId} = req.params;
    let {playlistLink} = req.body;

    const department = await Department.findById(deptId);
    const semesterData = department[semNum];

    for(let course of semesterData){
        if(course._id.toString() === courseId){
            course.playlists = course.playlists.filter(item => item.trim() !== playlistLink.trim());
            break;
        }
    }

    department.markModified(semNum);
    await department.save();

    req.flash('success','Playlist deleted successfully.');
    res.redirect(`/department/${deptId}`);
};

module.exports.destroyFile = async (req,res) => {
    if(!req.isAuthenticated()){
        req.flash("error","Please log in to start exploring Syllabite.");
        return res.redirect('/login');
    }
    let {deptId,semNum,courseId} = req.params;
    let {pdfLink} = req.body;

    const department = await Department.findById(deptId);
    const semesterData = department[semNum];

    for(let course of semesterData){
        if(course._id.toString() === courseId){
            course.pyq = course.pyq.filter(item => item.trim() !== pdfLink.trim());
            break;
        }
    }

    department.markModified(semNum);
    await department.save();

    req.flash('success','File deleted successfully.');
    res.redirect(`/department/${deptId}`);
};
