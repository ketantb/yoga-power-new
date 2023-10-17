import './DefaultLayout.css'
import React,{useEffect,useState} from 'react'
import {
  AppContent,
  AppSidebar,
  AppFooter,
  AppHeader,
} from '../components/index'

import {useParams,redirect,useNavigate  } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import WelcomePage from 'src/views/pages/WelcomePage'

let user = JSON.parse(localStorage.getItem('user-info'))
const token = user?.token;
const emailUniqId = user?.user?.emailUniqId;

const DefaultLayout = () => {
  let num =0
  const disPatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  const getUserRight = useSelector((el)=>el.getUserRight)    
  const hidde = useSelector((el)=>el.hidde)    
  const isEmployee = useSelector((el)=>el.isEmployee)    
  const activeToCall = useSelector((el)=>el.activeToCall)    
  const [toggaleToRerendar,setReRender] = useState(false)
  const data = useSelector((el)=>el.empLoyeeRights)  
  const [validateLayout,setValidateLayout] = useState(false)

  const validateVal = (!!data?.emailUniqId || user?.user?.isAdmin)  

  useEffect(()=>{
    if (user?.user?.isAdmin) {
      disPatch({type:'dispatchIsAdmin'})
    }if(user?.user?.isAdminPatner){
      disPatch({type:'dispatchIsAdminPatner'})
    }if(user?.user?.isEmployee ){
      disPatch({type:'dispatchIsEmployee'})
    }
  },[validateVal,user?.user?.isAdminPatner,
    user?.user?.isEmployee])

  useEffect(()=>{   
  if(!token){
    navigate('/login')
    return 
  }
  },[token])

useEffect(()=>{
 setReRender(prev=>!prev)
  disPatch({type:'getRightDataFun'})
  disPatch({type:'activeToCall',payload:false})
},[!!emailUniqId])

  useEffect(()=>{
      disPatch({type:'getRightDataFun'})
      getUserRight(token,emailUniqId)
  },[getUserRight,activeToCall,toggaleToRerendar,emailUniqId,isEmployee])
  

  useEffect(()=>{
    if(validateVal){
      setValidateLayout(true)
    }else{
      setValidateLayout(false)
    }
    disPatch({type:'nothidde'})

  },[validateVal])


  return (
    validateLayout&&
    <>
    <div className={hidde?'hidde':'main-div'}>
      <AppSidebar className='left-er3' />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader className='header-38ru' />
        <div className="body flex-grow-1 px-3 mb-3">
          <AppContent params={params} className='bottom-rwei' />
        </div>
      </div>
    </div>
    {/* <WelcomePage/> */}
    </>  
    
  )
}

export default DefaultLayout
