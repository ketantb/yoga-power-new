import { CCard,CTable,CTableHead,CTableHeaderCell,CTableRow
    ,CTableBody,CTableDataCell,CCol,CRow,CButton,CForm,
    CCardHeader,CCardTitle,CFormInput,CCallout,CModal,
    CModalHeader,CModalTitle,CCardBody, CFormSelect,
    CDropdown,CDropdownMenu,CDropdownItem,CDropdownToggle,
    CInputGroup,CFormSwitch
 } from "@coreui/react"

 import React,{useEffect, useState,useRef} from 'react'
 import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import { useSelector } from "react-redux";
import axios from 'axios'
import { MdEdit,MdDelete } from "react-icons/md";
import { useReactToPrint } from "react-to-print";
import { Link } from "react-router-dom";
import { storage } from "src/firebase";
import {getDownloadURL, ref,uploadBytesResumable } from "firebase/storage";

function Centerpartners (){

  let user = JSON.parse(localStorage.getItem('user-info'))
  console.log(user);
  const token = user.token;
    const username = user.user.username
    const userID = user.user.emailUniqId



  const url = useSelector((el) => el.domainOfApi)


const componentRef = useRef()

const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'yog-power',
    onAfterPrint: () => alert('print success')
})

  const obj = {username:'',email:'',profileLogo: '',center: '',centerCode: '',
               partnerName: '',typeOfPartner: '',location: '',startDate: '',
               expDate: '',numberOfMY:0,typeOfNum:'Month',password: '',status:true,
               Designation:'',empName:'',empId:'',mobNo:0,createdBy:username,createrId:userID,
               isAdmin:false,isAdminPatner:true,isEmployee:false,packege:'',memBerId:'',brandLogo:'', 
               city:'',country:'',superAdminUniqId:user.user.isAdmin?user.user.superAdminUniqId:''
              }

  const numberOfdayPack = {
    Month:30,
    Year:365,
  }             



    const [showForm,setForm] = useState(true)
    const [visible, setVisible] = useState(false)
    const [centerPartnerData,setCenterPartnerData] = useState([])
    const [updateActive,setUpdateActive] = useState(false)
    const [imgPrograss,setImgPrograss] = useState(0)
    const [centerPartnersObj,setCenterPartnersObj] = useState({...obj})


   
   const headers = {
    "Authorization": `Bearer ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
   }

   

  
  const getCenterPartner = ()=>{
   axios.get(`${url}/signup/center-patner`,{headers}).then((el)=>{
    console.log(el.data)
    if(!el.data){
     return 
    }
    setCenterPartnerData(el.data)
  }).catch((error)=>{console.log(error)})
  }

  const saveData = async (type)=>{
    let response ={}
    console.log(centerPartnersObj)
    try{
      if(type==='Save'){
        response = await  axios.post(`${url}/signup/create`,centerPartnersObj,{headers})
      }
      if(type==='Update'){
       response = await  axios.post(`${url}/signup/update/${centerPartnersObj._id}`,centerPartnersObj,{headers})
      }
  
     if(response?.status===200){
      getCenterPartner()
      alert('successfully save')
     }
      }catch(error){
        console.error(error)
      }
  }


  useEffect(()=>{
    getCenterPartner()
  },[])

  function toToggaleFrom(){
   setForm((prev=>!prev))
    setUpdateActive(false)
    setCenterPartnersObj({...obj})
  }
  

  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    const file = event.target.files[0]

     
        const uploadImage = (file)=>{
          if(!fileUploaded)return
         const storageRef =   ref(storage,`center-partner-logo/${fileUploaded.name}`)
         const uploadTask = uploadBytesResumable(storageRef,fileUploaded)
  
         uploadTask.on("state_changed",(snapshot)=>{
          const prog = Math.round((snapshot.bytesTransferred/snapshot.totalBytes) *100)
          setImgPrograss(prog)
  
         },(error)=>{
          console.log(error)
         },
         ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
            setCenterPartnersObj((prev)=>({...prev,brandLogo:url}))
          })
         }
         )
        }
        uploadImage(file)
  };  


  const toDeleteData= async (id)=>{
    if(!confirm('Do u want to delete this')){
    return
    }
    
    const response = await  axios.delete(`${url}/signup/delete/${id}`, {headers})
    if(response.status===200){
      getCenterPartner()
    }
    
    }


    const updateProduct = async (item)=>{
      const packVal = item.packege.split(" ")
      setForm(false)
      setCenterPartnersObj({...item,numberOfMY:packVal[0],typeOfNum:packVal[2],
        startDate:(new Date(item.startDate).toISOString().split('T')[0] )})
      setUpdateActive(true)
     
    }

    const {startDate,numberOfMY,typeOfNum} =centerPartnersObj
    useEffect(()=>{
    
    if(numberOfMY&&typeOfNum&&startDate){


    const noOffDate  = (new Date(startDate).getDate() +(numberOfMY * numberOfdayPack[typeOfNum]))

    const date2= new Date(startDate)
    date2.setDate(noOffDate)
    setCenterPartnersObj(
      prev=>(
          {...prev,
          packege:(`${numberOfMY}  ${typeOfNum}`),
          expDate:date2.toISOString().split('T')[0]  
        })) 
    }
    },[startDate,numberOfMY,typeOfNum])


    function toUppdateSwitch(val,id,el){
      el.status = !val
      axios.post(`${url}/signup/update/${id}`,el,{headers}).then((res)=>{
        if(res.status===200){
          getCenterPartner()
        }
      })
    }


    return  <> 
 <CModal visible={visible} onClose={() => setVisible(false)}>
       <CModalHeader>
        <CModalTitle>Successfully Save   <CIcon icon={icon.cilCheckAlt} size="xl" color="success"/></CModalTitle>
        </CModalHeader> 
</CModal>




<CCard >
<CCardHeader style={{ backgroundColor: "#0B5345", color: "white" }} className='p-3'>
        <CCardTitle><h4>Center Partners </h4></CCardTitle>
</CCardHeader>

<CCardBody>
                <CCol className='my-3 text-end'>
                   {showForm&&<CButton onClick={()=>toToggaleFrom()}>Add New </CButton>}
                   {showForm||<CCard className="overflow-hidden my-4 text-start"   >
        <CCardHeader className="p-4" style={{ backgroundColor: '#0B5345', color: 'white' }}>
                 <CCardTitle> <h5>Center Partners</h5></CCardTitle>
        </CCardHeader>
    <div className="p-4">
         <CForm>
            <CCol className="d-flex justify-content-end">
                <CButton color='danger' onClick={()=>toToggaleFrom()}>Close</CButton>
            </CCol>
            <CRow>
              <CCol md={4}>
                <CFormInput
                  type="file"
                  placeholder="Enter Shift Name"
                  label={`Upload Logo ${imgPrograss}%`}
                  onChange={(e)=>handleChange(e)}
                />
              </CCol>
              <CCol md={4}>
                <CFormInput
                  type="text"
                  label='Center Name'
                  value={centerPartnersObj.center}
                  onChange={(e)=>{
                    setCenterPartnersObj((prev)=>({...prev,center:e.target.value}))
                  }}
                />
              </CCol>
              <CCol md={4}>
              <CFormInput
                  type="text"
                  label='Center Code'
                  value={centerPartnersObj.centerCode}
                  onChange={(e)=>setCenterPartnersObj((prev)=>({...prev,centerCode:e.target.value}))}
              
                />
             
              </CCol>
            </CRow> 
            <CRow >
            <CCol md={4} className="mt-2">
              <CFormInput
                  type="text"
                  label='Partner Name'
                  value={centerPartnersObj.empName}
                  onChange={(e)=>{
                    setCenterPartnersObj((prev)=>({...prev,empName:e.target.value,username:e.target.value}))
                  }}
              
                />
              </CCol>
              <CCol md={4} className="mt-2">
              <CFormInput
                  type="number"
                  label='Contact'
                  value={centerPartnersObj.mobNo}
                  onChange={(e)=>setCenterPartnersObj((prev)=>({...prev,mobNo:e.target.value}))}
              
                />
              </CCol>

              <CCol md={4} className="mt-2">
              <CFormSelect
                  type="text"
                  label='Partner type'
                  value={centerPartnersObj.typeOfPartner}
                  onChange={(e)=>setCenterPartnersObj((prev)=>({...prev,typeOfPartner:e.target.value}))}             
                >
                  <option value=''>Select Type Of Partner</option>
                  <option>Franchise Partner </option>
                  <option>Softwere Partner</option>

                  
                </CFormSelect>
              </CCol>
              

            </CRow>    

        <CRow >
            
              <CCol md={4} className="mt-2">
              <CFormInput
                  type="text"
                  label='Location'
                  value={centerPartnersObj.location}
                  onChange={(e)=>setCenterPartnersObj((prev)=>({...prev,location:e.target.value}))}   
                />
              </CCol>
              <CCol md={4} className="mt-2">
              <CFormInput
                  type="text"
                  label='City'
                  value={centerPartnersObj.city}
                  onChange={(e)=>setCenterPartnersObj((prev)=>({...prev,city:e.target.value}))}                 
                />
              </CCol>

              <CCol md={4} className="mt-2">
              <CFormInput
                  type="text"
                  label='Country'
                  value={centerPartnersObj.country}
                  onChange={(e)=>setCenterPartnersObj((prev)=>({...prev,country:e.target.value}))}    
                />
              </CCol>
        </CRow>    

        <CRow >
            
              <CCol md={4} className="mt-2">
    

<label>Packege</label>
<CInputGroup className="mb-3 mt-2">
  <CFormInput aria-label="Text input with dropdown button" 
   value={centerPartnersObj.numberOfMY}
   onChange={(e)=>setCenterPartnersObj((prev)=>({...prev,numberOfMY:e.target.value}))}  
   type="number"   
  />

  <CDropdown alignment="end" variant="input-group">
    <CDropdownToggle color={"dark"} variant="outline" className="text-end" style={{width:'100px'}}> {centerPartnersObj.typeOfNum}</CDropdownToggle>
    <CDropdownMenu>
      <CDropdownItem  onClick={(e)=>setCenterPartnersObj((prev)=>({...prev,typeOfNum:'Month'}))} >Month</CDropdownItem>
      <CDropdownItem  onClick={(e)=>setCenterPartnersObj((prev)=>({...prev,typeOfNum:'Year'}))} >Year</CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</CInputGroup>

              </CCol>

              <CCol md={4} className="mt-2">
              <CFormInput
                  type="date"
                  label='Start Date'
                  value={centerPartnersObj.startDate}
                  onChange={(e)=>setCenterPartnersObj((prev)=>({...prev,startDate:e.target.value}))}   
                />
              </CCol>
              <CCol md={4} className="mt-2">
              <CFormInput
                  type="date"
                  label='EXP. Date'
                  value={centerPartnersObj.expDate}
                />
              </CCol>

              <CCol md={4} className="mt-2">
              <CFormInput
                  type="email"
                  label='Email Id'
                  value={centerPartnersObj.email}
                  onChange={(e)=>setCenterPartnersObj((prev)=>({...prev,email:e.target.value}))}   

                 
                />
              </CCol>
              <CCol md={4} className="mt-2">
              <CFormInput
                  type="password"
                  label='Password'
                  value={centerPartnersObj.password}
                  onChange={(e)=>setCenterPartnersObj((prev)=>({...prev,password:e.target.value}))}  
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
    <CCol style={{ backgroundColor: '#0B5345'}} className='p-1'>

    </CCol>
      </CCard>}

                </CCol>
<CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345",width:'150%' }} hover responsive>
                            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                                <CTableRow >
                                    <CTableHeaderCell>Sr.No</CTableHeaderCell>
                                    <CTableHeaderCell>Brand Logo</CTableHeaderCell>
                                    <CTableHeaderCell>Center Name</CTableHeaderCell>
                                    <CTableHeaderCell>Center Code</CTableHeaderCell>
                                    <CTableHeaderCell>Email ID</CTableHeaderCell>
                                    <CTableHeaderCell>Partner Name</CTableHeaderCell>
                                    <CTableHeaderCell>Contact </CTableHeaderCell>
                                    <CTableHeaderCell>Partner Type</CTableHeaderCell>
                                    <CTableHeaderCell>Location</CTableHeaderCell>
                                    <CTableHeaderCell>City</CTableHeaderCell>
                                    <CTableHeaderCell>Country</CTableHeaderCell>
                                    <CTableHeaderCell>Start Date</CTableHeaderCell>
                                    <CTableHeaderCell>Status</CTableHeaderCell>
                                    <CTableHeaderCell>Rights</CTableHeaderCell>
                                    <CTableHeaderCell>EXP. Date</CTableHeaderCell>
                                    <CTableHeaderCell>Packege</CTableHeaderCell>
                                    <CTableHeaderCell>Edit</CTableHeaderCell>
                                </CTableRow>

                            </CTableHead>
                            <CTableBody>  

          
                              {centerPartnerData.map((el,i)=>
                              
                              <CTableRow className="text-center"  >
                              <CTableDataCell>
                                {i+1}
                              </CTableDataCell>
                              <CTableDataCell >
                                <div 
                                className="border-gray rounded-circle"
                                style={{width:'100px'}}
                                >
                                  <img
                                  width='100%'
                                  src={el.brandLogo}
                                  />

                                </div>
                              </CTableDataCell>
                              <CTableDataCell>   
                                {el.center}                                 
                              </CTableDataCell>
                              <CTableDataCell>  
                                {el.centerCode}           
                              </CTableDataCell>
                              <CTableDataCell>   
                                {el.email}                                 
                              </CTableDataCell>
                            
                              <CTableDataCell>  
                                {el.username}                                                                      
                              </CTableDataCell>   
                              <CTableDataCell>   
                                {el.mobNo}          
                              </CTableDataCell>
                              <CTableDataCell>     
                                {el.typeOfPartner}                                                                   
                              </CTableDataCell> 
                              <CTableDataCell>     
                                {el.location}        
                              </CTableDataCell>
                              <CTableDataCell>   
                                {el.city}                                                                     
                              </CTableDataCell>  
                              <CTableDataCell>   
                                {el.country}          
                              </CTableDataCell>                               

                              <CTableDataCell>  
                                {new Date(el.startDate).toDateString()}                                                                      
                              </CTableDataCell> 
                              
                              <CTableDataCell >  
                                 <CFormSwitch style={{cursor:'pointer'}} size="xl"  onClick={()=>toUppdateSwitch(el.status,el._id,el)} checked={el.status} />             
                              </CTableDataCell> 

                              <CTableDataCell>
                              <CButton size='sm'><Link style={{textDecoration:'none',color:'white'}}
                                   to={`/hr/member-rightshr/${el._id}`}>View</Link></CButton>
                              </CTableDataCell>
                              <CTableDataCell>    
                                 {new Date(el.expDate).toDateString()}                                                                               
                              </CTableDataCell>
                              <CTableDataCell>    
                                {el.packege}                                                                    
                              </CTableDataCell>                                                
                              <CTableDataCell>     
                                <MdEdit onClick={()=>updateProduct(el)} className="me-1"/>
                                <MdDelete onClick={()=>toDeleteData(el._id)}/>                                                                   
                              </CTableDataCell>  
                          </CTableRow>
                              
                              )}                            
                        
                            </CTableBody>
</CTable>
</CCardBody>

</CCard>
</>

}



export default Centerpartners