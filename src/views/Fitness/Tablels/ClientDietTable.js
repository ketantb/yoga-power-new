import axios from 'axios';
import { useEffect,useCallback,useState } from 'react'
import { MdEdit,MdDelete } from 'react-icons/md';

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
  import { MdCall, MdMail } from "react-icons/md";
  import { BsWhatsapp } from "react-icons/bs";
import AllDietClientForm from '../form/AllDietClientForm';
import { useAdminValidation } from 'src/views/Custom-hook/adminValidation';



function ClientDietTable ({closeFormFun,token,showForm,setForm,allMemberData,id}){

    const url = useSelector((el)=>el.domainOfApi) 
    const pathVal = useAdminValidation()
    const [search1,setSearch1] = useState('')
    const [search2,setSearch2] = useState('')
    const [search3,setSearch3] = useState('')
    const [search4,setSearch4] = useState('')
    const [search5,setSearch5] = useState('')
    const [search6,setSearch6] = useState('')
    const [search7,setSearch7] = useState('')
    const [search8,setSearch8] = useState('')












const [clientDite,setClientDite] =useState([])
const [edit,setEdit] = useState(false)
const [editData,setEditData] = useState([])

const  headers = {
    "Authorization": `Bearer ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}



  const getClientDietData = useCallback(async ()=>{
    const {data} = await axios.get(`${url}/allDietClient/${pathVal}`,{headers})
    
  if(id?.trim()==='all-client-fitness'){
    setClientDite(data)
    return 
}else if(id){
    setClientDite(data.filter((el)=>el['Member_Id']===id))
    return 
}
   },[])
  
useEffect(()=>{
getClientDietData()
},[getClientDietData])





const deleteClientDitePlanFun =(id)=>{
    if(confirm('Do you want to delete it ')){

    }
    const  headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
     
    try{
    axios.delete(`${url}/allDietClient/delete/${id}`,{headers})
    getClientDietData()
    }catch(error){
        console.log(error)
    }
}


const editClientDataFun =(el)=>{
    setEdit(true)
    setEditData(el)
    setForm(true)
}




return<>

{showForm && <AllDietClientForm
 closeFormFun={closeFormFun} 
 getClientDietData={getClientDietData}
 edit={edit}
 editData={editData}
 allMemberData={allMemberData}
 id={id}
/>}

<CTable className='m-3 p-2' align="middle" bordered style={{ borderColor: "#0B5345",width:'180%' }} hover responsive>
<CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
    <CTableRow >
        <CTableHeaderCell>Member ID</CTableHeaderCell>
        <CTableHeaderCell>Start Date</CTableHeaderCell>
        <CTableHeaderCell>Name</CTableHeaderCell>
        <CTableHeaderCell>Mobile.No</CTableHeaderCell>
        <CTableHeaderCell>Gender</CTableHeaderCell>
        <CTableHeaderCell>Purpose</CTableHeaderCell>
        <CTableHeaderCell>EndDate</CTableHeaderCell>
        <CTableHeaderCell>package</CTableHeaderCell>
        <CTableHeaderCell>Dietitian Name</CTableHeaderCell>
        <CTableHeaderCell>Delete/Edit</CTableHeaderCell>
      

     

    </CTableRow>
</CTableHead>
<CTableBody>
    <CTableRow>
        <CTableDataCell>
            <CFormInput
                className="mb-1"
                style={{ minWidth: "60px" }}
                type="text"
                aria-describedby="exampleFormControlInputHelpInline"
                value={search1}
                onChange={(e)=>{
                     setSearch1(e.target.value)
                }}
            />
        </CTableDataCell>
        <CTableDataCell>
            <CFormInput
                className="mb-1"
                style={{ minWidth: "120px" }}
                type="text"
                aria-describedby="exampleFormControlInputHelpInline"
                value={search2}
                onChange={(e)=>{
                     setSearch2(e.target.value)
                }}
            />
        </CTableDataCell>
        <CTableDataCell>
            <CFormInput
                className="mb-1"
                type="text"
                style={{ minWidth: "120px" }}
                aria-describedby="exampleFormControlInputHelpInline"
                value={search3}
                onChange={(e)=>{
                     setSearch3(e.target.value)
                }}
            />
        </CTableDataCell>
        <CTableDataCell>
            <CFormInput
                className="mb-1"
                type="text"
                style={{ minWidth: "90px" }}
                value={search4}
                onChange={(e)=>{
                     setSearch4(e.target.value)
                }}
                aria-describedby="exampleFormControlInputHelpInline"
            />
        </CTableDataCell>
        <CTableDataCell>
            <CFormInput
                className="mb-1"
                type="number"
                style={{ minWidth: "100px" }}
                value={search5}
                onChange={(e)=>{
                     setSearch5(e.target.value)
                }}
            
            />
        </CTableDataCell>
        <CTableDataCell>
            <CFormInput
                className="mb-1"
                type="text"
                value={search6}
                onChange={(e)=>{
                     setSearch6(e.target.value)
                }}
            />
        </CTableDataCell>
        <CTableDataCell>
            <CFormInput
                className="mb-1"
                type="text"
                value={search7}
                onChange={(e)=>{
                     setSearch7(e.target.value)
                }}
            />
        </CTableDataCell>
        <CTableDataCell>
            <CFormInput
                className="mb-1"
                type="text"
                value={search8}
                onChange={(e)=>{
                     setSearch8(e.target.value)
                }}
            />
        </CTableDataCell>
        <CTableDataCell>
            <CFormInput
                className="mb-1"
                type="text"

            />
        </CTableDataCell>
        <CTableDataCell>
            <CFormInput
                className="mb-1"
                type="text"
                disabled
            />
        </CTableDataCell>
       
        
       
    </CTableRow>
    {clientDite.filter((el)=>{
      return (el.Action||'').toLowerCase().includes(search1.toLowerCase())&&
      (el.Start_Date||'').toLowerCase().includes(search2.toLowerCase())&&
      (el.Name||'').toLowerCase().includes(search3.toLowerCase())&&
      (el.Mobile_No+""||'').toLowerCase().includes(search4.toLowerCase())&&
      (el.Gender||'').toLowerCase().includes(search5.toLowerCase())&&
      (el.EndDate||'').toLowerCase().includes(search6.toLowerCase())&&
      (el.Package||'').toLowerCase().includes(search7.toLowerCase())&&
      (el.DietitianName||'').toLowerCase().includes(search8.toLowerCase())
    })
    .map((el)=>

    <CTableRow>                               
      <CTableDataCell>{el.Action}</CTableDataCell>
      <CTableDataCell>{el.Start_Date}</CTableDataCell>
      <CTableDataCell>{el.Name}</CTableDataCell>
      <CTableDataCell>{el.Mobile_No}</CTableDataCell>
      <CTableDataCell>{el.Gender}</CTableDataCell>
      <CTableDataCell>{el.Purpose}</CTableDataCell>
      <CTableDataCell>{el.EndDate} </CTableDataCell>
      <CTableDataCell>{el.Package}</CTableDataCell>
      <CTableDataCell>{el.DietitianName}</CTableDataCell>
      <CTableDataCell className='text-center'>
    <CButton  className='mx-2' size='sm' onClick={()=>editClientDataFun(el)} ><MdEdit   /> </CButton>
    <CButton  className='mx-2' color='danger' size='sm' onClick={()=>deleteClientDitePlanFun(el._id)}><MdDelete    /></CButton>
    </CTableDataCell>

                    
   </CTableRow>


    )}
   
   
</CTableBody>
</CTable>
</>
}

export default ClientDietTable