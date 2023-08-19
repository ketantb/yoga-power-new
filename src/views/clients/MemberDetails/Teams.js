
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCardTitle,
    CCol,
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
import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { useAdminValidation} from "src/views/Custom-hook/adminValidation";



const Teams = () => {  
    const url = useSelector((el)=>el.domainOfApi) 
    const pathValMaster = useAdminValidation('Master')


    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;
    const [result1, setResult1] = useState([]);
    const [paging, setPaging] = useState(0);
  
    useEffect(() => {
        getPolicy()
    }, []);

    function getPolicy() {
        axios.get(`${url}/tncMaster/${pathValMaster}`, {
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

  

  

    return (
        <CRow>
            <CCol lg={12} sm={12}>
                <div>                    
                    <CCardBody>
                       
                        
                        <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                                <CTableRow >
                                    <CTableHeaderCell>Sno.</CTableHeaderCell>
                                    <CTableHeaderCell>Title</CTableHeaderCell>
                                    <CTableHeaderCell>Policy</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>

                                {result1.slice(paging * 10, paging * 10 + 10).filter((list) =>
                                    list).map((item, index) => (
                                        <CTableRow style={{fontSize:'17px',fontWeight:'700'}} key={index} >
                                            <CTableDataCell>{index + 1 + (paging * 10)}</CTableDataCell>
                                            <CTableDataCell>{item.title}</CTableDataCell>
                                            <CTableDataCell style={{maxWidth:'400px'}}>{item.policy}</CTableDataCell>
                                        </CTableRow>

                                    ))}
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                    <CPagination aria-label="Page navigation example" align="center" className='mt-2'>
                        <CPaginationItem aria-label="Previous" disabled={paging != 0 ? false : true} onClick={() => paging > 0 && setPaging(paging - 1)}>
                            <span aria-hidden="true">&laquo;</span>
                        </CPaginationItem>
                        <CPaginationItem active onClick={() => setPaging(0)}>{paging + 1}</CPaginationItem>
                        {result1.filter((list) => list).length > (paging + 1) * 10 && <CPaginationItem onClick={() => setPaging(paging + 1)} >{paging + 2}</CPaginationItem>}

                        {result1.filter((list) => list).length > (paging + 2) * 10 && <CPaginationItem onClick={() => setPaging(paging + 2)}>{paging + 3}</CPaginationItem>}
                        {result1.filter((list) => list).length > (paging + 1) * 10 ?
                            <CPaginationItem aria-label="Next" onClick={() => setPaging(paging + 1)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                            : <CPaginationItem disabled aria-label="Next" onClick={() => setPaging(paging + 1)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                        }
                    </CPagination>
                </div>
            </CCol>
        </CRow>
    )
}

export default Teams


