import React, { useEffect, useState } from 'react'
import {
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CFormInput,
    CPaginationItem,
    CPagination
} from '@coreui/react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { MdDelete, MdEdit } from 'react-icons/md';
import TrainerPerformanceForm from './TrainerPerformanceForm';
import { useAdminValidation } from 'src/views/Custom-hook/adminValidation';

let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;

const headers = {
    "Authorization": `Bearer ${token}`,
   }


const TrainerPerformance = ({trainer,addTrainerPrformanse,deleteTrainerPrformanse,editTrainerPrformanse}) => {

    const [updateActive,setUpdateActive] = useState({visible:false,obj:{}})
    const [trainerloyeePerformance,settrainerloyeePerformance] = useState([])
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
        search10:'',
        search11:'',

    })
    const [paging, setPaging] = useState(0);

    useEffect(()=>{
        gettrainerPerformance()
      },[])
      
      
    function gettrainerPerformance(){
        axios.get(`${url}/trainerPerformance/${pathVal}`, {headers})
        .then((res) => {
            console.log(res.data)
          settrainerloyeePerformance(res.data.reverse())
        }).catch((error) => {console.error(error)})
      }
      
      function deleteSalarySheet(id) {
        if (confirm('Do you want to delete this')) {
            fetch(`${url}/trainerPerformance/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then((result) => {
                result.json().then((resp) => {
                    gettrainerPerformance()
                })
            })
        }
      }

   
      
      function toFilterData(data){
        return data.filter((el)=>{
                  return (el.name.toLowerCase()||'').includes(searchFilter.search2.toLowerCase().trim())&&
                  (el.empId.toLowerCase()||'').includes(searchFilter.search3.toLowerCase().trim())&&
                  (el.department.toLowerCase()||'').includes(searchFilter.search4.toLowerCase().trim())&&
                  (el.designation.toLowerCase()||'').includes(searchFilter.search5.toLowerCase().trim())&&
                  (el.punctuality.toLowerCase()||'').includes(searchFilter.search6.toLowerCase().trim())&&
                  (el.Attendance.toLowerCase()||'').includes(searchFilter.search7.toLowerCase().trim())&&
                  (el.renewals.toLowerCase()||'').includes(searchFilter.search8.toLowerCase().trim())&&
                  (el.feedBACK.toLowerCase()||'').includes(searchFilter.search9.toLowerCase().trim()) &&
                  (el.Behaviour.toLowerCase()||'').includes(searchFilter.search10.toLowerCase().trim()) && 
                  (el.overallfeedback.toLowerCase()||'').includes(searchFilter.search11.toLowerCase().trim())    
         })
        }


  return (
    <>
    {addTrainerPrformanse &&<TrainerPerformanceForm  updateActive={updateActive} setUpdateActive={setUpdateActive} 
    trainer={trainer} getData={()=>gettrainerPerformance()} />}

      <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345",width:'120%'}} hover responsive >
                        <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                                <CTableRow >
                                    <CTableHeaderCell style={{minWidth:'80px'}}>Sr No </CTableHeaderCell>
                                    <CTableHeaderCell style={{minWidth:'80px'}}>Name</CTableHeaderCell>
                                    <CTableHeaderCell style={{minWidth:'80px'}}>Trainer Id</CTableHeaderCell>
                                    <CTableHeaderCell style={{minWidth:'80px'}}>Department</CTableHeaderCell>
                                    <CTableHeaderCell style={{minWidth:'80px'}}>Designation</CTableHeaderCell>
                                    <CTableHeaderCell style={{minWidth:'80px'}}>Punctuality</CTableHeaderCell>
                                    <CTableHeaderCell style={{minWidth:'80px'}}>Attendance %</CTableHeaderCell>
                                    <CTableHeaderCell style={{minWidth:'80px'}}>Renewals %</CTableHeaderCell>
                                    <CTableHeaderCell style={{minWidth:'80px'}}>Training Feed Back</CTableHeaderCell>
                                    <CTableHeaderCell style={{minWidth:'80px'}}>Behaviour</CTableHeaderCell>
                                    <CTableHeaderCell style={{minWidth:'80px'}}>Overall feedback</CTableHeaderCell>
                                    <CTableHeaderCell style={{display:(editTrainerPrformanse||deleteTrainerPrformanse)?'':'none',minWidth:'80px'}} >Delete/Edit</CTableHeaderCell>


                                </CTableRow>
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
                                    <CTableDataCell style={{minWidth:'80px'}}><CFormInput  value={searchFilter.search9} 
                                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search9:e.target.value}))} /> </CTableDataCell>       
                                    <CTableDataCell style={{minWidth:'80px'}}><CFormInput value={searchFilter.search10} 
                                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search10:e.target.value}))} /> </CTableDataCell>
                                    <CTableDataCell style={{minWidth:'80px'}}><CFormInput value={searchFilter.search11} 
                                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search11:e.target.value}))} /> </CTableDataCell>     
                                     <CTableDataCell style={{minWidth:'80px'}}><CFormInput disabled  /> </CTableDataCell>                        
                                </CTableRow>
                                {toFilterData(trainerloyeePerformance).slice(paging * 10, paging * 10 + 10).map((el,i)=>

                                <CTableRow className='text-center' >
                                            <CTableDataCell>{i+ 1 + (paging * 10)}</CTableDataCell>
                                            <CTableDataCell>{el.name}</CTableDataCell>
                                            <CTableDataCell>{el.empId}</CTableDataCell>
                                            <CTableDataCell>{el.department}</CTableDataCell>
                                            <CTableDataCell>{el.designation}</CTableDataCell>
                                            <CTableDataCell>{el.punctuality}</CTableDataCell>
                                            <CTableDataCell>{el.Attendance}</CTableDataCell>
                                            <CTableDataCell>{el.renewals}</CTableDataCell>
                                            <CTableDataCell>{el.feedBACK}</CTableDataCell>
                                            <CTableDataCell>{el.Behaviour}</CTableDataCell>
                                            <CTableDataCell>{el.overallfeedback}</CTableDataCell>
                                    <CTableDataCell style={{display:(editTrainerPrformanse||deleteTrainerPrformanse)?'':'none'}}>
                                        <MdEdit style={{cursor:'pointer',display:(editTrainerPrformanse)?'':'none'}} onClick={()=>setUpdateActive(()=>({visible:true,obj:el}))} />
                                        <MdDelete style={{cursor:'pointer',display:(deleteTrainerPrformanse)?'':'none'}} onClick={()=>deleteSalarySheet(el._id)}/>
                                    </CTableDataCell>                                          
                                        </CTableRow>
                                
                                )}
                                        
                            </CTableBody>
                        </CTable>
                        <CPagination aria-label="Page navigation example" align="center" className='mt-2'>
                        <CPaginationItem aria-label="Previous" disabled={paging != 0 ? false : true} onClick={() => paging > 0 && setPaging(paging - 1)}>
                            <span aria-hidden="true">&laquo;</span>
                        </CPaginationItem>
                        <CPaginationItem active onClick={() => setPaging(0)}>{paging + 1}</CPaginationItem>
                        {toFilterData(trainerloyeePerformance).length > (paging + 1) * 10 && <CPaginationItem onClick={() => setPaging(paging + 1)} >{paging + 2}</CPaginationItem>}
                        {toFilterData(trainerloyeePerformance).length > (paging + 2) * 10 && <CPaginationItem onClick={() => setPaging(paging + 2)}>{paging + 3}</CPaginationItem>}
                        {toFilterData(trainerloyeePerformance).length > (paging + 1) * 10 ?
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

export default TrainerPerformance
