import React,{useEffect ,useState} from 'react'

import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CForm,
    CFormInput,
    CFormSelect,
    CPagination,
    CPaginationItem,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CToast,
    CToastBody,
    CToastClose,
} from "@coreui/react";
import axios from "axios";
import { BsWhatsapp } from "react-icons/bs";
import { MdCall, MdDelete, MdEdit, MdMail } from "react-icons/md";
import { useSelector,useDispatch} from 'react-redux'

import useAddProduct from './customHook/useAddProduct';
import useIncrementNoOfItem from './customHook/useIncrementNoOfItme';
import useInputItemVal from './customHook/useInputItemVal';
import { useAdminValidation } from 'src/views/Custom-hook/adminValidation';


const FoodProduct = () => {


    const url = useSelector((el)=>el.domainOfApi)  
    const [result1, setResult1] = useState([])
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

    const [noofProduct,setNoOfProduct] = useState([])
    const [activeToIncrement,setActiveToIncrement] = useState([])

    const pathVal = useAdminValidation('Master')

    const addProduct  = useAddProduct(setNoOfProduct,setActiveToIncrement)
    const incrementNoOfItem =  useIncrementNoOfItem(setNoOfProduct,setActiveToIncrement)
    const inputItemVal = useInputItemVal(setNoOfProduct)
    const dispatch = useDispatch()

    let user = JSON.parse(localStorage.getItem('user-info'))
    console.log(user);
    const token = user.token;
    const username = user.user.username;

    useEffect(() => {
        getStockListing()
    }, [])

    const  clearFunction  = (type)=>{
        if(type==='clear'){
            setNoOfProduct([])
        }
        getStockListing()
        setActiveToIncrement([])
    }

    
    useEffect(()=>{
        dispatch({type:'add foodProduct', payload:{item:noofProduct,fun:clearFunction}})
    },[noofProduct.reduce((crr,el)=>crr+el?.item,0),noofProduct?.length])







    function getStockListing() {
        axios.get(`${url}/stockorderlist-status-received-stock/${pathVal}/Foods Product`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                setResult1(res.data.reverse())
                console.log(res.data);
            })
            .catch((error) => {
                console.error(error)
            })
    }

    function toFilterData(data){
        return data.filter((el)=>{
            return(
            (el?.productCode?.toLowerCase()||'').includes(searchFilter.search2.toLowerCase().trim())&&
            ((el.productName+"").toLowerCase()||'').includes(searchFilter.search3.toLowerCase().trim())&&
            (el?.productDetails?.Brand_Name.toLowerCase()||'').includes(searchFilter.search4.toLowerCase().trim())&&
            (el?.productDetails.Category.toLowerCase()||'').includes(searchFilter.search5.toLowerCase().trim())&&
            ((el?.productDetails?.Product_Price+"")?.toLowerCase()||'').includes(searchFilter.search6.toLowerCase().trim())   &&
            ((Math.abs(el.soldQuantity)+"")?.toLowerCase()||'').includes(searchFilter.search7.toLowerCase().trim()) &&
            ((el.Available_Stock+"")?.toLowerCase()||'').includes(searchFilter.search8.toLowerCase().trim()) &&
            +el.Available_Stock>=0
        )})
      }

  return (
    <CRow className='d-flex mb-2'>
 
            <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                <CTableRow >
                        <CTableHeaderCell>Sr.No</CTableHeaderCell>
                        <CTableHeaderCell>Product Code</CTableHeaderCell>
                        <CTableHeaderCell>Product Name</CTableHeaderCell>
                        <CTableHeaderCell>Brand Name</CTableHeaderCell>
                        <CTableHeaderCell>Size</CTableHeaderCell>
                        <CTableHeaderCell>Price</CTableHeaderCell>
                        <CTableHeaderCell>Sold</CTableHeaderCell>
                        <CTableHeaderCell>AVL Stock</CTableHeaderCell>
                        <CTableHeaderCell>Add Product</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>

                <CTableRow>
                           <CTableDataCell >
                            <CFormInput className='min-width-90' disabled value={searchFilter.search1} 
                            onChange={(e)=>setSearchFilter((prev)=>({...prev,search1:e.target.value}))} /> </CTableDataCell>
                            <CTableDataCell ><CFormInput  className='min-width-90' value={searchFilter.search2} 
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
                            <CTableDataCell ><CFormInput className='min-width-90' value={searchFilter.search8} 
                            onChange={(e)=>setSearchFilter((prev)=>({...prev,search8:e.target.value}))} /> </CTableDataCell>
                            <CTableDataCell ><CFormInput  className='min-width-90' disabled value={searchFilter.search9} 
                            onChange={(e)=>setSearchFilter((prev)=>({...prev,search9:e.target.value}))} /> </CTableDataCell>                    
                   </CTableRow>  
                 


{toFilterData(result1).slice(paging * 10, paging * 10 + 10).map((item, i) => {
    
            const itemVal =   noofProduct.find((el)=>el.id===item._id)?.item

        return     <CTableRow key={i} className='text-center'>
                            <CTableDataCell>{i+ 1 + (paging * 10)}</CTableDataCell>
                            <CTableDataCell>{item.productCode}</CTableDataCell>
                            <CTableDataCell>{item.productName}</CTableDataCell>
                            <CTableDataCell>{item.productDetails.Brand_Name}</CTableDataCell>
                            <CTableDataCell>{item.productDetails.Category}</CTableDataCell>
                            <CTableDataCell>{item.productDetails.Product_Price}</CTableDataCell>
                            <CTableDataCell>{Math.abs(item.soldQuantity)}</CTableDataCell>
                            <CTableDataCell>{item.Available_Stock}</CTableDataCell>
                <CTableDataCell> {
                            activeToIncrement.includes(item._id)?<div className='p-0'  style={{fontSize:'25px'}}>
                            <div className='d-flex border rounded-2 bg-white p-0 justify-content-between  align-items-center' >
                            <div style={{width:'50px',cursor:'pointer'}} onClick={(e)=>incrementNoOfItem(item,'decrement')} className='bg-light m-1 rounded-2'>-</div>
                            <input style={{fontSize:'20px',width:'100px'}} value={itemVal} onChange={(e)=>inputItemVal(e.target.value,item)} />
                            <div style={{width:'50px',cursor:'pointer'}}  onClick={()=>incrementNoOfItem(item,'increment')} className='bg-light m-1 rounded-2'>+</div>
                            </div>    
                           </div> :
                           <CButton onClick={()=>addProduct(item)} >Add </CButton>
                        
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
                        {toFilterData(result1).length > (paging + 1) * 10 && <CPaginationItem onClick={() => setPaging(paging + 1)} >{paging + 2}</CPaginationItem>}
                        {toFilterData(result1).length > (paging + 2) * 10 && <CPaginationItem onClick={() => setPaging(paging + 2)}>{paging + 3}</CPaginationItem>}
                        {toFilterData(result1).length > (paging + 1) * 10 ?
                            <CPaginationItem aria-label="Next" onClick={() => setPaging(paging + 1)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                            : <CPaginationItem disabled aria-label="Next" onClick={() => setPaging(paging + 1)}>
                                <span aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                        }
            </CPagination>  

        </CRow>
  )
}

export default FoodProduct
