import axios from 'axios'
import { useSelector } from 'react-redux'
import moment from 'moment/moment'



function useImportHook(route){

const url1 = useSelector((el) => el.domainOfApi)

let user = JSON.parse(localStorage.getItem('user-info'))
const token = user.token;

return function insertManyCollection(collection,getData=()=>{}){


    const data = collection.map((el,i)=>{
        return {
        ['EnquiryId']:el["Enquiry ID"],
        ['createdAt']:new Date(el["Date"]),
        ['Fullname']:el['Name'],
        ['ContactNumber']:el["Mobile"],
        ['ServiceName']:el["Service"],
        ['enquirytype']:el["Source"],
        ['identifyStage']:el["Enquiry stage"],
        ['CallStatus']:el["Call Status"],
        ['StaffName']:el['Assigned by'],
        ['Counseller']:el['Counseller'],
        ['Address']:el['Address'],
        ['Emailaddress']:el['Email'],
        ['Gander']:el['Gander'],
        ['centerCodeC']:el['Center Code'],
        ['centerNameC']:el['Center Name'],
        ['city']:el['City'],
        ['Profession']:el['Profession'],
        ['DateofBirth']:el['DateofBirth'],
    } })  
    console.log(data,'hello world')

    axios.post(`${url1}/${route}`,data, {
        headers: {
            "Authorization": `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then((res) => {
            alert('Succcessfully Added XLSX Save')
            getData()
        })
        .catch((error) => {
            console.error(error)
        })


} 
}


export default useImportHook
