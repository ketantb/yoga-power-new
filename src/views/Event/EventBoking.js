import React, { useEffect,useState } from 'react'
import { CForm,CFormInput,CCol,CButton,CFormSelect,CFormCheck, CCard,
    CRow,CNav,CNavItem,CNavLink,CTabContent,CTabPane
 } from '@coreui/react'
 import axios from 'axios'
 import { useSelector } from 'react-redux'
import { useAdminValidation } from '../Custom-hook/adminValidation'
import moment from 'moment/moment'
import CustomSelectInput from '../Fitness/CustomSelectInput/CustomSelectInput'
import { useUniqAdminObjeact } from '../Custom-hook/adminValidation'
const EventBoking = () => {

  const url = useSelector((el) => el.domainOfApi)
  const pathVal = useAdminValidation('Master')
  const [requreData,seteRequireData] = useState([])
  const [clientData,setClientData] = useState([])
  const [enquiryData,setEnquiryData] = useState([])
  const [employeeData,setEmployeeData] = useState([])
  const [activeKey2, setActiveKey2] = useState(1)
  const objectValidation = useUniqAdminObjeact()


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
paid:false,
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
createdBy:"",
emailAddress:'',
MemberId:"",
clientFees:'',
...objectValidation
  }

  const [bookingData,setBookingData] = useState({...obj,...objectValidation})


  let user = JSON.parse(localStorage.getItem('user-info'))
  const token = user.token; 
  
const headers =  {
    'Authorization': `Bearer ${token}`
}
  
 async function toGetRequireData(){
  const response =  axios.get(`${url}/eventDetails/active-event/${pathVal}`,{headers})
  const response1 = axios.get(`${url}/memberForm/${pathVal}`,{headers})
  const response2 = axios.get(`${url}/enquiryForm/${pathVal}`,{headers})
  const response3 = axios.get(`${url}/employeeform/${pathVal}`,{headers})

  
  const allData = await Promise.all([response,response1,response2,response3])
  seteRequireData([...allData[0]?.data])
  setClientData([...allData[1]?.data])
  setEnquiryData([...allData[2]?.data])
  setEmployeeData([...allData[3]?.data])



 }
   



 useEffect(()=>{
  toGetRequireData()
 },[])

 const selectedEvent = requreData.find((el)=>el._id===bookingData.eventUniqID)

console.log(selectedEvent)
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
    paid:(selectedEvent?.paid||false),
    eventActive:(selectedEvent?.eventActive),
    eventUniqID:bookingData.eventUniqID,
    bookingStartDate:"",
    bookingEndDate:"",
  }))
},[bookingData.eventUniqID])

function clientObj(obj,type){
  console.log(obj)
  setBookingData((prev)=>
  
  ({...prev,...{
      clientName:obj?.Fullname,
      contactNumber:obj?.ContactNumber,
      clinetId:obj?.ClientId?obj?.ClientId:obj?.EnquiryId,
      emailAddress:obj?.Email?obj?.Email:obj?.Emailaddress,
      MemberId:obj?._id,
      clinetType:type,
      centerName:objectValidation.centerNameC,
      clientAdress:obj?.Address?obj?.Address:obj?.address,
      city:obj?.city
  }}))    
}

const saveBokingData = (e) => {
  if(!bookingData?.clientName){
    alert('Please Select client name')
  }
  e.preventDefault()

  fetch(`${ url }/bookingEvent/create`, {
      method: "POST",
      headers: {
          "Authorization": `Bearer ${ token }`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({...bookingData})
  }).then((resp) => {
      resp.json().then(() => {
          setBookingData({...obj})
          alert('Successfully Book')
      })
  }).catch((resp)=>{
    console.log(resp)
  })
  
}


  return (
<CCard className="row g-3 ">
<form className='p-3' onSubmit={saveBokingData} >
    <CRow>
    <CCol md={4} lg={3} >
    <CFormSelect 
    id="inputState" 
    label="Event"  
    value={bookingData.eventUniqID}
    onChange={(e)=>setBookingData(prev=>({...prev,eventUniqID:e.target.value}))}
    required
    >
      <option value={""}>Choose event...</option>
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
    <CFormInput type="text"  label="Client Id" 
    value={bookingData.clinetId}
    required
    />
  </CCol>
  <CCol md={4} lg={3}>
    <CFormInput id="inputAddress" label="Client Address" placeholder="1234 Main St"
    value={bookingData.clientAdress}
    onChange={(e)=>setBookingData(prev=>({...prev,clientAdress:e.target.value}))}
    />
  </CCol>
  <CCol md={4} lg={3}>
    <CFormInput id="inputAddress2" label="Email" placeholder="Optional"
        value={bookingData.emailAddress}
        onChange={(e)=>setBookingData(prev=>({...prev,emailAddress:e.target.value}))}
    />
  </CCol>
  <CCol md={4} lg={3}>
    <CFormInput id="inputCity" label="City"
        value={bookingData.city}
        onChange={(e)=>setBookingData(prev=>({...prev,city:e.target.value}))} 
    />
  </CCol>
 
  <CCol md={4} lg={3}>
    <CFormInput id="inputCity" label="Center Name"
            value={bookingData.centerName}
            onChange={(e)=>setBookingData(prev=>({...prev,centerName:e.target.value}))} 
    />
  </CCol>

  <CCol  md={4} lg={3}>
    <CFormInput type="number" id="gridCheck" label="Contact Number"
             value={bookingData.contactNumber}
             onChange={(e)=>setBookingData(prev=>({...prev,contactNumber:e.target.value}))} 
             required
    />
  </CCol>
  <CCol  md={4} lg={3}>
    <CFormInput  id="gridCheck" label="Time"
    type='time'
    value={bookingData.bookingTime}
    onChange={(e)=>setBookingData(prev=>({...prev,bookingTime:e.target.value}))}
    required
    />
  </CCol>
  {bookingData.paid&&
   <CCol  md={4} lg={3}>
   <CFormInput  id="gridCheck" label="Fees"
   type='number'
   value={bookingData.clientFees}
   onChange={(e)=>setBookingData(prev=>({...prev,clientFees:e.target.value}))}
   required
   />
 </CCol>
  }
  <CCol  md={8} lg={6}>
    <label>Booking  date  Start and End</label>
    <div className='datePiker'>
    <input type="date" 
    min={bookingData.eventStartDate}
    max={bookingData.eventEndDate}
    value={bookingData.bookingStartDate}
    onChange={(e)=>setBookingData(prev=>({...prev,bookingStartDate:e.target.value}))}
    required


    id="gridCheck" />
     <input type="date" 
    min={bookingData.bookingStartDate}
    max={bookingData.eventEndDate}
    value={bookingData.bookingEndDate}
    required
    onChange={(e)=>setBookingData(prev=>({...prev,bookingEndDate:e.target.value}))}
    id="gridCheck" />
    </div>
  </CCol>
  <CCol  md={4} lg={3}>
    <CFormSelect id="inputState" label="Created By"
    value={bookingData.employeeMongoId}
    required
    onChange={(e)=>{
      setBookingData((prev)=>({...prev,
        employeeMongoId:e.target.value.trim(),
        createdBy:employeeData.find((el)=>el._id===e.target.value)?.FullName
      }))
      
    }}
    >
      <option value={""}>Choose staff ...</option>
      {employeeData.map((el)=>
      <option value={el._id}>{el.FullName} {el.EmployeeID}</option>
      )}
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
