import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCardTitle,
    CCol,
    CForm,
    CFormCheck,
    CFormInput,
    CFormSelect,
    CFormSwitch,
    CFormTextarea,
    CImage,
    CInputGroup,
    CInputGroupText,
    CListGroup,
    CListGroupItem,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CNav,
    CNavItem,
    CNavLink,
    CRow,
    CTabContent,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CTabPane,
} from "@coreui/react";
import React, { useEffect, useRef, useState } from "react";
import { CountryList } from "src/components/CountryList";
import ProfileIcon from 'src/assets/images/avatars/profile_icon.png'
import axios from "axios";
import { getDownloadURL, ref,  uploadBytesResumable } from 'firebase/storage'
import { storage } from "src/firebase";
import { useSelector } from 'react-redux'
import moment from "moment/moment";
import { useAdminValidation,useUniqAdminObjeact } from "src/views/Custom-hook/adminValidation";
import { cilArrowCircleBottom} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import AddNewInvoice from './AddNewInvoice'

const AdmissionForm1 = ({ add, setAdmissionForm, ids, deleteId,getEnquiry }) => {
    

    const url1 = useSelector((el)=>el.domainOfApi) 
    const url = url1
    const unikqValidateObj = useUniqAdminObjeact()
    const pathValMaster = useAdminValidation('Master')
    const [imgPrograss,setImgPrograss] = useState(0)
    const [imageUrl, setImageUrl] = useState(null)
    const [clinetInfoData,setClientInfo] = useState({})


    const imgRef = useRef(null)
    const imageInput = useRef('')


    const clickfun =(type)=>{
        if(type.includes('btn btn-close')){
        setAdmissionForm(false)
        }
    }



    const componentRef = useRef()



    const [activeKey, setActiveKey] = useState(1)
    const [Fullname, setFullname] = useState('')
    const [CountryCode, setCountryCode] = useState('')
    const [ContactNumber, setContactNumber] = useState('')
    const [WhatsappNumber, setWhatsappNumber] = useState('')
    const [Email, setEmail] = useState('')
    const [Gender, setGender] = useState('')
    const [Anniversarydate, setAnniversarydate] = useState('')
    const [DateofBirth, setDateofBirth] = useState('')
    const [Address, setAddress] = useState('')
    const [Area, setArea] = useState('')
    const [city, setCity] = useState('')
    const [pincode, setPincode] = useState('')
    const [state, setState] = useState('')
    const [BloodGroup, setBloodGroup] = useState('')
    const [FacebookID, setFacebookID] = useState('')
    const [sms, setsms] = useState(true)
    const [mail, setmail] = useState(true)
    const [pushnotification, setpushnotification] = useState(true)
    const [Name, setName] = useState('')
    const [CountryCode1, setCountryCode1] = useState('')
    const [ContactNumber1, setContactNumber1] = useState('')
    const [Relationship, setRelationship] = useState('')
    const [Customertype, setCustomertype] = useState('')
    const [serviceName, setserviceName] = useState('')
    const [serviceVaration, setserviceVariation] = useState('')
    const [EnquiryType, setEnquiryType] = useState('')
    const [AssignStaff, setAssignStaff] = useState('')
    const [MemberManager, setMemberManager] = useState('')
    const [Batch, setBatch] = useState('')
    const [typeOFBatchClasses,setTypeOfBatchClasses] = useState('')
    const [GeneralTrainer, setGeneralTrainer] = useState('')
    const [AttendanceID, setAttendanceID] = useState('')
    const [CenterID, setCenterID] = useState('')
    const [LockerKeyNo, setLockerKeyNo] = useState('')
    const [PAN, setPAN] = useState('')
    const [AsthmaCOPD, setAsthmaCOPD] = useState(false)
    const [BackPain, setBackPain] = useState(false)
    const [BoneFracture, setBoneFracture] = useState(false)
    const [CarpalTunnel, setCarpalTunnel] = useState(false)
    const [Diabetes, setDiabetes] = useState(false)
    const [DigestiveDisorder, setDigestiveDisorder] = useState(false)
    const [Epilepsy, setEpilepsy] = useState(false)
    const [FootPain, setFootPain] = useState(false)
    const [Glaucoma, setGlaucoma] = useState(false)
    const [HeartDiseaseCondition, setHeartDiseaseCondition] = useState(false)
    const [HerniaDiastasisRecti, setHerniaDiastasisRecti] = useState(false)
    const [HighBloodPressure, setHighBloodPressure] = useState(false)
    const [Other, setOther] = useState(false)
    const [OtherText, setOtherText] = useState('')
    const [Weight, setWeight] = useState('')
    const [Height, setHeight] = useState('')
    const [fitnessLevel, setfitnessLevel] = useState('')
    const [fitnessGoal, setfitnessGoal] = useState('')
    const [idealWeight, setidealWeight] = useState('')
    const [suggestion, setsuggestion] = useState('')
    const [comments, setcomments] = useState('')
    const [subService,setService] = useState([])
    const [wantToGiveMony,setWantToGiveMony] = useState(false)
    const [batchesData,setBatches] = useState([])
    const [clientReferance,setClientReferance] = useState(
        {
            id:'',
            name:''
        }
    )
    const [leadArr, setLeadArr] = useState([]);
    const [staff, setStaff] = useState([])




    var currentdate = new Date();
    var datetime = currentdate.getDay() + "/" + currentdate.getMonth()
        + "/" + currentdate.getFullYear();



    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;
    const username = user.user.username;
    const isAdmin = user.user.isAdmin;
    const centerCode = user.user.centerCode;

    const [visi, setVisi] = useState(false);
    const [mem, setMem] = useState([]);

    const [packageArr, setPackageArr] = useState([]);
    useEffect(() => {
        getAdmisionRequireData()
        if(ids){
            getDetails(ids)
        }
    }, [ids._id])

   
    function getDetails(data) {
        setFullname((data.Fullname|| ' '))
        setEmail(( data.Emailaddress|| ' '))
        setCountryCode((data.CountryCode||' '))
        setContactNumber((data.ContactNumber||' '))
        setWhatsappNumber((data.ContactNumber||' '))
        setGender((data.Gander||' '))
        setDateofBirth((data.DateofBirth||' '))
        setAddress((data.address||' '))
        setArea((data.Area||''))
        setCity((data.city||' '))
        setName((data.person_Name||' '))
        setRelationship((data.Relation||''))
        setCountryCode1("+"+data.CountryCode2)
        setContactNumber1("+"+data.ContactNumber2)
        setserviceName((data.ServiceName||' '))
        setserviceVariation((data.ServiceVariation||' '))
        setAssignStaff((data.FullName||' '))
        setCustomertype((data.Customertype||' '))
        setEnquiryType((data.enquirytype||' '))
        setMemberManager((data.FullName||' '))
        setDateofBirth(data?.DateofBirth?moment(data?.DateofBirth).utc().format('YYYY-MM-DD'):'')     
        setImageUrl((data?.image||' '))   
        setClientReferance({
            id:(data?.ClientReferrenceId||' '),
            name:(data?.ClientReferenceName||' '),
        })
    }



    const getAdmisionRequireData = async  ()=>{
       try{
        const headers = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        const response1 =  axios.get(`${url}/Package/${pathValMaster}`,headers)
        const response2 =  axios.get(`${url}/leadSourceMaster/${pathValMaster}`,headers)
        const response3 =  axios.get(`${url1}/employeeForm/${pathValMaster}`,headers)
        const response4 =  axios.get(`${url1}/packageMaster/${pathValMaster}`,headers)
        const response5 =  axios.get(`${url1}/memberForm/${pathValMaster}`,headers)
        const response6 =  axios.get(`${url1}/Batch/${pathValMaster}`,headers)


        const allData = await Promise.all([response1,response2,response3,response4,response5,response6])

        const packageData = allData[0]?.data
        const leadSourseData = allData[1]?.data
        const staffData = allData[2]?.data
        const packageMaster = allData[3]?.data
        const memberFormData = allData[4]?.data
        const batchesData = allData[5]?.data

        setLeadArr(leadSourseData)
        setPackageArr(packageData)
        setStaff(staffData)
        setService(packageMaster)
        setMem(memberFormData)
        setBatches(batchesData)
        setAttendanceID(`CLA${memberFormData.length+1}`)
    }catch(error){
      console.log(error)  
    }
    }
    

    



    const HandaleImageClick = () =>{
        imageInput.current.click()
     }

     const handleImage = event => {
        const fileUploaded = event.target.files[0];
        const file = event.target.files[0] 
        const reader = new FileReader();
        if (!file.type.startsWith('image/')) return;

        reader.onload = (e) => {
            imgRef.current.src = e.target.result
        }
        reader.readAsDataURL(file)

            const uploadImage = (file)=>{
              if(!fileUploaded)return
             const storageRef =   ref(storage,`profile-photo/${fileUploaded.name}`)
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





      let num = 0

    const saveMember = () => {
        if(!AttendanceID){
           alert('AttendanceID  is Required please select AttendanceID') 
           return
        }
        if(!wantToGiveMony){
         alert('Admission Rejected ')
         clickfun(false)
         
         return 
        }
        
        if(num){ 
            return 
        }else if(!num){
            num++ 
        }
        
        let data = {
            username: username,
            image: imageUrl,
            Fullname, CountryCode, ContactNumber:(+ContactNumber),
            WhatsappNumber, Email, Gender, DateofBirth, 
            Anniversarydate, Address, Area, city, pincode, state, BloodGroup,
            FacebookID, sms, mail, pushnotification,
            Name, CountryCode1, ContactNumber1:(+ContactNumber1), Relationship,
            serviceName, serviceVaration, Customertype, EnquiryType,
            AssignStaff, MemberManager, Batch, GeneralTrainer, AttendanceID,
            CenterID, LockerKeyNo, PAN,
            BackPain, BoneFracture, CarpalTunnel, AsthmaCOPD, DigestiveDisorder,
            Diabetes, Epilepsy, FootPain, Glaucoma, HeartDiseaseCondition, HerniaDiastasisRecti,
            HighBloodPressure, Other: OtherText, Weight, Height, fitnessLevel,
            fitnessGoal, idealWeight, suggestion, comments, status: 'active',
            EnquiryId:ids._id,
            typeOFBatchClasses,...unikqValidateObj,
            isAdmin:isAdmin,ClientId:`${centerCode}MEM${10+mem.length}`,
            endDate:new Date(),startDate:new Date()            
        }

        if(clientReferance.name?.trim()&&clientReferance.id?.trim()){
            data = {...data,...{ClientReferenceName:(clientReferance.name||' '),ClientReferrenceId:(clientReferance.id||'')}}
        }


       const headers = {
            'Authorization': `Bearer ${token}`,
            'My-Custom-Header': 'foobar'
        };
                    
        axios.all([
            axios.post(`${url1}/enquiryForm/update/${ids._id}`, {
                enquirestatus:'notshow',
                enquiryConvertedDate:new Date()}, { headers}),
            axios.post(`${url1}/memberForm/create`, data, { headers },)]
            ).then((res) => {
                if(res[1].status===200){
                    setClientInfo(res[1].data);
                    alert("successfully submitted")
                    setVisi(true)
                    
                    num = 0
                    if (getEnquiry) {
                        getEnquiry()
                    }
                }               

        }).catch((error) => {
                console.error(error)
})
            
if (deleteId != undefined && deleteId != null) {
    fetch(`${url}/enquiryForm/delete/${deleteId}`, {
            method: 'DELETE',
            headers: {
                    "Authorization": `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
            },
            }).then((result) => {
                result.json().then((resp) => {
                    console.warn(resp)
                })
            })
        }
}


useEffect(()=>{
    const selectedStaff = staff.find((el)=>el._id===unikqValidateObj.employeeMongoId)


 setMemberManager((selectedStaff?.FullName||''))
 setAssignStaff((selectedStaff?.FullName||''))
},[unikqValidateObj.employeeMongoId,staff?.length])
    return (
        <div >
        <CModal 
        id='parent-model' 
        scrollable 
        fullscreen
        visible={(add && !visi )}
        onClick={(e)=>{ clickfun(e.target.className)}}>
            <CModalHeader  >
                <CModalTitle>Member Form</CModalTitle>
            </CModalHeader>
            <CModalBody className='p-4'>
            <div style={{overflowY:'scroll',height:'70vh'}} >
                <CCard className="mb-3 border-success">
                    <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                        <CNav variant="pills" role="tablist" className='d-flex'>
                            <CNavItem >
                                <CNavLink
                                    style={{ color: 'white' }}
                                    href="javascript:void(0);"
                                    active={activeKey === 1}
                                    onClick={() => setActiveKey(1)}
                                >
                                    Personal Information
                                </CNavLink>
                            </CNavItem>
                            <CNavItem >
                                <CNavLink
                                    style={{ color: 'white' }}
                                    href="javascript:void(0);"
                                    active={activeKey === 2}
                                    onClick={() => setActiveKey(2)}
                                >
                                    Fitness Profile
                                </CNavLink>
                            </CNavItem>
                        </CNav>
                    </CCardHeader>
                    <CCardBody>
                        <CTabContent>
                            <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
                                <CForm>
                                    <CRow>
                                        <CCol lg={6} sm={12}>
                                            <CCardTitle>Personal Details</CCardTitle>
                                            <CRow>
                                                <CCol sm={12} className='p-3'>
                                                    <CImage ref={imgRef} style={{ borderRadius: "100px" }} width={'200px'} src={imageUrl?imageUrl:ProfileIcon} className="me-4" />

                                                    <CFormInput
                                                        type="file"
                                                        onChange={handleImage}
                                                        accept="image/*"
                                                        ref={imageInput}
                                                        hidden
                                                    />
                                                    <CButton onClick={HandaleImageClick} > <CIcon icon={cilArrowCircleBottom} /> {imgPrograss}% Upload Image</CButton>
                                                </CCol>

                                                <CCol xs={6}>
                                                    <CFormInput
                                                        className="mb-1"
                                                        type="text"
                                                        id="exampleFormControlInput1"
                                                        label="Full name"
                                                        value={Fullname}
                                                        onChange={(e) => setFullname(e.target.value)}
                                                        placeholder="Enter Name"
                                                    />
                                                </CCol>
                                                <CCol>
                                                    <CFormInput
                                                        className="mb-1"
                                                        type="email"
                                                        id="exampleFormControlInput1"
                                                        label="Email address"
                                                        value={Email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        placeholder="name@example.com"
                                                        text="Must be 8-20 characters long."
                                                        aria-describedby="exampleFormControlInputHelpInline"
                                                    />
                                                </CCol>
                                            </CRow>
                                            <CRow>
                                                <CCol>
                                                    <CFormSelect
                                                        className="mb-1"
                                                        aria-label="Select Currency"
                                                        label="Country Code"
                                                        value={CountryCode}
                                                        onChange={(e) => setCountryCode(e.target.value)}
                                                    >{CountryList.map((item, index) => (
                                                        <option key={index} value={item.dial_code}>{item.name} {item.dial_code}</option>
                                                    ))}
                                                    </CFormSelect>
                                                </CCol>
                                                <CCol>
                                                    <CFormInput
                                                        className="mb-1"
                                                        type="number"
                                                        id="exampleFormControlInput1"
                                                        label="Contact Number"
                                                        value={ContactNumber}
                                                        onChange={(e) => setContactNumber(e.target.value)}
                                                        placeholder="Enter Number"
                                                    />
                                                </CCol>
                                            </CRow>
                                            <CRow>
                                                <CCol>
                                                    <CFormInput
                                                        className="mb-1"
                                                        type="number"
                                                        id="exampleFormControlInput1"
                                                        value={WhatsappNumber}
                                                        onChange={(e) => setWhatsappNumber(e.target.value)}
                                                        label="Whatsapp Number"
                                                        placeholder="Enter Number"
                                                    />
                                                </CCol>
                                                <CCol>
                                                    <CFormInput
                                                        className="mb-1"
                                                        type="date"
                                                        id="exampleFormControlInput1"
                                                        value={DateofBirth}
                                                        onChange={(e) => setDateofBirth(e.target.value)}
                                                        label="Date of Birth"
                                                        placeholder="Enter Date"
                                                    />
                                                </CCol>
                                            </CRow>
                                            <CRow>
                                                <CCol>
                                                    <CFormInput
                                                        className="mb-1"
                                                        type="date"
                                                        id="exampleFormControlInput1"
                                                        value={Anniversarydate}
                                                        onChange={(e) => setAnniversarydate(e.target.value)}
                                                        label='Anniversary Date'
                                                        placeholder="Enter Anniversary Date"
                                                    />
                                                </CCol>
                                                <CCol>
                                                    <CFormSelect
                                                        className="mb-1"
                                                        aria-label="Select Currency"
                                                        value={Gender}
                                                        onChange={(e) => setGender(e.target.value)}
                                                        label="Gender"
                                                        options={[
                                                            "Select Gender",
                                                            { label: "Male", value: "Male" },
                                                            { label: "Female", value: "Female" },
                                                            { label: "Other", value: "Other" },
                                                        ]}
                                                    />
                                                </CCol>
                                            </CRow>
                                            <CCol>

                                                <CFormTextarea
                                                    id="exampleFormControlTextarea1"
                                                    label="Address"
                                                    value={Address}
                                                    onChange={(e) => setAddress(e.target.value)}
                                                    rows="2"
                                                    text="Must be 8-20 words long."
                                                ></CFormTextarea>
                                            </CCol>
                                            <CRow>
                                                <CCol>
                                                    <CFormInput
                                                        className="mb-1"
                                                        type="text"
                                                        id="exampleFormControlInput1"
                                                        value={Area}
                                                        onChange={(e) => setArea(e.target.value)}
                                                        label="Area"
                                                        placeholder="Enter Locality"
                                                    />
                                                </CCol>
                                                <CCol>
                                                    <CFormInput
                                                        className="mb-1"
                                                        type="text"
                                                        value={city}
                                                        onChange={(e) => setCity(e.target.value)}
                                                        label="City"
                                                        placeholder="Enter City"
                                                    />
                                                </CCol>
                                            </CRow>
                                            <CRow>
                                                <CCol>
                                                    <CFormInput
                                                        className="mb-1"
                                                        type="number"
                                                        value={pincode}
                                                        onChange={(e) => setPincode(e.target.value)}
                                                        label="Pin Code"
                                                        placeholder="Enter Pin Code"
                                                    />
                                                </CCol>
                                                <CCol>
                                                    <CFormInput
                                                        className="mb-1"
                                                        type="text"
                                                        value={state}
                                                        onChange={(e) => setState(e.target.value)}
                                                        label="State"
                                                        placeholder="Enter State"
                                                    />
                                                </CCol>
                                            </CRow>

                                            <CRow>
                                                <CCol>
                                                    <CFormInput
                                                        className="mb-1"
                                                        type="url"
                                                        value={FacebookID}
                                                        onChange={(e) => setFacebookID(e.target.value)}
                                                        label="Facebook Id"
                                                        placeholder="Enter Facebook id"
                                                    />
                                                </CCol>
                                                <CCol>
                                                    <CFormSelect
                                                        className="mb-1"
                                                        aria-label="Select Blood Group"
                                                        value={BloodGroup}
                                                        onChange={(e) => setBloodGroup(e.target.value)}
                                                        label="Blood Group"
                                                        options={[
                                                            "Select Blood Group",
                                                            { label: "A+", value: "A+" },
                                                            { label: "A-", value: "A-" },
                                                            { label: "B+", value: "B+" },
                                                            { label: "B-", value: "B-" },
                                                            { label: "O+", value: "O+" },
                                                            { label: "O-", value: "O-" },
                                                            { label: "AB+", value: "AB+" },
                                                            { label: "AB-", value: "AB-" },
                                                        ]}
                                                    />
                                                </CCol>
                                            </CRow>
                                            <CCardTitle>Communication Preference Settings</CCardTitle>
                                            <CRow>
                                                <CCol xs={4}>
                                                    <CFormSwitch size="xl" label="SMS"
                                                        checked={sms}
                                                        onChange={() => setsms(!sms)} />
                                                </CCol>
                                                <CCol xs={4}>
                                                    <CFormSwitch size="xl" label="Mail"
                                                        checked={mail}
                                                        onChange={() => setmail(!mail)} />
                                                </CCol>
                                                <CCol xs={4}>
                                                    <CFormSwitch size="xl" label="Push Notification"
                                                        checked={pushnotification}
                                                        onChange={() => setpushnotification(!pushnotification)} />
                                                </CCol>
                                            </CRow>
                                        </CCol>

                                        <CCol lg={6} sm={12}>
                                            <CRow>
                                                <CCardTitle>Emergency contact</CCardTitle>
                                                <CCol xs={6}>
                                                    <CFormInput
                                                        className="mb-1"
                                                        type="text"
                                                        id="exampleFormControlInput1"
                                                        value={Name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        label="Name"
                                                        placeholder="Enter Name"
                                                    />
                                                </CCol>
                                                <CCol>
                                                    <CFormInput
                                                        className="mb-1"
                                                        type="text"
                                                        value={Relationship}
                                                        onChange={(e) => setRelationship(e.target.value)}
                                                        id="exampleFormControlInput1"
                                                        label="Relationship"
                                                        placeholder="Enter Relationship"
                                                    />
                                                </CCol>

                                                <CCol xs={6}>
                                                    <CFormSelect
                                                        className="mb-1"
                                                        aria-label="Select Working Days"
                                                        value={CountryCode1}
                                                        onChange={(e) => setCountryCode1(e.target.value)}
                                                        label="Country Code"
                                                    >{CountryList.map((item, index) => (
                                                        <option key={index} value={item.dial_code}>{item.name} {item.dial_code}</option>
                                                    ))}</CFormSelect>
                                                </CCol>
                                                <CCol xs={6}>
                                                    <CFormInput
                                                        className="mb-1"
                                                        type="number"
                                                        id="exampleFormControlInput1"
                                                        value={ContactNumber1}
                                                        onChange={(e) => setContactNumber1(e.target.value)}
                                                        label="Contact Number"
                                                        placeholder="Enter Number"
                                                    />
                                                </CCol>
                                            </CRow>
                                            <CRow>
                                                <CCardTitle>Lead Information</CCardTitle>
                                                <CCol xs={6}>
                                                    <CFormSelect
                                                        className="mb-1"
                                                        aria-label="Select Service Name"
                                                        value={serviceName}
                                                        onChange={(e) => setserviceName(e.target.value)}
                                                        label="Service Name"
                                                    >
                                                        <option>Select Name</option>
                                                        {[...subService].filter((el)=>el).map((item, index) => (
                                            (
                                               item.Status=== true && (
                                                    <option key={index}>{item.Service }</option>                                                  
                                                )
                                            
                                            )))}</CFormSelect>
                                                </CCol>
                                                <CCol xs={6}>
                                                    <CFormSelect
                                                        className="mb-1"
                                                        aria-label="Select Service Name"
                                                        value={serviceVaration}
                                                        onChange={(e) => setserviceVariation(e.target.value)}
                                                        label="Service Package"
                                                    >
                                                        <option>Service Package</option>
                                                            {[...subService].filter((list) =>
                                            list.Service=== serviceName
                                        ).map((item, index) => (
                                            (
                                                item.Status === true && (
                                                    <option key={index}>{item.Package_Name }</option>
                                                )
                                            )
                                        ))
                                    }</CFormSelect> 
                                    
                                                </CCol>

                                                <CCol xs={6}>
                                                    <CFormSelect
                                                        className="mb-1"
                                                        aria-label="Select Customer type"
                                                        value={Customertype}
                                                        onChange={(e) => setCustomertype(e.target.value)}
                                                        label="Customer type"
                                                        options={[
                                                            "Select Customer type",
                                                            { label: "Self", value: "Self" },
                                                            { label: "Group", value: "Group" },
                                                            { label: "Couple", value: "Couple" },
                                                            { label: "Youth", value: "Touth" },
                                                            { label: "Kids", value: "Kids" },
                                                        ]}
                                                    />
                                                </CCol>
                                                <CCol xs={6}>

                                                    <CFormSelect
                                                        className="mb-1"
                                                        aria-label="Select Assign Staff"
                                                        value={EnquiryType}
                                                        onChange={(e) => setEnquiryType(e.target.value)}
                                                        label="Enquiry Type"

                                                    >
                                                        <option>Select Enquiry Type</option>
                                                        {leadArr.filter((list) => list).map((item, index) => (
                                                            (
                                                                <option key={index}>{item.LeadSource}</option>
                                                            )
                                                        ))}</CFormSelect>
                                                </CCol>
                                            </CRow>

                                            <CRow>
                                                <CCardTitle>Member Manager</CCardTitle>
                                                <CCol xs={6}>
                                                    <CFormSelect
                                                        className="mb-1"
                                                        aria-label="Select Assign Staff"
                                                        value={AssignStaff}
                                                        onChange={(e) => setAssignStaff(e.target.value)}
                                                        label="Assign Staff"
                                                    >
                                                        <option>Select Assign Staff</option>
                                                        {staff.filter((list) => 
                                                         list.selected === 'Select').map((item, index) => (
                                                            <option key={index} value={item.FullName} >{[item.FullName,item.EmployeeID].join('\n')}</option>
                                                        ))}
                                                    </CFormSelect>
                                                </CCol>
                                                <CCol xs={6}>
                                                    <CFormSelect
                                                        className="mb-1"
                                                        aria-label="Select Member Manager"
                                                        value={MemberManager}
                                                        onChange={(e) => setMemberManager(e.target.value)}
                                                        label="Counselor"                                                     
                                                        
                                                    >
                                                         <option>Select Counselor</option>
                                                        {staff.filter((list) => 
                                                         list.selected === 'Select').map((item, index) => (
                                                            <option key={index}  value={item.FullName}>{[item.FullName,item.EmployeeID].join('\n')}</option>
                                                        ))}
                                                    </CFormSelect>
                                                </CCol>
                                                
                                             
                                                <CCol xs={6}>
                                                    <CFormSelect
                                                        className="mb-1"
                                                        aria-label="Select Batch"
                                                        value={typeOFBatchClasses}
                                                        onChange={(e) => setTypeOfBatchClasses(e.target.value)}
                                                        label="Type Of Classes"
                                                    >
                                                     
                                                 <option>Type of Class</option>     
                                                     {batchesData.filter((el)=>{
                                                        if(serviceName?.trim()){
                                                            return    el.service_variation?.trim()?.toLowerCase()===
                                                            serviceName?.trim()?.toLowerCase()
                                                        }
                                                        return true
                                                     }
                                                     )
                                                     .map((el)=>el.category).filter((el,i,arr)=>
                                                     i===arr.indexOf(el) 

                                                     
                                                     ).map((el)=>{
                                                           
                                                 return  <option > 
                                                     {el}

                                                  </option>                           
                                                     })}  
                                                        
                                                        </CFormSelect>

                                                </CCol>

                                                <CCol xs={6}>
                                                    <CFormSelect
                                                        className="mb-1"
                                                        aria-label="Select Batch"
                                                        value={Batch}
                                                        onChange={(e) => setBatch(e.target.value)}
                                                        label="Class Timeing"
                                                    >
                                                     
                                                 <option>Select Class Timeing</option>     
                                                     {batchesData.
                                                     filter((el)=>el.category === typeOFBatchClasses                                   
                                                     
                                                     ).map((el)=>{                                                          
                                                 return  <option > 
                                                    {el.batch_timing}  
                                                  </option>                           
                                                     })}  
                                                        
                                                        </CFormSelect>

                                                </CCol>


                                                <CCol xs={6}>
                                                    <CFormSelect
                                                        className="mb-1"
                                                        value={GeneralTrainer}
                                                        onChange={(e) => setGeneralTrainer(e.target.value)}
                                                        label="Trainer Name"
                                                           
                                                    >
                                                   <option>Select Trainer</option>     
                                                     {batchesData.filter((el)=>el.batch_timing === Batch).map((el)=>{
                                                 return  <option> {el.trainer_name} </option>                           
                                                     })}      

                                                    </CFormSelect>
                                                </CCol>
                                            </CRow>
                                            <CRow>
                                                <CCardTitle>IDs</CCardTitle>
                                                <CCol xs={6}>
                                                    <CFormSelect
                                                        className="mb-1"
                                                        type="text"
                                                        id="exampleFormControlInput1"
                                                        value={AttendanceID}
                                                        onChange={(e) => setAttendanceID(e.target.value)}
                                                        label="Attendance ID"
                                                    >
                                                        <option>Select Attendance ID</option>
                                                        <option value={`CLA${mem.length+1}`}>CLA{mem.length + 1}</option>
                                                    </CFormSelect>
                                                </CCol>
                                                <CCol xs={6}>
                                                    <CFormSelect
                                                        className="mb-1"
                                                        type="text"
                                                        id="exampleFormControlInput1"
                                                        value={CenterID}
                                                        onChange={(e) => setCenterID(e.target.value)}
                                                        label="Center ID">
                                                        <option>Select Center ID</option>
                                                        <option>{centerCode}</option>
                                                    </CFormSelect>
                                                </CCol>
                                                <CCol xs={6}>
                                                    <CFormInput
                                                        className="mb-1"
                                                        type="text"
                                                        id="exampleFormControlInput1"
                                                        value={LockerKeyNo}
                                                        onChange={(e) => setLockerKeyNo(e.target.value)}
                                                        label="Locker Key No"
                                                        placeholder="Enter Locker Key No"
                                                    />
                                                </CCol>
                                                <CCol xs={6}>
                                                    <CFormInput
                                                        className="mb-1"
                                                        type="text"
                                                        id="exampleFormControlInput1"
                                                        value={PAN}
                                                        onChange={(e) => setPAN(e.target.value)}
                                                        label="PAN"
                                                        placeholder="Enter PAN"
                                                    />
                                                </CCol>
                                            </CRow>

                                        </CCol>
                                    </CRow>
                                    <CRow className="mt-2">
                                        <CCardTitle className="mb-2">Injuries and conditions</CCardTitle>
                                        <CCol>
                                            <CListGroup>
                                                <CListGroupItem>
                                                    <CFormCheck label="Back Pain"
                                                        checked={BackPain}
                                                        onChange={() => setBackPain(!BackPain)} />
                                                </CListGroupItem>
                                                <CListGroupItem>
                                                    <CFormCheck label="Bone Fracture"
                                                        checked={BoneFracture}
                                                        onChange={() => setBoneFracture(!BoneFracture)} />
                                                </CListGroupItem>
                                                <CListGroupItem>
                                                    <CFormCheck label="Carpal Tunnel"
                                                        checked={CarpalTunnel}
                                                        onChange={() => setCarpalTunnel(!CarpalTunnel)} />
                                                </CListGroupItem>
                                                <CListGroupItem>
                                                    <CFormCheck label="Diabetes"
                                                        checked={Diabetes}
                                                        onChange={() => setDiabetes(!Diabetes)}
                                                    />
                                                </CListGroupItem>
                                            </CListGroup>
                                        </CCol>
                                        <CCol>
                                            <CListGroup>
                                                <CListGroupItem>
                                                    <CFormCheck label="Pregnancy"
                                                        checked={HeartDiseaseCondition}
                                                        onChange={() => setHeartDiseaseCondition(!HeartDiseaseCondition)} />
                                                </CListGroupItem>
                                                <CListGroupItem>
                                                    <CFormCheck label="Shoulder Pain"
                                                        checked={Epilepsy}
                                                        onChange={() => setEpilepsy(!Epilepsy)} />
                                                </CListGroupItem>
                                                <CListGroupItem>
                                                    <CFormCheck label="Foot Pain"
                                                        checked={FootPain}
                                                        onChange={() => setFootPain(!FootPain)} />
                                                </CListGroupItem>
                                                <CListGroupItem>
                                                    <CFormCheck label="Knee Replacement"
                                                        checked={Glaucoma}
                                                        onChange={() => setGlaucoma(!Glaucoma)} />
                                                </CListGroupItem>
                                            </CListGroup>
                                        </CCol>

                                        <CCol>
                                            <CListGroup>
                                                <CListGroupItem>
                                                    <CFormCheck label="Joint Pain"
                                                        checked={AsthmaCOPD}
                                                        onChange={() => setAsthmaCOPD(!AsthmaCOPD)} />
                                                </CListGroupItem>
                                                <CListGroupItem>
                                                    <CFormCheck label="Surgery"
                                                        checked={HerniaDiastasisRecti}
                                                        onChange={() => setHerniaDiastasisRecti(!HerniaDiastasisRecti)} />
                                                </CListGroupItem>
                                                <CListGroupItem>
                                                    <CFormCheck label="High Blood Pressure"
                                                        checked={HighBloodPressure}
                                                        onChange={() => setHighBloodPressure(!HighBloodPressure)} />
                                                </CListGroupItem>
                                                <CListGroupItem>
                                                    <CFormCheck label="Other"
                                                        checked={Other}
                                                        onChange={() => setOther(!Other)} />
                                                </CListGroupItem>
                                            </CListGroup>
                                        </CCol>
                                        
                                        

                                        {Other && (
                                            <CCol lg={12}>
                                                <CFormInput
                                                    className="mb-1"
                                                    type="text"
                                                    id="exampleFormControlInput1"
                                                    value={OtherText}
                                                    onChange={(e) => setOtherText(e.target.value)}
                                                    label="Other Reason"
                                                    placeholder="Enter Other Reason"
                                                />
                                            </CCol>
                                        )}
                                    </CRow>
                                     <CRow className="p-3">
                                                     <CFormSwitch size="xl" label="Want to Admission"
                                                        checked={wantToGiveMony}

                                                        onChange={() => setWantToGiveMony(!wantToGiveMony)} />
                                        </CRow>
                                            

                                    <CButton className='mt-2' onClick={() => saveMember()}>Next</CButton>
                                </CForm>
                            </CTabPane>
                            <CTabPane role="tabpane2" aria-labelledby="second-tab" visible={activeKey === 2}>
                                <CForm>
                                    <CRow>
                                        <CCol xs={6}>
                                            <CFormInput
                                                className="mb-1"
                                                type="text"
                                                id="exampleFormControlInput1"
                                                value={Height}
                                                onChange={(e) => setHeight(e.target.value)}
                                                label="Height"
                                                placeholder="Enter height"
                                            />
                                        </CCol>
                                        <CCol xs={6}>
                                            <CFormInput
                                                className="mb-1"
                                                type="text"
                                                id="exampleFormControlInput1"
                                                value={Weight}
                                                onChange={(e) => setWeight(e.target.value)}
                                                label="Weight"
                                                placeholder="Enter Weight"
                                            />
                                        </CCol>
                                        <CCardTitle>Fitness Goals</CCardTitle>

                                        <CCol xs={6}>
                                            <CFormSelect
                                                className="mb-1"
                                                aria-label="Select Currency"
                                                value={fitnessLevel}
                                                onChange={(e) => setfitnessLevel(e.target.value)}
                                                label="Fitness Level"
                                                options={[
                                                    "Select Fitness Level",
                                                    { label: "New", value: "1" },
                                                    { label: "Beginner", value: "2" },
                                                    { label: "Intermediate", value: "3" },
                                                    { label: "Advance", value: "4" },
                                                ]}
                                            />
                                        </CCol>
                                        <CCol xs={3}>
                                            <CFormSelect
                                                className="mb-1"
                                                value={fitnessGoal}
                                                onChange={(e) => setfitnessGoal(e.target.value)}
                                                aria-label="Select Currency"
                                                label="Fitness Goal"
                                                options={[
                                                    "Select Fitness Goal",
                                                    { label: "Weight loss", value: "Weight loss" },
                                                    { label: "Inch loss", value: "Inch loss" },
                                                    { label: "Fitness", value: "Fitness" },
                                                    { label: "Staminess", value: "Staminess" },
                                                ]}
                                            />
                                        </CCol>
                                        <CCol xs={3}>
                                            <CFormInput
                                                className="mb-1"
                                                value={idealWeight}
                                                onChange={(e) => setidealWeight(e.target.value)}
                                                type="text"
                                                id="exampleFormControlInput1"
                                                label="Ideal Weight"
                                                placeholder="Enter Ideal Weight"
                                            />
                                        </CCol>
                                        <CCol>
                                            <CFormTextarea
                                                id="exampleFormControlTextarea1"
                                                value={suggestion}
                                                onChange={(e) => setsuggestion(e.target.value)}
                                                label="Suggestion"
                                                rows="2"
                                                text="Must be 8-20 words long."
                                            ></CFormTextarea>
                                        </CCol>
                                        <CCol>

                                            <CFormTextarea
                                                id="exampleFormControlTextarea1"
                                                value={comments}
                                                onChange={(e) => setcomments(e.target.value)}
                                                label="Comments"
                                                rows="2"
                                                text="Must be 8-20 words long."
                                            ></CFormTextarea>
                                        </CCol>
                                    </CRow>

                                    <CButton className='mt-2' onClick={() => saveMember()}>Next</CButton>
                                </CForm>
                            </CTabPane>
                        </CTabContent>
                    </CCardBody>
                </CCard>
                </div>
            </CModalBody>   
            <CModalFooter>
                <CButton color="secondary" id="btn btn-close" onClick={(e)=>{e.stopPropagation(),clickfun(e.target.id)}}>
                    Close
                </CButton>
            </CModalFooter>
        </CModal>
        <AddNewInvoice data23={clinetInfoData}
                                   viewInvoice ={visi}
                                   setViewInvoice={setVisi}
                                   getDetails={()=>{}}     
                                   isFirstInoice={true}        
                                   id={clinetInfoData._id}
                                   clickfun={clickfun}
                                   />
        </div>
    )
}

export default AdmissionForm1
