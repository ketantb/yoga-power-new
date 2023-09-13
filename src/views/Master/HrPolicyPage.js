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

const HrPolicyPage = () => {
  const [hrPolicyData,setHrPolicyData] = useState([])
  const {title} = useParams()
  const [policyData,setPolicyData] = useState([])
  const pathVal = useAdminValidation()
  const url = useSelector((el)=>el.domainOfApi)
  const content = useSelector((el)=>el.HrPolicyContent) 
  
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
        const response1 =  axios.get(`${ url }/hrPolicyMaster/title/${title}/${ pathVal }`, {headers})
        const allData = await Promise.all([response1])

        console.log(allData,'hello')
        setPolicyData(allData[0].data.reverse())
    } catch (error) {
      console.log(error)

    }
}



  return (
    <CCard className="mb-3 border-success">
    <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
        <CCardTitle className="mt-2">{content?.Title}</CCardTitle>
    </CCardHeader>
    <CCardBody>
       
       
    </CCardBody>
   
</CCard>
  )
}

export default HrPolicyPage
