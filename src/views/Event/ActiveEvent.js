import { CRow,CCol,CCard,CCardHeader,CCardTitle,CCardText,CAccordion
    ,CAccordionItem,CAccordionBody,CAccordionHeader,CListGroup,CListGroupItem,
    CCardBody,CImage,CBadge,CButton
 } from '@coreui/react'
import React from 'react'
import EventImage from 'src/assets/images/avatars/eventImage.jpg'


const ActiveEvent = () => {
  return (
    <CCol  className=' mb-3 d-flex flex-column align-items-center ' lg={6} md={8} >
        <CCard>
            <CCardHeader>
                <CRow>
                    <CCol xs={4}>
                        <CImage src={EventImage} width='100%' />
                    </CCol>
                    <CCol>
                        <CCardTitle className='mt-2'>Navratri Pass <CBadge color="success float-end">Active</CBadge></CCardTitle>
                        <CCardText><small className="text-medium-emphasis" style={{ fontWeight: 'bold' }}>Start Date : 30-09-2022</small><small className="text-medium-emphasis float-end " style={{ fontWeight: 'bold' }}>End Date : 30-09-2022</small>
                            <br /><small className="text-medium-emphasis" style={{ fontWeight: 'bold' }}>Event Name : Navratri Event</small></CCardText>
                        <CCardText><small className="text-medium-emphasis" style={{ fontWeight: 'bold' }}>Event Time: 4PM </small><small className="text-medium-emphasis float-end mt-1" style={{ fontWeight: 'bold' }}>Duration: 2Hr </small></CCardText>
                    </CCol>
                </CRow>
            </CCardHeader>
            <CCardBody style={{ backgroundColor: 'rgba(255,255,255,.1)', padding: '0' }}>
                <CAccordion activeItemKey={2}>
                    <CAccordionItem itemKey={1}>
                        <CAccordionHeader>
                            <CCardTitle>Participants</CCardTitle>
                        </CAccordionHeader>
                        <CAccordionBody style={{ padding: '0' }}>
                            <CListGroup>
                                <CListGroupItem component="a" href="#" >
                                    <CRow>
                                        <CCol>Sr. No</CCol>
                                        <CCol>PASS ID</CCol>
                                        <CCol>Client Name</CCol>
                                        <CCol>Details</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem component="a" href="#" >
                                    <CRow>
                                        <CCol>1</CCol>
                                        <CCol>25-10-2022</CCol>
                                        <CCol>NAV202201</CCol>
                                        <CCol>Sejal</CCol>
                                        <CCol>11 pm</CCol>
                                        <CCol>P</CCol>
                                        <CCol>
                                            <CButton>View</CButton>
                                        </CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem component="a" href="#" >
                                    <CRow>
                                        <CCol>2</CCol>
                                        <CCol>25-10-2022</CCol>
                                        <CCol>CLIENT456</CCol>
                                        <CCol>Sejal</CCol>
                                        <CCol>11 pm</CCol>
                                        <CCol>P</CCol>
                                        <CCol>
                                            <CButton>View</CButton>
                                        </CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem component="a" href="#" >
                                    <CRow>
                                        <CCol>3</CCol>
                                        <CCol>25-10-2022</CCol>
                                        <CCol>CLIENT456</CCol>
                                        <CCol>Sejal</CCol>
                                        <CCol>11 pm</CCol>
                                        <CCol>P</CCol>
                                        <CCol>
                                            <CButton>View</CButton>
                                        </CCol>
                                    </CRow>
                                </CListGroupItem>
                            </CListGroup>
                        </CAccordionBody>
                    </CAccordionItem>
                </CAccordion>
            </CCardBody>
        </CCard>
</CCol>
  )
}

export default ActiveEvent
