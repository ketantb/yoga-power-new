import {
    CCol,
    CFormSwitch,
    CRow,
} from '@coreui/react'


import React from 'react'

import { taskCalender } from '../Rights/rightsValue/erpRightsValue'
const TaskRight = ({erpTaskList,setRightObject}) => {


    const handleRight = (val)=>{
        setRightObject(prev => {
            const  arr = prev.erpRights.erpTaskList.items.erpTaskListCalender.rights
            console.log(arr)
            if(arr.includes(val)){
                arr?.splice(arr?.indexOf(val),1)
                return { ...prev }
            }
         arr.push(val)
         return { ...prev }
        })
    }

    const toCheckRightVal = (val)=>{
        return erpTaskList.items.erpTaskListCalender.rights.includes(val)
    }

  return (
    <div >
    <CRow >
        <CCol>
            <CFormSwitch size="xl" label="Task"
            checked={erpTaskList.value}
            onChange={(e) => setRightObject(prev => {
                prev.erpRights.erpTaskList.value = e.target.checked
                return { ...prev }
            })}
            />
        </CCol>
        <CCol>
        <CFormSwitch size="xl" label="Task Calender"
            checked={erpTaskList.items.erpTaskListCalender.value}
            onChange={(e) => setRightObject(prev => {
                prev.erpRights.erpTaskList.items
                .erpTaskListCalender.value = e.target.checked
                return { ...prev }
            })}
            />
        </CCol>    
    </CRow>
    <CRow>    
        <CCol>
            <CFormSwitch size="xl" label="Add Task"
            checked={toCheckRightVal(taskCalender.addTask)}
            onChange={()=>handleRight(taskCalender.addTask)}
            />
        </CCol>
        <CCol>
            <CFormSwitch size="xl" label="Delete Task"
                checked={toCheckRightVal(taskCalender.deleteTask)}
                onChange={()=>handleRight(taskCalender.deleteTask)}
            />
        </CCol>
    </CRow>
    </div>
  )
}

export default TaskRight
