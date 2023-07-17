import {
    CCol,
    CFormSwitch,
    CRow,    
} from '@coreui/react'
import { inventoryRight } from '../Rights/rightsValue/erpRightsValue'


function InventoryRights({erpInventory,setRightObject}){

    const handleRight = (val,parrent)=>{

   setRightObject(prev => {

            const  arr = prev.erpRights.erpInventory.items[parrent].rights
            console.log(arr)
            if(arr.includes(val)){
                arr?.splice(arr?.indexOf(val),1)
                return { ...prev }
            }
         arr.push(val)
         return { ...prev }
        })
    }

    const toCheckRightVal = (val,parrent)=>{
        return erpInventory.items[parrent].rights.includes(val)
    }


    return <div >

  <CRow>
   <CCol>
   <h5 className='mb-4 pt-2 d-flex'>
       Inventory <span className='mx-2'><CFormSwitch size="lg"
          checked={erpInventory.value}
          onChange={(e) => setRightObject(prev => {
              prev.erpRights.erpInventory.value = e.target.checked
              return { ...prev }
          })}/></span></h5>   
   </CCol>
  </CRow>

<CRow >
   <CCol>
        <h5 className='mb-4 pt-2 d-flex'>
        Stock List<span className='mx-2'><CFormSwitch size="lg"
        checked={erpInventory?.items.erpStockList.value}
        onChange={(e) => setRightObject(prev => {
            prev.erpRights.erpInventory.items.erpStockList.value = e.target.checked
            return { ...prev }
        })}
        /></span></h5>   
        <CFormSwitch size="xl" label="Stock List" checked={toCheckRightVal(inventoryRight.stockListView,'erpStockList')}  onChange={()=>handleRight(inventoryRight.stockListView,'erpStockList')} />
        <CFormSwitch size="xl" label="Stock List Add" checked={toCheckRightVal(inventoryRight.stockListAdd,'erpStockList')}  onChange={()=>handleRight(inventoryRight.stockListAdd,'erpStockList')}/>
        <CFormSwitch size="xl" label="Order List" checked={toCheckRightVal(inventoryRight.orderList,'erpStockList')}  onChange={()=>handleRight(inventoryRight.orderList,'erpStockList')}/>
        <CFormSwitch size="xl" label="Order List Export"  checked={toCheckRightVal(inventoryRight.orderListExport,'erpStockList')}  onChange={()=>handleRight(inventoryRight.orderListExport,'erpStockList')} />
        <CFormSwitch size="xl" label="Order List select" checked={toCheckRightVal(inventoryRight.orderListSelect,'erpStockList')}  onChange={()=>handleRight(inventoryRight.orderListSelect,'erpStockList')} />
        <CFormSwitch size="xl" label="Received Status" checked={toCheckRightVal(inventoryRight.receivedStatus,'erpStockList')}  onChange={()=>handleRight(inventoryRight.receivedStatus,'erpStockList')}/>
        <CFormSwitch size="xl" label="Order List received" checked={toCheckRightVal(inventoryRight.orderListreceived,'erpStockList')}  onChange={()=>handleRight(inventoryRight.orderListreceived,'erpStockList')}/>
    </CCol>

   <CCol>
       <h5 className='mb-4 pt-2 d-flex'>
       Stock Report<span className='mx-2'><CFormSwitch size="lg"
        checked={erpInventory?.items.erpStockReport.value}
        onChange={(e) => setRightObject(prev => {
            prev.erpRights.erpInventory.items.erpStockReport.value = e.target.checked
            return { ...prev }
        })}
       /></span></h5>    
   </CCol>

   <CCol>
       <h5 className='mb-4 pt-2 d-flex'>
       Products List <span className='mx-2'><CFormSwitch size="lg"
          checked={erpInventory?.items.erpProductList.value}
          onChange={(e) => setRightObject(prev => {
              prev.erpRights.erpInventory.items.erpProductList.value = e.target.checked
              return { ...prev }
          })}
       /></span></h5>
       <CFormSwitch size="xl" label="Clothes product" checked={toCheckRightVal(inventoryRight.clothesProduct,'erpProductList')}  onChange={()=>handleRight(inventoryRight.clothesProduct,'erpProductList')} />
       <CFormSwitch size="xl" label="Ayurveda Medicine" checked={toCheckRightVal(inventoryRight.ayurvedaMedicine,'erpProductList')}  onChange={()=>handleRight(inventoryRight.ayurvedaMedicine,'erpProductList')}/>
       <CFormSwitch size="xl" label="Fitness Product" checked={toCheckRightVal(inventoryRight.fitnessProduct,'erpProductList')}  onChange={()=>handleRight(inventoryRight.fitnessProduct,'erpProductList')} />
       <CFormSwitch size="xl" label="Foods Product" checked={toCheckRightVal(inventoryRight.foodsProduct,'erpProductList')}  onChange={()=>handleRight(inventoryRight.foodsProduct,'erpProductList')} />
       <CFormSwitch size="xl" label="General Inventory" checked={toCheckRightVal(inventoryRight.generalInventory,'erpProductList')}  onChange={()=>handleRight(inventoryRight.generalInventory,'erpProductList')} />
   </CCol>
</CRow>

<CRow className='mt-5' >
  
    <CCol>
       <h5 className='mb-4 pt-2 d-flex'>
       Stock Alert<span className='mx-2'><CFormSwitch size="lg"
       checked={erpInventory?.items.erpStockAlert.value}
       onChange={(e) => setRightObject(prev => {
           prev.erpRights.erpInventory.items.erpStockAlert.value = e.target.checked
           return { ...prev }
       })}
       /></span></h5>   
    </CCol>

   <CCol>
       <h5 className='mb-4 pt-2 d-flex'>
       Product Sales Report<span className='mx-2'><CFormSwitch size="lg"
       checked={erpInventory?.items.erpProductSalesReport.value}
       onChange={(e) => setRightObject(prev => {
           prev.erpRights.erpInventory.items.erpProductSalesReport.value = e.target.checked
           return { ...prev }
       })}
       /></span></h5>    
  </CCol>

   <CCol>
       <h5 className='mb-4 pt-2 d-flex'>
       Office Inventory<span className='mx-2'><CFormSwitch size="lg"
       checked={erpInventory?.items.erpOfficeInventory.value}
       onChange={(e) => setRightObject(prev => {
           prev.erpRights.erpInventory.items.erpOfficeInventory.value = e.target.checked
           return { ...prev }
       })}
       /></span></h5>    
       <CFormSwitch size="xl" label="Inventory List" checked={toCheckRightVal(inventoryRight.inventoryList,'erpOfficeInventory')}  onChange={()=>handleRight(inventoryRight.inventoryList,'erpOfficeInventory')}  />
       <CFormSwitch size="xl" label="Inventory add"  checked={toCheckRightVal(inventoryRight.inventoryAdd,'erpOfficeInventory')}  onChange={()=>handleRight(inventoryRight.inventoryAdd,'erpOfficeInventory')} />
       <CFormSwitch size="xl" label="Assigned List"  checked={toCheckRightVal(inventoryRight.assignedList,'erpOfficeInventory')}  onChange={()=>handleRight(inventoryRight.assignedList,'erpOfficeInventory')}  />
   </CCol>
 
</CRow>
<CRow  className='mt-5'  >

<h5 className='mb-4 pt-2 d-flex ' >IMP Call List <span className='mx-2'><CFormSwitch size="lg"
checked={erpInventory?.items.erpImpCallList.value}
onChange={(e) => setRightObject(prev => {
    prev.erpRights.erpInventory.items.erpImpCallList.value = e.target.checked
    return { ...prev }
})}
/></span></h5>

   <CCol>
       <CFormSwitch  size="xl" label="IMP Call lsit" checked={toCheckRightVal("imp"+inventoryRight.viewCallList,'erpImpCallList')}  onChange={()=>handleRight("imp"+inventoryRight.viewCallList,'erpImpCallList')} />
       <CFormSwitch size="xl" label="Add IMP Call" checked={toCheckRightVal("imp"+inventoryRight.addCall,'erpImpCallList')}  onChange={()=>handleRight("imp"+inventoryRight.addCall,'erpImpCallList')}/>
       <CFormSwitch size="xl" label="Edit IMP Call" checked={toCheckRightVal("imp"+inventoryRight.editCall,'erpImpCallList')}  onChange={()=>handleRight("imp"+inventoryRight.editCall,'erpImpCallList')} />
       <CFormSwitch size="xl" label="Delete IMP Call" checked={toCheckRightVal("imp"+inventoryRight.deleteICall,'erpImpCallList')}  onChange={()=>handleRight("imp"+inventoryRight.deleteICall,'erpImpCallList')} />
       <CFormSwitch size="xl" label="Action" checked={toCheckRightVal("imp"+inventoryRight.action,'erpImpCallList')}  onChange={()=>handleRight("imp"+inventoryRight.action,'erpImpCallList')} />
  </CCol>
   <CCol>
       <CFormSwitch size="xl" label="All Suppiler List"  checked={toCheckRightVal("all"+inventoryRight.viewCallList,'erpImpCallList')}  onChange={()=>handleRight("all"+inventoryRight.viewCallList,'erpImpCallList')}  />
       <CFormSwitch size="xl" label="Add Suppiler List"  checked={toCheckRightVal("all"+inventoryRight.addCall,'erpImpCallList')}  onChange={()=>handleRight("all"+inventoryRight.addCall,'erpImpCallList')} />
       <CFormSwitch size="xl" label="Edit Suppiler List" checked={toCheckRightVal("all"+inventoryRight.editCall,'erpImpCallList')}  onChange={()=>handleRight("all"+inventoryRight.editCall,'erpImpCallList')} />
       <CFormSwitch size="xl" label="Delete Suppiler List" checked={toCheckRightVal("all"+inventoryRight.deleteICall,'erpImpCallList')}  onChange={()=>handleRight("all"+inventoryRight.deleteICall,'erpImpCallList')} />
       <CFormSwitch size="xl" label="Action" checked={toCheckRightVal("all"+inventoryRight.action,'erpImpCallList')}  onChange={()=>handleRight("all"+inventoryRight.action,'erpImpCallList')} />

   </CCol>
   <CCol>
       <CFormSwitch size="xl" label="Guest List"  checked={toCheckRightVal("guest"+inventoryRight.viewCallList,'erpImpCallList')}  onChange={()=>handleRight("guest"+inventoryRight.viewCallList,'erpImpCallList')} />
       <CFormSwitch size="xl" label="Add Guest List"  checked={toCheckRightVal("guest"+inventoryRight.addCall,'erpImpCallList')}  onChange={()=>handleRight("guest"+inventoryRight.addCall,'erpImpCallList')} />
       <CFormSwitch size="xl" label="Edit Guest List"  checked={toCheckRightVal("guest"+inventoryRight.editCall,'erpImpCallList')}  onChange={()=>handleRight("guest"+inventoryRight.editCall,'erpImpCallList')} />
       <CFormSwitch size="xl" label="Delete Guest List"  checked={toCheckRightVal("guest"+inventoryRight.deleteICall,'erpImpCallList')}  onChange={()=>handleRight("guest"+inventoryRight.deleteICall,'erpImpCallList')}/>
       <CFormSwitch size="xl" label="Action" checked={toCheckRightVal("guest"+inventoryRight.action,'erpImpCallList')}  onChange={()=>handleRight("guest"+inventoryRight.action,'erpImpCallList')} />
   </CCol>
</CRow>



<CRow className='mt-4'>
    <CCol>
       <h5 className='mb-4 pt-2 d-flex ' >Product Invoice <span className='mx-2'><CFormSwitch size="lg"
checked={erpInventory?.items.erpProductInvoice.value}
onChange={(e) => setRightObject(prev => {
    prev.erpRights.erpInventory.items.erpProductInvoice.value = e.target.checked
    return { ...prev }
})}
/></span></h5>

        <CFormSwitch size="xl" label="View Product Invoice" checked={toCheckRightVal(inventoryRight.viewProductInvoice,'erpProductInvoice')}  onChange={()=>handleRight(inventoryRight.viewProductInvoice,'erpProductInvoice')}  />
       <CFormSwitch size="xl" label="Delete Product Invoice"  checked={toCheckRightVal(inventoryRight.deleteProductInvoice,'erpProductInvoice')}  onChange={()=>handleRight(inventoryRight.deleteProductInvoice,'erpProductInvoice')} /> 
   </CCol>
</CRow>
</div> 


}

export default InventoryRights