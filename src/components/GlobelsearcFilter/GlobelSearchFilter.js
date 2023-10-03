
import { useEffect, useState } from 'react'
import './GlobelSerachFilter.css'
import {AiOutlineDown,AiOutlineUp,AiOutlineSearch} from 'react-icons/ai'
import {CFormCheck,CFormInput,CButton} from '@coreui/react'
import routes from 'src/routes'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useUniqAdminObjeact } from 'src/views/Custom-hook/adminValidation'

const GlobelSearchFilter = ({data,getData,employeeId}) => {
    const [visibale,setVisibale] = useState(false)
    const [inputvalName,setInputValName] = useState('')
    const [selectedName,setSelectedName] = useState('Search...')
    const url1 = useSelector((el)=>el.domainOfApi) 
    const [routesFilterData,setRoutesFilterData] = useState(routes)
    const navigate = useNavigate()

    const addminId = useUniqAdminObjeact().partnerAdminMongoId

  useEffect(()=>{
if(employeeId){
  const employeeName= data.find((el)=>el._id===employeeId?.trim())?.FullName
  setSelectedName((employeeName||'Search...'))
}
  },[employeeId,data?.length])


  let user = JSON.parse(localStorage.getItem('user-info'))
  const token = user.token;
  const getRequireData = async ()=>{
    try{
   
    const headers = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }


    const response1 = await axios.get(`${url1}/search-filter/${inputvalName.replace(/ /g, '$dv2e62e').trim()}/${addminId}`,headers)

    console.log(response1?.data)

    if(response1.status===200&&response1?.data){
      const data = [...response1?.data?.allCollection]
      const filterRoutes = routes.filter((el)=>{ 
        return !el.valid&& ((el?.name).toLocaleLowerCase().includes(inputvalName.toLocaleLowerCase())
         ||data.includes(el.mongoCollectionName)||
         el?.mongoCollectionNameArr?.some((el)=>{
          return data.includes(el)
         })
         )
      })
      setRoutesFilterData(filterRoutes)
    }

}catch(error){
    console.log(error)
}
}

 useEffect(()=>{
    getRequireData()
},[])

  return (
 <div className='input-containenr'>
    <div className="select-btn-to-member" calssName='w-100' onClick={()=>{setVisibale(prev=>!prev)}} >
        <div>{selectedName}</div>
        {!visibale?<div className='member-input-icon'><AiOutlineDown/></div>:
        <div className='member-input-icon'> <AiOutlineUp/></div>}
      </div>
      <div className='member-content-data-li-c' style={{display:`${visibale?'block':'none'}`}}>
      <div className="search-data-li-c">
          <input spellcheck="false" type="text" placeholder="Search" className='w-100'
          value={inputvalName}
           onChange={(e)=>setInputValName(e.target.value)}/> 
           <CButton onClick={()=>getRequireData()}>
             Search 
           </CButton>
        </div>
      <div className="member-content" calssName='w-100'>
      
        <ul className="options-data-li-c">
        

        {routesFilterData.map((el)=>{
                        return <li  id='data-li-c' onClick={()=>navigate((el.path2?el.path2:el.path))} >{(el?.name )}
                        </li>
                    })} 
        </ul>
      </div>
      </div>
 </div>

  )
}

export default GlobelSearchFilter
