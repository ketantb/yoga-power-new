import {
  CCol,
  CFormSwitch,
  CRow,    
} from '@coreui/react'
import { financeMasterRights } from '../../Rights/rightsValue/masterRightsValue'


const FInanceRights = ({masterFinance,setRightObject}) => {


    const handleRight = (val,parrent)=>{

        setRightObject(prev => {
     
            const  arr = prev.masterRights.masterFinance.items[parrent].rights
    
                 if(arr.includes(val)){
                     arr?.splice(arr?.indexOf(val),1)
                     return { ...prev }
                 }
              arr.push(val)
              return { ...prev }
             })
    }
    
    const toCheckRightVal = (val,parrent)=>{
    return masterFinance.items[parrent].rights.includes(val)
    }
  return <div >

  <CRow >
    <CCol>

         <h5 className='mb-4 p-0 d-flex ' > Finance <span className='mx-2'>
          <CFormSwitch  size="xl"
            checked={masterFinance.value}
           onChange={(e)=>setRightObject(prev=>{
            prev.masterRights.masterFinance.value=e.target.checked
             return {...prev}
           })}
          /></span>
        </h5>

     </CCol>        
  </CRow>
  
     <CRow className='mt-5' >  
         <CCol>

             <h5 className='mb-4 p-0 d-flex ' > Expenses Category Master <span className='mx-2'>
          <CFormSwitch  size="xl"
           checked={masterFinance.items.masterExpnessCategor.value}
           onChange={(e)=>setRightObject(prev=>{
            prev.masterRights.masterFinance.items.masterExpnessCategor.value=e.target.checked
             return {...prev}
           })}
          /></span>
        </h5>

             <CFormSwitch  size="xl" label="ADD Expenses Category"
             checked={toCheckRightVal(financeMasterRights.addExpensesCategory,'masterExpnessCategor')}
             onChange={()=>handleRight(financeMasterRights.addExpensesCategory,'masterExpnessCategor')} 
             />
             <CFormSwitch  size="xl" label="Delete Expenses Category" 
              checked={toCheckRightVal(financeMasterRights.deleteExpensesCategory,'masterExpnessCategor')}
              onChange={()=>handleRight(financeMasterRights.deleteExpensesCategory,'masterExpnessCategor')} 
             />
         </CCol>
         <CCol>

             <h5 className='mb-4 p-0 d-flex ' > Budgeting Master <span className='mx-2'>
          <CFormSwitch  size="xl"
            checked={masterFinance.items.masterBudgeting.value}
           onChange={(e)=>setRightObject(prev=>{
            prev.masterRights.masterFinance.items.masterBudgeting.value=e.target.checked
             return {...prev}
           })}
          /></span>
        </h5>

             <CFormSwitch  size="xl" label="ADD Budgeting Master" 
                checked={toCheckRightVal(financeMasterRights.addBudgetingMaster,'masterBudgeting')}
                onChange={()=>handleRight(financeMasterRights.addBudgetingMaster,'masterBudgeting')} 
             />
             <CFormSwitch  size="xl" label="Delete Budgeting Master" 
                 checked={toCheckRightVal(financeMasterRights.deleteBudgetingMaster,'masterBudgeting')}
                 onChange={()=>handleRight(financeMasterRights.deleteBudgetingMaster,'masterBudgeting')} 
             />
         </CCol>
         <CCol>

             <h5 className='mb-4 p-0 d-flex ' > Invoice Setup Master <span className='mx-2'>
          <CFormSwitch  size="xl"
            checked={masterFinance.items.masterInvoiceSetupMaster.value}
           onChange={(e)=>setRightObject(prev=>{
            prev.masterRights.masterFinance.items.masterInvoiceSetupMaster.value=e.target.checked
             return {...prev}
           })}
          /></span>
        </h5>

            
             <CFormSwitch  size="xl" label="ADD Invoice "
                checked={toCheckRightVal(financeMasterRights.addInvoice,'masterInvoiceSetupMaster')}
                onChange={()=>handleRight(financeMasterRights.addInvoice,'masterInvoiceSetupMaster')}
             />
             <CFormSwitch  size="xl" label="Delete Invoice "
                checked={toCheckRightVal(financeMasterRights.deleteInvoice,'masterInvoiceSetupMaster')}
                onChange={()=>handleRight(financeMasterRights.deleteInvoice,'masterInvoiceSetupMaster')}
             />
         </CCol>
      </CRow>    
      <CRow className='mt-5' >  
         <CCol>
             <h5 className='mb-4 p-0 d-flex ' > Tax Setup Master <span className='mx-2'>
          <CFormSwitch  size="xl"
            checked={masterFinance.items.masterTaxSetupMaster.value}
           onChange={(e)=>setRightObject(prev=>{
            prev.masterRights.masterFinance.items.masterTaxSetupMaster.value=e.target.checked
             return {...prev}
           })}
          /></span>
        </h5>

             <CFormSwitch  size="xl" label="ADD Tax"
                    checked={toCheckRightVal(financeMasterRights.adddTax,'masterTaxSetupMaster')}
                    onChange={()=>handleRight(financeMasterRights.adddTax,'masterTaxSetupMaster')}
             />
             <CFormSwitch  size="xl" label="Delete Tax" 
                    checked={toCheckRightVal(financeMasterRights.deleteTax,'masterTaxSetupMaster')}
                    onChange={()=>handleRight(financeMasterRights.deleteTax,'masterTaxSetupMaster')}
             />
         </CCol>
      </CRow>

   </div>
}

export default FInanceRights
