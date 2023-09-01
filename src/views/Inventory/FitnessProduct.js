import {
    CFormInput,
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
import { useAdminValidation } from "../Custom-hook/adminValidation";
const ClothesProduct = () => {

    
    const [result1, setResult1] = useState([])

    const pathVal =  useAdminValidation()

    const [search1, setSearch1] = useState('')
    const [search2, setSearch2] = useState('')
    const [search3, setSearch3] = useState('')
    const [search4, setSearch4] = useState('')
    const [search5, setSearch5] = useState('')
    const [search6, setSearch6] = useState('')
    const [search7, setSearch7] = useState('')
    const [search8, setSearch8] = useState('')
   
    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;
    const url = useSelector((el)=>el.domainOfApi)  


    useEffect(() => {
        getImpCall()
    }, [])

  


    function getImpCall() {
        axios.get(`${url}/stockorderlist-status-received-stock/${pathVal}/Fitness Product`, {
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
        <CRow className='d-flex mb-2'>        
            <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                    <CTableRow >
                        <CTableHeaderCell>Sr.No</CTableHeaderCell>
                        <CTableHeaderCell>Product Code</CTableHeaderCell>
                        <CTableHeaderCell>Product Name</CTableHeaderCell>
                        <CTableHeaderCell>Brand Name</CTableHeaderCell>
                        <CTableHeaderCell>Category</CTableHeaderCell>
                        <CTableHeaderCell>Color</CTableHeaderCell>
                        <CTableHeaderCell>Price</CTableHeaderCell>
                        <CTableHeaderCell>Total Stock</CTableHeaderCell>
                        <CTableHeaderCell>Sold</CTableHeaderCell>
                        <CTableHeaderCell>AVL Stock</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>                  
                    {result1.map((item, index) => (
                        <CTableRow key={index}>
                            <CTableDataCell>{index +1}</CTableDataCell>
                            <CTableDataCell>{item.productCode}</CTableDataCell>
                            <CTableDataCell>{item.productName}</CTableDataCell>
                            <CTableDataCell>{item.productDetails.Brand_Name}</CTableDataCell>
                            <CTableDataCell>{item.productDetails.Category}</CTableDataCell>
                            <CTableDataCell>{item.productDetails.Color}</CTableDataCell>
                            <CTableDataCell>{item.productDetails.Product_Price}</CTableDataCell>
                            <CTableDataCell>{item.Total_Stock}</CTableDataCell>
                            <CTableDataCell>{Math.abs(item.soldQuantity)}</CTableDataCell>
                            <CTableDataCell>{item.Available_Stock}</CTableDataCell>
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>

           
        </CRow>

    );
};


export default ClothesProduct;