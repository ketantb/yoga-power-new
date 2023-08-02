import React, { useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import useLoginHook from './DirectLoginHook/useLoginHook'


import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CPagination,
  CPaginationItem,
} from '@coreui/react'


import { dashboardRights } from '../hr/Rights/rightsValue/crmRightsValue'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'


const CenterPartner = ()=>{

    const isAdmin = useSelector((el)=>el.isAdmin) 
    const url = useSelector((el) => el.domainOfApi)
    const functionToDirectLogin = useLoginHook()
    const [centerPartnerData,setCenterPartnerData] = useState([])
    const [pagination, setPagination] = useState(5)


    const user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;
  
    const headers = {
      "Authorization": `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
     }
  

    const getDasCenterPartner = ()=>{
        axios.get(`${url}/signup/center-patner`,{headers}).then((el)=>{
          setCenterPartnerData(el.data)
         if(el.status!==200){
          return 
         }
       }).catch((error)=>{console.log(error)})
    
       }
    
       
useEffect(()=>{
        getDasCenterPartner()
       },[])
    

return <CRow>
  {(isAdmin) && <CCol className='mt-2' >
    <CCard className="mb-4">
      <CCardHeader>Admin panel</CCardHeader>
      <CCardBody>
        <CTable align="middle" bordered style={{ borderColor: "#106103" }} hover responsive>
          <CTableHead style={{ backgroundColor: '#0B5345',color: "white"}}  >
            <CTableRow>                 
              <CTableHeaderCell>Sr.No</CTableHeaderCell>
              <CTableHeaderCell>Brand Logo</CTableHeaderCell>
              <CTableHeaderCell>Center Name</CTableHeaderCell>
              <CTableHeaderCell>Partner Profile</CTableHeaderCell>
              <CTableHeaderCell>Types Of Partner</CTableHeaderCell>
              <CTableHeaderCell>Location</CTableHeaderCell>
              <CTableHeaderCell>City</CTableHeaderCell>
              <CTableHeaderCell>Country</CTableHeaderCell>
              <CTableHeaderCell>Packege</CTableHeaderCell>
              <CTableHeaderCell>EXP. Date</CTableHeaderCell>
              <CTableHeaderCell>View</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {centerPartnerData.
            filter((el, i) => {
                  if (pagination - 5 < i + 1 && pagination >= i + 1) {
                        return el
                      }
              }).map((el, index) => (
                <CTableRow className="text-center"  >
                <CTableDataCell>
                  {index+1 +(pagination-5)}
                </CTableDataCell>
                <CTableDataCell >
                  <div 
                  className="border-gray rounded-circle"
                  style={{width:'100px'}}
                  >
                    <img
                    width='100%'
                    src={el.brandLogo}
                    />

                  </div>
                </CTableDataCell>
                <CTableDataCell>   
                  {el.center}                                 
                </CTableDataCell>
              
                <CTableDataCell>  
                  <Link to={`/profile/${el._id}`}> {el.username}   </Link>                                                                    
                </CTableDataCell>   
              
                <CTableDataCell>     
                  {el.typeOfPartner}                                                                   
                </CTableDataCell> 
                <CTableDataCell>     
                  {el.location}        
                </CTableDataCell>
                <CTableDataCell>   
                  {el.city}                                                                     
                </CTableDataCell>  
                <CTableDataCell>   
                  {el.country}          
               
                </CTableDataCell>
                <CTableDataCell>    
                  {el.packege}                                                                    
                </CTableDataCell>                                                
                                    
                <CTableDataCell>    
                   {new Date(el.expDate).toDateString()}                                                                               
                </CTableDataCell>
                <CTableDataCell>    
                  <CButton onClick={()=>functionToDirectLogin(el.email,el.password)} >View </CButton>
                </CTableDataCell>
              
            </CTableRow>
            ))}
          </CTableBody>
        </CTable>

        <div className='d-flex justify-content-center mt-3' >
                        <CPagination aria-label="Page navigation example" style={{cursor:'pointer'}}>
                            <CPaginationItem aria-label="Previous" onClick={() => setPagination((val) => val > 5 ? val - 5 : 5)}>
                                <span aria-hidden="true" >&laquo;</span>
                            </CPaginationItem>
                            <CPaginationItem active >{pagination / 5}</CPaginationItem>
                            {centerPartnerData.length > pagination / 5 * 5 && <CPaginationItem onClick={() => setPagination((val) => val < centerPartnerData.length ? val + 5 : val)}>{pagination / 5 + 1}</CPaginationItem>}
                            {centerPartnerData.length > pagination / 5* 10 && <CPaginationItem onClick={() => setPagination((val) => val < centerPartnerData.length ? val + 5 : val)}>{pagination / 5 + 2}</CPaginationItem>}
                            <CPaginationItem aria-label="Next" onClick={() => setPagination((val) => val < centerPartnerData.length ? val + 5 : val)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                        </CPagination>
      </div>
      </CCardBody>
    </CCard>
  </CCol>}

   
</CRow>
}

export default  CenterPartner