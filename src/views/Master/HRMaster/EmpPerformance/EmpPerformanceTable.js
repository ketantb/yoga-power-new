import React, { useEffect, useState } from 'react'
import {
    CFormInput,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,    
    CPagination,
    CPaginationItem,
} from '@coreui/react'
import EmPerformanceForm from './EmPerformanceForm'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useAdminValidation } from 'src/views/Custom-hook/adminValidation';


let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;

const headers = {
    "Authorization": `Bearer ${token}`,
   }


const EmpPerformanceTable = ({staff,addEmpPrformanse,deleteEmpPrformanse,editEmpPrformanse}) => {



    const [updateActive,setUpdateActive] = useState({visible:false,obj:{}})
    const [employeePerformance,setEmployeePerformance] = useState([])
    const url = useSelector((el) => el.domainOfApi)
    const pathVal =  useAdminValidation('Master')
    const [searchFilter,setSearchFilter] = useState({
        search1:'',
        search2:'',
        search3:'',
        search4:'',
        search5:'',
        search6:'',
        search7:'',
        search8:'',
        search9:'',
    })
    const [paging, setPaging] = useState(0);


    useEffect(()=>{
        getEmpPerformance()
      },[])
      
      

    function getEmpPerformance(){
        axios.get(`${url}/employeePerformance/${pathVal}`, {headers})
        .then((res) => {
          setEmployeePerformance(res.data.reverse())
        }).catch((error) => {console.error(error)})
      }
      
      function deleteSalarySheet(id) {
        if (confirm('Do you want to delete this')) {
            fetch(`${url}/employeePerformance/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then((result) => {
                result.json().then((resp) => {
                    getEmpPerformance()
                })
            })
        }
      }
    //   <CTableDataCell>{el.name}</CTableDataCell>
    //   <CTableDataCell>{el.empId}</CTableDataCell>
    //   <CTableDataCell>{el.department}</CTableDataCell>
    //   <CTableDataCell>{el.designation}</CTableDataCell>
    //   <CTableDataCell>{el.punctuality}</CTableDataCell>
    //   <CTableDataCell>{el.productivity}</CTableDataCell>
    //   <CTableDataCell>{el.response}</CTableDataCell>
    //   <CTableDataCell>{el.additionalComments}</CTableDataCell>
      
      function toFilterData(data){
      return data.filter((el)=>{
        return (el.name.toLowerCase()||'').includes(searchFilter.search2.toLowerCase().trim())&&
        (el.empId.toLowerCase()||'').includes(searchFilter.search3.toLowerCase().trim())&&
        (el.department.toLowerCase()||'').includes(searchFilter.search4.toLowerCase().trim())&&
        (el.designation.toLowerCase()||'').includes(searchFilter.search5.toLowerCase().trim())&&
        (el.punctuality.toLowerCase()||'').includes(searchFilter.search6.toLowerCase().trim())&&
        (el.productivity.toLowerCase()||'').includes(searchFilter.search7.toLowerCase().trim())&&
        (el.response.toLowerCase()||'').includes(searchFilter.search8.toLowerCase().trim())&&
        (el.additionalComments.toLowerCase()||'').includes(searchFilter.search9.toLowerCase().trim())    
       })
      }
      
      console.log(searchFilter.search9)
  return (
    <>
     
     {addEmpPrformanse&& <EmPerformanceForm   updateActive={updateActive} staff={staff} setUpdateActive={setUpdateActive} getData={()=>getEmpPerformance()} />
}
     <CTable className='mt-3'  align="middle" bordered style={{ borderColor: "#0B5345",width:'120%' }} hover responsive >
                            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                                     <CTableHeaderCell>Sr No</CTableHeaderCell>
                                    <CTableHeaderCell>Name</CTableHeaderCell>
                                    <CTableHeaderCell>Emp Id</CTableHeaderCell>
                                    <CTableHeaderCell>Department</CTableHeaderCell>
                                    <CTableHeaderCell>Designation</CTableHeaderCell>
                                    <CTableHeaderCell>Punctuality</CTableHeaderCell>
                                    <CTableHeaderCell>Productivity</CTableHeaderCell>
                                    <CTableHeaderCell>Responsiblity</CTableHeaderCell>
                                    <CTableHeaderCell>All over feedback</CTableHeaderCell>
                                    <CTableHeaderCell style={{display:(editEmpPrformanse||deleteEmpPrformanse)?'':'none'}} >Edit/Delete</CTableHeaderCell>
                            </CTableHead>
                            <CTableBody>
                            <CTableRow>
                                    <CTableDataCell  style={{minWidth:'80px'}}><CFormInput disabled value={searchFilter.search1} 
                                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search1:e.target.value}))} /> </CTableDataCell>
                                    <CTableDataCell style={{minWidth:'80px'}}><CFormInput value={searchFilter.search2} 
                                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search2:e.target.value}))} /> </CTableDataCell>
                                    <CTableDataCell style={{minWidth:'80px'}}><CFormInput value={searchFilter.search3} 
                                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search3:e.target.value}))} /> </CTableDataCell>
                                    <CTableDataCell style={{minWidth:'80px'}}><CFormInput value={searchFilter.search4} 
                                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search4:e.target.value}))} /> </CTableDataCell>
                                    <CTableDataCell style={{minWidth:'80px'}}><CFormInput value={searchFilter.search5} 
                                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search5:e.target.value}))} /> </CTableDataCell>
                                    <CTableDataCell style={{minWidth:'80px'}}><CFormInput value={searchFilter.search6} 
                                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search6:e.target.value}))} /> </CTableDataCell>
                                    <CTableDataCell style={{minWidth:'80px'}}><CFormInput value={searchFilter.search7} 
                                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search7:e.target.value}))} /> </CTableDataCell>
                                    <CTableDataCell style={{minWidth:'80px'}}><CFormInput value={searchFilter.search8} 
                                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search8:e.target.value}))} /> </CTableDataCell>
                                    
                                    <CTableDataCell style={{minWidth:'80px'}}><CFormInput value={searchFilter.search9} 
                                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search9:e.target.value}))} /> </CTableDataCell>  

                                     <CTableDataCell style={{minWidth:'80px'}}><CFormInput disabled></CFormInput></CTableDataCell>
                                </CTableRow>
                            {toFilterData(employeePerformance).slice(paging * 10, paging * 10 + 10).map((el,i)=> 
                               <CTableRow className='text-center'>
                                    <CTableDataCell>{i+ 1 + (paging * 10)}</CTableDataCell>
                                    <CTableDataCell>{el.name}</CTableDataCell>
                                    <CTableDataCell>{el.empId}</CTableDataCell>
                                    <CTableDataCell>{el.department}</CTableDataCell>
                                    <CTableDataCell>{el.designation}</CTableDataCell>
                                    <CTableDataCell>{el.punctuality}</CTableDataCell>
                                    <CTableDataCell>{el.productivity}</CTableDataCell>
                                    <CTableDataCell>{el.response}</CTableDataCell>
                                    <CTableDataCell>{el.additionalComments}</CTableDataCell>
                                    <CTableDataCell style={{display:(editEmpPrformanse||deleteEmpPrformanse)?'':'none'}}  >
                                        <MdEdit style={{cursor:'pointer',display:(editEmpPrformanse)?'':'none'}}  onClick={()=>setUpdateActive(()=>({visible:true,obj:el}))} />
                                        <MdDelete style={{cursor:'pointer',display:(deleteEmpPrformanse)?'':'none'}} onClick={()=>deleteSalarySheet(el._id)}/>
                                    </CTableDataCell>
                                </CTableRow>)}  
                                                                                           
                            </CTableBody>
                        </CTable>
                        <CPagination aria-label="Page navigation example" align="center" className='mt-2'>
                        <CPaginationItem aria-label="Previous" disabled={paging != 0 ? false : true} onClick={() => paging > 0 && setPaging(paging - 1)}>
                            <span aria-hidden="true">&laquo;</span>
                        </CPaginationItem>
                        <CPaginationItem active onClick={() => setPaging(0)}>{paging + 1}</CPaginationItem>
                        {toFilterData(employeePerformance).length > (paging + 1) * 10 && <CPaginationItem onClick={() => setPaging(paging + 1)} >{paging + 2}</CPaginationItem>}
                        {toFilterData(employeePerformance).length > (paging + 2) * 10 && <CPaginationItem onClick={() => setPaging(paging + 2)}>{paging + 3}</CPaginationItem>}
                        {toFilterData(employeePerformance).length > (paging + 1) * 10 ?
                            <CPaginationItem aria-label="Next" onClick={() => setPaging(paging + 1)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                            : <CPaginationItem disabled aria-label="Next" onClick={() => setPaging(paging + 1)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                        }
                    </CPagination>  
   </>                     
  )
}

export default EmpPerformanceTable
