import {
    CCol,
    CFormSwitch,
    CRow,
    CTabPane,
} from '@coreui/react'


import { financeRight } from '../Rights/rightsValue/erpRightsValue'



function FinanceRights({erpFinance,setRightObject}){

  // to Handle Third Lavel nav Rights 

  function thirdLavleRightFun(parent,grandParent){
    setRightObject(prev => {
        const childProperty  =  prev.erpRights.erpFinance.items[grandParent].items[parent]
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
        const  arr = prev.erpRights.erpFinance.items[grandParent].items[parent].rights
        if(arr.includes(val)){
            arr?.splice(arr?.indexOf(val),1)
            return { ...prev }
        }
     arr.push(val)
     return { ...prev }
    })
  }


const toCheckRightVal = (parent,grandParent,val)=>{
    return erpFinance.items[grandParent].items[parent].rights.includes(val)
}

    
    return <div>
        
<CRow >
<CCol sm={12} > 
<h4 className='mb-4   d-flex ' >Finance <span className='mx-2'><CFormSwitch size="lg"
checked={erpFinance.value}
    onChange={(e) => setRightObject(prev => {
        prev.erpRights.erpFinance.value = e.target.checked
        return { ...prev }
    })}
/></span></h4>
</CCol>


<CCol sm={12}  className='mb-3' > 
<h5 className='d-flex ' >Invoices <span className='mx-2'><CFormSwitch size="lg"
checked={erpFinance.items.erpInvoices.value}
onChange={(e) => setRightObject(prev => {
    prev.erpRights.erpFinance.items.erpInvoices.value = e.target.checked
    return { ...prev }
})}
/></span></h5>
</CCol>


   <CCol>
       <h5 className='mb-4 d-flex ' >
       Total Invoice <span className='mx-2'><CFormSwitch size="lg"
       checked={erpFinance.items.erpInvoices.items.erpTotalInvoice.value}
       onChange={(e)=>thirdLavleRightFun('erpTotalInvoice','erpInvoices')}
       /></span></h5>
       <CFormSwitch size="xl" label="Delete Invoice" 
       checked={toCheckRightVal('erpTotalInvoice','erpInvoices',financeRight.deleteTotalInvoice)}
       onChange={()=>{handleSubRights('erpTotalInvoice','erpInvoices',financeRight.deleteTotalInvoice)}}
       />
       <CFormSwitch size="xl" label="View Invoice" 
       checked={toCheckRightVal('erpTotalInvoice','erpInvoices',financeRight.viewTotalInvoice)}
       onChange={()=>{handleSubRights('erpTotalInvoice','erpInvoices',financeRight.viewTotalInvoice)}}
       />
       <CFormSwitch size="xl" label="Status" 
       checked={toCheckRightVal('erpTotalInvoice','erpInvoices',financeRight.totalStatus)}
       onChange={()=>{handleSubRights('erpTotalInvoice','erpInvoices',financeRight.totalStatus)}}
       />
       <CFormSwitch size="xl" label="Profile" 
       checked={toCheckRightVal('erpTotalInvoice','erpInvoices',financeRight.viewTotalInvoiceProfile)}
       onChange={()=>{handleSubRights('erpTotalInvoice','erpInvoices',financeRight.viewTotalInvoiceProfile)}}
       />
   </CCol>
   <CCol>
       <h5 className='mb-4 d-flex ' >
       Paid Invoice <span className='mx-2'><CFormSwitch size="lg"
          checked={erpFinance.items.erpInvoices.items.erpPaidInvoice.value}
          onChange={(e)=>thirdLavleRightFun('erpPaidInvoice','erpInvoices')}
       /></span></h5>
       <CFormSwitch size="xl" label="Delete Paid Invoice " 
        checked={toCheckRightVal('erpPaidInvoice','erpInvoices',financeRight.deletePaidInvoice)}
        onChange={()=>{handleSubRights('erpPaidInvoice','erpInvoices',financeRight.deletePaidInvoice)}}/>

       <CFormSwitch size="xl" label="view Invoice"
        checked={toCheckRightVal('erpPaidInvoice','erpInvoices',financeRight.viewPaidInvoice)}
        onChange={()=>{handleSubRights('erpPaidInvoice','erpInvoices',financeRight.viewPaidInvoice)}}
       />

   </CCol>
   <CCol>
       <h5 className='mb-4 p-2 d-flex '>Balance Payment <span className='mx-2'><CFormSwitch size="lg"
               checked={erpFinance.items.erpInvoices.items.erpBalancePayment.value}
               onChange={(e)=>thirdLavleRightFun('erpBalancePayment','erpInvoices')}
       /></span></h5>
      
       <CFormSwitch size="xl" label="Add" 
        checked={toCheckRightVal('erpBalancePayment','erpInvoices',financeRight.addBalancePayment)}
        onChange={()=>{handleSubRights('erpBalancePayment','erpInvoices',financeRight.addBalancePayment)}}
       />
       <CFormSwitch size="xl" label="View Invoice" 
        checked={toCheckRightVal('erpBalancePayment','erpInvoices',financeRight.viewBalanceInvoice)}
        onChange={()=>{handleSubRights('erpBalancePayment','erpInvoices',financeRight.viewBalanceInvoice)}}
       />
      
   </CCol>

 
</CRow>

<CRow className='my-5' >
   
   <CCol>
       <h5 className='mb-4 p-2 d-flex ' >
       Receipt <span className='mx-2'><CFormSwitch size="lg"
           checked={erpFinance.items.erpInvoices.items.erpReceipts.value}
           onChange={(e)=>thirdLavleRightFun('erpReceipts','erpInvoices')}
       /></span></h5>

       <CFormSwitch size="xl" label="Print Invoice" 
         checked={toCheckRightVal('erpReceipts','erpInvoices',financeRight.printReceiptInvoice)}
         onChange={()=>{handleSubRights('erpReceipts','erpInvoices',financeRight.printReceiptInvoice)}}
       />
       <CFormSwitch size="xl" label="Print Receipt"
         checked={toCheckRightVal('erpReceipts','erpInvoices',financeRight.printReceiptReceipt)}
         onChange={()=>{handleSubRights('erpReceipts','erpInvoices',financeRight.printReceiptReceipt)}}
       />
   </CCol>
   <CCol>
       <h5 className='mb-4 p-2 d-flex ' >
       Cancelled Invoice <span className='mx-2'><CFormSwitch size="lg"
       checked={erpFinance.items.erpInvoices.items.erpCancelledInvoice.value}
       onChange={(e)=>thirdLavleRightFun('erpCancelledInvoice','erpInvoices')}
       /></span></h5>
       <CFormSwitch size="xl" label="view  Invoice"
        checked={toCheckRightVal('erpCancelledInvoice','erpInvoices',financeRight.viewCancelInvoice)}
        onChange={()=>{handleSubRights('erpCancelledInvoice','erpInvoices',financeRight.viewCancelInvoice)}}
       />
       <CFormSwitch size="xl" label="view Status" 
        checked={toCheckRightVal('erpCancelledInvoice','erpInvoices',financeRight.statusCancelInvoice)}
        onChange={()=>{handleSubRights('erpCancelledInvoice','erpInvoices',financeRight.statusCancelInvoice)}}
       />
       <CFormSwitch size="xl" label="Delete Invoice" 
       checked={toCheckRightVal('erpCancelledInvoice','erpInvoices',financeRight.deleteCancelledInvoice)}
       onChange={()=>{handleSubRights('erpCancelledInvoice','erpInvoices',financeRight.deleteCancelledInvoice)}}
       />
     

   </CCol>
   <CCol>
       <h5 className='mb-4 p-2 d-flex ' >
       Comments of written off Invoice <span className='mx-2'><CFormSwitch size="lg"
           checked={erpFinance.items.erpInvoices.items.erpCommentsOfWrittenOffInvoice.value}
           onChange={(e)=>thirdLavleRightFun('erpCommentsOfWrittenOffInvoice','erpInvoices')}
       /></span></h5>
   </CCol>
 
</CRow>



<CRow className='my-4'>

<CCol sm={12}  className='mb-3' > 
<h5 className='d-flex ' >Revenues <span className='mx-2'><CFormSwitch size="lg"
checked={erpFinance.items.erpRevenues.value}
onChange={(e) => setRightObject(prev => {
    prev.erpRights.erpFinance.items.erpRevenues.value = e.target.checked
    return { ...prev }
})}
/></span></h5>
</CCol>

    <CCol>
       <h5 className='d-flex'>Revenue FY Details<span className='mx-2'><CFormSwitch size="lg"
       checked={erpFinance.items.erpRevenues.items.erpRevenueDetails.value}
       onChange={(e)=>thirdLavleRightFun('erpRevenueDetails','erpRevenues')}
       /></span></h5>
   </CCol>
   <CCol>
       <h5 className='d-flex'>Revenue Service Wise<span className='mx-2'><CFormSwitch size="lg"
          checked={erpFinance.items.erpRevenues.items.erpServicesWiseRevenue.value}
          onChange={(e)=>thirdLavleRightFun('erpServicesWiseRevenue','erpRevenues')}
       /></span></h5>
   </CCol>
   <CCol>
       <h5 className='d-flex'>Renewals Revenue<span className='mx-2'><CFormSwitch size="lg"
            checked={erpFinance.items.erpRevenues.items.erpRenewalsRevenue.value}
            onChange={(e)=>thirdLavleRightFun('erpRenewalsRevenue','erpRevenues')}
       /></span></h5>
   </CCol>

</CRow>


<CRow >

    <CCol>
       <h5 className='d-flex'>Revenue New Client<span className='mx-2'><CFormSwitch size="lg"
        checked={erpFinance.items.erpRevenues.items.erpNewClientRevenue.value}
        onChange={(e)=>thirdLavleRightFun('erpNewClientRevenue','erpRevenues')}
       /></span></h5>
   </CCol>
   <CCol>
       <h5 className='d-flex'>Revenue Lead Report <span className='mx-2'><CFormSwitch size="lg"
        checked={erpFinance.items.erpRevenues.items.erpLeadReport.value}
        onChange={(e)=>thirdLavleRightFun('erpLeadReport','erpRevenues')}
       /></span></h5>

   </CCol>
   <CCol>
       <h5 className='d-flex'>Revenue FY Report<span className='mx-2'><CFormSwitch size="lg"
          checked={erpFinance.items.erpRevenues.items.erpRevenueReport.value}
          onChange={(e)=>thirdLavleRightFun('erpRevenueReport','erpRevenues')}
       /></span></h5>
   </CCol>

</CRow>

<CRow className='mt-5'>

    <CCol sm={12}  className='mb-3' > 
     <h5 className='d-flex ' > Collection Report<span className='mx-2'><CFormSwitch size="lg"
     checked={erpFinance.items.erpCollectionReport.value}
     onChange={(e) => setRightObject(prev => {
         prev.erpRights.erpFinance.items.erpCollectionReport.value = e.target.checked
         return { ...prev }
     })}
     /></span></h5>
   </CCol>

    <CCol>
       <h5 className='d-flex'>Total Collection<span className='mx-2'><CFormSwitch size="lg"
        checked={erpFinance.items.erpCollectionReport.items.erpTotalCollection.value}
        onChange={(e)=>thirdLavleRightFun('erpTotalCollection','erpCollectionReport')}
       /></span></h5>
   </CCol>
   <CCol>
       <h5 className='d-flex'>Payment Mode<span className='mx-2'><CFormSwitch size="lg"
       checked={erpFinance.items.erpCollectionReport.items.erpPaymentMode.value}
       onChange={(e)=>thirdLavleRightFun('erpPaymentMode','erpCollectionReport')}
       /></span></h5>
   </CCol>
   <CCol>
       <h5 className='d-flex'>Cash Report<span className='mx-2'><CFormSwitch size="lg"
       checked={erpFinance.items.erpCollectionReport.items.erpCashReport.value}
       onChange={(e)=>thirdLavleRightFun('erpCashReport','erpCollectionReport')}
       /></span></h5>
   </CCol>

</CRow>
<CRow className='mt-2 mb-5'>
     <CCol>
     <h5 className='d-flex'>Cheque Report<span className='mx-2'><CFormSwitch size="lg"
       checked={erpFinance.items.erpCollectionReport.items.erpChequeReport.value}
       onChange={(e)=>thirdLavleRightFun('erpChequeReport','erpCollectionReport')}
       /></span></h5>
    </CCol>
</CRow>



<CRow className='my-5'>

   <CCol sm={12}  className='mb-3' > 
     <h5 className='d-flex ' > Expense<span className='mx-2'><CFormSwitch size="lg"
       checked={erpFinance.items.erpExpense.value}
       onChange={(e) => setRightObject(prev => {
        prev.erpRights.erpFinance.items.erpExpense.value = e.target.checked
        return { ...prev }
      })}  
     /></span></h5>
   </CCol>

    <CCol>
       <h5 className='d-flex ' > Center Expense <span className='mx-2'><CFormSwitch size="lg"
       checked={erpFinance.items.erpExpense.items.erpCenterExpense.value}
       onChange={(e)=>thirdLavleRightFun('erpCenterExpense','erpExpense')}
       /></span></h5>
    </CCol>
   <CCol>
       <h5 className='d-flex ' > Daily Expense <span className='mx-2'><CFormSwitch size="lg"
         checked={erpFinance.items.erpExpense.items.erpDailyExpense.value}
         onChange={(e)=>thirdLavleRightFun('erpDailyExpense','erpExpense')}
       /></span></h5>
       <CFormSwitch size="xl" label="Status"
         checked={toCheckRightVal('erpDailyExpense','erpExpense',financeRight.dailyExpenseStatus)}
         onChange={()=>{handleSubRights('erpDailyExpense','erpExpense',financeRight.dailyExpenseStatus)}} 
       />
       <CFormSwitch size="xl" label="Delete Daily Expense" 
         checked={toCheckRightVal('erpDailyExpense','erpExpense',financeRight.deleteDailyExpense)}
         onChange={()=>{handleSubRights('erpDailyExpense','erpExpense',financeRight.deleteDailyExpense)}} 
       />
        <CFormSwitch size="xl" label="Daily Expense Form" 
         checked={toCheckRightVal('erpDailyExpense','erpExpense',financeRight.expenseForm)}
         onChange={()=>{handleSubRights('erpDailyExpense','erpExpense',financeRight.expenseForm)}} 
       />
   </CCol>
   <CCol>
       <h5 className='d-flex ' > Petty Cash <span className='mx-2'><CFormSwitch size="lg"
        checked={erpFinance.items.erpExpense.items.erpPettyCash.value}
        onChange={(e)=>thirdLavleRightFun('erpPettyCash','erpExpense')}
       /></span></h5>
       <CFormSwitch size="xl" label="Add Petty Cash" 
           checked={toCheckRightVal('erpPettyCash','erpExpense',financeRight.addPettyCash)}
           onChange={()=>{handleSubRights('erpPettyCash','erpExpense',financeRight.addPettyCash)}} 
       />
       <CFormSwitch size="xl" label="Delete Petty Cash" 
                 checked={toCheckRightVal('erpPettyCash','erpExpense',financeRight.deletePettyCash)}
                 onChange={()=>{handleSubRights('erpPettyCash','erpExpense',financeRight.deletePettyCash)}} 
       />
   </CCol>

</CRow>

<CRow className='my-4'>    

   <CCol sm={12}  className='mb-3' > 
     <h5 className='d-flex ' > Salles<span className='mx-2'><CFormSwitch size="lg"
      checked={erpFinance.items.erpSales.value}
      onChange={(e) => setRightObject(prev => {
      prev.erpRights.erpFinance.items.erpSales.value = e.target.checked
     return { ...prev }})}  
     /></span></h5>
   </CCol>

    <CCol>
       <h5 className='d-flex ' > DSR report<span className='mx-2'><CFormSwitch size="lg"
        checked={erpFinance.items.erpSales.items.erpDsrReport.value}
        onChange={(e)=>thirdLavleRightFun('erpDsrReport','erpSales')}
       /></span></h5>
   </CCol>
   <CCol>
       <h5 className='d-flex ' > Target vs Achievment<span className='mx-2'><CFormSwitch size="lg"
        checked={erpFinance.items.erpSales.items.erpTargetVsAchievment.value}
        onChange={(e)=>thirdLavleRightFun('erpTargetVsAchievment','erpSales')}
       /></span></h5>
   </CCol>
   <CCol>
    
   </CCol>

</CRow>




</div>





}

export default FinanceRights