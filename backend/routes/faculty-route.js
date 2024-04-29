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

router.get('/courses/:fid', async (req, res) => {

    const fid = req.params.fid;
  
    try {
      // Find all courses with the specified teacher ID
      const courses = await Course.find({ fid });
  
      if (!courses) {
        return res.status(404).json({ message: 'No courses found for the specified teacher ID' });
      }
  
      res.status(200).json({
                success : true,
                message : "success",
                courses : courses
            });  

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

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

    console.log("edit route : ",req.body);
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
        
      res.status(200).json({
        success : true,
        message : "success"
    });  

    } catch (error) {
        console.error('Error updating course:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Set up Multer for handling file uploads
// Set up Multer for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'assets/videos/');
    },
    filename: function (req, file, cb) {
        // Generate a unique filename using UUID
        const videoId = uuidv4();
        const uniqueFilename = videoId + path.extname(file.originalname);
        cb(null, uniqueFilename);
    }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('video'), (req, res) => {
    try {
        // Extract uploaded video file
        const videoFile = req.file;

        // Generate a unique ID for the video file
        const videoId = path.basename(videoFile.filename, path.extname(videoFile.filename));

        // Send the unique video ID as part of the server response
        res.status(200).json({
            success: true,
            message: 'Video uploaded successfully',
            videoId: videoId
        });
    } catch (error) {
        console.error('Error uploading video:', error);
        res.status(500).json({
            success: false,
            message: 'Error uploading video'
        });
    }
});

module.exports = router;

//add course route
router.post('/add',async (req,res) => {

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
                    username : user.username,
                    fid : user.fid,
                    dept : user.dept,
                    email : user.email,
                    ph_no : user.ph_no
                }

                res.status(200).json({
                    success : true,
                    message : "success",
                    faculty : userInfo
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