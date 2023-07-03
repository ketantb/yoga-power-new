import React,{useEffect ,useState} from 'react'

import {
    CButton,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,

} from "@coreui/react";
import axios from "axios";

import { useSelector,useDispatch} from 'react-redux'

import useAddProduct from './customHook/useAddProduct';
import useIncrementNoOfItem from './customHook/useIncrementNoOfItme';
import useInputItemVal from './customHook/useInputItemVal';
import { useAdminValidation } from 'src/views/Custom-hook/adminValidation';

const ClothProduct = () => {

    const url = useSelector((el)=>el.domainOfApi)  
    const pathVal = useAdminValidation()


    const [result1, setResult1] = useState([])
    const [noofProduct,setNoOfProduct] = useState([])
    const [activeToIncrement,setActiveToIncrement] = useState([])

    const addProduct  = useAddProduct(setNoOfProduct,setActiveToIncrement)
    const incrementNoOfItem =  useIncrementNoOfItem(setNoOfProduct,setActiveToIncrement)
    const inputItemVal = useInputItemVal(setNoOfProduct)
    const dispatch = useDispatch()

    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;

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
        dispatch({type:'add Stock',payload:{item:noofProduct,fun:clearFunction}})
    },[noofProduct.reduce((crr,el)=>crr+el?.item,0),noofProduct?.length])


    function getStockListing() {
        axios.get(`${url}/stockorderlist-status-received-stock/${pathVal}/Clothes product`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                setResult1(res.data.reverse().filter((el)=>el.Available_Stock>0))
                console.log(res.data);
            })
            .catch((error) => {
                console.error(error)
            })
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
                        <CTableHeaderCell>Color</CTableHeaderCell>
                        <CTableHeaderCell>Price</CTableHeaderCell>
                        <CTableHeaderCell>Sold</CTableHeaderCell>
                        <CTableHeaderCell>AVL Stock</CTableHeaderCell>
                        <CTableHeaderCell style={{width:'250px'}}>Add Product</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                 
                 
                    {result1.filter((el)=>+el.Available_Stock).map((item, index) => {

                      const itemVal =   noofProduct.find((el)=>el.id===item._id)?.item

                     return    <CTableRow key={index} className='text-center'>
                            <CTableDataCell>{index+1}</CTableDataCell>
                            <CTableDataCell>{item.productCode}</CTableDataCell>
                            <CTableDataCell>{item.productName}</CTableDataCell>
                            <CTableDataCell>{item.productDetails.Brand_Name}</CTableDataCell>
                            <CTableDataCell>{item.productDetails.Category}</CTableDataCell>
                            <CTableDataCell>{item.productDetails.Color}</CTableDataCell>
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

        </CRow>
  )
}

export default ClothProduct
