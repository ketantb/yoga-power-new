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
const CenterSetup = React.lazy(()=>import('../AllRightRights/Master/CenterSetupRights'))
const SupportRequest = React.lazy(()=>import('../AllRightRights/Master/SupportRequest'))
const MarketingRigths = React.lazy(()=>import('../AllRightRights/Master/MarketingRigths'))
const ClientSetupRights = React.lazy(()=>import('../AllRightRights/Master/ClientSetupRights'))
const HrRights = React.lazy(()=>import('../AllRightRights/Master/HrRights'))
const InventoryRights   = React.lazy(()=>import('../AllRightRights/Master/InventoryRights'))
const FInanceRights = React.lazy(()=>import('../AllRightRights/Master/FInanceRights'))
 
const MasterRights = ({masterRights,setRightObject}) => {


    const [activeKey, setActiveKey] = useState(1)

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
                                    active={activeKey === 1}
                                    onClick={() => setActiveKey(1)}
                                    className="text-white"
                                >
                                    Center Setup
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink
                                    href="javascript:void(0);"
                                    active={activeKey === 2}
                                    onClick={() => setActiveKey(2)}
                                    className="text-white"
                                >
                                    Client Feedback   
                                </CNavLink>
                            </CNavItem>

                            <CNavItem>
                                <CNavLink
                                    href="javascript:void(0);"
                                    active={activeKey === 3}
                                    onClick={() => setActiveKey(3)}
                                    className="text-white"
                                >
                                   Marketing
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink
                                    href="javascript:void(0);"
                                    active={activeKey === 4}
                                    onClick={() => setActiveKey(4)}
                                    className="text-white"
                                >
                                    Clients
                                </CNavLink>
                            </CNavItem>
                            
                            <CNavItem>
                            <CNavLink
                                    href="javascript:void(0);"
                                    active={activeKey === 6}
                                    onClick={() => setActiveKey(6)}
                                    className="text-white"
                                >
                                    HR
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                            <CNavLink
                                    href="javascript:void(0);"
                                    active={activeKey === 7}
                                    onClick={() => setActiveKey(7)}
                                    className="text-white"
                                >
                                   Inventory
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink
                                    href="javascript:void(0);"
                                    active={activeKey === 8}
                                    onClick={() => setActiveKey(8)}
                                    className="text-white"
                                >
                                   Finance
                                </CNavLink>
                            </CNavItem>
                        

                        </CNav>
                    </CCardHeader>
                    <CCardBody>
                        <CTabContent >
                          {activeKey===1&&<CenterSetup masterRights={masterRights} setRightObject={setRightObject}  />}
                          {activeKey===2&&<SupportRequest masterClientFeedback={masterRights.masterClientFeedback} setRightObject={setRightObject}/>}
                          {activeKey===3&&<MarketingRigths masterMarketing={masterRights.masterMarketing} setRightObject={setRightObject} />}
                          {activeKey===4&&<ClientSetupRights masterClient={masterRights.masterClient} setRightObject={setRightObject} />}
                          {activeKey===6&&<HrRights masterHr={masterRights.masterHr} setRightObject={setRightObject}/>}
                          {activeKey===7&&<InventoryRights masterInverntory={masterRights.masterInverntory} setRightObject={setRightObject} />}
                          {activeKey===8&&<FInanceRights masterFinance={masterRights.masterFinance} setRightObject={setRightObject} />}
                        </CTabContent>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    </div>
   
  )
}

export default MasterRights
