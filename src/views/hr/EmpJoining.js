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
import moment from 'moment';
import { useSelector } from "react-redux";
import { useAdminValidation } from '../Custom-hook/adminValidation';
import useJobProfileHook from '../Master/HRMaster/useJobProfileHook';

const EmpJoining = () => {

    const [empJoininSheetData,setEmpJoininSheetData] = useState([])
    const url = useSelector((el) => el.domainOfApi)
    const pathMasterVel = useAdminValidation('Master')
    const jobProfileFun = useJobProfileHook()
    const [selectedDocumentDetails,setSelectedDocumentDetails] = useState('')



    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;
    console.log(token);

    const headers = {
        "Authorization": `Bearer ${token}`,
       }
    
    useEffect(()=>{
        getEmpJoiningData()    
    },[])

    const getEmpJoiningData = ()=>{
        axios.get(`${url}/empJoining/${pathMasterVel}`,{headers}).then((el)=>{
         console.log(el.data)
         if(!el.data){
          return 
         }
         setEmpJoininSheetData(el.data)
         setSelectedDocumentDetails(el.data[0].documentDetails)
       }).catch((error)=>{console.log(error)})
       }

   

    return (
        <CRow>
            <CCol lg={12} sm={12}>
                <CCard className="mb-3 border-success">
                    <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                        <CCardTitle className="mt-2">Employee Joining</CCardTitle>
                    </CCardHeader>
                    <CCardBody>
                    

                            <ul className="d-flex" style={{listStyleType:'none'}} >
                                  {empJoininSheetData.filter((list) =>

                                    list).map((item) => (
                                          <li className="mx-1 d-flex mx-2"  >
                                            <CButton className="mx-1" variant={item.documentDetails===selectedDocumentDetails?'':'outline'} onClick={()=>setSelectedDocumentDetails(item.documentDetails)} style={{height:'fit-content'}}   >{item.DocumentName}</CButton>
                                            
                                         </li>                                            
                                    ))}
                               </ul>

                               <CCard className='p-2'>
                                {jobProfileFun(selectedDocumentDetails)}
                               </CCard>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default EmpJoining
