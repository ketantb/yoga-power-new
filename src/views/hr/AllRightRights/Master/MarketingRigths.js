import {
    CCol,
    CFormSwitch,
    CRow,
} from '@coreui/react'


import React from 'react'
import { masterMarketingRightVal } from '../../Rights/rightsValue/masterRightsValue'
import { useDispatch,useSelector } from 'react-redux'

const MarketingRigths = ({masterMarketing,setRightObject}) => {

    // console.log(masterMarketing)

    const rightsData4 =
      useSelector((el)=>el?.empLoyeeRights?.masterRights?.masterMarketing?.items?.masterAutomatedComToStaff?.
      rights) 

      console.log(rightsData4)

    const handleRight = (val,parrent)=>{

        setRightObject(prev => {
     
            const  arr = prev.masterRights.masterMarketing.items[parrent].rights

                 if(arr.includes(val)){
                     arr?.splice(arr?.indexOf(val),1)
                     return { ...prev }
                 }
              arr.push(val)
              return { ...prev }
             })
         }

const toCheckRightVal = (val,parrent)=>{
    return masterMarketing.items[parrent].rights.includes(val)
}

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
   {/* <CCol>

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
          checked={toCheckRightVal(masterMarketingRightVal.leadSourceMaster,'masterLeadSourseMaster')}
          onChange={()=>handleRight(masterMarketingRightVal.leadSourceMaster,'masterLeadSourseMaster')}
       />
       <CFormSwitch  size="xl" label="Add Source Master"
          checked={toCheckRightVal(masterMarketingRightVal.addSourceMaster,'masterLeadSourseMaster')}
          onChange={()=>handleRight(masterMarketingRightVal.addSourceMaster,'masterLeadSourseMaster')}
       />
       <CFormSwitch  size="xl" label="Delete Source Master"
          checked={toCheckRightVal(masterMarketingRightVal.deleteSourceMaster,'masterLeadSourseMaster')}
          onChange={()=>handleRight(masterMarketingRightVal.deleteSourceMaster,'masterLeadSourseMaster')}
       />
   </CCol> */}
   <CCol>
       <h5 className='mb-4 p-0 d-flex ' >Email Template <span className='mx-2'>
        <CFormSwitch  size="xl"
        checked={masterMarketing.items.masterSmsEmailTemp.value}
        onChange={(e)=>setRightObject(prev=>{
         prev.masterRights.masterMarketing.items.masterSmsEmailTemp.value=e.target.checked
         return {...prev}
        })}
       /></span>
    </h5>

   </CCol>
   <CCol>
       <h5 className='mb-4 p-0 d-flex ' >Gallery Master<span className='mx-2'>
        <CFormSwitch  size="xl"
        checked={masterMarketing.items.masterGallertyMaster.value}
        onChange={(e)=>setRightObject(prev=>{
         prev.masterRights.masterMarketing.items.masterGallertyMaster.value=e.target.checked
         return {...prev}
        })}
       /></span>
    </h5>
   </CCol>

</CRow>
<CRow className='mt-2'>
<CCol>
       <h5 className='mb-4 p-0 d-flex ' >Event<span className='mx-2'>
        <CFormSwitch  size="xl"
        checked={masterMarketing.items.masterAutomatedComToStaff.value}
        onChange={(e)=>setRightObject(prev=>{
         prev.masterRights.masterMarketing.items.masterAutomatedComToStaff.value=e.target.checked
         return {...prev}
        })}
       /></span>
    </h5>
    <CFormSwitch size="xl" label="Event Emp View" 
     checked={toCheckRightVal(masterMarketingRightVal.eventEmpView,'masterAutomatedComToStaff')}
     onChange={()=>handleRight(masterMarketingRightVal.eventEmpView,'masterAutomatedComToStaff')} />
   </CCol>
</CRow>


</div> 
}

export default MarketingRigths
