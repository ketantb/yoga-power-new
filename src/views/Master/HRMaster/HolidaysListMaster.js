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
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { useAdminValidation,useUniqAdminObjeact } from "src/views/Custom-hook/adminValidation";
import { herMasterRightVal} from "src/views/hr/Rights/rightsValue/masterRightsValue";

const HolidaysListMaster = () => {
    const [action1, setAction1] = useState(false)
    const [date, setDate] = useState('')
    const [holiday, setHoliday] = useState('')
    const [holidayNo, setHolidayNo] = useState('')
    const [status, setStatus] = useState(false)
    const url = useSelector((el) => el.domainOfApi)
    const uniqObjVal = useUniqAdminObjeact() 
    const pathValMaster = useAdminValidation('Master')
    const monthName =     ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const rightsData = useSelector((el)=>el?.empLoyeeRights?.masterRights?.masterHr
    ?.items?.masterHolidaysList?.rights) 
    
    const access = rightsData?rightsData:[]
    const isAdmin = useSelector((el)=>el.isAdmin)
    
    const addHolidayListMaster = (access.includes(herMasterRightVal.addHolidayListMaster) || isAdmin )
    const holidayListMasterStatus =  (access.includes(herMasterRightVal.holidayListMasterStatus) || isAdmin )
    const deleteHolidayListMaster =  (access.includes(herMasterRightVal.deleteHolidayListMaster) || isAdmin )

    const [selectedFullYear,setSelectedFullYear] = useState('0')
    const [month,setMonth] = useState(new Date().getMonth()) 


    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;
    const username = user.user.username;
    const [result1, setResult1] = useState([]);
    const [paging, setPaging] = useState(0);
    const headers = {
        'Authorization': `Bearer ${token}`,
        'My-Custom-Header': 'foobar'
    };
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
                console.log(res.data)
                setResult1(res.data.reverse())
            })
            .catch((error) => {
                console.error(error)
            })
    }

    function createHoliday() {
        if (holiday != '' && date != '') {
            const data = {
                username: username,
                Date: date,
                Holiday: holiday,
                Status: status,
                HolidayNo:holidayNo,        
                ...uniqObjVal        
            }

            console.log(data)
            axios.post(`${url}/holidaysListMaster/create`, data, { headers })
                .then((resp) => {
                    alert('Successfully Added')
                    getHolidayList()
                    setAction1(false)
                    setDate('')
                    setHoliday('')
                    setStatus(false)
                })
                .catch((error) => console.log(error))
        } else {
            alert('enter lead Source')
        }
    }

    const updateStatus = (id, status) => {
        let item = { Status: status }
        fetch(`${url}/holidaysListMaster/update/${id}`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        }).then((result) => {
            result.json().then((resp) => {
                getHolidayList()
            })
        })
    }

    function deleteData(id) {
        if (confirm('You want to delete this')) {
            fetch(`${url}/holidaysListMaster/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then((result) => {
                result.json().then((resp) => {
                    console.warn(resp)
                    getHolidayList()
                })
            })
        }
        return
    }

    function toFilterData(data){
        return data.filter((item)=>{
        return selectedFullYear==='0'?true:new Date(item.Date).getFullYear() === +selectedFullYear&&
        new Date(item.Date).getMonth() === +month
        })
        }
    

    return (
        <CRow>
            <CCol lg={12} sm={12}>
                <CCard className="mb-3 border-success">
                    <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                        <CCardTitle className="mt-2">Holiday List Master</CCardTitle>
                    </CCardHeader>
                    <CCardBody>
                        
                        <CRow  className='d-flex mb-2'>
                            <CCol lg={3} sm={6} className='mb-2'>
                                <CFormInput
                                    type='date'
                                    placeholder="Search"
                                    label="Starting Month & Year"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}

                                />
                            </CCol>
                            <CCol lg={3} sm={6} className='mb-2'>
                                <CFormInput
                                    type='text'
                                    placeholder="Enter Holiday"
                                    label="Holiday"
                                    value={holiday}
                                    onChange={(e) => setHoliday(e.target.value)}
                                />
                            </CCol>
                            <CCol lg={3} sm={6} className='mb-2'>
                                <CFormInput
                                    type='number'
                                    placeholder="Enter Holiday"
                                    label="Holiday No"
                                    value={holidayNo}
                                    onChange={(e) => setHolidayNo(e.target.value)}
                                />
                            </CCol>
                        </CRow>
                        <CFormSwitch size="xl"  label="Status" value={status} onChange={() => setStatus(!status)} />
                        <CButton  style={{display:addHolidayListMaster?'':'none'}} type="button" color="primary" onClick={() => createHoliday()}>
                            Save
                        </CButton>
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
                            <CCol lg={12} md={12} sm={12} className="mt-2">
                               <CButton
                               onClick={()=>{
                                setMonth(new Date().getMonth())
                                setSelectedFullYear('0')
                               }}
                               >Clear Filter</CButton>
                            </CCol>
                        </CRow>
                        <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                                <CTableRow >
                                    <CTableHeaderCell>Sr no.</CTableHeaderCell>
                                    <CTableHeaderCell>Date</CTableHeaderCell>
                                    <CTableHeaderCell>Enter Holiday</CTableHeaderCell>
                                    <CTableHeaderCell>Holiday No</CTableHeaderCell>
                                    <CTableHeaderCell style={{display:holidayListMasterStatus?'':'none'}} >Status</CTableHeaderCell>
                                    <CTableHeaderCell style={{display:deleteHolidayListMaster?'':'none'}} >Action</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {toFilterData(result1).slice(paging * 10, paging * 10 + 10).filter((list) => list).map((item, index) => (
                                     (
                                        <CTableRow key={index} className="text-center">
                                            <CTableDataCell>{index + 1 + (paging * 10)}</CTableDataCell>
                                            <CTableDataCell>{moment(item.Date).format("MM-DD-YYYY")}</CTableDataCell>
                                            <CTableDataCell >{item.Holiday}</CTableDataCell>
                                            <CTableDataCell >{item.HolidayNo}</CTableDataCell>
                                            <CTableDataCell style={{display:holidayListMasterStatus?'':'none'}} className="text-center"><CFormSwitch size="xl" style={{ cursor: 'pointer' }} id={item._id} value={item.Status} checked={item.Status} onChange={() => updateStatus(item._id, !item.Status)} /></CTableDataCell>
                                            <CTableDataCell style={{display:deleteHolidayListMaster?'':'none'}}> <MdDelete style={{ cursor: 'pointer', markerStart: '10px' }} onClick={() => deleteData(item._id)} size='20px' /> </CTableDataCell>
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

export default HolidaysListMaster
