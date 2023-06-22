import React from 'react'
import {
  CButton,
  CCol,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMagnifyingGlass } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'


const Page550 = () => {
    const naviGate = useNavigate()
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <span className="clearfix">
              <h1 className="float-start display-3 me-4 ">550</h1>
              <h4 className="pt-3 text-danger">Email has been blocked</h4>
              <p className="text-medium-emphasis float-start">
              Email you're trying to login is blocked.
              </p>
            </span>
          
          </CCol>
        </CRow>
        <CRow className="justify-content-center">
         <CCol md={6} className='text-center'>
           <CButton onClick={()=>{naviGate('/login')}} >Go Back To Login Page</CButton>
          </CCol>
        </CRow>
        
      </CContainer>
    </div>
  )
}

export default Page550
