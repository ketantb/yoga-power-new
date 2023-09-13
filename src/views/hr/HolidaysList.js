import { cilArrowCircleTop } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
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
    CFormSwitch,
    CPagination,
    CPaginationItem,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from "@coreui/react";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAdminValidation } from "../Custom-hook/adminValidation";

const HolidaysList = () => {
    const  url = useSelector((el) => el.domainOfApi)
    const pathValMaster = useAdminValidation('Master')
    const monthName =     ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']


    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;
    const [result1, setResult1] = useState([]);
    const [paging, setPaging] = useState(0);
    const [selectedFullYear,setSelectedFullYear] = useState(new Date().getFullYear())
    const [month,setMonth] = useState(new Date().getMonth()) 
  
    useEffect(() => {
        getHolidayList()
    }, []);

    function getHolidayList() {
        axios.get(`${url}/holidaysListMaster/${pathValMaster}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                setResult1(res.data.reverse())
            })
            .catch((error) => {
                console.error(error)
            })
    }

    function toFilterData(data){
    return data.filter((item)=>{
    return new Date(item.Date).getFullYear() === +selectedFullYear&&
    new Date(item.Date).getMonth() === +month
    })
    }



    return (
        <CRow>
            <CCol lg={12} sm={12}>
                <CCard className="mb-3 border-success">
                    <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                        <CCardTitle className="mt-2">Holiday List</CCardTitle>
                    </CCardHeader>
                    <CCardBody>
                        <CRow>
                            <CCol lg={4} md={6} sm={8}>
                            <CFormInput
                             type='number'
                             label='filter by year'
                             value={selectedFullYear}
                             onChange={(e)=>setSelectedFullYear(e.target.value)}
                            />
                            </CCol>
                            <CCol  lg={4} md={6} sm={8}>
                              <CFormSelect
                                    value={month}
                                    onChange={(e)=>setMonth(e.target.value)}
                                    label='filter by month'

                              >
                                <option value={''}>Select Month</option>
                                {monthName.map((el,i)=>
                                  <option value={i}>{el}</option>
                                )}
                              </CFormSelect>
                            </CCol>
                        </CRow>
                        <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                                <CTableRow >
                                <CTableHeaderCell>Sr no.</CTableHeaderCell>
                                    <CTableHeaderCell>Date</CTableHeaderCell>
                                    <CTableHeaderCell>Holiday Name</CTableHeaderCell>
                                    <CTableHeaderCell>No of Holiday</CTableHeaderCell>
                                    <CTableHeaderCell>Status</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {toFilterData(result1).slice(paging * 10, paging * 10 + 10).map((item, index) => (
                                    (
                                        <CTableRow key={index}>
                                            <CTableDataCell>{index + 1 + (paging * 10)}</CTableDataCell>
                                            <CTableDataCell>{moment(item.Date).format("MM-DD-YYYY")}</CTableDataCell>
                                            <CTableDataCell>{item.Holiday}</CTableDataCell>
                                            <CTableDataCell className="text-center">{item.HolidayNo}</CTableDataCell>
                                            <CTableDataCell className="text-center"><CFormSwitch size="xl" style={{ cursor: 'pointer' }} id={item._id} value={item.Status} checked={item.Status} /></CTableDataCell>
                                        </CTableRow>
                                    )
                                ))}
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                    <CPagination aria-label="Page navigation example" align="center" className='mt-2'>
                        <CPaginationItem aria-label="Previous" disabled={paging != 0 ? false : true} onClick={() => paging > 0 && setPaging(paging - 1)}>
                            <span aria-hidden="true">&laquo;</span>
                        </CPaginationItem>
                        <CPaginationItem active onClick={() => setPaging(0)}>{paging + 1}</CPaginationItem>
                        {toFilterData(result1).length > (paging + 1) * 10 && <CPaginationItem onClick={() => setPaging(paging + 1)} >{paging + 2}</CPaginationItem>}

                        {toFilterData(result1).length > (paging + 2) * 10 && <CPaginationItem onClick={() => setPaging(paging + 2)}>{paging + 3}</CPaginationItem>}
                        {toFilterData(result1).length > (paging + 1) * 10 ?
                            <CPaginationItem aria-label="Next" onClick={() => setPaging(paging + 1)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                            : <CPaginationItem disabled aria-label="Next" onClick={() => setPaging(paging + 1)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                        }
                    </CPagination>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default HolidaysList
