import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CNav,
    CNavItem,
    CNavLink,
    CRow,
    CTabContent,
    CTabPane,
} from '@coreui/react'
import React, { useState } from 'react'
import AllSuppilerList from './AllSupplierList'
import GuestList from './GuestList'
import ImpCallList from './ImpCallList'
import { useSelector } from 'react-redux'
import { inventoryRight } from '../hr/Rights/rightsValue/erpRightsValue'
const AllCallList = () => {
 
    const rightsData = useSelector((el)=>el.empLoyeeRights?.erpRights.erpInventory.items.erpImpCallList.rights) 
    const access = rightsData?rightsData:[]
    const isAdmin = useSelector((el)=>el.isAdmin) 

    const [activeKey, setActiveKey] = useState(
        ((access.includes("imp"+inventoryRight.viewCallList) || isAdmin) &&1)||
        ((access.includes("all"+inventoryRight.viewCallList) || isAdmin) &&2)||
        ((access.includes("guest"+inventoryRight.viewCallList) || isAdmin) &&3)
    )


    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-3 border-success">
                    <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                        <CNav variant="pills" role="tablist">
                            {(access.includes("imp"+inventoryRight.viewCallList) || isAdmin)&&<CNavItem>
                                <CNavLink
                                    style={{ color: "white" }}
                                    href="javascript:void(0);"
                                    active={activeKey === 1}
                                    onClick={() => setActiveKey(1)}
                                >
                                    Imp Call List
                                </CNavLink>
                            </CNavItem>}
                            {(access.includes("all"+inventoryRight.viewCallList) || isAdmin)&&<CNavItem>
                                <CNavLink
                                    style={{ color: "white" }}
                                    href="javascript:void(0);"
                                    active={activeKey === 2}
                                    onClick={() => setActiveKey(2)}
                                >

                                    All Suppiler List
                                </CNavLink>
                            </CNavItem>}
                            {(access.includes("guest"+inventoryRight.viewCallList) || isAdmin)&&<CNavItem>
                                <CNavLink
                                    style={{ color: "white" }}
                                    href="javascript:void(0);"
                                    active={activeKey === 3}
                                    onClick={() => setActiveKey(3)}
                                >
                                    Guest List
                                </CNavLink>
                            </CNavItem>}
                        </CNav>
                    </CCardHeader>
                    <CCardBody>
                        <CTabContent>
                            <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
                                <ImpCallList
                                 addedval = {(access.includes("imp"+inventoryRight.addCall))}
                                 editCallval = {(access.includes("imp"+inventoryRight.editCall))}
                                 deleteICall={(access.includes("imp"+inventoryRight.deleteICall))}
                                 action1={(access.includes("imp"+inventoryRight.action))}
                                /> 
                            </CTabPane>
                            <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 2}>
                                <AllSuppilerList
                                 addedval = {(access.includes("all"+inventoryRight.addCall))}
                                 editCallval = {(access.includes("all"+inventoryRight.editCall))}
                                 deleteICall={(access.includes("all"+inventoryRight.deleteICall))}
                                 action1={(access.includes("all"+inventoryRight.action))}
                                />
                            </CTabPane>
                            <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 3}>
                                <GuestList
                                addedval = {(access.includes("guest"+inventoryRight.addCall))}
                                editCallval = {(access.includes("guest"+inventoryRight.editCall))}
                                deleteICall={(access.includes("guest"+inventoryRight.deleteICall))}
                                action1={(access.includes("guest"+inventoryRight.action))}
                                />
                            </CTabPane>

                        </CTabContent>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}
export default AllCallList
