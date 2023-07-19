import {
    CCard,
    CCardBody,
    CCardHeader,
    CCardTitle,
} from "@coreui/react";
import React from 'react'

const AutomatedCommunication = () => {
  return (
    <div>
      <CCard className="mb-3 border-success">
            <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                <CCardTitle>Automated Communication</CCardTitle>
            </CCardHeader>
            <CCardBody>
                <p className="text-center">Coming soon</p>
            </CCardBody>

        </CCard> 
    </div>
  )
}

export default AutomatedCommunication
