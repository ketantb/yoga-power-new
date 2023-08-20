
import { useEffect, useState } from 'react'
import './CustomSelectinput.css'
import {AiOutlineDown,AiOutlineUp,AiOutlineSearch} from 'react-icons/ai'

const CustomSelectinput = ({data,getData,employeeId}) => {

    const [visibale,setVisibale] = useState(false)
    const [inputvalName,setInputValName] = useState('')
    const [selectedName,setSelectedName] = useState('Select Staff Name')

    function getDataFun(event,el){

       if(event.target.id==='data-li-c'){
          getData(el)
          setSelectedName(el?.FullName)
          setVisibale(false)
       }
    }

  useEffect(()=>{
if(employeeId){
  const employeeName= data.find((el)=>el._id===employeeId?.trim())?.FullName
  setSelectedName((employeeName||'Select Employee Name'))
}
  },[employeeId,data?.length])

  return (
 <div className='input-containenr'>
    <div className="select-btn-to-member" calssName='w-100' onClick={()=>{setVisibale(prev=>!prev)}} >
        <div>{selectedName}</div>
        {!visibale?<div className='member-input-icon'><AiOutlineDown/></div>:
        <div className='member-input-icon'> <AiOutlineUp/></div>}
      </div>
      <div className='member-content-data-li-c' style={{display:`${visibale?'block':'none'}`}}>
      <div className="search-data-li-c">
          <div ><AiOutlineSearch/></div>
          <input spellcheck="false" type="text" placeholder="Search" className='w-100'
           value={inputvalName}
           onChange={(e)=>setInputValName(e.target.value)}/>
        </div>
      <div className="member-content" calssName='w-100'>
      
        <ul className="options-data-li-c">

        {data?.filter((el)=>(el?.empName ||el.FullName).toLocaleLowerCase().includes(inputvalName.toLocaleLowerCase())).map((el)=>{
                        return <li  id='data-li-c' onClick={(e)=>getDataFun(e,el)} >{(el?.empName ||el.FullName )}<br/>
                        {el.EmployeeID}<br/>
                        {el.email}
                        {el.ContactNumber}
                        </li>
                    })}
        </ul>
      </div>
      </div>
 </div>
  )
}

export default CustomSelectinput
