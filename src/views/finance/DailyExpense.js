import React,{useState,useEffect} from 'react'
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowCircleBottom, cilArrowCircleTop, cilPlus } from '@coreui/icons'
import { useSelector } from 'react-redux'
import axios from 'axios'
import moment from 'moment/moment'
import { MdDelete } from 'react-icons/md'
import { useAdminValidation } from '../Custom-hook/adminValidation'
import { financeRight } from '../hr/Rights/rightsValue/erpRightsValue'

const DailyExpense = () => {

    const [dailyExpense,setDailyExpense] = useState([])
    const [allExpense,setAllExpense] = useState([])

    const url1 = useSelector((el)=>el.domainOfApi) 
    const rightsData = useSelector((el)=>el.empLoyeeRights?.erpRights?.erpFinance?.items
    ?.erpExpense?.items?.erpDailyExpense?.rights) 
    const access = rightsData?rightsData:[]
    const isAdmin = useSelector((el)=>el.isAdmin) 

    const [categoryName,setCategory] = useState('')
    const [selectedMonth,setSelectedMonth] = useState('')

    const pathValue = useAdminValidation()
    const pathValueMaster = useAdminValidation('Master')

    

let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;
const username = user.user.username;

var monthNaame= ["January","February","March","April","May","June","July",
    "August","September","October","November","December"]

    const getExpenseData=()=>{
        axios.get(`${url1}/dailyExpence/${pathValue}`, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      }) .then((res) => {
        setDailyExpense(res.data.reverse())
      })
      .catch((error) => {
        console.error(error)
      })
      }

useEffect(()=>{getExpenseData()},[])


function deleteExpense(id){
    console.log(id)
    if(!confirm('Do you Want to Delete'))return 

    axios.delete(`${url1}/dailyExpence/${id}`,{ 
        headers: {
            "Authorization": `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }}).then(({data})=>{
            getExpenseData()  
        })

}



function updateStatus(id,data){
    data.Status=true
    axios.post(`${url1}/dailyExpence/update/${id}`,data,{headers: {
        "Authorization": `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }}).then(({data})=>{
        getExpenseData()  
    })
}

async function  ExpenseCategory(){
try{    
const response1 =   await axios.get(`${url1}/expenseMaster/${pathValueMaster}`,{headers: {"Authorization": `Bearer ${token}`}})
setAllExpense(response1.data)
}catch(error){

}
}

useEffect(()=>{
    ExpenseCategory()
},[])

const clearFunction = ()=>{
    setSelectedMonth('')
    setCategory('')
}

const toCheckValiDate= (val)=>{
    return  (access.includes(val)||isAdmin) ?'':'none'
}

    return (
        <CRow>
            <CCol lg={12} sm={12}>
                <CCard className='mb-3 border-top-success border-top-3'>
                    <CCardHeader>
                        <strong className="mt-2">Daily Expense</strong>
                    </CCardHeader>
                    <CCardBody>
                        
                      <CRow className='pb-3'>
                        <CCol lg={4}>
                            <CFormSelect
                            value={categoryName}
                            onChange={(e)=>setCategory(e.target.value)}
                            options={["Select Category Name",...allExpense.map((el)=>el.CategoryName)]}                            
                            >                                
                            </CFormSelect>
                        </CCol>

                        <CCol lg={4}>
                            <CFormSelect
                            value={selectedMonth}
                            onChange={(e)=>setSelectedMonth(e.target.value)}
                            options={["Select month Name",...monthNaame.map((el,i)=>( {value:i,label:el}))]}                                             
                            >                                
                            </CFormSelect>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol className='pb-3'>
                        <CButton onClick={clearFunction}> Clear</CButton>
                        </CCol>
                      </CRow>

                        <CTable bordered style={{ borderColor: "#106103" }} responsive>
                            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }}>
                                <CTableRow>
                                    <CTableHeaderCell scope="col">Sr No</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Voucher Number</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">
                                        Expense Category
                                    </CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Details of Expense</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Pay Mode</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Paid By</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Paid To</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Approved By</CTableHeaderCell>
                                    <CTableHeaderCell scope="col" style={{display:toCheckValiDate(financeRight.dailyExpenseStatus)}}>Status</CTableHeaderCell>
                                    <CTableHeaderCell scope="col" style={{display:toCheckValiDate(financeRight.deleteDailyExpense)}}>Delete</CTableHeaderCell>

                             
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {dailyExpense.filter((el)=>
                                (""+new Date(el.Date).getMonth()).includes(selectedMonth)&&
                                 el.Expense_Category.includes(categoryName)
                                ).map((el,i)=>{
                                    console.log(el)
                                 return    <CTableRow>
                                    <CTableDataCell>{i+1}</CTableDataCell>
                                    <CTableDataCell>{el.Date}</CTableDataCell>
                                    <CTableDataCell>{el.Voucher_Number}</CTableDataCell>
                                    <CTableDataCell>{el.Expense_Category}</CTableDataCell>
                                    <CTableDataCell>{el.Details_Of_Expense}</CTableDataCell>
                                    <CTableDataCell>Rs {el.Amount}</CTableDataCell>
                                    <CTableDataCell>{el.Payment_Mode}</CTableDataCell>
                                    <CTableDataCell>{el.Created_By}</CTableDataCell>
                                    <CTableDataCell>{el.Paid_To}</CTableDataCell>
                                    <CTableDataCell>{el.Approved_By}</CTableDataCell>
                                    <CTableDataCell style={{display:toCheckValiDate(financeRight.dailyExpenseStatus)}}>{ el.Status?
                                    <CButton size='sm' color='success' className='text-center'onClick={()=>{updateStatus(el._id,el)}} >Done</CButton>
                                    :<CButton size='sm' color='warning' onClick={()=>{updateStatus(el._id,el)}}>Pending...</CButton>}</CTableDataCell>
                                    <CTableDataCell style={{display:toCheckValiDate(financeRight.deleteDailyExpense)}}>
                                        <CButton size='sm' color='danger' className='text-center' onClick={()=>deleteExpense(el._id)} >
                                            <MdDelete/>
                                        </CButton>
                                    </CTableDataCell>

                                </CTableRow>

                                })}
                               
                               
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default DailyExpense;