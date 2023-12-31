import { useEffect,useState } from "react"

const useAdminValidation = (type) => {
    let  userInfo = JSON.parse(localStorage.getItem('user-info'))?.user

    function getRouteFun(userInfo){

         if(type ==='Master'){
            return (userInfo.isAdminPatner||userInfo.isAdmin)?`filter-by-admin/${userInfo.emailUniqId}`
               :`filter-by-admin/${userInfo.createrId}`
        }else{
           return (userInfo.isAdminPatner||userInfo.isAdmin)?`filter-by-admin/${userInfo.emailUniqId}`
           :`filter-by-employee/${(userInfo?.memBerId?userInfo.memBerId:userInfo.emailUniqId)}`
        }

    } 

    const [getRoute,setRoute] = useState(getRouteFun(userInfo))

    useEffect(()=>{
        setRoute(getRouteFun(userInfo))
    },[userInfo.emailUniqId])

  return getRoute
}

const useEmployeeValidation = ()=>{
let  userInfo = JSON.parse(localStorage.getItem('user-info'))?.user

return function (isEmployee){
    if(!isEmployee){
        return (userInfo.isAdminPatner||userInfo.isAdmin)?`creater/${userInfo.emailUniqId}`
           :`creater/${userInfo.createrId}`
    }else{
       return (!userInfo.isAdminPatner||!userInfo.isAdmin)?`emp/${userInfo.memBerId}`
       :`emp/${userInfo.memBerId}`
    }
}
}

const useUniqAdminObjeact = ()=>{
    let  userInfo = JSON.parse(localStorage.getItem('user-info'))?.user

    console.log((userInfo.isEmployee?userInfo.memBerId:userInfo.emailUniqId))

    const uniqObj  = {
        empNameC:userInfo.username,
        employeeIDC:userInfo.emailUniqId,
        employeeMongoId:(userInfo.isEmployee?userInfo.memBerId:userInfo.emailUniqId),
        centerNameC:userInfo.center,
        centerCodeC:userInfo.centerCode,
        adminNameC:userInfo.createdBy,
        partnerAdminMongoId:((userInfo.isAdminPatner||userInfo.isAdmin)?userInfo.emailUniqId:userInfo.createrId),
        }

        const [obj,setObj] = useState(uniqObj)

        useEffect(()=>{
            setObj(uniqObj)
        },[userInfo.emailUniqId])

    return obj
}



export {useAdminValidation,useUniqAdminObjeact,useEmployeeValidation}
