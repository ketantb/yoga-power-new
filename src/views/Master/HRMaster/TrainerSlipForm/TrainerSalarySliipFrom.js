import React, { useEffect, useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCardTitle,
    CCol,
    CFormInput,
    CFormSelect,
    CRow,
    CNav,
    CNavItem,
    CNavLink
} from '@coreui/react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useAdminValidation, useUniqAdminObjeact } from 'src/views/Custom-hook/adminValidation';
import moment from 'moment/moment';
let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;
const username = user.user.username;


const headers = {
    "Authorization": `Bearer ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
   }


const TrainerSalarySliipFrom = ({updateActive,getData}) => {
    const url = useSelector((el) => el.domainOfApi)
    const pathValMaster = useAdminValidation('Master')
    const uniObjVal =  useUniqAdminObjeact()
    const [activeKey,setActiveKey] = useState(1)
    const [designationData,setDesignationData] = useState([])
    const obj = {
    username: username,
    date:new Date(),
    trainerName:'',   
    prHourSalary:0,
    totalWorkingHours:0,
    amount:0,
    tds:0,
    pt:0,
    advDec:0,
    modeOfPayment:'',
    totalAmount:0,
    trainerId:'',
    designation:'',
    location:'',
    Department:'',
    bankAccountNo:'',
    EmpId:'',
    Pf:0,
    typeOfJobTimeing:'',
    ctc:0,
    joiningDate:'',
    remark:'',
    Gender:''
    }
    
  const [trainerSlarySlipObj,setTrainerSlarySlipObj] = useState({...obj}) 

const [tdsamount,setTdsAmount] = useState(0)

const [staff, setStaff] = useState([])

const selectedStaff =  staff?.find((el)=>el?._id===trainerSlarySlipObj.trainerId)


useEffect(()=>{

  setTrainerSlarySlipObj((prev)=>({...prev,
    designation:selectedStaff?.JobDesignation,
    location:selectedStaff?.address,
    Department:selectedStaff?.Department,
    bankAccountNo:selectedStaff?.AccountNo,
    EmpId:selectedStaff?.EmployeeID,
    typeOfJobTimeing:selectedStaff?.AccountNo,
    joiningDate:selectedStaff?.joiningDate,
    Gender:selectedStaff?.Gender,
  }))
},[selectedStaff?._id])

const headers ={
  'Authorization': `Bearer ${token}`
}

 function getStaff() {

  const response =   axios.get(`${url}/designation/${pathValMaster}`,{headers})
  const response2 =   axios.get(`${url}/employeeform/${pathValMaster}`,{headers})
 
  Promise.all([response,response2]).then((res)=>{
    const allData = res
    setDesignationData(allData[0].data)
    setStaff(allData[1].data)
   }).catch((error) => {
    console.error(error)
})

}
useEffect(()=>{
    getStaff()
},[])



useEffect(()=>{
if(!(trainerSlarySlipObj.tds+1)){
      return 
}
setTdsAmount(+trainerSlarySlipObj.tds)
},[trainerSlarySlipObj.totalAmount,trainerSlarySlipObj.tds])


const saveData = async  (type)=>{
   const data = {...trainerSlarySlipObj,trainerName:selectedStaff.FullName,amount:
     trainerSlarySlipObj.totalAmount-tdsamount-+trainerSlarySlipObj.pt-+trainerSlarySlipObj.advDec}


   let response ={}
   try{
     if(type==='Save'){
       response = await  axios.post(`${url}/trainerSalarySlip/create`,{...uniObjVal,...data},{headers})
     }
     if(type==='Update'){
      response = await  axios.post(`${url}/trainerSalarySlip/update/${updateActive.obj?._id}`,data,{headers})
     }
    if(response?.status===200){
        getData()
     alert('successfully save')
    }
     }catch(error){
       console.error(error)
     }
   
}


useEffect(()=>{
if(updateActive?.visible){
setTrainerSlarySlipObj(updateActive?.obj)
}else{
setTrainerSlarySlipObj({...obj})
  setTdsAmount(0)
}
},[updateActive?.visible])



  return (
    <CCard className="mb-3 border-success mt-4">
                    <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                        <CCardTitle className="mt-2">Trainer salary Sheet form</CCardTitle>
                    </CCardHeader>
                    <CCardBody>

    <CRow className='text-start mb-4'>
            <CCol sm={4}>
              <h5>Trainer Salry Date</h5>
              <CFormInput
              size='lg'
              type='date'
              value={trainerSlarySlipObj.date}
              onChange={(e)=>setTrainerSlarySlipObj(prev=>({...prev, date:e.target.value}))}
              />
           
              </CCol>         
    </CRow>


           <CRow>
            <CCol lg={3} md={4} >
              <CFormSelect
              label='Trainer Name'
              value={trainerSlarySlipObj.trainerId}
              onChange={(e)=>setTrainerSlarySlipObj(prev=>({...prev, trainerId:e.target.value}))}
              >
                <option value=''>Select Employee</option>
                        {staff.filter((list) => 
                          list.selected === 'Select').map((item, index) => (
                            <option key={index} value={item._id}> {item.FullName}</option>
                          ))}
              </CFormSelect>
              </CCol>

              <CCol lg={3} md={4} >
                <CFormInput
                  type="text"
                  label='Emp Id'
                  value={trainerSlarySlipObj.EmpId}
                  onChange={(e)=>setTrainerSlarySlipObj(prev=>({...prev,EmpId:e.target.value}))}
                />
              </CCol>

              <CCol lg={3} md={4} >
                <CFormInput
                  type="date"
                  placeholder="Enter Your Name"
                  label='Joining Date'
                  value={moment(trainerSlarySlipObj.joiningDate).format('YYYY-MM-DD')}
                  onChange={(e)=>setTrainerSlarySlipObj(prev=>({...prev,joiningDate:e.target.value
                  }))}
                />
              </CCol>
              <CCol  lg={3} md={4} >
                  <CFormSelect 
                  label='Select Your Gender'
                  value={trainerSlarySlipObj.Gender}
                  onChange={(e)=>setTrainerSlarySlipObj(prev=>({...prev,Gender:e.target.value}))}
                  options={[
                    "Select Gender",
                    { label: 'Male', value: 'Male' },
                    { label: 'Female', value: 'Female' }

                  ]}
              />

              </CCol>
              <CCol lg={3} md={4} >
              <CFormInput
              label='Location'
              value={trainerSlarySlipObj.location}
              onChange={(e)=>setTrainerSlarySlipObj(prev=>({...prev,location:e.target.value}))}
              />
            </CCol>

            
            <CCol lg={3} md={4}>
                      <CFormSelect
                        className="mb-1"
                        aria-label="Select Job Department"
                        value={trainerSlarySlipObj.Department}
                        onChange={(e)=>setTrainerSlarySlipObj(prev=>({...prev,Department:e.target.value}))}
                        label="Department"
                      >
                        <option>Select Department</option>

                        {designationData.map((item, index) => (
                         (
                            item.status === true && (
                              <option key={index} >{item.department}</option>
                            )
                          )
                        ))}
                      </CFormSelect>
                </CCol>    

                 <CCol lg={3} md={4}>
                      <CFormSelect
                        className="mb-1"
                        aria-label="Select Job Designation"
                        value={trainerSlarySlipObj.designation}
                        onChange={(e)=>setTrainerSlarySlipObj(prev=>({...prev,designation:e.target.value}))}
                        label="Job Designation"
                      >
                        <option>Select Designation</option>
                        {designationData.map((item, index) => (
                          item.status === true && (
                            <option key={index} >{item.jobDesignation}</option>
                          )

                        ))}
                      </CFormSelect>
                </CCol> 

               

                <CCol  lg={3} md={4}>
              <CFormInput
                  label='Bank Acount No'
                  value={trainerSlarySlipObj.bankAccountNo}
                  onChange={(e)=>setTrainerSlarySlipObj(prev=>({...prev,bankAcountNo:e.target.value}))}
                  
              />
                </CCol> 
             
              
              <CCol lg={3} md={4} >
              <CFormInput
              label='Total Working Hour'
              type='number'
              value={trainerSlarySlipObj.totalWorkingHours}
              onChange={(e)=>{
                setTrainerSlarySlipObj(prev=>{
                   return ({...prev,totalWorkingHours:e.target.value,totalAmount:prev.prHourSalary*e.target.value})
                
                })
            
            }}      
            >
              </CFormInput>
              </CCol>
             
       
            <CCol lg={3} md={4} >
            <CFormInput
              label='Per Hour Amount'
              value={trainerSlarySlipObj.prHourSalary}
              onChange={(e)=>{
                setTrainerSlarySlipObj(prev=>{
                return   ({...prev,prHourSalary:e.target.value,totalAmount:prev.totalWorkingHours*e.target.value})
                
                })
              }}
              >
              </CFormInput>
            </CCol>
            <CCol lg={3} md={4} >
            <CFormInput
              label='Total Amount'
              value={trainerSlarySlipObj.totalAmount}
              >
              </CFormInput>
            </CCol>
     
            <CCol  lg={3} md={4} >
              <CFormInput
              label='TDS'
              value={trainerSlarySlipObj.tds}
              onChange={(e)=>{
                setTrainerSlarySlipObj(prev=>({...prev,tds:e.target.value}))
            }}
              />
            </CCol>
            <CCol  lg={3} md={4} >
              <CFormInput
              label='PF'
              value={trainerSlarySlipObj.Pf}
              onChange={(e)=>{
                setTrainerSlarySlipObj(prev=>({...prev,Pf:e.target.value}))
            }}
              />
            </CCol>
            <CCol  lg={3} md={4} >
              <CFormInput
              label='PT'
              value={trainerSlarySlipObj.pt}
              onChange={(e)=>{
                setTrainerSlarySlipObj(prev=>({...prev,pt:e.target.value}))
            }}
              />
            </CCol>
    
            <CCol  lg={3} md={4} >
              <CFormInput
              label='ADV DEC'
              value={trainerSlarySlipObj.advDec}
              onChange={(e)=>{
                setTrainerSlarySlipObj(prev=>({...prev,advDec:e.target.value}))
            }}
              />
            </CCol>
            <CCol  lg={3} md={4} >
              <CFormSelect
              label='Mode OF Payment'
              options={[
                "Select",
                { label: "Cash", value: "Cash" },
                { label: "Debit Card", value: "Debit Card" },
                { label: "Credit Card", value: "Credit Card" },
                { label: "Cheque", value: "Cheque" },
                { label: "Draft", value: "Draft" },
                { label: "Paytm", value: "Paytm" },
                { label: "GPay", value: "GPay" },
                { label: "PhonePe", value: "PhonePe" },
                { label: "Account Pay", value: "Account Pay" },
                
              ]}
            value={trainerSlarySlipObj.modeOfPayment}
              onChange={(e)=>{
                setTrainerSlarySlipObj(prev=>({...prev,modeOfPayment:e.target.value}))
            }}
              />
            </CCol>
            <CCol  lg={3} md={4}>
              <CFormInput
                  label='Remark'
                  value={trainerSlarySlipObj.remark}
                  onChange={(e)=>setTrainerSlarySlipObj(prev=>({...prev,remark:e.target.value}))}
                  
              />
                </CCol> 
 <CCol lg={3} md={4} >
              <CFormInput
              label='Net Salar'
              value={(trainerSlarySlipObj.totalAmount-tdsamount-+trainerSlarySlipObj.pt-+trainerSlarySlipObj.advDec-+trainerSlarySlipObj.Pf||0)}
              />
            </CCol>
        </CRow>
        
         
            <CCol className='text-end py-2'>
              {!updateActive.visible&& <CButton onClick={()=>saveData('Save')}>Save</CButton>}
              {!!updateActive.visible &&<CButton onClick={()=>saveData('Update')}>Update</CButton>}
            </CCol>
                    </CCardBody>
                </CCard>
  )
}

export default TrainerSalarySliipFrom
