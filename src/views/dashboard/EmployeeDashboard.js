import React, { useEffect, useState } from 'react'

import {
    CAvatar,
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CProgress,
    CProgressBar,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react'
import { empLoyeeeRights } from '../hr/Rights/rightsValue/crmRightsValue'
import { useSelector } from 'react-redux'
import { FaEye,FaEyeSlash } from 'react-icons/fa'
import axios from 'axios'
import moment from 'moment/moment'
import { useAdminValidation } from '../Custom-hook/adminValidation'
const BalancePayment = React.lazy(()=>import('../finance/BalancePayment'))


const EmployeeDashboard = () => {
    const rightsData = useSelector((el)=>el.empLoyeeRights?.crmRights
    ?.crmEmployee?.items?.crmDashboard1?.rights) 
    const access = rightsData?rightsData:[]
    const isAdmin = useSelector((el)=>el.isAdmin) 
    const url = useSelector((el) => el.domainOfApi)
    const pathValMaster = useAdminValidation()

    const monthName = ['Jan','Feb','March','April','May','June',
    'July','August','Sept','Oct', 'Nov', 'Dec']      

    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;

    const headers = {
        'Authorization': `Bearer ${token}`,
        'My-Custom-Header': 'foobar'
    };

    const [dashBoardData,setDashBoardData]  = useState({ 
      noOfEmployee:0,
      todayAttendedEmp:[]})

const [dashBoardData2,setDashBoardData2]  = useState(
  {year:{
      year:new Date().getFullYear(),
      target:0,
      achived:0
  },
  month:{
      Jan:{target:0,achived:0},
      Feb:{target:0,achived:0},
      March:{target:0,achived:0},
      April:{target:0,achived:0},
      May:{target:0,achived:0},
      June:{target:0,achived:0},
      July:{target:0,achived:0},
      August:{target:0,achived:0},
      Sept:{target:0,achived:0},
      Oct:{target:0,achived:0},
      Nov:{target:0,achived:0},
      Dec:{target:0,achived:0}
  },
  today:{target:0,achived:0}
})

    const [attendedEye,setAttenddedEye] = useState(false)

    const getEmpDashBoardData = async ()=>{
      try{
        const response1 =  axios.get(`${url}/emp-attendance/${pathValMaster}`,{headers})
        const response2 = await  axios.get(`${url}/dailyTarget/${pathValMaster}`,{headers})

        const allData = await Promise.all([response1,response2])
        setDashBoardData(allData[0].data)
        setDashBoardData2(allData[1].data)
      }catch(error){
        console.log(error)
      }
    }


useEffect(()=>{
  getEmpDashBoardData()
},[])


 function  toHandleClassNameProgress(val){

  if(val<=40){
     return 'danger'
  }else if(val<=50){
     return 'warning'
  }else if(val<=70){
     return 'info'
  }else if(val>=85){
    return 'success'
  }
 }


    return (
        <>
            

            <CRow>
                <div className='p-4'>
                    
                <CRow>  

           

                {(access?.includes(empLoyeeeRights.income)||isAdmin)&&<CCol md={6}>
                    <CCard  className='p-2 bg-success-100' >
                  <CCardBody>
                    <CRow >
                      <CCol sm={12}>
                        <h4 id="traffic" className="card-title mb-0 text-center">
                        Traget Of This Month
                        </h4>
                      </CCol>      
                      <hr/>
                    </CRow>
                    <CRow>
                     
                      <CCol sm={12}   >
                           <div className='text-center'>
                              <h6 className='text-midium-emphasis'>{monthName[new Date().getMonth()]} Target </h6>
                              <div className='d-flex justify-content-between'>
                              <p className='text-midium-emphasis m-0 text-info'> <span className='text-dark'> Target {dashBoardData2.month[monthName[new Date().getMonth()]].target} </span> </p>
                              <p className='text-midium-emphasis m-0 text-success'> <span className='text-dark'> Achive {dashBoardData2.month[monthName[new Date().getMonth()]].achived}</span></p>
                              </div>
                            </div>                            
                      </CCol>  
                     
                      <div className="progress-group mb-3" key={0}>
                    
                        <div className="progress-group-bars">
                           <CProgress >
                            <CProgressBar color={toHandleClassNameProgress((dashBoardData2.today.achived / 
                            (dashBoardData2.today.target>0?dashBoardData2.today.target:1)) * 100)} value={(dashBoardData2.today.achived / 
                            (dashBoardData2.today.target>0?dashBoardData2.today.target:1)) * 100} />                       
                          </CProgress>
                        </div>
                      </div>
 
                        
                    </CRow>
                  </CCardBody>
                    
                    </CCard>
                </CCol>}

                {(access?.includes(empLoyeeeRights.attendance)||isAdmin)&&<CCol  md={6} sm={12}>
                <CCard>   
      <CCardBody>

        <CRow >
          <CCol sm={8}>
            <h4 id="traffic" className="card-title text-center p-0 mt-2" >
             Staff  Attendance
            </h4>
            
          </CCol>
          <CCol sm={4} className='text-end'>
          <CButton size='sm' onClick={()=>setAttenddedEye(prev=>!prev)}>
               {attendedEye?<FaEyeSlash/>:<FaEye/>}
          </CButton>
          </CCol>

          {/* Total Staff {dashBoardData.noOfEmployee} */}

          <hr className="mt-0" />

        </CRow>

        <CRow className='mb-4'>
          <CCol sm={6} >
             <h6 style={{fontWeight:'normal'}}>Total Staff {dashBoardData.noOfEmployee} </h6>
          </CCol>
          <CCol sm={6}  className='text-end'>
             <h6 style={{fontWeight:'normal'}}>Attended Staff {dashBoardData.todayAttendedEmp.length}</h6>
          </CCol>
        </CRow>

        <CRow>
          <CCol xs={12} md={12} xl={12}>


              <div className="progress-group mb-3" key={0}>
                <div className="progress-group-prepend">
                  <span className="text-medium-emphasis small">
                    {/* {item.title} */}
                  </span>
                </div>
                <div className="progress-group-bars">
                  <CProgress >
                    <CProgressBar color={toHandleClassNameProgress((dashBoardData.todayAttendedEmp.length/dashBoardData.noOfEmployee)*100)} value={(dashBoardData.todayAttendedEmp.length/dashBoardData.noOfEmployee)*100} />
                  </CProgress>
                </div>
                <div className="progress-group-prepend">
                  <span className="ms-auto fw-semibold">

                 
                  </span>
                </div>
              </div>
          </CCol>
        </CRow>

      

        <CTable  className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345",display:attendedEye?'':'none' }} hover responsive>
            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                <CTableRow >
                    <CTableHeaderCell>Sr.No</CTableHeaderCell>
                    <CTableHeaderCell>Staff Name</CTableHeaderCell>
                    <CTableHeaderCell>Attendance ID</CTableHeaderCell>
                    <CTableHeaderCell>Center ID</CTableHeaderCell>
                    <CTableHeaderCell>Check Date</CTableHeaderCell>
                    <CTableHeaderCell>CheckIn Time</CTableHeaderCell>
                    <CTableHeaderCell>CheckOut Time</CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <CTableBody>
                {dashBoardData.todayAttendedEmp.map((item, index) => (
                    <CTableRow key={index}>
                        <CTableDataCell>{index + 1}</CTableDataCell>
                        <CTableDataCell>{item.StaffName}</CTableDataCell>
                        <CTableDataCell>{item.attentanceId}</CTableDataCell>
                        <CTableDataCell>{item.centerId}</CTableDataCell>
                        <CTableDataCell>{moment(item.createdAt).format("LL")}</CTableDataCell>
                        <CTableDataCell>{item.checkIn}</CTableDataCell>
                        <CTableDataCell>{item.checkOut}</CTableDataCell>
                    </CTableRow>
                ))}
            </CTableBody>
        </CTable>
          
      </CCardBody>
    </CCard>
                </CCol>}

                <CCol sm={12} className='mt-4'>
                    <BalancePayment/>
                </CCol>
                </CRow> 

               </div>
            </CRow>

       
        </>
    )
}

export default EmployeeDashboard
