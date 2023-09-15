import React, { useRef } from 'react'
import {
    CButton,
    CCol,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CCard,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CImage,
} from '@coreui/react'

import logo from 'src/assets/images/avatars/icon.png'
import { useReactToPrint } from 'react-to-print'
const SalarySlip = ({ empData, showInvoiceModal, setInvoceModal }) => {

    const componentRef = useRef()
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'yog-power',
        onAfterPrint: () => alert('print success')
    })


    return (
        <CModal size="xl" alignment="center" scrollable visible={showInvoiceModal} onClose={() => setInvoceModal(false)}>
            <CModalHeader>
                <CModalTitle>Salary Preview</CModalTitle>
            </CModalHeader>
            <CModalBody ref={componentRef} style={{ padding: '25px' }}>
                <CRow>
                    <CCol lg={12} className='text-center'><CImage src={logo} width="100px" height='100px' /></CCol>
                    <CCol lg={12} className='text-center mt-2'><h5>Yog Power International </h5></CCol>
                    <CCol lg={12} className='text-center mt-2'><h6>Salary Slip for {new Date(empData.month).toLocaleDateString()}</h6></CCol>

                </CRow>
                <CRow>
                    <CCol className='mt-2' style={{ marginLeft: '10px' }}>
                        <div>
                            <h6>Name:-{empData.empName} </h6>
                            <h6> Designation:- {empData.Designations} </h6>
                            <h6> Location:- {empData.Location}</h6>
                        </div>
                    </CCol>
                    <CCol className='mt-2' style={{ marginRight: '30px' }}>
                        <div className='float-end'>
                            <h6>Department:- {empData.Department}</h6>
                            <h6>Mode Of Payment:- {empData.modeOfPayment} </h6>
                            <h6>Bank Account No:- {empData.bankAcountNo}</h6>
                        </div>
                    </CCol>
                </CRow>

                <CRow>
                    <CCol className='mt-2 p-2' >

                        <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                            <CTableHead color={'darkGreen'} >
                                <CTableHeaderCell colSpan={4} className='border'>
                                    SALARYES
                                </CTableHeaderCell>
                            </CTableHead>
                            <CTableHead color={'darkGreen'} >

                                <CTableHeaderCell>SALARY (CTC)</CTableHeaderCell>
                                <CTableHeaderCell>MONTHLY SALARY</CTableHeaderCell>
                            </CTableHead>
                            <CTableBody>


                                <CTableRow >
                                    <CTableDataCell>{empData.ctc}</CTableDataCell>
                                    <CTableDataCell>{(empData.BasicSalary)}</CTableDataCell>
                                </CTableRow>

                            </CTableBody>
                        </CTable>
                        <CCol className=' text-end '>

                            <CTable className='mt-3' hover responsive>
                                <CTableHead color={'darkGreen'} >
                                    <CTableHeaderCell colSpan={4} className='border'>
                                        Leave's
                                    </CTableHeaderCell>
                                </CTableHead>
                                <CTableHead color={'darkGreen'}  >

                                    <CTableHeaderCell>Half-Day</CTableHeaderCell>
                                    <CTableHeaderCell>Late Mark</CTableHeaderCell>
                                    <CTableHeaderCell>Leave Day</CTableHeaderCell>
                                    <CTableHeaderCell>Adjust Leave</CTableHeaderCell>
                                </CTableHead>
                                <CTableBody>
                                    <CTableDataCell>{empData.halfday}</CTableDataCell>
                                    <CTableDataCell>{empData.lateMark}</CTableDataCell>
                                    <CTableDataCell>{empData.leaveDay}</CTableDataCell>
                                    <CTableDataCell>{empData.adjustLeave}</CTableDataCell>
                                </CTableBody>
                            </CTable>

                        </CCol>

                        <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                            <CTableHead>
                                <CTableHeaderCell colSpan={5} className='border'>
                                    Deduction
                                </CTableHeaderCell>
                            </CTableHead>
                            <CTableHead color={'darkGreen'} >
                                <CTableHeaderCell>TDS</CTableHeaderCell>
                                <CTableHeaderCell>PF</CTableHeaderCell>
                                <CTableHeaderCell>Professional Tax</CTableHeaderCell>
                                <CTableHeaderCell>Advanced Salary</CTableHeaderCell>
                                <CTableHeaderCell>Total Deduction</CTableHeaderCell>
                            </CTableHead>
                            <CTableBody>

                                <CTableRow >
                                    <CTableDataCell>{empData.TDS}%</CTableDataCell>
                                    <CTableDataCell>{empData.TPD}%</CTableDataCell>
                                    <CTableDataCell>{empData.PT}</CTableDataCell>
                                    <CTableDataCell>{empData.advancedSalaryDedct}</CTableDataCell>
                                    <CTableDataCell>{+empData.advancedSalaryDedct + +empData.PT + +empData.TPD +empData.TDS}</CTableDataCell>

                                </CTableRow>
                            </CTableBody>
                        </CTable>





                        <CCol>
                            <CTable>

                                <CTableHead color={'darkGreen'} >

                                    <CTableHeaderCell>TOTAL WORKING DAYS (TWD) </CTableHeaderCell>
                                    <CTableHeaderCell>SALARY (GROSS)</CTableHeaderCell>
                                    <CTableHeaderCell> INCENTIVE</CTableHeaderCell>
                                    <CTableHeaderCell>   NET SALARY </CTableHeaderCell>

                                </CTableHead>
                                <CTableBody>
                                    <CTableRow >
                                        <CTableDataCell>{empData.TWD}</CTableDataCell>
                                        <CTableDataCell>{empData.grossSalary}</CTableDataCell>
                                        <CTableDataCell>{empData.incentive}</CTableDataCell>
                                        <CTableDataCell>{empData.netSalary}</CTableDataCell>
                                    </CTableRow>
                                </CTableBody>
                            </CTable>

                        </CCol>
                    </CCol>

                </CRow>
            </CModalBody>
            <CModalFooter>
                <CButton color="primary" onClick={handlePrint}>Print</CButton>
            </CModalFooter>
        </CModal>

    )
}

export default SalarySlip
