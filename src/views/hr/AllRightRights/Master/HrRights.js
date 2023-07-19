import {
    CCol,
    CFormSwitch,
    CRow,
} from '@coreui/react'

import React from 'react'
import { herMasterRightVal } from '../../Rights/rightsValue/masterRightsValue'


const HrRights = ({masterHr,setRightObject}) => {



const handleRight = (val,parrent)=>{

        setRightObject(prev => {
     
            const  arr = prev.masterRights.masterHr.items[parrent].rights

                 if(arr.includes(val)){
                     arr?.splice(arr?.indexOf(val),1)
                     return { ...prev }
                 }
              arr.push(val)
              return { ...prev }
             })
}

const toCheckRightVal = (val,parrent)=>{
    return masterHr.items[parrent].rights.includes(val)
}


return <div >

<CRow >
  <CCol>
     <h5 className='mb-4 p-0 d-flex ' > HR Management <span className='mx-2'>
        <CFormSwitch  size="xl"
        checked={masterHr.value}
        onChange={(e)=>setRightObject(prev=>{
         prev.masterRights.masterHr.value=e.target.checked
         return {...prev}
        })}
       /></span>
    </h5>
   </CCol>        
</CRow>

   <CRow className='mt-5' >  
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
             checked={toCheckRightVal(herMasterRightVal.designationMasterStatus,'masterEmployeeDesignation')}
             onChange={()=>handleRight(herMasterRightVal.designationMasterStatus,'masterEmployeeDesignation')}
           />
           <CFormSwitch  size="xl" label="ADD Designation Master" 
             checked={toCheckRightVal(herMasterRightVal.addDesignationMaster,'masterEmployeeDesignation')}
             onChange={()=>handleRight(herMasterRightVal.addDesignationMaster,'masterEmployeeDesignation')}
           />
           <CFormSwitch  size="xl" label="Delete Designation Master" 
             checked={toCheckRightVal(herMasterRightVal.deleteDesignationMaster,'masterEmployeeDesignation')}
             onChange={()=>handleRight(herMasterRightVal.deleteDesignationMaster,'masterEmployeeDesignation')}
           />
       </CCol>
       <CCol>
           <h5 className='mb-4 p-0 d-flex ' >Hr Policy <span className='mx-2'>
           <CFormSwitch  size="xl"
           checked={masterHr.items.masterHrPolicy.value}
           onChange={(e)=>setRightObject(prev=>{
            prev.masterRights.masterHr.items.masterHrPolicy.value=e.target.checked
            return {...prev}
           })}
           /> </span>
           </h5>
           <CFormSwitch  size="xl" label="ADD Hr Policy"
                     checked={toCheckRightVal(herMasterRightVal.addHrPolicy,'masterHrPolicy')}
                     onChange={()=>handleRight(herMasterRightVal.addHrPolicy,'masterHrPolicy')}
           />
            <CFormSwitch  size="xl" label="Delete Hr Policy"
                     checked={toCheckRightVal(herMasterRightVal.deleteHrPolicy,'masterHrPolicy')}
                     onChange={()=>handleRight(herMasterRightVal.deleteHrPolicy,'masterHrPolicy')}
           />
       </CCol>
       <CCol>
           <h5 className='mb-4 p-0 d-flex ' >Holiday List Master<span className='mx-2'>
           <CFormSwitch  size="xl"
            checked={masterHr.items.masterHolidaysList.value}
            onChange={(e)=>setRightObject(prev=>{
             prev.masterRights.masterHr.items.masterHolidaysList.value=e.target.checked
             return {...prev}
            })}
           /></span> 
           </h5>
           <CFormSwitch  size="xl"  label="Holiday List Master Status"
              checked={toCheckRightVal(herMasterRightVal.holidayListMasterStatus,'masterHolidaysList')}
              onChange={()=>handleRight(herMasterRightVal.holidayListMasterStatus,'masterHolidaysList')}
           />
           <CFormSwitch  size="xl"  label="ADD Holiday List Master"
              checked={toCheckRightVal(herMasterRightVal.addHolidayListMaster,'masterHolidaysList')}
              onChange={()=>handleRight(herMasterRightVal.addHolidayListMaster,'masterHolidaysList')}
           />
           <CFormSwitch  size="xl"  label="Delete Holiday List Master"
              checked={toCheckRightVal(herMasterRightVal.deleteHolidayListMaster,'masterHolidaysList')}
              onChange={()=>handleRight(herMasterRightVal.deleteHolidayListMaster,'masterHolidaysList')}
           />
       </CCol>
    </CRow>    
    <CRow  className='mt-5' > 

         <CCol>
          <h5 className='mb-4 p-0 d-flex ' >Employee Joining<span className='mx-2'>
           <CFormSwitch  size="xl"
            checked={masterHr.items.masterEmpJoining.value}
            onChange={(e)=>setRightObject(prev=>{
             prev.masterRights.masterHr.items.masterEmpJoining.value=e.target.checked
             return {...prev}
            })}
           /></span> 
           </h5> 
           <CFormSwitch  size="xl"  label="ADD Employee Joining"
             checked={toCheckRightVal(herMasterRightVal.addEmployeeJoining,'masterEmpJoining')}
             onChange={()=>handleRight(herMasterRightVal.addEmployeeJoining,'masterEmpJoining')}
           />
            <CFormSwitch  size="xl"  label="Edit Employee Joining"
             checked={toCheckRightVal(herMasterRightVal.editEmployeeJoining,'masterEmpJoining')}
             onChange={()=>handleRight(herMasterRightVal.editEmployeeJoining,'masterEmpJoining')}
           />
           <CFormSwitch  size="xl"  label="Delete Employee Joining"
             checked={toCheckRightVal(herMasterRightVal.deleteEmployeeJoining,'masterEmpJoining')}
             onChange={()=>handleRight(herMasterRightVal.deleteEmployeeJoining,'masterEmpJoining')}
           />
       </CCol>    
       <CCol>
           <h5 className='mb-4 p-0 d-flex ' >Job Profile<span className='mx-2'>
           <CFormSwitch  size="xl" 
            checked={masterHr.items.masterJobProfile.value}
            onChange={(e)=>setRightObject(prev=>{
             prev.masterRights.masterHr.items.masterJobProfile.value=e.target.checked
             return {...prev}
            })}
           /> </span>
           </h5> 
           <CFormSwitch  size="xl"  label="ADD Employee Joining"
             checked={toCheckRightVal(herMasterRightVal.addJobProfile,'masterJobProfile')}
             onChange={()=>handleRight(herMasterRightVal.addJobProfile,'masterJobProfile')}
           />
           <CFormSwitch  size="xl"  label="Edit Employee Joining"
             checked={toCheckRightVal(herMasterRightVal.editJobProfile,'masterJobProfile')}
             onChange={()=>handleRight(herMasterRightVal.editJobProfile,'masterJobProfile')}
           />
           <CFormSwitch  size="xl"  label="Delete Employee Joining"
             checked={toCheckRightVal(herMasterRightVal.deleteJobProfile,'masterJobProfile')}
             onChange={()=>handleRight(herMasterRightVal.deleteJobProfile,'masterJobProfile')}
           />
       </CCol>   
       <CCol>
           <h5 className='mb-4 p-0 d-flex ' >Employee Document<span className='mx-2'>
           <CFormSwitch  size="xl" 
            checked={masterHr.items.masterEmployeeDocument.value}
            onChange={(e)=>setRightObject(prev=>{
            prev.masterRights.masterHr.items.masterEmployeeDocument.value=e.target.checked
            return {...prev}
           })}
           /> </span>
           </h5> 
           <CFormSwitch  size="xl"  label="ADD Employee Document"
                 checked={toCheckRightVal(herMasterRightVal.aDDEmployeeDocument,'masterEmployeeDocument')}
                 onChange={()=>handleRight(herMasterRightVal.aDDEmployeeDocument,'masterEmployeeDocument')}
           />
           <CFormSwitch  size="xl"  label="Edit Employee Document"
                 checked={toCheckRightVal(herMasterRightVal.editEmployeeDocument,'masterEmployeeDocument')}
                 onChange={()=>handleRight(herMasterRightVal.editEmployeeDocument,'masterEmployeeDocument')}
           />
           <CFormSwitch  size="xl"  label="Delete Employee Document"
                 checked={toCheckRightVal(herMasterRightVal.deleteEmployeeDocument,'masterEmployeeDocument')}
                 onChange={()=>handleRight(herMasterRightVal.deleteEmployeeDocument,'masterEmployeeDocument')}
           />
       </CCol>   
    </CRow>
        <CRow  className='mt-5' > 

         <CCol>
          <h5 className='mb-4 p-0 d-flex ' >Leave Setup<span className='mx-2'>
           <CFormSwitch  size="xl"
           checked={masterHr.items.masterLeaveSetup.value}
           onChange={(e)=>setRightObject(prev=>{
           prev.masterRights.masterHr.items.masterLeaveSetup.value=e.target.checked
           return {...prev}
          })}
           /></span> 
           </h5> 
           <CFormSwitch  size="xl"  label="View Employee Leave"
                 checked={toCheckRightVal(herMasterRightVal.viewEmployeeLeave,'masterLeaveSetup')}
                 onChange={()=>handleRight(herMasterRightVal.viewEmployeeLeave,'masterLeaveSetup')}
           />
            <CFormSwitch  size="xl"  label="Delete Employee Leave"
                 checked={toCheckRightVal(herMasterRightVal.deleteEmployeeLeave,'masterLeaveSetup')}
                 onChange={()=>handleRight(herMasterRightVal.deleteEmployeeLeave,'masterLeaveSetup')}
           />
           <CFormSwitch  size="xl"  label="ADD Employee Leave"
                 checked={toCheckRightVal(herMasterRightVal.addEmployeeLeave,'masterLeaveSetup')}
                 onChange={()=>handleRight(herMasterRightVal.addEmployeeLeave,'masterLeaveSetup')}
           />
            <CFormSwitch  size="xl"  label="View Employee Leave List"
                 checked={toCheckRightVal(herMasterRightVal.viewEmployeeLeaveList,'masterLeaveSetup')}
                 onChange={()=>handleRight(herMasterRightVal.viewEmployeeLeaveList,'masterLeaveSetup')}
           />
           <CFormSwitch  size="xl"  label="Add Employee Leave"
                 checked={toCheckRightVal(herMasterRightVal.updateEmployeeLeave,'masterLeaveSetup')}
                 onChange={()=>handleRight(herMasterRightVal.updateEmployeeLeave,'masterLeaveSetup')}
            />
             <CFormSwitch  size="xl"  label="View Employee Leave History"
                 checked={toCheckRightVal(herMasterRightVal.viewEmployeeLeaveHistory,'masterLeaveSetup')}
                 onChange={()=>handleRight(herMasterRightVal.viewEmployeeLeaveHistory,'masterLeaveSetup')}
           />
           <CFormSwitch  size="xl"  label="Delete Employee Leave History"
                checked={toCheckRightVal(herMasterRightVal.deleteEmployeeLeaveHistory,'masterLeaveSetup')}
                onChange={()=>handleRight(herMasterRightVal.deleteEmployeeLeaveHistory,'masterLeaveSetup')}
           />
       </CCol>    
       <CCol>
           <h5 className='mb-4 p-0 d-flex ' >Salary Sheet<span className='mx-2'>
           <CFormSwitch  size="xl" 
            checked={masterHr.items.masterSalarySheet.value}
            onChange={(e)=>setRightObject(prev=>{
            prev.masterRights.masterHr.items.masterSalarySheet.value=e.target.checked
            return {...prev}
           })}
           /> </span>
           </h5> 
           <CFormSwitch  size="xl"  label="ADD Salary Sheet"
                checked={toCheckRightVal(herMasterRightVal.addSalarySheet,'masterSalarySheet')}
                onChange={()=>handleRight(herMasterRightVal.addSalarySheet,'masterSalarySheet')}
           />
           <CFormSwitch  size="xl"  label="Edit Salary Sheet"
                checked={toCheckRightVal(herMasterRightVal.editSalarySheet,'masterSalarySheet')}
                onChange={()=>handleRight(herMasterRightVal.editSalarySheet,'masterSalarySheet')}
           />
           <CFormSwitch  size="xl"  label="Delete Salary Sheet"
               checked={toCheckRightVal(herMasterRightVal.deleteSalarySheet,'masterSalarySheet')}
               onChange={()=>handleRight(herMasterRightVal.deleteSalarySheet,'masterSalarySheet')}
           />
       </CCol>   
       <CCol>
           <h5 className='mb-4 p-0 d-flex ' >Shift Timing<span className='mx-2'>
           <CFormSwitch  size="xl"
              checked={masterHr.items.masterShiftTiming.value}
              onChange={(e)=>setRightObject(prev=>{
              prev.masterRights.masterHr.items.masterShiftTiming.value=e.target.checked
              return {...prev}
             })}
           /> </span>
           </h5> 
           <CFormSwitch  size="xl"  label="ADD Shift Timing"
              checked={toCheckRightVal(herMasterRightVal.addShiftTiming,'masterShiftTiming')}
              onChange={()=>handleRight(herMasterRightVal.addShiftTiming,'masterShiftTiming')}
           />
           <CFormSwitch  size="xl"  label="Edit Shift Timing"
              checked={toCheckRightVal(herMasterRightVal.editShiftTiming,'masterShiftTiming')}
              onChange={()=>handleRight(herMasterRightVal.editShiftTiming,'masterShiftTiming')}
           />
           <CFormSwitch  size="xl"  label="Delete Shift Timing"
              checked={toCheckRightVal(herMasterRightVal.deleteShiftTiming,'masterShiftTiming')}
              onChange={()=>handleRight(herMasterRightVal.deleteShiftTiming,'masterShiftTiming')}
           />
       </CCol>   
    </CRow>
    <CRow  className='mt-5' > 

         <CCol>
          <h5 className='mb-4 p-0 d-flex ' >Trainer Salary Slip<span className='mx-2'>
           <CFormSwitch  size="xl"
            checked={masterHr.items.masterTrainerSalarySlip.value}
            onChange={(e)=>setRightObject(prev=>{
            prev.masterRights.masterHr.items.masterTrainerSalarySlip.value=e.target.checked
            return {...prev}
           })}
           /></span> 
           </h5> 
           <CFormSwitch  size="xl"  label="ADD Trainer Salary Slip"
            checked={toCheckRightVal(herMasterRightVal.addTrainerSalarySlip,'masterTrainerSalarySlip')}
            onChange={()=>handleRight(herMasterRightVal.addTrainerSalarySlip,'masterTrainerSalarySlip')}
           />
           <CFormSwitch  size="xl"  label="Edit Trainer Salary Slip"
             checked={toCheckRightVal(herMasterRightVal.editTrainerSalarySlip,'masterTrainerSalarySlip')}
             onChange={()=>handleRight(herMasterRightVal.editTrainerSalarySlip,'masterTrainerSalarySlip')}
           />
           <CFormSwitch  size="xl"  label="Delete Trainer Salary Slip"
             checked={toCheckRightVal(herMasterRightVal.deleteTrainerSalarySlip,'masterTrainerSalarySlip')}
             onChange={()=>handleRight(herMasterRightVal.deleteTrainerSalarySlip,'masterTrainerSalarySlip')}
            />
       </CCol>    
       <CCol>
           <h5 className='mb-4 p-0 d-flex ' >Emp Prformanse<span className='mx-2'>
           <CFormSwitch  size="xl" 
            checked={masterHr.items.masterEmpPrformance.value}
            onChange={(e)=>setRightObject(prev=>{
            prev.masterRights.masterHr.items.masterEmpPrformance.value=e.target.checked
            return {...prev}
           })}
           /> </span>
           </h5> 
           <CFormSwitch  size="xl"  label=" Emp Prformanse"
                checked={toCheckRightVal(herMasterRightVal.empPrformanse,'masterEmpPrformance')}
                onChange={()=>handleRight(herMasterRightVal.empPrformanse,'masterEmpPrformance')}
           />
           <CFormSwitch  size="xl"  label="ADD Emp Prformanse"
                checked={toCheckRightVal(herMasterRightVal.addEmpPrformanse,'masterEmpPrformance')}
                onChange={()=>handleRight(herMasterRightVal.addEmpPrformanse,'masterEmpPrformance')}
           /> 
           <CFormSwitch  size="xl"  label="Edit Emp Prformanse"
                checked={toCheckRightVal(herMasterRightVal.editEmpPrformanse,'masterEmpPrformance')}
                onChange={()=>handleRight(herMasterRightVal.editEmpPrformanse,'masterEmpPrformance')}
            />
           <CFormSwitch  size="xl"  label="Delete Emp Prformanse"
                checked={toCheckRightVal(herMasterRightVal.deleteEmpPrformanse,'masterEmpPrformance')}
                onChange={()=>handleRight(herMasterRightVal.deleteEmpPrformanse,'masterEmpPrformance')}
           />

           <CFormSwitch  size="xl"  label=" Trainer Prformanse"
                checked={toCheckRightVal(herMasterRightVal.trainerPrformanse,'masterEmpPrformance')}
                onChange={()=>handleRight(herMasterRightVal.trainerPrformanse,'masterEmpPrformance')}
           />
           <CFormSwitch  size="xl"  label="ADD Trainer Prformanse"
                checked={toCheckRightVal(herMasterRightVal.addTrainerPrformanse,'masterEmpPrformance')}
                onChange={()=>handleRight(herMasterRightVal.addTrainerPrformanse,'masterEmpPrformance')}
           />
           <CFormSwitch  size="xl"  label="Edit Trainer Prformanse"
                checked={toCheckRightVal(herMasterRightVal.editTrainerPrformanse,'masterEmpPrformance')}
                onChange={()=>handleRight(herMasterRightVal.editTrainerPrformanse,'masterEmpPrformance')} 
            />
           <CFormSwitch  size="xl"  label="Delete Trainer Prformanse"
                checked={toCheckRightVal(herMasterRightVal.deleteTrainerPrformanse,'masterEmpPrformance')}
                onChange={()=>handleRight(herMasterRightVal.deleteTrainerPrformanse,'masterEmpPrformance')} 
           />
       </CCol>   
       <CCol>
           
       </CCol>   
    </CRow>
 </div> 
}

export default HrRights
