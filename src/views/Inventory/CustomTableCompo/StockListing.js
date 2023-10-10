import React from 'react'
import { inventoryRight } from 'src/views/hr/Rights/rightsValue/erpRightsValue'

import {CCard,CTable,CCol,CTableHead,CTableRow,CTableHeaderCell,
    CTableBody,CTableDataCell,CFormInput,CCardHeader,CCardTitle,CButton,
    CCardBody,
    CNav,
    CNavItem,
    CNavLink,
    CTabPane,
    CTabContent,
    CFormSelect,
    CFormCheck,
    CPagination,
    CPaginationItem,
 } from '@coreui/react'

 import { useSelector } from 'react-redux'
 import {useState,useEffect} from "react"
 import axios from 'axios'
//  import XLSX from "xlsx";

 import * as XLSX from 'xlsx';
 import { BsWhatsapp } from "react-icons/bs";
 import { MdCall, MdDelete, MdEdit, MdMail } from "react-icons/md";

let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;
const username = user.user.username;


const StockListing = ({access,isAdmin,toSetExcelData,orderList,ordeReceived,error2,activeCExcelCheck,selectAllOption}) => {
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
        return data.filter((el)=>{
            return (new Date(el.Order_Date).toLocaleString()||'').includes(searchFilter.search2.toLowerCase().trim())&&
            el?.Status!=='Recevied'&&
            (new Date(el.Order_Date).toLocaleString()||'').includes(searchFilter.search3.toLowerCase().trim())&&
            (el.Product_Category.toLowerCase()||'').includes(searchFilter.search4.toLowerCase().trim())&&
            (el.Product_Name.toLowerCase()||'').includes(searchFilter.search5.toLowerCase().trim())&&
            (el.Brand_Name.toLowerCase()||'').includes(searchFilter.search6.toLowerCase().trim())&&
            (el.Category.toLowerCase()||'').includes(searchFilter.search7.toLowerCase().trim())&&
            (el.Color.toLowerCase()||'').includes(searchFilter.search8.toLowerCase().trim())&&
            (el.Product_Price.toLowerCase()||'').includes(searchFilter.search9.toLowerCase().trim())   &&
            (el.Orders_Quantity?.toLowerCase()||'').includes(searchFilter.search10.toLowerCase().trim())   &&
            (el.EmployeeName?.toLowerCase()||'').includes(searchFilter.search11.toLowerCase().trim()) 

      })
      }

  return (
    <>
    <CCol className='pt-4'>
    {
        (access.includes(inventoryRight.orderListSelect) || isAdmin)&&
        <CButton onClick={()=>selectAllOption()} className='me-2'>Select all option</CButton>
    }   
    {
        (access.includes(inventoryRight.orderListExport) || isAdmin)&&
        <CButton onClick={()=>downloadAsExcel()}>Export to excel</CButton>
    }  

    {error2&&<p style={{color:'red'}}>Please select data to export</p>}
 </CCol>
<CTable className='mt-3 ' align="middle" bordered style={{ borderColor: "#0B5345"}} hover responsive>                  
               <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                   <CTableRow >
                     <CTableHeaderCell
                     style={{display:
                        (access.includes(inventoryRight.orderListSelect) || isAdmin)?'':'none'}}
                     >Select Option</CTableHeaderCell>
                       <CTableHeaderCell>Sr No</CTableHeaderCell>
                       <CTableHeaderCell>Order Date</CTableHeaderCell>
                       <CTableHeaderCell>Product Category</CTableHeaderCell>
                       <CTableHeaderCell>Product Name</CTableHeaderCell>
                       <CTableHeaderCell>Brand Name</CTableHeaderCell>
                       <CTableHeaderCell>Size/Kg</CTableHeaderCell>
                       <CTableHeaderCell>Color</CTableHeaderCell>
                       <CTableHeaderCell>Product Prize</CTableHeaderCell>
                       <CTableHeaderCell>Product quantity</CTableHeaderCell>     
                       <CTableHeaderCell>Order by</CTableHeaderCell>                      
                       <CTableHeaderCell 
                       style={{display:
                        (access.includes(inventoryRight.receivedStatus) || isAdmin)?'':'none'}}
                       >Status</CTableHeaderCell>                      
                   </CTableRow>
               </CTableHead>
               <CTableBody>
               <CTableRow>
                   <CTableDataCell >
                            <CFormInput className='min-width-90' disabled value={searchFilter.search1} 
                            onChange={(e)=>setSearchFilter((prev)=>({...prev,search1:e.target.value}))} /> </CTableDataCell>
                            <CTableDataCell ><CFormInput disabled className='min-width-90' value={searchFilter.search2} 
                            onChange={(e)=>setSearchFilter((prev)=>({...prev,search2:e.target.value}))} /> </CTableDataCell>
                            <CTableDataCell ><CFormInput className='min-width-90' value={searchFilter.search3} 
                            onChange={(e)=>setSearchFilter((prev)=>({...prev,search3:e.target.value}))} /> </CTableDataCell>
                            <CTableDataCell ><CFormInput className='min-width-90' value={searchFilter.search4} 
                            onChange={(e)=>setSearchFilter((prev)=>({...prev,search4:e.target.value}))} /> </CTableDataCell>
                            <CTableDataCell ><CFormInput className='min-width-90' value={searchFilter.search5} 
                            onChange={(e)=>setSearchFilter((prev)=>({...prev,search5:e.target.value}))} /> </CTableDataCell>
                            <CTableDataCell ><CFormInput className='min-width-90'value={searchFilter.search6} 
                            onChange={(e)=>setSearchFilter((prev)=>({...prev,search6:e.target.value}))} /> </CTableDataCell>
                            <CTableDataCell ><CFormInput className='min-width-90' value={searchFilter.search7} 
                            onChange={(e)=>setSearchFilter((prev)=>({...prev,search7:e.target.value}))} /> </CTableDataCell>
                            <CTableDataCell ><CFormInput className='min-width-90' value={searchFilter.search8} 
                            onChange={(e)=>setSearchFilter((prev)=>({...prev,search8:e.target.value}))} /> </CTableDataCell>
                            <CTableDataCell ><CFormInput  className='min-width-90' value={searchFilter.search9} 
                            onChange={(e)=>setSearchFilter((prev)=>({...prev,search9:e.target.value}))} /> </CTableDataCell>           
                            <CTableDataCell ><CFormInput className='min-width-90'value={searchFilter.search10} 
                            onChange={(e)=>setSearchFilter((prev)=>({...prev,search10:e.target.value}))} /> </CTableDataCell>
                            <CTableDataCell ><CFormInput  className='min-width-90'value={searchFilter.search11} 
                            onChange={(e)=>setSearchFilter((prev)=>({...prev,search11:e.target.value}))} /> </CTableDataCell>
                            <CTableDataCell>
                             <CFormInput className='min-width-90' disabled  
                            /> </CTableDataCell>
                   </CTableRow>

               {   toFilterData(orderList).slice(paging * 10, paging * 10 + 10).map((item,i)=>{        
          
                 return <CTableRow >
                       <CTableDataCell style={{display:
                        (access.includes(inventoryRight.orderListSelect) || isAdmin)?'':'none'}} >
                        {(access.includes(inventoryRight.orderListSelect) || isAdmin)&&
                        <CFormCheck  checked={activeCExcelCheck.includes(item._id)}  onChange={()=>toSetExcelData(item)}  />
                        }
                        </CTableDataCell>

                       <CTableDataCell>{i+ 1 + (paging * 10) }</CTableDataCell>
                       <CTableDataCell>{new Date(item.Order_Date).toLocaleString()}</CTableDataCell>
                       <CTableDataCell>{item.Product_Category}</CTableDataCell>
                       <CTableDataCell>{item.Product_Name}</CTableDataCell>
                       <CTableDataCell>{item.Brand_Name}</CTableDataCell>
                       <CTableDataCell>{item.Category}</CTableDataCell>
                       <CTableDataCell>{item.Color}</CTableDataCell>
                       <CTableDataCell>{item.Product_Price}</CTableDataCell>
                       <CTableDataCell>{item.Orders_Quantity}</CTableDataCell>
                       <CTableDataCell>{item.EmployeeName}</CTableDataCell>  
                       <CTableDataCell
                       style={{display:
                        (access.includes(inventoryRight.receivedStatus) || isAdmin)?'':'none'}}
                       >
       
                        <CButton  onClick={()=>ordeReceived(item)}>Received?</CButton>
                        </CTableDataCell>                                                                                                            
                   </CTableRow>                   
               })}                         
               </CTableBody>
            
 </CTable>
 <CPagination aria-label="Page navigation example" align="center" className='mt-2'>
                        <CPaginationItem aria-label="Previous" disabled={paging != 0 ? false : true} onClick={() => paging > 0 && setPaging(paging - 1)}>
                            <span aria-hidden="true">&laquo;</span>
                        </CPaginationItem>
                        <CPaginationItem active onClick={() => setPaging(0)}>{paging + 1}</CPaginationItem>
                        {toFilterData(orderList).length > (paging + 1) * 10 && <CPaginationItem onClick={() => setPaging(paging + 1)} >{paging + 2}</CPaginationItem>}
                        {toFilterData(orderList).length > (paging + 2) * 10 && <CPaginationItem onClick={() => setPaging(paging + 2)}>{paging + 3}</CPaginationItem>}
                        {toFilterData(orderList).length > (paging + 1) * 10 ?
                            <CPaginationItem aria-label="Next" onClick={() => setPaging(paging + 1)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                            : <CPaginationItem disabled aria-label="Next" onClick={() => setPaging(paging + 1)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                        }
                    </CPagination>  

 </>

  )
}

export default StockListing
