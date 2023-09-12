import React, { useEffect, useState } from 'react'
import {
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardHeader,
    CCardTitle,
    CCol,
    CFormInput,
    CFormSelect,
    CInputGroup,
    CInputGroupText,
    CPagination,
    CPaginationItem,
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
import { MdCall, MdDelete, MdEdit, MdMail } from 'react-icons/md';
import { BsPlusCircle, BsWhatsapp } from 'react-icons/bs';
import axios from 'axios';
import moment from 'moment';
import { useSelector } from "react-redux";
import { useAdminValidation } from '../Custom-hook/adminValidation';

const EmpCheck = () => {
    const url = useSelector((el) => el.domainOfApi)
    const pathValMaster = useAdminValidation('Master')
    const [result1, setResult1] = useState([]);
    const [searchFilter,setSearchFilter] = useState({
        search1:'',
        search2:'',
        search3:'',
        search4:'',
        search5:'',
        search6:'',
        search7:'',
        search8:'',
        search9:'',
        search10:'',
        search11:'',
    })
    const [paging, setPaging] = useState(0);


    const [dateFilterObj,setDteFilterObj] = useState({
        startDate:moment(new Date()).format('YYYY-MM-DD'),
  
      })
    

    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;

    useEffect(() => {
        getAttendance()
    }, [])

    function getAttendance() {
        axios.get(`${url}/staffAttendanceWorkReport/dailyAttendedReport/${dateFilterObj.startDate}/${pathValMaster}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res.data)
                setResult1(res.data.reverse())
            })
            .catch((error) => {
                console.error(error)
            })
    }
    
    
  
    function toFilterData(data){
        return data.filter((el)=>{
                  return (new Date(el.date).toLocaleDateString()||'').includes(searchFilter.search2.toLowerCase().trim())&&
                  (el.attendanceId?.toLowerCase()||'').includes(searchFilter.search3.toLowerCase().trim())&&
                  (el.name?.toLowerCase()||'').includes(searchFilter.search4.toLowerCase().trim())&&
                  (el.designation?.toLowerCase()||'').includes(searchFilter.search5.toLowerCase().trim())&&
                  (el.shiftTimeing?.toLowerCase()||'').includes(searchFilter.search6.toLowerCase().trim())&&
                  (el.startTime?.toLowerCase()||'').includes(searchFilter.search7.toLowerCase().trim())&&
                  (el.endTime?.toLowerCase()||'').includes(searchFilter.search8.toLowerCase().trim())&&
                  (el.checkIn?.toLowerCase()||'').includes(searchFilter.search9.toLowerCase().trim())    &&
                  (el.checkOut?.toLowerCase()||'').includes(searchFilter.search10.toLowerCase().trim())  &&
                  ((el.totalworkinghour||'00:00')?.toLowerCase()||'').includes(searchFilter.search11.toLowerCase().trim())    
         })
        }

    return (
        <CRow>
            <CCol lg={12} sm={12}>
                <CCard className="mb-3 border-success">
                    <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                        <CCardTitle className="mt-2">   Check Ins</CCardTitle>
                    </CCardHeader>
                    <CCardBody>
                    <CCol lg={4} md={6} sm={8} className='d-flex justify-content-between mb-2' >
                            <CInputGroup  >

                                <CInputGroupText
                                    component="label"
                                    htmlFor="inputGroupSelect01"
                                >
                                   Date
                                </CInputGroupText>
                                <CFormInput
                                    type="date"
                                    value={dateFilterObj.startDate}
                                    onChange={(e)=>setDteFilterObj(()=>({startDate:e.target.value}))}
                                                         
                                />
                                                                   
                                <CButton type="button" color="primary" onClick={()=>getAttendance()} >
                                    Go
                                </CButton>
                            </CInputGroup>
                        </CCol>

                        <CTable className='mt-3'  align="middle" bordered style={{ borderColor: "#0B5345"}} hover responsive>
                            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                                <CTableRow >
                                    <CTableHeaderCell>Sr.No</CTableHeaderCell>
                                    <CTableHeaderCell>Date</CTableHeaderCell>
                                    <CTableHeaderCell style={{minWidth:'150px'}}>Attendance Id</CTableHeaderCell>
                                    <CTableHeaderCell>Name</CTableHeaderCell>
                                    <CTableHeaderCell>Designation</CTableHeaderCell>
                                    <CTableHeaderCell>Shift Timeing</CTableHeaderCell>
                                    <CTableHeaderCell>Start Time</CTableHeaderCell>
                                    <CTableHeaderCell>End Time</CTableHeaderCell>
                                    <CTableHeaderCell style={{ minWidth: "150px" }}>Check In Time</CTableHeaderCell>
                                    <CTableHeaderCell>Check  Out Time</CTableHeaderCell>
                                    <CTableHeaderCell>Total working hour</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                 <CTableRow>
                                    <CTableDataCell  style={{minWidth:'80px'}}><CFormInput disabled value={searchFilter.search1} 
                                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search1:e.target.value}))} /> </CTableDataCell>
                                    <CTableDataCell style={{minWidth:'80px'}}><CFormInput value={searchFilter.search2} 
                                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search2:e.target.value}))} /> </CTableDataCell>
                                    <CTableDataCell style={{minWidth:'80px'}}><CFormInput value={searchFilter.search3} 
                                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search3:e.target.value}))} /> </CTableDataCell>
                                    <CTableDataCell style={{minWidth:'80px'}}><CFormInput value={searchFilter.search4} 
                                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search4:e.target.value}))} /> </CTableDataCell>
                                    <CTableDataCell style={{minWidth:'80px'}}><CFormInput value={searchFilter.search5} 
                                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search5:e.target.value}))} /> </CTableDataCell>
                                    <CTableDataCell style={{minWidth:'80px'}}><CFormInput value={searchFilter.search6} 
                                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search6:e.target.value}))} /> </CTableDataCell>
                                    <CTableDataCell style={{minWidth:'80px'}}><CFormInput value={searchFilter.search7} 
                                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search7:e.target.value}))} /> </CTableDataCell>
                                    <CTableDataCell style={{minWidth:'80px'}}><CFormInput value={searchFilter.search8} 
                                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search8:e.target.value}))} /> </CTableDataCell>
                                    <CTableDataCell style={{minWidth:'80px'}}><CFormInput  value={searchFilter.search9} 
                                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search9:e.target.value}))} /> </CTableDataCell>      
                                          <CTableDataCell style={{minWidth:'80px'}}><CFormInput  value={searchFilter.search10} 
                                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search10:e.target.value}))} /> </CTableDataCell>   
                                          <CTableDataCell style={{minWidth:'80px'}}><CFormInput  value={searchFilter.search11} 
                                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search11:e.target.value}))} /> </CTableDataCell>                                
                                </CTableRow>
                                  {toFilterData(result1).slice(paging * 10, paging * 10 + 10).map((el,i)=>{                                                       
                    return  <CTableRow>
                                    <CTableDataCell>{i+ 1 + (paging * 10)}</CTableDataCell>
                                    <CTableDataCell>{new Date(el.date).toLocaleString()}</CTableDataCell>
                                    <CTableDataCell>{el.attendanceId}</CTableDataCell>
                                    <CTableDataCell>{el.name}</CTableDataCell>
                                    <CTableDataCell>{el.designation}</CTableDataCell>
                                    <CTableDataCell>{el.shiftTimeing}</CTableDataCell>
                                    <CTableDataCell>{el.startTime}</CTableDataCell>
                                    <CTableDataCell>{el.endTime}</CTableDataCell>
                                    <CTableDataCell>{el.checkIn} <u className='ms-2' style={{color:`${el.checkInstatus==='delay'?'red':'black'}`}}>{el.checkInstatus}</u></CTableDataCell>
                                    <CTableDataCell>{el.checkOut} <u className='ms-2' style={{color:`${el.checkOutstatus==='before'?'red':'black'}`}} >{el.checkOutstatus}</u></CTableDataCell>
                                    <CTableDataCell>{el.totalworkinghour}</CTableDataCell>
                                    </CTableRow>
                                  })}
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                    <CPagination aria-label="Page navigation example" align="center" className='mt-2'>
                        <CPaginationItem aria-label="Previous" disabled={paging != 0 ? false : true} onClick={() => paging > 0 && setPaging(paging - 1)}>
                            <span aria-hidden="true">&laquo;</span>
                        </CPaginationItem>
                        <CPaginationItem active onClick={() => setPaging(0)}>{paging + 1}</CPaginationItem>
                        {toFilterData(result1).length > (paging + 1) * 10 && <CPaginationItem onClick={() => setPaging(paging + 1)} >{paging + 2}</CPaginationItem>}
                        {toFilterData(result1).length > (paging + 2) * 10 && <CPaginationItem onClick={() => setPaging(paging + 2)}>{paging + 3}</CPaginationItem>}
                        {toFilterData(result1).length > (paging + 1) * 10 ?
                            <CPaginationItem aria-label="Next" onClick={() => setPaging(paging + 1)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                            : <CPaginationItem disabled aria-label="Next" onClick={() => setPaging(paging + 1)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                        }
                    </CPagination>  
                  
                </CCard>
            </CCol>
        </CRow>
    )
}

export default EmpCheck







