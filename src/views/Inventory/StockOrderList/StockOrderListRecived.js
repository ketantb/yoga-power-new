import {CTable,CTableHead,CTableRow,CTableHeaderCell,
    CTableBody,CTableDataCell,
    CTabPane,CPagination,CPaginationItem

 } from '@coreui/react'
 import { useEffect,useState} from 'react'

const StockOrderListRecived = ({visible,receviedProduct}) => {

  const [paging, setPaging] = useState(0);



  return (
    <CTabPane role="tabpanel" aria-labelledby="contact-tab" visible={visible}>

   
  <CTable className='mt-3 ' align="middle" bordered style={{ borderColor: "#0B5345"}} hover responsive>                  
                   <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                       <CTableRow >
                           <CTableHeaderCell>Sr No</CTableHeaderCell>
                           <CTableHeaderCell>Order Date</CTableHeaderCell>
                           <CTableHeaderCell>Received Date</CTableHeaderCell>
                           <CTableHeaderCell>Product Category</CTableHeaderCell>
                           <CTableHeaderCell>Product Name</CTableHeaderCell>
                           <CTableHeaderCell>Brand Name</CTableHeaderCell>
                           <CTableHeaderCell>Size/Kg</CTableHeaderCell>
                           <CTableHeaderCell>Color</CTableHeaderCell>
                           <CTableHeaderCell>Product Prize</CTableHeaderCell>
                           <CTableHeaderCell>Product quantity</CTableHeaderCell>     
                           <CTableHeaderCell>Total Amount</CTableHeaderCell>     
                           <CTableHeaderCell>Order by</CTableHeaderCell>                      
                           <CTableHeaderCell>Received by</CTableHeaderCell>                      
                       </CTableRow>
                   </CTableHead>
                   <CTableBody>
                       
                   {receviedProduct.slice(paging * 10, paging * 10 + 10).map((item,i)=>{        
              
                return <CTableRow >
                           <CTableDataCell>{(i+1+ (paging * 10))}</CTableDataCell>
                           <CTableDataCell>{new Date(item.Order_Date).toLocaleString()}</CTableDataCell>
                           <CTableDataCell>{new Date(item.receivedDate).toLocaleString()}</CTableDataCell>
                           <CTableDataCell>{item.Product_Category}</CTableDataCell>
                           <CTableDataCell>{item.Product_Name}</CTableDataCell>
                           <CTableDataCell>{item.Brand_Name}</CTableDataCell>
                           <CTableDataCell>{item.Category}</CTableDataCell>
                           <CTableDataCell>{item.Color}</CTableDataCell>
                           <CTableDataCell>{item.Product_Price}</CTableDataCell>
                           <CTableDataCell>{item.Orders_Quantity}</CTableDataCell>
                           <CTableDataCell>{item.Product_Price * item.Orders_Quantity}</CTableDataCell>     
                           <CTableDataCell>{item.EmployeeName}</CTableDataCell>  
                           <CTableDataCell>{item.receivedBy}</CTableDataCell>  

                       </CTableRow>                   
                   })}
                  
             
                     
                   </CTableBody>
     </CTable>

     <CPagination aria-label="Page navigation example" align="center" className='mt-2'>
     <CPaginationItem aria-label="Previous" disabled={paging != 0 ? false : true} onClick={() => paging > 0 && setPaging(paging - 1)}>
         <span aria-hidden="true">&laquo;</span>
     </CPaginationItem>
     <CPaginationItem active onClick={() => setPaging(0)}>{paging + 1}</CPaginationItem>
     {receviedProduct?.length > (paging + 1) * 10 && <CPaginationItem onClick={() => setPaging(paging + 1)} >{paging + 2}</CPaginationItem>}
     {receviedProduct?.length > (paging + 2) * 10 && <CPaginationItem onClick={() => setPaging(paging + 2)}>{paging + 3}</CPaginationItem>}
     {receviedProduct?.length > (paging + 1) * 10 ?
         <CPaginationItem aria-label="Next" onClick={() => setPaging(paging + 1)}>
             <span aria-hidden="true">&raquo;</span>
         </CPaginationItem>
         : <CPaginationItem disabled aria-label="Next" onClick={() => setPaging(paging + 1)}>
             <span aria-hidden="true">&raquo;</span>
         </CPaginationItem>
     }
 </CPagination>
  </CTabPane>
  )
}

export default StockOrderListRecived
