import React, { useEffect, useState } from 'react'
import {
    CCol,
    CRow,
    CNavItem,
    CNavLink,
    CTabContent,
    CTabPane,
    CNav
} from '@coreui/react'

import SalesCall from '../salesCall/SalesCall';
import ServiceCall from '../serviceCall/ServiceCall'
const CallUpdate = ({ id }) => {

    const [activeKey, setActiveKey] = useState(1)

    let user = JSON.parse(localStorage.getItem('user-info'))


    return (
        <CRow>
            <CCol xs={12}>
                <div >

                    <CNav variant="tabs" role="tablist"style={{cursor:'pointer'}}>
                        <CNavItem >
                            <CNavLink
                                active={activeKey === 1}
                                onClick={() => setActiveKey(1)}
                            >
                                Salles Call
                            </CNavLink>
                        </CNavItem>
                        <CNavItem>
                            <CNavLink
                                active={activeKey === 2}
                                onClick={() => setActiveKey(2)}
                            >
                               Member Call 
                            </CNavLink>
                        </CNavItem>
                        
                    </CNav>
                    <CTabContent>
                        <CTabPane role="tabpanel" aria-labelledby="contact-tab" visible={activeKey === 1}>
                        {activeKey === 1 &&  <SalesCall  id={id} onlyClient={true}/>}
                        </CTabPane>
                        <CTabPane role="tabpanel" aria-labelledby="contact-tab" visible={activeKey === 2}>
                        {activeKey === 2 &&  <ServiceCall id={id} onlyClient={true} />}
                        </CTabPane>
                    </CTabContent>

                </div>
            </CCol>
    
        </CRow>
    )
}

export default CallUpdate
