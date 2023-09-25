import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useAdminValidation } from '../Custom-hook/adminValidation'
import { 
    CTable,CTableHead,CTableBody,CTableRow,CTableDataCell,CTableHeaderCell,
    CButton,CFormInput,CPagination,CPaginationItem
 } from '@coreui/react'
import { Link } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import {cilArrowCircleTop } from '@coreui/icons'
import useEventExport from './useEventExport'
import { data } from 'autoprefixer'

const Participants = ({id}) => {

    const url = useSelector((el) => el.domainOfApi)
    const pathVal = useAdminValidation('Master')
    const exportEvent = useEventExport()
    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token
    const [parteCipentsData,setParteCipents] = useState([])
    const [idToSecondExe,setIdToSecondExe] = useState('')
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
    if(id?.trim()&&id!==idToSecondExe){
        setParteCipents([])
        getParticepentData(id)
    }
    setIdToSecondExe(id)
   },[id])


   
function toFilterData(data){
    return data.filter((el)=>{
        return (el.clientName?.toLowerCase()||'').includes(searchFilter.search2.toLowerCase().trim())&&
        (el.clinetId?.toLowerCase()||'').includes(searchFilter.search3.toLowerCase().trim())&&
        (new Date(el.bookingStartDate).toLocaleDateString()||'').includes(searchFilter.search4.toLowerCase().trim())&&
        (new Date(el.bookingEndDate).toLocaleDateString()||'').includes(searchFilter.search5.toLowerCase().trim())&&
        (el.bookingTime?.toLowerCase()||'').includes(searchFilter.search6.toLowerCase().trim())&&
        ((el.clientFees+"")?.toLowerCase()||'').includes(searchFilter.search7.toLowerCase().trim())&&
        (el.emailAddress?.toLowerCase()||'').includes(searchFilter.search8.toLowerCase().trim())&&
        ((el.contactNumber+"").toLowerCase()||'').includes(searchFilter.search9.toLowerCase().trim())   &&
        (el.city?.toLowerCase()||'').includes(searchFilter.search10.toLowerCase().trim())   &&
        (el.clientAdress?.toLowerCase()||'').includes(searchFilter.search11.toLowerCase().trim())  && 
        (el.createdBy?.toLowerCase()||'').includes(searchFilter.search12.toLowerCase().trim())
  })
  }
  

  return (
    <div className='text-end'>
        <CButton  className='my-2 mx-2'  color="primary" onClick={()=>exportEvent(parteCipentsData)}>
                                        <CIcon icon={cilArrowCircleTop} />
          {' '}Export
       </CButton>
    <CTable  className=' m-0  p-0' align="middle" bordered  hover responsive scrollable  >
    <CTableHead className='p-0 m-0'  color={"dark"} >
            <CTableHeaderCell className='p-2 '>Sr.No</CTableHeaderCell>
            <CTableHeaderCell className='p-2'>Client Name</CTableHeaderCell>
            <CTableHeaderCell className='p-2'>Client Id</CTableHeaderCell>
            <CTableHeaderCell className='p-2'>Booking Start Date</CTableHeaderCell>
            <CTableHeaderCell className='p-2'>Booking end Date</CTableHeaderCell>
            <CTableHeaderCell className='p-2'>Bookig Time</CTableHeaderCell>
            <CTableHeaderCell className='p-2'>Fees</CTableHeaderCell>
            <CTableHeaderCell className='p-2'>Email</CTableHeaderCell>
            <CTableHeaderCell className='p-2'>Contact Number</CTableHeaderCell>
            <CTableHeaderCell className='p-2'>City</CTableHeaderCell>
            <CTableHeaderCell className='p-2'>Client Address</CTableHeaderCell>
            <CTableHeaderCell className='p-2'>Created by</CTableHeaderCell>
    </CTableHead>
    <CTableRow className='p-2'>
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
                                    <CTableDataCell ><CFormInput  className='min-width-90' value={searchFilter.search12} 
                                     onChange={(e)=>setSearchFilter((prev)=>({...prev,search12:e.target.value}))}
                                    /> </CTableDataCell>
                                 
                                </CTableRow> 
    <CTableBody>
       
    {toFilterData(parteCipentsData).slice(paging * 10, paging * 10 + 10).map((el,i)=>
               <CTableRow color={el.clinetType==='Client'?'':'success'}>
                      <CTableDataCell>{i+ 1 + (paging * 10)}</CTableDataCell>
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
<CPagination aria-label="Page navigation example" align="center" className='mt-2'>
                        <CPaginationItem aria-label="Previous" disabled={paging != 0 ? false : true} onClick={() => paging > 0 && setPaging(paging - 1)}>
                            <span aria-hidden="true">&laquo;</span>
                        </CPaginationItem>
                        <CPaginationItem active onClick={() => setPaging(0)}>{paging + 1}</CPaginationItem>
                        {toFilterData(parteCipentsData).length > (paging + 1) * 10 && <CPaginationItem onClick={() => setPaging(paging + 1)} >{paging + 2}</CPaginationItem>}
                        {toFilterData(parteCipentsData).length > (paging + 2) * 10 && <CPaginationItem onClick={() => setPaging(paging + 2)}>{paging + 3}</CPaginationItem>}
                        {toFilterData(parteCipentsData).length > (paging + 1) * 10 ?
                            <CPaginationItem aria-label="Next" onClick={() => setPaging(paging + 1)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                            : <CPaginationItem disabled aria-label="Next" onClick={() => setPaging(paging + 1)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                        }
                    </CPagination>  
</div>

  )
}

export default Participants

// just assume 

const mongoDbCoolection =[
    {
        name:'hellonew'
    },
    {
        name:'newworld'
    },
    {
        name:'newCipt'
    },
    {
        name:'newPalace'
    },
    {
        name:'cnjencfje',
    }
]

//and i want to both data beacus my params value is new 
// and tell me which oprator and query can do that to me 
