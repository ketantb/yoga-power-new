import React, { useEffect, useState } from 'react'
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
    CPaginationItem
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowCircleBottom, cilArrowCircleTop, cilPlus } from '@coreui/icons'
import moment from 'moment/moment'

let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;
const username = user.user.username;
const centerCode = user.user.centerCode;
import { AiOutlineCheckCircle } from 'react-icons/ai'
const headers = {
    'Authorization': `Bearer ${token}`,
    'My-Custom-Header': 'foobar'
};
import { useSelector } from 'react-redux'

import axios from 'axios'
import { useAdminValidation } from '../Custom-hook/adminValidation'
const PaymentMode = () => {

const url1 = useSelector((el)=>el.domainOfApi) 
const pathVal = useAdminValidation()
const [paymetData,setPaymentData] = useState([])
const [paymentType,setPyamentType] = useState([])
const [staffS,setStaffS] = useState('')
const [pagination,setPagination] = useState(10)

let paginationum  =0

let allPaymentType =[
    { label: "Cash", value: false },
    { label: "Debit Card", value: false },
    { label: "Credit Card", value: false },
    { label: "Cheque", value: false },
    { label: "Draft", value: false },
    { label: "Paytm", value: false },
    { label: "GPay", value: false},
    { label: "PhonePe", value: false },
    { label: "Account Pay", value: false },
]



const getAllInvoiceData = async  ()=>{
try{


const response1 = await axios.get(`${url1}/invoice/${pathVal}`,{headers})
console.log(response1.data)

const PaymentData = response1.data.flatMap((el)=>{
    console.log(el.counseller)

return allPaymentType.map((el2)=>{
if(el.paymode ===el2.label){
    el2.value =true
let totalColection  = el.paidAmount
if(el?.Receipts.length){
 el?.Receipts.forEach((el3)=>{
    totalColection += +el3?.PaidAmount
 })
}  
return {...el2,totalColection,counseller:el.counseller,date:el.createdAt}

}
})
}).filter((el)=>el)

setPaymentData(PaymentData)

}catch(error){
console.log(error)
}
}

// console.log(invoiceData)

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
getStaff()
getAllInvoiceData()
},[])

function clearFilter(){
    setStaffS('')
    setPyamentType('')
 }

    return (
        <CRow>
            <CCol lg={12} sm={12}>
                <CCard className='mb-3 border-top-success border-top-3'>
                    <CCardHeader>
                        <strong className="mt-2">Payment Mode</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CRow className='my-3'>
                            <CCol lg={4} className='mb-2'>
                              <CFormSelect value={paymentType} onChange={(e)=>setPyamentType(e.target.value)}>
                                <option>Select by Payment mode</option>
                                {allPaymentType.map((el,i)=>{
                                return <option key={i}>{el.label}</option>
                                })}
                              </CFormSelect>
                            </CCol >
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
                            <CButton onClick={(e)=>clearFilter(e.target.value)}>Clear Filter</CButton>
                            </CCol>
                            </CCol>
                        </CRow>
                        <CTable bordered style={{ borderColor: "#106103" }} responsive>
                            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }}>
                                <CTableRow>
                                    <CTableHeaderCell scope="col">Sr No</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Cash</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">
                                        GPay
                                    </CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Card</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">A/c</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">UPI</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Cheque</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Total Collection</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Collected By</CTableHeaderCell>                        
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {paymetData.filter((el)=>{
                                    return el.counseller?.toLowerCase()?.includes(staffS.toLowerCase()) && el.label?.includes(paymentType)
                                }).filter((el)=>{
                                    paginationum++
                                    return el
                                }).filter((el, i) => {
                                    if (pagination - 10 < i + 1 && pagination >= i + 1) {
                                    return el}}).map((el,i)=>{
                               return <CTableRow>
                                    <CTableDataCell>{i+pagination-10+1}</CTableDataCell>
                                    <CTableDataCell>{moment(el.date).format("MM-DD-YYYY")}</CTableDataCell>
                                    <CTableDataCell className='text-center'>{el.label==='Cash'?<CButton className="h5 text-white" color='success' ><AiOutlineCheckCircle/></CButton>:''}</CTableDataCell>
                                    <CTableDataCell className='text-center'>{el.label==='GPay'?<CButton className="h5 text-white" color='success' ><AiOutlineCheckCircle/></CButton>:''}</CTableDataCell>
                                    <CTableDataCell className='text-center'>{el.label.includes('Card')?<CButton className="h5 text-white" color='success' ><AiOutlineCheckCircle/></CButton>:''}</CTableDataCell>
                                    <CTableDataCell className='text-center'>{'Account Pay  Draft'.includes(el.label)?<CButton className="h5 text-white" color='success' ><AiOutlineCheckCircle/></CButton>:''}</CTableDataCell>
                                    <CTableDataCell className='text-center'>{'PhonePe  Paytm'.includes(el.label)?<CButton className="h5 text-white" color='success' ><AiOutlineCheckCircle/></CButton>:''}</CTableDataCell>
                                    <CTableDataCell className='text-center'>{el.label==='Cheque'?<CButton className="h5 text-white" color='success' ><AiOutlineCheckCircle/></CButton>:''}</CTableDataCell>
                                    <CTableDataCell>Rs {el.totalColection}</CTableDataCell>
                                    <CTableDataCell>{el.counseller}</CTableDataCell>
                                </CTableRow>
                                })}                               
                            </CTableBody>
                        </CTable>
                        <div className='d-flex justify-content-center mt-3' >
                        <CPagination aria-label="Page navigation example" style={{cursor:'pointer'}}>
                            <CPaginationItem aria-label="Previous" onClick={() => setPagination((val) => val > 10 ? val - 10 : 10)}>
                                <span aria-hidden="true" >&laquo;</span>
                            </CPaginationItem>
                            <CPaginationItem active >{pagination / 10}</CPaginationItem>
                            {paginationum > pagination / 10 * 10 && <CPaginationItem onClick={() => setPagination((val) => val < paginationum  ? val + 10 : val)}>{pagination / 10 + 1}</CPaginationItem>}
                            {paginationum  > pagination / 10 * 20 && <CPaginationItem onClick={() => setPagination((val) => val < paginationum  ? val + 10 : val)}>{pagination / 10 + 2}</CPaginationItem>}
                            <CPaginationItem aria-label="Next" onClick={() => setPagination((val) => val < paginationum ? val + 10 : val)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                        </CPagination>
                            </div>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default PaymentMode;