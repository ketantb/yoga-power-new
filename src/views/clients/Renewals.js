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
import { BsPlusCircle, BsWhatsapp,BsEye } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

//  Invoice Slip
const Invoice  = React.lazy(()=>import('./Invoice'))
const AddInvoiceSlip = React.lazy(()=>import('./AddInvoiceSlip'))
import ClientEditForm from './ClientEditForm/ClientEditForm'
import { useAdminValidation,useUniqAdminObjeact } from '../Custom-hook/adminValidation'
import useClientExport from './Custom-Hook/useClientExport'
import moment from 'moment/moment'
import CallUpdate from 'src/components/CallUpdate'
import { useNavigate } from 'react-router-dom'


const Renewals = () => {

    const pathVal = useAdminValidation()   
    const pathValMaster = useAdminValidation('Master')
    let pageNumber = 0
    const navigateFitnees = useNavigate()



    const url1 = useSelector((el)=>el.domainOfApi) 

    const [select, setSelect] = useState('')
    const [uniqId,setUniqId] = useState('')
    const [followForm, setFollowForm] = useState('')
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

    const [CallUpdateID, setCallUpdateID] = useState("");
    const [uniqClientId,setUniqClientId] = useState([])
    const [Calls, setCalls] = useState(false);

    const [Name, setName] = useState("");
    const [Contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [ServiceName1, setServiceName1] = useState("");
    const [CallStatus1, setCallStatus1] = useState("");
    const [Counseller, setCounseller] = useState("");

    // Invoice
 
    const [allIvoiceOfaUser,setAllInvoiceOfUser] = useState([])
    const [ClientData,setClient] = useState([])
    const exportData= useClientExport('Renewals.xlsx')


    let user = JSON.parse(localStorage.getItem('user-info'))
    console.log(user);
    const token = user.token;
    const username = user.user.username;
    const centerCode = user.user.centerCode;
    const [result1, setResult1] = useState([]);
    const [ogList, setOgList] = useState([])
    const [prevData,setPrevData] = useState([])
    const [result, setResult] = useState([]);

    const [invoiceData,setInvoiceData] = useState([])
    const [paging, setPaging] = useState(0);
    const [showInvoiceModal,setInvoceModal] = useState(false)
    const [showInvoiceModal2,setInvoceModal2] = useState(false)
    const [enquiryStage, setEnquiryStage] = useState('Upgrade Calls');
    const [showEdit,setEditForm] = useState(false)
    const [editData,setEditData] = useState({})
    const [discussion,setDiscussion] = useState('')
    const [callsDate,setCallsDate] = useState('')
    const [callsTime,setCallsTime] = useState('')
    const uniqObjectVal = useUniqAdminObjeact()


    useEffect(() => {
        getEnquiry()
        getStaff()
        axios.get(`${url1}/subservice/${pathValMaster}`, {
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

    const [staff, setStaff] = useState([])
    function getStaff() {
        axios.get(`${url1}/employeeform/${pathValMaster}`, {
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

 
function findRenevalClient(list){
    const time =  (new Date(list.endDate) -new Date())
    const days = Math.ceil(time/(1000*60*60*24))
          if((days<=15 && days>=1)){
       
             return true 
          }
          return false      
}

    

    function getEnquiry() {
        axios.get(`${url1}/memberForm/${pathVal}
        `, {
            headers: {
                'Authorization': `Bearer ${ token }`
            }
        })
            .then((res) => {
                const data = res.data.filter((list) =>  findRenevalClient(list)).reverse()
                setResult1(data)
                setPrevData(data)
                setOgList(data)
            })
            .catch((error) => {
                console.error(error)
            })
    }
    const getDate = (date,val) => {

        const date2 = new Date(date).getDate() + "/" + (new Date(date).getMonth() + (val? 1:0)) + "/" + new Date(date).getFullYear()
        if (date2 === 'NaN/NaN/NaN') {
            return 'Invalid Date'
        }
        return date2

    }


    const getEndDate = (date) => {
        const date2 = new Date(date).getDate() + "/" + (new Date(date).getMonth() + 1) + "/" + new Date(date).getFullYear()
        if (date2 === 'NaN/NaN/NaN') {
            return 'Invalid Date'
        }
        return date2

    } 


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

  
    const getInvoiceNoFun =async ()=>{
        const headers = {
                'Authorization': `Bearer ${token}`,
                'My-Custom-Header': 'foobar'
        };
        
          await  axios.get(`${url1}/invoice/${pathVal}`,{headers}).then(({data})=>{
            setInvoiceData(data)
          })
         }
        
        
        
         useEffect(()=>{
            getInvoiceNoFun()
},[])

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


function ShowUserInvoceHandler (id,item){
    const uniqUserInvoiceAllData = invoiceData.filter((el)=>el?.MemberId===id)
    setAllInvoiceOfUser(uniqUserInvoiceAllData)    
    setClient(item)
    setInvoceModal(true)      
    
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

function Edit(data){
    setEditData(data)
    setEditForm(true)
}
    
    function closeEdit(){
        setEditForm(false)
    }

    const clearFilter = ()=>{
       setResult1(prevData)
       setSelect('')
       setFilterBy('')
       setSubFilter('')
    }

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
      ...uniqObjectVal
  }
  
  console.log(enquiryStage)
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

  function NavigateFitnnesofClient(id){
    navigateFitnees(`/clients/member-details/${id}/9`)   
   }
    
    return (
        <CRow>
            {<AddInvoiceSlip
            setInvoceModal2={setInvoceModal2}
            showInvoiceModal2={showInvoiceModal2}
            allIvoiceOfaUser={allIvoiceOfaUser}
            
            />}
           {<Invoice 
            allIvoiceOfaUser={allIvoiceOfaUser} 
            ClientData={ClientData} setInvoceModal={setInvoceModal}
            showInvoiceModal={showInvoiceModal}
            
            />}

            {<ClientEditForm data={editData}
                         showEdit={showEdit}
                         closeEdit={closeEdit}
                         getClientData={getEnquiry}
                />}
        
           
            <CCol lg={12} sm={12}>
                <CCard className='mb-3 border-top-success border-top-3'>
                    <CCardHeader>
                        <strong className="mt-2">Renewals Clients <span className='float-end'>Total Clients : {result1.length}</span></strong>
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
                                        <option value={''}>All Year</option>
                                        <option>Today</option>
                                        <option>Last Week</option>
                                        <option>Last Month</option>
                                    </CFormSelect>
                                </CInputGroup>
                            </CCol>
                            <CCol lg={6} sm={6} md={6}>
                                <CButtonGroup className=' mb-2 float-end'>
                                    <CButton color="primary" onClick={()=>exportData(result1)}>
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
                                                        <option key={index}>{item.FullName}</option>
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

                        <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                            <CTableHead color={'darkGreen'} >
                                    <CTableHeaderCell>Sr.No</CTableHeaderCell>
                                    <CTableHeaderCell>Member ID</CTableHeaderCell>
                                    <CTableHeaderCell>Name</CTableHeaderCell>
                                    <CTableHeaderCell>Mobile</CTableHeaderCell>
                                    <CTableHeaderCell>Invoice No</CTableHeaderCell>
                                    <CTableHeaderCell>Attendance ID</CTableHeaderCell>
                                    <CTableHeaderCell>Service</CTableHeaderCell>
                                    <CTableHeaderCell>Duration</CTableHeaderCell>
                                    <CTableHeaderCell>Start Date</CTableHeaderCell>
                                    <CTableHeaderCell>End Date</CTableHeaderCell>
                                    <CTableHeaderCell>Fitness Goal</CTableHeaderCell>
                                    <CTableHeaderCell>Appointments</CTableHeaderCell>
                                    <CTableHeaderCell>Type of Call</CTableHeaderCell>
                                    <CTableHeaderCell>Action</CTableHeaderCell>
                                    <CTableHeaderCell>Invoice</CTableHeaderCell>
                                    <CTableHeaderCell>Edit</CTableHeaderCell>
                            </CTableHead>
                            <CTableBody>
                                <CTableRow>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "60px" }}
                                            type="text"
                                            aria-describedby="exampleFormControlInputHelpInline"
                                            disabled
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
                                            value={Search2}
                                            onChange={(e) => setSearch2(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "90px" }}
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
                                            disabled
                                            style={{ minWidth: "100px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                            value={Search8}
                                            onChange={(e) => setSearch8(e.target.value)}
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            disabled
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
                                </CTableRow>
                                {result1.filter((list)=>
                                (list.ClientId||' ').toLowerCase().includes(Search1.toLowerCase()) &&
                                (list.Fullname||' ').toLowerCase().includes(Search2.toLowerCase()) &&
                                (list.ContactNumber+"").includes(Search3)&&
                                (list.invoiceNum||' ').toLowerCase().includes(Search4.toLowerCase())&&
                                (list.AttendanceID||' ').toLowerCase().includes(Search5.toLowerCase())&&
                                (list.serviceName||' ').toLowerCase().includes(Search6.toLowerCase())&&
                                (list.duration||' ').toLowerCase().includes(Search7.toLowerCase())&&
                                moment(list.createdAt).format("MM-DD-YYYY").includes(select)
                                ).filter((el)=>{
                                    pageNumber++    
                                    return el                 
                                }).map((item, index) => (
                                        <CTableRow key={index}>
                                            <CTableDataCell>{index + 1 + (paging * 10)}</CTableDataCell>
                                            <CTableDataCell>{centerCode}MEM{index + 10 + (paging * 10)}</CTableDataCell>
                                            <CTableDataCell><Link index={-1} style={{ textDecoration: 'none' }} 
                                            to={`/clients/member-details/${item._id}/1`} target="_black">{item.Fullname}</Link></CTableDataCell>
                                            <CTableDataCell>{item.ContactNumber}</CTableDataCell>
                                            <CTableDataCell>{item.invoiceNum}</CTableDataCell>
                                            <CTableDataCell>{item.AttendanceID}</CTableDataCell>
                                            <CTableDataCell>{item.serviceName}</CTableDataCell>
                                            <CTableDataCell>{item?.duration}</CTableDataCell>
                                            <CTableDataCell>{ getDate(item.startDate,true)}</CTableDataCell>
                                            <CTableDataCell>{ getEndDate(item.endDate)}</CTableDataCell>
                                            <CTableDataCell> <CButton size='sm' onClick={()=>NavigateFitnnesofClient(item._id)} >View Fitness</CButton></CTableDataCell>
                                            <CTableDataCell><Link index={-1} style={{ textDecoration: 'none' }}
                                             to={`/clients/member-details/${item._id}/5`} target="_black">
                                                <BsPlusCircle id={item._id} style={{ cursor: 'pointer', markerStart: '10px' }} /></Link></CTableDataCell>
                                            <CTableDataCell><CButton onClick={() => { setCalls(true), setUniqClientId(item._id) }}>View</CButton></CTableDataCell>
                                            

                                    <CTableDataCell className='text-center'><a href={`tel:${item.CountryCode}${item.ContactNumber}`} target='_black'>
                                                <MdCall style={{ cursor: 'pointer', markerStart: '10px' }} size='20px' /></a>
                                                <a target='_black' href={`https://wa.me/${item.ContactNumber}`}>
                                                    <BsWhatsapp style={{ cursor: 'pointer', markerStart: '10px' }} size='20px' /></a>
                                                    <a target='_black' href={`mailto: ${item.Emailaddress}`}>
                                                         <MdMail style={{ cursor: 'pointer', markerStart: '10px' }} size='20px' /></a>
                                     <BsPlusCircle id={item._id} style={{ cursor: 'pointer', markerStart: '10px' }} onClick={() =>{setVisible(true),handleFollowup(item._id,item.ClientId,item)}} />
                                     </CTableDataCell>

                                    <CTableDataCell  >
                                    <CButtonGroup className='d-flex px-3' >
                                        <CButton  size='sm'
                                         onClick={()=>ShowUserInvoceHandler(item._id,item)} ><BsEye style={{ cursor: 'pointer', markerStart: '10px' }}/></CButton>
                                   </CButtonGroup>  
                                   </CTableDataCell>    

                                            <CTableDataCell className='text-center'>
                                            <MdEdit id={item._id} style={{ fontSize: '35px', cursor: 'pointer',
                                            markerStart: '10px' }} size='20px' onClick={()=>Edit(item)} /> 
                                            <MdDelete style={{ cursor: 'pointer', markerStart: '10px' }} 
                                                onClick={() => deleteEnquiry(item._id)} size='20px' /></CTableDataCell>
                                        </CTableRow>

                                    )
                                )}
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

export default Renewals
