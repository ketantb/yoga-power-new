import React from 'react'

import {
    CCard, CTable, CCol, CTableHead, CTableRow, CTableHeaderCell,
    CTableBody, CTableDataCell, CFormInput, CCardHeader, CCardTitle, CButton,
    CCardBody,
    CNav,
    CNavItem,
    CNavLink,
    CTabPane,
    CTabContent,
    CFormSelect,
    CFormCheck,
    CPagination,
    CPaginationItem
} from '@coreui/react'
import { useSelector } from 'react-redux'
import { useState, useEffect } from "react"
import axios from 'axios'
import { BsWhatsapp } from "react-icons/bs";
import { MdCall, MdDelete, MdEdit, MdMail } from "react-icons/md";
import { inventoryRight } from 'src/views/hr/Rights/rightsValue/erpRightsValue'


const Assigned = ({stockAssigningData}) => {


    
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

    function toFilterData(data){
        return data.filter((item)=>{
      
            return(new Date(item.Assigned_Date).toLocaleString()||'').includes(searchFilter.search2.toLowerCase().trim())&&
            (item.Product_Category||'').includes(searchFilter.search3.toLowerCase().trim())&&
            (item.Product_Name.toLowerCase()||'').includes(searchFilter.search4.toLowerCase().trim())&&
            (item.Brand_Name.toLowerCase()||'').includes(searchFilter.search5.toLowerCase().trim())&&
            (item.No_Of_Products?.toLowerCase()?.trim()+""||'').includes(searchFilter.search6.toLowerCase().trim())   &&
            ((item.Size+"")?.toLowerCase()||'').includes(searchFilter.search7.toLowerCase().trim())&&
            ((item.Color+"").toLowerCase()||'').includes(searchFilter.search8.toLowerCase().trim())   &&
            ((item.Assigned_By+"")?.toLowerCase()||'').includes(searchFilter.search9.toLowerCase().trim())&&
            ((item.Assigned_To+"").toLowerCase()||'').includes(searchFilter.search10.toLowerCase().trim())   
        })
      }
      


  return (
    <>
    <CTable className='mt-3 ' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
    <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
        <CTableRow >
            <CTableHeaderCell>Sr.No</CTableHeaderCell>
            <CTableHeaderCell>Date</CTableHeaderCell>
            <CTableHeaderCell>Category</CTableHeaderCell>
            <CTableHeaderCell>Product Name</CTableHeaderCell>
            <CTableHeaderCell>Brand Name</CTableHeaderCell>
            <CTableHeaderCell>No of Products</CTableHeaderCell>
            <CTableHeaderCell>Size</CTableHeaderCell>
            <CTableHeaderCell>Color</CTableHeaderCell>

            <CTableHeaderCell>Assigned By</CTableHeaderCell>
            <CTableHeaderCell>Assigned to </CTableHeaderCell>
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
                       <CTableDataCell ><CFormInput disabled className='min-width-90' value={searchFilter.search9}
                                onChange={(e) => setSearchFilter((prev) => ({ ...prev, search9: e.target.value }))} /> </CTableDataCell>        
                        </CTableRow>


        {toFilterData(stockAssigningData).slice(paging * 10, paging * 10 + 10).map((item, i) =>
            <CTableRow >
                <CTableDataCell>{i + 1 + (paging * 10)}</CTableDataCell>
                <CTableDataCell>{new Date(item.Assigned_Date).toLocaleString()}</CTableDataCell>
                <CTableDataCell>{item.Product_Category}</CTableDataCell>
                <CTableDataCell>{item.Product_Name}</CTableDataCell>
                <CTableDataCell>{item.Brand_Name}</CTableDataCell>
                <CTableDataCell>{item.No_Of_Products}</CTableDataCell>
                <CTableDataCell>{item.Size}</CTableDataCell>
                <CTableDataCell>{item.Color}</CTableDataCell>
                <CTableDataCell>{item.Assigned_By}</CTableDataCell>
                <CTableDataCell>{item.Assigned_To}</CTableDataCell>
            </CTableRow>
        )}
    </CTableBody>
   </CTable>
   <CPagination aria-label="Page navigation example" align="center" className='mt-2'>
     <CPaginationItem aria-label="Previous" disabled={paging != 0 ? false : true} onClick={() => paging > 0 && setPaging(paging - 1)}>
         <span aria-hidden="true">&laquo;</span>
     </CPaginationItem>
     <CPaginationItem active onClick={() => setPaging(0)}>{paging + 1}</CPaginationItem>
     {toFilterData(stockAssigningData)?.length > (paging + 1) * 10 && <CPaginationItem onClick={() => setPaging(paging + 1)} >{paging + 2}</CPaginationItem>}
     {toFilterData(stockAssigningData)?.length > (paging + 2) * 10 && <CPaginationItem onClick={() => setPaging(paging + 2)}>{paging + 3}</CPaginationItem>}
     {toFilterData(stockAssigningData)?.length > (paging + 1) * 10 ?
         <CPaginationItem aria-label="Next" onClick={() => setPaging(paging + 1)}>
             <span aria-hidden="true">&raquo;</span>
         </CPaginationItem>
         : <CPaginationItem disabled aria-label="Next" onClick={() => setPaging(paging + 1)}>
             <span aria-hidden="true">&raquo;</span>
         </CPaginationItem>}
    </CPagination>
</>
  )
}

export default Assigned
