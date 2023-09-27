
import { useEffect, useState } from 'react'
import './GlobelSerachFilter.css'
import {AiOutlineDown,AiOutlineUp,AiOutlineSearch} from 'react-icons/ai'
import {CFormCheck} from '@coreui/react'
import routes from 'src/routes'
import { useNavigate } from 'react-router-dom'

const GlobelSearchFilter = ({data,getData,employeeId}) => {
    const [visibale,setVisibale] = useState(false)
    const [inputvalName,setInputValName] = useState('')
    const [selectedName,setSelectedName] = useState('Search...')
    const navigate = useNavigate()

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
  setSelectedName((employeeName||'Search...'))
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
        

        {routes?.filter((el)=>((el?.name).toLocaleLowerCase().includes(inputvalName.toLocaleLowerCase()) && (!el.valid))).map((el)=>{
                        return <li  id='data-li-c' onClick={()=>navigate(el.path)} >{(el?.name )}
                        </li>
                    })} 
        </ul>
      </div>
      </div>
 </div>
  )
}

export default GlobelSearchFilter
