import { CAccordion, CAccordionBody, CAccordionHeader, CAccordionItem, CBadge, 
    CButton, CCard, CCardBody, CCardHeader, CCardImage, CCardText, CCardTitle, CCol, CForm,
     CFormInput, CFormSelect, CFormSwitch, CFormTextarea, CImage, CInputGroup, CListGroup, CListGroupItem,
      CPopover, CRow, CSpinner, CWidgetStatsD,CTable,CTableHead,CTableHeaderCell,CTableBody, CTableRow
     } from '@coreui/react'
import React, { useState } from 'react'
import EventImage from 'src/assets/images/avatars/eventImage.jpg'
import { CChartLine } from '@coreui/react-chartjs'
import { cibFacebook } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useAdminValidation,useUniqAdminObjeact } from 'src/views/Custom-hook/adminValidation'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'
const EventMaster = () => {

    const [liveClass, setLiveClass] = useState(false)
    const [pass, setPass] = useState(false)
    const [paid, setPaid] = useState(false)
    const url = useSelector((el) => el.domainOfApi)
    const pathVal = useAdminValidation('Master')
    const uniqObjeact = useUniqAdminObjeact()
    const [eventMasterData,setEventMasterData] = useState([])


    const obj ={
        eventName:'',
        eventBanner:'',
        hostName:'',
        service:'',
        comments:'',
        eventType:'',
        eventStartDate:'',
        eventEndDate:'',
        eventTime:'',
        duration:'',
        clientLimit:'',
        fess:'',
        paid:false,
        eventActive:false,
    }

    const [eventObj, setEventObj] = useState({...obj})


    const handleToggle1 = () => {
        setLiveClass(!liveClass)
        setPass(false)
    }
 

    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;

    const saveCallReport = () => {

        fetch(`${ url }/eventDetails/create`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${ token }`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...uniqObjeact, ...obj })
        }).then((resp) => {
            resp.json().then(() => {
                alert('Successfully save')
                setLiveClass(true)
            })
        })
    }


    function getStaff() {
        axios.get(`${ url }/eventDetails/${ pathVal }`, {
            headers: {
                'Authorization': `Bearer ${ token }`
            }
        })
            .then((res) => {
                setEventMasterData(res.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    useEffect(()=>{
        getStaff()
    },[])

  return (
    <CCard className="mb-3 border-success">
            <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                <CCardTitle>Event</CCardTitle>
            </CCardHeader>
            <CCardBody>
           <CRow> 

            { (<CCol className='text-end' lg={12} md={12} sx={12} sm={12}>
                            <CButton className="mt-2 float-end me-3" onClick={handleToggle1} >{!liveClass ? 'Add Event' : 'Close'}</CButton>
                </CCol>)} 

            <CCol sx={12}>
            {liveClass && (                
                <CForm>
                    <CRow>
                        <CCol>                           
                                <CCard className="mt-2 border-success">
                                    <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                                        Add Event Details
                                    </CCardHeader>
                                    <CCardBody>
                                        <CRow>
                                            <CCol xs={3}>
                                                <CFormInput
                                                    className="mb-1"
                                                    type="text"
                                                    id="exampleFormControlInput1"
                                                    label="Event Name"
                                                    placeholder="Enter Name"
                                                    value={eventObj.eventName}
                                                    onChange={(e)=>setEventObj((prev)=>({...prev,eventName:e.target.value}))}
                                                />
                                            </CCol>
                                            <CCol xs={3}>
                                                <CFormInput
                                                    className="mb-1"
                                                    type="file"
                                                    id="exampleFormControlInput1"
                                                    label="Event Banner "
                                                    placeholder="Enter Name"
                                                    value={eventObj.eventBanner}
                                                    onChange={(e)=>setEventObj((prev)=>({...prev,eventName:e.target.value}))}
                                                />
                                            </CCol>
                                            <CCol xs={3}>
                                                <CFormInput
                                                    className="mb-1"
                                                    type="text"
                                                    id="exampleFormControlInput1"
                                                    label="Host Name"
                                                    placeholder="Enter Name"
                                                    value={eventObj.hostName}
                                                    onChange={(e)=>setEventObj((prev)=>({...prev,hostName:e.target.value}))}
                                                />
                                            </CCol>
                                            <CCol xs={3}>
                                                <CFormSelect
                                                    className="mb-1"
                                                    aria-label="Select Service"
                                                    label="Service"
                                                    options={[
                                                        "Select Service",
                                                        { label: "One", value: "1" },
                                                        { label: "Two", value: "2" },
                                                        { label: "Three", value: "3" },
                                                    ]}
                                                    value={eventObj.service}
                                                    onChange={(e)=>setEventObj((prev)=>({...prev,service:e.target.value}))}
                                                />
                                            </CCol>

                                            <CCol xs={12}>
                                                <CFormTextarea
                                                    id="exampleFormControlTextarea1"
                                                    label="Comments"
                                                    rows="2"
                                                    text="Must be 8-20 words long."
                                                    value={eventObj.comments}
                                                    onChange={(e)=>setEventObj((prev)=>({...prev,comments:e.target.value}))}
                                                ></CFormTextarea>
                                            </CCol>
                                            <CCol xs={3}>
                                                <CFormSelect
                                                    className="mb-1"
                                                    aria-label="Select Service"
                                                    label="Event Type"
                                                    options={[
                                                        "Select Event Type",
                                                        { label: "Online Event", value: "1" },
                                                        { label: "Center Offline Event", value: "2" },
                                                        { label: "Three", value: "3" },
                                                    ]}
                                                    value={eventObj.eventType}
                                                    onChange={(e)=>setEventObj((prev)=>({...prev,eventType:e.target.value}))}
                                                />
                                            </CCol>
                                            <CCol xs={3}>
                                                <CFormInput
                                                    className="mb-1"
                                                    type="date"
                                                    id="exampleFormControlInput1"
                                                    label="Event Start Date"
                                                    placeholder="Enter date"
                                                    value={eventObj.eventStartDate}
                                                    onChange={(e)=>setEventObj((prev)=>({...prev,eventStartDate:e.target.value}))}
                                                />
                                            </CCol>
                                            <CCol xs={3}>
                                                <CFormInput
                                                    className="mb-1"
                                                    type="date"
                                                    id="exampleFormControlInput1"
                                                    label="Event End Date"
                                                    placeholder="Enter date"
                                                    value={eventObj.eventEndDate}
                                                    onChange={(e)=>setEventObj((prev)=>({...prev,eventEndDate:e.target.value}))}
                                                />
                                            </CCol>
                                            <CCol xs={3}>
                                                <CFormInput
                                                    className="mb-1"
                                                    type="time"
                                                    id="exampleFormControlInput1"
                                                    label="Event Time"
                                                    placeholder="Enter date"
                                                    value={eventObj.eventTime}
                                                    onChange={(e)=>setEventObj((prev)=>({...prev,eventTime:e.target.value}))}
                                                />
                                            </CCol>
                                            <CCol xs={3}>
                                                <CFormSelect
                                                    className="mb-1"
                                                    aria-label="Select Duration"
                                                    label="Duration"
                                                    options={[
                                                        "Select Duration",
                                                        { label: "One", value: "1" },
                                                        { label: "Two", value: "2" },
                                                        { label: "Three", value: "3" },
                                                    ]}
                                                    value={eventObj.duration}
                                                    onChange={(e)=>setEventObj((prev)=>({...prev,duration:e.target.value}))}
                                                />
                                            </CCol>
                                            <CCol xs={3}>
                                                <CFormSelect
                                                    className="mb-1"
                                                    aria-label="Select Duration"
                                                    label="Client Limit"
                                                    options={[
                                                        "Select Limit",
                                                        { label: "100", value: "1" },
                                                        { label: "200", value: "2" },
                                                        { label: "300", value: "3" },
                                                        { label: "No Limit", value: "3" },
                                                    ]}
                                                    value={eventObj.clientLimit}
                                                    onChange={(e)=>setEventObj((prev)=>({...prev,clientLimit:e.target.value}))}
                                                />
                                            </CCol>
                                            {eventObj.paid && (
                                                <CCol xs={3}>
                                                    <CFormInput
                                                        className="mb-1"
                                                        type="number"
                                                        id="exampleFormControlInput1"
                                                        label="Fess"
                                                        placeholder="Enter Fees"
                                                        value={eventObj.fess}
                                                        onChange={(e)=>setEventObj((prev)=>({...prev,fess:e.target.value}))}
                                                    />
                                                </CCol>
                                            )}
                                            <CCol className='mt-4' xs={3}>
                                                <CFormSwitch label="Paid"       
                                                checked={eventObj.paid}
                                                onChange={(e)=>setEventObj((prev)=>({...prev,paid:!prev.paid}))}
                                                />
                                            </CCol>
                                            <CCol className='mt-4' xs={3}>
                                                <CFormSwitch label="Event Active" id="formSwitchCheckDefault"
                                                checked={eventObj.eventActive}
                                                onChange={(e)=>setEventObj((prev)=>({...prev,eventActive:!prev.eventActive}))}
                                                />
                                            </CCol>
                                            <CCol className='mt-4'>
                                                <CButton className='float-end' onClick={() => saveCallReport()}>
                                                    Save
                                                </CButton>
                                            </CCol>
                                        </CRow>
                                    </CCardBody>
                                </CCard>
                            
                           
                        </CCol>
                    </CRow>
                
                </CForm>)}
            </CCol>

        </CRow>   
        

        <CTable className='mt-3' align="middle" bordered  hover responsive scrollable>
                            <CTableHead  >
                                    <CTableHeaderCell>Sr.No</CTableHeaderCell>
                                    <CTableHeaderCell>Event Name</CTableHeaderCell>
                                    <CTableHeaderCell>Event Banner</CTableHeaderCell>
                                    <CTableHeaderCell>Host Name</CTableHeaderCell>
                                    <CTableHeaderCell>Service</CTableHeaderCell>
                                    <CTableHeaderCell>Event Type</CTableHeaderCell>
                                    <CTableHeaderCell>Event Start Date</CTableHeaderCell>
                                    <CTableHeaderCell>Event End Date</CTableHeaderCell>
                                    <CTableHeaderCell>Event Time</CTableHeaderCell>
                                    <CTableHeaderCell>Duration</CTableHeaderCell>
                                    <CTableHeaderCell >Client Limit</CTableHeaderCell>
                                    {<CTableHeaderCell>Fess</CTableHeaderCell>}
 
                                    {<CTableHeaderCell>Paid</CTableHeaderCell>}
                                    <CTableHeaderCell>Event Active</CTableHeaderCell>
                            </CTableHead>
                            <CTableBody>
                                {eventMasterData.map((el,i)=>
                               <CTableRow>
                                  <CTableDataCell>{i+1}</CTableDataCell>
                                  <CTableDataCell>{el.eventName}</CTableDataCell>
                                  <CTableDataCell>{el.eventBanner}</CTableDataCell>
                                  <CTableDataCell>{el.hostName}</CTableDataCell>
                                  <CTableDataCell>{el.hostName}</CTableDataCell>
                                  <CTableDataCell>{el.service}</CTableDataCell>
                                  <CTableDataCell>{el.comments}</CTableDataCell>
                                  <CTableDataCell>{el.eventType}</CTableDataCell>
                                  <CTableDataCell>{new Date(el.eventStartDate).toLocaleDateString()}</CTableDataCell>
                                  <CTableDataCell>{new Date(el.eventEndDate ).toLocaleDateString()}</CTableDataCell>
                                  <CTableDataCell>{el.eventTime}</CTableDataCell>
                                  <CTableDataCell>{el.duration}</CTableDataCell>
                                  <CTableDataCell>{el.clientLimit}</CTableDataCell>
                                  <CTableDataCell>{el.fess}</CTableDataCell>
                                  <CTableDataCell>{el.paid?<CButton color='success'>Active</CButton>:<CButton color='danger'>Inactive</CButton>}</CTableDataCell>
                                  <CTableDataCell>{el.eventActive}</CTableDataCell>
                                </CTableRow>
                                )}
                            </CTableBody>
                        </CTable>
            </CCardBody>
        </CCard>
  )
}

export default EventMaster
