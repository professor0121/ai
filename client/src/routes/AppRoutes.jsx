import React from "react";
import {Route,Routes,BrowserRouter} from 'react-router-dom';
import Login from '../screens/login';
import Register from '../screens/register';
import Home from '../screens/home';
import Project from "../screens/project"

const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/project" element={<Project/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes