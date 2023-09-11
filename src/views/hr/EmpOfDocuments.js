import { CCard,CTable,CTableHead,CTableHeaderCell,CTableRow
    ,CTableBody,CTableDataCell,CCol,CRow,CButton,CForm,
    CCardHeader,CCardTitle,CFormInput,CCallout,CModal,
    CModalHeader,CModalTitle,CCardBody,CModalBody,CModalFooter,
    CFormSelect,CPagination,CPaginationItem,
 } from "@coreui/react"
import CIcon from '@coreui/icons-react'
import { cilArrowCircleTop, cilFile } from '@coreui/icons'
import { FaBeer } from 'react-icons/fa';
import DataTable from 'src/components/DataTable'
import { MdCall, MdDelete, MdEdit, MdMail } from 'react-icons/md';
import { useSelector } from "react-redux";
import { useState,useEffect,useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import { useAdminValidation } from "../Custom-hook/adminValidation";





const EmpOfDocuments = () => {

    const [empDocumnetData,setEmpDocumnetData] = useState([])
    const [visi1, setVisi1]= useState(false)
    const [docurl,setDocUrl]= useState('')
    const [staffData,setStaffData] = useState([])
    const [selectedStaff,setSelectedStaff] = useState('')
    const [paging, setPaging] = useState(0);

    const pathVal = useAdminValidation()

    const componentRef = useRef()

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'yog-power',
        onAfterPrint: () => alert('print success')
    })


    const url = useSelector((el) => el.domainOfApi)
    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;

    const headers = {
        "Authorization": `Bearer ${token}`,
       }

   const getEmpDocData = ()=>{
        axios.get(`${url}/emplDocument/${pathVal}`,{headers}).then((el)=>{

        if(!el.data){
         return 
        }
        setEmpDocumnetData(el.data)
        setStaffData(el.data.map((el)=>`${el.empID} ${el.empName}`).filter((el,i,arr)=>arr.indexOf(el)===i))
      }).catch((error)=>{console.log(error)})
      }

      useEffect(()=>{
        getEmpDocData()
      },[])


      const  toViewDoc =(url)=>{
        setVisi1(true)
        setDocUrl(url)
       }

       function tofilterData(data){

        return data.filter((el)=>`${el.empID} ${el.empName}`.includes(selectedStaff))
     }

    return (
        <>

      <CModal  size="xl" alignment="center" scrollable visible={visi1} onClose={() => setVisi1(false)}>
                            <CModalHeader>
                                <CModalTitle>Document Preview</CModalTitle>
                            </CModalHeader>
                            <CModalBody ref={componentRef} style={{ padding: '25px' }}>
                <div style={{minHeight:'100vh'}}>
                    <iframe
                        src={docurl}
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

        <CRow>
            <CCol lg={12} sm={12}>
                <CCard className="mb-3 border-success">
                    <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                        <CCardTitle className="mt-2">Employee  Document </CCardTitle>
                    </CCardHeader>
                    <CCardBody>

                            <CRow>
                                <CCol md={6} lg={4} sm={8}>
                                <CFormSelect
                                    label='Filter by staff'
                                    className="mb-2"
                                    value={selectedStaff}
                                    onChange={(e)=>setSelectedStaff(e.target.value)}
                                >
                                    <option value={''}> Select Staff Name</option>
                                    {staffData.map((el)=>{
                                     return <option>{el}</option>
                                    })}

                                </CFormSelect>
                                <CButton onClick={(e)=>setSelectedStaff('')}>Clear Filter</CButton>
                                </CCol>
                            </CRow>
                        
                    <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                                <CTableRow >
                                    <CTableHeaderCell>Sr.No</CTableHeaderCell>
                                    <CTableHeaderCell>Emp ID</CTableHeaderCell>
                                   <CTableHeaderCell >Emp Name</CTableHeaderCell>
                                   <CTableHeaderCell>Doc Name</CTableHeaderCell>
                                   <CTableHeaderCell>Doc view</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>

                                {tofilterData(empDocumnetData).slice(paging * 10, paging * 10 + 10).map((el,i)=>(

                                    <CTableRow className="text-center" key={i}>
                                        <CTableDataCell>{i + 1 + (paging * 10)}
                                        </CTableDataCell>
                                        <CTableDataCell >
                                        {el.empID}
                                        </CTableDataCell>
                                        <CTableDataCell>
                                        {el.empName}
                                        </CTableDataCell>
                                        <CTableDataCell>
                                        {el.docName}
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <CButton onClick={()=>toViewDoc(el.docview)} >View</CButton>
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
                        {tofilterData(empDocumnetData).length > (paging + 1) * 10 && <CPaginationItem onClick={() => setPaging(paging + 1)} >{paging + 2}</CPaginationItem>}
                        {tofilterData(empDocumnetData).length > (paging + 2) * 10 && <CPaginationItem onClick={() => setPaging(paging + 2)}>{paging + 3}</CPaginationItem>}
                        {tofilterData(empDocumnetData).length > (paging + 1) * 10 ?
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
</>
    )
}

export default EmpOfDocuments
