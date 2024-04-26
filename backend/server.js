const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const studentRoute = require('./routes/student-route');
const facultyRoute = require('./routes/faculty-route');
require("dotenv").config();

//use
const app = express();

const username = encodeURIComponent(process.env.DB_USERNAME);
const password = encodeURIComponent(process.env.DB_PASSWORD);

//connect mongodb
mongoose.connect(`mongodb+srv://${username}:${password}@mine.np9tgq2.mongodb.net/learn?retryWrites=true&w=majority&appName=mine`,
     {})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error occured:', error);
  });

mongoose.Promise = global.Promise;

//static files
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//route
app.use('/api/student',studentRoute);
app.use('/api/faculty',facultyRoute)

// error handling middleware
app.use(function(err,req,res,next){
    //console.log(err);
    res.status(422).send({error: err});
});

app.listen(5000, () => {
    console.log(`Server Started at ${5000}`)
})