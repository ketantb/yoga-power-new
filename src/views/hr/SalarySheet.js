import React, { useEffect, useState } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCardTitle,
    CCol,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CButton,   
    CFormInput,
    CPagination,
    CPaginationItem
} from '@coreui/react'
import { MdCall, MdDelete, MdEdit, MdMail } from 'react-icons/md';
import { useSelector } from "react-redux";
import axios from 'axios';
let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;
import SalarySlip from './salarySlip/SalarySlip';
import { useAdminValidation } from '../Custom-hook/adminValidation';

const SalarySheet = () => {


    const [salarySheetData,setSalarySheetData] = useState([])
    const [showInvoiceModal,setInvoceModal] = useState(false)
    const [empData,setEmpData] = useState([])
    const url = useSelector((el) => el.domainOfApi)
    const pathVal = useAdminValidation('Master')

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
        search12:'',
        search13:'',
        search14:'',
    })
  
    const [paging, setPaging] = useState(0);


    const headers = {
        "Authorization": `Bearer ${token}`,
       }

    const getShitTimeData = ()=>{
        axios.get(`${url}/salarySheet/${pathVal}`,{headers}).then((el)=>{
         if(!el.status){
          return 
         }
         setSalarySheetData(el.data.reverse())
       }).catch((error)=>{console.log(error)})
       }


    useEffect(() => {
        getShitTimeData()

    }, [])


 const showSalarySlip =(item)=>{
 setEmpData(item)
 setInvoceModal(true)
 }


function toFilterData(data){
    return data.filter((el)=>{
        return (new Date(el.month)?.toLocaleDateString()||'').includes(searchFilter.search2.toLowerCase().trim())&&
        (el.empId.toLowerCase()||'').includes(searchFilter.search3.toLowerCase().trim())&&
        (el.empName.toLowerCase()||'').includes(searchFilter.search4.toLowerCase().trim())&&
        (new Date(el.joiningDate)?.toLocaleDateString()||'').includes(searchFilter.search5.toLowerCase().trim())&&
        (el.Gender.toLowerCase()||'').includes(searchFilter.search6.toLowerCase().trim())&&
        (el.Location.toLowerCase()||'').includes(searchFilter.search7.toLowerCase().trim())&&
        (el.typeOfJobTimeing.toLowerCase()||'').includes(searchFilter.search8.toLowerCase().trim())&&
        (el.Department.toLowerCase()||'').includes(searchFilter.search9.toLowerCase().trim())   &&
        (el.Designations?.toLowerCase()||'').includes(searchFilter.search10.toLowerCase().trim())   &&
        (el.bankAcountNo?.toLowerCase()||'').includes(searchFilter.search11.toLowerCase().trim())  && 

        (el.modeOfPayment.toLowerCase()||'').includes(searchFilter.search13.toLowerCase().trim())

})
 }


    return (
      <>
             <SalarySlip
             empData={empData}
            showInvoiceModal={showInvoiceModal}
            setInvoceModal={setInvoceModal}
             />

        <CRow>
            <CCol lg={12} sm={12}>
                <CCard className="mb-3 border-success">
                    <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                        <CCardTitle className="mt-2">Salary Sheet</CCardTitle>
                    </CCardHeader>

                    <CCardBody>

                        <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                                    <CTableHeaderCell>Sr no</CTableHeaderCell>
                                    <CTableHeaderCell>Date</CTableHeaderCell>
                                    <CTableHeaderCell>Emp ID</CTableHeaderCell>
                                    <CTableHeaderCell>Name</CTableHeaderCell>
                                    <CTableHeaderCell>JoiningDate</CTableHeaderCell>
                                    <CTableHeaderCell>Gender</CTableHeaderCell>
                                    <CTableHeaderCell>Location</CTableHeaderCell>
                                    <CTableHeaderCell>Full/Part Time</CTableHeaderCell>
                                    <CTableHeaderCell>Department</CTableHeaderCell>
                                    <CTableHeaderCell>Designations</CTableHeaderCell>
                                    <CTableHeaderCell>Account No</CTableHeaderCell>
                                    <CTableHeaderCell>No of Half Day</CTableHeaderCell>
                                    <CTableHeaderCell>Late Mark</CTableHeaderCell>
                                    <CTableHeaderCell>Leave Day</CTableHeaderCell>
                                    <CTableHeaderCell>Adjust Leave</CTableHeaderCell>
                                    <CTableHeaderCell>Monthly Salary</CTableHeaderCell>
                                    <CTableHeaderCell>TWD</CTableHeaderCell>
                                    <CTableHeaderCell>PF%</CTableHeaderCell>
                                    <CTableHeaderCell>TDS%</CTableHeaderCell>
                                    <CTableHeaderCell>PT</CTableHeaderCell>
                                    <CTableHeaderCell>Adev Dec</CTableHeaderCell>
                                    <CTableHeaderCell>Gross Salary</CTableHeaderCell>
                                    <CTableHeaderCell>Incentive</CTableHeaderCell>
                                    <CTableHeaderCell>Net Salary </CTableHeaderCell>
                                    <CTableHeaderCell>Made of Payment</CTableHeaderCell>
                                    <CTableHeaderCell>Remark</CTableHeaderCell>
                                    <CTableHeaderCell>Salary Slip </CTableHeaderCell>
                            </CTableHead>
                            <CTableBody>
                                <CTableRow>
                                <CTableDataCell     ><CFormInput className='min-width-90' disabled value={searchFilter.search1} 
                                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search1:e.target.value}))} /> </CTableDataCell>
                                    <CTableDataCell ><CFormInput className='min-width-90' value={searchFilter.search2} 
                                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search2:e.target.value}))} /> </CTableDataCell>
                                    <CTableDataCell ><CFormInput className='min-width-90' value={searchFilter.search3} 
                                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search3:e.target.value}))} /> </CTableDataCell>
                                    <CTableDataCell ><CFormInput className='min-width-90' value={searchFilter.search4} 
                                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search4:e.target.value}))} /> </CTableDataCell>
                                    <CTableDataCell ><CFormInput className='min-width-90' value={searchFilter.search5} 
                                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search5:e.target.value}))} /> </CTableDataCell>
                                    <CTableDataCell ><CFormInput className='min-width-90'value={searchFilter.search6} 
                                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search6:e.target.value}))} /> </CTableDataCell>
                                    <CTableDataCell ><CFormInput className='min-width-90' value={searchFilter.search7} 
                                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search7:e.target.value}))} /> </CTableDataCell>
                                    <CTableDataCell ><CFormInput className='min-width-90' value={searchFilter.search8} 
                                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search8:e.target.value}))} /> </CTableDataCell>
                                    <CTableDataCell ><CFormInput  className='min-width-90' value={searchFilter.search9} 
                                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search9:e.target.value}))} /> </CTableDataCell>           
                                    <CTableDataCell ><CFormInput className='min-width-90'value={searchFilter.search10} 
                                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search10:e.target.value}))} /> </CTableDataCell>
                                    <CTableDataCell ><CFormInput  className='min-width-90'value={searchFilter.search11} 
                                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search11:e.target.value}))} /> </CTableDataCell>
                                    <CTableDataCell ><CFormInput disabled className='min-width-90'
                                    /> </CTableDataCell>
                                     
                                     <CTableDataCell colSpan={12} ><CFormInput className='min-width-90' disabled value={searchFilter.search12} 
                                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search12:e.target.value}))} /> </CTableDataCell>
                                 <CTableDataCell ><CFormInput className='min-width-90' value={searchFilter.search13} 
                                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search13:e.target.value}))} /> </CTableDataCell>
                                <CTableDataCell colSpan={5} ><CFormInput className='min-width-90'  disabled 
                                    /> </CTableDataCell>
                                </CTableRow>                                
                                
                                {toFilterData(salarySheetData).slice(paging * 10, paging * 10 + 10).map((item, i) => (
                                        <CTableRow key={i}>
                                            <CTableDataCell>{i+ 1 + (paging * 10) }</CTableDataCell>
                                            <CTableDataCell>{new Date(item.month).toLocaleDateString()}</CTableDataCell>
                                            <CTableDataCell>{item.empId}</CTableDataCell>
                                            <CTableDataCell>{item.empName}</CTableDataCell>
                                            <CTableDataCell>{new Date(item.joiningDate).toLocaleDateString()}</CTableDataCell>
                                            <CTableDataCell>{item.Gender}</CTableDataCell>
                                            <CTableDataCell>{item.Location}</CTableDataCell>
                                            <CTableDataCell>{item.typeOfJobTimeing}</CTableDataCell>
                                            <CTableDataCell>{item.Department}</CTableDataCell>
                                            <CTableDataCell>{item.Designations}</CTableDataCell>
                                            <CTableDataCell>{item.bankAcountNo}</CTableDataCell>
                                            <CTableDataCell>{item.halfday}</CTableDataCell>
                                            <CTableDataCell>{item.lateMark}</CTableDataCell>
                                            <CTableDataCell>{item.leaveDay}</CTableDataCell>                                           
                                            <CTableDataCell>{item.adjustLeave}</CTableDataCell>
                                            <CTableDataCell>{item.BasicSalary}</CTableDataCell>
                                            <CTableDataCell>{item.TWD}</CTableDataCell>
                                            <CTableDataCell>{item.TPD}%</CTableDataCell>
                                            <CTableDataCell>{item.TDS}%</CTableDataCell>
                                            <CTableDataCell>{item.PT}</CTableDataCell>
                                            <CTableDataCell>{item.advancedSalaryDedct}</CTableDataCell>
                                            <CTableDataCell>{item.grossSalary}</CTableDataCell>
                                            <CTableDataCell>{item.incentive}</CTableDataCell>
                                            <CTableDataCell>{item.netSalary}</CTableDataCell>
                                            <CTableDataCell>{item.modeOfPayment}</CTableDataCell>
                                            <CTableDataCell>{item.remark}</CTableDataCell>
                                            <CTableDataCell><CButton onClick={()=>showSalarySlip(item)} >View</CButton></CTableDataCell>
                                        </CTableRow>
                                ))}
                            </CTableBody>
                        </CTable>
                        <CPagination aria-label="Page navigation example" align="center" className='mt-2'>
                        <CPaginationItem aria-label="Previous" disabled={paging != 0 ? false : true} onClick={() => paging > 0 && setPaging(paging - 1)}>
                            <span aria-hidden="true">&laquo;</span>
                        </CPaginationItem>
                        <CPaginationItem active onClick={() => setPaging(0)}>{paging + 1}</CPaginationItem>
                        {toFilterData(salarySheetData).length > (paging + 1) * 10 && <CPaginationItem onClick={() => setPaging(paging + 1)} >{paging + 2}</CPaginationItem>}
                        {toFilterData(salarySheetData).length > (paging + 2) * 10 && <CPaginationItem onClick={() => setPaging(paging + 2)}>{paging + 3}</CPaginationItem>}
                        {toFilterData(salarySheetData).length > (paging + 1) * 10 ?
                            <CPaginationItem aria-label="Next" onClick={() => setPaging(paging + 1)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                            : <CPaginationItem disabled aria-label="Next" onClick={() => setPaging(paging + 1)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                        }
                    </CPagination>  
                    </CCardBody>
                   
                </CCard>
            </CCol>
        </CRow>
    </>
    )
}

export default SalarySheet
