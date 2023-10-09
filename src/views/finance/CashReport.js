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
    CFormTextarea,
    CPagination,
    CPaginationItem
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
    const [paging, setPaging] = useState(0);
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
        discription:'',
    })


    const headers = {
        'Authorization': `Bearer ${token}`,
        'My-Custom-Header': 'foobar',
        'Content-Type': 'application/json',
    };


  


    
    const getAllInvoiceData = async  ()=>{
    
        try{
        const response1 = await axios.get(`${url1}/invoice/daily-cash-report`,{headers})
          console.log(response1)
        if(response1.status===200){
               setCashData(response1.data)
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
            // console.log(res.data)
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


        const updateCashReport = (e) =>{
            e.preventDefault()
  
        
             if(visibleDataObj.itemType!=='Invoice'){
                visibleDataObj.bothId ==="6520f8a30ab2190d2e096d23"

               const reciptsData= visibleDataObj.selectedItem.Receipts.map((el)=>{
                    if(el._id===visibleDataObj.bothId){
                        return {...el,...depositorInfo}         
                    }
                    return el
                }) 


                axios.post(`${url1}/invoice/update/${visibleDataObj.id}`,{Receipts:reciptsData}, {headers},)
                .then((resp) => {
                  console.log(resp) 
                    alert('Successfully save')
                   
                })
                .catch((error) => {
                    console.error(error)
                })

             }else{
                axios.post(`${url1}/invoice/update/${visibleDataObj.id}`,obj, {headers},)
                .then((resp) => {
                  console.log(resp) 
                    alert('Successfully save')
                   
                })
                .catch((error) => {
                    console.error(error)
                })
             } 
            
            }
            
     function toFilterData(data){
       return data.filter((el)=>{
        return el?.counseller?.includes(staffS)
    })
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
                            visibale:false,
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
                              <form onSubmit={updateCashReport}>
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
                                value={depositorInfo.discription}
                                onChange={(e)=>{
                                  setDepositorInfo(prev=>({...prev,discription:e.target.value}))
                                }}
                                required
                                />
                                 </CCol>

                                <CCol className='mt-2'>
                                 <CButton type='submit'>Save</CButton>
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
                                {toFilterData(cashData).slice(paging * 10, paging * 10 + 10).map((el,i)=>{
                                    return  <CTableRow className='text-center' key={i}>
                                    <CTableDataCell>{i + 1 + (paging * 10)}</CTableDataCell>
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
                                            <CButton size='sm' color={el.type==='Invoice'?'success':'warning'} className='cursor-pointer'>
                                                {el.type}
                                            </CButton>                                           
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            {el.nameOfDepositor}
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <BsPlusCircle className='cursor-pointer' onClick={()=>setVisibleDataObj({
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
                        
                        <div className='d-flex justify-content-center mt-3' >
                        <CPagination aria-label="Page navigation example" align="center" className='mt-2'>
                        <CPaginationItem style={{ cursor: 'pointer' }} aria-label="Previous" disabled={paging != 0 ? false : true}
                            onClick={() => paging > 0 && setPaging(paging - 1)}>
                            <span aria-hidden="true">&laquo;</span>
                        </CPaginationItem>
                        <CPaginationItem style={{ cursor: 'pointer' }} active onClick={() => setPaging(0)}>{paging + 1}</CPaginationItem>
                        {toFilterData(cashData).length > (paging + 1) * 10 && <CPaginationItem style={{ cursor: 'pointer' }}
                            onClick={() => setPaging(paging + 1)} >{paging + 2}</CPaginationItem>}

                        {toFilterData(cashData).length > (paging + 2) * 10 && <CPaginationItem style={{ cursor: 'pointer' }}
                            onClick={() => setPaging(paging + 2)}>{paging + 3}</CPaginationItem>}
                        {toFilterData(cashData).length > (paging + 1) * 10 ?
                            <CPaginationItem aria-label="Next" style={{ cursor: 'pointer' }} onClick={() => setPaging(paging + 1)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                            : <CPaginationItem disabled aria-label="Next" style={{ cursor: 'pointer' }} onClick={() => setPaging(paging + 1)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                        }
                    </CPagination>
      </div>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default CashReport