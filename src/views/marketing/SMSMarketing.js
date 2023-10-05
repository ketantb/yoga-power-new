import { CButton, CCard, CCardBody, CCardHeader, CCardTitle, CCol, CForm, CFormInput, CFormSelect, CFormTextarea, CRow } from '@coreui/react'
import React,{useEffect,useState} from 'react'
import {useSelector} from 'react-redux'
import axios from 'axios';
import { useAdminValidation } from '../Custom-hook/adminValidation';


const SMSMarketing = () => {
    const url = useSelector((el) => el.domainOfApi)
    const pathVal  = useAdminValidation()
    let user = JSON.parse(localStorage.getItem('user-info'))
    const [typeOfClientData,setTypeOfClientData] = useState([])
    const [smsMarketingData,setSmsMarketingData] =useState([])
    const [slectedClient,setSelectedClient] = useState('')
    const [message,setmessage] =useState(`We received your inquiry for Yoga , Weight Loss with Yogic Management program, Ttc courses. We'd be happy to help with the details and guides YOGPOWER`)
    const [contactNumber,setContactNumber] = useState('')    
    const [enterdContactNumber,setEnterdContectNumber] = useState('')
 
    const smsApiInfo = {
        domainOfApi:'http://164.52.205.46:6005',
        apiKey:'qgKjg0b18qNu4X3sXDF+BjgmKYPidkiY/W4YfmAoSSw=',
        clientId:'e97842d7-70f0-4cbd-84c7-33770b20f34f',
        senderId:'YOGPIF',
    }

    const content = {"SenderId": "YOGPIF",
"Is_Unicode": false,
"Is_Flash": false,
"Message": "We received your inquiry for Yoga , Weight Loss with Yogic Management program, Ttc courses.\nWe'd be happy to help with the details and guides YOGPOWER",
"MobileNumbers": "9005126629,9519011853",
"ApiKey": "qgKjg0b18qNu4X3sXDF+BjgmKYPidkiY/W4YfmAoSSw=",
"ClientId": "e97842d7-70f0-4cbd-84c7-33770b20f34f"}


    const token = user.token;  
    const headers = {
        "Authorization": `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }




const getEmailMarhetingInput = async  ()=>{
        try{
            let response1 =  axios.get(`${url}/marketingContact/${pathVal}`,{headers})
           


            const allData = await Promise.all([response1])
            
           console.log(allData)   

             if(allData[0].status===200){
                setSmsMarketingData(allData[0].data)
                setTypeOfClientData(allData[0]?.data?.selectInput)
             }
         }catch(error){
          console.error(error)
         }
 }


useEffect(()=>{
    getEmailMarhetingInput()
},[])


async function toSendMessage(url){
    try{
        let response1 = await axios.get(url,{headers:{ 'Content-Type': 'application/json'}})
        console.log(response1)

         if(response1.status===200){
         }
     }catch(error){
      console.error(error)
     }
}

const messages = encodeURIComponent(`We received your inquiry for Yoga , Weight Loss with Yogic 
Management program, Ttc courses.\nWe'd be happy to help with the details and guides YOGPOWER`)

const sendedUrl = `http://164.52.205.46:6005/api/v2/SendSMS?
SenderId=YOGPIF
&Is_Unicode=false
&Is_Flash=false
&Message=${messages}
&MobileNumbers=${enterdContactNumber+contactNumber}
&ApiKey=qgKjg0b18qNu4X3sXDF%2BBjgmKYPidkiY%2FW4YfmAoSSw%3D
&ClientId=e97842d7-70f0-4cbd-84c7-33770b20f34f`


useEffect(()=>{
    let email  = []
    if(!slectedClient.trim()){
    return
    }
    
    const parentKey = slectedClient.split(' ')[0]
    const childKey = slectedClient.split(' ')[1]
    if(childKey==='no'){
    email = smsMarketingData[parentKey].map((el)=>el.email)
    }else{
    email = smsMarketingData[parentKey].filter((el)=>el[childKey]).map((el)=>el.email)
    console.log(email)
    }
    setContactNumber(email.join(','))
},[slectedClient])



const  smsendToAllClient  =()=>{
toSendMessage(sendedUrl)
}


    return (
        <CCard>
            <CCardHeader>
                <CCardTitle></CCardTitle>
            </CCardHeader>
            <CCardBody>
                <CForm>
                    <CRow>
                        <CCol lg={12} md={12} sm={12}>
                            <CFormInput
                                className="mb-1"
                                label="Enter Contact Numbers"
                                onChange={(e)=>{setEnterdContectNumber(e.target.value)}}
                                value={enterdContactNumber}
                            />
                        </CCol>
                        <CCol lg={12} md={12} sm={12}>
                            <CFormSelect
                                className="mb-1"
                                aria-label="Select Currency"
                                label="Select Contact Number type of Client"
                                value={slectedClient}
                                onChange={(e)=>{setSelectedClient(e.target.value)}}
                                >

                                <option value={''}>Select type of Client</option>
                            {typeOfClientData.map((el)=>
                               <option value={`${el.value.parent} ${el.value.child}`}>{el.label}</option>
                            )}

                            </CFormSelect>      
                            
                            <CFormTextarea xs={12}
                        label='Selected Contact Number'
                        value={enterdContactNumber+contactNumber}
                        rows={4}
                        disabled
                        >
                           
                        </CFormTextarea>    

                        <CFormTextarea xs={12}
                        label='message'
                        value={message}
                        rows={3}
                        >
                           
                        </CFormTextarea>                         
                        </CCol>
                    </CRow>
                    <CButton className='mt-2' onClick={smsendToAllClient}>Send</CButton>
                </CForm>
            </CCardBody>
        </CCard>
    )
}

export default SMSMarketing
