import { Link, BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import App from '../App';
import Home from '../Home';
import React from 'react';
import { useState } from 'react';


const LoginForm=({username, setUsername, auth, setAuth})=> {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const submitHandler = async (e) => {
        e.preventDefault();

        let result = await fetch("http://localhost:9000/login",{
          method:"POST",
          crossDomain:true,
          headers:{
          "content-type":"application/json",
          Accept:"application/json",
          "Access-Control-Allow-Origin":"*",
          },
          body:JSON.stringify({
            user,
            password, 
            })
        })
          result = await result.json()
          console.warn(result,result.name);
          if(result.login){ 
            await setAuth(true,result.name);
            //return(<Route path="/home" element={<Home name="top"/>} />) 
            console.log(result);
            navigate(<Home username={username} auth={auth} />); 
        }else{alert("Please enter correct details")}
    }
    return(

    <div className='container'>
      <h1 className="loginHeading">Login Page</h1>
      <div className='loginDiv'>
        <div className='formDiv'>
            <form onSubmit={submitHandler}>
              <label htmlFor="User">
                UserName:
              </label>
               <input type="text" name='user' id="user" value={user}
               onChange={e => setUser( e.target.value)}/>
              <label htmlFor='password'>Password: </label>
               <input type="password" name="password" id="password" value={password} 
               onChange={e => setPassword( e.target.value)}/>
              <input  type='submit' value='Submit'/>
              <p className="BTL"><Link to="/register">Register New User</Link></p>
            </form>
         </div>
      </div>
    </div>


    )
}

export default LoginForm;
