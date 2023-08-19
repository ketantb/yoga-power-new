import { CButton, CCard, CCardTitle, CCol, CFormSelect, CImage, CRow,CTable,CTableHead,CTableHeaderCell,CTableBody,CTableRow,CTableDataCell } from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ProfileIcon from 'src/assets/images/avatars/profile_icon.png'
import { useSelector } from 'react-redux'

const ServiceProfile = ({ id }) => {
    const url1 = useSelector((el)=>el.domainOfApi) 

    const [result, setResult] = useState([])
    const [allInvoiceData,setAllInvoiceData] = useState([])
    const [invoiceData,setInvoiceData] = useState({})
    const [slectedInvoiceData,setSelectedInvoiceData] = useState()

    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;

    useEffect(() => {
        getDetails(id)
    }, [])

async function getDetails(id) {

   try{
        const headers = {
            'Authorization': `Bearer ${token}`,
        };

        const response = axios.get(`${url1}/memberForm/${id}`, {headers})
        const response1 = axios.get(`${url1}/invoice/invoiceGet/${id}`, {headers})

        const allData = await Promise.all([response,response1])

        if(allData[0].status!==200 || allData[1].status!==200){
            return
        }       
        setResult(allData[0].data)  
        setAllInvoiceData(allData[1].data)
        setSelectedInvoiceData(allData[1].data[0]?._id)
}catch(error){

}

}

const getDate = (date,val) => {

    const date2 = new Date(date).getDate() + "/" + (new Date(date).getMonth() + (val? 1:0)) + "/" + new Date(date).getFullYear()
    if (date2 === 'NaN/NaN/NaN') {
        return 'Invalid Date'
    }
    return date2

}

useEffect(()=>{
    setInvoiceData(allInvoiceData.find((el)=>el._id===slectedInvoiceData))
},[slectedInvoiceData])


function findLeftService(endDate){
    const time =  (new Date(endDate) -new Date())
    const days = Math.ceil(time/(1000*60*60*24))
          if((days<=0)){
             return false 
          }
          return true   
   }
    

    return (
        <CRow>
            <CCol xs={12}>
                <div className='d-flex justify-content-between mb-2'>
                    <div className='mt-2 ms-2'>
                        <CCardTitle>Service {result?.MemberName}</CCardTitle>
                    </div>
                    
                </div>
            </CCol>
             
            <CCol xs={3} lg={3} sm={3}>
                <CImage className="mb-1" style={{ borderRadius: "20px" }} width={'200px'} src={result?.image?.trim()?result?.image?.trim():ProfileIcon} />
            </CCol>
             
            <CCol xs={3} lg={3} sm={3}>
                      <p >Member Id:- {result?.ClientId}</p>
                      <p>Attendance ID : {result?.AttendanceID}</p>
                      <p>Service: {invoiceData?.ServiceName} </p>
                      <p>Total Loyalty Points</p>
                      <CButton size='sm'>Add/View Loyalty Points</CButton>

            </CCol>

            <CCol xs={3} lg={3} sm={3}>
                     <p>Membership status :</p>
                     <p>Start From : </p>
                     <p>Packeges Amount:</p>
                     <p>Referrals (0)</p>
                     <p>No of Shop Item: 0</p>
            </CCol>
                     
            <CCol xs={3} lg={3} sm={3}>
        
                     <div className='mb-1'>{findLeftService(invoiceData?.endDate)?
                     <CButton size='sm'  >Active Service</CButton>:
                     <CButton size='sm' color="danger" >Deactive Service</CButton>
                     } </div>
                     <p>{ getDate(invoiceData?.startDate,true)}</p>
                     <p> Rs {invoiceData?.amount}</p>
                     <p>Referrals Value(0)</p>
                     <p>Shop Value: 0</p>

            </CCol>
        
            <CCol xs={12} className='mt-4'>
                <CRow >                    
                    <CCol xs={2}>
                        <CFormSelect 
                            aria-label="Select Currency"
                            size='sm'
                            value={slectedInvoiceData}
                            onChange={(e)=>setSelectedInvoiceData(e.target.value)}
                        >
                            <option value=''>Select Service </option>
                            {allInvoiceData.map((el)=>{
                                return <option value={el._id}>{el.ServiceName}</option>
                            })}
                        </CFormSelect>
                        
                        </CCol>
                </CRow>
            </CCol>
            <CCol  className='mt-4'>
          

                <div style={{overflowX:'scroll',boxSizing:'border-box'}} >
    
    <CTable  >
         <CTableHead >
            <CTableHeaderCell className='p-3'>Singal  Center Membership</CTableHeaderCell>
            <CTableHeaderCell className='p-3'>Multiple Center Membership</CTableHeaderCell>
            <CTableHeaderCell className='p-3'>Postpaid Membership</CTableHeaderCell>
      
         </CTableHead>
         <CTableBody>
           <CTableRow className='text-center'>
               <CTableDataCell>Only one Center Services</CTableDataCell>
               <CTableDataCell>Multiclub Access Services</CTableDataCell>
               <CTableDataCell>Postpaid Services</CTableDataCell>
           </CTableRow>
         </CTableBody>
    </CTable>
    </div>
            </CCol>
            <CCol xs={12}>
                         <CCard style={{ padding: '15px' }} className='mt-2'>
                             <CRow>
                                  <CCol className='d-flex '>
                                 <CCol>
                                     <b>Service Name</b> :<br/>
                                     {invoiceData?.ServiceName}
                                 </CCol>
                                 <CCol>
                                     <b>Duration:</b><br/> {invoiceData?.duration}
                                 </CCol>
                                 <CCol>
                                      <b>Packages:</b> <br/>{invoiceData?.PackageName}
                                 </CCol>
                                 </CCol>
         
                                 <CCol className='d-flex '>
                                
                                 <CCol>
                                      <b>TOTAL DAYS</b> <br/>
         
                                      {
                                     Math.ceil(new Date(invoiceData?.endDate) -new Date(invoiceData?.startDate))/(1000*60*60*24) 
                                      } days
                                 </CCol>
                                 <CCol>
                                       <b>START DATE</b> <br/>{getDate(invoiceData?.startDate,true)}
                                 </CCol>
                                 <CCol>
                                       <b>EXPIRY DATE</b> <br/>{getDate(invoiceData?.endDate,true)}
                                 </CCol>
                                 <CCol>
                                       <b>Status </b><br/>{invoiceData?.status}
                                 </CCol>  
                                 </CCol>    
           
                                 
          
                             </CRow>
                         </CCard>
                     </CCol>
             {allInvoiceData.filter((el)=>el._id!==slectedInvoiceData).map((invoiceData)=>
                         <CCol xs={12}>
                         <CCard style={{ padding: '15px' }} className='mt-2'>
                             <CRow>
                                  <CCol className='d-flex '>
                                 <CCol>
                                     <b>Service Name</b> :<br/>
                                     {invoiceData?.ServiceName}
                                 </CCol>
                                 <CCol>
                                     <b>Duration:</b><br/> {invoiceData?.duration}
                                 </CCol>
                                 <CCol>
                                      <b>Packages:</b> <br/>{invoiceData?.PackageName}
                                 </CCol>
                                 </CCol>
         
                                 <CCol className='d-flex '>
                                
                                 <CCol>
                                      <b>TOTAL DAYS</b> <br/>
         
                                      {
                                     Math.ceil(new Date(invoiceData?.endDate) -new Date(invoiceData?.startDate))/(1000*60*60*24) 
                                      } days
                                 </CCol>
                                 <CCol>
                                       <b>START DATE</b> <br/>{getDate(invoiceData?.startDate,true)}
                                 </CCol>
                                 <CCol>
                                       <b>EXPIRY DATE</b> <br/>{getDate(invoiceData?.endDate,true)}
                                 </CCol>
                                 <CCol>
                                       <b>Status </b><br/>{invoiceData?.status}
                                 </CCol>  
                                 </CCol>    
           
                                 
          
                             </CRow>
                         </CCard>
                     </CCol>
             )}
        </CRow>
    )
}

export default ServiceProfile