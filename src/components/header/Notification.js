// src/Notification.js
// import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";
// import { getDatabase, ref, set } from "firebase/database";

import { getDatabase, ref, set,onValue,push } from "firebase/database";
import { initializeApp} from "firebase/app";
import { getStorage } from "firebase/storage"
import { useUniqAdminObjeact,useAdminValidation } from "src/views/Custom-hook/adminValidation";
import axios from "axios";
import { toast } from 'react-toastify'

const firebaseConfig = {
  apiKey: "AIzaSyC-yYmzq3BT2Q7Pkgqh3d8NhwDVKYPxbsM",
  authDomain: "cuba-goa.firebaseapp.com",
  projectId: "cuba-goa",
  storageBucket: "cuba-goa.appspot.com",
  messagingSenderId: "1015733134617",
  appId: "1:1015733134617:web:6853d960f7606af7771188",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
export const database = getDatabase(app);





import React,{useState} from 'react'

import {CCard} from '@coreui/react'

const Notification = () => {
 const {employeeMongoId}= useUniqAdminObjeact()
 const [notification,steNotiFication] = useState([])

function getNotiFication() {
  const db = getDatabase();
  const starCountRef = ref(db, employeeMongoId);
  onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();

  const notiFications = []

  for (const notiFication in  data){
    notiFications.push(data[notiFication])
  }
  notiFications.reverse()
  steNotiFication(notiFications)

  });

}
useEffect(()=>{
  getNotiFication()
},[])

function createAndPush(obj,pathVal) {
  const db = getDatabase();

  // Create a new collection with partnerAdminMongoId as the key
  const newCollectionRef = push(ref(db,pathVal));

  // Set data in the new collection
  set(newCollectionRef, obj)
    .then(() => {
      if(pathVal===partnerAdminMongoId){
        toast.success('Notification Send Successfully')
      }
    })
    .catch((error) => {
      if(pathVal===partnerAdminMongoId){
        toast.error('Network Error')
      }
    });
}

  

const saveNotification = () =>{
  const obj = {
      employeeMongoId,
      partnerAdminMongoId,
      staffName: "Admin",
      message,
      empLoyeeUniqId: employeeMongoId,
      employeeIDC: partnerAdminMongoId,
      centerNameC,
      centerCodeC,
      dateObj: new Date().toISOString(), // Use ISO string format for dates
    
  }
  createAndPush(obj,partnerAdminMongoId)
  selectedEmpArr.forEach((el) => {
    const obj = {
      employeeMongoId,
      partnerAdminMongoId,
      staffName: el.FullName,
      message,
      empLoyeeUniqId: el._id,
      employeeIDC: el.EmployeeID,
      centerNameC,
      centerCodeC,
      dateObj: new Date().toISOString(), // Use ISO string format for dates
    }
    createAndPush(obj,el._id)
  });
}


const toGetSelectedEmpData = (selectedEmpArr)=>{
  steSelectedEmpArr(selectedEmpArr)
}


  return (
    <div>
 
     
{notification.map((el)=>
       <div>
         <CCard className='  my-2  d-inline-block p-2'>
           {el.message}<br/>
           <span style={{fontSize:'13px'}}>
           {new Date(el.dateObj).toDateString()}{new Date(el.dateObj).toLocaleTimeString()}
           </span>
         </CCard>
       </div>
     )}
 </div>
  )
}

export default Notification




