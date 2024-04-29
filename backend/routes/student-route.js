const express = require('express');
const router = express.Router();
const {Student} = require('../model/student-model');
const {Course} = require('../model/faculty-model');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const path = require('path');

router.get('/courses', async (req, res) => {
    try {
        // Fetch all courses from the Course collection
        const courses = await Course.find();

        console.log("courses : ",courses);

        res.status(200).json({
            success : true,
            message : "success",
            courses : courses
        });

    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ error: 'Internal server error' }); // Send error response if an error occurs
    }
});

//Signup Method
router.post('/signup', async (req, res) => {

    //console.log(req.body);

    const isStudent = await Student.findOne({username : req.body.username});

    console.log(isStudent);

    if(isStudent === null)
    {
        req.body.password = await bcrypt.hash(req.body.password,10);

        Student.create(req.body).then(response => {

            const Student = {
                id : response._id,
                name : response.name,
                email : response.email,
                adm_no : response.adm_no
            }

            res.status(200).json({
                success : true,
                message : "success",
                Student : Student
            });

        }).catch(err => {
            console.log(err.message);
        });
    }
    else
    {
        res.status(401).json(
            {
                success : false,
                message : "Student already exists"
            }
        )
    }

});

//Login Method
router.post('/login',async (req,res) => {

    console.log("student login request : ", req.body);

    const student = await Student.findOne({email:req.body.email});

    console.log("Student : ",student);
    if(student !== null)
    {
        bcrypt.compare(req.body.password,student.password,(err,result) => {

            if(result)
            {
                 // Create token
                // const token = jwt.sign(
                //     { Student_id: Student._id, email },
                //     process.env.TOKEN_KEY,
                //     {
                //       expiresIn: "2h",
                //     }
                //   );

                // // save Student token
                // Student.token = token;
                const StudentData = {
                    username : student.username,
                    email : student.email,
                    adm_no : student.adm_no,
                    points : student.points,
                    ph_no : student.ph_no,
                    id : student._id
                }

                console.log("student data from db : ", StudentData);

                res.status(200).json({
                    success:true,
                    student : StudentData,
                    message : "login successful"
                });
            }
            else{
                res.status(401).json({
                    success : false,
                    message : "invalid credentials"
                });
            }
        })
    }
    else{
        res.status(401).json({
            success : false,
            message : "invalid credentials"
        });
    }

})

module.exports = router;