import React,{useEffect, useState} from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormSelect,
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

import axios from 'axios'
import { useSelector } from 'react-redux'
import moment from 'moment/moment'
import { useAdminValidation } from '../Custom-hook/adminValidation'

let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;

const headers = {
    'Authorization': `Bearer ${token}`,
    'My-Custom-Header': 'foobar'
   };


const Totalc= () => {
  const [totalCollection,setTotalCollection] = useState([])
  const [paymentModal,setPaymentModal] = useState('')
  const [staffS,setStaffS] = useState('')
  const url1 = useSelector((el)=>el.domainOfApi) 
  const pathVal =    useAdminValidation()
  const [paging, setPaging] = useState(0);


  const getInvoiceDataToTotalCollection = async  ()=>{

  const {data} = await axios.get(`${url1}/invoice/${pathVal}`,{headers})
  console.log(data)
  setTotalCollection(data.reverse())
  }


  useEffect(()=>{
    getInvoiceDataToTotalCollection()
    getStaff()
  },[])


const [staff, setStaff] = useState([])
function getStaff() {
    axios.get(`${url1}/employeeForm/${pathVal}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then((res) => {
            setStaff(res.data.reverse())
        })
        .catch((error) => {
            console.error(error)
        })
}

function clearFilter(){
   setStaffS('')
   setPaymentModal('')
}

function totfilterData(data){
    const filterData = data.filter((el)=>{
        return el?.paymode?.includes(paymentModal) &&
        el?.counseller?.includes(staffS)
    })
   return filterData
}

    return (
        <CRow>
            <CCol lg={12} sm={12}>
                <CCard className='mb-3 border-top-success border-top-3'>
                    <CCardHeader>
                        <strong className="mt-2">Total Collection</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CRow>
                        <CCol lg={4} className='mb-2'>
                            <CFormSelect 
                            value={paymentModal}
                            onChange={(e)=>setPaymentModal(e.target.value)}
                            options={[
                                "Select By Payment Model",
                                { label: "Cash", value: "Cash" },
                                { label: "Debit Card", value: "Debit Card" },
                                { label: "Credit Card", value: "Credit Card" },
                                { label: "Cheque", value: "Cheque" },
                                { label: "Draft", value: "Draft" },
                                { label: "Paytm", value: "Paytm" },
                                { label: "GPay", value: "GPay" },
                                { label: "PhonePe", value: "PhonePe" },
                                { label: "Account Pay", value: "Account Pay" },
                            ]}
                            >
                               
                            </CFormSelect>
                            </CCol>
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
                            </CCol >

                        </CRow>   
                        <CRow>
                            <CCol>
                            <CCol className=' mb-3'>
                            <CButton onClick={(e)=>clearFilter(e.target.value)}>Clear Filter</CButton>
                            </CCol>
                            </CCol>
                        </CRow>
                        <div style={{overflow:'scroll'}}>                                          
                        <CTable className='m-0 p-0' bordered style={{ borderColor: "#106103",width:'150%' }} responsive>
                            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }}>
                                <CTableRow>
                                    <CTableHeaderCell scope="col">Sr No</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Center Code</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">
                                        Invoice No
                                    </CTableHeaderCell>
                                    <CTableHeaderCell scope="col" style={{width:'200px'}}>Receipt No</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">client ID</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">client Name</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Payment Mode</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Bank Name</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">IFC code</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Collected By</CTableHeaderCell>
                          
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {totfilterData(totalCollection).slice(paging * 10, paging * 10 + 10)
                                
                                .map((el,i)=>{

                            const ReceipstsNo = (recepits,el)=>{
                                if(!recepits.length){
                                  return "Not created yet"                                                           
                                }else if(recepits.length){

                               return recepits.map((el2,i)=>{
                                    return <><span className='mb-2'><u>{el.InvoiceNo +"RN"+ +(1+i)}</u></span><br/></> 
                                           
                                })

                                }

                            }

                           return    <CTableRow key={i}>
                                   <CTableDataCell>{i + 1 + (paging * 10)}</CTableDataCell>
                                    <CTableDataCell>{moment(el.createdAt).format("MM-DD-YYYY")}</CTableDataCell>
                                    <CTableDataCell>{el.centerName}</CTableDataCell>
                                    <CTableDataCell>{el.InvoiceNo}</CTableDataCell>
                                    <CTableDataCell className='text-center'>
                                        {
                                            
                                        ReceipstsNo(el.Receipts,el)
                                        
                                        }
                                        
                                    </CTableDataCell>
                                    <CTableDataCell>{el.clientId}</CTableDataCell>
                                    <CTableDataCell>{el.MemberName}</CTableDataCell>
                                    <CTableDataCell>{el.paymode}</CTableDataCell>
                                    <CTableDataCell>{el.bankName}</CTableDataCell>
                                    <CTableDataCell>{el.ifcCode}</CTableDataCell>
                                    <CTableDataCell>{el.paidAmount}</CTableDataCell>
                                    <CTableDataCell>{el.counseller}</CTableDataCell>
                                </CTableRow>
})}
                                
                            </CTableBody>
                        </CTable>
                        </div>  
                         <CPagination aria-label="Page navigation example" align="center" className='mt-2'>
                         <CPaginationItem aria-label="Previous" disabled={paging != 0 ? false : true} onClick={() => paging > 0 && setPaging(paging - 1)}>
                             <span aria-hidden="true">&laquo;</span>
                         </CPaginationItem>
                         <CPaginationItem active onClick={() => setPaging(0)}>{paging + 1}</CPaginationItem>
                         {totfilterData(totalCollection).length > (paging + 1) * 10 && <CPaginationItem onClick={() => setPaging(paging + 1)} >{paging + 2}</CPaginationItem>}
         
                         {totfilterData(totalCollection).length > (paging + 2) * 10 && <CPaginationItem onClick={() => setPaging(paging + 2)}>{paging + 3}</CPaginationItem>}
                         {totfilterData(totalCollection).length > (paging + 1) * 10 ?
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

export default Totalc