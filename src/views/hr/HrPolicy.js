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
import { Link } from "react-router-dom";
import useJobProfileHook from '../Master/HRMaster/useJobProfileHook';

const HrPolicy = () => {

    const url = useSelector((el)=>el.domainOfApi) 
    const pathValMaster  = useAdminValidation('Master') 

    let user = JSON.parse(localStorage.getItem('user-info'))
    const jobProfileFun = useJobProfileHook()
    const token = user.token;
    const [result1, setResult1] = useState([]);
    const [paging, setPaging] = useState(0);
    const [selectedPolicy,setSelectedPolicy] = useState()

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
                setResult1(res.data.reverse())
                setSelectedPolicy(res.data[0]?.Policy)

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
                                            
                               
                            <ul className="d-flex" style={{listStyleType:'none'}} >
                                  {result1.slice(paging * 10, paging * 10 + 10).filter((list) =>

                                    list).map((item, index) => (
                                          <li className="mx-1"  >
                                            <CButton variant={item.Policy===selectedPolicy?'':'outline'} onClick={()=>setSelectedPolicy(item.Policy)} style={{height:'fit-content'}}   >{item.Title}</CButton>
                                         </li>                                            
                                    ))}
                               </ul>

                               <p>
                                {jobProfileFun(selectedPolicy)}
                               </p>
                          
                    </CCardBody>
                   
                </CCard>
            </CCol>
        </CRow>
    )
}

export default HrPolicy
