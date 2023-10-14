import { MdCall, MdDelete, MdEdit, MdMail } from 'react-icons/md';
import {
  
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CTabPane,
} from '@coreui/react'
import React, { useState,useCallback,useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import moment  from  'moment/moment';
import { useAdminValidation} from 'src/views/Custom-hook/adminValidation';

let user = JSON.parse(localStorage.getItem('user-info'))


const CallHistory = ({visible,filterObj,id,setPageLength,paging}) => {
    const url = useSelector((el)=>el.domainOfApi) 

    const [callHistoryData,setCallHistoryData] = useState([])
    const obj ={
        "welcomeCallInfo":'Welcome Call',
        "feedBackCallInfo":'Feedback Call',
        "paymentCallsInfo":'Payment Call',
        "greetingCall":'Greeting Call',
        "irreguralMemberCall":"Irregural Member Call"
    }


    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;

    const pathVal =  useAdminValidation()


    function getAllMemberData() {

        axios.get(`${url}/memberCallReport/${pathVal}`, {headers: {'Authorization': `Bearer ${token}`}})
            .then((res) => {
               if(!!id){
                setCallHistoryData(res.data.filter((el)=>el.memberId ===id).reverse())
                return 
              }
              setCallHistoryData(res.data)
              setPageLength(res.data?.length)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    useEffect(()=>{
      getAllMemberData()
    },[])



  return (
    <>
    <CTabPane className='text-center' responsives role="tabpanel" aria-labelledby="home-tab" visible={visible} style={{width:'120%'}}>
    <CTable bordered borderColor="success" responsive>
        <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
            <CTableRow>
                <CTableHeaderCell scope="col">S.No</CTableHeaderCell>
                <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                <CTableHeaderCell scope="col">Type of call</CTableHeaderCell>
                <CTableHeaderCell scope="col">Follow up date</CTableHeaderCell>
                <CTableHeaderCell scope="col">Timing</CTableHeaderCell>
                <CTableHeaderCell scope="col">
                    C/A Id
                </CTableHeaderCell>
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Contact</CTableHeaderCell>
           
                <CTableHeaderCell scope="col">Discussion</CTableHeaderCell>
                <CTableHeaderCell scope="col">Follow up by</CTableHeaderCell>
            </CTableRow>
        </CTableHead>
        <CTableBody>
            {callHistoryData.slice(paging * 10, paging * 10 + 10).filter((el)=>  
        `${new Date(el.createdAt).getFullYear()}`.includes(filterObj.year)&&
        `${new Date(el.createdAt).getMonth()}`.includes(filterObj.monthName)    
        ).map((el,i)=>
             <CTableRow>
                <CTableDataCell>{(i+1+ (paging * 10))}</CTableDataCell>
                <CTableDataCell>{moment(el.createdAt).format('YYYY-MM-DD')}</CTableDataCell>
                <CTableDataCell>{(obj[el.typeOfCall]||'')}</CTableDataCell>
                <CTableDataCell>{moment(el.callFollowUpDate).format('YYYY-MM-DD')}</CTableDataCell>
                <CTableDataCell>{el.callTimeing}</CTableDataCell>
                <CTableDataCell>{el.clientId}</CTableDataCell>
                <CTableDataCell>{el.clientName}</CTableDataCell>
                <CTableDataCell>{el.phone}</CTableDataCell>
                <CTableDataCell style={{maxWidth:'300px'}}>{el.callDiscussion}</CTableDataCell>
                <CTableDataCell>{el.callFollowupby}</CTableDataCell>
             </CTableRow>
             
            )}         
        </CTableBody>
    </CTable>
</CTabPane>
</>

  )
}

export default CallHistory
