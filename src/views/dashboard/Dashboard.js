import React, { useEffect, useState, useRef} from 'react'
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

} from '@coreui/react'
import { CChartBar, CChartLine, CChartPie,  CChart} from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import { useSelector } from 'react-redux'
import { FaEye,FaEyeSlash } from 'react-icons/fa'

import {

  cilCloudDownload,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'


import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import { Link, useNavigate } from 'react-router-dom'
import { dashboardRights } from '../hr/Rights/rightsValue/crmRightsValue'
import axios from 'axios';
import useLoginHook from './DirectLoginHook/useLoginHook'
import moment from 'moment'
import { useAdminValidation } from '../Custom-hook/adminValidation'

const CenterPartner = React.lazy(()=>import('./CenterPartner'))

const ServiceDashboard = React.lazy(()=>import('./ServiceDashboard'))
const AttendenceDashBord = React.lazy(()=>import('./AttendenceDashBord'))
const Income = React.lazy(()=>import('./Income'))
const Profite = React.lazy(()=>import('./Profite'))

const Dashboard = () => {

  

  const navigate = useNavigate()
  const rightsData = useSelector((el)=>el.empLoyeeRights?.crmRights?.crmDashboard?.rights) 
  const access = rightsData?rightsData:[]
  const isAdmin = useSelector((el)=>el.isAdmin) 
  const url = useSelector((el) => el.domainOfApi)
  const pathVal =   useAdminValidation('Master')
  
  const allEnquiresActive = (access?.includes(dashboardRights.allEnquiry)||isAdmin)
  const totalSalesAllActive = (access?.includes(dashboardRights.totalSales)||isAdmin)
  const totalClientsActive = (access?.includes(dashboardRights.totalClients)||isAdmin)

  const [dashborddata,setDashbordData] = useState({
    allEnquiry:{},
    invoice:{},
    client:{},
  })
  
  const [dateFilterObj,setDteFilterObj] = useState({
    startDate:moment(new Date(new Date().getFullYear(),0,1)).format('YYYY-MM-DD'),
    endDate:moment(new Date()).format('YYYY-MM-DD')
  })

  const [selectedYear,setSelectedYear] = useState(new Date().getFullYear())
  const inputRef = useRef()

  const user = JSON.parse(localStorage.getItem('user-info'))
  const token = user.token;

  const headers = {
    "Authorization": `Bearer ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
   }

  useEffect(() => {
    if (user == null) {
      navigate('/login')
    }
    else if (user.user.username == null || user.user.username == undefined) {
      alert('Incorrect Details')
      localStorage.clear()
    }
  }, [])


   const getDasBoardData = ()=>{
    if(!(allEnquiresActive||totalSalesAllActive||totalClientsActive)){
     return
    }
 
   axios.get(`${url}/leadDashBoard/${dateFilterObj.startDate}/${dateFilterObj.endDate}/${pathVal}`,{headers})
   .then((el)=>{
    if(el.status!==200){
      return 
     }
   setDashbordData(prev=>({...prev,...el?.data}))

 }).catch((error)=>{console.log(error)})}

   
   useEffect(()=>{
    getDasBoardData()
   },[allEnquiresActive,totalSalesAllActive,totalClientsActive])




  const progressGroupExample2 = [
    { title: 'Male', icon: cilUser, value: 53 },
    { title: 'Female', icon: cilUserFemale, value: 43 },
  ]

  const progressGroupExample3 = [
    { title: 'Male',  value: 53 },
    { title: 'Female',  value: 43 },
  ]

  console.log(Object.keys(dashborddata.allEnquiry))

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
        
          <div className='d-flex justify-content-between mb-2'>
                            <CInputGroup style={{ width: "500px" }}>

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
                                <CButton type="button" color="primary" onClick={()=>getDasBoardData()} >
                                    Go
                                </CButton>
                            </CInputGroup>
                        </div>

          <CRow>

            {  <CCol lg={4} sm={8}>
              <CCard className="mb-4 text-white">
                <CCardHeader style={{ backgroundColor: '#0B5345' }} >All Enquiries</CCardHeader>
                <CCardBody className='p-1'>
                  <CChartPie
                    data={{
                      labels: allEnquiresActive ?
                        [...Object.keys(dashborddata.allEnquiry)]:['Not availabel'],
                      datasets: [
                        {
                          data: allEnquiresActive ?
                          [...Object.values(dashborddata.allEnquiry)]:[1] ,
                          backgroundColor: 
                          allEnquiresActive ?
                          ["red", 'yellow', 'green', 'orange','#00d4ff', '#3535ff',"pink"]:['#C0C0C0'],
                          hoverBackgroundColor:
                          allEnquiresActive ?
                          [
                            "red",
                            '#F4D03F',
                            '#2ECC71',
                            '#F8C471',
                            '#0ff9fc',
                            '#1d7bff',
                            'pink'
                          ]:['#C0C0C0'],
                        },
                      ],
                    }}
                  />
                </CCardBody>
              </CCard>
            </CCol>}

            { <CCol lg={4} sm={8}>
              <CCard className="mb-4 text-white " >
                <CCardHeader style={{ backgroundColor: '#0B5345' }} >Total Sales</CCardHeader>
                <CCardBody  >
                  <CChartPie
                    data={{                   
                      labels:
                      totalSalesAllActive ?
                      [...Object.keys(dashborddata.invoice)]:['Not availabel'],
                      datasets: [
                        {
                          data: 
                            totalSalesAllActive ?
                      [...Object.values(dashborddata.invoice)]:[1],
                          backgroundColor:   totalSalesAllActive ?
                          ['darkblue', 'green', 'red']:['#C0C0C0'],
                          hoverBackgroundColor: 
                          totalSalesAllActive ?
                          [
                            'blue',
                            'lightgreen',
                            '#F1948A',
                          ]:['#C0C0C0']
                          ,
                        },
                      ],
                    }}
                  />
                </CCardBody>
              </CCard>
            </CCol>}
            {<CCol lg={4} sm={8}>
              <CCard className="mb-4 text-white">
                <CCardHeader style={{ backgroundColor: '#0B5345' }} >Total Clients</CCardHeader>
                <CCardBody className='p-2'>
                  <CChartPie
                    data={{
                      labels: totalClientsActive ?
                      [...Object.keys(dashborddata.client)]:['Not availabel'],
                      datasets: [
                        {
                          data:
                          totalClientsActive ?
                          [...Object.values(dashborddata.client)]:[1] ,
                          backgroundColor:
                          totalClientsActive ?
                          ['red', 'pink', 'green', 'yellow', 'orange', 'blue']:['#C0C0C0'],
                          hoverBackgroundColor:  totalClientsActive ?
                          [ '#FF6384',
                          'darkpick',
                          '#52BE80',
                          '#F7DC6F',
                          '#F8C471',
                          '#5499C7',]:['#C0C0C0'],
                        },
                      ],
                    }}
                  />
                </CCardBody>
              </CCard>
            </CCol>}

           
          </CRow>


        </CCardBody>
      </CCard>



      <WidgetsDropdown 
      data={access}
      isAdmin={isAdmin}
      />
      <CRow>

        <ServiceDashboard/>



        
        {(access?.includes(dashboardRights.attendance)||isAdmin)&&<CCol lg={6} sm={12}>

           < AttendenceDashBord />
        </CCol>}

      
        {(access?.includes(dashboardRights.socialMedia)||isAdmin)&&<CCol lg={6} sm={6}>
          <CCard className="mb-4">

            <CCardBody>
              <h4 id="traffic" className="card-title mb-0">
                Social Media
              </h4>
              <div className="small text-medium-emphasis mb-3">
                Traffic
              </div>
              <CRow>
                <CCol sm={6}>
                  <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                    <div className="text-medium-emphasis small">
                      Pageviews
                    </div>
                    <div className="fs-5 fw-semibold">78,623</div>
                  </div>
                </CCol>
                <CCol sm={6}>
                  <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                    <div className="text-medium-emphasis small">
                      Organic
                    </div>
                    <div className="fs-5 fw-semibold">49,123</div>
                  </div>
                </CCol>
              </CRow>

              <hr className="mt-0" />

              {progressGroupExample2.map((item, index) => (
                <div className="progress-group mb-2" key={index}>
                  <div className="progress-group-header">
                    <CIcon className="me-2" icon={item.icon} size="lg" />
                    <span>{item.title}</span>
                    <span className="ms-auto fw-semibold">
                      {item.value}%
                    </span>
                  </div>
                  <div className="progress-group-bars">
                    <CProgress thin color="warning" value={item.value} />
                  </div>
                </div>
              ))}

              <div className="mb-4"></div>

              {progressGroupExample3.map((item, index) => (
                <div className="progress-group" key={index}>
                  <div className="progress-group-header">
                    <CIcon className="me-2" icon={item.icon} size="lg" />
                    <span>{item.title}</span>
                    <span className="ms-auto fw-semibold">
                      {item.value}{' '}
                      <span className="text-medium-emphasis small">
                        ({item.percent}%)
                      </span>
                    </span>
                  </div>
                  <div className="progress-group-bars">
                    <CProgress thin color="success" value={item.percent} />
                  </div>
                </div>
              ))}
            </CCardBody>
          </CCard>
        </CCol>}

        <CRow className='my-2'>
    <CInputGroup style={{ width: "300px" }}>

    <CInputGroupText
    component="label"
    htmlFor="inputGroupSelect01"
    >
    Enter Year 
   </CInputGroupText>

   <CFormInput
    type="number"
    ref={inputRef}
  />
<CButton type="button" color="primary"  onClick={(()=>setSelectedYear(inputRef.current.value))}  >
    Go
</CButton>
</CInputGroup>
    </CRow>

        <Income  year={selectedYear}/>
        <Profite   year={selectedYear}/>

      </CRow>
      
      <CenterPartner />

  
    </>
  )
}

export default Dashboard
