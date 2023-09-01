import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormInput,
    CFormSelect,
    CInputGroup,
    CInputGroupText,
    CNav,
    CNavItem,
    CNavLink,
    CRow,
    CTabContent,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CTabPane,
} from '@coreui/react'


// form 
import FitnessMeasurmentForm from './form/FitnessMeasurmentForm'
import AllDietClientForm from './form/AllDietClientForm';
import DietPlanTempletForm from './form/DietPlanTempletForm';
import WorkoutTempletForm from './form/WorkoutTempletForm';
import ExerciseLbiiry from './form/ExerciseLibiry';
import DailyWorkoutScheduling from './form/DailyWorkoutScheduling';

// Tables
const MeasurementTable = React.lazy(() => import('./Tablels/MeasurmentTable'))
const ClientDietTable = React.lazy(() => import('./Tablels/ClientDietTable'))
const DietPlanTable = React.lazy(() => import('./Tablels/DietPlanTable'))
const WorkOutTempletTable = React.lazy(() => import('./Tablels/WorkOutTempletTable'))
const ExerciseLibiryTable = React.lazy(() => import('./Tablels/ExerciseLibiry'))
const DailyWorkoutSchedulingTable =  React.lazy(() => import('./Tablels/DailyWorkoutScheduling'))

import { useSelector } from 'react-redux';
import axios from 'axios';
import { useAdminValidation } from '../Custom-hook/adminValidation';
import { fitnessRigths } from '../hr/Rights/rightsValue/crmRightsValue';



const Fitness = () => {
    const url1 = useSelector((el) => el.domainOfApi)
    const pathVal = useAdminValidation()
    const pathValMaster = useAdminValidation('Master')

    const rightsData = useSelector((el)=>el.empLoyeeRights?.crmRights
    ?.crmFitness?.superRight) 

    const isAdmin = useSelector((el)=>el.isAdmin)

    console.log(rightsData)

    const measurment =  (rightsData?.access?.includes(fitnessRigths.measurment)||isAdmin)
    const allClientDite =  (rightsData?.access?.includes(fitnessRigths.allClientDite)||isAdmin)
    const dietPlanTemplet =  (rightsData?.access?.includes(fitnessRigths.dietPlanTemplet)||isAdmin)
    const workOutTemplet =  (rightsData?.access?.includes(fitnessRigths.workOutTemplet)||isAdmin)
    const exerciseLibiry =  (rightsData?.access?.includes(fitnessRigths.exerciseLibiry)||isAdmin)
    const dailyWorkoutScheduling =  (rightsData?.access?.includes(fitnessRigths.dailyWorkoutScheduling)||isAdmin)


    const number =  ( (isAdmin&&1)||(measurment&&1)||
    (allClientDite&&2)||
    (dietPlanTemplet&&3)||
    (workOutTemplet&&4)||
    (exerciseLibiry&&5)||
    (dailyWorkoutScheduling&&6)
    )






    const [active, setActiveButton] = useState(number)
    const [allMemberData,setAllmemBerData] = useState([]) 
    const [employeeData,setEmployeeData] = useState([])
    // Forms 
    const [showForm, setForm] = useState(false)
    // Barriar Token 
    let user = JSON.parse(localStorage.getItem('user-info'))
    const token = user.token;

    const {id} = useParams()
    const {i} = useParams()


    const closeFormFun = () => {
        setForm(() => false)
    }
    

    console.log(active,number)

 const getClientMemData = ()=>{

    axios.get(`${url1}/memberForm/${pathVal}`, {headers: {'Authorization': `Bearer ${token}`}})
    .then((res) => {setAllmemBerData(res.data)})
    .catch((error) => {console.error(error)})
 }

 const getCounslerData = async ()=>{
    axios.get(`${url1}/employeeform/${pathValMaster}`, {headers: {'Authorization': `Bearer ${token}`}})
    .then((res) => {setEmployeeData(res.data.filter((list)=>list.selected === 'Select' ))})
    .catch((error) => {console.error(error)})
}


useEffect(()=>{
getClientMemData()
getCounslerData()
},[])


    return (
        <CCard >

            <CNav variant="pills" role="tablist" style={{ background: '#0B5345' }}>
                <CNavLink className={(!measurment)?'d-none':'m-2 p-2'}  style={{ color: 'white', cursor: 'pointer' }} active={active === 1} onClick={() => { setActiveButton(1), closeFormFun() }}>
                    Measurment
                </CNavLink >
                <CNavLink className={(!allClientDite)?'d-none':'m-2 p-2'}  style={{ color: 'white', cursor: 'pointer' }} active={active === 2} onClick={() => { setActiveButton(2), closeFormFun() }}>
                    ALL Diet Client
                </CNavLink>
                <CNavLink className={(i||!dietPlanTemplet)?'d-none':'m-2 p-2'} style={{ color: 'white', cursor: 'pointer' }} active={active === 3} onClick={() => { setActiveButton(3), closeFormFun() }}>
                    Diet Plan Templet
                </CNavLink>
                <CNavLink className={(i||!workOutTemplet)?'d-none':'m-2 p-2'} style={{ color: 'white', cursor: 'pointer' }} active={active === 4} onClick={() => { setActiveButton(4), closeFormFun() }}>
                    Work out Templet
                </CNavLink>
                <CNavLink className={(i||!exerciseLibiry)?'d-none':'m-2 p-2'} style={{ color: 'white', cursor: 'pointer' }} active={active === 5} onClick={() => { setActiveButton(5), closeFormFun() }}>
                    Exercise Libiry
                </CNavLink>
                <CNavLink className={(i||!dailyWorkoutScheduling)?'d-none':'m-2 p-2'} style={{ color: 'white', cursor: 'pointer' }} active={active === 6} onClick={() => { setActiveButton(6), closeFormFun() }}>
                    Daily Workout Scheduling
                </CNavLink>
            </CNav >
            {(active === (measurment &&1)||
             active === (ClientDietTable &&2)||
             active === (dietPlanTemplet &&3)
            )&& <CCol className='m-4 mt-1 p-4' style={{ position: 'relative' }}>
                <CButton style={{ position: 'absolute', right: '0' }} onClick={() => setForm((value) => !value)}>Add New</CButton>
            </CCol>}

            {active === 1 && <MeasurementTable id={id} employeeData={employeeData}  allMemberData={allMemberData} showForm={showForm}  token={token} closeFormFun={closeFormFun} setForm={setForm} />}
            {active === 2 && <ClientDietTable id={id}  allMemberData={allMemberData} showForm={showForm}  token={token} closeFormFun={closeFormFun} setForm={setForm} />}
            {active === 3 && <DietPlanTable id={id} idVal={+i===9} showForm={showForm}  token={token} closeFormFun={closeFormFun} setForm={setForm} />}
            {active === 4 && <p className='text-center'>Coming Soon</p>}
            {active === 5 && <p className='text-center'>Coming Soon</p>}           
            {active === 6 && <p className='text-center'>Coming Soon</p>}

        </CCard>
    )
}

export default Fitness
