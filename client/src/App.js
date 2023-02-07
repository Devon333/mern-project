import './App.css';

import { useApi } from './hooks/use-api';
import {useState} from 'react';


const exams2=[{id: 1, notes:'Christmas Carols.',image:"/images/img1.jpg"},
              {id: 2, notes:'Pots',image:"images/img2.jpg"},
              {id: 3, notes:'More Pots',image:"images/img3.jpg"}];

const exams=[{id: 1, notes:'Christmas Carols.',image:"/images/img1.jpg"},
             {id: 2, notes:'Pots',image:"images/img2.jpg"},
             {id: 3, notes:'More Pots',image:"images/img3.jpg"},
             {id: 4, notes:'Christmas Critters',image:"images/img4.jpg"},
             {id: 5, notes:'New Years Penguins',image:"images/img5.jpg"},
             {id: 6, notes:'Tiger1',image:"images/img6.jpg"},
             {id: 7, notes:'Tiger2',image:"images/img7.jpg"},
             {id: 8, notes:'Tiger3',image:"images/img8.jpg"},
             {id: 9, notes:'Tiger4',image:"images/img9.jpg"},
             {id: 10, notes:'Tiger5',image:"images/img11.jpg"}];

            


function ExamTable(){
  return(
    <ul className='exams'>
      { exams.map(exam => <li key={exam.id}> {exam.notes} <img className='examImage' src={exam.image}/></li> )}
    </ul>

    );
  }
  
  function ExamTable2(){
    return(
      <ul className='exams'>
        { exams2.map(exam => <li key={exam.id}> {exam.notes} <img className='examImage' src={exam.image}/></li> )}
      </ul>
    );
  }

function ImageSwitcher(){
  const [active, setActive] = useState(false); // sets the initial state of the button
  const [image, setImage] = useState({image1:"images/img1.jpg",image2:"images/img2.jpg"});  // sets the initial state of the image
  function handleClick(){
    setActive(!active);
    setImage({image1:"images/img"+Math.floor(Math.random()*10)+".jpg",image2:"images/img"+Math.floor(Math.random()*10)+".jpg"}) // sets image to a random image
  }
  return(
    <button className='imageSwitcher' onClick={handleClick}>
      <img className='examImage' src={active ? image.image1 : image.image2}/>
    </button> // if active is true, show image1, else show image2
    );
  }


  function ExamTableToggle(){
    const [active, setActive] = useState(false);
    function handleClick(){
      setActive(!active);
    }
    return(
      <button className='examTableToggle' onClick={handleClick}>
        {active ? 'Table 1' : 'Table 2'}
        {active ? <ExamTable/> : <ExamTable2/>}
      </button>
      );
    }

  


function App() {
  const { response } = useApi();

  return (
    <div className="App">
      <header className="App-header">
        <ExamTableToggle/>
        <p>
        </p>
        <ImageSwitcher/>

        <p>
          {response}
        </p>
      </header>
    </div>
  );
}

export default App;
