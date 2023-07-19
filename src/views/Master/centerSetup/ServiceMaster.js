import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCardTitle,
    CCol,
    CForm,
    CFormInput,
    CFormSwitch,
    CInputGroup,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from "@coreui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import {useAdminValidation, useUniqAdminObjeact } from "src/views/Custom-hook/adminValidation";
import { masterRightValue } from "src/views/hr/Rights/rightsValue/masterRightsValue";

const ServiceMaster = () => {

    const [action1, setAction1] = useState(false)
    const [sub_Service_Name, setSub_Service_Name] = useState("")
    const [selected_service, setSelected_service] = useState("")
    const [fees, setFees] = useState("")
    const [status, setStatus] = useState(false)
    const [duration, setDuration] = useState("")

    let user = JSON.parse(localStorage.getItem('user-info'))

    const url = useSelector((el) => el.domainOfApi)
    const pathVal =  useAdminValidation('Master')
    const uniqObjVal = useUniqAdminObjeact()

    const token = user.token;
    const username = user.user.username;
    const [result1, setResult1] = useState([]);



    
    const rightsData = useSelector((el)=>el?.empLoyeeRights?.masterRights?.masterCenterSetup?.items?.masterServicesMaster?.rights) 
    const access = rightsData?rightsData:[]
    const isAdmin = useSelector((el)=>el.isAdmin)

    const serviceMasterStatus = (access.includes(masterRightValue.servicesMaster) || isAdmin )
    const addServiceMaster =  (access.includes(masterRightValue.addServicesMaster) || isAdmin )
    const deleteServiceMaster =  (access.includes(masterRightValue.deleteServicesMaster) || isAdmin )



    const headers ={
        headers: {
            "Authorization": `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }
    


    useEffect(() => {
        getSubService()
    }, []);

    function getSubService() {
        axios.get(`${url}/subservice/${pathVal}`, headers).then((res) => {
                setResult1(res.data)}).catch((error) => {console.error(error)})
    }
    function deleteSubService(id) {
        if (confirm('Do you want to delete this')) {
            axios.delete(`${url}/subservice/delete/${id}`,headers).then((result) => {
                result.json().then((resp) => {
                    console.warn(resp)
                    getSubService()
                })
            })
        }
    }


    const updateStatus2 = (id, status) => {
        let item = { status: status }
        axios.post(`${url}/subservice/update/${id}`,item, headers).then((result) => {
            result.json().then((resp) => {
                getSubService()
            })
        })
    }

    const saveSubservice = () => {
        let data = { 
            username: username, 
            sub_Service_Name,
            selected_service: selected_service, 
            fees, packages:'', duration, status ,...uniqObjVal }

            axios.post(`${url}/subservice/create`,data,headers).then((res)=>{
            if(res.status===200){
                setSelected_service('')
                setFees("")
                setDuration('')
                setStatus(false)
                getSubService()
                alert("successfully submitted")
            }
            }).catch((error)=>{
                console.log(error)
            })

     
    }

    const subserviceClose = () => {
        setAction1(!action1)
        setSelected_service('')
        setSub_Service_Name('')
        setFees("")
        setDuration('')
        setStatus(false)
    }



    return (
        <CCard className="mb-3 border-success">
            <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                <CCardTitle>Service Master</CCardTitle>
            </CCardHeader>
            <CCardBody>
                <CForm className="mb-2">
                    <div className="d-flex justify-content-between">
                        <div></div>
                        <div>
                            <CRow>
                                <CCol>
                                    <CButton style={{display:addServiceMaster?'':'none'}} className="ms-1 mt-2" onClick={subserviceClose}>{action1 ? 'close' : 'Add Service'}</CButton>
                                </CCol>
                            </CRow>
                        </div>
                    </div>
                    {action1 &&
                        <div>
                            <CRow className='mt-3'>
                                
                                <CCol lg={6} md={6} sm={12}>
                                    <CFormInput
                                        className="mb-1"
                                        type="text"
                                        id="exampleFormControlInput1"
                                        label="Service Name"
                                        value={selected_service}
                                        onChange={(e) => setSelected_service(e.target.value)}
                                        placeholder="Enter Sub Service Name"
                                    />
                                </CCol>
                                <CCol lg={6} md={6} sm={12}>
                                    <CFormInput
                                        className="mb-1"
                                        type="text"
                                        id="exampleFormControlInput1"
                                        label="Service Variation"
                                        value={sub_Service_Name}
                                        onChange={(e) => setSub_Service_Name(e.target.value)}
                                        placeholder="Enter Sub Service Name"
                                    />
                                </CCol>
                                <CCol lg={6} md={6} sm={12} className="mt-2">
                                    
                                </CCol>
                                <CCol lg={6} md={6} sm={12} className="mt-2">
                                    <CInputGroup
                                    >
        
                                    </CInputGroup>
                                </CCol>
                                <CCol className="mt-2" lg={6} md={6} sm={12}>
                                    <CRow>
                                        
                                        <CCol>
                                            <CFormSwitch size="xl" label="Status" value={status} onChange={() => setStatus(!status)} style={{ defaultChecked: 'false' }} />
                                        </CCol>
                                    </CRow>

                                    <CButton  className="mt-2" onClick={saveSubservice}>Save</CButton>
                                </CCol>


                            </CRow>
                        </div>
                    }
                </CForm>
                <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                    <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                        <CTableRow >
                            <CTableHeaderCell>Sr.No</CTableHeaderCell>
                            <CTableHeaderCell>Service Name</CTableHeaderCell>
                            <CTableHeaderCell>Service Variation</CTableHeaderCell>
                            <CTableHeaderCell  style={{display:serviceMasterStatus?'':'none'}} >Status</CTableHeaderCell>
                            <CTableHeaderCell  style={{display:deleteServiceMaster?'':'none'}}>Action</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {result1.map((item, index) => (
                             (
                                <CTableRow key={index}>
                                    <CTableDataCell>{index + 1}</CTableDataCell>
                                    <CTableDataCell>{item.selected_service}</CTableDataCell>
                                    <CTableDataCell className="text-center">{item.sub_Service_Name ? item.sub_Service_Name : '-'}</CTableDataCell>
                                    <CTableDataCell style={{display:serviceMasterStatus?'':'none'}} ><CFormSwitch size="xl" style={{ cursor: 'pointer' }} id={item._id} value={item.status} checked={item.status} onChange={() => updateStatus2(item._id, !item.status)} /></CTableDataCell>
                                    <CTableDataCell style={{display:deleteServiceMaster?'':'none'}}> <MdDelete style={{ cursor: 'pointer', markerStart: '10px' }} onClick={() => deleteSubService(item._id)} size='20px' /> </CTableDataCell>
                                </CTableRow>
                            )
                        ))}
                    </CTableBody>
                </CTable>
            </CCardBody>
        </CCard>
    );
};

export default ServiceMaster;