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
  const [Authenticated, setAuthenticated] = useState(false);
  const [username, setUsername]=useState("");

  const SetAuth= async (value1,value2)=>{
    await setAuthenticated(value1);
    await setUsername(value2);
    console.log('using setAuth ',Authenticated, "setting username ",username);
    useEffect(()=>{
    localStorage.setItem("auth",JSON.stringify(Authenticated));
    localStorage.setItem("user",JSON.stringify(username));
    console.log("are we authenticated",Authenticated)
    console.log("the username is ",username)
  },[Authenticated,username]);
  }
  return (
        <>
          {Authenticated ? 
            <Home username={username} auth={Authenticated} />  : 
            <Login username={username} auth={Authenticated} setAuth={SetAuth} /> 
          }
        </>
  );
}

export default App;
