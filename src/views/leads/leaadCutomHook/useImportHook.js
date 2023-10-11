import axios from 'axios'
import { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useUniqAdminObjeact } from '../../Custom-hook/adminValidation'




function useImportHook(route){

const url1 = useSelector((el) => el.domainOfApi)
const unikqValidateObj = useUniqAdminObjeact()
const [result1,setResult1] = useState()

let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;
const centerCode = user.user.centerCode



return function insertManyCollection(collection,getData=()=>{},number,importStaffId){

    console.log({...unikqValidateObj,employeeMongoId:(importStaffId||unikqValidateObj.employeeMongoId)})

    const data = collection.map((el,i)=>{
        return {
        ['EnquiryId']:(centerCode+"Q"+(number+1+i)),
        ['EnquiryDate']:new Date(el["Date"]),
        ['Fullname']:el['Name'],
        ['ContactNumber']:el["Mobile"],
        ['ServiceName']:el["Service"],
        ['enquirytype']:el["Source"],
        ['identifyStage']:el["Enquiry stage"],
        ['CallStatus']:el["Call Status"],
        ['StaffName']:el['Assigned by'],
        ['Counsellor']:el['Counsellor'],
        ['Address']:el['Address'],
        ['Emailaddress']:el['Email'],
        ['Gander']:el['Gander'],
        ['centerCodeC']:el['Center Code'],
        ['centerNameC']:el['Center Name'],
        ['city']:el['City'],
        ['Profession']:el['Profession'],
        ...{...unikqValidateObj,employeeMongoId:(importStaffId||unikqValidateObj.employeeMongoId)}
    } })  

    console.log(data)

    axios.post(`${url1}/${route}`,data, {
        headers: {
            "Authorization": `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then((res) => {
            console.log(res,'xlax')
            alert('Succcessfully Added XLSX ')
            getData()
        })
        .catch((error) => {
            console.error(error)
        })


} 
}


export default useImportHook
