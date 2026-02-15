import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Welcome from "../src/components/WelcomePage";
import Login from "../src/components/Login";
import Register from "../src/components/Register";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route  path="/" element={<Welcome/>}/>
        <Route  path="/login" element={<Login/>}/>
        <Route  path="/register" element={<Register/>}/>
      </Routes>
    </BrowserRouter>


  );
}

export default App;
