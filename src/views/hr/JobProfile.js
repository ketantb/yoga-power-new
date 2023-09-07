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


let user = JSON.parse(localStorage.getItem('user-info'))
console.log(user);
const token = user.token;

const JobProfile = () => {

    const headers = {
        "Authorization": `Bearer ${token}`,
       }

    const [Search1, setSearch1] = useState('')
    const [Search2, setSearch2] = useState('')
    const [Search10, setSearch10] = useState('')
    const url = useSelector((el) => el.domainOfApi)
    const pathVal =  useAdminValidation()
    const [jobProfileData,setJobProfileData] = useState([])


    const getJobProfileData = async ()=>{
        axios.get(`${url}/jobProfile/${pathVal}`,{headers}).then((el)=>{
         if(el.status!==200){
          return 
         }
         console.log(el.data)
         setJobProfileData(el.data)
       }).catch((error)=>{console.log(error)})
       }

    useEffect(() => {
        getJobProfileData()
    }, []);


  
    function toHandleTitleAndValue(inputString=''){
        var keyValuePairs = [];
        
        var regex = /\[([^\]]*)\]\s*:\s*\(([^)]*)\)/g;
        var match;
      
        while ((match = regex.exec(inputString)) !== null) {
          var key = match[1].trim(); // Remove extra spaces from key
          var value = match[2].trim(); // Remove extra spaces from value
          keyValuePairs[key] = value;
        }
    
        return Object.entries(keyValuePairs).map((el)=>
        <div className="d-flex ">
        <h6>{(el[0])||''}</h6>:- 
        <p>{(el[1]||'')}</p>
        </div>
        )
    }    
  
    


    return (
        <CRow>
            <CCol lg={12} sm={12}>
                <CCard className="mb-3 border-success">
                    <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                        <CCardTitle className="mt-2">Job Profile</CCardTitle>
                    </CCardHeader>
                    <CCardBody>
                        
                    <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                                <CTableRow >
                                    <CTableHeaderCell>Sr.No</CTableHeaderCell>

                                    <CTableHeaderCell style={{width:'fit-content'}}>Designation</CTableHeaderCell>
                                    <CTableHeaderCell>Job Profile</CTableHeaderCell>
                                 
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                        {jobProfileData.map((el,i) => (
                            <CTableRow className="text-center">
                                <CTableDataCell>
                                    {i+1}
                                </CTableDataCell>
                                <CTableDataCell style={{width:'fit-content'}}>
                                    {el.Designations}
                                </CTableDataCell>
                                <CTableDataCell>
                                    {toHandleTitleAndValue(el.jobProfile)}
                                </CTableDataCell>
                               
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

export default JobProfile
