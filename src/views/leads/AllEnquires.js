import React, { useEffect, useState, useRef } from 'react'
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
import { CountryList } from "src/components/CountryList";

import moment from 'moment/moment'
import { useSelector } from 'react-redux'
import AdmissionForm1 from 'src/components/AdmissionForm1'
import { leadsSuperRight } from '../hr/Rights/rightsValue/crmRightsValue'
import { useAdminValidation,useUniqAdminObjeact } from '../Custom-hook/adminValidation'
import * as XLSX from 'xlsx';
import useExportHook from './leaadCutomHook/useExportHook'
import useImportHook from './leaadCutomHook/useImportHook'
import EnquiryForm from '../forms/EnquiryForm'

const AllEnquires = () => {
    const rightsData = useSelector((el)=>el.empLoyeeRights?.crmRights
    ?.crmLeads?.items?.superRight) 

    const exportDataFun = useExportHook("YogPowerAllEnquires.xlsx")
    const importDataFun = useImportHook('enquiryForm/xlsx/add')
 

    const [dateFilterObj,setDteFilterObj] = useState({
        startDate:moment(new Date(new Date().getFullYear(),0,1)).format('YYYY-MM-DD'),
        endDate:moment(new Date()).format('YYYY-MM-DD')
      })
    

    const isAdmin = useSelector((el)=>el.isAdmin) 
    const enquiryAdd =  (rightsData?.addOn?.includes(leadsSuperRight.allEnquires)||isAdmin)
    const enquiryExport =  (rightsData?.addOn?.includes(leadsSuperRight.allEnquiresExportImp)||isAdmin)
    const enquiryImport =  (rightsData?.edit?.includes(leadsSuperRight.allEnquiresExportImp)||isAdmin)
    const enquiryDelete =  (rightsData?.delete?.includes(leadsSuperRight.allEnquires)||isAdmin)
    const enquiryEdit  =  (rightsData?.edit?.includes(leadsSuperRight.allEnquires)||isAdmin)
    var currentdate = new Date();
   

    const url = useSelector((el) => el.domainOfApi)
    const pathRoute = useAdminValidation()
    const pathRouteMasterVal = useAdminValidation('Master')
    const unikqObj = useUniqAdminObjeact()
    const [importStaffId,setImportStaffId] = useState('')
    const [errorMessage,setErrorMessage] = useState(false)


    const [select, setSelect] = useState('')
    const [followForm, setFollowForm] = useState('')
    const [followUpData,setFollowUPdata] = useState({})
    const [edit, setEdit] = useState({})
    const [visible1, setVisible1] = useState(false)
    const [admissionForm, setAdmissionForm] = useState(false)
    const [callReport, setCallReport] = useState(false)
    const [visible, setVisible] = useState(false)
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
    const [FollowupDate, setFollowupDate] = useState("");
    const [enquiryStage, setEnquiryStage] = useState('')
    const [TimeFollowp, setTimeFollowp] = useState("");
    const [Discussion, setDiscussion] = useState("");
    const [Counseller, setCounseller] = useState("");

    const [appointmentDate, setappointmentDate] = useState("");
    const [appointmentTime, setappointmentTime] = useState("");
    const [appointmentfor, setappointmentfor] = useState("");

    const [ServiceVariation, setServiceVariation] = useState("");
    const [totalEnquire,setTotalEnquire] = useState(0)
    const [yaerArr,setYearArr] = useState([])

    
    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;
    const username = user.user.username;
    const [result1, setResult1] = useState([]);
    const [result, setResult] = useState([]);
    const [paging, setPaging] = useState(0);
    const [subservice, setSubservice] = useState([]);
    const [toEdit,setToEdit] = useState(false)


    const hiddenXLimportFileInput = useRef('')


    useEffect(() => {
        axios.get(`${url}/subservice/${pathRouteMasterVal}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
                setSubservice(res.data)
        }).catch((error) => {
                console.error(error)
        })
    }, []);

    const [staff, setStaff] = useState([])

    
    const unikqValidateObj = {
        ...unikqObj,
        employeeMongoId:(Counseller||unikqObj.employeeMongoId),
        empNameC:(staff.find((el)=>el._id===Counseller)?.FullName||unikqObj.empNameC)
    }

    // Import 
    const HandaleImportClick = () => {
        if(!Counseller?.trim()){
            setErrorMessage(true)
             return
        } 
        hiddenXLimportFileInput.current.click()
    }


    const HandaleImportChange = (event,totalEnquire) => {
        const importXlFile = event.target.files[0];

        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(worksheet);
            importDataFun(json,getEnquiry,totalEnquire,Counseller)
        };
        reader.readAsArrayBuffer(importXlFile);
    }
 
    useEffect(() => {
        getEnquiry()
        getStaff()
    
        axios.get(`${ url }/subservice/${pathRouteMasterVal}`, {
            headers: {
                'Authorization': `Bearer ${ token }`
            }
        })
            .then((res) => {
                setResult(res.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, []);

    


    useEffect(()=>{
    setCounseller(unikqObj.employeeMongoId)
    },[unikqObj.employeeMongoId])

    function getStaff() {
        axios.get(`${ url }/employeeform/${pathRouteMasterVal}`, {
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




    const saveCallReportP = ()=>{

        var currentdate = new Date();
        var date = currentdate.getDay() + "-" + currentdate.getMonth()
            + "-" + currentdate.getFullYear();
        var time =
            + currentdate.getHours() + ":"
            + currentdate.getMinutes();

        let data2 = {
            username: username,
            EnquiryID:  (result1.find((el)=>el._id===followForm.trim())?.EnquiryId||''), CallDate: date, Time: time,
            Name: Name, Contact: Contact, Email: email, ServiceName: ServiceName1, AppointmentDate: appointmentDate,
             AppointmentTime: appointmentTime, enquiryStage: enquiryStage, CallStatus: CallStatus1, 
             FollowupDate: FollowupDate, TimeFollowp: TimeFollowp, Counseller: (staff.find((el)=>el._id===Counseller)?.FullName||'') , Discussion: Discussion,
            status: 'CallReport',... unikqValidateObj 
        }

         fetch(`${url}/prospect/create`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${ token }`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({...data2,...unikqValidateObj})
                }).then((resp) => {
                    resp.json().then(() => {
                        getEnquiry()
                        setVisible(false)
                    })
                })
    }


    const saveProspect = () => {

          var date = currentdate.getDay() + "-" + currentdate.getMonth()
            + "-" + currentdate.getFullYear();

          var time = + currentdate.getHours() + ":" + currentdate.getMinutes();               

        if (enquiryStage === 'Appointment') {
            const data1 = { appointmentDate, appointmentTime, appointmentfor: enquiryStage,identifyStage:enquiryStage,
            CallStatus: CallStatus1,Counseller: (staff.find((el)=>el._id===Counseller)?.FullName||''),...unikqValidateObj,
        
        }
             saveCallReportP()

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
                    getEnquiry()
                    setVisible(false)
                    getEnquiry()
                })
            })
        } else if (enquiryStage === 'Trial Session') {
            const data1 = { appointmentDate, appointmentTime, appointmentfor: enquiryStage,identifyStage:enquiryStage,
            CallStatus: CallStatus1,Counseller: (staff.find((el)=>el._id===Counseller)?.FullName||''),...unikqValidateObj,
        }
            saveCallReportP()

            fetch(`${ url }/enquiryForm/update/${followForm}`, {
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
        
        else if (enquiryStage === 'Join') {
            handleAdmission({...followUpData,type:'top'})
            setVisible(false)
        } else if (enquiryStage === 'Prospect') {

            saveCallReportP()
           
            const data1 = { 
                Counseller:(staff.find((el)=>el._id===Counseller)?.FullName||''), CallStatus:CallStatus1,
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
            

        } else {
            saveCallReportP()
           
            const data1 = { 
                appointmentfor:enquiryStage,
                identifyStage:enquiryStage,
                CallStatus: CallStatus1
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
        }

    }

   
    const [ogList, setOgList] = useState([])

    function getEnquiry() {
        axios.get(`${url}/enquiryForm/${dateFilterObj.startDate}/${dateFilterObj.endDate}/${pathRoute}`, {
            headers: {
                'Authorization': `Bearer ${ token }`
            }
        })
            .then((res) => {
                if(res.status===200){
                    console.log(res.data)
                    res.data.reverse()
                    setTotalEnquire(res.data.length)
                    setResult1(res.data)
                    setOgList(res.data)
                }
            })
            .catch((error) => {
                console.error(error)
            })

    }

    function handleAdmission(data) {
        setEdit(data)
    }
    

    function getProspect(id) {
        axios.get(`${ url }/enquiryForm/${ id }`,
         {
            headers: {
                'Authorization': `Bearer ${ token }`
            }
        })
            .then((res) => {
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

    function getCallReport(id) {
        axios.get(`${ url }/enquiryForm/${ id }`, {
            headers: {
                'Authorization': `Bearer ${ token }`
            }
        })
            .then((res) => {
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
            fetch(`${ url }/enquiryForm/delete/${ id }`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${ token }`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then((result) => {
                result.json().then((resp) => {
                    getEnquiry()
                })
            })
        }
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

    const handleFollowup = (id,item) => {
        setFollowForm(id)
        getProspect(id)
        setFollowUPdata(item)
        setServiceName1(item.ServiceName)

    }

    const handleCallReport = (id) => {
        setFollowForm(id)
        getCallReport(id)
    }

    function handleEnquiry(item,val) {
        if(val==='edit'){
            setToEdit(item)
            setVisible1(true)
        }else{
            setEdit(item)
        }
    }


   
    useEffect(()=>{
        if(edit?._id ){
            setAdmissionForm(true)           
        }
    },[edit?._id,edit?.type])


    function closeAddmisionForm (valBol) {
        setAdmissionForm(valBol)
        setEdit({})
    }


    const validateFollowUparray = ['prospect','trial session','appointment']

    const toFilterData=(data)=>{
    return data.filter((list) => {
        return (moment(list.createdAt).format("DD-MM-YYYY")?.toLowerCase()||'')?.includes(Search1.toLowerCase())
        &&(list.Fullname?.toLowerCase()||'')?.includes(Search3.toLowerCase())
        &&(list.EnquiryId?.toLowerCase()||'')?.includes(Search2.toLowerCase())&&
        (list.ContactNumber+""||'')?.includes(Search4)

            && (list.StaffName?.toLowerCase()||'')?.includes(Search9.toLowerCase()) &&
               (list.ServiceName?.toLowerCase()||'')?.includes(Search5.toLowerCase()) &&
               (list.enquirytype?.toLowerCase()||'')?.includes(Search6.toLowerCase()) &&
               (list.CallStatus?.toLowerCase()||'')?.includes(Search8.toLowerCase())&&
             list.enquirestatus!=='notshow'
    })
    }
    
    return (
        <CRow>
             {(admissionForm&& !visible1) && <AdmissionForm1 add={admissionForm} getEnquiry={getEnquiry}  setAdmissionForm={closeAddmisionForm} ids={edit} />}

            <CCol lg={12} sm={12}>
                <CCard className='mb-3 border-top-success border-top-3'>
                    <CCardHeader>
                        <strong className="mt-2">All Enquires <span className='float-end'>Total Enquires: 
                        {totalEnquire}
                        </span></strong>
                    </CCardHeader>
                    <CCardBody>
                        <CRow className='d-flex justify-content-between'>
                            <CCol lg={5} md={7}>
                        <div className='d-flex justify-content-between mb-2'>
                            <CInputGroup >

                                <CInputGroupText
                                    component="label"
                                    htmlFor="inputGroupSelect01"
                                >
                                    Form
                                </CInputGroupText>
                                <CFormInput
                                    type="date"
                                    value={dateFilterObj.startDate}
                                    onChange={(e)=>setDteFilterObj((prev)=>({...prev,startDate:e.target.value}))}

                                  
                                /><CInputGroupText
                                    component="label"
                                    htmlFor="inputGroupSelect01"

                                >
                                    To
                                </CInputGroupText>
                                <CFormInput
                                    type="date"
                                    value={dateFilterObj.endDate}
                                    onChange={(e)=>setDteFilterObj((prev)=>({...prev,endDate:e.target.value}))}
                                                                   />
                                <CButton type="button" color="primary" onClick={()=>getEnquiry()} >
                                    Go
                                </CButton>
                            </CInputGroup>
                        </div>
                        </CCol>
                            {enquiryImport&&<CCol lg={3} md={6} sm={12} className={(enquiryImport)?' mb-2 float-end':'d-none'}>
                                <CFormSelect
                                    className="mb-1 ms-auto"
                                    aria-label="Select Assign Staff"
                                    value={Counseller}
                                    onChange={(e) =>{
                                        if(!!e.target.value?.trim()){
                                            setErrorMessage(false)
                                        }
                                        setCounseller(e.target.value)
                                    }}
                                >
                                    <option value={''}>Select Counsellor</option>
                                    {staff.filter((list) => list.selected === 'Select').map((item, index) => (
                                        (
                                            <option key={index} value={item._id}>{[item.FullName, item.EmployeeID].join('\n')}</option>
                                        )
                                    ))}</CFormSelect>

                                 {errorMessage&&<label className='text-danger' >Please select the employee before import</label>}  
                            </CCol>}
                            <CCol lg={3} sm={6} md={6} >
                                <CButtonGroup className={(enquiryExport||enquiryImport)?' mb-2 float-end':'d-none'}>
                                    <CButton onClick={(e)=>HandaleImportClick(e,(toFilterData(result1).length||0))} color="primary" className={(enquiryImport)?' mb-2 float-end':'d-none'}>
                                        <CIcon icon={cilArrowCircleBottom} />
                                        {' '}Import
                                    </CButton>
                                    <CFormInput type='file'
                                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                        ref={hiddenXLimportFileInput}
                                        onChange={(e)=>HandaleImportChange(e,(toFilterData(result1).length||0))} hidden />

                                    <CButton className={(enquiryExport)?' mb-2 float-end':'d-none'} onClick={()=>exportDataFun(toFilterData(result1))} color="primary">
                                        <CIcon icon={cilArrowCircleTop} />
                                        {' '}Export
                                    </CButton>
                                </CButtonGroup>
                            </CCol>                           
                        </CRow>
                        <CRow className='d-flex justify-content-between mb-2'>
                            <CCol lg={3} sm={12} md={12} className='mb-2'>
                                <CCard>
                                    <CCardHeader className='d-flex justify-content-center'>
                                        Enquiries
                                    </CCardHeader>
                                    <CCardBody className='d-flex justify-content-around'>
                                        <CCard style={{ margin: "2px" }}>
                                            <CCardBody style={{ padding: "5px" }}>
                                            Open qry: {result1.filter((list) =>
                                                    moment(list.createdAt).format("MM-DD-YYYY").includes(select) && 
                                                    list.enquirestatus!=='notshow' 
                                                ).length}
                                            </CCardBody>
                                        </CCard>
                                        <CCard style={{ margin: "2px" }}>
                                            <CCardBody style={{ padding: "5px" }}>
                                                Converted: {result1.filter((list) =>                                
                                                     moment(list.createdAt).format("MM-DD-YYYY").includes(select) &&  
                                                      list.enquirestatus==='notshow'
                                                     ).length}
                                            </CCardBody>
                                        </CCard>
                                        
                                    </CCardBody>
                                </CCard>
                            </CCol>
                            <CCol lg={5} sm={12} md={12} className='mb-2'>
                                <CCard>
                                    <CCardHeader className='d-flex justify-content-center'>
                                        Follow Up
                                    </CCardHeader>
                                    <CCardBody className='d-flex justify-content-around'>
                                    <CCard style={{ margin: "2px" }}>
                                            <CCardBody style={{ padding: "5px" }}>
                                                Cold: {result1.filter((list) =>
                                                    list.CallStatus === 'Cold'&&
                                                    list?.appointmentfor?.trim()
                                                    && list.enquirestatus!=='notshow'
                                                ).length}
                                            </CCardBody>
                                        </CCard>
                                        <CCard style={{ margin: "2px" }}>
                                            <CCardBody style={{ padding: "5px" }}>
                                            Prospects: {result1.filter((list) =>
                                                     list.appointmentfor === 'Prospect' && 
                                                     list.enquirestatus!=='notshow'&&
                                                     list.CallStatus !== 'Cold'
                                                ).length}
                                            </CCardBody>
                                        </CCard>
                                        <CCard style={{ margin: "2px" }}>
                                            <CCardBody style={{ padding: "5px" }}>
                                                Trial: {result1.filter((list) =>
                                                     list.appointmentfor === 'Trial Session' && 
                                                     list.enquirestatus!=='notshow'&&
                                                     list.CallStatus !== 'Cold'
                                                ).length}
                                            </CCardBody>
                                        </CCard>
                                        <CCard style={{ margin: "2px" }}>
                                            <CCardBody style={{ padding: "5px" }}>
                                                Appointment: {result1.filter((list) =>
                                                      list.appointmentfor === 'Appointment' &&
                                                      list.enquirestatus!=='notshow' &&
                                                      list.CallStatus !== 'Cold'
                                                ).length}
                                            </CCardBody>
                                        </CCard>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                            <CCol lg={4} sm={12} md={12} className='mb-2'>
                                <CCard>
                                    <CCardHeader className='d-flex justify-content-center'>
                                        Trials
                                    </CCardHeader>
                                    <CCardBody className='d-flex justify-content-around'>
                                        <CCard style={{ margin: "2px" }}>
                                            <CCardBody style={{ padding: "5px" }}>
                                                Trial Scheduled: {result1.filter((list) =>
                                                     list.appointmentfor === 'Trial Session' && list.enquirestatus!=='notshow'
                                                ).length}
                                            </CCardBody>
                                        </CCard>
                                        <CCard style={{ margin: "2px" }}>
                                            <CCardBody style={{ padding: "5px" }}>
                                                Completed: {result1.filter((list) =>
                                                     list.status === 'trailComplete' && list.enquirestatus!=='notshow'
                                                ).length}
                                            </CCardBody>
                                        </CCard>
                                        <CCard style={{ margin: "2px" }}>
                                            <CCardBody style={{ padding: "5px" }}>
                                                Converted: {result1.filter((list) =>
                                                     list.appointmentfor === 'Trial Session' && list.enquirestatus!=='notshow'
                                                ).length}
                                            </CCardBody>
                                        </CCard>
                                    </CCardBody>
                                </CCard>
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
                                    <option value='Counseller'>Counsellor </option>
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
                            <CCol xs={3} >
                                <CFormSelect
                                    className="mb-1"
                                    aria-label="Select Service Name"
                                    value={subFilter}
                                    onChange={(e) => { setSubFilter(e.target.value); filterArr(ogList, e.target.value) }}
                                    label="Sub-filter"

                                >
                                    <option value=''>Select</option>
                                    {arr.filter((list) => list[filterBy] != '').map((item, index) => (
                                        <option key={index} value={item.id}>{item[filterBy]}</option>
                                    ))}
                                </CFormSelect>
                            </CCol>
                            <CCol></CCol>
                        </CRow>
            

                        <CModal size='lg'   scrollable   alignment="center"   visible={visible}  onClose={() => setVisible(false)} >
                            <CModalHeader style={{ backgroundColor: '#0B5345', color: 'white' }} >
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
                                                label='Counsellor'
                                            >
                                                <option>Select Counsellor</option>
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
                                                    { label: 'Prospect', value: 'Prospect' },
                                                    { label: "Appointment", value: "Appointment" },
                                                    { label: "Trial Session", value: "Trial Session" },
                                                    { label: "Join", value: "Join" },
                                                    { label: 'Not Interested', value: 'Not interested' },

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
                                        {enquiryStage != 'Join' && enquiryStage != 'Not interested'&&

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
                                <CButton type='submit' color="primary" onClick={() => saveProspect()}>{
                                    enquiryStage === 'Join' ? 'Open Admission Form' : 'Save'}</CButton>
                            </CModalFooter>
                        </CModal>

                     






                        <CModal size="xl" scrollable   alignment="center" visible={visible1} onClose={() => setVisible1(false)}>
                            <CModalHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                                <CModalTitle>Edit Form</CModalTitle>
                            </CModalHeader>
                            <CModalBody >
                              
                              {visible1 &&  <EnquiryForm 

                              edit={visible1} 
                              editData={toEdit} 
                              getEnquiry={()=>getEnquiry()}
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
                                    <CTableHeaderCell >Sr.No</CTableHeaderCell>
                                    <CTableHeaderCell >Enquiry ID</CTableHeaderCell>
                                    <CTableHeaderCell >Date</CTableHeaderCell>
                                    <CTableHeaderCell >Time</CTableHeaderCell>
                                    <CTableHeaderCell >Name</CTableHeaderCell>
                                    <CTableHeaderCell >Mobile</CTableHeaderCell>
                                    <CTableHeaderCell >Service</CTableHeaderCell>
                                    <CTableHeaderCell >Source</CTableHeaderCell>
                                    <CTableHeaderCell >Enquiry stage</CTableHeaderCell>
                                    <CTableHeaderCell >Call Status</CTableHeaderCell>
                                    <CTableHeaderCell >Message</CTableHeaderCell>
                                    {(isAdmin|| enquiryAdd)&&<CTableHeaderCell >Add</CTableHeaderCell>}
                                    <CTableHeaderCell > Date/Time</CTableHeaderCell>
                                    <CTableHeaderCell >Assigned by</CTableHeaderCell>
                                    <CTableHeaderCell >Counsellor</CTableHeaderCell>
                                    {(isAdmin|| enquiryAdd)&&<CTableHeaderCell >Action</CTableHeaderCell>}
                                    {(isAdmin|| enquiryEdit)&&<CTableHeaderCell >Edit</CTableHeaderCell>}
                            </CTableHead>
                            <CTableBody >
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
                                            aria-describedby="exampleFormControlInputHelpInline"
                                            value={Search2}
                                            onChange={(e) => setSearch2(e.target.value)}
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
                                            disabled
                                         
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
                                    <CTableDataCell style={{display:(isAdmin|| enquiryAdd)?'':'none'}}>
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
                                            style={{ minWidth: "50px" }}
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
                                            disabled
                                            onChange={(e) => setSearch10(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell  style={{display:(isAdmin|| enquiryAdd)?'':'none'}}>
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "100px" }}
                                            type="text"
                                            disabled
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell style={{display:(isAdmin|| (enquiryEdit||enquiryDelete))?'':'none'}}>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            disabled
                                            aria-describedby="exampleFormControlInputHelpInline"
                                            style={{ minWidth: "100px" }}
                                        />
                                    </CTableDataCell>
                                </CTableRow>

                                {toFilterData(result1)
                                .slice(paging * 10, paging * 10 + 10).map((item, index) => (
                                    <CTableRow key={index} className='border-1' color={!(validateFollowUparray.includes(item?.appointmentfor?.trim().toLowerCase()))?'success':''}>
                                        <CTableDataCell>{(toFilterData(result1).length - index) - (paging * 10)}</CTableDataCell>
                                        <CTableDataCell>{item.EnquiryId}</CTableDataCell>
                                        <CTableDataCell className='text-center'>{moment(item.createdAt).format("DD-MM-YYYY")}</CTableDataCell>
                                        <CTableDataCell>{moment(item.createdAt, "HH:mm").format("hh:mm A")}</CTableDataCell>
                                        <CTableDataCell>{item.Fullname}</CTableDataCell>
                                        <CTableDataCell>{item.ContactNumber}</CTableDataCell>
                                        <CTableDataCell>{item.ServiceName}</CTableDataCell>
                                        <CTableDataCell>{item.enquirytype}</CTableDataCell>
                                        <CTableDataCell>{item.identifyStage}</CTableDataCell>
                                        <CTableDataCell>{item.CallStatus}</CTableDataCell>
                                        <CTableDataCell>{item.Message}</CTableDataCell>
                                        <CTableDataCell style={{display:(isAdmin|| enquiryAdd)?'':'none'}}>
                                            {(isAdmin|| enquiryAdd) && <BsPlusCircle id={item._id} style={{ cursor: 'pointer', markerStart: '10px', marginLeft: "4px" }}
                                            onClick={() => { setEdit(item._id), handleAdmission({...item,type:'bottom'}) }} />}
                                            
                                            </CTableDataCell>

                                        <CTableDataCell>

                                            {moment(item.appointmentDate).format("DD-MM-YYYY")
                                                != 'Invalid date' && moment(item.appointmentDate).format("DD-MM-YYYY")}
                                            <br />{moment(item.appointmentTime, "HH:mm").format("hh:mm A") !=
                                                'Invalid date' ? moment(item.appointmentTime, "HH:mm").format("hh:mm A") : '-'}


                                        </CTableDataCell>

                                        <CTableDataCell>{item.StaffName}</CTableDataCell>
                                        <CTableDataCell>{item.Counseller}</CTableDataCell>
                                        <CTableDataCell className='text-center' style={{display:(isAdmin|| enquiryAdd)?'':'none'}}>
                                            <a href={`tel:+${ item.CountryCode }${ item.ContactNumber }`} target="_black">
                                                <MdCall style={{ cursor: 'pointer', markerStart: '10px' }} o
                                                    nClick={() => { setCallReport(true), handleCallReport(item._id) }} size='20px' />
                                            </a><a href={`https://wa.me/${ item.ContactNumber }`} target="_black">
                                                <BsWhatsapp style={{ marginLeft: "4px", cursor: 'pointer', markerStart: '10px' }}
                                                    onClick={() => { setCallReport(true), handleCallReport(item._id) }} size='20px' /></a>
                                            <a href={`mailto: ${ item.Emailaddress }`} target="_black">
                                                <MdMail style={{ cursor: 'pointer', markerStart: '10px', marginLeft: "4px" }}
                                                    onClick={() => { setCallReport(true), handleCallReport(item._id) }} size='20px' /></a>
                                           
                                            {(isAdmin|| enquiryAdd)&&<BsPlusCircle id={item._id} style={{
                                                cursor: 'pointer',
                                                markerStart: '10px', marginLeft: "4px"
                                            }} onClick={() => handleFollowup(item._id,item)} />}

                                        </CTableDataCell>

                                         {(isAdmin|| enquiryEdit ||enquiryDelete) &&<CTableDataCell className='text-center'>{
                                            (isAdmin|| enquiryEdit) && 
                                            <MdEdit id={item._id} style={{ fontSize: '35px', cursor: 'pointer', markerStart: '10px' }}
                                                onClick={() => handleEnquiry(item,'edit')} size='20px' />}
                                                
                                            {(isAdmin|| enquiryDelete) && <MdDelete style={{ cursor: 'pointer', markerStart: '10px', marginLeft: "5px" }}
                                                onClick={() => deleteEnquiry(item._id)} size='20px' />}
                                                
                                                </CTableDataCell>}
                                    </CTableRow>
                                ))}
                            </CTableBody>
                        </CTable>

                    </CCardBody>

                    <CPagination aria-label="Page navigation example" align="center" className='mt-2'>
                        <CPaginationItem style={{ cursor: 'pointer' }} aria-label="Previous" disabled={paging != 0 ? false : true}
                            onClick={() => paging > 0 && setPaging(paging - 1)}>
                            <span aria-hidden="true">&laquo;</span>
                        </CPaginationItem>
                        <CPaginationItem style={{ cursor: 'pointer' }} active onClick={() => setPaging(0)}>{paging + 1}</CPaginationItem>
                        {toFilterData(result1).length > (paging + 1) * 10 && <CPaginationItem style={{ cursor: 'pointer' }}
                            onClick={() => setPaging(paging + 1)} >{paging + 2}</CPaginationItem>}

                        {toFilterData(result1).length > (paging + 2) * 10 && <CPaginationItem style={{ cursor: 'pointer' }}
                            onClick={() => setPaging(paging + 2)}>{paging + 3}</CPaginationItem>}
                        {toFilterData(result1).length > (paging + 1) * 10 ?
                            <CPaginationItem aria-label="Next" style={{ cursor: 'pointer' }} onClick={() => setPaging(paging + 1)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                            : <CPaginationItem disabled aria-label="Next" style={{ cursor: 'pointer' }} onClick={() => setPaging(paging + 1)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                        }
                    </CPagination>
                </CCard>
            </CCol >
        </CRow >
    )
}

export default AllEnquires


