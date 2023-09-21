import React, { useEffect,useState } from 'react'
import { CForm,CFormInput,CCol,CButton,CFormSelect,CFormCheck, CCard,
    CRow,CNav,CNavItem,CNavLink,CTabContent,CTabPane
 } from '@coreui/react'
 import axios from 'axios'
 import { useSelector } from 'react-redux'
import { useAdminValidation } from '../Custom-hook/adminValidation'
import moment from 'moment/moment'
import CustomSelectInput from '../Fitness/CustomSelectInput/CustomSelectInput'
const EventBoking = () => {

  const url = useSelector((el) => el.domainOfApi)
  const pathVal = useAdminValidation('Master')
  const [requreData,seteRequireData] = useState([])
  const [clientData,setClientData] = useState([])
  const [enquiryData,setEnquiryData] = useState([])
  const [activeKey2, setActiveKey2] = useState(1)


  const obj={
    eventName:"",
eventBanner:"",
hostName:"",
service:"",
comments:"",
eventType:"",
eventStartDate:"",
eventEndDate:"",
eventTime:"",
duration:"",
clientLimit:"",
fess:"",
paid:Boolean,
eventActive:"",
clientName:"",
clinetId:"",
clientAdress:"",
clientAdress2:"",
city:"",
centerName:"",
contactNumber:"",
bookingTime:"",
bookingStartDate:"",
bookingEndDate:"",
eventUniqID:'',
clinetType:'',
  }

  const [bookingData,setBookingData] = useState({...obj})

  let user = JSON.parse(localStorage.getItem('user-info'))
  const token = user.token; 
  
const headers =  {
    'Authorization': `Bearer ${token}`
}
  
 async function toGetRequireData(){
  const response = axios.get(`${url}/eventDetails/active-event/${pathVal}`,{headers})
  const response1 = axios.get(`${url}/memberForm/${pathVal}`,{headers})
  const response2 = axios.get(`${url}/enquiryForm/${pathVal}`,{headers})

  const allData = await Promise.all([response,response1,response2])
  seteRequireData([...allData[0]?.data])
  setClientData([...allData[1]?.data])
  setEnquiryData([...allData[2]?.data])
 }
   



 useEffect(()=>{
  toGetRequireData()
 },[])

 const selectedEvent = requreData.find((el)=>el._id===bookingData.eventUniqID)

useEffect(()=>{
  if(!(bookingData.eventUniqID).trim()){
    setBookingData({...obj})
    return
  }
  setBookingData((prev)=>({
    ...prev,
    eventEndDate:(moment(selectedEvent?.eventEndDate).format("YYYY-MM-DD")||''),
    eventStartDate:(moment(selectedEvent?.eventStartDate).format("YYYY-MM-DD")||""),
    eventType:(selectedEvent?.eventType||""),
    eventBanner:(selectedEvent?.eventBanner||''),
    hostName:(selectedEvent?.hostName||''),
    service:(selectedEvent?.service||''),
    eventTime:(selectedEvent?.service||''),
    duration:(selectedEvent?.duration||''),
    clientLimit:(selectedEvent?.clientLimit||''),
    fess:(selectedEvent?.fess||''),
    paid:(selectedEvent?.paid||''),
    eventActive:(selectedEvent?.eventActive),
    eventUniqID:bookingData.eventUniqID
  }))
},[bookingData.eventUniqID])

function clientObj(obj,type){
  setBookingData((prev)=>
  
  ({...prev,...{
      clientName:obj?.Fullname,
      contactNumber:obj?.ContactNumber,
      clinetId:obj?.ClientId?obj?.ClientId:obj?.EnquiryId,
      // EmailId:obj?.Email?obj?.Email:obj?.Emailaddress,
      // ClientId:obj?._id,
      // MemberId:obj?._id,
      // crea:emp?.FullName,
      clinetType:type
  }}))    
}

  return (
<CCard className="row g-3 ">
<form className='p-3' >
    <CRow>
    <CCol md={4} lg={3} >
    <CFormSelect 
    id="inputState" 
    label="Event"  
    value={bookingData.eventUniqID}
    onChange={(e)=>setBookingData(prev=>({...prev,eventUniqID:e.target.value}))}
    >
      <option value={""}>Choose...</option>
      {requreData.map((el)=>
     <option value={el._id}>{el.eventName}</option>
     )}
    </CFormSelect>
  </CCol>    
  <CCol md={4} lg={3}>
    <CFormInput type="date" id="inputPassword4" label="Event Start Date"
     value={bookingData.eventStartDate}
    />
  </CCol>
  <CCol md={4} lg={3}>
    <CFormInput type="date" id="inputPassword4" label="Event End Date" 
     value={bookingData.eventEndDate}
    />
  </CCol>
  <CCol md={4} lg={3}>
    <CFormInput type="text" id="inputPassword4" label="Event venue"
     value={bookingData.eventType}
     />
  </CCol>
  
  <CCol className="d-flex justify-content-between my-3" xs={12}>
                        <div style={{width:"400px"}} >
                        <CNav variant="tabs" role="tablist">
                            <CNavItem>
                                <CNavLink
                                    active={activeKey2 === 1}
                                    onClick={() => setActiveKey2(1)}
                                >
                                   Select Client
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink
                                    active={activeKey2 === 2}
                                    onClick={() => setActiveKey2(2)}
                                >
                                  Select Enquiry
                                </CNavLink>
                            </CNavItem>
                        </CNav>
                        <CTabContent>
                            <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey2 === 1}>
                                <CCol  className="py-2">
                                 
                                    <CustomSelectInput data={clientData} 
                                 title={(bookingData.clientName?.trim()&&bookingData.clinetType==='Client')?
                                  bookingData.clientName:"Select Client"}
                                     getData={(obj)=>clientObj(obj,'Client')}/>

                                </CCol>

                            </CTabPane>
                            <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey2 === 2}>
                            <CCol  className="py-2">
                                 
                                 <CustomSelectInput data={enquiryData} 
                                 title={(bookingData.clientName?.trim()&&bookingData.clinetType==='Enquiry')?
                                    bookingData.clientName:"Select Enquiry"}
                                  getData={(obj)=>clientObj(obj,'Enquiry')}
                                  />

                             </CCol>
                            </CTabPane>
                        </CTabContent>

                        </div>

                    </CCol>
  <CCol md={4} lg={3}>
    <CFormInput type="text" id="inputPassword4" label="Client Id" />
  </CCol>
  <CCol md={4} lg={3}>
    <CFormInput id="inputAddress" label="Client Address" placeholder="1234 Main St"/>
  </CCol>
  <CCol md={4} lg={3}>
    <CFormInput id="inputAddress2" label="Client Address 2" placeholder="Optional"/>
  </CCol>
  <CCol md={4} lg={3}>
    <CFormInput id="inputCity" label="City"/>
  </CCol>
 
  <CCol md={4} lg={3}>
    <CFormInput id="inputCity" label="Center Name"/>
  </CCol>

  
  <CCol  md={4} lg={3}>
    <CFormInput type="number" id="gridCheck" label="Contact Number"/>
  </CCol>
  <CCol  md={4} lg={3}>
    <CFormInput type="Booking Time"  id="gridCheck" label="Time"/>
  </CCol>
  <CCol  md={8} lg={6}>
    <label>Booking  date  Start and End</label>
    <div className='datePiker'>
    <input type="date" 
    min="2021-02-18"
    id="gridCheck" />
     <input type="date" 
    min="2021-02-18"
    id="gridCheck" />
    </div>
  </CCol>
  <CCol  md={4} lg={3}>
    <CFormSelect id="inputState" label="Created By">
      <option>Choose...</option>
      <option>...</option>
    </CFormSelect>
  </CCol>
  <CCol xs={12} className='my-4'>
    <CButton type="submit">Book Event</CButton>
  </CCol>
  </CRow>
  </form>
</CCard>
  )
}

export default EventBoking
