import { useEffect,useState } from "react"

const useAdminValidation = () => {
    let  userInfo = JSON.parse(localStorage.getItem('user-info'))?.user

    function getRouteFun(userInfo){
        if(userInfo.isAdmin){
         return 'all' 
        }else if(!userInfo.isAdmin){
        return userInfo.isAdminPatner?`filter-by-admin/${userInfo.emailUniqId}`
        :`filter-by-employee/${userInfo.emailUniqId}`
        }

    } 

    const [getRoute,setRoute] = useState(getRouteFun(userInfo))

    useEffect(()=>{
        setRoute(getRouteFun(userInfo))
    },[userInfo.emailUniqId])

  return getRoute
}


const useUniqAdminObjeact = ()=>{
    let  userInfo = JSON.parse(localStorage.getItem('user-info'))?.user


    const uniqObj  = {
        empNameC:userInfo.username,
        employeeIDC:'',
        employeeMongoId:userInfo.emailUniqId,
        centerNameC:userInfo.center,
        centerCodeC:userInfo.centerCode,
        adminNameC:userInfo.createdBy,
        partnerAdminMongoId:(userInfo.isAdminPatner?userInfo.emailUniqId:userInfo.createrId),
        }

        const [obj,setObj] = useState(uniqObj)

        useEffect(()=>{
            setObj(uniqObj)
        },[userInfo.emailUniqId])

    return obj
}



export {useAdminValidation,useUniqAdminObjeact}
