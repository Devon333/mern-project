import React from 'react';
import { useState } from 'react';

function LoginForm({Login, error}) {
    const [details, setDetails] = useState({name:"", user:"", password:""});
    const submitHandler = e => {
        e.preventDefault();

        Login(details);
    }
    return(
        <form onSubmit={submitHandler}>
            <div className="form-inner">
                <h2>Login</h2>
                {/* Error Message */}
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" id="name" onChange={e => setDetails({...details, name: e.target.value})} value={details.name} />
                </div>
                <div className="form-group">
                    <label htmlFor="User">UserName: </label>
                    <input type="text" name="user" id="user" onChange={e => setDetails({...details, user: e.target.value})} value={details.user}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" id="password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
                </div>
                <input type="submit" value="LOGIN" />
            </div>
        </form>
    )
}

export default LoginForm;