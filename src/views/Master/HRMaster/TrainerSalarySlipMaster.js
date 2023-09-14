import React, { useEffect, useState } from 'react'
import {
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardHeader,
    CCardTitle,
    CCol,
    CFormInput,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,

} from '@coreui/react'
import   FormConecter from  './TrainerSlipForm/FormConecter'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { MdDelete, MdEdit } from 'react-icons/md'
import { useAdminValidation,useUniqAdminObjeact } from 'src/views/Custom-hook/adminValidation'
import { herMasterRightVal } from 'src/views/hr/Rights/rightsValue/masterRightsValue'

let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;

const TrainerSalarySlipMaster = () => {

    const rightsData = useSelector((el)=>el?.empLoyeeRights?.masterRights?.masterHr
    ?.items?.masterTrainerSalarySlip?.rights) 
    
    const access = rightsData?rightsData:[]
    const isAdmin = useSelector((el)=>el.isAdmin)
    
    const addTrainerSalarySlip = (access.includes(herMasterRightVal.addTrainerSalarySlip) || isAdmin )
    const editTrainerSalarySlip =  (access.includes(herMasterRightVal.editTrainerSalarySlip) || isAdmin )
    const deleteTrainerSalarySlip =  (access.includes(herMasterRightVal.deleteTrainerSalarySlip) || isAdmin )

  const [trainerSalarySlipData,setTrainerSalrySlipData] = useState([])  
  const url1 = useSelector((el) => el.domainOfApi)
  const pathValMaster =  useAdminValidation('Master')

  const [updateActive,setUpdateActive] = useState({visible:false,obj:{}})



   const getTrainerSalarySlipData = ()=>{
    axios.get(`${url1}/trainerSalarySlip/${pathValMaster}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then((res) => {
            console.log(res.data)
            setTrainerSalrySlipData(res.data.reverse())
        })
        .catch((error) => {
            console.error(error)
        })
  }
  
  useEffect(()=>{
    getTrainerSalarySlipData()
  },[])

    return (
        <>
 
        <CRow>
            <CCol lg={12} sm={12}>
                <CCard className="mb-3 border-success">
                    <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                        <CCardTitle className="mt-2">Trainer Salary Sheet</CCardTitle>
                    </CCardHeader>
                    <CCardBody>

                   <FormConecter updateActive={updateActive} setUpdateActive={setUpdateActive} getData={()=>getTrainerSalarySlipData()} />

                        <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                                <CTableRow >
                                    <CTableHeaderCell>Sr no</CTableHeaderCell>
                                    <CTableHeaderCell>Date</CTableHeaderCell>
                                    <CTableHeaderCell>Trainer name</CTableHeaderCell>
                                    <CTableHeaderCell>Total Working Hours</CTableHeaderCell>  
                                    <CTableHeaderCell>Per Hours Amount</CTableHeaderCell>  
                                    <CTableHeaderCell>Amount</CTableHeaderCell>             
                                    <CTableHeaderCell>TDS</CTableHeaderCell>  
                                    <CTableHeaderCell>PT</CTableHeaderCell>  
                                    <CTableHeaderCell>ADV DEC</CTableHeaderCell>      
                                    <CTableHeaderCell>Mode OF Payment</CTableHeaderCell>  
                                    <CTableHeaderCell>Net Salary</CTableHeaderCell>  
                                    <CTableHeaderCell style={{display:(editTrainerSalarySlip||deleteTrainerSalarySlip)?'':'none'}} >Edit/Delete</CTableHeaderCell>                                    
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                <CTableRow>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "60px" }}
                                            type="text"
                                            disabled
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "90px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "120px" }}
                                            type="text"
                                            disabled
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "100px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "100px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "100px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "100px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "100px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "100px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "100px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell  >
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "100px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell style={{display:(editTrainerSalarySlip||deleteTrainerSalarySlip)?'':'none'}} >
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "100px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                      
                                </CTableRow>
                                {trainerSalarySlipData.map((el,i)=>{

                                return <CTableRow className='text-center' >
                                        <CTableDataCell>{i+1}</CTableDataCell>
                                        <CTableDataCell>{new Date(el.date).toLocaleDateString()}</CTableDataCell>
                                        <CTableDataCell>{el.trainerName}</CTableDataCell>
                                        <CTableDataCell>{el.totalWorkingHours}</CTableDataCell>
                                        <CTableDataCell>{el.prHourSalary}</CTableDataCell>
                                        <CTableDataCell>{el.totalAmount}</CTableDataCell>
                                        <CTableDataCell>{el.tds}%</CTableDataCell>

                                        <CTableDataCell>{el.pt}</CTableDataCell>
                                        <CTableDataCell>{el.advDec}</CTableDataCell>
                                        <CTableDataCell>{el.modeOfPayment}</CTableDataCell>
                                        <CTableDataCell>{el.amount}</CTableDataCell>
                                        <CTableDataCell style={{display:(editTrainerSalarySlip||deleteTrainerSalarySlip)?'':'none'}}>
                                            <MdEdit  style={{cursor:'pointer',display:editTrainerSalarySlip?'':'none'}} onClick={()=>setUpdateActive(()=>({visible:true,obj:el}))}/>
                                            <MdDelete style={{cursor:'pointer',display:deleteTrainerSalarySlip?'':'none'}}/>
                                        </CTableDataCell>
                                    </CTableRow>
                                })}
                                      
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                 
                </CCard>
            </CCol>
        </CRow>
        </>
    )
}

export default TrainerSalarySlipMaster
