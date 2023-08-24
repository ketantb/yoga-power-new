import moment from 'moment/moment';
import * as XLSX from 'xlsx';

function useExportHook(name){

return      function downloadAsExcel(data){

    
  const data1 =   data.map((el,i)=>{
       return {
       ['Sr No']:i+1,
       ["Date"]:moment(el.createdAt).format("DD-MM-YYYY"),
       ['Name']:el.Fullname,
       ["Mobile"]: el.ContactNumber ,
       ["Service"]: el.ServiceName ,
       ["Source"]: el.enquirytype,
       ["Enquiry stage"]:el.identifyStage,
       ["Call Status"]:el.CallStatus,
       ['Assigned by']:el.StaffName,
       ['Counseller']:el.Counseller,
       ['Address']:el.Address,
       ['Email']:el.Emailaddress,
       ['Gender']:el.Gander,
       ['Center Code']:el.centerCodeC,
       ['Center Name']:el.centerNameC,
       ['City']:el.city,
       ['Profession']:el.Profession,
   } })   
   
       const worksheet = XLSX.utils.json_to_sheet(data1);
       const workbook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
   
       XLSX.writeFile(workbook, name);
   }

}

export default useExportHook