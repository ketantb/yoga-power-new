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
    CFormSwitch,
    CInputGroup,
    CInputGroupText,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CPagination,
    CPaginationItem
} from "@coreui/react";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { useAdminValidation,useUniqAdminObjeact } from "src/views/Custom-hook/adminValidation";
import { masterRightValue } from "src/views/hr/Rights/rightsValue/masterRightsValue";


const PackageMaster = () => {

    const addPackageMaste = true
    const packageStatus =true
    const deletePackageMaster = true

    const url1 = useSelector((el)=>el.domainOfApi) 
    const url = url1


    let user = JSON.parse(localStorage.getItem('user-info'))
    const username = user.user.username;
    const token = user.token;

    let pageNumber =0


    const headers = {
        headers: {
            "Authorization": `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    const [action, setAction] = useState(false)
    const [Package_Name, setPackageName] = useState("");
    const [fees, setFees] = useState("");
    const [packages, setPackages] = useState("")
    const [status, setStatus] = useState(false);
    const [newservice,setNewService] = useState('')
    const [variation,setVariation] = useState('')
    const [duration, setDuration] = useState("");
    const [subService,setService] = useState([])
    const [pagination, setPagination] = useState(10)





    const uniqObjVal =  useUniqAdminObjeact()
    const pathVal  = useAdminValidation('Master')

    const [result, setResult] = useState([]);
    useEffect(() => {
        getPackage()
        getSubService()
    }, []);

    function getSubService() {
        axios.get(`${url}/subservice/${pathVal}`, headers)
            .then((res) => {
                setService(res.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    function getPackage() {
        axios.get(`${url1}/packageMaster/${pathVal}`, headers)
            .then((res) => {
                setResult(res.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }
    const updateStatus = (id, item, status) => {
        let item2 = { Status: status }
        axios.post(`${url1}/packageMaster/update/${id}`,item2,headers)
        .then((result) => {
            result.json().then((resp) => {
                getPackage()
            })
        })
    }

    function deletePackage(id) {

        if (confirm('Do you want to delete this')) {
            fetch(`${url1}/packageMaster/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then((result) => {
                result.json().then((resp) => {
                    console.warn(resp)
                    getPackage()
                })
            })
        }
    }

    const savePackage = () => {
        let data = 
        {
           "Sr_No":"21",
           "Days":getNoOfDays,
           "Service": newservice,
           "Variation": variation,
           "Package_Name":Package_Name,
           "Duration": duration,
           "Fees": fees,
           "Status":status,
           "Action": "edit",
           "username": username,
       }
        console.warn(data);
        fetch(`${url1}/packageMaster/create`, {
            method: "POST",
            ...headers,
            body: JSON.stringify({...data,...uniqObjVal })
        }).then((resp) => {
            resp.json().then(() => {
                setPackageName('')
                setFees('')
                setPackages('')
                setDuration('')
                setStatus(false)
                getPackage()
                alert("successfully submitted")

            })
        })
    }

    const toGetDays = [
        {duration:'Week',days:'7'},
        {duration:'Month',days:'30'},
        {duration:'Year',days:'365'}
      ]
    
    
    const getNoOfDays =   toGetDays.map((el)=>{
    if(duration?.includes(el.duration)){
      return  duration.split(' ')[0] *el.days
    }
      }).find((el)=>el)
    



    return (
        <CCard className="mb-3 border-success">
            <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                <CCardTitle>Package Master</CCardTitle>
            </CCardHeader>
            <CCardBody>
                <CForm className="mb-2">
                    <div className="d-flex justify-content-between">
                        <div></div>
                        <div>
                            <CRow>
                                <CCol>
                                    <CButton style={{display:addPackageMaste?'':'none'}}  className="ms-1 mt-2" onClick={() => setAction(!action)}>{action ? 'close' : 'Add New Package'}</CButton>
                                </CCol>
                            </CRow>
                        </div>
                    </div>
                    {action &&
                    <div>
                      <CRow className='mt-3'>
                      <CCol lg={6} md={6} sm={12}>

                                  
                                    <CFormSelect
                                        className="mb-1"
                                        type="text"
                                        id="exampleFormControlInput1"
                                        label="Service"
                                        placeholder="Enter Package Name"
                                        value ={newservice}
                                        onChange={(e)=>setNewService(e.target.value)}
                                       
                                    >
                                    
                                    <option>Select Service</option>
                                  
                                     {subService.map((el)=>el.selected_service.toLowerCase().trim()).filter((el,i,arr)=>{
                                      return arr.indexOf(el)===i
                                     })
                                     .map((el,i)=><option key={i}>{el}</option>)}  

                                    </CFormSelect>
                     </CCol>
                        <CCol lg={6} md={6} sm={12}>
                               <CFormSelect
                                        className="mb-1"
                                        type="text"
                                        id="exampleFormControlInput1"
                                        label="Variation"
                                        placeholder="Enter Package Name"
                                        value={variation}
                                        onChange={(e)=>setVariation(e.target.value)}
                                       
                                    >
                                   <option>Select Variation</option>
                                    {subService.filter((el)=>{
                                    return el.selected_service.toLowerCase().trim() ===newservice
                                    })
                                    .map((el,i)=><option key={i}>{el.sub_Service_Name}</option>)
                                    }                                                         
                                    </CFormSelect>
                                  
                     </CCol>

                      </CRow>

                      <CRow className='mt'>
                                <CCol lg={6} md={6} sm={12}>
                                    <CFormInput
                                        className="mb-1"
                                        type="text"
                                        id="exampleFormControlInput1"
                                        label="Package Name"
                                        value={Package_Name}
                                        onChange={(e) => setPackageName(e.target.value)}
                                        placeholder="Enter Package Name"
                                    />
                                </CCol>
                                <CCol lg={6} md={6} sm={12} >
                                                                           
                                        <CFormSelect id="month"
                                            label='Duration'
                                            value={duration}
                                            onChange={(e) => setDuration(e.target.value)}>
                                            <option value="">Select</option>
                                            <option value='1 Week'>1 Week</option>
                                            <option value="2 Week">2 Week</option>
                                            <option value="3 Week">3 Week</option>
                                            <option value="4 Week">4 Week</option>
                                            <option value="5 Week">5 Week</option>
                                            <option value="6 Week">6 Week</option>
                                            <option value="1 Month">1 Month</option>
                                            <option value="2 Month">2 Month</option>
                                            <option value="3 Month">3 Month</option>
                                            <option value="4 Month">4 Month</option>
                                            <option value="5 Month">5 Month</option>
                                            <option value="6 Month">6 Month</option>
                                            <option value="7 Month">7 Month</option>
                                            <option value="8 Month">8 Month</option>
                                            <option value="9 Month">9 Month</option>
                                            <option value="10 Month">10 Month</option>
                                            <option value="11 Month">11 Month</option>
                                            <option value="12 Month">12 Month</option>
                                            <option value="13 Month">13 Month</option>
                                            <option value="14 Month">14 Month</option>
                                            <option value="15 Month">15 Month</option>
                                            <option value="1 Year">1 Year</option>
                                            <option value="2 Year">2 Year</option>
                                            <option value="3 Year">3 Year</option>
                                            <option value="4 Year">4 Year</option>
                                            <option value="5 Year">5 Year</option>
                                        </CFormSelect>
                                </CCol>
                                <CCol lg={6} md={6} sm={12} className="mt-2">
                                                       
                                <CFormInput
                                        className="mb-1"
                                        type="number"
                                        id="exampleFormControlInput1"
                                        label="Fees"
                                        value={fees}
                                        onChange={(e) => setFees(e.target.value)}
                                        placeholder="Enter Fees"
                                    />
                                </CCol>
                                <CCol lg={6} md={6} sm={12} className='mt-1'>
                                    <CFormSwitch size="xl" label="Status" style={{ defaultChecked: 'false' }}
                                        checked={status}
                                        onChange={() => setStatus(prev=>!prev)} />
                                    <CButton className="mt-2" onClick={savePackage}>Save</CButton>
                                </CCol>
                      </CRow>
                    </div>
                    }
                </CForm>
                <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                    <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                        <CTableRow >
                            <CTableHeaderCell>Sr.No</CTableHeaderCell>
                            <CTableHeaderCell>Service</CTableHeaderCell>
                            <CTableHeaderCell>Variation</CTableHeaderCell>
                            <CTableHeaderCell>Package Name</CTableHeaderCell>
                            <CTableHeaderCell>Duration</CTableHeaderCell>
                            <CTableHeaderCell>Fees</CTableHeaderCell>
                            <CTableHeaderCell  style={{display:packageStatus?'':'none'}} >Status</CTableHeaderCell>
                            <CTableHeaderCell  style={{display:deletePackageMaster?'':'none'}} >Action</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {result.slice((pagination - 10),pagination).map((item, i) => (
                             (
                                <CTableRow key={i}>
                                    <CTableDataCell>{i + 1 + pagination - 10}</CTableDataCell>
                                    <CTableDataCell>{item.Service}</CTableDataCell>
                                    <CTableDataCell>{item.Variation}</CTableDataCell>
                                    <CTableDataCell>{item.Package_Name}</CTableDataCell>
                                    <CTableDataCell>{item.Duration}</CTableDataCell>
                                    <CTableDataCell>
                                        {item.Fees}
                                    </CTableDataCell>
                                    <CTableDataCell  style={{display:packageStatus?'':'none'}} >
                                        <CFormSwitch size="xl" style={{ cursor: 'pointer' }}
                                         id={item._id} value={item.Status} checked={item.Status}
                                          onChange={() => updateStatus(item._id,item, !item.Status)} />
                                    </CTableDataCell>
                                    <CTableDataCell style={{display:deletePackageMaster?'':'none'}} >
                                         <MdDelete style={{ cursor: 'pointer', markerStart: '10px' }} 
                                         onClick={() => deletePackage(item._id)} size='20px' />
                                    </CTableDataCell>
                                </CTableRow>
                            )
                        ))}
                    </CTableBody>
                </CTable>
                <div className='d-flex justify-content-center mt-3' >
                        <CPagination aria-label="Page navigation example" style={{cursor:'pointer'}}>
                            <CPaginationItem aria-label="Previous" onClick={() => setPagination((val) => val > 10 ? val - 10 : 10)}>
                                <span aria-hidden="true" >&laquo;</span>
                            </CPaginationItem>
                            <CPaginationItem active >{pagination / 10}</CPaginationItem>
                            {result.length > pagination / 10 * 10 && <CPaginationItem onClick={() => setPagination((val) => val < result.length ? val + 10 : val)}>{pagination / 10 + 1}</CPaginationItem>}
                            {result.length > pagination / 10 * 20 && <CPaginationItem onClick={() => setPagination((val) => val < result.length ? val + 10 : val)}>{pagination / 10 + 2}</CPaginationItem>}
                            <CPaginationItem aria-label="Next" onClick={() => setPagination((val) => val < result.length ? val + 10 : val)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                        </CPagination>
      </div>
            </CCardBody>
        </CCard >
    );
};

export default PackageMaster;