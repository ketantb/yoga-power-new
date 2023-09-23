import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useAdminValidation } from '../Custom-hook/adminValidation'
import { 
    CTable,CTableHead,CTableBody,CTableRow,CTableDataCell,CTableHeaderCell
 } from '@coreui/react'
import { Link } from 'react-router-dom'


const Participants = ({id}) => {

    const url = useSelector((el) => el.domainOfApi)
    const pathVal = useAdminValidation('Master')

    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token
    const [parteCipentsData,setParteCipents] = useState([])

    const headers =  {
        'Authorization': `Bearer ${token}`
    }
      

   const getParticepentData =async (eventId)=>{
    try{
   const response = await   axios.get(`${url}/bookingEvent/participants/${eventId}/${pathVal}`,{headers})
   if(response.status===200){
    setParteCipents(response.data)
   }
}catch(error){
console.log(error)
}
   }


   useEffect(()=>{
    if(id?.trim()){
        setParteCipents([])
        getParticepentData(id)
    }
   },[id])

   console.log(id,parteCipentsData)
  return (
    <CTable  className=' m-0  p-0' align="middle" bordered  hover responsive scrollable  >
    <CTableHead className='p-0 m-0'  color={"dark"} >
            <CTableHeaderCell className='p-2 '>Sr.No</CTableHeaderCell>
            <CTableHeaderCell className='p-2'>Client Name</CTableHeaderCell>
            <CTableHeaderCell className='p-2'>Client Id</CTableHeaderCell>
            <CTableHeaderCell className='p-2'>Boking Start Date</CTableHeaderCell>
            <CTableHeaderCell className='p-2'>Booking end Date</CTableHeaderCell>
            <CTableHeaderCell className='p-2'>Bookig Time</CTableHeaderCell>
            <CTableHeaderCell className='p-2'>Fees</CTableHeaderCell>
            <CTableHeaderCell className='p-2'>Email</CTableHeaderCell>
            <CTableHeaderCell className='p-2'>Contact Number</CTableHeaderCell>
            <CTableHeaderCell className='p-2'>City</CTableHeaderCell>
            <CTableHeaderCell className='p-2'>Client Address</CTableHeaderCell>
            <CTableHeaderCell className='p-2'>Created by</CTableHeaderCell>
    </CTableHead>
    <CTableBody>
       
    {parteCipentsData.map((el,i)=>
               <CTableRow color={el.clinetType==='Client'?'':'success'}>
                      <CTableDataCell>{i+1}</CTableDataCell>
                      <CTableDataCell>{el.clinetType==='Client'
                      ?<Link  style={{ textDecoration: 'none' }} to={`/clients/member-details/${el.MemberId}/1`} >
                      {el.clientName}</Link>:el.clientName
                      }</CTableDataCell>
                      <CTableDataCell>{el.clinetId}</CTableDataCell>
                      <CTableDataCell>{new Date(el.bookingStartDate).toLocaleDateString()}</CTableDataCell>
                      <CTableDataCell>{new Date(el.bookingEndDate).toLocaleDateString()}</CTableDataCell>
                      <CTableDataCell>{el.bookingTime}</CTableDataCell>
                      <CTableDataCell>{el.clientFees}</CTableDataCell>
                      <CTableDataCell>{el.emailAddress}</CTableDataCell>
                      <CTableDataCell>{el.contactNumber}</CTableDataCell>
                      <CTableDataCell>{el.city}</CTableDataCell>
                      <CTableDataCell>{el.clientAdress}</CTableDataCell>
                      <CTableDataCell>{el.createdBy}</CTableDataCell>
              </CTableRow>                               
        )}

    </CTableBody>
</CTable>
  )
}

export default Participants
