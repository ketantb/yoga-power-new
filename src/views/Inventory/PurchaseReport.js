import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CForm,
    CFormInput,
    CFormSelect,
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
    CCardHeader,
    CCardTitle
} from "@coreui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsWhatsapp } from "react-icons/bs";
import { MdCall, MdDelete, MdEdit, MdMail } from "react-icons/md";
import { useSelector } from 'react-redux'
import { useAdminValidation } from "../Custom-hook/adminValidation";

const AllSuppilerList = () => {

    let pageNo = 0

    const url = useSelector((el)=>el.domainOfApi) 
    const pathVal = useAdminValidation()
    
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
    const [search8, setSearch8] = useState('')
    const [search9, setSearch9] = useState('')


    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;
    const [paging, setPaging] = useState(0);
    useEffect(() => {
        getImpCall()
    }, [])
    

    function getImpCall() {
        axios.get(`${url}/sockreport/daily-stock-report/${pathVal}`,{headers: {
            'Authorization': `Bearer ${token}`
        }})
            .then((res) => {
                setResult1(res.data);
            })
            .catch((error) => {
                console.error(error)
            })
    }
    return (
        <CCard >

     <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                        <CCardTitle className="mt-2 mb-4">Stock Report</CCardTitle>
                    </CCardHeader>
        <CRow className='d-flex mb-2'>
            <CCol lg={9} sm={6} className='mb-2'>
                <CToast autohide={true} visible={toast} color='success' className="align-items-center">
                    <div className="d-flex">
                        <CToastBody style={{ color: 'white' }}>Successfully Submitted.</CToastBody>
                        <CToastClose className="me-2 m-auto" />
                    </div>
                </CToast>
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
                                        id="exampleFormControlInput1"
                                        label="Product Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter Name"
                                    />
                                </CCol>
                                <CCol lg={3} sm={6} >
                                    <CFormInput
                                        className="mb-1"
                                        type="text"
                                        id="exampleFormControlInput1"
                                        label="Brand Name"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="Enter Brand Name"
                                    />
                                </CCol>
                                <CCol lg={3} sm={6}>
                                    <CFormSelect
                                        className="mb-1"
                                        aria-label="Select Category"
                                        label="Stock Category"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        options={[
                                            "Select Category",
                                            { label: "Small Size", value: "Small Size" },
                                            { label: "L Size", value: "L Size" },
                                        ]}
                                    />
                                </CCol>
                                <CCol lg={3} sm={6} >
                                    <CFormInput
                                        className="mb-1"
                                        type="text"
                                        id="exampleFormControlInput1"
                                        label="Colour"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        placeholder="Enter Colour"
                                    />
                                </CCol>

                                <CCol lg={3} sm={6} >
                                    <CFormInput
                                        className="mb-1"
                                        type="number"
                                        id="exampleFormControlInput1"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        label="Price"
                                        placeholder="Enter Price"
                                    />
                                </CCol>

                                <CCol lg={3} sm={6} >
                                    <CFormInput
                                        className="mb-1"
                                        type="number"
                                        id="exampleFormControlInput1"
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)}
                                        label="Total Stock"
                                        placeholder="Enter Total Stock"
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
                    <div className="p-4" >
            <CTable className='mt-3 ' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                    <CTableRow >
                    <CTableHeaderCell>Sr.No</CTableHeaderCell>
                        <CTableHeaderCell>Date</CTableHeaderCell>
                        <CTableHeaderCell>Product Name</CTableHeaderCell>
                        <CTableHeaderCell>Product Code</CTableHeaderCell>

                        <CTableHeaderCell>Opening Stock</CTableHeaderCell>
                        <CTableHeaderCell>Purchase Stock</CTableHeaderCell>
                        <CTableHeaderCell>Total Stock</CTableHeaderCell>
                        <CTableHeaderCell>Current sold</CTableHeaderCell>
                        <CTableHeaderCell>Total sold</CTableHeaderCell>
                        <CTableHeaderCell>Closing Stock</CTableHeaderCell>
                       
                    </CTableRow>
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
                                value={search1}
                                onChange={(e) => setSearch1(e.target.value)}
                                aria-describedby="exampleFormControlInputHelpInline"
                            />
                        </CTableDataCell>
                        <CTableDataCell>
                            <CFormInput
                                className="mb-1"
                                style={{ minWidth: "120px" }}
                                value={search2}
                                onChange={(e) => setSearch2(e.target.value)}
                                type="text"
                                aria-describedby="exampleFormControlInputHelpInline"
                            />
                        </CTableDataCell>
                        <CTableDataCell>
                            <CFormInput
                                className="mb-1"
                                style={{ minWidth: "100px" }}
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
                                style={{ minWidth: "200px" }}
                                value={search4}
                                onChange={(e) => setSearch4(e.target.value)}
                                aria-describedby="exampleFormControlInputHelpInline"
                            />
                        </CTableDataCell>
                        <CTableDataCell>
                            <CFormInput
                                className="mb-1"
                                style={{ minWidth: "120px" }}
                                value={search5}
                                onChange={(e) => setSearch5(e.target.value)}
                                type="text"
                                aria-describedby="exampleFormControlInputHelpInline"
                            />
                        </CTableDataCell>
                        <CTableDataCell>
                            <CFormInput
                                className="mb-1"
                                style={{ minWidth: "120px" }}
                                value={search6}
                                onChange={(e) => setSearch6(e.target.value)}
                                type="number"
                                aria-describedby="exampleFormControlInputHelpInline"
                            />
                        </CTableDataCell>
                         <CTableDataCell>
                            <CFormInput
                                className="mb-1"
                                style={{ minWidth: "120px" }}
                                type="number"
                                value={search7}
                                onChange={(e) => setSearch7(e.target.value)}
                                aria-describedby="exampleFormControlInputHelpInline"
                            />
                        </CTableDataCell>
                        <CTableDataCell>
                            <CFormInput
                                className="mb-1"
                                style={{ minWidth: "120px" }}
                                type="number"
                                value={search8}
                                onChange={(e) => setSearch8(e.target.value)}
                                aria-describedby="exampleFormControlInputHelpInline"
                            />
                        </CTableDataCell>
                        <CTableDataCell>
                            <CFormInput
                                className="mb-1"
                                style={{ minWidth: "120px" }}
                                type="number"
                                value={search9}
                                onChange={(e) => setSearch9(e.target.value)}
                                aria-describedby="exampleFormControlInputHelpInline"
                            />
                        </CTableDataCell>
                    </CTableRow>
                    
                    {result1.filter((list)=>{
                     return new Date(list.date).toISOString()?.split('T')?.[0]?.includes(search1?.toLowerCase())&&
                     (list.productName||'').toLowerCase().includes(search2.toLowerCase())&&
                     (list.productCode||'').toLowerCase().includes(search3.toLowerCase())&&
                     (list.openingStock+""||'').toLowerCase().includes(search4.toLowerCase())&&
                     (list.purchaseStock+""||'').toLowerCase().includes(search5.toLowerCase())&&
                     (list.totalStock+""||'').toLowerCase().includes(search6.toLowerCase())&&
                     (list.consumptionQty+""||'').toLowerCase().includes(search7.toLowerCase())&&
                     (list.opningConsumptionOty+""||'').toLowerCase().includes(search8.toLowerCase())&&
                     (list.closingStock+""||'').toLowerCase().includes(search9.toLowerCase())
                    }).filter((el)=>{
                        pageNo++
                        return el
                    })
                    .slice(paging * 10, paging * 10 + 10).map((item, index) => (
                        <CTableRow key={index} className="text-center">
                            <CTableDataCell>{index + 1 }</CTableDataCell>
                            <CTableDataCell>{new Date(item.date).toISOString()?.split('T')?.[0]}</CTableDataCell>
                            <CTableDataCell>{item.productName}</CTableDataCell>
                            <CTableDataCell>{item.productCode}</CTableDataCell>
                            <CTableDataCell className="text-dark"><b>{item.openingStock}</b></CTableDataCell>
                            <CTableDataCell className="text-dark"><b>{item.purchaseStock}</b></CTableDataCell>
                            <CTableDataCell className="text-primary"> <b>{item.totalStock}</b></CTableDataCell>
                            <CTableDataCell className="text-dark">{Math.abs(item.consumptionQty)}</CTableDataCell>
                            <CTableDataCell><b>{Math.abs(item.opningConsumptionOty)}</b></CTableDataCell>
                            <CTableDataCell>{item.closingStock}</CTableDataCell>                        
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>
            </div >        
        </CRow>
        <CPagination aria-label="Page navigation example" align="center" className='mt-2'>
                        <CPaginationItem aria-label="Previous" disabled={paging != 0 ? false : true} onClick={() => paging > 0 && setPaging(paging - 1)}>
                            <span aria-hidden="true">&laquo;</span>
                        </CPaginationItem>
                        <CPaginationItem active onClick={() => setPaging(0)}>{paging + 1}</CPaginationItem>
                        {pageNo> (paging + 1) * 10 && <CPaginationItem onClick={() => setPaging(paging + 1)} >{paging + 2}</CPaginationItem>}
                        {pageNo> (paging + 2) * 10 && <CPaginationItem onClick={() => setPaging(paging + 2)}>{paging + 3}</CPaginationItem>}
                        {pageNo> (paging + 1) * 10 ?
                            <CPaginationItem aria-label="Next" onClick={() => setPaging(paging + 1)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                            : <CPaginationItem disabled aria-label="Next" onClick={() => setPaging(paging + 1)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                        }
       </CPagination>
        </CCard>


    );
};


export default AllSuppilerList;