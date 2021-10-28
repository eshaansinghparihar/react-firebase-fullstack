import React ,{useState} from 'react'
import { Link } from 'react-router-dom';
import './Login.css';
import logo from './assets/logo.png';
import {initializeApp} from 'firebase/app'
import firebaseConfig from './config';
import { createUserWithEmailAndPassword , getAuth} from '@firebase/auth';
import { getFirestore ,doc, setDoc} from "firebase/firestore";

function Signup(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    function emailChangeHandler(event){
    setEmail(event.target.value)
    }
    function nameChangeHandler(event){
    setName(event.target.value)
    }
    function passwordChangeHandler(event){
    setPassword(event.target.value)
    }
    const createUser=async (userID)=>{
        const db=getFirestore()
        const docData={
            email:email,
            displayName:name,
            uid:userID
        }
        await setDoc(doc(db, "users" , userID),docData)
    }
    function handleSubmit(e){
        setError("")
        e.preventDefault()
        const app=initializeApp(firebaseConfig)
        const auth=getAuth()
        createUserWithEmailAndPassword(auth, email, password)
        .then(userCredentials=>{
            const uid=userCredentials.user.uid
            createUser(uid)
        })
        .catch(error=>{
            const errorCode=error.code
            const errorMeaning=errorCode.split("/")
            setError(errorMeaning[1])
        })
    }
return(
    <div className="form">
    <img src={logo} className="logo"/>
    <h2>Create Account</h2>
    <h4>Continue to Calorie Tracker</h4>
    <input name="username" placeholder="Full Name" value={name} onChange={nameChangeHandler}/>   
    <input type="email" name="email" placeholder="Email" value={email} onChange={emailChangeHandler}/>
    <input type="password" name="Password" placeholder="Password" value={password} onChange={passwordChangeHandler}/>
    {error && <p className="error">{error}</p>}
    <button className="login" onClick={handleSubmit}>Create Account</button>
    <Link to="/login">
    {"Already Have An Account ?"}
    </Link>
    </div>
)
}
export default Signup;