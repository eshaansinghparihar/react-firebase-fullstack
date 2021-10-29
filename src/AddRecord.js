import { initializeApp } from "@firebase/app";
import { doc, getFirestore } from "@firebase/firestore";
import React, { useState } from "react";
import './AddRecord.css'
import firebaseConfig from "./config";
function AddRecord({data}){
    const [query,setQuery]=useState('')
    const [select,setSelect]=useState("nutrients")
    const [error,setError]=useState('')

    const uid=data.uid
    const app=initializeApp(firebaseConfig)
    const db=getFirestore()
    const activityRef=doc(db, "users" , uid)

    function queryHandler(event){
        setQuery(event.target.value)
    }
    function handleSelectChange(event){
        setSelect(event.target.value)
    }
    function addFood(){

    }
    function addExercise(){

    }
    function submitHandler(e){
        setError('')
        e.preventDefault()
        const requestOptions={
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'x-app-id':'56ca1303',
                'x-app-key':'792b8a7c034a7191f67fb45b5836e45e'
            },
            body:JSON.stringify({query:query})
        }
        fetch('https://trackapi.nutritionix.com/v2/natural/'+select, requestOptions)
        .then(response=>response.json())
        .then(result=>{
            if(result.foods)
            {
                addFood(result.foods[0])
            }
            else if(result.exercises)
            {
                addExercise(result.exercises[0])
            }
        })
        .catch(error=>{
            setError('Something went wrong!')
        })
        setQuery('')
    }


return(
    <div className="form">
        {error && <p className="error">{error}</p>}
        <textarea placeholder="Add You're Hogs and Jogs Here !" value={query} onChange={queryHandler}></textarea>
        <select value={select} onChange={handleSelectChange}> //set value here
                <option value="nutrients">Food</option>
                <option value="exercise">Exercise</option>
        </select>
        <button className="add" onClick={submitHandler}>Add</button>
        
    </div>
)
}
export default AddRecord