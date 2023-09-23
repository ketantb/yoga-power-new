import { CRow,CCol,CCard,CCardHeader,CCardTitle,CCardText,CAccordion
    ,CAccordionItem,CAccordionBody,CAccordionHeader,CListGroup,CListGroupItem,
    CCardBody,CImage,CBadge,CButton
 } from '@coreui/react'
import React,{useState} from 'react'
import EventImage from 'src/assets/images/avatars/eventImage.jpg'
import Participants from './Participants'

const EeventCard = ({active,eventObj}) => {

    const [eventId,setEventId] = useState("")


  return (
    <div  className=' mb-3  flex-column align-items-center w-100'  >
        <CCard>
            <CCardHeader>
                <CRow>
                    <div style={{width:'200px'}} >
                        <CImage src={eventObj.eventBanner} width='100%' />
                    </div>
                    <CCol>
                        <CCardTitle className='mt-2'>{eventObj.eventName}{
                            active?<CBadge color="success float-end">Active</CBadge>:
                            <CBadge color="primary float-end">Upcoming...</CBadge>                           
                            }</CCardTitle>
                        <CCardText>
                        <small className="text-medium-emphasis" style={{ fontWeight: 'bold' }}>Start Date : {new Date(eventObj.eventStartDate).toLocaleDateString()}</small>
                        <small className="text-medium-emphasis float-end " style={{ fontWeight: 'bold' }}>End Date : {new Date(eventObj.eventStartDate).toLocaleDateString()}</small>
                        <br />
                        <small className="text-medium-emphasis" style={{ fontWeight: 'bold' }}>Event Name :{eventObj.eventName}</small>
                        <small className="text-medium-emphasis mx-5" style={{ fontWeight: 'bold' }}>Topic	:{eventObj.service}</small>
                        <small className="text-medium-emphasis float-end " style={{ fontWeight: 'bold' }}>Host Name :{eventObj.hostName}</small>

                        </CCardText>

                        <CCardText>
                            <small className="text-medium-emphasis" style={{ fontWeight: 'bold' }}>Event Time: {eventObj.eventTime} </small>
                            <br/>
                            <small className="text-medium-emphasis " style={{ fontWeight: 'bold' }}>Event venue: {eventObj.eventType}</small>
                            <small className="text-medium-emphasis float-end mt-1" style={{ fontWeight: 'bold' }}>Duration: {eventObj.duration}</small>
                        </CCardText>
                    </CCol>
                </CRow>
            </CCardHeader>
            <CCardBody style={{ backgroundColor: 'rgba(255,255,255,.1)', padding: '0' }}>
            <div class="accordion" id="accordionExample">
  <div class="accordion-item">
  <button onClick={()=>setEventId(prev=>prev=== eventObj.evntId?" ":eventObj.evntId)} class="accordion-button bg-body" type="button" data-coreui-toggle="collapse" data-coreui-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
    <div className='d-flex text-black w-50' >
                              <p >TOTAL ATTENDED : {eventObj.attendedClient}</p>
                              <p className='mx-3' >CLIENT LIMIT : {eventObj.clientLimit}</p>
                             </div> 
                                                        
    </button>
    <div id="collapseOne" className={`accordion-collapse collapse ${eventId===eventObj.evntId?"show":''}`} data-coreui-parent="#accordionExample">
      <div class="accordion-body p-0">
        <Participants id={eventId}/>
      </div>
    </div>
  </div>
</div>
            </CCardBody>
        </CCard>
</div>
  )
}

export default EeventCard
