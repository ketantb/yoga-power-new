import {
    CButton,
   
    CCol,
  
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CCard,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CImage,

} from '@coreui/react'

import logo from 'src/assets/images/avatars/icon.png'
import { useReactToPrint } from 'react-to-print'

import { useState,useRef, useEffect } from 'react'
import classNames from 'classnames'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useAdminValidation } from '../Custom-hook/adminValidation'

const getDate = (date,val) => {

    const date2 = new Date(date).getDate() + "/" + (new Date(date).getMonth() + (val? 1:0)) + "/" + new Date(date).getFullYear()
    if (date2 === 'NaN/NaN/NaN') {
        return 'Invalid Date'
    }
    return date2

}



const ViewRecepits = ({ showReceipts,setShowReceipts,receptsData,receptsInvoiceData,resiptNo}) => {
  const  ElRef =useRef()

  const handlePrint = useReactToPrint({
    content: () => ElRef.current,
    documentTitle: 'yog-power',
    onAfterPrint: () => alert('print success')
})

const pathVal =useAdminValidation('Master')

let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;
   
const headers = {
  headers: {
      'Authorization': `Bearer ${token}`
  }
}
const [invoiceViewData,setViewInvoiceData]  =useState({
  TNC:'',
  InvoiceLogo:'',
  InvoiceTitle:'',
  Address:""
})

const url = useSelector((el)=>el.domainOfApi)

useEffect(async ()=>{
try{
  const response4  = await axios.get(`${url}/center-invoice-setup/${pathVal}`,headers)
  if(response4.status===200){
    console.log(response4)
    setViewInvoiceData(response4.data)
  }
}catch(error){
console.log(error)
}  
},[])


  return (
  <CModal size="lg" alignment="center" scrollable visible={showReceipts} onClose={() => setShowReceipts(false)}>

    <CModalHeader>
        <CModalTitle>Recepits Preview</CModalTitle>
    </CModalHeader>
  
    <CModalBody ref={ElRef}>
    <header className='px-3 py-3' style={{ backgroundColor: "#0B5345", color: "white" }} >
        <CRow  >
             <CCol>Member Name: {receptsInvoiceData.MemberName}</CCol>

             <CCol className='text-center' ><CImage src={invoiceViewData.InvoiceLogo} width="40px" height='40px' /><br/>
             Yog Power International
             </CCol>

             <CCol  className=' text-end'><h5>Rs {receptsInvoiceData.amount}</h5></CCol>
        </CRow>
        <CRow className='mt-3 text-center'>
          <CCol className='text-start'>Date {getDate(receptsData.NewSlipDate,true)}</CCol>
          <CCol>{receptsInvoiceData.InvoiceNo+"RN"+resiptNo}</CCol>
          <CCol className='text-end' >Counseller :-  {receptsData.Counseller||receptsData.counseller} </CCol>
        </CRow>   
    </header>
    <section>
       <CTable  className=' border-light m-0'>
        <CTableHead >
            <CTableHeaderCell className='bg-white text-black border border-light ' >Service </CTableHeaderCell>
            <CTableHeaderCell className='bg-white text-black border border-light'>Amount</CTableHeaderCell>
            <CTableHeaderCell className='bg-white text-black border  border-light'>Payment</CTableHeaderCell>
        </CTableHead>
        <CTableBody className='text-black text-center' >
        <CTableDataCell className='  border-light  p-2'>{receptsInvoiceData.ServiceName}</CTableDataCell>
            <CTableDataCell className='  border-light p-2'>Rs {receptsData.RemainingAmount}</CTableDataCell>
            <CTableDataCell className=' border-light p-2'>Rs {receptsData.PaidAmount}</CTableDataCell>
        </CTableBody>
       </CTable>
       <CCol className='d-flex justify-content-end border p-2 px-4'>
       <strong>Balance:-  Rs {receptsData.AfterPayremainingAmount}</strong>
       </CCol>
       
    </section>
    

    </CModalBody>
    <CModalBody>
    <CCol className='mt-4 text-end '>
       <CButton color="primary"  onClick={handlePrint}>Print</CButton>
       </CCol>
    </CModalBody>
</CModal>
  
  )
  
}

export default ViewRecepits
