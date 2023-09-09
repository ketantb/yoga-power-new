import { CButton, CCard, CCardBody, CCardHeader,
         CCardTitle, CCol, CForm, CFormInput,
         CFormSelect, CFormTextarea, CImage, CRow,    
} from '@coreui/react'
import axios from 'axios'
import { getDownloadURL, ref,  uploadBytesResumable } from 'firebase/storage'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProfileIcon from 'src/assets/images/avatars/profile_icon.png'
import { storage } from 'src/firebase'
import { v4 } from 'uuid'
import { useSelector } from 'react-redux';
import { cilArrowCircleBottom} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useUniqAdminObjeact,useAdminValidation } from '../Custom-hook/adminValidation'
import { CountryList } from 'src/components/CountryList'

const Recruitment = () => {

    const url1 = useSelector((el) => el.domainOfApi)
    const url2 =url1
    const valdationObj = useUniqAdminObjeact() 
    const pathValMaster = useAdminValidation('Master')
    
    const [error, setError] = useState('')
    const [image, setImage] = useState('')
    const [imageUrl, setImageUrl] = useState(null)
    const [Fullname, setFullname] = useState('')
    const [age, setAge] = useState('')
    const [ContactNumber, setContactNumber] = useState('')
    const [Designation, setDesignation] = useState('')
    const [Email, setEmail] = useState('')
    const [Gender, setGender] = useState('')
    const [resume, setResume] = useState(null)
    const [resumeUrl, setResumeUrl] = useState(null)
    const [Department, setDepartment] = useState('')
    const [Address, setAddress] = useState('')
    const [Area, setArea] = useState('')
    const [city, setCity] = useState('')
    const [pincode, setPincode] = useState('')
    const [state, setState] = useState('')
    const [Salary, setSalary] = useState('')
    const [Source, setSource] = useState('')
    const [grade, setgrade] = useState('')
    const [comment, setComment] = useState('')

    const [imgPrograss,setImgPrograss] = useState(0)
    const [resumePrograss,setResumePrograss] = useState(0)
    const [CountryCode2,setCountryCode2]= useState()


    const resumeInput = useRef('')
    const imageInput = useRef('')
  



    const navigate = useNavigate()
    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;
    const username = user.user.username;

    useEffect(() => {
        getLeadSource()
    }, [])
    const [leadArr, setLeadArr] = useState([]);
    
    function getLeadSource() {
        axios.get(`${url2}/leadSourceMaster/${pathValMaster}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                setLeadArr(res.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const [result, setResult] = useState([])


    function getDesignation() {
        axios.get(`${url1}/designation/${pathValMaster}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                setResult(res.data.reverse())

            })
            .catch((error) => {
                console.error(error)
            })
    }

useEffect(()=>{
    getDesignation()
},[])


    const saveRecruitment = (e) => {
        e.preventDefault()
        console.log(e)
        if (imageUrl !== null && resumeUrl !== null  &&  Fullname !== '' && Salary !== '' &&
            Email !== ''  && pincode !== '' && state !== ''  && Gender !== '' && Address !== '') {

            let data = {
                username: username ,
                image: imageUrl,
                FullName: Fullname, EmailAddress: Email, ContactNumber,                
                Gender: Gender, address: Address, Area, city, 
                resume:  resumeUrl, PinCode: pincode, State: state,
                PayoutType: Source, Grade: grade, Comment: comment, 
                JobDesignation: Designation, Department: Department, Salary: Salary,
                status: false,whatsappNumber: 0,
                DateofBirth:new Date(),Age:age,EmployeeCategory: "",loginAccess: false,
                Anniversary: new Date(),AdminRights: "",joiningDate:"",EmployeeID: "",AttendanceID: "",
                AccountNo: "",IFSC: "",PANCardNumber:"",AadharNumber: 0,PANCard:"",AadharCard: "",
                selected: "",OfferLetter: "",AppoinmentLetter:"",Indexion: "",
                resumeName:resume,CountryCode:CountryCode2
            }

            fetch(`${url1}/employeeForm/create`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...valdationObj,...data})
            }).then((resp) => {
                resp.json().then(() => {
                    setImageUrl(null)
                    setFullname('')
                    setAge('')
                    setContactNumber('')
                    setDesignation('')
                    setEmail('')
                    setGender('')
                    setResumeUrl('')
                    setDepartment('')
                    setAddress('')
                    setArea('')
                    setCity('')
                    setPincode('')
                    setSalary('')
                    setSource('')
                    setgrade('')
                    setComment('')
                    setImgPrograss(0)
                    setResumePrograss(0)
                    alert("successfully submitted")
                })
            })
        } else {
            setError('Please Fill All Details')
        }
    }



    const imgRef = useRef(null)

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

   

    const HandaleResumeInputChange = event => {
        const file = event.target.files[0] 
             setResume(file.name)
            const uploadResume = (file)=>{
              if(!file)return
             const storageRef =   ref(storage,`resume/${file.name}`)
             const uploadTask = uploadBytesResumable(storageRef,file)
      
             uploadTask.on("state_changed",(snapshot)=>{
              const prog = Math.round((snapshot.bytesTransferred/snapshot.totalBytes) *100)
              setResumePrograss(prog)
      
             },(error)=>{
              console.log(error)
             },
             ()=>{
              getDownloadURL(uploadTask.snapshot.ref).then((url)=>{

               setResumeUrl(url)
              })
             }
             )
            }
            uploadResume(file)
      };

      const HandaleResumeInputClick  = () =>{
         resumeInput.current.click()
    }



    return (
        <>
           <CRow className='mb-2 ms-2'>
                <CCard color={'primary'} 
                style={{ padding: '10px', color: '#ffffff', width: '100px', margin: '3px', cursor: 'pointer' }}
                >
                    Step-1
                </CCard>
            </CRow>
                <CCard>
                    <CCardHeader>
                        <CCardTitle>Recruitment Application</CCardTitle>
                    </CCardHeader>
                    <CCardBody>
                        <form onSubmit={saveRecruitment}>
                            
                            <CRow>
                                <CCol lg={3} sm={6} className='mt-2 mb-1' >
                                    <CImage ref={imgRef} className="mb-1" style={{ borderRadius: "100px" }} width={'200px'} src={ProfileIcon} />
                                </CCol>
                                <CCol lg={8} sm={6} className='mt-5'>
                                    <CFormInput
                                        className="mb-1 mr-3"
                                        type="file"
                                        onChange={handleImage}
                                        accept="image/*"
                                        ref={imageInput}
                                        hidden
                                    />
                                    <CButton  onClick={HandaleImageClick} > <CIcon icon={cilArrowCircleBottom} /> {imgPrograss}% Upload Image</CButton>

                                </CCol>
                                <CCol lg={6} md={6} sm={12}>
                                    <CFormInput
                                        className="mb-1"
                                        type="text"
                                        id="exampleFormControlInput1"
                                        label="Full name"
                                        value={Fullname}
                                        onChange={(e) => setFullname(e.target.value)}
                                        placeholder="Enter Name"
                                        required
                                    />
                                </CCol>
                                <CCol lg={6} md={6} sm={12}>
                                    <CFormInput
                                        className="mb-1"
                                        type="number"
                                        id="exampleFormControlInput1"
                                        label="Contact Number"
                                        maxLength={10}
                                        value={ContactNumber}
                                        onChange={(e) => setContactNumber(e.target.value)}
                                        placeholder="Enter Contact Number"
                                        required
                                    />
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol lg={5} md={6} sm={12}>
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
                                        required
                                    />
                                </CCol>
                                <CCol lg={4} md={6} sm={8}>
                                    <CFormSelect
                                        className="mb-1"
                                        aria-label="Select Currency"
                                        value={Gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        label="Gender"
                                        required
                                    >
                                        <option>Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </CFormSelect>
                                </CCol>

                                <CCol lg={3} md={6} sm={4}>
                                    <CFormInput
                                        className="mb-1"
                                        type="number"
                                        id="exampleFormControlInput1"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                        label="Age"
                                        placeholder="Enter Your Age"
                                        required
                                    />
                                </CCol>
                            </CRow>
                             <CRow>
                               <CCol lg={6} md={6} sm={12}>
                                    <CFormSelect
                                        className="mb-1"
                                        aria-label="Select Working Days"
                                        value={CountryCode2}
                                        onChange={(e) => setCountryCode2(e.target.value)}
                                        label="Country Code"
                                        required
                                    >{CountryList.map((item, index) => (
                                        <option key={index} value={item.dial_code}>{item.name} {item.dial_code}</option>
                                    ))}
                                    </CFormSelect>
                                </CCol>
                                <CCol lg={6} md={6} sm={12}>
                                <CFormTextarea
                                    id="exampleFormControlTextarea1"
                                    label="Address"
                                    value={Address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    rows="3"
                                    text="Must be 8-20 words long."
                                    required
                                ></CFormTextarea>
                            </CCol>
                             </CRow>
                            
                            <CRow>
                                <CCol lg={6} md={6} sm={12}>
                                    <CFormInput
                                        className="mb-1"
                                        type="text"
                                        id="exampleFormControlInput1"
                                        value={Area}
                                        onChange={(e) => setArea(e.target.value)}
                                        label="Area"
                                        placeholder="Enter Area"
                                        required
                                    />
                                </CCol>
                                <CCol lg={6} md={6} sm={12}>
                                    <CFormInput
                                        className="mb-1"
                                        type="text"
                                        id="exampleFormControlInput1"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        label="City"
                                        placeholder="Enter City"
                                        required
                                    />
                                </CCol>
                                
                            </CRow>
                            <CRow>
                                <CCol lg={6} md={6} sm={12}>
                                    <CFormInput
                                        className="mb-1"
                                        type="text"
                                        id="exampleFormControlInput1"
                                        value={pincode}
                                        maxLength={6}
                                        onChange={(e) => setPincode(e.target.value)}
                                        label="Pin Code"
                                        placeholder="Enter Pin Code"
                                        required
                                    />
                                </CCol>
                                <CCol lg={6} md={6} sm={12}>
                                    <CFormInput
                                        className="mb-1"
                                        type="text"
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                        id="exampleFormControlInput1"
                                        label="State"
                                        placeholder="Enter State"
                                        required
                                    />
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol lg={6} md={6} sm={12}>
                                    <CFormSelect
                                                className="mb-1"
                                                aria-label="Select Assign Staff"
                                                value={Source}
                                                onChange={(e) => setSource(e.target.value)}
                                                label="Source"
                                                required

                                            >
                                                <option>Select Source</option>
                                                {leadArr.map((item, index) => (
                                                    (
                                                     
                                                        <option key={index}>{item.LeadSource}</option>
                                                    )
                                    ))}</CFormSelect>
                                </CCol>
                                <CCol lg={6} md={6} sm={12}>

                                   <CFormSelect
                                                className="mb-1"
                                                aria-label="Select Job Department"
                                                value={Department}
                                                onChange={(e) => setDepartment(e.target.value)}
                                                label="Department"
                                                required
                                            >                                               
                                             <option>Select Department</option>

                                                {result.map((el)=>{
                                                    if(el.status === true){
                                                      return el.department.trim().toLowerCase()
                                                    }
                                                   return false
                                                })
                                                .filter((el,i,arr)=>el?i===arr.indexOf(el):el) 
                                            
                                                .map((item, index) => (                                                   
                                                <option key={index} value={item}>{item}</option>                                                       
                                                    )
                                                )}
                                    </CFormSelect>
                               </CCol>
   
                            </CRow>
                            <CRow>

                            <CCol lg={6} md={6} sm={12}>

                                    <CFormSelect
                                                className="mb-1"
                                                aria-label="Select Job Designation"
                                                value={Designation}
                                                onChange={(e) => setDesignation(e.target.value)}
                                                label="Job Designation"
                                                required
                                            >
                                             <option>Select Designation</option>
                                                {result.map((item, index) => (
                                                    item.status === true&&  Department === item.department.trim().toLocaleLowerCase()&&
                                                         (
                                                            <option key={index} value={item.jobDesignation}>{item.jobDesignation}</option>
                                                        )                             
                                                ))}
                                            </CFormSelect>
                            </CCol>
           
                        
                                <CCol lg={6} md={6} sm={12}>                                   
                                    <CFormInput
                                                className="mb-1"
                                                type="number"
                                                value={Salary}
                                                onChange={(e) => setSalary(e.target.value)}
                                                id="exampleFormControlInput1"
                                                label="CTC"
                                                placeholder="Enter Salary"
                                                required
                                            />
                                </CCol>
                    
                            </CRow>

                            <CRow>
                            <CCol lg={6} md={6} sm={12}>
                                  <CFormSelect
                                                className="mb-1"
                                                aria-label="Select Grade"
                                                value={grade}
                                                onChange={(e) => setgrade(e.target.value)}
                                                label="Employee Type"
                                                options={[
                                                    "Select Grade",
                                                    { label: "Full Time", value: "Full Time" },
                                                    { label: "Part Time", value: "Part Time" },
                                                    { label: "Freelancer", value: "Freelancer" },
                                                    { label: "Consultant", value: "Consultant" },

                                                ]}
                                                required
                                            />
                                </CCol>

                               <CCol lg={6} md={6} sm={12}>
                                     <CFormInput
                                                className="mb-1"
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                type="text"
                                                id="exampleFormControlInput1"
                                                label="Comments"
                                                placeholder="Add Comments"
                                                required
                                            />
                                </CCol>
                                
                              
                            </CRow>

                            <CRow>
                            <CCol lg={6} md={6} sm={12}>
                                    <CFormInput
                                        className="mb-1"
                                        type="file"
                                        accept='pdf/*'
                                        ref={resumeInput}
                                        id="exampleFormControlInput1"
                                        onChange={HandaleResumeInputChange}
                                        hidden
                                    />

                                    <div className={resumePrograss===100?'resume-dev h-100px border text-white d-flex':'d-none'}>
                                        <div className='w-30 bg-lightRed h-100 dev-center'>PDF</div>
                                        <div className='w-70 h-100 dev-center text-dark'>
                                          <p className='p-0 m-0'> {((resume?.slice(0,30)?resume?.slice(0,20)+"...":null)||"Resume is not uploaded...")}</p> 
                                          <p className='p-0 m-0'>{new Date().toDateString()}</p>
                                        </div>
                                    </div>
                                    <CButton className='mt-2' onClick={HandaleResumeInputClick}>  <CIcon icon={cilArrowCircleBottom} />  {resumePrograss}%  Upload Resume</CButton>
                                    <label style={{ color: 'red' }} className='ms-5'>{error}</label>
                                  
                                </CCol>
                                
                            </CRow>
                           
                            <CButton className="mt-4" type='submit'>Save</CButton>
                           
                        </form>
                    </CCardBody>
                </CCard>
            
           
        </>
    )
}

export default Recruitment
