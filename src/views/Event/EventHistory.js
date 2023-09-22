import { CRow,CCol,CCard,CCardHeader,CCardTitle,CCardText,CAccordion
    ,CAccordionItem,CAccordionBody,CAccordionHeader,CListGroup,CListGroupItem,
    CCardBody,CImage,CBadge,CButton,CForm,CInputGroup,CFormSelect,CFormInput,CPopover,
    CTable,CTableHead,CTableBody,CTableRow,CTableDataCell,CTableHeaderCell
 } from '@coreui/react'
import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useAdminValidation } from '../Custom-hook/adminValidation'



const EventHistory = () => {
    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token
    const url = useSelector((el) => el.domainOfApi)

    const [eventHistoryData,setEventHistoryData] = useState([])
    const pathVal = useAdminValidation('Master')



    const headers =  {
        'Authorization': `Bearer ${token}`
    }
      
     async function toGetRequireData(){

      const response = axios.get(`${url}/bookingEvent/event-histroy/${pathVal}`,{headers})
      const allData = await Promise.all([response])
      setEventHistoryData([...allData[0]?.data])
     }

     useEffect(()=>{
        toGetRequireData()
    },[])

    

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

    console.log(eventHistoryData)

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
        <CRow className='p-0'>
            {
                eventHistoryData.map((el,i)=>
                <CCol lg={12} sm={12} className='mt-0 p-0' key={i}>
                <CAccordion activeItemKey={2} key={i} className='p-0 m-1 ' >
                    <CAccordionItem itemKey={i} key={i} className='p-0 m-0 '>
                        <CAccordionHeader className='p-0 m-0 d-flex flex-column'  >
                            {/* <CCol> */}
                            <CCol xs={12}  className='d-flex flex-column'>
                             <div className='d-flex'>
                              <h6 >TOTAL ATTENDED : {el.attendedClient}</h6>
                              <h6 className='mx-3' >CLIENT LIMIT : {el.attendedClient}</h6>
                             </div>      

                            {/* </CCol> */}
                            <div  className='w-100' style={{overflowX:"scroll"}}>
                            <CTable  className=' m-0 mt-3 p-0' align="middle" bordered  hover responsive scrollable  >
                            <CTableHead className='p-0 m-0'  >
                                    <CTableHeaderCell className='p-2 '>Sr.No</CTableHeaderCell>
                                    <CTableHeaderCell className='p-2'>Event Name</CTableHeaderCell>
                                    <CTableHeaderCell className='p-2'>Host Name</CTableHeaderCell>
                                    <CTableHeaderCell className='p-2'>Topic</CTableHeaderCell>
                                    <CTableHeaderCell className='p-2'>Event venue</CTableHeaderCell>
                                    <CTableHeaderCell className='p-2'>Start Time</CTableHeaderCell>
                                    <CTableHeaderCell className='p-2'>Duration</CTableHeaderCell>
                                    <CTableHeaderCell className='p-2'>Event Start Date</CTableHeaderCell>
                                    <CTableHeaderCell className='p-2'>Event End Date</CTableHeaderCell>
                                    <CTableHeaderCell className='p-2'>Fess</CTableHeaderCell>
                                    <CTableHeaderCell className='p-2'>Event Status</CTableHeaderCell>
                                    <CTableHeaderCell className='p-2'>Comment of cancel event</CTableHeaderCell>
                            </CTableHead>
                            <CTableBody>
                            <CTableRow>
                               
                                  <CTableDataCell>{i+1}</CTableDataCell>
                                  {/* <div 
                                className="border-gray rounded-circle"
                                style={{width:'100px'}}
                                >
                                  <img
                                  width='100%'
                                  src={el.eventBanner}
                                  />
                                </div> */}
                                  <CTableDataCell>{el.eventName}</CTableDataCell>
                                  <CTableDataCell>{el.hostName}</CTableDataCell>
                                  <CTableDataCell>{el.service}</CTableDataCell>
                                  <CTableDataCell>{el.eventType}</CTableDataCell>
                                  <CTableDataCell>{el.eventTime}</CTableDataCell>
                                  <CTableDataCell>{el.duration}</CTableDataCell>
                                  <CTableDataCell>{new Date(el.eventStartDate).toLocaleDateString()}</CTableDataCell>
                                  <CTableDataCell>{new Date(el.eventEndDate ).toLocaleDateString()}</CTableDataCell>
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
                        </CAccordionHeader>
                        <CAccordionBody>
                            <CListGroup>
                                <CListGroupItem component="a" href="#" >
                                    <CRow>
                                        <CCol>Sr. No</CCol>
                                        <CCol>Date</CCol>
                                        <CCol>Attendance ID</CCol>
                                        <CCol>Client Name</CCol>
                                        <CCol>Joining time</CCol>
                                        <CCol>Attendance</CCol>
                                        <CCol>Details</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem component="a" href="#" >
                                    <CRow>
                                        <CCol>1</CCol>
                                        <CCol>25-10-2022</CCol>
                                        <CCol>CLIENT456</CCol>
                                        <CCol>Sejal</CCol>
                                        <CCol>11 pm</CCol>
                                        <CCol>P</CCol>
                                        <CCol>
                                            <CButton>View</CButton>
                                        </CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem component="a" href="#" >
                                    <CRow>
                                        <CCol>2</CCol>
                                        <CCol>25-10-2022</CCol>
                                        <CCol>CLIENT456</CCol>
                                        <CCol>Sejal</CCol>
                                        <CCol>11 pm</CCol>
                                        <CCol>P</CCol>
                                        <CCol>
                                            <CButton>View</CButton>
                                        </CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem component="a" href="#" >
                                    <CRow>
                                        <CCol>3</CCol>
                                        <CCol>25-10-2022</CCol>
                                        <CCol>CLIENT456</CCol>
                                        <CCol>Sejal</CCol>
                                        <CCol>11 pm</CCol>
                                        <CCol>P</CCol>
                                        <CCol>
                                            <CButton>View</CButton>
                                        </CCol>
                                    </CRow>
                                </CListGroupItem>
                            </CListGroup>
                        </CAccordionBody>
                    </CAccordionItem>
                </CAccordion>
            </CCol>
                )
            }
        </CRow>
    </div>
</CCard> 
  )
}

export default EventHistory
