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
      console.log(response.data);
    })
  },[data]);
  return(
    <div className="dataContainer">
    {data.map((exam)=> <div>{exam.examId}    {exam.patientId}  {exam.age}   <img className='examImage' src={exam.imageURL}/> </div>)}
    </div> 
  );
}


const exams=[{id: 1, notes:'Christmas Carols.',image:"/images/img1.jpg"},
             {id: 2, notes:'Pots',image:"images/img2.jpg"},
             {id: 3, notes:'More Pots',image:"images/img3.jpg"},
             {id: 4, notes:'Christmas Critters',image:"images/img4.jpg"},
             {id: 5, notes:'New Years Penguins',image:"images/img5.jpg"},
             {id: 6, notes:'Tiger1',image:"images/img6.jpg"},
             {id: 7, notes:'Tiger2',image:"images/img7.jpg"},
             {id: 8, notes:'Tiger3',image:"images/img8.jpg"},
             {id: 9, notes:'Tiger4',image:"images/img9.jpg"},
             {id: 10, notes:'Tiger5',image:"images/img10.jpg"}];



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
    }}>

      Click count:{count} RGB values:( {color.o}, {color.tw}, {color.th} )
    </button>
   );
  }


function App() {
  const { response } = useApi();

  return (
    <div className="App">
      <header className="App-header">
        <ColorButton/>
        <Effect/>
        <p>
          {response}
        </p>
      </header>
    </div>
  );
}

export default App;
