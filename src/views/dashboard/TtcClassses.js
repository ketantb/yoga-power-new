import { cilArrowCircleBottom, cilArrowCircleTop } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormInput,
    CFormSelect,
    CInputGroup,
    CInputGroupText,
    CNav,
    CNavItem,
    CNavLink,
    CRow,
    CTabContent,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CTabPane,
} from '@coreui/react'
import React, { useState,useCallback,useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import useAttendance from './AttendanceHook/useAttendance'
import useHandlelDailyReport from './AttendanceHook/useHandlelDailyReport'
import useMonthlyReport from './AttendanceHook/useMonthlyReport'
import { Link } from 'react-router-dom'

import moment from 'moment/moment'

const TtcClasses = () => {

        const updateAttendance = useAttendance()
        const ttCClassesDailyReport = useHandlelDailyReport()
        const ttcMonthLyReport = useMonthlyReport()


        const [activeKey, setActiveKey] = useState(1)
        const url = useSelector((el)=>el.domainOfApi) 
        const [DailyAttendence,setDailyAttendence] = useState([])
        const [ttcMonthlyReportData,setTtcMonthlyReport] = useState([])
        const [clientAttendenceReg,setClientAttendenceReg] = useState([])
        const [selectedMonth,setMonth] = useState(new Date().getMonth())
        const [selectedYear,setYear] = useState(new Date().getFullYear())
        const [dateOfAMonth,setDateOfMonth] = useState([])
        const [totalAttendanceofDay,setTotalAttendanceOfDay] = useState([])
        const [ttcClassesDailyReportData,setttClassesDailyreportData] = useState([])
    
    
        const [clientAttendance2,setClientAttendence2] = useState([])
        const [memBerData2,setMemberData] = useState([])
        const monthName =     ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
        let user = JSON.parse(localStorage.getItem('user-info'))
        const token = user.token;

    

    function getDaysInMonth(month, year) {
        var date = new Date(year, month, 1);
        var days = [];
        while (date.getMonth() === month) {
          days.push({attendanceDate:new Date(date),value:false});
          date.setDate(date.getDate() + 1);
        }
        return days;
   }    
   
   
    function compareDateFun(date1, date2) {
        return new Date(date1).getFullYear() === new Date(date2).getFullYear() &&
            new Date(date1).getMonth() === new Date(date2).getMonth() &&
            new Date(date1).getDate() === new Date(date2).getDate()
    }

    const  getTCC_Classes = useCallback(async function() {
        try{
            const response1 =  axios.get(`${url}/clientAttendance/all`,{ headers: {'Authorization': `Bearer ${token}`}})     
            const response2 =  axios.get(`${url}/memberForm/all`,{ headers: {'Authorization': `Bearer ${token}`}})    
               const  data   = await  Promise.all([response1,response2])        
               const  clientAttendanceData  = data[0].data
               const  memBerData =  data[1].data               


              console.log(clientAttendanceData)

               const dateWithAttendance =getDaysInMonth(new Date().getMonth(),new Date().getFullYear())
               const attendedData = updateAttendance(clientAttendanceData.filter((el)=>el.category==="TTC Classes"),
               dateWithAttendance,memBerData)
               setClientAttendenceReg(attendedData)
               setClientAttendence2(clientAttendanceData)    
               setMemberData(memBerData) 
               HandleTotalAtten(attendedData,dateWithAttendance)
               setttClassesDailyreportData(ttCClassesDailyReport(clientAttendanceData.filter((el)=>el.category==="TTC Classes")))  
               setTtcMonthlyReport(ttcMonthLyReport(clientAttendanceData.filter((el)=>el.category==="TTC Classes"),memBerData))
        }catch(error) {
                console.error(error)
        }
    },[])


    function HandleTotalAtten (data,date){
        const dataOfTotalAten = date.slice();
        dataOfTotalAten?.forEach((el)=>{
            el.value=0
            data?.forEach((el2)=>{
            let num = 0 
             el2?.dateWithAttendance1?.forEach((el3)=>{
              if(compareDateFun(el.attendanceDate,el3?.attendanceDate)&&el3.value){
                 el.value += ++num 
              }          
             })
          })
        })
        setTotalAttendanceOfDay([...dataOfTotalAten])
    }



                  
    useEffect(()=>{
     const newDate =getDaysInMonth(+selectedMonth,+selectedYear)
            setDateOfMonth(newDate)
            if(!clientAttendenceReg[0] && !memBerData2[0])return
            const  attendedData = updateAttendance(clientAttendance2.filter((el)=>el.category==="PT Classes"),newDate,memBerData2)
            HandleTotalAtten(attendedData,newDate)
            setClientAttendenceReg(attendedData)
          },[selectedMonth,selectedYear])
            
     let allTotalOfAttendance = 0

 
    useEffect(() => {
        getTCC_Classes()
    },[ getTCC_Classes]) 


    return (
        <CRow>
            <CCol xs={12}>
                <CCard>
                    <CCardHeader >
                        <CNav variant="pills" role="tablist">
                            <CNavItem>
                                <CNavLink
                                    href="javascript:void(0);"
                                    active={activeKey === 1}
                                    onClick={() => setActiveKey(1)}
                                >
                                   Daily Attendance
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink
                                    href="javascript:void(0);"
                                    active={activeKey === 2}
                                    onClick={() => setActiveKey(2)}
                                >

                                    Monthly Report
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink
                                    href="javascript:void(0);"
                                    active={activeKey === 3}
                                    onClick={() => setActiveKey(3)}
                                >
                                    Client Attendance Reg
                                </CNavLink>
                            </CNavItem>
                           

                            
                        </CNav>
                    </CCardHeader>
                    <CCardBody>
                        <CTabContent>

                        <CRow className='mb-3'>
                                    <CCol lg={3} md={6} sm={8} >
                                        <CInputGroup>
                                            <CInputGroupText
                                                component="label"
                                                htmlFor="inputGroupSelect01"
                                            >
                                                Month
                                            </CInputGroupText>
                                            <CFormSelect id="inputGroupSelect01"
                                            value={selectedMonth}
                                            onChange={(e)=>setMonth(e.target.value)}
                                            >
                                                { monthName.map((el,i)=>
                                                <option value={i}>{el}</option>                                              
                                                )}
                                            </CFormSelect>
                                        </CInputGroup>
                                    </CCol>
                                    <CCol  lg={3} md={6} sm={8} >
                                        <CInputGroup>
                                            <CInputGroupText
                                                component="label"
                                                htmlFor="inputGroupSelect01"
                                            >
                                                Year
                                            </CInputGroupText>
                                            <CFormSelect id="inputGroupSelect01"
                                            value={selectedYear}
                                            onChange={(e)=>setYear(e.target.value)}
                                            >
                                                <option>2023</option>    
                                            
                                            </CFormSelect>
                                        </CInputGroup>
                                    </CCol>
                                                                         
                                </CRow>

                            <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>                 

                                <CTable bordered borderColor="black" responsive>
                                    <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                                    <CTableRow>
                                            <CTableHeaderCell scope="col">Sr.No</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Attendance Id</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Client Name</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Trainer Name</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Course</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Batch Timing</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Total seasson</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Atteneded</CTableHeaderCell>   
                                    </CTableRow>
                                    </CTableHead>
                                    <CTableBody>                                      
                                    {ttcClassesDailyReportData.map((el,i)=>
                                            <CTableRow>
                                            <CTableDataCell>{i+1}</CTableDataCell>
                                            <CTableDataCell>{el.attentanceId}</CTableDataCell>
                                            <CTableDataCell>{el.ClientName}</CTableDataCell>
                                            <CTableDataCell>{el.trainerName}</CTableDataCell>
                                            <CTableDataCell>{el.services}</CTableDataCell>
                                            <CTableDataCell>{el.batchTiming}</CTableDataCell>
                                            <CTableDataCell>{el.TotalSession}</CTableDataCell>
                                            <CTableDataCell>{el.Atteneded}</CTableDataCell>
                                        </CTableRow>)} 
                                    </CTableBody>
                                </CTable>
                            </CTabPane>
                            <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 2}>
                               
                            <CTable bordered borderColor="balck" responsive>
                                    <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                                    <CTableRow>
                                            <CTableHeaderCell scope="col">Sr.No</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Trainer Name</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Course</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">
                                               Batch Timing
                                            </CTableHeaderCell>
                                            <CTableHeaderCell scope="col">  No of Clients</CTableHeaderCell>
                                           
                                            <CTableHeaderCell scope="col">New Clients</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Left Client</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Total Client</CTableHeaderCell>

                                        </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                    {ttcMonthlyReportData.map((el,i)=>
                                         <CTableRow className='text-center'>
                                             <CTableDataCell>{i+1}</CTableDataCell>
                                             <CTableDataCell>{el.batchTiming}</CTableDataCell>
                                             <CTableDataCell>{el.serviceName}</CTableDataCell>
                                             <CTableDataCell>{el.trainerName}</CTableDataCell>
 
                                             <CTableDataCell>{el.ExistingClient}</CTableDataCell>
                                             <CTableDataCell>{el.newClient}</CTableDataCell>
                                             <CTableDataCell>{el.leftClient}</CTableDataCell>
                                             <CTableDataCell>{el.TotalClient}</CTableDataCell>                                          
                                         </CTableRow>)} 
                                       
                                    </CTableBody>
                                </CTable>
                            </CTabPane>
                            <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 3}>
                               
                                 <CTable bordered borderColor="black" responsive style={{width:'4500px'}}>
                                <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                                        <CTableRow>
                                            <CTableHeaderCell scope="col">Sr.No</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Client Attendence id</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Client Name</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Mobile</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Course</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Trainer Name</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Batch Timeing </CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Package</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Duration</CTableHeaderCell>
                                            {/* <CTableHeaderCell scope="col">Days</CTableHeaderCell> */}
                                            <CTableHeaderCell scope="col">Start Date</CTableHeaderCell>
                                            <CTableHeaderCell scope="col"> End Date</CTableHeaderCell>

                                            {dateOfAMonth.map((el)=>
                                                    <CTableHeaderCell scope="col">{ days[new Date(el.attendanceDate).getDay()]}<br/>
                                                     {new Date(el.attendanceDate).getDate()}</CTableHeaderCell>                                                                                                                                        
                                          )}
                                            <CTableHeaderCell scope="col"> Total <br/> Attended</CTableHeaderCell>
                                        </CTableRow>
                                    </CTableHead>
                                    <CTableBody className='text-center'>
                                        {clientAttendenceReg.map((el,i)=>
                                        <CTableRow>
                                           <CTableDataCell>{i+1}</CTableDataCell>
                                           <CTableDataCell>{el.attentanceId}</CTableDataCell>
                                           <CTableDataCell><Link index={-1} style={{ textDecoration: 'none' }} 
                                           to={`/clients/member-details/${el.clientId}/1`}
                                          >{el.clientName}</Link></CTableDataCell>
                                            <CTableDataCell>{el.mobile}</CTableDataCell>
                                            <CTableDataCell>{el.Services}</CTableDataCell>
                                            <CTableDataCell>{el.TrainerName}</CTableDataCell>
                                            <CTableDataCell>{el.admissionBatch}</CTableDataCell>
                                            <CTableDataCell>{el.admissionPackageName}</CTableDataCell>
                                            <CTableDataCell>{el.admissionDuration}</CTableDataCell>
                                            <CTableDataCell>{moment(el.startDate).format('DD-MM-YYYY')}</CTableDataCell>
                                            <CTableDataCell>{moment(el.endDate).format('DD-MM-YYYY')}</CTableDataCell>

                                            {el.dateWithAttendance1.flatMap((el2)=>
                                                    <CTableDataCell color={el2.value&&'success'}> {el2.value?'P':'A'}</CTableDataCell>                                                                                                                                         
                                          )}         
                                            <CTableDataCell>{el.dateWithAttendance1.reduce((crr,el2)=>{
                                              if(el2.value){
                                                 crr+=1
                                                 allTotalOfAttendance+=1
                                              }
                                               return crr 
                                            },0)}  </CTableDataCell>
                                        </CTableRow>)}

                                        <CTableRow >
                                            <CTableDataCell colSpan={11} style={{ backgroundColor: "#0B5345", color: "white" }}>Total</CTableDataCell>
                                            {totalAttendanceofDay?.map((el)=><CTableDataCell color='success'>{el.value}</CTableDataCell>)}
                                             <CTableDataCell color='success'>{allTotalOfAttendance}</CTableDataCell>
                                        </CTableRow>
                                    </CTableBody>
                                </CTable>
                            </CTabPane>
                            
                           
                           
                         
                           
                          
                        </CTabContent>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}
export default TtcClasses