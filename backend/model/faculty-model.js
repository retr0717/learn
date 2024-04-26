const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OptSchema = new Schema({
    opt : String,
    answer : {
        type : String,
        default : "false"
    }
})

const McqSchema = new Schema({
    question : String,
    options : [OptSchema]
})

const TopicSchema = new Schema({
    no : {
        type : String,
        required : [true, 'topic no required']
    },
    name : {
        type : String,
    },
    videoid : String,
    mcq  : [McqSchema]
})

const CourseSchema = new Schema({
    fid:{
        type:String,
        required: [true, 'faculty id required']
    },
    cname : {
        type : String,
        required : [true, 'course name'],
    },
    scode : {
        type : String,
        required : [true,'subject code required']
    },
    year : {
        type : String,
        required : [true,'year of study required']
    },
    topics : [TopicSchema]
})

const FacultySchema = new Schema({
    fid : {
        type : String,
        required : [true,'faculty id required']
    },
    username : {
        type:String,
        required: [true, 'username field is required']
    },
    password:{
        type: String,
        required: [true, 'password field is required']
    },
    courses : [String],
    dept : {
        type : String,
        required : [true,'Department required']
    },
    email : {
        type : String,
        required : [true, 'Email required']
    },
    ph_no : {
        type : String,
        required : [true,'Phone no Required']
    }
});

const Faculty = mongoose.model('faculties',FacultySchema);
const Course = mongoose.model('courses',CourseSchema);

module.exports = {
    Faculty,
    Course
};