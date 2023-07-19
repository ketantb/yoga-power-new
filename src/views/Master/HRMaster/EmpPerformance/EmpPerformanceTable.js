import React, { useEffect, useState } from 'react'
import {
    CFormInput,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
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
      
      
  return (
    <>
     
     {addEmpPrformanse&& <EmPerformanceForm   updateActive={updateActive} staff={staff} setUpdateActive={setUpdateActive} getData={()=>getEmpPerformance()} />
}
     <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                                <CTableRow >
                                    <CTableHeaderCell>Sr No</CTableHeaderCell>
                                    <CTableHeaderCell>Name</CTableHeaderCell>
                                    <CTableHeaderCell>Emp Id</CTableHeaderCell>
                                    <CTableHeaderCell>Department</CTableHeaderCell>
                                    <CTableHeaderCell>Designation</CTableHeaderCell>
                                    <CTableHeaderCell>Punctuality</CTableHeaderCell>
                                    <CTableHeaderCell>Productivity</CTableHeaderCell>
                                    <CTableHeaderCell>Response</CTableHeaderCell>
                                    <CTableHeaderCell>Additional Comments</CTableHeaderCell>
                                    <CTableHeaderCell style={{display:(editEmpPrformanse||deleteEmpPrformanse)?'':'none'}} >Edit/Delete</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                            {employeePerformance.map((el,i)=> 
                               <CTableRow className='text-center'>
                                    <CTableDataCell>{i+1}</CTableDataCell>
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
   </>                     
  )
}

export default EmpPerformanceTable
