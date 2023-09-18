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
                    { id:'masterInvoiceMaster', color: 'danger', icon: <FaFileInvoiceDollar style={{ marginLeft: '20px', marginRight: '20px' }} className='ml-2' size='60px' />, title: 'Event Master',link: '/master/event-master' },
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
                        <CTable className='mt-3' align="middle" bordered  hover responsive scrollable>
                            <CTableHead   color={'darkGreen'} >
                                    <CTableHeaderCell>Sr.No</CTableHeaderCell>
                                    <CTableHeaderCell>Enquiry ID</CTableHeaderCell>
                                    <CTableHeaderCell>Date</CTableHeaderCell>
                                    <CTableHeaderCell>Time</CTableHeaderCell>
                                    <CTableHeaderCell>Name</CTableHeaderCell>
                                    <CTableHeaderCell>Mobile</CTableHeaderCell>
                                    <CTableHeaderCell>Service</CTableHeaderCell>
                                    <CTableHeaderCell>Source</CTableHeaderCell>
                                    <CTableHeaderCell>Enquiry stage</CTableHeaderCell>
                                    <CTableHeaderCell>Call Status</CTableHeaderCell>
                                    <CTableHeaderCell>Message</CTableHeaderCell>
                                    <CTableHeaderCell>Assigned by</CTableHeaderCell>
                                    <CTableHeaderCell>Counseller</CTableHeaderCell>
                                    {(isAdmin|| coldAdd)&&<CTableHeaderCell>Action</CTableHeaderCell>}
                                    {(isAdmin||coldDelete||coldEdit)&&<CTableHeaderCell>Edit</CTableHeaderCell>}
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
                                            style={{ minWidth: "120px" }}
                                            type="text"
                                            value={Search1}
                                            onChange={(e) => setSearch1(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "120px" }}
                                            value={Search2}
                                            onChange={(e) => setSearch2(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "90px" }}
                                            value={Search3}
                                            disabled
                                            onChange={(e) => setSearch3(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "120px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                            value={Search4}
                                            onChange={(e) => setSearch4(e.target.value)}
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "120px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                            value={Search5}
                                            onChange={(e) => setSearch5(e.target.value)}
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            aria-describedby="exampleFormControlInputHelpInline"
                                            value={Search6}
                                            onChange={(e) => setSearch6(e.target.value)}
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "80px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                            value={Search7}
                                            onChange={(e) => setSearch7(e.target.value)}
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "100px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                            value={Search8}
                                            onChange={(e) => setSearch8(e.target.value)}
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "100px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                            value={Search9}
                                            onChange={(e) => setSearch9(e.target.value)}
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "100px" }}
                                            type="text"
                                            disabled
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                   
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "100px" }}
                                            value={Search10}
                                            onChange={(e) => setSearch10(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "100px" }}
                                            disabled
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell style={{display:(isAdmin|| coldAdd)?'':'none'}} >
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "100px" }}
                                            type="text"
                                            disabled
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell style={{display:(isAdmin|| coldEdit||coldDelete)?'':'none'}} >
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "100px" }}
                                            type="text"
                                            disabled
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                </CTableRow>
                                
                                {/* {result1.slice(paging * 10, paging * 10 + 10).map((item, index) => (
                                    (
                                        <CTableRow key={index}>
                                            <CTableDataCell>{index + 1 + (paging * 10)}</CTableDataCell>
                                            <CTableDataCell>{item.EnquiryId}</CTableDataCell>
                                            <CTableDataCell className='text-center'>{moment(item.createdAt).format("DD-MM-YYYY")}</CTableDataCell>
                                            <CTableDataCell>{moment(item.createdAt, "HH:mm").format("hh:mm A")}</CTableDataCell>
                                            <CTableDataCell>{item.Fullname}</CTableDataCell>
                                            <CTableDataCell>{item.ContactNumber}</CTableDataCell>
                                            <CTableDataCell>{item.ServiceName}</CTableDataCell>
                                            <CTableDataCell>{item.enquirytype}</CTableDataCell>
                                            <CTableDataCell>{item.appointmentfor}</CTableDataCell>
                                            <CTableDataCell>{item.CallStatus}</CTableDataCell>
                                            <CTableDataCell>{item.Message}</CTableDataCell>
                                            <CTableDataCell>{item.StaffName}</CTableDataCell>
                                            <CTableDataCell>{item.Counseller}</CTableDataCell>
                                            <CTableDataCell style={{display:(isAdmin|| coldAdd)?'':'none'}} className='text-center'><a href={`tel:+${item.CountryCode}${item.ContactNumber}`} target="_black"><MdCall style={{ cursor: 'pointer', markerStart: '10px' }} onClick={() => { setCallReport(true), handleCallReport(item._id) }} size='20px' /></a><a href={`https://wa.me/${item.ContactNumber}`} target="_black"><BsWhatsapp style={{ marginLeft: "4px", cursor: 'pointer', markerStart: '10px' }} onClick={() => { setCallReport(true), handleCallReport(item._id) }} size='20px' /></a><a href={`mailto: ${item.Emailaddress}`} target="_black"> <MdMail style={{ cursor: 'pointer', markerStart: '10px', marginLeft: "4px" }} onClick={() => { setCallReport(true), handleCallReport(item._id) }} size='20px' /></a> <BsPlusCircle id={item._id} style={{ cursor: 'pointer', markerStart: '10px', marginLeft: "4px" }} onClick={() => handleFollowup(item._id,item)} /></CTableDataCell>
                                            <CTableDataCell style={{display:(isAdmin|| coldEdit||coldDelete)?'':'none'}}
                                             className='text-center'>
                                                {coldEdit&&<MdEdit id={item._id} style={{ fontSize: '35px', cursor: 'pointer', markerStart: '10px' }}
                                                 onClick={() => handleEnquiry(item)} size='20px' />} 
                                                {coldDelete && <MdDelete style={{ cursor: 'pointer', markerStart: '10px', marginLeft: "5px" }} 
                                                onClick={() => deleteEnquiry(item._id)} size='20px' />}                                               
                                            </CTableDataCell>
                                        </CTableRow>
 
                                    )
                                ))} */}
                            </CTableBody>
                        </CTable>
                        </CCardBody>
                    </CCard>
                ))}
            </CCardBody>
        </CCard>
    )
}

export default CenterSetup
