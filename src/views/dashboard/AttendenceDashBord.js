import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCol,
  CProgress,
  CProgressBar,
  CRow,
} from '@coreui/react'
import { useSelector } from 'react-redux'
import { dashboardRights } from '../hr/Rights/rightsValue/crmRightsValue'
import { useAdminValidation } from '../Custom-hook/adminValidation'
import axios from 'axios'

const AttendenceDashBord= () => {

  const rightsData = useSelector((el)=>el.empLoyeeRights?.crmRights?.crmDashboard?.rights) 
  const access = rightsData?rightsData:[]
  const isAdmin = useSelector((el)=>el.isAdmin) 
  const url = useSelector((el) => el.domainOfApi)
  const pathVal =   useAdminValidation('Master')
  const [dashborddata,setDashbordData] = useState(
    {
        totalActiveClients:0,
        attendedClient:0,
        weekly:{
        Sunday:0,    
        Monday:0,
        Tuesday:0,
        Wednesday:0,
        Thursday:0,
        Friday:0,
        Saturday:0,
        }
    }
  )
  
 
const attndedData =Object.entries(dashborddata.weekly).map((el)=>{
    return  { title: el[0], value1: el[1]}
})
  

  
  const user = JSON.parse(localStorage.getItem('user-info'))
  const token = user.token;

  const headers = {
    "Authorization": `Bearer ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
   }


   const getDasCenterPartner = ()=>{
    axios.get(`${url}/attendanceActivity/${pathVal}`,{headers}).then((el)=>{
     console.log(el.data)
     setDashbordData(el.data)
 
    if(el.status!==200){
     return 
    }
  }).catch((error)=>{console.log(error)})
 
    }
 
    
    useEffect(()=>{
     getDasCenterPartner()
    },[])


    return ((access?.includes(dashboardRights.attendance)||isAdmin)&&
     <CCard>   
      <CCardBody>

        <CRow >
          <CCol sm={4}>
            <h4 id="traffic" className="card-title mb-0">
              Attendance
            </h4>
            <div className="small text-medium-emphasis mb-3">
              Weekly
            </div>
          </CCol>
          <CCol sm={4}>
            <div className="border-start border-start-4 border-start-info py-1 px-3">
              <div className="text-medium-emphasis small">
                Attented Clients
              </div>
              <div className="fs-5 fw-semibold">{dashborddata.attendedClient}</div>
            </div>
          </CCol>
          <CCol sm={4}>
            <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
              <div className="text-medium-emphasis small">
                Total Active Clients
              </div>
              <div className="fs-5 fw-semibold">{dashborddata.totalActiveClients}</div>
            </div>
          </CCol>
        </CRow>

        <CRow>
          <CCol xs={12} md={12} xl={12}>


            <hr className="mt-0" />
            {attndedData.map((item, index) => (
              <div className="progress-group mb-3" key={index}>
                <div className="progress-group-prepend">
                  <span className="text-medium-emphasis small">
                    {item.title}
                  </span>
                </div>
                <div className="progress-group-bars">
                  <CProgress >
                    <CProgressBar color="success" value={((item.value1/dashborddata.totalActiveClients)*100)} />
                    <CProgressBar color="info" value={100} />
                  </CProgress>
                </div>
                <div className="progress-group-prepend">
                  <span className="ms-auto fw-semibold">
                   {item.value1}

                    ({(item.value1?(item.value1/dashborddata.totalActiveClients)*100:0).toFixed(1)}%)

                 
                  </span>
                </div>
              </div>
            ))}
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>)
}

export default AttendenceDashBord