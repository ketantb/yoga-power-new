import React, { useEffect, useState } from 'react'
import {
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardHeader,
    CCardTitle,
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
import CIcon from '@coreui/icons-react'
import { cilArrowCircleBottom, cilArrowCircleTop } from '@coreui/icons'
import axios from 'axios'
import { MdCall, MdDelete, MdEdit, MdMail } from 'react-icons/md'
import { BsPlusCircle, BsWhatsapp } from 'react-icons/bs'
import moment from 'moment/moment'
import AdmissionForm1 from 'src/components/AdmissionForm1'
import { useSelector } from 'react-redux'
import { useAdminValidation,useUniqAdminObjeact } from '../Custom-hook/adminValidation'
import { leadsSuperRight } from '../hr/Rights/rightsValue/crmRightsValue'
import useExportHook from './leaadCutomHook/useExportHook'
import EnquiryForm from '../forms/EnquiryForm'



const TrialEnquires = () => {
    const url1 = useSelector((el) => el.domainOfApi)
    const url = url1
    const url2 = url1

    var currentdate = new Date();
    var day = currentdate.getDate() + '-' + (currentdate.getMonth() + 1) + '-' + currentdate.getFullYear();
    var month = currentdate.getMonth() + '-' + currentdate.getFullYear();
    var year = currentdate.getFullYear();

    const pathRoute = useAdminValidation()
    const pathRouteMaster = useAdminValidation('Master')
    const exportTrailFun = useExportHook('YogPowerTrailEnquires.xlsx')
    const uniqObjeact = useUniqAdminObjeact()


    const rightsData = useSelector((el) => el.empLoyeeRights?.crmRights
        ?.crmLeads?.items?.superRight)



    const isAdmin = useSelector((el) => el.isAdmin)
    const trailAdd = rightsData?.addOn?.includes(leadsSuperRight.trailUpdate)
    const trailDelete = rightsData?.delete?.includes(leadsSuperRight.trailUpdate)
    const trailEdit = rightsData?.edit?.includes(leadsSuperRight.trailUpdate)


    const [select, setSelect] = useState('')
    const [followForm, setFollowForm] = useState()
    const [admissionForm, setAdmissionForm] = useState(false)
    const [addmissionData,setAdmissionData] = useState({})

    const [edit, setEdit] = useState()
    const [toEdit, setToEdit] = useState()
    const [callReport, setCallReport] = useState(false)
    const [visible, setVisible] = useState(false)
    const [visible1, setVisible1] = useState(false)
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


    const [Name, setName] = useState("");
    const [Contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [ServiceName1, setServiceName1] = useState("");
    const [CallStatus1, setCallStatus1] = useState("");
    const [enquiryStage, setEnquiryStage] = useState('');
    const [FollowupDate, setFollowupDate] = useState("");
    const [TimeFollowp, setTimeFollowp] = useState("");
    const [Discussion, setDiscussion] = useState("");
    const [Counseller, setCounseller] = useState("");

    const [appointmentDate, setappointmentDate] = useState("");
    const [appointmentTime, setappointmentTime] = useState("");
    const [followUpData,setFollowUPdata] = useState({})




    let user = JSON.parse(localStorage.getItem('user-info'))
    console.log(user);
    const token = user.token;
    const username = user.user.username;
    const centerCode = user.user.centerCode;
    const [result1, setResult1] = useState([]);
    console.log(token);
    const [result, setResult] = useState([]);
    const [updateItem, setUpdateItem] = useState([]);
    const [paging, setPaging] = useState(0);

    useEffect(() => {
        getEnquiry()
        getStaff()

        axios.get(`${ url }/subservice/${ pathRouteMaster }`, {
            headers: {
                'Authorization': `Bearer ${ token }`
            }
        })
            .then((res) => {
                console.log(res.data)
                setResult(res.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, []);
    const [staff, setStaff] = useState([])


    const selctedCounseller = staff.find((el)=>el._id===Counseller)
    const enquiryId = (result1.find((el)=>el._id===followForm)?.EnquiryId||'')

   useEffect(()=>{
    setCounseller(uniqObjeact.employeeMongoId)  
   },[uniqObjeact.employeeMongoId])

   const unikqValidateObj = {
       ...uniqObjeact,
       employeeMongoId:(selctedCounseller?._id||uniqObjeact.employeeMongoId),
       empNameC:(selctedCounseller?.FullName||uniqObjeact.empNameC)
   }


    function getStaff() {
        axios.get(`${ url2 }/employeeForm/${ pathRouteMaster }`, {
            headers: {
                'Authorization': `Bearer ${ token }`
            }
        })
            .then((res) => {
                setStaff(res.data)

                console.log(res.data);
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
            const data1 = { appointmentDate, appointmentTime, appointmentfor: 'Appointment',
             Counseller: (selctedCounseller?.FullName||''), CallStatus: CallStatus1,...unikqValidateObj }
            let data2 = {
                username: username,
                EnquiryID:  enquiryId, CallDate: date, Time: time,
                Name: Name, Contact: Contact, Email: email, ServiceName: ServiceName1, AppointmentDate: appointmentDate, AppointmentTime: appointmentTime, enquiryStage: enquiryStage, CallStatus: CallStatus1, FollowupDate: FollowupDate, TimeFollowp: TimeFollowp, Counseller: (selctedCounseller?.FullName||''), Discussion: Discussion,
                status: 'CallReport',...unikqValidateObj
            }

            fetch(`${ url1 }/enquiryForm/update/${ followForm }`, {
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


            fetch(`${ url }/prospect/create`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${ token }`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...unikqValidateObj, ...data2 })
            }).then((resp) => {
                resp.json().then(() => {
                    setCallReport(false)
                })
            })

        } else if (enquiryStage === 'Trial Session') {

            const data1 = {
                appointmentDate, appointmentTime, appointmentfor: 'Trial Session',
                Counseller: (selctedCounseller?.FullName||''), identifyStage: 'Trial Session', CallStatus: CallStatus1,
                ...unikqValidateObj
            }

            let data2 = {
                username: username,
                EnquiryID:  enquiryId, CallDate: date, Time: time,
                Name: Name, Contact: Contact, Email: email, ServiceName: ServiceName1,
                AppointmentDate: appointmentDate, AppointmentTime: appointmentTime, enquiryStage: enquiryStage, CallStatus: CallStatus1, FollowupDate: FollowupDate, TimeFollowp: TimeFollowp, Counseller: (selctedCounseller?.FullName||''), Discussion: Discussion,
                status: 'CallReport',...unikqValidateObj
            }

            fetch(`${ url1 }/enquiryForm/update/${ followForm }`, {
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

            fetch(`${ url }/prospect/create`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${ token }`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...data2})
            }).then((resp) => {
                resp.json().then(() => {
                    setCallReport(false)
                })
            })
        } else if (enquiryStage === 'Join') {
            handleAdmission({...followUpData,type:'top'})
            setVisible(false)
        } else if (enquiryStage === 'Prospect') {
            let data = {
                username: username,
                EnquiryID:  enquiryId, CallDate: date, Time: time,
                Name: Name, Contact: Contact, Email: email, ServiceName: ServiceName1,
                AppointmentDate: appointmentDate, AppointmentTime: appointmentTime, enquiryStage: enquiryStage, 
                CallStatus: CallStatus1, FollowupDate: FollowupDate, TimeFollowp: TimeFollowp, Counseller: (selctedCounseller?.FullName||''), 
                Discussion: Discussion,...unikqValidateObj,
                status: 'prospect'
            }

            fetch(`${ url }/prospect/create`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${ token }`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }).then((resp) => {
                resp.json().then(() => {
                    setVisible(false)
                })
            })


            const data1 = { 
                Counseller:(selctedCounseller?.FullName||''), CallStatus:CallStatus1,
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

            fetch(`${ url1 }/enquiryForm/update/${ followForm }`, {
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
            EnquiryID:  enquiryId, CallDate: date, Time: time,
            Name: Name, Contact: Contact, Email: email, ServiceName: ServiceName1, CallStatus: CallStatus1, FollowupDate: FollowupDate,
            TimeFollowp: TimeFollowp, Counseller: Counseller, Discussion: Discussion,...unikqValidateObj,
            status: 'CallReport'
        }

        fetch(`${ url }/prospect/create`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${ token }`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...unikqValidateObj, ...data })
        }).then((resp) => {
            resp.json().then(() => {
                setVisible(false)
            })
        })
        const data1 = { Counseller:(selctedCounseller?.FullName||''),...unikqValidateObj }

        fetch(`${ url1 }/enquiryForm/update/${ followForm }`, {
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
            })
        })
    }
    const [ogList, setOgList] = useState([])
    function getEnquiry() {
        axios.get(`${ url1 }/enquiryForm/${ pathRoute }`, {
            headers: {
                'Authorization': `Bearer ${ token }`
            }
        })
            .then((res) => {

                const data = res.data.filter((list) =>
                    list.appointmentfor === 'Trial Session' &&
                    list.enquirestatus !== 'notshow' &&
                    list.CallStatus !== 'Cold'
                ).reverse()
                setResult1(data)
                setOgList(data)
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
        axios.get(`${ url1 }/enquiryForm/${ id }`, {
            headers: {
                'Authorization': `Bearer ${ token }`
            }
        })
            .then((res) => {
                setUpdateItem(res.data)
                setName(res.data.Fullname)
                setContact(res.data.ContactNumber)
                setServiceName1(res.data.ServiceName)
                setCallStatus1(res.data.CallStatus)
                setEmail(res.data.Emailaddress)
                setVisible(true)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    function getCallReport(id) {
        axios.get(`${ url1 }/enquiryForm/${ id }`, {
            headers: {
                'Authorization': `Bearer ${ token }`
            }
        })
            .then((res) => {
                setUpdateItem(res.data)
                setName(res.data.Fullname)
                setContact(res.data.ContactNumber)
                setServiceName1(res.data.ServiceName)
                setCallStatus1(res.data.CallStatus)
                setEmail(res.data.Emailaddress)
                setCallReport(true)
            })
            .catch((error) => {
                console.error(error)
            })
    }


    function deleteEnquiry(id) {

        if (confirm('Do you want to delete this')) {
            fetch(`${ url1 }/enquiryForm/delete/${ id }`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${ token }`,
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

    const handleFollowup = (id,item) => {
        setFollowForm(id)
        getProspect(id)
        setFollowUPdata(item)
    }

    const handleCallReport = (id) => {
        setFollowForm(id)
        getCallReport(id)
    }

    function handleEnquiry(item) {
        setToEdit(item)

        setEdit(item._id)
        setVisible1(true)
    }


    function handleAdmission(data) {
        setAdmissionData(data)
    }

    function conFirmTrailStatus(id) {
        axios.post(`${ url1 }/enquiryForm/update/${ id }`, { trailStatus: true,...unikqValidateObj }, {
            headers: {
                "Authorization": `Bearer ${ token }`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                getEnquiry()
            })
            .catch((error) => {
                console.error(error)
            })
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
             {(admissionForm&& !visible1) && <AdmissionForm1 add={admissionForm}  setAdmissionForm={closeAddmisionForm} ids={addmissionData} />}

            <CCol lg={12} sm={12}>
                <CCard className='mb-3 border-top-success border-top-3'>
                    <CCardHeader>
                        <strong className="mt-2">Enquire Trial <span className='float-end'>Total Trial : {result1.filter((list) =>list.appointmentfor.includes('Trial Session')).length}</span></strong>
                    </CCardHeader>
                    <CCardBody>
                        <CRow className='d-flex justify-content-between'>
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
                                    {select === 'Custom Date' && (
                                        <CInputGroup className='mt-2 mb-2' >

                                            <CInputGroupText
                                                component="label"
                                                htmlFor="inputGroupSelect01"
                                            >
                                                Form
                                            </CInputGroupText>
                                            <CFormInput
                                                type="date"
                                                required
                                            /><CInputGroupText
                                                component="label"
                                                htmlFor="inputGroupSelect01"
                                            >
                                                To
                                            </CInputGroupText>
                                            <CFormInput
                                                type="date"
                                                required
                                            />
                                            <CButton type="button" color="primary">
                                                Go
                                            </CButton>
                                        </CInputGroup>

                                    )}

                                </CInputGroup>
                            </CCol>
                            <CCol lg={6} sm={6} md={6}>
                                <CButtonGroup className=' mb-2 float-end'>
                                    <CButton color="primary" onClick={() => exportTrailFun(result1)}>
                                        <CIcon icon={cilArrowCircleTop} />
                                        {' '}Export
                                    </CButton>
                                </CButtonGroup>
                            </CCol>
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
                            <CCol></CCol>
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
                                                {result.map((el)=>el.selected_service.toLowerCase().trim())
                                                .filter((el,i,arr)=>{return arr.indexOf(el)===i})
                                     .map((el,i)=><option key={i}>{el}</option>)}
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
                                                {result.map((el)=>el.selected_service.toLowerCase().trim())
                                                .filter((el,i,arr)=>{return arr.indexOf(el)===i})
                                     .map((el,i)=><option key={i}>{el}</option>)}
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
                                                {staff.filter((list) => list.selected === 'Select').map((item, index) => (
                                                    (
                                                        <option key={index} value={item._id}>{[item.FullName,item.EmployeeID].join('\n')}</option>
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

                        <CModal size="xl" scrollable alignment="center" visible={visible1} onClose={() => setVisible1(false)}>
                            <CModalHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                                <CModalTitle>Edit Form</CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                                {visible1 && <EnquiryForm
                                    edit={visible1}
                                    editData={toEdit}
                                    getEnquiry={() => getEnquiry()}
                                    setVisible={setVisible1}
                                />}

                                <div className='text-end'>
                                    <CButton color="secondary" onClick={() => setVisible1(false)}>
                                        Close
                                    </CButton>
                                </div>
                            </CModalBody>
                        </CModal>
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
                                {result1.slice(paging * 10, paging * 10 + 10).filter((list) =>
                                    moment(list.createdAt).format("MM-DD-YYYY").includes(select) &&
                                    list.EnquiryId?.toLowerCase().includes(Search1?.toLowerCase()) &&
                                    moment(list.createdAt)?.format("DD-MM-YYYY")?.includes(Search2) &&
                                    (list.ContactNumber+"").includes(Search4) &&
                                    list.Counseller?.includes(Search10.toLowerCase()) &&
                                    list.Fullname?.toLowerCase()?.includes(Search3?.toLowerCase()) &&
                                    list.StaffName?.toLowerCase()?.includes(Search9?.toLowerCase()) &&
                                    list.ServiceName?.toLowerCase()?.includes(Search5?.toLowerCase()) &&
                                    list.enquirytype?.toLowerCase()?.includes(Search6?.toLowerCase()) &&
                                    list.CallStatus?.toLowerCase()?.includes(Search8?.toLowerCase())
                                ).map((item, index) => (
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
                    <CPagination aria-label="Page navigation example" align="center" className='mt-2'>
                        <CPaginationItem aria-label="Previous" disabled={paging != 0 ? false : true} onClick={() => paging > 0 && setPaging(paging - 1)}>
                            <span aria-hidden="true">&laquo;</span>
                        </CPaginationItem>
                        <CPaginationItem active onClick={() => setPaging(0)}>{paging + 1}</CPaginationItem>
                        {result1.filter((list) => 
                            list.EnquiryId?.toLowerCase().includes(Search1.toLowerCase()) &&list.createdAt?.toLowerCase().includes(Search2.toLowerCase()) &&(list.ContactNumber + "").includes(Search4) &&
                            list.Counseller.includes(Search10.toLowerCase()) &&list && moment(list.createdAt).format("MM-DD-YYYY").includes(select) && list.appointmentfor === 'Trial Session' && list.Fullname.toLowerCase().includes(Search3.toLowerCase()) && list.StaffName.toLowerCase().includes(Search9.toLowerCase()) &&
                            list.ServiceName.toLowerCase().includes(Search5.toLowerCase()) && list.enquirytype.toLowerCase().includes(Search6.toLowerCase()) && list.CallStatus.toLowerCase().includes(Search8.toLowerCase())
                        ).length > (paging + 1) * 10 && <CPaginationItem onClick={() => setPaging(paging + 1)} >{paging + 2}</CPaginationItem>}

                        {result1.filter((list) => 
                            list.EnquiryId?.toLowerCase().includes(Search1.toLowerCase()) &&list.createdAt?.toLowerCase().includes(Search2.toLowerCase()) &&(list.ContactNumber + "").includes(Search4) &&
                            list.Counseller.includes(Search10.toLowerCase()) &&list && moment(list.createdAt).format("MM-DD-YYYY").includes(select) && list.appointmentfor === 'Trial Session' && list.Fullname.toLowerCase().includes(Search3.toLowerCase()) && list.StaffName.toLowerCase().includes(Search9.toLowerCase()) &&
                            list.ServiceName.toLowerCase().includes(Search5.toLowerCase()) && list.enquirytype.toLowerCase().includes(Search6.toLowerCase()) && list.CallStatus.toLowerCase().includes(Search8.toLowerCase())
                        ).length > (paging + 2) * 10 && <CPaginationItem onClick={() => setPaging(paging + 2)}>{paging + 3}</CPaginationItem>}
                        {result1.filter((list) => 
                            list.EnquiryId?.toLowerCase().includes(Search1.toLowerCase()) &&list.createdAt?.toLowerCase().includes(Search2.toLowerCase()) &&
                            (list.ContactNumber + "").includes(Search4) &&list.Counseller.includes(Search10.toLowerCase()) &&
                            list && moment(list.createdAt).format("MM-DD-YYYY").includes(select) && list.appointmentfor === 'Trial Session' && list.Fullname.toLowerCase().includes(Search3.toLowerCase()) && list.StaffName.toLowerCase().includes(Search9.toLowerCase()) &&
                            list.ServiceName.toLowerCase().includes(Search5.toLowerCase()) && list.enquirytype.toLowerCase().includes(Search6.toLowerCase()) && list.CallStatus.toLowerCase().includes(Search8.toLowerCase())
                        ).length > (paging + 1) * 10 ?
                            <CPaginationItem aria-label="Next" onClick={() => setPaging(paging + 1)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                            : <CPaginationItem disabled aria-label="Next" onClick={() => setPaging(paging + 1)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                        }
                    </CPagination>
                </CCard>
            </CCol >
        </CRow >
    )
}

export default TrialEnquires