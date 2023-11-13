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
// import { useEffect } from "react";
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
export const database = getDatabase(app);



import React,{useState} from 'react'

import { CRow,CCol,CCard,CButton,CForm,CFormLabel,CFormCheck,CFormFeedback,CFormTextarea,
  CModal,CModalTitle,CModalHeader,CModalFooter,CModalBody
} from '@coreui/react'
import StaffCheckBoxInputDropDown from './StaffCheckBoxInputDropDown'
import { useSelector } from 'react-redux'

const Notification = () => {
 const {employeeMongoId,partnerAdminMongoId,centerNameC,centerCodeC}= useUniqAdminObjeact()
 const [message,steMessage] = useState('')
 const [notification,steNotiFication] = useState([])


function writeUserData() {


const db = getDatabase();
// const empObj = {}
const dateString = new Date().toISOString().split("T")[0]
selectedEmpArr.forEach((el)=>{        
  // const  empObj = {
  //         employeeMongoId,
  //         partnerAdminMongoId,
  //         staffName:el.FullName,
  //         message,
  //         empLoyeeUniqId: el._id,
  //         employeeIDC:el.EmployeeID,
  //         centerNameC,
  //         centerCodeC,
  //         dateObj: new Date()
  //    }    

  set(ref(db, 'users/' + partnerAdminMongoId +"/"+el._id  +"/"+(dateString)), {
      employeeMongoId,
      partnerAdminMongoId,
      staffName:el.FullName,
      message,
      empLoyeeUniqId: el._id,
      employeeIDC:el.EmployeeID,
      centerNameC,
      centerCodeC,
      dateObj: new Date()
    })
  .then((res) => {
     console.log('hello',res)
  })
  .catch((error) => {
    console.log('error',error)  
  });
})
  
}


function getNotiFication() {
  const db = getDatabase();
  const starCountRef = ref(db, partnerAdminMongoId);
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
        setVisible(false)
        toast.success('Notification Send Successfully')
      }
    })
    .catch((error) => {
      if(pathVal===partnerAdminMongoId){
        toast.error('Network Error')
      }
    });
}

  const [visible, setVisible] = useState(false)
  const url = useSelector((el)=>el.domainOfApi) 
  const pathVal = useAdminValidation("Master")
  const [staffData,setStaffData]=useState([])

  let user = JSON.parse(localStorage.getItem('user-info'))
  const token = user.token;

  const headers = {
    "Authorization": `Bearer ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
   }
console.log(token)

  const [selectedEmpArr,steSelectedEmpArr] = useState([])
   

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
      dateObj: new Date().toISOString(), 
    
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
      dateObj: new Date().toISOString(), 
    }
    createAndPush(obj,el._id)
  });
}



 
  function toGetAllEmployeData() {
    axios.get(`${url}/employeeform/${pathVal}`, {headers})
        .then((res) => {
          setStaffData(res.data)
        })
        .catch((error) => {
            console.error(error)
        })
}

useEffect(()=>{
  toGetAllEmployeData()
},[])


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

    <CModal
      visible={visible}
      onClose={() => setVisible(false)}
      aria-labelledby="LiveDemoExampleLabel h-32"
    >
      <CModalHeader onClose={() => setVisible(false)}>
        <CModalTitle id="LiveDemoExampleLabel">Modal title</CModalTitle>
      </CModalHeader>
      <CModalBody>
      <CForm className="row g-3 p-2">

      <div>

  <CCol sx={12} className='mb-3'>
    <CFormLabel>Select Staff</CFormLabel>
    <StaffCheckBoxInputDropDown data={staffData} getData={toGetSelectedEmpData}/>
  </CCol>

  <CCol sx={12} className='mb-3' >
    <CFormTextarea
      type="text"
      id="validationServer03"
      label="Notification Message"
      feedback="Please provide a valid city."
      placeholder='Enter Notification Message'
      value={message}
      onChange={(e)=>steMessage(e.target.value)}
    />
  </CCol>
  </div>
</CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Close
        </CButton>
        <CButton color="primary" type="submit" onClick={()=>saveNotification()}>
      Submit form
    </CButton>
      </CModalFooter>
    </CModal>




     <CCol className='fixed-bottom text-end p-2'>
 <CButton  style={{width:'160px'}}  onClick={() => setVisible(!visible)}>
 +  Add Notification
 </CButton>  
 </CCol>

 </div>
  )
}

export default Notification




