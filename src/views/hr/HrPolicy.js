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
import CIcon from '@coreui/icons-react'
import { cilArrowCircleBottom, cilArrowCircleTop, cilInfo } from '@coreui/icons'
import { MdCall, MdDelete, MdEdit, MdMail } from 'react-icons/md';
import { BsPlusCircle, BsWhatsapp } from 'react-icons/bs';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useAdminValidation } from '../Custom-hook/adminValidation';

const HrPolicy = () => {

    const url = useSelector((el)=>el.domainOfApi) 
    const pathValMaster  = useAdminValidation('Master') 

    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;
    const [result1, setResult1] = useState([]);
    const [paging, setPaging] = useState(0);

    const headers = {
        'Authorization': `Bearer ${token}`,
        'My-Custom-Header': 'foobar'
    };
    useEffect(() => {
        getPolicy()
    }, []);

    function getPolicy() {
        axios.get(`${url}/hrPolicyMaster/${pathValMaster}`, {headers})
            .then((res) => {
                console.log(res.data)
                setResult1(res.data.reverse())
            })
            .catch((error) => {
                console.error(error)
            })
    }

    return (
        <CRow>
            <CCol lg={12} sm={12}>
                <CCard className="mb-3 border-success">
                    <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                        <CCardTitle className="mt-2">Hr Policy</CCardTitle>
                    </CCardHeader>
                    <CCardBody>
                       
                        <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                            <CTableRow >
                                    <CTableHeaderCell>Sno.</CTableHeaderCell>
                                    <CTableHeaderCell>Title</CTableHeaderCell>
                                    <CTableHeaderCell>Policy</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                               
                                {result1.map((item, index) => (
                                        <CTableRow style={{fontSize:'17px',fontWeight:'700'}} key={index} >
                                            <CTableDataCell>{index + 1 + (paging * 10)}</CTableDataCell>
                                            <CTableDataCell>{item.Title}</CTableDataCell>
                                            <CTableDataCell style={{maxWidth:'400px'}}>{item.Policy}</CTableDataCell>
                                        </CTableRow>

                                    ))}
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                   
                </CCard>
            </CCol>
        </CRow>
    )
}

export default HrPolicy
