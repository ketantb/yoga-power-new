import React,{useEffect,useState} from 'react'
import { getDatabase, ref, set,onValue,push } from "firebase/database";
import {
  CAvatar,
  CBadge,
  CButton,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CNavLink,
  CCol,
  CRow
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
  cilUserPlus,
  cilSpa,
  cilCalendarCheck,
  cilFingerprint,
  cilLinkAlt,
  cilEnvelopeClosed,
  cilBasket,
  
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { leadsSuperRight,clientManagementRights } from 'src/views/hr/Rights/rightsValue/crmRightsValue'
import menImage from './../../assets/images/avatars/profile_icon.png'
import { useUniqAdminObjeact } from 'src/views/Custom-hook/adminValidation'
import { SiEventstore } from 'react-icons/si'
import LeadsRight from 'src/views/hr/AllRightRights/LeadsRight'
import { hrManagement,financeRight,inventoryRight } from 'src/views/hr/Rights/rightsValue/erpRightsValue';
import { masterMarketingRightVal } from 'src/views/hr/Rights/rightsValue/masterRightsValue'
import { toast } from 'react-toastify'

const AppHeaderDropdown = () => {

  const isEmployee = useSelector((el)=>el.isEmployee)
  const {employeeMongoId} = useUniqAdminObjeact()


  const disPatch = useDispatch()
  const navigate = useNavigate()
  const Logout = () => {
    disPatch({type:'clear'})
    localStorage.clear()
    navigate('/login')
  }

  const profile = ()=>{
    navigate('/profile/user')
  }

  const companyProfile = ()=>{
    navigate('/company-profile')
  }

  const handleNavigateFun =(path)=>{
    navigate(path)
  }
  


  let user = JSON.parse(localStorage.getItem('user-info'))

  const email = user.user.email;
  const username = user.user.username;
  const imgUrl = user.user.profileLogo


  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        

<div className='border border-dark border-2'   style={{height:'40px',width:'40px', 
                backgroundImage:`url(${menImage})`,
                backgroundSize:'130%',
                backgroundPosition:'center',
                margin:'auto',
                borderRadius:'50%',
                overflow:'hidden'
               }}
               >
                <img src={imgUrl} alt="image not loaded" style={{
                  width:'100%',
                  height:'100%',
                  objectFit:'fill'
                  }} />
               </div>


       </CDropdownToggle>
      <CDropdownMenu className="pt-0"   placement="bottom-end" style={{inset:'50px 0px auto auto',width:'fit-content'}} >
             
         <CCol className='p-4 text-center'>
               <h6 className='mb-3' >{username}</h6>    
             <div className='border border-dark border-2'   style={{height:'100px',width:'100px', 
                backgroundImage:`url(${menImage})`,
                backgroundSize:'130%',
                backgroundPosition:'center',
                margin:'auto',
                borderRadius:'50%',
                overflow:'hidden'
               }}
               >
                <img src={imgUrl} alt="image not loaded" style={{
                  width:'100%',
                  height:'100%',
                  objectFit:'fill'
                  }} />
               </div>

         </CCol> 


        <CDropdownItem  className='text-start'>
          <CIcon icon={cilEnvelopeClosed} className="me-2" />
         {email}
        </CDropdownItem>       
        {/* <CDropdownItem  className='text-start'>
               <CIcon icon={cilSettings} className="me-2 " />
                 Settings
        </CDropdownItem>      */}
         <CDropdownItem  className='text-start'  onClick={()=>handleNavigateFun('/profile/user')}>
          <CIcon icon={cilSettings} className="me-2" />
         User  Profile
        </CDropdownItem>
        <CDropdownItem  className='text-start' onClick={()=>handleNavigateFun('/company-profile')}>
          <CIcon icon={cilSettings} className="me-2" />
         Company  Profile
        </CDropdownItem>
        {isEmployee?<CDropdownItem className='me-2' onClick={()=>handleNavigateFun(`/hr/employee-profile/employee/${employeeMongoId}`)}>
          <CIcon icon={cilUser} className="me-2" />
          Employee Profile
        </CDropdownItem>:''}
        <CDropdownDivider  />
        <CDropdownItem  onClick={Logout} className='text-center'>
          <CIcon icon={cilLockLocked} className="me-2" />
          Logout
        </CDropdownItem> *


      </CDropdownMenu>
    </CDropdown>
  )
}

const ReminderMessageDropdown = () =>{
  const [newMessageNo,setNewMessageNo] = useState({start:0,num:0})
  const {employeeMongoId} = useUniqAdminObjeact()
  const navigate = useNavigate()


  
  function getNotiFication() {
    const db = getDatabase();
    const starCountRef = ref(db, employeeMongoId);
    onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
  
    

    const notiFications = []
  
    for (const notiFication in  data){
      notiFications.push(data[notiFication])
    }
    setNewMessageNo(prev=>{
      if(prev.start===0){
        return {start:1,num:0}
      }else{
        toast.info('New Message')
        return {...prev,num:prev.num+1}
      }
    })

    });
  
  }
  useEffect(()=>{
    getNotiFication()
  },[])
  const handleNavigateFun =(path)=>{
    setNewMessageNo({start:0,num:0})
    navigate(path)
  }
  return  <CDropdown variant="nav-item" >
  <CDropdownToggle style={{cursor:'pointer'}} placement="bottom-end" className="py-0" caret={false} onClick={()=>handleNavigateFun('/notification/view')} >
 <CIcon icon={cilEnvelopeClosed} className="me-2" onClick={()=>handleNavigateFun('/notification/view')} />
 {newMessageNo.num}
 
  </CDropdownToggle>
  </CDropdown>
}


const AppHeaderDropdownForm = () => {


  const rightsData = useSelector((el)=>el.empLoyeeRights?.crmRights
  ?.crmLeads?.items?.superRight) 

  const rightsData2 =  useSelector((el)=>el?.empLoyeeRights?.erpRights?.erpHrManagement
    ?.items?.erpRecuritment?.rights) 

  const rightsData3 =  useSelector((el)=>el?.empLoyeeRights?.erpRights?.erpFinance?.items?.  
  erpDailyExpense?.items?.erpExpense?.rights) 
  
  const rightsData4 =  useSelector((el)=>el?.empLoyeeRights?.crmRights?.crmCientManagment?.items?.superRight?.profile) 


  const isAdmin = useSelector((el)=>el.isAdmin) 
  const enquiryForm =  (rightsData?.addOn?.includes(leadsSuperRight.enquiryForm)||isAdmin)
  const recrutMentForm =  (rightsData2?.includes(hrManagement.recruitmentmentForm)||isAdmin)
  const expenceForm = (rightsData3?.includes(financeRight.expenseForm)||isAdmin)
  const supportForm = (rightsData4?.includes(clientManagementRights.clientSupport)||isAdmin)


  return (
    
    <CDropdown variant="nav-item">
 
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CIcon icon={cilUserPlus} size="lg" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">

        {enquiryForm&&<CDropdownItem style={{display:enquiryForm?'':'none'}} >
          <Link style={{ textDecoration: 'none' }} to="/forms/enquiry-form">
            <CIcon icon={cilBell} className="me-2"
              tabIndex={-1}
            />
            Enquiry
          </Link>
        </CDropdownItem>}

        {recrutMentForm&&<CDropdownItem  style={{display:recrutMentForm?'':'none'}} >
          <Link style={{ textDecoration: 'none' }} to="/forms/staff-form">
            <CIcon icon={cilTask} className="me-2" />
            Recruitment
          </Link>
        </CDropdownItem>}
       
    {expenceForm&&<CDropdownItem style={{display:expenceForm?'':'none'}}>        
       <Link style={{ textDecoration: 'none' }} to='/voucher/expense'   >
          <CIcon icon={cilUser} className="me-2" />
          Expense
          </Link>
        </CDropdownItem>}

        {supportForm&& <CDropdownItem style={{display:supportForm?'':'none'}}>
      <Link style={{ textDecoration: 'none' }} to="/forms/support" >
          <CIcon icon={cilFile} className="me-2" />
          Support
        </Link>
        </CDropdownItem>}

        <CDropdownDivider />
      </CDropdownMenu>
    </CDropdown>
  
  )
}

const AppHeaderDropdownBook = () => {

  const rightsData4 =  useSelector((el)=>el?.empLoyeeRights?.masterRights
  ?.masterMarketing?.items?.masterAutomatedComToStaff?.rights) 
  const isAdmin = useSelector((el)=>el.isAdmin) 

  const eventEmpView =(isAdmin||rightsData4?.includes(masterMarketingRightVal.eventEmpView))

  return (
eventEmpView&&<CDropdown variant="nav-item" style={{display:eventEmpView?'':'none'}}>
<Link style={{ textDecoration: 'none',color:'GrayText' }} to="/forms/event">
<CIcon icon={cilSpa} size="lg" />
</Link>
</CDropdown>
  )
}


const AppHeaderDropdownCheckIn = () => {

  const rightsData4 =  useSelector((el)=>el?.empLoyeeRights?.crmRights?.crmCientManagment?.items?.superRight?.profile) 
  const rightsData3 =  useSelector((el)=>el?.empLoyeeRights?.erpRights?.erpHrManagement?.items?.erpEmpAttendess?.items?.
                                   erpEmpAttedanceRegister?.rights) 
  const isAdmin = useSelector((el)=>el.isAdmin) 

  const clientAttendanceEmpView =(isAdmin||rightsData4?.includes(clientManagementRights.allClients+"attendanceCheckIn"))
  const createEmpAttendance =(isAdmin||rightsData3?.includes(hrManagement.createAttendance))


  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CIcon icon={cilFingerprint} size="lg" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
         
       {clientAttendanceEmpView&& <CDropdownItem style={{display:clientAttendanceEmpView?'':'none'}}  >
          <Link  to="/forms/client-checkin">
            <CIcon icon={cilBell} className="me-2"
              tabIndex={-1}
            />
            Client Membership CheckIn
          </Link>
        </CDropdownItem>}

        {createEmpAttendance&&<CDropdownItem  style={{display:createEmpAttendance?'':'none'}} >
          <Link  to="/forms/staff-checkin">
            <CIcon icon={cilEnvelopeOpen} className="me-2" tabIndex={-1} />
            Employee CheckIn
          </Link>
        </CDropdownItem>}

        
        <CDropdownDivider />
      </CDropdownMenu>
    </CDropdown>
  )
}
const AppHeaderAppointment= () => {



  const rightsData4 =  useSelector((el)=>el?.empLoyeeRights?.crmRights?.crmCientManagment?.items?.superRight?.profile) 

  const isAdmin = useSelector((el)=>el.isAdmin) 


  const appointMentEmpView =(isAdmin||rightsData4?.includes(clientManagementRights.allClients+"appointment"))


  return (
   appointMentEmpView&&<CDropdown variant="nav-item" style={{display:appointMentEmpView?'':'none'}} >
  <Link style={{ textDecoration: 'none',color:'GrayText' }} to="/forms/appointment">
  <CIcon icon={cilCalendarCheck} size="lg" />
  </Link>
    </CDropdown>
  )
}

const AppHeaderDropdownBasket= () => {

  const rightsData4 =  useSelector((el)=>el?.empLoyeeRights?.erpRights?.erpInventory?.items
  ?.erpProductInvoice?.rights) 
  const isAdmin = useSelector((el)=>el.isAdmin) 


  const appointMentEmpView =(isAdmin||rightsData4?.includes(inventoryRight.inventoryShop))


  return (
   appointMentEmpView&&<CDropdown variant="nav-item" style={{display:appointMentEmpView?'':'none'}} >
  <Link style={{ textDecoration: 'none',color:'GrayText' }} to="/stock/stock-list">
  <CIcon icon={cilBasket} size="lg" />
  </Link>
    </CDropdown>
  )
}

const AppHeaderDropdownLink = () => {
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CIcon icon={cilLinkAlt} size="lg" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">

        <CDropdownItem >
          <Link style={{ textDecoration: 'none' }} >
            <CIcon icon={cilBell} className="me-2"
              tabIndex={-1}
            />
            Feedback Link
          </Link>
        </CDropdownItem>
        <CDropdownItem >
          <Link style={{ textDecoration: 'none' }} >
            <CIcon icon={cilEnvelopeOpen} className="me-2" tabIndex={-1} />
            Google Review Link
          </Link>
        </CDropdownItem>
        <CDropdownItem >
          <Link style={{ textDecoration: 'none' }} >
            <CIcon icon={cilEnvelopeOpen} className="me-2" tabIndex={-1} />
            Payment Link
          </Link>
        </CDropdownItem>
        <CDropdownItem >
          <Link style={{ textDecoration: 'none' }} >
            <CIcon icon={cilEnvelopeOpen} className="me-2" tabIndex={-1} />
            Social Media Link
          </Link>
        </CDropdownItem>
        <CDropdownDivider />
      </CDropdownMenu>
    </CDropdown>
  )
}

export { AppHeaderDropdown, AppHeaderDropdownForm, AppHeaderDropdownBook, 
  AppHeaderDropdownCheckIn, AppHeaderDropdownLink,AppHeaderDropdownBasket
,ReminderMessageDropdown,AppHeaderAppointment }
