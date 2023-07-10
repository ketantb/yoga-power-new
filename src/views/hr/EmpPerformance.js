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

import EmpPerformanceTable from './Performance/EmpPerformanceTable'
import TrainerPerformance from './Performance/TrainerPerformance'
import { hrManagement } from './Rights/rightsValue/erpRightsValue'
import { useSelector } from 'react-redux'

const EmpPerformance = () => {

  const rightsData = useSelector((el)=>el?.empLoyeeRights?.erpRights?.erpHrManagement
  ?.items?.erpHrTargetSheet?.items?.erpEmpPerformance?.rights) 
  const access = rightsData?rightsData:[]
  const isAdmin = useSelector((el)=>el.isAdmin)

  console.log(access)

  const addEmpTargetPerformance = (access.includes(hrManagement.addEmpTargetPerformance) || isAdmin)
  const deleteEmpTargetPerformance = (access.includes(hrManagement.deleteEmpTargetPerformance) || isAdmin)

    const [activeKey, setActiveKey] = useState(
      (addEmpTargetPerformance&&1)||
      (deleteEmpTargetPerformance&&2)
    )


    console.log(addEmpTargetPerformance)
    console.log(deleteEmpTargetPerformance)

  


    return (
        <CRow>
            <CCol lg={12} sm={12}>
                <CCard className="mb-3 border-success">
                    <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                        <CCardTitle className="mt-2">Performance</CCardTitle>
                    </CCardHeader>
    <CCardBody>                  
    <CNav variant="tabs" role="tablist">
      {<CNavItem >
        <CNavLink
          style={{display:addEmpTargetPerformance?'':'none'}}  
          active={activeKey === 1}
          onClick={() => setActiveKey(1)}
        >
          Employee Prformance
        </CNavLink>
      </CNavItem>}
      <CNavItem >
        <CNavLink
          active={activeKey === 2}
          onClick={() => setActiveKey(2)}
          style={{display:deleteEmpTargetPerformance?'':'none'}}
        >
         Trainer Prformance
        </CNavLink>
      </CNavItem>
    </CNav>
    <CTabContent>
      <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
       <EmpPerformanceTable/>
      </CTabPane>
      <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey === 2}>
       <TrainerPerformance/>
      </CTabPane>
    </CTabContent>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default EmpPerformance
