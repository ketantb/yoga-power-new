import React from 'react'
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
    CRow,
    CTable,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CPagination,
    CPaginationItem,
    CTableBody,
    CTableDataCell,
} from '@coreui/react'


import { useSelector } from "react-redux";
import {useEffect, useState} from 'react'
import axios from 'axios'
import YogaSpinnar from '../theme/YogaSpinnar';
import { MdDelete } from 'react-icons/md';
import moment from 'moment/moment';
import Invoice from '../finance/ClientInvoice/Invoice/Invoice';
import { useAdminValidation } from '../Custom-hook/adminValidation';
import { inventoryRight } from '../hr/Rights/rightsValue/erpRightsValue';
import { Link } from 'react-router-dom'

let user = JSON.parse(localStorage.getItem('user-info'))
    console.log(user);
    const token = user.token;


const ProductInvoice = ({onLyClient,id}) => {

    let num =0
    const [AllInvoiceData,setAllInvoiceData] = useState([])
    const [prinInvoiceData,setPrintInvoiceData] = useState([])
    const [prinInvoice,setPrinInvoice] = useState(false)

    const [pagination, setPagination] = useState(10)
    const [result, setResult] = useState([]);
    const [serviceName,setServiceName] = useState('')
    const [result1,setResult1] = useState([])
    const url1 = useSelector((el)=>el.domainOfApi) 
    const [startDate,setStartDate] = useState('')
    const [endDate,setEndDate] = useState('')
    const [employeeData, setEmployeeData] = useState([])
    const [selectedEmployee, setSselectedEmployee] = useState('')

    const pathVal = useAdminValidation()

    const rightsData = useSelector((el)=>el.empLoyeeRights?.erpRights.erpInventory.items.erpProductInvoice.rights) 
    const access = rightsData?rightsData:[]
    const isAdmin = useSelector((el)=>el.isAdmin) 


    const getAllInvoiceData = async ()=>{
        const urlPath = onLyClient?`${url1}/productInvoice/MemberId/${id}`:
        `${url1}/productInvoice/${pathVal}`
        const {data} = await axios.get(urlPath,{ 
                headers: {
                    'Authorization': `Bearer ${token}`
                }})
        
                console.log(data)
        setAllInvoiceData(data.reverse())     
                
    } 
    
    
    function getEnquiry() {
        axios.get(`${url1}/memberForm/${pathVal}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
               
             setResult1(res.data.filter((list) => list).reverse())
             getAllInvoiceData()
            })
            .catch((error) => {
                console.error(error)
            })
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
        getEnquiry()
        
    },[])
    
    useEffect(()=>{
    setPagination(10)
    },[serviceName,endDate,startDate,selectedEmployee])

    console.log(AllInvoiceData)



useEffect(() => {
    getEmployee()
}, [])

async function getEmployee() {
    try {
        const { data } = await axios.get(`${url1}/employeeform`)
        setEmployeeData(data)
    } catch (error) {
        console.log(error)
    }
}


const clearFilter=()=>{
setSselectedEmployee('')
}

function deleteCall(id) {

    if (confirm('Do you want to delete this')) {
        fetch(`${url1}/productInvoice/delete/${id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((result) => {
            result.json().then(() => {
                getAllInvoiceData()
            })
        })
    }
}


function toPrintInvoice(data){
    setPrintInvoiceData(data)
    setPrinInvoice(true)  
  }


    return (
        <CRow>
            <Invoice 
       visibale={prinInvoice} 
       setPrinInvoice={setPrinInvoice}
       InvoiceData={prinInvoiceData}
       />
        
            <CCol lg={12} sm={12} className={onLyClient?'border-0':'border-1'}>
                <CCard  className={!onLyClient?'mb-3 border-top-success border-top-3':'border-0'}>
                   {!onLyClient&& <CCardHeader className='d-flex justify-content-between'>
                        <strong className="mt-2">Total Invoice</strong>
                        <strong className="mt-2" > Total Invoice :{AllInvoiceData.length}</strong>
                    </CCardHeader>}
                    <CCardBody>
                        
                        <CTable bordered style={{ borderColor: "#106103" }} responsive>
                            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }}>
                                <CTableRow>
                                    <CTableHeaderCell scope="col">Sr No</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Invoice Date</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">
                                        Client Id
                                    </CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Client Name</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Invoice No</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Created By</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Pay Mode</CTableHeaderCell>
                                    <CTableHeaderCell scope="col" style={{display:access.includes(inventoryRight.viewProductInvoice)||isAdmin?'':'none'}}>View</CTableHeaderCell>
                                    <CTableHeaderCell scope="col" style={{display:access.includes(inventoryRight.deleteProductInvoice)||isAdmin?'':'none'}}> Delete</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {AllInvoiceData.slice(pagination-10, pagination).map((el,i)=>
                                <CTableRow color={el.typeOfClient==='Client'?'':'success'}>
                                <CTableDataCell>{i+1+pagination-10}</CTableDataCell>
                                <CTableDataCell>{moment(el.followUpDate).format('YYYY-MM-DD')}</CTableDataCell>
                                <CTableDataCell>{el.clientId}</CTableDataCell>
                                <CTableDataCell>
                                {el.typeOfClient==='Client'?<Link  style={{ textDecoration: 'none' }} to={`/clients/member-details/${el.MemberId}/1`} 
                                            >{el.Fullname}</Link>:el.Fullname}
                                </CTableDataCell>
                                <CTableDataCell>{el.InvoiceNo}</CTableDataCell>
                                <CTableDataCell>{el.counseller}</CTableDataCell>
                                <CTableDataCell>{el.amount}</CTableDataCell>
                                <CTableDataCell>{el.paymode}</CTableDataCell>
                                <CTableDataCell style={{display:access.includes(inventoryRight.viewProductInvoice )||isAdmin?'':'none'}}><CButton size='sm' onClick={()=>toPrintInvoice(el)} >View</CButton></CTableDataCell>
                                <CTableDataCell style={{display:access.includes(inventoryRight.deleteProductInvoice)||isAdmin?'':'none'}}><MdDelete onClick={()=>deleteCall(el._id)} style={{cursor:'pointer'}}/></CTableDataCell>
                            </CTableRow>
                                )}
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                    {!AllInvoiceData[0] ?
                                <CCol style={{ width: '100%' }} className='d-flex justify-content-center my-3'>
                                    <YogaSpinnar />
                         </CCol> : ''}

                         
     <div className={!onLyClient?'d-flex justify-content-center mt-3':'d-flex justify-content-center mt-2'} >
                        <CPagination aria-label="Page navigation example" style={{cursor:'pointer'}}>
                            <CPaginationItem aria-label="Previous" onClick={() => setPagination((val) => val > 10 ? val - 10 : 10)}>
                                <span aria-hidden="true" >&laquo;</span>
                            </CPaginationItem>
                            <CPaginationItem active >{pagination / 10}</CPaginationItem>
                            {AllInvoiceData.length > pagination / 10 * 10 && <CPaginationItem onClick={() => setPagination((val) => val < AllInvoiceData.length ? val + 10 : val)}>{pagination / 10 + 1}</CPaginationItem>}
                            {AllInvoiceData.length > pagination / 10 * 20 && <CPaginationItem onClick={() => setPagination((val) => val < AllInvoiceData.length ? val + 10 : val)}>{pagination / 10 + 2}</CPaginationItem>}
                            <CPaginationItem aria-label="Next" onClick={() => setPagination((val) => val < AllInvoiceData.length ? val + 10 : val)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                        </CPagination>
    </div>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default ProductInvoice;