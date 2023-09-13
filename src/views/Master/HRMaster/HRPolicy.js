import { cilArrowCircleTop } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
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
    CFormSwitch,
    CFormTextarea,
    CPagination,
    CPaginationItem,
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
import { MdDelete,MdEdit } from "react-icons/md";

import { Link } from "react-router-dom";

import { useSelector,useDispatch } from "react-redux";
import { useAdminValidation,useUniqAdminObjeact } from "src/views/Custom-hook/adminValidation";
import { herMasterRightVal } from "src/views/hr/Rights/rightsValue/masterRightsValue";
import useJobProfileHook from "./useJobProfileHook";

const HRPolicy = () => {
    const [action, setAction] = useState(false)
    const [Title, setTitle] = useState('')
    const [Policy, setPolicy] = useState('')
    const dispatch = useDispatch() 
    const [selectedPolicy,setSelectedPolicy] = useState()
    const [activeUpdate,setActiveUpdate] = useState({
        showUpdateButton:false,
        updateElId:''
    })

    

const rightsData = useSelector((el)=>el?.empLoyeeRights?.masterRights?.masterHr
?.items?.masterHrPolicy?.rights) 

const access = rightsData?rightsData:[]
const isAdmin = useSelector((el)=>el.isAdmin)

const addHrPolicy = (access.includes(herMasterRightVal.addHrPolicy) || isAdmin )
const deleteHrPolicy =  (access.includes(herMasterRightVal.deleteHrPolicy) || isAdmin )

    const url = useSelector((el)=>el.domainOfApi) 
    const uniqObjVal = useUniqAdminObjeact()
    const pathValMaster = useAdminValidation('Master')
    const jobProfileFun = useJobProfileHook()


    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;
    const username = user.user.username;
    const [result1, setResult1] = useState([]);
    const [paging, setPaging] = useState(0);
    const headers = {
        'Authorization': `Bearer ${token}`,
        'My-Custom-Header': 'foobar'
    };
    useEffect(() => {
        getPolicy()
    }, []);

    function getPolicy() {
        axios.get(`${url}/hrPolicyMaster/${pathValMaster}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                setResult1(res.data.reverse())
                setSelectedPolicy(res.data[0]?.Policy)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    function createPolicy(e) {
        e.preventDefault()
        if(activeUpdate.showUpdateButton){
            updateData()
            return
        }
        if (Title != '' && Policy != '') {
            const data = {
                username: username,
                Title, Policy,
                ...uniqObjVal
            }
            axios.post(`${url}/hrPolicyMaster/create`, data, { headers })
                .then((resp) => {
                    alert('Successfully Added')
                    getPolicy()
                    setAction(false)
                    setTitle('')
                    setPolicy('')
                })
                .catch((error) => console.log(error))
        } else {
            alert('enter lead Source')
        }
    }

    function deleteData(id) {
        if (confirm('You want to delete this')) {
            fetch(`${url}/hrPolicyMaster/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then((result) => {
                result.json().then((resp) => {
                    console.warn(resp)
                    getPolicy()
                })
            })
        }
        return
    }

    function updateData() {
        const data = {
            username: username,
            Title, Policy,
            ...uniqObjVal
        }
            fetch(`${url}/hrPolicyMaster/update/${activeUpdate.updateElId}`, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(data)
            }).then((result) => {
                result.json().then((resp) => {
                    console.warn(resp)
                    getPolicy()
                })
            })
        
    }


    function clear(){
        setActiveUpdate(prev=>({
            showUpdateButton:false,
            updateElId:''
        }))
        setTitle('')
        setPolicy('')
        setAction(prev=>!prev)  
    }

    function handleUpdate(item){
    setActiveUpdate({
        showUpdateButton:true,
        updateElId:item._id
    })
    setTitle(item.Title)
    setPolicy(item.Policy)
    setAction(true)
    }

    return (
        <CRow>
            
            <CCol lg={12} sm={12}>


                <CCard className="mb-3 border-success">
                    <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                        <CCardTitle className="mt-2">Hr Policy</CCardTitle>
                    </CCardHeader>
                    <CCardBody>

                    <h6 className="mt-2">Write the title in bracket
                     <span><b>[title]</b></span>    
                     </h6>
                     <p className="p-0 m-1">Write the Content in small Bracket <span><b>(Content)</b></span>  </p> 
                     <p className="p-0 m-1">Between <span><b>(Content)</b></span> and <span><b>[title]</b></span>   Should be Colon <span><b>[title]:(Content)</b></span> </p>
                     <p className="p-0 m-1">To Split the Line in <span><b>(content)</b> </span>    add this Syntext  <span><b>$brsplit</b></span>  </p> 
                     <p className="p-0 m-1">To write only title <span><b>[title]:()</b> </span> </p> 
                     <p className="p-0 m-1">To write only content<span><b>(content) or content </b> </span> </p>

                        <div className="d-flex justify-content-between">
                            <div></div>
                            <div>
                                <CRow>
                                    <CCol>
                                        <CButton style={{display:addHrPolicy?'':'none' }} className="ms-1 mt-2" onClick={() => clear(!action)}>{action ? 'Close' : 'Add Policy'}</CButton>
                                    </CCol>
                                </CRow>
                            </div>
                        </div>
                        {action &&
                            <form onSubmit={createPolicy} className=" p-3">

                                <CRow className='d-flex mb-2' >
                                    <CCol lg={12} sm={12} className='mb-2'>
                                        <CFormInput
                                            type='text'
                                            placeholder="Title"
                                            value={Title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            label="Title"
                                            aria-label="Recipient's username"
                                            aria-describedby="button-addon2"
                                            required
                                        />
                                    </CCol>
                                    <CCol lg={12} sm={12} className='mb-2'>
                                        <CFormTextarea
                                            id="exampleFormControlTextarea1"
                                            placeholder='Enter Policy'
                                            value={Policy}
                                            onChange={(e) => setPolicy(e.target.value)}
                                            label="Policy"
                                            rows="5"
                                            text="Must be 8-20 words long."
                                            required
                                        ></CFormTextarea>
                                    </CCol>
                                </CRow>
                                {activeUpdate.showUpdateButton?<CButton type='submit' color="primary" >
                                    Update 
                                </CButton>:<CButton type='submit' color="primary" >
                                    Save
                                </CButton>}
                            </form>
                        }
                        
                        <ul className=" " style={{listStyleType:'none'}} >
                                  {result1.slice(paging * 10, paging * 10 + 10).filter((list) =>

                                    list).map((item) => (
                                          <li className="mx-3 d-inline-block mt-4"  >
                                            <CButton variant={item.Policy===selectedPolicy?'':'outline'} onClick={()=>setSelectedPolicy(item.Policy)} style={{height:'fit-content'}}   >{item.Title}</CButton>
                                            <MdDelete  style={{cursor:'pointer'}} className="mx-2" onClick={()=>deleteData(item._id)}/>
                                            <MdEdit   style={{cursor:'pointer'}} className="mx-2" onClick={()=>handleUpdate(item)}/>
                                         </li>                                            
                                    ))}
                               </ul>

                               <CCard>
                                {jobProfileFun(selectedPolicy)}
                         </CCard>
                          
                              
                        
                    </CCardBody>
                 
                </CCard>
            </CCol>
        </CRow>
    )
}

export default HRPolicy
