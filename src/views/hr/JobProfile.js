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


let user = JSON.parse(localStorage.getItem('user-info'))
console.log(user);
const token = user.token;

const JobProfile = () => {

    const headers = {
        "Authorization": `Bearer ${token}`,
       }

    const url = useSelector((el) => el.domainOfApi)
    const pathVal =  useAdminValidation()
    const [jobProfileData,setJobProfileData] = useState([])
    const jobProfileFunction = useJobProfileHook()

    const [designationData,setDesignationData] = useState([])
    const [selectedDesignation,setSelectedDesignation] = useState('')
    const [paging, setPaging] = useState(0);


    const getJobProfileData = async ()=>{
        axios.get(`${url}/jobProfile/${pathVal}`,{headers}).then((el)=>{
         if(el.status!==200){
          return 
         }
         setJobProfileData(el.data)
         setDesignationData(el.data.map((el)=>el.Designations).filter((el,i,arr)=>arr.indexOf(el)===i))
       }).catch((error)=>{console.log(error)})
       }

    useEffect(() => {
        getJobProfileData()
    }, []);



    function tofilterData(data){

        return data.filter((el)=>`${el.Designations}`.trim().toLowerCase().includes(selectedDesignation.trim().toLowerCase()))
     }

     


    return (
        <CRow>
            <CCol lg={12} sm={12}>
                <CCard className="mb-3 border-success">
                    <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                        <CCardTitle className="mt-2">Job Profile</CCardTitle>
                    </CCardHeader>
                    <CCardBody>

                    <CRow>
                                <CCol md={6} lg={4} sm={8}>
                                <CFormSelect
                                    label='Filter by staff'
                                    className="mb-2"
                                    value={selectedDesignation}
                                    onChange={(e)=>setSelectedDesignation(e.target.value)}
                                >
                                    <option value={''}> Select Designation</option>
                                    {designationData.map((el)=>{
                                     return <option>{el}</option>
                                    })}

                                </CFormSelect>
                                <CButton onClick={()=>setSelectedDesignation('')}>Clear Filter</CButton>
                                </CCol>
                            </CRow>
                        
                    <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                                <CTableRow >
                                    <CTableHeaderCell>Sr.No</CTableHeaderCell>

                                    <CTableHeaderCell style={{width:'fit-content'}}>Designation</CTableHeaderCell>
                                    <CTableHeaderCell>Job Profile</CTableHeaderCell>
                                 
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                        {tofilterData(jobProfileData).slice(paging * 5, paging * 5 + 5).map((el,i) => (
                            <CTableRow className="text-center">
                                <CTableDataCell>
                                {i + 1 + (paging * 5)}
                                </CTableDataCell>
                                <CTableDataCell style={{width:'fit-content'}}>
                                    {el.Designations}
                                </CTableDataCell>
                                <CTableDataCell>
                                    {jobProfileFunction(el.jobProfile)}
                                </CTableDataCell>
                               
                            </CTableRow>

                                ))}
                              
                          

                            </CTableBody>
                        </CTable>
                        <CPagination aria-label="Page navigation example" align="center" className='mt-2'>
                        <CPaginationItem aria-label="Previous" disabled={paging != 0 ? false : true} onClick={() => paging > 0 && setPaging(paging - 1)}>
                            <span aria-hidden="true">&laquo;</span>
                        </CPaginationItem>
                        <CPaginationItem active onClick={() => setPaging(0)}>{paging + 1}</CPaginationItem>
                        {tofilterData(jobProfileData).length > (paging + 1) * 5 && <CPaginationItem onClick={() => setPaging(paging + 1)} >{paging + 2}</CPaginationItem>}
                        {tofilterData(jobProfileData).length > (paging + 2) * 5 && <CPaginationItem onClick={() => setPaging(paging + 2)}>{paging + 3}</CPaginationItem>}
                        {tofilterData(jobProfileData).length > (paging + 1) * 5 ?
                            <CPaginationItem aria-label="Next" onClick={() => setPaging(paging + 1)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                            : <CPaginationItem disabled aria-label="Next" onClick={() => setPaging(paging + 1)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                        }
                    </CPagination>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default JobProfile
