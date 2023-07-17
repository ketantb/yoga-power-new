import {
    CCol,
    CFormSwitch,
    CRow,
} from '@coreui/react'
import { hrManagement } from '../Rights/rightsValue/erpRightsValue'


function HrRights({erpHrManagement,setRightObject}){

   

     // to Handle Third Lavel nav Rights 

  function thirdLavleRightFun(parent,grandParent){
   setRightObject(prev => {
       const childProperty  =  prev.erpRights.erpHrManagement.items[grandParent].items[parent]
       if(childProperty.value){
           childProperty.value= false
           return { ...prev }
       }
       childProperty.value= true
       return { ...prev }
   })
 } 

   // to Handle Sub Rights Of Page 
  
   function handleSubRights(parent,grandParent,val){
      setRightObject(prev => {
          const  arr = prev.erpRights.erpHrManagement.items[grandParent].items[parent].rights
          if(arr.includes(val)){
              arr?.splice(arr?.indexOf(val),1)
              return { ...prev }
          }
       arr.push(val)
       return { ...prev }
      })
    }

    
  const toCheckRightVal = (parent,grandParent,val)=>{
   return erpHrManagement.items[grandParent].items[parent].rights.includes(val)
  }


  const handleRight1 = (val,parrent)=>{

   setRightObject(prev => {

       const  arr = prev.erpRights.erpHrManagement.items[parrent].rights
       console.log(arr)
       if(arr.includes(val)){
           arr?.splice(arr?.indexOf(val),1)
           return { ...prev }
       }
    arr.push(val)
    return { ...prev }
   })
}

const toCheckRightVal1 = (val,parrent)=>{
   return erpHrManagement.items[parrent].rights.includes(val)
}


return  <div>

<CRow className='mb-4' >

<CCol sm={12} > 
<h4 className='mb-4   d-flex' >Hr Management<span className='mx-2'><CFormSwitch size="lg"
checked={erpHrManagement.value}
    onChange={(e) => setRightObject(prev => {
        prev.erpRights.erpHrManagement.value = e.target.checked
        return { ...prev }
    })}
/></span></h4>
</CCol>

<h5 className='mb-4   d-flex ' >Recuritment<span className='mx-2'><CFormSwitch size="lg"
    checked={erpHrManagement.items.erpRecuritment.value}
    onChange={(e) => setRightObject(prev => {
        prev.erpRights.erpHrManagement.items.erpRecuritment.value = e.target.checked
        return { ...prev }
    })}
/></span></h5>


<CCol md={4}>
   <CFormSwitch size="xl" label="Import Export" 
    checked={toCheckRightVal1(hrManagement.recruitmentImportExport,'erpRecuritment')}
    onChange={(e)=>handleRight1(hrManagement.recruitmentImportExport,'erpRecuritment')}
   />
   <CFormSwitch size="xl" label="Status"
    checked={toCheckRightVal1(hrManagement.recruitmentStatus,'erpRecuritment')}
    onChange={(e)=>handleRight1(hrManagement.recruitmentStatus,'erpRecuritment')}
   />

</CCol>
<CCol  md={4}> 
   <CFormSwitch size="xl" label="Edit" 
   checked={toCheckRightVal1(hrManagement.recruitmentEdit,'erpRecuritment')}
   onChange={(e)=>handleRight1(hrManagement.recruitmentEdit,'erpRecuritment')}
   />
   <CFormSwitch size="xl" label="Delete"
   checked={toCheckRightVal1(hrManagement.recruitmentDelete,'erpRecuritment')}
   onChange={(e)=>handleRight1(hrManagement.recruitmentDelete,'erpRecuritment')}
   />
</CCol>
<CCol  md={4}>
   <CFormSwitch size="xl" label="Resume" 
    checked={toCheckRightVal1(hrManagement.recruitmentResume,'erpRecuritment')}
    onChange={(e)=>handleRight1(hrManagement.recruitmentResume,'erpRecuritment')}
   />
   <CFormSwitch size="xl" label="Action"
    checked={toCheckRightVal1(hrManagement.recruitmentAction,'erpRecuritment')}
    onChange={(e)=>handleRight1(hrManagement.recruitmentAction,'erpRecuritment')}
   />
</CCol>   

</CRow>

<CRow className='my-5'>
  <CCol sm={12}>
<h5 className='mb-4   d-flex ' >All Employee Profile<span className='mx-2'><CFormSwitch size="lg"
 checked={erpHrManagement.items.empLoyeeHrProfile.value}
 onChange={(e) => setRightObject(prev => {
     prev.erpRights.erpHrManagement.items.empLoyeeHrProfile.value = e.target.checked
     return { ...prev }
 })}
/></span></h5>

</CCol>

  <CCol >
<h5 className='mb-4   d-flex ' >All Employee Profile<span className='mx-2'><CFormSwitch size="lg"
 checked={erpHrManagement.items.empLoyeeHrProfile.items.erpEmployeeProfile.value}
 onChange={(e)=>thirdLavleRightFun('erpEmployeeProfile','empLoyeeHrProfile')}
/></span></h5>

  <CFormSwitch size="xl" label="Import Export"
         checked={toCheckRightVal('erpEmployeeProfile','empLoyeeHrProfile',hrManagement.allImpProfileImportExport)}
         onChange={()=>{handleSubRights('erpEmployeeProfile','empLoyeeHrProfile',hrManagement.allImpProfileImportExport)}}
  />
  <CFormSwitch size="xl" label="Profile View"
         checked={toCheckRightVal('erpEmployeeProfile','empLoyeeHrProfile',hrManagement.allImpProfileView)}
         onChange={()=>{handleSubRights('erpEmployeeProfile','empLoyeeHrProfile',hrManagement.allImpProfileView)}}
  />
  <CFormSwitch size="xl" label="Status" 
         checked={toCheckRightVal('erpEmployeeProfile','empLoyeeHrProfile',hrManagement.allImpProfileStatus)}
         onChange={()=>{handleSubRights('erpEmployeeProfile','empLoyeeHrProfile',hrManagement.allImpProfileStatus)}}
  />
  <CFormSwitch size="xl" label="Action"
         checked={toCheckRightVal('erpEmployeeProfile','empLoyeeHrProfile',hrManagement.allImpProfileAction)}
         onChange={()=>{handleSubRights('erpEmployeeProfile','empLoyeeHrProfile',hrManagement.allImpProfileAction)}}
  />
  <CFormSwitch size="xl" label="Edit"
         checked={toCheckRightVal('erpEmployeeProfile','empLoyeeHrProfile',hrManagement.allImpProfileEdit)}
         onChange={()=>{handleSubRights('erpEmployeeProfile','empLoyeeHrProfile',hrManagement.allImpProfileEdit)}} 
  />
  <CFormSwitch size="xl" label="Delete" 
         checked={toCheckRightVal('erpEmployeeProfile','empLoyeeHrProfile',hrManagement.allImpProfileDelete)}
         onChange={()=>{handleSubRights('erpEmployeeProfile','empLoyeeHrProfile',hrManagement.allImpProfileDelete)}} 
  />

  </CCol>
  <CCol >
<h5 className='mb-4   d-flex ' >Employee Documents<span className='mx-2'><CFormSwitch size="lg"
 checked={erpHrManagement.items.empLoyeeHrProfile.items.erpEmployeeDocuments.value}
 onChange={(e)=>thirdLavleRightFun('erpEmployeeDocuments','empLoyeeHrProfile')}
/></span></h5>

<CFormSwitch size="xl" label="View Doc"
checked={toCheckRightVal('erpEmployeeDocuments','empLoyeeHrProfile',hrManagement.empDocView)}
onChange={()=>{handleSubRights('erpEmployeeDocuments','empLoyeeHrProfile',hrManagement.empDocView)}} 
/>


  </CCol>

  <CCol >
<h5 className='mb-4   d-flex ' >Job Profile<span className='mx-2'><CFormSwitch size="lg"
 checked={erpHrManagement.items.empLoyeeHrProfile.items.erpJobProfile.value}
 onChange={(e)=>thirdLavleRightFun('erpJobProfile','empLoyeeHrProfile')}
/></span></h5>
  </CCol>


</CRow>

<CRow>
<CCol sm={12}>
<h5 className='mb-4   d-flex ' >Empyolee Target Sheet<span className='mx-2'><CFormSwitch size="lg"
 checked={erpHrManagement.items.erpHrTargetSheet.value}
 onChange={(e) => setRightObject(prev => {
     prev.erpRights.erpHrManagement.items.erpHrTargetSheet.value = e.target.checked
     return { ...prev }
 })}
/></span></h5>
</CCol>

<CCol>
<h5 className='mb-4   d-flex ' >Empyolee Target Sheet<span className='mx-2'><CFormSwitch size="lg"
 checked={erpHrManagement.items.erpHrTargetSheet.items.erpTargetSheet.value}
 onChange={(e)=>thirdLavleRightFun('erpTargetSheet','erpHrTargetSheet')}
/></span></h5>
<CFormSwitch size="xl" label="Add Empyolee Target " 
checked={toCheckRightVal('erpTargetSheet','erpHrTargetSheet',hrManagement.addEmpTargetSheet)}
onChange={()=>{handleSubRights('erpTargetSheet','erpHrTargetSheet',hrManagement.addEmpTargetSheet)}} 
/>
<CFormSwitch size="xl" label="Delete Empyolee Target " 
checked={toCheckRightVal('erpTargetSheet','erpHrTargetSheet',hrManagement.deleteEmpTargetSheet)}
onChange={()=>{handleSubRights('erpTargetSheet','erpHrTargetSheet',hrManagement.deleteEmpTargetSheet)}} 
/>
</CCol>
<CCol>
<h5 className='mb-4   d-flex ' >Empyolee Performance<span className='mx-2'><CFormSwitch size="lg"
 checked={erpHrManagement.items.erpHrTargetSheet.items.erpEmpPerformance.value}
 onChange={(e)=>thirdLavleRightFun('erpEmpPerformance','erpHrTargetSheet')}
/></span></h5>
<CFormSwitch size="xl" label="Add Empyolee Target " 
checked={toCheckRightVal('erpEmpPerformance','erpHrTargetSheet',hrManagement.addEmpTargetPerformance)}
onChange={()=>{handleSubRights('erpEmpPerformance','erpHrTargetSheet',hrManagement.addEmpTargetPerformance)}} 
/>
<CFormSwitch size="xl" label="Delete Empyolee Target "
checked={toCheckRightVal('erpEmpPerformance','erpHrTargetSheet',hrManagement.deleteEmpTargetPerformance)}
onChange={()=>{handleSubRights('erpEmpPerformance','erpHrTargetSheet',hrManagement.deleteEmpTargetPerformance)}} 
/>
</CCol>
<CCol>

</CCol>
</CRow>
<CRow className='my-5' >

<CCol sm={12}>
<h5 className='mb-4   d-flex ' >Emp Attendess <span className='mx-2'><CFormSwitch size="lg"
    checked={erpHrManagement.items.erpEmpAttendess.value}
    onChange={(e) => setRightObject(prev => {
        prev.erpRights.erpHrManagement.items.erpEmpAttendess.value = e.target.checked
        return { ...prev }
    })}
/></span></h5>  
</CCol>

<CCol>
   <h5 className='mb-4   d-flex ' >Emp Check Ins<span className='mx-2'><CFormSwitch size="lg"
   checked={erpHrManagement.items.erpEmpAttendess.items.erpEmpCheckIns.value}
   onChange={(e)=>thirdLavleRightFun('erpEmpCheckIns','erpEmpAttendess')}
/></span></h5>

</CCol>
<CCol>
   <h5 className='mb-4   d-flex ' >Biometric Emp<span className='mx-2'><CFormSwitch size="lg"
    checked={erpHrManagement.items.erpEmpAttendess.items.erpBiometricEmp.value}
    onChange={(e)=>thirdLavleRightFun('erpBiometricEmp','erpEmpAttendess')}
/></span></h5>
   <CFormSwitch size="xl" label="Biometric Staff" 
   checked={toCheckRightVal('erpBiometricEmp','erpEmpAttendess',hrManagement.biometricStaff)}
   onChange={()=>{handleSubRights('erpBiometricEmp','erpEmpAttendess',hrManagement.biometricStaff)}} 
   />
   <CFormSwitch size="xl" label="Edit Biometric Staff"
      checked={toCheckRightVal('erpBiometricEmp','erpEmpAttendess',hrManagement.editBiometricStaff)}
      onChange={()=>{handleSubRights('erpBiometricEmp','erpEmpAttendess',hrManagement.editBiometricStaff)}} 
   />
   <CFormSwitch size="xl" label="Delete Biometric Staff"
        checked={toCheckRightVal('erpBiometricEmp','erpEmpAttendess',hrManagement.deleteBiometricStaff)}
        onChange={()=>{handleSubRights('erpBiometricEmp','erpEmpAttendess',hrManagement.deleteBiometricStaff)}} 
   />
</CCol>
<CCol>
   <h5 className='mb-4   d-flex ' >Emp Attendance Register<span className='mx-2'><CFormSwitch size="lg"
    checked={erpHrManagement.items.erpEmpAttendess.items.erpEmpAttedanceRegister.value}
    onChange={(e)=>thirdLavleRightFun('erpEmpAttedanceRegister','erpEmpAttendess')}
   /></span></h5>
</CCol>


</CRow>
<CRow>

<CCol sm={12} >
   <h5 className='mb-4   d-flex ' >Hr Policy<span className='mx-2'><CFormSwitch size="lg"
    checked={erpHrManagement.items.erpHrHrPolicy.value}
    onChange={(e) => setRightObject(prev => {
        prev.erpRights.erpHrManagement.items.erpHrHrPolicy.value = e.target.checked
        return { ...prev }
    })}
   /></span></h5>
</CCol>


<CCol md={4} >
   <h5 className='mb-4   d-flex ' >Hr Policy<span className='mx-2'><CFormSwitch size="lg"
       checked={erpHrManagement.items.erpHrHrPolicy.items.erpHrPolicy.value}
       onChange={(e)=>thirdLavleRightFun('erpHrPolicy','erpHrHrPolicy')}
   /></span></h5>
</CCol>
<CCol md={4} >
   <h5 className='mb-4   d-flex ' >Holiday List<span className='mx-2'><CFormSwitch size="lg"
       checked={erpHrManagement.items.erpHrHrPolicy.items.erpHolidayList.value}
       onChange={(e)=>thirdLavleRightFun('erpHolidayList','erpHrHrPolicy')}
   /></span></h5>
</CCol>

<CCol md={4} >
   <h5 className='mb-4   d-flex ' >Shift Timing<span className='mx-2'><CFormSwitch size="lg"
       checked={erpHrManagement.items.erpHrHrPolicy.items.erpShiftTiming.value}
       onChange={(e)=>thirdLavleRightFun('erpShiftTiming','erpHrHrPolicy')}
   /></span></h5>
</CCol>

<CCol md={4} >
   <h5 className='mb-4   d-flex ' >Emp Joining<span className='mx-2'><CFormSwitch size="lg"
     checked={erpHrManagement.items.erpHrHrPolicy.items.erpEmpJoing.value}
     onChange={(e)=>thirdLavleRightFun('erpEmpJoing','erpHrHrPolicy')}
   /></span></h5>
</CCol>

</CRow>


<CRow className='my-5'>

<CCol sm={12} >
   <h5 className='mb-4   d-flex ' >Salary Sheet<span className='mx-2'><CFormSwitch size="lg"
    checked={erpHrManagement.items.erpSalarySheet.value}
    onChange={(e) => setRightObject(prev => {
        prev.erpRights.erpHrManagement.items.erpSalarySheet.value = e.target.checked
        return { ...prev }
    })}
   /></span></h5>
</CCol>


<CCol md={4} >
   <h5 className='mb-4   d-flex ' >Leave Setup<span className='mx-2'><CFormSwitch size="lg"
     checked={erpHrManagement.items.erpSalarySheet.items.erpLeaveSetup.value}
     onChange={(e)=>thirdLavleRightFun('erpLeaveSetup','erpSalarySheet')}
   /></span></h5>
</CCol>
<CCol md={4} >
   <h5 className='mb-4   d-flex ' >Emp Salary Sheet<span className='mx-2'><CFormSwitch size="lg"
     checked={erpHrManagement.items.erpSalarySheet.items.erpEmpSalarySheet.value}
     onChange={(e)=>thirdLavleRightFun('erpEmpSalarySheet','erpSalarySheet')}
   /></span></h5>
</CCol>

<CCol md={4} >
   <h5 className='mb-4   d-flex ' >Trainer Salary Slip<span className='mx-2'><CFormSwitch size="lg"
     checked={erpHrManagement.items.erpSalarySheet.items.erpTrainerSalarySlip.value}
     onChange={(e)=>thirdLavleRightFun('erpTrainerSalarySlip','erpSalarySheet')}
   /></span></h5>

</CCol>

<CCol md={4} >
   <h5 className='mb-4   d-flex ' >All Trainer Report<span className='mx-2'><CFormSwitch size="lg"
        checked={erpHrManagement.items.erpSalarySheet.items.erpAllTrainerReport.value}
        onChange={(e)=>thirdLavleRightFun('erpAllTrainerReport','erpSalarySheet')}
   /></span></h5>
</CCol>

</CRow>

<CRow className='my-5'>
<CCol>
   <h5 className='mb-4   d-flex ' >All Rights<span className='mx-2'><CFormSwitch size="lg"
    checked={erpHrManagement.items.erpAllRights.value}
    onChange={(e) => setRightObject(prev => {
        prev.erpRights.erpHrManagement.items.erpAllRights.value = e.target.checked
        return { ...prev }
    })}
   /></span></h5></CCol>
</CRow>



</div>

} 

export default HrRights