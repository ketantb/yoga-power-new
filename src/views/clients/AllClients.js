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
    CFormSwitch,
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
import ViewInvoice from 'src/components/ViewInvoice'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CallUpdate from 'src/components/CallUpdate'
import ClientEditForm from './ClientEditForm/ClientEditForm'
import { useAdminValidation,useUniqAdminObjeact } from '../Custom-hook/adminValidation'
import { clientManagementRights } from '../hr/Rights/rightsValue/crmRightsValue'
import useClientExport from './Custom-Hook/useClientExport'



const AllClients = () => {
    const url1 = useSelector((el)=>el.domainOfApi) 
    const navigateFitnees = useNavigate()
    const pathValMaster  = useAdminValidation('Master')
    const pathal =  useAdminValidation()
    let pageNumber = 0


    const uniQObjVal = useUniqAdminObjeact()
    const exportClientData = useClientExport('All-Clients.xlsx')

    const rightsData = useSelector((el)=>el.empLoyeeRights?.crmRights
    ?.crmLeads?.items?.superRight) 

    const isAdmin = useSelector((el)=>el.isAdmin) 

    // const enquiryAdd =  (rightsData?.addOn?.includes(clientManagementRights)||isAdmin)
    // const enquiryDelete = (rightsData?.delete?.includes(clientManagementRights)||isAdmin)
    // const enquiryEdit  =  (rightsData?.edit?.includes(clientManagementRights)||isAdmin)

    var currentdate = new Date();
    var day = currentdate.getDate() + '-' + (currentdate.getMonth() + 1) + '-' + currentdate.getFullYear();
    var month = currentdate.getMonth() + '-' + currentdate.getFullYear();
    var year = currentdate.getFullYear();

    const [select, setSelect] = useState('')
    const [followForm, setFollowForm] = useState()
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
    const [enquiryStage, setEnquiryStage] = useState('Upgrade Calls')
    const [Counseller, setCounseller] = useState("");
    const [discussion,setDiscussion] = useState('')
    const [uniqId,setUniqId] = useState('')
   
    const [callsDate,setCallsDate] = useState('')
    const [callsTime,setCallsTime] = useState('')

    const [Calls, setCalls] = useState(false);
    const [CallUpdateID, setCallUpdateID] = useState("");

    const [showEdit,setEdit] = useState(false)
    const [editData,setEditData] = useState({})

    const [uniqClientId,setUniqClientId] = useState([])


    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;
    const [result1, setResult1] = useState([]);
    const [prevData,setPrevData] = useState([])
 
    const [result, setResult] = useState([]);
    const [paging, setPaging] = useState(0);
    useEffect(() => {
        getEnquiry()
        getStaff()
        axios.get(`${url1}/subservice/${pathValMaster}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                setResult(res.data?.reverse())
            })
            .catch((error) => {
                console.error(error)
            })
    }, []);
    const [staff, setStaff] = useState([])
    function getStaff() {
        axios.get(`${url1}/employeeForm/${pathValMaster}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                setStaff(res.data?.reverse())
            })
            .catch((error) => {
                console.error(error)
            })
    }

   

    const [ogList, setOgList] = useState([])
    function getEnquiry() {
        axios.get(`${url1}/memberForm/${pathal}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                const data = res.data.reverse()
                setPrevData(data)
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

   
    function deleteEnquiry(id) {

        if (confirm('Do you want to delete this')) {
            fetch(`${url1}/memberForm/delete/${id}`, {
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
   

    const handleFollowup = (id,uniqId,item) => {
        setFollowForm(id)
        setUniqId(uniqId)
        getCallReport(item)
    }

    function getCallReport(item) {  
        setName(item.Fullname)
        setContact(item.ContactNumber)
        setServiceName1(item.serviceName?.trim()?.toLowerCase())
        setCallStatus1(item.CallStatus)
        setEmail(item.Email)
}
   

    function NavigateFitnnesofClient(id){
     navigateFitnees(`/clients/member-details/${id}/9`)   
    }

function updateRec(id, status) {
    const data1 = { status: status }
    fetch(`${url1}/memberForm/update/${id}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data1)
    }).then((resp) => {
        resp.json().then(() => {
            getEnquiry()
        })
    })
}



function Edit(data){
setEditData(data)
setEdit(true)
}

function closeEdit(){
    setEdit(false)
}

/////// Sales  Calls //////////////////////////////////////////////////

const saveCalls = () => {
  
  let data = {
    Sr_No:' ',
    Date: callsDate,
    Timing:callsTime,
    Client_Id:uniqId,
    Name:Name,
    Contact:Contact,
    Service: ServiceName1,
    Type_Of_Calls:enquiryStage,
    Discussion: discussion,
    Counseller:Counseller,  
    Member_Id:followForm,
    ...uniQObjVal
}

  if(enquiryStage==='Upgrade Calls'){
   postRequest('upgradeCalls')
  }else if(enquiryStage==='Renewals Calls'){
   postRequest('renewalsCalls')
  }else if(enquiryStage==='Cross Sales Calls'){
   postRequest('crosssaleCalls')
  }

function postRequest(path){
axios.post(`${url1}/${path}/create`, data, { headers:{
        "Authorization": `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
} })
.then((resp) => {alert('Successfully save')})
.catch((error) => console.log(error))

}
}


const [dateForm,setDateFormat]  = useState()

const dateFilter = (e) => {
    const { value } = e.target
    if (value === day) {
        setDateFormat('DD-MM-YYYY')
        setSelect(day)
    } else if (value === month) {
        setDateFormat('MM-DD-YYYY')
        setSelect(month)
    } else {
        setDateFormat('YYYY')
        setSelect(year)
    }
}


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

const clearFilter = ()=>{
    setResult1(prevData)
    const value = {target:{value:''}}
    dateFilter(value)
    setFilterBy('')
    setSubFilter('')
}


const getUniqCllientCallData = (id)=>{
                setUniqClientId(id)
                setCalls(true)        
}
function findLeftClient(list){
    const time =  (new Date(list.endDate) -new Date())
    const days = Math.ceil(time/(1000*60*60*24))
          if((days<=0 )){
            console.log(list.invoiceId)
             return true 
          }
          return false   
   }

    return (
        <CRow>
            <CCol lg={12} sm={12}>
                <CCard className='mb-3 border-top-success border-top-3'>
                    <CCardHeader>
                        <strong className="mt-2">All Clients <span className='float-end'>Total Clients 
                        : {result1.filter((list) => list).length}</span></strong>
                    </CCardHeader>
                    <CCardBody>
                        <CRow className='d-flex justify-content-between'>
                            <CCol lg={4} sm={6} md={6}>
                                <CInputGroup className='mb-2'>
                                    <CFormSelect
                                        id="inputGroupSelect04"
                                        aria-label="Example select with button addon"
                                        value={select}
                                        onChange={(e) => dateFilter(e)}
                                    >
                                        <option value=''>All Year</option>
                                        <option value={day}>Today</option>
                                        <option value={month}>Last Month</option>
                                        <option value={year}>This Year</option>

                                    </CFormSelect>
                                  
                                </CInputGroup>
                            </CCol>
                            <CCol lg={6} sm={6} md={6}>
                                <CButtonGroup className=' mb-2 float-end'>
                                    <CButton color="primary" onClick={()=>exportClientData(result1)}>
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
                                    onChange={(e) => { setFilterBy(e.target.value); setArr(getUnique(ogList, e.target.value))}}
                                    label="Filter By"
                                    

                                >
                                    <option value=''>Select</option>
                                    <option value='AssignStaff'>Assign Staff </option>
                                    <option value='EnquiryType'>Lead Sources </option>
                                    <option value='MemberManager'>Member Manager </option>
                                    <option value='serviceName'>Services Name </option>
                                    <option value='Customertype'>Customer Type </option>
                                    <option value='Gender'>Gender</option>
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
                        <CRow>
                            <CCol>
                             <CButton onClick={()=>clearFilter()}>Clear Filter</CButton>
                            </CCol>
                        </CRow>
                        
                        <CallUpdate add={Calls} clickfun={() => setCalls(false)} ids={uniqClientId} />

                        <CModal size='lg' style={{ border: '2px solid #0B5345' }} visible={visible} 
                        onClose={() => setVisible(false)} >
                            <CModalHeader  >
                                <CModalTitle>Upgrade Form</CModalTitle>
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
                                                {result.map((item,) => (
                                                  (
                                                        item.status === true && (
                                                            item.selected_service?.trim()?.toLowerCase()
                                                        )
                                                    )
                                                )).filter((el,i,arr)=>i===arr.indexOf(el)
                                                ).map((el,i)=><option key={i}>{el}</option>) }
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
                                                        <option key={index}>{item.FullName} {item.FullName}</option>
                                                    )
                                                ))}</CFormSelect>
                                        </CCol>
                                        <CCol lg={4} md={6} sm={12}>
                                            <CFormSelect
                                                className="mb-1"
                                                value={enquiryStage}
                                                onChange={(e) => setEnquiryStage(e.target.value)}
                                                label="Call Stage"
                                               
                                            > 
                                                <option>Upgrade Calls</option>
                                                <option>Renewals Calls</option>
                                                <option>Cross Sales Calls</option>
                                                </CFormSelect>
                                        </CCol>
                                      
                                       <CCol sm ={12}>
                                        <CFormTextarea
                                        label="Discussion"
                                        rows={4}
                                        text={'Must be 8-20 words long'}
                                        value={discussion}
                                        onChange={(e)=>setDiscussion(e.target.value)}
                                        >

                                        </CFormTextarea>
                                       </CCol>

                                       <CCol sm={4}>
                                        <CFormInput
                                        label={`Date`}
                                        type='date'
                                        value={callsDate}
                                        onChange={(e)=>setCallsDate(e.target.value)}

                                        >

                                        </CFormInput>
                                        
                                       </CCol>
                                       <CCol sm={4}>

                                        <CFormInput
                                        label={`Time`}
                                        type='time'
                                        value={callsTime}
                                        onChange={(e)=>setCallsTime(e.target.value)}                                    
                                        >

                                        </CFormInput>
                                        
                                       </CCol>                                      
                                    </CRow>

                                    
                                </CForm>
                            </CModalBody>
                            <CModalFooter>
                                <CButton color="secondary" onClick={() => setVisible(false)}>
                                    Close
                                </CButton>
                                <CButton type='submit' color="primary" onClick={() => saveCalls()}>Save Calls </CButton>
                            </CModalFooter>
                        </CModal>

                        {<ClientEditForm data={editData}
                         showEdit={showEdit}
                         closeEdit={closeEdit}
                         getClientData={getEnquiry}
                         />}
                       
                        <CTable className='mt-3' align="middle" bordered  hover responsive>
                            <CTableHead color={'darkGreen'} >
                                    <CTableHeaderCell>Sr.No</CTableHeaderCell>
                                    <CTableHeaderCell>Member ID</CTableHeaderCell>
                                    <CTableHeaderCell>Name</CTableHeaderCell>
                                    <CTableHeaderCell>Mobile</CTableHeaderCell>
                                    <CTableHeaderCell>Invoice No</CTableHeaderCell>
                                    <CTableHeaderCell>Attendance ID</CTableHeaderCell>
                                    <CTableHeaderCell>Enquiry source</CTableHeaderCell>
                                    <CTableHeaderCell>Course Name</CTableHeaderCell>
                                    <CTableHeaderCell>Service</CTableHeaderCell>
                                    <CTableHeaderCell>Duration</CTableHeaderCell>
                                    <CTableHeaderCell>Start Date</CTableHeaderCell>
                                    <CTableHeaderCell>End Date</CTableHeaderCell>
                                    <CTableHeaderCell>Fitness Goal</CTableHeaderCell>
                                    <CTableHeaderCell>Appointments</CTableHeaderCell>
                                    <CTableHeaderCell>Type of Call</CTableHeaderCell>
                                    <CTableHeaderCell>Status</CTableHeaderCell>
                                    <CTableHeaderCell>Action</CTableHeaderCell>
                                    <CTableHeaderCell>Edit</CTableHeaderCell>
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
                                            aria-describedby="exampleFormControlInputHelpInline"
                                            value={Search1}
                                            onChange={(e) => setSearch1(e.target.value)}
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "120px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                            value={Search2}
                                            onChange={(e) => setSearch2(e.target.value)}
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "90px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                            value={Search3}
                                            onChange={(e) => setSearch3(e.target.value)}
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "120px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                            value={Search4}
                                            onChange={(e) => setSearch4(e.target.value)}
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "120px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                            value={Search5}
                                            onChange={(e) => setSearch5(e.target.value)}
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            aria-describedby="exampleFormControlInputHelpInline"
                                            value={Search6}
                                            onChange={(e) => setSearch6(e.target.value)}
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "80px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                            value={Search7}
                                            onChange={(e) => setSearch7(e.target.value)}
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            value={Search8}
                                            onChange={(e) => setSearch8(e.target.value)}
                                            style={{ minWidth: "100px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            value={Search9}
                                            onChange={(e) => setSearch9(e.target.value)}                                            
                                            style={{ minWidth: "100px" }}
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
                                            disabled
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            value={Search10}
                                            disabled
                                            style={{ minWidth: "100px" }}
                                            onChange={(e) => setSearch10(e.target.value)}
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
                                </CTableRow>
                                {result1.filter((list) =>
                                    (list.ClientId||' ').toLowerCase().includes(Search1.toLowerCase())&&
                                    (list.Fullname||' ').toLowerCase().includes(Search2.toLowerCase()) &&
                                    (list.ContactNumber+"").toLowerCase().includes(Search3.toLowerCase())&&
                                    (list.invoiceNum||' ').toLowerCase().includes(Search4.toLowerCase())&&
                                    (list.AttendanceID||' ').toLowerCase().includes(Search5.toLowerCase())&&
                                    moment(list.createdAt).format("MM-DD-YYYY").includes(select)&&
                                    (list.EnquiryType||' ').toLowerCase().includes(Search6.toLowerCase()) &&
                                    (list.serviceName||' ').toLowerCase().includes(Search7.toLowerCase()) && 
                                    (list.typeOFBatchClasses||' ').toLowerCase().includes(Search8.toLowerCase())&&
                                    (list.duration||' ').toLowerCase().includes(Search9.toLowerCase())

                                ).filter((el)=>{
                                    pageNumber++
                                    return el
                                }).slice(paging * 10, paging * 10 + 10).map((item, index) => {
                                   return  (
                                        <CTableRow key={index}>
                                            <CTableDataCell>{ (index+1+ (paging * 10))}</CTableDataCell>
                                            <CTableDataCell>{item.ClientId}</CTableDataCell>
                                            <CTableDataCell><Link index={-1} style={{ textDecoration: 'none' }} to={`/clients/member-details/${item._id}/1`} 
                                            target="_black">{item.Fullname}</Link></CTableDataCell>
                                            <CTableDataCell>{item.ContactNumber}</CTableDataCell>
                                            <CTableDataCell><label style={{ cursor: 'pointer' }}>{item.invoiceNum}</label> </CTableDataCell>
                                            <CTableDataCell>{item.AttendanceID}</CTableDataCell>
                                            <CTableDataCell>{item.EnquiryType}</CTableDataCell>
                                            <CTableDataCell>{item.serviceName}</CTableDataCell>
                                            <CTableDataCell>{item.typeOFBatchClasses}</CTableDataCell>
                                            <CTableDataCell>{item?.duration}</CTableDataCell>
                                            <CTableDataCell>{moment(item.startDate).format("DD-MM-YYYY")}</CTableDataCell>
                                            <CTableDataCell>{moment(item.endDate).format("DD-MM-YYYY")}</CTableDataCell>
                                            <CTableDataCell>
                                               <CButton size='sm' onClick={()=>NavigateFitnnesofClient(item._id)} >View Fitness</CButton>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <Link index={-1} style={{textDecoration: 'none'}}
                                                 to={`/clients/member-details/${item._id}/5`}
                                                  ><BsPlusCircle id={item._id}
                                                   style={{ cursor: 'pointer', markerStart: '10px' }} />
                                                   </Link>
                                                   </CTableDataCell>
                                            <CTableDataCell><CButton onClick={() => {getUniqCllientCallData(item._id) }}>View</CButton></CTableDataCell>
                                        <CTableDataCell className='text-center'>
                                            {
                                        (findLeftClient(item)&&<CButton className='mt-1' color='danger' >Left</CButton>||
                                        item.status === 'active'&& !findLeftClient(item) &&<CButton className='mt-1' color='success' onClick={() => updateRec(item._id, 'inactive')} >Active</CButton>||
                                        item.status !== 'active' && !findLeftClient(item)&&  <CButton className='mt-1' color='danger' onClick={() => updateRec(item._id, 'active')}>Inactive</CButton>)
                                        }
                                        </CTableDataCell>
                                            <CTableDataCell className='text-center'>
                                                <a href={`tel:${item.CountryCode}${item.ContactNumber}`} target='_black'>
                                                    <MdCall style={{ cursor: 'pointer', markerStart: '10px' }} 
                                                    onClick={() => { setCallReport(true), handleCallReport(item._id) }} size='20px' />
                                                    </a><a href={`https://wa.me/${item.ContactNumber}`} target='_black'>
                                                        <BsWhatsapp style={{ cursor: 'pointer', markerStart: '10px' }}
                                                         onClick={() => { setCallReport(true), handleCallReport(item._id) }}
                                                          size='20px' /></a><a href={`mailto: ${item.Emailaddress}`} target='_black'>
                                                             <MdMail style={{ cursor: 'pointer', markerStart: '10px' }} onClick={() =>
                                                                 { setCallReport(true), handleCallReport(item._id) }} size='20px' />
                                                                 </a> 
                                                                 
                                                                 <BsPlusCircle id={item._id} style={{ cursor: 'pointer'
                                                                 , markerStart: '10px' }} onClick={() => {setVisible(true),handleFollowup(item._id,item.ClientId,item)
                                                                 }} />
                                                                 </CTableDataCell>
                                            <CTableDataCell className='text-center'>
                                              
                                                    <MdEdit id={item._id} style={{ fontSize: '35px', cursor: 'pointer',
                                                     markerStart: '10px' }} size='20px' onClick={()=>Edit(item)} />
                                                     <MdDelete style={{ cursor: 'pointer', markerStart: '10px' }}
                                                      onClick={() => deleteEnquiry(item._id)} size='20px' /></CTableDataCell>
                                        </CTableRow>
                                    )
                                    })}
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                    <CPagination aria-label="Page navigation example" align="center" className='mt-2'>
                        <CPaginationItem aria-label="Previous" disabled={paging != 0 ? false : true} onClick={() => paging > 0 && setPaging(paging - 1)}>
                            <span aria-hidden="true">&laquo;</span>
                        </CPaginationItem>
                        <CPaginationItem active onClick={() => setPaging(0)}>{paging + 1}</CPaginationItem>
                        {pageNumber > (paging + 1) * 10 && <CPaginationItem onClick={() => setPaging(paging + 1)} >{paging + 2}</CPaginationItem>}
                        {pageNumber > (paging + 2) * 10 && <CPaginationItem onClick={() => setPaging(paging + 2)}>{paging + 3}</CPaginationItem>}
                        {pageNumber > (paging + 1) * 10 ?
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

export default AllClients
