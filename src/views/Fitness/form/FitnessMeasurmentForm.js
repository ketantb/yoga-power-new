import { CForm, CCard, CNav, CCol, CFormInput, CRow, CButton, CFormSelect } from "@coreui/react"
import { number } from "prop-types"
import { useRef,useState,useEffect } from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import CustomSelectInput from "../CustomSelectInput/CustomSelectInput"
import { useUniqAdminObjeact } from "src/views/Custom-hook/adminValidation"
import CustomSelectinput from "src/views/hr/CustomSelectinput"

function FitnessMeasurmentForm({allMemberData, closeFormFun, getAllmembersData,edit,editData,employeeData,id,setForm}) {
    const url = useSelector((el)=>el.domainOfApi) 
    const uniqObjVal = useUniqAdminObjeact()
    const obj = {
        username:'',
        Age:'',
        ArmsL:'',
        ArmsR:'',
        BMI:'',
        CalfL:'',
        CalfR:'',
        Chest:'',
        ContactNumber:'',
        Counseller:'',
        Member_ID:'',
        Fat:'',
        ForArms:'',
        Fullname:'',
        Height:'',
        Hips:'',
        Neck:'',
        Shoulder:'',
        ThighL:'',
        ThighR:'',
        Waist:'',
        Weight:'',
        createdAt:new Date(),
        updatedAt:'',
        NextFollowup_Date:'',
        ClientId:'',
       ...uniqObjVal
    }

    const [mesurmentData,setMesurmentData] = useState({...obj})


  

    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;
     
    

    const selectedMember = allMemberData.find((el)=>el._id===id?.trim())
    const selectedStaff = employeeData.find((el)=>el._id===uniqObjVal.employeeMongoId?.trim())
     
 

 const  sumbitFormInfoHandler = async (e)=>{
 e.preventDefault()

const  headers = {
    "Authorization": `Bearer ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}
if(editData?._id){
    axios.post(`${url}/fitnessDetail/update/${editData?._id}`,mesurmentData ,{headers}).then((res)=>{
        alert('Successfully save')
        getAllmembersData()
        setMesurmentData({...obj})
        setForm(false)
        }).catch((error)=>{
        console.log(error)
        })
}else{
   axios.post(`${url}/fitnessDetail/create`,{
    ...{...uniqObjVal,employeeMongoId:(selectedMember?._id||uniqObjVal.employeeMongoId)}
    ,...mesurmentData},{headers}).then((res)=>{
alert('Successfully save')
setMesurmentData({...obj})
setForm(false)
getAllmembersData()
}).catch((error)=>{
console.log(error)
}) 
}


 }

 function clientObj(obj){
   setMesurmentData( prev=>({...prev,
    ContactNumber:obj.ContactNumber,
    Fullname:obj.Fullname,
    Member_ID:obj._id,
    ClientId:obj.ClientId
}))
 }
 const getCounsellerInfo = (obj)=>{
    setMesurmentData((prev)=>({...prev,
        employeeMongoId:obj._id,
        empNameC:obj.FullName,
        Counseller:obj.FullName
    }))
}



 
 useEffect(()=>{
    if(selectedMember){
        clientObj(selectedMember) 
    }
    if(selectedStaff){
        getCounsellerInfo(selectedStaff)
    }
    if(!editData?._id)return 
    setMesurmentData({
        username: ' ',
        Age:editData.Age,
        ArmsL:editData.ArmsL,
        ArmsR:editData.ArmsR,
        BMI:editData.BMI,
        CalfL:editData.Calfl,
        CalfR:editData.CalfR,
        Chest:editData.Chest,
        ContactNumber:editData.ContactNumber,
        Counseller:editData.Counseller,
        Member_ID:editData.Member_ID,
        Fat:editData.Fat,
        ForArms:editData.ForArms,
        Fullname:editData.Fullname,
        Height:editData.Height,
        Hips:editData.Hips,
        Neck:editData.Neck,
        Shoulder:editData.Shoulder,
        ThighL:editData.ThighL,
        ThighR:editData.ThighR,
        Waist:editData.Waist,
        Weight:editData.Weight,
        createdAt:'',
        updatedAt:new Date(),
        NextFollowup_Date:editData.NextFollowup_Date,
        ...{...uniqObjVal,employeeMongoId:(selectedMember?._id||uniqObjVal.employeeMongoId)}
    })
    },[editData?._id,selectedMember?._id,selectedStaff?._id])



    return <CCard className="m-3 " >
        <CNav className="p-2 px-3" style={{ background: '#0B5345' }}>
            <h3 className="text-white"  >Measurment Form</h3>
        </CNav>
        <CForm className="p-3" onSubmit={(e)=>e.preventDefault()}>
            <CCol className="d-flex justify-content-end">
                <CButton className="bg-danger  text-black " onClick={() => closeFormFun()}> close</CButton>
            </CCol>
              <h4 style={{ marginBottom: '2rem' }}>Info


             </h4>
            <CRow className='mt-lg-4'>
                <CCol className='d-flex justify-content-between my-2' lg={6}>
                    <h5>Name</h5>
             

                  <div className="w-50">

                  <CustomSelectInput 
                  data={allMemberData?.filter((el)=>id?.trim()!=='all-client-fitness'?el._id===id?.trim():el)} 
                  title={mesurmentData?.Fullname?.trim()?mesurmentData?.Fullname:"Select client name"} 
                  getData={clientObj}
                  id={id}
                  />

                  </div>
                </CCol>

                <CCol className='d-flex justify-content-between my-2 ' lg={6} >
                    <h5 >Contact</h5>
                    <CFormInput
                        type="number"
                        className="ms-4 w-50"
                        placeholder="Enter your contact number"
                        value={mesurmentData.ContactNumber}
                    />
                </CCol>
            </CRow>



            <CRow className='mt-lg-4'>
                <CCol className='d-flex justify-content-between my-2' lg={6}>
                    <h5 >Waist</h5>
                    <CFormInput
                        type="text"
                        className="ms-4 w-50"
                        value={mesurmentData.Waist}
                        placeholder="Enter Waist"  
                        onChange={(e)=>setMesurmentData((prev)=>({...prev,Waist:e.target.value}))}                      
                    />
                </CCol>

                <CCol className='d-flex justify-content-between my-2 ' lg={6} >
                    <h5 >Weight</h5>
                    <CFormInput
                        type="number"
                        className="w-50"
                        placeholder="Enter Weight"
                        value={mesurmentData.Weight}
                        onChange={(e)=>setMesurmentData((prev)=>({...prev,Weight:e.target.value}))}                      
                      
                    />
                </CCol>
            </CRow>


            <CRow className='mt-lg-4'>
                <CCol className='d-flex justify-content-between my-2' lg={6}>
                    <h5 >Height</h5>
                    <CFormInput
                        type="number"
                        className="ms-4 w-50"
                        placeholder="Enter Your Height"
                        value={mesurmentData.Height}
                        onChange={(e)=>setMesurmentData((prev)=>({...prev,Height:e.target.value}))}                      

                    />
                </CCol>

                <CCol className='d-flex justify-content-between my-2 ' lg={6} >
                    <h5 >Age</h5>
                    <CFormInput
                        type="number"
                        className="w-50"
                        placeholder="Enter Your Age"
                        value={mesurmentData.Age}
                        onChange={(e)=>setMesurmentData((prev)=>({...prev,Age:e.target.value}))}   
                    />
                </CCol>
            </CRow>

            <CRow className='mt-lg-4'>
                <CCol className='d-flex justify-content-between my-2' lg={6}>
                    <h5 >Right Calf</h5>
                    <CFormInput
                        type="number"
                        className="ms-4 w-50"
                        placeholder="Enter about Your Right Calf"
                        value={mesurmentData.CalfR}
                        onChange={(e)=>setMesurmentData((prev)=>({...prev,CalfR:e.target.value}))}   
                    />
                </CCol>

                <CCol className='d-flex justify-content-between my-2 ' lg={6} >
                    <h5 >Left Calf</h5>
                    <CFormInput
                        type="number"
                        className="w-50"
                        placeholder="Enter about Your Left Calf"
                        value={mesurmentData.CalfL}
                        onChange={(e)=>setMesurmentData((prev)=>({...prev,CalfL:e.target.value}))}   

                    />
                </CCol>
            </CRow>

            <CRow className='mt-lg-4'>
               

                <CCol className='d-flex justify-content-between my-2' lg={6}>
                    <h5 >Neck</h5>
                    <CFormInput
                        type="text"
                        className="w-50"
                        placeholder="Enter Neck"
                        value={mesurmentData.Neck}
                        onChange={(e)=>setMesurmentData((prev)=>({...prev,Neck:e.target.value}))}   

                    />
                </CCol>
                <CCol className='d-flex justify-content-between my-2 ' lg={6} >
                    <h5 className="me-1">Hips</h5>
                    <CFormInput
                        type="text"
                        placeholder="Enter Hips"
                        className="w-50"
                        value={mesurmentData.Hips}
                        onChange={(e)=>setMesurmentData((prev)=>({...prev,Hips:e.target.value}))}
                    />
                </CCol>
            </CRow>

            <CRow className='mt-lg-4'>
                

                <CCol className='d-flex justify-content-between my-2' lg={6}  >
                    <h5 >Shoulder</h5>
                    <CFormInput
                        type="text"
                        className="w-50"
                        placeholder="Enter Shoulder"
                        value={mesurmentData.Shoulder}
                        onChange={(e)=>setMesurmentData((prev)=>({...prev,Shoulder:e.target.value}))}
                    />
                </CCol>
                <CCol className='d-flex justify-content-between my-2' lg={6} >
                    <h5 >Chest</h5>
                    <CFormInput
                        type="text"
                        className="w-50"
                        placeholder="Enter Chest"
                        value={mesurmentData.Chest}
                        onChange={(e)=>setMesurmentData((prev)=>({...prev,Chest:e.target.value}))}
                    />
                </CCol>
            </CRow>

            <CRow className='mt-lg-4'>
                <CCol className='d-flex justify-content-between my-2 ' lg={6}>
                    <h5 className="me-1">Left-Thigh</h5>
                    <CFormInput
                        type="text"
                        placeholder="Enter Left Thigh"
                        className="w-50"
                        value={mesurmentData.ThighL}
                        onChange={(e)=>setMesurmentData((prev)=>({...prev,ThighL:e.target.value}))}
                    />
                </CCol>

                <CCol className='d-flex justify-content-between my-2' lg={6}>
                    <h5 className="me-1">Right-Thigh</h5>
                    <CFormInput
                        type="text"
                        placeholder="Enter Right Thigh"
                        className="w-50"
                        value={mesurmentData.ThighR}
                        onChange={(e)=>setMesurmentData((prev)=>({...prev,ThighR:e.target.value}))}
                    />
                </CCol>



            </CRow>


            <CRow className='mt-lg-4'>
                <CCol className='d-flex justify-content-between my-2' lg={6} >
                    <h5 className="me-1">Left-Arms</h5>
                    <CFormInput
                        type="text"
                        placeholder="Enter Left Arms"
                        className="w-50"
                        value={mesurmentData.ArmsL}
                        onChange={(e)=>setMesurmentData((prev)=>({...prev,ArmsL:e.target.value}))}

                    />
                </CCol>

                <CCol className='d-flex justify-content-between my-2 ' lg={6} >
                    <h5 className="me-1">Right-Arms</h5>
                    <CFormInput
                        type="text"
                        placeholder="Enter Right Arms"
                        className="w-50"
                        value={mesurmentData.ArmsR}
                        onChange={(e)=>setMesurmentData((prev)=>({...prev, ArmsR:e.target.value}))}
                    />
                </CCol>


            </CRow>

            <CRow className='mt-lg-4'>
                <CCol className='d-flex justify-content-between my-2' lg={6}>
                    <h5 className="me-1">Forarms</h5>
                    <CFormInput
                        type="text"
                        placeholder="Enter about Your Forarms"
                        className="w-50"
                        value={mesurmentData.ForArms}
                        onChange={(e)=>setMesurmentData((prev)=>({...prev,ForArms:e.target.value}))}

                    />
                </CCol>

                <CCol className='d-flex justify-content-between my-2' lg={6}>

                </CCol>
            </CRow>

            <h3 style={{ marginBottom: '2rem' }}>BMI</h3>
            <CRow className='mt-lg-4'>
                <CCol className='d-flex justify-content-between my-2' lg={6}>
                    <h5 >Fat</h5>
                    <CFormInput
                        type="text"
                        className="w-50"
                        placeholder="Enter Fat"
                        value={mesurmentData.Fat}
                        onChange={(e)=>setMesurmentData((prev)=>({...prev,Fat:e.target.value}))}
                    />
                </CCol>

                <CCol className='d-flex justify-content-between my-2' >
                    <h5 className="me-1" >BMI</h5>
                    <CFormInput
                        type="text"
                        className="w-50"
                        placeholder="Enter BMI"
                        value={mesurmentData.BMI}
                        onChange={(e)=>setMesurmentData((prev)=>({...prev,BMI:e.target.value}))}

                    />
                </CCol>

            </CRow>


            <CRow className='mt-lg-4'>
                <CCol className='d-flex justify-content-between my-2' lg={6} >
                    <h5 className="me-1">Muscle</h5>
                    <CFormInput
                        type="text"
                        placeholder="Enter  Muscle"
                        className="w-50"
                    />

                </CCol>

                <CCol className='d-flex justify-content-between my-2' lg={6} >
                    <h5 className="me-1">Counsellor</h5>
                    <div className="w-50">
                    <CustomSelectinput
                     data={employeeData}
                     getData={getCounsellerInfo}
                     employeeId={uniqObjVal.employeeMongoId}
                    />
                    </div>
                </CCol>
            </CRow>
            <CRow className='mt-lg-4'>
                <CCol className='d-flex justify-content-between my-2' lg={6} >

                </CCol>

                <CCol className='d-flex justify-content-between my-2' lg={6} >
                    <h5 className="me-1">Next Follow Up Date</h5>
                    <CFormInput
                        className="w-50"
                        type="date"
                        value={mesurmentData.NextFollowup_Date}
                        onChange={(e)=>setMesurmentData((prev)=>({...prev,NextFollowup_Date:e.target.value}))}
                    />
                </CCol>
            </CRow>

        <CCol className="p-3">
            <CButton onClick={sumbitFormInfoHandler}>Save Measurments</CButton>
        </CCol>


        </CForm>
       
        <CCol className="d-flex justify-content-around p-1 text-white " style={{ background: '#0B5345' }}>
           
        </CCol>


    </CCard>




}

export default FitnessMeasurmentForm 