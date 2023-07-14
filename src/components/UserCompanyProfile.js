import React from "react";
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCardTitle,
    CCol,
    CForm,
    CFormInput,
    CFormSelect,
    CFormTextarea,
    CInputGroup,
    CInputGroupText,
    CRow,
} from "@coreui/react";
import { useEffect,useState } from "react";
import axios from "axios";
import { useSelector } from 'react-redux'
import { useAdminValidation } from "src/views/Custom-hook/adminValidation";

function UserCompanyProfile(){

    const url = useSelector(el=>el.domainOfApi)

    const [brandName, setBrandName] = useState("")
    const [brandNumber, setBrandNumber] = useState("")
    const [emailAddress, setEmailAddress] = useState("")
    const [areaSequerFit, setAreaSequerFit] = useState("")
    const [currency, setCurrency] = useState("")
    const [businessCategory, setBusinessCategory] = useState("")
    const [brandFullAddress, setBrandFullAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [openingTime, setOpeningTime] = useState("")
    const [closingTime, setClosingTime] = useState("")
    const [workingDays, setWorkingDays] = useState("")
    const [halfDay, setHalfDay] = useState("")
    const [holidays, setHolidays] = useState("")
    const [viewProfile,setProfile] = useState(false)
    const [data,setData] = useState([])

    const pathVal =  useAdminValidation('Master')

    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;

    useEffect(() => {
        axios.get(`${url}/Companyprofile/${pathVal}`, {
            headers: { "Authorization": `Bearer ${token}` }
        }).then(((res)=>{
            setProfile(res.status===200)
            setData(res.data) 
        }));
    }, []);


    useEffect(()=>{
        if(data[0]){
     
         const data1 = {...data[0]}
         console.log(data1)
         setBrandName(data1.brandName)
         setBrandNumber(data1.brandNumber)
         setEmailAddress(data1?.emailAddress)
         setAreaSequerFit(data1?.areaSequerFit)
         setCurrency(data1?.currency)
         setBrandFullAddress(data1?.brandFullAddress)
         setBusinessCategory(data1?.businessCategory)
         setOpeningTime(data1?.openingTime)
         setClosingTime(data1?.closingTime)
         setWorkingDays(data1?.workingDays)
         setHalfDay(data1?.halfDay)
         setHolidays(data1?.holidays)
         setCity(data1?.city)
         setState(data1?.state)
       }
         },[data[0]])

    
         return (viewProfile &&
            <CCard className="mb-3 border-success">
                <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                    <CCardTitle>Company Profile</CCardTitle>
                </CCardHeader>
                <CCardBody>
                    <CForm >
                        <CRow>
                            <CCol lg={6} sm={12}>
                                <CRow>
                                    <CCol xs={6}>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            label="Brand Name"
                                            value={brandName}
                                        />
                                    </CCol>
                                    <CCol>
                                        <CFormInput
                                            className="mb-1"
                                            type="number"
                                            label="Brand Number"
                                            value={brandNumber}
                                        />
                                    </CCol>
                                </CRow>
    
                                <CFormInput
                                    className="mb-1"
                                    type="email"
                                    label="Email address"
                                    value={emailAddress}
                                />
                              
                                <CFormTextarea
                                    label="Branch Full Address"
                                    value={brandFullAddress}
                                    rows="3"
                                    text="Must be 8-20 words long."
                                ></CFormTextarea>
                                <CRow>
                                    <CCol xs={6}>
                                        <CFormInput
                                            className="mb-1"
                                            value={city}
                                            label="City"                                                                              
                                        />
                                    </CCol>
                                    <CCol>
                                        <CFormInput
                                            className="mb-1"
                                            value={state}
                                            label="Country Name"
                                        />
                                    </CCol>
                                </CRow>
                            </CCol>
    
                            <CCol lg={6} sm={12}>
                            <CRow>
                                    <CCol>
                                        <label className="mb-2">Area Sequer Fit:</label>
                                        <CInputGroup>
                                            <CFormInput type="number" placeholder="Sqft"
                                                value={areaSequerFit}
                                                 />
                                            <CInputGroupText>sq. ft.</CInputGroupText>
                                        </CInputGroup>
                                    </CCol>
                                    <CCol>
                                        <CFormInput
                                            className="mb-1"
                                            value={currency}
                                            label="Currency"                                        
                                        />
                                    </CCol>
                                </CRow>
                                <CFormInput
                                    className="mb-1"
                                    value={businessCategory}
                                    label="Business Category"
                                    
                                />
                                <CRow>
                                    <CCol xs={6}>
                                        <CFormInput
                                            className="mb-1"
                                            type="time"
                                            value={openingTime}
                                            label="Opening Time"
                                        />
                                    </CCol>
                                    <CCol>
                                        <CFormInput
                                            className="mb-1"
                                            type="time"
                                            value={closingTime}
                                            label="Closing Time"
                                        />
                                    </CCol>
    
                                    <CCol xs={4}>
                                        <CFormInput
                                            className="mb-1"
                                            value={workingDays}
                                            label="Working Days"
                                            type="number"
                                        />
                                    </CCol>
                                    <CCol xs={4}>
                                        <CFormInput
                                            className="mb-1"
                                            value={halfDay}
                                            label="Half Day"
                                            type="number"                                       
                                        />
                                    </CCol>
                                    <CCol xs={4}>
                                        <CFormInput
                                            className="mb-1"
                                            value={holidays}
                                            label="Holidays"
                                            type="number"                                                                           
                                        />
                                    </CCol>
                                </CRow>
                            </CCol>
                        </CRow>
                    </CForm>
                </CCardBody>
            </CCard>
        );


}


export default UserCompanyProfile;