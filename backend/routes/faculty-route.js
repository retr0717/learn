const express = require('express');
const {Faculty, Course} = require('../model/faculty-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require("fs/promises");
const fsm = require("fs");
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// Set up Multer for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'assets/videos/');
    },
    filename: function (req, file, cb) {
      // Generate a unique filename using UUID
      const uniqueFilename = uuidv4() + path.extname(file.originalname);
      cb(null, uniqueFilename);
    }
  });
  
const upload = multer({ storage: storage });

router.delete('/delete',async (req,res) => {

    try {
        // Check if the course exists
        const course = await Course.findById(req.body.id);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        // Delete the course
        await Course.findByIdAndDelete(req.body.id);
        
        res.json({ message: 'Course deleted successfully' });
    } catch (error) {
        console.error('Error deleting course:', error);
        res.status(500).json({ error: 'Internal server error' });
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
router.post('/add',upload.single('video'),(req,res) => {
   try
   { 
    console.log("form data : ",req.body.data);
        Course.create(req.body.data).then(response => {
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

    console.log("req body login : ",req.body);

    const user = await Faculty.findOne({email:req.body.email});

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

module.exports = router;