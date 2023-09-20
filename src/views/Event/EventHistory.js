import { CRow,CCol,CCard,CCardHeader,CCardTitle,CCardText,CAccordion
    ,CAccordionItem,CAccordionBody,CAccordionHeader,CListGroup,CListGroupItem,
    CCardBody,CImage,CBadge,CButton,CForm,CInputGroup,CFormSelect,CFormInput,CPopover
 } from '@coreui/react'
import React from 'react'


const EventHistory = () => {
  return (
    <CCard className='mt-3'>
    <CCardHeader>
        Past Event
    </CCardHeader>
    <CCardBody>
        <CForm>

            <CCard>
                <CCardBody>
                    <CRow>
                        <CCol>
                            <CInputGroup style={{ height: "38px" }}>
                                <CFormSelect
                                    id="inputGroupSelect04"
                                    aria-label="Example select with button addon"
                                >
                                    <option>Trainer Name</option>
                                    <option value="1">Service</option>
                                </CFormSelect>
                                <CFormInput
                                    placeholder="Search"
                                    aria-label="Recipient's username"
                                    aria-describedby="button-addon2"
                                />
                                <CFormInput
                                    type='date'
                                    placeholder="Search"
                                    aria-label="Recipient's username"
                                    aria-describedby="button-addon2"
                                />
                                <CFormInput
                                    type='time'
                                    placeholder="Search"
                                    aria-label="Recipient's username"
                                    aria-describedby="button-addon2"
                                />
                                <CButton type="button" color="primary">
                                    Search
                                </CButton>
                            </CInputGroup>
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
        </CForm>
        <CRow>
            <CCol lg={12} sm={12} className='mt-1'>
                <CAccordion activeItemKey={2}>
                    <CAccordionItem itemKey={1}>
                        <CAccordionHeader>
                            <CRow>
                                <label>Date: 30/09/2022</label>
                                <CCol xs={4}>
                                    <label style={{ fontWeight: 'bold' }}>Trainer Name : Prabha Yadav</label>
                                </CCol>
                                <CCol xs={3}>
                                    <span style={{ fontWeight: 'bold' }}>Service : Yoga</span>
                                </CCol>
                                <CCol xs={3}>
                                    <span>Duration: 30 min</span>
                                </CCol>
                                <CCol xs={2}>
                                    <span>
                                        <CPopover
                                            title="Reason"
                                            content="Trainer Not Well!"
                                            placement="left"
                                        >
                                            <CButton color="warning">
                                                Cancelled
                                            </CButton>
                                        </CPopover>
                                    </span>
                                </CCol>
                                <CCol xs={4}>
                                    <span>Batch Timing: 12 clock afternoon</span>
                                </CCol>
                                <CCol xs={3}>
                                    <span>Registered User : 45</span>
                                </CCol>
                            </CRow>
                        </CAccordionHeader>
                        <CAccordionBody>
                            <CListGroup>
                                <CListGroupItem component="a" href="#" >
                                    <CRow>
                                        <CCol>Sr. No</CCol>
                                        <CCol>Date</CCol>
                                        <CCol>Attendance ID</CCol>
                                        <CCol>Client Name</CCol>
                                        <CCol>Joining time</CCol>
                                        <CCol>Attendance</CCol>
                                        <CCol>Details</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem component="a" href="#" >
                                    <CRow>
                                        <CCol>1</CCol>
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
            </CCol>
            <CCol lg={12} sm={12} className='mt-1'>
                <CAccordion activeItemKey={2}>
                    <CAccordionItem itemKey={1}>
                        <CAccordionHeader>
                            <CRow>
                                <label>Date: 30/09/2022</label>
                                <CCol xs={4}>
                                    <label style={{ fontWeight: 'bold' }}>Trainer Name : Prabha Yadav</label>
                                </CCol>
                                <CCol xs={3}>
                                    <span style={{ fontWeight: 'bold' }}>Service : Yoga</span>
                                </CCol>
                                <CCol xs={3}>
                                    <span>Duration: 30 min</span>
                                </CCol>
                                <CCol xs={2}>
                                    <span>
                                        <CButton color="success">
                                            Complated
                                        </CButton>
                                    </span>
                                </CCol>
                                <CCol xs={4}>
                                    <span>Batch Timing: 12 clock afternoon</span>
                                </CCol>
                                <CCol xs={3}>
                                    <span>Registered User : 45</span>
                                </CCol>
                            </CRow>
                        </CAccordionHeader>
                        <CAccordionBody>
                            <CListGroup>
                                <CListGroupItem component="a" href="#" >
                                    <CRow>
                                        <CCol>Sr. No</CCol>
                                        <CCol>Date</CCol>
                                        <CCol>Attendance ID</CCol>
                                        <CCol>Client Name</CCol>
                                        <CCol>Joining time</CCol>
                                        <CCol>Attendance</CCol>
                                        <CCol>Details</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem component="a" href="#" >
                                    <CRow>
                                        <CCol>1</CCol>
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
            </CCol>
            <CCol lg={12} sm={12} className='mt-1'>
                <CAccordion activeItemKey={2}>
                    <CAccordionItem itemKey={1}>
                        <CAccordionHeader>
                            <CRow>
                                <label>Date: 30/09/2022</label>
                                <CCol xs={4}>
                                    <label style={{ fontWeight: 'bold' }}>Trainer Name : Prabha Yadav</label>
                                </CCol>
                                <CCol xs={3}>
                                    <span style={{ fontWeight: 'bold' }}>Service : Yoga</span>
                                </CCol>
                                <CCol xs={3}>
                                    <span>Duration: 30 min</span>
                                </CCol>
                                <CCol xs={2}>
                                    <span>
                                        <CButton color="success">
                                            Complated
                                        </CButton>
                                    </span>
                                </CCol>
                                <CCol xs={4}>
                                    <span>Batch Timing: 12 clock afternoon</span>
                                </CCol>
                                <CCol xs={3}>
                                    <span>Registered User : 45</span>
                                </CCol>
                            </CRow>
                        </CAccordionHeader>
                        <CAccordionBody>
                            <CListGroup>
                                <CListGroupItem component="a" href="#" >
                                    <CRow>
                                        <CCol>Sr. No</CCol>
                                        <CCol>Date</CCol>
                                        <CCol>Attendance ID</CCol>
                                        <CCol>Client Name</CCol>
                                        <CCol>Joining time</CCol>
                                        <CCol>Attendance</CCol>
                                        <CCol>Details</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem component="a" href="#" >
                                    <CRow>
                                        <CCol>1</CCol>
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
            </CCol>
            <CCol lg={12} sm={12} className='mt-1'>
                <CAccordion activeItemKey={2}>
                    <CAccordionItem itemKey={1}>
                        <CAccordionHeader>
                            <CRow>
                                <label>Date: 30/09/2022</label>
                                <CCol xs={4}>
                                    <label style={{ fontWeight: 'bold' }}>Trainer Name : Prabha Yadav</label>
                                </CCol>
                                <CCol xs={3}>
                                    <span style={{ fontWeight: 'bold' }}>Service : Yoga</span>
                                </CCol>
                                <CCol xs={3}>
                                    <span>Duration: 30 min</span>
                                </CCol>
                                <CCol xs={2}>
                                    <span>
                                        <CPopover
                                            title="Reason"
                                            content="Trainer Not Well!"
                                            placement="left"
                                        >
                                            <CButton color="warning">
                                                Cancelled
                                            </CButton>
                                        </CPopover>
                                    </span>
                                </CCol>
                                <CCol xs={4}>
                                    <span>Batch Timing: 12 clock afternoon</span>
                                </CCol>
                                <CCol xs={3}>
                                    <span>Registered User : 45</span>
                                </CCol>
                            </CRow>
                        </CAccordionHeader>
                        <CAccordionBody>
                            <CListGroup>
                                <CListGroupItem component="a" href="#" >
                                    <CRow>
                                        <CCol>Sr. No</CCol>
                                        <CCol>Date</CCol>
                                        <CCol>Attendance ID</CCol>
                                        <CCol>Client Name</CCol>
                                        <CCol>Joining time</CCol>
                                        <CCol>Attendance</CCol>
                                        <CCol>Details</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem component="a" href="#" >
                                    <CRow>
                                        <CCol>1</CCol>
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
            </CCol><CCol lg={12} sm={12} className='mt-1'>
                <CAccordion activeItemKey={2}>
                    <CAccordionItem itemKey={1}>
                        <CAccordionHeader>
                            <CRow>
                                <label>Date: 30/09/2022</label>
                                <CCol xs={4}>
                                    <label style={{ fontWeight: 'bold' }}>Trainer Name : Prabha Yadav</label>
                                </CCol>
                                <CCol xs={3}>
                                    <span style={{ fontWeight: 'bold' }}>Service : Yoga</span>
                                </CCol>
                                <CCol xs={3}>
                                    <span>Duration: 30 min</span>
                                </CCol>
                                <CCol xs={2}>
                                    <span>
                                        <CPopover
                                            title="Reason"
                                            content="Trainer Not Well!"
                                            placement="left"
                                        >
                                            <CButton color="warning">
                                                Cancelled
                                            </CButton>
                                        </CPopover>
                                    </span>
                                </CCol>
                                <CCol xs={4}>
                                    <span>Batch Timing: 12 clock afternoon</span>
                                </CCol>
                                <CCol xs={3}>
                                    <span>Registered User : 45</span>
                                </CCol>
                            </CRow>
                        </CAccordionHeader>
                        <CAccordionBody>
                            <CListGroup>
                                <CListGroupItem component="a" href="#" >
                                    <CRow>
                                        <CCol>Sr. No</CCol>
                                        <CCol>Date</CCol>
                                        <CCol>Attendance ID</CCol>
                                        <CCol>Client Name</CCol>
                                        <CCol>Joining time</CCol>
                                        <CCol>Attendance</CCol>
                                        <CCol>Details</CCol>
                                    </CRow>
                                </CListGroupItem>
                                <CListGroupItem component="a" href="#" >
                                    <CRow>
                                        <CCol>1</CCol>
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
            </CCol>
        </CRow>
    </CCardBody>
</CCard> 
  )
}

export default EventHistory
