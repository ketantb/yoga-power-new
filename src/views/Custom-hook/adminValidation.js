import { useEffect,useState } from "react"

const useAdminValidation = (type) => {
    let  userInfo = JSON.parse(localStorage.getItem('user-info'))?.user

    function getRouteFun(userInfo){

        if(userInfo.isAdmin){
         return 'all' 
        }else if(type ==='Master' && !userInfo.isAdmin){
         return userInfo.isAdminPatner?`filter-by-admin/${userInfo.emailUniqId}`
            :`filter-by-admin/${userInfo.createrId}`
        }else if(!userInfo.isAdmin){
        return userInfo.isAdminPatner?`filter-by-admin/${userInfo.emailUniqId}`
        :`filter-by-employee/${(userInfo?.memBerId?userInfo.memBerId:userInfo.emailUniqId)}`
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
        employeeIDC:userInfo.emailUniqId,
        employeeMongoId:(userInfo.isEmployee?userInfo.memBerId:userInfo.emailUniqId),
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
