import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCardTitle,
    CCol,
    CForm,
    CFormInput,
    CImage,
    CInputGroup,
    CRow,
} from "@coreui/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileIcon from 'src/assets/images/avatars/profile_icon.png'
import { storage } from "src/firebase";
import {getDownloadURL, ref,uploadBytesResumable } from "firebase/storage";
import { useSelector } from "react-redux";

const LogoSetup = () => {

    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;
    const brandLogo = user.user.brandLogo
    const emailUniqId =  user.user.emailUniqId
    const isAdmin =  user.user.isAdmin
    const isAdminPatner =  user.user.isAdminPatner
    const createrId = user.user.createrId


    const [imageUrl, setImageUrl] = useState(brandLogo)
    const [imgPrograss,setImgPrograss] = useState(0)
    const navigate = useNavigate()

    const url = useSelector((el) => el.domainOfApi)

    const headers = {
        "Authorization": `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
    
   
  

    const saveLogo = async  () => {
        try{
        let data = { brandLogo: imageUrl }
        let pathUrl  = ''
        if(isAdmin || isAdminPatner){
            pathUrl = `${url}/signup/update/logo/${emailUniqId}`
        }else {
            pathUrl = `${url}/signup/update/logo/${createrId}`
        }
        axios.patch(pathUrl,data,headers).then((el)=>{
            alert('Successfully Save')
            console.log(el)
        })
        }catch(error){
            console.log(error)
        }   
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
                setImageUrl(url)
              })
             }
             )
            }
            uploadImage(file)
      };  
    


    return (
        <CCard className="mb-3 border-success">
            <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                <CCardTitle>Logo Setup</CCardTitle>
            </CCardHeader>
            <CCardBody>
                <CForm>
                    <CRow>
                        <CCol lg={2} md={3} className='mt-2 mb-1' >
                            <CImage  className="mb-1" style={{ borderRadius: "50px" }} width={'160px'} src={imageUrl} />
                        </CCol>
                        <CCol lg={6} md={6} className='mt-4'>
                            <CRow>
                                <CCol lg={12} md={6}>
                                        <CFormInput
                                            className=" mr-3"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleChange}
                                            label={`Image Uploaded ${imgPrograss}%`}
                                        />
                                </CCol>
                                
                            </CRow>
                        </CCol>
                    </CRow>
                    <CButton className="mt-2" onClick={saveLogo}>Save</CButton>
                    <CButton className="mt-2 ms-2" onClick={() => navigate('/master/center-setup')} >Cancel</CButton>
                </CForm>
            </CCardBody>
        </CCard>
    );
};

export default LogoSetup;