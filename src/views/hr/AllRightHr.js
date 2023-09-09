import { cilArrowCircleBottom, cilArrowCircleTop } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CNav,
    CNavItem,
    CNavLink,
    CTabContent,
    CTabPane,
} from '@coreui/react'
import React, { useState} from 'react'
import { useParams } from 'react-router-dom'


const LoginList = React.lazy(()=>import('./Login List/LoginList'))

let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;


const headers = {
  "Authorization": `Bearer ${token}`,
  'Accept': 'application/json',
  'Content-Type': 'application/json'
 }


const AllRight = () => {

    const {isRights,emailUniqId} = useParams()

    const [activeKey, setActiveKey] = useState((user.user.isAdmin&&!Boolean(isRights?.trim()))?1:2)


    return (
<CCard>

<CCardHeader>
    <CNav variant="tabs" role="tablist">
     {(user.user.isAdmin&&!Boolean(isRights?.trim()))&&<CNavItem>
        <CNavLink
          active={activeKey === 1}
          onClick={() =>  setActiveKey(1)}
        >
         Admin Id List
        </CNavLink>
      </CNavItem>}
      <CNavItem>
        <CNavLink
          active={activeKey === 2}
          onClick={() =>  setActiveKey(2)}
        >
         Login Id List
        </CNavLink>
      </CNavItem>
    </CNav>
</CCardHeader>

<CCardBody>
  <CTabContent>
      {(user.user.isAdmin&&!Boolean(isRights?.trim()))&&<CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
         <LoginList admin={true} />
      </CTabPane>}
      <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 2} >
         <LoginList admin={false} emailUniqIdEmp={emailUniqId}  onlyOneEmp={Boolean(isRights?.trim())}  />
      </CTabPane>
  </CTabContent>
</CCardBody>    
   
</CCard>
    )
}
export default AllRight
