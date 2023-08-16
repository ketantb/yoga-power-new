import moment from 'moment/moment';
import * as XLSX from 'xlsx';

const useClientExport = (name) => {
    
    return      function downloadAsExcel(data){
     

        const data1 =   data.map((el,i)=>{
             return {
             ['Sr No']:i+1,
             ["Date"]:moment(el.createdAt).format("DD-MM-YYYY"),
             ['Name']:el.Fullname,
             ["Mobile"]: el.ContactNumber ,
             ["Invoice No"]:el.invoiceNum,
             ["Attendance ID"]:el.AttendanceID,
             ["Enquiry source"]: el.EnquiryType,
             ['Course Name']:el.serviceName,
             ['Service']:el.typeOFBatchClasses,
             ['Duration	']:el.duration,
             ['Start Date']:moment(el.startDate).format("DD-MM-YYYY"),
             ['End Date']:moment(el.endDate).format("DD-MM-YYYY"),
             ['Gander']:el.Gander,
             ['Center Code']:el.centerCodeC,
             ['Center Name']:el.centerNameC,
             ['City']:el.city,
             ['Profession']:el.Profession,
             ['DateofBirth']:moment(el.DateofBirth).format("DD-MM-YYYY"),
             ['Blood Group']:el.BloodGroup
         } })   
         
             const worksheet = XLSX.utils.json_to_sheet(data1);
             const workbook = XLSX.utils.book_new();
             XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
         
             XLSX.writeFile(workbook, name);
         }
}

export default useClientExport
