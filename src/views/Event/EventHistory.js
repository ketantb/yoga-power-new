import { CRow,CCol,CCard,CCardHeader,CCardTitle,CCardText,CAccordion
    ,CAccordionItem,CAccordionBody,CAccordionHeader,CListGroup,CListGroupItem,
    CCardBody,CImage,CBadge,CButton,CForm,CInputGroup,CFormSelect,CFormInput,CPopover,
    CTable,CTableHead,CTableBody,CTableRow,CTableDataCell,CTableHeaderCell
 } from '@coreui/react'
import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useAdminValidation } from '../Custom-hook/adminValidation'
import Participants from './Participants'


const EventHistory = () => {
    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token
    const url = useSelector((el) => el.domainOfApi)

    const [eventHistoryData,setEventHistoryData] = useState([])
    const pathVal = useAdminValidation('Master')
    const [eventId,setEventId] = useState("")



    const headers =  {
        'Authorization': `Bearer ${token}`
    }
      
     async function toGetRequireData(){

      const response = axios.get(`${url}/bookingEvent/event-histroy/${pathVal}`,{headers})
      const allData = await Promise.all([response])
      setEventHistoryData([...allData[0]?.data].reverse())
     }

     useEffect(()=>{
        toGetRequireData()
    },[])


    console.log(eventHistoryData)
    

    // const compareFunction = (date,endDate,val)=>{

    //     const dateCon = (new Date(date).getFullYear()<=new Date().getFullYear()&&
    //      new Date(date).getMonth()<=new Date().getMonth()&&
    //      new Date(date).getDate()<=new Date().getDate())
  
    //      const dateCon2 = (new Date(endDate).getFullYear()<=new Date().getFullYear()&&
    //      new Date(endDate).getMonth()<=new Date().getMonth()&&
    //      new Date(endDate).getDate()<new Date().getDate())
  
  
      
    //   if(val==='cancel'||val==='done'){
    //         return val
    //   }else if(dateCon2){
    //       return "Start"
    //   } else if(dateCon){
    //       return "Start"
    //   }else if(!dateCon){
    //      return 'Upcoming...'   
    //   }
    //  }

    console.log(eventId)
    console.log(eventId)


  return (
    <CCard className='mt-3 border-0'>

    <div >
        <CForm>

            <CCard>
                <CCardBody>
                    <CRow>
                        <CCol>
                            <CInputGroup style={{ height: "38px" }}>
                                <CFormSelect
                                    id="inputGroupSelect04"
                                    aria-label="Example select with button addon"
                                >
                                    <option>Trainer Name</option>
                                    <option value="1">Service</option>
                                </CFormSelect>
                                <CFormInput
                                    placeholder="Search"
                                    aria-label="Recipient's username"
                                    aria-describedby="button-addon2"
                                />
                                <CFormInput
                                    type='date'
                                    placeholder="Search"
                                    aria-label="Recipient's username"
                                    aria-describedby="button-addon2"
                                />
                                <CFormInput
                                    type='time'
                                    placeholder="Search"
                                    aria-label="Recipient's username"
                                    aria-describedby="button-addon2"
                                />
                                <CButton type="button" color="primary">
                                    Search
                                </CButton>
                            </CInputGroup>
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
        </CForm>


 <div class="accordion" id="accordionPanelsStayOpenExample">

 {
                eventHistoryData.map((el,i)=>

                
  <div class="accordion-item my-4 border">
  <div class="accordion-header">
      
  <CCol lg={12} sm={12} className='mt-0 p-0' key={i} >
        
                            {/* <CCol> */}
                            <CCol xs={12}  className='d-flex flex-column'>
                                

                            {/* </CCol> */}

                                 

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
                               
                                  <CTableDataCell>{i+1}</CTableDataCell>
                             
                                  <CTableDataCell><div 
                                className="border-gray rounded-circle"
                                style={{width:'100px'}}
                                >
                                  <img
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
</CCard> 
  )
}

export default EventHistory
