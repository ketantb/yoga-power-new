import { CButton, CCard, CCardBody, CCardHeader, CCardText, CCardTitle, CCol, CRow } from '@coreui/react'
import React from 'react'
import { FaFileInvoiceDollar, FaImage, FaPowerOff } from 'react-icons/fa'
import { HiCurrencyRupee } from 'react-icons/hi'
import { BsCalendar3, BsFileText } from 'react-icons/bs'
import { AiOutlineForm } from 'react-icons/ai'
import { MdOutlineMiscellaneousServices } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'


const CenterSetup = () => {


   const rightsDataObj = useSelector((el)=>el?.empLoyeeRights?.masterRights?.masterCenterSetup?.items) 
   const masterEmployeeDesignation = useSelector((el)=>el?.empLoyeeRights?.masterRights?.masterHr?.items.masterEmployeeDesignation.value) 
   const masterLeadSourseMaster = useSelector((el)=>el?.empLoyeeRights?.masterRights?.masterMarketing?.items?.masterLeadSourseMaster?.value)

   const isAdmin = useSelector((el)=>el.isAdmin)
   rightsDataObj.masterEmployeeDesignation={value:masterEmployeeDesignation}
   rightsDataObj.masterLeadSourseMaster={value:masterLeadSourseMaster}
   

   console.log(rightsDataObj)
    return (
        <CCard className="mb-3 border-success">
            <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                <h4>Center Setup Master</h4>
                <span>Complete the following steps for center setup</span>
            </CCardHeader>
            <CCardBody style={{ padding: '25px' }}>
                {[
                    { id:'masterCompanyLogoSetup', color: 'primary', icon: <FaImage style={{ marginLeft: '20px', marginRight: '20px' }} className='ml-2' size='60px' />, title: 'Company Logo Setup',  link: '/master/center-setup/logo-setup' },
                    { id:'masterCompanyProfileSetup', color: 'warning', icon: <BsFileText style={{ marginLeft: '20px', marginRight: '20px' }} className='ml-2' size='60px' />, title: 'Company Profile Setup', link: '/master/center-setup/company-profile' },
                    { id:'masterServicesMaster', color: 'success', icon: <MdOutlineMiscellaneousServices style={{ marginLeft: '20px', marginRight: '20px' }} className='ml-2' size='60px' />, title: 'Services Master' , link: '/master/center-setup/service-master' },
                    { id:'masterInvoiceMaster', color: 'danger', icon: <FaFileInvoiceDollar style={{ marginLeft: '20px', marginRight: '20px' }} className='ml-2' size='60px' />, title: 'Invoice Master',link: '/master/center-setup/invoice-master' },
                    { id:'masterFormMaster', color: 'info', icon: <AiOutlineForm style={{ marginLeft: '20px', marginRight: '20px' }} className='ml-2' size='60px' />, title: 'Category Master', link: '/master/center-setup/form-master' },
                    { id:'masterBatchTimeMaster',color: 'secondary', icon: <BsCalendar3 style={{ marginLeft: '20px', marginRight: '20px' }} className='ml-2' size='60px' />, title: 'Batch time Master', link: '/master/center-setup/batch-master' },
                    { id:'masterPackageMaster', color: 'dark', icon: <HiCurrencyRupee style={{ marginLeft: '20px', marginRight: '20px' }} className='ml-2' size='60px' />, title: 'Package Master', link: '/master/center-setup/package-master' },
                    { id:'masterLeadSourseMaster', color: 'warning', icon: <FaFileInvoiceDollar style={{ marginLeft: '20px', marginRight: '20px' }} className='ml-2' size='60px' />, title: 'Lead Master',link: '/master/center-setup/leadSourceMaster' },
                    { id:'masterEmployeeDesignation', color: 'success', icon: <FaFileInvoiceDollar style={{ marginLeft: '20px', marginRight: '20px' }} className='ml-2' size='60px' />, title: 'Designation Master',link: '/master/center-setup/designation' },
                ].filter((el)=>{
                return (rightsDataObj?.[el?.id]?.value || isAdmin)
                }).map((item, index) => (
                    <CCard
                        color={item.color}
                        textColor='white'
                        className="mb-3"
                        key={index}
                    >
                        <CCardBody >
                            <CRow>
                                <CCol lg={1} sm={3}>{item.icon}</CCol>
                                <CCol lg={9} sm={6}>
                                    <CCardTitle>{item.title}</CCardTitle>
                                </CCol>
                                <CCol lg={2} sm={3}><Link to={item.link}><CButton className='mt-2' style={{ border: 'none', backgroundColor: 'white', color: 'black' }} tabIndex={-1}><FaPowerOff size='15px' /> Start</CButton></Link></CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                ))}
            </CCardBody>
        </CCard>
    )
}

export default CenterSetup
