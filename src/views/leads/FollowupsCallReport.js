import React, { useEffect, useState } from 'react'
import {
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormInput,
    CFormSelect,
    CFormTextarea,
    CInputGroup,
    CInputGroupText,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
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
import axios from 'axios';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useAdminValidation } from '../Custom-hook/adminValidation'


const FollowupCallReport = () => {

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
    const preMonth = new Date().getMonth()
    let pageNumber = 0

    const [dateFilterObj,setDteFilterObj] = useState({
        
        startDate:moment(new Date(new Date().getFullYear(),preMonth,1)).format('YYYY-MM-DD'),
        endDate:moment(new Date()).format('YYYY-MM-DD')
      })

    const url = useSelector((el) => el.domainOfApi)

    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;
    const [result1, setResult1] = useState([]);
    const [paging,setPaging] = useState(0)

    const pathRoute = useAdminValidation()

     useEffect(()=>{
      getEnquiry()
     },[])   

   
    function getEnquiry() {
        axios.get(`${url}/prospect/${dateFilterObj.startDate}/${dateFilterObj.endDate}/${pathRoute}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                setResult1(res.data.reverse().filter((list) =>
                list.status === 'CallReport'
             ))
            })
            .catch((error) => {
                console.error(error)
            })
    }

    return (
        <CRow>
            <CCol lg={12} sm={12}>
                <CCard className='mb-3 border-top-success border-top-3'>
                    <CCardHeader>
                        <strong className="mt-2">Call Report <span className='float-end'>Total Call Report 
                        : {result1.length}</span></strong>
                    </CCardHeader>
                    <CCardBody>

                    <div className='d-flex justify-content-between mb-2'>
                            <CInputGroup style={{ width: "500px" }}>

                                <CInputGroupText
                                    component="label"
                                    htmlFor="inputGroupSelect01"
                                >
                                    Form
                                </CInputGroupText>
                                <CFormInput
                                    type="date"
                                    value={dateFilterObj.startDate}
                                    onChange={(e)=>setDteFilterObj((prev)=>({...prev,startDate:e.target.value}))}

                                  
                                /><CInputGroupText
                                    component="label"
                                    htmlFor="inputGroupSelect01"

                                >
                                    To
                                </CInputGroupText>
                                <CFormInput
                                    type="date"
                                    value={dateFilterObj.endDate}
                                    onChange={(e)=>setDteFilterObj((prev)=>({...prev,endDate:e.target.value}))}
                                                                   />
                                <CButton type="button" color="primary" onClick={()=>getEnquiry()} >
                                    Go
                                </CButton>
                            </CInputGroup>
                        </div>
                      
                        <CTable className='mt-3' align="middle" bordered  hover responsive>
                            <CTableHead color={'darkGreen'} >
                                    <CTableHeaderCell>Sr.No</CTableHeaderCell>
                                    <CTableHeaderCell>Enquiry ID</CTableHeaderCell>
                                    <CTableHeaderCell>Date</CTableHeaderCell>
                                    <CTableHeaderCell>Time</CTableHeaderCell>
                                    <CTableHeaderCell>Name</CTableHeaderCell>
                                    <CTableHeaderCell>Email</CTableHeaderCell>
                                    <CTableHeaderCell>Mobile</CTableHeaderCell>
                                    <CTableHeaderCell>Service</CTableHeaderCell>
                                    <CTableHeaderCell>Call Status</CTableHeaderCell>
                                 
                                    <CTableHeaderCell>Discussion</CTableHeaderCell>
                                    <CTableHeaderCell>Counseller</CTableHeaderCell>
                            </CTableHead>
                            <CTableBody>
                                <CTableRow>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "60px" }}
                                            type="text"
                                            disabled
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "120px" }}
                                            value={Search1}
                                            onChange={(e) => setSearch1(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "90px" }}
                                            value={Search2}
                                            onChange={(e) => setSearch2(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "120px" }}
                                            value={Search3}
                                            onChange={(e) => setSearch3(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "120px" }}
                                            value={Search4}
                                            onChange={(e) => setSearch4(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            value={Search5}
                                            onChange={(e) => setSearch5(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "80px" }}
                                            value={Search6}
                                            onChange={(e) => setSearch6(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "100px" }}
                                            value={Search7}
                                            onChange={(e) => setSearch7(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "100px" }}
                                            value={Search8}
                                            onChange={(e) => setSearch8(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "100px" }}
                                            type="text"
                                            value={Search9}
                                            onChange={(e) => setSearch9(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "120px" }}
                                            type="text"
                                            value={Search10}
                                            onChange={(e) => setSearch10(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                </CTableRow>
                                {result1.filter((list) =>
                                   (list.EnquiryID||'').toLowerCase().includes(Search1.toLowerCase()) && 
                                   moment(list.CallDate).format("DD-MM-YYYY").includes(Search2.toLowerCase()) &&
                                   (list.Name||'').toLowerCase().includes(Search4.toLowerCase()) &&
                                   (list.Email||'').toLowerCase().includes(Search5.toLowerCase()) &&
                                   (list.Contact+""||'').toLowerCase().includes(Search6.toLowerCase()) &&
                                   (list.ServiceName||'').toLowerCase().includes(Search7.toLowerCase()) &&
                                   (list.CallStatus||'').toLowerCase().includes(Search8.toLowerCase()) &&
                                   (list.Discussion||'').toLowerCase().includes(Search9.toLowerCase()) &&
                                   (list.Counseller||'').toLowerCase().includes(Search10.toLowerCase()) 
                                ).filter((el)=>{
                                    pageNumber++
                                    return el
                              }).slice(paging * 10, paging * 10 + 10).map((item, index) => (
                                    <CTableRow key={index}>
                                        <CTableDataCell>{index + 1 + (paging * 10)}</CTableDataCell>
                                        <CTableDataCell>{item.EnquiryID}</CTableDataCell>
                                        <CTableDataCell className='text-center'>{moment(item.CallDate).format("DD-MM-YYYY")}</CTableDataCell>
                                        <CTableDataCell>{moment(item.Time, "HH:mm").format("hh:mm A")}</CTableDataCell>
                                        <CTableDataCell>{item.Name}</CTableDataCell>
                                        <CTableDataCell>{item.Email}</CTableDataCell>
                                        <CTableDataCell>{item.Contact}</CTableDataCell>
                                        <CTableDataCell>{item.ServiceName}</CTableDataCell>
                                        <CTableDataCell>{item.CallStatus}</CTableDataCell>
                                        
                                        <CTableDataCell>{item.Discussion}</CTableDataCell>
                                        <CTableDataCell>{item.Counseller}</CTableDataCell>
                                    </CTableRow>
                                ))}
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                 
                    <CPagination aria-label="Page navigation example" align="center" className='mt-2'>
                        <CPaginationItem style={{ cursor: 'pointer' }} aria-label="Previous" disabled={paging != 0 ? false : true}
                            onClick={() => paging > 0 && setPaging(paging - 1)}>
                            <span aria-hidden="true">&laquo;</span>
                        </CPaginationItem>
                        <CPaginationItem style={{ cursor: 'pointer' }} active onClick={() => setPaging(0)}>{paging + 1}</CPaginationItem>
                        {pageNumber > (paging + 1) * 10 && <CPaginationItem style={{ cursor: 'pointer' }}
                            onClick={() => setPaging(paging + 1)} >{paging + 2}</CPaginationItem>}
                        {pageNumber > (paging + 2) * 10 && <CPaginationItem style={{ cursor: 'pointer' }}
                            onClick={() => setPaging(paging + 2)}>{paging + 3}</CPaginationItem>}
                        {pageNumber > (paging + 1) * 10 ?
                            <CPaginationItem aria-label="Next" style={{ cursor: 'pointer' }} onClick={() => setPaging(paging + 1)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                            : <CPaginationItem disabled aria-label="Next" style={{ cursor: 'pointer' }} onClick={() => setPaging(paging + 1)}>
                                <span aria-hidden="true">&raquo;</span>
                     </CPaginationItem>
                        }
                    </CPagination>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default FollowupCallReport

