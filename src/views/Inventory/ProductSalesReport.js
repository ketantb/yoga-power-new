import {
    CCard,
    CCol,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CCardHeader,
    CCardTitle,
    CPagination,
    CPaginationItem
} from "@coreui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import { useAdminValidation } from "../Custom-hook/adminValidation";

const AllSuppilerList = ({onlyOneClient,id}) => {
    const url = useSelector((el)=>el.domainOfApi) 
    const [soldProductData,setSoldProductData] = useState([])
    const pathVal = useAdminValidation()
    const [paging, setPaging] = useState(0);



    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;

    const headers =   {
        "Authorization": `Bearer ${token}`,
    }
    

    useEffect(() => {
        getSoldProductData()
    }, [])


    function  getSoldProductData() {

        const path = onlyOneClient?`${url}/stockorderlist/shop/${id}`:`${url}/stockorderlist/sold/${pathVal}`

        axios.get(path,{headers})
               .then((res) => {
                console.log(res.data)
                setSoldProductData(res.data.reverse())
               })
               .catch((error) => {
                   console.error(error)
               })
       }

    return (
        <CCard className={onlyOneClient?"border-0":"overflow-hidden"} >
          {!onlyOneClient&& <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                        <CCardTitle className="mt-2 mb-4">{onlyOneClient?'Cliet Shop Report':'Product Sales Report'}</CCardTitle>
                    </CCardHeader>}
        <CRow className='mb-2'>
            
            <CCol lg={3} sm={6} className='mb-2'>
            </CCol>
           
             

            <CTable className='m-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                    <CTableRow >
                    <CTableHeaderCell>Sr.No</CTableHeaderCell>
                        <CTableHeaderCell>Date</CTableHeaderCell>
                        <CTableHeaderCell>Client Name</CTableHeaderCell>
                        <CTableHeaderCell>Mobile No.</CTableHeaderCell>
                        <CTableHeaderCell>Product Code</CTableHeaderCell>
                        <CTableHeaderCell>Product Name</CTableHeaderCell>
                        <CTableHeaderCell>Brand Name</CTableHeaderCell>
                        <CTableHeaderCell>Category</CTableHeaderCell>
                        <CTableHeaderCell>Colour</CTableHeaderCell>
                        <CTableHeaderCell>Price</CTableHeaderCell>
                        <CTableHeaderCell>Qty</CTableHeaderCell>
                        <CTableHeaderCell>Sold By</CTableHeaderCell>
                        <CTableHeaderCell>Total Amount</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {soldProductData.slice(paging * 10, paging * 10 + 10).map((item, index) => (
                        <CTableRow key={index}>
                            <CTableDataCell>{(index+1+ (paging * 10))}</CTableDataCell>
                            <CTableDataCell>{ new Date(item.Order_Date).toLocaleString()}</CTableDataCell>
                            <CTableDataCell>{item.Client_Name}</CTableDataCell>
                            <CTableDataCell>{item.Mobile_No}</CTableDataCell>
                            <CTableDataCell>{item.Product_Code}</CTableDataCell>
                            <CTableDataCell>{item.Product_Name}</CTableDataCell>
                            <CTableDataCell>{item.Brand_Name}</CTableDataCell>
                            <CTableDataCell>{item.Category}</CTableDataCell>
                            <CTableDataCell>{item.Color}</CTableDataCell>
                            <CTableDataCell>{item.Product_Price}</CTableDataCell>
                            <CTableDataCell>{Math.abs(item.Orders_Quantity)}</CTableDataCell>
                            <CTableDataCell>{item.soldBy}</CTableDataCell>
                            <CTableDataCell>{+item.Product_Price*+Math.abs(item.Orders_Quantity)}</CTableDataCell>

                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>
            <CPagination aria-label="Page navigation example" align="center" className='mt-2'>
     <CPaginationItem aria-label="Previous" disabled={paging != 0 ? false : true} onClick={() => paging > 0 && setPaging(paging - 1)}>
         <span aria-hidden="true">&laquo;</span>
     </CPaginationItem>
     <CPaginationItem active onClick={() => setPaging(0)}>{paging + 1}</CPaginationItem>
     {soldProductData?.length > (paging + 1) * 10 && <CPaginationItem onClick={() => setPaging(paging + 1)} >{paging + 2}</CPaginationItem>}
     {soldProductData?.length > (paging + 2) * 10 && <CPaginationItem onClick={() => setPaging(paging + 2)}>{paging + 3}</CPaginationItem>}
     {soldProductData?.length > (paging + 1) * 10 ?
         <CPaginationItem aria-label="Next" onClick={() => setPaging(paging + 1)}>
             <span aria-hidden="true">&raquo;</span>
         </CPaginationItem>
         : <CPaginationItem disabled aria-label="Next" onClick={() => setPaging(paging + 1)}>
             <span aria-hidden="true">&raquo;</span>
         </CPaginationItem>}
    </CPagination>

        </CRow>
        </CCard>

    );
};


export default AllSuppilerList;