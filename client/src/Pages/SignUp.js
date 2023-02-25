import { Link ,  useNavigate } from 'react-router-dom';
import Login from './Login';
import React from 'react';
import { useState}  from 'react';

function SignUpForm() {
   // const history = useHistory();
    const [details, setDetails] = useState({name:"", user:"", password:""});
    const navigate = useNavigate();
    const submitHandler = e => {
        e.preventDefault();
        console.log(details);
        const {name, user, password } = details;
        if(user != "" && password !="" && name !=""){
          fetch("http://localhost:9000/register",{
          method:"POST",
          crossDomain:true,
          headers:{
          "content-type":"application/json",
          Accept:"application/json",
          "Access-Control-Allow-Origin":"*",
          },
          body:JSON.stringify({
            name,
            user,
            password,
            }),
        })
         navigate("/");
         alert(`User Created! \n name:${name} \n user:${user} \n password:${password}`);
         }else{alert("fill all fields");}

        //Login(details);
    }
    return(

    <div className='container'>
    <h1 className="loginHeading">Sign Up</h1>
    <div className='loginDiv'>
      <div className='formDiv'>
          <form onSubmit={submitHandler} >
            <label htmlFor="name">
              Name:
            </label>
             <input type="text" name='name' id="name"value={details.name}
             onChange={e=>setDetails({...details,name:e.target.value})} />
            <label htmlFor="User">
              UserName:
            </label>
             <input type="text" name='user' id="user" value={details.user}
             onChange={e => setDetails({...details, user: e.target.value})}/>
            <label htmlFor='password'>Password: </label>
             <input type="password" name="password" id="password" value={details.password} 
             onChange={e => setDetails({...details, password: e.target.value})}/>
            <input  type='submit' value='Register'/>
            <p className='BTL'> <Link to={`/`}> Back to Login </Link></p>
          </form>
      </div>
    </div>
    </div>


    )
}

export default SignUpForm;

