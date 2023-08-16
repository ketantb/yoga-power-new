import React, { useEffect, useState } from 'react'
import {
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormInput,
    CFormSelect,
    CFormTextarea,
    CInputGroup,
    CInputGroupText,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CPagination,
    CPaginationItem,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react'
import axios from 'axios';
import { MdCall, MdDelete, MdEdit, MdMail } from 'react-icons/md';
import { BsPlusCircle, BsWhatsapp } from 'react-icons/bs';
import moment from 'moment';
import CIcon from '@coreui/icons-react'
import { cilArrowCircleBottom, cilArrowCircleTop } from '@coreui/icons'


import { useSelector } from 'react-redux'
import AdmissionForm1 from 'src/components/AdmissionForm1';
import { useAdminValidation,useUniqAdminObjeact } from '../Custom-hook/adminValidation';
import { leadsSuperRight } from '../hr/Rights/rightsValue/crmRightsValue';
import useExportHook from './leaadCutomHook/useExportHook';

const FollowupScheduling = () => {

     let num =0 

    const pathRoute = useAdminValidation()
    const pathValMaster = useAdminValidation('Master')
    const uniqObjeact = useUniqAdminObjeact()
    const exportFolloupSchedulind =  useExportHook("YogPowerProspect.xlsx")
    

    var currentdate = new Date();
    var day = currentdate.getDate() + '-' + (currentdate.getMonth() + 1) + '-' + currentdate.getFullYear();
    var month = currentdate.getMonth() + '-' + currentdate.getFullYear();
    var year = currentdate.getFullYear();
    

    const [select, setSelect] = useState('') 
    const [visible, setVisible] = useState(false)
    const [edit, setEdit] = useState()
    const [visible1, setVisible1] = useState(false)
    const [callReport, setCallReport] = useState(false)
    const [Search1, setSearch1] = useState('')
    const [Search2, setSearch2] = useState('')
    const [Search3, setSearch3] = useState('')
    const [Search4, setSearch4] = useState('')
    const [Search5, setSearch5] = useState('')
    const [Search6, setSearch6] = useState('')
    const [Search7, setSearch7] = useState('')
    const [Search8, setSearch8] = useState('')
    const [Search9, setSearch9] = useState('')
    const [Search10, setSearch10] = useState('')
    const [followForm, setFollowForm] = useState()
    const [error, setError] = useState('')
    const [dateFilter, setDateFilter] = useState({
        startDate: null,
        endDate: null
    })
    const [Name, setName] = useState("");
    const [Contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [ServiceName1, setServiceName1] = useState("");
    const [CallStatus1, setCallStatus1] = useState("");
    const [enquiryStage, setEnquiryStage] = useState('')
    const [FollowupDate, setFollowupDate] = useState("");
    const [appointmentDate, setappointmentDate] = useState("");
    const [appointmentTime, setappointmentTime] = useState("");
    const [TimeFollowp, setTimeFollowp] = useState("");
    const [Discussion, setDiscussion] = useState("");
    const [Counseller, setCounseller] = useState("");
    const [updateItem, setUpdateItem] = useState();
    const [admissionForm, setAdmissionForm] = useState(false)
    const [admissionFormData,setAdmissionFormData] = useState('')
    const [ogList, setOgList] = useState([])
    const [addmissionData,setAdmissionData] = useState({})
    const [followUpData,setFollowUPdata] = useState({})




    const rightsData = useSelector((el)=>el.empLoyeeRights?.crmRights
    ?.crmLeads?.items?.superRight) 

    const isAdmin = useSelector((el)=>el.isAdmin) 
    const prospectAdd =  (rightsData?.addOn?.includes(leadsSuperRight.prospect)||isAdmin)
    const prospectDelete =  (rightsData?.delete?.includes(leadsSuperRight.prospect)||isAdmin)
    const prospectEdit  =  (rightsData?.edit?.includes(leadsSuperRight.prospect)||isAdmin)


    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;
    const username = user.user.username;
    const [result, setResult] = useState([]);
    const [result1, setResult1] = useState([]);
    const [paging, setPaging] = useState(0);
    const url1 = useSelector((el) => el.domainOfApi)
    const url = url1


    useEffect(() => {
        getEnquiry()
        getStaff()
     
        axios.get(`${url}/subservice/${pathValMaster}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                setResult(res.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, []);

    
    function handleAdmission(data) {
       setAdmissionData(data)
    }


    const [staff, setStaff] = useState([])

    const unikqValidateObj = {
        ...uniqObjeact,
        employeeMongoId:Counseller,
        empNameC:staff.find((el)=>el._id===Counseller)?.FullName
    }

    function getStaff() { 
        axios.get(`${url1}/employeeForm/${pathValMaster}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                setStaff(res.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const saveProspect = () => {
        var currentdate = new Date();
        var date = currentdate.getDay() + "-" + currentdate.getMonth()
            + "-" + currentdate.getFullYear();
        var time =
            + currentdate.getHours() + ":"
            + currentdate.getMinutes();

        if (enquiryStage === 'Appointment') {
            const data1 = { appointmentDate, appointmentTime, appointmentfor: 'Appointment',CallStatus: CallStatus1,
             Counseller: Counseller,...unikqValidateObj }
            let data2 = {
                username: username,
                EnquiryID: followForm, CallDate: date, Time: time,
                Name: Name, Contact: Contact, Email: email, ServiceName: ServiceName1, AppointmentDate: appointmentDate, AppointmentTime: appointmentTime, enquiryStage: enquiryStage, CallStatus: CallStatus1, FollowupDate: FollowupDate, TimeFollowp: TimeFollowp, Counseller: Counseller, Discussion: Discussion,
                status: 'CallReport',...unikqValidateObj
            }

            fetch(`${url}/enquiryForm/update/${followForm}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data1)
            }).then((resp) => {
                resp.json().then(() => {
                    alert("successfully submitted")
                    setVisible(false)
                    
                })
            })


            fetch(`${url}/prospect/create`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...data2,...unikqValidateObj})
            }).then((resp) => {
                resp.json().then(() => {
                    setCallReport(false)
                })
            })

        } else if (enquiryStage === 'Trial Session') {
            const data1 = { appointmentDate, appointmentTime, appointmentfor: 'Trial Session', 
            Counseller: Counseller,CallStatus: CallStatus1,...unikqValidateObj
         }
            let data2 = {
                username: username,
                EnquiryID: followForm, CallDate: date, Time: time,
                Name: Name, Contact: Contact, Email: email, ServiceName: ServiceName1, AppointmentDate: appointmentDate,
                 AppointmentTime: appointmentTime, enquiryStage: enquiryStage, CallStatus: CallStatus1,
                  FollowupDate: FollowupDate, TimeFollowp: TimeFollowp, Counseller: Counseller, Discussion: Discussion,
                status: 'CallReport',...unikqValidateObj
            }

            fetch(`${url}/enquiryForm/update/${followForm}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data1)
            }).then((resp) => {
                resp.json().then(() => {
                    alert("successfully submitted")
                    setVisible(false)
                })
            })

            fetch(`${url}/prospect/create`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...data2,...unikqValidateObj})
            }).then((resp) => {
                resp.json().then(() => {
                    setCallReport(false)
                })
            })
        } else if (enquiryStage === 'Join') {
            handleAdmission({...followUpData,type:'top'})
            setVisible(false)
        } else if (enquiryStage === 'Prospect') {
           
            const data1 = { 
                Counseller:staff.find((el)=>el._id===Counseller)?.FullName, CallStatus:CallStatus1,
                appointmentfor:enquiryStage,
                identifyStage:enquiryStage,
                PFollowupDate:FollowupDate,
                PDiscussion: Discussion,
                PTimeFollowp:TimeFollowp,       
                PAppointmentTime: TimeFollowp,
                PAppointmentDate: FollowupDate,
                
                PServiceName: ServiceName1, 
                PCallDate: date, 
                PTime: time,
                PName: Name, 
                PContact: Contact,
                PEmail: email,
                Fullname:Name,
                appointmentTime:TimeFollowp,
                appointmentDate:FollowupDate,
                ServiceName:ServiceName1,
                Emailaddress:email,
                ContactNumber:Contact,
                ...unikqValidateObj
            }



                fetch(`${ url }/enquiryForm/update/${ followForm }`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${ token }`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data1)
                }).then((resp) => {
                    resp.json().then(() => {
                        alert("successfully submitted")
                        setVisible(false)
                        getEnquiry()
                    })
                })

                let data2 = {
                    username: username,
                    EnquiryID: followForm, CallDate: date, Time: time,
                    Name: Name, Contact: Contact, Email: email, ServiceName: ServiceName1, AppointmentDate: appointmentDate, 
                    AppointmentTime: appointmentTime, enquiryStage: enquiryStage, CallStatus: CallStatus1,
                     FollowupDate: FollowupDate, TimeFollowp: TimeFollowp, Counseller: Counseller, Discussion: Discussion,
                    status: 'CallReport'
                }
                fetch(`${url}/prospect/create`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({...data2,...unikqValidateObj})
                }).then((resp) => {
                    resp.json().then(() => {
                        setCallReport(false)
                    })
                })
            

        }

    }

    const updateProspect = () => {


        var currentdate = new Date();
            var date = currentdate.getDay() + "-" + currentdate.getMonth()
                + "-" + currentdate.getFullYear();
            var time =
                + currentdate.getHours() + ":"
                + currentdate.getMinutes();
        
            const data1 = { 
                Counseller:staff.find((el)=>el._id===Counseller)?.FullName, CallStatus:CallStatus1,
                appointmentfor:enquiryStage,
                identifyStage:enquiryStage,

                PFollowupDate:FollowupDate,
                PDiscussion: Discussion,
                PTimeFollowp:TimeFollowp,       
                PAppointmentTime: appointmentTime,
                PAppointmentDate: appointmentDate,
                PServiceName: ServiceName1, 
                PCallDate: date, 
                PTime: time,
                PName: Name, 
                PContact: Contact,
                PEmail: email,

                Fullname:Name,
                appointmentTime,
                appointmentDate,
                ServiceName:ServiceName1,
                Emailaddress:email,
                ContactNumber:Contact,
                ...unikqValidateObj
            }


            fetch(`${url}/enquiryForm/update/${edit}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data1)
            }).then((resp) => {
                resp.json().then(() => {
                    alert("successfully submitted")
                    getEnquiry()
                    setVisible(false)
                })
            })

            let data = {
                username: username,
                EnquiryID: followForm, CallDate: date, Time: time,
                Name: Name, Contact: Contact, Email: email, ServiceName: ServiceName1, AppointmentDate: appointmentDate, 
                AppointmentTime: appointmentTime, enquiryStage: enquiryStage, CallStatus: CallStatus1, FollowupDate: FollowupDate,
                TimeFollowp: TimeFollowp, Counseller: Counseller, Discussion: Discussion,...unikqValidateObj,
                status: 'prospect'
            }

            fetch(`${url}/prospect/create`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }).then((resp) => {
                resp.json().then(() => {
                    setVisible(false)
                })
            })

    }


    function getEnquiry() {
        axios.get(`${url}/enquiryForm/${pathRoute}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                setResult1(res.data.filter((list)=>list.CallStatus !== 'Cold' &&list.enquirestatus!=='notshow'&&list.appointmentfor === 'Prospect').reverse())
                setOgList(res.data.filter((list) => list.CallStatus !== 'Cold' &&list.enquirestatus!=='notshow'&&list.appointmentfor === 'Prospect').reverse())
            })
            .catch((error) => {
                console.error(error)
            })
    }
 
    const [filterBy, setFilterBy] = useState('')
    const [subFilter, setSubFilter] = useState('')
    const [arr, setArr] = useState([])

    function getUnique(arr, index) {
        const unique = arr
            .map(e => e[index])
            // store the keys of the unique objects
            .map((e, i, final) => final.indexOf(e) === i && i)
            // eliminate the dead keys & store unique objects
            .filter(e => arr[e]).map(e => arr[e]);
        return unique;
    }
    function filterArr(og, v) {
        if (v === '')
            setResult1(og)
        else
            setResult1(og.filter((list) => list[filterBy] === v))
    }


    function getProspect(id) {
        axios.get(`${url1}/enquiryForm/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                setUpdateItem(res.data)
                setName(res.data.Fullname)
                setContact(res.data.ContactNumber)
                setServiceName1(res.data.ServiceName)
                setCallStatus1(res.data.CallStatus)
                setEmail(res.data.Emailaddress)
                setEnquiryStage(res.data.appointmentfor)
                setVisible(true)
            })
            .catch((error) => {
                console.error(error)
            })
    }
    function getUpdate(id) {
        axios.get(`${url}/enquiryForm/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                setUpdateItem(res.data)
                setName(res.data.PName)
                setContact(res.data.PContact)
                setServiceName1(res.data.PServiceName)
                setCallStatus1(res.data.CallStatus)
                setEmail(res.data.PEmail)
                setFollowupDate(moment(res.data.PFollowupDate).utc().format('YYYY-MM-DD'))
                setCounseller(res.data.Counseller)
                setDiscussion(res.data.PDiscussion)
                setEnquiryStage(res.data.appointmentfor)
                setVisible1(true)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    function deleteProspect(id) {

        if (confirm('Do you want to delete this')) {
            fetch(`${url}/enquiryForm/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then((result) => {
                result.json().then((resp) => {
                    console.warn(resp)
                    getEnquiry()
                })
            })
        }
    }

    const saveCallReport = () => {
        var currentdate = new Date();
        var date = currentdate.getDay() + "-" + currentdate.getMonth()
            + "-" + currentdate.getFullYear();
        var time =
            + currentdate.getHours() + ":"
            + currentdate.getMinutes();
        let data = {
            username: username,
            EnquiryID: followForm, CallDate: date, Time: time,
            Name: Name, Contact: Contact, Email: email, ServiceName: ServiceName1, 
            CallStatus: CallStatus1, FollowupDate: FollowupDate, TimeFollowp: TimeFollowp, 
            Counseller: Counseller, Discussion: Discussion,
            status: 'CallReport'
        }

        fetch(`${url}/prospect/create`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...data,...unikqValidateObj})
        }).then((resp) => {
            resp.json().then(() => {
                setVisible(false)
            })
        })
        const data1 = { Counseller,...unikqValidateObj}

        fetch(`${url}/enquiryForm/update/${followForm}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data1)
        }).then((resp) => {
            resp.json().then(() => {
                alert("successfully submitted")
                setVisible(false)
            })
        })
    }

    function getCallReport(id) {
        axios.get(`${url}/enquiryForm/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                setUpdateItem(res.data)
                setName(res.data.Fullname)
                setContact(res.data.ContactNumber)
                setServiceName1(res.data.ServiceName)
                setCallStatus1(res.data.CallStatus)
                setEmail(res.data.Emailaddress)
                setEnquiryStage(res.data.appointmentfor)
                setCallReport(true)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const handleCallReport = (id) => {
        setFollowForm(id)
        getCallReport(id)
    }

    const handleFollowup = (id,item) => {
        setFollowForm(id)
        getProspect(id)
        setFollowUPdata(item)

    }


    function handleEnquiry(id) {
        setEdit(id)
        getUpdate(id)
    }

    useEffect(()=>{
        if(addmissionData?._id ){
            setAdmissionForm(true)           
        }
    },[addmissionData?._id,addmissionData?.type])

    function closeAddmisionForm (valBol) {
        setAdmissionForm(valBol)
        setAdmissionData({})
    }


    return (
        <CRow>
              {(admissionForm&& !visible1) && <AdmissionForm1 getEnquiry={getEnquiry} add={admissionForm}  setAdmissionForm={closeAddmisionForm} ids={addmissionData} />}
            <CCol lg={12} sm={12}>
                <CCard className='mb-3 border-top-success border-top-3'>
                    <CCardHeader>
                        <strong className="mt-2">Prospects <span className='float-end'>Total Prospects 
                        :{result1.length}</span></strong>
                    </CCardHeader>
                    <CCardBody>
                      <CRow>
                         <CCol lg={4} sm={6} md={6}>
                                <CInputGroup className='mb-2'>
                                    <CFormSelect
                                        id="inputGroupSelect04"
                                        aria-label="Example select with button addon"
                                        value={select}
                                        onChange={(e) => setSelect(e.target.value)}
                                    >
                                        <option value={day}>Today</option>
                                        <option value={month}>Last Month</option>
                                        <option value={year}>This Year</option>
                                       
                                    </CFormSelect>
                                </CInputGroup>
                            </CCol>

                            <CCol lg={6} sm={6} md={6}>
                                <CButtonGroup className=' mb-2 float-end'>
                                    <CButton color="primary" onClick={()=>exportFolloupSchedulind(result1) }>
                                        <CIcon icon={cilArrowCircleTop} />
                                        {' '}Export
                                    </CButton>
                                </CButtonGroup>
                            </CCol>
                       </CRow>  

                      <CRow>

                            <CCol xs={3}>
                                <CFormSelect
                                    className="mb-1"
                                    aria-label="Select Service Name"
                                    value={filterBy}
                                    onChange={(e) => { setFilterBy(e.target.value); setArr(getUnique(ogList, e.target.value)) }}
                                    label="Filter By"

                                >
                                    <option value=''>Select</option>
                                    <option value='Counseller'>Counseller </option>
                                    <option value='enquirytype'>Lead Sources </option>
                                    <option value='appointmentfor'>Enquiry Stage </option>
                                    <option value='Message'>Last Call Status </option>
                                    <option value='ServiceName'>Services Name </option>
                                    <option value='Customertype'>Customer Type </option>
                                    <option value='Enquiry type'>Enquiry type </option>
                                    <option value='CallStatus'>Call Tag </option>
                                    <option value='Gander'>Gender</option>
                                </CFormSelect>
                            </CCol>
                            <CCol xs={3}>
                                <CFormSelect
                                    className="mb-1"
                                    aria-label="Select Service Name"
                                    value={subFilter}
                                    onChange={(e) => { setSubFilter(e.target.value); filterArr(ogList, e.target.value) }}
                                    label="Sub-filter"
                                >
                                    <option value=''>Select</option>
                                    {arr.filter((list) => list[filterBy] != '').map((item, index) => (
                                        (
                                            <option key={index} value={item.id}>{item[filterBy]}</option>
                                        )
                                    ))}
                                </CFormSelect>
                            </CCol>
                            <CCol xs={6}>

                            </CCol>
                     </CRow>  

                        <CModal size='lg' style={{ border: '2px solid #0B5345' }} visible={callReport} color='' onClose={() => setCallReport(false)} >
                            <CModalHeader  >
                                <CModalTitle>Call Report</CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                                <CForm >
                                    <CRow>
                                        <CCol lg={4} md={6} sm={12}>
                                            <CFormInput
                                                className="mb-1"
                                                type="text"
                                                id="exampleFormControlInput1"
                                                label="Name"
                                                value={Name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Enter Name"
                                            />
                                        </CCol>
                                        <CCol lg={4} md={6} sm={12}>
                                            <CFormInput
                                                className="mb-1"
                                                type="email"
                                                id="exampleFormControlInput1"
                                                label="Email Address"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="name@example.com"
                                                aria-describedby="exampleFormControlInputHelpInline"
                                            />
                                        </CCol>

                                        <CCol lg={4} md={6} sm={12}>
                                            <CFormInput
                                                className="mb-1"
                                                type="number"
                                                value={Contact}
                                                onChange={(e) => setContact(e.target.value)}
                                                id="exampleFormControlInput1"
                                                label="Contact No"
                                                placeholder="Enter Number"
                                            />
                                        </CCol>
                                        <CCol lg={6} md={6} sm={12}>
                                            <CFormSelect
                                                className="mb-1"
                                                aria-label="Select Service Name"
                                                value={ServiceName1}
                                                onChange={(e) => setServiceName1(e.target.value)}
                                                label="Service Name"

                                            >
                                                <option>Select Service</option>
                                                {result.map((item, index) => (
                                                     (
                                                        item.status === true && (
                                                            <option key={index} value={item.id}>{item.selected_service}</option>
                                                        )
                                                    )
                                                ))}
                                            </CFormSelect>
                                        </CCol>
                                        <CCol lg={6} md={6} sm={12}>
                                            <CFormInput
                                                className="mb-1"
                                                type="text"
                                                value={Counseller}
                                                onChange={(e) => setCounseller(e.target.value)}
                                                id="exampleFormControlInput1"
                                                label="Counseller"
                                                placeholder="Enter Counseller Name"
                                            />
                                        </CCol>

                                        <CCol lg={4} md={6} sm={12}>
                                            <CFormSelect
                                                className="mb-1"
                                                aria-label="Select Call Status"
                                                value={CallStatus1}
                                                onChange={(e) => setCallStatus1(e.target.value)}
                                                label="Call Status"
                                                options={[
                                                    "Select",
                                                    { label: "Cold", value: "Cold" },
                                                    { label: "Warm", value: "Warm" },
                                                    { label: "Hot", value: "Hot" },
                                                ]}
                                            />
                                        </CCol>
                                        <CCol lg={4} md={6} sm={12}>
                                            <CFormInput
                                                className="mb-1"
                                                label="FollowUp Date"
                                                type="date"
                                                value={FollowupDate}
                                                onChange={(e) => setFollowupDate(e.target.value)}
                                                id="exampleFormControlInput1"
                                            />
                                        </CCol>
                                        <CCol lg={4} md={6} sm={12}>
                                            <CFormInput
                                                className="mb-1"
                                                label="FollowUp Time"
                                                type="time"
                                                id="exampleFormControlInput1"
                                                value={TimeFollowp}
                                                onChange={(e) => setTimeFollowp(e.target.value)}

                                            />
                                        </CCol>
                                        <CCol>
                                            <CFormTextarea
                                                id="exampleFormControlTextarea1"
                                                label="Discussion"
                                                value={Discussion}
                                                onChange={(e) => setDiscussion(e.target.value)}
                                                rows="2"
                                                text="Must be 8-20 words long."
                                            ></CFormTextarea>
                                        </CCol>
                                    </CRow>
                                </CForm>
                            </CModalBody>
                            <CModalFooter>
                                <CButton color="secondary" onClick={() => setCallReport(false)}>
                                    Close
                                </CButton>
                                <CButton type='submit' color="primary" onClick={() => saveCallReport()}>Save Call Report</CButton>
                            </CModalFooter>
                        </CModal>

                        <CModal size='lg' style={{ border: '2px solid #0B5345' }} visible={visible} color='' onClose={() => setVisible(false)} >
                            <CModalHeader  >
                                <CModalTitle>Prospect Form</CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                                <CForm >
                                    <CRow>
                                        <CCol lg={4} md={6} sm={12}>
                                            <CFormInput
                                                className="mb-1"
                                                type="text"
                                                id="exampleFormControlInput1"
                                                label="Name"
                                                value={Name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Enter Name"
                                            />
                                        </CCol>
                                        <CCol lg={4} md={6} sm={12}>
                                            <CFormInput
                                                className="mb-1"
                                                type="email"
                                                id="exampleFormControlInput1"
                                                label="Email Address"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="name@example.com"
                                                aria-describedby="exampleFormControlInputHelpInline"
                                            />
                                        </CCol>

                                        <CCol lg={4} md={6} sm={12}>
                                            <CFormInput
                                                className="mb-1"
                                                type="number"
                                                value={Contact}
                                                onChange={(e) => setContact(e.target.value)}
                                                id="exampleFormControlInput1"
                                                label="Contact No"
                                                placeholder="Enter Number"
                                            />
                                        </CCol>
                                        <CCol lg={4} md={6} sm={12}>
                                            <CFormSelect
                                                className="mb-1"
                                                aria-label="Select Service Name"
                                                value={ServiceName1}
                                                onChange={(e) => setServiceName1(e.target.value)}
                                                label="Service Name"

                                            >
                                                <option>Select Service</option>
                                                {result.map((item, index) => (
                                                     (
                                                        item.status === true && (
                                                            <option key={index} value={item.id}>{item.selected_service}</option>
                                                        )
                                                    )
                                                ))}
                                            </CFormSelect>
                                        </CCol>
                                        <CCol lg={4} md={6} sm={12}>

                                            <CFormSelect
                                                className="mb-1"
                                                aria-label="Select Assign Staff"
                                                value={Counseller}
                                                onChange={(e) => setCounseller(e.target.value)}
                                                label='Counseller'
                                            >
                                                <option>Select Counseller</option>
                                                {staff.filter((list) =>  list.selected === 'Select').map((item, index) => (
                                                     (
                                                        <option key={index}>{[item.FullName,item.EmployeeID].join('\n')}</option>
                                                    )
                                                ))}</CFormSelect>
                                        </CCol>
                                        <CCol lg={4} md={6} sm={12}>
                                            <CFormSelect
                                                className="mb-1"
                                                aria-label="Select Call Status"
                                                value={enquiryStage}
                                                onChange={(e) => setEnquiryStage(e.target.value)}
                                                label="Prospect Stage"
                                                options={[
                                                    "Select",
                                                    { label: "Appointment", value: "Appointment" },
                                                    { label: "Trial Session", value: "Trial Session" },
                                                    { label: "Join", value: "Join" },
                                                    { label: 'Prospect', value: 'Prospect' }
                                                ]}
                                            />
                                        </CCol>

                                        {(enquiryStage === 'Appointment') &&
                                            <>
                                                <CCol lg={4} md={6} sm={12}>
                                                    <CFormInput
                                                        className="mb-1"
                                                        label="Appointment Date"
                                                        type="date"
                                                        value={appointmentDate}
                                                        onChange={(e) => setappointmentDate(e.target.value)}
                                                        id="exampleFormControlInput1"
                                                    />
                                                </CCol>
                                                <CCol lg={4} md={6} sm={12}>
                                                    <CFormInput
                                                        className="mb-1"
                                                        label="Appointment Time"
                                                        type="time"
                                                        id="exampleFormControlInput1"
                                                        value={appointmentTime}
                                                        onChange={(e) => setappointmentTime(e.target.value)}

                                                    />
                                                </CCol>
                                            </>
                                        }
                                        {(enquiryStage === 'Trial Session') &&
                                            <>
                                                <CCol lg={4} md={6} sm={12}>
                                                    <CFormInput
                                                        className="mb-1"
                                                        label="Trial Date"
                                                        type="date"
                                                        value={appointmentDate}
                                                        onChange={(e) => setappointmentDate(e.target.value)}
                                                        id="exampleFormControlInput1"
                                                    />
                                                </CCol>
                                                <CCol lg={4} md={6} sm={12}>
                                                    <CFormInput
                                                        className="mb-1"
                                                        label="Trial Time"
                                                        type="time"
                                                        id="exampleFormControlInput1"
                                                        value={appointmentTime}
                                                        onChange={(e) => setappointmentTime(e.target.value)}

                                                    />
                                                </CCol>
                                            </>
                                        }
                                        {enquiryStage != 'Join' &&

                                            <CCol lg={4} md={6} sm={12}>
                                                <CFormSelect
                                                    className="mb-1"
                                                    aria-label="Select Call Status"
                                                    value={CallStatus1}
                                                    onChange={(e) => setCallStatus1(e.target.value)}
                                                    label="Call Status"
                                                    options={[
                                                        "Select",
                                                        { label: "Cold", value: "Cold" },
                                                        { label: "Warm", value: "Warm" },
                                                        { label: "Hot", value: "Hot" },
                                                    ]}
                                                />
                                            </CCol>
                                        }
                                        {(enquiryStage === 'Prospect') &&
                                            <>

                                                <CCol lg={4} md={6} sm={12}>
                                                    <CFormInput
                                                        className="mb-1"
                                                        label="FollowUp Date"
                                                        type="date"
                                                        value={FollowupDate}
                                                        onChange={(e) => setFollowupDate(e.target.value)}
                                                        id="exampleFormControlInput1"
                                                    />
                                                </CCol>
                                                <CCol lg={4} md={6} sm={12}>
                                                    <CFormInput
                                                        className="mb-1"
                                                        label="FollowUp Time"
                                                        type="time"
                                                        id="exampleFormControlInput1"
                                                        value={TimeFollowp}
                                                        onChange={(e) => setTimeFollowp(e.target.value)}

                                                    />
                                                </CCol>
                                            </>
                                        }
                                        {enquiryStage === 'Prospect' &&
                                            <CCol lg={12} md={12} sm={12}>
                                                <CFormTextarea
                                                    id="exampleFormControlTextarea1"
                                                    label="Discussion"
                                                    value={Discussion}
                                                    onChange={(e) => setDiscussion(e.target.value)}
                                                    rows="2"
                                                    text="Must be 8-20 words long."
                                                ></CFormTextarea>
                                            </CCol>
                                        }
                                    </CRow>
                                </CForm>
                            </CModalBody>
                            <CModalFooter>
                                <CButton color="secondary" onClick={() => setVisible(false)}>
                                    Close
                                </CButton>
                                <CButton type='submit' color="primary" onClick={() => saveProspect()}>{enquiryStage === 'Join' ? 'Open Admission Form' : 'Save Prospect'}</CButton>
                            </CModalFooter>
                        </CModal>

                        <CModal size='lg' style={{ border: '2px solid #0B5345' }} visible={visible1} color='' onClose={() => setVisible1(false)} >
                            <CModalHeader  >
                                <CModalTitle>Prospect Form</CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                                <CForm >
                                    <label style={{ color: 'red' }}>{error}</label>
                                    <CRow>
                                        <CCol lg={4} md={6} sm={12}>
                                            <CFormInput
                                                className="mb-1"
                                                type="text"
                                                id="exampleFormControlInput1"
                                                label="Name"
                                                value={Name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Enter Name"
                                            />
                                        </CCol>
                                        <CCol lg={4} md={6} sm={12}>
                                            <CFormInput
                                                className="mb-1"
                                                type="email"
                                                id="exampleFormControlInput1"
                                                label="Email Address"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="name@example.com"
                                                aria-describedby="exampleFormControlInputHelpInline"
                                            />
                                        </CCol>

                                        <CCol lg={4} md={6} sm={12}>
                                            <CFormInput
                                                className="mb-1"
                                                type="number"
                                                value={Contact}
                                                onChange={(e) => setContact(e.target.value)}
                                                id="exampleFormControlInput1"
                                                label="Contact No"
                                                placeholder="Enter Number"
                                            />
                                        </CCol>
                                        <CCol lg={6} md={6} sm={12}>
                                            <CFormSelect
                                                className="mb-1"
                                                aria-label="Select Service Name"
                                                value={ServiceName1}
                                                onChange={(e) => setServiceName1(e.target.value)}
                                                label="Service Name"

                                            >
                                                <option>Select Service</option>
                                                {result.map((item, index) => (
                                                     (
                                                        item.status === true && (
                                                            <option key={index} value={item.id}>{item.selected_service}</option>
                                                        )
                                                    )
                                                ))}
                                            </CFormSelect>
                                        </CCol>
                                        <CCol lg={4} md={6} sm={12}>

                                            <CFormSelect
                                                className="mb-1"
                                                aria-label="Select Assign Staff"
                                                value={Counseller}
                                                onChange={(e) => setCounseller(e.target.value)}
                                                label='Counseller'
                                            >
                                                <option>Select Counseller</option>
                                                {staff.filter((list) =>  list.selected === 'Select')
                                                .map((item, index) => (
                                                     (
                                                        <option key={index}>{[item.FullName,item.EmployeeID].join('\n')}</option>
                                                    )
                                                ))}</CFormSelect>
                                        </CCol>
                                        <CCol lg={4} md={6} sm={12}>
                                            <CFormSelect
                                                className="mb-1"
                                                aria-label="Select Call Status"
                                                value={enquiryStage}
                                                onChange={(e) => setEnquiryStage(e.target.value)}
                                                label="Prospect Stage"
                                                options={[
                                                    "Select",
                                                    { label: "Appointment", value: "Appointment" },
                                                    { label: "Trial Session", value: "Trial Session" },
                                                    { label: "Join", value: "Join" },
                                                    { label: 'Prospect', value: 'Prospect' }
                                                ]}
                                            />
                                        </CCol>

                                        {(enquiryStage === 'Appointment' || enquiryStage === 'Trial Session') &&
                                            <>
                                                <CCol lg={4} md={6} sm={12}>
                                                    <CFormInput
                                                        className="mb-1"
                                                        label="Appointment Date"
                                                        type="date"
                                                        value={appointmentDate}
                                                        onChange={(e) => setappointmentDate(e.target.value)}
                                                        id="exampleFormControlInput1"
                                                    />
                                                </CCol>
                                                <CCol lg={4} md={6} sm={12}>
                                                    <CFormInput
                                                        className="mb-1"
                                                        label="Appointment Time"
                                                        type="time"
                                                        id="exampleFormControlInput1"
                                                        value={appointmentTime}
                                                        onChange={(e) => setappointmentTime(e.target.value)}

                                                    />
                                                </CCol>
                                            </>
                                        }
                                        <CCol lg={4} md={6} sm={12}>
                                            <CFormSelect
                                                className="mb-1"
                                                aria-label="Select Call Status"
                                                value={CallStatus1}
                                                onChange={(e) => setCallStatus1(e.target.value)}
                                                label="Call Status"
                                                options={[
                                                    "Select",
                                                    { label: "Cold", value: "Cold" },
                                                    { label: "Warm", value: "Warm" },
                                                    { label: "Hot", value: "Hot" },
                                                ]}
                                            />
                                        </CCol>
                                        {(enquiryStage === 'Join' || enquiryStage === 'Enquiry') &&
                                            <>

                                                <CCol lg={4} md={6} sm={12}>
                                                    <CFormInput
                                                        className="mb-1"
                                                        label="FollowUp Date"
                                                        type="date"
                                                        value={FollowupDate}
                                                        onChange={(e) => setFollowupDate(e.target.value)}
                                                        id="exampleFormControlInput1"
                                                    />
                                                </CCol>
                                                <CCol lg={4} md={6} sm={12}>
                                                    <CFormInput
                                                        className="mb-1"
                                                        label="FollowUp Time"
                                                        type="time"
                                                        id="exampleFormControlInput1"
                                                        value={TimeFollowp}
                                                        onChange={(e) => setTimeFollowp(e.target.value)}

                                                    />
                                                </CCol>
                                            </>
                                        }
                                        <CCol>
                                            <CFormTextarea
                                                id="exampleFormControlTextarea1"
                                                label="Discussion"
                                                value={Discussion}
                                                onChange={(e) => setDiscussion(e.target.value)}
                                                rows="2"
                                                text="Must be 8-20 words long."
                                            ></CFormTextarea>
                                        </CCol>
                                    </CRow>
                                </CForm>
                            </CModalBody>
                            <CModalFooter>
                                <CButton color="secondary" onClick={() => setVisible1(false)}>
                                    Close
                                </CButton>
                                <CButton type='submit' color="primary" onClick={() => updateProspect()}>Update Prospect</CButton>
                            </CModalFooter>
                        </CModal>
                        <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                                <CTableRow >
                                    <CTableHeaderCell>Sr.No</CTableHeaderCell>
                                    <CTableHeaderCell>Enquiry ID</CTableHeaderCell>
                                    <CTableHeaderCell>Date</CTableHeaderCell>
                                    <CTableHeaderCell>Time</CTableHeaderCell>
                                    <CTableHeaderCell>Name</CTableHeaderCell>
                                    <CTableHeaderCell>Email</CTableHeaderCell>
                                    <CTableHeaderCell>Mobile</CTableHeaderCell>
                                    {(isAdmin|| prospectAdd)&&<CTableHeaderCell>Add</CTableHeaderCell>}
                                    <CTableHeaderCell>Service</CTableHeaderCell>
                                    <CTableHeaderCell>Call Status</CTableHeaderCell>
                                    <CTableHeaderCell>Enquiry Stage</CTableHeaderCell>
                                    <CTableHeaderCell>Discussion</CTableHeaderCell>
                                    <CTableHeaderCell>Counseller</CTableHeaderCell>
                                    {(isAdmin|| prospectAdd)&&<CTableHeaderCell>Action</CTableHeaderCell>}
                                    {(isAdmin|| prospectEdit||prospectDelete)&&<CTableHeaderCell>Edit</CTableHeaderCell>}
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                <CTableRow>
                                   
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "120px" }}
                                            type="text"
                                            disabled
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "120px" }}
                                            value={Search1}
                                            onChange={(e) => setSearch1(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "90px" }}
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
                                            style={{ minWidth: "120px" }}
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
                                            style={{ minWidth: "100px" }}
                                            onChange={(e) => setSearch5(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="number"
                                            style={{ minWidth: "100px" }}
                                            value={Search6}
                                            onChange={(e) => setSearch6(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="number"
                                            style={{ minWidth: "100px" }}
                                            disabled
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
                                    <CTableDataCell style={{display:(isAdmin|| (prospectAdd))?'':'none'}} >
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            value={Search10}
                                            style={{ minWidth: "100px" }}
                                            disabled
                                            onChange={(e) => setSearch10(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell style={{display:(isAdmin|| (prospectEdit || prospectDelete))?'':'none'}} >
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "100px" }}
                                            type="text"
                                            disabled
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                </CTableRow>
                                {result1.filter((list)=>
                                moment(list.createdAt).format("MM-DD-YYYY").includes(select)  &&              
                                list.EnquiryId.toLocaleLowerCase().includes(Search1.toLocaleLowerCase()) &&
                                moment(list.PCallDate).format("DD-MM-YYYY").includes(Search2)&&
                                list.PName.toLocaleLowerCase().includes(Search4.toLocaleLowerCase())&&list.PEmail.includes(Search5) &&
                                (list.PContact+"").includes(Search6)
                                &&list.PServiceName.toLocaleLowerCase()+"".toLocaleLowerCase().includes(Search7.toLocaleLowerCase())&&
                                list.CallStatus.includes(Search8)&&list.Counseller.toLocaleLowerCase().includes(Search9.toLocaleLowerCase())
                                ). 
                                slice(paging * 10, paging * 10 + 10).map((item, index) =>{  
                                    num++                             
                                  return <CTableRow key={index}>
                                        <CTableDataCell>{index + 1 + (paging * 10)}</CTableDataCell>
                                        <CTableDataCell>{item.EnquiryId}</CTableDataCell>
                                        <CTableDataCell className='text-center'>{moment(item.PCallDate).format("DD-MM-YYYY")}</CTableDataCell>
                                        <CTableDataCell>{moment(item.PTime, "HH:mm").format("hh:mm A")}</CTableDataCell>
                                        <CTableDataCell>{item.PName}</CTableDataCell>
                                        <CTableDataCell>{item.PEmail}</CTableDataCell>
                                        <CTableDataCell>{item.PContact}</CTableDataCell>
                                        <CTableDataCell style={{display:(isAdmin|| prospectAdd)?'':'none'}} ><BsPlusCircle id={item._id} style={{ cursor: 'pointer', markerStart: '10px', marginLeft: "4px" }}  
                                        onClick={() => { setEdit(item._id), handleAdmission({...item,type:'bottom'}) }} /></CTableDataCell>
                                        <CTableDataCell>{item.PServiceName}</CTableDataCell>
                                        <CTableDataCell>{item.CallStatus}</CTableDataCell>                                        
                                        <CTableDataCell>{item.appointmentfor}</CTableDataCell>
                                        <CTableDataCell>{item.PDiscussion}</CTableDataCell>
                                        <CTableDataCell>{item.Counseller}</CTableDataCell>
                                        <CTableDataCell  style={{display:(isAdmin|| (prospectAdd))?'':'none'}} className='text-center'><a href={`tel:+91${item.Contact}`} target="_black"><MdCall style={{ cursor: 'pointer', markerStart: '10px' }} onClick={() => { setCallReport(true), handleCallReport(item.EnquiryID) }} size='20px' /></a><a href={`https://wa.me/${item.Contact}`} target="_black"><BsWhatsapp style={{ marginLeft: "4px", cursor: 'pointer', markerStart: '10px' }} onClick={() => { setCallReport(true), handleCallReport(item.EnquiryID) }} size='20px' /></a><a href={`mailto: ${item.Email}`} target="_black"> <MdMail style={{ cursor: 'pointer', markerStart: '10px', marginLeft: "4px" }} onClick={() => { setCallReport(true), handleCallReport(item._id) }} size='20px' /></a> <BsPlusCircle id={item._id} style={{ cursor: 'pointer', markerStart: '10px', marginLeft: "4px" }} onClick={() => handleFollowup(item._id,item)} /></CTableDataCell>
                                        
                                        <CTableDataCell  style={{display:(isAdmin|| (prospectEdit||prospectDelete))?'':'none'}} className='text-center'>
                                           
                                            {prospectEdit&&
                                                <MdEdit id={item._id} style={{ fontSize: '35px', cursor: 'pointer', markerStart: '10px' }}
                                             onClick={() => handleEnquiry(item._id)} size='20px' />
                                             }

                                            {prospectDelete&&<MdDelete style={{ cursor: 'pointer', markerStart: '10px', marginLeft: "5px" }} 
                                             onClick={() => deleteProspect(item._id)} size='20px' />}

                                        </CTableDataCell>

                                    </CTableRow>
                                })}
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                    
                    <CPagination aria-label="Page navigation example" align="center" className='mt-2'>
                        <CPaginationItem aria-label="Previous" disabled={paging != 0 ? false : true} onClick={() => paging > 0 && setPaging(paging - 1)}>
                            <span aria-hidden="true">&laquo;</span>
                        </CPaginationItem>
                        <CPaginationItem active onClick={() => setPaging(0)}>{paging + 1}</CPaginationItem>
                        {num> (paging + 1) * 10 && <CPaginationItem onClick={() => setPaging(paging + 1)} >{paging + 2}</CPaginationItem>}

                        {num> (paging + 2) * 10 && <CPaginationItem onClick={() => setPaging(paging + 2)}>{paging + 3}</CPaginationItem>}
                        {num> (paging + 1) * 10 ?
                            <CPaginationItem aria-label="Next" onClick={() => setPaging(paging + 1)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                            : <CPaginationItem disabled aria-label="Next" onClick={() => setPaging(paging + 1)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                        }
                    </CPagination>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default FollowupScheduling
