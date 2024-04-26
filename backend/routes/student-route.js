const express = require('express');
const router = express.Router();
const {Student} = require('../model/student-model');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const path = require('path');

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

    console.log(req.body);

    const student = await Student.findOne({username:req.body.username});

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
                    Studentname : student.username,
                    email : student.email
                }
                res.status(200).json({
                    success:true,
                    Student : StudentData,
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

//Get Method to get four random images.
router.get('/get-products',async (req, res,next) => {

    let products = await StudentHelper.randomItems();
    console.log(__dirname);

   res.send({products});

});

//PUT Method.
router.put('/update-Student',(req,res) => {

    res.send({
        type:'PUT'
    });
});

//DELETE METHOD.
router.delete('/delete-Student',(req,res) => {
    res.send({
        type:'DELETE'
    })
});

module.exports = router;