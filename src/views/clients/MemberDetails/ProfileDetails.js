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
    CListGroup,
    CListGroupItem,
    CNav,
    CNavItem,
    CNavLink,
    CRow,
    CTabContent,
    CTabPane,
} from "@coreui/react";
import React, { useEffect, useRef, useState } from "react";
import { CountryList } from "src/components/CountryList";
import ProfileIcon from 'src/assets/images/avatars/profile_icon.png'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { listAll, ref, uploadBytes } from "firebase/storage";
import { storage } from "src/firebase";
import logo from 'src/assets/images/avatars/icon.png'
import { v4 } from "uuid";
import { useReactToPrint } from 'react-to-print'
import moment from "moment";
import { useSelector } from 'react-redux'
const url = 'https://yog-seven.vercel.app'
const url2 = 'https://yog-seven.vercel.app'

const ProfileDetails = ({ ids, deleteId,clinetData }) => {

    const adId = JSON.parse(localStorage.getItem('adId'))
    console.log(adId);
    console.log(ids);
    const componentRef = useRef()
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'yog-power',
        onAfterPrint: () => alert('print success')
    })

    const [activeKey, setActiveKey] = useState(1)
    const [image, setImage] = useState(null)
    const [imageUrl, setImageUrl] = useState(null)
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

  
    let user = JSON.parse(localStorage.getItem('user-info'))
   

    useEffect(() => {
        getDetails(clinetData)
    }, [clinetData?._id])
  
    function getDetails(data) {
                setFullname(data?.Fullname)
                setEmail(data?.Email)
                setCountryCode(data?.CountryCode)
                setContactNumber(data?.ContactNumber)
                setWhatsappNumber(data?.WhatsappNumber)
                setDateofBirth((data?.DateofBirth?moment(data?.DateofBirth).format('YYYY-MM-DD'):''))
                setAnniversarydate((data?.Anniversarydate?moment(data?.Anniversarydate).format('YYYY-MM-DD'):'') )
                setGender(data?.Gender)
                setAddress(data?.Address)
                setArea(data?.Area)
                setCity(data?.city)
                setPincode(data?.pincode)
                setState(data?.state)
                setFacebookID(data?.FacebookID)
                setBloodGroup(data?.BloodGroup)
                setsms(data?.sms)
                setmail(data?.mail)
                setpushnotification(data?.pushnotification)
                setName(data?.Name)
                setRelationship(data?.Relationship)
                setCountryCode1(""+data?.CountryCode1)
                setContactNumber1(data?.ContactNumber1)
                setserviceName(data?.serviceName)
                setserviceVariation(data?.serviceVaration)
                setCustomertype(data?.Customertype)
                setEnquiryType(data?.EnquiryType)
                setMemberManager(data?.MemberManager)
                setBatch(data?.Batch)
                setGeneralTrainer(data?.GeneralTrainer)
                setAttendanceID(data?.AttendanceID)
                setCenterID(data?.CenterID)
                setLockerKeyNo(data?.LockerKeyNo)
                setPAN(data?.PAN)
                setBackPain(data?.BackPain)
                setBoneFracture(data?.BoneFracture)
                setHeartDiseaseCondition(data?.HeartDiseaseCondition)
                setEpilepsy(data?.Epilepsy)
                setCarpalTunnel(data?.CarpalTunnel)
                setFootPain(data?.FootPain)
                setDiabetes(data?.Diabetes)
                setGlaucoma(data?.Glaucoma)
                setAsthmaCOPD(data?.AsthmaCOPD)
                setHerniaDiastasisRecti(data?.HerniaDiastasisRecti)
                setHighBloodPressure(data?.HighBloodPressure)
                setOtherText(data?.Other)
                setHeight(data?.Height)
                setWeight(data?.Weight)
                setfitnessLevel(data?.fitnessLevel)
                setfitnessGoal(data?.fitnessGoal)
                setidealWeight(data?.idealWeight)
                setsuggestion(data?.suggestion)
                setcomments(data?.comments)
                setImageUrl(data?.image)         
                setAssignStaff(data?.AssignStaff)      
    }





    return (
        <>
            <div className='d-flex justify-content-between mb-2'>
                <div className='mt-2 ms-2'>
                    <CCardTitle>Profile </CCardTitle>
                </div>       
            </div>
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
                                        <CCardTitle>Personal Details </CCardTitle>
                                        <CRow>
                                            <CCol xs={4} className='mt-2 mb-1' >
                                                <CImage className="mb-1" 
                                                style={{ borderRadius: "50px" }} width={'160px'} src={imageUrl?.trim()?imageUrl?.trim():
                                                    ProfileIcon
                                                } />
                                            </CCol>
                                            <CCol xs={7} className='mt-3'>

                                              
                                            </CCol>
                                            <CCol xs={6}>
                                                <CFormInput
                                                    className="mb-1"
                                                    type="text"
                                                    id="exampleFormControlInput1"
                                                    label="Full name"
                                                    value={Fullname}
                                                    placeholder="Enter Name"
                                                    disabled
                                                />
                                            </CCol>
                                            <CCol>
                                                <CFormInput
                                                    className="mb-1"
                                                    type="email"
                                                    id="exampleFormControlInput1"
                                                    label="Email address"
                                                    value={Email}
                                                    disabled
                                                    placeholder="name@example.com"
                                                    text="Must be 8-20 characters long."
                                                    aria-describedby="exampleFormControlInputHelpInline"
                                                />
                                            </CCol>
                                        </CRow>
                                        <CRow>
                                            <CCol>
                                                <CFormInput
                                                    className="mb-1"
                                                    aria-label="Select Currency"
                                                    label="Country Code"
                                                    value={CountryCode}
                                                    disabled
                                                />
                                            </CCol>
                                            <CCol>
                                                <CFormInput
                                                    className="mb-1"
                                                    type="number"
                                                    id="exampleFormControlInput1"
                                                    label="Contact Number"
                                                    value={ContactNumber}
                                                    disabled
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
                                                    disabled
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
                                                    disabled
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
                                                    disabled
                                                    label='Anniversary Date'
                                                    placeholder="Enter Anniversary Date"
                                                />
                                            </CCol>
                                            <CCol>
                                                <CFormInput
                                                    className="mb-1"
                                                    aria-label="Select Currency"
                                                    value={Gender}
                                                    disabled
                                                    label="Gender"
                                                    
                                                />
                                            </CCol>
                                        </CRow>
                                        <CCol>

                                            <CFormTextarea
                                                id="exampleFormControlTextarea1"
                                                label="Address"
                                                value={Address}
                                                disabled
                                                rows="2"
                                            ></CFormTextarea>
                                        </CCol>
                                        <CRow>
                                            <CCol>
                                                <CFormInput
                                                    className="mb-1"
                                                    type="text"
                                                    id="exampleFormControlInput1"
                                                    value={Area}
                                                    disabled
                                                    label="Area"
                                                    placeholder="Enter Locality"
                                                />
                                            </CCol>
                                            <CCol>
                                                <CFormInput
                                                    className="mb-1"
                                                    type="text"
                                                    value={city}
                                                    disabled
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
                                                    disabled
                                                    label="Pin Code"
                                                    placeholder="Enter Pin Code"
                                                />
                                            </CCol>
                                            <CCol>
                                                <CFormInput
                                                    className="mb-1"
                                                    type="text"
                                                    value={state}
                                                    disabled
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
                                                    disabled
                                                    label="Facebook Id"
                                                    placeholder="Enter Facebook id"
                                                />
                                            </CCol>
                                            <CCol>
                                                <CFormInput
                                                    className="mb-1"
                                                    aria-label="Select Blood Group"
                                                    value={BloodGroup}
                                                    disabled
                                                    label="Blood Group"
                                                />
                                            </CCol>
                                        </CRow>
                                        <CCardTitle>Communication Preference Settings</CCardTitle>
                                        <CRow>
                                            <CCol xs={4}>
                                                <CFormSwitch size="xl" label="SMS"
                                                    checked={sms}

                                                    />
                                            </CCol>
                                            <CCol xs={4}>
                                                <CFormSwitch size="xl" label="Mail"
                                                    checked={mail}
                                                    onChange={() => setmail(!mail)}

                                                    />
                                            </CCol>
                                            <CCol xs={4}>
                                                <CFormSwitch size="xl" label="Push Notification"
                                                    checked={pushnotification}
                                                    onChange={() => setpushnotification(!pushnotification)}

                                                    />
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
                                                    disabled
                                                />
                                            </CCol>
                                            <CCol>
                                                <CFormInput
                                                    className="mb-1"
                                                    type="text"
                                                    value={Relationship}
                                                    id="exampleFormControlInput1"
                                                    label="Relationship"
                                                    placeholder="Enter Relationship"
                                                    disabled
                                                />
                                            </CCol>

                                            <CCol xs={6}>
                                                <CFormInput
                                                    className="mb-1"
                                                    aria-label="Select Working Days"
                                                    value={CountryCode1}
                                                    label="Country Code"
                                                    disabled
                                                />
                                            </CCol>
                                            <CCol xs={6}>
                                                <CFormInput
                                                    className="mb-1"
                                                    type="number"
                                                    id="exampleFormControlInput1"
                                                    value={ContactNumber1}
                                                    label="Contact Number"
                                                    placeholder="Enter Number"
                                                    disabled

                                                />
                                            </CCol>
                                        </CRow>
                                        <CRow>
                                            <CCardTitle>Lead Information</CCardTitle>
                                            <CCol xs={6}>
                                                <CFormInput
                                                    className="mb-1"
                                                    aria-label="Select Service Name"
                                                    value={serviceName}
                                                    disabled
                                                    label="Service Name"
                                                />
                                            </CCol>
                                            <CCol xs={6}>
                                                <CFormInput
                                                    className="mb-1"
                                                    aria-label="Select Service Name"
                                                    value={serviceVaration}
                                                    disabled
                                                    label="Service Variation"
                                                />
                                            </CCol>

                                            <CCol xs={6}>
                                                <CFormInput
                                                    className="mb-1"
                                                    aria-label="Select Customer type"
                                                    value={Customertype}
                                                    disabled
                                                    label="Customer type"
                                                />
                                            </CCol>
                                            <CCol xs={6}>

                                                <CFormInput
                                                    className="mb-1"
                                                    aria-label="Select Assign Staff"
                                                    value={EnquiryType}
                                                    disabled
                                                    label="Enquiry Type"

                                                />
                                            </CCol>
                                        </CRow>

                                        <CRow>
                                            <CCardTitle>Member Manager</CCardTitle>
                                            <CCol xs={6}>
                                                <CFormInput
                                                    className="mb-1"
                                                    aria-label="Select Assign Staff"
                                                    value={AssignStaff}
                                                    disabled
                                                    label="Assign Staff"
                                                />
                                                   
                                            </CCol>
                                            <CCol xs={6}>
                                                <CFormInput
                                                    className="mb-1"
                                                    aria-label="Counselor"
                                                    value={MemberManager}
                                                    disabled
                                                    label="Member Manager"   
                                                />
                                            </CCol>
                                            <CCol xs={6}>
                                                <CFormInput
                                                    className="mb-1"
                                                    aria-label="Select Batch"
                                                    value={Batch}
                                                    disabled
                                                    label="Batch"
                                                />
                                            </CCol>
                                            <CCol xs={6}>
                                                <CFormInput
                                                    className="mb-1"
                                                    aria-label="Select General Trainer"
                                                    value={GeneralTrainer}
                                                    disabled
                                                    label="General Trainer"
                                                />
                                            </CCol>
                                        </CRow>
                                        <CRow>
                                            <CCardTitle>IDs</CCardTitle>
                                            <CCol xs={6}>
                                                <CFormInput
                                                    className="mb-1"
                                                    type="text"
                                                    id="exampleFormControlInput1"
                                                    value={AttendanceID}
                                                    disabled
                                                    label="Attendance ID"
                                                />
                                                 
                                            </CCol>
                                            <CCol xs={6}>
                                                <CFormInput
                                                    className="mb-1"
                                                    type="text"
                                                    id="exampleFormControlInput1"
                                                    value={CenterID}
                                                    disabled
                                                    label="Center ID"/>
                                                                                              </CCol>
                                            <CCol xs={6}>
                                                <CFormInput
                                                    className="mb-1"
                                                    type="text"
                                                    id="exampleFormControlInput1"
                                                    value={LockerKeyNo}
                                                    disabled
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
                                                    disabled
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
                                                    />
                                            </CListGroupItem>
                                            <CListGroupItem>
                                                <CFormCheck label="Bone Fracture"
                                                    checked={BoneFracture}
                                                    />
                                            </CListGroupItem>
                                            <CListGroupItem>
                                                <CFormCheck label="Carpal Tunnel"
                                                    checked={CarpalTunnel}
                                                    />
                                            </CListGroupItem>
                                            <CListGroupItem>
                                                <CFormCheck label="Diabetes"
                                                    checked={Diabetes}
                                                />
                                            </CListGroupItem>
                                        </CListGroup>
                                    </CCol>
                                    <CCol>
                                        <CListGroup>
                                            <CListGroupItem>
                                                <CFormCheck label="Pregnancy"
                                                    checked={HeartDiseaseCondition}
                                                    />
                                            </CListGroupItem>
                                            <CListGroupItem>
                                                <CFormCheck label="Shoulder Pain"
                                                    checked={Epilepsy}

                                                    />
                                            </CListGroupItem>
                                            <CListGroupItem>
                                                <CFormCheck label="Foot Pain"
                                                    checked={FootPain}
                                                    />
                                            </CListGroupItem>
                                            <CListGroupItem>
                                                <CFormCheck label="Knee Replacement"
                                                    checked={Glaucoma}
                                                    />
                                            </CListGroupItem>
                                        </CListGroup>
                                    </CCol>

                                    <CCol>
                                        <CListGroup>
                                            <CListGroupItem>
                                                <CFormCheck label="Joint Pain"
                                                    checked={AsthmaCOPD}
                                                    />
                                            </CListGroupItem>
                                            <CListGroupItem>
                                                <CFormCheck label="Surgery"
                                                    checked={HerniaDiastasisRecti}
                                                    />
                                            </CListGroupItem>
                                            <CListGroupItem>
                                                <CFormCheck label="High Blood Pressure"
                                                    checked={HighBloodPressure}
                                                    />
                                            </CListGroupItem>
                                            <CListGroupItem>
                                                <CFormCheck label="Other"
                                                    checked={Other}                                                    
                                                    />
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
                                                label="Other Reason"
                                                placeholder="Enter Other Reason"
                                                disabled
                                            />
                                        </CCol>
                                    )}
                                </CRow>
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
                                            label="Height"
                                            placeholder="Enter height"
                                            disabled
                                        />
                                    </CCol>
                                    <CCol xs={6}>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            id="exampleFormControlInput1"
                                            value={Weight}
                                            label="Weight"
                                            placeholder="Enter Weight"
                                            disabled
                                        />
                                    </CCol>
                                    <CCardTitle>Fitness Goals</CCardTitle>

                                    <CCol xs={6}>
                                        <CFormInput
                                            className="mb-1"
                                            aria-label="Select Currency"
                                            value={fitnessLevel}
                                            label="Fitness Level"
                                            disabled                                            
                                        />
                                    </CCol>
                                    <CCol xs={3}>
                                        <CFormInput
                                            className="mb-1"
                                            value={fitnessGoal}
                                            aria-label="Select Currency"
                                            label="Fitness Goal"
                                            disabled
                                        />
                                    </CCol>
                                    <CCol xs={3}>
                                        <CFormInput
                                            className="mb-1"
                                            value={idealWeight}
                                            type="text"
                                            id="exampleFormControlInput1"
                                            label="Ideal Weight"
                                            placeholder="Enter Ideal Weight"
                                            disabled
                                        />
                                    </CCol>
                                    <CCol>
                                        <CFormTextarea
                                            id="exampleFormControlTextarea1"
                                            value={suggestion}
                                            label="Suggestion"
                                            rows="2"
                                            text="Must be 8-20 words long."
                                            disabled
                                        ></CFormTextarea>
                                    </CCol>
                                    <CCol>

                                        <CFormTextarea
                                            id="exampleFormControlTextarea1"
                                            value={comments}
                                            label="Comments"
                                            rows="2"
                                            text="Must be 8-20 words long."
                                            disabled
                                        ></CFormTextarea>
                                    </CCol>
                                </CRow>
                            </CForm>
                        </CTabPane>

                    </CTabContent>

                   

                 
                </CCardBody>
            </CCard>
        </>


    )
}

export default ProfileDetails
