import { cilArrowCircleBottom, cilArrowCircleTop } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCardTitle,
    CCol,
    CFormSwitch,
    CNav,
    CNavItem,
    CNavLink,
    CRow,
    CTabContent,
    CTabPane,
    CFormSelect,
    CButton,
    CFormInput
} from '@coreui/react'
import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import {useParams } from 'react-router-dom'

const CrmErpRigts  = React.lazy(()=>import('./Rights/CrmErpRigts'))
const MasterRights = React.lazy(()=>import('./Rights/MasterRights'))
const LoginList = React.lazy(()=>import('./Login List/LoginList'))
const ErpRigths = React.lazy(()=>import('./Rights/ErpRigths'))
import CustomSelectInput from '../Master/HRMaster/CustomSelectInput/CustomSelectInput'
import obj1 from './crmErpObjeact/obj'

let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;


const headers = {
  "Authorization": `Bearer ${token}`,
  'Accept': 'application/json',
  'Content-Type': 'application/json'
 }

const Rights = () => {

      const params  = useParams()

    const url = useSelector((el)=>el.domainOfApi) 
    const [activeKey, setActiveKey] = useState(1)
    const [activeKey2, setActiveKey2] = useState(1)
    const [employeeData,setEmployeeData] = useState([])
    const [activeUpdate,setActiveUpdate] = useState(0)
    const [warning,setWarning] = useState()
    const [rightObjeact,setRightObject]= useState({
    empId:'',
    empName:'',
    memBerId:'',
    email:'',
    emailUniqId:'',
    crmRights:obj1.crmRights,
    erpRights:obj1.erpRights
    })

    function getEmpEmailData() {
      axios.get(`${url}/allRight/rights/${params.emailUniqId}`, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      })
          .then((res) => {
            if(res?.data?.message==="Not found"){
              setActiveUpdate("Not found")

              setRightObject((prev)=>({...prev,
                empName:res.data.data.empName,
                empId:res.data.data.empId,
                memBerId:res.data.data.MemBerId,
                email:res.data.data.email,
                emailUniqId:res.data.data._id,
              })) 
            } 

            if(res?.data?.message==="Successfull received"){
              setRightObject(()=>res.data.data) 
              setActiveUpdate("Successfull received")
            }
            console.log(res.data)
             setEmployeeData(res.data)
          })
          .catch((error) => {
           
            if(error.response.status===400){
              // console.error(error.response.data.error)
              setActiveUpdate(400)
              return 
              }
              console.error(error)
          })
  }
 
   
 
  useEffect(()=>{
   getEmpEmailData()
  },[])

 


 const saveData = async  (type)=>{
 
   let response ={}
   try{
     if(type==='Save'){
       response = await  axios.post(`${url}/allRight/create`,rightObjeact,{headers})
     }
     if(type==='Update'){
      response = await  axios.post(`${url}/allRight/update/${rightObjeact._id}`,rightObjeact,{headers})
     }
    if(response?.status===200){
     alert(`Successfully ${type.toLocaleLowerCase()}`)
     console.log(response.data)
     getEmpEmailData()

    }
     }catch(error){
       console.error(error)
     }
   
}


console.log(rightObjeact)

  return (<CCard style={{display:(activeUpdate==='Not found'||activeUpdate==="Successfull received")?'block':'none'}}>
    <CCardBody>
    <CTabContent>
      <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={(activeUpdate==='Not found'||activeUpdate==="Successfull received")}>
    <CRow className='my-5 mt-2'>
            {<CCol lg={4} md={4} sm={6} className='my-2'>                          
                              <CFormInput
                               value={rightObjeact.empName}
                               label={'Member name'}
                              />
                            </CCol>}


                  <CCol  lg={4} md={4} sm={6} className='p-2 d-flex align-items-end'>


    {activeUpdate==='Not found'&&<CButton onClick={()=>saveData('Save')}>Create Right</CButton>}
    {activeUpdate==="Successfull received"&&<CButton onClick={()=>saveData('Update')}>Update</CButton>}

  </CCol>

    </CRow>


<CNav variant="tabs" role="tablist">
  <CNavItem>
    <CNavLink
      active={activeKey2 === 1}
      onClick={() =>  setActiveKey2(1)}
    >
     CRM
    </CNavLink>
  </CNavItem>
  <CNavItem>
    <CNavLink
      active={activeKey2 === 2}
      onClick={() =>  setActiveKey2(2)}
    >
      ERP
    </CNavLink>
  </CNavItem>
  <CNavItem>
    <CNavLink
      active={activeKey2 === 3}
      onClick={() =>  setActiveKey2(3)}
    >
      Master
    </CNavLink>
  </CNavItem>
</CNav>

  <CTabPane role="tabpanel" aria-labelledby="home-tab" style={{display:activeKey2 === 1?'block':'none'}} visible={activeKey2 === 1} >
    <CrmErpRigts rightObjeact={rightObjeact.crmRights} setRightObject={setRightObject} />
  </CTabPane>
  <CTabPane role="tabpanel" aria-labelledby="home-tab"  style={{display:activeKey2 === 2?'block':'none'}} visible={activeKey2 === 2} >
    <ErpRigths rightObjeact={rightObjeact.erpRights} setRightObject={setRightObject} />
  </CTabPane>
  <CTabPane role="tabpanel" aria-labelledby="home-tab"  style={{display:activeKey2 === 3?'block':'none'}} visible={activeKey2 === 3}>
    <MasterRights/>
  </CTabPane>
      </CTabPane>
      </CTabContent>
  </CCardBody>
</CCard>
  )
}

export default Rights
