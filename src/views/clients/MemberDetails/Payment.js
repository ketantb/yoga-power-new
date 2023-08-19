import { CButton, CCardTitle, CCol, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import {BsEye } from 'react-icons/bs'

const  AddNewInvoice  = React.lazy(()=>import('src/components/AddNewInvoice'))

const Invoice = React.lazy(()=>import('../Invoice'))





const Payment = ({ id,clinetData }) => {

    const [viewInvoice, setViewInvoice] = useState(false);

    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;
    const [invoiceData, setInvoiceData] = useState([]);
    const [clinetInfoData,setClientInfo] = useState([])

    const [allIvoiceOfaUser,setAllInvoiceOfUser] = useState([])
    const [ClientData,setClient] = useState([])
    const [showInvoiceModal,setInvoceModal] = useState(false)
    const url1 = useSelector((el)=>el.domainOfApi) 

    const headers = {
        'Authorization': `Bearer ${token}`,
        'My-Custom-Header': 'foobar'
    };
    useEffect(() => {
        getDetails()
        clinetInfo()
    }, []);

  async  function getDetails() {
  
const {data} = await axios.get(`${url1}/invoice/invoiceGet/${id}`,{headers})    
  setInvoiceData(data)
 }


 const getDate = (date,val) => {

    const date2 = new Date(date).getDate() + "/" + (new Date(date).getMonth() + (val? 1:0)) + "/" + new Date(date).getFullYear()
    if (date2 === 'NaN/NaN/NaN') {
        return 'Invalid Date'
    }
    return date2

}


async function clinetInfo(){
const {data} = await axios.get(`${url1}/memberForm/${id}`,{headers})
  setClientInfo(data)
}

function ShowUserInvoceHandler (id,item){
    setAllInvoiceOfUser([item])    
    setClient(clinetData)
    setInvoceModal(true)      
} 




  

    return (
        <CRow>
            {<Invoice 
            allIvoiceOfaUser={allIvoiceOfaUser} 
            ClientData={ClientData} setInvoceModal={setInvoceModal}
            showInvoiceModal={showInvoiceModal}            
            />}
             {<AddNewInvoice data23={clinetInfoData}
             viewInvoice ={viewInvoice}
             setViewInvoice={setViewInvoice}
             getDetails={getDetails}
             
              id={id}/>}

            <CCol xs={12}>
                <div className='d-flex justify-content-between mb-2'>
                    <div className='mt-2 ms-2'>
                        <CCardTitle>Payments </CCardTitle>
                    </div>
               
                </div>
            </CCol>
            <CCol xs={12}>
                <div className='d-flex justify-content-between mb-2'>
                    <div className='mt-2 ms-2'>
                    </div>
                    <div className='justify-content-around'>
                        <CButton style={{ margin: '5px' }} onClick={()=>setViewInvoice(true)}>New Invoice</CButton>
                    </div>

                </div>
            </CCol>
            <CCol xs={12}>
               
                <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                    <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                        <CTableRow>
                            <CTableHeaderCell scope="col">Invoice Date</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Member Name</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Service </CTableHeaderCell>
                            <CTableHeaderCell scope="col">
                                Invoice No
                            </CTableHeaderCell>
                            <CTableHeaderCell scope="col">Amonut</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Tax</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Paid</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Pending</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Mode</CTableHeaderCell>
                            <CTableHeaderCell scope="col">View</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {invoiceData.map((item, index) => (
                            <CTableRow key={index}>
                                <CTableDataCell>{getDate(item.createdAt)}</CTableDataCell>
                                <CTableDataCell>{item.MemberName}</CTableDataCell>
                                <CTableDataCell>{item.ServiceName}</CTableDataCell>
                                <CTableDataCell>{item.InvoiceNo}</CTableDataCell>
                                <CTableDataCell>{item.amount}</CTableDataCell>
                                <CTableDataCell>{item.fees / 100 * item.tax }</CTableDataCell>
                                <CTableDataCell>{item.paidAmount}</CTableDataCell>
                                <CTableDataCell>{item.pendingAmount}</CTableDataCell>
                                <CTableDataCell>{item.paymode}</CTableDataCell>
                                <CTableDataCell >{
                                        <CButton size='sm' onClick={()=>ShowUserInvoceHandler(item._id,item)}>
                                            <BsEye />
                                    </CButton>}
                                </CTableDataCell>
                           </CTableRow>
                        ))}
                    </CTableBody>
                </CTable>
            </CCol>
        </CRow>
    )
}

export default Payment