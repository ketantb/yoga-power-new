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
    CTable,
    CTableRow,
    CTableHead,
    CTableDataCell,
    CTableHeaderCell,
    CTableBody,
    CFormTextarea

} from "@coreui/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "src/firebase";
import {getDownloadURL, ref,uploadBytesResumable } from "firebase/storage";
import { useSelector } from "react-redux";
import { useAdminValidation } from "src/views/Custom-hook/adminValidation";

const InvoiceMaster = () => {

    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;
    const [imageUrl, setImageUrl] = useState('')
    const [activeForm,setActiveForm] = useState(false)
    const pathVal = useAdminValidation('Master')

    const obj = {
        TNC:'',
        InvoiceLogo:'',
        InvoiceTitle:'',
        Address:""
    }

    const [invoiceMasterObj,setInvoiceMasterObj] = useState({...obj})
    const [invoiceData,setInvoiceData] =useState({...obj})

    const [imgPrograss,setImgPrograss] = useState(0)

    const url = useSelector((el) => el.domainOfApi)

    const headers = {
        "Authorization": `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
    
  const getInvoiceLogo = async ()=>{
    const response = await axios.get( `${url}/center-invoice-setup/${pathVal}`,{headers})
    if(response.status===200){
     setInvoiceData(response.data)   
     setInvoiceMasterObj(prev=>({...prev,...response.data})) 
    }
  }  

  useEffect(()=>{
    getInvoiceLogo()
  },[])

    const saveLogo = async  () => {
        try{
        let pathUrl  =  `${url}/center-invoice-setup/update/invoicelogo/${pathVal}`

        axios.patch(pathUrl,{...invoiceMasterObj,InvoiceLogo:imageUrl},{headers}).then((el)=>{
            alert('Successfully Save')
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
             const storageRef =   ref(storage,`invoice-logo/${fileUploaded.name}`)
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
                <CCardTitle>Invoice  Setup</CCardTitle>
            </CCardHeader>
            <CCardBody>
                <CCard className={activeForm?'p-4':'d-none'}>
                <CForm>
                    <div className="d-flex justify-content-end p-2">
                        <CButton color="danger" onClick={()=>{
                            setActiveForm(false)
                            setImageUrl('')
                        }}>Close</CButton>
                    </div>
                    <CRow>
                                <CCol lg={6} md={6} className='mt-4'> 
                                        <CFormInput
                                            className=" mr-3"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleChange}
                                            label={`Image Uploaded ${imgPrograss}%`}
                                        />
                                </CCol>
                                
                              <CCol lg={6} md={6} className='mt-4'>
                                        <CFormInput
                                            className=" mr-3"
                                            type="text"
                                            value={invoiceMasterObj.InvoiceTitle}
                                            onChange={(e)=>{
                                                setInvoiceMasterObj((prev)=>({...prev,InvoiceTitle:e.target.value}))
                                            }}
                                            label={`Invoice Title`}
                                        />   
                            </CCol>
                            <CCol lg={6} md={12} className='mt-4'>
                                        <CFormTextarea
                                            rows={3}
                                            className=" mr-3"
                                            type="text"
                                            value={invoiceMasterObj.TNC}
                                            onChange={(e)=>{
                                                setInvoiceMasterObj((prev)=>({...prev,TNC:e.target.value}))
                                            }}
                                            label={`TNC`}
                                        />   
                            </CCol>
                            <CCol lg={6} md={12} className='mt-4'>
                                        <CFormTextarea
                                            rows={3}
                                            className=" mr-3"
                                            type="text"
                                            value={invoiceMasterObj.Address}
                                            onChange={(e)=>{
                                                setInvoiceMasterObj((prev)=>({...prev,Address:e.target.value}))
                                            }}
                                            label={'Address'}
                                        />   
                            </CCol>
                    </CRow>
                    <CButton className="mt-2" onClick={saveLogo}>Save</CButton>

                </CForm>
                </CCard>
                 <div className={!activeForm?'d-flex justify-content-end p-2':'d-none'} >
                        <CButton onClick={()=>{
                            setActiveForm(true)
                        }}>Add On</CButton>
                    </div>
                
                <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                <CTableHead color={'darkGreen'} >
                    <CTableHeaderCell style={{width:'100px'}}>Invoice logo</CTableHeaderCell>
                    <CTableHeaderCell>Invoice Title</CTableHeaderCell>
                    <CTableHeaderCell>TNC</CTableHeaderCell>
                    <CTableHeaderCell>Address</CTableHeaderCell>
                </CTableHead>
                <CTableBody>
                        <CTableRow >
                            
                            <CTableDataCell>
                            <CImage width={'100px'}  className="mb-1" style={{ borderRadius: "50px" }} src={invoiceMasterObj.InvoiceLogo} />
                            </CTableDataCell>
                            <CTableDataCell>
                            {invoiceData.InvoiceTitle}
                            </CTableDataCell>
                            <CTableDataCell>
                            {invoiceData.TNC}
                            </CTableDataCell>
                            <CTableDataCell>
                            {invoiceData.Address}            
                            </CTableDataCell>
                            </CTableRow>
                </CTableBody>
            </CTable>
            </CCardBody>
        </CCard>
    );
};

export default InvoiceMaster;