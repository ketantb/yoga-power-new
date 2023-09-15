import React, { useRef} from 'react'
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
const TrainerSlip = ({empData,showInvoiceModal,setInvoceModal}) => {

    const componentRef = useRef()
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'yog-power',
        onAfterPrint: () => alert('print success')
    })


    console.log(empData)
  return (
<CModal size="xl" alignment="center" scrollable visible={showInvoiceModal} onClose={() => setInvoceModal(false)}>
<CModalHeader>
    <CModalTitle>Trainer Salary Slip Preview</CModalTitle>
</CModalHeader>
<CModalBody  ref={componentRef}   style={{ padding: '25px' }}>
    <CRow>
       <CCol lg={12} className='text-center'><CImage src={logo} width="100px" height='100px' /></CCol>
        <CCol lg={12} className='text-center mt-2'><h5>Yog Power International </h5></CCol>
    </CRow>
        <CRow>                                                                   
            <CCol className='mt-2' style={{ marginLeft: '10px' }}>
                <div>
                    <CCol lg={12} className='text-center mt-2'><h6>Salary Slip for {new Date(empData.date).toLocaleDateString()}</h6></CCol>
                </div>
            </CCol>         
    </CRow>  
    <CRow>
    <CCol  className='mt-2' style={{ marginLeft: '10px' }}>
                        <div>
                            <h6>Name:-{empData?.trainerName} </h6>
                            <h6> Designation:- {empData?.designation} </h6>
                            <h6> Location:- {empData?.location}</h6>
                        </div>
                    </CCol>
            <CCol  className='mt-2' style={{ marginRight: '30px' }}>
                        <div className='float-end'>
                            <h6>Department:- {empData.Department}</h6>
                            <h6>Mode Of Payment:- {empData.modeOfPayment} </h6>
                            <h6>Bank Account No:- {empData.bankAccountNo}</h6>
                        </div>
            </CCol>
    </CRow>
    
    <CRow>
        <CCol className='mt-2 p-2' >
            
            <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                                <CTableRow>
                                <CTableHeaderCell colSpan={4} className='border'>
                                      Earning
                                  </CTableHeaderCell>
                                </CTableRow>
                                <CTableRow >
                                    <CTableHeaderCell>Total Working Hours</CTableHeaderCell>
                                    <CTableHeaderCell>Per Hours Amount</CTableHeaderCell>
                                    <CTableHeaderCell>Amount</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                        
                                        <CTableRow >
                                            <CTableDataCell>{empData.totalWorkingHours}</CTableDataCell>        
                                            <CTableDataCell>{empData.prHourSalary}</CTableDataCell>            
                                            <CTableDataCell>{empData.totalAmount}</CTableDataCell>    
                                        </CTableRow>

                            </CTableBody>
                        </CTable>


        <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                            <CTableRow>
                                <CTableHeaderCell colSpan={5} className='border'>
                                      Deduction
                                   </CTableHeaderCell>
                                </CTableRow>
                                <CTableRow >
                                    <CTableHeaderCell>TDS</CTableHeaderCell>
                                    <CTableHeaderCell>Professional Tax</CTableHeaderCell>
                                    <CTableHeaderCell>PF</CTableHeaderCell>
                                    <CTableHeaderCell>Advanced Salary</CTableHeaderCell>
                                    <CTableHeaderCell>Total Deduction</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>  
                                        <CTableRow >
                                            <CTableDataCell>{empData.tds}</CTableDataCell>     
                                            <CTableDataCell>{empData.pt}</CTableDataCell>    
                                            <CTableDataCell>{empData.Pf}</CTableDataCell>    
                                            <CTableDataCell>{empData.advDec}</CTableDataCell>  
                                            <CTableDataCell>{+empData.advDec+ +empData.pt + +empData.tds}</CTableDataCell>     
                                        </CTableRow>
                            </CTableBody>
                        </CTable>


      
       
        <CCol>  
                    <CTable>
                    
                       <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >    
                           
                               <CTableRow >
                                   <CTableHeaderCell>Mode Of Payment </CTableHeaderCell>
                                   <CTableHeaderCell>   NET SALARY </CTableHeaderCell>
                               </CTableRow>
                           </CTableHead>
                           <CTableBody>   
                                       <CTableRow >
                                           <CTableDataCell>{empData.modeOfPayment}</CTableDataCell>     
                                           <CTableDataCell>{empData.amount}</CTableDataCell>    
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

export default TrainerSlip
