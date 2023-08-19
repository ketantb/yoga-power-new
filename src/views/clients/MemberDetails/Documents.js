import { CCard,CTable,CTableHead,CTableHeaderCell,CTableRow
    ,CTableBody,CTableDataCell,CCol,CRow,CButton,CForm,
    CCardHeader,CCardTitle,CFormInput,CModal,CModalFooter,
    CModalHeader,CModalTitle,CCardBody,CFormSelect, CModalBody
 } from "@coreui/react"
 import { useReactToPrint } from "react-to-print";

import React,{useEffect, useState,useRef} from 'react'
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import { useSelector } from "react-redux";
import axios from 'axios'
import { MdEdit,MdDelete } from "react-icons/md";
import { useAdminValidation ,useUniqAdminObjeact} from "src/views/Custom-hook/adminValidation";
import { storage } from "src/firebase";
import {getDownloadURL, ref,uploadBytesResumable } from "firebase/storage";

function Documents ({clinetData,id}){

  let user = JSON.parse(localStorage.getItem('user-info'))
  const token = user.token;

  const url = useSelector((el) => el.domainOfApi)
  const pathValMaster = useAdminValidation('Master')
  const pathVal = useAdminValidation('')
  const uniqObjVal = useUniqAdminObjeact()

  const componentRef = useRef()
 const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'yog-power',
    onAfterPrint: () => alert('print success')
})
  
  
    const [showForm,setForm] = useState(true)
    const [visible, setVisible] = useState(false)
    const [clientDocData,setclientDocData] = useState([])
    const [updateActive,setUpdateActive] = useState(false)
    const [uploadingProgress,setuploaDedProgress]=useState(0)
    const [viewDoc,setViewDoc] = useState(false)
    const [viewDocUrl,setViewDocUrl] = useState('')
    const [clientDataObj,setclientDataObj] = useState({
        date:new Date(),	
        name:"",	
        docType:"",
        memberId:id,
        image:"",
        empID:"",
        staffName:'',
        docName:" ",
        docUrl:''
    })


   
   const headers = {
    "Authorization": `Bearer ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
   }

   const [staff,setStaff] = useState([])
   
       function  getStafff() {
        axios.get(`${url}/employeeform/${pathValMaster}`, {
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


  const getClientDoc = ()=>{
   axios.get(`${url}/clientDocument/${id}`,{headers}).then((el)=>{
    if(el.status!==200){
     return 
    }
    setclientDocData(el.data)
  }).catch((error)=>{console.log(error)})
  }

  const saveData = async (type)=>{
    
    let response ={
        status:404
    }
   
    const selectedStaff = staff.find((el)=>el._id===clientDataObj.empID)
    clientDataObj.staffName = selectedStaff?.FullName

    try{
      if(type==='Save'){
        response = await  axios.post(`${url}/clientDocument/create`,{...clientDataObj,...uniqObjVal},{headers})
      }
      if(type==='Update'){
       response = await  axios.post(`${url}/clientDocument/update/${clientDataObj?._id}`,clientDataObj,{headers})
      }
  
     if(response?.status===200){
      getClientDoc()
      alert('successfully save')
     }

      }catch(error){
        console.error(error)
      }
  }


  useEffect(()=>{
    getClientDoc()
    getStafff()
  },[])

  function toToggaleFrom(){
   setForm((prev=>!prev))
    setUpdateActive(false)
    setclientDataObj({
        date:new Date(),	
        name:clinetData.FullName,	
        docType:"",
        memberId:id,
        image:"",
        empID:"",
        staffName:'',
        docName:" ",
        docUrl:'',      
     })
     setuploaDedProgress(0)
  }
  

  const updateProduct = async (item)=>{
    setForm(false)
    item.date = new Date().toISOString()?.split('T')[0]
    setclientDataObj({...item})
    setUpdateActive(true)
   
  }


const toDeleteData= async (id)=>{
  if(!confirm('Do u want to delete this')){
  return
  }
  
  const response = await  axios.delete(`${url}/clientDocument/delete/${id}`, {headers})
  if(response.status===200){
    getClientDoc()
  }
  
  }

  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    const file = event.target.files[0]

     
        const uploadImage = (file)=>{
          if(!fileUploaded)return
         const storageRef =   ref(storage,`document/${fileUploaded.name}`)
         const uploadTask = uploadBytesResumable(storageRef,fileUploaded)
  
         uploadTask.on("state_changed",(snapshot)=>{
          const prog = Math.round((snapshot.bytesTransferred/snapshot.totalBytes) *100)
          setuploaDedProgress(prog) 
         },(error)=>{
          console.log(error)
         },
         ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
            setclientDataObj((prev)=>({...prev,docUrl:url,docName:fileUploaded.name}))
          })
         }
         )
        }
        uploadImage(file)
  };



    return  <> 
 <CModal visible={visible} onClose={() => setVisible(false)}>
       <CModalHeader>
        <CModalTitle>Successfully Save   <CIcon icon={icon.cilCheckAlt} size="xl" color="success"/></CModalTitle>
        </CModalHeader> 
</CModal>
<CModal  size="xl" alignment="center" scrollable visible={viewDoc} onClose={() => setViewDoc(false)}>
                            <CModalHeader>
                                <CModalTitle>Document View</CModalTitle>
                            </CModalHeader>
                            <CModalBody ref={componentRef} style={{ padding: '25px' }}>
                <div style={{minHeight:'100vh'}}>
                    <iframe
                        src={viewDocUrl}
                        frameBorder="0"
                        scrolling="auto"
                        width="100%"
                        height="600"
                    ></iframe>
                </div>                  
                            </CModalBody>
                            <CModalFooter>
                                <CButton color="primary" onClick={handlePrint}>Print</CButton>
                            </CModalFooter>
                        </CModal>




<CCard className="border-0">
<div>
        <CCardTitle><h4>Documents</h4></CCardTitle>
</div>

<CCardBody>
          <CCol className='my-3 text-end'>
                   {showForm&&<CButton onClick={()=>toToggaleFrom()}>Add New </CButton>}
                   {showForm||<CCard className="overflow-hidden my-4 text-start"   >
        <CCardHeader className="p-4" style={{ backgroundColor: '#0B5345', color: 'white' }}>
                 <CCardTitle> <h5>Documents Info Form</h5></CCardTitle>
        </CCardHeader>
    <div className="p-4">
         <CForm>
            <CCol className="d-flex justify-content-end">
                <CButton color='danger' onClick={()=>toToggaleFrom()}>Close</CButton>
            </CCol>
            <CRow>
            <CCol lg={6} md={6} sm={12}>
                                 <CFormSelect
                                    label="Staff Name"
                                    value={clientDataObj.empID}
                                    onChange={(e)=>setclientDataObj(prev=>({...prev,empID:e.target.value}))}                                  
                                >
                                    <option >Select</option>
                                    {staff.filter((list) => list.selected === 'Select').map((item, index) => (
                                       (
                                            <option key={index} value={item._id}>{item.FullName} {item.EmployeeID}</option>
                                        )
                                    ))}
                                </CFormSelect>
                            </CCol>
                            <CCol lg={6} md={6} sm={12}>
                                <CFormSelect
                                    label="Document Type"
                                    value={clientDataObj.docType}
                                    onChange={(e)=>setclientDataObj(prev=>({...prev,docType:e.target.value}))}                                
                                >
                                    <option >Select</option>
                                    <option>Club Agreement</option>
                                    <option>Address Proof</option>
                                    <option>ID Proof</option>
                                    <option>Club Agreement</option>
                                </CFormSelect>
                            </CCol>
                            <CCol lg={6} md={6} sm={12}>
                                <CFormInput
                                    className="mb-1 mr-3"
                                    type="Date"
                                    label="Date"
                                    value={clientDataObj.date}
                                    onChange={(e)=>setclientDataObj(prev=>({...prev,date:e.target.value}))} 
                                />
                            </CCol> 
                            <CCol lg={6} md={6} sm={12}>
                                <CFormInput
                                    className="mb-1 mr-3"
                                    type="file"
                                    label={`Upload Document ${uploadingProgress}%`} 
                                    onChange={handleChange}                                   
                                />
                            </CCol>    
             </CRow> 
          
                  <CCol className='mt-4'>
                    {updateActive?
                      <CButton onClick={()=>saveData('Update')} >Save Update</CButton>:          
                        <CButton onClick={()=>saveData('Save')} >Save</CButton>
                    }

                    </CCol>
         </CForm>
    </div>

      </CCard>}

                </CCol>
<CTable className='mt-3' align="middle" bordered  hover responsive>
                            <CTableHead color={'darkGreen'} >
                                      <CTableHeaderCell>Sr.No</CTableHeaderCell>
                                      <CTableHeaderCell>Date</CTableHeaderCell>
                                      <CTableHeaderCell>Staff</CTableHeaderCell>
                                      <CTableHeaderCell>Document Type</CTableHeaderCell>
                                      <CTableHeaderCell>View</CTableHeaderCell>
                                      <CTableHeaderCell>Action</CTableHeaderCell>
                            </CTableHead>
                            <CTableBody>


                              {clientDocData.map((el,i)=>
                              
                              <CTableRow className="text-center">
                                    <CTableDataCell>
                                         {i+1}
                                    </CTableDataCell>
                                    <CTableDataCell > 
                                        {new Date(el.date).toDateString()}            
                                    </CTableDataCell>

                                    <CTableDataCell>
                                        {el.staffName}
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        {el.docType}
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CButton size="sm" onClick={()=>{
                                            setViewDocUrl(el.docUrl)
                                            setViewDoc(true)
                                        }}>View</CButton>
                                    </CTableDataCell>
                                    <CTableDataCell >
                                      <MdEdit  onClick={()=>updateProduct(el)} />
                                      <MdDelete  onClick={()=>toDeleteData(el._id)}/>                                       
                                    </CTableDataCell>
                                                               
                                </CTableRow>
                              
                              )}
                                
                               
                            </CTableBody>
</CTable>
</CCardBody>

</CCard>
</>

}



export default Documents


















// import {
//     CButton,
//     CCardTitle,
//     CCol,
//     CForm,
//     CFormInput,
//     CFormSelect,
//     CRow,
//     CTable,
//     CTableBody,
//     CTableDataCell,
//     CTableHead,
//     CTableHeaderCell,
//     CTableRow,
// } from "@coreui/react";
// import axios from "axios";
// import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
// import moment from "moment";
// import React, { useEffect, useRef, useState } from "react";
// import { MdDelete } from "react-icons/md";
// import { Link, useNavigate } from "react-router-dom";
// import { storage } from "src/firebase";
// import { v4 } from "uuid";
// const url = 'https://yog-seven.vercel.app'
// const url2 = 'https://yog-seven.vercel.app'

// const Documents = ({ id }) => {

//     const [documentInfo,setDocuMentinfo] = useState({})
//     const [documentInfo2,setDocumet] = useState({})


//     let user = JSON.parse(localStorage.getItem('user-info'))
//     const token = user.token;
   
//     const headers = {
//         'Authorization': `Bearer ${token}`,
//         'My-Custom-Header': 'foobar',
//         'Content-Type': 'application/json',
//     };    

//     function  Document() {
//         axios.get(`${url2}/employeeForm/all`, {
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         })
//             .then((res) => {
//                 setStaff(res.data)
//             })
//             .catch((error) => {
//                 console.error(error)
//             })
//     }

//     function getGallery() {
//         axios.get(`${url}/emp/${id}`, {
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         })
//             .then((res) => {
//                 console.log(res.data)
//                 // setResult1(res.data.reverse())
//             })
//             .catch((error) => {
//                 console.error(error)
//             })
//     }

//     function createGallery() {
//         const imageRef = ref(storage, `images/${image.name + v4()}`);
//         uploadBytes(imageRef, image).then((snapshot) => {
//             getDownloadURL(snapshot.ref).then((url) => {
//                 setImageUrl(url)
//             });
//         });
//         if (imageUrl != null) {
//             const data = {
//                 userId: id,
//                 StaffName: name,
//                 Documenttype: type,
//                 UploadDocument: imageUrl,
//             }
//             axios.post(`${url}/Document/create`, data, { headers })
//                 .then((resp) => {
//                     alert('Successfully Added')
//                     getGallery()
//                     setAction1(false)
//                     setName('')
//                     setImageUrls('')
//                     setDescription('')
//                 })
//                 .catch((error) => console.log(error))
//         }

//     }
//     const handleImage = (e) => {
//         if (e.target.files[0]) {
//             const image1 = e.target.files[0];
//             setImage(image1)
//         }
//     }

//     const navi = useNavigate()
//     function deleteData(id) {
//         if (confirm('You want to delete this')) {
//             fetch(`${url}/Document/delete/${id}`, {
//                 method: 'DELETE',
//                 headers: {
//                     "Authorization": `Bearer ${token}`,
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json',
//                 },
//             }).then((result) => {
//                 result.json().then((resp) => {
//                     console.warn(resp)
//                     getGallery()
//                 })
//             })
//         }
//         return
//     }


//     return (
//         <CRow>
//             <CCol xs={12}>
//                 <div className='d-flex justify-content-between mb-2'>
//                     <div className='mt-2 ms-2'>
//                         <CCardTitle>Documents u</CCardTitle>
//                     </div>               
//                 </div>
//             </CCol>
//             <CForm className="mb-2">
//                 <div className="d-flex justify-content-between">
//                     <div></div>
//                     <div>
//                         <CRow>
//                             <CCol>
//                                 <CButton className="ms-1 mt-2" onClick={() => setAction1(!action1)}>{action1 ? 'close' : 'Add Document'}</CButton>
//                             </CCol>
//                         </CRow>
//                     </div>
//                 </div>
//                 {action1 &&
//                     <div>
//                         <CRow className='mt-3'>
//                             <CCol lg={6} md={6} sm={12}>
//                                 <CFormSelect
//                                     label="Staff Name"
//                                     value={name}
//                                     onChange={(e) => setName(e.target.value)}
//                                 >
//                                     <option >Select</option>
//                                     {staff.filter((list) => list.selected === 'Select').map((item, index) => (
//                                        (
//                                             <option key={index}>{item.FullName}</option>
//                                         )
//                                     ))}
//                                 </CFormSelect>
//                             </CCol>
//                             <CCol lg={6} md={6} sm={12}>
//                                 <CFormSelect
//                                     label="Document Type"
//                                     value={type}
//                                     onChange={(e) => setType(e.target.value)}
//                                 >
//                                     <option >Select</option>
//                                     <option>Club Agreement</option>
//                                     <option>Address Proof</option>
//                                     <option>ID Proof</option>
//                                     <option>Club Agreement</option>
//                                 </CFormSelect>
//                             </CCol>
//                             <CCol lg={12} md={12} sm={12}>
//                                 <CFormInput
//                                     className="mb-1 mr-3"
//                                     type="file"
//                                     label="Document Choose"
//                                     onChange={handleImage}
//                                     accept="image/*"
//                                 />
//                             </CCol>
//                             <CCol className="mt-2" lg={6} md={6} sm={12}>
//                                 <CButton className="mt-2" onClick={() => createGallery()}>Save</CButton>
//                             </CCol>
//                         </CRow>
//                     </div>
//                 }
//             </CForm>
//             <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
//                 <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
//                     <CTableRow >
//                         <CTableHeaderCell>Sr.No</CTableHeaderCell>
//                         <CTableHeaderCell>Date</CTableHeaderCell>
//                         <CTableHeaderCell>Name</CTableHeaderCell>
//                         <CTableHeaderCell>Document Type</CTableHeaderCell>
//                         <CTableHeaderCell>Image</CTableHeaderCell>
//                         <CTableHeaderCell>Action</CTableHeaderCell>
//                     </CTableRow>
//                 </CTableHead>
//                 <CTableBody>
//                     {result1.filter((list) => list.userId === id).map((item, index) => (
//                         <CTableRow key={index}>
//                             <CTableDataCell>{index + 1 + (paging * 10)}</CTableDataCell>
//                             <CTableDataCell>{moment(item.createdAt).format("MM-DD-YYYY")}</CTableDataCell>
//                             <CTableDataCell className="text-center">{item.StaffName}</CTableDataCell>
//                             <CTableDataCell>{item.Documenttype}</CTableDataCell>
//                             <CTableDataCell>{item.UploadDocument != null &&
//                                 <img width='100px' src={item.UploadDocument} />
//                             }
//                             </CTableDataCell>
//                             <CTableDataCell><MdDelete style={{ cursor: 'pointer', markerStart: '10px' }} onClick={() => deleteData(item._id)} size='20px' /></CTableDataCell>
//                         </CTableRow>
//                     ))}
//                 </CTableBody>
//             </CTable>

//         </CRow>
//     );
// };

// export default Documents;