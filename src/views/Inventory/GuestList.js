import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CForm,
    CFormInput,
    CFormTextarea,
    CPagination,
    CPaginationItem,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CToast,
    CToastBody,
    CToastClose,
} from "@coreui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsWhatsapp } from "react-icons/bs";
import { MdCall, MdDelete, MdEdit, MdMail } from "react-icons/md";
import { useSelector } from "react-redux";

import { useAdminValidation, useUniqAdminObjeact } from "../Custom-hook/adminValidation";



const guestList = ({addedval,editCallval,deleteICall,action1}) => {
    const [action, setAction] = useState(false)
    const [toast, setToast] = useState(false)
    const [id, setId] = useState()
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [category, setCategory] = useState('');
    const [address, setAddress] = useState('');
    const [company, setCompany] = useState('');
    const [result1, setResult1] = useState([])

    const [search1, setSearch1] = useState('')
    const [search2, setSearch2] = useState('')
    const [search3, setSearch3] = useState('')
    const [search4, setSearch4] = useState('')
    const [search5, setSearch5] = useState('')
    const [search6, setSearch6] = useState('')
    const [search7, setSearch7] = useState('')


    let user = JSON.parse(localStorage.getItem('user-info'))
    const [paging, setPaging] = useState(0);
    console.log(user);
    const token = user.token;
    const username = user.user.username;

    const pathVal = useAdminValidation()
    const uniqObjVal = useUniqAdminObjeact()

    const url = useSelector((el)=>el.domainOfApi)

    console.log(addedval,editCallval,deleteICall,action1)


    useEffect(() => {
        getImpCall()
    }, [])

    function getImpCall() {
        axios.get(`${url}/guestList/${pathVal}`, {
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

    const saveImpCall = () => {
        let data = {
            username: username,
            name: name,
            mobile: phone,
            email: email,
            category: category,
            address: address, 
            event: company,
            ...uniqObjVal
        }


        fetch(`${url}/guestList/create`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((resp) => {
            resp.json().then(() => {
                setToast(true)
                setAction(prev=>!prev), clear()
                getImpCall()
            })
        })
    }

    const saveUpdate = () => {
        let data1 = {
            username: username,
            name: name, mobile: phone, email: email, category: category, address: address, event: company,
        }

        fetch(`${url}/guestList/update/${id}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data1)
        }).then((resp) => {
            resp.json().then(() => {
                alert("successfully submitted")
                getImpCall()
                setAction(prev=>!prev), clear()

            })
        })
        getImpCall()

    }

    function deleteCall(id) {

        if (confirm('Do you want to delete this')) {
            fetch(`${url}/guestList/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then((result) => {
                result.json().then(() => {
                    getImpCall()
                })
            })
        }
    }

    const handleUpdate = (id,item) => {
        setId(id)
        getUpdate(item)
    }
    const clear = () => {
        setId('')
        setName('')
        setPhone('')
        setEmail('')
        setCategory('')
        setAddress('')
        setCompany('')
    }

    function getUpdate(item) {
                setName(item.name)
                setPhone(item.mobile)
                setEmail(item.email)
                setCategory(item.category)
                setAddress(item.address)
                setCompany(item.event)
                setAction(true)
        }

        function totfilterData(data){
            const filterData = data.filter((el)=>{
              return (el.name?.toLowerCase()||"").includes(search2.toLowerCase()) &&
              (el.mobile+""||"").includes(search3.toLowerCase())&&
              (el.email?.toLowerCase()||"").includes(search4.toLowerCase())&&
              (el.address?.toLowerCase()||"").includes(search5.toLowerCase())&&
              (el.category?.toLowerCase()||"").includes(search6.toLowerCase())&&
              (el.event?.toLowerCase()||"").includes(search7.toLowerCase())
           })
          
           return filterData
          }


    return (
        <CRow className='d-flex mb-2'>
            <CCol lg={9} sm={6} className='mb-2'>
                <CToast autohide={true} visible={toast} color='success' className="align-items-center">
                    <div className="d-flex">
                        <CToastBody style={{ color: 'white' }}>Successfully Submitted.</CToastBody>
                        <CToastClose className="me-2 m-auto" />
                    </div>
                </CToast>
            </CCol>
            <CCol  style={{display:(addedval?'':'none' )}} lg={3} sm={6} className='mb-2'>
                <CButton className="float-end" onClick={() => { setAction(prev=>!prev), clear() }}>{action ? 'Close' : 'Add New Guest'}</CButton>
            </CCol>
            {action &&

                <CCard className="mt-2 mb-2" >
                    <CCardBody>
                        <CForm>
                            <CRow>
                                <CCol lg={3} sm={6} >
                                    <CFormInput
                                        className="mb-1"
                                        type="text"
                                        name="name"
                                        id="exampleFormControlInput1"
                                        label="Name "
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter Name"
                                    />
                                </CCol>

                                <CCol lg={3} sm={6} >
                                    <CFormInput
                                        className="mb-1"
                                        type='number'
                                        id="exampleFormControlInput1"
                                        label="Mobile Number"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="Enter Mobile Number"
                                    />
                                </CCol>

                                <CCol lg={3} sm={6} >
                                    <CFormInput
                                        className="mb-1"
                                        type='email'
                                        id="exampleFormControlInput1"
                                        label="Email Address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter Email Address"
                                    />
                                </CCol>
                                <CCol lg={3} sm={6} >
                                    <CFormInput
                                        className="mb-1"
                                        type='text'
                                        id="exampleFormControlInput1"
                                        label="Category"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        placeholder="Enter Category"
                                    />
                                </CCol>
                                <CCol lg={6} sm={12} >
                                    <CFormTextarea
                                        id="exampleFormControlTextarea1"
                                        label="Address"
                                        placeholder="Enter Address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        rows="2"
                                        text="Must be 8-20 words long."
                                    ></CFormTextarea>
                                </CCol>
                                <CCol lg={3} sm={6} >
                                    <CFormInput
                                        className="mb-1"
                                        type='text'
                                        id="exampleFormControlInput1"
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)}
                                        label="Event"
                                        placeholder="Enter Event Name"
                                    />
                                </CCol>
                                <CCol className="mt-4">
                                    {id
                                        ?
                                        <CButton onClick={() => saveUpdate()} >update</CButton>
                                        :
                                        <CButton onClick={() => { saveImpCall() }} >Save</CButton>
                                    }
                                </CCol>
                            </CRow>
                        </CForm>
                    </CCardBody>
                </CCard>
            }
            <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                    <CTableRow >
                        <CTableHeaderCell>Sr.No</CTableHeaderCell>
                        <CTableHeaderCell>Name</CTableHeaderCell>
                        <CTableHeaderCell>Mobile</CTableHeaderCell>
                        <CTableHeaderCell>Email</CTableHeaderCell>
                        <CTableHeaderCell>Address</CTableHeaderCell>
                        <CTableHeaderCell>Category</CTableHeaderCell>
                        <CTableHeaderCell>Event</CTableHeaderCell>
                        <CTableHeaderCell style={{display:(action1?'':'none' )}}>Action</CTableHeaderCell>
                        <CTableHeaderCell  style={{display:((editCallval ||deleteICall)?'':'none')}} >Edit/delete</CTableHeaderCell>
                     
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    <CTableRow>
                    <CTableDataCell>
                            <CFormInput
                                className="mb-1"
                                style={{ minWidth: "80px" }}
                                type="number"
                                aria-describedby="exampleFormControlInputHelpInline"
                                disabled
                            />
                        </CTableDataCell>
                        <CTableDataCell>
                            <CFormInput
                                className="mb-1"
                                style={{ minWidth: "80px" }}
                                value={search2}
                                onChange={(e) => setSearch2(e.target.value)}
                                aria-describedby="exampleFormControlInputHelpInline"
                            />
                        </CTableDataCell>
                        <CTableDataCell>
                            <CFormInput
                                className="mb-1"
                                style={{ minWidth: "80px" }}
                                value={search3}
                                onChange={(e) => setSearch3(e.target.value)}
                                type="text"
                                aria-describedby="exampleFormControlInputHelpInline"
                            />
                        </CTableDataCell>
                        <CTableDataCell>
                            <CFormInput
                                className="mb-1"
                                type="text"
                                style={{ minWidth: "80px" }}
                                value={search4}
                                onChange={(e) => setSearch4(e.target.value)}
                                aria-describedby="exampleFormControlInputHelpInline"
                            />
                        </CTableDataCell>
                        <CTableDataCell>
                            <CFormInput
                                className="mb-1"
                                style={{ minWidth: "80px" }}
                                value={search5}
                                onChange={(e) => setSearch5(e.target.value)}
                                type="text"
                                aria-describedby="exampleFormControlInputHelpInline"
                            />
                        </CTableDataCell>
                        <CTableDataCell>
                            <CFormInput
                                className="mb-1"
                                style={{ minWidth: "80px" }}
                                value={search6}
                                onChange={(e) => setSearch6(e.target.value)}
                                type="text"
                                aria-describedby="exampleFormControlInputHelpInline"
                            />
                        </CTableDataCell>
                        <CTableDataCell>
                            <CFormInput
                                className="mb-1"
                                style={{ minWidth: "80px" }}
                                type="text"
                                value={search7}
                                onChange={(e) => setSearch7(e.target.value)}
                                aria-describedby="exampleFormControlInputHelpInline"
                            />
                        </CTableDataCell>
                      
                        <CTableDataCell style={{display:(action1?'':'none' )}}>
                            <CFormInput
                                className="mb-1"
                                type="text"
                                style={{ minWidth: "80px" }}
                                disabled
                                aria-describedby="exampleFormControlInputHelpInline"
                            />
                        </CTableDataCell>
                        <CTableDataCell  style={{display:((editCallval ||deleteICall)?'':'none')}}>
                            <CFormInput
                                className="mb-1"
                                type="text"
                                style={{ minWidth: "80px" }}
                                disabled
                                aria-describedby="exampleFormControlInputHelpInline"
                            />
                        </CTableDataCell>
                        
                    </CTableRow>

                    {totfilterData(result1).slice(paging * 10, paging * 10 + 10).map((item, index) => (
                        <CTableRow key={index}>
                            <CTableDataCell>{index + 1 + (paging * 10)}</CTableDataCell>
                            <CTableDataCell>{item.name}</CTableDataCell>
                            <CTableDataCell>{item.mobile}</CTableDataCell>
                            <CTableDataCell>{item.email}</CTableDataCell>
                            <CTableDataCell>{item.address}</CTableDataCell>
                            <CTableDataCell>{item.category}</CTableDataCell>
                            <CTableDataCell>{item.event}</CTableDataCell>
                            <CTableDataCell style={{display:(action1?'':'none' )}} className='text-center'><a href={`tel:${item.mobile}`} target="_black"><MdCall style={{ cursor: 'pointer', markerStart: '10px' }} size='20px' /></a><a href={`https://wa.me/${item.mobile}`} target="_black"><BsWhatsapp style={{ marginLeft: "4px", cursor: 'pointer', markerStart: '10px' }} size='20px' /></a><a href={`mailto: ${item.email}`} target="_black"> <MdMail style={{ cursor: 'pointer', markerStart: '10px', marginLeft: "4px" }} size='20px' /></a> </CTableDataCell>
                            
                            <CTableDataCell style={{display:((editCallval ||deleteICall)?'':'none')}} className='text-center'>

                                {editCallval&&<MdEdit id={item._id} style={{ fontSize: '35px', cursor: 'pointer', markerStart: '10px' }} 
                                onClick={() => handleUpdate(item._id,item)} size='20px' />}

                                {deleteICall &&<MdDelete style={{ cursor: 'pointer', markerStart: '10px', marginLeft: "5px" }} 
                                onClick={() => deleteCall(item._id)} size='20px' />}

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
                {result1.filter((list) =>list).length > (paging + 1) * 10 && <CPaginationItem onClick={() => setPaging(paging + 1)} >{paging + 2}</CPaginationItem>}

                {result1.filter((list) =>
                    list).length > (paging + 2) * 10 && <CPaginationItem onClick={() => setPaging(paging + 2)}>{paging + 3}</CPaginationItem>}
                {result1.filter((list) =>
                    list).length > (paging + 1) * 10 ?
                    <CPaginationItem aria-label="Next" onClick={() => setPaging(paging + 1)}>
                        <span aria-hidden="true">&raquo;</span>
                    </CPaginationItem>
                    : <CPaginationItem disabled aria-label="Next" onClick={() => setPaging(paging + 1)}>
                        <span aria-hidden="true">&raquo;</span>
                    </CPaginationItem>
                }
            </CPagination>
        </CRow>

    );
};


export default guestList;