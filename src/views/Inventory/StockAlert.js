import {CCard,CTable,CCol,CTableHead,CTableRow,CTableHeaderCell,
    CTableBody,CTableDataCell,CFormInput,CCardHeader,CCardTitle,CButton,CCardBody,
    CPagination,CPaginationItem
 } from '@coreui/react'

 import { useSelector } from 'react-redux'
 import {useState,useEffect} from "react"
 import axios from 'axios'
import { useAdminValidation } from '../Custom-hook/adminValidation'
 let user = JSON.parse(localStorage.getItem('user-info'))
 const token = user.token;

function StockAlert(){
 const url = useSelector((el)=>el.domainOfApi) 
    const [result1, setResult1] = useState([])
    const [paging, setPaging] = useState(0);
    const pathVal =  useAdminValidation()

    const [filterObj,setFilterObj] = useState({
        search1:'',
        search2:'',
        search3:'',
        search4:'',
        search5:'',
        search6:'',
    })
    
    const headers =   {
        "Authorization": `Bearer ${token}`,
    }

    useEffect(() => {
        getStockAssigning()
    }, [])

    function getStockAssigning() {
        axios.get(`${url}/stockorderlist-status-received-stock/${pathVal}`,{headers})
            .then((res) => {
                setResult1(res.data.reverse().filter((el)=>+el.Available_Stock<=10))
                // setLength(res?.data?.length||0)
            })
            .catch((error) => {
                console.error(error)
            })
    }


   function filterDataFunction (data){
     const FilterData =    data.filter((el,i)=>{
            return (el.productDetails?.Product_Category?.toLowerCase()||'')
            ?.includes(filterObj.search1.toLowerCase()) &&
            (el.productName?.toLowerCase()||'')?.includes(filterObj.search2.toLowerCase())&&
            (el.productDetails.Brand_Name?.toLowerCase()||'')?.includes(filterObj.search3.toLowerCase())
            &&(el.Total_Stock+""||'').includes(filterObj.search4.toLowerCase())&&
            ((Math.abs(el.soldQuantity))+""||'').includes(filterObj.search5.toLowerCase())
            &&(el.Available_Stock+"").includes(filterObj.search6.toLowerCase())
          })
          console.log(FilterData.length)
          return FilterData
    }
    

return (
<CCard >
     <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                <CCardTitle>Stock Alert</CCardTitle>
            </CCardHeader>




<CCardBody>
<CTable className='mt-3 ' align="middle" bordered hover responsive>
                <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                    <CTableRow >
                    <CTableHeaderCell>Sr No</CTableHeaderCell>
                        <CTableHeaderCell>Product Category</CTableHeaderCell>
                        <CTableHeaderCell>Product Name</CTableHeaderCell>
                        <CTableHeaderCell>Brand Name</CTableHeaderCell>
                        <CTableHeaderCell>Total Stock</CTableHeaderCell>
                        <CTableHeaderCell>Use Stock</CTableHeaderCell>
                        <CTableHeaderCell>Avaible Stock </CTableHeaderCell>
                    </CTableRow>
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
                                type="text"
                                style={{ minWidth: "120px" }}
                                aria-describedby="exampleFormControlInputHelpInline"
                                value={filterObj.search1}
                                onChange={(e)=>setFilterObj((prev)=>({...prev,search1:e.target.value}))}
                            />
                        </CTableDataCell>
                        <CTableDataCell>
                            <CFormInput
                                className="mb-1"
                                style={{ minWidth: "120px" }}
                                type="text"
                                aria-describedby="exampleFormControlInputHelpInline"
                                value={filterObj.search2}
                                onChange={(e)=>setFilterObj((prev)=>({...prev,search2:e.target.value}))}
                            />
                        </CTableDataCell>
                        <CTableDataCell>
                            <CFormInput
                                className="mb-1"
                                style={{ minWidth: "100px" }}
                                type="text"
                                aria-describedby="exampleFormControlInputHelpInline"
                                value={filterObj.search3}
                                onChange={(e)=>setFilterObj((prev)=>({...prev,search3:e.target.value}))}
                            />
                        </CTableDataCell>
                        <CTableDataCell>
                            <CFormInput
                                className="mb-1"
                                type="text"
                                style={{ minWidth: "200px" }}
                                aria-describedby="exampleFormControlInputHelpInline"
                                value={filterObj.search4}
                                onChange={(e)=>setFilterObj((prev)=>({...prev,search4:e.target.value}))}
                            />
                        </CTableDataCell>
                        <CTableDataCell>
                            <CFormInput
                                className="mb-1"
                                style={{ minWidth: "120px" }}
                                type="text"
                                aria-describedby="exampleFormControlInputHelpInline"
                                value={filterObj.search5}
                                onChange={(e)=>setFilterObj((prev)=>({...prev,search5:e.target.value}))}
                            />
                        </CTableDataCell>
                        <CTableDataCell>
                            <CFormInput
                                className="mb-1"
                                style={{ minWidth: "120px" }}
                                type="number"
                                aria-describedby="exampleFormControlInputHelpInline"
                                value={filterObj.search6}
                                onChange={(e)=>setFilterObj((prev)=>({...prev,search6:e.target.value}))}
                            />
                        </CTableDataCell>
                        
                      
                    
                        
                    </CTableRow>
                    {filterDataFunction(result1).slice(paging * 10, paging * 10 + 10).map((item, i) => (
                        <CTableRow key={i} className='text-center'>
                            <CTableDataCell>{(i+1+ (paging * 10))}</CTableDataCell>
                            <CTableDataCell>{item.productDetails.Product_Category}</CTableDataCell>
                            <CTableDataCell>{item.productName}</CTableDataCell>
                            <CTableDataCell>{item.productDetails.Brand_Name}</CTableDataCell>
                            <CTableDataCell>{item.Total_Stock}</CTableDataCell>
                            <CTableDataCell>{Math.abs(item.soldQuantity)}</CTableDataCell>
                            <CTableDataCell>{item.Available_Stock}</CTableDataCell>    
                        </CTableRow>
                    ))}
                  
                </CTableBody>
            </CTable>


    <CPagination aria-label="Page navigation example" align="center" className='mt-2'>
     <CPaginationItem aria-label="Previous" disabled={paging != 0 ? false : true} onClick={() => paging > 0 && setPaging(paging - 1)}>
         <span aria-hidden="true">&laquo;</span>
     </CPaginationItem>
     <CPaginationItem active onClick={() => setPaging(0)}>{paging + 1}</CPaginationItem>
     {filterDataFunction(result1)?.length > (paging + 1) * 10 && <CPaginationItem onClick={() => setPaging(paging + 1)} >{paging + 2}</CPaginationItem>}
     {filterDataFunction(result1)?.length > (paging + 2) * 10 && <CPaginationItem onClick={() => setPaging(paging + 2)}>{paging + 3}</CPaginationItem>}
     {filterDataFunction(result1)?.length > (paging + 1) * 10 ?
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


export default StockAlert