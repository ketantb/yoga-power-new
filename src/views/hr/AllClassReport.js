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
    CPagination,
    CPaginationItem
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

    const [searchFilter,setSearchFilter] = useState({
        search1:'',
        search2:'',
        search3:'',
        search4:'',
        search5:'',
        search6:'',
        search7:'',  
    })
    const [paging, setPaging] = useState(0);

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

    // <CTableDataCell>{el.Year+" "+el.Month} </CTableDataCell>
    //                                    <CTableDataCell>{el.Trainer}</CTableDataCell>
    //                                    <CTableDataCell>{el.category}</CTableDataCell>
    //                                    <CTableDataCell>{el.numberOfAttended}</CTableDataCell>
    //                                    <CTableDataCell>{el.BatchTime}</CTableDataCell>
    //                                    <CTableDataCell>{el.totalWorkingHours}</CTableDataCell>

    function toFilterData(data){
        return data.filter((el)=>{
                  return ((el.Year+" "+el.Month)?.toLowerCase()||'').includes(searchFilter.search2.toLowerCase().trim())&&
                  (el.Trainer?.toLowerCase()||'').includes(searchFilter.search3.toLowerCase().trim())&&
                  (el.category?.toLowerCase()||'').includes(searchFilter.search4.toLowerCase().trim())&&
                  ((el.numberOfAttended+"")||'').includes(searchFilter.search5.toLowerCase().trim())&&
                  ((el.BatchTime+"")?.toLowerCase()||'').includes(searchFilter.search6.toLowerCase().trim())&&
                  ((el.totalWorkingHours+"")?.toLowerCase()||'').includes(searchFilter.search7.toLowerCase().trim()) 
         })
        }

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
                            </CTableRow>
                                {toFilterData(classReportData).slice(paging * 10, paging * 10 + 10).map((el,i)=>
                                <CTableRow>
                                       <CTableDataCell>{i+ 1 + (paging * 10)} </CTableDataCell>
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
                    <CPagination aria-label="Page navigation example" align="center" className='mt-2'>
                        <CPaginationItem aria-label="Previous" disabled={paging != 0 ? false : true} onClick={() => paging > 0 && setPaging(paging - 1)}>
                            <span aria-hidden="true">&laquo;</span>
                        </CPaginationItem>
                        <CPaginationItem active onClick={() => setPaging(0)}>{paging + 1}</CPaginationItem>
                        {toFilterData(classReportData).length > (paging + 1) * 10 && <CPaginationItem onClick={() => setPaging(paging + 1)} >{paging + 2}</CPaginationItem>}
                        {toFilterData(classReportData).length > (paging + 2) * 10 && <CPaginationItem onClick={() => setPaging(paging + 2)}>{paging + 3}</CPaginationItem>}
                        {toFilterData(classReportData).length > (paging + 1) * 10 ?
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

export default AllClassReport
//noOfClasses
