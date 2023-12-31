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
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CForm,
    CNav,
    CNavItem,
    CNavLink,
    CTabContent,
    CTabPane,
    CPagination,
    CPaginationItem
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowCircleBottom, cilArrowCircleTop, cilInfo } from '@coreui/icons'
import { MdCall, MdDelete, MdEdit, MdMail } from 'react-icons/md';
import { BsPlusCircle, BsWhatsapp } from 'react-icons/bs';
import { useSelector } from "react-redux";
import axios from 'axios';
import moment from 'moment';
import { icons } from 'react-icons/lib';
import { useAdminValidation,useUniqAdminObjeact } from 'src/views/Custom-hook/adminValidation';
import { herMasterRightVal } from 'src/views/hr/Rights/rightsValue/masterRightsValue';

let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;
const username = user.user.username;


const PayrollMaster = () =>{

  const pathVal = useAdminValidation('Master')
  const uniqObjVal = useUniqAdminObjeact()

  const rightsData = useSelector((el)=>el?.empLoyeeRights?.masterRights?.masterHr
  ?.items?.masterSalarySheet?.rights) 

  const access = rightsData?rightsData:[]
  const isAdmin = useSelector((el)=>el.isAdmin)

  const addSalarySheet = (access.includes(herMasterRightVal.addSalarySheet) || isAdmin )
  const editSalarySheet =  (access.includes(herMasterRightVal.editSalarySheet) || isAdmin )
  const deleteSalarySheet2 =  (access.includes(herMasterRightVal.deleteSalarySheet) || isAdmin )  



  const obj = {
    username:username,
    month:new Date(),
    empId:'',
    joiningDate:'',
    Gender:'',  
    empName:'',
    Designations:'',
    Department:'',
    lateMark:'0',
    halfday:'0',
    leaveDay:'0',
    adjustLeave:'0',
    TWD:30,
    TPD:'0',
    TDS:'0',
    grossSalary:'0',
    BasicSalary:'0',
    incentive:'0',
    PT:'0',  
    netSalary:'0',
    remark:'',
    advancedSalaryDedct:'0',
    Location:'0',
    typeOfJobTimeing:'0',
    modeOfPayment:'0',
    ctc:'0',
    bankAcountNo:''
  }


  

  const [showForm,setForm] = useState(true)
  const [salarySheet,setSalarySheet] = useState({...obj})
  const [grossSalaryCalculation,setGrossSalaryCalculation] = useState(0)
  const [salarySheetData,setSalarySheetData] = useState([])
  const [updateActive,setUpdateActive] = useState(false)
  const [activeKey, setActiveKey] = useState(1)

  const url = useSelector((el) => el.domainOfApi)


  const headers = {
    "Authorization": `Bearer ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
   }



   const [searchFilter,setSearchFilter] = useState({
    search1:'',
    search2:'',
    search3:'',
    search4:'',
    search5:'',
    search6:'',
    search7:'',
    search8:'',
    search9:'',
    search10:'',
    search11:'',
    search12:'',
    search13:'',
    search14:'',
})

const [paging, setPaging] = useState(0);


const [staff, setStaff] = useState([])

const selectedStaff =  staff?.find((el)=>el?._id===salarySheet?.empName)

function getStaff() {
    axios.get(`${url}/employeeform/${pathVal}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then((res) => {
            setStaff(res.data.reverse())
        })
        .catch((error) => {
            console.error(error)
        })
}


useEffect(()=>{
  setSalarySheet(prev=>({...prev,empId:selectedStaff?.EmployeeID}))
  setSalarySheet(prev=>({...prev,Designations:selectedStaff?.JobDesignation }))
  setSalarySheet(prev=>({...prev,Department:selectedStaff?.Department  }))
  setSalarySheet(prev=>({...prev,BasicSalary:Math.round(selectedStaff?.Salary /12),
  grossSalary:Math.round(selectedStaff?.Salary /12),
  bankAcountNo:selectedStaff?.AccountNo
}))
  setSalarySheet(prev=>({...prev,ctc:selectedStaff?.Salary }))
  setSalarySheet(prev=>({...prev,joiningDate:selectedStaff?.joiningDate }))
  setSalarySheet(prev=>({...prev,Location:selectedStaff?.address }))
  setSalarySheet(prev=>({...prev,typeOfJobTimeing:selectedStaff?.Grade}))
  setSalarySheet(prev=>({...prev,Gender:selectedStaff?.Gender}))
  setGrossSalaryCalculation(Math.round(selectedStaff?.Salary /12))
},[salarySheet.empName])



const totalLeave = ((+salarySheet.halfday/100)*50)+ +(salarySheet.lateMark/6)+ +salarySheet.leaveDay
const removeLeave  =+salarySheet.adjustLeave

const totalDecAdPt  = +((+salarySheet.BasicSalary/100)*+salarySheet.TPD ) + +salarySheet.PT + + +((+salarySheet.BasicSalary/100)*+salarySheet.TDS )
const basicSalary  =  salarySheet.BasicSalary

const netSlaryCal  = +salarySheet.incentive - +salarySheet.advancedSalaryDedct



useEffect(()=>{
 
  setSalarySheet(prev=>{
    setGrossSalaryCalculation(Math.round(+prev.grossSalary-((+prev.grossSalary/30)* ( totalLeave-removeLeave )+totalDecAdPt)))
    return  {...prev,
      TWD:30+ - totalLeave + removeLeave
     }
  })    

},[totalLeave,removeLeave])


useEffect(()=>{

  setSalarySheet(prev=>{
    setGrossSalaryCalculation(Math.round(+prev.grossSalary-((+prev.grossSalary/30)* (totalLeave-removeLeave ) +totalDecAdPt)))
    return  {...prev}
  })    
  },[totalDecAdPt,basicSalary])

  useEffect(()=>{



    setSalarySheet(prev=>{
      return  {...prev,netSalary:+grossSalaryCalculation +netSlaryCal }
    })    
    
    },[grossSalaryCalculation,netSlaryCal])


const getSalarySheetData = ()=>{
  axios.get(`${url}/salarySheet/${pathVal}`,{headers}).then((el)=>{
   if(!el.status){
    return 
   }
   setSalarySheetData(el.data.reverse())
 }).catch((error)=>{console.log(error)})
 }


useEffect(() => {
  getSalarySheetData()
  getStaff()
}, [])

function deleteSalarySheet(id) {
  if (confirm('Do you want to delete this')) {
      fetch(`${url}/salarySheet/delete/${id}`, {
          method: 'DELETE',
          headers: {
              "Authorization": `Bearer ${token}`,
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
      }).then((result) => {
          result.json().then((resp) => {
              getSalarySheetData()
          })
      })
  }
}



const saveData = async (type)=>{


  let response ={}
  try{
    if(type==='Save'){
      response = await  axios.post(`${url}/salarySheet/create`,{...salarySheet,grossSalary:grossSalaryCalculation
        ,...uniqObjVal,empName:selectedStaff?.FullName,employeeID:selectedStaff._id},{headers})
    }
    if(type==='Update'){
     response = await  axios.post(`${url}/salarySheet/update/${salarySheet?._id}`,{...salarySheet,
      grossSalary:grossSalaryCalculation,
      empName:selectedStaff?.FullName},{headers})
    }
   if(response?.status===200){
    getSalarySheetData()
    alert('successfully save')
   }
    }catch(error){
      console.error(error)
    }
}


 const [result, setResult] = useState([])
 function getDesignation() {
     axios.get(`${url}/designation/${pathVal}`, {
         headers: {
             'Authorization': `Bearer ${token}`
         }
     })
         .then((res) => {
             setResult(res.data.reverse())

         })
         .catch((error) => {
             console.error(error)
         })
 }

useEffect(()=>{
 getDesignation()
},[])


const updateProduct = async (item)=>{
  setForm(false)
  setSalarySheet({...item,empName:item.employeeID})
  setGrossSalaryCalculation(item.grossSalary)
  setUpdateActive(true)
}

function toFilterData(data){
  return data.filter((el)=>{
      return (new Date(el.month)?.toLocaleDateString()||'').includes(searchFilter.search2.toLowerCase().trim())&&
      (el.empId.toLowerCase()||'').includes(searchFilter.search3.toLowerCase().trim())&&
      (el.empName.toLowerCase()||'').includes(searchFilter.search4.toLowerCase().trim())&&
      (new Date(el.joiningDate)?.toLocaleDateString()||'').includes(searchFilter.search5.toLowerCase().trim())&&
      (el.Gender.toLowerCase()||'').includes(searchFilter.search6.toLowerCase().trim())&&
      (el.Location.toLowerCase()||'').includes(searchFilter.search7.toLowerCase().trim())&&
      (el.typeOfJobTimeing.toLowerCase()||'').includes(searchFilter.search8.toLowerCase().trim())&&
      (el.Department.toLowerCase()||'').includes(searchFilter.search9.toLowerCase().trim())   &&
      (el.Designations?.toLowerCase()||'').includes(searchFilter.search10.toLowerCase().trim())   &&
      (el.bankAcountNo?.toLowerCase()||'').includes(searchFilter.search11.toLowerCase().trim())  && 
      (el.modeOfPayment.toLowerCase()||'').includes(searchFilter.search13.toLowerCase().trim())

})
}

    return <div>
      <CCard className="mb-3 border-success mt-4">
                    <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                        <CCardTitle className="mt-2">Salary Sheet </CCardTitle>
                    </CCardHeader>
                    <CCardBody>

                     
    {showForm?<CCol className="bg-body d-flex justify-content-end">
            <CButton onClick={()=>setForm((value)=>!value)}
            style={{display:addSalarySheet?'':'none'}}
            >Add New Salary</CButton>
    </CCol>:

    <CCard className="overflow-hidden">
        <CCardHeader className="p-2" style={{ backgroundColor: '#0B5345', color: 'white' }}>
                 <CCardTitle> <h4>Salary Setup</h4></CCardTitle>
        </CCardHeader>
        <CCardBody>

            <CCol className="d-flex justify-content-end">
                <CButton color='danger' onClick={()=>{
                  setForm(()=>true)
                  setGrossSalaryCalculation(0)
                  setSalarySheet({...obj})
                  }}>Close</CButton>
            </CCol>

        <CNav variant="tabs" role="tablist">
      <CNavItem>
        <CNavLink
          active={activeKey === 1}
          onClick={() => setActiveKey(1)}
        >
         Employee Info
        </CNavLink>
      </CNavItem>
      <CNavItem>
        <CNavLink
          active={activeKey === 2}
          onClick={() => setActiveKey(2)}
        >
          Employee Salary Info
        </CNavLink>
      </CNavItem>
    
    </CNav>


    <CTabContent className='p-2'>

      <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>

       <div className="p-4">
         <CForm>
         <CRow>
            <CCol md={6}>
                <CFormInput
                  type="date"
                  label='Select Month'
                  value={salarySheet.month}
                  onChange={(e)=>setSalarySheet(prev=>({...prev,month:e.target.value}))}
                />
              </CCol>
              <CCol md={6}>
              <CFormSelect
              label='Emp Name'
              value={salarySheet.empName}
              onChange={(e)=>setSalarySheet(prev=>({...prev,empName:e.target.value}))}
              >
                <option value=''>Select Employee</option>
                        {staff.filter((list) => 
                          list.selected === 'Select').map((item, index) => (
                            <option key={index} value={item._id}> {item.FullName}</option>
                          ))}
              </CFormSelect>
              </CCol>
              
              <CCol md={6}>
                <CFormInput
                  type="text"
                  label='Emp Id'
                  value={salarySheet.empId}
                  onChange={(e)=>setSalarySheet(prev=>({...prev,empId:e.target.value}))}
                />
              </CCol>

              
              <CCol md={6}>
                <CFormInput
                  type="date"
                  placeholder="Enter Your Name"
                  label='Joining Date'
                  value={moment(salarySheet.joiningDate).format('YYYY-MM-DD')}
                  onChange={(e)=>setSalarySheet(prev=>({...prev,joiningDate:e.target.value
                  }))}
                />
              </CCol>
            </CRow> 
            <CRow >
              <CCol md={6}>
              <CFormSelect
                  label='Select Your Gender'
                  value={salarySheet.Gender}
                  onChange={(e)=>setSalarySheet(prev=>({...prev,Gender:e.target.value}))}
                  options={[
                    "Select Gender",
                    { label: 'Male', value: 'Male' },
                    { label: 'Female', value: 'Female' }

                  ]}
              />
             
              </CCol>
            <CCol md={6}>
              <CFormInput
              label='Location'
              placeholder="Enter Your Location"
              value={salarySheet.Location}
              onChange={(e)=>setSalarySheet(prev=>({...prev,Location:e.target.value}))}
              />
            </CCol>

            <CCol md={6}>
              <CFormSelect
                  label='Full/Part Time'
                  value={salarySheet.typeOfJobTimeing}
                  onChange={(e)=>setSalarySheet(prev=>({...prev,typeOfJobTimeing:e.target.value}))}
                  options={[
                    "Select Grade",
                    { label: "Full Time", value: "Full Time" },
                    { label: "Part Time", value: "Part Time" },
                    { label: "Freelancer", value: "Freelancer" },
                    { label: "Consultant", value: "Consultant" },

                ]}
              />
                </CCol>   
               
                 <CCol md={6}>
                      <CFormSelect
                        className="mb-1"
                        aria-label="Select Job Department"
                        value={salarySheet.Department}
                        onChange={(e)=>setSalarySheet(prev=>({...prev,Department:e.target.value}))}
                        label="Department"
                      >
                        <option>Select Department</option>

                        {result.map((item, index) => (
                         (
                            item.status === true && (
                              <option key={index} >{item.department}</option>
                            )
                          )
                        ))}
                      </CFormSelect>
                </CCol>    

                 <CCol md={6}>
                      <CFormSelect
                        className="mb-1"
                        aria-label="Select Job Designation"
                        value={salarySheet.Designations}
                        onChange={(e)=>setSalarySheet(prev=>({...prev,Designations:e.target.value}))}
                        label="Job Designation"
                      >
                        <option>Select Designation</option>
                        {result.map((item, index) => (
                          item.status === true && (
                            <option key={index} >{item.jobDesignation}</option>
                          )

                        ))}
                      </CFormSelect>
                </CCol> 
                <CCol md={6}>
              <CFormInput
                  label='Bank Acount No'
                  value={salarySheet.bankAcountNo}
                  onChange={(e)=>setSalarySheet(prev=>({...prev,bankAcountNo:e.target.value}))}
                  
              />
                </CCol>  

            </CRow>    

         </CForm>
        </div>


      </CTabPane>
      <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey === 2}>
      <div className="p-4">
         <CForm>
 

            <CRow>

              <CCol lg={6} md={6}>
              <CCol >
              <CFormInput
                  label='Monthly  Salary'
                  type="number"
                  value={salarySheet.BasicSalary}
                  // onChange={(e)=>setSalarySheet(prev=>({...prev,BasicSalary:e.target.value}))}    
                  
              />
                </CCol>   
                <CCol >
              <CFormInput
                  label='Late Mark'
                  type="number"
                  value={salarySheet.lateMark}
                  onChange={(e)=>setSalarySheet(prev=>({...prev,lateMark:e.target.value}))}  
                  
              />
                </CCol>
                <CCol >
              <CFormInput
                  label='No Of Half Day'
                  type="number"
                  value={salarySheet.halfday}
                  onChange={(e)=>setSalarySheet(prev=>({...prev,halfday:e.target.value}))}    
              />
                </CCol>
                <CCol >
              <CFormInput
                  label='No of Leave'
                  type="number"
                  value={salarySheet.leaveDay}
                  onChange={(e)=>setSalarySheet(prev=>({...prev,leaveDay:e.target.value}))}  
                  
              />
                </CCol>
                <CCol >
              <CFormInput
                  label='Adjust Leave'
                  type="number"
                  value={salarySheet.adjustLeave}
                  onChange={(e)=>setSalarySheet(prev=>({...prev,adjustLeave:e.target.value}))}  
                  
              />
                </CCol>
                <CCol >
              <CFormInput
                  label='Total working days'
                  type="number"      
                  value={salarySheet.TWD}
                  onChange={(e)=>setSalarySheet(prev=>({...prev,TWD:e.target.value}))}             
              />
                </CCol>
                <CCol>
                <CFormInput
                  label='Gross Salary'
                  type="number"
                  value={grossSalaryCalculation}
                  // onChange={(e)=>setSalarySheet(prev=>({...prev,grossSalary:e.target.value}))}   
                  
              />
                </CCol>
              </CCol>

              <CCol lg={6} md={6}>      
                <CCol >
               <CFormInput
                  label='PT'
                  type="number"
                  value={salarySheet.PT}
                  onChange={(e)=>setSalarySheet(prev=>({...prev,PT:e.target.value}))} 
                  
              />
             </CCol>
             <CCol >
              <CFormInput
                  label='PF%'
                  type="number"
                  value={salarySheet.TPD}
                  onChange={(e)=>setSalarySheet(prev=>({...prev,TPD:e.target.value}))}    
                  
              />
                </CCol>
             <CCol>
              <CFormInput
               label='TDS%'
               type="number"
               value={salarySheet.TDS}
               onChange={(e)=>setSalarySheet(prev=>({...prev,TDS:e.target.value}))} 
              />
             </CCol>
             <CCol >
              <CFormInput
                  label='Adev Dec'
                  type="number"
                  value={salarySheet.advancedSalaryDedct}
                  onChange={(e)=>setSalarySheet(prev=>({...prev,advancedSalaryDedct:e.target.value}))} 
                  
              />
                </CCol>
                <CCol >
                <CCol >
                <CFormInput
                  label='Incentive'
                  type="number"    
                  value={salarySheet.incentive}
                  onChange={(e)=>setSalarySheet(prev=>({...prev,incentive:e.target.value}))}              
                />
                </CCol>   
              <CFormInput
                  label='Net Salary Remark'
                  type="number"
                  value={salarySheet.netSalary}
                  onChange={(e)=>setSalarySheet(prev=>({...prev,netSalary:e.target.value}))} 
                  
              />
                </CCol>
                <CCol >

                  
                <CFormSelect
                      className="mb-1"
                      label="Select Mode of Payment"
                      value={salarySheet.modeOfPayment}
                      style={{ minWidth: "100px" }}
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
                      onChange={(e)=>setSalarySheet(prev=>({...prev,modeOfPayment:e.target.value}))} 

                    />
            
                </CCol>
                <CCol >
              <CFormInput
                  label='Remark'
                  type="text"
                  value={salarySheet.remark}
                  onChange={(e)=>setSalarySheet(prev=>({...prev,remark:e.target.value}))} 
                  
              />
                </CCol>
              </CCol>
            </CRow>
            <CCol className='mt-4'>
                    {updateActive?
                      <CButton onClick={()=>saveData('Update')} >Save Update</CButton>:          
                        <CButton onClick={()=>saveData('Save')} >Save</CButton>
                    }
            </CCol>
         </CForm>
    </div>
      </CTabPane>

    </CTabContent>

   
    <CCol style={{ backgroundColor: '#0B5345'}} className='p-1'>

    </CCol>

        </CCardBody>

      </CCard>}

                        <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345",width:'200%' }} hover responsive>
                            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                                <CTableRow >
                                    <CTableHeaderCell>Sr no</CTableHeaderCell>
                                    <CTableHeaderCell>Date</CTableHeaderCell>
                                    <CTableHeaderCell>Emp ID</CTableHeaderCell>
                                    <CTableHeaderCell>Name</CTableHeaderCell>
                                    <CTableHeaderCell>Joining Date</CTableHeaderCell>
                                    <CTableHeaderCell>Gender</CTableHeaderCell>
                                    <CTableHeaderCell>Location</CTableHeaderCell>
                                    <CTableHeaderCell>Full/Part Time</CTableHeaderCell>
                                    <CTableHeaderCell>Department</CTableHeaderCell>
                                    <CTableHeaderCell>Designations</CTableHeaderCell>
                                    <CTableHeaderCell>Account No</CTableHeaderCell>
                                    <CTableHeaderCell>No of Half Day</CTableHeaderCell>
                                    <CTableHeaderCell>Late Mark</CTableHeaderCell>
                                    <CTableHeaderCell>Leave Day</CTableHeaderCell>
                                    <CTableHeaderCell>Adjust Leave</CTableHeaderCell>
                                    <CTableHeaderCell>Monthly Salary</CTableHeaderCell>
                                    <CTableHeaderCell>TWD</CTableHeaderCell>
                                    <CTableHeaderCell>PF%</CTableHeaderCell>
                                    <CTableHeaderCell>TDS%</CTableHeaderCell>
                                    <CTableHeaderCell>PT</CTableHeaderCell>
                                    <CTableHeaderCell>Adev Dec</CTableHeaderCell>
                                    <CTableHeaderCell>Gross Salary</CTableHeaderCell>
                                    <CTableHeaderCell>Incentive</CTableHeaderCell>
                                    <CTableHeaderCell>Net Salary </CTableHeaderCell>
                                    <CTableHeaderCell>Made of Payment</CTableHeaderCell>
                                    <CTableHeaderCell>Remark</CTableHeaderCell>
                                    <CTableHeaderCell style={{display:(deleteSalarySheet2||editSalarySheet)?'':'none'}} >Edit/Delete</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                            <CTableRow>
                                <CTableDataCell     ><CFormInput className='min-width-90' disabled value={searchFilter.search1} 
                                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search1:e.target.value}))} /> </CTableDataCell>
                                    <CTableDataCell ><CFormInput className='min-width-90' value={searchFilter.search2} 
                                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search2:e.target.value}))} /> </CTableDataCell>
                                    <CTableDataCell ><CFormInput className='min-width-90' value={searchFilter.search3} 
                                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search3:e.target.value}))} /> </CTableDataCell>
                                    <CTableDataCell ><CFormInput className='min-width-90' value={searchFilter.search4} 
                                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search4:e.target.value}))} /> </CTableDataCell>
                                    <CTableDataCell ><CFormInput className='min-width-90' value={searchFilter.search5} 
                                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search5:e.target.value}))} /> </CTableDataCell>
                                    <CTableDataCell ><CFormInput className='min-width-90'value={searchFilter.search6} 
                                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search6:e.target.value}))} /> </CTableDataCell>
                                    <CTableDataCell ><CFormInput className='min-width-90' value={searchFilter.search7} 
                                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search7:e.target.value}))} /> </CTableDataCell>
                                    <CTableDataCell ><CFormInput className='min-width-90' value={searchFilter.search8} 
                                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search8:e.target.value}))} /> </CTableDataCell>
                                    <CTableDataCell ><CFormInput  className='min-width-90' value={searchFilter.search9} 
                                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search9:e.target.value}))} /> </CTableDataCell>           
                                    <CTableDataCell ><CFormInput className='min-width-90'value={searchFilter.search10} 
                                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search10:e.target.value}))} /> </CTableDataCell>
                                    <CTableDataCell ><CFormInput  className='min-width-90'value={searchFilter.search11} 
                                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search11:e.target.value}))} /> </CTableDataCell>
                                    <CTableDataCell ><CFormInput disabled className='min-width-90'
                                    /> </CTableDataCell>
                                     
                                     <CTableDataCell colSpan={12} ><CFormInput className='min-width-90' disabled value={searchFilter.search12} 
                                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search12:e.target.value}))} /> </CTableDataCell>
                                 <CTableDataCell ><CFormInput className='min-width-90' value={searchFilter.search13} 
                                    onChange={(e)=>setSearchFilter((prev)=>({...prev,search13:e.target.value}))} /> </CTableDataCell>
                                <CTableDataCell colSpan={5} ><CFormInput className='min-width-90'  disabled 
                                    /> </CTableDataCell>
                                </CTableRow> 
                              
                                {toFilterData(salarySheetData).slice(paging * 10, paging * 10 + 10).map((item, index) => (
                                        <CTableRow key={index} className='text-center'>
                                            <CTableDataCell>{index+ 1 + (paging * 10)  }</CTableDataCell>
                                            <CTableDataCell>{new Date(item.month).toLocaleDateString()}</CTableDataCell>
                                            <CTableDataCell>{item.empId}</CTableDataCell>
                                            <CTableDataCell>{item.empName}</CTableDataCell>
                                            <CTableDataCell>{new Date(item.joiningDate).toLocaleDateString()}</CTableDataCell>
                                            <CTableDataCell>{item.Gender}</CTableDataCell>
                                            <CTableDataCell>{item.Location}</CTableDataCell>
                                            <CTableDataCell>{item.typeOfJobTimeing}</CTableDataCell>
                                            <CTableDataCell>{item.Department}</CTableDataCell>
                                            <CTableDataCell>{item.Designations}</CTableDataCell>
                                            <CTableDataCell>{item.bankAcountNo}</CTableDataCell>
                                            <CTableDataCell>{item.halfday}</CTableDataCell>
                                            <CTableDataCell>{item.lateMark}</CTableDataCell>
                                            <CTableDataCell>{item.leaveDay}</CTableDataCell>                                           
                                            <CTableDataCell>{item.adjustLeave}</CTableDataCell>
                                            <CTableDataCell>{item.BasicSalary}</CTableDataCell>
                                            <CTableDataCell>{item.TWD}</CTableDataCell>
                                            <CTableDataCell>{item.TPD}%</CTableDataCell>
                                            <CTableDataCell>{item.TDS}%</CTableDataCell>
                                            <CTableDataCell>{item.PT}</CTableDataCell>
                                            <CTableDataCell>{item.advancedSalaryDedct}</CTableDataCell>
                                            <CTableDataCell>{item.grossSalary}</CTableDataCell>
                                            <CTableDataCell>{item.incentive}</CTableDataCell>
                                            <CTableDataCell>{item.netSalary}</CTableDataCell>
                                            <CTableDataCell>{item.modeOfPayment}</CTableDataCell>
                                            <CTableDataCell>{item.remark}</CTableDataCell>

                                            <CTableDataCell style={{display:(deleteSalarySheet2||editSalarySheet)?'':'none'}}>
                                               <MdEdit style={{cursor:'pointer',display:editSalarySheet?'':'none'}} onClick={()=>updateProduct(item)}/>
                                               <MdDelete  style={{cursor:'pointer',display:deleteSalarySheet2?'':'none'}} onClick={()=>deleteSalarySheet(item._id)} />
                                            </CTableDataCell>                                       
                                        </CTableRow>
                                ))}
                                

                               
                            </CTableBody>
</CTable>
                    <CPagination aria-label="Page navigation example" align="center" className='mt-2'>
                        <CPaginationItem aria-label="Previous" disabled={paging != 0 ? false : true} onClick={() => paging > 0 && setPaging(paging - 1)}>
                            <span aria-hidden="true">&laquo;</span>
                        </CPaginationItem>
                        <CPaginationItem active onClick={() => setPaging(0)}>{paging + 1}</CPaginationItem>
                        {toFilterData(salarySheetData).length > (paging + 1) * 10 && <CPaginationItem onClick={() => setPaging(paging + 1)} >{paging + 2}</CPaginationItem>}
                        {toFilterData(salarySheetData).length > (paging + 2) * 10 && <CPaginationItem onClick={() => setPaging(paging + 2)}>{paging + 3}</CPaginationItem>}
                        {toFilterData(salarySheetData).length > (paging + 1) * 10 ?
                            <CPaginationItem aria-label="Next" onClick={() => setPaging(paging + 1)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                            : <CPaginationItem disabled aria-label="Next" onClick={() => setPaging(paging + 1)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                        }
                    </CPagination>  

                    </CCardBody>
                </CCard>
      </div>
}

export default PayrollMaster;