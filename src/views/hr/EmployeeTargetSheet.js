import {CCard,CCardTitle,CCardHeader,CTable,CTableHead,
    CTableHeaderCell,CTableBody,CTableRow,CTableDataCell, 
    CButton,CCol,CPagination,CPaginationItem, CFormSelect,CRow}from '@coreui/react'
import React,{useState,useEffect} from 'react'   
import YogaSpinnar from '../theme/YogaSpinnar';
import {MdDelete} from 'react-icons/md';
import { useSelector } from 'react-redux'
import axios from 'axios'
import { hrManagement } from './Rights/rightsValue/erpRightsValue';
import { useAdminValidation } from '../Custom-hook/adminValidation';
const  EmployeeTargetSetupForm =  React.lazy(()=>import('./EmployeeTargetSetupForm'))
  
function EmployeeTargetSheet(){
  const url1 = useSelector((el)=>el.domainOfApi) 
  const pathVal = useAdminValidation('Master')
  const [activeForm,setActiveForm] = useState(false)
  const [employeeTargetSheeTdata,setEmployeeTargetSeetData] = useState([])
  const [paging, setPaging] = useState(0);
  const [searchFilter,setSearchFilter] = useState({
    search1:'',
    search2:'',
    search3:''
  })
  const [filterData,setFilterData] = useState({
    staffData:[],
    typeTargetDtata:[],
    yearData:[]
  })


  const rightsData = useSelector((el)=>el?.empLoyeeRights?.erpRights?.erpHrManagement
  ?.items?.erpHrTargetSheet?.items?.erpTargetSheet?.rights) 

  const access = rightsData?rightsData:[]
  const isAdmin = useSelector((el)=>el.isAdmin)
                                       
  const  addEmpTargetSheet = (access.includes(hrManagement.addEmpTargetSheet)||isAdmin)
  const  deleteEmpTargetSheet = (access.includes(hrManagement.deleteEmpTargetSheet)||isAdmin)


  let user = JSON.parse(localStorage.getItem('user-info'))
  const token = user.token;

  const headers = {
    headers: {
        "Authorization": `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
}

const closeForm  = ()=>{
    setActiveForm(false)
  }

useEffect(()=>{
    getEmployeeTargetSheetData()
},[])


async function getEmployeeTargetSheetData(){  
try{  
const {data} = await  axios.get(`${url1}/employeeTargetSheet/${pathVal}`,headers);

const filterData = data.reduce((crr,el)=>{
  if(!crr.staffData.includes(el.Employee.toLowerCase())){
    crr.staffData.push(el.Employee.toLowerCase())
  }
  if(!crr.typeTargetDtata.includes(el.Type_Of_Target.toLowerCase())){
    crr.typeTargetDtata.push(el.Type_Of_Target.toLowerCase())
  }
  if(!crr.yearData.includes((""+el.Year).toLowerCase())){
    crr.yearData.push((""+el.Year).toLowerCase())
  }
  return crr
}
,{
  staffData:[],
  typeTargetDtata:[],
  yearData:[]
})


setFilterData(filterData)
setEmployeeTargetSeetData(data.reverse())
}catch(error){
  console.error(error)
 }
}

let id1 = ''

const DeleteParentApiData = async ()=>{
  console.log(`${url1}/employeeTargetSheet/delete/${id1}`,headers)

  await axios.delete(`${url1}/employeeTargetSheet/delete/${id1}`,headers).then(()=>{
    getEmployeeTargetSheetData()
  })


}

  const TargetDataDelete = async (id,url)=>{
    const response1 = axios.get(`${url}/all`,headers)     


    response1.then(({data})=>{
      const Data2 = [...data].find((el)=>el.Sr_No===id)
      if(Data2===undefined){
        DeleteParentApiData() 
        return 
      }
     
      console.log(Data2._id)

     if([...data].find((el)=>el.Sr_No===id)){
      async function  Delete (){
          const d = axios.delete(`${url}/delete/${Data2._id}`,headers)
          d.then((res)=>{
            DeleteParentApiData()
          }).catch((error)=>{
            alert('Network Error')
          })   
        }
      Delete()
     }
    })
  }

async function deleteEmployeeData (id,TypeOfTarget,EmployeeId){
id1 = id
try{
if(TypeOfTarget==="Sales Target"){TargetDataDelete(EmployeeId,`${url1}/salesTarget`)}
if(TypeOfTarget==="Client Target"){TargetDataDelete(EmployeeId,`${url1}/clientTarget`)}
if(TypeOfTarget==='Calls Target'){TargetDataDelete(EmployeeId,`${url1}/callsTarget`)}
if(TypeOfTarget==='Lead Target'){TargetDataDelete(EmployeeId,`${url1}/leadsTarget`)}
if(TypeOfTarget==='Renewals'){TargetDataDelete(EmployeeId,`${url1}/renewalsTarget`)}
if(TypeOfTarget==='Referral Leads'){TargetDataDelete(EmployeeId,`${url1}/referralsLeadstarget`)}
if(TypeOfTarget==='Media Target'){TargetDataDelete(EmployeeId,`${url1}/mediaTarget`)}
  getEmployeeTargetSheetData()
}catch(error){
   console.error(error)
}

}


function tofilterData(data){

  return data.filter((el)=>{
    return ((el.Employee.toLowerCase()||'').includes(searchFilter.search1))&&
    ((el.Type_Of_Target.toLowerCase()||'').includes(searchFilter.search2))&&
    ((el.Year.toLowerCase()||'').includes(searchFilter.search3))
   })
}

return <CCard>
     <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
         <CCardTitle className='p-2'>
            <h4>Empyolee Target Sheet</h4></CCardTitle>
     </CCardHeader>

     <div className='p-4' style={{display:((addEmpTargetSheet)?'':'none')}}>
     <CCol className='pb-4 mt-3  d-flex justify-content-end ' >
  {activeForm ||<CButton onClick={()=>setActiveForm((value)=>!value)} >Add New</CButton>}
  </CCol>
  {activeForm && <EmployeeTargetSetupForm closeForm={closeForm} getEmployeeTargetSheetData={getEmployeeTargetSheetData} data={employeeTargetSheeTdata}/>}

  </div>   


   <div style={{overflowX:'scroll',boxSizing:'border-box'}} className='mx-4'>
    <CRow>
      <CCol lg={3} md={4} >
        <CFormSelect
        label='Filter by staff'
        value={searchFilter.search1}
        onChange={(e)=>setSearchFilter((prev)=>({...prev,search1:e.target.value}))}
        >
          <option value={""}>Select by staff</option>
          {filterData.staffData.map((el)=>
                    <option value={el}>{el}</option>
          )}
        </CFormSelect>
      </CCol>
      <CCol lg={3} md={4} >
        <CFormSelect
        label='Filter by target type'
        value={searchFilter.search2}
        onChange={(e)=>setSearchFilter((prev)=>({...prev,search2:e.target.value}))}
        >
          <option value={""}>Select by target type</option>
          {filterData.typeTargetDtata.map((el)=>
                    <option value={el}>{el}</option>
          )}
        </CFormSelect>
      </CCol>
      <CCol lg={3} md={4} >
        <CFormSelect
        label='Filter by year'
        value={searchFilter.search3}
        onChange={(e)=>setSearchFilter((prev)=>({...prev,search3:e.target.value}))}
        >
          <option value={""}>Select by year</option>
          {filterData.yearData.map((el)=>
                    <option value={el}>{el}</option>
          )}
        </CFormSelect>
      </CCol>
      <CCol xs={12} className='mt-2'>
        <CButton onClick={()=>{
          setSearchFilter({
            search1:'',
            search2:'',
            search3:''
          })
        }}>Clear Filter</CButton>
      </CCol>
    </CRow>

     <CTable style={{width:'180%'}} className='mt-3'>
          <CTableHead >
             <CTableHeaderCell className='p-3'>Sr No</CTableHeaderCell>
             <CTableHeaderCell className='p-3'>Emp</CTableHeaderCell>
             <CTableHeaderCell className='p-3'>Types Of Target</CTableHeaderCell>
             <CTableHeaderCell className='p-3'>Year</CTableHeaderCell>
             <CTableHeaderCell className='p-3'>Jan</CTableHeaderCell>
             <CTableHeaderCell className='p-3'>Feb</CTableHeaderCell>
             <CTableHeaderCell className='p-3'>March</CTableHeaderCell>
             <CTableHeaderCell className='p-3'>April</CTableHeaderCell>
             <CTableHeaderCell className='p-3'>May</CTableHeaderCell>
             <CTableHeaderCell className='p-3'>Jun</CTableHeaderCell>
             <CTableHeaderCell className='p-3'>July</CTableHeaderCell>
             <CTableHeaderCell className='p-3'>August</CTableHeaderCell>
             <CTableHeaderCell className='p-3'>Sep</CTableHeaderCell>
             <CTableHeaderCell className='p-3'>Oct</CTableHeaderCell>
             <CTableHeaderCell className='p-3'>Nov</CTableHeaderCell>
             <CTableHeaderCell className='p-3'>Dec</CTableHeaderCell>
             <CTableHeaderCell className='p-3' style={{display:((deleteEmpTargetSheet)?'':'none')}}>Delete</CTableHeaderCell>
          </CTableHead>
          <CTableRow>
            
          </CTableRow>
          
          <CTableBody>
            {tofilterData(employeeTargetSheeTdata).slice(paging * 10, paging * 10 + 10).map((el,i)=>
             <CTableRow key={i}>
             <CTableDataCell>{i + 1 + (paging * 10)}</CTableDataCell>
             <CTableDataCell>{el.Employee}</CTableDataCell>
             <CTableDataCell>{el.Type_Of_Target}</CTableDataCell>
             <CTableDataCell>{el.Year}</CTableDataCell>
             <CTableDataCell>{el.Jan}</CTableDataCell>
             <CTableDataCell>{el.Feb}</CTableDataCell>
             <CTableDataCell>{el.March}</CTableDataCell>
             <CTableDataCell>{el.April}</CTableDataCell>
             <CTableDataCell>{el.May}</CTableDataCell>
             <CTableDataCell>{el.June}</CTableDataCell>
             <CTableDataCell>{el.July}</CTableDataCell>
             <CTableDataCell>{el.August}</CTableDataCell>
             <CTableDataCell>{el.Sept}</CTableDataCell>
             <CTableDataCell>{el.Oct}</CTableDataCell>
             <CTableDataCell>{el.Nov}</CTableDataCell>
             <CTableDataCell>{el.Dec}</CTableDataCell>
             <CTableDataCell style={{display:((deleteEmpTargetSheet)?'':'none')}} >
              <MdDelete style={{ cursor: 'pointer', markerStart: '10px', marginLeft: "40%" }} 
                onClick={() => deleteEmployeeData(el._id,el.Type_Of_Target,el.Id)} size='20px' />
              </CTableDataCell>
           </CTableRow>
            
            )}

          </CTableBody>
     </CTable>
     {!employeeTargetSheeTdata[0] ?
                                <CCol style={{ width: '100%' }} className='d-flex justify-content-center my-3'>
                                    <YogaSpinnar />
                         </CCol> : ''}
     </div>
     <CPagination aria-label="Page navigation example" align="center" className='mt-2'>
                        <CPaginationItem aria-label="Previous" disabled={paging != 0 ? false : true} onClick={() => paging > 0 && setPaging(paging - 1)}>
                            <span aria-hidden="true">&laquo;</span>
                        </CPaginationItem>
                        <CPaginationItem active onClick={() => setPaging(0)}>{paging + 1}</CPaginationItem>
                        {tofilterData(employeeTargetSheeTdata).length > (paging + 1) * 10 && <CPaginationItem onClick={() => setPaging(paging + 1)} >{paging + 2}</CPaginationItem>}
                        {tofilterData(employeeTargetSheeTdata).length > (paging + 2) * 10 && <CPaginationItem onClick={() => setPaging(paging + 2)}>{paging + 3}</CPaginationItem>}
                        {tofilterData(employeeTargetSheeTdata).length > (paging + 1) * 10 ?
                            <CPaginationItem aria-label="Next" onClick={() => setPaging(paging + 1)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                            : <CPaginationItem disabled aria-label="Next" onClick={() => setPaging(paging + 1)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                        }
                    </CPagination>

</CCard>

}


export default EmployeeTargetSheet