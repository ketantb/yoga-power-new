import moment from 'moment/moment';
import * as XLSX from 'xlsx';

const useExportEmpData = (name) => {

    return  function downloadAsExcel(data){


        const data1 =   data.map((el,i)=>{
             return {
             ['Sr No']:i+1,
             ['Name']:el.FullName,
             ["Mobile"]: el.ContactNumber ,
             ["Email"]: el.EmailAddress ,
             ["Gender"]: el.Gender,
             ["PayoutType"]:el.PayoutType,
             ["Department"]:el.Department,
             ['Job Designation']:el.JobDesignation,
             ['Grade']:el.Grade,
             ['Comment']:el.Comment,
             ['Salary']:el.Salary,
         } })   

         
             const worksheet = XLSX.utils.json_to_sheet(data1);
             const workbook = XLSX.utils.book_new();
             XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
         
             XLSX.writeFile(workbook, name);
         }
      
      }

      const useExportSelctedEmpData = () => {

        return  function downloadAsExcel(data){
            const data1 =   data.map((el,i)=>{
                 return {
                 ['Sr No']:i+1,
                 ['Name']:el.FullName,
                 ["Mobile"]: el.ContactNumber ,
                 ["Email"]: el.EmailAddress ,
                 ["Gender"]: el.Gender,
                 ["PayoutType"]:el.PayoutType,
                 ["Department"]:el.Department,
                 ['Job Designation']:el.JobDesignation,
                 ['Grade']:el.Grade,
                 ['Comment']:el.Comment,
                 ['Salary']:el.Salary,
                 ['Employee ID']:el.EmployeeID,
                 ['Attendance ID']:el.AttendanceID
             } })   
    
             
                 const worksheet = XLSX.utils.json_to_sheet(data1);
                 const workbook = XLSX.utils.book_new();
                 XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
             
                 XLSX.writeFile(workbook, name);
             }
          
          }      


export {useExportEmpData,useExportSelctedEmpData}
