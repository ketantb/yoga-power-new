import React, { useEffect,useState } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormSelect,
    CButton,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CModal,
    CModalHeader,
    CModalFooter,
    CModalBody,
    CFormInput,
    CFormTextarea
} from '@coreui/react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import moment from 'moment/moment'
import { useAdminValidation } from '../Custom-hook/adminValidation'
import { Link } from 'react-router-dom'
import { BsPlusCircle} from 'react-icons/bs'

let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;

const CashReport = () => {
    const  [cashData,setCashData] = useState([])
    const url1 = useSelector((el)=>el.domainOfApi) 
    const pathVal = useAdminValidation()
    const [staffS,setStaffS] = useState('')
    const [visibleDataObj,setVisibleDataObj] = useState({
        visibale:false,
        selectedItem:{},
        itemType:"",
        id:'',
        bothId:''
    })
    const [depositorInfo,setDepositorInfo] = useState({
        nameOfDepositor:'',
        depositorContact:0,
    })


    const headers = {
        'Authorization': `Bearer ${token}`,
        'My-Custom-Header': 'foobar'
    };


    function togetCashData(type,data){
    const data2 = (data||[]).reverse().flatMap((el)=>{
          if(type==='Recipts'){
             return   el.Receipts.map((el2,i)=>{
                    delete el2._id
                 return ({
                          cashHandOverto:'',
                          totalCash:+el2.PaidAmount,
                          date:el2.NewSlipDate,
                          type,
                          clientName:el.MemberName,
                          id:el.MemberId,
                          clientId:el.clientId,
                          InvoiceNo:el.InvoiceNo +"RN"+(i+1),
                          counseller:el2.Counseller,
                          invoiceUniqId:el._id,
                          bothId:el2._id,
                          Receipts:el.Receipts
                    })})

          }else{
              return [{
                cashHandOverto:'',
                totalCash:el.paidAmount,
                date:el.createdAt,
                counseller:el.counseller,
                type,
                clientName:el.MemberName,
                clientId:el.clientId,
                InvoiceNo:el.InvoiceNo,
                id:el.MemberId,
                invoiceUniqId:el._id,
                bothId:el._id
          }] 
         }
    })

    return data2 
}
// const obj = {
//     id:123,
//     friends:[
//         {name:'allien',emails:[{email:'1111',using:'true'}]}
//     ]
// }

// // update
// ({_id:'123'},{'$set':{'friends.0.name':'hello'}})

    
    const getAllInvoiceData = async  ()=>{
    
        try{
        const response1 = await axios.get(`${url1}/invoice/${pathVal}`,{headers})

        if(response1.status===200){

            const response2 = response1.data.reverse().map((el)=>{
                const resiptsData =  el.Receipts.map((el2,i)=>{
                  if(el2?.Pay_Mode ==='Cash'){
                    return {el,no:i}
                  }   
                }).filter((el)=>el)
               return {...el,Receipts:resiptsData}
          })
               
               const ReciptsData =   togetCashData('Recipt',[...response2.filter((el)=>el?.Receipts[0])])
               const InvoiceData =  togetCashData('Invoice',response1.data.filter((el)=>el?.paymode ==='Cash'))  

               setCashData(ReciptsData.concat(InvoiceData))
        }

        }catch(error){
        console.log(error)
        }
        }
    
    const [staff, setStaff] = useState([])
       function getStaff() {
      axios.get(`${url1}/employeeform/${pathVal}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then((res) => {
            setStaff(res.data)
        })
        .catch((error) => {
            console.error(error)
        })
}
        useEffect(()=>{
            getAllInvoiceData()
            getStaff()
        },[])


        const saveCashReport = (e) =>{
             e.preventDefault()


            // const invoiceObj= visibleDataObj.selectedItem
            // let invoiceOBJtoSave = {}
            
            // if(visibleDataObj.itemType==='Recipt'){
            //     // const filterReipts = invoiceObj?.Receipts?.filter((el)=>el._id===el.visibleDataObj.bothId)

            //     // invoiceOBJtoSave ={...invoiceObj,Receipts:}
            // }
            
            
               
            // const headers = {
            //     'Authorization': `Bearer ${token}`,
            //     'My-Custom-Header': 'foobar'
            // };
            
            // axios.post(`${url1}/invoice/update/${visibleDataObj.id}`,invoiceOBJtoSave, {headers},)
            //     .then((resp) => {

            //         alert('Successfully save')
            //         getAllInvoiceData()

            //     })
            //     .catch((error) => {
            //         console.error(error)
            //     })
            
            
            
            }
  
            
        

    return (
        <CRow>
           
            <CCol lg={12} sm={12}>
                <CCard className='mb-3 border-top-success border-top-3'>
                    <CCardHeader>
                        <strong className="mt-2">Daily  Cash Reprt</strong>
                    </CCardHeader>
                    <CCardBody>
                     <CRow>
                     <CModal visible={visibleDataObj.visibale} 
                        onClose={() => setVisibleDataObj({
                            visibale:true,
                            selectedItem:{},
                            itemType:'',
                            id:'',
                            bothId:''
                         })}
                           >
                          <CModalHeader >
                             <h2> Cash deposite info</h2>
                          </CModalHeader>  
                          <CModalBody>
                              <form onSubmit={saveCashReport}>
                              <CCol>
                                <CFormInput
                                type='text'
                                label={'Depositor Name'}
                                value={depositorInfo.nameOfDepositor}
                                onChange={(e)=>{
                                  setDepositorInfo(prev=>({...prev,nameOfDepositor:e.target.value}))
                                }}
                                required
                                />
                                 <CFormInput
                                type='text'
                                label={'Depositor Contact'}
                                value={depositorInfo.depositorContact}
                                onChange={(e)=>{
                                  setDepositorInfo(prev=>({...prev,depositorContact:e.target.value}))
                                }}
                                required
                                />
                                <CFormTextarea
                                type='text'
                                label={'Discription'}
                                value={depositorInfo.depositorContact}
                                onChange={(e)=>{
                                  setDepositorInfo(prev=>({...prev,depositorContact:e.target.value}))
                                }}
                                required
                                />
                                 </CCol>

                                <CCol>
                                 <CButton type='submit' onClick={saveCashReport}>Save</CButton>
                               </CCol> 
                              </form>
                                       
                          </CModalBody>
                     </CModal>
                    </CRow>   
                    <CRow className='my-3'>
                        
                            <CCol lg={4} className='mb-2'>
                            <CFormSelect
                            value={staffS}
                            onChange={(e)=>setStaffS(e.target.value)}
                                                                                                                               
                            >
                            <option>Select By Staff</option>
                                {staff.filter((list) => 
                                 list.selected === 'Select').map((item, index) => (
                                    <option key={index}>{item.FullName}</option>
                                ))}

                            </CFormSelect>
                            </CCol>
                          
                        </CRow>
                        <CRow>
                            <CCol>
                            <CCol className=' mb-3'>
                            <CButton onClick={()=>{setStaffS('')}} >Clear Filter</CButton>
                            </CCol>
                            </CCol>
                        </CRow>
                        <CTable bordered style={{ borderColor: "#106103" }} responsive>
                            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }}>
                                <CTableRow>
                                    <CTableHeaderCell scope="col">Sr No</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">MemberId</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Invoice No</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Deposite</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Cash Collected By</CTableHeaderCell>
                                    <CTableHeaderCell scope='col'>Type                                    
                                    </CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Hand Over to</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Add</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {cashData.filter((el)=>{
                                    return el?.counseller?.includes(staffS)
                                }) .map((el,i)=>{
                                    return  <CTableRow className='text-center'>
                                    <CTableDataCell>{i+1}</CTableDataCell>
                                        <CTableDataCell>{moment(el.date).format('MM-DD-YYYY')}</CTableDataCell>
                                        <CTableDataCell>
                                            {
                                       <Link index={-1} style={{ textDecoration: 'none' }}
                                        to={`/clients/member-details/${el.id}/1`} >
                          {el.clientName}</Link>}</CTableDataCell>
                                        <CTableDataCell>{el.clientId}</CTableDataCell>
                                        <CTableDataCell>{el.InvoiceNo}</CTableDataCell>
                                        <CTableDataCell>{el.totalCash}</CTableDataCell>
                                        <CTableDataCell>{el.counseller}</CTableDataCell>
                                        <CTableDataCell className='text-center'>
                                            <CButton size='sm' color={el.type==='Recipt'?'success':'warning'}>
                                                {el.type}
                                            </CButton>                                           
                                        </CTableDataCell>
                                        <CTableDataCell>
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <BsPlusCircle onClick={()=>setVisibleDataObj({
                                               visibale:true,
                                               selectedItem:el,
                                               itemType:el.type,
                                               id:el.invoiceUniqId,
                                               bothId:el.bothId
                                            })}/>
                                        </CTableDataCell>
                                    </CTableRow>
                                })}                                                          
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default CashReport