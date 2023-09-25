import moment from 'moment/moment';
import * as XLSX from 'xlsx';

function useEventExport(){

return      function downloadAsExcel(data){

    
  const data1 =   data.map((el,i)=>{

       return {
       ['Sr No']:i+1,
       ['Event Name']:el.eventName,
       ["Event Start Date"]: new Date(el.eventStartDate).toLocaleDateString() ,
       ["Event End Date"]: new Date(el.eventEndDate).toLocaleDateString(),
       ['Event Time']:el.eventTime,
       ['Duration']:el.duration,
       ["hostName"]: el.hostName,
       ['Event Venue']:el.eventType,
       ['Event fess']:el.fess,
       ["Clinet Status"]:el.clinetType,
       ['Client Name']:el.clientName,
       ["ClinetId"]: el.clinetId ,
       ["Booking Start Date"]: new Date(el.bookingStartDate).toLocaleDateString() ,
       ["Booking End Date"]: new Date(el.bookingEndDate).toLocaleDateString(),
       ["Booking Time"]:el.bookingTime,
       ["Client Fees"]:el.clientFees,
       ['Email Address']:el.emailAddress,
       ['Contact Number']:el.contactNumber,
       ['City']:el.city,
       ['Created By']:el.createdBy,
       ['Gender']:el.Gander,
       ['Center Code']:el.centerCodeC,
       ['Center Name']:el.centerNameC,
       ['Profession']:el.Profession,
   } })   
   
       const worksheet = XLSX.utils.json_to_sheet(data1);
       const workbook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
   
       XLSX.writeFile(workbook,"Participants.xlsx");
   }

}

export default useEventExport