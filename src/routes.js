import React from 'react'
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Login = React.lazy(() => import('./views/pages/login/Login'))
const EmployeeDashboard = React.lazy(() => import('./views/dashboard/EmployeeDashboard'))
const TrainerDashboard = React.lazy(() => import('./views/dashboard/TrainerDashboard'))
//Empolyee
const PTTarget = React.lazy(() => import('./views/dashboard/PTTarget'))
const SalesTarget = React.lazy(() => import('./views/dashboard/SalesTarget'))
const CorporateTarget = React.lazy(() => import('./views/dashboard/CorporateTarget'))
// Trainer
const LiveClasses = React.lazy(()=>import('./views/dashboard/LiveClasses'))
const AllBatches = React.lazy(()=>import('./views/dashboard/AllBatches'))
const PtClasses = React.lazy(()=>import('./views/dashboard/PtClasses'))
const TTCClasses = React.lazy(()=>import('./views/dashboard/TtcClassses'))
const AllMembers  = React.lazy(()=>import('./views/dashboard/AllMembers'))
//Leads
const AllEnquires = React.lazy(() => import('./views/leads/AllEnquires'))
const EnquireAppoitment = React.lazy(() => import('./views/leads/EnquireAppointment'))
const TrialUpdated = React.lazy(() => import('./views/leads/TrialEnquires'))
const FollowupScheduling = React.lazy(() => import('./views/leads/FollowupScheduling'))
const FollowupCallReport = React.lazy(() => import('./views/leads/FollowupsCallReport'))
const ColdEnquires = React.lazy(() => import('./views/leads/ColdEnquires'))

//Clients
const AllClients = React.lazy(() => import('./views/clients/AllClients'))
const ActiveClients = React.lazy(() => import('./views/clients/ActiveClients'))
const RenewalsClients = React.lazy(() => import('./views/clients/Renewals'))
const RenewedClients = React.lazy(() => import('./views/clients/Renewed'))
const LeftClients = React.lazy(() => import('./views/clients/LeftClients'))
const ServiceCall = React.lazy(() => import('./views/clients/serviceCall/ServiceCall'))
const AllService = React.lazy(() => import('./views/clients/allService/AllService'))
const MemberDetails = React.lazy(() => import('./views/clients/MemberDetails/MemberDetails'))
const SalesCall = React.lazy(() => import('./views/clients/salesCall/SalesCall'))
const ServicesRateCard = React.lazy(() => import('./views/clients/ServicesRateCard/ServicesRateCard'))
const ClientSupport = React.lazy(()=>import('./views/clients/ClientSupport'))
const ClientSupportForm =  React.lazy(()=>import('./views/clients/ClientSupportForm')) 
//Marketing
const EmailMarketing = React.lazy(() => import('./views/marketing/EmailMarketing'))
const SMSMarketing = React.lazy(() => import('./views/marketing/SMSMarketing'))
const PushMarketing = React.lazy(() => import('./views/marketing/PushMarketing'))
const OfferMaster = React.lazy(() => import('./views/marketing/OfferMarketing'))
const BulkMaller = React.lazy(()=>import('./views/marketing/BulkMailer'))
const BulkCalling = React.lazy(()=>import('./views/marketing/BulkCalling'))
const  CustomerReview  =React.lazy(()=>import('./views/marketing/CustomerReview'))
// Fitness
const Fitness = React.lazy(()=>import('./views/Fitness/FitnessJs'))

// Task
const CreateTask = React.lazy(()=>import('./views/Task/CreateTask'))

// Inventory
const AllCallList = React.lazy(() => import('./views/Inventory/AllCallList'))
const ImpCallList = React.lazy(() => import('./views/Inventory/ImpCallList'))
const AllSuppilerList = React.lazy(() => import('./views/Inventory/AllSuppilerLis'))
const AllSuppilerList1 = React.lazy(() => import('./views/Inventory/AllSupplierList1'))
const GuestList = React.lazy(() => import('./views/Inventory/GuestList1'))
const StockListing1 = React.lazy(() => import('./views/Inventory/StockListing1'))
const StockReport = React.lazy(() => import('./views/Inventory/StockReport'))
const ProductSalesReport = React.lazy(() => import('./views/Inventory/ProductSalesReport'))
const PurchaseReport = React.lazy(() => import('./views/Inventory/PurchaseReport'))
const StockAssigning = React.lazy(()=>import('./views/Inventory/StockAssigning'))
const StockAlert =  React.lazy(()=>import('./views/Inventory/StockAlert'))
const StockOrderList = React.lazy(()=>import('./views/Inventory/StockOrderList'))
const ProductInvoice = React.lazy(()=>import('./views/Inventory/ProductInvoice'))
//finance
const TotalInvoices = React.lazy(() => import('./views/finance/TotalInvoice'))
const PaidInvoices = React.lazy(() => import('./views/finance/PaidInvoice'))
const BalancePayment= React.lazy(() => import('./views/finance/BalancePayment'))
const Receipts= React.lazy(() => import('./views/finance/Receipts'))
const CancelInvoices = React.lazy(() => import('./views/finance/CancelInvoice'))
const CommentOfWritten = React.lazy(() => import('./views/finance/CommentsOfWritten'))
const RevenueDetails = React.lazy(() => import('./views/finance/RevenueDetails'))
const ServiceRevenue = React.lazy(() => import('./views/finance/ServiceRevenue'))
const RenewRevenue = React.lazy(() => import('./views/finance/RenewRevenue'))
const NewcRevenue = React.lazy(() => import('./views/finance/NewcRevenue'))
const LeadReport = React.lazy(() => import('./views/finance/LeadReport'))
const RevenueReport = React.lazy(() => import('./views/finance/RevenueReport'))
const TotalCollection = React.lazy(() => import('./views/finance/TotalCollection'))
const PaymentMode = React.lazy(() => import('./views/finance/PaymentMode.js'))
const CashReport = React.lazy(() => import('./views/finance/CashReport'))
const ChequeReport = React.lazy(() => import('./views/finance/ChequeReport'))
const DailyExpense = React.lazy(() => import('./views/finance/DailyExpense'))
const CenterExpenses = React.lazy(() => import('./views/finance/CenterExpenses'))
const PettyCash = React.lazy(() => import('./views/finance/PettyCash'))
const DSRreport = React.lazy(() => import('./views/finance/DSRreport'))
const TargetvsAchievment = React.lazy(() => import('./views/finance/TargetvsAchievment.js'))
const ExpenseVoucher = React.lazy(()=>import( './views/finance/ExpenseVoucher/ExpenseVoucher'))
const ClientInvoice = React.lazy(()=>import('./views/finance/ClientInvoice/ClientInvoice'))
const OffiiceInventory  =  React.lazy(()=>import('./views/Master/Inventory/OffiiceInventory'))


// Hr
const AllEmpProfile = React.lazy(() => import('./views/hr/AllEmpProfile'))
const EmployeeProfile = React.lazy(() => import('./views/hr/Hr-Employee-Details/Tables/EmployeeProfile'))
const CreateEmployee = React.lazy(() => import('./views/hr/EmpRecruitment'))
const AttendanceRegister = React.lazy(() => import('./views/hr/AttendanceRegister'))
const AttendanceReport = React.lazy(() => import('./views/hr/AttendanceReport'))
const BiometricEmp = React.lazy(() => import('./views/hr/BiometricEmp'))
const EmpDocuments = React.lazy(() => import('./views/hr/EmpOfDocuments'))
const HolidaysList = React.lazy(() => import('./views/hr/HolidaysList'))
const StaffCheckIns = React.lazy(() => import('./views/hr/StaffCheckIns'))
const EmpDailyCheckIns = React.lazy(() => import('./views/hr/EmpCheck'))
const EmpJoining = React.lazy(()=>import('./views/hr/EmpJoining'))
const JobProfile = React.lazy(()=>import('./views/hr/JobProfile'))
const HrPolicy = React.lazy(()=>import('./views/hr/HrPolicy'))
const HolydaysList= React.lazy(()=>import('./views/hr/HolidaysList'))
const LeaveSetUp = React.lazy(()=>import('./views/hr/LeaveSetUp'))
const SalarySheet = React.lazy(()=>import('./views/hr/SalarySheet'))
const TrainerySalary = React.lazy(()=>import('./views/hr/TrainerySalarySlip'))
const AllClassReport = React.lazy(()=>import('./views/hr/AllClassReport'))
const ShiftTimingManagment = React.lazy(()=>import('./views/hr/ShiftTimingManagment'))
const AllRightHr =  React.lazy(()=>import('./views/hr/AllRightHr')) 
const Rights =  React.lazy(()=>import('./views/hr/Rights')) 
const EmpPerformance = React.lazy(()=>import('./views/hr/EmpPerformance'))
const Stafftarget = React.lazy(()=>import('./views/hr/staffTarget/Stafftarget'))
const EmployeeTargetSheet =React.lazy(()=>import('./views/hr/EmployeeTargetSheet'))
const EmpDocumentsMaster = React.lazy(()=>import('./views/Master/HRMaster/EmpDocuments'))
const HrPolicyPage =React.lazy(()=>import( './views/Master/HrPolicyPage'))
const EventMaster = React.lazy(()=>import('./views/Master/centerSetup/EventMaster'))
// classes 
const TtcClientDetails  = React.lazy(()=>import('./views/Courses/TtcClientDetails'))
const TtcVideoDetails = React.lazy(()=>import('./views/Courses/TtcVideoDetails'))
const TtcPdfDetails = React.lazy(()=>import('./views/Courses/TtcPdfDetails'))
const ClientCertificateDetails = React.lazy(()=>import('./views/Courses/ClientCertificateDetails'))
//Master
const CenterSetup = React.lazy(() => import('./views/Master/centerSetup/CenterSetup'))
const CenterPartners = React.lazy(()=>import('./views/Master/CenterPartners/Centerpartners')) 
const LogoSetup = React.lazy(() => import('./views/Master/centerSetup/LogoSetup'))
const CompanyProfile = React.lazy(() => import('./views/Master/centerSetup/CompanyProfile'))
const ServiceMaster = React.lazy(() => import('./views/Master/centerSetup/ServiceMaster'))
const PackageMaster = React.lazy(() => import('./views/Master/centerSetup/PackageMaster'))
const BatchMaster = React.lazy(() => import('./views/Master/centerSetup/BatchMaster'))
const FormMaster = React.lazy(() => import('./views/Master/centerSetup/FormMaster'))
const Designation = React.lazy(() => import('./views/Master/HRMaster/Designation'))
const HolidayListMaster = React.lazy(() => import('./views/Master/HRMaster/HolidaysListMaster'))
const HRPolicyMaster = React.lazy(() => import('./views/Master/HRMaster/HRPolicy'))
const EmailSMSMaster = React.lazy(() => import('./views/Master/marketing/EmailSmsMaster'))
const GalleryMaster = React.lazy(() => import('./views/Master/marketing/GalleryMaster'))
const LeadSourceMaster = React.lazy(() => import('./views/Master/marketing/LeadSourceMaster'))
const BudgetingMaster = React.lazy(() => import('./views/Master/finance/BudgetingMaster'))
const ExpressCategoryMaster = React.lazy(() => import('./views/Master/finance/ExpressCategoryMaster'))
const InvoiceMaster = React.lazy(() => import('./views/Master/finance/InvoiceMaster'))
const TaxSetupMaster = React.lazy(() => import('./views/Master/finance/TaxSetupMaster'))
const TncMaster = React.lazy(() => import('./views/Master/client/TncMaster'))
const Support = React.lazy(()=>import('./views/Master/Support/Support'))
const JobProfileMaster  = React.lazy(()=>import('./views/Master/HRMaster/JobProfile'))
const LeaveSetupMaster = React.lazy(()=>import('./views/Master/HRMaster/LeaveSetup'))
const ShiftTimingManagmentMastr = React.lazy(()=>import('./views/Master/HRMaster/ShiftTimingManagement'))
const PayrollMaster = React.lazy(()=>import('./views/Master/HRMaster/PayrollMaster'))
const EmpJoiningMaster = React.lazy(()=>import('./views/Master/HRMaster/EmpJoining'))
const EmpPerformanceMaster = React.lazy(()=>import('./views/Master/HRMaster/EmpPrformanceMaster'))
const InvoiceMasterLT = React.lazy(()=>import('./views/Master/centerSetup/InvoiceMaster'))
const Notification = React.lazy(()=>import('./views/Master/notification/Notification'))

// Base
const TrainerSalarySlipMaster = React.lazy(()=>import('./views/Master/HRMaster/TrainerSalarySlipMaster'))
// const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const AllProductListingMaster = React.lazy(()=>import('./views/Master/Inventory/AllProductListingMaster'))
const UserProfile = React.lazy(()=>import('./components/UserProfile'))

// Buttons


//Forms
const EnquiryForm = React.lazy(() => import('./views/forms/EnquiryForm'))
const StaffForm = React.lazy(() => import('./views/forms/Recruitment'))
const LiveClass = React.lazy(() => import('./views/forms/LiveClass'))
const OfflineClass = React.lazy(() => import('./views/forms/OfflineClass'))
const TTC = React.lazy(() => import('./views/forms/TTC'))
const EventCom = React.lazy(() => import('./views/Event/Event'))
const PTClass = React.lazy(() => import('./views/forms/PTClass'))
const ClientCheckin = React.lazy(() => import('./views/forms/ClientCheckin'))
const StaffCheckIn = React.lazy(() => import('./views/forms/StaffCheckIn'))
const Appointment = React.lazy(() => import('./views/forms/Appointment'))
const UserCompanyProfile =  React.lazy(() => import('./components/UserCompanyProfile'))
const AutomatedCommunication  =  React.lazy(() => import('./views/Master/marketing/AutomatedCommunication'))

// Icons

// Notifications


const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

// Employee Details Page 
const   EmpDetails  = React.lazy(()=> import('./views/hr/Hr-Employee-Details/EmployeeDetails'))


const routes = [
  { path: '/', exact: true, name: 'Login Page',valid:true },
  { path: '/login', name: 'Login',valid:true, element: Login },
  { path: '/profile/:userId', name: 'Profile', element: UserProfile },
  { path: '/company-profile', name: 'Company Profile', element: UserCompanyProfile,mongoCollectionName:'CompanyProfile'},

  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  {
    path: '/employee/emp-dashboard',
    name: 'Employee Dashboard',
    element: EmployeeDashboard,
  },
  {
    path: '/trainer-dashboard',
    name: 'Trainer Dashboard',
    element: TrainerDashboard,
  },
  //Employee

  { path: '/employee/pt', name: 'PT Target', element: PTTarget },
  
  {
    path: '/employee/sales-target',
    name: 'Employee Target',
    element: SalesTarget,
  },
  {
    path: '/employee/corporate-target',
    name: 'Corporate Target',
    element: CorporateTarget,
  },

  // Trainer
  {path:'/trainer/live-classes',name:'Live Classes', element:LiveClasses},
  {path:'/trainer/all-batches',name:'All Batches',element:AllBatches},
  {path:'/trainer/pt-classes',name:'PT Classes',element:PtClasses},
  {path:'/trainer/ttc-classes',name:'TCC Classes',element:TTCClasses},
  {path:'/trainer/all-members',name:'All Members',element:AllMembers},




  //Leads
  { path: '/leads', name: 'Leads', element: AllEnquires, exact: true},
  { path: '/leads/all-enquires', name: 'All Enquires', element: AllEnquires,mongoCollectionName:'enquiryforms'},
  { path: '/leads/enquires-appointment', name: 'Enquiry Appointment', element: EnquireAppoitment,mongoCollectionName:'Appointment' },
  { path: '/leads/trial-updated', name: 'Trial Updated', element: TrialUpdated,mongoCollectionName:'Trial Session' },
  { path: '/leads/followups-scheduling', name: 'Prospect', element: FollowupScheduling,mongoCollectionName:'enquiryforms' },
  { path: '/leads/followups-call-report', name: 'Calls Report', element: FollowupCallReport,mongoCollectionName:'prospect' },
  { path: '/leads/cold-enquires', name: 'Cold Enquires', element: ColdEnquires,mongoCollectionName:'Cold' },

  //Clients
  // { path: '/clients', name: 'All Clients', element: AllClients, exact: true,mongoCollectionName:"memberfroms" },
  // { path: '/clients/client-management', name: 'All Clients', element: AllClients, exact: true,mongoCollectionName:"memberfroms" },
  { path: '/clients/client-management/active-clients', name: 'Active Clients', element: ActiveClients },
  { path: '/clients/client-management/all-clients', name: 'All Clients', element: AllClients,mongoCollectionName:"memberfroms" },
  { path: '/clients/client-management/renewals-clients', name: 'Renewals Clients', element: RenewalsClients },
  { path: '/clients/client-management/renewed-clients', name: 'Renewed Clients', element: RenewedClients },
  { path: '/clients/client-management/left-clients', name: 'Left Clients', element: LeftClients },
  { path: '/clients/service-call', name: 'Member Calls', element: ServiceCall },
  { path: '/clients/all-service', name: 'All Service', element: AllService },
  { path: '/clients/member-details/:id/:i', name: 'Member Details', element: MemberDetails,valid:true },
  { path: '/clients/sales-call', name: 'Sales Call', element: SalesCall },
  { path: '/clients/servicesrate-card', name: 'ServicesRate Card', element: ServicesRateCard },
  { path:'/clients/client-management/client-support',name:'Client Support',element:ClientSupport},
  { path:'/forms/support',name:'Support',element: ClientSupportForm  },

  // Fitness

  {path:'/fitness/fitness-Goal/:id',name:'Fitness Goal',element:Fitness},

  //Marketing
  { path: '/Marketing', name: 'Marketing', element: EmailMarketing, exact: true },
  { path: '/Marketing/email-marketing', name: 'Email Marketing', element: EmailMarketing },
  { path: '/Marketing/email-marketing', name: 'Email Marketing', element: EmailMarketing },
  { path: '/Marketing/sms-marketing', name: 'SMS Marketing', element: SMSMarketing },
  { path: '/Marketing/push-marketing', name: 'App Notification', element: PushMarketing },
  { path: '/Marketing/offers-master', name: 'Offer Master', element: OfferMaster },
  { path: '/Marketing/bulk-mailer-data',name:'Bulk Mailer ',element:BulkMaller },
  { path: '/Marketing/bulk-calling-data',name:'Bulk Calling',element:BulkCalling},
  { path:'/Marketing/customer-review',name:'Customer Review',element:CustomerReview},
  { path:'task/create-a-task',name:'Create Task',element:CreateTask},


  //Inventory
  { path: '/inventory', name: 'Inventory', element: ImpCallList, exact: true },
  { path: '/inventory/all-call-list', name: 'All Call List', element: AllCallList },
  { path: '/inventory/imp-call', name: 'Imp Call List', element: ImpCallList },
  { path: '/inventory/all-suppiler', name: 'All Suppiler List', element: AllSuppilerList },
  { path: '/inventory/stock-listing1', name: 'Products List', element: StockListing1 },
  { path: '/inventory/stock-report', name: 'Product Report', element: StockReport },
  { path: '/inventory/sales-report', name: 'Product Sales Report', element: ProductSalesReport },
  { path: '/inventory/purchase-report', name: 'Stock Report', element: PurchaseReport},
  { path:'/inventory/stock-assgning', name: 'Office Inventory', element: StockAssigning},
  { path:'/inventory/stock-alert', name: 'Stock Alert', element: StockAlert},
  { path:'/inventory/stock-order-list', name: 'Stock List', element: StockOrderList},
  { path:'/inventory/product-invoice', name: 'Product Invoice', element:ProductInvoice},

  



  //Finance
  { path: '/finance', name: 'Finance', element: TotalInvoices, exact: true },
  { path: '/finance/total-invoice', name: 'Total Invoice', element: TotalInvoices },
  { path: '/finance/paid-invoice', name: 'Paid Invoice', element: PaidInvoices },
  { path: '/finance/balance-payment', name: 'Balance Payment', element: BalancePayment },
  { path: '/finance/receipt', name: 'Receipt', element: Receipts },
  { path: '/finance/cancel-invoice', name: 'cancel Invoice', element: CancelInvoices },
  { path: '/finance/comment-written', name: 'Comments Of written Off Invoice', element: CommentOfWritten },
  { path: '/finance/revenue-details', name: 'Revenue details', element: RevenueDetails },
  { path: '/finance/service-revenue', name: 'Services Revenue', element: ServiceRevenue },
  { path: '/finance/renew-revenue', name: 'Renew Revenue', element: RenewRevenue },
  { path: '/finance/newc-revenue', name: 'Newc Revenue', element: NewcRevenue },
  { path: '/finance/l-r', name: 'Lead Report', element: LeadReport },
  { path: '/finance/revenue-report', name: 'Revenue Report', element: RevenueReport },
  { path: '/finance/total-c', name: 'Total Collection', element: TotalCollection },
  { path: '/finance/payment-mode', name: 'Payment Mode', element: PaymentMode },
  { path: '/stock/stock-list', name: 'Stock', element:ClientInvoice},

  
  { path: '/finance/cash-report', name: 'Cash Report', element: CashReport },
  { path: '/finance/cheque-report', name: 'Cheque Report', element: ChequeReport },
  { path: '/finance/daily-expense', name: 'Daily Expense', element: DailyExpense },
  { path: '/finance/petty-cash', name: 'Petty Cash', element: PettyCash},
  { path: '/finance/dsr-report', name: 'DSR Report', element: DSRreport},
  { path: '/finance/targetvs-achievment', name: 'Target vs Achievment', element: TargetvsAchievment},  
  { path: '/finance/center-expense', name: 'Center Expense', element: CenterExpenses },
  { path:'/voucher/expense',name:'Expense Voucher ',element:ExpenseVoucher },
  //HR
  { path: '/hr', name: 'HR Management', element: AllEmpProfile, exact: true },
  { path: '/hr/all-emp', name: 'All Employee Profile', element: AllEmpProfile, exact: true },
  { path: '/hr/emp-recruitment', name: 'Recruitment', element: CreateEmployee, exact: true },
  { path: '/hr/attendance-register', name: 'Attendance Register', element: AttendanceRegister, exact: true },
  { path: '/hr/attendance-report', name: 'Attendance Report', element: AttendanceReport, exact: true },
  { path: '/hr/biometric-emp', name: 'Biometric Staff', element: BiometricEmp, exact: true },
  { path: '/hr/emp-document', name: 'Employee Document', element: EmpDocuments, exact: true },
  { path: '/hr/holiday-list', name: 'Holiday List', element: HolidaysList, exact: true },
  { path: '/hr/staff-checkin', name: 'Staff CheckIn', element: StaffCheckIns, exact: true },
  { path:'/hr/daily-emp-check',name:'Emp Check Ins',element:EmpDailyCheckIns},
  { path:'/hr/emp-joining',name:'Emp Joining',element:EmpJoining},
  { path:'/hr/job-profile',name:'Job Profile', element:JobProfile},
  { path:'/hr/hr-Policy',name:'Hr Policy',element:HrPolicy},
  { path:'/hr/holyday-list',name:'HolidaysList',element:HolydaysList},
  { path:'/hr/leave-setup',name:'Leave Setup',element:LeaveSetUp},
  { path:'/hr/salary-sheet',name:'Salary Sheet',element:SalarySheet},
  { path:'/hr/trainer-salary',name:'Trainer Salary Sheet',element:TrainerySalary},
  { path:'/hr/all-class-report',name:'All Classs Report',element:AllClassReport},
  { path:'/hr/shift-timing-managment',name:'Shift Timing ',element:ShiftTimingManagment},
  { path:'/hr/all-righthr',name:'All Right',element:AllRightHr},
  { path:'/hr/member-rightshr/:emailUniqId',valid:true,name:'Rights',element:Rights},
  { path:'/hr/emp-performance',name:'Emp Performance',element:EmpPerformance},
  { path:'/hr/view-staff-target',name:'View Staff Target',element:Stafftarget},
  { path:'/hr/emp-target-sheet',name:'Employee Target Sheet',element:EmployeeTargetSheet},
  { path:'/hr/employee-detail/:id',valid:true,name:'Employee Details',element:EmpDetails},
  { path:'/hr/employee-profile/:isEmployee/:id',valid:true,name:'Employee Details',element:EmpDetails},
  { path:'/hr/employee-profile-edit/:id2/:isEdit',valid:true,name:'Employee Details',element:EmployeeProfile},
  { path:'/hr/employee-right/:emailUniqId/:isRights',valid:true,name:'Rights',element:AllRightHr},
  { path:'/hr/hrPolicyPage/:title',valid:true,name:'Hr Policy Page',element:HrPolicyPage},

  // Courses
  {path:'/course' ,name:'TTC' ,element:TtcClientDetails,exact:true},
  {path:'/course/ttc-client-details' ,name:'TTC Client Details' ,element:TtcClientDetails},
  {path:'/course/ttc-videos-details' ,name:'TTC Videos Details' ,element:TtcVideoDetails},
  {path:'/course/ttc-pdf-details' ,name:'TTC PDF Details' ,element:TtcPdfDetails},
  {path:'/course/client-certificate-details' ,name:'TTC Client Certificate Details' ,element:ClientCertificateDetails},


  //Master
  { path: '/master', name: 'Master', element: CenterSetup, exact: true },
  { path: '/master/center-setup', name: 'Center Setup', element: CenterSetup, exact: true },
  { path: '/master/center-setup/company-profile', name: 'Company Profile', element: CompanyProfile, exact: true },
  { path: '/master/center-setup/logo-setup', name: 'Logo Setup', element: LogoSetup, exact: true },
  { path: '/master/center-setup/service-master', name: 'Service Master', element: ServiceMaster, exact: true },
  { path: '/master/center-setup/package-master', name: 'Package Master', element: PackageMaster, exact: true },
  { path: '/master/center-setup/batch-master', name: 'Batch Master', element: BatchMaster, exact: true },
  { path: '/master/center-setup/form-master', name: 'Form Master', element: FormMaster, exact: true },
  { path: '/master/center-setup/leadSourceMaster', name: 'Lead Source Master', element: LeadSourceMaster, exact: true },
  { path: '/master/center-setup/designation', name: 'Employee Designation', element: Designation, exact: true },


  { path: '/master/clients', name: 'Marketing Master', element: Designation, exact: true },
  { path: '/master/clients/t&c-master', name: 'T&C Master', element: TncMaster, exact: true },

  { path: '/master/marketing', name: 'Marketing Master', element: Designation, exact: true },
  { path: '/master/marketing/emailsmsTemplate', name: 'Template', element: EmailSMSMaster, exact: true },
  { path: '/master/marketing/galleryMaster', name: 'Gallery Master', element: GalleryMaster, exact: true },

  { path: '/master/hr', name: 'HR Master', element: Designation, exact: true },
  { path: '/master/hr/holiday', name: 'Holidays List', element: HolidayListMaster, exact: true },
  { path: '/master/hr/hrPolicy', name: 'HR Policy', element: HRPolicyMaster, exact: true },

  { path: '/master/finance', name: 'Finance Master', element: Designation, exact: true },
  { path: '/master/finance/expness', name: 'Express Category', element: ExpressCategoryMaster, exact: true },
  { path: '/master/finance/budgeting', name: 'Budgeting', element: BudgetingMaster, exact: true },
  { path: '/master/finance/invoice', name: 'Invoice', element: InvoiceMaster, exact: true },
  { path: '/master/finance/tax', name: 'Tax', element: TaxSetupMaster, exact: true },
  { path:'/master/support',name:'Support',element:Support },
  { path:'/master/hr/job-profile',name:'Job Profile',element:JobProfileMaster},
  { path:'/master/hr/leave-setup',name:'Leave Setup',element:LeaveSetupMaster},
  { path:'/master/hr/shift-timing-management',name:'Shift Timing',element:ShiftTimingManagmentMastr},
  { path: '/master/all-produt-Listing-Master', name: 'All Product Listing Master', element: AllProductListingMaster },
  { path: '/master/product-assign-master', name: 'Product Assign Master', element: OffiiceInventory },
  { path:'/master/hr/payrol-setup',name:'Salary Sheet',element:PayrollMaster},
  { path:'/master/hr/emp-joining',name:'Employee Joining Master',element:EmpJoiningMaster},
  { path:'/master/hr/emp-doc',name:'Employee Document Master',element:EmpDocumentsMaster},
  { path:'/master/hr/trainer-salary-slip',name:'Trainer Salary Sheet',element: TrainerSalarySlipMaster},
  { path:'/master/hr/emp-Prformance',name:'Employee Performance',element: EmpPerformanceMaster},
  { path:'/master/center-partners',name:'Center Partners',element: CenterPartners},
  { path:'/master/marketing/automated-communication',name:'Center Partners',element: AutomatedCommunication},
  { path:'/master/center-setup/invoice-master',name:'Invoice Master',element: InvoiceMasterLT},
  { path:'/master/event-master',name:'Event Master',element:EventMaster},
  { path:'/master/notification',name:'Notification',element:Notification},


  //Form
  { path: '/forms/enquiry-form', name: 'Enquiry Form', element: EnquiryForm },
  { path: '/forms/staff-form', name: 'Employee Form', element: StaffForm },
  { path: '/forms/live-class', name: 'Live Class', element: LiveClass },
  { path: '/forms/offline-class', name: 'Offline Class', element: OfflineClass },
  { path: '/forms/pt-class', name: 'PT Class', element: PTClass },
  { path: '/forms/ttc', name: 'TTC', element: TTC },
  { path: '/forms/event', name: 'Event', element: EventCom },
  { path: '/forms/client-checkin', name: 'Client CheckIn', element: ClientCheckin },
  { path: '/forms/staff-checkin', name: 'Staff CheckIn', element: StaffCheckIn },
  { path: '/forms/appointment', name: 'Appointment', element: Appointment },


  { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
