import { CRow,CCol,CCard,CCardHeader,CCardTitle,CCardText,CAccordion
    ,CAccordionItem,CAccordionBody,CAccordionHeader,CListGroup,CListGroupItem,
    CCardBody,CImage,CBadge,CButton
 } from '@coreui/react'
import React,{useEffect,useState} from 'react'
import EventImage from 'src/assets/images/avatars/eventImage.jpg'
import EeventCard from './EeventCard'
import axios from 'axios'
import { useAdminValidation } from '../Custom-hook/adminValidation'
import { useSelector } from 'react-redux'

const ActiveEvent = ({activeKey}) => {



const pathVal = useAdminValidation('Master')

  let user = JSON.parse(localStorage.getItem('user-info'))
  const token = user.token; 
  const url = useSelector((el) => el.domainOfApi)
  const [actveEventData,setActiveEventData] = useState([])

const headers =  {
    'Authorization': `Bearer ${token}`
}
  
 async function toGetRequireData(){
    try{
  const response = await  axios.get(`${url}/bookingEvent/active-event/${pathVal}`,{headers})
  if(response.status===200){
    setActiveEventData(response.data)
  }
    }catch(error){
        console.log(error)

    }

    }

 useEffect(()=>{
  toGetRequireData()
 },[activeKey])

 console.log(actveEventData)
  return (
    actveEventData.map((el)=><EeventCard active eventObj={el} />)
  )
  
}

export default ActiveEvent
