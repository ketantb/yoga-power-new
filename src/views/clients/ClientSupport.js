import React, { useEffect, useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormInput,
    CFormSelect,
    CInputGroup,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CPaginationItem,
    CPagination
} from '@coreui/react'

import axios from 'axios'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import {MdDelete} from 'react-icons/md'
import { useAdminValidation} from '../Custom-hook/adminValidation'

let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;

import { clientManagementRights } from '../hr/Rights/rightsValue/crmRightsValue'


const ClientSupport = () => {

    const rightsData = useSelector((el)=>el.empLoyeeRights?.crmRights
    ?.crmCientManagment?.items?.superRight) 

    const isAdmin = useSelector((el)=>el.isAdmin) 
    const clientSupportStatus =  (rightsData?.status?.includes(clientManagementRights.clientSupport)||isAdmin)
    const clientSupportDelte = (rightsData?.delete?.includes(clientManagementRights.clientSupport)||isAdmin)
    const clientSupportProfile  =  (rightsData?.profile?.includes(clientManagementRights.clientSupport)||isAdmin)


    const url1 = useSelector((el)=>el.domainOfApi)
    const [clientData,setClientData] = useState([]) 
    let pageNumber = 0

    const pathVal = useAdminValidation('Master')
    const [paging,setPaging] = useState(0)

    const [Search1, setSearch1] = useState('')
    const [Search2, setSearch2] = useState('')
    const [Search3, setSearch3] = useState('')
    const [Search4, setSearch4] = useState('')
    const [Search5, setSearch5] = useState('')

  
const getClientSupport = async ()=>{
  const {data} = await  axios.get(`${url1}/clientSupport/${pathVal}`,{headers: {
    "Authorization": `Bearer ${token}`,
}})
  setClientData(data)
}

const updateStatus = async (obj)=>{
      obj.Status = !obj.Status
     axios.post(`${url1}/clientSupport/update/${obj._id}`,obj,{headers: {
        "Authorization": `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }}).then((res)=>{
        getClientSupport()
    })
}

const deleteFun = (obj)=>{
 axios.delete(`${url1}/clientSupport/delete/${obj._id}`)
 .then((res)=>{
    getClientSupport()
})

}

useEffect(()=>{
getClientSupport()
},[])


    
    return (
        <CRow>
            <CCol lg={12} sm={12}>
                <CCard className='mb-3 border-top-success border-top-3'>
                    <CCardHeader>
                        <strong className="mt-2">Client Support </strong>
                    </CCardHeader>
                    <CCardBody>
                        <CTable className='mt-3' align="middle" bordered  hover responsive>
                            <CTableHead color={'darkGreen'} >
                                    <CTableHeaderCell>Sr.No</CTableHeaderCell>
                                    <CTableHeaderCell>Name</CTableHeaderCell>
                                    <CTableHeaderCell>Reg Mobile</CTableHeaderCell>
                                    <CTableHeaderCell>Type of Request</CTableHeaderCell>
                                    <CTableHeaderCell>Request Date</CTableHeaderCell>
                                    <CTableHeaderCell>Request details</CTableHeaderCell>
                                    <CTableHeaderCell>Status</CTableHeaderCell>
                                    <CTableHeaderCell>Medium</CTableHeaderCell>
                                    <CTableHeaderCell className={clientSupportDelte?'text-center':'d-none'} >Delete</CTableHeaderCell>
                            </CTableHead>
                            <CTableBody>
                                <CTableRow>
                                <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "60px" }}
                                            type="text"
                                            disabled
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "60px" }}
                                            type="text"
                                            aria-describedby="exampleFormControlInputHelpInline"
                                            value={Search1}
                                            onChange={(e)=>setSearch1(e.target.value)}
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "120px" }}
                                            type="text"
                                            aria-describedby="exampleFormControlInputHelpInline"
                                            value={Search2}
                                            onChange={(e)=>setSearch2(e.target.value)}
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "120px" }}                                           
                                            aria-describedby="exampleFormControlInputHelpInline"
                                            value={Search3}
                                            onChange={(e)=>setSearch3(e.target.value)}
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "90px" }}
                                            value={Search4}
                                            onChange={(e)=>setSearch4(e.target.value)}
                                                                                />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "120px" }}
                                            value={Search5}
                                            onChange={(e)=>setSearch5(e.target.value)}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "120px" }}
                                            disabled
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            style={{ minWidth: "100px" }}
                                            disabled
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell className={clientSupportDelte?'':'d-none'} >
                                        <CFormInput
                                            className="mb-1"
                                            type="text"
                                            disabled
                                            style={{ minWidth: "100px" }}                                                                               
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                    
                                </CTableRow>
                                {clientData.filter((list)=>(
                                (list.Client_Name||' ').includes(Search1.toLowerCase()) &&
                                (list.Regular_Mobile_No+"").includes(Search2) &&
                                (list.Type_Of_Request+"").toLowerCase().includes(Search3.toLowerCase())&&
                                (list.Request_Date||' ').toLowerCase().includes(Search4.toLowerCase())&&
                                (list.Request_Details||' ').toLowerCase().includes(Search5.toLowerCase())
                                )).filter((el)=>{
                                  pageNumber++      
                                  return el  
                                }).map((el,i)=>
                                <CTableRow >
                                    <CTableDataCell>{i+1}</CTableDataCell>
                                    <CTableDataCell>
                                    {clientSupportProfile?
                                                <Link  style={{ textDecoration: 'none' }} to={`/clients/member-details/${el.memBerId}/1`} 
                                           >{el.Client_Name}</Link>:el.Client_Name}        
                                    </CTableDataCell>
                                    <CTableDataCell>{el.Regular_Mobile_No}</CTableDataCell>
                                    <CTableDataCell>{el.Type_Of_Request}</CTableDataCell>
                                    <CTableDataCell>{el.Request_Date}</CTableDataCell>
                                    <CTableDataCell>{el.Request_Details}</CTableDataCell>
                                    <CTableDataCell className='text-center'>
                                        {el.Status?<CButton disabled={!clientSupportStatus} size='sm' className='bg-success border-success' onClick={()=>updateStatus(el)} >Active</CButton>:
                                        <CButton  disabled={!clientSupportStatus} className='bg-danger' size='sm' onClick={()=>updateStatus(el)} >InActive</CButton>}
                                    </CTableDataCell>
                                    <CTableDataCell>{el.Medium}</CTableDataCell>
                                    <CTableDataCell className={clientSupportDelte?'text-center':'d-none'} style={{cursor:'pointer'}}>{<MdDelete
                                    onClick={()=>deleteFun(el)}
                                    />}</CTableDataCell>                                                                          
                                </CTableRow>
                                )}
                            </CTableBody>
                        </CTable>

                    </CCardBody>
                    <CPagination aria-label="Page navigation example" align="center" className='mt-2'>
                        <CPaginationItem aria-label="Previous" disabled={paging != 0 ? false : true} onClick={() => paging > 0 && setPaging(paging - 1)}>
                            <span aria-hidden="true">&laquo;</span>
                        </CPaginationItem>
                        <CPaginationItem active onClick={() => setPaging(0)}>{paging + 1}</CPaginationItem>
                        {pageNumber > (paging + 1) * 10 && <CPaginationItem onClick={() => setPaging(paging + 1)} >{paging + 2}</CPaginationItem>}

                        {pageNumber > (paging + 2) * 10 && <CPaginationItem onClick={() => setPaging(paging + 2)}>{paging + 3}</CPaginationItem>}
                        {pageNumber > (paging + 1) * 10 ?
                            <CPaginationItem aria-label="Next" onClick={() => setPaging(paging + 1)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                            : <CPaginationItem disabled aria-label="Next" onClick={() => setPaging(paging + 1)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                        }
                    </CPagination>


               
                </CCard>
            </CCol >
        </CRow >
    )
}

export default ClientSupport
