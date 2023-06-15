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

const CrmErpRigts  = React.lazy(()=>import('./Rights/CrmErpRigts'))
const MasterRights = React.lazy(()=>import('./Rights/MasterRights'))


const AllRight = () => {
    const [activeKey, setActiveKey] = useState(1)

    return (
        <CCard>
<CCardHeader>
    <CNav variant="tabs" role="tablist">
      <CNavItem>
        <CNavLink
          active={activeKey === 1}
          onClick={() =>  setActiveKey(1)}
        >
         CRM/ERP
        </CNavLink>
      </CNavItem>
      <CNavItem>
        <CNavLink
          active={activeKey === 2}
          onClick={() =>  setActiveKey(2)}
        >
          Master
        </CNavLink>
      </CNavItem>
    </CNav>
</CCardHeader>

<CCardBody>
  <CTabContent>
      <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
        <CrmErpRigts/>
      </CTabPane>
      <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 2}>
        <MasterRights/>
      </CTabPane>
  </CTabContent>
  </CCardBody>    
   
    </CCard>
    )
}
export default AllRight
