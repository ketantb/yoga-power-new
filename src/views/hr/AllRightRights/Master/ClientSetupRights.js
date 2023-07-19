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

       <h5 className='mb-4 p-0 d-flex ' > Client Tranfer Master <span className='mx-2'>
        <CFormSwitch  size="xl"
        checked={masterClient.items.masterClientTransferMaster.value}
        onChange={(e)=>setRightObject(prev=>{
         prev.masterRights.masterClient.items.masterClientTransferMaster.value=e.target.checked
         return {...prev}
        })}
       /></span>
    </h5>

   </CCol>

</CRow>

</div> 
}

export default ClientSetupRights
