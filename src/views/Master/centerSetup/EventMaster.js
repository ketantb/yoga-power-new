import { CAccordion, CAccordionBody, CAccordionHeader, CAccordionItem, CBadge, CButton, CCard, CCardBody, CCardHeader, CCardImage, CCardText, CCardTitle, CCol, CForm, CFormInput, CFormSelect, CFormSwitch, CFormTextarea, CImage, CInputGroup, CListGroup, CListGroupItem, CPopover, CRow, CSpinner, CWidgetStatsD } from '@coreui/react'
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
    const pathVal = useAdminValidation()
    const uniqObjeact = useUniqAdminObjeact('Master')
    const [eventMadterData,setEventMasterData] = useState([])


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

        fetch(`${ url }/prospect/create`, {
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

        </CRow> {eventMadterData}   
        

        <CTable className='mt-3' align="middle" bordered  hover responsive scrollable>
                            <CTableHead color={'darkGreen'} >
                                    <CTableHeaderCell>Sr.No</CTableHeaderCell>
                                    <CTableHeaderCell>Enquiry ID</CTableHeaderCell>
                                    <CTableHeaderCell>Date</CTableHeaderCell>
                                    <CTableHeaderCell>Time</CTableHeaderCell>
                                    <CTableHeaderCell>Name</CTableHeaderCell>
                                    <CTableHeaderCell>Mobile</CTableHeaderCell>
                                    <CTableHeaderCell>Service</CTableHeaderCell>
                                    <CTableHeaderCell>Source</CTableHeaderCell>
                                    <CTableHeaderCell>Enquiry stage</CTableHeaderCell>
                                    <CTableHeaderCell>Call Status</CTableHeaderCell>
                                    <CTableHeaderCell style={{ minWidth: '100px' }}>Trial Date/Time</CTableHeaderCell>
                                    {(isAdmin||trailAdd)&&<CTableHeaderCell>Add</CTableHeaderCell>}
 
                                    {(isAdmin || trailEdit) && <CTableHeaderCell>Trial Status</CTableHeaderCell>}
                                    <CTableHeaderCell>Message</CTableHeaderCell>

                                    <CTableHeaderCell>Assigned by</CTableHeaderCell>
                                    <CTableHeaderCell>Counsellor</CTableHeaderCell>
                                    {(isAdmin || trailAdd) && <CTableHeaderCell>Action</CTableHeaderCell>}
                                    {(isAdmin || (trailEdit || trailDelete)) && <CTableHeaderCell>Edit/Delete</CTableHeaderCell>}
                            </CTableHead>
                            <CTableBody>
                                <CTableRow>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "60px" }}
                                            type="text"
                                            disabled
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "120px" }}
                                            type="text"
                                            value={Search1}
                                            onChange={(e) => setSearch1(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "120px" }}
                                            value={Search2}
                                            onChange={(e) => setSearch2(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            disabled
                                            style={{ minWidth: "90px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "120px" }}
                                            value={Search3}
                                            onChange={(e) => setSearch3(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "120px" }}
                                            value={Search4}
                                            onChange={(e) => setSearch4(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            value={Search5}
                                            onChange={(e) => setSearch5(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "80px" }}
                                            value={Search6}
                                            onChange={(e) => setSearch6(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "100px" }}
                                            value={Search7}
                                            onChange={(e) => setSearch7(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "100px" }}
                                            value={Search8}
                                            onChange={(e) => setSearch8(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "100px" }}
                                            type="text"
                                            disabled
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell style={{ display: (isAdmin || trailAdd) ? '' : 'none' }}>
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "100px" }}
                                            type="text"
                                            disabled
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell style={{ display: (isAdmin || trailEdit) ? '' : 'none' }}>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            disabled
                                            aria-describedby="exampleFormControlInputHelpInline"
                                            style={{ minWidth: "100px" }}
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "100px" }}
                                            type="text"
                                            disabled
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "100px" }}
                                            value={Search9}
                                            onChange={(e) => setSearch9(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            value={Search10}
                                            style={{ minWidth: "100px" }}
                                            onChange={(e) => setSearch10(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell style={{ display: (isAdmin || trailAdd) ? '' : 'none' }}>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            disabled
                                            aria-describedby="exampleFormControlInputHelpInline"
                                            style={{ minWidth: "100px" }}

                                        />
                                    </CTableDataCell>
                                    <CTableDataCell style={{ display: (isAdmin || (trailEdit || trailDelete)) ? '' : 'none' }}>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            disabled
                                            aria-describedby="exampleFormControlInputHelpInline"
                                            style={{ minWidth: "100px" }}

                                        />
                                    </CTableDataCell>
                                </CTableRow>
                                {eventMadterData.map((item, index) => (
                                    (
                                        <CTableRow key={index}>
                                            <CTableDataCell>{index + 1 + (paging * 10)}</CTableDataCell>
                                            <CTableDataCell>{item.EnquiryId}</CTableDataCell>
                                            <CTableDataCell className='text-center'>{moment(item.createdAt).format("DD-MM-YYYY")}</CTableDataCell>
                                            <CTableDataCell>{moment(item.createdAt, "HH:mm").format("hh:mm A")}</CTableDataCell>
                                            <CTableDataCell>{item.Fullname}</CTableDataCell>
                                            <CTableDataCell>{item.ContactNumber}</CTableDataCell>
                                            <CTableDataCell>{item.ServiceName}</CTableDataCell>
                                            <CTableDataCell>{item.enquirytype}</CTableDataCell>
                                            <CTableDataCell>{item.appointmentfor}</CTableDataCell>
                                            <CTableDataCell>{item.CallStatus}</CTableDataCell>
                                            <CTableDataCell>{moment(item.appointmentDate).format("DD-MM-YYYY") != 'Invalid date' && moment(item.appointmentDate).format("DD-MM-YYYY")}<br />{moment(item.appointmentTime, "HH:mm").format("hh:mm A") != 'Invalid date' && moment(item.appointmentTime, "HH:mm").format("hh:mm A")}</CTableDataCell>
                                            <CTableDataCell style={{display:(isAdmin|| trailAdd)?'':'none'}} ><BsPlusCircle id={item._id} style={{ cursor: 'pointer', markerStart: '10px', marginLeft: "4px" }}  
                                        onClick={() => { setEdit(item._id), handleAdmission({...item,type:'bottom'}) }} /></CTableDataCell>
                                           
                                            <CTableDataCell style={{ display: (isAdmin || trailEdit) ? '' : 'none' }}>
                                                {item?.trailStatus ? <CButton size='sm' color='success'>Done</CButton> :
                                                    <CButton size='sm' color='warning' onClick={() => 
                                                    conFirmTrailStatus(item._id)} >Pending...</CButton>}
                                            </CTableDataCell>

                                            <CTableDataCell>{item.Message}</CTableDataCell>
                                            <CTableDataCell>{item.StaffName}</CTableDataCell>
                                            <CTableDataCell>{item.Counseller}</CTableDataCell>
                                            <CTableDataCell className='text-center' style={{ display: (isAdmin || trailAdd) ? '' : 'none' }}><a href={`tel:+${ item.CountryCode }${ item.ContactNumber }`} target="_black"><MdCall style={{ cursor: 'pointer', markerStart: '10px' }} onClick={() => { setCallReport(true), handleCallReport(item._id) }} size='20px' /></a><a href={`https://wa.me/${ item.ContactNumber }`} target="_black"><BsWhatsapp style={{ marginLeft: "4px", cursor: 'pointer', markerStart: '10px' }} onClick={() => { setCallReport(true), handleCallReport(item._id) }} size='20px' /></a><a href={`mailto: ${ item.Emailaddress }`} target="_black"> <MdMail style={{ cursor: 'pointer', markerStart: '10px', marginLeft: "4px" }} onClick={() => { setCallReport(true), handleCallReport(item._id) }} size='20px' /></a> <BsPlusCircle id={item._id} style={{ cursor: 'pointer', markerStart: '10px', marginLeft: "4px" }} onClick={() => handleFollowup(item._id,item)} /></CTableDataCell>
                                            <CTableDataCell className='text-center'>
                                                {(isAdmin || trailEdit) && <MdEdit id={item._id} style={{ fontSize: '35px', cursor: 'pointer', markerStart: '10px' }}
                                                    onClick={() => handleEnquiry(item)} size='20px' />}
                                                {(isAdmin || trailDelete) && <MdDelete style={{ cursor: 'pointer', markerStart: '10px', marginLeft: "5px" }} onClick={() => deleteEnquiry(item._id)} size='20px' />}</CTableDataCell>
                                        </CTableRow>
                                    )
                                ))}
                            </CTableBody>
                        </CTable>


            </CCardBody>
        </CCard>
  )
}

export default EventMaster
