import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { Routes,Route } from 'react-router-dom'
import {Welcome} from "./pages/Welcome";
import { Registration} from  "./modules/registration/Registration"
import {Provider} from "react-redux";
import { createStore } from 'redux'

let userReducer =(state: {user:{id:number,login:string}}={user:{id:1,login:'durov'}},action:any)=>{
    console.log(state,action);
    return {...state}
}
 const store=createStore(userReducer);
function App() {
  return (
      <Provider store={store}>
      <Routes>
        <Route path="/" element={<Welcome/>} />
        <Route path="/registration" element={<Registration/>}/>

      </Routes>
      </Provider>
  );
}

export default App;
