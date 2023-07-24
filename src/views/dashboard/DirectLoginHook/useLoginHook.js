import React,{useState,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const useLoginHook = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const url = useSelector((el)=>el.domainOfApi) 
    const [userinfo,setUserInfo] = useState({})
  
  
  
  
  
    const disPatch = useDispatch()
    const data = useSelector((el)=>el?.empLoyeeRights)   
    const getUserRight = useSelector((el)=>el.getUserRight)    
    const isEmployee = useSelector((el)=>el.isEmployee)    
    const activeToCall = useSelector((el)=>el.activeToCall)     
    const  setViewNav =  useDispatch()

  
  console.log(data)
  
  useEffect(()=>{
    if(userinfo?.token){
    disPatch({type:'getRightDataFun'})
    disPatch({type:'activeToCall',payload:false})
    }
  },[userinfo?.user?.emailUniqId,userinfo.token])
  
  
    useEffect(()=>{
      if(userinfo?.token){
        if(!userinfo?.user?.status){
          navigate('/550')
        }else if(data?.emailUniqId){
            navigate('/')
        }
        disPatch({type:'getRightDataFun'})
        getUserRight(userinfo.token,userinfo.user.emailUniqId)
      }
    },[getUserRight,activeToCall,userinfo?.user?.emailUniqId,isEmployee,userinfo.token])
  
  
  return  async function login(email, password) {

      if (email != '' || password != '') {
        setViewNav({type:'setViewNavFalse',payload:false})
        setViewNav({type:'setViewNavFalse',payload:false})


    
        let result = await fetch(`${url}/login/direct-login`, {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email, password})
        })
  
        if (result.status == 400||result.status == 404) {
         return 'Invalid Details! Please Enter Valid Details'
        }
  
        result = await result.json()
        
        setUserInfo(result)
    
        localStorage.setItem('user-info', JSON.stringify(result))
        let user = JSON.parse(localStorage.getItem('user-info'))
        
        if (user?.user?.isAdmin) {

          disPatch({type:'dispatchIsAdmin'})
          navigate('/')
        }
      } else {
       return 'Please Enter Details'
      }
    }
 

}

export default useLoginHook
