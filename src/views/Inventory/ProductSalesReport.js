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
    CPaginationItem,
    CFormInput
} from "@coreui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import { useAdminValidation } from "../Custom-hook/adminValidation";

const AllSuppilerList = ({onlyOneClient,id}) => {
    const url = useSelector((el)=>el.domainOfApi) 
    const [soldProductData,setSoldProductData] = useState([])
    const pathVal = useAdminValidation()

    
    const [searchFilter,setSearchFilter] = useState({
        search1:'',
        search2:'',
        search3:'',
        search4:'',
        search5:'',
        search6:'',
        search7:'',
        search8:'',
        search9:'',
        search10:'',
        search11:'',
        search12:'',
        search13:'',
        search14:'',
    })    
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

    //    <CTableDataCell>{(index+1+ (paging * 10))}</CTableDataCell>
    //                         <CTableDataCell>{ new Date(item.Order_Date).toLocaleString()}</CTableDataCell>
    //                         <CTableDataCell>{item.Client_Name}</CTableDataCell>
    //                         <CTableDataCell>{item.Mobile_No}</CTableDataCell>
    //                         <CTableDataCell>{item.Product_Code}</CTableDataCell>
    //                         <CTableDataCell>{item.Product_Name}</CTableDataCell>
    //                         <CTableDataCell>{item.Brand_Name}</CTableDataCell>
    //                         <CTableDataCell>{item.Category}</CTableDataCell>
    //                         <CTableDataCell>{item.Color}</CTableDataCell>
    //                         <CTableDataCell>{item.Product_Price}</CTableDataCell>
    //                         <CTableDataCell>{Math.abs(item.Orders_Quantity)}</CTableDataCell>
    //                         <CTableDataCell>{item.soldBy}</CTableDataCell>
    //                         <CTableDataCell>{+item.Product_Price*+Math.abs(item.Orders_Quantity)}</CTableDataCell>

    
       function toFilterData(data){
        return data.filter((item)=>{
            return((new Date(item.Order_Date).toLocaleString()+"").toLowerCase()||'').includes(searchFilter.search2.toLowerCase().trim())&&
            (item.Client_Name.toLowerCase()||'').includes(searchFilter.search3.toLowerCase().trim())&&
            ((item.Mobile_No+"").toLowerCase()||'').includes(searchFilter.search4.toLowerCase().trim())&&
            (item.Product_Code.toLowerCase()||'').includes(searchFilter.search5.toLowerCase().trim())&&
            (item.Product_Name.toLowerCase()||'').includes(searchFilter.search6.toLowerCase().trim())   &&
            ((item.Brand_Name+"")?.toLowerCase()||'').includes(searchFilter.search7.toLowerCase().trim())  && 
            ((item.Category+"")?.toLowerCase()||'').includes(searchFilter.search8.toLowerCase().trim()) &&
            ((item.Color+"")?.toLowerCase()||'').includes(searchFilter.search9.toLowerCase().trim())&&
            ((item.Product_Price+"").toLowerCase()||'').includes(searchFilter.search10.toLowerCase().trim())   &&
            ((Math.abs(item.Orders_Quantity)+"")?.toLowerCase()||'').includes(searchFilter.search11.toLowerCase().trim())  &&
            ((item.soldBy+"")?.toLowerCase()||'').includes(searchFilter.search12.toLowerCase().trim())  &&
            ((+item.Product_Price*+Math.abs(item.Orders_Quantity)+"")?.toLowerCase()||'').includes(searchFilter.search13.toLowerCase().trim())
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

                        <CTableRow>
                            <CTableDataCell >
                                <CFormInput className='min-width-90' disabled value={searchFilter.search1}
                                    onChange={(e) => setSearchFilter((prev) => ({ ...prev, search1: e.target.value }))} /> </CTableDataCell>
                            <CTableDataCell ><CFormInput className='min-width-90' value={searchFilter.search2}
                                onChange={(e) => setSearchFilter((prev) => ({ ...prev, search2: e.target.value }))} /> </CTableDataCell>
                            <CTableDataCell ><CFormInput className='min-width-90' value={searchFilter.search3}
                                onChange={(e) => setSearchFilter((prev) => ({ ...prev, search3: e.target.value }))} /> </CTableDataCell>
                            <CTableDataCell ><CFormInput className='min-width-90' value={searchFilter.search4}
                                onChange={(e) => setSearchFilter((prev) => ({ ...prev, search4: e.target.value }))} /> </CTableDataCell>
                            <CTableDataCell ><CFormInput className='min-width-90' value={searchFilter.search5}
                                onChange={(e) => setSearchFilter((prev) => ({ ...prev, search5: e.target.value }))} /> </CTableDataCell>
                            <CTableDataCell ><CFormInput className='min-width-90' value={searchFilter.search6}
                                onChange={(e) => setSearchFilter((prev) => ({ ...prev, search6: e.target.value }))} /> </CTableDataCell>
                            <CTableDataCell ><CFormInput className='min-width-90' value={searchFilter.search7}
                                onChange={(e) => setSearchFilter((prev) => ({ ...prev, search7: e.target.value }))} /> </CTableDataCell>
                            <CTableDataCell ><CFormInput  className='min-width-90' value={searchFilter.search8}
                                onChange={(e) => setSearchFilter((prev) => ({ ...prev, search8: e.target.value }))} /> </CTableDataCell>
                             <CTableDataCell ><CFormInput className='min-width-90' value={searchFilter.search9}
                                onChange={(e) => setSearchFilter((prev) => ({ ...prev, search9: e.target.value }))} /> </CTableDataCell>
                            
                            <CTableDataCell ><CFormInput className='min-width-90' value={searchFilter.search10}
                                onChange={(e) => setSearchFilter((prev) => ({ ...prev, search10: e.target.value }))} /> </CTableDataCell>
                            <CTableDataCell ><CFormInput  className='min-width-90' value={searchFilter.search11}
                                onChange={(e) => setSearchFilter((prev) => ({ ...prev, search11: e.target.value }))} /> </CTableDataCell>
                        <CTableDataCell ><CFormInput className='min-width-90' value={searchFilter.search12}
                                onChange={(e) => setSearchFilter((prev) => ({ ...prev, search12: e.target.value }))} /> </CTableDataCell>
                            <CTableDataCell ><CFormInput  className='min-width-90' value={searchFilter.search13}
                                onChange={(e) => setSearchFilter((prev) => ({ ...prev, search13: e.target.value }))} /> </CTableDataCell>
                        </CTableRow>
                    
                    {toFilterData(soldProductData).slice(paging * 10, paging * 10 + 10).map((item, index) => (
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
     {toFilterData(soldProductData)?.length > (paging + 1) * 10 && <CPaginationItem onClick={() => setPaging(paging + 1)} >{paging + 2}</CPaginationItem>}
     {toFilterData(soldProductData)?.length > (paging + 2) * 10 && <CPaginationItem onClick={() => setPaging(paging + 2)}>{paging + 3}</CPaginationItem>}
     {toFilterData(soldProductData)?.length > (paging + 1) * 10 ?
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