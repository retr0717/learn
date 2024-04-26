const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CoursePathSchema = new Schema({
    topic : {
        type: String
    },
    no : {
        type : String
    },
    status : {
        type : String,
        default : "false"
    }
})

const CourseMap = new Schema({
    course_name : {
        type:String,
    },
    details : {
        type : [CoursePathSchema]
    }
})

const StudentSchema = new Schema({
    name: {
        type: String,
        required:[true,'Name field is required']
    },
    username: {
        type: String,
        required: [true, 'username field is required']
    },
    email: {
        type: String,
        required: [true, 'Email field is required']
    },
    password:{
        type: String,
        required: [true, 'password field is required']
    },
    adm_no:{
        type : String,
        required : [true, 'Admission no is required']
    },
    year:{
        type:String,
        required : [true, 'year of study is required']
    },
    points : {
        type:String,
        default : "0"
    },
    ph_no : {
        type: String,
        required : [true, 'phone no of is required']
    }
    ,
    courses : {
        type : [CourseMap]
    }
    ,
    date : {
        type: Date,
        default : Date.now
    }
});

const FacultySchema = new Schema({
    username : {
        type:String,
        required: [true, 'username field is required']
    },
    password:{
        type: String,
        required: [true, 'password field is required']
    }
    }
    );

const Student = mongoose.model('students',StudentSchema);

module.exports = {
    Student
};