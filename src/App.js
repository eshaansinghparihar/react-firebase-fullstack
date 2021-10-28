import logo from './logo.svg';
import './App.css';
import React, {useState,useEffect} from 'react';
import firebaseConfig from './config';
import { BrowserRouter , Switch, Route ,Redirect} from 'react-router-dom';
import {onAuthStateChanged, getAuth} from "firebase/auth"
import Landing from './Landing'
import Login from './Login'
import Signup from './Signup'
import { initializeApp } from '@firebase/app';

function App() {
  const [user, setUser]=useState({})
  const app=initializeApp(firebaseConfig)
  const auth = getAuth()
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user!=={}) 
      {
        setUser(user)
      }
      else
      {
        setUser({})
      }
    })},[])
  return (
    <BrowserRouter>
    <div className="App">
    {user!==null ?
    <Switch>
      <Route path="/">
        <Landing/>
      </Route>
      <Redirect to="/"/>
    </Switch>
    :
    <Switch>
      <Route exact path="/signup">
        <Signup/>
      </Route>
      <Route path="/">
        <Login/>
      </Route>
      <Redirect to="/"/>
    </Switch>}
    </div>
    </BrowserRouter>
  );
}

export default App;
