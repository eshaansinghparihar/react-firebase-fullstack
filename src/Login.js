import React, { useState } from "react";
import logo from './assets/logo.png';
import './Login.css'
import {Link} from 'react-router-dom'
function Login(){
const [email, setEmail]=useState("")
const [password, setPassword]=useState("")
const [error,setError]=useState("")

function emailChangeHandler(event){
setEmail(event.target.value)
}
function passwordChangeHandler(event){
    setPassword(event.target.value)
}
function handleSubmit(){

}
return(
        <div className="form">
        <img src={logo} className="logo"/>
        <h2>Sign In</h2>
        <h4>Continue to Calorie Tracker</h4>   
        <input type="email" name="email" placeholder="Email" value={email} onChange={emailChangeHandler}/>
        <input type="password" name="Password" placeholder="Password" value={password} onChange={passwordChangeHandler}/>
        {error && <p className="error">{error}</p>}
        <button className="login" onClick={handleSubmit}>Sign in</button>
        <Link to="/signup">
        {"Create Account"}
        </Link>
        </div>
)
}
export default Login;