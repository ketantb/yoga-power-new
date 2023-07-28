import React, { useEffect,useState }  from 'react'
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CProgressBar,
  CProgress,
  CButton
} from '@coreui/react'
import { CChartBar } from '@coreui/react-chartjs'
import { dashboardRights } from '../hr/Rights/rightsValue/crmRightsValue'
import { useSelector } from 'react-redux'
import axios from 'axios'

import { useAdminValidation } from '../Custom-hook/adminValidation'


const Income = ({year}) => {

    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;
  
    const headers = {
      headers: {
          "Authorization": `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      }
  }
    const url = useSelector((el)=>el.domainOfApi) 

    const rightsData = useSelector((el)=>el.empLoyeeRights?.crmRights?.crmDashboard?.rights)
    const isAdmin = useSelector((el)=>el.isAdmin)  
    const access = rightsData?rightsData:[]
    const [showInfoCard,setInfoCard] = useState('none')
    const pathVal =   useAdminValidation('Master')


    const [income,setIncome] = useState({
        collection:{
            month:{
                'January':{target:0,achived:0},
                'February':{target:0,achived:0,},
                'March':{target:0,achived:0, },
                'April':{target:0,achived:0},
                'May':{target:0,achived:0},
                'June':{target:0,achived:0},
                'July':{target:0, achived:0},
                'August':{target:0,achived:0},
                'September':{target:0,achived:0},
                'October':{target:0,achived:0},
                'November':{target:0,achived:0},
                'December':{target:0,achived:0,},
            },
            year:new Date().getFullYear()
        }
    })

    const getIncomeData = async ()=>{

        try{  
            const {data} = await  axios.get(`${url}/income/${year}/${pathVal}`,headers)
            setIncome(data)
            }catch(error){
              console.error(error)
             }

    }

    useEffect(()=>{
      getIncomeData()
    },[year])


  return (  (access?.includes(dashboardRights.income)||isAdmin) && 
  <CCol lg={6} sm={12}  className='mb-4'>

  <CCard>   
      <CCardBody>

        <CRow >
          <CCol sm={4}>
            <h4 id="traffic" className="card-title mb-0">
               Income
            </h4>
            <div className="small text-medium-emphasis mb-3">
            <h6 id="traffic" className="card-title mb-0">
            Year {income.collection.year}
            </h6>
           </div>
          </CCol>
          <CCol sm={4}>
            <div className="border-start border-start-4 border-start-info py-1 px-3 mb-3">
              <h6 className="text-medium-emphasis ">
                 Given Target 
              </h6>
              <div className="fs-5 fw-semibold">{Object.values(income.collection.month).reduce((cr,e)=>cr+e.target,0)} Rs</div>
            </div>
          </CCol>
          <CCol sm={4}>
            <div className="border-start border-start-4 border-start-success py-1 px-3">
              <h6 className="text-medium-emphasis ">
                Achived Target
              </h6>
              <div className="fs-5 fw-semibold">{Object.values(income.collection.month).reduce((cr,e)=>cr+e.achived,0)} Rs</div>
            </div>
          </CCol>
        
        </CRow>
        <CRow>
            <CCol className='text-end  py-2'>
                <CButton size='sm' onClick={()=>setInfoCard(prev=> prev==='block'?'none':'block')}>
                    {showInfoCard==='block'?'close':'view'}
                </CButton>
            </CCol>
        </CRow>
          
          <CRow xs={12} md={12} xl={12} >


            <hr className="mt-0" />
            {[...Object.entries(income.collection.month)].map((item, index) => {

const val = (item[1].achived?(item[1].achived/(item[1].target<=0?1:item[1].target))*100:0)

console.log(val)

const progresValue = val ;
const progresValue2 =  0;

console.log(progresValue,progresValue2 )

   return            <CCol key={index} md={6}>
                <div className="progress-group-prepend">
                  <span className="text-medium-emphasis small">
                    {(item[0])}
                  </span>
                </div>
                <div className="progress-group-bars " style={{minWidth:'200px'}} >
                  <CProgress  >
                    <CProgressBar color="success" value={progresValue} />
                    <CProgressBar color="info" value={progresValue2} />
                  </CProgress>
                </div>
                <CCard className="progress-group-prepend mt-2 px-2 py-1" sm={12} style={{display:showInfoCard}} >
                  <span>
                    Target  :- {item[1].target} Rs
                  </span><br/>
                  <span>
                    Achived :- {item[1].achived} Rs
                  </span>
                </CCard>
              </CCol>
})}
          </CRow>
      </CCardBody>
    </CCard>
  </CCol>
  )


}

export default Income
