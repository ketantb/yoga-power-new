import React, { useEffect, useState } from 'react'
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CFormSelect,
  CInputGroup,
  CProgress,
  CProgressBar,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CInputGroupText,
  CFormInput,
  CNav,
  CNavItem,
  CNavLink,
  CFormCheck,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import { CChartBar, CChartLine, CChartPie } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import { useSelector } from 'react-redux'
import { FaEye,FaEyeSlash } from 'react-icons/fa'

import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilUser,
  cilUserFemale,
  cilPeople,
} from '@coreui/icons'


import { Link, useNavigate } from 'react-router-dom'
import { dashboardRights } from '../hr/Rights/rightsValue/crmRightsValue'
import axios from 'axios';
import useLoginHook from './DirectLoginHook/useLoginHook'
import moment from 'moment'
import { useAdminValidation } from '../Custom-hook/adminValidation'


const ServiceDashboard = () => {

  const user = JSON.parse(localStorage.getItem('user-info'))
  const token = user.token;

  const headers = {
    "Authorization": `Bearer ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
   }

    
  const navigate = useNavigate()
  const rightsData = useSelector((el)=>el.empLoyeeRights?.crmRights?.crmDashboard?.rights) 
  const access = rightsData?rightsData:[]
  const isAdmin = useSelector((el)=>el.isAdmin) 
  const url = useSelector((el) => el.domainOfApi)
  const pathVal =   useAdminValidation()
  const [activeKey, setActiveKey] = useState(1)
  const [eye,setEye] = useState(false)
  const [serviceType,setServiceType] = useState('in')
  const [pagination, setPagination] = useState(3)

  const [dashborddata,setDashbordData] = useState({
    service:{},
    serviceIncome:{
    }
  })
  
    const getDasCenterPartner = ()=>{
       axios.get(`${url}/serviceOverview/${pathVal}`,{headers}).then((el)=>{
        console.log(el.data)
        setDashbordData(prev=>({...prev,...el.data}))
    
       if(el.status!==200){
        return 
       }
     }).catch((error)=>{console.log(error)})
    
       }
    
       
       useEffect(()=>{
        getDasCenterPartner()
       },[])
    

  return <>
    {(access?.includes(dashboardRights.totalService)||isAdmin)&&<CCol lg={6} sm={6} >
          <CCard className="mb-4" style={{height: eye?'auto':'440px'}}>

            <CCardBody>
              <h4 id="traffic" className="card-title mb-0 mb-2">
               Service
              </h4>
              
            
              <CRow>
              <CCol sm={12} className='mt-4'  >
                  <div className="border-start border-start-4 border-start-primary py-1 px-3 mb-3">
                    <div className="text-medium-emphasis small" >
                    <h6>All Service</h6>
                    </div>
                    <div className="fs-5 fw-semibold">{dashborddata.service?.allService}</div>
                  </div>
                </CCol>
                <CCol sm={6} md={4} className='mt-4'  >
                  <div className="border-start border-start-4 border-start-primary py-1 px-3 mb-3">
                    <div className="text-medium-emphasis small" >
                     Active Service
                    </div>
                    <div className="fs-5 fw-semibold">{dashborddata.service?.activeServiceNum}</div>
                  </div>
                </CCol>
                <CCol sm={6} md={4} >                
                  <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                    <div className="text-medium-emphasis small">
                    Active In doore Service 
                    </div>
                    <div className="fs-5 fw-semibold">{dashborddata.service?.activeServiceInDoorNum}</div>
                  </div>
                </CCol>
                <CCol sm={6} md={4} >
                  <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                    <div className="text-medium-emphasis small">
                    Active  Out door Service
                    </div>
                    <div className="fs-5 fw-semibold">{dashborddata.service?.activeServiceOutDoorNum}</div>
                  </div>
                </CCol>
                <CCol sm={6} md={4} className='mt-4' >
                  <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                    <div className="text-medium-emphasis small">
                     Inactive Service
                    </div>
                    <div className="fs-5 fw-semibold">{dashborddata.service?.inactiveServiceNum}</div>
                  </div>
                </CCol>
                <CCol sm={6} md={4} >                
                  <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                    <div className="text-medium-emphasis small">
                    Inactive In doore Service 
                    
                    </div>
                    <div className="fs-5 fw-semibold">{dashborddata.service?.inactiveServiceInDoorNum}</div>
                  </div>
                </CCol>
                <CCol sm={6} md={4} >
                  <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                    <div className="text-medium-emphasis small">
                    Inactive  Out door Service
                    </div>
                    <div className="fs-5 fw-semibold">{dashborddata.service?.inactiveServiceOutDoorNum}</div>
                  </div>
                </CCol>
                <CCol className='text-end px-2 ' style={{fontSize:'30px'}}>
                   {eye?<FaEye onClick={()=>setEye(false)} />:
                   <FaEyeSlash onClick={()=>setEye(true)}/>}
                </CCol>
               
              </CRow>
             

              <div style={{
                display:eye?'block':'none'
              }}>
                              <hr className="mt-0" />


  <CNav variant="tabs" role="tablist">
      <CNavItem>
        <CNavLink
          active={activeKey === 1}
          onClick={() => setActiveKey(1)}
        >
          Active Service

        </CNavLink>
      </CNavItem>
      <CNavItem>
        <CNavLink
          active={activeKey === 2}
          onClick={() => setActiveKey(2)}
        >
          Inactive Service

        </CNavLink>
      </CNavItem>
    </CNav>
              
                  <CRow className='my-4 px-2'>
                  <CCol sm={6} >
                     <CFormCheck checked={serviceType==='in'} onChange={()=>setServiceType('in')} /> In door service 
                  </CCol>
                  <CCol sm={6}>     
                     <CFormCheck  checked={serviceType==='out'} onChange={()=>setServiceType('out')} /> Out door service
                  </CCol>
                  </CRow>


              <div style={{display:activeKey===1?'block':'none'}}>
              {dashborddata?.service?.activeService?.filter(el=>el[serviceType])?.map((el,index)=>{
                  
                  return <div  className="progress-group mb-2" key={index}>
                  <div className="progress-group-header">
                    <span>{el.service}</span>
                    <span className="ms-auto fw-semibold">
                      {el[serviceType]}
                    </span>
                  </div>
                  <div className="progress-group-bars">
                    <CProgress thin color={ serviceType==='in'?'success':"warning"} value={(el[serviceType]/dashborddata?.service?.activeServiceNum)*100} />
                  </div>
                </div>
                  
               })}
             </div>

            <div style={{display:activeKey===2?'block':'none'}}>
              {dashborddata?.service?.inactiveService?.filter(el=>el[serviceType])?.map((el,index)=>{
                  
                  return <div className="progress-group mb-2" key={index}>
                  <div className="progress-group-header">
                    <span>{el.service}</span>
                    <span className="ms-auto fw-semibold">
                      {el[serviceType]}
                    </span>
                  </div>
                  <div className="progress-group-bars">
                    <CProgress thin color={ serviceType==='in'?'success':"warning"} value={(el[serviceType]/dashborddata?.service?.inactiveServiceNum)*100} />
                  </div>
                </div>
                  
               })}

          </div>
          </div>


            </CCardBody>
          </CCard>
        </CCol>}
 {(access?.includes(dashboardRights.totalService)||isAdmin)&&<CCol lg={6} sm={12}   >
          <CCard className="mb-4" style={{height:'440px'}}>

            <CCardBody>

              <CRow >
                <CCol sm={4}>
                  <h4 id="traffic" className="card-title mb-0">
                   Service Income
                  </h4>
                
                </CCol>
                <CCol sm={4}>
                  <div className="border-start border-start-4 border-start-info py-1 px-3">
                    <div className="text-medium-emphasis small">
                     Total Sales
                    </div>
                    <div className="fs-5 fw-semibold">{
                      (dashborddata.serviceIncome?.allServiceIncomeData?.reduce((crr,el)=>crr+el.amount,0)||0) +" Rs"
                    }</div>
                  </div>
                </CCol>
                <CCol sm={4}>
                  <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                    <div className="text-medium-emphasis small">
                     Total Colected
                    </div>
                    <div className="fs-5 fw-semibold">{
                    (dashborddata.serviceIncome?.allServiceIncomeData?.reduce((crr,el)=>crr+el.colectedAmount,0) ||0) +" Rs"

                    }</div>
                  </div>
                </CCol>
              </CRow>

              <CRow>
                <CCol xs={12} md={12} xl={12} >

                  <hr className="mt-0" />
                  {dashborddata.serviceIncome?.allServiceIncomeData?.
            filter((el, i) => {
                  if (pagination - 3 < i + 1 && pagination >= i + 1) {
                        return el
                      }
              })?.map((item, index) => (
                    <div className=" mb-1" key={index}>
                      <div className="progress-group-prepend">
                        <h6 className="text-medium-emphasis ">
                          {item.serviceName}
                        </h6>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress  >
                          <CProgressBar color="success" value={(item.colectedAmount/item.amount)*100} />
                          <CProgressBar color="info" value={100} />
                        </CProgress>
                      </div>
                      <div className="progress-group-prepend text-end ">
                        <span className="ms-auto fw-semibold text-success me-5">
                          {item.colectedAmount} Rs                        
                        </span> 
                        <span className="ms-auto fw-semibold text-info text-end" >
                          {item.amount}  Rs     
                        </span>
                      </div>
                    </div>
                  ))}
                </CCol>
                <div className='d-flex justify-content-center mt-3' >
                        <CPagination size='sm' aria-label="Page navigation example" style={{cursor:'pointer'}}>
                            <CPaginationItem aria-label="Previous" onClick={() => setPagination((val) => val > 3 ? val - 3 : 3)}>
                                <span aria-hidden="true" >&laquo;</span>
                            </CPaginationItem>
                            <CPaginationItem active >{pagination / 3}</CPaginationItem>
                            {dashborddata.serviceIncome?.allServiceIncomeData?.length > pagination / 3 * 3 && <CPaginationItem onClick={() => setPagination((val) => val < dashborddata.serviceIncome?.allServiceIncomeData?.length ? val + 3 : val)}>{pagination / 3 + 1}</CPaginationItem>}
                            {dashborddata.serviceIncome?.allServiceIncomeData?.length > pagination / 3* 6 && <CPaginationItem onClick={() => setPagination((val) => val < dashborddata.serviceIncome?.allServiceIncomeData?.length ? val + 3 : val)}>{pagination / 3 + 2}</CPaginationItem>}
                            <CPaginationItem aria-label="Next" onClick={() => setPagination((val) => val < dashborddata.serviceIncome?.allServiceIncomeData?.length ? val + 3 : val)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                        </CPagination>
               </div>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>}
    </> 
}

export default ServiceDashboard
