import {
    CButton,
    CCol,
    CFormInput,
    CFormSelect,
    CImage,
    CInputGroup,
    CInputGroupText,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from "@coreui/react";

import React, { useEffect, useState,useRef } from "react";
import axios from "axios";
import { useSelector } from 'react-redux'
import { useAdminValidation,useUniqAdminObjeact } from "src/views/Custom-hook/adminValidation";
import { useReactToPrint } from 'react-to-print'
import moment from "moment";
function AddNewInvoice({id,data23,viewInvoice,setViewInvoice,getDetails,isFirstInoice,clickfun}){

 const pathVal = useAdminValidation('Master')   
 const [getInvoiceInfo,setInvoiceInfo]  = useState({
    Fullname:'',
    ContactNumber:'',
    ClientId:'',
    Email:'',
    datetime:'',
    InvoiceNo:'',
    StaffFullName:'',
    PackageName:'',
    ServiceName:'',
    startDate:'',
    endDate:''
 })

 
 var currentdate = new Date();
 var datetime = currentdate.getDay() + "/" + currentdate.getMonth()
     + "/" + currentdate.getFullYear();

 const RenewedObj  = [data23].find((list) =>{
        const time =  (new Date(data23.endDate) -new Date())
        const days = Math.ceil(time/(1000*60*60*24))
              if((days<=15 &&!isFirstInoice)){           
                 return true 
              }
              return false                                                                         
})

const compareDateFun = (date1,date2)=>{
if(new Date(date1).getTime()>new Date(date2).getTime()){
return true
}
return false
}

 const componentRef = useRef()

const handlePrint = useReactToPrint({
             content: () => componentRef.current,
             documentTitle: 'yog-power',
             onAfterPrint: () => alert('print success')
})

    const url1 = useSelector((el)=>el.domainOfApi) 
    const [GeneralTrainer, setGeneralTrainer] = useState('')
    const [subService,setService] = useState([])
    
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [tax, settax] = useState(0)
    const [total, setTotal] = useState(0)
    const [paidAmount, setpaidAmount] = useState('')
    const [discount, setDiscount] = useState()
    const [dis1, setDis1] = useState()
    const [pendingAmount, setPendingAmount] = useState('')
    const [paymode, setPayMode] = useState('')
    const [finalTotal, setFinalTotal] = useState('')
    const [ser1, setSer1] = useState('')
    const [ser2, setSer2] = useState('')
    const [ser3, setSer3] = useState('')
    const [ser5, setSer5] = useState({EmployeeId:'',EmployeeName:''})
    const [ser6, setSer6] = useState('')
    const [invoiceNum,setInvoice] = useState([])
    const [serviceDays,setServiceDays] = useState('')
    const [errorMessage,setErrorMessage] = useState('')
    const [printInvoiceActive,setPrintInoiceActive]=useState(false)
    const [staff,setStaff] = useState([])
    const [bankDetails,setBankDetails] = useState({
        bankName:'',
        ifcCode:'',
    })
    const [invoiceViewData,setViewInvoiceData]  =useState({
        TNC:'',
        InvoiceLogo:'',
        InvoiceTitle:'',
        Address:""
    })



    const uniqObj = useUniqAdminObjeact()


    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;
    const username = user.user.username;
    const centerCode = user.user.centerCode;


    var currentdate = new Date();
    var datetime = currentdate.getDay() + "/" + currentdate.getMonth()
        + "/" + currentdate.getFullYear();

    const headers = {
            'Authorization': `Bearer ${token}`,
            'My-Custom-Header': 'foobar'
    };

    const getRequireData = async ()=>{
        try{
       
        const headers = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    
        const response1 =  axios.get(`${url1}/employeeform/${pathVal}`,headers)
        const response2 =  axios.get(`${url1}/packageMaster/${pathVal}`,headers)
        const response3 =  axios.get(`${url1}/invoice/${pathVal}`,headers)
        const response4  = axios.get(`${url1}/center-invoice-setup/${pathVal}`,headers)
    
    
    
        const allData = await Promise.all([response1,response2,response3,response4])
    
        const staffData = allData[0]?.data
        const pacKgaeMasterData = allData[1]?.data
        const invoice = allData[2]?.data
        const invoiceViewData = allData[3]?.data
    
    
        setStaff(staffData)
        setService(pacKgaeMasterData)
        setInvoice(invoice.length)
        setViewInvoiceData(invoiceViewData)
    }catch(error){
        console.log(error)
    }
}
    
     useEffect(()=>{
        getRequireData()
    },[])



const validation = username && centerCode &&ser1 
&& ser6 && ser2 && ser3
&& ser5 && total && finalTotal && startDate && endDate && paymode

useEffect(()=>{
if(validation){
    setErrorMessage("") 
}
},[validation])


const RenewedClient = async () =>{
if(RenewedObj){
  
  const data1 = {"renewed": true}        
 axios.post(`${url1}/memberForm/update/${RenewedObj?._id}`,data1,{headers})       
}



}




const selectedStaff = staff.find((el)=>el._id===ser5)


useEffect(()=>{
    setSer5(uniqObj.employeeMongoId)
    },[uniqObj.employeeMongoId])

    const uniqObjeact ={
        ...uniqObj,
        centerNameC:(selectedStaff?.FullName||uniqObj.centerNameC),
        employeeMongoId:(ser5||uniqObj.employeeMongoId)
      }

const saveInvoice = () => {
if(!validation) {
    setErrorMessage("Please Fill All Detail") 
return 
}



    let data = {
        username: username,
        date: new Date(),
        centerName: centerCode,
        InvoiceNo: `INV${invoiceNum}`,
        MemberId: id, MemberName:`${data23?.Fullname}`,
        ServiceName: ser1, PackageName: ser6,
        duration: ser2, fees: ser3, startDate, endDate,
        counseller: selectedStaff?.FullName, trainer: GeneralTrainer,
        amount: total, tax, discount, totalAmount:
        finalTotal, paidAmount, pendingAmount, 
        paymode, status: 'active',typesofdiscount:dis1,
        clientId:`${data23?.ClientId}`,
        upgrade:(RenewedObj?true:false),
        EmployeeId:selectedStaff?._id, 
        ...uniqObjeact,
        contact:data23?.ContactNumber,
        ...bankDetails
    }

    
    const headers = {
        'Authorization': `Bearer ${token}`,
        'My-Custom-Header': 'foobar'
    };
    axios.post(`${url1}/invoice/create`, data, { headers })
        .then((resp) => {
            if(resp.status===200){
            setInvoiceInfo({
                Fullname:resp.data.MemberName,
                ContactNumber:resp.data.contact,
                ClientId:data23.ClientId,
                Email:data23.Email,
                datetime:datetime,
                InvoiceNo:resp.data.InvoiceNo,
                StaffFullName:resp.data.counseller,
                PackageName:resp.data.PackageName,
                ServiceName:resp.data.ServiceName,
                startDate:moment(resp.data.startDate).format('DD-MM-YYYY'),
                endDate:moment(resp.data.endDate).format('DD-MM-YYYY')
             })
             setPrintInoiceActive(true)
        }                   
            RenewedClient() 
            setViewInvoice(false)
            getDetails()
             
            let startDate1 =data23.startDate
            let endDate1 =data23.endDate

            if(!compareDateFun(startDate,data23.startDate)||isFirstInoice || !data23.startDate){
                startDate1=startDate
            }
            if(compareDateFun(endDate,data23.endDate)||isFirstInoice||!data23.endDate){
                endDate1 = endDate
            }



            let data1 = { invoiceId: resp.data._id, invoiceNum: resp.data.InvoiceNo, startDate:new Date(startDate1),duration:ser2,
                status:'active',endDate:new Date(endDate1),plan: true,renewedDate:(RenewedObj?new Date():new Date(data23?.renewedDate))
             }

             axios.all([
                axios.post(`${url1}/enquiryForm/update/${data23?.EnquiryId}`, {
                    invEmployeeId:selectedStaff?._id,
                    invEmployeeName:selectedStaff?.FullName,
                    invoiceId:resp.data._id,
                }, { headers}),
                axios.post(`${url1}/memberForm/update/${id}`, data1, { headers },)]
                ).then((res) => {
                    console.log(res) 

            }).catch((error) => {
                console.error(error)
            })

            alert('Successfully save')

        })
        .catch((error) => {
            console.error(error)
        })

}






const handleTaxTotal = (e) => {
    settax(e.target.value)
    let total = ser3 / 100 * e.target.value;
    if (total >= 0) {
        setTotal(Number(total) + Number(ser3))
    } else {
        setTotal(ser3)
    }
}

const handleDiscount = (e) => {
    let total = ser3 / 100 * tax;

    if (dis1 == 'R') {
        if (total >= 0) {
            setTotal(Number(total) + Number(ser3) - e.target.value)
        } else {
            setTotal(ser3 - e.target.value)
        }
    } else {
        let dis = ser3 / 100 * e.target.value;
        if (total >= 0) {
            setTotal(Number(total) + Number(ser3) - dis)
        } else {
            setTotal(ser3 - dis)
        }
    }
    setDiscount(e.target.value)
}




const getCurrentDateInput = () => {
    const dateObj = new Date(new Date(startDate).getTime()+(serviceDays *24*60*60*1000));
    const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    const day = ("0" + dateObj.getDate()).slice(-2);
    const year = dateObj.getFullYear();
    const shortDate = `${year}-${month}-${day}`;
    return shortDate;
  }

useEffect(()=>{
if(startDate&& serviceDays){
setEndDate(getCurrentDateInput())
}
},[startDate,ser2,serviceDays])

useEffect(()=>{
if(ser1){
subService.forEach((el)=>{
if(el.Duration=== ser2){
setServiceDays(el.Days)
}
})
}
},[ser2])




    return  <>
    <div className={(viewInvoice && !printInvoiceActive )?'d-none':''}>
     <CModal size="xl" alignment="center" scrollable visible={(viewInvoice && !printInvoiceActive )} onClose={() => {setViewInvoice(false) }}
    
    >
    <CModalHeader>
        <CModalTitle>Invoice</CModalTitle>
    </CModalHeader>
    <CModalBody>
        <CRow>
            <CCol lg={12} className='text-center'><CImage src={invoiceViewData.InvoiceLogo} width="100px" height='100px' /></CCol>
            <CCol lg={12} className='text-center mt-2'><h5>{invoiceViewData.InvoiceTitle}</h5></CCol>

        </CRow>
        <CRow className="mt-2">
            <CCol style={{ marginLeft: '5px' }}>
                <h6>Client Name: {data23?.Fullname}</h6>
                <div>Client Number: {data23?.ContactNumber}</div>
                Customer ID : {data23?.ClientId}<br />
                Email-Id : {data23?.Email}<br />
            </CCol>
            <CCol lg={4} className='text-center mt-4'><h4>Invoice</h4></CCol>
            <CCol >
                Date : {datetime}<br />
                Invoice No : {centerCode}INV{invoiceNum  +1} <br />
                <CRow>
                    <CCol lg={9}>
                        <CInputGroup>
                            <CInputGroupText
                                component="label"
                                htmlFor="inputGroupSelect01"
                            >
                                Counseller :
                            </CInputGroupText>
                            <CFormSelect
                             value={ser5}
                             onChange={(e) => setSer5(e.target.value)}                                 
                            >
                            <option>Select Assign Staff</option>
                                {staff.filter((list) => 
                                 list.selected === 'Select').map((item, index) => (
                                    <option key={index} value={item._id}>{item.FullName} {item.EmployeeID}</option>
                                ))}

                            </CFormSelect>
                     
                        </CInputGroup>
                    </CCol>
                </CRow>
            </CCol>
        </CRow>
        <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} responsive>
            <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                <CTableRow >
                    <CTableHeaderCell>Sr.No</CTableHeaderCell>
                    <CTableHeaderCell>DESCRIPTION</CTableHeaderCell>
                    <CTableHeaderCell>DURATION</CTableHeaderCell>
                    <CTableHeaderCell>SERVICE FEE</CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <CTableBody>
                <CTableRow>
                    <CTableDataCell>1</CTableDataCell>
                    <CTableDataCell>
                        <CRow>
                            <CCol>
                                
                                <CFormSelect
                                    className="mb-1"
                                    aria-label="Select Service Name"
                                    value={ser1}
                                    onChange={(e) => setSer1(e.target.value)}
                                    label='Service Name'
                                    style={{ minWidth: "210px" }}

                                >
                                    <option>Select Service</option>
                                    {subService.map((item) => (
                                (item.Status=== true && (item.Service.toLowerCase().trim()))))
                            .filter((el,i,arr)=>i===arr.indexOf(el)).map((el,i)=><option key={i}>{el}</option>)}
                                </CFormSelect>
                            </CCol>
                            <CCol>
                                <CFormSelect
                                    className="mb-1"
                                    aria-label="Select Service Name"
                                    value={ser6}
                                    label='Package Name'
                                    onChange={(e) => setSer6(e.target.value)}
                                    style={{ minWidth: "210px" }}

                                >
                                    <option>Select Package</option>
                                    {[...subService.filter((el)=>{
                return  el.Service.toLowerCase().trim()=== ser1                                
            })].map((el,i)=><option key={i}>{el.Package_Name
                }</option>)
            }   


                                </CFormSelect>
                            </CCol>
                        </CRow>

                        <CRow>
                        {
                        ser1 &&  
                        <>
                            <CCol>
                                <CInputGroup>
                                    <CInputGroupText
                                        component="label"
                                        htmlFor="inputGroupSelect01"
                                    >
                                        Start Date :
                                    </CInputGroupText>
                                    <CFormInput
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        style={{ minWidth: "100px" }}
                                        aria-describedby="exampleFormControlInputHelpInline"
                                    />
                                </CInputGroup>
                            </CCol>
                            <CCol>
                                <CInputGroup>
                                    <CInputGroupText
                                        component="label"
                                        htmlFor="inputGroupSelect01"
                                    >
                                        End Date :
                                    </CInputGroupText>
                                    <CFormInput
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        style={{ minWidth: "100px" }}
                                        aria-describedby="exampleFormControlInputHelpInline"
                                    />
                                </CInputGroup>
                            </CCol>
                        </>      
                        }
                        </CRow>

                    </CTableDataCell>
                    <CTableDataCell>

                        <CFormSelect
                            className="mb-1"
                            aria-label="Select Service Name"
                            value={ser2}
                            onChange={(e) => setSer2(e.target.value)}
                        >
                 <option>Select Duration</option>
                   {[...subService.filter((el)=>{
                  
                 return  el.Service.toLowerCase().trim()=== ser1                                  
            })].map((el,i)=><option key={i}>{el.Duration
                }</option>)
            }   
                        </CFormSelect>


                    </CTableDataCell>
                    <CTableDataCell>
                        <CFormSelect
                            className="mb-1"
                            aria-label="Select Service Name"
                            value={ser3}
                            onChange={(e) =>{
                                setSer3(e.target.value)
                                setTotal(+e.target.value)
                            }
                        }
                        >
                            <option>Select Fees</option>
                            {[...subService.filter((el)=>{
            return   el.Service.toLowerCase().trim()=== ser1                                    
            })].map((el,i)=><option key={i}>{el.Fees

                }</option>)
            }  
                        </CFormSelect>
                    </CTableDataCell>
                </CTableRow>

                <CTableRow>
                    <CTableDataCell colSpan={2}></CTableDataCell>
                    <CTableDataCell colSpan={2}>
                        <CTable bordered style={{ margin: '0', padding: '0' }} responsive>
                            <CTableBody>
                                <CTableRow>
                                    <CTableDataCell>Sub Total</CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "100px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                            value={ser3}

                                        />
                                    </CTableDataCell>
                                </CTableRow>

                                <CTableRow>
                                    <CTableDataCell>
                                        <CRow>
                                            <CCol>
                                                Discount
                                            </CCol>
                                            <CCol>
                                                <CFormSelect
                                                    className="mb-1"
                                                    aria-label="Select"
                                                    value={dis1}
                                                    onChange={(e) => { setDis1(e.target.value), setDiscount(0) }}
                                                    options={[
                                                        { label: "%", value: "P" },
                                                        { label: "₹", value: "R" },
                                                    ]}
                                                />
                                            </CCol>
                                        </CRow>
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            value={discount}
                                            onChange={(e) => handleDiscount(e)}
                                            type="number"
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableDataCell>
                                        <CRow>
                                            <CCol lg={4}>Tax </CCol>
                                            <CCol>
                                                <CFormSelect
                                                    className="mb-1"
                                                    value={tax}
                                                    onChange={(e) => handleTaxTotal(e)}
                                                    aria-label="Select"
                                                    options={[
                                                        { label: "Select", value: "0" },
                                                        { label: "GST", value: "18" },
                                                        { label: "IGST", value: "18" },
                                                        { label: "CGST", value: "18" },
                                                        { label: "TDS", value: "18" },
                                                    ]}
                                                /></CCol>
                                        </CRow>
                                    </CTableDataCell>
                                    <CTableDataCell className="mt-2">
                                        <CFormInput
                                            className="mb-1"
                                            style={{ minWidth: "100px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                            value={ser3 / 100 * tax}
                                        />
                                    </CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableDataCell>Total Amount</CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="number"
                                            value={total}
                                            style={{ minWidth: "100px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                </CTableRow>

                                <CTableRow>
                                    <CTableDataCell>Paid Amount</CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="number"
                                            value={paidAmount}
                                            onChange={(e) => { setpaidAmount(e.target.value), setPendingAmount(total - e.target.value), setFinalTotal(e.target.value) }}
                                            style={{ minWidth: "100px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableDataCell>Balance Amount</CTableDataCell>
                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            type="number"
                                            value={pendingAmount}
                                            onChange={(e) => { setPendingAmount(e.target.value), setpaidAmount(total - e.target.value), setFinalTotal(total - e.target.value) }}
                                            style={{ minWidth: "100px" }}
                                            aria-describedby="exampleFormControlInputHelpInline"
                                        />
                                    </CTableDataCell>
                                </CTableRow>

                                <CTableRow>
                                    <CTableDataCell>Mode of Payment</CTableDataCell>

                                    <CTableDataCell>
                                        <CFormSelect
                                            className="mb-1"
                                            aria-label="Select Call Status"
                                            value={paymode}
                                            onChange={(e) => { setPayMode(e.target.value) }}
                                            style={{ minWidth: "100px" }}
                                            options={[
                                                "Select",
                                                { label: "Cash", value: "Cash" },
                                                { label: "Debit Card", value: "Debit Card" },
                                                { label: "Credit Card", value: "Credit Card" },
                                                { label: "Cheque", value: "Cheque" },
                                                { label: "Draft", value: "Draft" },
                                                { label: "Paytm", value: "Paytm" },
                                                { label: "GPay", value: "GPay" },
                                                { label: "PhonePe", value: "PhonePe" },
                                                { label: "Account Pay", value: "Account Pay" },
                                            ]}
                                        />
                                    </CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <h6>Optional</h6>
                                </CTableRow>
                                <CTableRow>
                                     <CTableDataCell>Bank Name</CTableDataCell>

                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            value={bankDetails.bankName}
                                            onChange={(e) => { setBankDetails(prev=>({
                                                ...prev,bankName:e.target.value})) }}
                                            style={{ minWidth: "100px" }}                       
                                        />
                                    </CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                     <CTableDataCell>IFC Code</CTableDataCell>

                                    <CTableDataCell>
                                        <CFormInput
                                            className="mb-1"
                                            value={bankDetails.ifcCode}
                                            onChange={(e) => { setBankDetails(prev=>({
                                                ...prev,ifcCode:e.target.value})) }}
                                            style={{ minWidth: "100px" }}                       
                                        />
                                    </CTableDataCell>
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </CTableDataCell>
                </CTableRow>
                <CTableRow>
                    <CTableDataCell colSpan={3}>Total</CTableDataCell>
                    <CTableDataCell>
                        <CFormInput
                            className="mb-1"
                            type="number"
                            value={finalTotal}
                            onChange={(e) => setFinalTotal(e.target.value)}
                            style={{ minWidth: "100px" }}
                            aria-describedby="exampleFormControlInputHelpInline"
                        />
                    </CTableDataCell>
                </CTableRow>
                <CTableRow style={{ backgroundColor: "#0B5345", color: "white" }}>
                    <CTableDataCell colSpan={4}>
                        <h5>TERMS AND CONDITIONS</h5>
                    </CTableDataCell>
                </CTableRow>
                <CTableRow>
                    <CTableDataCell colSpan={4}>
                        <div>{invoiceViewData.TNC}</div>
                    </CTableDataCell>
                </CTableRow>

                <CTableRow>
                    <CTableDataCell colSpan={4}>
                        <div style={{ fontWeight: 'bold' }}>{invoiceViewData.Address}</div>
                      
                    </CTableDataCell>
                </CTableRow>
            </CTableBody>
        </CTable>

    </CModalBody>
    {errorMessage&& <CCol className="text-end px-5"><p style={{color:'red',fontSize:'15px'}}>{errorMessage}</p></CCol>}

    <CModalFooter>
        <CButton color="secondary" onClick={() => { setViewInvoice(false) }}>
            Close
        </CButton>
        <CButton color="primary" onClick={() => saveInvoice()}>Submit</CButton>
    </CModalFooter>
</CModal>
</div>
<CModal size="xl" alignment="center" scrollable visible={printInvoiceActive} onClose={() =>{
           if(clickfun){
            clickfun('btn btn-close')
           }
            setPrintInoiceActive(false)
            setViewInvoice(false)
} }>
                            <CModalHeader>
                                <CModalTitle>Invoice Preview</CModalTitle>
                            </CModalHeader>
                            <CModalBody ref={componentRef} style={{ padding: '25px' }}>
                                <CRow>
                                    <CCol lg={12} className='text-center'><CImage src={invoiceViewData.InvoiceLogo} width="100px" height='100px' /></CCol>
                                    <CCol lg={12} className='text-center mt-2'><h5>{invoiceViewData.InvoiceTitle}</h5></CCol>
                                    <CCol className='mt-2' style={{ marginLeft: '10px' }}>
                                        <h6>Client Name: {getInvoiceInfo.Fullname}</h6>
                                        <div>Client Number: {getInvoiceInfo.ContactNumber}</div>
                                        Customer ID : {getInvoiceInfo.ClientId}<br />
                                        Email-Id : {getInvoiceInfo.Email}<br />
                                    </CCol>
                                    <CCol className='mt-2' style={{ marginRight: '30px' }}>
                                        <div className='float-end'>
                                            Date : {datetime}<br />
                                            Invoice No : {getInvoiceInfo.InvoiceNo} <br />
                                            Counseller : {getInvoiceInfo.StaffFullName}
                                        </div>
                                    </CCol>
                                    <CCol lg={12} className='text-center mt-2'><h4>Invoice</h4></CCol>
                                </CRow>

                                <CTable className='mt-3' align="middle" bordered style={{ borderColor: "#0B5345" }} responsive>
                                    <CTableHead style={{ backgroundColor: "#0B5345", color: "white" }} >
                                        <CTableRow >
                                            <CTableHeaderCell>Sr.No</CTableHeaderCell>
                                            <CTableHeaderCell>DESCRIPTION</CTableHeaderCell>
                                            <CTableHeaderCell>DURATION</CTableHeaderCell>
                                            <CTableHeaderCell>SERVICE FEE</CTableHeaderCell>
                                        </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                        <CTableRow>
                                            <CTableDataCell>1</CTableDataCell>
                                            <CTableDataCell>
                                                <CRow>
                                                    <CCol lg={12}>
                                                        <div style={{ fontWeight: 'bold' }}>Service Name: {getInvoiceInfo.ServiceName}</div>
                                                    </CCol>
                                                    <CCol lg={12}>
                                                        <div style={{ fontWeight: 'bold' }}>Package Name: {getInvoiceInfo.PackageName}</div>

                                                    </CCol>
                                                </CRow>
                                                <CRow>
                                                    <CCol>
                                                        <div>Start Date: {getInvoiceInfo.startDate}</div>
                                                    </CCol>
                                                    <CCol>
                                                        <div >End Date: {getInvoiceInfo.endDate}</div>
                                                    </CCol>
                                                </CRow>

                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div style={{ fontWeight: 'bold' }}>{ser2}</div>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div style={{ fontWeight: 'bold' }}>{ser3}</div>
                                            </CTableDataCell>
                                        </CTableRow>

                                        <CTableRow>
                                            <CTableDataCell colSpan={2}></CTableDataCell>
                                            <CTableDataCell colSpan={2}>
                                                <CTable bordered style={{ margin: '0', padding: '0' }} responsive>
                                                    <CTableBody>
                                                        <CTableRow>
                                                            <CTableDataCell>Sub Total</CTableDataCell>
                                                            <CTableDataCell>
                                                                <div style={{ fontWeight: 'bold' }}>{ser3}</div>

                                                            </CTableDataCell>
                                                        </CTableRow>

                                                        <CTableRow>
                                                            <CTableDataCell>

                                                                Discount

                                                            </CTableDataCell>
                                                            <CTableDataCell>
                                                                <div style={{ fontWeight: 'bold' }}>{discount} {dis1}</div>
                                                            </CTableDataCell>
                                                        </CTableRow>
                                                        <CTableRow>
                                                            <CTableDataCell>
                                                                Tax
                                                            </CTableDataCell>
                                                            <CTableDataCell className="mt-2">
                                                                <div style={{ fontWeight: 'bold' }}>{ser3 / 100 * tax}</div>
                                                            </CTableDataCell>
                                                        </CTableRow>
                                                        <CTableRow>
                                                            <CTableDataCell>Total Amount</CTableDataCell>
                                                            <CTableDataCell>
                                                                <div style={{ fontWeight: 'bold' }}>{total}</div>

                                                            </CTableDataCell>
                                                        </CTableRow>

                                                        <CTableRow>
                                                            <CTableDataCell>Paid Amount</CTableDataCell>
                                                            <CTableDataCell>
                                                                <div style={{ fontWeight: 'bold' }}>{paidAmount}</div>

                                                            </CTableDataCell>
                                                        </CTableRow>
                                                        <CTableRow>
                                                            <CTableDataCell>Balance Amount</CTableDataCell>
                                                            <CTableDataCell>
                                                                <div style={{ fontWeight: 'bold' }}>{pendingAmount}</div>
                                                            </CTableDataCell>
                                                        </CTableRow>

                                                        <CTableRow>
                                                            <CTableDataCell>Mode of Payment</CTableDataCell>

                                                            <CTableDataCell>
                                                                <div style={{ fontWeight: 'bold' }}>{paymode}</div>

                                                            </CTableDataCell>
                                                        </CTableRow>
                                                        <CTableRow>
                                                        </CTableRow>
                                                    </CTableBody>
                                                </CTable>
                                            </CTableDataCell>
                                        </CTableRow>
                                        <CTableRow>
                                            <CTableDataCell colSpan={3}>Total</CTableDataCell>
                                            <CTableDataCell>
                                                <div style={{ fontWeight: 'bold' }}>{finalTotal}</div>
                                            </CTableDataCell>
                                        </CTableRow>
                                        <CTableRow style={{ backgroundColor: "#0B5345", color: "white" }}>
                                            <CTableDataCell colSpan={4}>
                                                <h5>TERMS AND CONDITIONS</h5>
                                            </CTableDataCell>
                                        </CTableRow>
                                        <CTableRow>
                                            <CTableDataCell colSpan={4}>
                                                <div>{invoiceViewData.TNC}</div>
                                            </CTableDataCell>
                                        </CTableRow>

                                        <CTableRow>
                                            <CTableDataCell colSpan={4}>
                                                <div style={{ fontWeight: 'bold' }}>{invoiceViewData.Address}</div>
                                             
                                            </CTableDataCell>
                                        </CTableRow>
                                    </CTableBody>
                                </CTable>
                            </CModalBody>
                            <CModalFooter>
                                <CButton color="primary" onClick={handlePrint}>Print</CButton>
                            </CModalFooter>
 </CModal>

</>
}

export default AddNewInvoice