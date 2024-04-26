const express = require('express');
const {Faculty, Course} = require('../model/faculty-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require("fs/promises");
const fsm = require("fs");

const router = express.Router();

router.put('/edit-course',(req, res) => {
    
})

router.delete('/delete-course',async (req,res) => {

    console.log("course id : ",req.body.id);

    try {
       

        // Send a success response
        res.status(200).json({
            success : true,
            message : "success"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

//edit course
router.put('/edit', async (req, res) => {
    try {
        // Find the document by its ID and update it
        const updatedCourse = await Course.findOneAndUpdate(
            { _id: req.body.id }, // Filter by ID
            { $set: req.body }, // Update with new data
            { new: true } // Return the updated document
        );

        if (!updatedCourse) {
            return res.status(404).json({ error: 'Course not found' });
        }

        // Respond with the updated document
        res.json(updatedCourse);
    } catch (error) {
        console.error('Error updating course:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//add course route
router.post('/add',(req,res) => {
   try
   { 
        Course.create(req.body).then(response => {
            res.status(200).json({
                success : true,
                message : "success",
                course : response
            });        
        })
    }
    catch(err)
    {
        console.log("error occured!",err);
    }
});

//Signup Method
router.post('/signup', async (req, res) => {

    //console.log(req.body);

    const isStudent = await Faculty.findOne({username : req.body.username});

    console.log(isStudent);

    if(isStudent === null)
    {
        req.body.password = await bcrypt.hash(req.body.password,10);

        Faculty.create(req.body).then(response => {

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

//Login Post Method
router.post('/login', async (req, res) => {

    const user = await Faculty.findOne({username:req.body.username});

    console.log(user);
    if(user)
    {
        bcrypt.compare(req.body.password,user.password,(err,result) => {

            if(result)
            {
                //  // Create token
                //  const token = jwt.sign(
                //     { user_id: user._id, username:req.body.username },
                //     process.env.TOKEN_KEY,
                //     {
                //       expiresIn: "2h",
                //     }
                //   );

                // // save user token
                // user.token = token;
                const userInfo = {
                    id : user._id,
                    username : user.username
                }

                res.status(200).json({
                    success : true,
                    message : "success",
                    Faculty : userInfo
                });
            }
            else
            {
                res.status(401).json({
                    success : false,
                    message : "Invalid Credentials"
                });
            }
        })
    }
    else
    {
        res.status(401).json({
            success : false,
            message : "Invalid Credentials"
        });
    }
});

//PUT Method.
router.put('/update-user',(req,res) => {

    res.send({
        type:'PUT'
    });
});


module.exports = router;