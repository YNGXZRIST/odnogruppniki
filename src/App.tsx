import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { Routes,Route } from 'react-router-dom'
import {Welcome} from "./pages/Welcome";
import { Registration} from  "./modules/registration/Registration"


function App() {
  return (
      <Routes>
        <Route path="/" element={<Welcome/>} />
        <Route path="/registration" element={<Registration/>}/>

      </Routes>
  );
}

export default App;
