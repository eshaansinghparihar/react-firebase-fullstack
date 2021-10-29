import { getFirestore, onSnapshot ,doc } from "@firebase/firestore";
import React, { useEffect , useState} from "react";
import Activities from "./Activities";
import AddRecord from "./AddRecord";
import Greetings from "./Greeting";
import Loading from "./Loading";


function Landing({user}){
    const uid=user.uid
    const [data,setData]=useState({})

    const readData= ()=>{
        const db=getFirestore()
        if(uid)
        {
            onSnapshot(doc(db, "users", uid), (doc)=>{
                setData(doc.data())
            })
        }
    }
    useEffect(()=>{
        readData()
    },uid)
return(
   (data.displayName)?
    <div>
    <Greetings data={data}/>
    <AddRecord/>
    <Activities/>
    </div>
    :
    <Loading/>
)
}
export default Landing;