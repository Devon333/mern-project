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
import NavBar from "./NavBar";




function Effect(){
  const [data,setData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [newExam , setNewExam] = useState(false);
  const [examData, setExamData] = useState({}); 
  useEffect(() =>{
  axios
    .get(process.env.REACT_APP_BACKEND_URL+"/exams")
    /*.get("https://czi-covid-lypkrzry4q-uc.a.run.app/api/exams")*/
    .then((response)=>{
      if(data !== response.data){
        setData(response.data);
      }
      })
  },[]); 


function saveExam(e){
  e.preventDefault()
  if(Object.keys(examData).length <4){
    //console.log(Object.keys(examData).length);
    alert(`fill in atleast 4 fields`);
  }else{
    fetch(process.env.REACT_APP_BACKEND_URL+"/patient/insertExam",{
          method:"POST",
          crossDomain:true,
          headers:{
          "content-type":"application/json",
          Accept:"application/json",
          "Access-Control-Allow-Origin":"*",
          },
            body: JSON.stringify(examData),
          })
      
      setExamData({});
      setNewExam(false);
      console.log(examData);
      alert("Data sent to the api")
      window.location.href = `/`;
    }
}
  
  const searchItems = (e) => { 
    setSearchInput(e.target.value)
    if (searchInput !== '') {
        const filteredData = data.filter((exam) => {
            return Object.values(exam).join('').toLowerCase().includes(searchInput.toLowerCase())
        })
        setFilteredResults(filteredData)
    }
    else{
        setFilteredResults(data)
    }
    
}

  const NewExamButton=()=>{return(
          <button className="newExamButton" 
                  onClick={e=>{setNewExam(!newExam)}}> 
                  New Exam
          </button>)}
  return(
    <div>
      <div className="search">
        <input classname="searchField" type="text" placeholder="Search.." value={searchInput} onChange={(e)=> searchItems(e)} title="Type in parameters"></input>
      </div>
      <table id='examTable'>
        <tr>
          <th>Patient ID</th>
          <th>Exam ID</th>
          <th>Image</th>
          <th>Key Findings</th>
          <th>ICU Admit</th>
          <th>Age</th>
          <th>Sex</th>
          <th>BMI</th>
          <th>Zip Code</th>
          {localStorage.getItem("isAdmin") ? <th><NewExamButton /> </th> : (null)}
          {/*<th><button className="newExamButton" onClick={e=>{setNewExam(!newExam)}}>New Exam</button></th>*/}
        </tr>
        { newExam ?( <tr>
          <td><input type="text" value={examData["PATIENT_ID"]} 
               onChange={e=>{e.preventDefault() ;console.log(examData);setExamData({...examData,"PATIENT_ID":e.target.value})}} 
               placeholder="Patient ID"></input>
          </td>
          <td><input type="text" value={examData["exam_Id"]}
               onChange={e=>{console.log(examData);setExamData({...examData,"exam_Id":e.target.value})}} 
               placeholder="Exam ID"></input>
          </td>
          <td><input type="file" value={examData["png_filename"]}
               onChange={e=>{console.log(examData);setExamData({...examData,"png_filename":e.target.value})}} 
               placeholder="File url"></input>
          </td>
          <td><input type="text" value={examData["KEY_FINDINGS"]}
               onChange={e=>{console.log(examData);setExamData({...examData,"KEY_FINDINGS":e.target.value})}}
               placeholder="Key Findings"></input>
          </td>
          <td><input type="text" value={examData["ICU Admit"]}
               onChange={e=>{console.log(examData);setExamData({...examData,"ICU Admit":e.target.value})}}
               placeholder="ICU Admit"></input>
          </td>
          <td><input type="text" value={examData["AGE"]}
               onChange={e=>{console.log(examData);setExamData({...examData,"AGE":e.target.value})}} 
               placeholder="Age"></input>
          </td>
          <td><input type="text" value={examData["SEX"]}
               onChange={e=>{console.log(examData);setExamData({...examData,"SEX":e.target.value})}} 
               placeholder="Sex"></input>
          </td>
          <td><input type="text" value={examData["LATEST_BMI"]}
               onChange={e=>{console.log(examData);setExamData({...examData,"LATEST_BMI":e.target.value})}}
               placeholder="BMI"></input>
          </td>
          <td><input type="text" value={examData["ZIP"]}
               onChange={e=>{console.log(examData);setExamData({...examData,"ZIP":e.target.value})}}
               placeholder="Zip Code"></input> 
          </td>
          <td><button onClick={saveExam} className="saveExamButton">Save</button></td>
        </tr> )
 : (null)}
        {/* If search term's length is greater than 1, filtered data will show. Otherwise, all data shown*/}
        {searchInput.length > 1 ? 
          (filteredResults.map((exam) => {
            return(
              <tr>
                {/* Create a link to the patient's information page with the patientId passed in as a parameter in the URL */}
                <td>{localStorage.getItem("isAdmin") ?
                     <Link to={`/admin/patient/${exam.patientId}`} >{exam.patientId}</Link>: 
                     <Link to={`/patient/${exam.patientId}`} >{exam.patientId}</Link> }</td>
                <td>{exam.examId}</td> 
                <td><img className = 'examImage' src={exam.filename} alt = {exam.keyFindings}/></td>
                <td>{exam.keyFindings}</td>
                <td>{exam['ICU Admit']}</td>
                <td>{exam.age}</td>
                <td>{exam.sex}</td>
                <td>{exam["LATEST_BMI"]}</td>
                <td>{exam.zip}</td>
              </tr>
              
              )})
          ) : (
          data.map((exam) => {
            return(
              
              <tr>
                {/* Create a link to the patient's information page with the patientId passed in as a parameter in the URL */}
                <td>{localStorage.getItem("isAdmin") ?
                     <Link to={`/admin/patient/${exam.patientId}`} >{exam.patientId}</Link>: 
                     <Link to={`/patient/${exam.patientId}`} >{exam.patientId}</Link> }</td>
                <td>{exam.examId}</td>
                <td><img className = 'examImage' src={exam.filename} alt = {exam.keyFindings}/></td>
                <td>{exam.keyFindings}</td>
                <td>{exam['ICU Admit']}</td>
                <td>{exam.age}</td>
                <td>{exam.sex}</td>
                <td>{exam["LATEST_BMI"]}</td>
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

//function NavBar() {
//  const path = window.location.pathname;
//  return(
//      <><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/><div className="navBar">
//          <a className="active" href="/"><i className="fa fa-fw fa-home"></i>Home</a>
//          <a href="/Exams">Exams</a>
//          <a href="./Pages/Login">Admin</a>
//      </div></>
//      
//  )
//
//  function  CustomLink({href, children}) {
//    return (
//      <li>
//        <a href="/login">{children}</a>
//      </li>
//    )
//  }
//}

function Admin(){
  // create admin privilages such as adding new exams, deleting exams, and editing exams
  return(
    <div>
      <h1>Welcome to  Page</h1>
    </div>
  );
 }

function Home(){
const username=localStorage.getItem('username');
const auth = localStorage.getItem('auth');
const admin = localStorage.getItem("isAdmin");
console.log("username:",username,"\n auth:",auth);
if(auth !==null ){
return(
    <div className="App">
      <header>
        <NavBar/>
      </header>
      <body>
          <h1>Welcome {username}</h1>  
          <Effect/>
      </body>
    </div>
  
  )
}
else{<Login/>}
}

export default Home;
