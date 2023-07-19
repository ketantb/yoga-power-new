import {
    CCol,
    CFormSwitch,
    CRow,    
} from '@coreui/react'
import { inventoryMasterRights } from '../../Rights/rightsValue/masterRightsValue'

const InventoryRights = ({masterInverntory,setRightObject}) => {


  const handleRight = (val,parrent)=>{

    setRightObject(prev => {
 
        const  arr = prev.masterRights.masterInverntory.items[parrent].rights

             if(arr.includes(val)){
                 arr?.splice(arr?.indexOf(val),1)
                 return { ...prev }
             }
          arr.push(val)
          return { ...prev }
         })
}

const toCheckRightVal = (val,parrent)=>{
return masterInverntory.items[parrent].rights.includes(val)
}

    return <div >

    <CRow >
      <CCol>

       <h5 className='mb-4 p-0 d-flex ' > Inventory <span className='mx-2'>
          <CFormSwitch  size="xl"
            checked={masterInverntory.value}
           onChange={(e)=>setRightObject(prev=>{
            prev.masterRights.masterInverntory.value=e.target.checked
             return {...prev}
           })}
          /></span>
        </h5>

       </CCol>        
    </CRow>
    
       <CRow className='mt-5' >  
           <CCol>
        <h5 className='mb-4 p-0 d-flex ' > All Product Listing Master <span className='mx-2'>
          <CFormSwitch  size="xl"
            checked={masterInverntory.items.masterAllProductListingMaster}
           onChange={(e)=>setRightObject(prev=>{
            prev.masterRights.masterInverntory.items.masterAllProductListingMaster.value=e.target.checked
             return {...prev}
           })}
          /></span>
        </h5>

               <CFormSwitch  size="xl" label="ADD Product Listing " 
                checked={toCheckRightVal(inventoryMasterRights.addProductListing,'masterAllProductListingMaster')}
                onChange={()=>handleRight(inventoryMasterRights.addProductListing,'masterAllProductListingMaster')} 
               />
               <CFormSwitch  size="xl" label="Delete Product Listing "
                checked={toCheckRightVal(inventoryMasterRights.deleteProductListing,'masterAllProductListingMaster')}
                onChange={()=>handleRight(inventoryMasterRights.deleteProductListing,'masterAllProductListingMaster')}  
               />
               <CFormSwitch  size="xl" label="Edit Product Listing "
                 checked={toCheckRightVal(inventoryMasterRights.editProductListing,'masterAllProductListingMaster')}
                 onChange={()=>handleRight(inventoryMasterRights.editProductListing,'masterAllProductListingMaster')}  
                />
           </CCol>
           <CCol>

        <h5 className='mb-4 p-0 d-flex ' > Office Inventory <span className='mx-2'>
          <CFormSwitch  size="xl"
            checked={masterInverntory.items.masterOfficeInventory.value}
           onChange={(e)=>setRightObject(prev=>{
            prev.masterRights.masterInverntory.items.masterOfficeInventory.value=e.target.checked
             return {...prev}
           })}
          /></span>
        </h5>     

               <CFormSwitch  size="xl" label="ADD Office Inventory" 
                checked={toCheckRightVal(inventoryMasterRights.addOfficeInventory,'masterOfficeInventory')}
                onChange={()=>handleRight(inventoryMasterRights.addOfficeInventory,'masterOfficeInventory')} 
               />
               <CFormSwitch  size="xl" label="Delete Office Inventory"
                checked={toCheckRightVal(inventoryMasterRights.deleteOfficeInventory,'masterOfficeInventory')}
                onChange={()=>handleRight(inventoryMasterRights.deleteOfficeInventory,'masterOfficeInventory')}  
               />
               <CFormSwitch  size="xl" label="Edit Office Inventory"
                checked={toCheckRightVal(inventoryMasterRights.editOfficeInventory,'masterOfficeInventory')}
                onChange={()=>handleRight(inventoryMasterRights.editOfficeInventory,'masterOfficeInventory')}  
               />
           </CCol>
        </CRow>    

     </div>
}

export default InventoryRights
