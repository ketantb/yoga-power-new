import {
    CCard, CTable, CCol, CTableHead, CTableRow, CTableHeaderCell,
    CTableBody, CTableDataCell, CFormInput, CCardHeader, CCardTitle, CButton,
    CCardBody,
    CNav,
    CNavItem,
    CNavLink,
    CTabPane,
    CTabContent,
    CFormSelect,
    CFormCheck,
    CPagination,
    CPaginationItem
} from '@coreui/react'
import { useSelector } from 'react-redux'
import { useState, useEffect } from "react"
import axios from 'axios'
import { BsWhatsapp } from "react-icons/bs";
import { MdCall, MdDelete, MdEdit, MdMail } from "react-icons/md";


import useAddProduct from '../finance/ClientInvoice/customHook/useAddProduct';
import useIncrementNoOfItem from '../finance/ClientInvoice/customHook/useIncrementNoOfItme';
import useInputItemVal from '../finance/ClientInvoice/customHook/useInputItemVal';
import { useAdminValidation, useUniqAdminObjeact } from '../Custom-hook/adminValidation';
import { inventoryRight } from '../hr/Rights/rightsValue/erpRightsValue';
import InventoryList from './CustomTableCompo/InventoryList'
import Assigned from './CustomTableCompo/Assigned'

let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;

function StockAssigning() {
    
    const url = useSelector((el) => el.domainOfApi)
    const pathValMaster = useAdminValidation('Master')
    const pathVal = useAdminValidation('')
    const uniAdminObjVal = useUniqAdminObjeact()
    const [paging, setPaging] = useState(0);


    const rightsData = useSelector((el)=>el.empLoyeeRights?.erpRights.erpInventory.items.erpOfficeInventory.rights) 

    const access = rightsData?rightsData:[]
    const isAdmin = useSelector((el)=>el.isAdmin) 


    const [allProductData, setAllProductData] = useState([])
    const [noofProduct, setNoOfProduct] = useState([])
    const [activeToIncrement, setActiveToIncrement] = useState([])


    const addProduct = useAddProduct(setNoOfProduct, setActiveToIncrement)
    const incrementNoOfItem = useIncrementNoOfItem(setNoOfProduct, setActiveToIncrement)
    const inputItemVal = useInputItemVal(setNoOfProduct)
    const [activeKey, setActiveKey] = useState(
        ((access.includes(inventoryRight.inventoryList) || isAdmin) &&1)||
        ((access.includes(inventoryRight.assignedList) || isAdmin) &&2)
    )
    const [staff, setStaff] = useState([])
    const [selectedStaff, setSelectedStaff] = useState('')
    const [selectedStaff2, setSelectedStaff2] = useState('')
    const [error, setError] = useState(false)
    const [error2, setError2] = useState(false)

    const [stockAssigningData, setStockAssigning] = useState([])




    const headers = {
        "Authorization": `Bearer ${ token }`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }

    useEffect(() => {
        getStockProduct()
        getStaff()
        getStockAssigning()
    }, [])

    useEffect(()=>{
      setSelectedStaff(uniAdminObjVal.employeeMongoId)
    },[uniAdminObjVal.employeeMongoId])

    function getStockProduct() {
        axios.get(`${ url }/inventoryListingMaster/${ pathValMaster }`, { headers })

            .then((res) => {
                console.log(res.data)
                setAllProductData(res.data.reverse())
            })
            .catch((error) => {
                console.error(error)
            })
    }



    function getStaff() {
        axios.get(`${ url }/employeeform/${ pathValMaster }`, {
            headers: {
                'Authorization': `Bearer ${ token }`
            }
        })
            .then((res) => {
                setStaff(res.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }


    function toAddProduct(item) {
        if (!selectedStaff.trim()) {
            setError(true)
            return
        }

        if (!selectedStaff2.trim()) {
            setError2(true)
            return
        }

        if (!selectedStaff.trim() || !selectedStaff2.trim()) {
            return
        }

        addProduct(item)
    }

    useEffect(() => {
        if (!!selectedStaff.trim()) {
            setError(false)
        }

        if (!!selectedStaff2.trim()) {
            setError2(false)
        }

    }, [selectedStaff, selectedStaff2])

    function ConfirmProduct(item) {

        const id = item._id

        if (!selectedStaff.trim()) {
            setError(true)
            return
        }
        if (!selectedStaff2.trim()) {
            setError2(true)
            return
        }

        const selctedProduct = noofProduct.filter((el) => el._id === id).map((el) => {
            return {
                Assigned_Date: new Date(),
                Product_Category: el.productCategory,
                Product_Name: el.productName,
                Brand_Name: el.brandName,
                Size: el.category,
                Product_Price: el.productPrize,
                No_Of_Products: el.item,
                Product_Prize: el.productPrize,
                Total_Price: +el.productPrize * +el.item,
                Assigned_By: staff.find((el) => el._id === selectedStaff).FullName,
                Assigned_To: staff.find((el) => el._id === selectedStaff2).FullName,
                Assigned_By_id: selectedStaff,
                Assigned_To_id: selectedStaff2,
                Color: el.Color,
                ProductId: el?._id,
            }

        })
        axios.all([
            axios.post(`${ url }/stockAssigning/create`, { ...selctedProduct[0], ...uniAdminObjVal }, { headers }),
            axios.post(`${ url }/inventoryListingMaster/update/${ id }`, {
                Available_Stock:
                    (item.Available_Stock - selctedProduct[0].No_Of_Products)
            }, { headers })
        ])
            .then((res) => {
                getStockAssigning()
                getStockProduct()
                alert('Successfully save')
                setNoOfProduct(prev => prev.filter((el) => el._id !== id))
                setActiveToIncrement(prev => prev.filter((el) => el !== id))
            })
            .catch((error) => {
                console.error(error)
            })

    }



    function getStockAssigning() {
        axios.get(`${ url }/stockAssigning/${ pathVal }`, { headers })
            .then((res) => {
                setStockAssigning(res.data.reverse())
            })
            .catch((error) => {
                console.error(error)
            })
    }


    return <CCard >
        <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
            <CCardTitle  >Office Inventory</CCardTitle>
        </CCardHeader>
        
        <CCardBody>

            <CNav variant="tabs" role="tablist" style={{ cursor: 'pointer' }}>
                {(access.includes(inventoryRight.inventoryList) || isAdmin)&&<CNavItem>
                    <CNavLink
                        active={activeKey === 1}
                        onClick={() => setActiveKey(1)}
                    >
                        Inventory List
                    </CNavLink>
                </CNavItem>}
                {(access.includes(inventoryRight.assignedList) || isAdmin)&&<CNavItem>
                    <CNavLink
                        active={activeKey === 2}
                        onClick={() => setActiveKey(2)}
                    >
                        Assigned List
                    </CNavLink>
                </CNavItem>}
            </CNav>
            <CTabContent>

                {(access.includes(inventoryRight.inventoryAdd) || isAdmin)&&<CCol className='p-4 d-flex justify-content-end'  >
                    <div style={{ display: activeKey === 2 ? 'none' : 'block' }}>
                        <h6>Assigned By</h6>
                        <CFormSelect
                            style={{ maxWidth: '350px', minWidth: '150px' }}
                            value={selectedStaff}
                            onChange={(e) => setSelectedStaff(e.target.value)}
                        >
                            <option value=''>Select Assign Staff</option>
                            {staff.filter((list) =>
                                list.selected === 'Select').map((item, index) => (
                                    <option key={index} value={item._id}>{item.FullName}</option>
                                ))}
                        </CFormSelect>
                        <div>
                            {error && <p style={{ color: 'red' }}>Please select staff name first</p>}
                        </div>
                    </div>

                    <div style={{ display: activeKey === 2 ? 'none' : 'block' }} className='mx-2'>
                        <h6>Assigned To</h6>
                        <CFormSelect
                            style={{ maxWidth: '350px', minWidth: '150px' }}
                            value={selectedStaff2}
                            onChange={(e) => setSelectedStaff2(e.target.value)}
                        >
                            <option value=''>Select Assign Staff</option>
                            {staff.filter((list) => 
                                list.selected === 'Select').map((item, index) => (
                                    <option key={index} value={item._id}>{item.FullName}</option>
                                ))}
                        </CFormSelect>
                        <div>
                            {error2 && <p style={{ color: 'red' }}>Please select staff name first</p>}
                        </div>
                    </div>

                </CCol>}



                <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey === 1}>



                   <InventoryList
                    noofProduct={noofProduct}
                    access={access}
                    ConfirmProduct={ConfirmProduct}
                    activeToIncrement={activeToIncrement}
                    incrementNoOfItem={incrementNoOfItem}
                    toAddProduct={toAddProduct}
                    allProductData={allProductData}
                    isAdmin={isAdmin}
                   />
                </CTabPane>





                <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={activeKey === 2}>
                    {/* <CTable className='mt-3 ' align="middle" bordered style={{ borderColor: "#0B5345" }} hover responsive>
                        <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                            <CTableRow >
                                <CTableHeaderCell>Sr.No</CTableHeaderCell>
                                <CTableHeaderCell>Date</CTableHeaderCell>
                                <CTableHeaderCell>Category</CTableHeaderCell>
                                <CTableHeaderCell>Product Name</CTableHeaderCell>
                                <CTableHeaderCell>Brand Name</CTableHeaderCell>
                                <CTableHeaderCell>No of Products</CTableHeaderCell>
                                <CTableHeaderCell>Size</CTableHeaderCell>
                                <CTableHeaderCell>Color</CTableHeaderCell>

                                <CTableHeaderCell>Assigned By</CTableHeaderCell>
                                <CTableHeaderCell>Assigned to </CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>

                            {stockAssigningData.map((item, index) =>
                                <CTableRow >
                                    <CTableDataCell>{index + 1}</CTableDataCell>
                                    <CTableDataCell>{new Date(item.Assigned_Date).toLocaleString()}</CTableDataCell>
                                    <CTableDataCell>{item.Product_Category}</CTableDataCell>
                                    <CTableDataCell>{item.Product_Name}</CTableDataCell>
                                    <CTableDataCell>{item.Brand_Name}</CTableDataCell>
                                    <CTableDataCell>{item.No_Of_Products}</CTableDataCell>
                                    <CTableDataCell>{item.Size}</CTableDataCell>
                                    <CTableDataCell>{item.Color}</CTableDataCell>
                                    <CTableDataCell>{item.Assigned_By}</CTableDataCell>
                                    <CTableDataCell>{item.Assigned_To}</CTableDataCell>
                                </CTableRow>
                            )}
                        </CTableBody>
                    </CTable> */}
                    <Assigned
                    stockAssigningData={stockAssigningData}
                    />
                </CTabPane>
            </CTabContent>
         
        </CCardBody>
    </CCard>


}


export default StockAssigning