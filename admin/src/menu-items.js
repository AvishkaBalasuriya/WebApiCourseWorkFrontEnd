export default {
  items: [
    {
      id: "group-home",
      title: "Home",
      type: "group",
      icon: "feather icon-home",
      DocumentName: "Home",
      children: [
        {
          id: "dashboard",
          title: "Home",
          type: "item",
          icon: "feather icon-home",
          url: "/forms/home/dashboard",
          DocumentName: "Dashboard",
        }
      ],
    },
    {
      id: "group-masters",
      title: "Category",
      type: "group",
      icon: "icon-navigation",
      DocumentName: "Masters",
      children: [
        {
          id: "general-master",
          title: "Main Category",
          type: "collapse",
          icon: "feather icon-grid",
          DocumentName: "Masters",
          children: [
            {
              id: "student",
              title: "Sub 1",
              type: "item",
              url: "/forms/master/student",
              DocumentName: "Student",
            },
            {
              id: "people",
              title: "Sub 2",
              type: "item",
              url: "/forms/master/people",
              DocumentName: "People",
            }
          ],
        },
        {
          id: "sub-master",
          title: "Main cat 2",
          type: "collapse",
          icon: "feather icon-share-2",
          DocumentName: "Sub Masters",
          children: [
            {
              id: "student-master",
              title: "Student Masters",
              type: "collapse",
              DocumentName: "Student Masters",
              children: [
                {
                  id: "nationality",
                  title: "Nationality",
                  type: "item",
                  url: "/forms/sub-master/nationality",
                  DocumentName: "Nationality",
                },
                {
                  id: "religion",
                  title: "Religion",
                  type: "item",
                  url: "/forms/sub-master/religion",
                  DocumentName: "Religion",
                },
                {
                  id: "language",
                  title: "Language",
                  type: "item",
                  url: "/forms/sub-master/language",
                  DocumentName: "Language",
                },
                {
                  id: "industry",
                  title: "Industry",
                  type: "item",
                  url: "/forms/sub-master/industry",
                  DocumentName: "Industry",
                },
                {
                  id: "ethnicity",
                  title: "Ethnicity",
                  type: "item",
                  url: "/forms/sub-master/ethnicity",
                  DocumentName: "Ethnicity",
                },
                {
                  id: "professional-qualification",
                  title: "Qualification",
                  type: "item",
                  url: "/forms/sub-master/prof-qualification",
                  DocumentName: "Qualification",
                },
              ],
            },
            {
              id: "people-master",
              title: "People Masters",
              type: "collapse",
              DocumentName: "People Masters",
              children: [
                {
                  id: "people-type",
                  title: "People Type",
                  type: "item",
                  url: "/forms/sub-master/people-type",
                  DocumentName: "People Type",
                },
              ],
            },
            {
              id: "structure-master",
              title: "Structure Masters",
              type: "collapse",
              DocumentName: "Structure Masters",
              children: [
                {
                  id: "structure-school",
                  title: "School",
                  type: "item",
                  url: "/forms/sub-master/school",
                  DocumentName: "School",
                },
              ],
            },
            {
              id: "course-master",
              title: "Course Masters",
              type: "collapse",
              DocumentName: "Course Masters",
              children: [
                /*{
                  id: "course-exemption",
                  title: "Exemption",
                  type: "item",
                  url: "/forms/sub-master/course-exemption",
                  DocumentName: "Exemption",
                },*/
                {
                  id: "course-intake",
                  title: "Intake",
                  type: "item",
                  url: "/forms/sub-master/intake",
                  DocumentName: "Intake",
                },
                {
                  id: "course-type",
                  title: "Course Type",
                  type: "item",
                  url: "/forms/sub-master/course-type",
                  DocumentName: "Course Type",
                },
              ],
            },

            {
              id: "batch-master",
              title: "Batch Masters",
              type: "collapse",
              DocumentName: "Batch Masters",
              children: [
                {
                  id: "batch-type",
                  title: "Batch Type",
                  type: "item",
                  url: "/forms/sub-master/batch-type",
                  DocumentName: "Batch Type",
                },
              ],
            },
            {
              id: "interview-master",
              title: "Interview Masters",
              type: "collapse",
              DocumentName: "Interview Master",
              children: [
                {
                  id: "interview-check-list",
                  title: "Interview Criteria",
                  type: "item",
                  url: "/forms/sub-master/check-list",
                  DocumentName: "Interview Check List",
                },
              ],
            },
            {
              id: "finance-master",
              title: "Finance Master",
              type: "collapse",
              DocumentName: "Finance Master",
              children: [
                {
                  id: "fee-list",
                  title: "Fee List",
                  type: "item",
                  url: "/forms/sub-master/fee-list",
                  DocumentName: "Fee List",
                },
              ],
            },
            {
              id: "common-master",
              title: "Common Masters",
              type: "collapse",
              DocumentName: "Common Master",
              children: [
                {
                  id: "hall",
                  title: "Hall",
                  type: "item",
                  url: "/forms/sub-master/hall",
                  DocumentName: "Hall",
                },
                {
                  id: "report-category",
                  title: "Report Category",
                  type: "item",
                  url: "/forms/sub-master/report-category",
                  DocumentName: "ReportCategory",
                },
              ],
            },
            {
              id: "sap-masters",
              title: "SAP Masters",
              type: "collapse",
              DocumentName: "SAP Masters",
              children: [
                {
                  id: "country",
                  title: "Country",
                  type: "item",
                  url: "/forms/sub-master/country",
                  DocumentName: "Country",
                },
                {
                  id: "currency",
                  title: "Currency",
                  type: "item",
                  url: "/forms/sub-master/currency",
                  DocumentName: "Currency",
                },

                {
                  id: "salesperson",
                  title: "Sponsor",
                  type: "item",
                  url: "/forms/sub-master/salesperson",
                  DocumentName: "Sponsor",
                },

                {
                  id: "tax",
                  title: "Tax",
                  type: "item",
                  url: "/forms/sub-master/tax",
                  DocumentName: "Tax",
                },

                {
                  id: "bank",
                  title: "Bank",
                  type: "item",
                  url: "/forms/sub-master/bank",
                  DocumentName: "Bank",
                },
                /*{
                  id: "dimension",
                  title: "Dimension",
                  type: "item",
                  url: "/forms/sub-master/dimension",
                  DocumentName: "Dimension",
                },*/
                {
                  id: "gl-account",
                  title: "GL Accounts",
                  type: "item",
                  url: "/forms/sub-master/gl-account",
                  DocumentName: "GL Account",
                },
                {
                  id: "series",
                  title: "Series",
                  type: "item",
                  url: "/forms/sub-master/series",
                  DocumentName: "Series",
                },
                {
                  id: "credit-card",
                  title: "Credit Card",
                  type: "item",
                  url: "/forms/sub-master/credit-card",
                  DocumentName: "Credit Card",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "group-transactions",
      title: "Transactions",
      type: "group",
      icon: "icon-group",
      DocumentName: "Transactions",
      children: [
        {
          id: "registration",
          title: "Registration",
          type: "collapse",
          icon: "feather icon-users",
          DocumentName: "Registration",
          children: [
            {
              id: "registration-setup",
              title: "Student Registration Setup",
              type: "item",
              url: "/forms/registration/registration-setup",
              DocumentName: "Registration Setup",
            },
            {
              id: "application",
              title: "Application",
              type: "item",
              url: "/forms/registration/application",
              DocumentName: "Application",
            },
            {
              id: "application-assessment",
              title: "Application Assessment",
              type: "item",
              url: "/forms/registration/application-assessment",
              DocumentName: "Application Assessment",
            },
            {
              id: "interview-setup",
              title: "Interview Setup",
              type: "item",
              url: "/forms/registration/interview-setup",
              DocumentName: "Interview Setup",
            },
            {
              id: "interview-assessment",
              title: "Interview Assessment",
              type: "item",
              url: "/forms/registration/interview-assessment",
              DocumentName: "Interview Assessment",
            },
            {
              id: "course-registration",
              title: "Course Registration",
              type: "item",
              url: "/forms/registration/course-registration",
              DocumentName: "Course Registration",
            },
            {
              id: "semester-registration",
              title: "Semester Registration",
              type: "item",
              url: "/forms/registration/semester-registration",
              DocumentName: "Semester Registration",
            },
            {
              id: "bulk-registration",
              title: "Bulk Registration",
              type: "item",
              url: "/forms/registration/bulk-registration",
              DocumentName: "Bulk Registration",
            },
          ],
        },
        {
          id: "exam",
          title: "Examination",
          type: "collapse",
          icon: "feather icon-layers",
          DocumentName: "Examination",
          children: [
            {
              id: "exam-setup",
              title: "Examination Setup",
              type: "item",
              url: "/forms/exam/exam-setup",
              DocumentName: "Examination Setup",
            },
            {
              id: "admission",
              title: "Admission",
              type: "item",
              url: "/forms/exam/admission",
              DocumentName: "Admission",
            },
            {
              id: "exam-attendance",
              title: "Attendance",
              type: "item",
              url: "/forms/exam/attendance",
              DocumentName: "Attendance",
            },
            {
              id: "exam-result",
              title: "Result",
              type: "item",
              url: "/forms/exam/exam-result",
              DocumentName: "Result",
            },
            {
              id: "exam-final-result",
              title: "Exam Final Result",
              type: "item",
              url: "/forms/exam/exam-final-result",
              DocumentName: "Exam Final Result",
            },
            {
              id: "FinalGPA",
              title: "Final GPA",
              type: "item",
              url: "/forms/exam/final-GPA",
              DocumentName: "Final GPA",
            },
            {
              id: "exam-assessment",
              title: "Assessment",
              type: "collapse",
              DocumentName: "Assessment",
              children: [
                {
                  id: "continuous-assessment",
                  title: "Continuous Assessment",
                  type: "item",
                  url: "/forms/exam/continuous-assessment",
                  DocumentName: "Continuous Assessment",
                },
                {
                  id: "internship",
                  title: "Internship",
                  type: "item",
                  url: "/forms/exam/internship",
                  DocumentName: "Internship",
                },
                {
                  id: "thesis",
                  title: "Thesis/Dissertation",
                  type: "item",
                  url: "/forms/exam/thesis",
                  DocumentName: "Thesis",
                },
                {
                  id: "viva",
                  title: "VIVA",
                  type: "item",
                  url: "/forms/exam/viva",
                  DocumentName: "VIVA",
                },
              ],
            },
          ],
        },
        {
          id: "transactions",
          title: "Financial Transactions",
          type: "collapse",
          icon: "feather icon-file-plus",
          DocumentName: "Finance Transaction",
          children: [
            {
              id: "bulk-invoice",
              title: "Bulk Invoice",
              type: "item",
              url: "/forms/transaction/bulk-invoice",
              DocumentName: "Bulk Invoicerd",
            },
            {
              id: "revenue-posting",
              title: "Revenue Posting",
              type: "item",
              url: "/forms/transaction/revenue-posting",
              DocumentName: "Revenue Posting",
            },
            {
              id: "batch-transaction",
              title: "Batch Transaction",
              type: "item",
              url: "/forms/transaction/batch-transaction",
              DocumentName: "Batch Transaction",
            },
            {
              id: "invoice",
              title: "A/R Invoice",
              type: "item",
              url: "/forms/transaction/invoice",
              DocumentName: "Invoice",
            },
            {
              id: "credit-note",
              title: "A/R Credit Note",
              type: "item",
              url: "/forms/transaction/credit-note",
              DocumentName: "Credit Note",
            },
            {
              id: "invoice-ap",
              title: "A/P Invoice",
              type: "item",
              url: "/forms/transaction/invoice-ap",
              DocumentName: "A/P Invoice",
            },
            {
              id: "credit-note-ap",
              title: "A/P Credit Note",
              type: "item",
              url: "/forms/transaction/credit-note-ap",
              DocumentName: "A/P Credit Note",
            },
            {
              id: "receipt",
              title: "Receipt",
              type: "item",
              url: "/forms/transaction/receipt",
              DocumentName: "Recipt",
            },
            {
              id: "payment",
              title: "Payment",
              type: "item",
              url: "/forms/transaction/payment",
              DocumentName: "Payment",
            },
            {
              id: "direct-deposit",
              title: "Direct Deposit",
              type: "item",
              url: "/forms/transaction/direct-deposit",
              DocumentName: "Direct Deposit",
            },
            {
              id: "reconciliation",
              title: "Reconciliation",
              type: "item",
              url: "/forms/transaction/reconciliation",
              DocumentName: "Reconsilation",
            },
          ],
        },
        {
          id: "student-transactions",
          title: "Student Transactions",
          type: "collapse",
          icon: "feather icon-sliders",
          DocumentName: "Student Transactions",
          children: [
            {
              id: "student-attendance",
              title: "Attendance",
              type: "item",
              url: "/forms/transaction/student-attendance",
              DocumentName: "Student Attendance",
            },
            {
              id: "student-transfer",
              title: "Transfer",
              type: "item",
              url: "/forms/transaction/student-transfer",
              DocumentName: "Transfer",
            },
            {
              id: "student-dropout",
              title: "Dropout",
              type: "item",
              url: "/forms/transaction/student-dropout",
              DocumentName: "Dropout",
            },
            /*{
              id: "student-rejoin",
              title: "Rejoin",
              type: "item",
              url: "/forms/transaction/student-rejoin",
              DocumentName: "Rejoin",
            },*/
            {
              id: "cpd-hours",
              title: "Member Transactions",
              type: "item",
              url: "/forms/transaction/cpd-hours",
              DocumentName: "CPH Hours",
            },
          ],
        },
      ],
    },
    {
      id: "group-report-enquiry",
      title: "Enquiries & Reports",
      type: "group",
      icon: "feather icon-clipboard",
      DocumentName: "Enquiries & Reports",
      children: [
        {
          id: "enquiries",
          title: "Enquiries",
          type: "collapse",
          icon: "feather icon-zoom-in",
          DocumentName: "Enquiriers",
          children: [
            {
              id: "enquiry-student",
              title: "Student",
              type: "item",
              url: "/forms/enquiry/student",
              DocumentName: "Student Enquiriers",
            },
            {
              id: "enquiry-course",
              title: "Course",
              type: "item",
              url: "/forms/enquiry/course",
              DocumentName: "Course Enquiriers",
            },
            {
              id: "enquiry-batch",
              title: "Batch",
              type: "item",
              url: "/forms/enquiry/batch",
              DocumentName: "Batch Enquiriers",
            },
            {
              id: "enquiry-lecture",
              title: "Lecturer",
              type: "item",
              url: "/forms/enquiry/lecture",
              DocumentName: "Lecturer",
            },
          ],
        },
        {
          id: "reports",
          title: "Reports",
          type: "collapse",
          icon: "feather icon-clipboard",
          DocumentName: "Reports",
          children: [
            {
              id: "reports-reports",
              title: "Reports",
              type: "item",
              url: "/forms/report/report",
              DocumentName: "Report",
            },
          ],
        },
        /*{
          id: "analysis",
          title: "Analysis",
          type: "collapse",
          icon: "feather icon-bar-chart",
          DocumentName: "Analysis",
          children: [
            {
              id: "analysis-analysis",
              title: "Analysis",
              type: "item",
              url: "/forms/analysis/analysis",
              DocumentName: "Analysis Document",
            },
          ],
        },*/
      ],
    },

    {
      id: "group-events",
      title: "Events & Timetable",
      type: "group",
      icon: "feather icon-calendar",
      DocumentName: "Dashboard",
      children: [
        {
          id: "events",
          title: "Events",
          type: "collapse",
          icon: "feather icon-zap",
          DocumentName: "Events & Timetable",
          children: [
            {
              id: "convocation",
              title: "Convocation",
              type: "collapse",
              DocumentName: "convocation",
              children: [
                {
                  id: "convocation-setup",
                  title: "Setup",
                  type: "item",
                  url: "/forms/event/convocation-setup",
                  DocumentName: "Convocation Setup",
                },
                {
                  id: "convocation-assessment",
                  title: "Eligibility",
                  type: "item",
                  url: "/forms/event/convocation-assessment",
                  DocumentName: "Convocation Assessment",
                },
                {
                  id: "convocation-transaction",
                  title: "Transaction",
                  type: "item",
                  url: "/forms/event/convocation-transaction",
                  DocumentName: "Convocation Transaction",
                },
              ],
            },
          ],
        },
        {
          id: "time-table",
          title: "Timetable",
          type: "collapse",
          icon: "feather icon-calendar",
          DocumentName: "Timetables",
          children: [
            {
              id: "time-table-event",
              title: "Event Timetable",
              type: "item",
              url: "/forms/event/timetable-event",
              DocumentName: "TimetableEvent",
            },
            {
              id: "time-table-batch",
              title: "Batch Timetable",
              type: "item",
              url: "/forms/event/timetable-batch",
              DocumentName: "TimetableBatch",
            },
          ],
        },
      ],
    },
    {
      id: "group-admin",
      title: "Administration",
      type: "group",
      icon: "feather icon-settings",
      DocumentName: "Dashboard",
      children: [
        {
          id: "admin",
          title: "Administration",
          type: "collapse",
          icon: "feather icon-settings",
          DocumentName: "Administration",
          children: [
            {
              id: "user",
              title: "Users",
              type: "item",
              url: "/forms/admin/users",
              DocumentName: "User",
            },
            {
              id: "determination",
              title: "Accounts Determination",
              type: "item",
              url: "/forms/admin/determination",
              DocumentName: "Account Determination",
            },
            {
              id: "approval",
              title: "Approval Process",
              type: "item",
              url: "/forms/admin/approval",
              DocumentName: "Approval Process",
            },
            {
              id: "NumberSeries",
              title: "Number Series",
              type: "item",
              url: "/forms/admin/numberseries",
              DocumentName: "Number Series",
            },
            /*{
              id: "calendar",
              title: "Organization Calendar",
              type: "item",
              url: "/forms/admin/calendar",
              DocumentName: "Organization Calendar",
            },*/
            {
              id: "layout-setup",
              title: "Layout Setup",
              type: "item",
              url: "/forms/admin/layout-setup",
              DocumentName: "Layout Setup",
            },
            {
              id: "report-setup",
              title: "Report Setup",
              type: "item",
              url: "/forms/admin/report-setup",
              DocumentName: "Report Setup",
            },
            {
              id: "system",
              title: "System Settings",
              type: "item",
              url: "/forms/admin/system-settings",
              DocumentName: "System Settings",
            },
            {
              id: "company",
              title: "Company Details",
              type: "item",
              url: "/forms/admin/company-settings",
              DocumentName: "Company Details",
            },
            {
              id: "communication",
              title: "Communication",
              type: "collapse",
              DocumentName: "Communication",
              children: [
                {
                  id: "admin-sms",
                  title: "SMS",
                  type: "item",
                  url: "/forms/admin/sms",
                  DocumentName: "CommunicationSMS",
                },
                {
                  id: "admin-email",
                  title: "Email",
                  type: "item",
                  url: "/forms/admin/email",
                  DocumentName: "CommunicationEmail",
                },
              ],
            },
            {
              id: "about",
              title: "About IMS",
              type: "item",
              url: "/forms/system/about",
              DocumentName: "About IMS",
            },
          ],
        },
      ],
    },
  ],
};
