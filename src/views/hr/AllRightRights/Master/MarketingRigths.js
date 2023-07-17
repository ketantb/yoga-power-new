import {
    CCol,
    CFormSwitch,
    CRow,
} from '@coreui/react'


import React from 'react'

const MarketingRigths = ({masterMarketing,setRightObject}) => {
    return <div >

<CRow>
  <CCol>
    

       <h5 className='mb-4 p-0 d-flex ' > Marketing <span className='mx-2'>
        <CFormSwitch  size="xl"
        checked={masterMarketing.value}
        onChange={(e)=>setRightObject(prev=>{
         prev.masterRights.masterMarketing.value=e.target.checked
         return {...prev}
        })}
       /></span>
    </h5>
   </CCol>        
</CRow>

<CRow  className='mt-5'>
   <CCol>
       <h5>Lead Source Master</h5>
       <CFormSwitch  size="xl" label="Lead Source Master" />
       <CFormSwitch  size="xl" label="Add Source Master" />
       <CFormSwitch  size="xl" label="Delete Source Master" />
   </CCol>
   <CCol>
       <h5>Template</h5>
       <CFormSwitch size="xl" label="Template"  />
       <CFormSwitch size="xl" label="Add Template"  />
       <CFormSwitch size="xl" label="Edit Template"  />
       <CFormSwitch size="xl" label="Delete Template"  />
   </CCol>
   <CCol>
       <h5>Gallery Master</h5>
       <CFormSwitch size="xl" label="Gallery Master"  />
       <CFormSwitch size="xl" label="Add Gallery Master"  />
       <CFormSwitch size="xl" label="Delete Gallery Master"  />
   </CCol>
</CRow>

<CRow className='mt-5' >
   <CCol>
       <h5>Automated Communication</h5>
       <CFormSwitch size="xl" label="Automated Communication" />
   </CCol>
</CRow>


</div> 
}

export default MarketingRigths
