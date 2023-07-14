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
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CountryList } from "src/components/CountryList";
import { useSelector } from 'react-redux'

import {useUniqAdminObjeact,useAdminValidation} from "src/views/Custom-hook/adminValidation";
import axios from "axios";


const CompanyProfile = () => {
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

    const url = useSelector(el=>el.domainOfApi)
    const pathVal =  useAdminValidation('Master')
    const uniqObjVal = useUniqAdminObjeact()



    const navigate = useNavigate()
    let user = JSON.parse(localStorage.getItem('user-info'))
    const username = user.user.username;
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

    const saveProfile = (e) => {
        e.preventDefault()
        let data1 = { 
                "username": username,
                "brandName": brandName,
                "brandNumber": brandNumber,
                "emailAddress": emailAddress,
                "areaSequerFit": areaSequerFit,
                "currency":  currency,
                "businessCategory": businessCategory,
               "brandFullAddress":  brandFullAddress,
                "city": city,
                "state": state,
                "openingTime": openingTime,
                "closingTime": closingTime,
                "workingDays": workingDays,
                "halfDay": halfDay,
                "holidays": holidays,
            }

           let pathVal = ``
            if(data[0]){
               pathVal = `${url}/Companyprofile/update/${data[0]?._id}`  
            }else{
                pathVal = `${url}/Companyprofile/create`
            }
        fetch(pathVal, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...data1,...uniqObjVal})
        }).then((resp) => {
            resp.json().then((el) => {
                console.log(el)
                alert("successfully submitted")
            })
        })
    }

    return (viewProfile &&
        <CCard className="mb-3 border-success">
            <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                <CCardTitle>Company Profile</CCardTitle>
            </CCardHeader>
            <CCardBody>
                <CForm onSubmit={saveProfile}>
                    <CRow>
                        <CCol lg={6} sm={12}>
                            <CRow>
                                <CCol xs={6}>
                                    <CFormInput
                                        className="mb-1"
                                        type="text"
                                        id="exampleFormControlInput1"
                                        label="Brand Name"
                                        value={brandName}
                                        onChange={(e) => setBrandName(e.target.value)}
                                        placeholder="Enter Brand Name"
                                    />
                                </CCol>
                                <CCol>
                                    <CFormInput
                                        className="mb-1"
                                        type="number"
                                        id="exampleFormControlInput1"
                                        label="Brand Number"
                                        value={brandNumber}
                                        onChange={(e) => setBrandNumber(e.target.value)}
                                        placeholder="Enter Brand Number"
                                    />
                                </CCol>
                            </CRow>

                            <CFormInput
                                className="mb-1"
                                type="email"
                                id="exampleFormControlInput1"
                                label="Email address"
                                placeholder="name@example.com"

                                value={emailAddress}
                                onChange={(e) => setEmailAddress(e.target.value)}
                                text="Must be 8-20 characters long."
                                aria-describedby="exampleFormControlInputHelpInline"
                            />
                          
                            <CFormTextarea
                                id="exampleFormControlTextarea1"
                                label="Branch Full Address"
                                value={brandFullAddress}
                                onChange={(e) => setBrandFullAddress(e.target.value)}
                                rows="3"
                                text="Must be 8-20 words long."
                            ></CFormTextarea>
                            <CRow>
                                <CCol xs={6}>
                                    <CFormInput
                                        className="mb-1"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        label="City"
                                        
                                       
                                    />
                                </CCol>
                                <CCol>
                                    <CFormSelect
                                        className="mb-1"
                                        aria-label="Select Country Name"
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                        label="Country Name"
                                    >{CountryList.map((item, index) => (
                                        <option key={index}>{item.name}</option>
                                    ))}
                                    </CFormSelect>
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
                                            onChange={(e) => setAreaSequerFit(e.target.value)} />
                                        <CInputGroupText>sq. ft.</CInputGroupText>
                                    </CInputGroup>
                                </CCol>
                                <CCol>
                                    <CFormInput
                                        className="mb-1"
                                        value={currency}
                                        onChange={(e) => setCurrency(e.target.value)}
                                        label="Currency"
                                        
                                    />
                                </CCol>
                            </CRow>
                            <CFormInput
                                className="mb-1"
                                value={businessCategory}
                                onChange={(e) => setBusinessCategory(e.target.value)}
                                label="Business Category"
                                
                            />
                            <CRow>
                                <CCol xs={6}>
                                    <CFormInput
                                        className="mb-1"
                                        type="time"
                                        id="exampleFormControlInput1"
                                        value={openingTime}
                                        onChange={(e) => setOpeningTime(e.target.value)}
                                        label="Opening Time"
                                        placeholder="Enter Brand Name"
                                    />
                                </CCol>
                                <CCol>
                                    <CFormInput
                                        className="mb-1"
                                        type="time"
                                        id="exampleFormControlInput1"
                                        value={closingTime}
                                        onChange={(e) => setClosingTime(e.target.value)}
                                        label="Closing Time"
                                        placeholder="Enter Brand Number"
                                    />
                                </CCol>

                                <CCol xs={4}>
                                    <CFormInput
                                        className="mb-1"
                                        value={workingDays}
                                        onChange={(e) => setWorkingDays(e.target.value)}
                                        label="Working Days"
                                        type="number"
                                    />
                                </CCol>
                                <CCol xs={4}>
                                    <CFormInput
                                        className="mb-1"
                                        value={halfDay}
                                        onChange={(e) => setHalfDay(e.target.value)}
                                        label="Half Day"
                                        type="number"                                       
                                    />
                                </CCol>
                                <CCol xs={4}>
                                    <CFormInput
                                        className="mb-1"
                                        value={holidays}
                                        onChange={(e) => setHolidays(e.target.value)}
                                        label="Holidays"
                                        type="number"                                                                           
                                    />
                                </CCol>
                            </CRow>
                        </CCol>
                    </CRow>
                    <CButton className="ms-1 mt-2" type="submit">Save</CButton>
                    <CButton className="ms-2 mt-2" onClick={() => navigate('/master/center-setup')}>Cancel</CButton>
                </CForm>
            </CCardBody>
        </CCard>
    );
};

export default CompanyProfile;