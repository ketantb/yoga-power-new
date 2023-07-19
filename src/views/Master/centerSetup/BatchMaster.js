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
import { useAdminValidation,useUniqAdminObjeact } from "src/views/Custom-hook/adminValidation";
import { masterRightValue } from "src/views/hr/Rights/rightsValue/masterRightsValue";

const BatchMaster = () => {
    const [action, setAction] = useState(false)
    const [service_name, setServiceName] = useState('')
    const [service_variation, setService_variation] = useState('')
    const [Batch_Duration, setBatch_Duration] = useState('')
    const [batch_timing, setBatch_timing] = useState('')
    const [trainer,setTrainer] = useState('')
    const [status, setStatus] = useState('')
    const [staff,setStaff] = useState([])
    const [classsesCategory,setClassesCategory] = useState('')
    const [typeOfTrainer,setTypeOfTrainer] = useState('')
    const [error,setError] = useState(false)
    const url1 = useSelector((el) => el.domainOfApi)
    const url = url1
    const pathVal = useAdminValidation('Master')
    const uniqObjVal =  useUniqAdminObjeact()

    const rightsData = useSelector((el)=>el?.empLoyeeRights?.masterRights?.masterCenterSetup?.items?.masterBatchTimeMaster?.rights) 
    const access = rightsData?rightsData:[]
    const isAdmin = useSelector((el)=>el.isAdmin)

    const batchTimeMasterStatus = (access.includes(masterRightValue.batchTimeMasterStatus) || isAdmin )
    const addBatchTimeMaster =  (access.includes(masterRightValue.addBatchTimeMaster) || isAdmin )
    const deleteBatchTimeMaster =  (access.includes(masterRightValue.deleteBatchTimeMaster) || isAdmin )


    const batch=[
        { value: "00:30", label: "30 min" },
        { value: "1:00", label: "1 hr" },
        { value: "1:30", label: "1 hr 30 min" },
        { value: "2:00", label: "2 hr" },
        { value: "2:30", label: "2 hr 30 min" },
        { value: "3:00", label: "3 hr" },
        { value: "3:30", label: "3 hr 30 min" },
    ]


    let user = JSON.parse(localStorage.getItem('user-info'))
    console.log(user);
    const token = user.token;
    const username = user.user.username;
    const [result, setResult] = useState([]);
    const [result1, setResult1] = useState([]);
    const [result2, setResult2] = useState([]);
    useEffect(() => {
        getBatch()
        getService()
        getSubService()
        getStaff()
    }, []);


   async function getStaff() {
    try{
     const {data} = await axios.get(`${url1}/employeeform/${pathVal}`,{ headers: {
        'Authorization': `Bearer ${token}`
    }})
     setStaff(data)
    }catch{
    }
    } 


    function getBatch() {
        axios.get(`${url1}/Batch/${pathVal}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res.data)
                setResult(res.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    function getService() {
        axios.get(`${url}/service/${pathVal}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res.data)
                setResult1(res.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }
    function getSubService() {
        axios.get(`${url}/subservice/${pathVal}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                setResult2(res.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }
    const updateStatus = (id, status) => {
        let item = { status: status }
        fetch(`${url1}/Batch/update/${id}`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        }).then((result) => {
            result.json().then((resp) => {
                getBatch()
            })
        })
    }

    function deleteBatch(id) {

        if (confirm('Do you want to delete this')) {
            fetch(`${url1}/Batch/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then((result) => {
                result.json().then((resp) => {
                    getBatch()
                })
            })
        }
    }


    const selectedStaff =  staff?.find((el)=>el?._id===trainer)
    const headers = {
        "Authorization": `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }

 const value =   service_variation.trim()&&Batch_Duration?.trim()&&
                  batch_timing.trim() && trainer.trim()&& classsesCategory.trim() &&
                  typeOfTrainer.trim()
                   

                  
console.log(Boolean(value))

    useEffect(() => {
        if(value){
            setError(false)
              return
           }
    }, [value])

    const saveBatch = () => {
       if(!value){
        setError(true)
          return
       }


        let data = { 
             username: username,
             service_name: service_variation, service_variation: 
             service_variation, Batch_Duration:batch.find((el)=>el.value===Batch_Duration).label,
             batch_timing:batch_timing, 
             status,
             trainer_name:selectedStaff?.FullName,
             category:classsesCategory,
             typeOfTrainer:typeOfTrainer,
	         MemberId:selectedStaff?._id,
   	         trainerId:selectedStaff?.EmployeeID,
             BatchTime:Batch_Duration,
             ...uniqObjVal
            }

            
const sendData = async (type)=>{
       if(type==='only'){
       return  axios.post(`${url1}/Batch/create`, data, { headers },)
       }else{
       return axios.all([
            axios.put(`${url1}/employeeform/${selectedStaff._id}`, {
                ...selectedStaff,trainerStatus:true
            }, { headers}),
            axios.post(`${url1}/Batch/create`, data, { headers },)       
        ])
       }
    }


const clearIn = ()=>{
    alert("successfully submitted")
    setServiceName('')
    setService_variation('')
    setBatch_Duration('')
    setBatch_timing('')
    setStatus(false)
    getBatch()
}


if(selectedStaff){
if(!selectedStaff?.trainerStatus){
    sendData('both').then((resp) => {
        clearIn()
        }).catch((error) => {
        console.error(error)
    })
}else{
  sendData('only').then((resp) => {
    clearIn()
}).catch((error) => {
console.error(error)
})
}

}




    }


    return (
        <CCard className="mb-3 border-success">
            <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                <CCardTitle>Batch Master</CCardTitle>
            </CCardHeader>
            <CCardBody>
                <CForm className="mb-2">
                    <div className="d-flex justify-content-between">
                        <div></div>
                        <div>
                            <CRow>
                                <CCol>
                                    <CButton style={{display:deleteBatchTimeMaster?'':'none'}} className="ms-1 mt-2" onClick={() => setAction(!action)}>{action ? 'close' : 'Add New Batch'}</CButton>
                                </CCol>
                            </CRow>
                        </div>
                    </div>
                    {action &&
                        <div>
                            <CRow className='mt-3'>
                                <CCol lg={4} md={6} sm={12}>
                                    <CFormSelect
                                        className="mb-1"
                                        aria-label="Select Service"
                                        label="Service"
                                        value={service_variation}
                                        onChange={(e) => setService_variation(e.target.value)}
                                    ><option>Select</option>
                                        <option>None</option>
                                        {result2.map((item, index) => (
                                             (
                                                item.status === true && (
                                                    <option key={index} >{item.selected_service} </option>
                                                )
                                            )
                                        ))}
                                    </CFormSelect>
                                </CCol>

                                <CCol lg={4} md={6} sm={12}>
                                    <CFormSelect
                                        className="mb-1"
                                        aria-label="Select Trainer"
                                        label="Trainer"
                                        value={trainer}
                                        onChange={(e) => setTrainer(e.target.value)}
                                        options={["Select Trainer",
                                            ...staff.filter((el)=>el.selected==="Select").map((el)=>({label:el.FullName,value:el._id}))
                                        ]}
                                    />
                                </CCol>

                                <CCol lg={4} md={6} sm={12}>
                                    <CFormSelect
                                        className="mb-1"
                                        aria-label="Select Trainer"
                                        label="Classes Category "
                                        value={classsesCategory}
                                        onChange={(e) => setClassesCategory(e.target.value)}
                                        options={[
                                            'Select Classes category',
                                            'Live Classes',
                                            'Studio Batches',
                                            'PT Classes',
                                            "TTC Classes",
                                        ]}
                                    />
                                </CCol>
                                <CCol lg={4} md={6} sm={12}>
                                    <CFormSelect
                                        className="mb-1"
                                        aria-label="Select Service"
                                        label="Batch Duration"
                                        value={Batch_Duration}
                                        onChange={(e) => setBatch_Duration(e.target.value)}
                                        options={[
                                            "Select Duration",
                                            ...batch
                                        ]}
                                    />
                                </CCol>
                                
                                <CCol lg={4} md={6} sm={12}>
                                    <CFormInput
                                        className="mb-1"
                                        type="time"
                                        id="exampleFormControlInput1"
                                        label="Batch Timing "
                                        value={batch_timing}
                                        onChange={(e) =>{
                                            setBatch_timing(e.target.value)                                                                               
                                        }}
                                        placeholder="Enter Batch Timing"
                                    />
                                </CCol>
                              

                                <CCol lg={4} md={6} sm={12}>
                                    <CFormSelect
                                        className="mb-1"
                                        label="Type of trainer"
                                        value={typeOfTrainer}
                                        onChange={(e) => setTypeOfTrainer(e.target.value)}
                                        options={[
                                            { label:"Select type of Trainer", value: "" },
                                            { label: "In door", value: "In door" },
                                            { label: "Out door", value: "Out door" },
                                        ]}
                                    />
                                </CCol>


                                <CCol lg={6} md={6} sm={12}>
                                    <CFormSwitch size="xl" className="mt-2" value={status} onChange={() => setStatus(!status)} label="Status" style={{ defaultChecked: 'false' }} />
                                    <CButton className="mt-2" onClick={saveBatch}>Save</CButton>
                                </CCol>

                            </CRow>
                            <CRow>
                                {error?<p style={{color:"warning"}}>Please fill all Details</p>:''}
                            </CRow>
                        </div>
                    }
                </CForm>
                <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                    <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                        <CTableRow >
                            <CTableHeaderCell>Sr.No</CTableHeaderCell>
                            <CTableHeaderCell>Service Name</CTableHeaderCell>
                            <CTableHeaderCell>Trainer Name</CTableHeaderCell>
                            <CTableHeaderCell>Category Name</CTableHeaderCell>
                            <CTableHeaderCell>Batch Duration</CTableHeaderCell>
                            <CTableHeaderCell>Batch Timing</CTableHeaderCell>
                            <CTableHeaderCell>Type of Trainer</CTableHeaderCell>
                            <CTableHeaderCell  style={{display:batchTimeMasterStatus?'':'none'}}>Status</CTableHeaderCell>
                            <CTableHeaderCell style={{display:deleteBatchTimeMaster?'':'none'}}>Action</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {result.map((item, index) => (
                            (
                                <CTableRow key={index}>
                                    <CTableDataCell>{index + 1}</CTableDataCell>
                                    <CTableDataCell>{item.service_variation}</CTableDataCell>
                                    <CTableDataCell>{item.trainer_name}</CTableDataCell>
                                    <CTableDataCell>{item.category}</CTableDataCell>
                                    <CTableDataCell>{item.Batch_Duration}</CTableDataCell>
                                    <CTableDataCell>{item.batch_timing}</CTableDataCell>
                                    <CTableDataCell>{item.typeOfTrainer}</CTableDataCell>
                                    <CTableDataCell style={{display:batchTimeMasterStatus?'':'none',}}><CFormSwitch size="xl" style={{ cursor: 'pointer' }} id={item._id} value={item.status} checked={item.status} onChange={() => updateStatus(item._id, !item.status)} /></CTableDataCell>
                                    <CTableDataCell style={{display:deleteBatchTimeMaster?'':'none',}}> <MdDelete style={{ cursor: 'pointer', markerStart: '10px' }} onClick={() => deleteBatch(item._id)} size='20px' /> </CTableDataCell>
                                </CTableRow>
                            )
                        ))}
                    </CTableBody>
                </CTable>
            </CCardBody>
        </CCard>
    );
};

export default BatchMaster;