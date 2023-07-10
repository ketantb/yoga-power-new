import { cilArrowCircleBottom, cilArrowCircleTop } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCardTitle,
    CCol,
    CFormSwitch,
    CNav,
    CNavItem,
    CNavLink,
    CRow,
    CTabContent,
    CTabPane,
} from '@coreui/react'
import React, { useState } from 'react'

const FitnessRights = React.lazy(()=>import('../AllRightRights/FitnessRights'))
const InventoryRights = React.lazy(()=>import('../AllRightRights/InventoryRights'))
const HrRights = React.lazy(()=>import('../AllRightRights/HrRights'))
const FinanceRights = React.lazy(()=>import('../AllRightRights/FinanceRights'))
const EmployeeRights = React.lazy(()=>import('../AllRightRights/EmployeeRights'))
const TaskRight =  React.lazy(()=>import('../AllRightRights/TaskRight'))
const Courses = React.lazy(()=>import('../AllRightRights/Courses'))
const ExportImport = React.lazy(()=>import('../AllRightRights/ExportImport'))


const ErpRigths = ({rightObjeact, setRightObject}) => {

    const [activeKey, setActiveKey] = useState(7)
    const {erpTaskList,erpInventory,erpFinance,erpHrManagement,erpCourse} = rightObjeact

    console.log(erpTaskList)

  return (


  <div>
        <CRow>
            <CCol xs={12}>
                <CCard>
                    <CCardHeader style={{background:'#0B5345',color:'white'}}>
                        <CNav variant="pills" role="tablist">
                          
                          
                           
                           
                            <CNavItem>
                            <CNavLink
                                    href="javascript:void(0);"
                                    active={activeKey === 7}
                                    onClick={() => setActiveKey(7)}
                                    className="text-white"
                                >
                                   Task
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink
                                    href="javascript:void(0);"
                                    active={activeKey === 8}
                                    onClick={() => setActiveKey(8)}
                                    className="text-white"
                                >
                                    Inventory
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink
                                    href="javascript:void(0);"
                                    active={activeKey === 9}
                                    onClick={() => setActiveKey(9)}
                                    className="text-white"
                                >
                                Finance
                                </CNavLink>
                            </CNavItem>

                            <CNavItem>
                             <CNavLink
                                    href="javascript:void(0);"
                                    active={activeKey === 10}
                                    onClick={() => setActiveKey(10)}
                                    className="text-white"
                                >
                                HR
                                </CNavLink>
                            </CNavItem>

                            <CNavItem>
                             <CNavLink
                                    href="javascript:void(0);"
                                    active={activeKey === 11}
                                    onClick={() => setActiveKey(11)}
                                    className="text-white"
                                >
                                Courses
                                </CNavLink>
                            </CNavItem>
                   
                            <CNavItem>
                                <CNavLink
                                    href="javascript:void(0);"
                                    active={activeKey === 12}
                                    onClick={() => setActiveKey(12)}
                                    className="text-white"
                                >
                                    Export / Import
                                </CNavLink>
                            </CNavItem>
                       
                        </CNav>
                    </CCardHeader>
                    <CCardBody>
                        <CTabContent >
                           
                            {activeKey===7 && <TaskRight erpTaskList={erpTaskList} setRightObject={setRightObject}  />}      
                            {activeKey===8 &&<InventoryRights erpInventory={erpInventory} setRightObject={setRightObject}/> }
                            {activeKey ===9&& <FinanceRights erpFinance={erpFinance} setRightObject={setRightObject}/>}
                            {activeKey===10 && <HrRights erpHrManagement={erpHrManagement} setRightObject={setRightObject}/>}
                            {activeKey===11&& <Courses erpCourse={erpCourse} setRightObject={setRightObject}/>}
                            {activeKey===12&& <ExportImport erpCourse={erpCourse} setRightObject={setRightObject}/>}

                        </CTabContent>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    </div>
   
  )
}

export default ErpRigths
