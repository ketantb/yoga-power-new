import axios from 'axios';
import { useEffect,useCallback,useState } from 'react'
import FitnessMeasurmentForm from '../form/FitnessMeasurmentForm';

import {  
    CFormInput,   
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CButton
  } from '@coreui/react'

  import { useSelector } from 'react-redux'
  import { MdDelete,MdEdit } from 'react-icons/md';
  import { useAdminValidation } from 'src/views/Custom-hook/adminValidation';
  import { fitnessRigths } from 'src/views/hr/Rights/rightsValue/crmRightsValue';

function MeasurementTable({closeFormFun,token,showForm,setForm,allMemberData,id,employeeData}){

    const rightsData = useSelector((el)=>el.empLoyeeRights?.crmRights
    ?.crmFitness?.superRight) 

    const isAdmin = useSelector((el)=>el.isAdmin)

    const measurmentEdit =  (rightsData?.edit?.includes(fitnessRigths.measurment)||isAdmin)
    const measurmentDelete =  (rightsData?.delete?.includes(fitnessRigths.measurment)||isAdmin)


    const [allMeasurmentMembers,setAllMeasurmentMembers] =useState([])
    const [edit,setEdit] = useState(true)
    const [editData,setEditData] = useState(true)
    const [searchFilter,setSearchFilter] = useState({
        search1:'',
        search2:'',
        search3:'',
        search4:'',
    })


    const url = useSelector((el)=>el.domainOfApi) 
    const pathVal =   useAdminValidation()
    const headers = {
    'Authorization': `Bearer ${token}`
   }

  const getAllmembersData = useCallback(async ()=>{

    const {data} = await axios.get(`${url}/fitnessDetail/${pathVal}`,{headers})
    console.log('Member Data',data)
    if(id?.trim()==='all-client-fitness'){
        setAllMeasurmentMembers(data)
        return 
    }else{
        setAllMeasurmentMembers(data.filter((el)=>el['Member_ID']===id))
        return 
    }
   },[])
  
useEffect(()=>{
getAllmembersData()
},[getAllmembersData])


const deleteClientDitePlanFun =(id)=>{
    if(confirm('Do you want to delete it')){

    }
    const  headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
     
    try{
    axios.delete(`${url}/fitnessDetail/delete/${id}`,{headers})
    getAllmembersData()
    }catch(error){
        console.log(error)
    }
}


const editClientDataFun =(el)=>{
    setEdit(true)
    setEditData(el)
    setForm(true)
}



    return <>

    
{showForm && <FitnessMeasurmentForm
 closeFormFun={closeFormFun} 
 getAllmembersData={ getAllmembersData}
 editData={editData}
 allMemberData={allMemberData}
 employeeData={employeeData}
 id={id}
 setForm={setForm}
/>}

     <CTable className='m-3 ' align="middle" bordered style={{ borderColor: "#0B5345"}} hover responsive>
    <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
        <CTableRow >
            <CTableHeaderCell >Measurement Date</CTableHeaderCell>
            <CTableHeaderCell>Member ID</CTableHeaderCell>
            <CTableHeaderCell>Name</CTableHeaderCell>
            <CTableHeaderCell>Contact</CTableHeaderCell>
            <CTableHeaderCell>Weight</CTableHeaderCell>
            <CTableHeaderCell>Height</CTableHeaderCell>
            <CTableHeaderCell>BMI</CTableHeaderCell>
            <CTableHeaderCell>Age</CTableHeaderCell>
            <CTableHeaderCell>Fat</CTableHeaderCell>
            <CTableHeaderCell>Neck</CTableHeaderCell>
            <CTableHeaderCell>Shoulder</CTableHeaderCell>
            <CTableHeaderCell>Chest</CTableHeaderCell>
            <CTableHeaderCell>Arms(R)</CTableHeaderCell>
            <CTableHeaderCell>Arms(L)</CTableHeaderCell>
            <CTableHeaderCell>ForArms</CTableHeaderCell>
            <CTableHeaderCell>Waist</CTableHeaderCell>
            <CTableHeaderCell>Hips</CTableHeaderCell>

            
            <CTableHeaderCell>Thigh(R)</CTableHeaderCell>
            <CTableHeaderCell>Thigh(L)</CTableHeaderCell>
            <CTableHeaderCell>Calf(R)</CTableHeaderCell>
            <CTableHeaderCell>Calf(L)</CTableHeaderCell>

            <CTableHeaderCell>Counsellor</CTableHeaderCell>
            <CTableHeaderCell>NextFollowup Date</CTableHeaderCell>
            <CTableHeaderCell>Edit/Delete</CTableHeaderCell>

        </CTableRow>
    </CTableHead>
    <CTableBody>
        <CTableRow>
            <CTableDataCell>
                <CFormInput
                    className="mb-1"
                    style={{ minWidth: "120px" }}
                    type="text"
                    aria-describedby="exampleFormControlInputHelpInline"
                    value={searchFilter.search1}
                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search1:e.target.value}))}
                />
            </CTableDataCell>
            <CTableDataCell>
                <CFormInput
                    className="mb-1"
                    style={{ minWidth: "120px" }}
                    type="text"
                    aria-describedby="exampleFormControlInputHelpInline"
                    value={searchFilter.search2}
                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search2:e.target.value}))}
                />
            </CTableDataCell>
            <CTableDataCell>
                <CFormInput
                    className="mb-1"
                    type="text"
                    style={{ minWidth: "120px" }}
                    aria-describedby="exampleFormControlInputHelpInline"
                    value={searchFilter.search3}
                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search3:e.target.value}))}
                />
            </CTableDataCell>
            <CTableDataCell>
                <CFormInput
                    className="mb-1"
                    type="text"
                    style={{ minWidth: "120px" }}
                    aria-describedby="exampleFormControlInputHelpInline"
                    value={searchFilter.search4}
                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search4:e.target.value}))}
                />
            </CTableDataCell>
            <CTableDataCell>
                <CFormInput
                    className="mb-1"
                    type="number"
                    style={{ minWidth: "120px" }}
                    disabled
               
                />
            </CTableDataCell>
            <CTableDataCell>
                <CFormInput
                    className="mb-1"
                    type="text"
                    style={{ minWidth: "120px" }}
                    disabled
                />
            </CTableDataCell>
            <CTableDataCell>
                <CFormInput
                    className="mb-1"
                    type="text"
                    style={{ minWidth: "120px" }}
                    disabled

                />
            </CTableDataCell>
            <CTableDataCell>
                <CFormInput
                    className="mb-1"
                    type="text"
                    style={{ minWidth: "120px" }}
                    disabled
            
                />
            </CTableDataCell>
            <CTableDataCell>
                <CFormInput
                    className="mb-1"
                    type="text"
                    style={{ minWidth: "120px" }}
                    disabled
                />
            </CTableDataCell>
            <CTableDataCell>
                <CFormInput
                    className="mb-1"
                    type="text"
                    style={{ minWidth: "120px" }}
                    disabled
                />
            </CTableDataCell>
            <CTableDataCell>
                <CFormInput
                    className="mb-1"
                    type="text"
                    style={{ minWidth: "120px" }}
                    disabled
                />
            </CTableDataCell>
            <CTableDataCell>
                <CFormInput
                    className="mb-1"
                    type="number"     
                    style={{ minWidth: "120px" }}
                    disabled

                                      
                />
            </CTableDataCell>
            <CTableDataCell>
                <CFormInput
                    className="mb-1"
                    type="text"
                    style={{ minWidth: "120px" }}
                    disabled
                />
            </CTableDataCell>
            <CTableDataCell>
                <CFormInput
                    className="mb-1"
                    type="text"
                    style={{ minWidth: "120px" }}
                    disabled

                />
            </CTableDataCell>
            <CTableDataCell>
                <CFormInput
                    className="mb-1"
                    type="text"
                    style={{ minWidth: "120px" }}
                    disabled
                />
            </CTableDataCell>
            <CTableDataCell>
                <CFormInput
                    className="mb-1"
                    style={{ minWidth: "120px" }}
                    type="text"
                    disabled
                />
            </CTableDataCell>
            <CTableDataCell>
                <CFormInput
                    className="mb-1"
                    style={{ minWidth: "120px" }}
                    type="text"
                    disabled
                />
            </CTableDataCell>
            <CTableDataCell>
                <CFormInput
                    className="mb-1"
                    style={{ minWidth: "120px" }}
                    type="text"
                    disabled
                />
            </CTableDataCell>
            <CTableDataCell>
                <CFormInput
                    className="mb-1"
                    style={{ minWidth: "120px" }}
                    type="text"
                    disabled
                />
            </CTableDataCell>
            <CTableDataCell>
                <CFormInput
                    className="mb-1"
                    style={{ minWidth: "120px" }}
                    type="text"
                    disabled
                />
            </CTableDataCell>
            <CTableDataCell>
                <CFormInput
                    className="mb-1"
                    style={{ minWidth: "120px" }}
                    type="text"
                    disabled
                />
            </CTableDataCell>
            <CTableDataCell>
                <CFormInput
                    className="mb-1"
                    style={{ minWidth: "120px" }}
                    type="text"
                    disabled
                />
            </CTableDataCell>
            <CTableDataCell>
                <CFormInput
                    className="mb-1"
                    style={{ minWidth: "120px" }}
                    type="text"
                    disabled
                />
            </CTableDataCell>
            <CTableDataCell>
                <CFormInput
                    className="mb-1"
                    style={{ minWidth: "120px" }}
                    type="text"
                    disabled
                />
            </CTableDataCell>
           
        </CTableRow>
         
                  {allMeasurmentMembers.filter((el)=>{
                     return     (new Date(el.createdAt).toLocaleDateString()+"" || ' ').toLowerCase().includes(searchFilter.search1.trim().toLowerCase()) &&
                     (el.ClientId|| ' ').toLowerCase().includes(searchFilter.search2.trim().toLowerCase()) &&
                     (el.Fullname || ' ').toLowerCase().includes(searchFilter.search3.trim().toLowerCase()) &&
                     (el.ContactNumber+"" || ' ').includes(searchFilter.search4.trim().toLowerCase()) 

                  }).map((el)=>
                   <CTableRow>                       
                    <CTableDataCell>{new Date(el.createdAt).toLocaleDateString()}</CTableDataCell>
                    <CTableDataCell>{el['ClientId']}</CTableDataCell>
                    <CTableDataCell>{el.Fullname}</CTableDataCell>
                    <CTableDataCell>{el.ContactNumber}</CTableDataCell>
                    <CTableDataCell>{el.Weight}</CTableDataCell>
                    <CTableDataCell>{el.Height}</CTableDataCell>
                    <CTableDataCell>{el.BMI}</CTableDataCell>
                    <CTableDataCell>{el.Age}</CTableDataCell>
                    <CTableDataCell>{el.Fat}</CTableDataCell>
                    <CTableDataCell>{el.Neck}</CTableDataCell>
                    <CTableDataCell>{el.Shoulder}</CTableDataCell>
                    <CTableDataCell>{el.Chest}</CTableDataCell>
                    <CTableDataCell>{el.ArmsR}</CTableDataCell>      
                    <CTableDataCell>{el.ArmsL}</CTableDataCell>
                    <CTableDataCell>{el.ForArms}</CTableDataCell>
                    <CTableDataCell>{el.Waist}</CTableDataCell>
                    <CTableDataCell>{el.Hips}</CTableDataCell>  
                    <CTableDataCell>{el.ThighR}</CTableDataCell>
                    <CTableDataCell>{el.ThighL}</CTableDataCell>
                    <CTableDataCell>{el.CalfR}</CTableDataCell>
                    <CTableDataCell>{el.CalfL}</CTableDataCell>  
                    <CTableDataCell>{el.Counseller}</CTableDataCell>
                    <CTableDataCell>{new Date(el.NextFollowup_Date).toLocaleDateString()}</CTableDataCell>
                    <CTableDataCell className={(measurmentEdit||measurmentDelete)?'text-center':'d-none'}>
                               <CButton  className={(measurmentEdit)?'mx-2':'d-none'} size='sm' onClick={()=>editClientDataFun(el)} ><MdEdit   /> </CButton>
                               <CButton  className={(measurmentDelete)?'mx-2':'d-none'}  color='danger' size='sm' onClick={()=>deleteClientDitePlanFun(el._id)}><MdDelete    /></CButton>
                    </CTableDataCell>
                    </CTableRow>)}
           
    </CTableBody>
</CTable>
</>
}

export default MeasurementTable