import React from "react";
import {connect} from 'react-redux';
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from './components/fcomponents/navbar/navbar';
import './App.css';
import Login from "./components/login/login";
import FacultyHomePage from "./components/fcomponents/home/home";
import TopicsComponent from "./components/fcomponents/topics/topics";
import VideoComponent from "./components/fcomponents/video/video";
import AddCourseComponent from "./components/fcomponents/add/add";
import EditComponent from "./components/fcomponents/edit/edit";

const App = () => {

    const location = useLocation();

    return(
        <>
        <Navbar/>
        <Routes>
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/faculty" element={<FacultyHomePage/>} />
            <Route exact path="/topics" element={<TopicsComponent/>} />
            <Route exact path="/video" element={<VideoComponent/>} />
            <Route exact path="/faculty/add" element={<AddCourseComponent/>} />
            <Route exact path="/faculty/edit" element={<EditComponent/>} />
        </Routes>
        </>
    );
}


export default connect(null,null)(App);