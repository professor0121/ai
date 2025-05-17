import React from "react";
import {Route,Routes,BrowserRouter} from 'react-router-dom';
import Login from '../screens/login';
import Register from '../screens/register';
import Home from '../screens/home';
import Project from "../screens/project";
import UserAuth from "../auth/userAuth";
import Test from "../screens/test"

const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<UserAuth><Home/></UserAuth>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/project" element={<UserAuth><Project/></UserAuth>}/>
            <Route path="/test" element={<Test/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes