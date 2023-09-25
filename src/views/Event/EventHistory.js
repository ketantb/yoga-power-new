import { CRow,CCol,CCard,CCardHeader,CCardTitle,CCardText,CAccordion
    ,CAccordionItem,CAccordionBody,CAccordionHeader,CListGroup,CListGroupItem,
    CCardBody,CImage,CBadge,CButton,CForm,CInputGroup,CFormSelect,CFormInput,CPopover,
    CTable,CTableHead,CTableBody,CTableRow,CTableDataCell,CTableHeaderCell,CInputGroupText,
    CPagination,CPaginationItem
 } from '@coreui/react'
import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useAdminValidation } from '../Custom-hook/adminValidation'
import Participants from './Participants'
import moment from 'moment/moment'



const EventHistory = ({activeKey}) => {
    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token
    const url = useSelector((el) => el.domainOfApi)

    const [eventHistoryData,setEventHistoryData] = useState([])
    const pathVal = useAdminValidation('Master')
    const [eventId,setEventId] = useState("")

    const [dateFilterObj,setDteFilterObj] = useState({
        startDate:moment(new Date(new Date().getFullYear(),0,1)).format('YYYY-MM-DD'),
        endDate:moment(new Date()).format('YYYY-MM-DD')
      })

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
      
     async function toGetRequireData(){

      const response = axios.get(`${url}/bookingEvent/event-histroy/${dateFilterObj.startDate}/${dateFilterObj.endDate}/${pathVal}`,{headers})
      const allData = await Promise.all([response])
      console.log(allData[0]?.data)

      setEventHistoryData([...allData[0]?.data].reverse())
     }

     useEffect(()=>{
        toGetRequireData()
    },[activeKey])




    function toFilterData(data){
        return data.filter((el)=>{
            return (el.eventName?.toLowerCase()||'').includes(searchFilter.search2.toLowerCase().trim())&&
            (new Date(el.eventStartDate).toLocaleDateString()||'').includes(searchFilter.search3.toLowerCase().trim())&&
            (new Date(el.eventEndDate ).toLocaleDateString()||'').includes(searchFilter.search4.toLowerCase().trim())&&
            (el.hostName.toLowerCase()||'').includes(searchFilter.search5.toLowerCase().trim())&&
            (el.service?.toLowerCase()||'').includes(searchFilter.search6.toLowerCase().trim())&&
            ((el.eventType+"")?.toLowerCase()||'').includes(searchFilter.search7.toLowerCase().trim())&&
            (el.eventTime?.toLowerCase()||'').includes(searchFilter.search8.toLowerCase().trim())&&
            (el.duration?.toLowerCase()||'').includes(searchFilter.search9.toLowerCase().trim())

      })

      }


  return (
    <CCard className='mt-3 border-0'>

    <div >

                    <CRow>
                        <CCol lg={5} md={7}>
                        <div className='d-flex justify-content-between mb-2'>
                            <CInputGroup >

                                <CInputGroupText
                                    component="label"
                                    htmlFor="inputGroupSelect01"
                                >
                                    Form
                                </CInputGroupText>
                                <CFormInput
                                    type="date"
                                    value={dateFilterObj.startDate}
                                    onChange={(e)=>setDteFilterObj((prev)=>({...prev,startDate:e.target.value}))}

                                  
                                /><CInputGroupText
                                    component="label"
                                    htmlFor="inputGroupSelect01"

                                >
                                    To
                                </CInputGroupText>
                                <CFormInput
                                    type="date"
                                    value={dateFilterObj.endDate}
                                    onChange={(e)=>setDteFilterObj((prev)=>({...prev,endDate:e.target.value}))}
                                                                   />
                                <CButton type="button" color="primary" onClick={()=>toGetRequireData()} >
                                    Go
                                </CButton>
                            </CInputGroup>
                        </div>
                        </CCol>
                    </CRow>


 <div class="accordion" id="accordionPanelsStayOpenExample">

    <div>
<CTable borderColor={'light'}>
  <CTableHead className='p-0 m-0 border-0' >
                                    <CTableDataCell className='p-2 border-0'>Sr.No</CTableDataCell>
                                    <CTableDataCell className='p-2 border-0'>Event Name</CTableDataCell>
                                    <CTableDataCell className='p-2 border-0'>Event Start Date</CTableDataCell>
                                    <CTableDataCell className='p-2 border-0'>Event End Date </CTableDataCell>


                                    <CTableDataCell className='p-2 border-0'>Host Name</CTableDataCell>
                                    <CTableDataCell className='p-2 border-0'>Topic</CTableDataCell>
                                    <CTableDataCell className='p-2 border-0'>Event venue</CTableDataCell>
                                    <CTableDataCell className='p-2 border-0'>Start Time</CTableDataCell>
                                    <CTableDataCell className='p-2 border-0'>Duration</CTableDataCell>
    </CTableHead>
    <CTableHead className='p-0 m-0 border-0'>
         <CTableDataCell className='p-2 border-0'><CFormInput  disabled value={searchFilter.search1} 
          onChange={(e)=>setSearchFilter((prev)=>({...prev,search1:e.target.value}))} /> </CTableDataCell>
          <CTableDataCell className='p-2 border-0' ><CFormInput  value={searchFilter.search2} 
          onChange={(e)=>setSearchFilter((prev)=>({...prev,search2:e.target.value}))} /> </CTableDataCell>
          <CTableDataCell className='p-2 border-0' ><CFormInput  value={searchFilter.search3} 
          onChange={(e)=>setSearchFilter((prev)=>({...prev,search3:e.target.value}))} /> </CTableDataCell>
          <CTableDataCell className='p-2 border-0' ><CFormInput  value={searchFilter.search4} 
          onChange={(e)=>setSearchFilter((prev)=>({...prev,search4:e.target.value}))} /> </CTableDataCell>
          <CTableDataCell  className='p-2 border-0'><CFormInput  value={searchFilter.search5} 
          onChange={(e)=>setSearchFilter((prev)=>({...prev,search5:e.target.value}))} /> </CTableDataCell>
          <CTableDataCell className='p-2 border-0' ><CFormInput value={searchFilter.search6} 
          onChange={(e)=>setSearchFilter((prev)=>({...prev,search6:e.target.value}))} /> </CTableDataCell>
          <CTableDataCell className='p-2 border-0' ><CFormInput  value={searchFilter.search7} 
          onChange={(e)=>setSearchFilter((prev)=>({...prev,search7:e.target.value}))} /> </CTableDataCell>
          <CTableDataCell className='p-2 border-0' ><CFormInput  value={searchFilter.search8} 
          onChange={(e)=>setSearchFilter((prev)=>({...prev,search8:e.target.value}))} /> </CTableDataCell>
          <CTableDataCell className='p-2 border-0' ><CFormInput   value={searchFilter.search9} 
          onChange={(e)=>setSearchFilter((prev)=>({...prev,search9:e.target.value}))} /> </CTableDataCell>           
                                  
     </CTableHead> 
  </CTable>                          
    </div>

 {
                toFilterData(eventHistoryData).slice(paging * 10, paging * 10 + 10).map((el,i)=>

                
  <div class="accordion-item my-4 border">
  <div class="accordion-header">
      
  <CCol lg={12} sm={12} className='mt-0 p-0' key={i} >
        
                            <CCol xs={12}  className='d-flex flex-column'>                                

                            <div  className='w-100' style={{overflowX:"scroll"}}>
                            <CTable  className=' m-0 p-0' align="middle" bordered  hover responsive scrollable  >
                            <CTableHead className='p-0 m-0' >
                                    <CTableHeaderCell className='p-2 '>Sr.No</CTableHeaderCell>
                                    <CTableHeaderCell className='p-2'>Event Banner</CTableHeaderCell>
                                    <CTableHeaderCell className='p-2'>Event Name</CTableHeaderCell>
                                    <CTableHeaderCell className='p-2'>Event Start Date</CTableHeaderCell>
                                    <CTableHeaderCell className='p-2'>Event End Date </CTableHeaderCell>


                                    <CTableHeaderCell className='p-2'>Host Name</CTableHeaderCell>
                                    <CTableHeaderCell className='p-2'>Topic</CTableHeaderCell>
                                    <CTableHeaderCell className='p-2'>Event venue</CTableHeaderCell>
                                    <CTableHeaderCell className='p-2'>Start Time</CTableHeaderCell>
                                    <CTableHeaderCell className='p-2'>Duration</CTableHeaderCell>
                                    <CTableHeaderCell className='p-2'>Fess</CTableHeaderCell>
                                    <CTableHeaderCell className='p-2'>Event Status</CTableHeaderCell>
                                    <CTableHeaderCell className='p-2'>Comment of cancel event</CTableHeaderCell>
                            </CTableHead>
                         
                            <CTableBody>
                            <CTableRow>
                               
                                  <CTableDataCell>{i+ 1 + (paging * 10)}</CTableDataCell>
                                  <CTableDataCell><div  className="border-gray rounded-circle"
                                style={{width:'100px'}}><img
                                  width='100%'
                                  src={el.eventBanner}
                                  />
                                </div></CTableDataCell>
                                <CTableDataCell>{el.eventName}</CTableDataCell>
                                <CTableDataCell>{new Date(el.eventStartDate).toLocaleDateString()}</CTableDataCell>
                                  <CTableDataCell>{new Date(el.eventEndDate ).toLocaleDateString()}</CTableDataCell>

                                  <CTableDataCell>{el.hostName}</CTableDataCell>
                                  <CTableDataCell>{el.service}</CTableDataCell>
                                  <CTableDataCell>{el.eventType}</CTableDataCell>
                                  <CTableDataCell>{el.eventTime}</CTableDataCell>
                                  <CTableDataCell>{el.duration}</CTableDataCell>
                                  <CTableDataCell>{el.paid?el.fess:<CButton size='sm'>Free</CButton>}</CTableDataCell>
                                  <CTableDataCell>
                                        
                                  {el.eventActive==='cancel'&&<CButton color='danger' size='sm'  >{el.eventActive}</CButton>  }
                                  {el.eventActive==='done'&& <CButton color='success' size='sm' >{el.eventActive}</CButton> }
                                  {el.eventActive==='Completed'&& <CButton color='success' size='sm' >{el.eventActive}</CButton> }
                                  {(el.eventActive==='Start'||el.eventActive==="Upcoming...")&& <CButton color='primary' size='sm' >{el.eventActive}</CButton> }

                                  </CTableDataCell>
                                  <CTableDataCell>
                                  {el.comments }                                  
                                  </CTableDataCell>
                                 

                           </CTableRow>                               
                            </CTableBody>
                        </CTable>
                            </div>
                            </CCol>                         
                       
    </CCol>
    <button onClick={()=>setEventId(prev=>prev=== el.evntId?" ":el.evntId)} class="accordion-button bg-body" type="button" data-coreui-toggle="collapse" data-coreui-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
    <div className='d-flex text-black w-50' >
                              <p >TOTAL ATTENDED : {el.attendedClient}</p>
                              <p className='mx-3' >CLIENT LIMIT : {el.clientLimit}</p>
                             </div> 
                                                        
    </button>
  </div>
  <div id="panelsStayOpen-collapseOne" className={`accordion-collapse collapse ${eventId===el.evntId
?"show":''}`}>
    <div class="accordion-body p-1">
    {   <Participants id={eventId}/>}
    </div>
  </div>
</div>
                )
            }  

 
</div>
    </div>

    <CPagination aria-label="Page navigation example" align="center" className='mt-2'>
                        <CPaginationItem aria-label="Previous" disabled={paging != 0 ? false : true} onClick={() => paging > 0 && setPaging(paging - 1)}>
                            <span aria-hidden="true">&laquo;</span>
                        </CPaginationItem>
                        <CPaginationItem active onClick={() => setPaging(0)}>{paging + 1}</CPaginationItem>
                        {toFilterData(eventHistoryData).length > (paging + 1) * 10 && <CPaginationItem onClick={() => setPaging(paging + 1)} >{paging + 2}</CPaginationItem>}
                        {toFilterData(eventHistoryData).length > (paging + 2) * 10 && <CPaginationItem onClick={() => setPaging(paging + 2)}>{paging + 3}</CPaginationItem>}
                        {toFilterData(eventHistoryData).length > (paging + 1) * 10 ?
                            <CPaginationItem aria-label="Next" onClick={() => setPaging(paging + 1)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                            : <CPaginationItem disabled aria-label="Next" onClick={() => setPaging(paging + 1)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                        }
                    </CPagination>  
</CCard> 
  )
}

export default EventHistory
