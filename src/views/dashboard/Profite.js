
import React, { useEffect,useState }  from 'react'
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CProgressBar,
  CProgress,
  CButton,
  CCardHeader
} from '@coreui/react'
import { CChartBar,CChart } from '@coreui/react-chartjs'
import { dashboardRights } from '../hr/Rights/rightsValue/crmRightsValue'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { getStyle, hexToRgba } from '@coreui/utils'
import { useAdminValidation } from '../Custom-hook/adminValidation'



const Profite = ({year}) => {
    const url = useSelector((el)=>el.domainOfApi) 
    const pathVal =   useAdminValidation('Master')

    
    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;
  
    const headers = {
      headers: {
          "Authorization": `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      }
  }

    const rightsData = useSelector((el)=>el.empLoyeeRights?.crmRights?.crmDashboard?.rights)
    const isAdmin = useSelector((el)=>el.isAdmin)  
    const access = rightsData?rightsData:[]

    const month = {
        'January':0,
        'February':0,
        'March':0,
        'April':0,
        'May':0,
        'June':0,
        'July':0,
        'August':0,
        'September':0,
        'October':0,
        'November':0,
        'December':0,
    }

    const [profiteData,setProfiteData] = useState({
        expense:{ year:new Date().getFullYear(), month:month},
        collection:{year:new Date().getFullYear(), month:month}
    })

    
    const getProfiteData = async ()=>{

        try{  
            const response = await  axios.get(`${url}/profite/${year}/${pathVal}`,headers)

            if(response.status!==200){
            return 
            }
            setProfiteData(response.data)
            }catch(error){
              console.error(error)
             }

    }

    useEffect(()=>{
        getProfiteData()
    },[year])

  return (
    (access?.includes(dashboardRights.profit)||isAdmin)&&<CCol lg={6} sm={12}>
    <CCard>
     <CCardHeader>
       <h5>Profite</h5>
     </CCardHeader>
     <CCardBody>
     <CChart
     type="line" 
data={{
labels: [...Object.keys(month)],
datasets: [
 {
   label: "Profite",
   backgroundColor: '#59EA95',
   borderColor: "#41CFBF",
   pointBackgroundColor: "#59EA95",
   pointBorderColor: "#fff",
   data: [...Object.values(profiteData.collection.month)]
 },
 {
   label: "Expense",
   backgroundColor: "#F46E7D",
   borderColor: "#EACD59",
   pointBackgroundColor: "#F46E7D",
   pointBorderColor: "#fff",
   data: [...Object.values(profiteData.expense.month)]
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
   </CCol>
  )
}

export default Profite
