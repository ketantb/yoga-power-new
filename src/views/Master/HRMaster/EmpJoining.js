import { CCard,CTable,CTableHead,CTableHeaderCell,CTableRow
    ,CTableBody,CTableDataCell,CCol,CRow,CButton,CForm,
    CCardHeader,CCardTitle,CFormInput,CCallout,CModal,
    CModalHeader,CModalTitle,CCardBody,CFormSelect, CFormTextarea 
 } from "@coreui/react"

 import React,{useEffect, useState} from 'react'
 import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import { useSelector } from "react-redux";
import axios from 'axios'
import { MdEdit,MdDelete } from "react-icons/md";
import { useAdminValidation,useUniqAdminObjeact } from "src/views/Custom-hook/adminValidation";
import { herMasterRightVal } from "src/views/hr/Rights/rightsValue/masterRightsValue";
import useJobProfileHook from "./useJobProfileHook";
function EmpJoining (){

  let user = JSON.parse(localStorage.getItem('user-info'))
  const token = user.token;
  const username = user.user.username;

  const url = useSelector((el) => el.domainOfApi)
  const pathValMaster = useAdminValidation('Master')
  const uniqObjVal = useUniqAdminObjeact()

  const rightsData = useSelector((el)=>el?.empLoyeeRights?.masterRights?.masterHr
  ?.items?.masterEmpJoining?.rights) 
  
  const access = rightsData?rightsData:[]
  const isAdmin = useSelector((el)=>el.isAdmin)

  
  const addEmployeeJoining = (access.includes(herMasterRightVal.addEmployeeJoining) || isAdmin )
  const editEmployeeJoining=  (access.includes(herMasterRightVal.editEmployeeJoining) || isAdmin )
  const deleteEmployeeJoining =  (access.includes(herMasterRightVal.deleteEmployeeJoining) || isAdmin )


    const [showForm,setForm] = useState(true)
    const [visible, setVisible] = useState(false)
    const [empJoininSheetData,setEmpJoininSheetData] = useState([])
    const [updateActive,setUpdateActive] = useState(false)
    const [empJoininSheet,setEmpJoininSheet] = useState({
            username:username, 
            DocumentName:'',
            documentDetails:'',    
    })
    const [selectedDocumentDetails,setSelectedDocumentDetails] = useState('')

    const jobProfileFun = useJobProfileHook()

   
   const headers = {
    "Authorization": `Bearer ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
   }

   


  const getEmpJoiningData = ()=>{
   axios.get(`${url}/empJoining/${pathValMaster}`,{headers}).then((el)=>{
    console.log(el.data)
    if(!el.data){
     return 
    }
    setEmpJoininSheetData(el.data)
    setSelectedDocumentDetails(el.data[0].documentDetails)
  }).catch((error)=>{console.log(error)})
  }

  const saveData = async (type)=>{
    
    let response ={}
    try{
      if(type==='Save'){
        response = await  axios.post(`${url}/empJoining/create`,{...empJoininSheet,...uniqObjVal},{headers})
      }
      if(type==='Update'){
       response = await  axios.post(`${url}/empJoining/update/${empJoininSheet?._id}`,empJoininSheet,{headers})
      }
  
     if(response?.status===200){
      getEmpJoiningData()
      alert('successfully save')
     }
      }catch(error){
        console.error(error)
      }
  }


  useEffect(()=>{
    getEmpJoiningData()
  },[])

  function toToggaleFrom(){
   setForm((prev=>!prev))
    setUpdateActive(false)
    setEmpJoininSheet({
        username: username, 
        DocumentName:'',
        documentDetails: '',
     })
  }
  

  const updateProduct = async (item)=>{
    setForm(false)
    setEmpJoininSheet({...item})
    setUpdateActive(true)
   
  }


const toDeleteData= async (id)=>{
  if(!confirm('Do u want to delete this')){
  return
  }
  
  const response = await  axios.delete(`${url}/empJoining/delete/${id}`, {headers})
  if(response.status===200){
     getEmpJoiningData()
  }
  
  }

    return  <> 
 <CModal visible={visible} onClose={() => setVisible(false)}>
       <CModalHeader>
        <CModalTitle>Successfully Save   <CIcon icon={icon.cilCheckAlt} size="xl" color="success"/></CModalTitle>
        </CModalHeader> 
</CModal>




<CCard >
<CCardHeader style={{ backgroundColor: "#0B5345", color: "white" }} className='p-3'>
        <CCardTitle><h4>Employee Joining</h4></CCardTitle>
</CCardHeader>

<CCardBody>

                   
          <CCol className='my-3 text-end'>
                   {showForm&&<CButton style={{display:addEmployeeJoining?'':'none'}} onClick={()=>toToggaleFrom()}>Add New </CButton>}
                   {showForm||<CCard className="overflow-hidden my-4 text-start"   >
        <CCardHeader className="p-4" style={{ backgroundColor: '#0B5345', color: 'white' }}>
                 <CCardTitle> <h5>Employee Joining Form</h5></CCardTitle>
        </CCardHeader>
    <div className="p-4">
         <CForm>
            <CCol className="d-flex justify-content-end">
                <CButton color='danger' onClick={()=>toToggaleFrom()}>Close</CButton>
            </CCol>
            <CCol>
             
              <CCol md={8}>
                <CFormInput
                  label='Document Name'
                  value={empJoininSheet.DocumentName}
                  onChange={(e)=>setEmpJoininSheet(prev=>({...prev,DocumentName:e.target.value}))}
                />
              </CCol>
            </CCol> 
            <CCol >
              <CCol md={8}>
              <CFormTextarea
                  type="time"
                  label=' Document Details'
                  value={empJoininSheet.documentDetails}
                  onChange={(e)=>setEmpJoininSheet(prev=>({...prev,documentDetails:e.target.value}))}
                />
             
              </CCol>
            </CCol>    

          
            <CCol className='mt-4'>
                    {updateActive?
                      <CButton onClick={()=>saveData('Update')} >Save Update</CButton>:          
                        <CButton onClick={()=>saveData('Save')} >Save</CButton>
                    }

                    </CCol>


         </CForm>
    </div>
    <CCol style={{ backgroundColor: '#0B5345'}} className='p-1'>

    </CCol>
      </CCard>}

                </CCol>

                <h6 className="mt-2">Write the title in bracket
                     <span><b>[title]</b></span>    
                     </h6>
                     <p className="p-0 m-1">Write the Content in small Bracket <span><b>(Content)</b></span>  </p> 
                     <p className="p-0 m-1">Between <span><b>(Content)</b></span> and <span><b>[title]</b></span>   Should be Colon <span><b>[title]:(Content)</b></span> </p>
                     <p className="p-0 m-1">To Split the Line in <span><b>(content)</b> </span>    add this Syntext  <span><b>$brsplit</b></span>  </p> 
                     <p className="p-0 m-1">To write only title <span><b>[title]:()</b> </span> </p> 
                     <p className="p-0 m-1 mb-4">To write only content<span><b>(content) or content </b> </span> </p>

                          <ul className="d-flex" style={{listStyleType:'none'}} >
                                  {empJoininSheetData.filter((list) =>

                                    list).map((item) => (
                                          <li className="mx-1 d-flex mx-2"  >
                                            <CButton className="mx-1" variant={item.documentDetails===selectedDocumentDetails?'':'outline'} onClick={()=>setSelectedDocumentDetails(item.documentDetails)} style={{height:'fit-content'}}   >{item.DocumentName}</CButton>
                                            <div style={{display:(deleteEmployeeJoining||editEmployeeJoining)?'':'none'}}>
                                                  <MdEdit style={{cursor:'pointer',display:(editEmployeeJoining)?'':'none'}} onClick={()=>updateProduct(item)} />
                                                  <MdDelete style={{cursor:'pointer',display:(deleteEmployeeJoining)?'':'none'}} onClick={()=>toDeleteData(item._id)}/>                                       
                                            </div>
                                         </li>                                            
                                    ))}
                               </ul>

                               <CCard className='p-2'>
                                {jobProfileFun(selectedDocumentDetails)}
                               </CCard>
</CCardBody>

</CCard>
</>

}



export default EmpJoining