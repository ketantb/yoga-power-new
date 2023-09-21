import { CAccordion, CAccordionBody, CAccordionHeader, CAccordionItem, CBadge, 
    CButton, CCard, CCardBody, CCardHeader, CCardImage, CCardText, CCardTitle, CCol, CForm,
     CFormInput, CFormSelect, CFormSwitch, CFormTextarea, CImage, CInputGroup, CListGroup, CListGroupItem,
      CPopover, CRow, CSpinner, CWidgetStatsD,CTable,CTableHead,CTableHeaderCell,CTableBody, CTableRow,
      CTableDataCell
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
import { useUploadImgaeHook } from 'src/views/forms/useUploadHook'
import { MdEdit,MdDelete } from 'react-icons/md'
const EventMaster = () => {

    const [liveClass, setLiveClass] = useState(false)
    const [pass, setPass] = useState(false)
    const [paid, setPaid] = useState(false)
    const url = useSelector((el) => el.domainOfApi)
    const pathVal = useAdminValidation('Master')
    const uniqObjeact = useUniqAdminObjeact()
    const [eventMasterData,setEventMasterData] = useState([])
    const [imageProgress,setImgPrograss] = useState(0)
    const [imageUrl,setImageUrl] = useState('')
    const [image,setImage] = useState('')
    const handleChange = useUploadImgaeHook(setImageUrl,setImgPrograss,setImage,"event-image-banner")



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
        eventActive:"active",
    }

    const [eventObj, setEventObj] = useState({...obj})


    const handleToggle1 = (val=false) => {
        if(val){
        setLiveClass(val)
        return 
        }
        setLiveClass(!liveClass)
        setPass(false)
    }
 

    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;

    const saveCallReport = (e) => {
        e.preventDefault()
        const path = eventObj?._id?.trim()?`/eventDetails/update/${eventObj?._id}`:`/eventDetails/create`

        fetch(`${ url }${path}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${ token }`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...uniqObjeact, ...eventObj,eventBanner:imageUrl })
        }).then((resp) => {
            resp.json().then(() => {
                setEventObj({...obj})
                setImgPrograss(0)
                alert('Successfully save')
                setLiveClass(true)
                getEventDetails()
            })
        })
        
    }


    function getEventDetails() {
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
        getEventDetails()
    },[])

   


    function deleteEventDetails(id) {
        if(!confirm('Do u really Want to delete this')){
          return 
        }
   
        axios.delete(`${ url }/eventDetails/delete/${ id }`, { headers:{
            "Authorization": `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
    } })
            .then((res) => {
               getEventDetails()
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const updateEvent = (id,item) => {

        fetch(`${ url }/eventDetails/update/${id}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${ token }`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item)
        }).then((resp) => {
            resp.json().then(() => {
            
                getEventDetails()
            })
        })
    }   

    async function  StatusOpration(value,id,item){
        const status = value
        if(status==='cancel'){
           let commentValue = prompt("Why you want to cancel")
       
        if(commentValue){
            updateEvent(id,{...item,comments:commentValue,eventActive:value})
           }
        }else if(status==='done'||status==='active'){
            updateEvent(id,{...item,eventActive:value})
         }
        }  
        
        

   const compareFunction = (date,endDate,val)=>{

      const dateCon = (new Date(date).getFullYear()<=new Date().getFullYear()&&
       new Date(date).getMonth()<=new Date().getMonth()&&
       new Date(date).getDate()<=new Date().getDate())

       const dateCon2 = (new Date(endDate).getFullYear()<=new Date().getFullYear()&&
       new Date(endDate).getMonth()<=new Date().getMonth()&&
       new Date(endDate).getDate()<new Date().getDate())

    console.log(dateCon2)

    if(val){

    }else if(dateCon2){
        return "Completed"
    } else if(dateCon){
        return "Start"
    }else if(!dateCon){
       return 'Upcoming...'   
    }
   }

  return (
    <CCard className="mb-3 border-success">
            <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                <CCardTitle>Event</CCardTitle>
            </CCardHeader>
            <CCardBody>
           <CRow> 

            { (<CCol className='text-end' lg={12} md={12} sx={12} sm={12}>
                            <CButton className="mt-2 float-end me-3" onClick={()=>{
                                setEventObj({...obj})
                                handleToggle1()
                                }} >{!liveClass ? 'Add Event' : 'Close'}</CButton>
                </CCol>)} 

            <CCol sx={12}>
            {liveClass && (                
                <form onSubmit={saveCallReport}>
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
                                                    label={`Event Banner uploaded ${imageProgress}% `}
                                                    placeholder="Enter Name"
                                                    onChange={handleChange}
                                                    accept="image/*"

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
                                                <CFormInput
                                                    className="mb-1"
                                                    aria-label="Select Service"
                                                    label="Topic"
                                                    value={eventObj.service}
                                                    onChange={(e)=>setEventObj((prev)=>({...prev,service:e.target.value}))}
                                                >
                                                
                                                </CFormInput>
                                            </CCol>

                                            <CCol xs={3}>
                                                <CFormInput
                                                    className="mb-1"
                                                    aria-label="Select Service"
                                                    label="Event Venue"                                        
                                                    value={eventObj.eventType}
                                                    onChange={(e)=>setEventObj((prev)=>({...prev,eventType:e.target.value}))}
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
                                                <CFormInput
                                                    className="mb-1"
                                                    type="date"
                                                    id="exampleFormControlInput1"
                                                    label="Event Start Date"
                                                    placeholder="Enter date"
                                                    value={eventObj.eventStartDate}
                                                    onChange={(e)=>setEventObj((prev)=>({...prev,eventStartDate:e.target.value}))}
                                                    required
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
                                                    required
                                                />
                                            </CCol>
                                          
                                            <CCol xs={3}>
                                                <CFormSelect
                                                    className="mb-1"
                                                    aria-label="Select Duration"
                                                    label="Duration"
                                                    options={[
                                                        "Select Duration",
                                                        { label: "30 min", value: "30 min" },
                                                        { label: "1 hr", value: "1 hr" },
                                                        { label: "1 hr:30 min", value: "1 hr : 30 min" },
                                                        { label: "2 hr", value: "2 hr" },
                                                        { label: "2 hr:30 min", value: "2 hr : 30 min" },
                                                        { label: "3 hr", value: "3 hr" },
                                                        { label: "3 hr:30 min", value: "3 hr : 30 min" },
                                                        { label: "4 hr", value: "4 hr" },
                                                        { label: "4 hr:30 min", value: "4 hr : 30 min" },
                                                        { label: "5 hr", value: "5 hr" },
                                                        { label: "5 hr:30 min", value: "5 hr : 30 min" },
                                                        { label: "6 hr", value: "6 hr" },
                                                        { label: "6 hr:30 min", value: "6 hr : 30 min" },
                                                        { label: "7 hr", value: "7 hr" },
                                                        { label: "7 hr:30 min", value: "7 hr : 30 min" },
                                                        { label: "8 hr", value: "8 hr" },
                                                        { label: "8 hr:30 min", value: "8 hr : 30 min" },                                                   
                                                    ]}
                                                    value={eventObj.duration}
                                                    onChange={(e)=>setEventObj((prev)=>({...prev,duration:e.target.value}))}
                                                />
                                            </CCol>
                                            <CCol xs={3}>
                                                <CFormInput
                                                    className="mb-1"
                                                    aria-label="Select Duration"
                                                    label="Client Limit"
                                                    type='number'                                                   
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
                                            
                                            <CCol className='mt-4'>
                                                <CButton className='float-end' type="submit">
                                                    {eventObj?._id?.trim()?"Update":"Save"}
                                                </CButton>
                                            </CCol>
                                        </CRow>
                                    </CCardBody>
                                </CCard>
                            
                           
                        </CCol>
                    </CRow>
                
                </form>)}
            </CCol>

        </CRow>   
        

        <CTable className='mt-3' align="middle" bordered  hover responsive scrollable>
                            <CTableHead  >
                                    <CTableHeaderCell className='p-2'>Sr.No</CTableHeaderCell>
                                    <CTableHeaderCell className='p-2'>Event Banner</CTableHeaderCell>
                                    <CTableHeaderCell className='p-2'>Event Name</CTableHeaderCell>
                                    <CTableHeaderCell className='p-2'>Host Name</CTableHeaderCell>
                                    <CTableHeaderCell className='p-2'>Topic</CTableHeaderCell>
                                    <CTableHeaderCell className='p-2'>Event venue</CTableHeaderCell>
                                    <CTableHeaderCell className='p-2'>Start Time</CTableHeaderCell>
                                    <CTableHeaderCell className='p-2'>Duration</CTableHeaderCell>
                                    <CTableHeaderCell className='p-2'>Event Start Date</CTableHeaderCell>
                                    <CTableHeaderCell className='p-2'>Event End Date</CTableHeaderCell>
                                    <CTableHeaderCell className='p-2' >Client Limit</CTableHeaderCell>
                                    <CTableHeaderCell className='p-2'>Fess</CTableHeaderCell>
                                    <CTableHeaderCell className='p-2'>Event Status</CTableHeaderCell>
                                    <CTableHeaderCell className='p-2'>Comment of cancel event</CTableHeaderCell>
                                    <CTableHeaderCell className='p-2'>Delete/Edit</CTableHeaderCell>
                            </CTableHead>
                            <CTableBody>
                                {eventMasterData.map((el,i)=>
                               <CTableRow>
                                  <CTableDataCell>{i+1}</CTableDataCell>
                                  <div 
                                className="border-gray rounded-circle"
                                style={{width:'100px'}}
                                >
                                  <img
                                  width='100%'
                                  src={el.eventBanner}
                                  />
                                </div>
                                  <CTableDataCell>{el.eventName}</CTableDataCell>
                                  <CTableDataCell>{el.hostName}</CTableDataCell>
                                  <CTableDataCell>{el.service}</CTableDataCell>
                                  <CTableDataCell>{el.eventType}</CTableDataCell>
                                  <CTableDataCell>{el.eventTime}</CTableDataCell>
                                  <CTableDataCell>{el.duration}</CTableDataCell>
                                  <CTableDataCell>{new Date(el.eventStartDate).toLocaleDateString()}</CTableDataCell>
                                  <CTableDataCell>{new Date(el.eventEndDate ).toLocaleDateString()}</CTableDataCell>
                                  <CTableDataCell>{el.clientLimit}</CTableDataCell>
                                  <CTableDataCell>{el.paid?el.fess:<CButton size='sm'>Free</CButton>}</CTableDataCell>
                                  <CTableDataCell>
                                  {el.eventActive==='cancel'&&<CButton color='danger' size='sm'  onClick={()=>StatusOpration('active',el._id,el)} >Cancel</CButton>  }
                                  {el.eventActive==='active'&& <CButton color='primary' size='sm' onClick={()=>StatusOpration('done',el._id,el)}>{compareFunction(el.eventStartDate,el.eventEndDate)}</CButton> }
                                  {el.eventActive==='done'&&<CButton color='success' size='sm' onClick={()=>{
                                    if(compareFunction(el.eventStartDate,el.eventEndDate)==='Completed'){
                                        return
                                    }
                                    StatusOpration('cancel',el._id,el)}
                                } >
                                    {compareFunction(el.eventStartDate,el.eventEndDate)==='Completed'?"Completed":"Done"}
                                    </CButton>  }          
                                  </CTableDataCell>
                                  <CTableDataCell>
                                  {el.comments }                                  
                                  </CTableDataCell>
                                  <CTableDataCell className='p-2'>
                                    <MdDelete  className='m-1 cursor-pointer' onClick={()=>deleteEventDetails(el._id)}/>
                                    <MdEdit  className='m-1 cursor-pointer' onClick={()=>{
                                        setEventObj(el)
                                        setImageUrl(el.eventBanner)
                                        handleToggle1(true)
                                        }}/>
                                  </CTableDataCell>

                                </CTableRow>
                                )}
                            </CTableBody>
                        </CTable>
            </CCardBody>
        </CCard>
  )
}

export default EventMaster
