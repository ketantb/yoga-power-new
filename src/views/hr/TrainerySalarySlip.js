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
import { useSelector } from 'react-redux';


let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;

import TrainerSlip from './TrainerSlip/TrainerSlip';
import { useAdminValidation } from '../Custom-hook/adminValidation';

const TrainerySalary = () => {


    const [trainerSalarySlipData,setTrainerSalrySlipData] = useState([])  
    const url1 = useSelector((el) => el.domainOfApi)
    const [showInvoiceModal,setInvoceModal] = useState(false)
    const [empData,setEmpData] = useState([])
    const pathValMaster =  useAdminValidation('Master') 
 
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


     const getTrainerSalarySlipData = ()=>{
      axios.get(`${url1}/trainerSalarySlip/${pathValMaster}`, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      })
          .then((res) => {
              setTrainerSalrySlipData(res.data.reverse())
          })
          .catch((error) => {
              console.error(error)
          })
    }
    
    useEffect(()=>{
      getTrainerSalarySlipData()
    },[])
 
    const showSalarySlip =(item)=>{
        setEmpData(item)
        setInvoceModal(true)
    }

    function toFilterData(data){
        return data.filter((el)=>{
            return (new Date(el.date).toLocaleDateString()||'').includes(searchFilter.search2.toLowerCase().trim())&&
            (new Date((el.joiningDate||"")).toLocaleDateString()||'').includes(searchFilter.search3.toLowerCase().trim())&&
            (el.trainerName?.toLowerCase()||'').includes(searchFilter.search4.toLowerCase().trim())&&
            (el.EmpId?.toLowerCase()||'').includes(searchFilter.search5.toLowerCase().trim())&&
            (el.Gender?.toLowerCase()||'').includes(searchFilter.search6.toLowerCase().trim())&&
            (el.Department?.toLowerCase()||'').includes(searchFilter.search7.toLowerCase().trim())&&
            (el.designation?.toLowerCase()||'').includes(searchFilter.search8.toLowerCase().trim())&&
            (el.bankAccountNo?.toLowerCase()||'').includes(searchFilter.search9.toLowerCase().trim())&&
            (el.modeOfPayment?.toLowerCase()||'').includes(searchFilter.search11.toLowerCase().trim())  
    
      })
      }
       

    return (<>
    
        <TrainerSlip
             empData={empData}
            showInvoiceModal={showInvoiceModal}
            setInvoceModal={setInvoceModal}
             />
         <CRow>
            <CCol lg={12} sm={12}>
                <CCard className="mb-3 border-success">
                    <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                        <CCardTitle className="mt-2">Trainer Salary Sheet</CCardTitle>
                    </CCardHeader>
                    <CCardBody>


                        <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                            <CTableHead color={'darkGreen'} >
                                    <CTableHeaderCell>Sr no</CTableHeaderCell>
                                    <CTableHeaderCell>Date</CTableHeaderCell>
                                    <CTableHeaderCell>Joining Date</CTableHeaderCell>
                                    <CTableHeaderCell>Trainer name</CTableHeaderCell>
                                    <CTableHeaderCell>Trainer Emp ID</CTableHeaderCell>
                                    <CTableHeaderCell>Gender</CTableHeaderCell>
                                    <CTableHeaderCell>Department</CTableHeaderCell>
                                    <CTableHeaderCell>designation</CTableHeaderCell>
                                    <CTableHeaderCell>bank AccountNo</CTableHeaderCell>
                                    <CTableHeaderCell>Total Working Hours</CTableHeaderCell>  
                                    <CTableHeaderCell>Per Hours Amount</CTableHeaderCell>  
                                    <CTableHeaderCell>Amount</CTableHeaderCell>             
                                    <CTableHeaderCell>TDS%</CTableHeaderCell>  
                                    <CTableHeaderCell>PT</CTableHeaderCell>  
                                    <CTableHeaderCell>PF%</CTableHeaderCell>  
                                    <CTableHeaderCell>ADV DEC</CTableHeaderCell> 
                                    <CTableHeaderCell>remark</CTableHeaderCell>           
                                    <CTableHeaderCell>Mode OF Payment</CTableHeaderCell>  
                                    <CTableHeaderCell>Net Salary</CTableHeaderCell>  
                                    <CTableHeaderCell>View</CTableHeaderCell>  
                            </CTableHead>
                            <CTableBody>
                                <CTableRow>
                                    <CTableDataCell><CFormInput className='min-width-90' disabled value={searchFilter.search1} 
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
                                    <CTableDataCell colSpan={8} ><CFormInput disabled className='min-width-90'
                                    /> </CTableDataCell><CTableDataCell ><CFormInput  className='min-width-90' value={searchFilter.search11} 
                                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search11:e.target.value}))} /> </CTableDataCell>  
                                    <CTableDataCell colSpan={3} ><CFormInput  disabled lassName='min-width-90'  /> </CTableDataCell>  
                                </CTableRow>
                              
                                {toFilterData(trainerSalarySlipData).slice(paging * 10, paging * 10 + 10).map((el,i)=>{

                                return <CTableRow className='text-center' >
                                        <CTableDataCell>{i+ 1 + (paging * 10)}</CTableDataCell>
                                        <CTableDataCell>{new Date(el.date).toLocaleDateString()}</CTableDataCell>
                                        <CTableDataCell>{new Date((el.joiningDate||"")).toLocaleDateString()}</CTableDataCell>

                                        <CTableDataCell>{el.trainerName}</CTableDataCell>
                                        <CTableDataCell>{el.EmpId}</CTableDataCell>
                                        <CTableDataCell>{el.Gender}</CTableDataCell>
                                        <CTableDataCell>{el.Department}</CTableDataCell>
                                        <CTableDataCell>{el.designation}</CTableDataCell>
                                        <CTableDataCell>{el.bankAccountNo}</CTableDataCell>
                                        <CTableDataCell>{el.totalWorkingHours}</CTableDataCell>
                                        <CTableDataCell>{el.prHourSalary}</CTableDataCell>
                                        <CTableDataCell>{el.totalAmount}</CTableDataCell>
                                        <CTableDataCell>{el.tds}%</CTableDataCell>
                                        <CTableDataCell>{el.pt}</CTableDataCell>
                                        <CTableDataCell>{el.Pf}%</CTableDataCell>  
                                        <CTableDataCell>{el.advDec}</CTableDataCell>
                                        <CTableDataCell>{el.remark}</CTableDataCell>
                                        <CTableDataCell>{el.modeOfPayment}</CTableDataCell>
                                        <CTableDataCell>{+el.amount+ +el.incentive}</CTableDataCell>
                                        <CTableDataCell><CButton onClick={()=>showSalarySlip(el)} >View</CButton></CTableDataCell>
                                    </CTableRow>
                                })}
                                      
                            </CTableBody>
                        </CTable>
                        <CPagination aria-label="Page navigation example" align="center" className='mt-2'>
                        <CPaginationItem aria-label="Previous" disabled={paging != 0 ? false : true} onClick={() => paging > 0 && setPaging(paging - 1)}>
                            <span aria-hidden="true">&laquo;</span>
                        </CPaginationItem>
                        <CPaginationItem active onClick={() => setPaging(0)}>{paging + 1}</CPaginationItem>
                        {toFilterData(trainerSalarySlipData).length > (paging + 1) * 10 && <CPaginationItem onClick={() => setPaging(paging + 1)} >{paging + 2}</CPaginationItem>}
                        {toFilterData(trainerSalarySlipData).length > (paging + 2) * 10 && <CPaginationItem onClick={() => setPaging(paging + 2)}>{paging + 3}</CPaginationItem>}
                        {toFilterData(trainerSalarySlipData).length > (paging + 1) * 10 ?
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

export default TrainerySalary
