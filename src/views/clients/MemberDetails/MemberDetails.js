import { cilArrowCircleBottom, cilArrowCircleTop } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
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
} from '@coreui/react'
import React, { useEffect, useState,useMemo } from 'react'
import { useParams } from 'react-router-dom'
import Appointment from './Appointment'
import CallUpdate from './CallUpdate'
import Documents from './Documents'
import Payment from './Payment'
import ProfileDetails from './ProfileDetails'
import Referrals from './Referrals'
import ServiceProfile from './ServiceProfile'
import Teams from './Teams'
import Attendence from './Attendence'
import FitnessProfile from './FitnessProfile'
import ProductSalesReport from '../../Inventory/ProductSalesReport'
import axios from 'axios'

import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


const MemberDetails = () => {
    const [activeKey, setActiveKey] = useState(0)
    const { id, i } = useParams()
    const [clinetData,setClientInfo] = useState({})

    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;

    const url1 = useSelector((el)=>el.domainOfApi)

    async function clinetInfo(){
        const {data,status} = await axios.get(`${url1}/memberForm/${id}`,{ headers: {
            'Authorization': `Bearer ${token}`
        }})
        if(status===200){
            setClientInfo(data)
        }
        }
        
        



    const navigateRoute = useNavigate()


    useEffect(() => {
        if (id !== null) {
            setActiveKey(i)
        }
    }, [i])

    useEffect(()=>{
       clinetInfo()
    },[])

    const navigateToDifferentRoute = (i)=>{
           navigateRoute(`/clients/member-details/${id}/${i}`)
    }
   

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-3 border-success">
                    <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                        <CNav variant="pills" role="tablist" className='justify-content-between'>
                            {[
                                { id: '1', heading: 'Profile' },
                                { id: '2', heading: 'Services' },
                                { id: '3', heading: 'Payments' },
                                { id: '4', heading: 'Attendence' },
                                { id: '5', heading: 'Appointments' },                                
                                { id: '6', heading: 'Refers' },
                                { id: '7', heading: 'Shop' },
                                { id: '8', heading: 'Calls' },
                                { id: '9', heading: 'Fitness' },
                                { id: '10', heading: 'Docs' },
                                { id: '11', heading: 'T&C' },
                            ].map((item) => (
                                <CNavItem key={item.id}>
                                    <CNavLink
                                        style={{ color: 'white' }}
                                        href="javascript:void(0);"
                                        active={activeKey === item.id}
                                        onClick={() => navigateToDifferentRoute(item.id)}
                                    >
                                        {item.heading}
                                    </CNavLink>
                                </CNavItem>
                            ))}
                        </CNav>
                    </CCardHeader>
                    <CCardBody>
                        <CTabContent>
                            {[
                                { id: '1', heading: 'Profile', com: <ProfileDetails ids={id} deleteId={id} clinetData={clinetData} /> },
                                { id: '2', heading: 'Services', com: <ServiceProfile id={id} clinetData={clinetData} /> },
                                { id: '3', heading: 'Payments', com: <Payment id={id} clinetData={clinetData} /> },
                                { id: '4', heading: 'Attendence', com: <Attendence id={id} clinetData={clinetData} /> },   
                                { id: '5', heading: 'Appoinments', com: <Appointment id={id} clinetData={clinetData} /> },
                                { id: '6', heading: 'Referd', com: <Referrals id={id} /> },
                                { id: '7', heading: 'Shop',com:<ProductSalesReport onlyOneClient={true} id={id}/> },
                                { id: '8', heading: 'Calls', com: <CallUpdate id={id}  /> },
                                { id: '9', heading: 'Fitness' , com: <FitnessProfile />} ,
                                { id: '10', heading: 'Docs', com: <Documents id={id} clinetData={clinetData} /> },
                                { id: '11', heading: 'T&C', com: <Teams id={id} /> },
                            ].filter((el,i)=>(+el.id===+activeKey)).map((item, index) => (
                                <CTabPane key={index} role="tabpanel" aria-labelledby="home-tab" visible={true}>
                                    {item.com}
                                </CTabPane>
                            ))}
                        </CTabContent>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default MemberDetails
