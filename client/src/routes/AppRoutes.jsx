import React from "react";
import {Route,Routes,BrowserRouter} from 'react-router-dom';

const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<>home</>}/>
            <Route path="/login" element={<>login</>}/>
            <Route path="/register" element={<>register</>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes