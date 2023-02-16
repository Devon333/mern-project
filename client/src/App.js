import './App.css';

import { useApi } from './hooks/use-api';
import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

function Effect(){
  const [data,setData] = useState([]);
  
  useEffect(() =>{
  axios
    .get("http://127.0.0.1:9000/exams")
    /*.get("https://czi-covid-lypkrzry4q-uc.a.run.app/api/exams")*/
    .then((response)=>{
      if(data !== response.data){
        console.log(response.data);
        setData(response.data);
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

function Admin(){
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  function handleSubmit(event){
    event.preventDefault();
    if(password === "password"){
      setIsCorrect(true);
    }else{
      setMessage("Incorrect password");
    }
  }

  function handleChange(event){
    setPassword(event.target.value);
  }

  return(
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Password:
          <input type="password" value={password} onChange={handleChange}/>
        </label>
        <input type="submit" value="Submit"/>
      </form>
      <p>{message}</p>
      {isCorrect && <p>Correct password</p>}
    </div>
  );

  
}

function App() {
  const { response } = useApi(); 

  return (
    <div className="App">
      <header className="App-header">
        <NavBar/>
        <p>
          <Admin/>
        </p>       
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
