import React from 'react'

import {CCard,CTable,CCol,CTableHead,CTableRow,CTableHeaderCell,
  CTableBody,CTableDataCell,CFormInput,CCardHeader,CCardTitle,CButton, CCardBody, CForm,CRow,
  CFormSelect,CPaginationItem,CPagination
} from '@coreui/react'

import { MdDelete, MdEdit} from "react-icons/md";
import { useAdminValidation,useUniqAdminObjeact } from 'src/views/Custom-hook/adminValidation';


import { useSelector } from 'react-redux'
import {useState,useEffect} from "react"
import axios from 'axios'
import { inventoryMasterRights } from 'src/views/hr/Rights/rightsValue/masterRightsValue';

let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;
const username = user.user.username;

const AllProductListingMaster = () => {
  const url = useSelector((el)=>el.domainOfApi) 
  const rightsData = useSelector((el)=>el?.empLoyeeRights?.masterRights?.masterInverntory
    ?.items?.masterAllProductListingMaster?.rights) 

  const access = rightsData?rightsData:[]
  const isAdmin = useSelector((el)=>el.isAdmin)
                                         
    
  const  addProductListing = (access.includes(inventoryMasterRights.addProductListing)||isAdmin)
  const  deleteProductListing = (access.includes(inventoryMasterRights.deleteProductListing)||isAdmin)
  const  editProductListing = (access.includes(inventoryMasterRights.editProductListing)||isAdmin)


  const [allProductData,setAllProductData] = useState([])
  const [activeForm,setActiveForm] = useState(false)
  const [updateActive,setUpdateActive] = useState(false)

  const  uniqObjVal = useUniqAdminObjeact()
  const  pathVal = useAdminValidation('Master')

  const [topostAllProductData,setToPostAllProductData] = useState({
    username:username,
    sataus:'Selected',
    productCategory:'',
    productName:'',
    brandName:'',
    category:'',
    productPrize:'',
    ordersQty:'',
    Color:'',
  })

  const [searchFilter,setSearchFilter] = useState({
    search1:'',
    search2:'',
    search3:'',
    search4:'',
    search5:'',
    search6:'',
    search7:'',
    search8:'',
    search9:'',
    search10:'',
    search11:'',
    search12:'',
    search13:'',
    search14:'',
 })    
 const [paging, setPaging] = useState(0);

const headers =   {
    "Authorization": `Bearer ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}

  
 async  function getAllProductListingMaster() {
  try{
  const response = await  axios.get(`${url}/allProductListingMaster/${pathVal}`,{headers})
  const {data} = response

  setAllProductData(data.reverse())
  }catch(error){
    console.error(error)

  }
 
}

useEffect(()=>{
  getAllProductListingMaster()
},[])






const saveAllProductListingMaster = async (type)=>{
   let response ={}
  try{
    if(type==='Save'){
      response = await  axios.post(`${url}/allProductListingMaster/create`,{...topostAllProductData,...uniqObjVal}, {headers})
    }
    if(type==='Update'){
     response = await  axios.post(`${url}/allProductListingMaster/update/${topostAllProductData?._id}`,topostAllProductData, {headers})
    }

   if(response?.status===200){
    getAllProductListingMaster()
    alert('successfully save')
   }
    }catch(error){
      console.error(error)
  
    }
}




function toToggaleFrom(){
  setActiveForm(prev=>!prev)
  setUpdateActive(false)
  setToPostAllProductData(
    {
    username:username,
    sataus:'Selected',
    productCategory:'',
    productName:'',
    brandName:'',
    category:'',
    productPrize:'',
    Kg:'',
    Color:''
    }
  )
}

const updateProduct = async (item)=>{
  setActiveForm(true)
  setToPostAllProductData({...item})
  setUpdateActive(true)
 
}



const toDeleteData= async (id)=>{
if(!confirm('Do u want to delete this')){
return
}

const response = await  axios.delete(`${url}/allProductListingMaster/delete/${id}`, {headers})
if(response.status===200){
   getAllProductListingMaster()
}

}
function toFilterData(data){
  return data.filter((item)=>{

      return(item.productCategory.toLocaleString().toLowerCase()||'').includes(searchFilter.search2.toLowerCase().trim())&&
      (item.productName.toLowerCase()||'').includes(searchFilter.search3.toLowerCase().trim())&&
      (item.brandName.toLowerCase()||'').includes(searchFilter.search4.toLowerCase().trim())&&
      (item.category.toLowerCase()||'').includes(searchFilter.search5.toLowerCase().trim())&&
      (item.Color.toLowerCase()||'').includes(searchFilter.search6.toLowerCase().trim())   &&
      ((item.productPrize+"")?.toLowerCase()||'').includes(searchFilter.search7.toLowerCase().trim())  
  })
}

{/* <CTableDataCell>{el.productCategory}</CTableDataCell>
<CTableDataCell>{el.productName}</CTableDataCell>
<CTableDataCell>{el.brandName}</CTableDataCell>
<CTableDataCell>{el.category}</CTableDataCell>
<CTableDataCell>{el.Color}</CTableDataCell>
<CTableDataCell>{el.productPrize}</CTableDataCell> */}

return (
    <CCard>
      <CCardHeader style={{ backgroundColor: "#0B5345", color: "white" }} className='p-3'>
        <CCardTitle><h5>All Product Listing Master</h5></CCardTitle>
      </CCardHeader>



         <CCardBody>    
                <CCol className='my-3 text-end'>
                  {!activeForm&&<CButton style={{display:(addProductListing?'':'none')}} onClick={()=>toToggaleFrom()} >ADD Product</CButton>}
                </CCol>
     
               <CCol>
                <CForm style={{display:activeForm?'block':'none'}}>
                  <CCol className=' d-flex justify-content-between border px-4 py-2 rounded-top' style={{ backgroundColor: "#0B5345", color: "white" }} >
                      <h5>Product Form</h5>
                     <CButton color='danger' onClick={()=>toToggaleFrom()} >Close</CButton>
                  </CCol>
                    <div  className='border rounded-bottom p-4 border-top-0'>
                  <CRow>
                    <CCol lg={6} md={6} >
                      <CFormSelect
                      label='Product Category'
                      type='text'
                      value={topostAllProductData.productCategory}
                      onChange={(e)=>setToPostAllProductData((prev)=>({...prev,productCategory:e.target.value}))}
                      options={[
                        'Open this select menu',
                        { label: 'Clothes product', value: 'Clothes product' },
                        { label: 'Medicine', value: 'Ayurveda Medicine' },
                        { label: 'Fitness Product', value: 'Fitness Product'},
                        { label: 'Foods Product', value: 'Foods Product'},
                        { label: 'General Inventory', value: 'General Inventory'}
                      ]}
                      />
                    </CCol>

                    <CCol lg={6} md={6} >
                      <CFormInput
                      label='Product Name'
                      type='text'
                      value={topostAllProductData.productName}
                      onChange={(e)=>setToPostAllProductData((prev)=>({...prev,productName:e.target.value}))}
                      />
                    </CCol>

                    <CCol lg={6} md={6} >
                      <CFormInput
                      label='Brand Name'
                      type='text'
                      value={topostAllProductData.brandName}
                      onChange={(e)=>setToPostAllProductData((prev)=>({...prev,brandName:e.target.value}))}
                      />
                    </CCol>
                    <CCol lg={6} md={6} >
                      <CFormInput
                      label='Size/Kg'
                      type='text'
                      value={topostAllProductData.category}
                      onChange={(e)=>setToPostAllProductData((prev)=>({...prev,category:e.target.value}))}
                      />
                    </CCol>

                    
                   
                    <CCol lg={6} md={6} >
                      <CFormInput
                      label='Color'
                      type='text'
                      value={topostAllProductData.Color}
                      onChange={(e)=>setToPostAllProductData((prev)=>({...prev,Color:e.target.value}))}
                      />
                    </CCol>
                   

                    <CCol lg={6} md={6} >
                      <CFormInput
                      label='Product Price'
                      type='number'
                      value={topostAllProductData.productPrize}
                      onChange={(e)=>setToPostAllProductData((prev)=>({...prev,productPrize:e.target.value}))}
                      
                      />
                    </CCol>

                    
                    
                  </CRow>

                  <CCol className='mt-4'>
                    {updateActive?
                      <CButton onClick={()=>saveAllProductListingMaster('Update')} >Save Update</CButton>:          
                        <CButton onClick={()=>saveAllProductListingMaster('Save')} >Save</CButton>
                    }

                    </CCol>

                    </div>
                    

               </CForm>
              </CCol>    
        
      <CTable className='mt-3 ' align="middle" bordered style={{ borderColor: "#0B5345",width:'150%' }} hover responsive>
                        <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                            <CTableRow >
                                <CTableHeaderCell>Sr No</CTableHeaderCell>
                                <CTableHeaderCell>Product Category</CTableHeaderCell>
                                <CTableHeaderCell>Product Name</CTableHeaderCell>
                                <CTableHeaderCell>Brand Name</CTableHeaderCell>
                                <CTableHeaderCell>Size/Kg</CTableHeaderCell>
                                <CTableHeaderCell>Color</CTableHeaderCell>
                                <CTableHeaderCell>Product Price</CTableHeaderCell>
                               
                                <CTableHeaderCell style={{display:(editProductListing||addProductListing)?'':'none'}} >Edit/Delete</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                           
                        <CTableRow>
                            <CTableDataCell >
                                <CFormInput className='min-width-90' disabled value={searchFilter.search1}
                                    onChange={(e) => setSearchFilter((prev) => ({ ...prev, search1: e.target.value }))} /> </CTableDataCell>
                            <CTableDataCell ><CFormInput className='min-width-90' value={searchFilter.search2}
                                onChange={(e) => setSearchFilter((prev) => ({ ...prev, search2: e.target.value }))} /> </CTableDataCell>
                            <CTableDataCell ><CFormInput className='min-width-90' value={searchFilter.search3}
                                onChange={(e) => setSearchFilter((prev) => ({ ...prev, search3: e.target.value }))} /> </CTableDataCell>
                            <CTableDataCell ><CFormInput className='min-width-90' value={searchFilter.search4}
                                onChange={(e) => setSearchFilter((prev) => ({ ...prev, search4: e.target.value }))} /> </CTableDataCell>
                           
                            <CTableDataCell ><CFormInput className='min-width-90' value={searchFilter.search5}
                                onChange={(e) => setSearchFilter((prev) => ({ ...prev, search5: e.target.value }))} /> </CTableDataCell>
                            <CTableDataCell ><CFormInput className='min-width-90' value={searchFilter.search6}
                                onChange={(e) => setSearchFilter((prev) => ({ ...prev, search6: e.target.value }))} /> </CTableDataCell>
                            <CTableDataCell ><CFormInput className='min-width-90' value={searchFilter.search7}
                                onChange={(e) => setSearchFilter((prev) => ({ ...prev, search7: e.target.value }))} /> </CTableDataCell>
                            <CTableDataCell ><CFormInput disabled className='min-width-90' value={searchFilter.search8}
                                onChange={(e) => setSearchFilter((prev) => ({ ...prev, search8: e.target.value }))} /> </CTableDataCell>
                             
                        </CTableRow>


                           {toFilterData(allProductData).map((el,i)=>
                           
                      <CTableRow >
                           <CTableDataCell>{i+1}</CTableDataCell>
                           <CTableDataCell>{el.productCategory}</CTableDataCell>
                           <CTableDataCell>{el.productName}</CTableDataCell>
                           <CTableDataCell>{el.brandName}</CTableDataCell>
                           <CTableDataCell>{el.category}</CTableDataCell>
                           <CTableDataCell>{el.Color}</CTableDataCell>
                           <CTableDataCell>{el.productPrize}</CTableDataCell>
                             
                               <CTableDataCell className='text-center' style={{display:(editProductListing||addProductListing)?'':'none'}} >
                                  <MdEdit style={{ fontSize: '35px', cursor: 'pointer', markerStart: '10px',display:(editProductListing)?'':'none' }} size='20px' onClick={()=>updateProduct(el)} />
                                  <MdDelete style={{ cursor: 'pointer', markerStart: '10px', marginLeft: "5px" ,display:(deleteProductListing)?'':'none' }}  size='20px'  onClick={()=>toDeleteData(el._id)} />
                              </CTableDataCell>                                                   
                       </CTableRow>
                           
                           )}
                  
                          
                        </CTableBody>
                    </CTable>

                    <CPagination aria-label="Page navigation example" align="center" className='mt-2'>
     <CPaginationItem aria-label="Previous" disabled={paging != 0 ? false : true} onClick={() => paging > 0 && setPaging(paging - 1)}>
         <span aria-hidden="true">&laquo;</span>
     </CPaginationItem>
     <CPaginationItem active onClick={() => setPaging(0)}>{paging + 1}</CPaginationItem>
     {toFilterData(allProductData)?.length > (paging + 1) * 10 && <CPaginationItem onClick={() => setPaging(paging + 1)} >{paging + 2}</CPaginationItem>}
     {toFilterData(allProductData)?.length > (paging + 2) * 10 && <CPaginationItem onClick={() => setPaging(paging + 2)}>{paging + 3}</CPaginationItem>}
     {toFilterData(allProductData)?.length > (paging + 1) * 10 ?
         <CPaginationItem aria-label="Next" onClick={() => setPaging(paging + 1)}>
             <span aria-hidden="true">&raquo;</span>
         </CPaginationItem>
         : <CPaginationItem disabled aria-label="Next" onClick={() => setPaging(paging + 1)}>
             <span aria-hidden="true">&raquo;</span>
         </CPaginationItem>}
    </CPagination>

      </CCardBody>
        
    </CCard>
  )
}

export default AllProductListingMaster

