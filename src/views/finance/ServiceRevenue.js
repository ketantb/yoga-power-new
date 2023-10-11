import React, { useEffect ,useState} from 'react'
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
import axios from 'axios'
import { useSelector } from "react-redux";

let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;
var monthName= ["January","February","March","April","May","June","July",
"August","September","October","November","December"];
import YogaSpinnar from '../theme/YogaSpinnar'
import { useAdminValidation } from '../Custom-hook/adminValidation'


const ServiceRevenue = () => {
    let num =0

    const url1 = useSelector((el)=>el.domainOfApi) 
    const pathVal =  useAdminValidation()
    const pathValMaster =  useAdminValidation('Master')

    const [result, setResult] = useState([]);
    const [serviceRevinueData,setServiceRevenueData] = useState([])
    const [serviceName,setServiceName] = useState('')

const [newcRevenue,setRevnewData] = useState([])
const [years,setYears]= useState([])
const [selectedYear,setSelectedYear] = useState('')
const [month,setMonth] = useState('')
const [serviceData,setserviceData] = useState([])
const [pagination, setPagination] = useState(10)




    function getPackage() {
        axios.get(`${url1}/packageMaster/${pathValMaster}`, {
    
        })
            .then((res) => {
                setResult(res.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }

  
    useEffect(()=>{
        getPackage()                    
    },[])

    const getAllInvoiceData = async ()=>{

const headers   = {
    'Authorization': `Bearer ${token}`
}


        const response2 = axios.get(`${url1}/memberForm/${ pathVal }`,{headers})
        const response3 = axios.get(`${url1}/invoice/${ pathVal }`,{headers})

        const bothApiData = await Promise.all([response2,response3])

        const data = bothApiData[1].data
        const data1 = bothApiData[0].data


      const toConvertLowerCase = (service)=>{
        return ((service||'')?.toLowerCase()?.trim()||'')
      }





       const serviceAcordingToMonth   = ([...data?.reverse()?.map((el)=>{
                    return {
                       Service:toConvertLowerCase(el?.ServiceName),
                       Month:new Date(el.createdAt).getMonth(),
                       date:new Date(el.createdAt),
                       Year:new Date(el.createdAt).getFullYear()
                    }}
            
                    )
                    
                    ].sort((a,b)=>b.Month-a.Month))


         const classiFyAcordingToMonth = [...serviceAcordingToMonth].reduce((crr,el,i)=>{
            if(!crr.length){crr.push(el)}
           else if(crr?.length) {
           const val =  crr.some((el2)=>   toConvertLowerCase(el2.Service)  === toConvertLowerCase(el.Service)
            && el2.Month  === el.Month)
           if(!val){crr.push(el)}} return crr
           },[])
           setYears([...new Set(classiFyAcordingToMonth.map((el)=>el.Year))])
// console.log()


 const serviceRevenueData =  classiFyAcordingToMonth.map((el)=>{
            let amount =0
            const obj = {
               month:el.Month,
               typeOfService:toConvertLowerCase(el.Service),
               noOfClient:0,
               amount:0 ,
               date:el.date,
               year:el.Year
            }
         return   data.reduce((crr,el2,i)=>{
            if(toConvertLowerCase(el2.ServiceName) === toConvertLowerCase(el.Service) &&
             new Date(el2.createdAt).getMonth()  === el.Month){
               amount +=el2.amount
               crr.amount = amount
               return crr
            }             
            return crr
           },{...obj})
        }) 


serviceRevenueData.forEach((el)=>{
    let num =0;
    data1.forEach(el2=> {
        if(toConvertLowerCase(el2.serviceName) === toConvertLowerCase(el.typeOfService)
         && new Date(el2.createdAt).getMonth()  === el.month){
               num++
               el.noOfClient  = num 
            } 
    });
})


setServiceRevenueData(serviceRevenueData)
setserviceData([...new Set(serviceRevenueData.map((el)=>el.typeOfService))])
             

    }   

    useEffect(()=>{
      getAllInvoiceData()
    },[])
            
   
    function clearFilter(){
        setServiceName('')
        setSelectedYear('')
        setMonth('')
    }
      

    return (
        <CRow>
        <CCol lg={12} sm={12}>
            <CCard className='mb-3 border-top-success border-top-3'>
                <CCardHeader>
                    <strong className="mt-2">Revenue Service Wise</strong>
                </CCardHeader>
                <CCardBody>

                <CRow className=' mb-2' >
                          <CCol lg={4} className='mb-2'>
                            <CFormSelect value={selectedYear} onChange={(e)=>setSelectedYear(e.target.value)}>
                                <option>Select Year</option>
                                {years.map((el,i)=>{
                                    return <option key={i}>{el}</option>
                                })}  

                            </CFormSelect>
                            </CCol>
                             <CCol lg={4} className='mb-2'>
                             <CFormSelect value={month} onChange={(e)=>setMonth(e.target.value)}>
                                <option>Select Your Month </option>
                                 {monthName.map((el,i)=>{
                                    return <option key={i}>{el}</option>
                                })}                                                                                 
                           </CFormSelect>
                            </CCol >
                          
                            <CCol lg={4}  className='mb-2'>
                            <CFormSelect  id="inputGroupSelect01"
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
                                    <CTableHeaderCell scope="col">
                                       Type of Service 
                                    </CTableHeaderCell>
                                    <CTableHeaderCell scope="col">No Of Clients</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Total Amounts</CTableHeaderCell>
                                   
                        </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {serviceRevinueData.filter((el, i) => {
                                    num++                                    
                  if (pagination - 10 < i + 1 && pagination >= i + 1) {
                        return el
                }

              }).filter((el)=>{
                

                return monthName[el.month].includes(month) &&  
                (el.year+"").includes(selectedYear)&&
                el.typeOfService.includes(serviceName)   

              }).map((el,i)=>
                            <CTableRow key={i}>
                              <CTableDataCell>{i + 1 + pagination - 10}</CTableDataCell>
                                <CTableDataCell>{el.year}</CTableDataCell>
                                <CTableDataCell> {monthName[el.month]}</CTableDataCell>
                                <CTableDataCell>{el.typeOfService}</CTableDataCell>
                                <CTableDataCell>{el.noOfClient}</CTableDataCell>
                                <CTableDataCell>{el.amount}</CTableDataCell>
                              
                            </CTableRow>
                            )}
                        </CTableBody>
                    </CTable>
                    {!serviceRevinueData[0] ?
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

export default ServiceRevenue