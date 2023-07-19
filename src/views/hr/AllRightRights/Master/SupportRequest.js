import {
    CCol,
    CFormSwitch,
    CRow,
} from '@coreui/react'


import React from 'react'

const SupportRequest = ({masterClientFeedback,setRightObject}) => {
    return <div >
<CRow>
  <CCol>
       <h5>Client Feedback</h5>
       <CFormSwitch  size="xl" label="Support"
        checked={masterClientFeedback.value}
        onChange={(e)=>setRightObject(prev=>{
         prev.masterRights.masterClientFeedback.value=e.target.checked
         return {...prev}
        })}
       />
   </CCol>        
</CRow>

</div> 
}

export default SupportRequest
