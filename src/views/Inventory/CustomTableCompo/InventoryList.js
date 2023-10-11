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

const InventoryList = ({noofProduct,access,ConfirmProduct,activeToIncrement,incrementNoOfItem,toAddProduct,allProductData,isAdmin}) => {
  
  
  
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
  
        return(item.productCategory.toLocaleString().toLowerCase()||'').includes(searchFilter.search2.toLowerCase().trim())&&
        (item.productName.toLowerCase()||'').includes(searchFilter.search3.toLowerCase().trim())&&
        (item.brandName.toLowerCase()||'').includes(searchFilter.search4.toLowerCase().trim())&&
        (item.category.toLowerCase()||'').includes(searchFilter.search5.toLowerCase().trim())&&
        (item.Color?.toLowerCase()?.trim()||'').includes(searchFilter.search6.toLowerCase().trim())   &&
        ((item.productPrize+"")?.toLowerCase()||'').includes(searchFilter.search7.toLowerCase().trim())&&
        ((item.Available_Stock+"").toLowerCase()||'').includes(searchFilter.search8.toLowerCase().trim())   
    })
  }
  


    return (
        <>
    <CTable className='mt-3 ' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>

    <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
        <CTableRow >
            <CTableHeaderCell>Sr No</CTableHeaderCell>
            <CTableHeaderCell>Product Category</CTableHeaderCell>
            <CTableHeaderCell>Product Name</CTableHeaderCell>
            <CTableHeaderCell>Brand Name</CTableHeaderCell>
            <CTableHeaderCell>Size/Kg</CTableHeaderCell>
            <CTableHeaderCell>Color</CTableHeaderCell>
            <CTableHeaderCell>Product Prize</CTableHeaderCell>
            <CTableHeaderCell>Available Stock</CTableHeaderCell>
            <CTableHeaderCell>Add quantity<br />To order</CTableHeaderCell>
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
                             <CTableDataCell ><CFormInput disabled className='min-width-90' value={searchFilter.search9}
                                onChange={(e) => setSearchFilter((prev) => ({ ...prev, search9: e.target.value }))} /> </CTableDataCell> 
                                       
                        </CTableRow>


        {toFilterData(allProductData).map((item, i) => {
            const itemVal = noofProduct.find((el) => el.id === item._id)?.item

            return <CTableRow >
                <CTableDataCell>{i + 1}</CTableDataCell>
                <CTableDataCell>{item.productCategory}</CTableDataCell>
                <CTableDataCell>{item.productName}</CTableDataCell>
                <CTableDataCell>{item.brandName}</CTableDataCell>
                <CTableDataCell>{item.category}</CTableDataCell>
                <CTableDataCell>{item.Color}</CTableDataCell>
                <CTableDataCell>{item.productPrize}</CTableDataCell>
                <CTableDataCell>{item.Available_Stock}</CTableDataCell>
                <CTableDataCell style={{ width: '200px',display:
                (access.includes(inventoryRight.inventoryAdd) || isAdmin)?'':'none'
                
            }} className='text-center'> {
                    activeToIncrement.includes(item._id) ?

                        <>

                            <div className='p-0' style={{ fontSize: '25px' }}>
                                <div className='d-flex border rounded-2 bg-white p-0 justify-content-between  align-items-center' >
                                    <div cl style={{ width: '50px', cursor: 'pointer' }} onClick={(e) => incrementNoOfItem(item, 'decrement')} className='bg-light m-1 rounded-2 text-center'>-</div>
                                    <input style={{ fontSize: '20px', width: '100px' }} value={itemVal} onChange={(e) => inputItemVal(e.target.value, item)} />
                                    <div style={{ width: '50px', cursor: 'pointer' }} onClick={() => incrementNoOfItem(item, 'increment')} className='bg-light m-1 rounded-2 text-center'>+</div>
                                </div>

                            </div>
                            <CCol className='d-flex p-2'>
                                <CButton className='w-100' onClick={() => ConfirmProduct(item)}>Confirm</CButton>
                            </CCol>
                        </>
                        :
                        <CButton onClick={() => toAddProduct({ ...item, Available_Stock: item.Available_Stock })} >Add </CButton>

                }</CTableDataCell>

            </CTableRow>
        })}



    </CTableBody>
</CTable>
<CPagination aria-label="Page navigation example" align="center" className='mt-2'>
     <CPaginationItem aria-label="Previous" disabled={paging != 0 ? false : true} onClick={() => paging > 0 && setPaging(paging - 1)}>
         <span aria-hidden="true">&laquo;</span>
     </CPaginationItem>
     <CPaginationItem active onClick={() => setPaging(0)}>{paging + 1}</CPaginationItem>
     {toFilterData(allProductData)?.length > (paging + 1) * 10 && <CPaginationItem onClick={() => setPaging(paging + 1)} >{paging + 2}</CPaginationItem>}
     {toFilterData(allProductData)?.length > (paging + 2) * 10 && <CPaginationItem onClick={() => setPaging(paging + 2)}>{paging + 3}</CPaginationItem>}
     {toFilterData(allProductData)?.length > (paging + 1) * 10 ?
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

export default InventoryList
