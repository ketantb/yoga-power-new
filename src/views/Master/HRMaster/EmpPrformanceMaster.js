
import React, { useEffect, useState } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCardTitle,
    CCol,
    CRow,
    CNav,
    CNavItem,
    CNavLink,
    CTabContent,
    CTabPane
} from '@coreui/react'
import EmpPerformanceTable from './EmpPerformance/EmpPerformanceTable'
import TrainerPerformance from './EmpPerformance/TrainerPerformance'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { useAdminValidation } from 'src/views/Custom-hook/adminValidation'
import { herMasterRightVal } from 'src/views/hr/Rights/rightsValue/masterRightsValue'
let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;
const username = user.user.username;

const headers = {
  "Authorization": `Bearer ${token}`
 }
const EmpPerformance = () => {

    const [staff, setStaff] = useState([])
    const [trainer, setTrainer] = useState([])

    const rightsData = useSelector((el)=>el?.empLoyeeRights?.masterRights?.masterHr
    ?.items?.masterEmpPrformance?.rights) 
    

  const access = rightsData?rightsData:[]
  const isAdmin = useSelector((el)=>el.isAdmin)

  const empPrformanse = (access.includes(herMasterRightVal.empPrformanse) || isAdmin)
  const addEmpPrformanse = (access.includes(herMasterRightVal.addEmpPrformanse) || isAdmin)
  const deleteEmpPrformanse = (access.includes(herMasterRightVal.deleteEmpPrformanse) || isAdmin)
  const editEmpPrformanse = (access.includes(herMasterRightVal.editEmpPrformanse) || isAdmin)

  const trainerPrformanse = (access.includes(herMasterRightVal.trainerPrformanse) || isAdmin)
  const addTrainerPrformanse = (access.includes(herMasterRightVal.addTrainerPrformanse) || isAdmin)
  const deleteTrainerPrformanse = (access.includes(herMasterRightVal.deleteTrainerPrformanse) || isAdmin)
  const editTrainerPrformanse = (access.includes(herMasterRightVal.editTrainerPrformanse) || isAdmin)

    const [activeKey, setActiveKey] = useState(
      (empPrformanse&&1)||
      (trainerPrformanse&&2)
    )


    const url = useSelector((el) => el.domainOfApi)
    const pathVal = useAdminValidation('Master')

    function getStaff() {
      axios.get(`${url}/employeeform/${pathVal}`, {headers})
        .then((res) => {
          const employeeData = res.data.filter((el)=>el.selected==="Select")          
          setStaff(employeeData)
          setTrainer(employeeData.filter((el)=>el.EmployeeCategory.trim()==='Freelancer'||el.trainerStatus?true:false)
          .reverse())
        })



      .catch((error) => {console.error(error)})
      }
      
      useEffect(()=>{
        getStaff()
      },[])



    return (
        <CRow>
            <CCol lg={12} sm={12}>
                <CCard className="mb-3 border-success">
                    <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                        <CCardTitle className="mt-2">Performance</CCardTitle>
                    </CCardHeader>
    <CCardBody>                  
    <CNav variant="tabs" role="tablist">
      <CNavItem >
        <CNavLink
          active={activeKey === 1}
          onClick={() => setActiveKey(1)}
          style={{display:empPrformanse?'':'none'}}
        >
          Employee Prformance
        </CNavLink>
      </CNavItem>
      <CNavItem  >
        <CNavLink
          active={activeKey === 2}
          onClick={() => setActiveKey(2)}
          style={{display:trainerPrformanse?'':'none'}}
        >
         Trainer Prformance
        </CNavLink>
      </CNavItem>
    </CNav>
    <CTabContent>
      <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
        <EmpPerformanceTable staff={staff}
        addEmpPrformanse={addEmpPrformanse}
        deleteEmpPrformanse={deleteEmpPrformanse}
        editEmpPrformanse={editEmpPrformanse}
        />
      </CTabPane>
      <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey === 2}>
        <TrainerPerformance trainer={trainer}
         addTrainerPrformanse={addTrainerPrformanse}
         deleteTrainerPrformanse={deleteTrainerPrformanse}
         editTrainerPrformanse={editTrainerPrformanse}
        />
      </CTabPane>
    </CTabContent>            
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
    )
}

export default EmpPerformance
