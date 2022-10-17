import React, { Fragment, useEffect, useContext, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Search } from "react-feather";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import APPROVALS_MANAGER360_TABLE_HEADERS from "./ApprovalsManager360Headers";
import TableComponent from "../table/Table.component";
import TableComponentManager360 from "../table/Manager360Table";
import { AppContext } from "../../context/AppState";
import { BonusContext } from "../../context/BonusState";
import { PermissionContext } from "../../context/PermissionState";
import { PromotionContext } from "../../context/PromotionState";
import { Employee360Context } from "../../context/Employee360State";
import { DisciplinaryContext } from "../../context/DisciplinaryState";
import LoaderIcon from "../Loader/LoaderIcon";
import moment from "moment";
import { useHistory } from "react-router-dom";

const ApprovalsManager360List = ({ ListType }) => {
  const history = useHistory();
  const { Manager360ListView, Manager360ListData, approvalsLoader ,totalData} =
    useContext(Employee360Context);
    const {
      disciplinaryEmployeeSearch
    } = useContext(DisciplinaryContext);
  const { rolePermission } = useContext(PermissionContext);
  const { makeBonusByContractTypeEmpty } = useContext(BonusContext);
  const { user,fetchemployeeData } = useContext(AppContext);
  const {  ViewPromotionById} = useContext(PromotionContext);
  const [transferType, setTransferType] = useState(ListType);
  const [searchValue, setSearchValue] = useState("all");
  const [searchInput, setSearchInput] = useState("");

  const [status, setStatus] = useState(5);
  const [activePage, setActivePage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [currentRecords, setCurrentRecords] = useState([]);

  
  const TableHeaders =
    ListType === "promotion"
      ? APPROVALS_MANAGER360_TABLE_HEADERS.promotion
      : ListType === "transfer"
      ? APPROVALS_MANAGER360_TABLE_HEADERS.transfer
      : ListType === "disciplinary"
      ? APPROVALS_MANAGER360_TABLE_HEADERS.disciplinary
      : ListType === "probation"
      ? APPROVALS_MANAGER360_TABLE_HEADERS.probation
      : ListType === "separation"
      ? APPROVALS_MANAGER360_TABLE_HEADERS.separation
      : APPROVALS_MANAGER360_TABLE_HEADERS.promotion;
  const [tableBody, setTableBody] = useState([]);

  useEffect(() => {
    setPageCount(0);
    setCurrentPage(1);
    Manager360ListView(ListType, rolePermission,0 ); //pageCount ==0
  }, [ListType]);
  useEffect(() => {
    makeBonusByContractTypeEmpty();
  }, []);
  const GoToModules = (e) => {
    if (ListType === "promotion") {
      history.push("./promotion-list");
    } else if (ListType === "transfer") {
      history.push("./transfers");
    } else if (ListType === "disciplinary") {
      history.push("./disciplinary-action");
    } else if (ListType === "probation") {
      history.push("./probation");
    } else if (ListType === "separation") {
      history.push("./exit-approval");
    } else {
    }
  };

  const isDateBeforeToday = (date) => {
    console.log("yes");
    if (date !== null && date !== undefined && date !== "") {
      console.log("oooooo", new Date(date) < new Date());
      return new Date(date) < new Date();
    } else {
      console.log("no");
      return false;
    }
  };
  useEffect(() => {
    if (
      Manager360ListData !== null &&
      Manager360ListData !== undefined &&
      Object.keys(Manager360ListData).length != 0
    ) {
      if (ListType === "promotion") {
        let tableData = Manager360ListData.map((item, index) => {
          return {
            empId: item.employeeId,
            empName: item.empName,
            position: item.oldPosition,
            pstPromotedTo: item.promotedPosition,
            promotionDate: item.promotionDate,
            status:
              item.status == 0
                ? "Pending"
                : item.status == 1 || item.status == 2
                ? "In Progress"
                : item.status == 3
                ? "Approved"
                : item.status == 4
                ? "Rejected"
                : item.status == 5
                ? "Action Required"
                : "",
            action:
              (rolePermission == "admin" && item.status === 2) ||
              (rolePermission == "costCenterManager" && item.status === 0) ||
              (rolePermission == "superCostCenterManager" && item.status === 0)
                ? {
                    edit: {
                      active: true,
                      onClick:ViewPromotionById(item.promotionId),
                      link: `/promotion-approval/${item.employeeId}`,
                    },
                  }
                :fetchemployeeData !== null &&
                fetchemployeeData !== undefined &&
                fetchemployeeData.employeeId === item.initiatedBy && (item.status === 1 || item.status === 5) 
                ? {
                    edit: {
                      active: true,
                      onClick:ViewPromotionById(item.promotionId),
                      link: `/promotion/${item.employeeId}`,
                    },
                  }:{
                    edit: {
                      active: false,
                      link: "",
                    },
                  },
          };
        });

        setTableBody(tableData);
      } else if (ListType === "transfer") {
        let tableData = Manager360ListData.map((item, index) => {
          return {
            empId: item.currentEmployeeId,
            empName: item.employeeName,
            effectiveDate: item.promotedJoiningDate,
            transferType: item.transferType,
            status:
              item.transferType === "International Transfer"
                ? "Request Sent To Admin"
                : item.transferType === "Employment Type Transfer" && item.status === 0 
                ? "Request Sent to Manager"
                : item.statusDesc,
            action: (item.transferType === "Regular Transfer"
              ? {
                  edit: {
                    active:
                       item.status === 3
                      ? true
                      :item.promotedManagerId === fetchemployeeData.employeeId &&
                      item.status === 0
                        ? true
                        : false,
                    link:
                    item.status === 3
                      ? `/transferaction/${item.transferId}`
                      :item.promotedManagerId === fetchemployeeData.employeeId &&
                      item.status === 0
                        ? `/transfer/${item.transferId}`
                        : "",
                    // item.transferType === "Regular Transfer"
                    //   ? `/transfer/${item.transferId}`
                    //   : "/transfers",
                  },
                }
              : item.transferType === "Entity Transfer"
                  ? {
                      edit: {
                        active:
                          item.status === 3
                          ? true
                          : item.promotedManagerId === fetchemployeeData.employeeId &&
                          item.status === 0
                            ? true
                            : false,
                        link:
                        item.status === 3
                         ? `/entity-transferaction/${item.transferId}`
                         : item.promotedManagerId === fetchemployeeData.employeeId &&
                          item.status === 0
                            ? `/entity-transfer/${item.transferId}`
                            : "",
                      },
                    }
                  : item.transferType === "International Transfer"
                      ? {
                          edit: {
                            active:
                              rolePermission == "admin" &&
                              (item.status === 0 ||
                                isDateBeforeToday(item.promotedDateOfReturn))
                                ? true
                                : false,
                            link:
                              rolePermission == "admin" &&
                              (item.status === 0 ||
                                isDateBeforeToday(item.promotedDateOfReturn))
                                ? `/international-transfer/${item.transferId}`
                                : "",
                          },
                        }
                      :item.transferType === "Employment Type Transfer"
                      ? {
                          edit: {
                            active:
                            item.status === 3 ? true : false,
                            link:
                            item.status === 3
                            ? `/changeinemp-transfer/${item.transferId}`
                                : "",
                          },
                        }: {
                          edit: {
                            active: false,
                            link: "",
                          },
                        }),
          };
        });
        setTableBody(tableData);
      } else if (ListType === "disciplinary") {
        let tableData = Manager360ListData.map((item, index) => {
          return {
            empId: item.employeeId,
            empName: item.employeeName,
            showCauseDate:
              item.disciplinaryAction !== null &&
              item.disciplinaryAction !== undefined
                ? item.disciplinaryAction.actionIssuedDate
                : "NA",
            issuedFor:
              item.disciplinaryAction !== null &&
              item.disciplinaryAction !== undefined
                ? item.disciplinaryAction.reason
                : "NA",
            dueDays:
              item.disciplinaryAction !== null &&
              item.disciplinaryAction !== undefined
                ? item.disciplinaryAction.actionDueDays
                : "NA ",
            empAction:
              item.disciplinaryAction !== null &&
              item.disciplinaryAction !== undefined
                ? item.disciplinaryAction.employeeActionStatus
                : "NA ",
            warningIssueDaTE:
              item.disciplinaryWarning !== null &&
              item.disciplinaryWarning !== undefined
                ? item.disciplinaryWarning.warningIssuedDate
                : "NA ",
            PIP:
              item.disciplinaryWarning !== null &&
              item.disciplinaryWarning !== undefined
                ? item.disciplinaryWarning.improvementPeriod
                : "NA",
            status:
              item.disciplinaryWarning !== null &&
              item.disciplinaryWarning !== undefined
                ? item.disciplinaryWarning.statusDesc
                :item.disciplinaryAction !== null &&
                item.disciplinaryAction !== undefined 
                ? item.disciplinaryAction.statusDesc
                : "NA",
            action:
            (fetchemployeeData !== null &&
              fetchemployeeData !== undefined &&
              fetchemployeeData.employeeId !== item.initiatedBy &&
                rolePermission == "costCenterManager" &&
                item.disciplinaryAction !== null &&
                item.disciplinaryAction !== undefined &&
                item.disciplinaryAction !== "" &&
                item.disciplinaryAction.initiatedRole ===
                  "manager" &&
                ((item.disciplinaryWarning &&
                  Object.keys(item.disciplinaryWarning)
                    .length &&
                  item.disciplinaryWarning.statusDesc ===
                    "Warning Letter Issued"&&
                    item.disciplinaryWarning.managerEsign ===true) ||
                  item.disciplinaryAction.statusDesc ===
                    "Show Cause Notice Issued")) ||
              (fetchemployeeData !== null &&
                fetchemployeeData !== undefined &&
                fetchemployeeData.employeeId !== item.initiatedBy &&
                rolePermission == "superCostCenterManager" &&
                item.disciplinaryAction !== null &&
                item.disciplinaryAction !== undefined &&
                item.disciplinaryAction !== "" &&
                item.disciplinaryAction.initiatedRole ===
                  "costCenterManager" &&
                ((item.disciplinaryWarning &&
                  Object.keys(item.disciplinaryWarning)
                    .length &&
                  item.disciplinaryWarning.statusDesc ===
                    "Warning Letter Issued") ||
                  item.disciplinaryAction.statusDesc ===
                    "Show Cause Notice Issued")) ||
              (fetchemployeeData !== null &&
                fetchemployeeData !== undefined &&
                fetchemployeeData.employeeId !== item.initiatedBy &&
                rolePermission == "admin" &&
                item.disciplinaryAction !== null &&
                item.disciplinaryAction !== undefined &&
                item.disciplinaryAction !== "" &&
                item.disciplinaryAction.initiatedRole ===
                  "superCostCenterManager" &&
                ((item.disciplinaryWarning &&
                  Object.keys(item.disciplinaryWarning)
                    .length &&
                  item.disciplinaryWarning.statusDesc ===
                    "Warning Letter Issued") ||
                  item.disciplinaryAction.statusDesc ===
                    "Show Cause Notice Issued"))
                ? {
                    edit: {
                      active: true,
                      link: `/disciplinary-action-page/${item.disciplinaryAction.disciplinaryId}`,
                    },
                  }
                : (fetchemployeeData !== null &&
                  fetchemployeeData !== undefined &&
                  fetchemployeeData.employeeId === item.initiatedBy &&
                  item.disciplinaryAction !== null &&
                  item.disciplinaryAction !== undefined &&
                  item.disciplinaryAction !== "" &&
                  item.disciplinaryAction.initiatedRole ==
                    rolePermission &&
                  item.disciplinaryAction.statusDesc !==
                    "Action Required By Employee" &&
                  item.disciplinaryAction.statusDesc !==
                    "Exit Initiated" &&
                  item.disciplinaryWarning === null &&
                  (item.disciplinaryAction.employeeActionStatus ===
                    "Responded" ||
                    item.disciplinaryAction.actionDueDays === 0)) ||
                (fetchemployeeData !== null &&
                  fetchemployeeData !== undefined &&
                  fetchemployeeData.employeeId === item.initiatedBy &&
                  item.disciplinaryWarning !== null &&
                  item.disciplinaryWarning !== undefined &&
                  item.disciplinaryWarning !== "" &&
                  item.disciplinaryWarning.initiatedRole ==
                    rolePermission &&
                  item.disciplinaryWarning.statusDesc !==
                    "Exit Initiated" &&
                  item.disciplinaryWarning.statusDesc ===
                    "Warning Letter Approved" &&
                  item.disciplinaryWarning.pipDueDays === 0)?
                  {
                    edit: {
                      active: true,
                      onClick:item.disciplinaryAction.disciplinaryId?disciplinaryEmployeeSearch(item.disciplinaryAction.disciplinaryId):null,
                      link: `/manager-warning-action-view/${item.employeeId}`,
                    },
                  }:(fetchemployeeData !== null &&
                    fetchemployeeData !== undefined &&
                    fetchemployeeData.employeeId === item.initiatedBy &&
                    rolePermission == "admin" &&
                    item.disciplinaryAction !== null &&
                    item.disciplinaryAction !== undefined &&
                    item.disciplinaryAction !== "" &&
                    item.disciplinaryAction.initiatedRole ==
                      rolePermission &&
                    item.disciplinaryAction.status === 13) ||
                  (fetchemployeeData !== null &&
                    fetchemployeeData !== undefined &&
                    fetchemployeeData.employeeId === item.initiatedBy &&
                    rolePermission == "admin" &&
                    item.disciplinaryWarning !== null &&
                    item.disciplinaryWarning !== undefined &&
                    item.disciplinaryWarning !== "" &&
                    item.disciplinaryWarning.initiatedRole ==
                      rolePermission &&
                    item.disciplinaryWarning.status === 14) ||
                  (fetchemployeeData !== null &&
                    fetchemployeeData !== undefined &&
                    fetchemployeeData.employeeId === item.initiatedBy &&
                    rolePermission == "superCostCenterManager" &&
                    item.disciplinaryAction !== null &&
                    item.disciplinaryAction !== undefined &&
                    item.disciplinaryAction !== "" &&
                    item.disciplinaryAction.initiatedRole ==
                      rolePermission &&
                    item.disciplinaryAction.status === 12) ||
                  (fetchemployeeData !== null &&
                    fetchemployeeData !== undefined &&
                    fetchemployeeData.employeeId === item.initiatedBy &&
                    rolePermission == "superCostCenterManager" &&
                    item.disciplinaryWarning !== null &&
                    item.disciplinaryWarning !== undefined &&
                    item.disciplinaryWarning !== "" &&
                    item.disciplinaryWarning.initiatedRole ==
                      rolePermission &&
                    item.disciplinaryWarning.status === 13) ||
                  (fetchemployeeData !== null &&
                    fetchemployeeData !== undefined &&
                    fetchemployeeData.employeeId === item.initiatedBy &&
                    rolePermission == "costCenterManager" &&
                    item.disciplinaryAction !== null &&
                    item.disciplinaryAction !== undefined &&
                    item.disciplinaryAction !== "" &&
                    item.disciplinaryAction.initiatedRole ==
                      rolePermission &&
                    item.disciplinaryAction.status === 11) ||
                  (fetchemployeeData !== null &&
                    fetchemployeeData !== undefined &&
                    fetchemployeeData.employeeId === item.initiatedBy &&
                    rolePermission == "costCenterManager" &&
                    item.disciplinaryWarning !== null &&
                    item.disciplinaryWarning !== undefined &&
                    item.disciplinaryWarning !== "" &&
                    item.disciplinaryWarning.initiatedRole ==
                      rolePermission &&
                    item.disciplinaryWarning.status === 12) ||
                  (fetchemployeeData !== null &&
                    fetchemployeeData !== undefined &&
                    fetchemployeeData.employeeId === item.initiatedBy &&
                    rolePermission == "manager" &&
                    item.disciplinaryAction !== null &&
                    item.disciplinaryAction !== undefined &&
                    item.disciplinaryAction !== "" &&
                    item.disciplinaryAction.initiatedRole ==
                      rolePermission &&
                    item.disciplinaryAction.status === 10) ||
                  (fetchemployeeData !== null &&
                    fetchemployeeData !== undefined &&
                    fetchemployeeData.employeeId === item.initiatedBy &&
                    rolePermission == "manager" &&
                    item.disciplinaryWarning !== null &&
                    item.disciplinaryWarning !== undefined &&
                    item.disciplinaryWarning !== "" &&
                    item.disciplinaryWarning.initiatedRole ==
                      rolePermission &&
                    item.disciplinaryWarning.status === 11)? 
                    {
                      edit: {
                        active: true,
                        link: `/manager-action-view/${item.employeeId}`,
                      },
                    }:{
                    edit: {
                      active: false,
                      link: "",
                    },
                  },
          };
        });
        setTableBody(tableData);
      } else if (ListType === "probation") {
        let tableData = Manager360ListData.map((item, index) => {
          return {
            empId: item.empId,
            empName: item.empName,
            dateOfJoining: item.dateOfJoining,

            dueDays: item.dueDays,
            status:item.status === 0? "Due for confirmation":item.status === 5 || item.status === 6
            ? "Action Required"
            : "",

            action: {
              edit: {
                active: (item.status === 0 ||
                  item.status === 5 ||
                  item.status === 6) &&
                item.dueDays > 0  ? true : false,
                link:
                (item.status === 0 ||
                  item.status === 5 ||
                  item.status === 6) &&
                item.dueDays > 0  ? `/probation-action/${item.empId}` : "",
              },
            },
          };
        });
        setTableBody(tableData);
      } else if (ListType === "separation") {
        let tableData = Manager360ListData.map((item, index) => {
          return {
            empId: item.employeeId,
            empName: item.employeeName,
            resignationDate: item.dateOfResignation,
            reason: item.reasonForResignation,

            action: {
              edit: {
                active: true,
                link:
                  item.status === 0
                    ? `/exit-action/${item.employeeId}`
                    : `/employee-info/${item.employeeId}`,
              },
            },
          };
        });
        setTableBody(tableData);
      } else {
        setTableBody([]);
      }
    } else {
      setTableBody([]);
    }
  }, [Manager360ListData]);

/*-----------------Pagination------------------*/
const [currentPage, setCurrentPage] = useState(1);
const recordPerPage = 5;
const totalRecords = totalData;
const pageRange = 5;
const indexOfLastRecord = currentPage * recordPerPage;
const indexOfFirstRecord = indexOfLastRecord - recordPerPage;

useEffect(() => {
  if ( Manager360ListView!== null && Manager360ListView !== undefined) {
    setCurrentRecords(Manager360ListData);
  }
 
}, [currentRecords,]);

const handlePageChange = (pageNumber) => {
  setPageCount(pageNumber-1);
  setCurrentPage(pageNumber)
 
  // if( ListType && pageNumber){
Manager360ListView(ListType,rolePermission,pageNumber-1) //call api
  // }
  // else{
  //   Manager360ListView(ListType, rolePermission,pageCount);
  // }
   setCurrentRecords(Manager360ListData);
};


/*-----------------Pagination------------------*/
// console.log("hello pagination",Manager360ListData)


  return (
    <Fragment>
      <div>
        {approvalsLoader ? (
          <LoaderIcon />
        ) : (
          <>
          <TableComponentManager360
            tableHeaders={TableHeaders}
            tableBody={tableBody}
            ListType ={ListType}
            // button={true}
            height={"280px"}
          />

                                           <div>
                                                      {Manager360ListData !== null  && Manager360ListData !== undefined  ?(
                                      
                                            <Pagination
                                            itemClass="page-item"
                                            linkClass="page-link"
                                            activePage={currentPage}
                                            itemsCountPerPage={recordPerPage}
                                            totalItemsCount={totalRecords}
                                            pageRangeDisplayed={pageRange}
                                            onChange={handlePageChange}
                                            firstPageText="First"
                                            lastPageText="Last"
                                          />
                                          ):(
                                                ""
                                            )
                                        }
                                        </div>
              
        </>
        )}

        {!approvalsLoader ? (
          <div style={{ float: "bottom", textAlign: "center" }}>
            <label className="itemResult" onClick={(e) => GoToModules(e)}>
              View All
            </label>
          </div>
        ) : (
          ""
        )}
        {/* </div> */}
      </div>
    </Fragment>
  );
};

export default ApprovalsManager360List;
