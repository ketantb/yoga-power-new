import { cilArrowCircleBottom, cilArrowCircleTop } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import { MdCall, MdDelete, MdEdit, MdMail } from 'react-icons/md';
import { BsPlusCircle, BsWhatsapp } from 'react-icons/bs';
import {
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormInput,
    CFormSelect,
    CInputGroup,
    CInputGroupText,
    CNav,
    CNavItem,
    CNavLink,
    CRow,
    CTabContent,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CTabPane,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CFormTextarea,
    CPagination,
    CPaginationItem
} from '@coreui/react'
import React, { useState,useCallback,useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import moment  from  'moment/moment';
import { useAdminValidation,useUniqAdminObjeact,useEmployeeValidation } from 'src/views/Custom-hook/adminValidation';



const WelcomeCalls = ({visible,filterObj,id,setPageLength,paging,isEmployee}) => {
    const url = useSelector((el)=>el.domainOfApi) 
    const pathVal  =  useAdminValidation()
    const isEmployeeRoute = useEmployeeValidation()


    const uniObjVal = useUniqAdminObjeact()


    const [welcomecallsData,setWelcomeCallsData] = useState([])
    const [visibalCallUpdateForm,setVisibalCallUpdateForm] = useState(false)
    const [followupId,setFollowUpid] = useState('')

    const obj = {
        wellComeCallTimeing:'',
        wellComeCallDiscussion:'',
        wellComeCallFollowupby:uniObjVal.employeeMongoId,
        wellComeCallFollowUpDate:''
    }

    const [updateFormData,setUpdateForm] = useState({...obj})

    const [staff, setStaff] = useState([])

    useEffect(()=>{
    setFollowUpid(uniObjVal.employeeMongoId)
    },[uniObjVal.employeeMongoId])


    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;
    const username = user.user.username;

    function findRenevalClient(list){
        const time =  (new Date(list.createdAt) -new Date())

        const days = Math.ceil(time/(1000*60*60*24))

              if((days>=-15 )){
                 return true 
              }
              return false      
    }


    function getAllMemberData() {
        const urlPath = !id?`${url}/memberForm/${pathVal}`:`${url}/memberForm/${id}`

        axios.get(urlPath, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                let  data =  res.data
                if(!!id){
                    data =  [res.data]
                }
                setWelcomeCallsData(data.filter((list) =>
                  findRenevalClient(list)).reverse())
            })
            .catch((error) => {
                console.error(error)
            })
    }

    useEffect(()=>{
      getAllMemberData()
      getStaff()
    },[])

console.log(isEmployee)
    function getStaff() {
        axios.get(`${url}/employeeform/${isEmployeeRoute(isEmployee)}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res.data,isEmployeeRoute(isEmployee))
                setStaff(res.data)
                setUpdateForm({...obj})
            })
            .catch((error) => {
                console.error(error)
            })
    }
    const emp =  staff.find((el)=>el._id=== updateFormData.wellComeCallFollowupby)


    const saveCallUpDate = async ()=>{
        

        const uniqClient =  welcomecallsData.find((el)=>el._id===followupId)

        const headers = {
            'Authorization': `Bearer ${ token }`,
            'My-Custom-Header': 'foobar'
        }

        updateFormData.wellComeCallFollowupby= emp.FullName

        const obj = {
            welcomeCallInfo: { ...updateFormData }
        }


        const obj2 = {
            username: username,
            callTimeing: updateFormData.wellComeCallTimeing,
            callDiscussion: updateFormData.wellComeCallDiscussion,
            callFollowupby: updateFormData.wellComeCallFollowupby,
            callFollowUpDate: updateFormData.wellComeCallFollowUpDate,
            typeOfCall: 'welcomeCallInfo',
            clientId:uniqClient.ClientId,
            memberId:uniqClient._id,
            clientName:uniqClient.Fullname,
            phone: uniqClient.ContactNumber,
            empolyeeId:emp._id,
            ...{...uniObjVal,employeeMongoId:(emp?._id||uniObjVal.employeeMongoId)}
        }


        axios.post(`${url}/memberForm/update/${followupId}`,obj, { headers },
            )
            .then(() => {
                axios.post(`${url}/memberCallReport/create`,obj2, { headers }).then((res)=>{
                    alert("successfully submitted")
                    setUpdateForm({...obj})
                    getAllMemberData()
                })
            })
            .catch((error) => {
                console.error(error)
            })           
                   
    } 


    
 const callUpdateFun=(id)=>{
    setFollowUpid(id)
    setVisibalCallUpdateForm(true)
 }



function filterData(welcomeCallData){
const data = welcomeCallData.filter((el)=>  
`${new Date(el.createdAt).getFullYear()}`.includes(filterObj.year)&&
`${new Date(el.createdAt).getMonth()}`.includes(filterObj.monthName) &&
   el?.AssignStaff?.includes(filterObj.staffName)    
 )
 setPageLength(data?.length)
 return data
}

useEffect(()=>{
    setUpdateForm(prev=>({...prev,wellComeCallFollowupby:uniObjVal.employeeMongoId}))
},[uniObjVal.employeeMongoId])
  return (
    <>
     <CModal size='lg' alignment="start" visible={(visible && visibalCallUpdateForm)} onClose={() => setVisibalCallUpdateForm(false)}>
      <CModalHeader>
        <CModalTitle>Call Update</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {/* <CRow> */}
            <CCol lg={8}>
                <CFormInput
                  type='time'
                  label='Time'
                  value={updateFormData.wellComeCallTimeing}
                  onChange={(e)=>setUpdateForm(prev=>({...prev,wellComeCallTimeing:e.target.value}))}
                ></CFormInput>
            </CCol>
            <CCol lg={8}>
                <CFormInput
                  type='date'
                  label='Follow up date'
                  value={updateFormData.wellComeCallFollowUpDate}
                  onChange={(e)=>setUpdateForm(prev=>({...prev, wellComeCallFollowUpDate:e.target.value}))}
                ></CFormInput>
            </CCol>
            
            <CCol>
                <CFormTextarea rows={4}
                label='Discussion'  
                value={updateFormData.wellComeCallDiscussion}
                onChange={(e)=>setUpdateForm(prev=>({...prev,wellComeCallDiscussion:e.target.value}))}
                ></CFormTextarea>
            </CCol>
            
            <CCol lg={8}>
               <CFormSelect
               label='Follow up by'
               value={updateFormData.wellComeCallFollowupby}
               onChange={(e)=>setUpdateForm(prev=>({...prev,wellComeCallFollowupby:e.target.value}))}
               >
                          {!isEmployee?<option>Select staff name</option>:''}
                          {staff.filter((list) => 
                              list.selected === 'Select' && (list._id===uniObjVal.employeeMongoId||!isEmployee) ).map((item, index) => (
                                  <option key={index} value={item._id} >{item.FullName} {item.EmployeeID}</option>
                              ))}
               </CFormSelect>
            </CCol>
        {/* </CRow> */}
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisibalCallUpdateForm(false)}>
          Close
        </CButton>
        <CButton color="primary" onClick={()=> saveCallUpDate()} >Save call update</CButton>
      </CModalFooter>
    </CModal>
    <CTabPane className='text-center' responsives role="tabpanel" aria-labelledby="home-tab" visible={visible} style={{width:'160%'}}>
    <CTable bordered borderColor="success" responsive>
        <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
            <CTableRow>
                <CTableHeaderCell scope="col">S.No</CTableHeaderCell>
                <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                <CTableHeaderCell scope="col">Follow up date</CTableHeaderCell>
                <CTableHeaderCell scope="col">Timing</CTableHeaderCell>
                <CTableHeaderCell scope="col">
                    Client_Id
                </CTableHeaderCell>
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Contact</CTableHeaderCell>
                <CTableHeaderCell scope="col">
                    Service
                </CTableHeaderCell>
                <CTableHeaderCell scope="col">Discussion</CTableHeaderCell>
                <CTableHeaderCell scope="col">Counsellor</CTableHeaderCell>
                <CTableHeaderCell scope="col">Follow up by</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
            </CTableRow>
        </CTableHead>
        <CTableBody>
        {filterData(welcomecallsData).slice(paging * 10, paging * 10 + 10).map((el,i)=>
         <CTableRow key={i}>
             <CTableDataCell>{(i+1+ (paging * 10))}</CTableDataCell>
             <CTableDataCell>{moment(el.createdAt).format('YYYY-MM-DD')}</CTableDataCell>
             <CTableDataCell>{el?.welcomeCallInfo?.wellComeCallFollowUpDate}</CTableDataCell>
             <CTableDataCell>{el?.welcomeCallInfo?.wellComeCallTimeing}</CTableDataCell>
             <CTableDataCell>{el.ClientId}</CTableDataCell>
             <CTableDataCell>{el.Fullname}</CTableDataCell>
             <CTableDataCell>{el.ContactNumber}</CTableDataCell>
             <CTableDataCell>{el.serviceName}</CTableDataCell>
             <CTableDataCell>{el?.welcomeCallInfo?.wellComeCallDiscussion}</CTableDataCell>
             <CTableDataCell>{el.AssignStaff}</CTableDataCell>
             <CTableDataCell>{el?.welcomeCallInfo?.wellComeCallFollowupby}</CTableDataCell>
                <CTableDataCell className='text-center'>
                    <a href={`tel:${ el?.CountryCode ? el?.CountryCode: '+91' }${ el.ContactNumber }`} target="_black">
                        <MdCall style={{ cursor: 'pointer', markerStart: '10px' }} size='20px' /></a>
                    <a href={`https://wa.me/${el.ContactNumber }`} target="_black">
                        <BsWhatsapp style={{ marginLeft: "4px", cursor: 'pointer', markerStart: '10px' }}
                            size='20px' /></a>

                    <BsPlusCircle className='ms-1'
                        style={{ fontSize: '20px', cursor: 'pointer', markerStart: '10px', color: 'blue' }} onClick={() => callUpdateFun(el._id, el)} />
                </CTableDataCell>
         </CTableRow>
        )}

        </CTableBody>
    </CTable>
</CTabPane> 
</>

  )
}

export default WelcomeCalls
