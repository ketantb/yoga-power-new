import {
    CCol,
    CFormSwitch,
    CRow,
} from '@coreui/react'


import React from 'react'

const EmployeeRights = () => {
    return <div  >
    

    <CRow >
          <h5 className='mb-4 p-2 d-flex ' style={{background:'#0B5345',color:'white'}}>
          Employee Dashboard<span className='mx-2'>
           <CFormSwitch size="lg"/></span>
          </h5>
    
        <CCol>
            <CFormSwitch size="xl" label="Achived"  />
            <CFormSwitch size="xl" label="Target" />
            <CFormSwitch size="xl" label="Incentive" />
            <CFormSwitch size="xl" label="Profit" />
        </CCol>
        <CCol>
            <CFormSwitch size="xl" label="Income"  />
            <CFormSwitch size="xl" label="Attendance" />
            <CFormSwitch size="xl" label="Traffic" />
            <CFormSwitch size="xl" label="Social Media" />
        </CCol>
        <CCol>
            <CFormSwitch size="xl" label="Yog Power Branch"  />
        </CCol>
      
    </CRow>
    
    <CRow className='mt-5' >

       <h5 className='mb-4 p-2 d-flex ' style={{background:'#0B5345',color:'white'}}>
          Employee Target<span className='mx-2'>
           <CFormSwitch size="lg"/></span>
          </h5>
        
        <CCol>
            <CFormSwitch size="xl" label="Sales Target" />
            <CFormSwitch size="xl" label="Client Target" />
            <CFormSwitch size="xl" label="Calls Target" />
            <CFormSwitch size="xl" label="Lead Target" />
        </CCol>
        <CCol>
            <CFormSwitch size="xl" label="Renewal"  />
            <CFormSwitch size="xl" label="Referral Leads" />
            <CFormSwitch size="xl" label="Media Target" />
        </CCol>    
    </CRow>

        <CRow className='mt-5' >

            <h5 className='mb-4 p-2 d-flex ' style={{ background: '#0B5345', color: 'white' }}>
                Members Call<span className='mx-2'>
                    <CFormSwitch size="lg" /></span>
            </h5>

            <CCol>
                <CFormSwitch size="xl" label="Welcome Calls" />
                <CFormSwitch size="xl" label="Feedback Calls" />
                <CFormSwitch size="xl" label="Payment Calls" />
                <CFormSwitch size="xl" label="Irregular Member Call" />
            </CCol>
            <CCol>
                <CFormSwitch size="xl" label="Greeting Calls" />
                <CFormSwitch size="xl" label="Call History" />
            </CCol>
        </CRow>

        <CRow className='mt-5' >

            <h5 className='mb-4 p-2 d-flex ' style={{ background: '#0B5345', color: 'white' }}>
                Sales Call<span className='mx-2'>
                    <CFormSwitch size="lg" /></span>
            </h5>

            <CCol>
                <CFormSwitch size="xl" label="Upgrade Calls" />
                <CFormSwitch size="xl" label="Renewals Calls" />
                <CFormSwitch size="xl" label="Cross-Cell Calls" />
            </CCol>
           
        </CRow>
        
        <CRow className='mt-5' >

            <h5 className='mb-4 p-2 d-flex ' style={{ background: '#0B5345', color: 'white' }}>
            Services Rate Card <span className='mx-2'>
                    <CFormSwitch size="lg" /></span>
            </h5>

        </CRow>
    
    </div>
}

export default EmployeeRights
