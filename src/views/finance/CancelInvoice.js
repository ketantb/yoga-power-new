import React from 'react'
import {
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormInput,
    CFormSelect,
    CInputGroup,
    CInputGroupText,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CPagination,
    CPaginationItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowCircleBottom, cilArrowCircleTop, cilPlus } from '@coreui/icons'
import {BsEye } from 'react-icons/bs'

import { useSelector } from "react-redux";
import {useEffect, useState} from 'react'
import axios from 'axios'
import { MdDelete } from 'react-icons/md';
import YogaSpinnar from '../theme/YogaSpinnar';
import moment from 'moment/moment'
import { useAdminValidation } from '../Custom-hook/adminValidation'
import { financeRight } from '../hr/Rights/rightsValue/erpRightsValue'
const Invoice = React.lazy(()=>import('../clients/Invoice'))

let user = JSON.parse(localStorage.getItem('user-info'))
    console.log(user);
    const token = user.token;
    const username = user.user.username;



const CancelInvoice = () => {
    let num =0
    const [AllInvoiceData,setAllInvoiceData] = useState([])
    const [allIvoiceOfaUser,setAllInvoiceOfUser] = useState([])
    const [ClientData,setClient] = useState([])
    const [showInvoiceModal,setInvoceModal] = useState(false)

    const [pagination, setPagination] = useState(10)
    const [result, setResult] = useState([]);
    const [serviceName,setServiceName] = useState('')
    const [result1,setResult1] = useState([])
    const url1 = useSelector((el)=>el.domainOfApi) 
    const pathVal = useAdminValidation()
 
    const [startDate,setStartDate] = useState('')
    const [endDate,setEndDate] = useState('')
    const [employeeData, setEmployeeData] = useState([])
    const [selectedEmployee, setSselectedEmployee] = useState('')

    const rightsData = useSelector((el)=>el.empLoyeeRights?.erpRights.erpFinance.items
    .erpInvoices.items.erpCancelledInvoice.rights) 
    const access = rightsData?rightsData:[]
    const isAdmin = useSelector((el)=>el.isAdmin) 

    
    const getAllInvoiceData = async ()=>{
        const {data} = await axios.get(`${url1}/invoice/${pathVal}`,{ 
                headers: {
                    'Authorization': `Bearer ${token}`
                }})
        
        setAllInvoiceData(data.reverse())     
                
    } 
    
    
   

    function getPackage() {
        axios.get(`${url1}/packagemaster`, {
    
        })
            .then((res) => {
                setResult(res.data)
                console.log(res.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }


   
    useEffect(()=>{
        getPackage()
        getAllInvoiceData()
    },[])
    
    useEffect(()=>{
    setPagination(10)
    },[serviceName,endDate,startDate,selectedEmployee])

    console.log(AllInvoiceData)

    
    const getDate = (date,val) => {

        const date2 = new Date(date).getDate() + "/" + (new Date(date).getMonth() + (val? 1:0)) + "/" + new Date(date).getFullYear()
        if (date2 === 'NaN/NaN/NaN') {
            return 'Invalid Date'
        }
        return date2

    }

    function ShowUserInvoceHandler (id,item){
        const uniqClientData = result1.filter((el)=>el?.invoiceId===id)
        console.log(uniqClientData)
        setAllInvoiceOfUser([item])    
        setClient(...uniqClientData)
        setInvoceModal(true)      
    } 

 async function DeleteInvoice (id){
    if(!confirm('Do you want to delete'))return

    axios.delete(`${url1}/invoice/delete/${id}`,{ 
        headers: {
            "Authorization": `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }}).then((res)=>{
            
        getAllInvoiceData()    
     })   

  }


 async function  StatusOpration(value,id){
 const status = value
   
    axios.post(`${url1}/invoice/update/${id}`,{status:status},{ 
        headers: {
            "Authorization": `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }}).then((res)=>{
            
        getAllInvoiceData()    
     })   

 }   


    console.log(result1)
    useEffect(()=>{
        setPagination(10)
    },[serviceName])



    useEffect(() => {
        getEmployee()
    }, [])
    
    async function getEmployee() {
        try {
            const { data } = await axios.get(`${ url1 }/employeeform/${pathVal}`)
            setEmployeeData(data)
        } catch (error) {
            console.log(error)
        }
    }
    
    
    const  compareDate = (date1,date2,type)=>{      
        if(type==='start'){
        return moment(date1).format('YYYY-MM-DD')<=moment(date2).format('YYYY-MM-DD')
        }
        if(type==='end'){  
        return   moment(date1).format('YYYY-MM-DD')>=moment(date2).format('YYYY-MM-DD')
        }
        }
    
    
        const clearFilter=()=>{
            setSselectedEmployee('')
            setStartDate('')
            setEndDate('')
            setServiceName('')
            }
    
            const toCheckValiDate= (val)=>{
                return  (access.includes(val)||isAdmin) ?'':'none'
            }

    return (
        <CRow>
   
        <Invoice 
            allIvoiceOfaUser={allIvoiceOfaUser} 
            ClientData={ClientData} setInvoceModal={setInvoceModal}
            showInvoiceModal={showInvoiceModal}            
            /> 
            <CCol lg={12} sm={12}>
                <CCard className='mb-3 border-top-success border-top-3'>
                    <CCardHeader>
                        <strong className="mt-2">Cancelled Invoice</strong>
                    </CCardHeader>
                    <CCardBody>

                    <CRow className='d-flex justify-content-center mb-2'>
                            <CCol lg={3} md={6} sm={12}  className='mb-2'>
                                <CInputGroup
                                    className='mb-2'
                                >
                                    <CInputGroupText
                                        component="label"
                                    >
                                        From
                                    </CInputGroupText>
                                    <CFormInput
                                        type='date'
                                        aria-label="Start Date"
                                        value={startDate}
                                        onChange={(e)=>setStartDate(e.target.value)}
                                    />
                                </CInputGroup>
                            </CCol>
                            <CCol lg={3} md={6} sm={12} className='mb-2'>
                                <CInputGroup className='mb-2'>
                                    <CInputGroupText
                                        component="label"
                                    >
                                        To
                                    </CInputGroupText>
                                    <CFormInput
                                        type='date'
                                        aria-label="End Date"
                                        value={endDate}
                                        onChange={(e)=>setEndDate(e.target.value)}
                                    />
                                </CInputGroup>
                            </CCol>
                            <CCol lg={3} md={6} sm={12}  className='mb-2'>
                                <CInputGroup>
                                    <CInputGroupText
                                        component="label"
                                        htmlFor="inputGroupSelect01"
                                    >
                                       Select Staff
                                    </CInputGroupText>
                                    <CFormSelect 
                    value={selectedEmployee}
                    onChange={(e) => setSselectedEmployee(e.target.value)}
                >
                    <option >Select Staff </option>

                    {employeeData.filter((list) => list.username === username && list.selected === 'Select').map((item, index) => (
                        item.username === username && (
                            <option key={index} value={item.FullName} >{item.FullName}</option>
                        )
                    ))}

                </CFormSelect>
                                </CInputGroup>
                            </CCol>
                            <CCol lg={3} md={6} sm={12}  className='mb-2'>
                                <CInputGroup>
                                    <CFormSelect id="inputGroupSelect01"
                                    value={serviceName}
                                     onChange={(e)=>setServiceName(e.target.value)}
                                    >
                                    <option>Select Service</option>
                                        {result.map((item, index) => (
                                            item.username === username && (
                                               item.Status=== true && (
                                                    <option key={index}>{item.Service }</option>                                                  
                                                )
                                            
                                            )))}
                                    </CFormSelect>
                                </CInputGroup>
                            </CCol>
                        </CRow>
                        <CRow className='mb-4'>
                            <CCol>
                            <CButton onClick={()=>{clearFilter()}}>Clear Filter</CButton>
                            </CCol>
                        </CRow>
                        <CTable bordered style={{ borderColor: "#106103" }} responsive>
                            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }}>
                                <CTableRow>
                                    <CTableHeaderCell scope="col">Sr No</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Invoice Date</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Center code</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">
                                        Invoice No
                                    </CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Clien Id</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Service</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Service Duration</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Start Date</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">End Date</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Created By</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Final Amount</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Paid</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Balance</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Mode</CTableHeaderCell>
                                    <CTableHeaderCell scope="col" style={{display:toCheckValiDate(financeRight.viewCancelInvoice)}}>view</CTableHeaderCell>
                                    <CTableHeaderCell scope="col" style={{display:toCheckValiDate(financeRight.statusCancelInvoice)}}>status</CTableHeaderCell>
                                    <CTableHeaderCell scope="col" style={{display:toCheckValiDate(financeRight.deleteCancelledInvoice)}}>Delete</CTableHeaderCell>

                               
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {AllInvoiceData.filter((el)=>el.status==='cancel').filter((el)=>{
                                 return el.counseller.includes(selectedEmployee)})
                                .filter((el)=>{ if(startDate&&endDate){
                                return compareDate(startDate,el.startDate,'start') &&
                                compareDate(endDate,el.endDate,'end')}return true})
                                .filter((el)=>{if(serviceName){num =0
                                 return serviceName=== el.ServiceName}return el}).filter((el, i) => {
                                    num++                                    
                                 if (pagination - 10 < i + 1 && pagination >= i + 1) {return el
                                 }}).map((el,i)=>{
                                    return <CTableRow key={i}>
                                   <CTableDataCell>{i + 1 + pagination - 10}</CTableDataCell>
                                    <CTableDataCell>{getDate(el.createdAt,true)}</CTableDataCell>
                                    <CTableDataCell>{el.centerName}</CTableDataCell>
                                    <CTableDataCell>{el.InvoiceNo}</CTableDataCell>
                                    <CTableDataCell>{el.clientId}</CTableDataCell>
                                    <CTableDataCell>{el.MemberName}</CTableDataCell>
                                    <CTableDataCell>{el.ServiceName}</CTableDataCell>
                                    <CTableDataCell>{el.duration}</CTableDataCell>
                                    <CTableDataCell>{moment(el.startDate).format('YYYY-MM-DD')}</CTableDataCell>
                                    <CTableDataCell>{moment(el.endDate).format('YYYY-MM-DD')}</CTableDataCell>
                                    <CTableDataCell>{el.counseller}</CTableDataCell>
                                    <CTableDataCell>{el.amount}</CTableDataCell>
                                    <CTableDataCell>{el.paidAmount}</CTableDataCell>
                                    <CTableDataCell>{el.pendingAmount}</CTableDataCell>
                                    <CTableDataCell>{el.paymode}</CTableDataCell>
                                   
                                    <CTableDataCell style={{display:toCheckValiDate(financeRight.viewCancelInvoice)}}>{
                                        <CButton size='sm' onClick={()=>ShowUserInvoceHandler(el._id,el)}>
                                            <BsEye />
                                      </CButton>}</CTableDataCell>
                                    <CTableDataCell style={{display:toCheckValiDate(financeRight.statusCancelInvoice)}}>
                                        {el.status==='cancel'&&<CButton color='danger' size='sm'  onClick={()=>StatusOpration('active',el._id)} >Cancel</CButton>  }
                                        {el.status==='active'&& <CButton color='warning' size='sm' onClick={()=>StatusOpration('done',el._id)}>Panding..</CButton> }
                                        {el.status==='done'&&<CButton color='success' size='sm' onClick={()=>StatusOpration('cancel',el._id)} >Done</CButton>  }                                        
                                        </CTableDataCell>  
                                    <CTableDataCell style={{display:toCheckValiDate(financeRight.deleteCancelledInvoice),cursor:'pointer'}} className='text-center' >{
                                      <CButton size='sm' color='danger'
                                      onClick={()=>DeleteInvoice(el._id)}
                                      ><MdDelete/></CButton>  
                                        }</CTableDataCell>

                                </CTableRow>
                            })}
                            
                            </CTableBody>
                        </CTable>
                        {!AllInvoiceData[0] ?
                                <CCol style={{ width: '100%' }} className='d-flex justify-content-center my-3'>
                                    <YogaSpinnar />
                         </CCol> : ''}
                        <div className='d-flex justify-content-center mt-3' >
                        <CPagination aria-label="Page navigation example" style={{cursor:'pointer'}}>
                            <CPaginationItem aria-label="Previous" onClick={() => setPagination((val) => val > 10 ? val - 10 : 10)}>
                                <span aria-hidden="true" >&laquo;</span>
                            </CPaginationItem>
                            <CPaginationItem active >{pagination / 10}</CPaginationItem>
                            {num > pagination / 10 * 10 && <CPaginationItem onClick={() => setPagination((val) => val < num ? val + 10 : val)}>{pagination / 10 + 1}</CPaginationItem>}
                            {num > pagination / 10 * 20 && <CPaginationItem onClick={() => setPagination((val) => val < num ? val + 10 : val)}>{pagination / 10 + 2}</CPaginationItem>}
                            <CPaginationItem aria-label="Next" onClick={() => setPagination((val) => val < num ? val + 10 : val)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                        </CPagination>
      </div>
                    </CCardBody>

                </CCard>
            </CCol>

            
        </CRow>
    )
}

export default CancelInvoice;