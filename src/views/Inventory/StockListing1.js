import { cilInfo } from "@coreui/icons";
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCardTitle,
    CCol,
    CForm,
    CFormInput,
    CFormSelect,
    CFormTextarea,
    CInputGroup,
    CNav,
    CNavItem,
    CNavLink,
    CRow,
    CTabContent,
    CTabPane,
} from "@coreui/react";
import React, { useState } from "react";
import { FaBeer } from "react-icons/fa";
import DataTable from "src/components/DataTable";

import ClothesProduct from "./ClothesProduct";
import AyurvedaMedicine from "./AyurvedaMedicine";
import FitnessProduct from "./FitnessProduct";
import FoodsProduct from "./FoodsProduct";
import GeneralStock from "./GeneralStock"
import { useSelector } from "react-redux";
import { inventoryRight } from "../hr/Rights/rightsValue/erpRightsValue";
const StockListing1 = () => {
    const [action, setAction] = useState(false)

    const rightsData = useSelector((el)=>el.empLoyeeRights?.erpRights.erpInventory.items.erpProductList.rights) 
    const access = rightsData?rightsData:[]
    const isAdmin = useSelector((el)=>el.isAdmin) 



    const [activeKey, setActiveKey] = useState(
        ((access.includes(inventoryRight.clothesProduct) || isAdmin) &&1)||
        ((access.includes(inventoryRight.ayurvedaMedicine) || isAdmin) &&2)||
        ((access.includes(inventoryRight.fitnessProduct) || isAdmin) &&3)||
        ((access.includes(inventoryRight.foodsProduct) || isAdmin) &&4)||
        ((access.includes(inventoryRight.generalInventory) || isAdmin) &&5)
    )



    return (
        <>

            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-3 border-success">
                        <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                            <CNav variant="pills" role="tablist">
                                {(access.includes(inventoryRight.clothesProduct) || isAdmin)&&<CNavItem>
                                    <CNavLink
                                        style={{ color: "white" }}
                                        href="javascript:void(0);"
                                        active={activeKey === 1}
                                        onClick={() => setActiveKey(1)}
                                    >
                                        Clothes product
                                    </CNavLink>
                                </CNavItem>}
                                {(access.includes(inventoryRight.ayurvedaMedicine) || isAdmin)&&<CNavItem>
                                    <CNavLink
                                        style={{ color: "white" }}
                                        href="javascript:void(0);"
                                        active={activeKey === 2}
                                        onClick={() => setActiveKey(2)}
                                    >

                                        Ayurveda Medicine
                                    </CNavLink>
                                </CNavItem>}
                                {(access.includes(inventoryRight.fitnessProduct) || isAdmin)&&<CNavItem>
                                    <CNavLink
                                        style={{ color: "white" }}
                                        href="javascript:void(0);"
                                        active={activeKey === 3}
                                        onClick={() => setActiveKey(3)}
                                    >
                                        Fitness Product
                                    </CNavLink>
                                </CNavItem>}
                                {(access.includes(inventoryRight.foodsProduct) || isAdmin)&& <CNavItem>
                                    <CNavLink
                                        style={{ color: "white" }}
                                        href="javascript:void(0);"
                                        active={activeKey === 4}
                                        onClick={() => setActiveKey(4)}
                                    >
                                        Foods Product
                                    </CNavLink>
                                </CNavItem>}
                                {(access.includes(inventoryRight.generalInventory) || isAdmin)&&<CNavItem>
                                    <CNavLink
                                        style={{ color: "white" }}
                                        href="javascript:void(0);"
                                        active={activeKey === 5}
                                        onClick={() => setActiveKey(5)}
                                    >
                                        General Inventory

                                    </CNavLink>
                                </CNavItem>}
                            </CNav>
                        </CCardHeader>
                        <CCardBody>
                            <CTabContent>
                                <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
                                    <ClothesProduct />
                                </CTabPane>
                                <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 2}>
                                    <AyurvedaMedicine />
                                </CTabPane>
                                <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 3}>
                                    <FitnessProduct />
                                </CTabPane>
                                <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 4}>
                                    <FoodsProduct />
                                </CTabPane>
                                <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 5}>
                                    <GeneralStock />
                                </CTabPane>
                            </CTabContent>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    );
};

export default StockListing1;