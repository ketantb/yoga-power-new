
import { useEffect, useState } from 'react'
import './StaffCheckBoxInputDropDown.css'
import {AiOutlineDown,AiOutlineUp,AiOutlineSearch} from 'react-icons/ai'
import {CFormCheck} from '@coreui/react'

const StaffCheckBoxInputDropDown = ({data,getData,employeeId}) => {
    const [visibale,setVisibale] = useState(false)
    const [inputvalName,setInputValName] = useState('')
    const [selectedName,setSelectedName] = useState('Select Staff Name')
    const [selectedEmpArr,setSelectedEmpArr] = useState({
      empObjArr:[],
      empIdArr:[]
    })

    function getDataFun(event,el){
       if(event.target.id==='data-li-c'){
       
          setSelectedEmpArr(prev=>{
            let prevObjArr =  prev.empObjArr
            let prevIdData =  prev.empIdArr


            if(!prevIdData.includes(el._id)){
              prevObjArr = [...prev.empObjArr,el]
              prevIdData = [...prev.empIdArr,el._id]
            }else{
              prevObjArr =  prev.empObjArr.filter((el2)=>el2._id!==el._id)
              prevIdData =  prev.empIdArr.filter((id)=>id!==el._id)
            }
            getData(prevObjArr)
            return {empObjArr:prevObjArr,empIdArr:prevIdData}
          }            
        )
          setSelectedName(el?.FullName)
       }
    }

  useEffect(()=>{
if(employeeId){
  const employeeName= data.find((el)=>el._id===employeeId?.trim())?.FullName
  setSelectedName((employeeName||'Select Employee Name'))
}
  },[employeeId,data?.length])


  const handleAllFunction = () =>{
    setSelectedEmpArr(prev=>{
      getData([...data])
      return {
        empObjArr:data,
        empIdArr:data.map((el)=>el._id)
      }
    }
    )
   
  }


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
            <li  style={{position:'relative',overflowX:'hidden'}} >
                <CFormCheck className='m-2' label="Select All" checked={data.length===selectedEmpArr.empObjArr.length}/>
                <li onClick={handleAllFunction}  id='data-li-c' style={{background:"rgba(255, 255, 255, 0.100)", 
                         position:'absolute',width:'100%',
                         height:'100%',zIndex:'1000',top:'0'}} >
                </li>
            </li>

        {data?.filter((el)=>(el?.empName ||el.FullName).toLocaleLowerCase().includes(inputvalName.toLocaleLowerCase())).map((el)=>{
                        return <li   style={{position:'relative',overflowX:'hidden'}}  >{(el?.empName ||el.FullName )}<br/>
                         <CFormCheck checked={selectedEmpArr.empIdArr.includes(el._id)} />
                        {el.EmployeeID}<br/>
                        {el.email}
                        {el.ContactNumber}
                         <li onClick={(e)=>getDataFun(e,el)}  id='data-li-c' style={{background:"rgba(255, 255, 255, 0.100)", 
                         position:'absolute',width:'100%',
                         height:'100%',zIndex:'1000',top:'0'}} ></li>
                        </li>
                    })}
        </ul>
      </div>
      </div>
 </div>
  )
}

export default StaffCheckBoxInputDropDown
