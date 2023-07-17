import {
    CCol,
    CFormSwitch,
    CRow,
} from '@coreui/react'


import React from 'react'

const ClientSetupRights = ({masterClient,setRightObject}) => {
    return <div >


<CRow >
  <CCol>
       <h5 className='mb-4 p-0 d-flex ' > Clients <span className='mx-2'>
        <CFormSwitch  size="xl"
        checked={masterClient.value}
        onChange={(e)=>setRightObject(prev=>{
         prev.masterRights.masterClient.value=e.target.checked
         return {...prev}
        })}
       /></span>
    </h5>
 </CCol>        
</CRow>

<CRow className='mt-5' >

   <CCol>
       <h5>Client Tranfer Master</h5>
       <CFormSwitch  size="xl" label="Client Tranfer Master" />
       <CFormSwitch  size="xl" label="Add Client Tranfer Master" />
       <CFormSwitch  size="xl" label="Delete Client Tranfer Master" />
   </CCol>
   <CCol>
       <h5>Appoinment Page Master</h5>
       <CFormSwitch size="xl" label="Appoinment Page Master"  />
   </CCol>
   <CCol>
       <h5>Support && Rights Master </h5>
       <CFormSwitch size="xl" label="Support && Rights Master"  />
   </CCol>
</CRow>

<CRow className='mt-5' >
   <CCol>
       <h5>Extension</h5>
       <CFormSwitch size="xl" label="Extension" />
   </CCol>
</CRow>


</div> 
}

export default ClientSetupRights
