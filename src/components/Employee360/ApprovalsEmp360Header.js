const APPROVALS_EMP360_TABLE_HEADERS = {
  promotion: {
    empId: "Emp ID",
    empName: "Name",
    position: "Position",
    pstPromotedTo: "Promoted Position",
    promotionDate: "PD",
    status: "Status",
  },
  transfer: {
    empId: "Emp ID",
    empName: "Name",
    effectiveDate: "Effective Date",
    transferType: "Typpe Of Transfer",
    status: "Status",
  },
  disciplinary: {
    empName: "Name",
    showCauseDate: "Show Cause",
    dueDays: "DD",
    showCauseStatus: "Status",
    warningDate: "Warning Letter",
    pipStartDate: "PIP SD",
    pipEndDate: "PIP ED",
    status: "Status",
  },
  probation: {
    empName: "Name",
    dateOfJoining: "DOJ",
    dateOfCnfrmation: "DOC",
    dueDays: "DD",
    status: "Status",
  },
};

export default APPROVALS_EMP360_TABLE_HEADERS;
