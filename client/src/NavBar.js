import { BrowserRouter, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { useApi } from './hooks/use-api';
import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Home from './Home';


function NavBar() {
  const username = localStorage.getItem("username");
  const auth = localStorage.getItem("auth");
  const navigate = useNavigate();
  console.log("username:",username,"\n auth:",auth);
  const path = window.location.pathname;

  return(
      <><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link><div className="navBar">
          <a className="active" onClick={()=>{navigate("/home")}}>Home<i className="fa fa-fw fa-home"></i></a>
          <a onClick={()=>{navigate("/home");}}>Exams</a>
          <a href="./Pages/Login">Admin</a>
          <a onClick={()=>{localStorage.clear(); console.log("cleared localStorage"); navigate("/login")}}>Logout</a>
          {/*<div className="search-container">
            <form action="/action_page.php">
              <input type="text" placeholder="Search.." name = "search"></input>
              <button type="submit">Submit</button> 
            </form>
          </div>*/}
      </div></>      
  )
}
export default NavBar;
