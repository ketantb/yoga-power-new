import React, { useEffect,useState } from 'react'
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
  CInputGroup,
  CInputGroupText,
  CFormInput,
  CButton
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'
import { FaEye } from 'react-icons/fa'
import { dashboardRights } from '../hr/Rights/rightsValue/crmRightsValue'
import { useSelector } from 'react-redux'
import axios from 'axios'
const WidgetsDropdown = ({data,isAdmin}) => {

  const user = JSON.parse(localStorage.getItem('user-info'))
  const token = user.token;
  
  const url = useSelector((el) => el.domainOfApi)


  const [dashborddata,setDashbordData] = useState({
    memBerActivity:{
      month:{}
    },
    dailyExpense:{
      month:{}
    },
    collection:{
      month:{}
    }
  })
  const [selectedYear,setSelectedYear] = useState(new Date().getFullYear())

  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]


  const headers = {
    "Authorization": `Bearer ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
   }
  
    const getDasCenterPartner = ()=>{
      console.log('hello')
       axios.get(`${url}/serviceActivity/${selectedYear}/all`,{headers}).then((el)=>{
        console.log(el.data)
        setDashbordData(el.data)
       if(el.status!==200){
        return 
       }
     }).catch((error)=>{console.log(error)})
    
       }
    
       
       useEffect(()=>{
        getDasCenterPartner()
       },[])



  return (
    <>
  
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
    value={selectedYear}
    onChange={(e)=>setSelectedYear(e.target.value)}
  />
<CButton type="button" color="primary" onClick={()=> getDasCenterPartner()} >
    Go
</CButton>
</CInputGroup>
    </CRow>
    <CRow>

      {(data.includes(dashboardRights.members)||isAdmin)&& <CCol sm={8} lg={4}>
        <CWidgetStatsA
          className="mb-4"
          style={{ backgroundColor: 'red', color: "white" }}
          value={
            <>
              {dashborddata?.memBerActivity?.year}
              <span className="fs-6 fw-normal">
                ({ " "+month[new Date().getMonth()]} <CIcon icon={

              (Math.max(...Object.values(dashborddata?.memBerActivity?.month))=== 
              dashborddata?.memBerActivity?.month[month[new Date().getMonth()]]?cilArrowTop:
                 cilArrowBottom)
                  
                  } />)
              </span>
            </>
          }
          title="Members"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle
                color="transparent"
                caret={false}
                className="p-0"
              >
                <FaEye
                  size='25px'
                  className="text-high-emphasis-inverse" />

              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: [...Object.keys(dashborddata?.memBerActivity?.month)],
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'white',
                    borderColor: 'rgba(255,255,255)',
                    pointBackgroundColor: getStyle('--cui-red'),
                    data: [...Object.values(dashborddata?.memBerActivity?.month)],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    min: (Math.min(...Object.values(dashborddata?.memBerActivity?.month))-
                    Math.max(...Object.values(dashborddata?.memBerActivity?.month))/100*10),
                    max: (Math.max(...Object.values(dashborddata?.memBerActivity?.month))
                    +Math.max(...Object.values(dashborddata?.memBerActivity?.month))/100*10),
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                    tension: 0.4,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 4,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
        
      </CCol>}
      {(data.includes(dashboardRights.collection)||isAdmin)&& <CCol sm={8} lg={4}>
        <CWidgetStatsA
          className="mb-4"
          color="info"
          value={
           
            <>
              {dashborddata?.collection?.year}

              <span className="fs-6 fw-normal">
                ({ " "+month[new Date().getMonth()]} <CIcon icon={

              (Math.max(...Object.values(dashborddata?.collection?.month))=== 
              dashborddata?.collection?.month[month[new Date().getMonth()]]?cilArrowTop:
                 cilArrowBottom)
                  
                  } />)
              </span>
            </>
          }
          title="Collection"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle
                color="transparent"
                caret={false}
                className="p-0"
              >
                <CIcon
                  icon={cilOptions}
                  className="text-high-emphasis-inverse"
                />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: [...Object.keys(dashborddata?.collection?.month)],
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-info'),
                    data: [...Object.values(dashborddata?.collection?.month)],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {

                    min: (Math.min(...Object.values(dashborddata?.collection?.month))-
                    Math.max(...Object.values(dashborddata?.collection?.month))/100*10),
                    max: (Math.max(...Object.values(dashborddata?.collection?.month))
                    +Math.max(...Object.values(dashborddata?.collection?.month))/100*10),

                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>}
      {(data.includes(dashboardRights.expense)||isAdmin)&& <CCol sm={8} lg={4}>
        <CWidgetStatsA
          className="mb-4"
          color="warning"
          value={
            
            <>
              {dashborddata?.dailyExpense?.year}
              <span className="fs-6 fw-normal">
                ({ " "+month[new Date().getMonth()]} <CIcon icon={

              (Math.max(...Object.values(dashborddata?.dailyExpense?.month))=== 
              dashborddata?.dailyExpense?.month[month[new Date().getMonth()]]?cilArrowTop:
                 cilArrowBottom)
                  
                  } />)
              </span>
            </>
          }
          title="Expense"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle
                color="transparent"
                caret={false}
                className="p-0"
              >
                <CIcon
                  icon={cilOptions}
                  className="text-high-emphasis-inverse"
                />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              className="mt-3"
              style={{ height: '70px' }}
              data={{
                labels: [...Object.keys(dashborddata?.dailyExpense?.month)],
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: [...Object.values(dashborddata?.dailyExpense?.month)],
                    fill: true,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    display: false,
                  },
                  y: {
                    min: (Math.min(...Object.values(dashborddata?.dailyExpense?.month))-
                    Math.max(...Object.values(dashborddata?.dailyExpense?.month))/100*10),
                    max: (Math.max(...Object.values(dashborddata?.dailyExpense?.month))
                    +Math.max(...Object.values(dashborddata?.dailyExpense?.month))/100*10),
                    display: false,
                  },
                },
                elements: {
                  line: {
                    borderWidth: 2,
                    tension: 0.4,
                  },
                  point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>}
      {/* {(data.includes(dashboardRights.profit)||isAdmin)&& <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="success"
          value={
            <>
              44K{' '}
              <span className="fs-6 fw-normal">
                (-23.6% <CIcon icon={cilArrowBottom} />)
              </span>
            </>
          }
          title="Profit"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle
                color="transparent"
                caret={false}
                className="p-0"
              >
                <CIcon
                  icon={cilOptions}
                  className="text-high-emphasis-inverse"
                />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartBar
              className="mt-3 mx-3"
              style={{ height: '70px' }}
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
                  'September',
                  'October',
                  'November',
                  'December',
                  'January',
                  'February',
                  'March',
                  'April',
                ],
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: [
                      78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84,
                      67, 82,
                    ],
                    barPercentage: 0.6,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    grid: {
                      display: false,
                      drawBorder: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
              }}
            />
          }
        />
      </CCol>} */}
    </CRow>
    </>
  )
}

export default WidgetsDropdown
