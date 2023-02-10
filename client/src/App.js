import './App.css';

import { useApi } from './hooks/use-api';
import {useState, useEffect} from 'react';
import axios from "axios";

function Effect(){
  const [data,setData] = useState([]);

  useEffect(() =>{
  axios
    .get("https://czi-covid-lypkrzry4q-uc.a.run.app/api/exams")
    .then((response)=>{
      if(data !== response.data){
        setData(response.data.exams);
      }
      })
  },[]);
  return(
    <div className= "dataContainer">
      <table border = '1'>
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
        </tr>
        {data.map((exam) => 
          <tr>
            <td>{exam.patientId}</td>
            <td>{exam.examId}</td>
            <td><img className = 'examImage' src={exam.imageURL} alt = {exam.keyFindings}/></td>
            <td>{exam.keyFindings}</td>
            <td>{exam.brixiaScores}</td>
            <td>{exam.age}</td>
            <td>{exam.sex}</td>
            <td>{exam.bmi}</td>
            <td>{exam.zipCode}</td>
          </tr>)
        }
      </table>
    </div>
  );
}

function ColorButton(){
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(false);
  const [color, setColor] = useState({o:250,tw:0,th:250});

  function handleClick(){
    setCount(count+1);
    setActive(!active);
    setColor({o:Math.floor(Math.random()*250),tw:Math.floor(Math.random()*250),th:Math.floor(Math.random()*250)})    
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
  return(
      <><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link><div class="navBar">
          <a class="active" href="#home"><i class="fa fa-fw fa-home"></i>Home</a>
          <a href="#Exams">Exams</a>
          <a href="#Admin">Admin</a>
          <div class="search-container">
            <form action="/action_page.php">
              <input type="text" placeholder="Search.." name = "search"></input>
              <button type="submit">Submit</button> 
            </form>
          </div>
      </div></>
  )
}

function App() {
  const { response } = useApi(); 

  return (
    <div className="App">
      <header className="App-header">
        <NavBar/>       
        <p>
          <Effect/>
        </p>
        <p>
          <ColorButton/>
        </p>
        <p>
          {response}
        </p>
      </header>
    </div>
  );
}

export default App;