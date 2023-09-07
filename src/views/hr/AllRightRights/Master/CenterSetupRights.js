import {
    CCol,
    CFormSwitch,
    CRow,
} from '@coreui/react'


import React from 'react'
import { masterRightValue,masterMarketingRightVal,herMasterRightVal } from '../../Rights/rightsValue/masterRightsValue'

const CenterSetup = ({masterRights,setRightObject}) => {

    const masterCenterSetup = masterRights.masterCenterSetup
    const masterMarketing = masterRights.masterMarketing
    const masterHr = masterRights.masterHr



    const handleRight = (val,parrent,type='masterCenterSetup')=>{
        setRightObject(prev => {
            const  arr = prev.masterRights[type].items[parrent].rights
                 if(arr.includes(val)){
                     arr?.splice(arr?.indexOf(val),1)
                     return { ...prev }
                 }
              arr.push(val)
              return { ...prev }
             })       
    }


    const handleRightLead2 = (val,parrent,type='masterMarketing')=>{

        setRightObject(prev => {
     
            const  arr = prev.masterRights[type].items[parrent].rights

                 if(arr.includes(val)){
                     arr?.splice(arr?.indexOf(val),1)
                     return { ...prev }
                 }
              arr.push(val)
              return { ...prev }
             })
         }

const toCheckRightVal = (val,parrent)=>{
    return masterCenterSetup.items[parrent].rights.includes(val)
}

const toCheckRightValLead = (val,parrent)=>{
    return masterMarketing.items[parrent].rights.includes(val)
}

const toCheckRightValHr = (val,parrent)=>{
    return masterHr.items[parrent].rights.includes(val)
}




    return <div >
<CRow>
<CCol>
   

       <h5 className='mb-4 p-0 d-flex ' >
       Center Setup <span className='mx-2'>
           <CFormSwitch size="lg"  
            checked={masterCenterSetup.value}
            onChange={(e)=>setRightObject(prev=>{
             prev.masterRights.masterCenterSetup.value=e.target.checked
             return {...prev}
            })}
            
            /></span>
    </h5>

   </CCol>        
</CRow>


<CRow  className='mt-5' >

   <CCol>

    <h5 className='mb-4 p-0 d-flex ' >
    Company Logo Setup <span className='mx-2'>
        <CFormSwitch  size="xl"
        checked={masterCenterSetup.items.masterCompanyLogoSetup.value}
        onChange={(e)=>setRightObject(prev=>{
         prev.masterRights.masterCenterSetup.items.masterCompanyLogoSetup.value=e.target.checked
         return {...prev}
        })}
       /></span>
    </h5>

   </CCol>
   <CCol>

       <h5 className='mb-4 p-0 d-flex ' >
       Company Profile Setup <span className='mx-2'>
        <CFormSwitch  size="xl"
        checked={masterCenterSetup.items.masterCompanyProfileSetup.value}
        onChange={(e)=>setRightObject(prev=>{
         prev.masterRights.masterCenterSetup.items.masterCompanyProfileSetup.value=e.target.checked
         return {...prev}
        })}
       /></span>
    </h5>


   </CCol>
   <CCol>
       
   <h5 className='mb-4 p-0 d-flex ' > Services Master <span className='mx-2'>
        <CFormSwitch  size="xl"
        checked={masterCenterSetup.items.masterServicesMaster.value}
        onChange={(e)=>setRightObject(prev=>{
         prev.masterRights.masterCenterSetup.items.masterServicesMaster.value=e.target.checked
         return {...prev}
        })}
       /></span>
    </h5>
       <CFormSwitch size="xl" label="Services Master Status" 
         checked={toCheckRightVal(masterRightValue.servicesMaster,'masterServicesMaster')}
         onChange={()=>handleRight(masterRightValue.servicesMaster,'masterServicesMaster')}
       />
       <CFormSwitch size="xl" label="Add Services Master"  
          checked={toCheckRightVal(masterRightValue.addServicesMaster,'masterServicesMaster')}
          onChange={()=>handleRight(masterRightValue.addServicesMaster,'masterServicesMaster')}
       />
       <CFormSwitch size="xl" label="Delete Services Master"
          checked={toCheckRightVal(masterRightValue.deleteServicesMaster,'masterServicesMaster')}
          onChange={()=>handleRight(masterRightValue.deleteServicesMaster,'masterServicesMaster')}
       />
   </CCol>
</CRow>

<CRow className='mt-5' >
   <CCol>
       <h5 className='mb-4 p-0 d-flex ' > Package Master <span className='mx-2'>
        <CFormSwitch  size="xl"
        checked={masterCenterSetup.items.masterPackageMaster.value}
        onChange={(e)=>setRightObject(prev=>{
         prev.masterRights.masterCenterSetup.items.masterPackageMaster.value=e.target.checked
         return {...prev}
        })}
       /></span>
    </h5>

      <CFormSwitch size="xl" label="Package Master Status" 
         checked={toCheckRightVal(masterRightValue.packageStatus,'masterPackageMaster')}
         onChange={()=>handleRight(masterRightValue.packageStatus,'masterPackageMaster')}
       />
       <CFormSwitch size="xl" label="Add Package Master"
         checked={toCheckRightVal(masterRightValue.addPackageMaste,'masterPackageMaster')}
         onChange={()=>handleRight(masterRightValue.addPackageMaste,'masterPackageMaster')}
       />
       <CFormSwitch size="xl" label="Delete Package Master" 
         checked={toCheckRightVal(masterRightValue.deletePackageMaster,'masterPackageMaster')}
         onChange={()=>handleRight(masterRightValue.deletePackageMaster,'masterPackageMaster')}
       />
   </CCol>
   <CCol>
       <h5 className='mb-4 p-0 d-flex ' > Batch time Master <span className='mx-2'>
        <CFormSwitch  size="xl"
        checked={masterCenterSetup.items.masterBatchTimeMaster.value}
        onChange={(e)=>setRightObject(prev=>{
         prev.masterRights.masterCenterSetup.items.masterBatchTimeMaster.value=e.target.checked
         return {...prev}
        })}
       /></span>
    </h5>

       <CFormSwitch size="xl" label="Add Batch time Master" 
       checked={toCheckRightVal(masterRightValue.addBatchTimeMaster,'masterBatchTimeMaster')}
       onChange={()=>handleRight(masterRightValue.addBatchTimeMaster,'masterBatchTimeMaster')}
       />
       <CFormSwitch size="xl" label="Delete Batch time Master"
        checked={toCheckRightVal(masterRightValue.deleteBatchTimeMaster,'masterBatchTimeMaster')}
        onChange={()=>handleRight(masterRightValue.deleteBatchTimeMaster,'masterBatchTimeMaster')}
       />
       <CFormSwitch size="xl" label="Status" 
        checked={toCheckRightVal(masterRightValue.batchTimeMasterStatus,'masterBatchTimeMaster')}
        onChange={()=>handleRight(masterRightValue.batchTimeMasterStatus,'masterBatchTimeMaster')} 
       />
   </CCol>
   <CCol>
       <h5 className='mb-4 p-0 d-flex ' > Form Master <span className='mx-2'>
        <CFormSwitch  size="xl"
        checked={masterCenterSetup.items.masterFormMaster.value}
        onChange={(e)=>setRightObject(prev=>{
         prev.masterRights.masterCenterSetup.items.masterFormMaster.value=e.target.checked
         return {...prev}
        })}
       /></span>
    </h5>
   </CCol>

</CRow>


<CRow  className='mt-5'>
   <CCol>
       <h5 className='mb-4 p-0 d-flex ' > Invoice Master <span className='mx-2'>
        <CFormSwitch  size="xl"
        checked={masterCenterSetup.items.masterInvoiceMaster.value}
        onChange={(e)=>setRightObject(prev=>{
         prev.masterRights.masterCenterSetup.items.masterInvoiceMaster.value=e.target.checked
         return {...prev}
        })}
       /></span>
    </h5>
   </CCol>
   <CCol>
    <h5 className='mb-4 p-0 d-flex ' > Lead Source Master <span className='mx-2'>
        <CFormSwitch  size="xl"
        checked={masterMarketing.items.masterLeadSourseMaster.value}
        onChange={(e)=>setRightObject(prev=>{
         prev.masterRights.masterMarketing.items.masterLeadSourseMaster.value=e.target.checked
         return {...prev}
        })}
       /></span>
    </h5>

       <CFormSwitch  size="xl" label="Lead Source Master" 
          checked={toCheckRightValLead(masterMarketingRightVal.leadSourceMaster,'masterLeadSourseMaster')}
          onChange={()=>handleRightLead2(masterMarketingRightVal.leadSourceMaster,'masterLeadSourseMaster')}
       />
       <CFormSwitch  size="xl" label="Add Source Master"
          checked={toCheckRightValLead(masterMarketingRightVal.addSourceMaster,'masterLeadSourseMaster')}
          onChange={()=>handleRightLead2(masterMarketingRightVal.addSourceMaster,'masterLeadSourseMaster')}
       />
       <CFormSwitch  size="xl" label="Delete Source Master"
          checked={toCheckRightValLead(masterMarketingRightVal.deleteSourceMaster,'masterLeadSourseMaster')}
          onChange={()=>handleRightLead2(masterMarketingRightVal.deleteSourceMaster,'masterLeadSourseMaster')}
       />
   </CCol>
   <CCol>
           <h5 className='mb-4 p-0 d-flex ' > Designation Master <span className='mx-2'>
           <CFormSwitch  size="xl" 
           checked={masterHr.items.masterEmployeeDesignation.value}
           onChange={(e)=>setRightObject(prev=>{
            prev.masterRights.masterHr.items.masterEmployeeDesignation.value=e.target.checked
            return {...prev}
           })}
           /> </span>
           </h5>
           <CFormSwitch  size="xl" label="Designation Master Satus" 
             checked={toCheckRightValHr(herMasterRightVal.designationMasterStatus,'masterEmployeeDesignation')}
             onChange={()=>handleRightLead2(herMasterRightVal.designationMasterStatus,'masterEmployeeDesignation','masterHr')}
           />
           <CFormSwitch  size="xl" label="ADD Designation Master" 
             checked={toCheckRightValHr(herMasterRightVal.addDesignationMaster,'masterEmployeeDesignation','masterHr')}
             onChange={()=>handleRightLead2(herMasterRightVal.addDesignationMaster,'masterEmployeeDesignation','masterHr')}
           />
           <CFormSwitch  size="xl" label="Delete Designation Master" 
             checked={toCheckRightValHr(herMasterRightVal.deleteDesignationMaster,'masterEmployeeDesignation','masterHr')}
             onChange={()=>handleRightLead2(herMasterRightVal.deleteDesignationMaster,'masterEmployeeDesignation','masterHr')}
           />
       </CCol>
</CRow>
</div> 
}

export default CenterSetup
