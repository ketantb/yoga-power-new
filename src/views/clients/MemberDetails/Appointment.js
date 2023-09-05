import React, { useEffect, useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormInput,
    CFormSelect,
    CInputGroup,
    CInputGroupText,
    CPagination,
    CPaginationItem,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CCardTitle,
    CForm
} from '@coreui/react'
import axios from 'axios'
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import  {useAdminValidation,useUniqAdminObjeact} from '../../Custom-hook/adminValidation'
import CustomSelectInput from 'src/views/Fitness/CustomSelectInput/CustomSelectInput';
const optionAppointmentTyep = [
    "Diet",
    "Treatment",
    "Other",
]



const Appointment = ({ id }) => {
const url1 = useSelector((el) => el.domainOfApi)
const pathValMaster = useAdminValidation('Master')
const uniqObjVal  =useUniqAdminObjeact()

const [appointment, setAppointment] = useState(false)
const [Enquiry, setEnquiry] = useState([])
const [active, setActive] = useState(false)
const [active2, setActive2] = useState(false)


const [clientName, setClientName] = useState('')
const [mobileNo, setMobileno] = useState('')
const [appointmentType, setAppointmentType] = useState('')
const [staff, setStaff] = useState([])
const [appointmentData, setAppointmentData] = useState([])
const [appointmentWith, setAppointmentWith] = useState([])
const [bookingDate, setBookingDate] = useState('')
const [fess, setFees] = useState('')
const [memberId, setMemberId] = useState('')
const [staffValue, setStaffValue] = useState('')
const [appointmentTime, setAppointmentTime] = useState('')
const [Appontment_Date, setAppointmentDate] = useState('')
const [feesStatus, setFessStatus] = useState('')
const [pagination, setPagination] = useState(10)
const [clientReferance,setClientReferance] = useState('')



    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;
    const username = user.user.username;



const getAppointmentData = async () => {
        const response = await axios.get(`${ url1 }/appointment/${id}`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })       
        if(response.status===200){           
            setAppointmentData(response.data)
        }
    }

useEffect(() => {
        getAppointmentData()
        getStaff()
        getEnquiry()

}, [])
   
async function getEnquiry() {
    try{
        const  {data} = await axios.get(`${url1}/memberForm/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        setClientName(data.Fullname)
        setClientReferance(data.Fullname)
        setMobileno(data.ContactNumber)
        setEnquiry([data])
    }catch{

    }
}  
    

                   
   
function deleteAppointmentData(id) {
    fetch(`${ url1 }/appointment/delete/${ id }`, {
        method: 'DELETE',
    }).then((result) => {
        getAppointmentData()
    })
}


const updateAppointMent = (data,id)=>{
    fetch(`${ url1 }/appointment/update/${ id }`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ token }`
        },
        body: JSON.stringify(data)
    }).then((result) => {
        getAppointmentData()
        console.log(result)
    })
   }

    function updateAppointmentStatus(id, data, Status, Cancel1) {
        const Cancel = Cancel1 === 'Not' ? 'Not' : 'cancel'
        const data1 = { ...data, Status, Cancel }
        updateAppointMent(data1,id)
    }

    function updateAmountStatus(data,value,id){
        const data1 = { ...data, amountStatus:value}
        updateAppointMent(data1,id)
    }

function getStaff() {
    axios.get(`${ url1 }/employeeform/${pathValMaster}`, {
        headers: {
            'Authorization': `Bearer ${ token }`
        }
    })
        .then((res) => {
            setStaff(res.data)
        })
        .catch((error) => {
            console.error(error)
        })
}

const ActiveDropDownHandler = () => {
    setActive(true)
}
const ActiveDropDownHandler2 = () => {
    setActive2(true)
}

const selectedOption2 = (e) => {
    setAppointmentType(e.target.textContent)
    setActive2(false)
}


useEffect(() => {
    getAppointmentData()
    
}, [])

function clientObj(obj){
    setClientReferance(obj.Fullname)
    
 }


const AppointmentObj = {
    "Sr_No": id,
    "Booking_Date": bookingDate,
    "Client_Name": clientName,
    "Client_Number": mobileNo,
    "Appointment_Type": appointmentType,
    "Appointment_With": appointmentWith,
    "Appointment_Date": Appontment_Date,
    "Appointment_Time": appointmentTime,
    "Fees_Status": feesStatus,
    "Amount": fess,
    "Status": false,
    "Staff": staffValue,
    "Cancel":'Not',
    ...uniqObjVal
}

const sendAppointmentData = async (e) => {
    console.log(e)
    e.preventDefault()
    const data = AppointmentObj

    fetch(`${ url1 }/appointment/create`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }).then((result) => {
        if(result.status===200){
        alert('Successfully Save')
        getAppointmentData()
        setAppointmentType('')
        setAppointmentDate('')
        setAppointmentTime('')
        setBookingDate('')
        setAppointmentWith([])
        setFessStatus('')
        setFees('')
        setStaffValue('')
        }
    })

}


    return (
        <CRow>



            <CCol xs={12}>
                <div className='d-flex justify-content-between mb-2'>
                    <div className='mt-2 ms-2'>
                        <CCardTitle>Appointment   </CCardTitle>
                    </div>
                

                </div>
            </CCol>

               {appointment &&
                            <CCard className='mt-1 mb-2'>
                                <CCardBody>
                                    <form onSubmit={sendAppointmentData}>
                                        <CRow>
                                    <CCol xs={3}>
                                            <CFormInput
                                                type='date'
                                                label='Booking Date'
                                                value={bookingDate}
                                                onChange={(e) => setBookingDate(e.target.value)}
                                                required
                                            />


                                        </CCol>
                                        <CCol xs={3} style={{ position: 'relative' }}>
                                            <label className='mb-2'>Client Name</label>
                                        <CustomSelectInput 
                                        data={Enquiry} 
                                        title={clientReferance?.trim()?
                                        clientReferance:"Select client name"}
                                        getData={clientObj}
                                        
                                        />
                                        </CCol>
                                        <CCol xs={3}>
                                            <CFormInput
                                                className="mb-1"
                                                type="text"
                                                id="exampleFormControlInput1"
                                                label="Client Number"
                                                placeholder="Enter Number"
                                                value={mobileNo}
                                                onChange={(e) => setMobileno(e.target.value)}
                                                required
                                            />
                                        </CCol>
                                        <CCol xs={3} style={{ position: 'relative' }}>
                                            <CFormInput
                                                className="mb-1"
                                                aria-label="Select Service"
                                                label="Appointment Type"
                                                value={appointmentType}
                                                onChange={(e) => setAppointmentType(e.target.value)}
                                                onFocus={ActiveDropDownHandler2}
                                                required

                                            >


                                            </CFormInput>
                                            {active2 && [...optionAppointmentTyep.filter((el) => el.includes(appointmentType))][0] &&
                                                <CCard style={{
                                                    overflowY: 'scroll', maxHeight: '200px', height: 'auto', width: '95%',
                                                    position: 'absolute', minHeight: 'auto'
                                                }} >
                                                    {[...optionAppointmentTyep.filter((el) => el.includes(appointmentType)).map((el) => {
                                                        return <div className='p-2 text-center' style={{ borderBottom: '1px solid #c0c0c0' }}
                                                            onClick={selectedOption2}  >{el}</div >
                                                    })]}
                                                </CCard>}

                                        </CCol>
                                        <CCol xs={3}>
                                            <CFormInput
                                                className="mb-1"
                                                type="date"
                                                id="exampleFormControlInput1"
                                                label="Appointment Date"
                                                placeholder="Enter date"
                                                value={Appontment_Date}
                                                onChange={(e) => setAppointmentDate(e.target.value)}
                                                required
                                            />
                                        </CCol>
                                        <CCol xs={3}>
                                            <CFormInput
                                                type='time'
                                                label='Appointment Time'
                                                value={appointmentTime}
                                                onChange={(e) => setAppointmentTime(e.target.value)}
                                                required
                                            />


                                        </CCol>
                                       
                                        <CCol xs={3}>
                                            <CFormSelect
                                                className="mb-1"
                                                aria-label="Select Service"
                                                label="Appointment With"
                                                value={appointmentWith}
                                                onChange={(e) => setAppointmentWith(e.target.value)}
                                                required
                                            >
                                                <option value={''} >Select Appointment With</option>

                                                {staff.filter((list) =>  list.selected === 'Select').map((item, index) => (
                                                   (
                                                        <option key={index}>{item.FullName}</option>
                                                    )
                                                ))}

                                            </CFormSelect>
                                        </CCol>
                                       
                                        <CCol xs={3}>
                                            <CFormSelect
                                                className="mb-1"
                                                aria-label="Select Service"
                                                label="Staff"
                                                value={staffValue}
                                                onChange={(e) => setStaffValue(e.target.value)}
                                                required
                                            >
                                                <option value={''} >Select Staff</option>

                                                {staff.filter((list) =>  list.selected === 'Select').map((item, index) => (
                                                     (
                                                        <option key={index}>{item.FullName}</option>
                                                    )
                                                ))}
                                            </CFormSelect>
                                        </CCol>
                                       
                                        <CCol xs={3}>
                                            <CFormSelect
                                                label='Select Fees Status'
                                                value={feesStatus}
                                                onChange={(e) => setFessStatus(e.target.value)}
                                                required
                                            >
                                                <option value={''}>Select Fees Status</option>
                                                <option>Free</option>
                                                <option>Paid</option>
                                                <option>Package</option>

                                            </CFormSelect>

                                        </CCol>

                                        <CCol xs={3}>
                                            <CFormInput
                                                className="mb-1"
                                                type="number"
                                                id="exampleFormControlInput1"
                                                label="Fees"
                                                placeholder="Enter Fees"
                                                value={fess}
                                                onChange={(e) => setFees(e.target.value)}
                                                required
                                            />
                                        </CCol>


                                        <CCol className='mb-2 mt-4 float-end'>
                                            <CButton className=' ms-2 float-end' onClick={() => setAppointment(!appointment)}>Cancel</CButton>
                                            <CButton className=' float-end' type='submit'>Book</CButton>
                                        </CCol>
                                        </CRow>
                                    </form>
                                </CCardBody>
                            </CCard>
                        }
            <CForm className="mb-2">
                <div className="d-flex justify-content-between">
                    <div></div>
                    <div>
                        <CRow>
                            <CCol>
                                {appointment||<CButton className="ms-1 my-4" onClick={() =>{setAppointment(true)}}>Book Appointment</CButton>}
                            </CCol>
                        </CRow>
                    </div>
                </div>
               
            </CForm>
            <div style={{ overflowY: 'scroll' }}>
                            
                            <CTable bordered style={{ borderColor: "#0B5345", width: '150%' }} responsive>
                                <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }}>
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">Sr No</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Booking Date</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Client Name</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Client Number</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Appointment Type</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Appointment With</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Appointment Date</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Appointment Time</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Fees Status</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Amount Status</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Staff</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Delete</CTableHeaderCell>

                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {appointmentData.filter((el, i) => {
                                        if (pagination - 10 < i + 1 && pagination >= i + 1) {
                                            return el
                                        }
                                        return false
                                    }).map((el, i) =>{
                                         
                                       
                                    const hours =    el.Appointment_Time.split(":")[0]
                                    const minute =   el.Appointment_Time.split(":")[1] 

                                   const Time =    +hours<12?(+hours||12)+":"+minute+"AM":   ((+hours-12 || 12) +":" +minute+"PM")

                                        return <CTableRow>
                                            <CTableDataCell>{i + 1 + pagination - 10}</CTableDataCell>
                                            <CTableDataCell>{el.Booking_Date}</CTableDataCell>
                                            <CTableDataCell>{el.Client_Name}</CTableDataCell>
                                            <CTableDataCell>{el.Client_Number}</CTableDataCell>
                                            <CTableDataCell>{el.Appointment_Type}</CTableDataCell>
                                            <CTableDataCell>{el.Appointment_With}</CTableDataCell>
                                            <CTableDataCell>{el.Appointment_Date}</CTableDataCell>
                                            <CTableDataCell>{Time}</CTableDataCell>
                                            <CTableDataCell>{el.Fees_Status}</CTableDataCell>
                                            <CTableDataCell>{el.Amount}</CTableDataCell>
                                            <CTableDataCell className='text-center'>
                                            {el.amountStatus?<CButton className='m-1' color='success'  onClick={()=>updateAmountStatus(el,!el.amountStatus,el._id)} size='sm' >Done</CButton>:
                                            <CButton className='m-1' size='sm'  color='warning'  
                                            onClick={()=>updateAmountStatus(el,!el.amountStatus,el._id)}>Pending...</CButton>}</CTableDataCell>
                                            <CTableDataCell>
                                                { (el.Status ||el.Cancel==="cancel")  || <CButton onClick={() =>  updateAppointmentStatus(el._id, el, true ,'cancel')} color='warning' size='sm' className='m-1'>Pending...</CButton>}
                                                {(el.Status &&el.Cancel!=="cancel") && <CButton onClick={() =>updateAppointmentStatus(el._id, el,false,'Not')} color='success' size='sm' className='m-1'>Done</CButton>}
                                                {el.Cancel==="cancel" && <CButton onClick={() =>  updateAppointmentStatus(el._id, el,true,'Not')} color='danger' size='sm' className='m-1'>Cancel</CButton>}

                                            </CTableDataCell>
                                            <CTableDataCell>{el.Staff}</CTableDataCell>
                                            <CTableDataCell><MdDelete style={{ cursor: 'pointer', markerStart: '10px' }} onClick={() =>
                                                deleteAppointmentData(el._id)} size='20px' /></CTableDataCell>



                                        </CTableRow>
})}
                                </CTableBody>
                            </CTable>
                        </div>
            <div className='d-flex justify-content-center mt-3' >
                        <CPagination aria-label="Page navigation example" style={{cursor:'pointer'}}>
                            <CPaginationItem aria-label="Previous" onClick={() => setPagination((val) => val > 10 ? val - 10 : 10)}>
                                <span aria-hidden="true" >&laquo;</span>
                            </CPaginationItem>
                            <CPaginationItem active >{pagination / 10}</CPaginationItem>
                            {appointmentData.length > pagination / 10 * 10 && <CPaginationItem onClick={() => setPagination((val) => val < appointmentData.length ? val + 10 : val)}>{pagination / 10 + 1}</CPaginationItem>}
                            {appointmentData.length > pagination / 10 * 20 && <CPaginationItem onClick={() => setPagination((val) => val < appointmentData.length ? val + 10 : val)}>{pagination / 10 + 2}</CPaginationItem>}
                            <CPaginationItem aria-label="Next" onClick={() => setPagination((val) => val < appointmentData.length ? val + 10 : val)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                        </CPagination>
                </div>
        </CRow>
    );
};

export default Appointment;