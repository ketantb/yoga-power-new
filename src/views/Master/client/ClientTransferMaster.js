import { cilArrowCircleTop } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCardTitle,
    CCol,
    CRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";


const ClientTransferMaster = () => {
  

    return (
        <CRow>
            <CCol lg={12} sm={12}>
                <CCard className="mb-3 border-success">
                    <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                        <CCardTitle className="mt-2">Client Transfer Master</CCardTitle>
                    </CCardHeader>
                    <CCardBody>
                         <p className="text-center"> Coming soon...</p>


                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default ClientTransferMaster
