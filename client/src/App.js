import './App.css';
import Home from './Home.js';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useApi } from './hooks/use-api';
import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import PatientPage from './PatientPage';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import './Pages/Login.css';
import axios from "axios";






function App() {
  //const [Authenticated, setAuthenticated] = useState(false);
  //const [username, setUsername]=useState("");
  const auth = localStorage.getItem('auth');
  const username = localStorage.getItem('username');
  console.log(username, auth);
  
  //const SetAuth= async (value1,value2)=>{
  //  console.log('using setAuth ',Authenticated, "setting username ",username);
  //  useEffect(()=>{
  //  localStorage.setItem("auth",JSON.stringify(Authenticated));
  //  localStorage.setItem("user",JSON.stringify(username));
  //  console.log("are we authenticated",Authenticated)
  //  console.log("the username is ",username)
  //},[Authenticated,username]);
  //}
  return (
        <>
          {auth !== null ? 
            <Home username={username} auth={auth} />  : 
            <Login username={username} auth={auth} /> 
          }
        </>
  );
}

export default App;
