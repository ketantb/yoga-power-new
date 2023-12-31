import Calender from './Calender'
import { CCol, CFormInput, CRow, CButton, CCard,CContainer } from '@coreui/react'
import React, { useState,useCallback,useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useUniqAdminObjeact,useAdminValidation } from "../Custom-hook/adminValidation";
import { taskCalender } from '../hr/Rights/rightsValue/erpRightsValue'
import CustomSelectInput from '../Fitness/CustomSelectInput/CustomSelectInput'



const CreateTask = () => {
  const url = useSelector((el)=>el.domainOfApi) 
  const [userName, setUserName] = useState('')
  const [date, setDate] = useState('')
  const [Time, setTime] = useState('')
  const [selectedTask, setSelectedTask] = useState('')
  const [toggaleValue, setToggaleValue] = useState(false)
  const [filterDate, setFilterDate] = useState(false)
  const [error, setError] = useState('')
  const [allMemberData,setAllmemBerData] = useState([]) 


  const rightsData = useSelector((el)=>el.empLoyeeRights?.erpRights.erpTaskList.items.erpTaskListCalender.rights) 

     const access = rightsData?rightsData:[]
     const isAdmin = useSelector((el)=>el.isAdmin) 

  const CurrentDate = new Date()

  let user = JSON.parse(localStorage.getItem('user-info'))
  const token = user.token;

  const pathVal = useAdminValidation('Master')
  const uniqObjVal = useUniqAdminObjeact()



  const headers = {
    headers: {
        "Authorization": `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
}

  const [TaskData, setTaskData] = useState([
    {
      date: `${ CurrentDate.getDate() }`,
      month: `${ CurrentDate.getMonth() + 1 }`,
      year: `${ CurrentDate.getFullYear() }`,
      userInfo: [{
        userName: "Welcome! Back Let's Create a Task To Members",
        userTime: '0:00',
        selectedTask: ""
      }],
    }
  ])



  const  getCalenderData = useCallback(async function() {
      try{

       const response = 
       await axios.get(`${url}/callender/${pathVal}`,headers)  
       console.log(response.data)
       setTaskData(response.data)
      }catch(error) {
                console.error(error)
        }
    },[])

    useEffect(() => {
        getCalenderData()
    },[ getCalenderData]) 


const  sendUpdatedCalenderData =   useCallback(async function(obj,id) {
  try{
   const response = await axios.post(`${url}/callender/update/${id}`,obj,headers)
   if(response.statusText==="OK")
   getCalenderData()
  }catch(error) {
      console.error(error)
    }
},[])



const  postCalenderData =   useCallback(async function(obj) {
  try{
   const response = await axios.post(`${url}/callender/create`,{...obj,...uniqObjVal},headers)
   if(response.statusText==="OK")
   getCalenderData()
  }catch(error) {
      console.error(error)
    }
},[])


  const toggaleFun = () => {
    setToggaleValue((value) => !value)
  }
  const closeFun = () => {
    toggaleFun()
    setSelectedTask(' ')
    setTime('')
    setDate('')
    setUserName('')
    setError('')
  }

  function clearFilter() {
    setFilterDate('')
  }

  function sumbitTask(e) {
    if (userName !== "" && selectedTask !== '' && date !== '' && Time !== '') {

      const TaskObjeact = {
        userInfo: [{
          userName,
          userTime: Time.split(":"),
          selectedTask
        }],
        date: `${ +date.split("-")[2] }`,
        month: `${ +date.split("-")[1] }`,
        year: `${ +date.split("-")[0] }`,
      }

      if (+Time.split(":")[0] > 21 || +Time.split(":")[0] < 7) {
        setError('Please Enter Task Time between 7AM and 10PM')
        return
      }
      e.preventDefault()

      setTaskData((prev) => {

        const val = prev.some((el) => {
          const value = (el.date == TaskObjeact.date && el.month === TaskObjeact.month && el.year === TaskObjeact.year)
          if (el.date == TaskObjeact.date && el.month === TaskObjeact.month && el.year === TaskObjeact.year) {
            el.userInfo.push(...TaskObjeact.userInfo)
            sendUpdatedCalenderData(el,el._id)
          }
          return value
        })


        if (val) {
          prev.forEach((el, i) => {
            if(el.userInfo[0].userName==="Welcome! Back Let's Create a Task To Members"){
              if(!el.userInfo[1])return
            el.userInfo = prev.map((el) => el.userInfo.filter((el) => el.userName !== "Welcome! Back Let's Create a Task To Members"))[i]
            }
          })
          return [...prev]
        } else {
            postCalenderData(TaskObjeact)
          return [...prev, TaskObjeact]
        }

      })
      toggaleFun()
      setSelectedTask(' ')
      setTime('')
      setDate('')
      setUserName('')
      setError('')


    } else {
      setError('Please Fill All Details')
    }
  }

  const getClientMemData = ()=>{

    axios.get(`${url}/memberForm/${pathVal}`, {headers: {'Authorization': `Bearer ${token}`}})
    .then((res) => {setAllmemBerData(res.data)})
    .catch((error) => {console.error(error)})
 }

useEffect(()=>{
getClientMemData()
},[])

function clientObj(obj){
setUserName(obj.Fullname+" "+obj.ClientId)
}

console.log(TaskData)


  return (

    <>
     { (access.includes(taskCalender.addTask) || isAdmin) && <CCard className='p-4' >

        {toggaleValue ? <CContainer>
          <label style={{ color: 'red' }}>{error}</label>

          <CCol lg={12} sm={12}>
            <CRow>
              <CCol lg={6} md={6} sm={12}>
              <div   className="mb-2">Select Client Name</div>
                <CustomSelectInput 
                  data={allMemberData} 
                  title={userName?.trim()?userName:"Select client name"} 
                  getData={clientObj}
                  />
              </CCol>
              

              <CCol lg={6} md={6} sm={12}>
                <CFormInput
                  className="mb-1"
                  type="date"
                  format="MM-dd-yyyy"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  id="exampleFormControlInput1"
                  label="Task Date"
                />
              </CCol>
              </CRow>
              <CRow>

              <CCol lg={6} md={6} sm={12}>
                <CFormInput
                  className="mb-1"
                  type='time'
                  value={Time}
                  onChange={(e) => setTime(e.target.value)}
                  id="exampleFormControlInput1"
                  label="Task Time"
                />
              </CCol>
              <CCol lg={6} md={6} sm={12}>
                <CFormInput
                  className="mb-1"
                  type='text'
                  value={selectedTask}
                  onChange={(e) => setSelectedTask(e.target.value)}
                  label="Task Detail"
                  placeholder="Enter Task Details"
                />
              </CCol>

              <CCol xs={6}>
                <CButton type='submit' onClick={sumbitTask} className="m-2" color='primary'>Save</CButton>
                <CButton type='submit' onClick={closeFun} className="m-2" color='danger'>Close</CButton>

              </CCol>
            </CRow>
          </CCol>
        </CContainer> :
          <CButton onClick={() => toggaleFun()} className='py-1 pt-2' style={{ maxWidth: '200px', marginLeft: 'auto' }} color='primary'> <h5> Add Your Task</h5></CButton>}
      </CCard>}

      <CCol className='mt-4'>
        <h5 >Filter Calender</h5>
        <CCol style={{ display: 'flex' }}>
          <CFormInput
            className=""
            type="date"
            format="MM-dd-yyyy"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            id="exampleFormControlInput1"
            placeholder="Enter Date"
            style={{ width: '65%', fontSize: '20px' }}
          />
          <CButton className='mx-2' onClick={clearFilter}>Clear Filter</CButton>
        </CCol>
      </CCol>


      {TaskData[0] ? TaskData.filter((el) => {
        if (filterDate) {
          return el.date === `${ +filterDate.split("-")[2] }` &&
            el.month === `${ +filterDate.split("-")[1] }` &&
            el.year === `${ +filterDate.split("-")[0] }`
        }
          return el

            }
      ).map((el, i) => {
        return <Calender
          CurrentDate={el.date}
          CurrentMonth={el.month - 1}
          CurrentYear={el.year}
          userInfo={el.userInfo}
          size={el.userInfo.length}
          key={i}
        />
      }
      ) : <h4 className='m-2' style={{ color: '#f9b115' }}>No task allocated </h4>}


    
    </>
  )
}

export default CreateTask
