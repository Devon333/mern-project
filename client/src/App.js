import './App.css';
import Login from './Pages/Login'
import { useApi } from './hooks/use-api';
import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import LoginForm from './Pages/Login';
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
  const path = window.location.pathname;
  return(
      <><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link><div class="navBar">
          <a class="active" href="#home"><i class="fa fa-fw fa-home"></i>Home</a>
          <a href="#Exams">Exams</a>
          <a href="./Pages/Login">Admin</a>
          <div class="search-container">
            <form action="/action_page.php">
              <input type="text" placeholder="Search.." name = "search"></input>
              <button type="submit">Submit</button> 
            </form>
          </div>
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
      <h1>Admin Page</h1>
    </div>
  );



}

function App() {
  const { response } = useApi(); 
  const adminUser ={
    user: "admin",
    password: "password"
  }
  
  const [user, setUser] = useState({name:"", user:""});
  const [error, setError] = useState("");

  const Login = details =>{
    console.log(details);

    if (details.user == adminUser.user && details.password == adminUser.password){
      console.log("Logged in");
      setUser({
        name: details.name,
        user: details.user
      });
    }else{
      console.log("Details do not match!");
      setError("Details do not match!");
    }
  }

  const Logout = () =>{
    setUser({name:"", user:""});
  }
  return (
    <div className="App">
      {(user.user !== "") ? (
        <div className="welcome">
          <h2>Welcome, <span>{user.name}</span></h2>
          <button onClick={Logout}>Logout</button>
        </div>
      ) : (
        <LoginForm Login={Login} error={error}/>
      )}
      <header className="App-header">
        <NavBar/>
        <p>
          <Admin/>
        </p>       
        <p>
          <Effect/>
        </p>
        <p>
          {response}
        </p>
      </header>
    </div>
    
  );
}

export default App;
