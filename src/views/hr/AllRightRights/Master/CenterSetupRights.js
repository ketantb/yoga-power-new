import {
    CCol,
    CFormSwitch,
    CRow,
} from '@coreui/react'


import React from 'react'
import { masterRightValue } from '../../Rights/rightsValue/masterRightsValue'

const CenterSetup = ({masterCenterSetup,setRightObject}) => {



    const handleRight = (val,parrent)=>{

        setRightObject(prev => {
     
            const  arr = prev.masterRights.masterCenterSetup.items[parrent].rights

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



<CRow className='mt-4'>
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
    <CFormSwitch size="xl" label="Fitness Product"  />

       
   </CCol>
</CRow>



</div> 
}

export default CenterSetup
