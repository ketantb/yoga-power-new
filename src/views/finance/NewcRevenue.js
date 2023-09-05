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
import {useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'


let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;
const url = 'https://yog-seven.vercel.app'
import YogaSpinnar from '../theme/YogaSpinnar'
import { useAdminValidation } from '../Custom-hook/adminValidation'

const NewcRevenue = () => {
    let num =0

const [newcRevenue,setRevnewData] = useState([])
const [years,setYears]= useState([])
const [selectedYear,setSelectedYear] = useState('')
const [month,setMonth] = useState('')
const [serviceName,setServiceName] = useState('')
const [serviceData,setserviceData] = useState([])
const [pagination, setPagination] = useState(10)
const url1 = useSelector((el)=>el.domainOfApi) 
const pathVal =  useAdminValidation()
const [paging, setPaging] = useState(0);


var monthName= ["January","February","March","April","May","June","July",
"August","September","October","November","December"];


   const headers = {
    'Authorization': `Bearer ${token}`,
    'My-Custom-Header': 'foobar'
   };

  

const getAllData = async  ()=>{
try{
const response1 = axios.get(`${url1}/invoice/${pathVal}`,{headers})
const response2 = axios.get(`${url1}/memberForm/${pathVal}`,{headers})
const response3 = axios.get(`${url1}/enquiryForm/${pathVal}`,{headers})
      
const allApiData = await Promise.all([response1,response2,response3])

const invoiceData = allApiData[0].data
const clientData = allApiData[1].data
const enquiryData = allApiData[2].data 
const toConvertLowerCase = (service)=>{
    return ((service||'')?.toLowerCase()?.trim()||'')
  }

const serviceAcordingToMonth   = ([...enquiryData.filter((list) => list)?.reverse()?.map((el)=>{
                return {
                   Service:toConvertLowerCase(el?.ServiceName),
                   Month:new Date(el.createdAt).getMonth(),
                   Year:new Date(el.createdAt).getFullYear()
                }}       
)].sort((a,b)=>b.Month-a.Month))         


const classiFyAcordingToMonth = [...serviceAcordingToMonth].reduce((crr,el,i)=>{
    if(!crr.length){crr.push(el)}
   else if(crr?.length) {
   const val =  crr.some((el2)=>  toConvertLowerCase(el2.Service)  === toConvertLowerCase(el.Service) && el2.Month  === el.Month)
   if(!val){crr.push(el)}} return crr
},[])


 const serviceRevenueData =  classiFyAcordingToMonth.map((el)=>{
    let num =0;
    const obj = {
       month:el.Month,
       typeOfService:toConvertLowerCase(el.Service),
       noOfClient:0,
       noOfLeads:0,
       amount:0 ,
       date:el.date,
       year:el.Year
    }
 return   enquiryData.reduce((crr,el2)=>{
    if(toConvertLowerCase(el2.ServiceName) === toConvertLowerCase(el.Service) &&
     new Date(el2.createdAt).getMonth()  === el.Month){
        num++
       crr.noOfLeads  = num 
       return crr
    }             
    return crr
   },{...obj})
}) 

const FilterFirstInvoiceData = [...clientData.filter((list) => list)].map((el)=>{
            return invoiceData.find((el1)=>el._id===el1.MemberId)
}).filter((el)=>el)
        



    serviceRevenueData.forEach(element => {
            let num =0
        clientData.forEach((el)=>{
        if(toConvertLowerCase(element.typeOfService)===toConvertLowerCase(el.serviceName) 
        && new Date(el.createdAt).getMonth()  === element.month){
        num++
        element.noOfClient = num
        }
        })
    })

    setserviceData([...new Set(serviceRevenueData.map((el)=>el.typeOfService))])
    serviceRevenueData.forEach(element => {    
        let amount =0
    FilterFirstInvoiceData.forEach((el)=>{
        if(toConvertLowerCase(element.typeOfService)===toConvertLowerCase(el.ServiceName) &&
         new Date(el.createdAt).getMonth()  === element.month ){
             amount += el.amount
            element.amount = amount
    }})  
    })
setRevnewData(serviceRevenueData)    



const AllYear = [...serviceRevenueData,  {Year:2022,Month:2},{Year:2021,Month:5}].reduce((crr,el,i)=>{
    if(!crr.length){crr.push(el)}
   else if(crr?.length) {
   const val =  crr.some((el2)=>   el2.Year  === el.Year && el2.Month  === el.Month)
   if(!val){crr.push(el)}} return crr
   },[])

setYears([...new Set(AllYear.map((el)=>el.year)).filter((el)=>el)])
}catch{

}

}

function getPackage() {
    axios.get(`${url1}/packagemaster`, {headers

    })
        .then((res) => {
            setserviceData(res.data)
            console.log(res.data)
        })
        .catch((error) => {
            console.error(error)
        })
}
useEffect(()=>{
getAllData()
getPackage()                    
},[])


function clearFilter(){
    setServiceName('')
    setSelectedYear('')
    setMonth('')
}




useEffect(()=>{
    setPagination(10)
},[years,selectedYear,month])

function totfilterData(data){
    const filterData = data.filter((el)=>{
        return  el?.counseller?.includes(staffS)
    })
   return filterData
}    


    return (
        <CRow>
            <CCol lg={12} sm={12}>
                <CCard className='mb-3 border-top-success border-top-3'>
                    <CCardHeader>
                        <strong className="mt-2">New Client Revenue</strong>
                    </CCardHeader>
                    <CCardBody>
                    <CRow className=' mb-2' >
                        <CCol lg={4} className='mb-2'>
                            <CFormSelect value={selectedYear} onChange={(e)=>setSelectedYear(e.target.value)}>
                                <option>slecte Year</option>
                                {years.map((el)=>{
                                    return <option>{el}</option>
                                })}  

                            </CFormSelect>
                            </CCol>
                             <CCol lg={4} className='mb-2'>
                             <CFormSelect value={month} onChange={(e)=>setMonth(e.target.value)}>
                                <option>Select Your Month </option>
                                 {monthName.map((el)=>{
                                    return <option>{el}</option>
                                })}                                                                                 
                           </CFormSelect>
                            </CCol >
                          
                            <CCol lg={4}  className='mb-2'>
                            <CFormSelect  value={serviceName} id="inputGroupSelect01"
                                     onChange={(e)=>setServiceName(e.target.value)}
                                    >
                                    <option>Select Service</option>
                                        {serviceData.map((item, index) => (
                                             (
                                                (
                                                    <option key={index}>{item}</option>                                                  
                                                )
                                            
                                            )))}
                                    </CFormSelect>
                        </CCol>
                        
                        </CRow>
                        <CRow>
                            <CCol className='px-3 mb-3'>
                            <CButton onClick={(e)=>clearFilter(e.target.value)}>Clear Filter</CButton>
                            </CCol>
                        </CRow>
                       
                        <CTable bordered style={{ borderColor: "#106103" }} responsive>
                            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }}>
                                <CTableRow>
                                    <CTableHeaderCell scope="col">Sr No</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Year</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Month</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Type of Service</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">
                                        No of Leads
                                    </CTableHeaderCell>
                                    <CTableHeaderCell scope="col">No of clients</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {newcRevenue.filter((el)=>{
                                   const validation = monthName[el.month].includes(month) &&  
                                    (el.year+"").includes(selectedYear)&&
                                    el.typeOfService.includes(serviceName) 
                                    if( validation){
                                        num =0
                                    }
                                return    validation
                    
                                }).slice(paging * 10, paging * 10 + 10).map((el,i)=>{
                               return <CTableRow key={i}>
                                <CTableDataCell>{i+1}</CTableDataCell>
                                    <CTableDataCell>{el.year}</CTableDataCell>
                                    <CTableDataCell>{monthName[el.month]}</CTableDataCell>
                                    <CTableDataCell>{el.typeOfService}</CTableDataCell>
                                    <CTableDataCell>{el.noOfLeads}</CTableDataCell>
                                    <CTableDataCell>{el.noOfClient}</CTableDataCell>     
                                    <CTableDataCell>Rs {el.amount}</CTableDataCell>                                                             
                                </CTableRow>
                                })}
                                
                            </CTableBody>
                        </CTable>
                        {!newcRevenue[0] ?
                                <CCol style={{ width: '100%' }} className='d-flex justify-content-center my-3'>
                                    <YogaSpinnar />
                         </CCol> : ''}
                        <div className='d-flex justify-content-center mt-3' >

                        <CPagination aria-label="Page navigation example" align="center" className='mt-2'>
                            <CPaginationItem aria-label="Previous" disabled={paging != 0 ? false : true} onClick={() => paging > 0 && setPaging(paging - 1)}>
                                <span aria-hidden="true">&laquo;</span>
                            </CPaginationItem>
                            <CPaginationItem active onClick={() => setPaging(0)}>{paging + 1}</CPaginationItem>
                            {totfilterData(newcRevenue).length > (paging + 1) * 10 && <CPaginationItem onClick={() => setPaging(paging + 1)} >{paging + 2}</CPaginationItem>}

                            {totfilterData(newcRevenue).length > (paging + 2) * 10 && <CPaginationItem onClick={() => setPaging(paging + 2)}>{paging + 3}</CPaginationItem>}
                            {totfilterData(newcRevenue).length > (paging + 1) * 10 ?
                                <CPaginationItem aria-label="Next" onClick={() => setPaging(paging + 1)}>
                                    <span aria-hidden="true">&raquo;</span>
                                </CPaginationItem>
                                : <CPaginationItem disabled aria-label="Next" onClick={() => setPaging(paging + 1)}>
                                    <span aria-hidden="true">&raquo;</span>
                                </CPaginationItem>
                            }
                        </CPagination>
      </div>
                
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default NewcRevenue