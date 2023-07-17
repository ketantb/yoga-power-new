import {
    CCol,
    CFormSwitch,
    CRow,    
} from '@coreui/react'


const InventoryRights = ({masterInverntory,setRightObject}) => {
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
               <h5>All Product Listing Master</h5>
               <CFormSwitch  size="xl" label="Product Listing Master" />
               <CFormSwitch  size="xl" label="ADD Product Listing " />
               <CFormSwitch  size="xl" label="Delete Product Listing " />
               <CFormSwitch  size="xl" label="Edit Product Listing " />
           </CCol>
           <CCol>
               <h5>Office Inventory</h5>
               <CFormSwitch  size="xl" label="Office Inventory" />
               <CFormSwitch  size="xl" label="ADD Office Inventory" />
               <CFormSwitch  size="xl" label="Delete Office Inventory" />
               <CFormSwitch  size="xl" label="Edit Office Inventory" />
           </CCol>
        </CRow>    

     </div>
}

export default InventoryRights
