import React from 'react'
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
import { leadsSuperRight } from 'src/views/hr/Rights/rightsValue/crmRightsValue'
import menImage from './../../assets/images/avatars/profile_icon.png'
import { useUniqAdminObjeact } from 'src/views/Custom-hook/adminValidation'
import { SiEventstore } from 'react-icons/si'
import LeadsRight from 'src/views/hr/AllRightRights/LeadsRight'
import { hrManagement } from 'src/views/hr/Rights/rightsValue/erpRightsValue';



const AppHeaderDropdown = () => {

  const isEmployee = useSelector((el)=>el.isEmployee)
  const empuniqId = useUniqAdminObjeact().employeeMongoId

  const rightsData = useSelector((el)=>el.empLoyeeRights?.crmRights
  ?.crmLeads?.items?.superRight)  

  const rightsData2 = useSelector((el)=>el?.empLoyeeRights?.erpRights?.erpHrManagement
    ?.items?.empLoyeeHrProfile?.items?.erpEmployeeProfile?.rights) 

  const disPatch = useDispatch()
  const navigate = useNavigate()
  const Logout = () => {
    localStorage.clear()
    navigate('/login')
    disPatch({type:'clearentireStore'})
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
        {isEmployee?<CDropdownItem className='me-2' onClick={()=>handleNavigateFun(`/hr/employee-profile/employee/${empuniqId}`)}>
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
  return  <CDropdown variant="nav-item">
  <CDropdownToggle placement="bottom-end" className="py-0" caret={false} >
 <CIcon icon={cilEnvelopeClosed} className="me-2" />
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
  

  const isAdmin = useSelector((el)=>el.isAdmin) 
  const enquiryForm =  (rightsData?.addOn?.includes(leadsSuperRight.enquiryForm)||isAdmin)
  const recrutMentForm =  (rightsData2?.includes(hrManagement.recruitmentmentForm)||isAdmin)
  const expenceForm = (rightsData3?.includes(hrManagement.recruitmentmentForm)||isAdmin)

                        
  // const rightsData2 = useSelector((el)=>el?.empLoyeeRights?.erpRights?.erpHrManagement
  //   ?.items?.empLoyeeHrProfile?.items?.erpEmployeeProfile?.rights) 

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

        <CDropdownItem >
        <Link style={{ textDecoration: 'none' }} to="/forms/support">
          <CIcon icon={cilFile} className="me-2" />
          Support
        </Link>
        </CDropdownItem>

        <CDropdownDivider />
      </CDropdownMenu>
    </CDropdown>
  
  )
}

const AppHeaderDropdownBook = () => {
  return (
   
<CDropdown variant="nav-item">

<Link style={{ textDecoration: 'none',color:'GrayText' }} to="/forms/event">
<CIcon icon={cilSpa} size="lg" />
</Link>
 
  </CDropdown>
  )
}


const AppHeaderDropdownCheckIn = () => {
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CIcon icon={cilFingerprint} size="lg" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">

        <CDropdownItem >
          <Link  to="/forms/client-checkin">
            <CIcon icon={cilBell} className="me-2"
              tabIndex={-1}
            />
            Client Batches CheckIn
          </Link>
        </CDropdownItem>
         
        <CDropdownItem >
          <Link  to="/forms/client-checkin">
            <CIcon icon={cilBell} className="me-2"
              tabIndex={-1}
            />
            Client Membership CheckIn
          </Link>
        </CDropdownItem>

        <CDropdownItem >
          <Link  to="/forms/staff-checkin">
            <CIcon icon={cilEnvelopeOpen} className="me-2" tabIndex={-1} />
            Employee CheckIn
          </Link>
        </CDropdownItem>

        
        <CDropdownDivider />
      </CDropdownMenu>
    </CDropdown>
  )
}
const AppHeaderDropdownBasket= () => {
  return (
    <CDropdown variant="nav-item">

 
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
          <Link style={{ textDecoration: 'none' }} to="/forms/enquiry-form">
            <CIcon icon={cilBell} className="me-2"
              tabIndex={-1}
            />
            Feedback Link
          </Link>
        </CDropdownItem>
        <CDropdownItem >
          <Link style={{ textDecoration: 'none' }} to="/forms/member-form">
            <CIcon icon={cilEnvelopeOpen} className="me-2" tabIndex={-1} />
            Google Review Link
          </Link>
        </CDropdownItem>
        <CDropdownItem >
          <Link style={{ textDecoration: 'none' }} to="/forms/member-form">
            <CIcon icon={cilEnvelopeOpen} className="me-2" tabIndex={-1} />
            Payment Link
          </Link>
        </CDropdownItem>
        <CDropdownItem >
          <Link style={{ textDecoration: 'none' }} to="/forms/member-form">
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
,ReminderMessageDropdown }
