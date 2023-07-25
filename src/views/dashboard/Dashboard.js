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
const ServiceDashboard = React.lazy(()=>import('./ServiceDashboard'))
const AttendenceDashBord = React.lazy(()=>import('./AttendenceDashBord'))

const Dashboard = () => {

  const navigate = useNavigate()
  const rightsData = useSelector((el)=>el.empLoyeeRights?.crmRights?.crmDashboard?.rights) 
  const access = rightsData?rightsData:[]
  const isAdmin = useSelector((el)=>el.isAdmin) 
  const url = useSelector((el) => el.domainOfApi)
  const pathVal =   useAdminValidation('Master')
  const [dashborddata,setDashbordData] = useState({
    allEnquiry:{},
    invoice:{},
    client:{},
    service:{}
  })
  
 
  const [centerPartnerData,setCenterPartnerData] = useState([])
  const [dateFilterObj,setDteFilterObj] = useState({
    startDate:moment(new Date(new Date().getFullYear(),new Date().getMonth(),1)).format('YYYY-MM-DD'),
    endDate:moment(new Date()).format('YYYY-MM-DD')
  })

  const functionToDirectLogin = useLoginHook()

  
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


  const getDasCenterPartner = ()=>{
    axios.get(`${url}/signup/center-patner`,{headers}).then((el)=>{
      setCenterPartnerData(el.data)
     if(el.status!==200){
      return 
     }
   }).catch((error)=>{console.log(error)})

   }

   
   useEffect(()=>{
    getDasCenterPartner()
   },[])

   const getDasBoardData = ()=>{
 
   axios.get(`${url}/leadDashBoard/${dateFilterObj.startDate}/${dateFilterObj.endDate}/${pathVal}`,{headers})
   .then((el)=>{
    if(el.status!==200){
      return 
     }
   setDashbordData(prev=>({...prev,...el?.data}))

 }).catch((error)=>{console.log(error)})

   }

   
   useEffect(()=>{
    getDasBoardData()
   },[])




  const progressGroupExample1 = [
    { title: 'Monday', value1: 34, value2: 78 },
    { title: 'Tuesday', value1: 56, value2: 94 },
    { title: 'Wednesday', value1: 12, value2: 67 },
    { title: 'Thursday', value1: 43, value2: 91 },
    { title: 'Friday', value1: 22, value2: 73 },
    { title: 'Saturday', value1: 53, value2: 82 },
    { title: 'Sunday', value1: 9, value2: 69 },
  ]

  const progressGroupExample2 = [
    { title: 'Male', icon: cilUser, value: 53 },
    { title: 'Female', icon: cilUserFemale, value: 43 },
  ]

  const progressGroupExample3 = [
    { title: 'Male',  value: 53 },
    { title: 'Female',  value: 43 },
  ]



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

            {(access?.includes(dashboardRights.allEnquiry)||isAdmin)  &&<CCol lg={4} sm={8}>
              <CCard className="mb-4 text-white">
                <CCardHeader style={{ backgroundColor: '#0B5345' }} >All Enquiries</CCardHeader>
                <CCardBody className='p-1'>
                  <CChartPie
                    data={{
                      labels: [...Object.keys(dashborddata.allEnquiry)],
                      datasets: [
                        {
                          data: [...Object.values(dashborddata.allEnquiry)],
                          backgroundColor: ['red', 'yellow', 'green', 'orange','#00d4ff', '#3535ff',],
                          hoverBackgroundColor: [
                            '#ef6052',
                            '#F4D03F',
                            '#2ECC71',
                            '#F8C471',
                            '#0ff9fc',
                            '#1d7bff',
                          ],
                        },
                      ],
                    }}
                  />
                </CCardBody>
              </CCard>
            </CCol>}

            {(access?.includes(dashboardRights.totalSales)||isAdmin)  && <CCol lg={4} sm={8}>
              <CCard className="mb-4 text-white " >
                <CCardHeader style={{ backgroundColor: '#0B5345' }} >Total Sales</CCardHeader>
                <CCardBody  >
                  <CChartPie
                    data={{                   
                      labels: [...Object.keys(dashborddata.invoice)],
                      datasets: [
                        {
                          data: [...Object.values(dashborddata.invoice)],
                          backgroundColor: ['darkblue', 'green', 'red'],
                          hoverBackgroundColor: [
                            'blue',
                            'lightgreen',
                            '#F1948A',
                          ],
                        },
                      ],
                    }}
                  />
                </CCardBody>
              </CCard>
            </CCol>}
            {(access?.includes(dashboardRights.totalClients)||isAdmin)&&<CCol lg={4} sm={8}>
              <CCard className="mb-4 text-white">
                <CCardHeader style={{ backgroundColor: '#0B5345' }} >Total Clients</CCardHeader>
                <CCardBody className='p-2'>
                  <CChartPie
                    data={{
                      labels: [...Object.keys(dashborddata.client)],
                      datasets: [
                        {
                          data: [...Object.values(dashborddata.client)],
                          backgroundColor: ['red', 'pink', 'green', 'yellow', 'orange', 'blue',],
                          hoverBackgroundColor: [
                            '#FF6384',
                            'darkpick',
                            '#52BE80',
                            '#F7DC6F',
                            '#F8C471',
                            '#5499C7',
                          ],
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

    

        {(access?.includes(dashboardRights.income)||isAdmin)&&<CCol lg={6} sm={12}>
          <CCard className="mb-4">
            <CCardBody>
              <CRow>
                <CCol sm={5} className='mb-2'>
                  <h4 id="traffic" className="card-title mb-0">
                    Income
                  </h4>
                  <div className="small text-medium-emphasis">
                    January - July 2021
                  </div>
                </CCol>
                <CCol sm={7} className="d-none d-md-block">
                  <CButton color="primary" className="float-end">
                    <CIcon icon={cilCloudDownload} />
                  </CButton>
                  <CButtonGroup className="float-end me-3">
                    {['Day', 'Month', 'Year'].map((value) => (
                      <CButton
                        color="outline-secondary"
                        key={value}
                        className="mx-0"
                        active={value === 'Month'}
                      >
                        {value}
                      </CButton>
                    ))}
                  </CButtonGroup>
                </CCol>
              </CRow>
              <CChartBar
                data={{
                  labels: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'Sep',
                  ],
                  value: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'Sep',
                  ],
                  datasets: [
                    {
                      label: 'Monthly Sales',
                      backgroundColor: 'darkgreen',
                      data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 100],
                    },
                  ],
                }}
                labels="months"
                value="value"
              />
              <CCard style={{ marginRight: '10px', marginLeft: '40px', backgroundColor: 'darkgreen', color: 'white', paddingLeft: '10px', paddingRight: '10px' }}>
                <div className='d-flex justify-content-between'>
                  <label>40</label>
                  <label>20</label>
                  <label>12</label>
                  <label>39</label>
                  <label>10</label>
                  <label>40</label>
                  <label>39</label>
                  <label>80</label>
                  <label>40</label>
                </div>
              </CCard>
            </CCardBody>
          </CCard>
        </CCol>}

        {(access?.includes(dashboardRights.profit)||isAdmin)&&<CCol lg={6} sm={12}>
         <CCard>
          <CCardHeader>
            <h5>Profite</h5>
          </CCardHeader>
          <CCardBody>
          <CChart
          type="line" 
  data={{
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgba(220, 220, 220, 0.2)",
        borderColor: "rgba(220, 220, 220, 1)",
        pointBackgroundColor: "rgba(220, 220, 220, 1)",
        pointBorderColor: "#fff",
        data: [40, 20, 12, 39, 10, 40, 39, 80, 40]
      },
      {
        label: "My Second dataset",
        backgroundColor: "rgba(151, 187, 205, 0.2)",
        borderColor: "rgba(151, 187, 205, 1)",
        pointBackgroundColor: "rgba(151, 187, 205, 1)",
        pointBorderColor: "#fff",
        data: [50, 12, 28, 29, 7, 25, 12, 70, 60]
      },
    ],
  }}
  options={{
    plugins: {
      legend: {
        labels: {
          color: getStyle('--cui-body-color'),
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: getStyle('--cui-border-color-translucent'),
        },
        ticks: {
          color: getStyle('--cui-body-color'),
        },
      },
      y: {
        grid: {
          color: getStyle('--cui-border-color-translucent'),
        },
        ticks: {
          color: getStyle('--cui-body-color'),
        },
      },
    },
            }}/>
          </CCardBody>
         </CCard>
        </CCol>}

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

      </CRow>
     

      <CRow>
        {(isAdmin) && <CCol >
          <CCard className="mb-4">
            <CCardHeader>Admin panel</CCardHeader>
            <CCardBody>
              <CTable align="middle" bordered style={{ borderColor: "#106103" }} hover responsive>
                <CTableHead style={{ backgroundColor: '#0B5345',color: "white"}}  >
                  <CTableRow>                 
                    <CTableHeaderCell>Sr.No</CTableHeaderCell>
                    <CTableHeaderCell>Brand Logo</CTableHeaderCell>
                    <CTableHeaderCell>Center Name</CTableHeaderCell>
                    <CTableHeaderCell>Partner Profile</CTableHeaderCell>
                    <CTableHeaderCell>Types Of Partner</CTableHeaderCell>
                    <CTableHeaderCell>Location</CTableHeaderCell>
                    <CTableHeaderCell>City</CTableHeaderCell>
                    <CTableHeaderCell>Country</CTableHeaderCell>
                    <CTableHeaderCell>Packege</CTableHeaderCell>
                    <CTableHeaderCell>EXP. Date</CTableHeaderCell>
                    <CTableHeaderCell>View</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {centerPartnerData.map((el, index) => (
                      <CTableRow className="text-center"  >
                      <CTableDataCell>
                        {index+1}
                      </CTableDataCell>
                      <CTableDataCell >
                        <div 
                        className="border-gray rounded-circle"
                        style={{width:'100px'}}
                        >
                          <img
                          width='100%'
                          src={el.brandLogo}
                          />

                        </div>
                      </CTableDataCell>
                      <CTableDataCell>   
                        {el.center}                                 
                      </CTableDataCell>
                    
                      <CTableDataCell>  
                        <Link to={`/profile/${el._id}`}> {el.username}   </Link>                                                                    
                      </CTableDataCell>   
                    
                      <CTableDataCell>     
                        {el.typeOfPartner}                                                                   
                      </CTableDataCell> 
                      <CTableDataCell>     
                        {el.location}        
                      </CTableDataCell>
                      <CTableDataCell>   
                        {el.city}                                                                     
                      </CTableDataCell>  
                      <CTableDataCell>   
                        {el.country}          
                     
                      </CTableDataCell>
                      <CTableDataCell>    
                        {el.packege}                                                                    
                      </CTableDataCell>                                                
                                          
                      <CTableDataCell>    
                         {new Date(el.expDate).toDateString()}                                                                               
                      </CTableDataCell>
                      <CTableDataCell>    
                        <CButton onClick={()=>functionToDirectLogin(el.email,el.password)} >View </CButton>
                      </CTableDataCell>
                    
                  </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>}
      </CRow>
    </>
  )
}

export default Dashboard
