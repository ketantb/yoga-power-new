import {
    CForm, CCard, CCardHeader, CCardTitle, CFormInput, CCol, CFormSelect,
    CRow, CTable, CTableHead, CTableHeaderCell, CTableRow, CTableBody,
    CTableDataCell, CButton
} from '@coreui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAdminValidation,useUniqAdminObjeact } from 'src/views/Custom-hook/adminValidation'

function EmployeeTargetSetupForm({ closeForm, getEmployeeTargetSheetData ,data }) {

    const url1 = useSelector((el) => el.domainOfApi)
    const pathVal = useAdminValidation()
    const uniqObjVal  = useUniqAdminObjeact()

    let user = JSON.parse(localStorage.getItem('user-info'))
    const username = user.user.username;
    const token = user.token;

      

    const headers = {
        headers: {
            "Authorization": `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }

    const [TargetValue, setTargetValue] = useState('')
    const [employeeData, setEmployeeData] = useState([])
    const [selectedEmployee, setSselectedEmployee] = useState('')

    const [year, setYear] = useState('')

    const [monthInput1, setMonthIput1] = useState('0')
    const [monthInput2, setMonthIput2] = useState('0')
    const [monthInput3, setMonthIput3] = useState('0')
    const [monthInput4, setMonthIput4] = useState('0')
    const [monthInput5, setMonthIput5] = useState('0')
    const [monthInput6, setMonthIput6] = useState('0')
    const [monthInput7, setMonthIput7] = useState('0')
    const [monthInput8, setMonthIput8] = useState('0')
    const [monthInput9, setMonthIput9] = useState('0')
    const [monthInput10, setMonthIput10] = useState('0')
    const [monthInput11, setMonthIput11] = useState('0')
    const [monthInput12, setMonthIput12] = useState('0')


    useEffect(() => {
        getEmployee()
    }, [])

    async function getEmployee() {
        try {
            const { data } = await axios.get(`${url1}/employeeform/${pathVal}`,headers)
            console.log(data)
            setEmployeeData(data)
        } catch (error) {
            console.log(error)
        }
    }

    console.log(employeeData)

    let arrMonthData = []

    const EmployeeData = {
        "Sr_No": "1",
        "Employee": selectedEmployee.split('---')[0],
        "Type_Of_Target": TargetValue,
        "Year": year,
        "Id": selectedEmployee.split('---')[1],
        "TargetValue": TargetValue,
    }

    const MonthData = {
        "Jan": monthInput1,
        "Feb": monthInput2,
        "March": monthInput3,
        "April": monthInput4,
        "May": monthInput5,
        "June": monthInput6,
        "July": monthInput7,
        "August": monthInput8,
        "Sept": monthInput9,
        "Oct": monthInput10,
        "Nov": monthInput11,
        "Dec": monthInput12,
    }


    const PostData = { ...EmployeeData, ...MonthData, ...uniqObjVal}








const UserData =  [...data].find((el,i)=> el.Id ===selectedEmployee.split('---')[1]
 && el.Type_Of_Target===TargetValue)
console.log( UserData,"ejkndjnefjefej")
useEffect(()=>{

if(!UserData){
        setMonthIput1('0')
        setMonthIput2('0')
        setMonthIput3('0')
        setMonthIput4('0')
        setMonthIput5('0')
        setMonthIput6('0')
        setMonthIput7('0')
        setMonthIput8('0')
        setMonthIput9('0')
        setMonthIput10('0')
        setMonthIput11('0')
        setMonthIput12('0')
        setYear('0')  
    return
}
  setMonthIput1(UserData.Jan)
  setMonthIput2(UserData.Feb)
  setMonthIput3(UserData.March)
  setMonthIput4(UserData.April)
  setMonthIput5(UserData.May)
  setMonthIput6(UserData.June)
  setMonthIput7(UserData.July)
  setMonthIput8(UserData.August)
  setMonthIput9(UserData.Sept)
  setMonthIput10(UserData.Oct)
  setMonthIput11(UserData.Nov)
  setMonthIput12(UserData.Dec)
  setTargetValue(UserData.TargetValue)
  setYear(UserData.Year)

},[selectedEmployee?.split('---')[1],TargetValue])






async function saveTargetSheetData() {
    const SaveParentApiData = async  () =>{
        if(UserData?.TargetValue===TargetValue){
            await axios.post(`${ url1 }/employeeTargetSheet/update/${UserData._id}`, JSON.stringify(PostData),headers
            ).then((res)=>{
                ChildApiRequest() 
                getEmployeeTargetSheetData()
            })   
            }else{
            await axios.post(`${url1}/employeeTargetSheet/create`, JSON.stringify(PostData), headers
            ).then((res)=>{
                ChildApiRequest() 
                getEmployeeTargetSheetData()
            })
            }

    }


        for (const Key in MonthData) {
            arrMonthData.push({ "monthName": Key, "Target": (MonthData[Key] || "  ") })
        }

SaveParentApiData()

async function  PutRequesToNestedApi (url,data1,id){
    console.log(url,data1,id)
   await axios.get(`${url}/all`,headers).then(({data})=>{
    const Data2 = [...data].find((el)=>el.Sr_No===id)
    if(Data2){
        async function Put (){
         await axios.post(`${url}/update/${Data2._id}`,JSON.stringify({...data,...data1}),headers).then((res)=>{
            alert('SuccessFully Save')
            arrMonthData = []
        })          
        }
        Put()
      }

   })   
}
        // Sales Target Api scope 

async function  PostRequesToNestedApi (url,data){
    await axios.post(url,JSON.stringify(data), headers).then(({data})=>{
        alert('SuccessFully Save')
                arrMonthData = []
    })    
}



function ChildApiRequest(){

        if (TargetValue === "Sales Target") {
            const data = {
                "Year":year,
                "Sr_No": selectedEmployee.split('---')[1],
                "Employee": selectedEmployee.split('---')[0],
                "Target": "0",
                "New_Sales": "0",
                "Renewals": "0",
                "Upgrade_Sales": "0",
                "Cross_Sales": "0",
                "Balance_Collection": "0",
                "Total_Collected": "0",
                "Achived": "0",
                "annualTarget": [
                    ...arrMonthData
                ],
                ...uniqObjVal
            }

            if(UserData?.TargetValue===TargetValue){
                PutRequesToNestedApi(`${ url1 }/salesTarget`,data,UserData.Id)
            }else{
                PostRequesToNestedApi(`${ url1 }/salesTarget/create`,data)
                console.log("hello")
            }
        }


        if (TargetValue === 'Client Target') {

            const data = {
                "Year":year,
                "Sr_No": selectedEmployee.split('---')[1],
                "Employee": selectedEmployee.split('---')[0],
                "Target": "0",
                "New_Sales": "0",
                "Reference": "0",
                "Renewals": "0",
                "Upgrade_Sales": "0",
                "Cross_Selling": "0",
                "Total_Collected": "0",
                "Achived": " ",
                "annualTarget": [
                    ...arrMonthData
                ],
                ...uniqObjVal
            }

          
            if(UserData?.TargetValue===TargetValue){
                PutRequesToNestedApi(`${url1}/clientTarget`,data,UserData.Id)
            }else{
                PostRequesToNestedApi(`${url1}/clientTarget/create`,data)
            }

        }


        if (TargetValue === 'Calls Target') {
            const data = {
                "Year":year,
                "Sr_No": selectedEmployee.split('---')[1],
                "Employee": selectedEmployee.split('---')[0],
                "Call_Target": "0",
                "Follow_Ups": "0",
                "Members_Call": "0",
                "Total_Completed": "0",
                "Achived": "0",
                "__v": 0,
                "annualTarget": [
                    ...arrMonthData
                ],
                ...uniqObjVal
            }

            if(UserData?.TargetValue===TargetValue){
                PutRequesToNestedApi(`${url1}/callsTarget`,data,UserData.Id)
            }else{
                PostRequesToNestedApi(`${url1}/callsTarget/create`,data)
            }

        }

        if (TargetValue === 'Lead Target') {

            const data = {
                "Year":year,
                "Sr_No": selectedEmployee.split('---')[1],
                "Employee": selectedEmployee.split('---')[0],
                "Lead_Assign": "0",
                "Spot_Conversions": "0",
                "Total_Leads_Conversion": "0",
                "Total_Amount": "0",
                "Achived": "0",
                "annualTarget": [
                    ...arrMonthData
                ],
                ...uniqObjVal

            }

            if(UserData?.TargetValue===TargetValue){
                PutRequesToNestedApi(`${url1}/leadsTarget`,data,UserData.Id)
            }else{
                PostRequesToNestedApi(`${url1}/leadsTarget/create`,data)
            }

        }



        if (TargetValue === 'Renewals') {

            const data = {
                "Year":year,
                "Sr_No": selectedEmployee.split('---')[1],
                "Employee": selectedEmployee.split('---')[0],
                "Target": "0",
                "No_Of_Renewals": "0",
                "Conversion": "0",
                "Total_Amount": "0",
                "Achived": "0",
                "annualTarget": [
                    ...arrMonthData
                ],
                ...uniqObjVal
            }

            if(UserData?.TargetValue===TargetValue){
                PutRequesToNestedApi(`${url1}/renewalsTarget`,data,UserData.Id)
            }else{
                PostRequesToNestedApi(`${url1}/renewalsTarget/create`,data)
            }

        }



        if (TargetValue === 'Referral Leads') {
            const data = {
                "Year":year,
                "Sr_No": selectedEmployee.split('---')[1],
                "Employee": selectedEmployee.split('---')[0],
                "No_Of_Referrals_Target": "0",
                "No_Of_Referrals_Leads": "0",
                "Convert_To_Member": "0",
                "Total_Amount": "0",
                "Achived": "0",
                "annualTarget": [
                    ...arrMonthData
                ],
                ...uniqObjVal
            }         

            if(UserData?.TargetValue===TargetValue){
                PutRequesToNestedApi(`${url1}/referralsLeadstarget`,data,UserData.Id)
            }else{
                PostRequesToNestedApi(`${url1}/referralsleadstarget/create`,data)
            }

        }


        if (TargetValue === 'Media Target') {
            const data = {
                "Year":year,
                "Sr_No": selectedEmployee.split('---')[1],
                "Employee": selectedEmployee.split('---')[0],
                "Google_Reviews": 10,
                "Facebook": "0",
                "Instagram": "0",
                "Linkedin": "0",
                "Justdial": "0",
                "Achived": "0",
                "__v": 0,
                "annualTarget": [
                    ...arrMonthData
                ],
                ...uniqObjVal
            }
          

            if(UserData?.TargetValue===TargetValue){
                PutRequesToNestedApi(`${url1}/mediaTarget`,data,UserData.Id)
            }else{
                PostRequesToNestedApi(`${url1}/mediaTarget/create`,data)
            }

        }
}


        // Ton Upadte and Clear After SuccessFully Save 
        getEmployeeTargetSheetData()
    }


    return <CCard>

        <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
            <CCardTitle><h4>Empyolee Target Setup</h4></CCardTitle>
        </CCardHeader>
        <CCol className='d-flex justify-content-end mt-4 pe-4'>

            <CButton onClick={() => closeForm()} color='danger' >Close</CButton>
        </CCol >


        <CForm className='p-4' style={{ boxSizing: 'border-box' }}>
            <CCol lg={6}>
                <CFormSelect label='Employee'
                    value={selectedEmployee}
                    onChange={(e) => setSselectedEmployee(e.target.value)}
                >
                    <option >Select Your Employee </option>

                    {employeeData.filter((list) =>  list.selected === 'Select').map((item, index) => (
                         (
                            <option key={index} value={`${ item.FullName }---${ item._id }`} >{item.FullName}</option>
                        )
                    ))}

                </CFormSelect>

            </CCol>

            <CCol lg={6}>
                <CFormSelect
                    label='Types Of Target'
                    value={TargetValue}
                    onChange={(e) => setTargetValue(e.target.value)}
                >
                    <option >Select Your Target </option>
                    <option >Sales Target</option>
                    <option >Client Target</option>
                    <option >Calls Target</option>
                    <option >Lead Target</option>
                    <option >Renewals</option>
                    <option >Referral Leads</option>
                    <option >Media Target</option>
                </CFormSelect>
            </CCol>

            <CRow>
                <CCol lg={6}>
                    <CFormSelect
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        label='Year'>
                        <option>Select Year</option>
                        <option>{new Date().getFullYear() - 4}</option>
                        <option >{new Date().getFullYear() - 3}</option>
                        <option >{new Date().getFullYear() - 2}</option>
                        <option >{new Date().getFullYear() - 1}</option>
                        <option> {new Date().getFullYear()}</option>

                    </CFormSelect>
                </CCol>

            </CRow>

            <div style={{ overflowY: 'scroll' }} className='mb-3'>
                <CTable className='mt-3' style={{ width: '200%' }}>
                    <CTableHead >
                        <CTableHeaderCell className=' '>Jan</CTableHeaderCell>
                        <CTableHeaderCell className=''>Feb</CTableHeaderCell>
                        <CTableHeaderCell className=''>March</CTableHeaderCell>
                        <CTableHeaderCell className=''>April</CTableHeaderCell>
                        <CTableHeaderCell className=''>May</CTableHeaderCell>
                        <CTableHeaderCell className=''>Jun</CTableHeaderCell>
                        <CTableHeaderCell className=''>July</CTableHeaderCell>
                        <CTableHeaderCell className=''>August</CTableHeaderCell>
                        <CTableHeaderCell className=''>Sep</CTableHeaderCell>
                        <CTableHeaderCell className=''>Oct</CTableHeaderCell>
                        <CTableHeaderCell className=''>Nov</CTableHeaderCell>
                        <CTableHeaderCell className=''>Dec</CTableHeaderCell>
                    </CTableHead>
                    <CTableBody>
                        <CTableRow>
                            <CTableDataCell>
                                <CFormInput type='number' value={monthInput1} onChange={(e) => setMonthIput1(e.target.value)}></CFormInput>
                            </CTableDataCell>
                            <CTableDataCell>
                                <CFormInput type='number' value={monthInput2} onChange={(e) => setMonthIput2(e.target.value)}></CFormInput>
                            </CTableDataCell>
                            <CTableDataCell>
                                <CFormInput type='number' value={monthInput3} onChange={(e) => setMonthIput3(e.target.value)}></CFormInput>
                            </CTableDataCell>
                            <CTableDataCell>
                                <CFormInput type='number' value={monthInput4} onChange={(e) => setMonthIput4(e.target.value)}></CFormInput>
                            </CTableDataCell>
                            <CTableDataCell>
                                <CFormInput type='number' value={monthInput5} onChange={(e) => setMonthIput5(e.target.value)}></CFormInput>
                            </CTableDataCell>
                            <CTableDataCell>
                                <CFormInput type='number' value={monthInput6} onChange={(e) => setMonthIput6(e.target.value)}></CFormInput>
                            </CTableDataCell>
                            <CTableDataCell>
                                <CFormInput type='number' value={monthInput7} onChange={(e) => setMonthIput7(e.target.value)}></CFormInput>
                            </CTableDataCell>
                            <CTableDataCell>
                                <CFormInput type='number' value={monthInput8} onChange={(e) => setMonthIput8(e.target.value)}></CFormInput>
                            </CTableDataCell>
                            <CTableDataCell>
                                <CFormInput type='number' value={monthInput9} onChange={(e) => setMonthIput9(e.target.value)}></CFormInput>
                            </CTableDataCell>
                            <CTableDataCell>
                                <CFormInput type='number' value={monthInput10} onChange={(e) => setMonthIput10(e.target.value)}></CFormInput>
                            </CTableDataCell>
                            <CTableDataCell>
                                <CFormInput type='number' value={monthInput11} onChange={(e) => setMonthIput11(e.target.value)}></CFormInput>
                            </CTableDataCell>
                            <CTableDataCell>
                                <CFormInput type='number' value={monthInput12} onChange={(e) => setMonthIput12(e.target.value)}></CFormInput>
                            </CTableDataCell>
                        </CTableRow>
                    </CTableBody>
                </CTable>
            </div>


            <CCol >
                <CButton onClick={() => saveTargetSheetData()} >Save</CButton>
            </CCol>
        </CForm>
    </CCard>

}

export default EmployeeTargetSetupForm