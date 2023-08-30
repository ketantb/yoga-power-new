import React, { useEffect, useState } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCardTitle,
    CCol,
    CFormInput,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowCircleBottom, cilArrowCircleTop, cilInfo } from '@coreui/icons'
import { useSelector } from 'react-redux'
import axios from 'axios';
import moment from 'moment';
import { useAdminValidation } from '../Custom-hook/adminValidation'



const AllClassReport = () => {

    const [classReportData, setClassReportDta] = useState([]);
    const url = useSelector((el) => el.domainOfApi)
    const pathValMaster = useAdminValidation('Master')
    var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;
;
    useEffect(() => {
        getAttendance()
    }, [])

    function getAttendance() {
        axios.get(`${url}/staffAttendanceWorkReport/${pathValMaster}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
                console.log(res.data)
                setClassReportDta(res.data.reverse())
            })
            .catch((error) => {
                console.error(error)
            })
    }

//  function time_convert_Minutes(hoursNum)
//     { 
//       let num =  (+hoursNum.toFixed(2).split('.')[1]||0)
//       let hours1 = (+hoursNum.toFixed(2).split('.')[0]||0)

//         let hours = Math.floor(num / 60);  
//         let minutes = num % 60;
//         return (hours1+hours) + ":" + minutes;  

//    }

// function toGetHours(date1 ,date2) {

// // get total seconds between the times
// var hours = Math.abs(((new Date(date1) - new Date(date2))%86400000) / 3600000) ;
// return hours
// }

//     const map = new Map()

//     classReportData.forEach((el)=>{

//         if(el.isTrainer &&el.checkOutDate){
//             const obj ={
//                 Year:new Date(el.checkDate).getFullYear(),
//                 Month:new Date(el.checkDate).getMonth(),
//                 Trainer:el.trainer_name,
//                 TrainerId:el.trainerId,    
//                 totalWorkingHours:toGetHours(el.checkDate,el.checkOutDate)            
//             }
//             console.log(el.checkDate,el.checkOutDate)   
//             console.log(el.trainer_name)
//             console.log(toGetHours(el.checkDate,el.checkOutDate))

//             const tyepOFClassName = el.MemberId+" "+el.batch_timing+
//              " "+el.category+" Year "+(obj.Year)+" Month "+
//              (obj.Month)

//             if(!map.has(tyepOFClassName)){
//                 map.set(tyepOFClassName,obj)                    
//             }else{
//               const prevObj =  map.get(tyepOFClassName)
//               prevObj.totalWorkingHours+=toGetHours(el.checkDate,el.checkOutDate)            
//               map.set(tyepOFClassName,{...prevObj})                    
//             }
//         }
//     })


//    const uniqObjArr = [] 
//     map.forEach((el)=>{
//     const hours = el.totalWorkingHours
//     el.totalWorkingHours=time_convert_Minutes(hours)
//     uniqObjArr.push(el)
//     })


    return (
        <CRow>
            <CCol lg={12} sm={12}>
                <CCard className="mb-3 border-success">
                    <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                        <CCardTitle className="mt-2">All Trainer Report</CCardTitle>
                    </CCardHeader>
                    <CCardBody>                     
                        <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                                <CTableRow >
                                    <CTableHeaderCell>Sr.No</CTableHeaderCell>
                                    <CTableHeaderCell>Year/month</CTableHeaderCell>
                                    <CTableHeaderCell>Trainer Name</CTableHeaderCell>
                                    <CTableHeaderCell>Type of Classes</CTableHeaderCell>
                                    <CTableHeaderCell>No Of Classes</CTableHeaderCell>
                                    <CTableHeaderCell>Classes Timing</CTableHeaderCell>
                                    <CTableHeaderCell>Total completed hrs </CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                <CTableRow>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "60px" }}
                                            type="text"
                                            disabled
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "90px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "120px" }}
                                            type="text"
                                            disabled
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="number"
                                            style={{ minWidth: "100px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "120px" }}
                                            disabled
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "120px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>  
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "120px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell> 
                                </CTableRow>
                                {classReportData.map((el,i)=>
                                <CTableRow>
                                       <CTableDataCell>{i+1} </CTableDataCell>
                                       <CTableDataCell>{el.Year+" "+el.Month} </CTableDataCell>
                                       <CTableDataCell>{el.Trainer}</CTableDataCell>
                                       <CTableDataCell>{el.category}</CTableDataCell>
                                       <CTableDataCell>{el.numberOfAttended}</CTableDataCell>
                                       <CTableDataCell>{el.BatchTime}</CTableDataCell>
                                       <CTableDataCell>{el.totalWorkingHours}</CTableDataCell>
                                </CTableRow>                                                              
                               )}
                                
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                   
                </CCard>
            </CCol>
        </CRow>
    )
}

export default AllClassReport
//noOfClasses
