import React,{useState,useEffect} from 'react'
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
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CPagination,
    CPaginationItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowCircleBottom, cilArrowCircleTop, cilPlus } from '@coreui/icons'
import axios from 'axios'
import { useSelector } from 'react-redux'
import moment from 'moment/moment'
import { useAdminValidation } from '../Custom-hook/adminValidation'
let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;

const ChequeReport = () => {
const [paging, setPaging] = useState(0);

const [cheque,setChaqueData] = useState([])
const url1 = useSelector((el)=>el.domainOfApi) 
const pathVal =  useAdminValidation()
const [staffS,setStaffS] = useState('')


const headers = {
    'Authorization': `Bearer ${token}`,
    'My-Custom-Header': 'foobar'
};

const getAllInvoiceData = async  ()=>{
    
    try{
    const response1 = await axios.get(`${url1}/invoice/${pathVal}`,{headers})


   const newCashData =   response1.data.map((el)=>{
        if(el.paymode ==='Cheque'){
        let dipositeToBank  = "Rs" + el.paidAmount
        if(el?.Receipts.length){
         el?.Receipts.forEach((el3)=>{
            dipositeToBank +=  " Rs"+el3?.PaidAmount
         })
        }  

        return {
            date:el.createdAt,
            totalCash:el.amount,
            dipositeToBank,
            counseller:el.counseller,
            ifcCode:el.ifcCode,
            bankName:el.bankName,
            checkNo:el.checkNo
        }
       }}).filter((el)=>el)
   setChaqueData(newCashData)
    }catch(error){
    console.log(error)
    }
    }

const [staff, setStaff] = useState([])
   function getStaff() {
  axios.get(`${url1}/employeeform/${pathVal}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
    .then((res) => {
        setStaff(res.data)
    })
    .catch((error) => {
        console.error(error)
    })
}
    useEffect(()=>{
        getAllInvoiceData()
        getStaff()

    },[])


function totfilterData(data){
        const filterData = data.filter((el)=>{
            return  el?.counseller?.includes(staffS)
        })
       return filterData
}    

    return (
        <CRow>
            <CCol lg={12} sm={12}>
                <CCard className='mb-3 border-top-success border-top-3'>
                    <CCardHeader>
                        <strong className="mt-2">Cheque Report</strong>
                    </CCardHeader>
                    <CCardBody>
                    <CRow className='my-3'>
                        
                        <CCol lg={4} className='mb-2'>
                        <CFormSelect
                        value={staffS}
                        onChange={(e)=>setStaffS(e.target.value)}
                                                                                                                           
                        >
                        <option>Select By Staff</option>
                            {staff.filter((list) => 
                             list.selected === 'Select').map((item, index) => (
                                <option key={index}>{item.FullName}</option>
                            ))}

                        </CFormSelect>
                        </CCol>
                      
                    </CRow>
                    <CRow>
                        <CCol>
                        <CCol className=' mb-3'>
                        <CButton onClick={()=>{setStaffS('')}} >Clear Filter</CButton>
                        </CCol>
                        </CCol>
                    </CRow>
                        <CTable bordered style={{ borderColor: "#106103" }} responsive>
                            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }}>
                                <CTableRow>
                                    <CTableHeaderCell scope="col">Sr No</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Cheque No</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">
                                        Cheque Amonut
                                    </CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Bank Name</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">IFC code</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Deposite By</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {totfilterData(cheque).slice(paging * 10, paging * 10 + 10).map((el,i)=>{                                    
                                    const splitCheck =(el)=>{
                                        return el.split(' ').map((el)=>{
                                            return <><b>{el}</b><br/></>
                                        })
                                    }

                                   return <CTableRow>
                                    <CTableDataCell>{i + 1 + (paging * 10)}</CTableDataCell>
                                        <CTableDataCell>{moment(el.date).format('MM-DD-YYYY')}</CTableDataCell>
                                        <CTableDataCell>{el.checkNo}</CTableDataCell>
                                        <CTableDataCell className='text-center'>{splitCheck(el.dipositeToBank)}</CTableDataCell>
                                        <CTableDataCell>{el.bankName}</CTableDataCell>
                                        <CTableDataCell>{el.ifcCode}</CTableDataCell>
                                        <CTableDataCell>{el.counseller}</CTableDataCell>
                                    </CTableRow>

                                })}
                               
                            </CTableBody>
                        </CTable>
                        <CPagination aria-label="Page navigation example" align="center" className='mt-2'>
                            <CPaginationItem aria-label="Previous" disabled={paging != 0 ? false : true} onClick={() => paging > 0 && setPaging(paging - 1)}>
                                <span aria-hidden="true">&laquo;</span>
                            </CPaginationItem>
                            <CPaginationItem active onClick={() => setPaging(0)}>{paging + 1}</CPaginationItem>
                            {totfilterData(cheque).length > (paging + 1) * 10 && <CPaginationItem onClick={() => setPaging(paging + 1)} >{paging + 2}</CPaginationItem>}

                            {totfilterData(cheque).length > (paging + 2) * 10 && <CPaginationItem onClick={() => setPaging(paging + 2)}>{paging + 3}</CPaginationItem>}
                            {totfilterData(cheque).length > (paging + 1) * 10 ?
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
    )
}

export default ChequeReport