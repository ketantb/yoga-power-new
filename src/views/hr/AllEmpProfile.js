import React, { useEffect, useState,useRef } from 'react'
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
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowCircleBottom, cilArrowCircleTop, cilInfo } from '@coreui/icons'
import { MdCall, MdDelete, MdEdit, MdMail } from 'react-icons/md';
import { BsPlusCircle, BsWhatsapp } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { useSelector } from 'react-redux'
import { useAdminValidation } from '../Custom-hook/adminValidation';
import { hrManagement } from './Rights/rightsValue/erpRightsValue';
import { useNavigate } from 'react-router-dom';
import { useExportSelctedEmpData } from './useExportEmpData';
import { useReactToPrint } from 'react-to-print'

const EmployeeProfile = React.lazy(()=>import('./Hr-Employee-Details/Tables/EmployeeProfile'))


const AllEmpProfile = () => {
    const url = useSelector((el)=>el.domainOfApi) 
    const navigate = useNavigate()
    const exportEmpData = useExportSelctedEmpData('allEmpProfile.xlsx')
    const [resumeUrl,setResumeUrl]=  useState('')
    const [visi1,setVisi1] = useState(false)

    const componentRef = useRef()

const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'yog-power',
    onAfterPrint: () => alert('print success')
})

    const rightsData = useSelector((el)=>el?.empLoyeeRights?.erpRights?.erpHrManagement
    ?.items?.empLoyeeHrProfile?.items?.erpEmployeeProfile?.rights) 
    const access = rightsData?rightsData:[]
    const isAdmin = useSelector((el)=>el.isAdmin)
                                         
    

   const  allImpProfileImportExport = (access.includes(hrManagement.allImpProfileImportExport)||isAdmin)
   const  allImpProfileView = (access.includes(hrManagement.allImpProfileView)||isAdmin)
   const  allImpProfileStatus = (access.includes(hrManagement.allImpProfileStatus)||isAdmin)
   const  allImpProfileAction =  (access.includes(hrManagement.allImpProfileAction)||isAdmin)
   const  allImpProfileEdit =  (access.includes(hrManagement.allImpProfileEdit)||isAdmin)
   const  allImpProfileDelete = (access.includes(hrManagement.allImpProfileDelete)||isAdmin)



    const pathName = useAdminValidation('Master')
    const [Search1, setSearch1] = useState('')
    const [Search2, setSearch2] = useState('')
    const [Search3, setSearch3] = useState('')
    const [Search4, setSearch4] = useState('')
    const [Search5, setSearch5] = useState('')
    const [Search6, setSearch6] = useState('')
    const [Search7, setSearch7] = useState('')
    const [Search8, setSearch8] = useState('')
    const [Search9, setSearch9] = useState('')
    const [Search10, setSearch10] = useState('')

    const [showEditModal,setEditModal] =useState()
    const [id,setId] = useState('')


    const hiddenXLExportFileInput = useRef('')
    const hiddenXLimportFileInput = useRef('')

    

  
  
    // Import 
  
     const HandaleImportClick = () =>{
         hiddenXLimportFileInput.current.click()
     }
     const HandaleImportChange = (event)=>{
      const importXlFile = event.target.files[0];
      // console.log("Import",importXlFile)
     }
    
    // Export 
  
     const HandaleExportClick = () =>{
      hiddenXLExportFileInput.current.click()
     }
     const HandaleExportChange = (event)=>{
      const importXlFile = event.target.files[0];
     }
  


    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;
  

    const headers = {
        headers: {
            "Authorization": `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }

    const [paging, setPaging] = useState(0);
    useEffect(() => {
        getStaff()
    }, [])

    const [staff, setStaff] = useState([])
    function getStaff() {
        axios.get(`${url}/employeeform/${pathName}`,headers)
            .then((res) => {
                setStaff(res.data.reverse())
            })
            .catch((error) => {
                console.error(error)
            })
    }
    console.log(staff);

    function deleteEnquiry(id) {

        if (confirm('Do you want to delete this')) {
            fetch(`${url}/employeeform/delete/${id}`, {
                method: 'DELETE',
                ...headers,
            }).then((result) => {
                result.json().then((resp) => {
                    console.warn(resp)
                    getStaff()
                })
            })
        }
    }

    function updateRec(data, status) {
        const data1 =  {...data,...{ status: status }}
        fetch(`${url}/employeeform/update/${data._id}`, {
            method: "POST",
            ...headers,
            body: JSON.stringify(data1)
        }).then((resp) => {
            resp.json().then(() => {
                getStaff()
            })
        })
    }



    function allowToEdit(id){
        setId(id)
        setEditModal(true)
    }

    function tofilterData(data){

       return data.filter((list) =>
                list.selected === 'Select' &&
                (list.FullName||'').toLowerCase().includes(Search1.toLowerCase())&&
                (list.ContactNumber+""||'').includes(Search2.toLowerCase())&&
                (moment(list.DateofBirth).format("MM-DD-YYYY").includes(Search4)) &&
                (list.EmailAddress||'').toLowerCase().includes(Search3.toLowerCase())  &&
                (list.Gender||'').toLowerCase().includes(Search5.toLowerCase()) &&
                (list.EmployeeID||'').toLowerCase().includes(Search6.toLowerCase()) &&
                (list.AttendanceID||'').toLowerCase().includes(Search7.toLowerCase())&&
                (list.Department||'').toLowerCase().includes(Search8.toLowerCase())&&
                (list.JobDesignation||'').toLowerCase().includes(Search9.toLowerCase()))
    }
   

    return (
        <CRow>
            <div>
              <CModal  style={{ border: '2px solid #0B5345' }} 
              visible={showEditModal} size='xl'  onClose={()=>{setEditModal(false)}} scrollable>
            <CModalHeader   >
                <CModalTitle>Edit Form</CModalTitle>
            </CModalHeader>
            <CModalBody>
                 {id&&!visi1&&<EmployeeProfile setVisi1={setVisi1} setResumeUrl2={setResumeUrl} 
                 getStaff2={getStaff} Edit={showEditModal} id={id}/>}
            </CModalBody>
              </CModal>
              </div>

              <CModal  size="xl" alignment="center"  scrollable visible={visi1} onClose={() => setVisi1(false)}>
                            <CModalHeader>
                                <CModalTitle>Document Preview</CModalTitle>
                            </CModalHeader>
                            <CModalBody ref={componentRef} style={{ padding: '25px' }}>
                <div style={{minHeight:'100vh'}}>
                    <iframe
                        src={resumeUrl}
                        frameBorder="0"
                        scrolling="auto"
                        width="100%"
                        height="600"
                    ></iframe>
                </div>                  
                            </CModalBody>
                            <CModalFooter>
                                <CButton color="primary" onClick={handlePrint}>Print</CButton>
                            </CModalFooter>
                </CModal> 
             
            <CCol lg={12} sm={12}>
                <CCard className="mb-3 border-success">
                    <CCardHeader>
                        <CCardTitle className="mt-2">All Employee Profile</CCardTitle>
                    </CCardHeader>
                    <CCardBody>
                        <CRow className='d-flex mb-2'>
                            <CCol lg={6} sm={12} className='mb-2'>
                                <CButtonGroup role="group" aria-label="Basic example">
                                    <CButton color="dark" variant="outline" style={{ fontSize: '13px' }}>Total Employee: {staff.filter((list) => list.selected === 'Select' ).length}</CButton>
                                    <CButton color="dark" variant="outline" style={{ fontSize: '13px' }}>Active Employee: {staff.filter((list) => list.selected === 'Select' && list.status === true).length}</CButton>
                                    <CButton color="dark" variant="outline" style={{ fontSize: '13px' }}>Left Employee: {staff.filter((list) => list.selected === 'Select' && list.status === false).length}</CButton>
                                </CButtonGroup>
                            </CCol>
                            <CCol lg={3}></CCol>
                            <CCol lg={3} sm={12}>

                             <CButtonGroup className=' mb-2 float-end' style={{display:((isAdmin||allImpProfileImportExport)?'':'none')}}>
                                  
                                    
                                    <CButton   onClick={()=>exportEmpData(tofilterData(staff))}color="primary">
                                        <CIcon  icon={cilArrowCircleTop} />
                                        {' '}Export
                                    </CButton>
                                    
                            </CButtonGroup>


                            </CCol>
                        </CRow>
                        <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345", width:'150%'}} hover responsive>
                            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                                <CTableRow >
                                <CTableHeaderCell>Sr.No</CTableHeaderCell>
                                    <CTableHeaderCell>Name</CTableHeaderCell>
                                    <CTableHeaderCell>Mobile</CTableHeaderCell>
                                    <CTableHeaderCell>Email-ID</CTableHeaderCell>
                                    <CTableHeaderCell>Date Of Birth</CTableHeaderCell>
                                    <CTableHeaderCell>Gender</CTableHeaderCell>
                                    <CTableHeaderCell style={{minWidth:'150px'}}>Emp Id</CTableHeaderCell>
                                    <CTableHeaderCell>Attendance Id</CTableHeaderCell>
                                    <CTableHeaderCell>Department</CTableHeaderCell>
                                    <CTableHeaderCell>Designation</CTableHeaderCell>
                                    <CTableHeaderCell>Emp Right</CTableHeaderCell>
                                    <CTableHeaderCell style={{display:((isAdmin||allImpProfileStatus)?'':'none')}} >Status</CTableHeaderCell>
                                    <CTableHeaderCell style={{display:((isAdmin||allImpProfileAction)?'':'none')}} >Action</CTableHeaderCell>
                                    <CTableHeaderCell style={{display:((isAdmin||allImpProfileDelete||allImpProfileEdit)?'':'none')}}>Edit/Delete</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                <CTableRow>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "90px" }}
                                            type="text"
                                            disabled
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "90px" }}
                                            value={Search1}
                                            onChange={(e) => setSearch1(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "90px" }}
                                            type="number"
                                            aria-describedby="exampleFormControlInputHelpInline"
                                            value={Search2}
                                            onChange={(e) => setSearch2(e.target.value)}
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "90px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                            value={Search3}
                                            onChange={(e) => setSearch3(e.target.value)}
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "90px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                            value={Search4}
                                            onChange={(e) => setSearch4(e.target.value)}
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "90px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                            value={Search5}
                                            onChange={(e) => setSearch5(e.target.value)}
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            value={Search6}
                                            onChange={(e) => setSearch6(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "90px" }}
                                            value={Search7}
                                            onChange={(e) => setSearch7(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "90px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                            value={Search8}
                                            onChange={(e) => setSearch8(e.target.value)}
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{minWidth: "90px" }}                                          
                                            aria-describedby="exampleFormControlInputHelpInline"
                                            value={Search9}
                                            onChange={(e) => setSearch9(e.target.value)}
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            style={{minWidth: "90px" }}
                                            type="text"                                          
                                            aria-describedby="exampleFormControlInputHelpInline"
                                            disabled
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell style={{display:((isAdmin||allImpProfileStatus)?'':'none')}} >
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "80px" }}
                                            type="number"
                                            aria-describedby="exampleFormControlInputHelpInline"
                                            disabled
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell       style={{display:((isAdmin||allImpProfileAction)?'':'none')}} >
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "90px" }}                                   
                                            aria-describedby="exampleFormControlInputHelpInline"
                                            disabled
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell style={{display:((isAdmin||allImpProfileDelete||allImpProfileEdit)?'':'none')}}>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "90px" }}
                                            disabled
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                   
                                  
                                </CTableRow>
                                {tofilterData(staff).slice(paging * 10, paging * 10 + 10).map((item, index) => (
                                   
                                        <CTableRow key={index}  className='text-center'>
                                            <CTableDataCell>{index + 1 + (paging * 10)}</CTableDataCell>

                                            <CTableDataCell>
                                             {(isAdmin|| allImpProfileView)?
                                                <Link style={{textDecoration:'none'}} to={`/hr/employee-detail/${item._id}`}>
                                                    {item.FullName}</Link>:item.FullName
                                            }</CTableDataCell>

                                            <CTableDataCell>{item.ContactNumber}</CTableDataCell>
                                            <CTableDataCell>{item.EmailAddress}</CTableDataCell>
                                            <CTableDataCell>{moment(item.DateofBirth).format("MM-DD-YYYY")}</CTableDataCell>
                                            <CTableDataCell>{item.Gender}</CTableDataCell>
                                            <CTableDataCell>{item.EmployeeID}</CTableDataCell>
                                            <CTableDataCell>{item.AttendanceID}</CTableDataCell>
                                            <CTableDataCell>{item.Department}</CTableDataCell>
                                            <CTableDataCell>{item.JobDesignation}</CTableDataCell>
                                            <CTableDataCell className='text-center'>
                                                <CButton size='sm' onClick={()=>navigate(`/hr/employee-right/${item._id}/search`)}>
                                                    View  
                                                </CButton>
                                            </CTableDataCell>
                                            <CTableDataCell style={{display:((isAdmin||allImpProfileStatus)?'':'none')}}  >{item.status ? <>
                                            <CButton size='sm' className='mt-1' color='success' onClick={() => updateRec(item, false)} >Active</CButton></>
                                                 : <CButton  size='sm' className='mt-1' color='danger' onClick={() => updateRec(item, true)}>Inactive</CButton>}</CTableDataCell>
                                            <CTableDataCell className='text-center'
                                            style={{display:((isAdmin||allImpProfileAction)?'':'none')}} 

                                            > <a href={`tel:+${item.CountryCode}${item.ContactNumber}`} target="_black">
                                            <MdCall style={{ cursor: 'pointer', markerStart: '10px' }} size='20px' /></a>
                                            <a href={`https://wa.me/${ item.ContactNumber }`}  target="_black">
                                        <BsWhatsapp style={{ marginLeft: "4px", cursor: 'pointer', markerStart: '10px' }} size='20px' /></a>
                                        <a href={`mailto: ${item.Emailaddress }`} target="_black">
                                             <MdMail style={{ cursor: 'pointer', markerStart: '10px', marginLeft: "4px" }} size='20px' /></a>
                                        </CTableDataCell>
                                            
                                            <CTableDataCell className='text-center' style={{display:((isAdmin||allImpProfileDelete||allImpProfileEdit)?'':'none')}}>
                                                 {allImpProfileEdit&&<MdEdit style={{ cursor: 'pointer', markerStart: '10px', marginLeft: "5px" }} 
                                                onClick={() =>{allowToEdit(item._id)}} size='20px' />}
                                                {allImpProfileDelete&&<MdDelete style={{ cursor: 'pointer', markerStart: '10px', marginLeft: "5px" }} 
                                                onClick={() => deleteEnquiry(item._id)} size='20px' />}
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
                        {tofilterData(staff).length > (paging + 1) * 10 && <CPaginationItem onClick={() => setPaging(paging + 1)} >{paging + 2}</CPaginationItem>}
                        {tofilterData(staff).length > (paging + 2) * 10 && <CPaginationItem onClick={() => setPaging(paging + 2)}>{paging + 3}</CPaginationItem>}
                        {tofilterData(staff).length > (paging + 1) * 10 ?
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

export default AllEmpProfile
