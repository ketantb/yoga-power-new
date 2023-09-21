import React from 'react'
import { CForm,CFormInput,CCol,CButton,CFormSelect,CFormCheck, CCard,
    CRow
 } from '@coreui/react'
const EventBoking = () => {
  return (
<CCard className="row g-3 ">
    <form className='p-3'>
        <CRow>
    <CCol md={4} lg={3} >
    <CFormSelect id="inputState" label="Event">
      <option>Choose...</option>
      <option>...</option>
    </CFormSelect>
  </CCol>    
  <CCol md={4} lg={3}>
    <CFormInput type="date" id="inputPassword4" label="Event Start Date" />
  </CCol>
  <CCol md={4} lg={3}>
    <CFormInput type="date" id="inputPassword4" label="Event End Date" />
  </CCol>
  <CCol md={4} lg={3}>
    <CFormInput type="text" id="inputPassword4" label="Event venue" />
  </CCol>
  
  <CCol  md={4} lg={3}>
    <CFormSelect id="inputState" label="Client">
      <option>Choose...</option>``
      <option>...</option>
    </CFormSelect>
  </CCol> 
  <CCol md={4} lg={3}>
    <CFormInput type="text" id="inputPassword4" label="Client Id" />
  </CCol>
  <CCol md={4} lg={3}>
    <CFormInput id="inputAddress" label="Client Address" placeholder="1234 Main St"/>
  </CCol>
  <CCol md={4} lg={3}>
    <CFormInput id="inputAddress2" label="Client Address 2" placeholder="Optional"/>
  </CCol>
  <CCol md={4} lg={3}>
    <CFormInput id="inputCity" label="City"/>
  </CCol>
 
  <CCol md={4} lg={3}>
    <CFormInput id="inputCity" label="Center Name"/>
  </CCol>

  
  <CCol  md={4} lg={3}>
    <CFormInput type="number" id="gridCheck" label="Contact Number"/>
  </CCol>
  <CCol  md={4} lg={3}>
    <CFormInput type="Booking Time"  id="gridCheck" label="Time"/>
  </CCol>
  <CCol  md={8} lg={6}>
    <label>Booking  date  Start and End</label>
    <div className='datePiker'>
    <input type="date" 
    min="2021-02-18"
    id="gridCheck" />
     <input type="date" 
    min="2021-02-18"
    id="gridCheck" />
    </div>
  </CCol>
  <CCol  md={4} lg={3}>
    <CFormSelect id="inputState" label="Created By">
      <option>Choose...</option>
      <option>...</option>
    </CFormSelect>
  </CCol>
  <CCol xs={12} className='my-4'>
    <CButton type="submit">Booking Event</CButton>
  </CCol>
  </CRow>
  </form>
</CCard>
  )
}

export default EventBoking
