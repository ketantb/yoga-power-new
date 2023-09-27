import React,{useState} from 'react'

import { CRow,CCol,CCard,CCardHeader,CCardTitle,CCardText,CAccordion
  ,CAccordionItem,CAccordionBody,CAccordionHeader,CListGroup,CListGroupItem,
  CCardBody,CImage,CBadge,CButton,CForm,CInputGroup,CFormSelect,CFormInput,CPopover,
  CTable,CTableHead,CTableBody,CTableRow,CTableDataCell,CTableHeaderCell,CInputGroupText,
  CPagination,CPaginationItem,CFormLabel,CFormCheck,CFormFeedback,CFormTextarea,
  CModal,CModalTitle,CModalHeader,CModalFooter,CModalBody
} from '@coreui/react'
import StaffCheckBoxInputDropDown from './StaffCheckBoxInputDropDown'
import { useSelector } from 'react-redux'
import io from "socket.io-client";



const Notification = () => {
  const [visible, setVisible] = useState(false)
  const url = useSelector((el)=>el.domainOfApi) 
  const ENDPOINT = url+"/";

  const  socket = io(ENDPOINT)



socket.on('disconnect', () => {
  console.log('Connected to server');
});

// socket.on('latestNotifications', (notifications) => {
//   // Handle the received notifications on the client-side
//   console.log('Received latest notifications:', notifications);
//   // Update your UI to display these notifications
// });

// function createNotification(message) {
//   socket.emit('createNotification', { message });
// }

  return (
    <div>

     <CCard className='p-2 d-inline-block my-2'>

          Hello World
     </CCard>

    <CModal
      visible={visible}
      onClose={() => setVisible(false)}
      aria-labelledby="LiveDemoExampleLabel"
      scrollable
    >
      <CModalHeader onClose={() => setVisible(false)}>
        <CModalTitle id="LiveDemoExampleLabel">Modal title</CModalTitle>
      </CModalHeader>
      <CModalBody>
      <CForm className="row g-3 p-2">

      <div>

  <CCol sx={12} className='mb-3'>
    <CFormLabel>Select Staff</CFormLabel>
    <StaffCheckBoxInputDropDown/>
  </CCol>

  <CCol sx={12} className='mb-3' >
    <CFormTextarea
      type="text"
      id="validationServer03"
      label="Notification Message"
      feedback="Please provide a valid city."
      placeholder='Enter Notification Message'
      required
    />
  </CCol>
  </div>
</CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Close
        </CButton>
        <CButton color="primary" type="submit" onClick={()=>createNotification('Hello World')}>
      Submit form
    </CButton>
      </CModalFooter>
    </CModal>




    <CCol className='fixed-bottom text-end p-2'>
<CButton  style={{width:'160px'}}  onClick={() => setVisible(!visible)}>
+  Add Notification
</CButton>  
</CCol>

</div>
  )
}

export default Notification
