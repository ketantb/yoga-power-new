import { CCard, CCardBody, CCardHeader, CCardTitle, CCol,CButton, CFormInput, CTable
    ,CTableDataCell,
    CTableHeaderCell,
    CTableHead,
    CRow,
    CTableBody,
    CTableRow,
    } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useAdminValidation,useUniqAdminObjeact } from 'src/views/Custom-hook/adminValidation'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { MdDelete } from 'react-icons/md'

const FormMaster = () => {
    const [cateGoryName,setCateGoryName] = useState('')
    const pathVal =  useAdminValidation('Master')
    const uniqObjVal = useUniqAdminObjeact()
    const url1 = useSelector((el)=>el.domainOfApi) 
    const [categoryData,setCateGoryData] = useState([])

    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;


    function getBatchCategoryData() {
        axios.get(`${url1}/batchCategory/${pathVal}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                setCateGoryData(res.data.reverse())
            })
            .catch((error) => {
                console.error(error)
            })
    }

    function postRequest(e){
        e.preventDefault()
        axios.post(`${url1}/batchCategory/create`, {...uniqObjVal,cateGoryName,date:new Date()}, { headers:{
                "Authorization": `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
        } })
        .then((resp) => {
            if(resp.status===200){
                getBatchCategoryData()
                alert('Successfully Save')
            }
        })
        .catch((error) => console.log(error))
        
        }
        useEffect(()=>{
            getBatchCategoryData()
        },[])

        function deleteAppointmentData(id) {
            if(!confirm('Do u really Want to delete this')){
              return 
            }
            fetch(`${ url1 }/batchCategory/delete/${ id }`, { headers:{
                "Authorization": `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
        } }).then((result) => {
                if(result.status===200){
                    getBatchCategoryData()
                    alert('Successfully Save')
                }
            })
        }
        
    return (
        <CCard>
            <CCardHeader>
                <CCardTitle>Batch category </CCardTitle>
            </CCardHeader>
            <CCardBody>
                <CCard className="mb-3 border-success">
                    
                    <CCardBody>
                        <form onSubmit={postRequest}>
                        <CRow>
                          <CCol lg={4} md={6} >
                            <CFormInput
                             value={cateGoryName}
                             onChange={(e)=>{setCateGoryName(e.target.value)}}
                             type='text'
                             placeholder='Enter batch category'
                             required
                            >
                            </CFormInput>
                          </CCol>
                          <CCol>
                           <CButton type={'submit'}>Create </CButton>
                          </CCol>
                        </CRow>
                    </form>
                    </CCardBody>
                </CCard>

                <CTable className='mt-3' align="middle" bordered  hover responsive>
                            <CTableHead color={'darkGreen'} >
                                    <CTableHeaderCell>Sr.No</CTableHeaderCell>
                                    <CTableHeaderCell>Date</CTableHeaderCell>
                                    <CTableHeaderCell>Batch Category</CTableHeaderCell>
                                    <CTableHeaderCell>Delete</CTableHeaderCell>
                            </CTableHead>
                            <CTableBody>
                               
                            {categoryData.map((el,i)=>
                             <CTableRow className='text-center' >
                             <CTableDataCell>{i+1}</CTableDataCell>
                             <CTableDataCell>{ new Date(el.date).toDateString()}</CTableDataCell>
                             <CTableDataCell>{el.cateGoryName}</CTableDataCell>
                             <CTableDataCell><MdDelete onClick={()=>deleteAppointmentData(el._id)}/></CTableDataCell>
                         </CTableRow> )}                                                                   
                            </CTableBody>
                        </CTable>
            </CCardBody>
        </CCard>
    )
}

export default FormMaster
