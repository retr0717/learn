import React from "react";
import {connect} from 'react-redux';
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from './components/fcomponents/navbar/navbar';
import './App.css';
import Login from "./components/login/login";

const App = () => {

    const location = useLocation();

    return(
        <>
        <Navbar/>
        <Routes>
            <Route exact path="/login" element={<Login/>}/>
        </Routes>
        </>
    );
}


export default connect(null,null)(App);