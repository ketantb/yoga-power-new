import {
    CCol,
    CFormSwitch,
    CRow,
} from '@coreui/react'
import { course } from '../Rights/rightsValue/erpRightsValue'

function Courses({erpCourse,setRightObject}){



   const handleRight = (val,parrent)=>{

      setRightObject(prev => {
   
          const  arr = prev.erpRights.erpCourse.items[parrent].rights
          console.log(arr)
          if(arr.includes(val)){
              arr?.splice(arr?.indexOf(val),1)
              return { ...prev }
          }
       arr.push(val)
       return { ...prev }
      })
   }
   
   const toCheckRightVal = (val,parrent)=>{
      return erpCourse.items[parrent].rights.includes(val)
   }
   


return  <div >
<CRow >
   <CCol sm={12}>
   <h4 className='mb-4 d-flex' >Course<span className='mx-2'><CFormSwitch size="lg"
   checked={erpCourse.value}
   onChange={(e) => setRightObject(prev => {
       prev.erpRights.erpCourse.value = e.target.checked
       return { ...prev }
   })}
   /></span></h4>
   </CCol>
<CCol>

   <h5 className='mb-4 d-flex' >TTC Client<span className='mx-2'><CFormSwitch size="lg"
     checked={erpCourse.items.erpTTCClients.value}
     onChange={(e) => setRightObject(prev => {
         prev.erpRights.erpCourse.items.erpTTCClients.value = e.target.checked
         return { ...prev }
     })}
   /></span></h5>

   <CFormSwitch size="xl" label="Action " 
   checked={toCheckRightVal(course.clientCourseAction ,'erpTTCClients')}
   onChange={(e)=>handleRight(course.clientCourseAction ,'erpTTCClients')}
   />

   <CFormSwitch size="xl" label="Profile View" 
   checked={toCheckRightVal(course.ttcClientCurseView ,'erpTTCClients')}
   onChange={(e)=>handleRight(course.ttcClientCurseView ,'erpTTCClients')}
   />
</CCol>
<CCol>
   <h5 className='mb-4 d-flex' >TTC Videos<span className='mx-2'><CFormSwitch size="lg"
    checked={erpCourse.items.erpTTCVideos.value}
    onChange={(e) => setRightObject(prev => {
        prev.erpRights.erpCourse.items.erpTTCVideos.value = e.target.checked
        return { ...prev }
    })}
   /></span></h5>
   <CFormSwitch size="xl" label="Add Training Course" 
      checked={toCheckRightVal(course.addTrainingCourse ,'erpTTCVideos')}
      onChange={(e)=>handleRight(course.addTrainingCourse ,'erpTTCVideos')}
   />
   <CFormSwitch size="xl" label="Delete Course Video"
      checked={toCheckRightVal(course.deleteCourseVideo ,'erpTTCVideos')}
      onChange={(e)=>handleRight(course.deleteCourseVideo ,'erpTTCVideos')}
   />
</CCol>
<CCol>
   <h5 className='mb-4 d-flex' >Teachers Training Course PDF Details<span className='mx-2'><CFormSwitch size="lg"
    checked={erpCourse.items.erpTTCPdf.value}
    onChange={(e) => setRightObject(prev => {
        prev.erpRights.erpCourse.items.erpTTCPdf.value = e.target.checked
        return { ...prev }
    })}
   /></span></h5>
   <CFormSwitch size="xl" label="Add PDF Details" 
   checked={toCheckRightVal(course.addPDFDetails ,'erpTTCPdf')}
   onChange={(e)=>handleRight(course.addPDFDetails ,'erpTTCPdf')}
   />
   <CFormSwitch size="xl" label="View  PDF Details" 
   checked={toCheckRightVal(course.editPDFDetails ,'erpTTCPdf')}
   onChange={(e)=>handleRight(course.editPDFDetails ,'erpTTCPdf')}
   />
   <CFormSwitch size="xl" label="Delete PDF Details" 
   checked={toCheckRightVal(course.deletePDFDetails ,'erpTTCPdf')}
   onChange={(e)=>handleRight(course.deletePDFDetails ,'erpTTCPdf')}
   />
    <CFormSwitch size="xl" label="Delete PDF Details" 
   checked={toCheckRightVal(course.deletePDFDetails ,'erpTTCPdf')}
   onChange={(e)=>handleRight(course.deletePDFDetails ,'erpTTCPdf')}
   />
</CCol>
</CRow>

<CRow>
<CCol>
<h5 className='mb-4 d-flex' >Client Certificate Details<span className='mx-2'><CFormSwitch size="lg"
checked={erpCourse.items.erpCourseCompletion.value}
onChange={(e) => setRightObject(prev => {
    prev.erpRights.erpCourse.items.erpCourseCompletion.value = e.target.checked
    return { ...prev }
})}
   /></span></h5>
   <CFormSwitch size="xl" label="Add Client Certificate" 
      checked={toCheckRightVal(course.addClientCertificate ,'erpCourseCompletion')}
      onChange={(e)=>handleRight(course.addClientCertificate ,'erpCourseCompletion')}
   />
   <CFormSwitch size="xl" label="Edit Client Certificate"
      checked={toCheckRightVal(course.editClientCertificate ,'erpCourseCompletion')}
      onChange={(e)=>handleRight(course.editClientCertificate ,'erpCourseCompletion')}   
   />
   <CFormSwitch size="xl" label="Delete Client Certificate"
      checked={toCheckRightVal(course.deleteClientCertificate ,'erpCourseCompletion')}
      onChange={(e)=>handleRight(course.deleteClientCertificate ,'erpCourseCompletion')}   
   />
    <CFormSwitch size="xl" label="Delete Client Certificate"
      checked={toCheckRightVal(course.viewClientCertificate ,'erpCourseCompletion')}
      onChange={(e)=>handleRight(course.viewClientCertificate ,'erpCourseCompletion')}   
   />
</CCol>
</CRow>
</div>

} 

export default Courses