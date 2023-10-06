import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilBook,
  cilCalculator,
  cilCash,
  cilCenterFocus,
  cilChartPie,
  cilChatBubble,
  cilContact,
  cilCursor,
  cilDescription,
  cilDrop,
  cilFolderOpen,
  cilGraph,
  cilGroup,
  cilNotes,
  cilPencil,
  cilPeople,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilUser,
  cilWeightlifitng,
  cilCommentSquare
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'


const _nav = [
  {
    component: CNavItem,
    id:'crmDashboard',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavGroup,
    name: 'Employee',
    id:'crmEmployee',
    color: '#fff',
    to: '/employee',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Dashboard',
        id:'crmDashboard1',
        to: '/employee/emp-dashboard',
      },
      {
        component: CNavItem,
        name: 'Employee Target',
        id:'crmEmployeeTarget1',
        to: '/employee/sales-target',
      },
         
          {
            component: CNavItem,
            name: 'Member Calls',
            id:'crmMemberCalls1',
            to: '/clients/service-call',
          },
          {
            component: CNavItem,
            name: 'Sales Call',
            id:'crmSalesCall1',
            to: '/clients/sales-call',
          },
          {
            component: CNavItem,
            id:'crmServicesRateCard1',
            name: 'Services Rate Card',
            to: '/clients/servicesrate-card',
          }
        
        ],
  },
  {
    component: CNavGroup,
    name: 'Trainer',
    id:'crmTrainer',
    to: '/trainer',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Live Classes',
        id:'crmLiveClasses1',
        to: '/trainer/live-classes'
      },
      {
        component: CNavItem,
        name: 'All Batches',
        id:'crmAllBatches1',
        to: '/trainer/all-batches',
        
      },
      {
        component: CNavItem,
        name: 'PT  Classes',
        id:'crmPtClasses1',
        to: '/trainer/pt-classes',
      },
      {
        component: CNavItem,
        id:'crmPtClasses1',
        name: 'TTC Classes',
        to: '/trainer/ttc-classes',
      },
      {
        component: CNavItem,
        name: 'ALL Members',
        id:'crmAllMembers1',
        to: '/trainer/all-members',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'CRM',
    id:'crm4ty943'
  },
  {
    component: CNavGroup,
    name: 'Leads',
    id:'crmLeads',
    to: '/leads',
    icon: <CIcon icon={cilFolderOpen} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Enquires',
        id:'crmAllEnquiry1',
        to: '/leads/all-enquires',
      },
      {
        component: CNavItem,
        name: 'Appointment',
        id:'crmAppointment1',
        to: '/leads/enquires-appointment',
      },
      {
        component: CNavItem,
        name: 'Trial Updated',
        id:'crmTrialUpdate1',
        to: '/leads/trial-updated',
      },
      {
        component: CNavItem,
        name: 'Prospects',
        id:'crmProspects1',
        to: '/leads/followups-scheduling',
      },
      {
        component: CNavItem,
        name: 'Cold Enquires',
        id:'crmColdEnquires1',
        to: '/leads/cold-enquires',
      },
      {
        component: CNavItem,
        name: 'Calls Report',
        id:'crmCallsReports1',
        to: '/leads/followups-call-report',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Client Management',
    id:'crmCientManagment',
    to: '/clients',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Clients',
        id:'crmAllClients1',
        to: '/clients/client-management/all-clients',
      },
      {
        component: CNavItem,
        name: 'Active Client',
        id:'crmActiveClients1',
        to: '/clients/client-management/active-clients',
      },
      {
        component: CNavItem,
        name: 'Renewals Client',
        id:'crmRenewalsClient1',
        to: '/clients/client-management/renewals-clients',
      },
      {
        component: CNavItem,
        name: 'Renewed Clients',
        id:'crmRenewedClients1',
        to: '/clients/client-management/renewed-clients',
      },
      {
        component: CNavItem,
        name: 'Left Clients',
        id:'crmLeftClients1',
        to: '/clients/client-management/left-clients',
      },
      {
        component: CNavItem,
        name: 'Client Support',
        id:'crmClientSupport1',
        to: '/clients/client-management/client-support',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Marketing',
    id:'crmMarketing',
    to: '/Marketing',
    icon: <CIcon icon={cilChatBubble} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'E-Mail Marketing',
        id:'crmEmailMarketing1',
        to: '/Marketing/email-marketing',
      },
      {
        component: CNavItem,
        name: 'SMS Marketing',
        id:'crmSmsMarketing1',
        to: '/Marketing/sms-marketing',
      },
      {
        component: CNavItem,
        name: 'Push Marketing',
        id:'crmPushMarketing1',
        to: '/Marketing/push-marketing',
      },
      {
        component: CNavItem,
        name: 'Offers Master',
        id:'crmOffersMaster1',
        to: '/Marketing/offers-master',
      },
      {
        component: CNavItem,
        name: 'Bulk Mailer Data',
        id:'crmBulkMailerData1',
        to: '/Marketing/bulk-mailer-data',
      },
      {
        component: CNavItem,
        name: 'Bulk Calling Data',
        id:'crmBulkCallingData1',
        to: '/Marketing/bulk-calling-data',
      },
      {
        component: CNavItem,
        name: 'Customer Review',
        id:'crmCustomerReview1',
        to: '/Marketing/customer-review',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Fitness',
    to: '/fitness',
    id:'crmFitness',
    icon: <CIcon icon={cilWeightlifitng} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Fitness Goal',
        id:'crmFitnessGoal',
        to: '/fitness/fitness-Goal/all-client-fitness',
      }
    ],
  },
  {
    component: CNavTitle,
    name: 'ERP',
    id:'erpRights'
  },
  {
    component: CNavGroup,
    name: 'Task',
    to: '/task',
    id:"erpTaskList",
    icon: <CIcon icon={cilGraph} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Task Calender',
        to: 'task/create-a-task',
        id:'erpTaskListCalender'
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Inventory',
    to: '/inventory',
    id:'erpInventory',
    icon: <CIcon icon={cilGraph} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name:'Stock  List',
        to:'/inventory/stock-order-list',
        id:'erpStockList'
      },
      {
        component: CNavItem,
        name: 'Stock Report',
        to: '/inventory/purchase-report',
        id:'erpStockReport'
      },
      {
        component: CNavItem,
        name: 'Products List',
        to: '/inventory/stock-listing1',
        id:'erpProductList'
      },
      {
        component: CNavItem,
        name: 'Stock Alert',
        to: '/inventory/stock-alert',
        id:'erpStockAlert'
      },
      {
        component: CNavItem,
        name: 'Product Sales Report',
        to: '/inventory/sales-report',
        id:'erpProductSalesReport'
      },
      {
        component: CNavItem,
        name: 'Office Inventory',
        to: '/inventory/stock-assgning',
        id:'erpOfficeInventory'
      },
      {
        component: CNavItem,
        name: 'IMP Call List',
        to: '/inventory/all-call-list',
        id:'erpImpCallList'
      },
      {
        component: CNavItem,
        name: 'Product Invoice',
        to: '/inventory/product-invoice',
        id:'erpProductInvoice'
      },
      
      
    ],
  },
  {
    component: CNavGroup,
    name: 'Finance',
    to: '/finance',
    id:'erpFinance',
    icon: <CIcon icon={cilCash} customClassName="nav-icon" />,
    items: [
      {
        component: CNavGroup,
        name: 'Invoices',
        to: '/inventory',
        id:'erpInvoices',
        items: [
          {
            component: CNavItem,
            name: 'Total Invoices',
            to: '/finance/total-invoice',
            id:'erpTotalInvoice'
          },
          {
            component: CNavItem,
            name: 'Paid Invoices',
            to: '/finance/paid-invoice',
            id:'erpPaidInvoice'
          },
          {
            component: CNavItem,
            name: 'Balance Payment',
            to: '/finance/balance-payment',
            id:'erpBalancePayment'
          },
          {
            component: CNavItem,
            name: 'Receipts',
            to: '/finance/receipt',
            id:'erpReceipts'
          },
          {
            component: CNavItem,
            name: 'Cancelled Invoice',
            to: '/finance/cancel-invoice',
            id:'erpCancelledInvoice'
          },
          {
            component: CNavItem,
            name: 'Comments Of Cancelled Invoice',
            to: '/finance/comment-written',
            id:'erpCommentsOfWrittenOffInvoice'
          },
        ],
      },
      {
        component: CNavGroup,
        name: 'Revenues',
        id:'erpRevenues',
        to: '/inventory',
        items: [
          {
            component: CNavItem,
            name: 'Revenue FY Details',
            to: '/finance/revenue-details',
            id:'erpRevenueDetails'
          },
          {
            component: CNavItem,
            name: 'Revenue Service Wise',
            to: '/finance/service-revenue',
            id:'erpServicesWiseRevenue'
          },
         
          {
            component: CNavItem,
            name: 'Revenue New Client',
            to: '/finance/newc-revenue',
            id:'erpNewClientRevenue'
          },
          {
            component: CNavItem,
            name: 'Renewals Revenue Wise',
            to: '/finance/renew-revenue',
            id:'erpRenewalsRevenue'
          },
          {
            component: CNavItem,
            name: 'Revenue Lead Report ',
            to: '/finance/l-r',
            id:'erpLeadReport'
          },
          {
            component: CNavItem,
            name: 'Revenue FY Report',
            to: '/finance/revenue-report',
            id:'erpRevenueReport'
          },
        ],
      },
      
        {
          component: CNavGroup,
          name: 'Collection Report',
          to: '/inventory',
          id:'erpCollectionReport',
          items: [
            {
              component: CNavItem,
              name: 'Total Collection',
              to: '/finance/total-c',
              id:'erpTotalCollection'
            },
            {
              component: CNavItem,
              name: 'Payment Mode',
              to: '/finance/payment-mode',
              id:'erpPaymentMode'
            },
            {
              component: CNavItem,
              name: 'Cash Report',
              to: '/finance/cash-report',
              id:'erpCashReport'
            },
            {
              component: CNavItem,
              name: 'Cheque Report',
              to: '/finance/cheque-report',
              id:'erpChequeReport'
            },
          ],
        },
      {
        component: CNavGroup,
        name: 'Expense',
        to: '/inventory',
        id:'erpExpense',
        items: [
          {
            component: CNavItem,
            name: 'Center Expense',
            to: '/finance/center-expense',
            id:'erpCenterExpense'
          },
          {
            component: CNavItem,
            name: 'Daily Expense',
            to: '/finance/daily-expense',
            id:'erpDailyExpense'
          },
          {
            component: CNavItem,
            name: 'Petty Cash ',
            to: '/finance/petty-cash',
            id:'erpPettyCash'
          },
        ],
      },
      {
        component: CNavGroup,
        name: 'Sales',
        to: '/inventory',
        id:'erpSales',
        items: [
          {
            component: CNavItem,
            name: 'DSR Report',
            to: '/finance/dsr-report',
            id:'erpDsrReport'
          },
          {
            component: CNavItem,
            name: 'Target Vs Achievment ',
            to: '/finance/targetvs-achievment',
            id:'erpTargetVsAchievment'
          },
        ],
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'HR Management',
    to: '/hr',
    icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
    id:'erpHrManagement',
    items: [
      {
        component: CNavItem,
        name: 'Recuritment',
        to:'/hr/emp-recruitment',
        id:'erpRecuritment'
        
      },
      {
        component: CNavGroup,
        name: 'All Employee',
        to: '/hr/EP',
        id:'empLoyeeHrProfile',
        items:[
          {
            component: CNavItem,
            name: 'Employee Profile',
            to: '/hr/all-emp',   
            id:'erpEmployeeProfile'  
          },
          {
            component: CNavItem,
            name: 'Employee Documents',
            to: '/hr/emp-document',
            id:'erpEmployeeDocuments'
          },
          {
            component: CNavItem,
            name: 'Job Profile',
            to: '/hr/job-profile',
            id:'erpJobProfile'
          },
        ]
      },    
        {
          component: CNavGroup,
          name: 'Target Sheet',
          to: '/hr/empt',
          id:'erpHrTargetSheet',
          items: [
            {
              component: CNavItem,
              name: 'Emp Target Sheet',
              to: '/hr/emp-target-sheet',
              id:'erpTargetSheet'
            }, 
            {
              component: CNavItem,
              name: 'Emp Performance',
              to: '/hr/emp-performance',
              id:'erpEmpPerformance'
            },
          ],
        },

      {
        component: CNavGroup,
        name: 'Emp  Attendess',
        to: 'hr/ea',
        id:'erpEmpAttendess',
        items: [
          {
            component: CNavItem,
            name: 'EMP Check Ins',
            to: '/hr/daily-emp-check',
            id:'erpEmpCheckIns'
          },
          {
            component: CNavItem,
            name: 'Biometric Emp',
            to: '/hr/biometric-emp',
            id:'erpBiometricEmp'
          },
          {
            component: CNavItem,
            name: 'EMP Attedance Register',
            to: '/hr/attendance-register',
            id:'erpEmpAttedanceRegister'
          },
          
        ],
      },
      {
        component: CNavGroup,
        name: 'Hr Policy',
        to: '/hr/hp',
        id:'erpHrHrPolicy',
        items: [
          {
            component: CNavItem,
            name: 'Hr Policy',
            id:'erpHrPolicy',
            to: '/hr/hr-Policy',
          },
          {
            component:CNavItem,
            name:'Holiday List',
            id:'erpHolidayList',
            to:'/hr/holyday-list'
          },
          {
            component: CNavItem,
            name: 'Shift Timing ',
            to: '/hr/shift-timing-managment',
            id:'erpShiftTiming'
          },           
          {
            component: CNavItem,
            name: 'EMP Joining',
            to: '/hr/emp-joining',
            id:'erpEmpJoing'
          },
        ],
      },

      {
        component: CNavGroup,
        name: 'Salary Sheet',
        to: '/hr/ss',
        id:'erpSalarySheet',
        items: [
          {
            component: CNavItem,
            name: 'Leave Setup',
            to: '/hr/leave-setup',
            id:'erpLeaveSetup'
          },
          {
            component: CNavItem,
            name: 'Emp Salary Sheet',
            to: '/hr/salary-sheet',
            id:'erpEmpSalarySheet'
          },
          {
            component: CNavItem,
            name: 'Trainer Salary Slip',
            to: '/hr/trainer-salary',
            id:'erpTrainerSalarySlip'
          },          
          
          {
            component: CNavItem,
            name: 'All Trainer Report',
            to: '/hr/all-class-report',
            id:'erpAllTrainerReport'
          },
        ],
      },
      {
        component: CNavItem,
        name: 'All-Rights',
        to: '/hr/all-righthr',
        id:'erpAllRights'
      }
    ],
    
  },
  {
    component: CNavGroup,
    name: 'Courses',
    to: '/course',
    id:'erpCourse',
    icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'TTC Clients ',
        to: '/course/ttc-client-details',
        id:'erpTTCClients'
      },
      {
        component: CNavItem,
        name: 'TTC Videos ',
        to: '/course/ttc-videos-details',
        id:'erpTTCVideos'
      },
      {
        component: CNavItem,
        name: 'TTC PDF ',
        to: '/course/ttc-pdf-details',
        id:'erpTTCPdf'
      },
      {
        component: CNavItem,
        name: 'Course Completion',
        to: '/course/client-certificate-details',
        id:'erpCourseCompletion'
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Masters',
    id:'masterRights'
  },
  {
    component: CNavItem,
    name: 'Center Setup',
    to: '/master/center-setup',
    icon: <CIcon icon={cilCenterFocus} customClassName="nav-icon" />,
    id:'masterCenterSetup'
  },
  {
    component: CNavItem,
    name: 'Client Feedback',
    to: '/master/support',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
    id:'masterClientFeedback'
  },
  {
    component: CNavItem,
    name: 'Notification',
    to: '/master/notification',
    icon: <CIcon icon={cilCommentSquare
    } customClassName="nav-icon" />,
    id:'masterClientNotification'
  },
  {
    component: CNavGroup,
    name: 'Marketing',
    to: '/master/marketing',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    id:'masterMarketing',
    items: [
      {
        component: CNavItem,
        name: 'Sms, E-mail, Template Master',
        to: '/master/marketing/emailsmsTemplate',
        id:'masterSmsEmailTemp'
      },
      {
        component: CNavItem,
        name: 'Gallery Master',
        to: '/master/marketing/galleryMaster',
        id:'masterGallertyMaster'
      },
      {
        component: CNavItem,
        name: 'Automated Communication To staff  Master',
        to: '/master/marketing/automated-communication',
        id:'masterAutomatedComToStaff'
      }
    ],
  },
  {
    component: CNavGroup,
    name: 'Clients',
    to: '/master/clients',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    id:'masterClient',
    items: [
      {
        component: CNavItem,
        name: 'T&C',
        to: '/master/clients/t&c-master',
        id:'masterClientTransferMaster'
      }
    ],
  },
  {
    component: CNavGroup,
    name: 'HR',
    to: '/master/hr',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    id:'masterHr',
    items: [
      {
        component: CNavItem,
        name: 'Employee Designation',
        to: '/master/center-setup/designation',
        id:'masterEmployeeDesignation'
      },
      {
        component: CNavItem,
        name: 'HR Policy',
        to: '/master/hr/hrPolicy',
        id:'masterHrPolicy'
      },
      {
        component: CNavItem,
        name: 'Holidays List',
        to: '/master/hr/holiday',
        id:'masterHolidaysList'
      },
      {
        component: CNavItem,
        name: 'EMP Joining',
        to: '/master/hr/emp-joining',
        id:'masterEmpJoining'
      },
      {
        component: CNavItem,
        name: 'Job Profile',
        to: '/master/hr/job-profile',
        id:'masterJobProfile'
      },
      {
        component: CNavItem,
        name: 'Employee Document',
        to: '/master/hr/emp-doc',
        id:'masterEmployeeDocument'
      },
      {
        component: CNavItem,
        name: 'Leave Setup',
        to: '/master/hr/leave-setup',
        id:'masterLeaveSetup'
      },
      {
        component: CNavItem,
        name: 'Salary Sheet',
        to: '/master/hr/payrol-setup',
        id:'masterSalarySheet'
      },
      {
        component: CNavItem,
        name: 'Shift Timing ',
        to: '/master/hr/shift-timing-management ',
        id:'masterShiftTiming'
      },
      {
        component: CNavItem,
        name: 'Trainer Salary Slip',
        to: '/master/hr/trainer-salary-slip',
        id:'masterTrainerSalarySlip'
      },
      {
        component: CNavItem,
        name: 'Emp Prformance',
        to: '/master/hr/emp-Prformance',
        id:'masterEmpPrformance'
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Inverntory',
    to: '/master',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    id:'masterInverntory',
    items: [
      {
        component: CNavItem,
        name: 'All Produst Listing Master',
        to: '/master/all-produt-Listing-Master',
        id:'masterAllProductListingMaster'
      },
      {
        component: CNavItem,
        name: 'Office inventory',
        to: '/master/product-assign-master',
        id:'masterOfficeInventory'
      },

    ],
  },
  {
    component: CNavGroup,
    name: 'Finance',
    to: '/master/finance',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    id:'masterFinance',
    items: [
      {
        component: CNavItem,
        name: 'Center Category',
        to: '/master/finance/expness',
        id:'masterExpnessCategory'
      },
      {
        component: CNavItem,
        name: 'Center Budgeting',
        to: '/master/finance/budgeting',
        id:'masterBudgeting'
      },
      {
        component: CNavItem,
        name: 'Invoice Setup Master',
        to: '/master/finance/invoice',
        id: 'masterInvoiceSetupMaster'
      },
      {
        component: CNavItem,
        name: 'Tax Setup Master',
        to: '/master/finance/tax',
        id:'masterTaxSetupMaster'
      },
    ],
  },
  {
    to: '/master/center-partners',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    component: CNavItem,
    name: 'Center Partners',   
    id:'masterCenterPartners'
  },
]

export default _nav
