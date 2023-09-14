import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

import {
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardHeader,
    CCardTitle,
    CCol,
    CFormInput,
    CFormSelect,
    CInputGroup,
    CPagination,
    CPaginationItem,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CImage,
    CFormTextarea,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter
} from '@coreui/react'
import ProfileIcon from 'src/assets/images/avatars/profile_icon.png'
import moment from 'moment/moment'
import { useUploadResumeHook } from 'src/views/forms/useUploadHook'
import { useAdminValidation } from 'src/views/Custom-hook/adminValidation'
import { useReactToPrint } from 'react-to-print'
import { useParams,useNavigate } from 'react-router-dom'

const EmployeeProfile = ({ id}) => {

    const [EmployeeData, setEmployeeData] = useState([])
    const url = useSelector((el) => el.domainOfApi)
    const imgRef = useRef(null)
    const [fullName, setFullName] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [emailAddress, setEmailAddress] = useState('')
    const [Gender, setGender] = useState('')
    const [address, setAddress] = useState('')
    const [age, setAge] = useState('')
    const [resume, setResume] = useState(null)
    const [jobDesignation, setJobDesignation] = useState('')
    const [department, setDepartment] = useState('')
    const [expSalary, setExpSalary] = useState('')
    const [empCategory, setEmpCategory] = useState('')
    const [payoutType, setPayouttype] = useState('')
    const [Grade, setGrade] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [comment, setComment] = useState('')
    const [typesOfTime, setTypesOfTime] = useState('')
    const [result, setResult] = useState([])
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [Anniversary, setAnniversary] = useState('')
    const [joiningDate, setJoiningDate] = useState('')
    const [EmployeeID, setEmployeeID] = useState('')
    const [AttendanceID, setAttendanceID] = useState('')
    const [accountNo, setAccountNo] = useState('')
    const [IFSCCode, setIFSCCode] = useState('')
    const [PANNo, setPANNo] = useState('')
    const [aadharNo, setAadharNo] = useState('')
    const [createdAt, setCreatedAt] = useState()
    const [resuneProgress, setResumePrograss] = useState(0)
    const [resumeUrl, setResumeUrl] = useState('')
    const resumeUplodFun = useUploadResumeHook(setResumePrograss, setResumeUrl, setResume)
    const pathVal = useAdminValidation('Master')
    const [vis2, seVis2] = useState(false)
    const [leadArr, setLeadArr] = useState([]);
    const {id2,isEdit} = useParams()
    const navigateFun =  useNavigate()


    const uniqId = (id?.trim()||id2?.trim())


    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;

    const headers = {
        headers: {
            'Authorization': `Bearer ${ token }`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }

    const componentRef = useRef()

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'yog-power',
        onAfterPrint: () => alert('print success')
    })



    function getStaff() {
        if (!uniqId) {
            return
        }
        axios.get(`${ url }/employeeform/${ uniqId }`, headers)
            .then((res) => {
                setEmployeeData(res.data)
                setFullName(res.data.FullName)
                setContactNumber(res.data.ContactNumber)
                setEmailAddress(res.data.EmailAddress)
                setGender(res.data.Gender)
                setAddress(res.data.address)
                setAge(res.data.Age)
                setDateOfBirth(moment(res.data.DateofBirth).format('YYYY-MM-DD'))
                setDepartment(res.data.Department)
                setJobDesignation(res.data.JobDesignation)
                setExpSalary(res?.data?.Salary)
                setJoiningDate(moment(res.data.joiningDate).format('YYYY-MM-DD'))
                setEmpCategory(res.data.EmployeeCategory)
                setAnniversary(moment(res.data.Anniversary).format('YYYY-MM-DD'))
                setEmployeeID(res.data.EmployeeID)
                setAttendanceID(res.data.AttendanceID)
                setAccountNo(res.data.AccountNo)
                setIFSCCode(res.data.IFSC)
                setPANNo(res.data.PANCard)
                setAadharNo(res.data.AadharNumber)
                setResume(res.data.resumeName)
                setResumeUrl(res.data.resume)
                setCreatedAt(res.data.createdAt)
                setPayouttype(res.data.PayoutType)
                imgRef.current.src = res.data.image
            })
            .catch((error) => {
                console.error(error)
            })
    }

    useEffect(() => {
        getStaff()
        toGetRequireData()

    }, [])

    async function toGetRequireData() {
        try {

            const response1 = axios.get(`${ url }/leadSourceMaster/${ pathVal }`, headers)
            const response2 = axios.get(`${ url }/designation/${ pathVal }`, headers)


            const allData = await Promise.all([response1, response2])

            setResult(allData[1].data.reverse())
            setLeadArr(allData[0].data.reverse())

        } catch (error) {

        }
    }





    // Editing Scope //////////////////////////////////////////////////////////////////////////////

    const EmpObjToEdit = {
        FullName: fullName,
        ContactNumber: contactNumber,
        EmailAddress: emailAddress,
        Gender: Gender,
        address: address,
        Age: age,
        JobDesignation: jobDesignation,
        Department: department,
        Salary: expSalary,
        EmployeeCategory: empCategory,
        PayoutType: payoutType,
        Grade: Grade,
        image: imageUrl,
        Comment: comment,
        resume: resume,
        "DateofBirth": dateOfBirth,
        "Anniversary": Anniversary,
        "joiningDate": joiningDate,
        "EmployeeID": EmployeeID,
        "AttendanceID": AttendanceID,
        "AccountNo": accountNo,
        "IFSC": IFSCCode,
        "AadharNumber": aadharNo,
        "PANCard": PANNo,
        "selected": "Select",
        "status": true,
        resume: resumeUrl,
        resumeName: resume
    }

    function updateEmpolyee() {
        axios.post(`${ url }/employeeform/update/${ uniqId }`, EmpObjToEdit, headers).then(() => {
            alert('Successfully save')
            getStaff()
        })

    }







    return (

        <CCard>

            <CModal size="xl" alignment="center" scrollable visible={vis2} onClose={() => seVis2(false)}>
                <CModalHeader>
                    <CModalTitle>Document Preview</CModalTitle>
                </CModalHeader>
                <CModalBody ref={componentRef} style={{ padding: '25px' }}>
                    <div style={{ minHeight: '100vh' }} >
                        <iframe
                            src={resumeUrl}
                            frameBorder="0"
                            scrolling="auto"
                            width="100%"
                            height="600"
                        ></iframe>
                    </div>
                </CModalBody>
                <CModalFooter>
                    <CButton color="primary" onClick={() => handlePrint()}>Print</CButton>
                </CModalFooter>
            </CModal>

            <CCardHeader style={{ backgroundColor: "#0B5345", color: "white" }}>
                <CCardTitle>Empolyee Profile Info</CCardTitle>
            </CCardHeader>
            <CCardBody>
                {Boolean(isEdit)&&<CButton onClick={()=>navigateFun('/hr/all-emp')}>
                    Go Back
                </CButton>}     

                <CRow>
                    <CCol lg={12} md={12} className='mt-2 mb-1' >
                        <CImage ref={imgRef} className="mb-1" style={{ borderRadius: "100px" }} width={'200px'} src={ProfileIcon} />
                    </CCol>

                    <CCol xs={6}>
                        <CFormInput
                            className="mb-1"
                            type="text"
                            id="exampleFormControlInput1"
                            label="Full name"
                            placeholder="Enter Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </CCol>
                    <CCol xs={6}>
                        <CFormInput
                            className="mb-1"
                            type="number"
                            id="exampleFormControlInput1"
                            label="Contact Number"
                            placeholder="Enter Contact Number"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol>
                        <CFormInput
                            className="mb-1"
                            type="email"
                            id="exampleFormControlInput1"
                            label="Email address"
                            placeholder="name@example.com"
                            text="Must be 8-20 characters long."
                            aria-describedby="exampleFormControlInputHelpInline"
                            value={emailAddress}
                            onChange={(e) => setEmailAddress(e.target.value)}
                        />
                    </CCol>
                    <CCol>
                        <CFormSelect
                            className="mb-1"
                            aria-label="Select Currency"
                            value={Gender}
                            onChange={(e) => setGender(e.target.value)}
                            label="Gender"
                        >
                            <option>Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </CFormSelect>


                    </CCol>
                </CRow>
                <CCol>
                    <CFormTextarea
                        id="exampleFormControlTextarea1"
                        label="Address"
                        rows="2"
                        text="Must be 8-20 words long."
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    ></CFormTextarea>
                </CCol>
                <CRow>


                    <CRow>
                        <CCol>
                            <CFormInput
                                className="mb-1"
                                type="number"
                                id="exampleFormControlInput1"
                                label="Age"
                                placeholder="Enter Your Age"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </CCol>

                        <CCol >
                            <CFormInput
                                className="mb-1"
                                type="date"
                                id="exampleFormControlInput1"
                                value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                                label="Date of Birth"
                                placeholder="Enter date"
                            />
                        </CCol>
                    </CRow>

                    <CRow>


                        <CCol xs={4}>
                            {
                                <CFormSelect
                                    className="mb-1"
                                    aria-label="Select Job Department"
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                    label="Department"
                                    required
                                >
                                    <option>Select Department</option>

                                    {result.map((el) => {
                                        if (el.status === true) {
                                            return el.department.trim().toLowerCase()
                                        }
                                        return false
                                    })
                                        .filter((el, i, arr) => el ? i === arr.indexOf(el) : el)

                                        .map((item, index) => (
                                            <option key={index} value={item}>{item}</option>
                                        )
                                        )}
                                </CFormSelect>
                            }

                        </CCol>

                        <CCol xs={4}>
                            {
                                <CFormSelect
                                    className="mb-1"
                                    aria-label="Select Job Designation"
                                    value={jobDesignation}
                                    onChange={(e) => setJobDesignation(e.target.value)}
                                    label="Job Designation"
                                    required
                                >
                                    <option>Select Designation</option>
                                    {result.map((item, index) => (
                                        item.status === true && department === item.department.trim().toLocaleLowerCase() &&
                                        (
                                            <option key={index} value={item.jobDesignation}>{item.jobDesignation}</option>
                                        )
                                    ))}
                                </CFormSelect>}

                        </CCol>
                        <CCol xs={4}>
                            <CFormInput
                                className="mb-1"
                                type="number"
                                id="exampleFormControlInput1"
                                label="CTC"
                                value={expSalary}
                                onChange={(e) => setExpSalary(e.target.value)}
                            />
                        </CCol>
                    </CRow>
                    <CRow>

                        <CCol>

                            <CFormSelect
                                className="mb-1"
                                aria-label="Select Assign Staff"
                                value={payoutType}
                                onChange={(e) => setPayouttype(e.target.value)}
                                label="Source"
                                required
                                autoComplete='off'

                            >
                                <option>Select Source</option>
                                {leadArr.map((item, index) => (
                                    (

                                        <option key={index}>{item.LeadSource}</option>
                                    )
                                ))}</CFormSelect>
                        </CCol>


                        <CCol >
                            <CFormInput
                                className="mb-1"
                                type="date"
                                value={joiningDate}
                                onChange={(e) => setJoiningDate(e.target.value)}
                                id="exampleFormControlInput1"
                                label="Date of Joining"
                                placeholder="Enter Date of Joining"
                            />
                        </CCol>
                    </CRow>
                    <CRow>



                        <CCol lg={6} md={6} sm={12}>
                            <CFormInput
                                className="mb-1"
                                type="file"
                                accept='pdf/*'
                                onChange={resumeUplodFun}
                                id="exampleFormControlInput1"
                                label={`${ resuneProgress }%  Upload Resume`}
                                placeholder="Enter Upload Resume"
                            />
                            <div className={!!resume?.trim() ? 'resume-dev h-100px border text-white d-flex' : 'd-none'}>
                                <div className='w-30 bg-lightRed h-100 dev-center'>PDF</div>
                                <div className='w-70 h-100 dev-center text-dark'>
                                    <p className='p-0 m-0'> {((resume?.slice(0, 30) ? resume?.slice(0, 20) + "..." : null) || "Resume is not uploaded...")}</p>
                                    <p className='p-0 m-0'>{new Date(createdAt).toDateString()}</p>
                                </div>
                                <div className='dev-center'>
                                    <CButton size='sm' onClick={() => {  seVis2(true) , setResumeUrl(resumeUrl)}}>View</CButton>
                                </div>
                            </div>

                        </CCol>
                        <CCol xs={6}>
                            <CFormInput
                                className="mb-1"
                                type="date"
                                id="exampleFormControlInput1"
                                value={Anniversary}
                                onChange={(e) => setAnniversary(e.target.value)}
                                label="Anniversary"
                                placeholder="Enter Anniversary"
                            />
                        </CCol>



                        <CCol xs={6}>
                            <CFormInput
                                className="mb-1"
                                aria-label="Select Employee Category"
                                value={empCategory}
                                onChange={(e) => setEmpCategory(e.target.value)}
                                label="Employee Category"

                            />
                        </CCol>


                        <CCol xs={6}>
                            <CFormInput
                                className="mb-1"
                                type="text"
                                id="exampleFormControlInput1"
                                value={EmployeeID}
                                onChange={(e) => setEmployeeID(e.target.value)}
                                label="Employee ID"
                                placeholder="Enter Employee ID"
                            />


                        </CCol>
                        <CCol xs={6}>
                            <CFormInput
                                className="mb-1"
                                type="text"
                                id="exampleFormControlInput1"
                                value={AttendanceID}
                                onChange={(e) => setAttendanceID(e.target.value)}
                                label="Attendance ID"
                                placeholder="Enter Attendance ID"
                            />

                        </CCol>
                        <CCol xs={6}>
                            <CFormInput
                                className="mb-1"
                                type="number"
                                value={accountNo}
                                onChange={(e) => setAccountNo(e.target.value)}
                                id="exampleFormControlInput1"
                                label="Account No"
                                placeholder="Enter Account No"
                            />
                        </CCol>
                        <CCol xs={6}>
                            <CFormInput
                                className="mb-1"
                                type="text"
                                id="exampleFormControlInput1"
                                value={IFSCCode}
                                onChange={(e) => setIFSCCode(e.target.value)}
                                label="IFSC"
                                placeholder="Enter IFSC"
                            />
                        </CCol>
                        <CCol xs={6}>
                            <CFormInput
                                className="mb-1"
                                type="text"
                                id="exampleFormControlInput1"
                                value={PANNo}
                                onChange={(e) => setPANNo(e.target.value)}
                                label="PAN Card"
                                placeholder="Enter PAN Card"
                            />
                        </CCol>
                        <CCol xs={6}>
                            <CFormInput
                                className="mb-1"
                                type="number"
                                value={aadharNo}
                                onChange={(e) => setAadharNo(e.target.value)}
                                id="exampleFormControlInput1"
                                label="Aadhar Number"
                                placeholder="Enter Aadhar Number"
                            />
                        </CCol>

                    </CRow>

                    <CRow>
                        <CCol>
                            {Boolean(isEdit) && <CButton onClick={updateEmpolyee}>Save</CButton>}
                        </CCol>
                    </CRow>

                </CRow>


            </CCardBody>
        </CCard>
    )
}

export default EmployeeProfile
