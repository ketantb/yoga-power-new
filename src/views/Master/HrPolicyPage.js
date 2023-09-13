import React, { useEffect, useState } from 'react'
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCol,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CPagination,
  CPaginationItem,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { useParams } from 'react-router-dom'
import { useAdminValidation } from '../Custom-hook/adminValidation'
import { useSelector } from 'react-redux'
import axios from 'axios'
import useJobProfileHook from './HRMaster/useJobProfileHook'
const HrPolicyPage = () => {
  const [hrPolicyData,setHrPolicyData] = useState([])
  const {title} = useParams()
  const [policyData,setPolicyData] = useState([])
  const pathVal = useAdminValidation()
  const url = useSelector((el)=>el.domainOfApi)
  const content = useSelector((el)=>el.HrPolicyContent) 
  const jobProfileFun = useJobProfileHook()
  
  let user = JSON.parse(localStorage.getItem('user-info'))
  const token = user.token;

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};

useEffect(() => {
    toGetRequireData(title)
}, [title])
console.log(title)

async function toGetRequireData() {
    try {
        const response1 =  axios.get(`${ url }/hrPolicyMaster/${title}`, {headers})
        const allData = await Promise.all([response1])
        setPolicyData(allData[0].data)
    } catch (error) {
      console.log(error)

    }
}



  return (
    <CCard className="mb-3 border-success">
    <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
        <CCardTitle className="mt-2"><h4>{policyData?.Title}</h4></CCardTitle>
    </CCardHeader>
    <CCardBody>
      <p>
        {jobProfileFun(policyData?.Policy)}
      </p>
    </CCardBody>
</CCard>
  )
}

export default HrPolicyPage
