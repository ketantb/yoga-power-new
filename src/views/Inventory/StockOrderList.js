import {CCard,CTable,CCol,CTableHead,CTableRow,CTableHeaderCell,
    CTableBody,CTableDataCell,CFormInput,CCardHeader,CCardTitle,CButton,
    CCardBody,
    CNav,
    CNavItem,
    CNavLink,
    CTabPane,
    CTabContent,
    CFormSelect,
    CFormCheck,
    CPagination,
    CPaginationItem,
    CInputGroup,
    CInputGroupText
 } from '@coreui/react'

 import { useSelector } from 'react-redux'
 import {useState,useEffect} from "react"
 import axios from 'axios'
//  import XLSX from "xlsx";

 import * as XLSX from 'xlsx';
 import { BsWhatsapp } from "react-icons/bs";
 import { MdCall, MdDelete, MdEdit, MdMail } from "react-icons/md";

let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;


import useAddProduct from '../finance/ClientInvoice/customHook/useAddProduct';
import useIncrementNoOfItem from '../finance/ClientInvoice/customHook/useIncrementNoOfItme';
import useInputItemVal from '../finance/ClientInvoice/customHook/useInputItemVal';
import StockOrderListRecived from './StockOrderList/StockOrderListRecived';
import { useAdminValidation,useUniqAdminObjeact } from '../Custom-hook/adminValidation';
import { inventoryRight } from '../hr/Rights/rightsValue/erpRightsValue';
import StockListing from './CustomTableCompo/StockListing'
import moment from 'moment/moment'

function StockOrderList (){

    const url = useSelector((el)=>el.domainOfApi) 
    const [allProductData,setAllProductData] = useState([])
    const [noofProduct,setNoOfProduct] = useState([])
    const [activeToIncrement,setActiveToIncrement] = useState([])
    const [pagination,setPagination] = useState({
        pagination1:0,
        pagination2:0,
        pagination3:0,
    })
    
    const [dateFilterObj,setDteFilterObj] = useState({
        startDate:moment(new Date(new Date().getFullYear(),new Date().getMonth(),1)).format('YYYY-MM-DD'),
        endDate:moment(new Date()).format('YYYY-MM-DD')
      })
    const rightsData = useSelector((el)=>el.empLoyeeRights?.erpRights.erpInventory.items.erpStockList.rights) 

    const access = rightsData?rightsData:[]
    const isAdmin = useSelector((el)=>el.isAdmin) 


    const addProduct  = useAddProduct(setNoOfProduct,setActiveToIncrement)
    const incrementNoOfItem =  useIncrementNoOfItem(setNoOfProduct,setActiveToIncrement)
    const inputItemVal = useInputItemVal(setNoOfProduct)
    const [activeKey, setActiveKey] = useState(
        ((access.includes(inventoryRight.stockListView) || isAdmin) &&1)||
        ((access.includes(inventoryRight.orderList) || isAdmin) &&2)||
        ((access.includes(inventoryRight.orderListreceived) || isAdmin) &&3)
        )


    const [orderList,setStockOrderList] = useState([])
    const [staff, setStaff] = useState([])
    const [selectedStaff,setSelectedStaff] = useState('')
    const [error,setError] = useState(false)
    const [excelData,setExcelData] = useState([])
    const [activeCExcelCheck,setExcelCheck] = useState([])
    const [error2,setError2] = useState(false)
    const [receviedProduct,setReceviedProductData]  = useState([])

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

    const pathVal = useAdminValidation()
    const pathValMaster = useAdminValidation('Master')

    const uniqObj =  useUniqAdminObjeact()




    const headers =   {
        "Authorization": `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
    

    useEffect(() => {
        getStockAssigning()
        getStockOrderList()
        getStaff()
        getStockAssigningR()
    }, [])

     function getStockAssigning() {
     axios.get(`${url}/allProductListingMaster/${pathValMaster}`,{headers})

            .then((res) => {
                setAllProductData(res.data.reverse())
            })
            .catch((error) => {
                console.error(error)
            })
    }

    function getStockOrderList(){
        axios.get(`${url}/stockorderlist/all-order/${pathVal}`,{headers})
        .then((res) => {
            setStockOrderList(res.data.reverse())
        })
        .catch((error) => {
            console.error(error)
        })
}

function getStaff() {
    axios.get(`${url}/employeeform/${pathValMaster}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then((res) => {
            setStaff(res.data)
        })
        .catch((error) => {
            console.error(error)
        })
}


function toAddProduct(item){
if(!selectedStaff?.trim()){
setError(true)
return 
}
addProduct(item)
}
    
useEffect(()=>{
if(!!selectedStaff?.trim()){
        setError(false)
}
if(!!activeCExcelCheck.length){
    setError2(false)
}
},[selectedStaff,activeCExcelCheck.length])


useEffect(()=>{
setSelectedStaff('')
},[activeKey])



useEffect(()=>{
    setSelectedStaff(uniqObj.employeeMongoId)
},[uniqObj.employeeMongoId,activeKey])

const uniqObjVal = {
    ...uniqObj,
    employeeMongoId:(staff.find((el)=>el._id===selectedStaff)?._id||uniqObj.employeeMongoId),
    empNameC:(staff.find((el)=>el._id===selectedStaff)?.FullName||uniqObj.employeeMongoId) 
}

function ConfirmProduct(id){

    const fullName = staff.find((el)=>el._id===selectedStaff)?.FullName

if(!fullName?.trim()){
        setError(true)
        return 
}

const selctedProduct =  noofProduct.filter((el)=>el._id===id).map((el)=>{

    return {
        Order_Date: new Date(),
        Product_Category:el.productCategory,
        Product_Name: el.productName ,
        Brand_Name: el.brandName ,
        Category: el.category        ,
        Product_Price: el.productPrize,
        Orders_Quantity:el.item,
        Total_Price:+el.productPrize * +el.item,
        EmployeeName:fullName,
        EmployeeId:selectedStaff,
        Color:el.Color,
        Status:'Not Recevied yet',
        ProductId:el?._id
    }

})

axios.post(`${url}/stockorderlist/create`, {...selctedProduct[0],...uniqObjVal},{headers})
.then((res) => {
    console.log(res)
    getStockOrderList()
    alert('successfully Save')
    setNoOfProduct(prev=>prev.filter((el)=>el._id!==id))
    setActiveToIncrement(prev=>prev.filter((el)=>el!==id))
})
.catch((error) => {
    console.error(error)
})}



function downloadAsExcel(){
    if(!activeCExcelCheck.length){
      setError2(true)
      return 
    }
 const data =  excelData.map((el)=>{
    return {
    ["Order date"]:el.Order_Date,
    ["Product category"]:el.Product_Category,
    ["Product name"]: el.Product_Name ,
    ["Brand name"]: el.Brand_Name ,
    ["Category"]: el.Category ,
    ["Product price"]: el.Product_Price,
    ["Orders quantity"]:el.Orders_Quantity,
    ["Total price"]:+el.Total_Price,
    ["Employee name"]:el.EmployeeName,
     Color:el.Color
}
   })   

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    XLSX.writeFile(workbook, "YogPowerStockDataSheet.xlsx");
}


function toSetExcelData(item){
setExcelCheck(prev=>{
if(prev.some((el)=>el===item._id)){
return prev.filter((el)=>el!==item._id)
}else{
return [...prev,item._id]
}
})

setExcelData(prev=>{
if(prev.some((el)=>el._id===item._id)){
return prev.filter((el)=>el._id!==item._id)
}else{
return [...prev,item]
}
})

}


function selectAllOption(){
setExcelCheck(orderList.map((el)=>el._id))
setExcelData(orderList.filter((el)=>el?.Status!=='Recevied'))
}

function ordeReceived(item){

    const fullName = staff.find((el)=>el._id===selectedStaff)?.FullName

if(!fullName?.trim()){
        setError(true)
        return 
}

const UpdateObj = {
    StatOfStock:'InStock',
    Status:'Recevied',
    receivedDate:new Date(),
    receivedBy:fullName,
    receiverId:selectedStaff,
    ...uniqObj,
}


axios.post(`${url}/stockorderlist/update/${item._id}`, {...UpdateObj,...uniqObjVal},{headers})
.then((res) => {
    getStockAssigningR()
    getStockOrderList()
    alert('Successfully Recevied')
})
.catch((error) => {
    console.error(error)
})
}

function getStockAssigningR() {
    axios.get(`${url}/stockorderlist/${dateFilterObj.startDate}/${dateFilterObj.endDate}/recevied/${pathVal}`,{headers})
   
           .then((res) => {
             setReceviedProductData(res.data.reverse())
           })
           .catch((error) => {
               console.error(error)
           })
   }

   function toFilterData(data){
    return data.filter((el)=>{
        return (el?.productCategory?.toLowerCase()).includes(searchFilter.search2.toLowerCase().trim())&&
        (el.productName?.toLowerCase()||'').includes(searchFilter.search3.toLowerCase().trim())&&
        (el.brandName?.trim()?.toLowerCase()||'').includes(searchFilter.search4.toLowerCase().trim())&&
        (el.category?.toLowerCase()||'').includes(searchFilter.search5.toLowerCase().trim())&&
        (el.Color?.toLowerCase()||'').includes(searchFilter.search6.toLowerCase().trim())&&
        (el.productPrize?.toLowerCase()||'').includes(searchFilter.search7.toLowerCase().trim())
  })
  }


    return (
        <CCard >
             <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                        <CCardTitle  >Stock  List</CCardTitle>
            </CCardHeader>

           <CCardBody>

    <CNav variant="tabs" role="tablist" style={{cursor:'pointer'}}>
      {(access.includes(inventoryRight.stockListView)||isAdmin) &&<CNavItem>
        <CNavLink
          active={activeKey === 1}
          onClick={() => setActiveKey(1)}
        >
            Stock List
        </CNavLink>
      </CNavItem>}
      {(access.includes(inventoryRight.orderList)||isAdmin) &&<CNavItem>
        <CNavLink
          active={activeKey === 2}
          onClick={() => setActiveKey(2)}
        >
          Order List 
        </CNavLink>
      </CNavItem>}
      {(access.includes(inventoryRight.orderListreceived)||isAdmin) &&<CNavItem>
        <CNavLink
          active={activeKey === 3}
          onClick={() => setActiveKey(3)}
        >
          Order received  
        </CNavLink>
      </CNavItem>}

    </CNav>

    <CTabContent>

    {((access.includes(inventoryRight.stockListAdd) || isAdmin)&& 
      (access.includes(inventoryRight.receivedStatus) || isAdmin))
    &&<CCol className='p-4 d-flex justify-content-end'  >
           <div style={{display:activeKey ===3?'none':'block' }}>
            <h6>{activeKey===1?'Order by':' Received by'}</h6>
           <CFormSelect 
            style={{maxWidth:'350px',minWidth:'150px'}}
            value={selectedStaff}
            onChange={(e)=>setSelectedStaff(e.target.value)}
            >
               <option value=''>Select Assign Staff</option>
                                {staff.filter((list) => 
                                 list.selected === 'Select').map((item, index) => (
                                    <option key={index} value={item._id}>{item.FullName} {item.EmployeeID}</option>
                                ))}
            </CFormSelect>
            <div>
                {error&&<p style={{color:'red'}}>Please select staff name first</p>}
            </div>
           </div>
    </CCol>}

    <CCol lg={5} md={7} style={{display:activeKey !==3?'none':'block' }}>
                        <div className='d-flex justify-content-between mb-2'>
                            <CInputGroup >

                                <CInputGroupText
                                    component="label"
                                    htmlFor="inputGroupSelect01"
                                >
                                    Form
                                </CInputGroupText>
                                <CFormInput
                                    type="date"
                                    value={dateFilterObj.startDate}
                                    onChange={(e)=>setDteFilterObj((prev)=>({...prev,startDate:e.target.value}))}

                                  
                                /><CInputGroupText
                                    component="label"
                                    htmlFor="inputGroupSelect01"

                                >
                                    To
                                </CInputGroupText>
                                <CFormInput
                                    type="date"
                                    value={dateFilterObj.endDate}
                                    onChange={(e)=>setDteFilterObj((prev)=>({...prev,endDate:e.target.value}))}
                                                                   />
                                <CButton type="button" color="primary" onClick={()=>getStockAssigningR()} >
                                    Go
                                </CButton>
                            </CInputGroup>
                        </div>
                        </CCol>

      <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey ===((access.includes(inventoryRight.stockListView) || isAdmin) &&1)}>   
         

        <CTable className='mt-3 ' align="middle" bordered style={{ borderColor: "#0B5345"}} hover responsive>
                       
                       <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                           <CTableRow >
                               <CTableHeaderCell>Sr No</CTableHeaderCell>
                               <CTableHeaderCell>Product Category</CTableHeaderCell>
                               <CTableHeaderCell>Product Name</CTableHeaderCell>
                               <CTableHeaderCell>Brand Name</CTableHeaderCell>
                               <CTableHeaderCell>Size/Kg</CTableHeaderCell>
                               <CTableHeaderCell>Color</CTableHeaderCell>
                               <CTableHeaderCell>Product Prize</CTableHeaderCell>
                               <CTableHeaderCell style={{display:(access.includes(inventoryRight.stockListAdd) || isAdmin)?'':'none'}}>
                                Add quantity<br/>To order</CTableHeaderCell>                      
                           </CTableRow>
                       </CTableHead>

                       <CTableBody>
                     <CTableRow>
 
 
                     <CTableDataCell >
                            <CFormInput className='min-width-90' disabled value={searchFilter.search1} 
                            onChange={(e)=>setSearchFilter((prev)=>({...prev,search1:e.target.value}))} /> </CTableDataCell>
                            <CTableDataCell ><CFormInput className='min-width-90' value={searchFilter.search2} 
                            onChange={(e)=>setSearchFilter((prev)=>({...prev,search2:e.target.value}))} /> </CTableDataCell>
                            <CTableDataCell ><CFormInput className='min-width-90' value={searchFilter.search3} 
                            onChange={(e)=>setSearchFilter((prev)=>({...prev,search3:e.target.value}))} /> </CTableDataCell>
                            <CTableDataCell ><CFormInput className='min-width-90' value={searchFilter.search4} 
                            onChange={(e)=>setSearchFilter((prev)=>({...prev,search4:e.target.value}))} /> </CTableDataCell>
                            <CTableDataCell ><CFormInput className='min-width-90' value={searchFilter.search5} 
                            onChange={(e)=>setSearchFilter((prev)=>({...prev,search5:e.target.value}))} /> </CTableDataCell>
                            <CTableDataCell ><CFormInput className='min-width-90'value={searchFilter.search6} 
                            onChange={(e)=>setSearchFilter((prev)=>({...prev,search6:e.target.value}))} /> </CTableDataCell>
                            <CTableDataCell ><CFormInput className='min-width-90' value={searchFilter.search7} 
                            onChange={(e)=>setSearchFilter((prev)=>({...prev,search7:e.target.value}))} /> </CTableDataCell>
                            <CTableDataCell ><CFormInput disabled className='min-width-90' value={searchFilter.search8} 
                            onChange={(e)=>setSearchFilter((prev)=>({...prev,search8:e.target.value}))} /> </CTableDataCell>

                     </CTableRow>
                                  
                            
                       {toFilterData(allProductData).slice(paging * 10, paging * 10 + 10).map((item,i)=>{        
                                                 const itemVal =   noofProduct.find((el)=>el.id===item._id)?.item
                  
                         return <CTableRow >
                               <CTableDataCell>{i+ 1 + (paging * 10) }</CTableDataCell>
                               <CTableDataCell>{item.productCategory}</CTableDataCell>
                               <CTableDataCell>{item.productName}</CTableDataCell>
                               <CTableDataCell>{item.brandName}</CTableDataCell>
                               <CTableDataCell>{item.category}</CTableDataCell>
                               <CTableDataCell>{item.Color}</CTableDataCell>
                               <CTableDataCell>{item.productPrize}</CTableDataCell>

                               <CTableDataCell style={{width:'200px',display:
                               (access.includes(inventoryRight.stockListAdd) || isAdmin)?'':'none'
                            }} className='text-center'> {
                           activeToIncrement.includes(item._id)?

                           <>
                           
                           <div className='p-0'  style={{fontSize:'25px'}}>
                           <div className='d-flex border rounded-2 bg-white p-0 justify-content-between  align-items-center' >
                           <div cl style={{width:'50px',cursor:'pointer'}} onClick={(e)=>incrementNoOfItem(item,'decrement')} className='bg-light m-1 rounded-2 text-center'>-</div>
                           <input style={{fontSize:'20px',width:'100px'}} value={itemVal} onChange={(e)=>inputItemVal(e.target.value,item)} />
                           <div style={{width:'50px',cursor:'pointer'}}  onClick={()=>incrementNoOfItem(item,'increment')} className='bg-light m-1 rounded-2 text-center'>+</div>
                           </div>

                          </div>
                          <CCol className='d-flex p-2'>
                          <CButton className='w-100' onClick={()=>ConfirmProduct(item?._id)}>Confirm</CButton>
                          </CCol>
                          </>
                          :
                          ((access.includes(inventoryRight.stockListAdd) || isAdmin)&&
                          <CButton onClick={()=>toAddProduct({...item,Available_Stock:100})} >Add </CButton>)
                       
                       }</CTableDataCell>
                                                                                    
                           </CTableRow>                   
                       })}
                      
                 
                         
                       </CTableBody>
         </CTable>
         <CPagination aria-label="Page navigation example" align="center" className='mt-2'>
                        <CPaginationItem aria-label="Previous" disabled={paging != 0 ? false : true} onClick={() => paging > 0 && setPaging(paging - 1)}>
                            <span aria-hidden="true">&laquo;</span>
                        </CPaginationItem>
                        <CPaginationItem active onClick={() => setPaging(0)}>{paging + 1}</CPaginationItem>
                        {toFilterData(allProductData).length > (paging + 1) * 10 && <CPaginationItem onClick={() => setPaging(paging + 1)} >{paging + 2}</CPaginationItem>}
                        {toFilterData(allProductData).length > (paging + 2) * 10 && <CPaginationItem onClick={() => setPaging(paging + 2)}>{paging + 3}</CPaginationItem>}
                        {toFilterData(allProductData).length > (paging + 1) * 10 ?
                            <CPaginationItem aria-label="Next" onClick={() => setPaging(paging + 1)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                            : <CPaginationItem disabled aria-label="Next" onClick={() => setPaging(paging + 1)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                        }
                    </CPagination>  
      </CTabPane>

      <CTabPane role="tabpanel" aria-labelledby="contact-tab" visible={activeKey === 2}>
        <StockListing
         access={access}
         isAdmin={isAdmin}
         toSetExcelData={toSetExcelData}
         orderList={orderList}
         ordeReceived={ordeReceived}   
         error2={error2}
         activeCExcelCheck={activeCExcelCheck}   
         selectAllOption={selectAllOption}
        />


      


      </CTabPane>

     <StockOrderListRecived visible={activeKey === 3} receviedProduct={receviedProduct} />


    </CTabContent>
  

           </CCardBody>
        </CCard>
        
        )



}



export default StockOrderList





 

















