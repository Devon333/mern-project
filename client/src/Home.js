import './App.css';
import { BrowserRouter, Route, Routes, Navigate, useParams } from 'react-router-dom';
import { useApi } from './hooks/use-api';
import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import PatientPage from './PatientPage';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import './Pages/Login.css';
import axios from "axios";
import LoginForm from './Pages/Login';


function Effect(){
  const [data,setData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [newExam , setNewExam] = useState(false);
  
  useEffect(() =>{
  axios
    .get("http://127.0.0.1:9000/exams")
    /*.get("https://czi-covid-lypkrzry4q-uc.a.run.app/api/exams")*/
    .then((response)=>{
      if(data !== response.data){
        setData(response.data);
      }
      })
  },[]); 
  
  const searchItems = (searchValue) => { 
    setSearchInput(searchValue)
    if (searchInput !== '') {
        const filteredData = data.filter((exam) => {
            return Object.values(exam).join('').toLowerCase().includes(searchInput.toLowerCase())
        })
        setFilteredResults(filteredData)
    }
    else{
        setFilteredResults(data)
    }
    function Clicked() {
      setNewExam(!newExam);
    }
    
}
  return(
    <div className= "dataContainer">
      <div>
        <input id="searchField" type="text" placeholder="Search.." onChange={(e)=> searchItems(e.target.value)} title="Type in parameters"></input>
      </div>
      <table id='examTable' border = '1'>
        <tr>
          <th>Patient ID</th>
          <th>Exam ID</th>
          <th>Image</th>
          <th>Key Findings</th>
          <th>Brixia Score</th>
          <th>Age</th>
          <th>Sex</th>
          <th>BMI</th>
          <th>Zip Code</th>
          <th><button className="newExamButton" onClick={Clicked}>New Exam</button></th>
        </tr>
        { newExam  ?
        (
          <tr>
          <td><input type="text" placeholder="Patient ID"></input></td>
          <td><input type="text" placeholder="Exam ID"></input></td>
          <td><input type="file" placeholder=""></input></td>
          <td><input type="text" placeholder="Key Findings"></input></td>
          <td><input type="text" placeholder="Brixia Score"></input></td>
          <td><input type="text" placeholder="Age"></input></td>
          <td><input type="text" placeholder="Sex"></input></td>
          <td><input type="text" placeholder="BMI"></input></td>
          <td><input type="text" placeholder="Zip Code"></input></td>
          <td><button className="saveExamButton">Save</button></td>
        </tr>) : (null)}
        {/* If search term's length is greater than 1, filtered data will show. Otherwise, all data shown*/}
        {searchInput.length > 1 ? 
          (filteredResults.map((exam) => {
            return(
              <tr>
                {/* Create a link to the patient's information page with the patientId passed in as a parameter in the URL */}
                <td><Link to={`/patient/${exam.patientId}`}>{exam.patientId}</Link></td>
                <td>{exam.examId}</td>
                <td><img className = 'examImage' src={exam.filename} alt = {exam.keyFindings}/></td>
                <td>{exam.keyFindings}</td>
                <td>{exam.brixiaScores}</td>
                <td>{exam.age}</td>
                <td>{exam.sex}</td>
                <td>{exam["latest bmi"]}</td>
                <td>{exam.zip}</td>
              </tr>
              
              )})
          ) : (
          data.map((exam) => {
            return(
              
              <tr>
                {/* Create a link to the patient's information page with the patientId passed in as a parameter in the URL */}
                <td><Link to={`/patient/${exam.patientId}`}>{exam.patientId}</Link></td>
                <td>{exam.examId}</td>
                <td><img className = 'examImage' src={exam.filename} alt = {exam.keyFindings}/></td>
                <td>{exam.keyFindings}</td>
                <td>{exam.brixiaScores}</td>
                <td>{exam.age}</td>
                <td>{exam.sex}</td>
                <td>{exam["latest bmi"]}</td>
                <td>{exam.zip}</td>
                <tr>
                </tr>
              </tr>
              )})
          )}
          {/* when */}
      </table>
    </div>
  );
}




function ColorButton(){
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(false);
  const [color, setColor] = useState({o:250,tw:0,th:250});

  function handleClick(){
    setActive(!active);
    //setImage({image1:"images/img"+Math.floor(Math.random()*10)+".jpg",image2:"images/img"+Math.floor(Math.random()*10)+".jpg"}) // sets image to a random image
  }
  return(
    <button className='colorButton' onClick={handleClick}
    style={{  
      backgroundColor: "rgb("+color.o+","+color.tw+","+color.th+")"
    }}

    >
      Click count:{count} RGB values:( {color.o}, {color.tw}, {color.th} )
    </button>
  );
}

function NavBar() {
  const path = window.location.pathname;
  return(
      <><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link><div className="navBar">
          <a className="active" href="#home"><i className="fa fa-fw fa-home"></i>Home</a>
          <a href="#Exams">Exams</a>
          <a href="./Pages/Login">Admin</a>
          {/*<div className="search-container">
            <form action="/action_page.php">
              <input type="text" placeholder="Search.." name = "search"></input>
              <button type="submit">Submit</button> 
            </form>
          </div>*/}
      </div></>
      
  )

  function  CustomLink({href, children}) {
    return (
      <li>
        <a href="/login">{children}</a>
      </li>
    )
  }
}

function Admin(){
  // create admin privilages such as adding new exams, deleting exams, and editing exams
  return(
    <div>
      <h1>Welcome to  Page</h1>
    </div>
  );



}

function Home({username,auth}){
console.log("username:",username,"\n auth:",auth);
if(auth){
return(
    <div className="App">
      <header className="App-header">
        <NavBar/>
        <p>
        <div>
          <h1>Welcome {username}</h1>
        </div>
          
        </p>       
        <p>
          <Effect/>
        </p>
      </header>
    </div>
  
  )
}
else{<Login/>}
}

export default Home;
